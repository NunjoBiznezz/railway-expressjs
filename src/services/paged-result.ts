
interface IPagedResult<T> {
    page: number;           // The relative page number assuming 'size' as the page size
    size: number;           // The number of items retrieved this time
    items: Array<T>;        // The items retrieved this time
    totalItems: number;     // The total number of items that can be retrieved
}


class PagedResult<T> implements  IPagedResult<T> {
    items: Array<T>;
    page: number;
    size: number;
    totalItems: number;

    constructor(options?: IPagedResult<T>) {
        this.page = options?.page || 0
        this.size = options?.size || 100;
        this.totalItems = options?.totalItems || options?.items?.length || 0
        this.items = options?.items || []
    }

}

export { IPagedResult, PagedResult }
