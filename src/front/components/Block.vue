<template>
  <div class="block">
    <Endpoint
      :url="value.url"
      :type="value.type"
    />
  </div>
</template>

<script>
  import Endpoint from './Endpoint.vue'

  export default {
    components: { Endpoint },
    props: {
      value: { type: Object, required: true },
    }
  }
</script>

<style lang="scss">
  .block {
    background-color: #fff;
    width: 80%;
    display: flex;
    margin: auto;
    padding: 20px;
    border-radius: 10px;
    box-sizing: border-box;
  }
</style>
