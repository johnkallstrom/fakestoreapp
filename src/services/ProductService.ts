import Product from '../models/Product';
import Rating from '@/models/Rating';
import ProductQueryParameters from '@/parameters/ProductQueryParameters';
import { trimString, capitalizeFirstLetter } from '../utils/index';
import FakeStoreAppCache from '../cache/FakeStoreAppCache';

interface IProductService {
    getProducts(parameters?: ProductQueryParameters): Promise<Array<Product>>
    getProductById(productId: number): Promise<Product>
};

class ProductService implements IProductService {
    private readonly base_url: string;
    private readonly max_description_limit: number;
    private readonly cache: FakeStoreAppCache;

    constructor() {
        this.base_url = process.env.VUE_APP_FAKE_STORE_API_BASE_URL;
        this.max_description_limit = process.env.VUE_APP_MAX_DESCRIPTION_CHARACTER_LIMIT;
        this.cache = new FakeStoreAppCache();
    }

    async getProducts(parameters?: ProductQueryParameters): Promise<Array<Product>> {
        let url = `${this.base_url}/products`;

        if (parameters?.category !== undefined) {
            url = `${url}/category/${parameters.category}`;
        }
        
        if (parameters?.sort !== undefined) {
            url = `${url}?sort=${parameters.sort}`;
        }

        let request = new Request(url);
        let response: any = {};
        let data: any = {};

        response = await this.cache.get(request);

        if (response !== undefined) {
            data = await response.json();
        } else {
            await this.cache.add(request);
            response = await fetch(request);
            data = await response.json();
        }
        
        let products = data.map((item: any) => {
            let description = item.description;
            description = capitalizeFirstLetter(description);
            description = trimString(description, this.max_description_limit) + '...';
            return new Product(item.id, item.title, item.price, description, item.category, item.image, new Rating(item.rating.count, item.rating.rate));
        });

        return products;
    }

    async getProductById(productId: number): Promise<Product> {
        let url = `${this.base_url}/products/${productId}`;

        const response = await fetch(url);
        const data = await response.json();

        let product = new Product(data.id, data.title, data.price, data.description, data.category, data.image, new Rating(data.rating.count, data.rating.rate));
        return product;
    }
};

export default ProductService;