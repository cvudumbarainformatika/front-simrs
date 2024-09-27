<template>
  <div
    class="column full-height q-ma-sm"
  >
    <div class=" q-pa-md bg-primary text-white f-14 text-weight-bold">
      LAPORAN HUTANG FARMASI
    </div>

    <div class="col-auto">
      <q-tab-panels
        v-model="tab"
        animated
        class="full-height"
      >
        <q-tab-panel
          v-for="(panel, n) in optionTabs"
          :key="n"
          :name="panel.name"
          class="full-height q-pa-none"
        >
          <component
            :is="cekPanel()"
          />
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </div>
</template>

<script setup>
import { defineAsyncComponent, ref, shallowRef } from 'vue'

const tab = ref('hutang')
const optionTabs = ref([

  { name: 'hutang', label: 'Hutang', compo: shallowRef(defineAsyncComponent(() => import('./comp/HutangPage.vue'))) },
  { name: 'konsi', label: 'Hutang Konsinyasi', compo: shallowRef(defineAsyncComponent(() => import('./comp/HutangKonsinyasi.vue'))) }
])
// eslint-disable-next-line no-unused-vars
const cekPanel = () => {
  const val = tab.value
  const ganti = val.replace(/ /g, '')
  const arr = optionTabs.value?.find(a => a.name === ganti)
  return arr?.compo ?? ''
}

</script>
