<template>
  <div class="fit">
    <div class="column full-height">
      <div class="col-auto">
        <q-tabs
          v-model="menu"
          no-caps
          inline-label
          class="bg-teal text-white text-sm"
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
import { defineAsyncComponent, ref, shallowRef } from 'vue'

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

// console.log(props.pasien)

const menu = ref('MedisPage')
const menus = ref([
  {
    name: 'MedisPage',
    label: 'Asesmen Awal Medis',
    icon: 'icon-mat-medical_information',
    comp: shallowRef(defineAsyncComponent(() => import('./compNeonatus/MedisPage.vue')))
  },
  {
    name: 'KeperawatanPage',
    label: 'Asesmen Awal Keperawatan',
    icon: 'icon-my-stethoscope',
    comp: shallowRef(defineAsyncComponent(() => import('./compNeonatus/KeperawatanPage.vue')))
  }])
</script>
