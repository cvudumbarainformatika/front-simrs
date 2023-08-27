<template>
  <div class="column full-height">
    <q-bar class="col-auto bg-dark text-white">
      <div class="q-py-sm f-14 ">
        List Permintaan Pemeriksaan Laborat
      </div>
    </q-bar>
    <div class="col-grow bg-grey">
      <!-- jika belum ada pemeriksaan -->
      <div class="column full-height flex-center text-white">
        Belum Ada Permintaan Order ke Laborat
      </div>
    </div>
    <div class="col-3">
      <div class="column  q-pa-md">
        <div class="flex items-center">
          <div class="q-mr-sm">
            Pasien Puasa ?
          </div>
          <div class="q-gutter-sm">
            <q-radio
              v-model="store.formlab.pasienpuasa"
              val="Tidak"
              label="Tidak"
              size="sm"
              dense
            />
            <q-radio
              v-model="store.formlab.pasienpuasa"
              val="Iya"
              label="Iya"
              size="sm"
              dense
            />
          </div>
        </div>
        <div class="flex items-center q-mt-sm">
          <div class="q-mr-sm">
            Cito ?
          </div>
          <div class="q-gutter-sm">
            <q-radio
              v-model="store.formlab.cito"
              val="Tidak"
              label="Tidak"
              size="sm"
              dense
            />
            <q-radio
              v-model="store.formlab.cito"
              val="Iya"
              label="Iya"
              size="sm"
              dense
            />
          </div>
        </div>
      </div>
      <div class="absolute-bottom bg-yellow-3 text-right q-pa-sm">
        <q-btn
          label="Simpan Order"
          color="primary"
          @click="saveOrder"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import { usePenunjangPoli } from 'src/stores/simrs/pelayanan/poli/penunjang'

const store = usePenunjangPoli()

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

function saveOrder() {
  store.saveOrderLaborat(props.pasien)
}
</script>
