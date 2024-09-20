<template>
  <div class="q-ma-xs">
    <Header
      ref="pageRef"
      :head="head"
      :heads="heads"
      title="Retur Gudang"
      subtitle="Return Barang Dari Depo ke Gudang"
      @ganti="gantiHead"
    />

    <div
      style="min-height: calc(100% - 50px) !important;"
    >
      <q-tab-panels
        v-model="head"
        animated
      >
        <q-tab-panel
          v-for="(panel, n) in heads"
          :key="n"
          :name="panel.page"
          class="q-pa-none"
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
const head = ref('list')
const heads = ref([
  { page: 'form', label: 'Form Retur', color: 'deep-orange' },
  { page: 'list', label: 'List Retur ', color: 'green' }
])
function gantiHead (val) {
  head.value = val
}

const comp = [
  { nama: 'form', page: defineAsyncComponent(() => import('./retur/IndexPage.vue')) },
  { nama: 'list', page: defineAsyncComponent(() => import('./list/IndexPage.vue')) }
]

// console.log('comp', comp)
const cekPanel = () => {
  const val = head.value
  const ganti = val.replace(/ /g, '')
  const arr = findWithAttr(comp, 'nama', ganti)
  return arr >= 0 ? comp[arr].page : ''
}
</script>
