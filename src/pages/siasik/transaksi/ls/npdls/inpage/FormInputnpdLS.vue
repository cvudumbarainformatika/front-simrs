<template>
  <q-form class="fit" ref="formNpdLS" @submit="onSimpan" @reset="onReset">
    <div class="row">
      <div class="q-pa-sm q-gutter-y-md" style="width: 25%">
        <app-input-simrs
          v-model="store.form.nonpdls"
          label="Nomor NPD-LS"
          disable
          outlined
          dense
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
          :disable="store.disabled && store.loading"
          :autofocus="false"
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
          :disable="store.disabled"
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

        <app-autocomplete
          v-model="store.form.kodepenerima"
          label="Pihak Ketiga"
          autocomplete="nama"
          option-label="nama"
          option-value="kode"
          outlined
          :source="ambil.pihaktigas"
          @selected="(val)=>pilihPihaktiga(val)"
          :disable="store.disabled"
          :loading="store.loading"
        />

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

          <template v-if="store.form.serahterimapekerjaan === '3'">
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
      <template v-if="store.form.serahterimapekerjaan === '3'">
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
            :disable="store.disabled"
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
          :disable="store.disabled"
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
    <template v-if="store.reqs.rincianmanual">
      <div>
        <q-table
          :rows="store.form.rincians"
          :columns="columns"
          row-key="name"
          hide-bottom
        >
          <template #body="props">
            <q-tr :props="props">
              <q-td key="rincianbelanja" :props="props" class="text-left">
                {{ props.row.rincianbelanja }}
              </q-td>
              <q-td key="koderek50" :props="props" class="text-left">
                {{ props.row.koderek50 }}
              </q-td>
              <q-td key="itembelanja" :props="props" class="text-left">
                {{ props.row.itembelanja }}
              </q-td>
              <q-td key="nominalpembayaran" :props="props" class="text-right">
                {{ formattanpaRp(props.row.nominalpembayaran) }}
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
      <div class="subtotal">
        <table class="vertical-center">
          <tr>
            <td width="200px" class="text-bold q-pl-md">
              SUBTOTAL
            </td>
            <td width="200px" class="text-bold">
              :
            </td>
            <td width="200px" class="text-right text-bold q-pr-md">
              {{ formattanpaRp(store.reqs.subtotal) }}
            </td>
          </tr>
        </table>
      </div>
    </template>
    <div class="row items-center float-left q-pt-md q-pa-sm q-gutter-y-xs">
      <app-btn
        label="Simpan NPD-LS"
        :disable="store.loading"
        :loading="store.loading"
        @click="onSimpan()"
      />

      <div class="q-pl-md">
        <q-btn
          unelevated
          color="dark"
          round
          size="sm"
          icon="icon-mat-description"
          @click=" () => {
            store.dialogCetakNpd = true}"
        >
          <q-tooltip
            class="primary"
            :offset="[10, 10]"
          >
            Print
          </q-tooltip>
        </q-btn>
      </div>
      <print-npdls
        v-model="store.dialogCetakNpd"
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
// import PrintNpdls from '../print/PrintNpdls.vue'
import { formattanpaRp } from 'src/modules/formatter'
// eslint-disable-next-line no-unused-vars
import { notifErrVue, notifSuccessVue } from 'src/modules/utils'

const SelectSerahterima = defineAsyncComponent(() => import('./SelectSerahterima.vue'))

const PrintNpdls = defineAsyncComponent(() => import('../print/PrintNpdls.vue'))

// defineProps({
//   data: {
//     type: Object,
//     default: null
//   }
// })
// const emits = defineEmits(['cetakNPD'])
// const tarik = useLaporanLraLaprealisasianggaranStore()
const ambil = formKontrakPekerjaan()
const store = formNotaPermintaanDanaLS()
const carisrt = dataBastFarmasi()
// const data = useLaporanBkuPtkStore()
const formNpdLS = ref(null)

const tablerinci = [
  {
    label: 'Rincian Belanja',
    name: 'rincianbelanja',
    align: 'center',
    field: 'rincianbelanja'
  },
  {
    label: 'Rekening',
    name: 'koderek50',
    align: 'center',
    field: 'koderek50'
  },
  {
    label: 'Item Belanja',
    name: 'itembelanja',
    align: 'center',
    field: 'itembelanja'
  },
  {
    label: 'Jumlah',
    name: 'nominalpembayaran',
    align: 'center',
    field: 'nominalpembayaran'
  }
]
const columns = ref(tablerinci)
// eslint-disable-next-line no-unused-vars
const onSubmit = () => {
  store.simpanNpdls()
  // .then(() => {
  //   if (formNpdLS.value != null) {
  //     formNpdLS.value.resetValidation()
  //   }
  // })
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

// function hitungSubtotal () {
//   const arr = store.form.rincians
//   const obj = arr.length ? arr.map((x) => x.nominalpembayaran) : []
//   const subtotal = obj.reduce((x, y) => x + y, 0)
//   // console.log('jumlah', obj)
//   // const total = nominal.reduce((x, y) => x + y, 0)

//   store.reqs.subtotal.push(subtotal)
//   return subtotal
// }

function kodeKeg (val) {
  store.setParams('kodekegiatan', val)
  console.log('kkkk', store.setParams)
}
// function tanggal (val) {
//   const tgl = store.form.tglnpdls
//   console.log('tanggal', tgl)
// }

function onSimpan (val) {
  // if (store.reqs.subtotal > store.itembelanja.sisapagu) {
  //   return notifErrVue('Maaf Pengajuan Lebih dari Sisa Pagu')
  // }
  const unikjumlah = store.form.rincians.map((x) => x.koderek108)
  const unik = unikjumlah.length ? [...new Set(unikjumlah)] : []
  const arr = []
  for (let i = 0; i < unik.length; i++) {
    const el = unik[i]
    const obj = {
      jumlah: store.form.rincians.filter((z) => z.koderek108 === el).map((x) => parseFloat(x.nominalpembayaran)).reduce((a, b) => a + b, 0),
      koderek108: el,
      sisapagu: store.form.rincians.filter((z) => z.koderek108 === el)[0]?.sisapagu

    }
    console.log('jumlahnya', obj?.jumlah)
    console.log('sisa', obj?.sisapagu)
    if (obj?.jumlah > obj?.sisapagu) {
      return notifErrVue('Maaf Pengajuan Lebih dari Sisa Pagu')
    }
    arr.push(obj)
    const subtotal = arr.map((x) => x.jumlah).reduce((x, y) => x + y, 0)
    store.reqs.subtotal = subtotal
  }
  store.simpanNpdls()
  // return notifSuccessVue('Sukses Disimpan')

  // console.log('sisa', carisrt.itembelanja)
  // console.log('realisas', store.reqs.jmlperkoderek108)
  // console.log('tidak boleh', store.reqs.subtotal > carisrt.itembelanja.sisapagu)

  // store.form.rincians.push(store.rinci = val)
  // .then(() => {
  //   store.resetFORM()
  //   carisrt.itembelanja = []
  //   store.form.rincians = {}
  // })
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
.subtotal{
  position: relative;
  top: 20px;
  left: 70%;
  width: 30%;
  height: 35px;
  background-color: rgb(245, 200, 0);
  border-radius: 5px;
}
.vertical-center {
  margin: 0;
  position: absolute;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}
</style>
