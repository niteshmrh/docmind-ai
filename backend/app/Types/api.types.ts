export interface ResponseOptions<T = unknown> {
    statusCode?: number;
    message?: string;
    result?: T | null;
    totalCount?: number;
    errorKey?: string;
}

export interface IdParams {
    id: string;
}