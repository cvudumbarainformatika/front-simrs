<template>
  <div>
    <q-form
      ref="formRef"
      @submit="simpan"
    >
      <div class="row q-col-gutter-sm">
        <div class="col-6">
          <q-radio
            v-model="store.formKonsul.kdSaran"
            checked-icon="icon-mat-task_alt"
            unchecked-icon="icon-mat-panorama_fish_eye"
            val="3"
            label="Konsul Antar Poli"
            @update:model-value="seKonsul"
          />
        </div>
        <div class="col-6">
          <q-radio
            v-model="store.formKonsul.kdSaran"
            checked-icon="icon-mat-task_alt"
            unchecked-icon="icon-mat-panorama_fish_eye"
            val="6"
            label="Rujukan Internal"
            @update:model-value="seRujuk"
          />
        </div>
        <div class="col-5">
          <app-input-date
            :model="store.formKonsul.tgl_rencana_konsul"
            label="Tgl Rencana Konsul"
            outlined
            @set-model="setTanggalKonsul"
          />
        </div>
        <div class="col-7">
          <q-select
            v-model="store.formKonsul.kdpoli_tujuan"
            label="Poli Tujuan"
            dense
            outlined
            standout="bg-yellow-3"
            option-value="rs1"
            option-label="rs2"
            emit-value
            map-options
            use-input
            input-debounce="0"
            :options="store.poli"
          />
        </div>
        <div class="col-12">
          <q-input
            v-model="store.formKonsul.ket"
            label="Keterangan"
            dense
            outlined
            standout="bg-yellow-3"
          />
        </div>
        <div class="col-12">
          <q-separator class=" q-my-md" />
          <div class="text-right q-gutter-sm">
            <q-btn
              label="Simpan"
              color="primary"
              type="submit"
              :loading="store.loadingSaveKonsul"
              :disable="store.loadingSaveKonsul"
            />
          </div>
        </div>
      </div>
    </q-form>
  </div>
</template>

<script setup>
import { date } from 'quasar'
import { notifErrVue } from 'src/modules/utils'
import { usePerencanaanPoliStore } from 'src/stores/simrs/pelayanan/poli/perencanaan'
import { ref } from 'vue'

const store = usePerencanaanPoliStore()
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})
function seKonsul(val) {
  console.log('set konsul', val)
  store.setFormKonsul('tgl_rencana_konsul', date.formatDate(Date.now(), 'YYYY-MM-DD'))
}
function seRujuk(val) {
  const tgl = Date.now()
  const tgl1 = date.addToDate(tgl, { days: 1 })
  store.setFormKonsul('tgl_rencana_konsul', date.formatDate(tgl1, 'YYYY-MM-DD'))
  console.log('set rujuk', val)
}
function setTanggalKonsul(val) {
  const date1 = Date.now()
  const date2 = new Date(val)
  const diff = date.getDateDiff(date2, date1, 'days')
  console.log('date1', date1)
  console.log('date2', date2)
  console.log('diff', diff)
  if (diff < 0) return notifErrVue('tidak boleh ada rujukan mundur')
  if (diff > 0) {
    store.setFormKonsul('kdSaran', '6')
  } else if (diff === 0) {
    store.setFormKonsul('kdSaran', '3')
  }
  store.setFormKonsul('tgl_rencana_konsul', val)
}

const formRef = ref()
function simpan() {
  store.saveKonsul(props.pasien)
}
</script>
