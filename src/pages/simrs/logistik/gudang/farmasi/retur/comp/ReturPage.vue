<template>
  <div class="q-pa-sm">
    <!-- head form -->
    <div>
      <!-- Perusahaan -->
      <div class="row q-col-gutter-sm items-center q-mb-sm">
        <div class="col-2">
          Penyedia
        </div>
        <div class="col-1">
          :
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
      <!-- No Retur -->
      <div class="row q-col-gutter-sm items-center q-mb-sm">
        <div class="col-2">
          Nomor Retur RS
        </div>
        <div class="col-1">
          :
        </div>
        <div class="col-9">
          <app-input
            v-model="store.form.no_retur"
            label="Nomor Retur"
            outlined
            readonly
          />
        </div>
      </div>
      <!-- tgl Retur -->
      <div class="row q-col-gutter-sm items-center q-mb-sm">
        <div class="col-2">
          Tanggal Retur RS
        </div>
        <div class="col-1">
          :
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
      <!-- No Faktur Retur -->
      <div class="row q-col-gutter-sm items-center q-mb-sm">
        <div class="col-2">
          Nomor Faktur Retur PBF
        </div>
        <div class="col-1">
          :
        </div>
        <div class="col-9">
          <app-input
            ref="refNoFakRet"
            v-model="store.form.no_faktur_retur_pbf"
            label="Nomor Faktur Retur"
            outlined
          />
        </div>
      </div>
      <!-- tgl Faktur Retur -->
      <div class="row q-col-gutter-sm items-center q-mb-sm">
        <div class="col-2">
          Tanggal Faktur Retur RS
        </div>
        <div class="col-1">
          :
        </div>
        <div class="col-9">
          <app-input-date-human
            ref="refTaFakRetur"
            :model="store.form.tanggalFak"
            label="Tanggal Faktur Retur"
            outlined
            @set-display="setTanggalFakDisp"
            @db-model="setTanggalFak"
          />
        </div>
      </div>
      <div class="row q-col-gutter-sm items-center q-mb-sm">
        <div class="col-2">
          Tanggal Kwitansi Pembayaran
        </div>
        <div class="col-1">
          :
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
        <div class="col-2">
          Nomor Kwitansi Pembayaran
        </div>
        <div class="col-1">
          :
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
      <!-- Perusahaan -->
      <div class="row q-col-gutter-sm items-center q-mb-sm">
        <div class="col-2">
          Obat
        </div>
        <div class="col-1">
          :
        </div>
        <div class="col-9">
          <app-autocomplete-new
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
    </div>
    <!-- detail form -->
    <app-loading v-if="store?.loadingDataMauRet" />
    <!-- Daftar barang baik -->
    <div>
      <div class="bg-grey q-pa-sm text-white f-14 q-mb-md">
        Daftar Barang Baik
      </div>
      <div><app-no-data-small /></div>
    </div>
    <!-- Daftar Rusak -->
    <div>
      <div class="bg-grey q-pa-sm text-white f-14 q-mb-md">
        Daftar Barang Rusak
      </div>
      <div><app-no-data-small /></div>
    </div>
    <!-- Daftar barang Kadalwarsa -->
    <div>
      <div class="bg-grey q-pa-sm text-white f-14 q-mb-md">
        Daftar Barang Kadalwarsa
      </div>
      <div><app-no-data-small /></div>
    </div>
    <!-- Daftar barang Dikembalikan -->
    <div>
      <div class="bg-grey q-pa-sm text-white f-14 q-mb-md">
        Daftar Barang Dikembalikan
      </div>
      <div><app-no-data-small /></div>
    </div>
  </div>
</template>
<script setup>
import { date } from 'quasar'
import { useReturPenyediaStore } from 'src/stores/simrs/farmasi/gudang/retur'

const store = useReturPenyediaStore()

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

</script>
