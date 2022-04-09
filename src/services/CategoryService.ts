import Category from "@/models/Category";
import { capitalizeFirstLetter } from '../utils/index';

interface ICategoryService {
    getCategories() : Promise<Array<Category>>
}

class CategoryService implements ICategoryService {
    private readonly base_url: string;

    constructor() {
        this.base_url = process.env.VUE_APP_FAKE_STORE_API_BASE_URL;
    }

    async getCategories() : Promise<Array<Category>> {
        let url = `${this.base_url}/products/categories`;

        const response = await fetch(url);
        const data = await response.json();

        let categories = data.map((category: any, index: number) => {
            let id: number = index + 1;
            return new Category(id, capitalizeFirstLetter(category));
        });

        return categories;
    }
}

export default CategoryService;