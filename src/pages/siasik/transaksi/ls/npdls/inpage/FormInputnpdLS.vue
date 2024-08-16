<template>
  <q-form class="fit" ref="formNpdLS" @submit="onSubmit" @reset="onReset">
    <div class="row">
      <div class="q-pa-sm q-gutter-y-md" style="width: 25%">
        <app-input-simrs
          v-model="store.form.nonpdls"
          label="Nomor NPD-LS"
          disable
        />
        <app-autocomplete
          v-model="store.form.kodepptk"
          label="Pejabat Teknis Kegiatan"
          autocomplete="nama"
          :option-label="opt => Object(opt) === opt && 'nip' in opt ? opt.nama + ' - ' + opt.nip : 'Silahkan Dipilih'"
          option-value="nip"
          outlined
          :source="tarik.ptks"
          @selected="(val)=>pilihPTK(val)"
        />
      </div>
      <div class="q-pa-sm q-gutter-y-md" style="width: 25%">
        <app-input-date
          :model="store.form.tglnpdls"
          label="Tanggal Transaksi"
          icon="icon-mat-event"
          outlined
          @set-model="val=>store.form.tglnpdls=val"
        />
        <app-autocomplete
          v-model="store.form.kodekegiatanblud"
          label="Kegiatan BLUD"
          autocomplete="kegiatan"
          option-label="kegiatan"
          option-value="kodekegiatan"
          outlined
          :source="tarik.kegiatans"
          @db-model="kodeKeg"
          @selected="(val)=>pilihKegiatan(val)"
          :key="store.reqs.kodebidang"
        />
      </div>

      <div class="q-pa-sm q-gutter-y-md" style="width: 50%">
        <!-- <app-autocomplete
          v-model="store.form.serahterimapekerjaan"
          label="Pakai Serahterima Pekerjaan?"
          autocomplete="ket"
          outlined
          option-value="value"
          option-label="ket"
          :source="store.serahterimas"
        /> -->
        <!-- <app-autocomplete
          v-model="store.form.noserahterima"
          label="Pilih Serahterima Pekerjaan"
          outlined
        /> -->
        <app-autocomplete
          v-model="store.form.kodepenerima"
          label="Pihak Ketiga"
          autocomplete="nama"
          option-label="nama"
          option-value="kode"
          outlined
          :source="ambil.pihaktigas"
          @selected="(val)=>pilihPihaktiga(val)"
        />
        <div class="row q-gutter-sm full-width">
          <div>Ada Serahterima ? : </div>
          <q-radio
            v-for="item in store.serahterimas"
            :key="item"
            v-model="store.form.serahterimapekerjaan"
            :val="item.value"
            :label="item.ket"
            dense
            size="sm"
            @update:model-value="(val)=>serahTerima(val)"
          />
        </div>
      </div>

      <app-input-simrs
        class="q-pa-sm q-gutter-y-xs"
        style="width: 50%;"
        v-model="store.form.keterangan"
        label="Keterangan Belanja"
        outlined
        :autofocus="false"
        :valid="{required:true}"
      />
      <app-input-simrs
        class="q-pa-sm q-gutter-y-xs"
        style="width: 50%;"
        v-model="store.form.noserahterima"
        label="Nomor Serahterima"
        disable
        outlined
      />

      <app-input-simrs
        class="q-pa-sm q-gutter-y-xs"
        style="width: 50%;"
        v-model="store.form.biayatransfer"
        label="Biaya Administrasi"
        outlined
        :autofocus="false"
        :valid="{required:true, number:true}"
      />

      <!-- <div class="float-right q-pa-sm q-gutter-y-xs">
        <app-btn
          label="Simpan"
          :disable="store.loading"
          :loading="store.loading"
          @click="onSimpan()"
        />
      </div> -->
    </div>
    <select-serahterima
      v-model="store.openDialogCariSerahterima"
      @selected="pilihSerahterima"
      :key="carisrt.reqs.kodepenerima"
    />

    <div class="q-card q-mt-sm">
      <div class="row bg-grey-5 text-primary q-pa-sm q-mb-xs q-mt-xs">
        <div class="f-14 text-weight-bold">
          Rincian NPD-LS
        </div>
      </div>
      <FormRincianNPDls />
    </div>
    <div class="float-right q-pa-sm q-gutter-y-xs">
      <app-btn
        label="Simpan NPD-LS"
        :disable="store.loading"
        :loading="store.loading"
        @click="onSimpan()"
      />
    </div>
  </q-form>
  {{ tanggal() }}
</template>

<script setup>
import { defineAsyncComponent, ref, onMounted, onBeforeUnmount } from 'vue'
import { formNotaPermintaanDanaLS } from 'src/stores/siasik/transaksi/ls/npdls/formnpdls'
// import { useLaporanBkuPtkStore } from 'src/stores/siasik/laporan/bku/bkuptk'
import { formKontrakPekerjaan } from 'src/stores/siasik/transaksi/ls/kontrak/formkontrak'
import { useLaporanLraLaprealisasianggaranStore } from 'src/stores/siasik/laporan/lra/laprealisasianggaran'
import { dataBastFarmasi } from 'src/stores/siasik/transaksi/ls/npdls/databast'
import FormRincianNPDls from './FormRincianNPDls.vue'

const SelectSerahterima = defineAsyncComponent(() => import('./SelectSerahterima.vue'))

const tarik = useLaporanLraLaprealisasianggaranStore()
const ambil = formKontrakPekerjaan()
const store = formNotaPermintaanDanaLS()
const carisrt = dataBastFarmasi()

// const data = useLaporanBkuPtkStore()
const formNpdLS = ref(null)

const onSubmit = () => {
  store.simpanNpdls()
    .then(() => {
      if (formNpdLS.value != null) {
        formNpdLS.value.resetValidation()
      }
    })
}
const onReset = () => {
  formNpdLS.value.resetValidation()
}
onMounted(() => {
  onReset()
  // store.getRincianBelanja()
  Promise.all([
    // data.getPtks(),
    tarik.getDataBidang(),
    ambil.getPihaktiga(),

    pilihKegiatan()
    // store.selectbastFarmasi()
  ])
})

onBeforeUnmount(() => {
  store.resetFORM()
})
function kodeKeg (val) {
  store.setParams('kodekegiatan', val)
  console.log('kkkk', store.setParams)
}
function tanggal (val) {
  const tgl = store.form.tglnpdls
  console.log('tanggal', tgl)
}

function onSimpan () {
  store.simpanNpdls()
  // .then(() => {
  //   store.emptyForm()
  // })
}

const serahTerima = (val) => {
  console.log('serahTerima', val)
  if (val === '1') {
    store.openDialogCariSerahterima = true
  }
}
const pilihSerahterima = (val) => {
  store.setForm(val)
}

function pilihKegiatan (val) {
  const arr = tarik.kegiatans
  const obj = arr.length ? arr.find(x => x.kodekegiatan === val) : null
  // console.log('pilihKegiatan', obj)
  store.form.kegiatanblud = obj?.kegiatan ?? ''
  store.form.kodekegiatanblud = obj?.kodekegiatan ?? ''
  store.reqs.kodekegiatan = val ?? ''
  store.getRincianBelanja()
  console.log('kodekegiatan', store.reqs.kodekegiatan)
}
function pilihPTK (val) {
  const arr = tarik.ptks
  const obj = arr.length ? arr.find(x => x.nip === val) : null
  // console.log('pilihKamar', obj)
  store.form.pptk = obj?.nama ?? ''
  store.form.kodepptk = obj?.nip ?? ''
  // store.form.kodekegiatanblud = ''
  store.form.kodebidang = obj?.kodeBagian ?? ''
  store.reqs.kodebidang = obj?.kodeBagian ?? ''
  store.form.kodekegiatanblud = ''
  store.form.bidang = obj?.bagian ?? ''
  console.log('kodebidang', store.reqs.kodebidang)
}
function pilihPihaktiga (val) {
  const arr = ambil.pihaktigas
  const obj = arr.length ? arr.find(x => x.kode === val) : null
  // console.log('pilihPihaktiga', obj)
  store.form.penerima = obj?.nama ?? ''
  store.form.kodepenerima = obj?.kode ?? ''
  carisrt.reqs.kodepenerima = val ?? ''
  store.form.serahterimapekerjaan = '2'
  store.form.bank = obj?.bank ?? ''
  store.form.rekening = obj?.norek ?? ''
  store.form.npwp = obj?.npwp ?? ''
}
</script>

<style lang="scss" scoped>

</style>
