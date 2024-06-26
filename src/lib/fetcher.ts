import { browser } from "$app/environment";
import type { paths } from "../api";
import { HttpError, StatusCode } from "./result";

type Path = keyof paths;
type HttpMethod<P extends Path = Path> = P extends Path ? Uppercase<keyof paths[P] & string> : never;
type ContentType<Path extends MethodPath = MethodPath> = RequestContentType<Path> | ResponseContentType<Path>;

type RequestContentType<Path extends MethodPath = MethodPath> = Path extends MethodPath ?
    Endpoint<Path> extends { requestBody: { content: infer Content } } ?
        Content extends never ? never : keyof Content :
        never :
    never;

type ResponseContentType<Path extends MethodPath = MethodPath> = Path extends MethodPath ?
    Endpoint<Path> extends { responses: infer Response } ?
        Response[StatusCodeSuccess & keyof Response] extends { content: infer Content } ?
            Content extends never ? never : keyof Content :
            never :
        never :
    never;

type PathWithMethod<Method extends HttpMethod = HttpMethod> = {
    [E in Path]: Lowercase<Method> extends keyof paths[E] ? E : never
}[Path];

type MethodPath<
    Method extends HttpMethod = HttpMethod
> = Method extends HttpMethod ? `${Method} ${PathWithMethod<Method>}` : never;

type PathOf<Path extends MethodPath> = Path extends `${infer _} ${infer P}` ? P : never;
type MethodOf<Path extends MethodPath> = Path extends `${infer M} ${infer _}` ? M : never;

type Endpoint<Path extends MethodPath> = paths[PathOf<Path>][Lowercase<MethodOf<Path>> & keyof paths[PathOf<Path>]];

type AsRecord<T> = T extends Record<string, unknown> ? T : never;

type Parameters<Path extends MethodPath> = AsRecord<
    UnionToIntersection<
        Path extends MethodPath ?
            Endpoint<Path> extends { parameters: { path: infer T } } ?
                T :
                never :
            never
    >
>;

type Query<Path extends MethodPath> = AsRecord<
    UnionToIntersection<
        Path extends MethodPath ?
            Endpoint<Path> extends { parameters: { query: infer T } } ?
                T :
                never :
            never
    >
>;

type Body<Path extends MethodPath, Type extends ContentType> = Endpoint<Path> extends { requestBody: { content: unknown } } ?
    UnionToIntersection<
        Endpoint<Path> extends { requestBody: { content: infer T } } ?
            T[Type & keyof T] :
            never
    > :
    never;

type Digit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
type StringAsNumber<T extends string> = T extends `${infer N extends number}` ? N : never;
type StatusCodeSuccess = StringAsNumber<`2${Digit}${Digit}`>;

type Response<Path extends MethodPath, StatusCode extends number, Type extends ContentType> =
    Path extends MethodPath ?
        Endpoint<Path> extends { responses: infer Response } ?
            StatusCode extends keyof Response ?
                Response[StatusCode] extends { content: infer Content } ?
                    [Content] extends [never] ?
                        undefined :
                        Type extends keyof Content ? Content[Type] : undefined :
                    never :
                never :
            never :
        never;

type FetchOptions<Path extends MethodPath> = Expand<
    (Parameters<Path> extends never ? EmptyObject : { params: Parameters<Path> }) &
    (Query<Path> extends never ? EmptyObject : { query: Query<Path> }) &
    (Body<Path, 'application/json'> extends never ? EmptyObject : { body: Body<Path, 'application/json'> })
>;

type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;
type EmptyObject = { [K in never]: never };
type UnionToIntersection<U> = (U extends unknown ? (x: U) => void : never) extends ((x: infer I) => void) ? I : never;

export type Fetch = typeof fetch;

export class Fetcher<BaseUrl extends string = string> {
    private baseUrl: BaseUrl | undefined;
    private maxCallAttempts: number;
    private defaultFetch: Fetch = fetch;

    constructor({ maxCallAttempts = 3, baseUrl }: { maxCallAttempts?: number; baseUrl?: BaseUrl }) {
        this.baseUrl = baseUrl;
        this.maxCallAttempts = maxCallAttempts;
    }

    async fetch<Path extends MethodPath>(
        path: Path,
		options: FetchOptions<Path>,
		fetch?: Fetch,
		limit = this.maxCallAttempts
	): Promise<Response<Path, StatusCodeSuccess, 'application/json'>> {
		if (limit === 0) throw new Error('Max call limit reached');

        const params = 'params' in options ? options.params : {};
        const query = 'query' in options ? options.query : undefined;
        const body = 'body' in options ? JSON.stringify(options.body) : undefined;
        const [method, urlPath] = this.parse(path, params);
        let url = new URL(urlPath, this.baseUrl).toString();
        if (query) url += '?' + new URLSearchParams(Object.entries(query).map(([k, v]) => [k, typeof v === 'object' ? JSON.stringify(v) : String(v)]) );
		const headers = {
            'Content-Type': 'application/json'
        };
		const result = await (fetch ?? this.defaultFetch)(url, {
            mode: 'cors',
			credentials: 'include',
			method,
			headers,
			body
		});

		if (result.status === StatusCode.Unauthorized && this.isLoggedIn()) {
			console.log('Unauthorized, refreshing token');
			await this.refresh();
			return await this.fetch(path, options, fetch, limit - 1);
		} else if (!result.ok) {
			throw new HttpError(result.status, await result.text());
		} else if (result.status === StatusCode.NoContent) {
			return undefined as Response<Path, StatusCodeSuccess, 'application/json'>;
		}

		return await result.json()
	}

    private getCookie(name: string): string | null {
		if (!browser) return null;
		const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
		if (match) return match[2];
		return null;
	}

	async refresh(fetch?: Fetch) {
        return await this.fetch('GET /v1/auth/refresh', {}, fetch)
    }

	isLoggedIn() {
        return this.getCookie('logged_in') === 'true'
    }

    private parse<Path extends MethodPath>(path: Path, params: Record<string, unknown>) {
        const [method, urlPath] = path.split(' ', 2);
        return [method, this.parsePath(urlPath, params)] as [MethodOf<Path>, string];
    }

    private parsePath(path: string, params: Record<string, unknown>): string {
        return path.replace(/\{([^}]+)\}/g, (_, key) => {
            if (key in params) return String(params[key]);
            throw new Error(`Missing parameter ${key} in path ${path}`);
        });
    }
}
