import Product from '../models/Product';
import Rating from '@/models/Rating';
import ProductQueryParameters from '@/parameters/ProductQueryParameters';

interface IProductService {
    getProducts(parameters?: ProductQueryParameters): Promise<Array<Product>>
    getProductById(productId: number): Promise<Product>
};

class ProductService implements IProductService {
    private readonly base_url: string;

    constructor() {
        this.base_url = process.env.VUE_APP_FAKE_STORE_API_BASE_URL;
    }

    async getProducts(parameters?: ProductQueryParameters): Promise<Array<Product>> {
        let url = `${this.base_url}/products`;

        if (parameters?.category !== undefined) {
            url = `${url}/category/${parameters.category}`;
        }
        
        if (parameters?.sort !== undefined) {
            url = `${url}?sort=${parameters.sort}`;
        }

        if (parameters?.limit !== undefined) {
            url.includes('?') ? `${url}&limit=${parameters.limit}` : `${url}?limit=${parameters.limit}`;
        }

        const response = await fetch(url);
        const data = await response.json();
        
        let products = data.map((item: any) => {
            return new Product(item.id, item.title, item.price, item.description, item.category, item.image, new Rating(item.rating.count, item.rating.rate));
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