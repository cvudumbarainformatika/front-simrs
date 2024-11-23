<template>
  <q-dialog persistent @show="show()" @hide="hide()">
    <q-card style="min-width: 800px;">
      <q-bar class="bg-primary">
        <q-space />

        <q-btn
          v-close-popup
          dense
          flat
          color="white"
          icon="icon-mat-close"
          @click="emits('close')"
        >
          <q-tooltip class="bg-white text-primary">
            Close
          </q-tooltip>
        </q-btn>
      </q-bar>
      <q-card-section>
        <div class="row q-my-md text-weight-bold f-18">
          Edit Faktur Retur PBF
        </div>
        <div class="row q-my-sm">
          <app-input v-model="noFaktur" class="col-12" label="Nomor faktur retur" outlined dense valid />
        </div>
        <div class="row q-my-sm">
          <app-input-date
            :model="tglFaktur" class="col-12" label="Tanggal faktur retur" outlined dense valid
            @set-model="(val)=>{
              tglFaktur=val
            }"
          />
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <app-btn
          label="Simpan"
          @click="emits(
            'simpan',
            {
              id:data?.id,
              nomor:noFaktur,
              tanggal:tglFaktur,
            }
          )"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { ref } from 'vue'

const emits = defineEmits(['close', 'simpan'])
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  data: { type: Object, default: () => {} }
})

const noFaktur = ref(null)
const tglFaktur = ref(null)
function show () {
  console.log('data', props.data)
  noFaktur.value = props.data?.no_faktur_retur_pbf
  tglFaktur.value = props.data?.tgl_faktur_retur_pbf
}
function hide () {
  noFaktur.value = null
  tglFaktur.value = null
}
</script>
