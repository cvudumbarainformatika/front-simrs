<template>
  <router-view />
</template>

<script setup>
// import { onMounted } from 'vue'
import { useQuasar } from 'quasar'

import customIcons from 'src/custom-icons/custom-icons'

const $q = useQuasar()
$q.dark.set(false)
$q.iconSet.set(customIcons)
document.body.setAttribute(['data-theme'], 'custom')
</script>
