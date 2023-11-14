<template>
  <q-form
    ref="formRef"
    @submit="simpan"
  >
    <div class="row q-col-gutter-sm">
      <div class="col-3">
        <q-input
          v-model="store.formPrb.norm"
          label="NORM (Automatis)"
          dense
          outlined
          standout="bg-yellow-3"
          readonly
          :rules="[val => !!val || 'Harus diisi']"
          hide-bottom-space
        />
      </div>
      <div class="col-3">
        <q-input
          v-model="store.formPrb.noka"
          label="NOKA (Automatis)"
          dense
          outlined
          standout="bg-yellow-3"
          readonly
        />
      </div>
      <div class="col-6">
        <q-input
          v-model="store.formPrb.nosep"
          label="SEP (Automatis)"
          dense
          outlined
          standout="bg-yellow-3"
          readonly
        />
      </div>
      <div class="col-3">
        <q-select
          v-model="store.formPrb.jenispelayanan"
          label="Jenis Pelayanan"
          dense
          outlined
          standout="bg-yellow-3"
          use-input
          input-debounce="0"
          :options="optionsJnsKunjungan"
          map-options
          emit-value
          :rules="[val => !!val || 'Harus diisi']"
          hide-bottom-space
        />
      </div>
      <div class="col-3">
        <app-input-date
          :model="store.formPrb.tglrujukan"
          label="Tgl Rujukan"
          outlined
          @set-model="(val) => store.setFormPrb('tglrujukan', val)"
        />
      </div>
      <div class="col-3">
        <app-input-date
          :model="store.formPrb.tglrencanakunjungan"
          label="Tgl Rencana Kunjungan"
          outlined
          @set-model="(val) => store.setFormPrb('tglrencanakunjungan', val)"
        />
      </div>

      <div class="col-3">
        <q-select
          v-model="store.formPrb.tipefaskes"
          label="Tipe Faskes"
          dense
          outlined
          standout="bg-yellow-3"
          use-input
          input-debounce="0"
          :options="optionTipe"
          map-options
          emit-value
        />
      </div>
      <div class="col-8">
        <!-- <q-select
          v-model="store.formPrb.ppkdirujuk"
          label="di rujuk Ke"
          dense
          outlined
          standout="bg-yellow-3"
          use-input
          input-debounce="0"
          :options="optionsRs"
          option-value="kode"
          option-label="nama"
          :rules="[val => !!val || 'Harus diisi']"
          hide-bottom-space
          @filter="onFilterTest"
        /> -->
        <q-select
          v-model="store.formPrb.ppkdirujuk"
          label="di rujuk Ke"
          dense
          outlined
          standout="bg-yellow-3"
          use-input
          map-options
          input-debounce="800"
          :options="optionsRs"
          option-value="kode"
          option-label="nama"
          hide-bottom-space
          :loading="store.loadingNoka"
          @filter="onFilterTest"
          @update:model-value="updateModelPpk"
        />
      </div>
      <div class="col-7">
        <!-- <q-select
          v-model="store.formPrb.polirujukan"
          label="Poli Rujukan"
          dense
          outlined
          standout="bg-yellow-3"
          use-input
          input-debounce="0"
          :options="optionsPoli"
          option-value="kode"
          option-label="nama"
          :rules="[val => !!val || 'Harus diisi']"
          hide-bottom-space
          @filter="filterPoli"
        /> -->
        <q-select
          v-model="store.formPrb.polirujukan"
          label="Poli Rujukan"
          dense
          outlined
          standout="bg-yellow-3"
          use-input
          map-options
          input-debounce="800"
          :options="optionsPoli"
          option-value="kode"
          option-label="nama"
          hide-bottom-space
          @filter="filterPoli"
          @update:model-value="updateModelPoli"
        />
      </div>
      <div class="col-12">
        <q-separator class=" q-my-md" />
        <div class="text-right q-gutter-sm">
          <q-btn
            label="Simpan"
            color="primary"
            type="submit"
            :loading="store.loadingSave"
            :disable="store.loadingSave"
          />
        </div>
      </div>
    </div>
  </q-form>
</template>

<script setup>
import { usePerencanaanPoliStore } from 'src/stores/simrs/pelayanan/poli/perencanaan'
import { onMounted, ref } from 'vue'
import { api } from 'src/boot/axios'
import { useQuasar, date } from 'quasar'
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

const store = usePerencanaanPoliStore()
const $q = useQuasar()
const optionsJnsKunjungan = ref([
  { value: '', label: '-------' },
  { value: '1', label: 'Rawat Inap' },
  { value: '2', label: 'Rawat Jalan' }
])
const optionTipe = ref([
  { value: '1', label: 'Faskes 1' }
])
const optionsRs = ref([])
const optionsPoli = ref([])

function updateModelPpk(val) {
  store.setFormPrb('ppkdirujuk', val.kode)
}
function updateModelPoli(val) {
  store.setFormPrb('polirujukan', val.kode)
}
const onFilterTest = async (val, update, abort) => {
  if (val.length < 3) {
    abort()
    return
  }
  const params = {
    params: {
      namafaskes: val,
      jnsfaskes: store?.formPrb?.tipefaskes
    }
  }
  const response = await api.get('v1/simrs/pelayanan/faskes', params)
  const code = response?.data?.metadata?.code
  if (code === '200') {
    update(() => {
      optionsRs.value = response?.data?.result?.faskes
      console.log(optionsRs.value)
    })
  }
}
const filterPoli = async (val, update, abort) => {
  if (val.length < 3) {
    abort()
    return
  }
  const params = {
    params: {
      namapoli: val
    }
  }
  const response = await api.get('v1/simrs/pelayanan/polibpjs', params)
  const code = response?.data?.metadata?.code
  if (code === '200') {
    update(() => {
      optionsPoli.value = response?.data?.result?.poli
    })
  }
}

onMounted(() => {
  store.initPasien(props.pasien)
  const form = { noka: props?.pasien?.noka, tglsep: date.formatDate(Date.now(), 'YYYY-MM-DD') }
  store.cekPesertaByNoka(form).then(resp => {
    const opt = {
      kode: resp?.peserta?.provUmum?.kdProvider,
      nama: resp?.peserta?.provUmum?.nmProvider
    }
    optionsRs.value.push(opt)
    store.formPrb.ppkdirujuk = resp?.peserta?.provUmum?.kdProvider
    const poli = {
      nama: props?.pasien?.polibpjs,
      kode: props?.pasien?.kodepolibpjs
    }
    optionsPoli.value.push(poli)
    store.formPrb.polirujukan = props?.pasien?.kodepolibpjs
    // console.log('um', poli)
  })
})

function simpan() {
  console.log('ok', store.formPrb)
  $q.notify({
    type: 'negative',
    message: 'Maaf, Anda tidak terhubung ke BPJS',
    position: 'top-right',
    color: 'negative'
  })
}
</script>
