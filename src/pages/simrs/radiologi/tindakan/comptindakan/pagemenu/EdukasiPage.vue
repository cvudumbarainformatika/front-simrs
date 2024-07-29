<template>
  <div
    class="column full-height q-ma-sm"
    style="overflow: hidden;"
  >
    <div class="column full-height">
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
        >
          <q-tab
            v-for="(item, i) in tabs"
            :key="i"
            :name="item.menu"
            :label="item.label"
          />
        </q-tabs>
      </div>
      <div
        class="col full-height"
        style="overflow: hidden;"
      >
        <!-- {{ tab }} {{ menu }} -->
        <q-tab-panels
          v-model="menu"
          animated
          class="full-height"
        >
          <q-tab-panel
            v-for="(item, i) in tabs"
            :key="i"
            :name="item.menu"
            class="full-height q-pa-none"
          >
            <component
              :is="item.comp"
              :key="pasien"
              :pasien="props.pasien"
            />
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useEdukasiPoliStore } from 'src/stores/simrs/pelayanan/poli/edukasi'
import { ref, shallowRef, defineAsyncComponent, onMounted, watchEffect } from 'vue'

// eslint-disable-next-line no-unused-vars
const store = useEdukasiPoliStore()

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

const tabs = ref([
  {
    menu: 'edukasi',
    label: 'Edukasi',
    comp: shallowRef(defineAsyncComponent(() => import('./compedukasi/IndexPage.vue')))
  },
  {
    menu: 'informentConsent',
    label: 'Informan Consent',
    comp: shallowRef(defineAsyncComponent(() => import('./compedukasi/InformConsent.vue')))
  }
])

const tab = ref('edukasi')
const menu = ref(tabs.value[0].menu)

onMounted(() => {
  console.log('edukasi Page')
})

watchEffect(() => {
  const index = tabs.value.findIndex(x => x.menu === tab.value)
  menu.value = tabs.value[index].menu
  console.log('index', index)
  // menu.value = tabs.value['menu']
})

</script>
