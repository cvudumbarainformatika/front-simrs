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
const tab = ref('edukasi')

const lab = useLaboratPoli()

const tabsRef = ref(null)

onMounted(() => {
  tabsRef?.value?.$el?.classList?.remove('no-wrap')
  console.log('qtabs', tabsRef.value.$el.classList.value)

  tab.value = tabs.value[0]?.name
  lab.getNota(props.pasien)
})

const tabsxx = [
  {
    label: 'Edukasi',
    name: 'edukasi',
    icon: 'icon-my-stethoscope',
    nakes: ['1', '2', '3'],
    comp: defineAsyncComponent(() => import('./comp/edukasi/IndexPage.vue'))
  }
  // {
  //   label: 'Inform Consent',
  //   name: 'inform-consent',
  //   icon: 'icon-mat-description',
  //   nakes: ['1', '2', '3'],
  //   comp: defineAsyncComponent(() => import('./comp/informconsent/IndexPage.vue'))
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

// .q-tabs .no-wrap {
//   // .no-wrap {
//   //   flex-wrap: wrap !important;
//   // }
//   flex-wrap: wrap !important;
// }
</style>
