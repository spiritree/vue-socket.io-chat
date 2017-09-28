<template>
  <div id="app">

    <!-- <keep-alive> -->
      <router-view></router-view>
    <!-- </keep-alive> -->

  </div>

</template>

<script>

import Login from './Login'
import Chat from './Chat'

export default {
  name: 'app',
  components: {
    Login,
    Chat
  },
  
}
</script>

<style lang="scss">
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: none;
    border: none;
  }

  html, body {
    height: 100%;
    width: 100%;
    overflow: hidden;
  }

  ul::-webkit-scrollbar {
    display: none
  }
</style>