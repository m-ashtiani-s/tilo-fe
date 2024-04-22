export type Page<T> = {
    page: number;
    totalElements: number;
    totalPages: number;
    limit: number;
    elements: T[];
};
