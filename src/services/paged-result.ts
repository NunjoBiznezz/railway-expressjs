interface IPagedResult<T> {
    page: number;           // The relative page number assuming 'size' as the page size
    size: number;           // The number of items retrieved this time
    items: Array<T>;        // The items retrieved this time
    totalItems: number;     // The total number of items that can be retrieved
}

class PagedResult<T> implements IPagedResult<T> {
    items: Array<T>;
    page: number;
    size: number;
    totalItems: number;

    constructor(options?: {
        page?: number | undefined;          // The relative page number assuming 'size' as the page size
        size?: number | undefined;          // The number of items retrieved this time
        items?: Array<T> | undefined;       // The items retrieved this time
        totalItems?: number | undefined;    // The total number of items that can be retrieved
    }) {
        this.page = options?.page || 0
        this.size = options?.size || 100;
        this.totalItems = options?.totalItems || options?.items?.length || 0
        this.items = options?.items || []
    }

    static empty(request?: {
        page?: number | undefined;          // Requested page number
        size?: number | undefined;          // Requested items per page
    }) : PagedResult<any>  {
        return new PagedResult<any>({
            size: request?.size,
            page: request?.page,
            totalItems: 0,
            items: []
        })
    }

}

export { IPagedResult, PagedResult }
