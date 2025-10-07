export class ValidateException extends Error {
	constructor(public response: APP.ApiErrorsValidateResponse) {
		super("Error");
		this.name = "ValidateException";
		this.message = response.message || "An error occurred";
	}
}
