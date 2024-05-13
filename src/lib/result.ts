export enum StatusCode {
	OK = 200,
	BadRequest = 400,
	Unauthorized = 401,
	Forbidden = 403,
	NotFound = 404,
	InternalServerError = 500
}

export class HttpError extends Error {
	code: number;

	constructor(code: number, message?: string) {
		super(message ?? `Received error code ${code}`);
		this.code = code;
	}
}
