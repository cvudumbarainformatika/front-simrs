<template>
  <q-page
    class=""
    :class="style.componentfull?'container-no-header':'container--q-header q-pa-xs'"
  >
    Struktur Organisasi
    <div>
      {{ auth }}
    </div>
  </q-page>
</template>

<script setup>
import { useStyledStore } from 'src/stores/app/styled'
import { useSatsetStore } from 'src/stores/satset/index'
import { computed, onMounted } from 'vue'
const style = useStyledStore()

const store = useSatsetStore()

const auth = computed(() => {
  return store.auth
})

onMounted(() => {
  if (auth.value === null) {
    store.getAuth()
  }
})
</script>
