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
import { useAplikasiStore } from 'src/stores/app/aplikasi'
import { onMounted, ref } from 'vue'

const app = useAplikasiStore()

const onlineUsers = ref([])
const chatMessages = ref([])
const text = ref(null)
const txtSM = ref(null)
const typing = ref(false)

console.log(app.user)

function updatePost() {
  const socket = new WebSocket('ws://localhost:6003/app/simrs_key_harry141312?protocol=7&client=js&version=7.4.0&flash=false/socket/update-post')

  socket.onopen = function(e) {
    console.log('socket open', e)
  }
}

onMounted(() => {
  updatePost()
})
</script>
