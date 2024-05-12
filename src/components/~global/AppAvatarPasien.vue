<template>
  <q-img
    :src="foto"
    :ratio="withRatio ? ratio : null"
    :width="width"
    style="max-width: 100%;"
  />
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  width: { type: String, default: '60px' },
  pasien: { type: Object, default: null },
  ratio: { type: String, default: '1' },
  withRatio: { type: Boolean, default: false }
})

const foto = computed(() => {
  const perempuan = props.pasien ? props.pasien?.kelamin === 'Perempuan' || props.pasien?.kelamin === 'perempuan' : false
  const usia = props.pasien?.usia
  const usiath = usia ? parseInt(usia.substring(0, 2)) : 25
  if (perempuan) {
    if (usiath <= 99 && usiath > 59) {
      // return new URL('../../assets/images/grandma.png', import.meta.url).href
      return new URL('../../assets/avatar/Grandma.jpg', import.meta.url).href
    } else if (usiath <= 59 && usiath > 25) {
      // return new URL('../../assets/images/user-girl.svg', import.meta.url).href
      return new URL('../../assets/avatar/Woman.jpg', import.meta.url).href
    } else if (usiath <= 25 && usiath > 15) {
      // return new URL('../../assets/images/user-girl2.svg', import.meta.url).href
      return new URL('../../assets/avatar/YoungGirl.jpg', import.meta.url).href
    } else if (usiath <= 15 && usiath > 5) {
      return new URL('../../assets/avatar/Childgirl.jpg', import.meta.url).href
    } else if (usiath <= 5 && usiath >= 0) {
      return new URL('../../assets/avatar/Baby.jpg', import.meta.url).href
    } else {
      return new URL('../../assets/images/user-girl3.svg', import.meta.url).href
    }
  } else {
    if (usiath <= 99 && usiath > 59) {
      return new URL('../../assets/avatar/Granpa.jpg', import.meta.url).href
      // return new URL('../../assets/images/grandpa.svg', import.meta.url).href
    } else if (usiath <= 59 && usiath > 25) {
      return new URL('../../assets/avatar/Man.jpg', import.meta.url).href
      // return new URL('../../assets/images/user-man2.svg', import.meta.url).href
    } else if (usiath <= 25 && usiath > 15) {
      return new URL('../../assets/avatar/Youngman.jpg', import.meta.url).href
      // return new URL('../../assets/images/user-man.svg', import.meta.url).href
    } else if (usiath <= 15 && usiath > 5) {
      return new URL('../../assets/avatar/Childman.jpg', import.meta.url).href
    } else if (usiath <= 5 && usiath >= 0) {
      return new URL('../../assets/avatar/Baby.jpg', import.meta.url).href
    } else {
      return new URL('../../assets/images/actor.svg', import.meta.url).href
    }
  }
})
</script>
