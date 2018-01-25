<template>
  <div class="app">
    <header>
      <app-header></app-header>
    </header>    
    <div class="wrapper">
      <nav>
        <app-sidebar></app-sidebar>
      </nav>
      <main>
        <transition name="fade" mode="out-in" :duration="100" appear>
          <router-view></router-view>
        </transition>
      </main>
    </div>    
  </div>
</template>

<script>
  import AppHeader from './components/app-header'
  import AppSidebar from './components/app-sidebar'
  export default {
    components: {
      'app-header': AppHeader,
      'app-sidebar': AppSidebar
    },
    mounted() {
      // update wallet state every two seconds (temporary solution for keeping wallet state synced via rpc)
      setInterval(() => {
        this.$store.dispatch('update-wallet-state')
      }, 2000)
    }
  }
</script>

<style lang="stylus">
  @import './assets/css/reset.css'
  @import './assets/css/fonts.css'
    

  /*************
    VARS
  *************/ 

  // base settings / layout
  app_font-family = Roboto
  app_background-color = rgba(115,5,145,1)

  app__header_height = 50px
  app__header_background-color = transparent
  app__header_border-width = 1px
  app__header_border-color = rgba(0,0,0,0.08)

  app__sidebar_width = 250px
  app__sidebar_background-color = transparent
  app__sidebar_border-width = 1px
  app__sidebar_border-color = rgba(0,0,0,0.08)

  app__view_padding = 30px
  app__view_line-height = 24px

  // button
  button_border-radius = 30px
  button_padding = 10px 15px

  // button type primary
  button--type-primary_color = #fff
  button--type-primary_border-width = 2px
  button--type-primary_background-color = #ec03ef
  button--type-primary_border-color = transparent

  // button type secondary
  button--type-secondary_color = #fff
  button--type-secondary_border-width = 2px
  button--type-secondary_background-color = rgba(0,0,0,0.1)
  button--type-secondary_border-color = rgba(255,255,255,0.5)


  // input
  input_color = #fff
  input_background-color = rgba(0,0,0,0.03)
  input_border-color = rgba(255,255,255,0.25)
  input_border-radius = 30px
  input_padding = 10px 15px
  input_font-weight = 500
  input__placeholder_color = rgba(255,255,255,0.6)
  input__placeholder_font-weight = 300


  // headline 
  headline_color = #fff

  // headline h1
  headline--size-l_font-size = 24px
  headline--size-l_font-weight = 900
  headline--size-l_margin-bottom = 25px

  // headline h2
  headline--size-m_font-size = 18px
  headline--size-m_font-weight = 700
  headline--size-m_margin-bottom = 15px

  // headline h3
  headline--size-s_font-size = 14px
  headline--size-s_font-weight = 500
  headline--size-s_margin-bottom = 8px


  // label 
  label_font-weight = 300
  label__span_font-weight = 500
  label__span_color = #fff

  // label type input
  label--type-input_font-size = 15px
  label--type-input_color = #fff

  // label type view
  label--type-view_font-size = 14px
  label--type-view_top = 35px
  label--type-view_right = 30px
  label--type-view_color = rgba(255,255,255,0.9)
  label--type-view_font-weight = 300

  // label type status
  label--type-status_font-size = 12px
  label--type-status_font-weight = 300
  label--type-status_color = rgba(255,255,255,0.8)


  //paragraph
  parapgraph_font-weight = 400

  // label type primary
  parapgraph--type-primary_font-weight = 300
  parapgraph--type-primary_color = rgba(255,255,255,0.95)
  
  // strong tags within paragraph
  parapgraph__strong_font-weight = 500


  /*************
    BASE
  *************/ 

  html, body, .app
    width 100%
    height 100%

  .app
    background app_background-color
    display flex
    flex-direction column
    font-family app_font-family
    overflow hidden
    
  header  
    height app__header_height
    border-bottom app__header_border-width solid app__header_border-color
    background app__header_background-color
    
  .wrapper
    flex 1
    display flex

    nav
      width app__sidebar_width
      min-width app__sidebar_width
      background app__sidebar_background-color
      border-right app__sidebar_border-width solid app__sidebar_border-color
      
    main 
      flex 1
      
  .view
    padding app__view_padding 
    box-sizing border-box
    width 100%
    position relative
    line-height app__view_line-height
  


  /*************
    TYPOGRAPHY
  *************/ 

  // headlines
  .headline
    color headline_color!important
    &--size
      &-l
        font-size headline--size-l_font-size
        font-weight headline--size-l_font-size
        margin-bottom headline--size-l_margin-bottom
        text-transform uppercase
      &-m
        font-size headline--size-m_font-size
        font-weight headline--size-m_font-size
        margin-bottom headline--size-m_margin-bottom
      &-s
        font-size headline--size-s_font-size
        font-weight headline--size-s_font-size
        margin-bottom headline--size-s_margin-bottom
        text-transform uppercase


  // labels
  .label
    font-weight label_font-weight

    &--type
      &-input
        font-size label--type-input_font-size
        color label--type-input_color
      &-view
        position absolute
        top label--type-view_top 
        right label--type-view_right
        color label--type-view_color
        font-size label--type-view_font-size
        font-weight label--type-view_font-weight
      &-status
        color label--type-status_color
        font-size label--type-status_font-size
        font-weight label--type-status_font-weight
        
    span
      font-weight label__span_font-weight


  // paragraphs
  p.paragraph
    &--type
      &-primary
        font-weight parapgraph--type-primary_font-weight
        color parapgraph--type-primary_color
      
    strong 
      font-weight parapgraph__strong_font-weight


  /*************
    ANIMATIONS
  *************/ 

  // view transition: fade
  .fade-enter
    opacity 0
  .fade-enter-active
    -webkit-transition 200ms opacity ease
  .fade-leave-active
    opacity 0
    -webkit-transition 100ms opacity ease

  // view transition: scale-enter
  .scale-enter
    opacity 0
    transform scale(0.2)
  .scale-enter-active
    transition 250ms all ease
  .scale-leave-active
    opacity 0
    transform scale(0.2)
    transition 100ms all ease
    
  // keyframe animations  
  @keyframes spin
    0%
      transform rotate(0deg)
    50%
      transform rotate(180deg)
    100%
      transform rotate(360deg)

  // helper classes
  .animation--name-spin
    animation spin linear infinite
    


  /*************
    BUTTON
  *************/ 
  .button 
    padding button_padding
    background button_background-color
    border-radius button_border-radius
    box-sizing border-box
    transition opacity 200ms ease
    
    &.disabled
      pointer-events none
      cursor not-allowed!important 
      opacity 0.3 
    
    &:hover
      cursor pointer
      opacity 0.8
      
    &--type
      &-primary 
        color button--type-primary_color
        background button--type-primary_background-color
        border button--type-primary_border-width solid button--type-primary_border-color
      &-secondary 
        color button--type-secondary_color
        background button--type-secondary_background-color
        border button--type-secondary_border-width solid button--type-secondary_border-color
        


  /*************
    INPUT
  *************/ 
  .input
    width 100%
    display flex
    margin-top 5px
    
    input 
      flex 1
      background input_background-color
      border-radius input_border-radius 
      border 2px solid rgba(255,255,255,0.25)
      padding input_padding
      font-weight input_font-weight
      color input_color
      box-sizing border-box
      
      &::placeholder 
        color input__placeholder_color
        font-weight input__placeholder_font-weight
</style>


