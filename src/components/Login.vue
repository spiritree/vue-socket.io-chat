<template>
  <transition name="fade">
    <div id="login">
      <i class="icon-chat"></i>
      <h2>请输入您的名字</h2>
      <input @keyup.enter="login" v-model.trim="name" type="text" autofocus>
    </div>
  </transition>
</template>

<script lang="ts">
/// <reference path="../../socket.io.d.ts" />

import Vue from 'vue'

interface Data {
  name: string
}

export default Vue.extend({
  name: 'login',
  data(): Data {
    return {
      name: '',
    }
  },
  methods: {
    login(): void {
      if(this.name === '') {
        return
      }
      const name: string = this.name
      let userNameList: Array<any> = []
      userNameList.push(name)
      this.$store.dispatch('updateUserNameList', {
        userNameList: userNameList
      })
      this.$store.dispatch('addUserNumber')
      localStorage.name = this.name
      socket.emit('login', localStorage.name)
      // localStorage存数组
      // localStorage.setItem('userNameList', JSON.stringify(userNameList))
      this.$router.push({ path:'chat' })
    }
  },
  mounted() {
  }
})
</script>

<style lang="scss" scoped>
    $purple-color: #5e63b6;
    $purple-dark-color: #27296D;
    #login {
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #fff;
        color: $purple-color;
        border: none;
    }
    i.icon-chat {
        width: 60px;
        height: 60px;
        background: url('../assets/chat.svg') no-repeat;
        background-size: contain;
        margin-bottom: 30px;
    }
    h2 {
        font-weight: 400;
        font-size: 1.5em;
        letter-spacing: 1px;
    }
    input {
        width: 300px;
        padding: 5px 10px;
        margin-top: 10px;
        background-color: #fff;
        color: $purple-dark-color;
        border-bottom: 1px solid $purple-dark-color;
        text-align: center;
        font-size: 2rem;
        letter-spacing: 2px;
    }
    .fade-enter-active, .fade-leave-active {
      transition: opacity .5s
    }
    .fade-enter, .fade-leave-to {
      opacity: 0
    }
</style>
