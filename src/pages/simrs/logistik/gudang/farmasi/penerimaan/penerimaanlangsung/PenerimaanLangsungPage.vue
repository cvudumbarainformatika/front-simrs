<template>
  <div
    class="fixed-top row no-wrap items-center justify-between q-mx-sm bg-white"
    style="z-index: 10;"
  >
    <div>
      <div class="row items-center">
        <div class="q-mr-md">
          No Penerimaan:
        </div>
        <div class="q-mr-sm">
          {{ store.form.nopenerimaan? store.form.nopenerimaan :'-' }}
        </div>
        <div class="q-ml-md">
          <q-btn
            v-if="store.form.nopenerimaan"
            flat
            icon="icon-mat-done"
            dense
            color="primary"
            :loading="store.loadingKunci"
            :disable="store.loadingKunci"
            @click="kunci()"
          >
            <q-tooltip
              class="primary"
              :offset="[10, 10]"
            >
              Selesai dan Kunci Penerimaan
            </q-tooltip>
          </q-btn>
        </div>
      </div>
    </div>
    <div>
      <q-btn
        flat
        :icon="!style.componentfull ? 'icon-mat-open_in_full' : 'icon-mat-close_fullscreen'"
        round
        :color="style.componentfull ? 'green' : 'primary'"
        size="12px"
        class="q-ml-md"
        @click="style.setComponentFull"
      />
    </div>
  </div>
  <!-- penerimaan -->
  <div class="q-mt-lg q-py-md q-px-sm">
    <!-- header -->
    <div class="row items-center q-col-gutter-md q-px-sm q-pb-md">
      <div class="col-6">
        <div class="row q-col-gutter-md no-wrap q-mb-xs">
          <div class="col-12">
            <app-autocomplete-debounce-input
              ref="refPbf"
              v-model="store.form.kdpbf"
              label="Cari Penyedia"
              autocomplete="nama"
              option-label="nama"
              option-value="kode"
              outlined
              :loading="store.loadingPihakTiga"
              :source="store.pihakTigas"
              :rules="[
                val => !!val || 'tidak boleh kosong'
              ]"
              @buang="cariPihakTiga"
            />
          </div>
        </div>

        <div class="row q-mb-xs">
          <div class="col-12">
            <app-autocomplete-new
              ref="refJnsPenerimaan"
              :model="store.form.jenispenerimaan"
              autocomplete="nama"
              option-label="nama"
              option-value="nama"
              label="Jenis Penerimaan"
              outlined
              :source="store.jenisPenerimaans"
              @on-select="store.jenisPenerimaanSelected"
              @clear="store.clearJenisPenerimaan"
            />
          </div>
        </div>

        <div class="row q-mb-xs">
          <div class="col-12">
            <app-autocomplete-new
              ref="refJenisSurat"
              :model="store.form.jenissurat"
              autocomplete="nama"
              option-label="nama"
              option-value="nama"
              label="Pilih Jenis Surat"
              outlined
              :source="store.jenisSuratLs"
              @on-select="store.jenisSuratSelected"
              @clear="store.clearJenisSurat"
            />
          </div>
        </div>
        <div class="row q-mb-xs">
          <div class="col-12">
            <app-input
              ref="refNoSurat"
              v-model="store.form.nomorsurat"
              label="Nomor Surat"
              outlined
            />
          </div>
        </div>
        <div class="row q-mb-xs">
          <div class="col-12">
            <app-input
              ref="refPengirim"
              v-model="store.form.pengirim"
              label="Nama Pengirim"
              outlined
            />
          </div>
        </div>
      </div>
      <div class="col-6">
        <div class="row q-mb-xs">
          <div class="col-12">
            <app-autocomplete-new
              ref="refGudang"
              :model="store.form.gudang"
              autocomplete="nama"
              option-label="nama"
              option-value="value"
              label="Pilih Gudang"
              outlined
              :disable="apps?.user?.kdruangansim!==''"
              :source="store.gudangs"
              @on-select="store.gudangSelected"
              @clear="store.clearGudang"
            />
          </div>
        </div>

        <div class="row q-mb-xs">
          <div class="col-12">
            <app-input-date-human
              ref="refTglTran"
              :model="store.disp.tanggal"
              label="Tanggal Transaksi"
              outlined
              @set-display="dispTanggal"
              @db-model="setTanggal"
            />
          </div>
        </div>
        <div class="row q-mb-xs">
          <div class="col-12">
            <app-input-date-human
              ref="refTglSurat"
              :model="store.disp.surat"
              label="Tanggal Surat"
              outlined
              @set-display="dispSurat"
              @db-model="setSurat"
            />
          </div>
        </div>
        <!-- <div class="row q-mb-xs">
          <div class="col-12">
            <app-input-date-human
              ref="refTglTempo"
              :model="store.disp.tempo"
              label="Batas Akhir Pembayaran"
              outlined
              valid
              @set-display="dispTempo"
              @db-model="setTempo"
            />
          </div>
        </div> -->
        <!-- <div class="row q-mb-xs">
          <div class="col-12">
            <app-input
              ref="refTotalFaktur"
              v-model="store.form.total_faktur_pbf"
              label="Total Nilai"
              outlined
              :rules="[
                val => !isNaN(val) || 'Harus pakai Nomor'
              ]"
            />
          </div>
        </div> -->
      </div>
    </div>
    <q-separator class="q-mb-xs" />
    <!-- detail -->
    <div class="row items-center q-col-gutter-sm">
      <div class="col-4">
        <app-autocomplete-new
          ref="refObat"
          :model="store.form.kdobat"
          autocomplete="namaobat"
          option-label="namaobat"
          option-value="kodeobat"
          label="Pilih Obat"
          outlined
          :source="store.obats"
          :loading="store.loadingCari"
          @on-select="store.obatSelected"
          @clear="store.clearObat"
          @buang="cariObat"
        />
      </div>
      <div class="col-2">
        <app-input
          ref="refIsi"
          v-model="store.form.isi"
          label="konversi satuan besar ke kecil ( Isi )"
          outlined
          @update:model-value="setIsi($event)"
        />
      </div>
      <div class="col-2">
        <div class="row text-italic f-10">
          satuan :
        </div>
        <div class="row">
          <div
            v-if="store.form.satuan_bsr"
          >
            <div class="text-weight-bold">
              1 {{ store.form.satuan_bsr }}
            </div>
          </div>
          <div
            v-if="store.form.satuan_kcl"
            class="q-ml-xs"
          >
            <div class="text-weight-bold">
              =  {{ store.form.isi }}  {{ store.form.satuan_kcl }}
            </div>
          </div>
          <div v-else>
            obat belum dipilih
          </div>
        </div>
      </div>

      <div class="col-2">
        <app-input
          ref="refJumlah"
          v-model="store.form.jml_terima_b"
          label="Jumlah"
          outlined
          @update:model-value="setJumlah($event)"
        />
      </div>
      <div class="col-2">
        <div class="row">
          <div class="text-weight-bold q-mr-sm">
            {{ store.form.satuan_bsr }}
          </div>
          <div class="text-weight-bold">
            ({{ store.form.jml_terima_k }}  {{ store.form.satuan_kcl }})
          </div>
        </div>
      </div>
      <div class="col-2">
        <app-input
          ref="refHarga"
          v-model="store.form.harga"
          label="Harga (satuan besar)"
          outlined
          @update:model-value="setHarga($event)"
        />
      </div>
      <div class="col-2">
        <app-input
          v-model="store.form.diskon"
          label="Diskon (%)"
          outlined
          valid
          @update:model-value="setDiskon($event)"
        />
      </div>
      <div class="col-2">
        <app-input
          v-model="store.form.ppn"
          label="PPN (%)"
          outlined
          valid
          @update:model-value="setPpn($event)"
        />
      </div>
      <div class="col-2">
        harga netto : <strong> {{ formatRp(store.form.harga_netto) }} </strong>
      </div>
      <div class="col-2">
        subtotal : <strong>{{ formatRp(store.form.subtotal) }}</strong>
      </div>
      <div class="col-2">
        Total Nilai : <strong>{{ formatRp(store.form.total_faktur_pbf) }}</strong>
      </div>
      <div class="col-2">
        <app-input
          ref="refBatch"
          v-model="store.form.no_batch"
          label="No Batch"
          outlined
        />
      </div>
      <div class="col-2">
        <app-input-date-human
          ref="refExp"
          :model="store.disp.tgl_exp"
          label="Tanggal Kadaluarsa"
          outlined
          @set-display="store.setDisp('tgl_exp', $event)"
          @db-model="store.setForm('tgl_exp', $event)"
        />
      </div>
      <div class="col-2">
        <app-input
          v-model="store.form.no_retur_rs"
          valid
          label="No Retur Rs"
          outlined
        />
      </div>
      <!-- <div class="col-3">
        <app-input
          v-model="store.form.pengirim"
          label="Pengirim"
          outlined
        />
      </div> -->
    </div>
    <div class="row items-center justify-end q-mr-sm q-mt-md">
      <div>
        <q-btn
          label="Simpan obat"
          no-caps
          icon="icon-mat-save"
          color="primary"
          push
          :loading="store.loading"
          :disable="store.loading"
          @click="simpan()"
        >
          <q-tooltip
            class="primary"
            :offset="[10, 10]"
          >
            Simpan Rincian Penerimaan
          </q-tooltip>
        </q-btn>
      </div>
    </div>
    <q-separator class="q-my-md" />
    <div v-if="store.rincis.length">
      <q-list
        bordered
        separator
      >
        <q-item
          v-for="(item,i) in store.rincis"
          :key="i"
          v-ripple
          class="row items-center q-col-gutter-sm"
        >
          <q-item-section>
            <div class="row">
              {{ item?.masterobat?.namaobat }}
            </div>
            <div class="row">
              {{ item?.masterobat?.kodeobat }}
            </div>
          </q-item-section>
          <q-item-section>
            <div class="row">
              {{ item?.no_batch }}
            </div>
            <div class="row">
              {{ item?.tgl_exp }}
            </div>
          </q-item-section>
          <q-item-section>
            <div class="row">
              {{ item?.jml_terima_b }} ({{ item?.masterobat?.satuan_b }})
            </div>
            <div class="row">
              {{ item?.jml_terima_k }} ({{ item?.satuan_kcl }})
            </div>
          </q-item-section>
          <q-item-section>
            <div class="row">
              {{ item?.harga }}
            </div>
            <div class="row">
              {{ item?.harga_kcl }}
            </div>
          </q-item-section>
          <q-item-section>
            <div class="row">
              {{ item?.diskon ?? 0 }} %  (Rp. {{ formatRp(item?.diskon_rp) }})
            </div>
            <div class="row">
              {{ item?.ppn ??0 }} % (Rp. {{ formatRp(item?.ppn_rp) }})
            </div>
          </q-item-section>
          <q-item-section>
            <div class="row">
              {{ item?.harga_netto }}
            </div>
            <div class="row">
              {{ item?.subtotal }}
            </div>
          </q-item-section>
          <!-- {{ item }} -->
        </q-item>
      </q-list>
    </div>
  </div>
</template>
<script setup>
import { formatRp } from 'src/modules/formatter'
import { notifErrVue } from 'src/modules/utils'
import { useAplikasiStore } from 'src/stores/app/aplikasi'
import { useStyledStore } from 'src/stores/app/styled'
import { usePenerimaanLangsungFarmasiStore } from 'src/stores/simrs/farmasi/penerimaan/penerimaanlangsung'
import { onMounted, ref, onUnmounted, watch } from 'vue'

const style = useStyledStore()
const store = usePenerimaanLangsungFarmasiStore()
const apps = useAplikasiStore()
onMounted(() => {
  store.setForm('gudang', apps?.user?.kdruangansim)
})
watch(() => apps?.user?.kdruangansim, (obj) => {
  store.setForm('gudang', obj)
})
store.getInitialData()
function setHargaNetto() {
  const isi = store.form.isi ?? 1
  const harga = store.form.harga ?? 0
  const diskon = store.form.diskon ?? 0
  const ppn = store.form.ppn ?? 0
  const jmlTerimaB = store.form.jml_terima_b ?? 0
  const diskonRp = harga * (diskon / 100)
  const hargaSetelahDiskon = harga - diskonRp
  const ppnRp = hargaSetelahDiskon * (ppn / 100)
  const hargaPembelian = hargaSetelahDiskon + ppnRp
  const subtotal = hargaPembelian * jmlTerimaB
  let totalPbf = 0
  if (store.rincis.length) {
    const sub = store.rincis.map(m => parseFloat(m.subtotal)).reduce((a, b) => a + b, 0)
    totalPbf = sub + subtotal
  } else {
    totalPbf = subtotal
  }

  store.setForm('total_faktur_pbf', totalPbf)
  store.setForm('diskon_rp', diskonRp)
  store.setForm('ppn_rp', ppnRp)
  store.setForm('diskon_rp_kecil', diskonRp / isi)
  store.setForm('ppn_rp_kecil', ppnRp / isi)
  store.setForm('harga_netto', hargaPembelian)
  store.setForm('harga_netto_kecil', hargaPembelian / isi)
  store.setForm('subtotal', subtotal)
  store.setForm('harga_kcl', harga / isi)
  store.setForm('jml_terima_lalu', 0)
  store.setForm('jml_all_penerimaan', jmlTerimaB)
  store.setForm('jml_pesan', 0)
  store.setForm('jml_terima_k', jmlTerimaB * isi)
}
function setIsi(val) {
  const temp = !isNaN(parseFloat(val)) ? parseFloat(val) : 0
  store.setForm('isi', temp)
}
function setJumlah(val) {
  const temp = !isNaN(parseFloat(val)) ? parseFloat(val) : 0
  store.setForm('jml_terima_b', temp)
  setTimeout(() => {
    setHargaNetto()
  }, 100)
}
function setHarga(val) {
  const temp = !isNaN(parseFloat(val)) ? parseFloat(val) : 0
  store.setForm('harga', temp)
  setTimeout(() => {
    setHargaNetto()
  }, 100)
}
function setDiskon(val) {
  const inc = val.includes('.')
  const ind = val.indexOf('.')
  const panj = val.length
  const temp = isNaN(parseFloat(val)) ? 0 : (inc && (ind === (panj - 1)) ? val : parseFloat(val))
  store.setForm('diskon', temp)
  setTimeout(() => {
    setHargaNetto()
  }, 100)
}
function setPpn(val) {
  const inc = val.includes('.')
  const ind = val.indexOf('.')
  const panj = val.length
  const temp = isNaN(parseFloat(val)) ? 0 : (inc && (ind === (panj - 1)) ? val : parseFloat(val))
  store.setForm('ppn', temp)
  setTimeout(() => {
    setHargaNetto()
  }, 100)
}
function setTanggal (val) {
  store.setForm('tanggal', val)
}
function dispTanggal (val) {
  store.setDisp('tanggal', val)
}

function setSurat (val) {
  store.setForm('surat', val)
}
function dispSurat (val) {
  store.setDisp('surat', val)
}

// function setTempo (val) {
//   store.setForm('batasbayar', val)
// }
// function dispTempo (val) {
//   store.setDisp('tempo', val)
// }

function cariPihakTiga (val) {
  console.log('cari pihak tiga', val)
  store.namaPihakKetiga = val
  store.cariPihatTiga(val)
}
function myDebounce(func, timeout = 800) {
  let timer
  return (...arg) => {
    clearTimeout(timer)
    timer = setTimeout(() => { func.apply(this, arg) }, timeout)
  }
}
const cariObat = myDebounce((val) => {
  store.getDataObat(val)
})

function simpan() {
  console.log('from ', store.form)
  console.log('validasi ', validasi())
  if (validasi()) {
    if (!store.form.kdruang) store.setForm('kdruang', store.form.gudang)
    store.simpanPenerimaan().then(() => { resetValidation() })
  }
}
function kunci() {
  store.selesaiDanKunci().then(() => { resetValidation() })
}

// head
const refPbf = ref(null) // auto
const refJnsPenerimaan = ref(null) // auto
const refJenisSurat = ref(null) // auto
const refNoSurat = ref(null) // inp
const refPengirim = ref(null) // inp
const refGudang = ref(null) // auto
const refTglTran = ref(null) // inp date
const refTglSurat = ref(null) // inp date
// const refTglTempo = ref(null) // inp date
// const refTotalFaktur = ref(null) // inp

// det
const refObat = ref(null) // auto
const refIsi = ref(null)
const refJumlah = ref(null)
const refExp = ref(null)
const refHarga = ref(null)
const refBatch = ref(null)
// const refHargaKcl = ref(null)
function validasi() {
  // console.log('index', index)
  // console.log('ref noSurat', refNoSurat.value.$refs.refInput.validate())
  // console.log('ref diterima', refJmlDiterima.value[index].refInput.validate())
  // console.log('ref tgltran', refTglTran.value.$refs.refInputDate.validate())
  // console.log('ref harga', refHarga.value[index].refInput.validate())

  const pbf = refPbf.value ? refPbf.value.$refs.refAuto.validate() : false
  const jnsPenerimaan = refJnsPenerimaan.value ? refJnsPenerimaan.value.$refs.refAuto.validate() : false

  const gudang = refGudang.value ? refGudang.value.$refs.refAuto.validate() : false
  const jenisSurat = refJenisSurat.value.$refs.refAuto.validate()
  const noSurat = refNoSurat.value.$refs.refInput.validate()
  const pengirim = refPengirim.value.$refs.refInput.validate()
  const tglTran = refTglTran.value.$refs.refInputDate.validate()
  const tglSurat = refTglSurat.value.$refs.refInputDate.validate()
  // const tglTempo = refTglTempo.value.$refs.refInputDate.validate()
  // const totalFaktur = refTotalFaktur.value.$refs.refInput.validate()

  const obat = refObat.value ? refObat.value.$refs.refAuto.validate() : false
  const jmlTerimaB = refJumlah.value.refInput.validate()
  const isi = refIsi.value.refInput.validate()
  const exp = refExp.value.$refs.refInputDate.validate()
  const harga = refHarga.value.refInput.validate()
  const bacth = refBatch.value.refInput.validate()
  // const hargaKcl = refHargaKcl.value.refInput.validate()
  if (!gudang && !store.form.kdruang) notifErrVue('Gudang Tujuan tidak ditemukan, Apakah Anda memiliki Akses Penerimaan Gudang?')
  if (
    pbf && jnsPenerimaan && gudang && jenisSurat && noSurat && pengirim && tglTran && tglSurat &&
    jmlTerimaB && isi && exp && harga && obat && bacth
  ) return true
  else return false
}
function resetValidation() {
  if (refPbf.value) refPbf.value.$refs.refAuto.resetValidation()
  if (refJnsPenerimaan.value) refJnsPenerimaan.value.$refs.refAuto.resetValidation()

  if (refGudang.value) refGudang.value.$refs.refAuto.resetValidation()
  refJenisSurat.value.$refs.refAuto.resetValidation()
  refNoSurat.value.$refs.refInput.resetValidation()
  refPengirim.value.$refs.refInput.resetValidation()
  refTglTran.value.$refs.refInputDate.resetValidation()
  refTglSurat.value.$refs.refInputDate.resetValidation()

  if (refObat.value) refObat.value.$refs.refAuto.resetValidation()
  refJumlah.value.refInput.resetValidation()
  refIsi.value.refInput.resetValidation()
  refExp.value.$refs.refInputDate.resetValidation()
  refHarga.value.refInput.resetValidation()
  refBatch.value.refInput.resetValidation()
}
onUnmounted(() => {
  store.resetForm()
})
</script>
