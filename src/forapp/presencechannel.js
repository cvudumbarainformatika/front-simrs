import { chatChannel } from 'src/modules/localsocket'
import { useAplikasiStore } from 'src/stores/app/aplikasi'
import { computed, ref } from 'vue'
// import { ref } from 'vue'

export function usePresenceChannel() {
  const auth = useAplikasiStore()

  const isAuth = computed(() => auth.user !== null || auth.user !== '')
  const onlineUsers = ref([])
  // const chatMessages = ref([])
  // const text = ref(null)
  // const txtSM = ref(null)
  // const typing = ref(false)

  const chatting = () => {
    if (isAuth.value) {
      return chatChannel.here((users) => {
      // console.log({ users })
        onlineUsers.value = [...users]
        console.log('subscribed chat channel!!!', onlineUsers.value)
      })
        .joining((user) => {
          console.log({ user }, 'joined')
        })
        .leaving((user) => {
          console.log({ user }, 'leaving')
        })
      // .listen('.chat-message', (e) => {
      //   console.log('listen', e)
      //   const thumb = [...chatMessages.value]
      //   if (e.message !== null || e.message !== '') { thumb.push(e.message) }
      //   chatMessages.value = thumb
      // })
      // .listenForWhisper('typing', (e) => {
      //   console.log('whisper', e)
      //   typing.value = true
      // })
      // .listenForWhisper('stop-typing', (e) => {
      //   text.value = null
      //   typing.value = false
      // })
    }
  }

  // return const || function
  return { chatting }
}
