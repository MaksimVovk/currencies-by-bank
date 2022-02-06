<template>
  <div class="endpoint">
    <div class="endpoint__type">
      {{ type }}
    </div>
    <div class="endpoint__url">
      {{ url }}
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      url: { type: String, required: true },
      type: { type: String, required: true },
    }
  }
</script>

<style lang="scss">
  .endpoint {
    // background-color: #f2f0b6;
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 10px;
    align-items: center;
    &__type {

    }
    &__rule {
      
    }
  }
</style>