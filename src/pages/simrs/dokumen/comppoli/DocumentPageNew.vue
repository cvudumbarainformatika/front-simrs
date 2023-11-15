<template>
  <div>
    <div class="container full-height">
      <div class="column full-height ">
        <div class="col-grow">
          <KumpulanSurat
            :key="doc"
            :items="documents"
            @go-to="(item)=>goTo(item)"
          />
        </div>
      </div>
    </div>
  </div>
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
import KumpulanSurat from './KumpulanSurat.vue'
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
    color: 'primary',
    jenis: 'Resume',
    label: 'Resume',
    value: 'Resume'
  },
  {
    color: 'primary',
    jenis: 'Billing',
    label: 'Billing',
    value: 'Billing'
  },
  {
    color: 'primary',
    jenis: 'Surat Keterangan Sakit',
    label: 'Surat Keterangan Sakit',
    value: 'Sakit'
  },
  {
    color: 'primary',
    jenis: 'Surat Keterangan Dokter',
    label: 'Surat Keterangan Dokter',
    value: 'Sehat'
  },
  {
    color: 'primary',
    jenis: 'Pengantar Rujuk Balik',
    label: 'Pengantar Rujuk Balik',
    value: 'prb'
  },
  {
    color: 'primary',
    jenis: 'Pengantar Rujuk RS Lain',
    label: 'Pengantar Rujuk RS Lain',
    value: 'rslain'
  },
  {
    color: 'primary',
    jenis: 'Rencana Pasien',
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
<style lang="scss" scoped>
  .container {
    position: relative;
    width: 90vw;
    min-height: 90vh;
    border-radius: 10px;
    backdrop-filter: blur(5px);
    // backdrop-filter: sepia(.5);
    box-shadow: 0 25px 45px rgba(0,0,0,0.1);
    border: 3px solid rgba(255,255,255,0.5);
    border-right: 3px solid rgba(255,255,255,0.2);
    border-bottom: 3px solid rgba(255,255,255,0.2);
  }

</style>
