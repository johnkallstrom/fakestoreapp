<template>
  <div class="col">
    <div class="card h-100">
      <div class="row g-0">
        <div class="col-md-4 p-3">
          <img :src="image" class="img-fluid rounded-start" />
        </div>
        <div class="col-md-8 p-3">
          <div class="card-body">
            <h5 class="card-title">{{ title }}</h5>
            <p class="card-text">{{ text }}</p>
            <p class="card-text">
              {{ currencyText }} <span v-show="showCurrencySymbol">&#36;</span>
            </p>
            <p class="card-text fw-bold">{{ subTitle }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Card',
  props: {
    title: String,
    text: String,
    subTitle: String,
    currencyText: String,
    image: String,
  },
  computed: {
    showCurrencySymbol(): boolean {
      return this.currencyText !== undefined;
    },
  },
});
</script>
