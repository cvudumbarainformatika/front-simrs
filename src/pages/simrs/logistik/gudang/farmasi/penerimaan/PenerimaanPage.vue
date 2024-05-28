<template>
  <q-page
    ref="pageRef"
    class="column full-height full-width"
    :class="!style.componentfull ? 'q-pa-xs' : 'q-pa-xs'"
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
  width: '4px',
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
  if (page.path === '/gudang/farmasi/penerimaan/penerimaan') {
    return 'LIST PEMESANAN'
  }
  else if (page.path === '/gudang/farmasi/penerimaan/penerimaanlangsung') {
    return 'PENERIMAAN LANGSUNG'
  }
  else if (page.path === '/gudang/farmasi/penerimaan/listpenerimaan') {
    return 'LIST PENERIMAAN'
  }
  else if (page.path === '/gudang/farmasi/penerimaan/pemfakturan') {
    return 'PEMFAKTURAN'
  }
  else {
    return 'Penerimaan'
  }
})
const subtitle = computed(() => {
  if (page.path === '/gudang/farmasi/penerimaan/penerimaan') {
    return 'Penerimaan Obat'
  }
  else if (page.path === '/gudang/farmasi/penerimaan/penerimaanlangsung') {
    return 'Penerimaan Langsung Obat'
  }
  else if (page.path === '/gudang/farmasi/penerimaan/listpenerimaan') {
    return 'List Penerimaan Obat'
  }
  else if (page.path === '/gudang/farmasi/penerimaan/pemfakturan') {
    return 'List Penerimaan Belum Ada Faktur'
  }
  else {
    return 'Penerimaan Obat'
  }
})
onMounted(() => {
  console.log('page ', page.path)
  h.value = pageRef.value.$el.clientHeight
})

</script>
