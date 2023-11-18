<template>
  <q-form
    ref="formRef"
    @submit="simpan"
  >
    <div class="row q-col-gutter-sm">
      <div class="col-3">
        <q-input
          v-model="store.formRsLain.norm"
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
          v-model="store.formRsLain.noka"
          label="NOKA (Automatis)"
          dense
          outlined
          standout="bg-yellow-3"
          readonly
        />
      </div>
      <div class="col-6">
        <q-input
          v-model="store.formRsLain.nosep"
          label="SEP (Automatis)"
          dense
          outlined
          standout="bg-yellow-3"
          readonly
        />
      </div>
      <div class="col-3">
        <q-select
          v-model="store.formRsLain.jenispelayanan"
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
          :model="store.formRsLain.tglrujukan"
          label="Tgl Rujukan"
          outlined
          @set-model="(val) => store.setFormRsLain('tglrujukan', val)"
        />
      </div>
      <div class="col-3">
        <app-input-date
          :model="store.formRsLain.tglrencanakunjungan"
          label="Tgl Rencana Kunjungan"
          outlined
          @set-model="(val) => store.setFormRsLain('tglrencanakunjungan', val)"
        />
      </div>

      <div class="col-3">
        <q-select
          v-model="store.formRsLain.tipefaskes"
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
      <div class="col-3">
        <q-select
          v-model="store.formRsLain.tiperujukan"
          label="Tipe Faskes"
          dense
          outlined
          standout="bg-yellow-3"
          use-input
          input-debounce="0"
          :options="optionTipeRujukan"
          map-options
          emit-value
        />
      </div>
      <div class="col-8">
        <!-- <q-select
          v-model="store.formRsLain.ppkdirujuk"
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
          v-model="store.formRsLain.ppkdirujuk"
          label="di rujuk Ke"
          dense
          outlined
          standout="bg-yellow-3"
          use-input
          input-debounce="800"
          map-options
          :options="optionsRs"
          option-value="kode"
          option-label="nama"
          hide-bottom-space
          @filter="onFilterTest"
          @update:model-value="updateModelPpk"
        />
      </div>
      <div class="col-7">
        <!-- <q-select
          v-model="store.formRsLain.polirujukan"
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
          v-model="store.formRsLain.polirujukan"
          label="Poli Rujukan"
          dense
          outlined
          standout="bg-yellow-3"
          use-input
          input-debounce="800"
          :options="optionsPoli"
          option-value="kode"
          option-label="nama"
          map-options
          hide-bottom-space
          @filter="filterPoli"
          @update:model-value="updateModelPoli"
        />
      </div>
      <div class="col-12">
        <q-input
          v-model="store.formRsLain.catatan"
          label="Catatan"
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
// import { useQuasar } from 'quasar'
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

const store = usePerencanaanPoliStore()
// const $q = useQuasar()
const optionsJnsKunjungan = ref([
  { value: '', label: '-------' },
  { value: '1', label: 'Rawat Inap' },
  { value: '2', label: 'Rawat Jalan' }
])
const optionTipe = ref([
  { value: '2', label: 'Faskes 2' }
])
const optionTipeRujukan = ref([
  { value: '0', label: 'Penuh' },
  { value: '1', label: 'Partial' }
])
const optionsRs = ref([])
const optionsPoli = ref([])
function updateModelPoli(val) {
  store.formRsLain.polirujukan = val.kode
  store.formRsLain.namapolirujukan = val.nama
  // console.log('poli ', val)
}
function updateModelPpk(val) {
  store.formRsLain.ppkdirujuk = val.kode
  store.formRsLain.ppkdirujukx = val.nama
  store.formRsLain.namappkdirujuk = val.nama
  // console.log('poli ', val)
}
const onFilterTest = async (val, update, abort) => {
  if (val.length < 3) {
    abort()
    return
  }
  const params = {
    params: {
      namafaskes: val,
      jnsfaskes: store?.formRsLain?.tipefaskes
    }
  }
  const response = await api.get('v1/simrs/pelayanan/faskes', params)
  const code = response?.data?.metadata?.code
  console.log('faskes')
  if (code === '200') {
    update(() => {
      optionsRs.value = response?.data?.result?.faskes
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
  // console.log(response)
  const code = response?.data?.metadata?.code
  if (code === '200') {
    update(() => {
      optionsPoli.value = response?.data?.result?.poli
    })
  }
}

onMounted(() => {
  store.initPasien(props.pasien)
})

function simpan() {
  store.saveRsLain(props?.pasien)
  // console.log('ok')
  // $q.notify({
  //   type: 'negative',
  //   message: 'Maaf, Anda tidak terhubung ke BPJS',
  //   position: 'top-right',
  //   color: 'negative'
  // })
}
</script>
