<template>
  <q-form class="fit" ref="formKP" @submit="onSubmit" @reset="onReset">
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
          :source="data.ptks"
          @selected="(val)=>pilihPTK(val)"
        />
        <app-autocomplete
          v-model="store.form.kodekegiatanblud"
          label="Kegiatan BLUD"
          autocomplete="kegiatan"
          option-label="kegiatan"
          option-value="kodekegiatan"
          outlined
          :source="tarik.kegiatans"
          @selected="(val)=>pilihKegiatan(val)"
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
import { useLaporanBkuPtkStore } from 'src/stores/siasik/laporan/bku/bkuptk'
import { useLaporanLraLaprealisasianggaranStore } from 'src/stores/siasik/laporan/lra/laprealisasianggaran'
import { ref, onMounted } from 'vue'

const tarik = useLaporanLraLaprealisasianggaranStore()
const data = useLaporanBkuPtkStore()
const store = formKontrakPekerjaan()
const formKP = ref(null)

onMounted(() => {
  onReset()
  Promise.all([
    data.getPtks(),
    tarik.getDataBidang(),
    store.getPihaktiga()
  ])
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
      store.emptyForm()
    })
}
const onSubmit = () => {
  // store.simpanKontrak()
  store.simpanKontrak().then(() => {
    if (formKP.value != null) {
      formKP.value.resetValidation()
    }
  })
}
const onReset = () => {
  formKP.value.resetValidation()
}
function pilihKegiatan (val) {
  const arr = tarik.kegiatans
  const obj = arr.length ? arr.find(x => x.kodekegiatan === val) : null
  // console.log('pilihKamar', obj)
  store.form.kegiatanblud = obj?.kegiatan ?? ''
  store.form.kodekegiatanblud = obj?.kodekegiatan ?? ''
  store.form.kodeBagian = obj?.kodebidang ?? ''
}
function pilihPTK (val) {
  const arr = data.ptks
  const obj = arr.length ? arr.find(x => x.nip === val) : null
  // console.log('pilihKamar', obj)
  store.form.namapptk = obj?.nama ?? ''
  store.form.kodepptk = obj?.nip ?? ''
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
