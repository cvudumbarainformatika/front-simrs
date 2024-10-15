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
            <component :is="menu?.comp" :pasien="pasien" :kasus="kasus" />
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
import { useAplikasiStore } from 'src/stores/app/aplikasi'
import { useLaboratPoli } from 'src/stores/simrs/pelayanan/poli/laborat'
import { computed, defineAsyncComponent, onMounted, ref } from 'vue'

const auth = useAplikasiStore()

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  },
  kasus: {
    type: Object,
    default: null
  }
})
const nakes = computed(() => {
  return auth?.user?.pegawai?.kdgroupnakes
})
const tab = ref('laborat')

const lab = useLaboratPoli()
onMounted(() => {
  tab.value = tabs.value[0]?.name
  lab.getNota(props.pasien)
})

const tabsxx = [
  {
    label: 'Laborat',
    name: 'laborat',
    icon: 'icon-my-stethoscope',
    nakes: ['1', '2', '3'],
    comp: defineAsyncComponent(() => import('./comp/laborat/IndexPage.vue'))
  },
  {
    label: 'Radiologi',
    name: 'radiologi',
    icon: 'icon-mat-description',
    nakes: ['1', '2', '3'],
    comp: defineAsyncComponent(() => import('./comp/radiologi/IndexPage.vue'))
  }
  // {
  //   label: 'Anatomi',
  //   name: 'fisik',
  //   icon: 'icon-my-human-back-svgrepo-com',
  //   nakes: ['1', '2'],
  //   comp: defineAsyncComponent(() => import('./comp/PemeriksaanFisikPage.vue'))
  // }
]

const menu = computed(() => {
  const by = tab.value

  return tabs.value.find(i => i.name === by)
})

const tabs = computed(() => {
  return tabsxx.filter(i => i?.nakes.includes(nakes.value)) ?? tabsxx
})

</script>

<style lang="scss" scoped>
.q-tab {
  border-top-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
</style>
