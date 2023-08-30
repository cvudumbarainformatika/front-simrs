<template>
  <div class="column full-height">
    <q-bar class="col-auto bg-teal text-white">
      <div class="q-py-sm f-14 ">
        List Order Radiologi
      </div>
    </q-bar>
    <div class="col-grow bg-grey">
      <!-- jika belum ada pemeriksaan -->
      <div class="column full-height flex-center text-white">
        Belum Ada Permintaan Order ke Laborat
      </div>
    </div>
    <div class="col-3">
      <div class="column q-pa-md">
        <div class="flex items-center q-mt-sm">
          <div style="width:150px">
            Cito ?
          </div>
          <div class="q-gutter-sm">
            <q-radio
              v-model="store.form.cito"
              val="Tidak"
              label="Tidak"
              size="sm"
              dense
            />
            <q-radio
              v-model="store.form.cito"
              val="Iya"
              label="Iya"
              size="sm"
              dense
            />
          </div>
        </div>

        <div class="flex items-center q-mt-sm">
          <div style="width:150px">
            Keterangan Klinis
          </div>
          <div class="my-flex-1">
            <q-input
              label="catatan"
              autogrow
              standout="bg-yellow-3"
              outlined
            />
          </div>
        </div>
      </div>
      <div class="absolute-bottom bg-yellow-3 text-right q-pa-sm">
        <q-btn
          label="Simpan & Kirim Order"
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

const saveOrder = () => {
  console.log('lll')
}
</script>
