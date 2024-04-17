export type Result<T> = Ok<T> | Error;

export class Ok<T> {
	code: number;
	data: T;

	constructor(data: T, code: number = 200) {
		this.data = data;
		this.code = code;
	}

	map<R>(fn: (obj: T) => R): Ok<R> {
		return new Ok(fn(this.data), this.code);
	}
}

export class Error {
	code?: number;
	message?: string;

	constructor(message?: string, code?: number) {
		this.code = code;
		this.message = message;
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	map<R>(_: (obj: never) => R): Error {
		return this;
	}
}

export function isError<T>(result: Result<T>): result is Error {
	return result instanceof Error;
}

export function isSuccess<T>(result: Result<T>): result is Ok<T> {
	return result instanceof Ok;
}

export const OK = new Ok(undefined);
export const ERROR = new Error();
