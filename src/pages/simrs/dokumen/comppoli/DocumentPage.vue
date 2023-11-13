<template>
  <q-card
    flat
    bordered
    square
    class="full-height"
  >
    <div class="full-height column">
      <div class="col-auto bg-primary text-white">
        <q-bar>
          <div>Dokumen Pasien</div>
        </q-bar>
        <div class="q-pa-sm row items-center q-gutter-sm ">
          <q-option-group
            v-model="doc"
            :options="documents"
            color="white"
            inline
            dark
          />
        </div>
      </div>
      <div class="col">
        <div
          v-if="doc !== ''"
          class="q-pa-md"
        >
          Dokumen {{ getLabel(doc) }}
          <q-separator class="q-my-sm" />
          <div>
            <component
              :is="cekPanel()"
              :key="props.pasien"
              :pasien="props.pasien"
            />
          </div>
        </div>
        <div
          v-else
          class="column full-height flex-center q-pa-md"
          style="min-height: 400px;"
        >
          Belum Ada Pemilihan Surat
        </div>
      </div>
    </div>
  </q-card>
</template>
<script setup>
import { findWithAttr } from 'src/modules/utils'
import { ref, defineAsyncComponent } from 'vue'
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

const doc = ref('')
const documents = ref([
  {
    label: 'Resume',
    value: 'Resume'
  },
  {
    label: 'Billing',
    value: 'Billing'
  },
  {
    label: 'Surat Keterangan Sakit',
    value: 'Sakit'
  },
  {
    label: 'Surat Keterangan Dokter',
    value: 'Sehat'
  },
  {
    label: 'Pengantar Rujuk Balik',
    value: 'prb'
  },
  {
    label: 'Pengantar Rujuk RS Lain',
    value: 'rslain'
  },
  {
    label: 'Rencana Pasien',
    value: 'Rencana'
  }
])
function getLabel(val) {
  const anu = documents.value.filter(a => a.value === val)
  // console.log('anu ', anu)
  return anu.length ? anu[0].label : '-'
}
const comp = [
  { nama: 'Resume', page: defineAsyncComponent(() => import('../resume/ResumePage.vue')) },
  { nama: 'Billing', page: defineAsyncComponent(() => import('./BillingPage.vue')) },
  { nama: 'Sakit', page: defineAsyncComponent(() => import('../surat/compsurat/SuratSakitPage.vue')) },
  { nama: 'Sehat', page: defineAsyncComponent(() => import('../surat/compsurat/SuratSehatPage.vue')) },
  { nama: 'Rencana', page: defineAsyncComponent(() => import('../surat/compsurat/SuratRencanaPage.vue')) },
  { nama: 'prb', page: defineAsyncComponent(() => import('../pengantar/comppengantar/PengantarRujukBalik.vue')) },
  { nama: 'rslain', page: defineAsyncComponent(() => import('../pengantar/comppengantar/PengantarRsLain.vue')) }
]
const cekPanel = () => {
  const val = doc.value
  const ganti = val.replace(/ /g, '')
  const arr = findWithAttr(comp, 'nama', ganti)

  return arr >= 0 ? comp[arr].page : ''
}
</script>
