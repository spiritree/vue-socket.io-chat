<template>
  <div class="thread-section">
    <div class="thread-count">
      <span v-show="">
        Unread threads: {{  }}
      </span>
    </div>
    <ul class="thread-list">
      <thread></thread>
    </ul>
  </div>
</template>

<script>
import Thread from './Thread.vue'

export default {
  name: 'ThreadSection',
  components: { Thread },
  computed: {
  },
  methods: {

  }
}
</script>
