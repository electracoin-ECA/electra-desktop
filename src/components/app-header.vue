<template>
  <div class="app-header">
    <div class="electra-logo">
      <img src="assets/images/electra-logo.png" alt="">
    </div>
    <div class="status-bar">
      <div class="status-item">
        <div class="status-item__label label label--type-status">
          ONLINE
        </div>
        <div class="status-item__icon">
          <icon v-if="networkStatus.connections > 0" icon="circle" width="11" height="11" class="icon active"></icon>
          <icon v-else icon="circle-o" width="11" height="11" class="icon"></icon>
        </div>
      </div>
      <div class="status-item">
        <div class="status-item__label label label--type-status">
          SYNC
        </div>
        <div class="status-item__icon">
          <icon icon="check" width="11" height="11" class="icon active"></icon>
        </div>
      </div>
      <div class="status-item">
        <div class="status-item__label label label--type-status">
          STAKING
        </div>
        <div class="status-item__icon">
          <icon v-if="stakingStatus.netstakeweight > 0" icon="circle" width="11" height="11" class="icon active"></icon>
          <icon v-else icon="circle-o" width="11" height="11" class="icon"></icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import '../icons/circle-o'
  import '../icons/circle'
  import '../icons/check'
  export default {
    computed: {
      networkStatus() {
        return this.$store.getters.networkStatus
      },
      stakingStatus() {
        return this.$store.getters.stakingStatus
      }
    },
    mounted() {
      this.$store.dispatch('update-staking-state')
    }
  }
</script>

<style scoped lang="stylus">
  electra-logo_padding = 0 15px

  status-bar_padding = 0 15px
  
  status-item_padding = 0 7px
  status-item__label_color = rgba(255,255,255,0.8)
  status-item__icon_color = #fff
  status-item__icon_opacity = 0.5
  status-item__icon--active_opacity = 1
  
  .app-header
    display flex
    width 100%
    height 100%
    
    .electra-logo 
      display flex
      width auto
      height 100%
      padding electra-logo_padding
      
      img 
        width auto
        height 55%
        margin auto 0
        
    .status-bar 
      display flex
      height 100%
      padding status-bar_padding
      
  .status-item
    position relative
    top -2px
    margin auto 0
    padding status-item_padding
    
    &__label
      display inline-block
      color status-item__label_color
      
    &__icon
      display inline-block
      margin-left 5px
      color status-item__icon_color
      
      .icon
        opacity status-item__icon_opacity       
        &.active
          opacity status-item__icon--active_opacity

  </style>