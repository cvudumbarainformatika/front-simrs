<template>
  <q-form @submit="onSubmit" class="q-pa-lg">
    <div class="">
      <div class="f-14 text-bold">
        FORM PEMULANGAN PASIEN
      </div>
      <div>Dan Tindak Lanjut Pasien Setelah Pulang / Meninggal</div>
    </div>
    <q-separator class="q-my-md" />
    <div class="row q-mt-lg">
      <div class="col-3">
        Prognosis
      </div>
      <div class="col-9">
        <q-select
          v-model="store.form.prognosis"
          dense
          standout="bg-yellow-3 text-black"
          outlined
          label="Prognosis"
          :options="store.prognosis"
          option-value="rs1"
          option-label="rs2"
          map-options
          emit-value
          hide-selected
          fill-input
          use-input
          input-debounce="0"
          hide-bottom-space
          style="width: 30%;"
          @update:model-value="(val)=> {
            console.log(val);

          }"
        />
      </div>
    </div>

    <div class="row q-mt-sm">
      <div class="col-3">
        Cara Keluar
      </div>
      <div class="col-9">
        <q-select
          v-model="store.form.caraKeluar"
          dense
          standout="bg-yellow-3 text-black"
          outlined
          label="Cara Keluar"
          :options="store.carakeluars"
          option-value="rs1"
          option-label="rs2"
          map-options
          emit-value
          hide-selected
          fill-input
          use-input
          input-debounce="0"
          hide-bottom-space
          :rules="[ val => val && val.length > 0 || 'harap diisi']"
          style="width: 40%;"
          @update:model-value="(val)=>{
            console.log('val',val);

          }"
        />
      </div>
    </div>

    <div class="row q-mt-sm">
      <div class="col-3">
        Tgl Keluar / meninggal
      </div>
      <div class="col-9">
        <app-input-date
          :model="store.form.tglKeluar"
          label=""
          outlined
          :disable="store.loading"
          :loading="store.loading"
          :rules="[ val => val && val.length > 0 || 'harap diisi']"
          @set-model="val=>store.form.tglKeluar=val"
          style="width: 20%;"
        />
      </div>
    </div>
    <div class="row q-mt-sm">
      <div class="col-3">
        No. Surat Meninggal
      </div>
      <div class="col-9">
        <div class="flex items-center">
          <app-input-simrs v-model="store.form.noSuratMeninggal" label="Nomor" style="width: 30%;" />
          <span class="q-ml-md"> *. diisi jika status pulang meninggal</span>
        </div>
      </div>
    </div>
    <div class="row q-mt-sm">
      <div class="col-3">
        No. LP Manual
      </div>
      <div class="col-9">
        <div class="flex items-center">
          <app-input-simrs v-model="store.form.noLp" label="Nomor" style="width: 30%;" />
          <span class="q-ml-md"> *. diisi jika SEPnya adalah KLL</span>
        </div>
      </div>
    </div>

    <div class="row q-mt-sm">
      <div class="col-3">
        Penyakit Terakhir
      </div>
      <div class="col-9">
        <q-select
          v-model="store.search1"
          use-input
          hide-selected
          fill-input
          outlined
          standout="bg-yellow-3"
          dense
          emit-value
          map-options
          option-value="kode"
          :option-label="opt => Object(opt) === opt && 'keterangan' in opt ? opt.kode +' ~ '+ opt.keterangan : ' Cari Diagnosa '"
          input-debounce="0"
          :options="options"
          label="Cari Diagnosa (ICD)"
          @filter="filterFn"

          :rules="[ val => val && val.length > 0 || 'harap diisi']"
          @update:model-value="(val)=>{
            // console.log('val', val);
            store.form.diagnosaAkhir = val
          }"
        >
          <template #no-option>
            <q-item>
              <q-item-section class="text-grey">
                Tidak ditemukan
              </q-item-section>
            </q-item>
          </template>
        </q-select>
      </div>
    </div>

    <div v-if="store.form.prognosis==='MALAM' || store?.form?.prognosis==='9'" class="row q-mt-sm">
      <div class="col-3">
        Penyakit Penyebab Kematian
      </div>
      <div class="col-9">
        <q-select
          v-model="store.search2"
          use-input
          hide-selected
          fill-input
          outlined
          standout="bg-yellow-3"
          dense
          emit-value
          map-options
          option-value="kode"
          :option-label="opt => Object(opt) === opt && 'keterangan' in opt ? opt.kode +' ~ '+ opt.keterangan : ' Cari Diagnosa '"
          input-debounce="0"
          :options="options2"
          label="Cari Diagnosa (ICD)"
          @filter="filterFn2"

          :rules="[ val => val && val.length > 0 || 'harap diisi']"
          @update:model-value="(val)=>{
            // console.log('val', val);
            store.form.diagnosaPenyebabMeninggal = val
          }"
        >
          <template #no-option>
            <q-item>
              <q-item-section class="text-grey">
                Tidak ditemukan
              </q-item-section>
            </q-item>
          </template>
        </q-select>
      </div>
    </div>

    <div class="row q-mt-sm">
      <div class="col-3">
        Tindak Lanjut
      </div>
      <div class="col-6">
        <q-input
          v-model="store.form.tindakLanjut" type="textarea" standout="bg-yellow-3 text-black" outlined rows="3"
          :rules="[ val => val && val.length > 0 || 'Anjuran harus diisi']"
        />
      </div>
    </div>

    <q-separator class="q-my-md" />

    <div class="row q-mt-sm flex justify-center">
      <q-btn
        :loading="store.loadingOrder" :disable="store.loadingOrder"
        :label="(pasien?.status === '2' || pasien?.status ==='3') ? 'EDIT INPUTAN' : 'PULANG / PULANGKAN PASIEN'"
        type="submit"
        :color="(pasien?.status === '2' || pasien?.status ==='3') ? 'primary' : 'negative'"
        size="lg"
      />
    </div>
  </q-form>
</template>

<script setup>
import { useDiagnosaStore } from 'src/stores/simrs/ranap/diagnosa'
import { usePasienPulangRanapStore } from 'src/stores/simrs/ranap/pulang'
import { onMounted, ref } from 'vue'

const store = usePasienPulangRanapStore()
const diag = useDiagnosaStore()

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  },
  menu: {
    type: Object,
    default: null
  }
})

onMounted(() => {
  options.value = diag.listDiagnosa
  store.getmastercarakeluar().then(() => {
    store.initReset(props?.pasien)
  })
})

const options = ref([])
const options2 = ref([])

function filterFn (val, update, abort) {
  if (val.length < 2) {
    abort()
    options.value = []
    return
  }

  update(() => {
    const needle = val.toLowerCase()
    // const arr = store.listDiagnosa
    const arr = diag.listDiagnosa
    // console.log('update', arr, needle, store.listDiagnosa)

    const filter = ['kode', 'keterangan']
    const multiFilter = (data = [], filterKeys = [], value = '') =>
      data.filter((item) => filterKeys.some(
        (key) =>
          item[key].toString().toLowerCase().includes(value.toLowerCase()) &&
            item[key]
      )
      )
    const filteredData = multiFilter(arr, filter, needle)
    options.value = filteredData
  })
}
function filterFn2 (val, update, abort) {
  if (val.length < 2) {
    abort()
    options2.value = []
    return
  }

  update(() => {
    const needle = val.toLowerCase()
    // const arr = store.listDiagnosa
    const arr = diag.listDiagnosa
    // console.log('update', arr, needle, store.listDiagnosa)

    const filter = ['kode', 'keterangan']
    const multiFilter = (data = [], filterKeys = [], value = '') =>
      data.filter((item) => filterKeys.some(
        (key) =>
          item[key].toString().toLowerCase().includes(value.toLowerCase()) &&
            item[key]
      )
      )
    const filteredData = multiFilter(arr, filter, needle)
    options2.value = filteredData
  })
}

const onSubmit = () => {
  // console.log('simpan', props.pasien)
  store.simpandata(props?.pasien)
}
</script>
