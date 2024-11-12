<template>
  <div class="bg-white">
    <div class="row q-mb-md">
      obat
    </div>
    <q-tabs
      v-model="tab"
      dense
      no-caps
      inline-label
      narrow-indicator
      indicator-color="transparent"
      align="left"
      class=" bg-transparent text-grey-8"
      active-color="white"
      active-bg-color="primary"
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
      class="q-pa-md"
    >
      <!-- PANEL -->
      <q-tab-panel :name="menu?.name" class="q-pa-none">
        <component :is="menu?.comp" :data="'data'" />
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>
<script setup>
import { ref, defineAsyncComponent, computed, shallowRef } from 'vue'

const tab = ref('stok')
const tabs = ref([
  {
    label: 'Stok',
    name: 'stok',
    comp: shallowRef(defineAsyncComponent(() => import('./comp/PerbaikanStok.vue')))
  },
  {
    label: 'Stok Opname',
    name: 'stokopname',
    comp: shallowRef(defineAsyncComponent(() => import('./comp/PerbaikanStokOpname.vue')))
  },
  {
    label: 'Mutasi',
    name: 'mutasi',
    comp: shallowRef(defineAsyncComponent(() => import('./comp/PerbaikanMutasi.vue')))
  },
  {
    label: 'Resep',
    name: 'resep',
    comp: shallowRef(defineAsyncComponent(() => import('./comp/PerbaikanResep.vue')))
  },
  {
    label: 'Resep Racikan',
    name: 'resepracikan',
    comp: shallowRef(defineAsyncComponent(() => import('./comp/PerbaikanResepRacikan.vue')))
  },
  {
    label: 'Retur',
    name: 'retur',
    comp: shallowRef(defineAsyncComponent(() => import('./comp/PerbaikanRetur.vue')))
  }
])
const menu = computed(() => {
  const by = tab.value
  return tabs.value.find(i => i.name === by)
})
</script>

<style lang="scss" scoped>
.q-tab {
  border-top-left-radius: 40px;
  border-bottom-right-radius: 40px;
}
</style>
