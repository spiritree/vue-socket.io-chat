<template>
  <div class="chatapp">
    <thread-section></thread-section>
    <message-section></message-section>
  </div>
</template>

<script lang="ts">
/// <reference path="../../socket.io.d.ts" />

import ThreadSection from './ThreadSection.vue'
import MessageSection from './MessageSection.vue'

export default {
  name: 'Chat',
  components: {
    ThreadSection,
    MessageSection
  }
}
</script>

<style lang="scss">
@import "../style/chatroom.scss"
</style>