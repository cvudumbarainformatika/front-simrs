<template>
  <q-page class="bg-white full-height" ref="refPage">
    <q-tabs
      ref="refTabs"
      v-model="tab"
      dense
      no-caps
      inline-label
      narrow-indicator
      indicator-color="transparent"
      align="left"
      class=" bg-transparent text-grey-8"
      active-color="white"
      :active-bg-color="menu?.reference ? 'dark' : 'primary'"
    >
      <q-tab v-for="tb in tabs" :key="tb.name" :ripple="true" :name="tb?.name" content-class="tab-classes">
        <template #default>
          <div class="row q-gutter-x-xs items-center q-px-sm" style="border-radius: 10px;">
            <div><strong>{{ tb?.label }}</strong></div>
          </div>
        </template>
      </q-tab>
    </q-tabs>

    <q-tab-panels
      v-model="tab"
      class="q-pa-sm"
      animated
    >
      <q-tab-panel :name="menu?.name" class="q-pa-none">
        <q-scroll-area :style="`height: ${he}px;`">
          <component
            :is="menu?.comp"
            @tambah="tambahRinciPengembalian"
          />
        </q-scroll-area>
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script setup>
import { notifErrVue } from 'src/modules/utils'
import { useAplikasiStore } from 'src/stores/app/aplikasi'
import { useListPengembalianPinjamanStore } from 'src/stores/simrs/farmasi/pengembalian/listpengembalian'
import { usePengembalianPinjamanStore } from 'src/stores/simrs/farmasi/pengembalian/pengembalianpinjaman'
import { computed, defineAsyncComponent, onMounted, ref, shallowRef, watch } from 'vue'

const store = usePengembalianPinjamanStore()
const tab = ref('list')
const tabs = ref([
  {
    label: 'Form Pengembalian',
    name: 'pengembalian',
    reference: false,
    comp: shallowRef(defineAsyncComponent(() => import('./comp/PengembalianPinjamanPage.vue')))
  },
  {
    label: 'List Pengembalian',
    name: 'list',
    reference: false,
    comp: shallowRef(defineAsyncComponent(() => import('./comp/ListPengembalianPage.vue')))
  }
  // {
  //   label: 'Isi Keterangan',
  //   name: 'keterangan',
  //   reference: false,
  //   comp: shallowRef(defineAsyncComponent(() => import('./comp/KeteranganPage.vue')))
  // }
])
const menu = computed(() => {
  const by = tab.value
  return tabs.value.find(i => i.name === by)
})

const list = useListPengembalianPinjamanStore()
const apps = useAplikasiStore()
function tambahRinciPengembalian (val) {
  store.setParams('kdpbf', val?.kdpbf)
  store.setParams('nopenerimaan', val?.nopenerimaan)

  store.setForm('kdpbf', val?.kdpbf)
  store.setForm('nopenerimaan', val?.nopenerimaan)
  store.setForm('nopengembalian', val?.nopengembalian)
  store.setForm('tgl_pengembalian', val?.tgl_pengembalian)

  tab.value = 'pengembalian'

  store.getNopenerimaans().then(() => {
    if (val)store.penerimaanRinci = store.nopenerimaans.find(item => item.nopenerimaan === val?.nopenerimaan) ?? []
    else store.penerimaanRinci = {}
  })
  console.log('tambah', val)
}
watch(() => apps?.user?.kdruangansim, (kod) => {
  const gud = store.gudangs.find(a => a.value === kod)
  if (gud) {
    list.setParams('kdruang', kod)
    store.setForm('kdruang', kod)
  }
  else {
    notifErrVue('Hanya boleh Menampilkan Stok gudang')
    list.setParams('kdruang', null)
  }
  // console.log('kode', gud)
})

const refPage = ref(null)
const refTabs = ref(null)
const he = ref(500)
onMounted(() => {
  const page = refPage.value?.$el.clientHeight ?? 0
  const tab = refTabs.value.clientHeight ?? 55
  if (page > 0) he.value = page - tab
  // console.log('he', refPage.value?.$el.clientHeight, page, he.value)
  list.setParams('kdruang', apps?.user?.kdruangansim)
  store.setForm('kdruang', apps?.user?.kdruangansim)

  store.getInitialData()
})
</script>

<style lang="scss" scoped>
.q-tab {
  border-top-left-radius: 40px;
  border-bottom-right-radius: 40px;
}
</style>
