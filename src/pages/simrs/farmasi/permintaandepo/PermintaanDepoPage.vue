<template>
  <q-page
    ref="pageRef"
    class="column full-height full-width"
    :class="!style.componentfull ? 'q-pa-md' : 'q-pa-xs'"
  >
    <div class="col-auto ">
      <PageHead
        v-if="!style.componentfull"
        :title="title"
        :subtitle="subtitle"
        :path="page.path"
      />
    </div>
    <q-card
      flat
      class="col full-width full-height"
      :style="`max-height: ${!style.componentfull ? h - 60 : h + 40}px; overflow:hidden`"
    >
      <q-scroll-area
        :style="`height: ${!style.componentfull ? h - 95 : h + 40}px; max-width: 100%;`"
        :thumb-style="thumbStyle"
        :bar-style="barStyle"
      >
        <router-view v-slot="{ Component, route }">
          <transition :name="route.meta.transition || 'fade'">
            <component :is="Component" />
          </transition>
        </router-view>
      </q-scroll-area>
    </q-card>
  </q-page>
</template>
<script setup>
import PageHead from './PageHead.vue'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useStyledStore } from 'src/stores/app/styled'

const style = useStyledStore()

const pageRef = ref()
const h = ref(0)

const thumbStyle = ref({
  right: '0px',
  borderRadius: '5px',
  backgroundColor: '#027be3',
  width: '2px',
  opacity: 0.75
})
const barStyle = ref({
  right: '0px',
  borderRadius: '9px',
  backgroundColor: '#027be3',
  width: '5px',
  opacity: 0.2
})
const page = useRoute()
const title = computed(() => {
  if (page.path === '/farmasi/permintaandepo/permintaan') {
    return 'PERMINTAAN DEPO'
  } else if (page.path === '/farmasi/permintaandepo/listpermintaan') {
    return 'LIST PERMINTAAN DEPO'
  } else {
    return 'Permintaan Depo'
  }
})
const subtitle = computed(() => {
  if (page.path === '/farmasi/permintaandepo/permintaan') {
    return 'Halaman Permintaan Obat Oleh Depo'
  } else if (page.path === '/farmasi/permintaandepo/listpermintaan') {
    return 'Halaman List Permintaan Obat Oleh Depo'
  } else {
    return 'Halaman Permintaan Obat Oleh Depo'
  }
})
onMounted(() => {
  console.log('page ', page.path)
  h.value = pageRef.value.$el.clientHeight
})

</script>
