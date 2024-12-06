<template>
  <div class="fit">
    <div v-if="store.item" class="full-height bg-white absolute-top z-top" style="width: 75%;">
      <div class="column full-height">
        <div class="col-auto bg-primary text-white">
          <div class="row justify-between q-pa-sm items-center">
            <div>Preview Document {{ menu?.label }}</div>
            <div class="q-gutter-sm">
              <q-btn flat round icon="icon-fa-file-prescription-solid" size="sm" @click="refPreview.exportPdf()" />
              <q-btn flat round icon="icon-mat-close" size="sm" @click="store.item = null" />
            </div>
          </div>
        </div>
        <div class="col full-height scroll">
          <!-- <preview-page :item="store.item" :pasien="pasien" /> -->
          <component ref="refPreview" :is="previewComponent" :pasien="pasien" :menu="menu" :item="store.item" :key="store.item.id" />
          <div style="margin-bottom: 100px;" />
        </div>
      </div>
    </div>
    <q-splitter
      v-model="splitterModel"
      :limits="[0, 100]"
      before-class="overflow-hidden"
      after-class="overflow-hidden"
      class="fit"
    >
      <template #before>
        <div class="full-height q-pa-lg scroll-y">
          <div class="text-h6">
            {{ menu?.label }}
          </div>
          <div>{{ menu?.desc }}</div>

          <q-card flat class="q-mt-md full-width">
            <component :is="formComponent" :pasien="pasien" :menu="menu" :key="menu" />
          </q-card>
        </div>
      </template>

      <template #after>
        <div class="column full-height">
          <div class="col-auto">
            <div class="q-pa-sm bg-dark text-white">
              List Doc
            </div>
          </div>
          <div class="col full-height">
            <div class="full-height scroll" v-if="pasien?.informconcern?.length > 0">
              <ListPage
                :pasien="pasien" :menu="menu" @preview="(val) => {
                  store.menuTab = val.jenis
                  store.initReset(pasien)
                  store.item = val
                }"
                @delete="(val) => {
                  hapusItem(val?.id)
                }"
              />
            </div>
            <div v-else class="column full-height flex-center">
              <div>No Data</div>
            </div>
          </div>
        </div>
      </template>
    </q-splitter>
  </div>
</template>
<script setup>
// import html2pdf from 'html2pdf.js'
import { useQuasar } from 'quasar'
import { useConcernOperasiInvasifRanapStore } from 'src/stores/simrs/ranap/concernoperasiinvasif'
// eslint-disable-next-line no-unused-vars
import { computed, defineAsyncComponent, onMounted, ref, shallowRef } from 'vue'

const store = useConcernOperasiInvasifRanapStore()

const ListPage = defineAsyncComponent(() => {
  return import('./concernoperasi/ListPage.vue')
})

const refPreview = ref(null)

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  },
  menu: {
    type: Object,
    default: null
  }
})

const splitterModel = ref(75)

const asyncComponents = {
  OperasiInvasif: defineAsyncComponent(() => import('./concernoperasi/FormPage.vue')),
  Sedasi: defineAsyncComponent(() => import('./concernsedasi/FormComp.vue')),
  Colonoscopy: defineAsyncComponent(() => import('./colonoscopy/FormColonoscopy.vue'))
}
const asyncComponentPreviews = {
  OperasiInvasif: defineAsyncComponent(() => import('./concernoperasi/PreviewPage.vue')),
  Sedasi: defineAsyncComponent(() => import('./concernsedasi/PreviewSedasi.vue')),
  Colonoscopy: defineAsyncComponent(() => import('./colonoscopy/PreviewColonoscopy.vue'))
}

const formComponent = computed(() => {
  return asyncComponents[props?.menu?.name]
})
const previewComponent = computed(() => {
  return asyncComponentPreviews[store.item?.jenis ?? 'OperasiInvasif']
})

const $q = useQuasar()

function hapusItem (id) {
  console.log('id', id)
  $q.dialog({
    dark: true,
    title: 'Peringatan',
    message: 'Apakah Data ini akan dihapus?',
    cancel: true,
    persistent: true
  }).onOk(() => {
    store.deleteData(props.pasien, id)
  }).onCancel(() => {
    // console.log('Cancel')
  }).onDismiss(() => {
    // console.log('I am triggered on both OK and Cancel')
  })
}

// eslint-disable-next-line no-unused-vars

</script>

<style lang="scss" scoped>
#inform-wrapper {
  width: 210mm;
  margin-left: auto;
}

.edit-off {
  /*
      DIN A4 standard, paper size. commonly uses for printing
      For letter uses width:8.15in; height:11in
  */
  height: 297mm !important;
}
</style>
