<template>
  <q-dialog persistent backdrop-filter="blur(4px)" @show="init">
    <q-card style="min-width:40vw; max-width: 40vw;">
      <q-bar class="bg-primary text-white">
        <div>Cetak Gelang Pasien</div>

        <q-space />

        <q-btn dense flat icon="icon-mat-close" v-close-popup>
          <q-tooltip>Close</q-tooltip>
        </q-btn>
      </q-bar>

      <q-card-section class="bg-grey-4">
        <div class="row q-col-gutter-x-sm">
          <div class="col-auto">
            <app-avatar-pasien :pasien="pasien" width="70px" />
          </div>
          <div class="col full-width">
            <div class="row justify-between">
              <div>
                <div class="text-weight-bold">
                  {{ pasien?.nama }}
                </div>
                <div>
                  NORM : {{ pasien?.norm }}
                </div>
                <div>
                  NIK : {{ pasien?.nktp ?? '-' }}
                </div>
                <div>
                  NOREG : {{ pasien?.noreg }}
                </div>
              </div>

              <div class="column">
                <q-btn
                  :label="pasien.sistembayar"
                  color="primary"
                  outline
                  disabled
                />
                <div class="text-right q-py-sm f-14 text-weight-bold">
                  {{ store.cekPeserta?.hakKelas?.keterangan }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <div id="printMe" class="flex q-gutter-x-md items-center full-width">
          <BarcodeGenerator
            :value="pasien.norm"
            :format="'CODE128'"
            :line-color="'#000'"
            :width="2"
            :height="60"
            :element-tag="'img'"
            :display-value="false"
          />
          <div class="f-12 text-weight-bold">
            <div>NORM : {{ pasien.norm ?? '-' }}</div>
            <div class="f-14">
              {{ pasien.nama }}
            </div>
            <div>{{ pasien.tgllahir }}</div>
            <div class="f-14">
              RSUD dr. MOHAMAD SALEH
            </div>
          </div>
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section class="q-pa-none bg-primary text-white">
        <div class="q-pa-md row justify-between items-center">
          <div><q-btn label="Tutup" color="dark" text-color="white" @click="store.dialogCetakGelang=false" /></div>
          <div>
            <q-btn v-print="printObj" label="Print" color="yellow-3" text-color="dark" />
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useListHistoryPendaftaranRanapStore } from 'src/stores/simrs/pendaftaran/ranap/history.js'

import BarcodeGenerator from 'src/components/callComponents/BarcodeGenerator.vue'
import { ref } from 'vue'
const store = useListHistoryPendaftaranRanapStore()

defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

const init = () => {
  console.log('init')
}

const printed = ref(false)
const printObj = {
  id: 'printMe',
  popTitle: 'Laporan Realisasi Anggaran',
  beforeOpenCallback (vue) {
    printed.value = true
    console.log('wait...')
  },
  openCallback (vue) {
    console.log('opened')
  },
  closeCallback (vue) {
    printed.value = false
    console.log('closePrint')
  }
}
</script>
