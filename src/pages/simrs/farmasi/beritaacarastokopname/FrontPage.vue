<template>
  <q-page class="bg-white full-height" ref="refPage">
    <q-tabs
      ref="refTabs"
      v-model="tab"
      dense
      no-caps
      inline-label
      narrow-indicator
      indicator-color="transparent"
      align="left"
      class=" bg-transparent text-grey-8"
      active-color="white"
      :active-bg-color="menu?.reference ? 'dark' : 'primary'"
    >
      <q-tab v-for="tb in tabs" :key="tb.name" :ripple="true" :name="tb?.name" content-class="tab-classes">
        <template #default>
          <div class="row q-gutter-x-xs items-center q-px-sm" style="border-radius: 10px;">
            <div><strong>{{ tb?.label }}</strong></div>
          </div>
        </template>
      </q-tab>
    </q-tabs>
    <div ref="refActions">
      <div class="row justify-between items-center q-py-sm">
        <div class="col-6">
          <div class="row">
            <div class="col-2">
              <app-input
                v-model="store.params.tahun"
                label="Tahun"
                outlined
              />
            </div>
            <div class="q-ml-sm col-4">
              <app-autocomplete
                v-model="store.params.bulan"
                label="Bulan"
                :source="store.bulans"
                option-label="nama"
                option-value="value"
                outlined
              />
            </div>
            <div class="q-ml-sm col-2">
              <app-btn
                class="q-mr-xs"
                label="Ambil Data"
                :loading="store.loading"
                :disable="store.loading || store.loadingBa || store.loadingSp"
                @click="store.getListOpname"
              />
            </div>
          </div>
        </div>
        <div v-if="!store.form?.tglopname" class="col-auto text-weight-bold text-negative">
          Tidak ada tanggal opname
        </div>
        <div class="col-auto q-mr-md">
          <app-btn
            class="q-mr-xs"
            label="Simpan Pernyataan"
            :loading="store.loadingSp"
            :disable="store.loading || store.loadingBa || store.loadingSp || !store.form?.tglopname"
            @click="store.simpanPernyataan"
          />
          <app-btn
            label="Simpan Berita Acara"
            :loading="store.loadingBa"
            :disable="store.loading || store.loadingBa || store.loadingSp || !store.form?.tglopname"
            @click="store.simpanBA"
          />
        </div>
      </div>
    </div>
    <q-tab-panels
      v-model="tab"
      class="q-pa-sm"
      animated
    >
      <q-tab-panel :name="menu?.name" class="q-pa-none">
        <q-scroll-area :style="`height: ${he}px;`">
          <component
            :is="menu?.comp"
          />
        </q-scroll-area>
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script setup>
import { useSPJOPNameStore } from 'src/stores/simrs/farmasi/spjopname/spjopname'
import { computed, defineAsyncComponent, onMounted, ref, shallowRef } from 'vue'

const store = useSPJOPNameStore()
const tab = ref('berita')
const tabs = ref([
  {
    label: 'Pernyataan',
    name: 'pernyataan',
    reference: false,
    comp: shallowRef(defineAsyncComponent(() => import('./comp/SuratPernyataanPage.vue')))
  },
  {
    label: 'Berita Acara',
    name: 'berita',
    reference: false,
    comp: shallowRef(defineAsyncComponent(() => import('./comp/BeritaAcaraPage.vue')))
  }
  // {
  //   label: 'Isi Keterangan',
  //   name: 'keterangan',
  //   reference: false,
  //   comp: shallowRef(defineAsyncComponent(() => import('./comp/KeteranganPage.vue')))
  // }
])
const menu = computed(() => {
  const by = tab.value
  return tabs.value.find(i => i.name === by)
})

const refPage = ref(null)
const refTabs = ref(null)
const refActions = ref(null)
const he = ref(500)
onMounted(() => {
  const page = refPage.value?.$el.clientHeight ?? 0
  const tab = refTabs.value.clientHeight ?? 55
  const act = refActions.value.clientHeight ?? 0
  if (page > 0) he.value = page - tab - act
  console.log('he', refPage.value?.$el.clientHeight, page, he.value, act)

  store.getInitialData()
})
</script>

<style lang="scss" scoped>
.q-tab {
  border-top-left-radius: 40px;
  border-bottom-right-radius: 40px;
}
</style>
