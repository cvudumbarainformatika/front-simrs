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
          :source="store.ptks"
          @selected="(val)=>pilihPTK(val)"
          :disable="store.loading"
          :loading="store.loading"
        />
        <!-- <app-autocomplete
          v-model="store.form.kodepptk"
          label="Pejabat Teknis Kegiatan"
          autocomplete="nama"
          :option-label="opt => Object(opt) === opt && 'nip' in opt ? opt.nama + ' - ' + opt.nip : 'Silahkan Dipilih'"
          option-value="nip"
          outlined
          :source="tarik.ptks"
          @selected="(val)=>{
            const arr = tarik.kegiatans
            const cari = arr.filter(x => x.kodepptk === store.form.kodepptk)
            console.log('olene select', cari)
            store.form.kodekegiatanblud = cari.kodekegiatan
          }"
        /> -->
      </div>
      <div class="q-pa-sm q-gutter-y-md" style="width: 25%">
        <app-input-date
          :model="store.form.tglnpdls"
          label="Tanggal Transaksi"
          icon="icon-mat-event"
          outlined
          @set-model="val=>store.form.tglnpdls=val"
          :disable="store.loading"
          :loading="store.loading"
          autofocus
        />
        <!-- <app-autocomplete
          v-model="store.form.kodekegiatanblud"
          label="Kegiatan BLUD"
          autocomplete="kegiatan"
          option-label="kegiatan"
          option-value="kodekegiatan"
          outlined
          :source="tarik.kegiatans"
          @db-model="kodeKeg"
          :key="store.reqs.kodebidang"
        /> -->
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
          :disable="store.loading"
          :loading="store.loading"
        />
      </div>

      <div class="q-pa-sm q-gutter-y-md " style="width: 50%">
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
        <template v-if="store.form.kodepenerima === null">
          <app-autocomplete
            v-model="store.form.kodepenerima"
            label="Pihak Ketiga"
            autocomplete="nama"
            option-label="nama"
            option-value="kode"
            outlined
            :source="ambil.pihaktigas"
            @selected="(val)=>pilihPihaktiga(val)"
            :disable="store.loading"
            :loading="store.loading"
          />
        </template>
        <template v-else>
          <app-autocomplete
            v-model="store.form.kodepenerima"
            label="Pihak Ketiga"
            autocomplete="nama"
            option-label="nama"
            option-value="kode"
            outlined
            disable
            :source="ambil.pihaktigas"
            @selected="(val)=>pilihPihaktiga(val)"
          />
        </template>
        <div class="row items-center">
          <div>
            Ada Serahterima ? :
            <q-radio
              class="q-pl-sm q-pr-lg"
              v-for="item in store.serahterimas"
              :key="item"
              v-model="store.form.serahterimapekerjaan"
              :val="item.value"
              :label="item.ket"
              dense
              size="sm"
            />
          </div>

          <template v-if="store.form.serahterimapekerjaan === '1'">
            <div>
              <app-autocomplete
                v-model="store.form.bast"
                label="Serah Terima Dari"
                autocomplete="nama"
                option-value="value"
                option-label="nama"
                outlined
                :key="carisrt.reqs.kodepenerima"
                :source="store.dariserahterima"
                @update:model-value="(val)=>serahTerima(val)"
              />
            </div>
          </template>
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
      <template v-if="store.form.serahterimapekerjaan === '1'">
        <app-input-simrs
          class="q-pa-sm q-gutter-y-xs"
          style="width: 40%;"
          v-model="store.form.noserahterima"
          label="Nomor Serahterima"
          disable
          outlined
          :autofocus="false"
          :valid="{required:true}"
        />

        <div class="row items-center">
          <q-btn
            color="dark"
            round
            size="sm"
            :disable="store.loading"
            :loading="store.loading"
            icon="icon-mat-add"
            :source="store.dariserahterima"
            :key="carisrt.reqs.kodepenerima"
            @click=" () => {
              carisrt.reqs.kodebast = ''
              store.openDialogFarmasi = true}"
          />
        </div>
      </template>
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
      v-model="store.openDialogFarmasi"
      :key="carisrt.reqs.kodepenerima"
    />
    <select-serahterima
      v-model="store.openDialogSiasik"
    />

    <div class="q-card q-mt-sm">
      <div class="row bg-grey-4 text-primary q-pa-sm q-mb-xs q-mt-xs">
        <div class="f-14 text-weight-bold">
          Rincian NPD-LS
        </div>
      </div>
      <FormRincianNPDls />
    </div>
    <div class="float-left q-pt-md q-pa-sm q-gutter-y-xs">
      <app-btn
        label="Simpan NPD-LS"
        :disable="store.loading"
        :loading="store.loading"
        @click="onSimpan()"
      />
    </div>
  </q-form>
</template>

<script setup>
import { defineAsyncComponent, ref, onMounted, onBeforeUnmount } from 'vue'
import { formNotaPermintaanDanaLS } from 'src/stores/siasik/transaksi/ls/npdls/formnpdls'
// import { useLaporanBkuPtkStore } from 'src/stores/siasik/laporan/bku/bkuptk'
import { formKontrakPekerjaan } from 'src/stores/siasik/transaksi/ls/kontrak/formkontrak'
// import { useLaporanLraLaprealisasianggaranStore } from 'src/stores/siasik/laporan/lra/laprealisasianggaran'
import { dataBastFarmasi } from 'src/stores/siasik/transaksi/ls/npdls/databast'
import FormRincianNPDls from './FormRincianNPDls.vue'

const SelectSerahterima = defineAsyncComponent(() => import('./SelectSerahterima.vue'))

// const tarik = useLaporanLraLaprealisasianggaranStore()
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
    store.getDataBidang(),
    store.filterPtk(),
    ambil.getPihaktiga()
    // carisrt.selectbastFarmasi(),
    // pilihKegiatan()
    // pilihPTK()
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
// function tanggal (val) {
//   const tgl = store.form.tglnpdls
//   console.log('tanggal', tgl)
// }

function onSimpan (val) {
  store.simpanNpdls()
  // store.form.rincians.push(store.rinci = val)
    .then(() => {
      store.resetFORM()
      carisrt.itembelanja = []
      store.form.rincians = {}
    })
}

const serahTerima = (val) => {
  console.log('serahTerima', val)
  if (val === '2') {
    store.openDialogSigarang = false
  }
  else if (val === '3') {
    store.openDialogFarmasi = true
    carisrt.reqs.kodebast = ''
  }
  else if (val === '4') {
    store.openDialogSiasik = false
  }
}
// const pilihSerahterima = (val) => {
//   // store.setForm(val)
//   store.reqs.bast = val
//   // const obj = arr.find(x => x.nobast === val)

//   // store.reqs.bast = val
//   console.log('BAST', store.reqs.bast)
//   // store.openDialogFarmasi = false
// }

function pilihPTK (val) {
  const arr = store.ptks
  // console.log('ptk', arr)
  const obj = arr.length ? arr.find(x => x.nip === val) : null
  // console.log('pilihKamar', obj)
  store.form.pptk = obj?.nama ?? ''
  store.form.kodepptk = obj?.nip ?? ''
  // store.form.kodekegiatanblud = ''
  store.form.kodebidang = obj?.kodeBagian ?? ''
  store.reqs.kodebidang = obj?.kodeBagian ?? ''

  // mengkosongkan form rinci setelah milih ulang PTK
  store.rinci.koderek50 = ''
  store.rinci.koderek108 = ''
  store.rinci.itembelanja = ''
  store.rinci.volume = ''
  store.rinci.satuan = ''
  store.rinci.harga = ''
  store.rinci.total = ''
  store.rinci.volumels = ''
  store.rinci.hargals = ''
  store.rinci.totalls = ''
  store.rinci.nominalpembayaran = ''
  // mengkosongkan form Kegiatan setelah milih ulang PTK
  store.form.kodekegiatanblud = ''
  store.form.bidang = obj?.bagian ?? ''
  // console.log('kodebidang', store.reqs.kodebidang)

  // filter kegiatan berdasarkan nip
  store.reqs.nip = obj?.nip ?? ''
  store.filterKegiatan()
}
function pilihKegiatan (val) {
  const arr = store.kegiatans
  // console.log('arr', arr)
  const obj = arr.length ? arr.find(x => x.kodekegiatan === val) : null
  // console.log('pilihKegiatanxxxx', obj)
  store.form.kegiatanblud = obj?.kegiatan ?? ''
  store.form.kodekegiatanblud = obj?.kodekegiatan ?? ''

  // Mengosongkan Rincian Belanja setelah milih ulang kegiatan
  store.rinci.koderek50 = ''
  store.rinci.koderek108 = ''
  store.rinci.itembelanja = ''
  store.rinci.volume = ''
  store.rinci.satuan = ''
  store.rinci.harga = ''
  store.rinci.total = ''
  store.rinci.volumels = ''
  store.rinci.hargals = ''
  store.rinci.totalls = ''
  store.rinci.nominalpembayaran = ''

  carisrt.reqs.kodekegiatan = val ?? ''
  carisrt.selectbastFarmasi()
  store.reqs.kodekegiatan = val ?? ''
  store.getRincianBelanja()
  // console.log('kodekegiatan', store.reqs.kodekegiatan)
}
function pilihPihaktiga (val) {
  const arr = ambil.pihaktigas
  const obj = arr.length ? arr.find(x => x.kode === val) : null
  // console.log('pilihPihaktiga', obj)
  store.form.penerima = obj?.nama ?? ''
  store.form.kodepenerima = obj?.kode ?? ''
  carisrt.reqs.kodepenerima = val ?? ''
  store.form.serahterimapekerjaan = '2'
  carisrt.reqs.kodebast = '1'
  store.form.bast = '1'
  store.form.bank = obj?.bank ?? ''
  store.form.rekening = obj?.norek ?? ''
  store.form.npwp = obj?.npwp ?? ''

  // console.log('penerima', carisrt.reqs.kodepenerima)
}
</script>

<style lang="scss" scoped>

</style>
