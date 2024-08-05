<template>
  <q-dialog persistent backdrop-filter="blur(4px)" @show="init">
    <q-card style="min-width:60vw; max-width: 60vw;">
      <q-bar class="bg-teal text-white">
        <div>Create SEP</div>

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
      <q-form>
        <q-card-section class="row q-col-gutter-sm">
          <app-input-simrs
            ref="refNokartu" v-model="sep.t_sep.noKartu" label="Nomor Kartu" :valid="{required: true}"
            :error-from-server="sep.errors.norm"
            @update:model-value="sep.errors.norm = null"
            :lazy-rules="false"
            class="col-4"
          />

          <div class="col-12">
            MASIH TAHAP PENGGARAPAN
          </div>
        </q-card-section>
        <q-separator />
        <q-card-section class="q-pa-none bg-teal text-white">
          <div class="q-pa-md row justify-between items-center">
            <div><q-btn label="Tutup" color="dark" text-color="white" @click="store.dialogSep=false" /></div>
            <div>
              <q-btn label="Print" color="yellow-3" text-color="dark" />
            </div>
          </div>
        </q-card-section>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useBuatSepRanapStore } from 'src/stores/simrs/pendaftaran/ranap/buatsep'
import { useListHistoryPendaftaranRanapStore } from 'src/stores/simrs/pendaftaran/ranap/history.js'

// import BarcodeGenerator from 'src/components/callComponents/BarcodeGenerator.vue'
// import { ref } from 'vue'
const store = useListHistoryPendaftaranRanapStore()
const sep = useBuatSepRanapStore()

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

const init = () => {
  console.log('init', props.pasien)
  sep.updateForm(props.pasien)
  store.cekPesertaBpjs('nik', props.pasien?.nktp)
    .then(() => {
      // console.log('store.cekPeserta', store.cekPeserta)
      // sep.updateForm(store.cekPeserta, props.pasien)
    })
}
</script>
