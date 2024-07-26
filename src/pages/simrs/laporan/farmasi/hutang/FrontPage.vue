<template>
  <div
    class="column full-height q-ma-sm"
  >
    <div class="col-auto bg-red">
      <q-tabs
        v-model="tab"
        no-caps
        inline-label
        class="bg-primary text-white shadow-2"
        align="left"
        dense
        active-color="yellow"
        active-bg-color="dark"
        @update:model-value="cekPanel"
      >
        <template v-for="opt in optionTabs" :key="opt">
          <q-tab :name="opt.name" :label="opt.label" />
        </template>
      </q-tabs>
    </div>

    <div class="col-auto bg-yellow">
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

const tab = ref('konsi')
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
