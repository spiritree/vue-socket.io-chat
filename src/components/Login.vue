<template>
  <transition>
    <div id="login">
      <h2>请输入您的名字</h2>
      <input @keyup.enter="login" v-model.trim="name" type="text" autofocus>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      name: ''
    }
  },
  methods: {
    login() {
      if(this.name === '') {
        return
      }
      const userName = this.name
      this.$store.dispatch('addUserName', {
        userName
      })
      this.$store.dispatch('addUserNumber')
      localStorage.name = this.name
      this.$router.push('chat')
    }
  }
}
</script>

<style lang="scss" scoped>
    $vue-black-color: #2c3e50;
    $vue-color: #42b983;
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
        color: $vue-color;
        border: none;
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
        color: $vue-black-color;
        border-bottom: 1px solid $vue-black-color;
        text-align: center;
        font-size: 2rem;
        letter-spacing: 2px;
    }
</style>
