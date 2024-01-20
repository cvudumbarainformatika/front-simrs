<template>
  <q-page>
    <!-- <app-middlware /> -->
    Halaman Pegawai
    <div
      v-for="n in 60"
      :key="n"
    >
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatum quasi non cum harum soluta nam reprehenderit velit officiis obcaecati nostrum, id suscipit quod eum a at enim? Id, ipsum tenetur.
    </div>
  </q-page>
</template>
<script setup>
import { laravelEcho } from 'src/modules/newsockets'
import { onMounted, ref } from 'vue'

const usersOnline = ref([])

onMounted(() => {
  subscribedChannel()
})

function subscribedChannel() {
  const channel = laravelEcho.join('presence.chat.simpeg')

  // socket.value = channel

  channel.here((users) => {
    usersOnline.value = [...users]
    console.log('subscribed simpeg channel')
  })
    .joining((user) => {
      console.log({ user }, 'joined')
      usersOnline.value.push(user)
    })
    .leaving((user) => {
      console.log({ user }, 'leaving')
      usersOnline.value = usersOnline.value.filter(x => x.id !== user.id)
      console.log('usersOnline', usersOnline.value)
    })
}

</script>
