<template>
  <div class="thread-section">
    <div class="thread-count">
      <i class="icon-people"></i>
      <h3>
        总人数: {{ count }}
      </h3>
    </div>
    <ul class="thread-list">
      <thread
        v-for="thread in threads"
        :key="thread.id"
        :thread="thread"
        :active="thread.id === currentThread.id"
        @switch-thread="switchThread">
      </thread>
      <user-list></user-list>
    </ul>
  </div>
</template>

<script lang="ts">
/// <reference path="../../socket.io.d.ts" />

import Thread from './Thread.vue'
import UserList from './UserList.vue'
import { mapGetters } from 'vuex'


export default {
  name: 'ThreadSection',
  components: { Thread, UserList },
  data(): any {
    return {
      count: ''
    }
  },
  computed: {
    ...mapGetters([
      'threads',
      'currentThread'
    ])
  },
  methods: {
    switchThread (id: string): void{
      this.$store.dispatch('switchThread', { id })
    },
    socketEvent(): void {
      socket.on('transferUserNumber', (data: any) => {
        const count = data.count
        this.$store.dispatch('updateUserNumber', {
          count: count
        })
      })
      socket.on('updateUserNumber', (data: any) => {
        const count = data.count
        this.$store.dispatch('updateUserNumber', {
          count: count
        })
      })
    }
  },
  created() {
    this.socketEvent()
  },
  beforeMount() {
    if (this.$store.state.userCount === 0) {
      this.$router.push({ path: '/' })
    }
  }
}
</script>
<style lang="scss" scoped>
    i.icon-people {
        width: 26.4px;
        height: 26.4px;
        background: url('../assets/people.svg') no-repeat;
        background-size: contain;
        float: left;
        margin-right: 9px;
    }
</style>