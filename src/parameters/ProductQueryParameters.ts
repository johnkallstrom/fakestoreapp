class ProductQueryParameters {
    sort: string;
    limit: number;
    category: string;

    constructor(sort?: string, limit?: number, category?: string)
    constructor(sort: string, limit: number, category: string) {
        this.sort = sort;
        this.limit = limit;
        this.category = category;
    }
}

export default ProductQueryParameters;