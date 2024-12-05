<template>
  <div class="row fit relative-position">
    <div class="absolute-top columm fit q-pa-xs" style="padding-bottom: 41px;">
      <div class="col-auto full-width">
        <div class="full-width">
          <q-tabs
            ref="tabsRef"
            v-model="tab"
            dense
            no-caps
            inline-label
            narrow-indicator
            indicator-color="transparent"
            align="left"
            class="bg-transparent text-grey-8 mytabs"
            active-color="white"
            active-bg-color="dark"
            :mobile-arrows="false"
            :outside-arrows="false"
          >
            <q-tab v-for="tb in tabs" :key="tb.name" :ripple="true" :name="tb?.name" content-class="tab-classes">
              <template #default>
                <div class="row q-gutter-x-xs items-center q-px-sm no-wrap" style="border-radius: 10px;">
                  <q-icon :name="tb?.icon" size="18px" />
                  <div><strong>{{ tb?.label }}</strong></div>
                </div>
              </template>
            </q-tab>
          </q-tabs>
        </div>
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

const tabsRef = ref(null)

onMounted(() => {
  tabsRef?.value?.$el?.classList?.remove('no-wrap')
  // console.log('qtabs', tabsRef.value.$el.classList.value)

  tab.value = tabs.value[0]?.name
  lab.getNota(props.pasien, true)
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
  },
  {
    label: 'Fisio',
    name: 'fisioterapi',
    icon: 'icon-mat-personal_injury',
    nakes: ['1', '2', '3'],
    comp: defineAsyncComponent(() => import('./comp/fisio/IndexPage.vue'))
  },
  {
    label: 'Operasi',
    name: 'operasi',
    icon: 'icon-mat-bedroom_parent',
    nakes: ['1', '2', '3'],
    comp: defineAsyncComponent(() => import('./comp/operasi/IndexPage.vue'))
  },
  // {
  //   label: 'Operasi IRD',
  //   name: 'operasiIrd',
  //   icon: 'icon-mat-bedroom_parent',
  //   nakes: ['1', '2', '3'],
  //   comp: defineAsyncComponent(() => import('./comp/operasiIrd/IndexPage.vue'))
  // },
  {
    label: 'Bank Darah',
    name: 'bankDarah',
    icon: 'icon-fa-biohazard-solid',
    nakes: ['1', '2', '3'],
    comp: defineAsyncComponent(() => import('./comp/bankdarah/IndexPage.vue'))
  },
  {
    label: 'Apheresis',
    name: 'apheresis',
    icon: 'icon-fa-vials-solid',
    nakes: ['1', '2', '3'],
    comp: defineAsyncComponent(() => import('./comp/apheresis/IndexPage.vue'))
  },
  {
    label: 'Cathlab',
    name: 'cathlab',
    icon: 'icon-mat-manage_accounts',
    nakes: ['1', '2', '3'],
    comp: defineAsyncComponent(() => import('./comp/cathlab/IndexPage.vue'))
  },
  {
    label: 'Ambulan',
    name: 'ambulan',
    icon: 'icon-mat-local_shipping',
    nakes: ['1', '2', '3'],
    comp: defineAsyncComponent(() => import('./comp/ambulan/IndexPage.vue'))
  },
  {
    label: 'Perawatan Jenazah',
    name: 'perawatanJenazah',
    icon: 'icon-my-footprints-outline-variant-svgrepo-com',
    nakes: ['1', '2', '3'],
    comp: defineAsyncComponent(() => import('./comp/perawatanJenazah/IndexPage.vue'))
  },
  // {
  //   label: 'Oksigen',
  //   name: 'oksigen',
  //   icon: 'icon-mat-published_with_changes',
  //   nakes: ['1', '2', '3'],
  //   comp: defineAsyncComponent(() => import('./comp/oksigen/IndexPage.vue'))
  // },
  {
    label: 'Penunjang Lainnya',
    name: 'penunjangLainnya',
    icon: 'icon-mat-move_to_inbox',
    nakes: ['1', '2', '3'],
    comp: defineAsyncComponent(() => import('./comp/penunjangLainnya/IndexPage.vue'))
  }

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

// .q-tabs .no-wrap {
//   // .no-wrap {
//   //   flex-wrap: wrap !important;
//   // }
//   flex-wrap: wrap !important;
// }
</style>
