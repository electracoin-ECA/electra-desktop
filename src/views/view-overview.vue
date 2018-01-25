<template>
  <div class="view">
    <h1 class="headline headline--size-l">Overview</h1>
    <div class="view-content">
      <p class="paragraph paragraph--type-primary">
        Balance: <strong>{{ walletStatus.balance }}</strong><br>
        Stake: <strong>{{ walletStatus.stake }}</strong><br>
        Connections: <strong>{{ networkStatus.connections }}</strong><br>
        Circulating supply: <strong>{{ networkStatus.moneysupply }}</strong><br>
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    computed: {
      walletStatus() {
        return this.$store.getters.walletStatus
      },
      networkStatus() {
        return this.$store.getters.networkStatus
      }
    }
  }
</script>

<style scoped lang="stylus">

</style>