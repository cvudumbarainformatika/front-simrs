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
import { computed, defineAsyncComponent, onMounted, ref, shallowRef, watch } from 'vue'
import { useStyledStore } from 'src/stores/app/styled'
import { useAplikasiStore } from 'src/stores/app/aplikasi'
import { useFormBarangRusakStore } from 'src/stores/simrs/farmasi/barangrusak/form'
import { useListBarangRusakStore } from 'src/stores/simrs/farmasi/barangrusak/list'

const style = useStyledStore()
const store = useFormBarangRusakStore()
const list = useListBarangRusakStore()

const pageRef = ref()
const h = ref(0)

const menus = ref([
  {
    name: 'bast',
    label: 'Bast',
    comp: shallowRef(defineAsyncComponent(() => import('./comp/FormPage.vue')))
  },
  // {
  //   name: 'kartu',
  //   label: 'Kartu',
  //   comp: shallowRef(defineAsyncComponent(() => import('./comp/KartuStokPage.vue')))
  // },
  {
    name: 'list',
    label: 'List Bast',
    comp: shallowRef(defineAsyncComponent(() => import('./comp/ListPage.vue')))
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
  if (val === 'bast') store.getInitialData()
}
const title = computed(() => {
  if (menu.value.name === 'bast') {
    return 'HALAMAN BARANG RUSAK'
  }
  else if (menu.value.name === 'list') {
    return 'LIST BARANG RUSAK'
  }
  else if (menu.value.name === 'musnah') {
    return 'HALAMAN PEMUSNAHAN BARANG RUSAK'
  }
  else if (menu.value.name === 'hapus') {
    return 'HALAMAN PENGHAPUSAN BARANG RUSAK'
  }
  else if (menu.value.name === 'kartu') {
    return 'HALAMAN KARTU STOK BARANG RUSAK'
  }
  else {
    return 'BARANG RUSAK'
  }
})
const subtitle = computed(() => {
  if (menu.value.name === 'bast') {
    return 'Form Barang Rusak'
  }
  else if (menu.value.name === 'list') {
    return 'List Barang Rusak'
  }
  else if (menu.value.name === 'musnah') {
    return 'Form Pemusnahan Barang Rusak'
  }
  else if (menu.value.name === 'hapus') {
    return 'Form Pengh Barang Rusak'
  }
  else if (menu.value.name === 'kartu') {
    return 'Kartu Stok Barang Rusak'
  }
  else {
    return 'Barang Rusak'
  }
})

const apps = useAplikasiStore()
onMounted(() => {
  h.value = pageRef.value.$el.clientHeight
  if (apps?.user?.kdruangansim !== '') {
    store.setForm('kd_ruang', apps?.user?.kdruangansim)
    store.setParams('kd_ruang', apps?.user?.kdruangansim)
    list.setParam('kd_ruang', apps?.user?.kdruangansim)
    store.getInitialData()
    // list.getInitialData()
  }
})
watch(() => apps?.user?.kdruangansim, (obj) => {
  store.setForm('kd_ruang', obj)
  store.setParams('kd_ruang', obj)
  list.setParam('kd_ruang', obj)
  list.getInitialData()
  // store.getPerusahan()
  // store.getObat()
})

</script>
