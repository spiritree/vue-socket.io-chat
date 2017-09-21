<template>
  <div class="message-section">
    <i class="icon-chatrooms"></i>
    <h3 class="message-thread-heading">{{ thread.name }}</h3>
    <ul class="message-list" ref="list">
      <message
        v-for="message in sortedMessages"
        :key="message.id"
        :message="message">
      </message>
    </ul>
    <textarea class="message-composer" @keyup.enter="sendMessage"></textarea>
  </div>
</template>

<script>
import Message from './Message.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'MessageSection',
  components: { Message },
  computed: {
    ...mapGetters({
      thread: 'currentThread',
      messages: 'currentMessages'
    }),
    sortedMessages () {
      return this.messages
        .slice()
        .sort((a, b) => a.timestamp - b.timestamp)
    },
  },
  watch: {
    'thread.lastMessage': function () {
      this.$nextTick(() => {
        const ul = this.$refs.list
        ul.scrollTop = ul.scrollHeight
      })
    }
  },
  methods: {
    sendMessage (e) {
      const text = e.target.value
      if (text.trim()) {
        this.$store.dispatch('sendMessage', {
          text,
          thread: this.thread,
          userName: localStorage.name
        })
        e.target.value = ''
      }
    }
  },
  mounted() {
    
  }
}
</script>
<style lang="scss" scoped>
    textarea {
        border: 1px solid #ccf;
        resize: none;
    }
    i.icon-chatrooms {
        width: 26.4px;
        height: 26.4px;
        background: url('../assets/chatrooms.svg') no-repeat;
        background-size: contain;
        float: left;
        margin-right: 9px;
    }
</style>
