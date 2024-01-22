<template>
  <q-page class="bg-grey">
    <div
      class="q-pa-md q-gutter-sm bg-primary"
      style="height: 80px"
    >
      <q-avatar
        v-for="(item, i) in onlineUsers"
        :key="i"
        size="40px"
        class="overlapping"
        :style="`left: ${i * 25}px`"
      >
        <img :src="`https://cdn.quasar.dev/img/avatar${i + 1}.jpg`">
      </q-avatar>
    </div>
    <div>
      <div
        v-for="(msg, n) in chatMessages"
        :key="n"
        class="q-ma-sm"
      >
        <div
          v-if="msg !== null"
          class="bg-white q-pa-sm"
        >
          {{ msg }}
        </div>
      </div>
      <div
        v-if="txtSM !== null"
        class="q-ma-sm"
      >
        <div class="bg-white q-pa-sm">
          {{ txtSM }}
        </div>
      </div>
      <div
        v-if="typing"
        class="q-ma-sm"
      >
        <div class="bg-white q-pa-sm">
          Ada yang ngetik ...
        </div>
      </div>
    </div>
    <div class="absolute-bottom bg-primary">
      <q-input
        v-model="text"
        color="white"
        filled
        label="Label"
        @keyup.enter.prevent="coba()"
        @keydown="whisper()"
      >
        <template #prepend>
          <q-icon name="icon-mat-event" />
        </template>
      </q-input>
    </div>
  </q-page>
</template>

<script setup>
// import { api } from 'src/boot/axios'
// import { chatChannel } from 'src/modules/localsocket'
// import { useAplikasiStore } from 'src/stores/app/aplikasi'
// import { onMounted, ref } from 'vue'

// const app = useAplikasiStore()

// const onlineUsers = ref([])
// const chatMessages = ref([])
// const text = ref(null)
// const txtSM = ref(null)
// const typing = ref(false)

// chatChannel.here((users) => {
//   console.log({ users })
//   console.log('subscribed chat channel!!!')
//   onlineUsers.value = [...users]
// })
//   .joining((user) => {
//     console.log({ user }, 'joined')
//   })
//   .leaving((user) => {
//     console.log({ user }, 'leaving')
//   })
//   .listen('.chat-message', (e) => {
//     console.log('listen', e)
//     const thumb = [...chatMessages.value]
//     if (e.message !== null || e.message !== '') { thumb.push(e.message) }
//     chatMessages.value = thumb
//   })
//   .listenForWhisper('typing', (e) => {
//     console.log('whisper', e)
//     typing.value = true
//   })
//   .listenForWhisper('stop-typing', (e) => {
//     text.value = null
//     typing.value = false
//   })

// onMounted(() => {
//   coba()
// })

// async function coba() {
//   txtSM.value = text.value
//   const params = {
//     message: text.value
//   }
//   text.value = null
//   typing.value = false
//   await api.post('/v1/percobaan', params)
//     .then(resp => {
//       txtSM.value = null
//       typing.value = false
//     })
// }

// function whisper() {
//   if (text.value === null || text.value === '') {
//     chatChannel.here().whisper('stop-typing', app.user.id)
//   } else {
//     chatChannel.here().whisper('typing', app.user.id)
//   }
// }
</script>
