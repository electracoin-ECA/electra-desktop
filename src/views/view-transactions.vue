<template>
  <div class="view">
    <h1 class="headline headline--size-l">Transactions</h1>
    <div class="view-content">
      <!-- <div v-for="tx in transactions">
        {{ tx.category }} - {{ tx.amount }} - {{ tx.txid }} - {{ tx.account }}
      </div> -->
      <p class="paragraph paragraph--type-primary">Coming soon.</p>
    </div>
  </div>
</template>

<script>
  export default {
    computed: {
      transactions() {
        return this.$store.getters.transactions
      }
    },
    mounted() {
      this.$store.dispatch('update-transactions')
    }
  }
</script>

<style scoped lang="stylus">

</style>