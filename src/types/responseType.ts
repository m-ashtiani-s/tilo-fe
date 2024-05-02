export type Res<T> = {
    fields: string;
    success: boolean;
    data: T | null;
    message: string
};

type errorTypes={
    field: string,
    message: string,
}
