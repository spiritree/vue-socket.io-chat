<template>
  <li
    class="thread-list-item"
    :class="{ active: active }"
    @click="$emit('switch-thread', thread.id)">
    <h5 class="thread-name">{{  }}</h5>
    <div class="thread-time">
      {{ }}
    </div>
    <div class="thread-last-message">
      {{  }}
    </div>
  </li>
</template>

<script>
export default {
  name: 'Thread',
  props: {
    thread: Object,
    active: Boolean
  }
}
</script>
