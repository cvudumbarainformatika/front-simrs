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
        <q-select
          v-model="store.formRanap.status"
          label="Operasi"
          dense
          outlined
          standout="bg-yellow-3"
          use-input
          input-debounce="0"
          :options="optionTipe"
          map-options
          emit-value
        />
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

      <div class="col-4">
        <q-select
          v-model="store.formRanap.jenistindakan"
          label="Jenis Tindakan"
          dense
          outlined
          standout="bg-yellow-3"
          use-input
          input-debounce="0"
          :options="optionsJenisTindakan"
          option-value="kdtindakan"
          option-label="tindakan"
          hide-bottom-space
          @filter="onFilterJenisTindakan"
        />
      </div>
      <div class="col-4">
        <q-select
          v-model="store.formRanap.icd9"
          label="Icd 9"
          dense
          outlined
          standout="bg-yellow-3"
          use-input
          input-debounce="0"
          :options="optionsIcd9"
          option-value="kode"
          option-label="nama"
          hide-bottom-space
          @filter="filterIcd9"
        />
      </div>
      <div class="col-4">
        <q-select
          v-model="store.formRanap.kdruangtujuan"
          label="Ruangan Tujuan"
          dense
          outlined
          standout="bg-yellow-3"
          use-input
          input-debounce="0"
          :options="optionsRtujuan"
          option-value="kode"
          option-label="nama"
          hide-bottom-space
          @filter="filterRtujuan"
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
const optionTipe = ref([
  { value: 'Operasi', label: 'YA' },
  { value: 'Tidak', label: 'TIDAK' }
])
const optionsJenisTindakan = ref([{ kdtindakan: '', tindakan: 'ketik minimal 3 huruf untu cari' }])
const optionsIcd9 = ref([])
const optionsRtujuan = ref([])

const onFilterJenisTindakan = async (val, update, abort) => {
  if (val.length < 3) {
    abort()
    return
  }
  const params = {
    params: {
      tindakan: val
    }
  }
  const response = await api.get('v1/simrs/pelayanan/dialogtindakanpoli', params)
  console.log('rsp', response)
  const code = response?.status
  if (code === 200) {
    update(() => {
      optionsJenisTindakan.value = response?.data
    })
  }
}
const filterIcd9 = async (val, update, abort) => {
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
      optionsIcd9.value = response?.data?.result?.poli
    })
  }
}
const filterRtujuan = async (val, update, abort) => {
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
      optionsIcd9.value = response?.data?.result?.poli
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
