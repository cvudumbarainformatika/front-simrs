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
          Edit Rincian Penerimaan
        </div>
        <div class="row q-pa-sm  bg-dark text-white">
          <div class="col-8">
            Diedit
          </div>
          <div class="col-4 text-right">
            Default sistem
          </div>
        </div>
        <div class="row q-my-sm">
          <div class="col-8">
            <app-input v-model="nopenerimaan" class="col-12" label="Nomor Penerimaan" outlined dense valid />
          </div>
          <div class="col-4 text-right">
            {{ data?.nopenerimaan_default }}
          </div>
        </div>
        <div class="row q-my-sm">
          <div class="col-8">
            <app-input v-model="nobatch" class="col-12" label="Nomor Batch" outlined dense valid />
          </div>
          <div class="col-4 text-right">
            {{ data?.nobatch_default }}
          </div>
        </div>
        <div class="row q-my-sm">
          <div class="col-8">
            <app-input-date :model="tglexp" class="col-12" label="Tanggal Expired" outlined dense valid @set-model="(val)=>{tglexp = val}" />
          </div>

          <div class="col-4 text-right">
            {{ data?.tglexp_default }}
          </div>
        </div>
        <div class="row q-my-sm">
          <div class="col-8">
            <app-input v-model="harga" class="col-12" label="Harga" outlined dense valid />
          </div>

          <div class="col-4 text-right">
            {{ data?.harga_net_default }}
          </div>
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <app-btn
          label="Simpan"
          @click="emits(
            'simpan',
            {
              id:data?.id,
              nobatch:nobatch,
              nopenerimaan:nopenerimaan,
              tglexp:tglexp,
              harga:harga,
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

const nobatch = ref(null)
const nopenerimaan = ref(null)
const tglexp = ref(null)
const harga = ref(null)
function show () {
  console.log('data', props.data)
  nobatch.value = props.data?.nobatch
  nopenerimaan.value = props.data?.nopenerimaan
  tglexp.value = props.data?.tglexp
  harga.value = props.data?.harga_net
}
function hide () {
  nobatch.value = null
  nopenerimaan.value = null
  tglexp.value = null
  harga.value = 0
}
</script>
