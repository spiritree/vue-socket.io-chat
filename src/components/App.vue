<style src="../css/chatroom.css"></style>

<template>
  <div class="chatapp">
    <thread-section></thread-section>
    <message-section></message-section>
    <Modal
        v-model="modal1"
        title="请输入你的昵称"
        @on-ok="ok"
        @on-cancel="cancel">
        <Form :model="formItem" label-position="right" :label-width="80">
          <FormItem label="名称">
            <Input v-model="formItem.name" placeholder="请输入"></Input>
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
      formItem: {
        name: ''
      }
    }
  },
  methods: {
    ok() {
      console.log('ok');
    },
    cancel() {
    }
  }
}
</script>
