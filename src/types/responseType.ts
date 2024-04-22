export type Res<T> = {
    fields: string;
    success: boolean;
    data: T | null;
    message: string | errorTypes[];
};

type errorTypes={
    field: string,
    message: string,
}
