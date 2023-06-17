<template>
  <div>
    <q-card>
      <q-card-section>
        <div class="f-14 text-weight-bold">
          Distribusi Depo
        </div>
        <div class="title-desc">
          Halaman Distribusi ke Depo
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <!-- <div class="row items-center">
          <div class="col-2 q-mr-sm">
            Nomor Distribusi
          </div>
          <div class="col">
            {{ store.form.no_distribusi?store.form.no_distribusi:'-' }}
          </div>
        </div> -->
        <div class="row items-center q-mb-xs">
          <div class="col-2 q-mr-sm">
            Tanggal
          </div>
          <div class="col">
            <app-input-date-human
              :model="store.display.tanggal"
              label="dari tanggal"
              :loading="store.loading"
              @db-model="setTanggal"
              @set-display="setTanggalDisp"
            />
            <!-- {{ store.form.no_distribusi?store.form.no_distribusi:'-' }} -->
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <app-table-coba-coba
          title="Data Distribusi"
          :columns="store.columns"
          :column-hide="store.columnHide"
          :items="store.items"
          :meta="store.meta"
          :per-page="store.params.per_page"
          :order-by="store.params.order_by"
          :sort="store.params.sort"
          :loading="store.loading"
          :to-search="store.params.q"
          :ada-tambah="false"
          :ada-edit="false"
          :ada-delete="false"
          :click-able="true"
          @goto="store.setPage"
          @set-row="store.setPerPage"
          @refresh="store.refreshTable"
          @find="store.setSearch"
          @set-order="store.setOder"
          @new-data="store.newData"
          @edit-data="store.editData"
          @delete="store.deletesData"
          @on-click="onClick"
        >
          <template #header-left-after-search>
            <div class="row q-col-guttes-sm q-ml-sm">
              <div class="q-col">
                <app-input
                  v-model="store.params.r"
                  label="cari perusahaan"
                  outlined
                  valid
                  icon="icon-mat-search"
                  debounce="1000"
                  :loading="store.loading"
                  @update:model-value="store.searchPerusahaan"
                />
              </div>
            </div>
          </template>
          <template #col-tanggal>
            Tanggal
          </template>
          <template #cell-tanggal="{row}">
            {{ dateFullFormat(row.tanggal) }}
          </template>
          <template #col-no_penerimaan>
            Nomor Penerimaan
          </template>
          <template #col-no_distribusi>
            Nomor Distribusi
          </template>
          <template #col-kontrak>
            Nomor kontrak
          </template>
          <template #col-faktur>
            Nomor Faktur
          </template>
          <template #col-perusahaan>
            Nama Perusahaan
          </template>
          <template #cell-perusahaan="{row}">
            {{ row.perusahaan?row.perusahaan.nama:'-' }}
          </template>
          <template #cell-no_penerimaan="{row}">
            <div class="box">
              {{ row.no_penerimaan }}
            </div>
          </template>
          <template #cell-kontrak="{row}">
            <div class="box">
              {{ row.kontrak }}
            </div>
          </template>
          <template #expand="{row}">
            <div v-if="row.details.length">
              <!-- {{ row.details }} -->
              <div class="row items-start text-weight-bold">
                <div class="col-3">
                  <div class="row">
                    <div class="col-1">
                      No
                    </div>
                    <div class="col-11">
                      Nama Barang
                    </div>
                  </div>
                </div>
                <div class="col-2">
                  Depo
                </div>
                <div class="col-1">
                  Stok Gudang
                </div>
                <div class="col-1">
                  Jumlah
                </div>
                <div class="col-1">
                  Harga
                </div>
                <div class="col-1">
                  Subtotal
                </div>
                <div class="col-2">
                  <app-btn
                    v-if="row.canSave && row.hasStok"
                    flat
                    icon-right="icon-mat-send"
                    tooltip="Distribusikan"
                    label=""
                    :tip="true"
                    :loading="row.loading"
                    :disable="row.loading"
                    @click="kirimPenerimaan(row)"
                  />
                  <div v-if="!row.canSave">
                    Tidak ada Depo Tujuan
                  </div>
                  <div v-if="!row.hasStok">
                    <app-btn
                      flat
                      icon-right="icon-mat-published_with_changes"
                      tooltip="Jadikan sudah di distribusikan semua"
                      label=""
                      :tip="true"
                      :loading="row.loading"
                      :disable="row.loading"
                      @click="sudahDiDistribusikan(row)"
                    />
                  </div>
                </div>
              </div>
              <div
                v-for="(det,i) in row.details"
                :key="i"
                class="row items-center"
              >
                <div class="col-3">
                  <div class="row">
                    <div class="col-1">
                      {{ i+1 }}
                    </div>
                    <div class="col-11">
                      {{ det.nama_barang }}
                    </div>
                  </div>
                </div>
                <div class="col-2">
                  {{ det.depo?det.depo:'tidak ada depo' }}
                </div>
                <div class="col-1">
                  {{ det.stok_gudang }}
                </div>
                <div class="col-1">
                  {{ det.jumlah }}
                </div>
                <div class="col-1">
                  {{ formatDouble(det.harga) }}
                </div>
                <div class="col-1">
                  {{ formatDouble(det.sub_total) }}
                </div>
                <div class="col-2">
                  <div v-if="!row.hasStok">
                    <div v-if="det.hasStok && det.canSave">
                      <app-btn
                        flat
                        icon-right="icon-mat-send"
                        tooltip="Distribusikan detail"
                        label=""
                        :tip="true"
                        :loading="det.loading"
                        :disable="det.loading"
                        @click="kirimDetailPenerimaan(row,det)"
                      />
                    </div>
                    <div v-if="!det.hasStok">
                      tidak ada stok Gudang
                    </div>
                    <div v-if="!det.canSave">
                      Depo tidak ditemukan
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else>
              Tidak ada Detail
            </div>
          </template>
        </app-table-coba-coba>
      </q-card-section>
    </q-card>
  </div>
</template>
<script setup>
import { date } from 'quasar'
import { dateFullFormat, formatDouble } from 'src/modules/formatter'
import { uniqueId } from 'src/modules/utils'
import { useDistribusiDepoNewStore } from 'src/stores/simrs/logistik/sigarang/transaksi/distribusiDepo/distribusiDepoNew'
const store = useDistribusiDepoNewStore()
store.getInitialData()

// tanggal
function setTanggal(val) {
  const jamIni = date.formatDate(Date.now(), ' HH:mm:ss')
  store.setForm('tanggal', val + jamIni)
}
function setTanggalDisp(val) {
  store.display.tanggal = val
}
// click
function onClick(val) {
  // console.log('click ', val)
  val.item.expand = !val.item.expand
  val.item.highlight = !val.item.highlight
}
// kirim pesanan
function kirimPenerimaan(val) {
  const oldreff = val.reff.split('-')
  const newreff = oldreff.length ? 'DDP-' + oldreff[1] : 'DDP-' + uniqueId()
  const jamIni = date.formatDate(Date.now(), ' HH:mm:ss')
  const tanggal = store.form.tanggal + jamIni
  // console.log('tanggal ', store.form.tanggal, tanggal)
  // store.setForm('tanggal', store.form.tanggal + jamIni)
  const data = {
    details: val.details,
    reff: newreff,
    trmreff: val.reff,
    trmid: val.id,
    tanggal,
    kode_depo: val.kode_depo,
    no_distribusi: val.no_distribusi,
    status: 2
  }
  // console.log('kirim ', data)
  val.loading = true
  store.saveForm(data)
}
// kirim detail pemesanan
function kirimDetailPenerimaan(val, detail) {
  const oldreff = val.reff.split('-')
  const newreff = oldreff.length ? 'DDP-' + oldreff[1] : 'DDP-' + uniqueId()
  const jamIni = date.formatDate(Date.now(), ' HH:mm:ss')
  const tanggal = store.form.tanggal + jamIni
  const data = {
    kode_rs: detail.kode_rs,
    no_penerimaan: detail.no_penerimaan,
    jumlah: detail.jumlah,
    harga: detail.harga,
    kode_satuan: detail.kode_satuan,
    satuan: detail.satuan_besar,

    reff: newreff,
    trmreff: val.reff,
    trmid: val.id,
    tanggal,
    kode_depo: val.kode_depo,
    no_distribusi: val.no_distribusi,
    status: 2
  }
  // console.log('kirim ', val, data)
  val.loading = true
  detail.loading = true
  store.saveDetailPenerimaan(data)
  // console.log('kirim detail', data)
}
// ganti status penerimaan
function sudahDiDistribusikan(val) {
  // console.log('sudah di distribusikan semua', val)
  val.loading = true
  const data = { id: val.id }
  store.gantiStatusPenerimaan(data)
}
</script>
<style scoped>
.q-table td box {
  white-space: normal !important;
    inline-size: 100px;
    overflow-wrap: break-word;
}
.q-table td div.box {
  white-space: normal !important;
    inline-size: 100px;
    overflow-wrap: break-word;
}
.q-table--no-wrap th, .q-table--no-wrap td {
  white-space: normal !important;
}
.print{
  position: absolute;
    right: 30px;
    top: 5px;
    z-index: 10;
}
.garis-bawah{
  border-bottom: 6px solid black;
  border-bottom-style: double;
}
.border-box{
  border: 1px solid black;
}
.border-tb{
  border-top: 1px solid black;
  border-bottom: 1px solid black;
}
.border-left{
  border-left: 1px solid black;
}
.border-right{
  border-right: 1px solid black;
}
.border-bottom{
  border-bottom: 1px solid black;
}
</style>
