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
          Input Tanggal Pengapusan
        </div>
        <div class="row q-my-sm">
          <div class="col-12">
            <app-input-date
              :model="tanggal" label="Tanggal Pemusnahan" outlined @set-model="(val)=>{
                console.log('tgl', val);
                tanggal=val
              }"
            />
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
              tanggal:tanggal
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
const tanggal = ref(null)
const props = defineProps({
  data: { type: Object, default: () => {} }
})
function show () {
  tanggal.value = props.data?.tgl_penghapusan
}
function hide () {
  tanggal.value = null
}
</script>
