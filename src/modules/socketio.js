import { reactive } from 'vue'
import { io } from 'socket.io-client'
import { useAplikasiStore } from 'src/stores/app/aplikasi'

const auth = useAplikasiStore()

export const state = reactive({
  connected: false,
  status_user: [],
  user: auth.user ? auth.user.id : null
  // fooEvents: [],
  // barEvents: []
})

// "undefined" means the URL will be computed from the `window.location` object
// const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:3000'
const URL = 'http://localhost:6006'

export const socket = io(URL, { query: { user_id: state.user } })

socket.on('connect', () => {
  state.connected = true
})

socket.on('disconnect', () => {
  state.connected = false
})

socket.on('user_connected', (data) => {
  state.status_user.push(data)
})
socket.on('user_disconnected', (data) => {
  const index = state.status_user.indexOf(data)
  if (index > -1) { // only splice array when item is found
    state.status_user.splice(index, 1) // 2nd parameter means remove one item only
  }
})

// socket.on('foo', (...args) => {
//   state.fooEvents.push(args)
// })

// socket.on('bar', (...args) => {
//   state.barEvents.push(args)
// })
