<template>
  <section class="products">
    <div class="container">
      <h1>Products</h1>
      <Spinner v-if="products.length === 0" />
      <div v-else-if="products.length > 0">
        <div class="row mb-3">
          <div class="col-md-3">
            <label>Sort</label>
            <select
              class="form-select"
              v-model="selectedSort"
              v-on:change="onFilterChange"
            >
              <option
                v-for="option in sortOptions"
                :value="option.value"
                :key="option.value"
                :disabled="option.disabled"
                :selected="option.selected"
              >
                {{ option.text }}
              </option>
            </select>
          </div>
          <div class="col-md-3">
            <label>Category</label>
            <select
              class="form-select"
              v-model="selectedCategory"
              v-on:change="onFilterChange"
            >
              <option
                v-for="option in categoryOptions"
                :value="option.value"
                :key="option.value"
                :disabled="option.disabled"
                :selected="option.selected"
              >
                {{ option.text }}
              </option>
            </select>
          </div>
          <div class="col-md-3 d-flex align-items-end">
            <button class="btn btn-danger" @click="onFilterReset">Reset</button>
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
import ProductQueryParameters from '@/parameters/ProductQueryParameters';
import Card from '../components/shared/Card.vue';
import Spinner from '../components/shared/Spinner.vue';
import SelectOption from '../rendering/SelectOption';

export default defineComponent({
  name: 'Products',
  components: {
    Card,
    Spinner,
  },
  data() {
    return {
      productService: new ProductService(),
      categoryService: new CategoryService(),
      products: [] as Array<Product>,
      categoryOptions: [] as Array<SelectOption>,
      sortOptions: [] as Array<SelectOption>,
      selectedSort: 'default',
      selectedCategory: 'default',
    };
  },
  methods: {
    async onFilterChange() {
      let params = new ProductQueryParameters();

      if (this.selectedSort !== 'default') {
        params.sort = this.selectedSort;
      }

      if (this.selectedCategory !== 'default') {
        params.category = this.selectedCategory;
      }

      this.products = await this.productService.getProducts(params);
    },
    async onFilterReset() {
      this.selectedSort = 'default';
      this.selectedCategory = 'default';

      let params = new ProductQueryParameters();
      this.products = await this.productService.getProducts(params);
    },
  },
  async created() {
    this.products = await this.productService.getProducts();

    let categories = await this.categoryService.getCategories();
    this.categoryOptions = categories.map((item: Category, index: number) => {
      return new SelectOption(item.name.toLowerCase(), item.name);
    });
    this.categoryOptions.unshift(
      new SelectOption('default', 'Choose category', true, true)
    );

    this.sortOptions = new Array<SelectOption>(
      new SelectOption('asc', 'Title Ascending'),
      new SelectOption('desc', 'Title Descending')
    );
    this.sortOptions.unshift(
      new SelectOption('default', 'Choose sort', true, true)
    );
  },
});
</script>
