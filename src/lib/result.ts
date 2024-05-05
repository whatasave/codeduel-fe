export class HttpError extends Error {
	code: number;

	constructor(code: number, message?: string) {
		super(message ?? `Received error code ${code}`);
		this.code = code;
	}
}