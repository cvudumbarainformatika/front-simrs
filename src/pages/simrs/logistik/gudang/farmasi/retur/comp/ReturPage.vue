<template>
  <div class="q-pa-sm">
    <!-- head form -->
    <div>
      <div class="row items-center q-col-gutter-sm">
        <div class="col-6">
          <!-- Perusahaan -->
          <div class="row q-col-gutter-sm items-center q-mb-sm">
            <div class="col-3">
              Penyedia
            </div>

            <div class="col-9">
              <app-autocomplete-new
                v-model="store.form.kdpbf"
                label="Pilih Perusahaan"
                debounce="700"
                autocomplete="namaperusahaan"
                option-label="namaperusahaan"
                option-value="kodeperusahaan"
                outlined
                valid
                :loading="store.loadingPerusahaan"
                :source="store.perusahaans"
                @on-select="store.perusahaanSelected"
              />
            </div>
          </div>
          <!-- Obat -->
          <div class="row q-col-gutter-sm items-center q-mb-sm">
            <div class="col-3">
              Obat
            </div>

            <div class="col-9">
              <app-autocomplete-new
                ref="refObat"
                v-model="store.form.kd_obat"
                label="Pilih Obat"
                autocomplete="nama_obat"
                option-label="nama_obat"
                option-value="kd_obat"
                outlined
                valid
                :loading="store.loadingObat"
                :source="store.obats"
                @on-select="store.obatSelected"
              />
            </div>
          </div>
          <!-- Satuan -->
          <div class="row q-col-gutter-sm items-center q-mb-sm">
            <div class="col-3">
              Satuan
            </div>

            <div class="col-9">
              <app-input
                v-model="store.form.satuan_k"
                label="Satuan"
                outlined
                valid
                readonly
              />
            </div>
          </div>
          <!-- No Retur -->
          <div class="row q-col-gutter-sm items-center q-mb-sm">
            <div class="col-3">
              Nomor Retur RS
            </div>

            <div class="col-9">
              <app-input
                v-model="store.form.no_retur"
                label="Nomor Retur"
                outlined
                valid
                readonly
              />
            </div>
          </div>
          <!-- tgl Retur -->
          <div class="row q-col-gutter-sm items-center q-mb-sm">
            <div class="col-3">
              Tanggal Retur RS
            </div>

            <div class="col-9">
              <app-input-date-human
                ref="refTaRetur"
                :model="store.form.tanggal"
                label="Tanggal Retur"
                outlined
                @set-display="setTanggalDisp"
                @db-model="setTanggal"
              />
            </div>
          </div>
        </div>
        <div class="col-6">
          <!-- No Faktur Retur -->
          <div class="row q-col-gutter-sm items-center q-mb-sm">
            <div class="col-3">
              Nomor Faktur Retur PBF
            </div>

            <div class="col-9">
              <app-input
                ref="refNoFakRet"
                v-model="store.form.no_faktur_retur_pbf"
                label="Nomor Faktur Retur"
                valid
                outlined
              />
            </div>
          </div>
          <!-- tgl Faktur Retur -->
          <div class="row q-col-gutter-sm items-center q-mb-sm">
            <div class="col-3">
              Tanggal Faktur Retur PBF
            </div>

            <div class="col-9">
              <app-input-date-human
                ref="refTaFakRetur"
                :model="store.form.tanggalFak"
                label="Tanggal Faktur Retur"
                outlined
                valid
                @set-display="setTanggalFakDisp"
                @db-model="setTanggalFak"
              />
            </div>
          </div>
          <!-- tgl Kwitansi Pembayaran -->
          <div class="row q-col-gutter-sm items-center q-mb-sm">
            <div class="col-3">
              Tanggal Kwitansi Pembayaran
            </div>

            <div class="col-9">
              <app-input-date-human
                ref="refTaKwiRetur"
                :model="store.form.tanggalKwi"
                label="Tanggal Kwitansi"
                outlined
                @set-display="setTanggalKwiDisp"
                @db-model="setTanggalKwi"
              />
            </div>
          </div>
          <!-- No Kwitansi Pembayaran -->
          <div class="row q-col-gutter-sm items-center q-mb-sm">
            <div class="col-3">
              Nomor Kwitansi Pembayaran
            </div>

            <div class="col-9">
              <app-input
                ref="refNoKwiRet"
                v-model="store.form.no_kwitansi_pembayaran"
                label="Nomor Kwitansi "
                outlined
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- detail form -->
    <app-loading v-if="store?.loadingDataMauRet" />
    <!-- Daftar barang baik -->
    <div v-if="!store?.loadingDataMauRet">
      <div class="row bg-grey q-pa-sm text-white f-14 q-mb-sm">
        Barang Diterima
      </div>
      <div v-if="!store?.dataMauReturs?.length">
        <app-no-data-small />
      </div>
      <!-- <div> -->
      <div v-if="store?.dataMauReturs?.length">
        <div class="row q-mb-sm">
          <app-input
            ref="refCariNoPenerimaan"
            v-model="store.params.nopenerimaan"
            label="Cari Nomor Penerimaan (klik enter untuk cari)"
            outlined
            valid
            class="col-4"
            debounce="800"
            :loading="store.loadingDataMauRet"
            @keyup.enter="getData()"
          />
        </div>
        <div class="row bg-dark text-white q-pa-xs q-mb-sm">
          <div
            class="col-auto"
            style="width:5%"
          >
            No
          </div>
          <div
            class="col-auto anak"
          >
            Kondisi Barang
          </div>
          <div
            class="col-auto anak"
          >
            Nomor Penerimaan
          </div>
          <div
            class="col-auto anak"
          >
            Nomor Batch
          </div>
          <div
            class="col-auto anak"
          >
            Tanggal Penerimaan
          </div>
          <div
            class="col-auto anak"
          >
            Tanggal Kadalwarsa
          </div>
          <div
            class="col-auto anak text-right"
          >
            Jumlah Diterima
          </div>
          <div
            class="col-auto anak text-right"
          >
            Stok Penerimaan
          </div>

          <div
            class="col-auto anak text-right"
          >
            Jumlah Retur
          </div>
        </div>
        <div
          v-for="(item,i) in store?.dataMauReturs"
          :key="i"
        >
          <div class="row items-center q-col-gutter-sm q-mb-sm">
            <div
              class="col-auto"
              style="width:5%"
            >
              {{ i+1 }}
            </div>
            <div
              class="col-auto anak "
            >
              <app-autocomplete
                ref="refKondisi"
                v-model="item.kondisi_barang"
                label="Kondisi Barang"
                outlined
                :source="store.kondisis"
              />
            </div>
            <div
              class="col-auto anak"
            >
              {{ item?.nopenerimaan }}
            </div>
            <div
              class="col-auto anak"
            >
              {{ item?.no_batch }}
            </div>
            <div
              class="col-auto anak "
            >
              {{ humanDate(item?.tglpenerimaan) }}
            </div>
            <div
              class="col-auto anak "
            >
              {{ humanDate(item?.tgl_exp) }}
            </div>
            <div
              class="col-auto anak text-right"
            >
              {{ item?.jumlah }}
            </div>
            <div
              class="col-auto anak text-right"
            >
              {{ item?.stok }}
            </div>

            <div
              class="col-auto anak text-right"
            >
              <app-input
                ref="refJumlah"
                v-model="item.jumlah_retur"
                outlined
                label="Jumlah Dikembalikan"
                @update:model-value="updateJum($event,item,'jumlah_retur')"
                @keyup.enter="simpan(i, item)"
              />
            </div>
            <div
              class="col-auto anak text-right"
            >
              <q-btn
                class="q-mr-md"
                flat
                icon="icon-mat-save"
                color="primary"
                round
                :loading="store.loading && item.loading"
                @click="simpan(i, item)"
              >
                <q-tooltip
                  class="primary"
                  :offset="[10, 10]"
                >
                  Simpan Obat
                </q-tooltip>
              </q-btn>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Daftar barang Dikembalikan -->
    <div v-if="!store?.loadingDataMauRet">
      <div class="bg-grey q-pa-sm text-white f-14 q-mb-md">
        Daftar Barang Dikembalikan
      </div>
      <div v-if="!store?.dataReturs?.length">
        <app-no-data-small />
      </div>
      <div v-if="store?.dataReturs?.length">
        <div class="row bg-dark text-white q-pa-xs q-mb-sm">
          <div
            class="col-auto"
            style="width:5%"
          >
            No
          </div>
          <div
            class="col-auto rinci"
          >
            Nama Obat
          </div>
          <div
            class="col-auto rinci"
          >
            Kondisi Barang
          </div>
          <div
            class="col-auto rinci"
          >
            Tanggal Rusak
          </div>
          <div
            class="col-auto rinci"
          >
            Jumlah Retur
          </div>
          <div
            class="col-auto rinci"
          >
            Nili Retur
          </div>
        </div>
        <div
          v-for="(rinc,j) in store?.dataReturs"
          :key="j"
        >
          <div class="row q-col-gutter-sm q-mb-sm">
            <div
              class="col-auto"
              style="width:5%"
            >
              {{ j+1 }}
            </div>
            <div
              class="col-auto rinci"
            >
              {{ rinc?.mobatnew?.nama_obat }}
            </div>
            <div
              class="col-auto rinci"
            >
              {{ rinc?.kondisi_barang }}
            </div>
            <div
              class="col-auto rinci"
            >
              {{ humanDate(rinc?.tgl_rusak) }}
            </div>
            <div
              class="col-auto rinci"
            >
              {{ rinc?.jumlah_retur }}
            </div>
            <div
              class="col-auto rinci"
            >
              {{ formatRpDouble(rinc?.subtotal,2) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { humanDate, formatRpDouble } from 'src/modules/formatter'
import { date } from 'quasar'
import { useReturPenyediaStore } from 'src/stores/simrs/farmasi/gudang/retur'
import { ref } from 'vue'
import { notifErrVue } from 'src/modules/utils'

const store = useReturPenyediaStore()
const refCariNoPenerimaan = ref(null)
function getData() {
  store.getDataMauRet().then(() => {
    refCariNoPenerimaan.value.$refs.refInput.focus()
  })
}
function setTanggal(val) {
  store.setForm('tgl_retur', date.formatDate(val, 'YYYY-MM-DD'))
}
function setTanggalDisp(val) {
  store.setForm('tanggal', val)
  console.log('form ', store.form)
}
function setTanggalFak(val) {
  store.setForm('tgl_faktur_retur_pbf', date.formatDate(val, 'YYYY-MM-DD'))
}
function setTanggalFakDisp(val) {
  store.setForm('tanggalFak', val)
  console.log('form ', store.form)
}
function setTanggalKwi(val) {
  store.setForm('tgl_kwitansi_pembayaran', date.formatDate(val, 'YYYY-MM-DD'))
}
function setTanggalKwiDisp(val) {
  store.setForm('tanggalKwi', val)
  console.log('form ', store.form)
}

function updateJum(evt, det, key) {
  const inc = evt.includes('.')
  const ind = evt.indexOf('.')
  const panj = evt.length
  const nilai = isNaN(parseFloat(evt)) ? 0 : (inc && (ind === (panj - 1)) ? evt : parseFloat(evt))
  det[key] = nilai
  if (key === 'jumlah_retur') {
    const jumlah = parseFloat(det.jumlah)
    if (nilai > jumlah) {
      det[key] = jumlah
      notifErrVue('Jumlah Retur Tidak Boleh Melebihi Jumlah diterima')
    }
    det.subtotal = parseFloat(nilai) * parseFloat(det.harga_neto)
  }
}
// inp
const refTaRetur = ref(null)
const refNoFakRet = ref(null)
const refTaFakRetur = ref(null)
const refTaKwiRetur = ref(null)
const refNoKwiRet = ref(null)
const refJumlah = ref(null)
// autocol
const refObat = ref(null)
const refKondisi = ref(null)

function validasi(index, dibayar) {
  // console.log(refKondisi.value)
  const taRetur = refTaRetur.value.$refs.refInputDate.validate()
  // const TaFakRetur = refTaFakRetur.value.$refs.refInputDate.validate()
  // const noFakRet = refNoFakRet.value.$refs.refInput.validate()
  let taKwiRetur = false
  let noKwiRet = false
  if (!dibayar) {
    refTaKwiRetur.value.$refs.refInputDate.resetValidation()
    refNoKwiRet.value.$refs.refInput.resetValidation()
    taKwiRetur = true
    noKwiRet = true
  } else {
    taKwiRetur = refTaKwiRetur.value.$refs.refInputDate.validate()
    noKwiRet = refNoKwiRet.value.$refs.refInput.validate()
  }

  const obat = refObat.value.$refs.refAuto.validate()

  const jumlah = refJumlah.value[index].$refs.refInput.validate()
  const kondisi = refKondisi.value[index].$refs.refAuto.validate()

  if (
    taRetur &&
      // noFakRet &&
      // TaFakRetur &&
      taKwiRetur &&
      noKwiRet &&
      jumlah &&
      obat &&
      kondisi
  ) return true
  else return false
}
function simpan(index, item) {
  const dibayar = !!item.tgl_pembayaran
  if (validasi(index, dibayar)) {
    if (!item?.kondisi_barang || item?.kondisi_barang === '') return notifErrVue('Kondisi barang belum di isi')
    store.setForm('item', item)
    store.simpanRetur(item)
    // console.log('form', store.form)
  } else {
    notifErrVue('Cek kembali input anda')
  }
}
</script>
<style lang="scss" scoped>
.anak{
  width:calc(95% / 9);
  overflow-wrap: anywhere;
}
.rinci{
  width:calc(95% / 5);
  overflow-wrap: anywhere;
}
</style>
