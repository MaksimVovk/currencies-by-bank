<template>
  <div class="main">
    <template v-for="a in api">
      <Block
        :key="`block-${a.id}`"
        :value="a"
      />
    </template>
  </div>
</template>

<script>
  import Block from './components/Block'

  export default {
    components: { Block },
    data () {
      return {

      }
    },
    computed: {
      api () {
        return [
          {
            id: 1,
            url: 'http://currencies.fin-hub.online/exchange-rates',
            type: 'post',
            headers: {
              token: 'XXXX',
              tokenName: 'x-auth-token'
            },
            body: [
              { key: 'bank_id', value: 4 },
              { key: 'date', value: '2022-02-06' },
            ]
          }
        ]
      }
    }
  }
</script>

<style lang="scss">
  @import './styles/reset';
  body,
  html {
    background-color: #d6dee8;
    font-family: monospace;
  }
</style>
