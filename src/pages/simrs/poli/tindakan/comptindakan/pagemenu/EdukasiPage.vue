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
        <q-tab-panels
          v-model="menu"
          animated
          class="full-height"
        >
          <q-tab-panel
            name="edukasi"
            class="full-height q-pa-none"
          >
            <component
              :is="tab.comp"
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
import { ref, shallowRef, defineAsyncComponent, onMounted } from 'vue'

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

const tab = ref(tabs.value[0])
const menu = ref(tabs.value[0].menu)

onMounted(() => {
  tab.value = tabs.value[0]
  menu.value = tabs.value[0]?.menu
})

</script>
