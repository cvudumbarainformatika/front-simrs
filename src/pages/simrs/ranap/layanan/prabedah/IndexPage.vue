<template>
  <div class="row fit relative-position">
    <div class="absolute-top columm fit q-pa-xs" style="padding-bottom: 41px;">
      <div class="col-auto">
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
          active-bg-color="dark"
        >
          <q-tab v-for="tb in tabs" :key="tb.name" :ripple="true" :name="tb?.name" content-class="tab-classes">
            <template #default>
              <div class="row q-gutter-x-xs items-center q-px-sm" style="border-radius: 10px;">
                <q-icon :name="tb?.icon" size="18px" />
                <div><strong>{{ tb?.label }}</strong></div>
              </div>
            </template>
          </q-tab>
        </q-tabs>
      </div>
      <div class="col full-height">
        <q-tab-panels v-model="tab" animated class="bg-transparent q-pa-none relative-position fit">
          <!-- PANEL -->
          <q-tab-panel :name="menu?.name" class="q-pa-none">
            <!-- <PemeriksaanUmumPage :pasien="props?.pasien" /> -->
            <component :is="menu?.comp" :pasien="pasien" :kasus="kasus" :nakes="nakes" />
          </q-tab-panel>
        </q-tab-panels>
      </div>
      <!-- <div class="absolute-bottom bg-dark text-white">
        Footer
      </div> -->
    </div>
  </div>
</template>

<script setup>
import { computed, defineAsyncComponent, onMounted, ref } from 'vue'

const props = defineProps({
  pasien: {
    type: Object,
    default: () => null
  },
  kasus: {
    type: Object,
    default: () => null
  },
  nakes: {
    type: String,
    default: null
  }
})
const tab = ref('diagnosaMedik')

onMounted(() => {
  tab.value = tabs.value[0].name
})

const tabsxx = [
  {
    label: 'Pra Anestesi',
    name: 'praanestesi',
    icon: 'icon-mat-health_and_safety',
    nakes: ['1', '2', '3'],
    comp: defineAsyncComponent(() => import('./praanestesi/IndexPage.vue'))
  },
  {
    label: 'Pra Bedah',
    name: 'prabedah',
    icon: 'icon-mat-health_and_safety',
    nakes: ['1', '2', '3'],
    comp: defineAsyncComponent(() => import('./prabedah/IndexPage.vue'))
  }
]

const menu = computed(() => {
  // console.log('tab.value', tab.value)
  const by = tab.value ?? null

  return tabs.value.find(i => i?.name === by)
})

const tabs = computed(() => {
  return tabsxx.filter(i => i?.nakes.includes(props?.nakes))
})

</script>

<style lang="scss" scoped>
.q-tab {
  border-top-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
</style>
