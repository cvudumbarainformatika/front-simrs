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
      <div class="col-3">
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

      <div class="col-3">
        <app-autocomplete
          v-model="store.formRanap.kdruangtujuan"
          label="Ruangan Tujuan"
          dense
          outlined
          standout="bg-yellow-3"
          use-input
          :source="optionsRtujuan"
          option-value="groups"
          option-label="groups_nama"
          autocomplete="groups_nama"
          @selected="ruangRanapSelected"
        />
      </div>
      <div class="col-4">
        <app-input-date
          :model="store.formRanap.tglrencanakunjungan"
          label="Tgl Rencana Kontrol"
          outlined
          @set-model="(val) => store.setFormRanap('tglrencanakunjungan', val)"
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

      <div class="col-6">
        <app-autocomplete-debounce-input
          :model="store.formRanap.jenistindakan"
          label="Jenis Tindakan"
          dense
          outlined
          standout="bg-yellow-3"
          :source="optionsJenisTindakan"
          option-value="kdtindakan"
          option-label="tindakan"
          autocomplete="tindakan"
          :loading="loadingTind"
          @buang="onFilterJenisTindakan"
          @clear="store.setFormRanap('jenistindakan', null)"
          @on-select="store.setFormRanap('jenistindakan', $event)"
        />
      </div>
      <div class="col-6">
        <app-autocomplete-debounce-input
          v-model="store.formRanap.icd9"
          label="Icd 9"
          outlined
          standout="bg-yellow-3"
          :source="optionsIcd9"
          option-value="kd_prosedur"
          option-label="prosedur"
          autocomplete="prosedur"
          :loading="loadingIcd"
          @buang="filterIcd9"
          @clear="store.setFormRanap('icd9', null)"
          @on-select="store.setFormRanap('icd9', $event)"
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
const optionsJenisTindakan = ref([])
const optionsIcd9 = ref([])
const optionsRtujuan = ref([])

const loadingTind = ref(false)
async function onFilterJenisTindakan(val) {
  if (val.length < 3) {
    return
  }
  loadingTind.value = true
  const params = {
    params: {
      tindakan: val
    }
  }
  await api.get('v1/simrs/pelayanan/dialogtindakanpoli', params).then(response => {
    loadingTind.value = false
    const code = response?.status
    if (code === 200) {
      optionsJenisTindakan.value = response?.data
    }
    console.log('resp jenisT', optionsJenisTindakan.value)
  }).catch(() => {
    loadingTind.value = false
  })
}
// function jnsClear() {
//   store.setFormRanap('jenistindakan', null)
// }
const loadingIcd = ref(false)
async function filterIcd9(val) {
  if (val.length < 3) {
    return
  }
  loadingIcd.value = true
  const params = {
    params: {
      q: val
    }
  }
  const response = await api.get('v1/simrs/ranap/ruangan/mastericd9', params)
  loadingIcd.value = false
  console.log(response)
  if (response?.data.length) {
    optionsIcd9.value = response?.data
  } else {
    optionsIcd9.value = []
  }
}

async function getRuang() {
  const response = await api.get('v1/simrs/ranap/ruangan/listruanganranap')
  optionsRtujuan.value = response?.data
}
function ruangRanapSelected(val) {
  console.log(val)
}
onMounted(() => {
  store.initPasienRanap(props.pasien)
  getRuang()
})

function simpan() {
  console.log('ok', store.formRanap)
  store.saveRanap(props.pasien)
  // console.log('opt', optionsIcd9.value, optionsJenisTindakan.value)
  // $q.notify({
  //   type: 'negative',
  //   message: 'Maaf, Anda tidak terhubung ke BPJS',
  //   position: 'top-right',
  //   color: 'negative'
  // })
}
</script>
