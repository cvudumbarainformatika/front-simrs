<template>
  <q-dialog
    persistent
    @show="alsanLama"
  >
    <q-card style="min-width: 500px;">
      <q-bar class="bg-primary text-white">
        <div v-if="store.isTolak">
          Alasan Ditolak
        </div>
        <div v-else>
          Alasan Tidak diberikan semua
        </div>
        <q-space />

        <q-btn
          v-close-popup
          dense
          flat
          color="white"
          icon="icon-mat-close"
          @click="close"
        >
          <q-tooltip class="bg-white text-primary">
            Close
          </q-tooltip>
        </q-btn>
      </q-bar>
      <q-card-section>
        <app-input
          v-model="store.toAlasan.alasan"
          label="Alasan"
          outlined
          valid
          :loading="store.toAlasan?.loading"
          @keyup.enter.stop="simpan"
        />
      </q-card-section>
      <q-card-actions align="right">
        <div class="row items-center q-mr-md">
          <div class="col-auto q-mr-sm">
            <q-btn label="Batal" no-caps color="dark" @click="close" />
          </div>
          <div class="col-auto q-mr-sm">
            <q-btn label="Simpan" no-caps color="primary" @click="simpan" />
          </div>
        </div>
      </q-card-actions>
      <q-separator />
    </q-card>
  </q-dialog>
</template>
<script setup>
const emits = defineEmits(['close'])
import { useEResepDepoFarmasiStore } from 'src/stores/simrs/farmasi/eresep/eresep'

// eslint-disable-next-line no-unused-vars
const store = useEResepDepoFarmasiStore()
let alasanlama = ''
function simpan () {
  console.log('simpan')
  if (store.isTolak && store.toAlasan.flag !== '5') {
    store.tolakResep(store.toAlasan)
  }
  else store.isiAlasan(store.toAlasan)
}
function close () {
  store.toAlasan.alasan = alasanlama
  alasanlama = ''
  emits('close')
}
function alsanLama () {
  alasanlama = store.toAlasan.alasan
}
</script>
