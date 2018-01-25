<template>
  <div class="app-sidebar">
    <div v-for="route in routes">
      <router-link class="menu-item" :to="route.path" exact>
        <div class="menu-item__icon">
          <icon :icon="route.icon" width="14" height="14"></icon>
        </div>
        <div class="menu-item__label">
          {{ route.name }}
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
  import '../icons/desktop'
  import '../icons/upload'
  import '../icons/download'
  import '../icons/rocket'
  import '../icons/book'

  const routes = [
    {
      name: 'Overview',
      path: '/',
      icon: 'desktop'
    },
    {
      name: 'Send ECA',
      path: '/send',
      icon: 'upload'
    },
    {
      name: 'Receive ECA',
      path: '/receive',
      icon: 'download'
    },
    {
      name: 'Transactions',
      path: '/transactions',
      icon: 'rocket'
    },
    {
      name: 'Address Book',
      path: '/address-book',
      icon: 'book'
    }
  ]
  export default {
    data() {
      return {
        routes
      }
    }
  }
</script>

<style scoped lang="stylus">
  sidebar_padding = 25px 0
  
  menu-item_width = 80%
  menu-item_height = 40px
  menu-item_padding = 0 20px
  menu-item_color = rgba(255,255,255,0.7)
  menu-item_border-width = 0px
  menu-item_border-color = transparent
  menu-item_border-radius = 20px
  menu-item_font-weight = 500
  menu-item_line-height = 40px
  
  menu-item--active_color = #fff
  menu-item--active_background-color = rgba(0,0,0,0.1)
  
  menu-item__label_font-size = 14px
  
  menu-item__icon_width = 30px
  
  
  .app-sidebar
    width 100%
    height 100%
    padding sidebar_padding
    box-sizing border-box
    
  .menu-item
    display flex
    box-sizing border-box
    position relative
    width menu-item_width
    height menu-item_height
    margin 0 auto
    padding menu-item_padding
    border-radius menu-item_border-radius
    border-color menu-item_border-color
    border-width menu-item_border-width
    margin-bottom 3px
    color menu-item_color
    font-weight menu-item_font-weight
    line-height menu-item_line-height
    text-decoration none
    transition all 200ms ease
    
    &.router-link-active
      color menu-item--active_color
      background menu-item--active_background-color
    
    &__icon
      display inline-block
      position relative
      top -2px
      width menu-item__icon_width
    &__label
      display inline-block
      flex 1
      font-size menu-item__label_font-size

</style>