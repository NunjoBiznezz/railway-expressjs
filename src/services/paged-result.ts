
interface IPagedResult<T> {
    totalItems: number;
    page: number;
    size: number;
    items: Array<T>;
}


class PagedResult<T> implements  IPagedResult<T> {
    items: Array<T>;
    page: number;
    size: number;
    totalItems: number;

    constructor(options?: { page?: number, size?: number, totalItems?: number, items?: Array<T>}) {
        this.page = options?.page || 0
        this.size = options?.size || 100;
        this.totalItems = options?.totalItems || options?.items?.length || 0
        this.items = options?.items || []
    }

}

export { IPagedResult, PagedResult }
