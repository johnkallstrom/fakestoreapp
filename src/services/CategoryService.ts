import Category from "@/models/Category";
import { capitalizeFirstLetter } from '../utils/index';
import FakeStoreAppCache from '../cache/FakeStoreAppCache';

interface ICategoryService {
    getCategories() : Promise<Array<Category>>
}

class CategoryService implements ICategoryService {
    private readonly base_url: string;
    private readonly cache: FakeStoreAppCache;

    constructor() {
        this.base_url = process.env.VUE_APP_FAKE_STORE_API_BASE_URL;
        this.cache = new FakeStoreAppCache();
    }

    async getCategories() : Promise<Array<Category>> {
        let url = `${this.base_url}/products/categories`;

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

        let categories = data.map((category: any, index: number) => {
            let id: number = index + 1;
            return new Category(id, capitalizeFirstLetter(category));
        });

        return categories;
    }
}

export default CategoryService;