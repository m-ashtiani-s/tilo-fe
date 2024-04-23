export type Paginate<T> = {
    page: number;
    totalElements: number;
    totalPages: number;
    limit: number;
    elements: T[];
};
