export class HttpException extends Error {
	constructor(
		public errors: APP.ApiErrorResponse,
		public status: number = 500,
	) {
		super("Error");
		this.name = "HttpException";
		this.message = errors.message || "An error occurred";
	}
}
