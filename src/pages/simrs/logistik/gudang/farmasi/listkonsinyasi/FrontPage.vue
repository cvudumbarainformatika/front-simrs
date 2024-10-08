<template>
  <div class="q-pa-xs" style="height: calc(100vh - 52px); overflow: hidden;">
    <Header
      ref="headRef"
      :head="head"
      :heads="heads"
      title="List Konsinyasi"
      subtitle="List Persediaan Konsinyasi Terpakai"
      @ganti="gantiHead"
    />

    <div :style="`height: calc(100% - ${h}px); `">
      <q-tab-panels
        v-model="head"
        animated
        class="full-height"
      >
        <q-tab-panel
          v-for="(panel, n) in heads"
          :key="n"
          :name="panel.page"
          class="full-height q-pa-none q-mb-xl"
        >
          <component
            :is="cekPanel()"
            @ganti="gantiHead"
          />
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </div>
</template>
<script setup>
import { findWithAttr } from 'src/modules/utils'
import { defineAsyncComponent, ref } from 'vue'

const headRef = ref(null)
// eslint-disable-next-line no-unused-vars
const h = ref(64)
const Header = defineAsyncComponent(() => import('./comp/PageHead.vue'))
const head = ref('konsi')
const heads = ref([
  { page: 'konsi', label: 'List Konsinyasi', color: 'deep-orange' },
  { page: 'list', label: 'Konsinyasi Siap BAST ', color: 'green' }
  // { page: 'belum', label: 'Belum Masuk List', color: 'blue' }
])
function gantiHead (val) {
  head.value = val
}

const comp = [
  { nama: 'konsi', page: defineAsyncComponent(() => import('./comp/ListBarangTerpakai.vue')) },
  { nama: 'list', page: defineAsyncComponent(() => import('./comp/ListSiapBast.vue')) },
  { nama: 'belum', page: defineAsyncComponent(() => import('./comp/ListBelumMasuk.vue')) }
]

// console.log('comp', comp)
const cekPanel = () => {
  const val = head.value
  const value = val.replace(/ /g, '')
  const arr = findWithAttr(comp, 'nama', value)
  return arr >= 0 ? comp[arr].page : ''
}

</script>
