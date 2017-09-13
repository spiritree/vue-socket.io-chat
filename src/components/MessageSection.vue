<template>
  <div class="message-section">
    <h3 class="message-thread-heading">{{  }}</h3>
    <ul class="message-list" ref="list">
      <message></message>
    </ul>
    <textarea class="message-composer" @keyup.enter="sendMessage"></textarea>
  </div>
</template>

<script>
import Message from './Message.vue'

export default {
  name: 'MessageSection',
  components: { Message },
  computed: {
  },
  watch: {
  },
  methods: {
    sendMessage() {
      console.log('send')
    }
  }
}
</script>
