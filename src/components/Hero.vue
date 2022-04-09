<template>
  <div class="container col-xxl-8 px-4 py-5">
    <div class="row flex-lg-row-reverse align-items-center g-5 py-5">
      <div class="col-10 col-sm-8 col-lg-6">
        <img
          src="https://picsum.photos/id/11/700/500"
          class="d-block mx-lg-auto img-fluid"
          alt="Bootstrap Themes"
          width="700"
          height="500"
          loading="lazy"
        />
      </div>
      <div class="col-lg-6">
        <h1 class="display-5 fw-bold lh-1 mb-3">{{ heading }}</h1>
        <p class="lead">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam a leo
          odio. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
          posuere cubilia curae; Mauris cursus ligula eu neque aliquet, ut
          cursus dolor ultrices. Fusce quis nulla ultrices, pharetra erat vitae,
          semper felis. Nam id leo ex. Mauris vehicula maximus dui, non posuere
          quam fermentum auctor.
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Hero',
  props: {
    heading: String,
  },
});
</script>
