<template>
  <q-page
    ref="pageRef"
    class="column full-width"
    :class="!style.componentfull ? '' : 'q-pa-xs'"
    :style="`max-height: calc(100% - ${!style.componentfull? hHead : hHead+25 }px)`"
  >
    <!-- {{ hHead }} -->
    <!-- :style="`min-height: ${!style.componentfull ? h-head : h}px;`" -->
    <div class="col-auto ">
      <PageHead
        v-if="!style.componentfull"
        ref="refHead"
        :title="title"
        :subtitle="subtitle"
        :path="page.path"
      />
    </div>
    <q-card
      flat
      class="col full-width full-height"
      :style="`max-height: ${!style.componentfull ? h-125 : h + 50}px; overflow:hidden`"
    >
      <!-- {{ h }} -->
      <!--
        <q-scroll-area
          :style="`height: ${!style.componentfull ? h : h + 49}px; max-width: 100%;`"
          :thumb-style="thumbStyle"
          :bar-style="barStyle"
        >
      </q-scroll-area>
      -->
      <q-card-section class="q-pa-none q-ma-none">
        <router-view v-slot="{ Component, route }">
          <transition :name="route.meta.transition || 'fade'">
            <component
              :is="Component"
              :head-high="hHead"
            />
          </transition>
        </router-view>
      </q-card-section>
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
const refHead = ref()
const h = ref(0)
const hHead = ref(0)

// const thumbStyle = ref({
//   right: '0px',
//   borderRadius: '5px',
//   backgroundColor: '#027be3',
//   width: '2px',
//   opacity: 0.75
// })
// const barStyle = ref({
//   right: '0px',
//   borderRadius: '9px',
//   backgroundColor: '#027be3',
//   width: '5px',
//   opacity: 0.2
// })
const page = useRoute()
const title = computed(() => {
  if (page.path === '/ruangan/farmasi/pemakaianruangan/pemakaian') {
    return 'PEMAKAIAN RUANGAN'
  } else if (page.path === '/ruangan/farmasi/pemakaianruangan/listpemakaian') {
    return 'LIST PEMAKAIAN RUANGAN'
  } else {
    return 'Pemakain'
  }
})
const subtitle = computed(() => {
  if (page.path === '/ruangan/farmasi/pemakaianruangan/pemakaian') {
    return 'List Stok dan Form Pemakaian ruangan'
  } else if (page.path === '/ruangan/farmasi/pemakaianruangan/listpemakaian') {
    return 'List Pemakain Obat Oleh Ruangan'
  } else {
    return 'Halaman Pemakaian Obat'
  }
})
onMounted(() => {
  h.value = pageRef.value.$el.clientHeight
  hHead.value = refHead.value.$el.clientHeight
  // console.log('page ', h.value, pageRef.value)
  console.log('head', hHead.value)
})

</script>
