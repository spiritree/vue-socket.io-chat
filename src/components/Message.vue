<template>
  <li class="message-list-item">
    <h5 class="message-author-name">{{  }}</h5>
    <div class="message-time">
      {{  }}
    </div>
    <div class="message-text">{{  }}</div>
  </li>
</template>

<script>
export default {
  name: 'Message',
  props: {
    message: Object
  }
}
</script>
