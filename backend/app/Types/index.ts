export interface ApiResponse<T = unknown> {
    statusCode: number;
    message: string;
    status: boolean;
    result?: T | null;
    totalCount?: number;
    responseId?: string;
    type?: string;
    actionType?: string;
    errorKey?: string;
}

export interface Pagination {
    page: number;
    limit: number;
    total: number;
}

export interface JwtPayload {
    id: string;
    email: string;
    role: string;
}