<template>
  <section class="start">
    <div class="container">
      <h1>Start Page</h1>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Hero from '../components/Hero.vue';

export default defineComponent({
  name: 'Start',
  components: {
    Hero,
  },
});
</script>
