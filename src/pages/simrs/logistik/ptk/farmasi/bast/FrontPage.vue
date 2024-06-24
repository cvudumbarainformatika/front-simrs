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
        :path="menu.name"
        @ganti="gantiHalaman"
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
        <component :is="menu.comp" />
      </q-scroll-area>
    </q-card>
  </q-page>
</template>
<script setup>
import PageHead from './PageHead.vue'
import { computed, defineAsyncComponent, onMounted, ref, shallowRef } from 'vue'
import { useStyledStore } from 'src/stores/app/styled'

const style = useStyledStore()

const pageRef = ref()
const h = ref(0)

const menus = ref([
  {
    name: 'bast',
    label: 'Bast',
    comp: shallowRef(defineAsyncComponent(() => import('./comp/BastPage.vue')))
  },
  {
    name: 'list',
    label: 'List Bast',
    comp: shallowRef(defineAsyncComponent(() => import('./comp/ListPage.vue')))
  },
  {
    name: 'bastkonsi',
    label: 'Bast Konsinyasi',
    comp: shallowRef(defineAsyncComponent(() => import('./comp/BastKonsinyasiPage.vue')))
  },
  {
    name: 'listkonsi',
    label: 'List Bast Konsinyasi',
    comp: shallowRef(defineAsyncComponent(() => import('./comp/ListKonsinyasiPage.vue')))
  }
])
const menu = ref(menus.value[0])

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

function gantiHalaman (val) {
  if (menu.value.name !== val) {
    const anu = menus.value.find(a => a.name === val)
    if (anu) menu.value = anu
  }
}
const title = computed(() => {
  if (menu.value.name === 'bast') {
    return 'HALAMAN BAST'
  }
  else if (menu.value.name === 'list') {
    return 'LIST BAST'
  }
  else {
    return 'BAST'
  }
})
const subtitle = computed(() => {
  if (menu.value.name === 'bast') {
    return 'Bast Penerimaan'
  }
  else if (menu.value.name === 'list') {
    return 'List Bast Penerimaan'
  }
  else {
    return 'Bast Penerimaan'
  }
})

onMounted(() => {
  h.value = pageRef.value.$el.clientHeight
})

</script>
