<template>
  <footer class="footer mt-auto py-3 bg-light text-center">
    <div class="container">
      <span class="text-muted">{{ title }} &copy; {{ year }}</span>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Footer',
  props: {
    title: String,
  },
  data() {
    return {
      year: new Date().getFullYear(),
    };
  },
});
</script>

<style scoped>
footer {
  margin-top: 1rem !important;
}
</style>
