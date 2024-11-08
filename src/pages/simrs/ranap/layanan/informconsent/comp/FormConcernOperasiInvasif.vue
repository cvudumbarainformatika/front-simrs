<template>
  <div class="fit">
    <div v-if="store.item" class="full-height bg-white absolute-top z-top" style="width: 70%;">
      <div class="column full-height">
        <div class="col-auto bg-primary text-white">
          <div class="row justify-between q-pa-sm items-center">
            <div>Preview Document</div>
            <div class="q-gutter-sm">
              <q-btn flat round icon="icon-fa-file-prescription-solid" size="sm" @click="refPreview.exportPdf()" />
              <q-btn flat round icon="icon-mat-close" size="sm" @click="store.item = null" />
            </div>
          </div>
        </div>
        <div class="col full-height scroll">
          <preview-page ref="refPreview" :item="store.item" :pasien="pasien" :coba="store.form.ttdDokter" />
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
            <FormPage :pasien="pasien" :menu="menu" />
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
          <div class="col full-height scroll">
            <list-page :pasien="pasien" :menu="menu" @preview="(val) => store.item = val" />
          </div>
        </div>
      </template>
    </q-splitter>
  </div>
</template>
<script setup>
// import html2pdf from 'html2pdf.js'
import { useConcernOperasiInvasifRanapStore } from 'src/stores/simrs/ranap/concernoperasiinvasif'
// eslint-disable-next-line no-unused-vars
import { defineAsyncComponent, onMounted, ref } from 'vue'

const store = useConcernOperasiInvasifRanapStore()

const FormPage = defineAsyncComponent(() => {
  return import('./concernoperasi/FormPage.vue')
})
const ListPage = defineAsyncComponent(() => {
  return import('./concernoperasi/ListPage.vue')
})

const PreviewPage = defineAsyncComponent(() => {
  return import('./concernoperasi/PreviewPage.vue')
})

const refPreview = ref(null)

defineProps({
  pasien: {
    type: Object,
    default: null
  },
  menu: {
    type: Object,
    default: null
  }
})

const splitterModel = ref(70)

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
