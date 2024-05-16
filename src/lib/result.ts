export enum StatusCode {
	OK = 200,
	NoContent = 204,
	BadRequest = 400,
	Unauthorized = 401,
	Forbidden = 403,
	NotFound = 404,
	InternalServerError = 500
}

export class HttpError extends Error {
	code: StatusCode;

	constructor(code: StatusCode, message?: string) {
		super(message ?? `Received error code ${code}`);
		this.code = code;
	}
}
