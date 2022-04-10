<template>
  <section class="products">
    <div class="container">
      <h1>Products</h1>
      <Spinner v-if="products.length === 0" />
      <div v-else-if="products.length > 0">
        <div class="row mb-3">
          <div class="col-md-3">
            <label>Sort</label>
            <select class="form-select" v-model="selectedSort">
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
            <select class="form-select" v-model="selectedCategory">
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
import SelectOption from '../rendering/SelectOption';

export default defineComponent({
  name: 'Products',
  components: {
    Card,
    Spinner,
  },
  data() {
    return {
      products: [] as Array<Product>,
      categoryOptions: [] as Array<SelectOption>,
      sortOptions: [] as Array<SelectOption>,
      selectedSort: 'default',
      selectedCategory: 'default',
    };
  },
  async created() {
    var productService = new ProductService();
    let parameters = new ProductQueryParameters();
    this.products = await productService.getProducts(parameters);

    var categoryService = new CategoryService();
    let categories = await categoryService.getCategories();
    this.categoryOptions = categories.map((item: Category, index: number) => {
      // Add default value at first position in array
      if (index === 0) {
        let value = 'default';
        let text = 'Choose category';
        return new SelectOption(value, text, true, true);
      } else {
        let value = item.name.toLowerCase();
        let text = item.name;
        return new SelectOption(value, text);
      }
    });

    this.sortOptions = new Array<SelectOption>(
      new SelectOption('default', 'Choose sort', true, true),
      new SelectOption('asc', 'Title Ascending'),
      new SelectOption('desc', 'Title Descending')
    );
  },
});
</script>
