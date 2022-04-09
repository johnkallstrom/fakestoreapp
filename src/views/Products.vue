<template>
  <section class="products">
    <div class="container">
      <h1>Products</h1>
      <Spinner v-if="products.length === 0" />
      <div v-else-if="products.length > 0">
        <div class="row mb-3">
          <div class="col-md-3">
            <label>Sort</label>
            <select class="form-select">
              <option
                v-for="option in sortOptions"
                :value="option.value"
                :key="option.value"
              >
                {{ option.text }}
              </option>
            </select>
          </div>
          <div class="col-md-3">
            <label>Category</label>
            <select class="form-select">
              <option
                v-for="category in categories"
                :value="category.name"
                :key="category.id"
              >
                {{ category.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="row row-cols-1 row-cols-md-2 g-4">
          <Card
            :title="product.title"
            :text="product.description"
            :image="product.image"
            v-for="product in products"
            :key="product.id"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Category from '../models/Category';
import CategoryService from '../services/CategoryService';
import Product from '../models/Product';
import ProductService from '../services/ProductService';
import Card from '../components/shared/Card.vue';
import Spinner from '../components/shared/Spinner.vue';
import ProductQueryParameters from '@/parameters/ProductQueryParameters';

export default defineComponent({
  name: 'Products',
  components: {
    Card,
    Spinner,
  },
  data() {
    return {
      products: [] as Array<Product>,
      categories: [] as Array<Category>,
      sortOptions: [] as any,
    };
  },
  methods: {
    async setupProducts() {
      var productService = new ProductService();
      this.products = await productService.getProducts(
        new ProductQueryParameters()
      );
    },
    async setupCategories() {
      var categoryService = new CategoryService();
      this.categories = await categoryService.getCategories();
    },
  },
  async created() {
    await this.setupProducts();
    await this.setupCategories();

    this.sortOptions = [
      {
        value: 'asc',
        text: 'Title - Ascending',
      },
      {
        value: 'desc',
        text: 'Title - Descending',
      },
    ];
  },
});
</script>
