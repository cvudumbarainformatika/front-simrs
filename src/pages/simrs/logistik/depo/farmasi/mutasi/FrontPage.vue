<template>
  <div class="q-ma-xs">
    <Header
      ref="pageRef"
      :head="head"
      :heads="heads"
      title="Mutasi Antar Depo"
      subtitle="Mutasi Persediaan Antar Depo Farmasi"
      @ganti="gantiHead"
    />

    <div>
      <q-tab-panels
        v-model="head"
        animated
        class="full-height"
      >
        <q-tab-panel
          v-for="(panel, n) in heads"
          :key="n"
          :name="panel.page"
          class="full-height q-pa-none"
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

const Header = defineAsyncComponent(() => import('./comp/PageHead.vue'))
const head = ref('minta')
const heads = ref([
  { page: 'minta', label: 'Pemintaan Mutasi', color: 'deep-orange' },
  { page: 'terima', label: 'Permintaan Mutasi dari Depo lain', color: 'primary' },
  { page: 'list', label: 'List Permintaan Mutasi ', color: 'green' }
])
function gantiHead (val) {
  head.value = val
}

const comp = [
  { nama: 'minta', page: defineAsyncComponent(() => import('./permintaan/IndexPage.vue')) },
  { nama: 'terima', page: defineAsyncComponent(() => import('./keluar/IndexPage.vue')) },
  { nama: 'list', page: defineAsyncComponent(() => import('./masuk/IndexPage.vue')) }
]

// console.log('comp', comp)
const cekPanel = () => {
  const val = head.value
  const ganti = val.replace(/ /g, '')
  const arr = findWithAttr(comp, 'nama', ganti)
  return arr >= 0 ? comp[arr].page : ''
}
</script>
