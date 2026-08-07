export default class ApiError extends Error {
    public readonly statusCode: number;
    public readonly errorKey: string;
    constructor(message: string, statusCode: number, errorKey: string = "") {
        super(message);
        this.statusCode = statusCode;
        this.errorKey = errorKey;
        Error.captureStackTrace(this, this.constructor);
    }
}