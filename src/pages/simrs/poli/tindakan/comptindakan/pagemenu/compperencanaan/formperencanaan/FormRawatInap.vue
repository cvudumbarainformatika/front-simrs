<template>
  <q-form
    ref="formRef"
    @submit="simpan"
  >
    <div class="row q-col-gutter-sm">
      <div class="col-3">
        <q-input
          v-model="store.formRanap.norm"
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
          v-model="store.formRanap.noka"
          label="NOKA (Automatis)"
          dense
          outlined
          standout="bg-yellow-3"
          readonly
        />
      </div>
      <div class="col-6">
        <!-- <q-input
          v-model="store.formRanap.nosep"
          label="SEP (Automatis)"
          dense
          outlined
          standout="bg-yellow-3"
          readonly
        /> -->
      </div>
      <div class="col-4">
        <app-input-date
          :model="store.formRanap.tglrencanakontrol"
          label="Tgl Rencana Kontrol"
          outlined
          @set-model="(val) => store.setFormRanap('tglrencanakontrol', val)"
        />
      </div>
      <div class="col-4">
        <app-input-date
          :model="store.formRanap.tanggaloperasi"
          label="Tgl Operasi"
          outlined
          @set-model="(val) => store.setFormRanap('tanggaloperasi', val)"
        />
      </div>
      <div class="col-4">
        <app-input-date
          :model="store.formRanap.tglupdate"
          label="Tgl Update"
          outlined
          @set-model="(val) => store.setFormRanap('tglupdate', val)"
        />
      </div>

      <!-- <div class="col-3">
        <q-select
          v-model="store.formRanap.tiperujukan"
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
      </div> -->
      <div class="col-6">
        <q-select
          v-model="store.formRanap.ppkdirujuk"
          label="Jenis Tindakan"
          dense
          outlined
          standout="bg-yellow-3"
          use-input
          input-debounce="0"
          :options="optionsRs"
          option-value="kode"
          option-label="nama"
          hide-bottom-space
          @filter="onFilterTest"
        />
      </div>
      <div class="col-6">
        <q-select
          v-model="store.formRanap.polirujukan"
          label="Icd 9"
          dense
          outlined
          standout="bg-yellow-3"
          use-input
          input-debounce="0"
          :options="optionsPoli"
          option-value="kode"
          option-label="nama"
          hide-bottom-space
          @filter="filterPoli"
        />
      </div>
      <div class="col-6">
        <q-select
          v-model="store.formRanap.ppkdirujuk"
          label="Dari Ruangan"
          dense
          outlined
          standout="bg-yellow-3"
          use-input
          input-debounce="0"
          :options="optionsRs"
          option-value="kode"
          option-label="nama"
          hide-bottom-space
          @filter="onFilterTest"
        />
      </div>
      <div class="col-6">
        <q-select
          v-model="store.formRanap.polirujukan"
          label="Ruangan Tujuan"
          dense
          outlined
          standout="bg-yellow-3"
          use-input
          input-debounce="0"
          :options="optionsPoli"
          option-value="kode"
          option-label="nama"
          hide-bottom-space
          @filter="filterPoli"
        />
      </div>
      <div class="col-12">
        <q-input
          v-model="store.formRanap.keterangan"
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
// const optionsJnsKunjungan = ref([
//   { value: '', label: '-------' },
//   { value: '1', label: 'Rawat Inap' },
//   { value: '2', label: 'Rawat Jalan' }
// ])
// const optionTipe = ref([
//   { value: '1', label: 'Faskes 1' }
// ])
const optionsRs = ref([])
const optionsPoli = ref([])

const onFilterTest = async (val, update, abort) => {
  if (val.length < 3) {
    abort()
    return
  }
  const params = {
    params: {
      namafaskes: val,
      jnsfaskes: store?.formPrb?.tiperujukan
    }
  }
  const response = await api.get('v1/simrs/pelayanan/faskes', params)
  const code = response?.data?.metadata?.code
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
  console.log(response)
  const code = response?.data?.metadata?.code
  if (code === '200') {
    update(() => {
      optionsPoli.value = response?.data?.result?.poli
    })
  }
}

onMounted(() => {
  store.initPasienRanap(props.pasien)
})

function simpan() {
  console.log('ok', props.pasien)
  // $q.notify({
  //   type: 'negative',
  //   message: 'Maaf, Anda tidak terhubung ke BPJS',
  //   position: 'top-right',
  //   color: 'negative'
  // })
}
</script>
