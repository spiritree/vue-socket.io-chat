<template>
  <div id="app">

    <!-- <keep-alive> -->
      <router-view></router-view>
    <!-- </keep-alive> -->

  </div>

</template>

<script lang="ts">
/// <reference path="../../socket.io.d.ts" />

import Login from './Login.vue'
import Chat from './Chat.vue'

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