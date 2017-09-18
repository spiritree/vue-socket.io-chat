<style src="../css/chatroom.css"></style>

<template>
  <div class="chatapp">
    <thread-section></thread-section>
    <message-section></message-section>
    <Modal
        v-model="modal1"
        title="请输入昵称"
        @on-ok="ok"
        :loading="loading"
        >
        <Form ref="formItem" :model="formItem" label-position="right" :rules="rule" :label-width="80">
          <FormItem label="名称" prop="name">
            <Input v-model="formItem.name" placeholder="请输入昵称"></Input>
          </FormItem>
        </Form>
    </Modal>
  </div>
</template>

<script>
import ThreadSection from './ThreadSection.vue'
import MessageSection from './MessageSection.vue'

export default {
  name: 'App',
  components: {
    ThreadSection,
    MessageSection
  },
  data() {
    return {
      modal1: true,
      loading: true,
      formItem: {
        name: ''
      },
      rule: {
        require: true
      }
    }
  },
  methods: {
    ok() {
      if (this.formItem.name === '') {
        this.$Message.error('请输入昵称')
        this.loading = false
        this.$nextTick(() => {
          this.loading = true
        })
      } else {
        const userName = this.formItem.name
        const userNo = this.$store.state.userName.length
        this.$store.dispatch('addUserName', {
          userName,
        })
        this.$store.dispatch('addUserNumber')
        this.modal1 = false
      }
    }
  }
}
</script>
