
interface IPageRequest {
    page?: number;
    size?: number;
    sort?: string | undefined;
}

class PageRequest implements  IPageRequest {
    page?: number;
    size?: number;
    sort?: string |  undefined;

    constructor(options?: IPageRequest) {
        this.page = options?.page
        this.size = options?.size
        this.sort = options?.sort
    }
}

export { IPageRequest };
