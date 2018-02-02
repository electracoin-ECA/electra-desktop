<template>
  <div class="view">
    <h1 class="headline headline--size-l">Overview</h1>
    <div class="view-content">
      <p class="paragraph paragraph--type-primary">
        Balance: <strong>{{ walletStatus.balance }}</strong><br>
        Stake: <strong>{{ walletStatus.stake }}</strong><br>
        Connections: <strong>{{ networkStatus.connections }}</strong><br>
        Circulating supply: <strong>{{ networkStatus.moneysupply }}</strong><br>
        Your weight: <strong>{{ stakingStatus.weight }}</strong></br>
        Network weight: <strong> {{ stakingStatus.netstakeweight }}</strong></br>
        Expected time to earn reward : <strong> {{ expectedTime }}</strong></br>
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
      },
      stakingStatus() {
        return this.$store.getters.stakingStatus
      },
      expectedTime() {
        let expectedtime = this.stakingStatus.expectedtime
        if (expectedtime < 60)
        {
          expectedtime = `${expectedtime} second(s)`
        }
        else if (expectedtime < 60*60)
        {
          expectedtime = `${expectedtime/60} minute(s)`
        }
        else if (expectedtime < 24*60*60)
        {
          expectedtime = `${expectedtime/(60*60)} hour(s)`
        }
        else
        {
          expectedtime = `${expectedtime/(60*60*24)} day(s)`
        }
        return parseInt(expectedtime, 10)
      }
    }
  }
</script>

<style scoped lang="stylus">

</style>
