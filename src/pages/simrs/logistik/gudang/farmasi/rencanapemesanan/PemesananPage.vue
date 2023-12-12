<template>
  <q-page
    ref="pageRef"
    class="column full-height full-width"
    :class="!style.componentfull?'q-pa-xs':'q-pa-xs'"
  >
    <div class="col-auto">
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
      :style="`max-height: ${!style.componentfull? h:h+40}px;`"
    >
      <q-scroll-area
        :style="`height: ${!style.componentfull? h-70:h+40}px; max-width: 100%;`"
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
// eslint-disable-next-line no-unused-vars
const title = computed(() => {
  if (page.path === '/gudang/farmasi/rencanapemesanan/rencana') {
    return 'RENCANA'
  } else if (page.path === '/gudang/farmasi/rencanapemesanan/listrencanapesanan') {
    return 'LIST RENCANA PEMESANAN'
  } else {
    return 'Rencana'
  }
})
// eslint-disable-next-line no-unused-vars
const subtitle = computed(() => {
  if (page.path === '/gudang/farmasi/rencanapemesanan/rencana') {
    return 'Rencana Pemesanan Obat'
  } else if (page.path === '/gudang/farmasi/rencanapemesanan/listrencanapesanan') {
    return 'Pemesanan Obat'
  } else {
    return 'Halaman Pemesanan Obat'
  }
})
onMounted(() => {
  console.log('page ', page.path)
  h.value = pageRef.value.$el.clientHeight
})

</script>
