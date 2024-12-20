<template>
  <q-form class="column fit" @submit="onSubmit">
    <div class="col-auto">
      <div class="q-px-lg q-py-md">
        <div class="f-14 text-bold">
          DISCHARGE SUMMARY
        </div>
        <div>diisi untuk dikasih ke pasien KRS</div>
      </div>
      <q-separator class="" />
    </div>
    <div class="col full-height q-px-lg scroll">
      <div class="q-mt-md q-mb-xs text-bold">
        Lanjutan Perawatan dirumah :
      </div>
      <q-input
        v-model="store.form.rs4"
        type="textarea"
        outlined
        standout="bg-yellow-3"
        rows="2"
      />
      <div class="q-mt-md q-mb-xs text-bold">
        ATURAN DIET/NUTRISI :
      </div>
      <q-input
        v-model="store.form.rs5"
        type="textarea"
        outlined
        standout="bg-yellow-3"
        rows="2"
      />
      <div class="q-mt-md q-mb-xs text-bold">
        OBAT-OBATAN YANG DIBAWA PULANG, JUMLAH DAN DOSIS :
      </div>
      <q-input
        v-model="store.form.rs6"
        type="textarea"
        outlined
        standout="bg-yellow-3"
        rows="2"
      />
      <div class="q-mt-md q-mb-xs text-bold">
        RENCANA AKTIFITAS :
      </div>
      <q-input
        v-model="store.form.rs7"
        type="textarea"
        outlined
        standout="bg-yellow-3"
        rows="2"
      />
      <div class="q-mt-md q-mb-xs text-bold">
        ISTIRAHAT :
      </div>
      <q-input
        v-model="store.form.rs8"
        type="textarea"
        outlined
        standout="bg-yellow-3"
        rows="2"
      />
      <div class="q-mt-md q-mb-xs text-bold">
        HASIL PEMERIKSAAN YANG DIBAWA PULANG :
      </div>
      <q-input
        v-model="store.form.rs9"
        type="textarea"
        outlined
        standout="bg-yellow-3"
        rows="5"
      />
      <div class="q-mt-md q-mb-xs text-bold">
        INFORMASI DAN EDUKASI YANG DIBERIKAN :
      </div>
      <q-input
        v-model="store.form.rs10"
        type="textarea"
        outlined
        standout="bg-yellow-3"
        rows="5"
      />
      <div class="row q-col-gutter-sm">
        <div class="col-8">
          <div class="q-mt-md q-mb-xs">
            <span class="text-weight-bold">JENIS OPERASI YG DILAKUKAN</span>  <span class="text-weight-normal">(Jika Ada)</span> :
          </div>
          <q-input
            v-model="store.form.operasi"
            type="textarea"
            outlined
            standout="bg-yellow-3"
            rows="2"
          />
        </div>
        <div v-if="store.form.operasi !== null" class="col-4">
          <div class="q-mt-md q-mb-xs">
            <span class="text-weight-bold">TGL OPERASI</span> :
          </div>
          <app-input-date
            :model="store.form.tglOperasi"
            label=""
            outlined
            valid
            @set-model="val=>store.form.tglOperasi=val"
          />
        </div>
      </div>

      <!-- TTD -->
      <div class="q-mt-md q-mb-xs">
        TTD PASIEN / KELUARGA :
      </div>
      <TtdWacom
        uuid="ttd-pasien-summary-discharge" :ttd-name="store.form.pengedukasi ?? 'nama pasien / keluarga'"
        @signature:ttd-pasien-summary-discharge="(val)=> {
          // console.log('ttd-saksi-rs',val);
          store.form.ttdPasien = val
        }"
      />

      <div style="margin-bottom:100px;" />
    </div>
    <div class="col-auto q-pa-md bg-dark">
      <div class="row flex justify-end bg-dark">
        <q-btn label="Simpan" type="submit" color="primary" />
      </div>
    </div>
  </q-form>
</template>

<script setup>
import { useSummaryDischargePlanningRanapStore } from 'src/stores/simrs/ranap/summarydischargeplanning'
import { defineAsyncComponent, onMounted } from 'vue'

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

const TtdWacom = defineAsyncComponent(() => {
  return import('src/components/~static/TtdWacomStu540.vue')
})

const store = useSummaryDischargePlanningRanapStore()

onMounted(() => {
  Promise.all([
    // store.getmasterprognosis(),
    store.initReset()
  ])
})

function onSubmit () {
  // console.log('onSubmit')
  store.simpandata(props.pasien)
}
</script>
