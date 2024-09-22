<template>
  <q-form class="fit" ref="formKP" @submit="onSimpan" @reset="onReset">
    <div class="row">
      <div class="q-pa-md q-gutter-y-md" style="width: 50%;">
        <app-input-simrs
          v-model="store.form.nokontrak"
          label="No. Transaksi"
          disable
        />
        <app-input-date
          :model="store.form.tgltrans"
          label="Tanggal Transaksi"
          icon="icon-mat-event"
          outlined
          @set-model="val=>store.form.tgltrans=val"
        />
        <app-input-date
          :model="store.form.tglmulaikontrak"
          label="Tanggal Mulai Kontrak"
          icon="icon-mat-event"
          outlined
          @set-model="val=>store.form.tglmulaikontrak=val"
        />
        <app-input-date
          :model="store.form.tglakhirkontrak"
          label="Tanggal Akhir Kontrak"
          icon="icon-mat-event"
          outlined
          @set-model="val=>store.form.tglakhirkontrak=val"
        />
        <app-input-simrs
          v-model="store.form.termin"
          label="Termin"
          outlined
          :autofocus="false"
        />
      </div>
      <div class="q-pa-md q-gutter-y-md" style="width: 50%;">
        <app-input-simrs
          v-model="store.form.nokontrakx"
          label="No. Kontrak"
          outlined
          :autofocus="false"
          :valid="{required: true}"
        />
        <app-autocomplete
          v-model="store.form.kodepptk"
          label="Pejabat Teknis Kegiatan"
          autocomplete="nama"
          :option-label="opt => Object(opt) === opt && 'nip' in opt ? opt.nama + ' - ' + opt.nip : 'Silahkan Dipilih'"
          option-value="nip"
          outlined
          :source="store.ptks"
          @selected="(val)=>pilihPTK(val)"
          :disable="store.disabled"
          :loading="store.loading"
          :valid="{required: true}"
        />
        <app-autocomplete
          v-model="store.form.kodekegiatanblud"
          label="Kegiatan BLUD"
          autocomplete="kegiatan"
          option-label="kegiatan"
          option-value="kodekegiatan"
          outlined
          :source="store.kegiatans"
          @db-model="kodeKeg"
          @selected="(val)=>pilihKegiatan(val)"
          :key="store.reqs.kodebidang"
          :disable="store.disabled"
          :loading="store.loading"
        />

        <app-autocomplete
          v-model="store.form.kodeperusahaan"
          label="Pihak Ketiga"
          autocomplete="nama"
          option-label="nama"
          option-value="kode"
          outlined
          :source="store.pihaktigas"
          @selected="(val)=>pilihPihaktiga(val)"
        />
        <app-input-simrs
          label="Nilai Kontrak"
          v-model="store.form.nilaikontrak"
          outlined
          :autofocus="false"
          :valid="{required:true, number:true}"
        />
        <div class="float-right">
          <app-btn
            label="Simpan"
            :disable="store.loading"
            :loading="store.loading"
            @click="onSimpan()"
          />
        </div>
      </div>
    </div>
  </q-form>
</template>
<script setup>
import { formKontrakPekerjaan } from 'src/stores/siasik/transaksi/ls/kontrak/formkontrak'
// import { useLaporanLraLaprealisasianggaranStore } from 'src/stores/siasik/laporan/lra/laprealisasianggaran'
// eslint-disable-next-line no-unused-vars
import { ref, onMounted, onBeforeMount } from 'vue'
// import { formNotaPermintaanDanaLS } from 'src/stores/siasik/transaksi/ls/npdls/formnpdls'

// const tarik = useLaporanLraLaprealisasianggaranStore()
// const data = formNotaPermintaanDanaLS()
const store = formKontrakPekerjaan()
const formKP = ref(null)
const onReset = () => {
  formKP.value.resetValidation()
}
onMounted(() => {
  onReset()
  Promise.all([
    store.getDataBidang(),
    store.filterPtk(),
    // tarik.getDataBidang(),
    store.getPihaktiga()
  ])
})
onBeforeMount(() => {
  store.resetFORM()
})
// const pilihTanggal = (val) => {
//   store.setForm('tgltrans', val)
// }
// const tglMulai = (val) => {
//   store.setForm('tglmulaikontrak', val)
// }
// const tglAkhir = (val) => {
//   store.setForm('tglakhirkontrak', val)
// }
// const termin = (val) => {
//   store.setForm('termin', val)
// }
function onSimpan () {
  store.simpanKontrak()
    .then(() => {
      if (formKP.value != null) {
        formKP.value.resetValidation()
      }
      store.emptyForm()
    })
}
// const onSubmit = () => {
//   // store.simpanKontrak()
//   store.simpanKontrak().then(() => {
//     if (formKP.value != null) {
//       formKP.value.resetValidation()
//     }
//   })
// }

function kodeKeg (val) {
  store.setParams('kodekegiatan', val)
  console.log('kkkk', store.setParams)
}

function pilihPTK (val) {
  const arr = store.ptks
  const obj = arr.length ? arr.find(x => x.nip === val) : null
  console.log('piliObj', obj)
  store.form.namapptk = obj?.nama ?? ''
  store.form.kodepptk = obj?.nip ?? ''

  store.form.kodeBagian = obj?.kodeBagian ?? ''
  store.reqs.kodebidang = obj?.kodeBagian ?? ''
  console.log('bidang', store.reqs.kodebidang)

  store.reqs.nip = obj?.nip ?? ''
  console.log('nip', store.reqs.nip)
  store.filterKegiatan()
}
function pilihKegiatan (val) {
  const arr = store.kegiatans
  console.log('keegiatan', arr)
  const obj = arr.length ? arr.find(x => x.kodekegiatan === val) : null
  // console.log('pilihKamar', obj)
  store.form.kegiatanblud = obj?.kegiatan ?? ''
  store.form.kodekegiatanblud = obj?.kodekegiatan ?? ''
  // store.form.kodeBagian = obj?.kodebidang ?? ''
}
function pilihPihaktiga (val) {
  const arr = store.pihaktigas
  const obj = arr.length ? arr.find(x => x.kode === val) : null
  // console.log('pilihPihaktiga', obj)
  store.form.namaperusahaan = obj?.nama ?? ''
  store.form.kodeperusahaan = obj?.kode ?? ''
  store.form.kodemapingrs = obj?.kodemapingrs ?? ''
  store.form.namasuplier = obj?.namasuplier ?? ''
}
</script>
