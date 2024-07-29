<template>
  <div
    class="column full-height q-ma-sm"
    style="overflow: hidden;"
  >
    <div class="column full-height">
      <div class="col-auto bg-red">
        <q-tabs
          v-model="menu"
          no-caps
          inline-label
          class="bg-primary text-white shadow-2 text-sm"
          align="left"
          dense
          active-color="yellow"
          active-bg-color="dark"
        >
          <q-tab
            v-for="(item, i) in menus"
            :key="i"
            :name="item.name"
            :label="item.label"
          />
        </q-tabs>
      </div>
      <div
        class="col full-height bg-yellow"
        style="overflow: hidden;"
      >
        <q-tab-panels
          v-model="menu"
          animated
          class="full-height"
        >
          <q-tab-panel
            v-for="(item, i) in menus"
            :key="i"
            :name="item.name"
            class="full-height q-pa-none"
          >
            <component
              :is="item.comp"
              :key="pasien"
              :pasien="pasien"
            />
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
  </div>
</template>

<script setup>
// eslint-disable-next-line no-unused-vars
import { defineAsyncComponent, ref, shallowRef } from 'vue'

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

const menu = ref('NeonatusPage')
const menus = ref([
  {
    name: 'NeonatusPage',
    label: 'Neonatus',
    icon: 'icon-mat-medical_information',
    comp: shallowRef(defineAsyncComponent(() => import('./compBayiAnak/NeonatusPage.vue')))
  },
  {
    name: 'PediatriPage',
    label: 'Pediatri',
    icon: 'icon-my-stethoscope',
    comp: shallowRef(defineAsyncComponent(() => import('./compBayiAnak/PediatriPage.vue')))
  },
  {
    name: 'KandunganPage',
    label: 'Kandungan / Kebidanan',
    icon: 'icon-my-stethoscope',
    comp: shallowRef(defineAsyncComponent(() => import('./compBayiAnak/KandunganPage.vue')))
  },
  {
    name: 'SkriningKehamilanPage',
    label: 'Skrining Kehamilan',
    icon: 'icon-my-stethoscope',
    comp: shallowRef(defineAsyncComponent(() => import('./compBayiAnak/SkriningKehamilanPage.vue')))
  }
])
</script>

<style lang="scss" scoped>
.q-tabs--dense .q-tab {
    min-height: 32px !important;
}
</style>
