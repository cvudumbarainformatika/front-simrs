<template>
  <q-page class="q-pa-sm">
    <div>
      <app-card :is-header="false">
        <template #content>
          <app-table-view
            :title="`Data ${table.nama}`"
            :columns="table.columns"
            :column-hide="table.columnHide"
            :items="table.items"
            :meta="table.meta"
            :per-page="table.params.per_page"
            :order-by="table.params.order_by"
            :sort="table.params.sort"
            :loading="table.loading"
            :to-search="table.params.q"
            ada-detail
            @goto="table.setPage"
            @set-row="table.setPerPage"
            @refresh="table.refreshTable"
            @find="table.setSearch"
            @set-order="table.setOder"
            @delete="table.deletesData"
            @detail="table.setDetails"
          >
            <template #cell-total="{row}">
              {{ formatRp(row.total) }}
            </template>
            <template #cell-nomor="{row}">
              <div style="width:10vw;">
                <div class="ellipsis">
                  {{ row.nomor }}
                </div>
                <q-tooltip
                  anchor="top middle"
                  self="center middle"
                >
                  {{ row.nomor }}
                </q-tooltip>
              </div>
            </template>
            <template #cell-kontrak="{row}">
              <div style="width:10vw;">
                <div class="ellipsis">
                  {{ row.kontrak }}
                </div>
                <q-tooltip
                  anchor="top middle"
                  self="center middle"
                >
                  {{ row.kontrak }}
                </q-tooltip>
              </div>
            </template>
            <template #cell-no_penerimaan="{row}">
              <div style="width:10vw;">
                <div class="ellipsis">
                  {{ row.no_penerimaan }}
                </div>
                <q-tooltip
                  anchor="top middle"
                  self="center middle"
                >
                  {{ row.no_penerimaan }}
                </q-tooltip>
              </div>
            </template>
            <template #cell-faktur="{row}">
              <div style="width:5vw;">
                <div class="ellipsis">
                  {{ row.faktur }}
                </div>
                <q-tooltip
                  anchor="top middle"
                  self="center middle"
                >
                  {{ row.faktur }}
                </q-tooltip>
              </div>
            </template>
            <template #cell-surat_jalan="{row}">
              <div style="width:5vw;">
                <div class="ellipsis">
                  {{ row.surat_jalan }}
                </div>
                <q-tooltip
                  anchor="top middle"
                  self="center middle"
                >
                  {{ row.surat_jalan }}
                </q-tooltip>
              </div>
            </template>
            <template #cell-pengirim="{row}">
              <div style="width:5vw;">
                <div class="ellipsis">
                  {{ row.pengirim }}
                </div>
                <q-tooltip
                  anchor="top middle"
                  self="center middle"
                >
                  {{ row.pengirim }}
                </q-tooltip>
              </div>
            </template>
            <template #cell-perusahaan="{row}">
              <div style="width:10vw;">
                <div class="ellipsis">
                  {{ row.perusahaan?row.perusahaan.nama:'-' }}
                </div>
                <q-tooltip
                  anchor="top middle"
                  self="center middle"
                >
                  {{ row.perusahaan?row.perusahaan.nama:'-' }}
                </q-tooltip>
              </div>
            </template>
            <template #cell-tanggal="{row}">
              {{ dateFullFormat(row.tanggal) }}
            </template>
            <template #cell-tanggal_verif="{row}">
              {{ dateFull(row.tanggal_verif) }}
            </template>
            <template #cell-tanggal_distribusi="{row}">
              {{ dateFull(row.tanggal_distribusi) }}
            </template>
            <template #cell-tanggal_surat="{row}">
              {{ dateFullFormat(row.tanggal_surat) }}
            </template>
            <template #cell-tanggal_faktur="{row}">
              {{ dateFullFormat(row.tanggal_faktur) }}
            </template>
            <template #cell-asal="{row}">
              {{ row.asal?row.asal.nama:'-' }}
            </template>
            <template #cell-dibuat="{row}">
              {{ row.dibuat?row.dibuat.nama:'-' }}
            </template>
            <template #cell-tujuan="{row}">
              {{ row.tujuan?row.tujuan.nama:'-' }}
            </template>
            <template #cell-pengguna="{row}">
              {{ row.pengguna?row.pengguna.jabatan:row.ruangpengguna?row.ruangpengguna.pengguna.jabatan:'-' }}
            </template>
            <template #cell-pj="{row}">
              {{ row.pj?row.pj.jabatan:row.ruangpengguna?row.ruangpengguna.pj.jabatan:'-' }}
            </template>
            <template #cell-ruang="{row}">
              {{ row.ruang?row.ruang.uraian:row.penggunaruang?row.penggunaruang.ruang.uraian:'-' }}
            </template>
            <template #cell-ruangan="{row}">
              <!-- <q-chip
                v-if="row.ruangan"
                class="f-12"
                color="primary"
                text-color="white"
                :label="row.ruangan.uraian"
              /> -->
              <q-badge
                v-if="row.ruangan"
                color="primary"
                text-color="white"
                :label="row.ruangan.uraian"
              />
              <div
                v-if="!row.ruangan"
                class="text-center"
              >
                -
              </div>
            </template>
            <template #cell-depo="{row}">
              {{ row.depo?row.depo.nama:'-' }}
            </template>
            <template #cell-status="{row}">
              <!-- {{row.status}} -->
              <q-chip
                class="f-12"
                :color="color(row.status)"
                text-color="white"
                :label="label(row.status,row.nama)"
              />
            </template>
            <template #col-total>
              Total
            </template>
            <template #col-dibuat>
              PTK
            </template>
            <template #col-ruangan>
              Ruangan
            </template>
            <template #col-ruang>
              Ruangan
            </template>
            <template #col-depo>
              Depo
            </template>
            <template #col-no_distribusi>
              Nomor Distribusi
            </template>
            <template #col-perusahaan>
              Perusahaan
            </template>
            <template #col-tanggal>
              Tanggal
            </template>
            <template #col-tanggal_surat>
              Tanggal Surat Jalan
            </template>
            <template #col-tanggal_faktur>
              Tanggal Faktur
            </template>
            <template #col-kontrak>
              Nomor Kontrak
            </template>
            <template #col-nomor>
              Nomor Pemesanan
            </template>
            <template #col-faktur>
              Faktur
            </template>
            <template #col-surat_jalan>
              Surat Jalan
            </template>
            <template #col-status_pembelian>
              Status Pembelian
            </template>
            <template #col-no_penerimaan>
              Nomor Penerimaan
            </template>
            <template #col-pengirim>
              Pengirim
            </template>
            <template #col-tempo>
              Tempo
            </template>
            <template #col-asal>
              Asal Gudang
            </template>
            <template #col-tujuan>
              Gudang Tujuan
            </template>
            <template #col-status>
              Status
            </template>
            <template #col-pengguna>
              Pengguna
            </template>
            <template #col-pj>
              Penanggungjawab
            </template>
            <template #col-tanggal_verif>
              Tanggal Verifikasi
            </template>
            <template #col-tanggal_distribusi>
              Tanggal Distribusi
            </template>
            <template #col-no_permintaan>
              Nomor Permintaan
            </template>
            <template #left-action="{row,index}">
              <q-btn
                v-if="(role==='root' || role==='PTK' || role==='gizi')
                  && (row.nama === 'PEMESANAN' || row.nama === 'PENERIMAAN')"
                unelevated
                color="dark"
                round
                size="sm"
                icon="icon-mat-print"
                @click="toPrint(row)"
              >
                <q-tooltip
                  class="primary"
                  :offset="[10, 10]"
                >
                  Print
                </q-tooltip>
              </q-btn>
              <q-btn
                v-if="row.status===1 && (role==='PTK' || role==='root'|| role==='gizi')
                  && (row.nama === 'PEMESANAN' || row.nama === 'PERMINTAAN RUANGAN'||row.nama === 'PENERIMAAN'||row.nama === 'PEMAKAIAN RUANGAN'||row.nama === 'DISTRIBUSI DEPO')"
                color="primary"
                round
                icon="icon-mat-exit_to_app"
                flat
                size="sm"
                @click="goTo(row)"
              >
                <q-tooltip
                  anchor="top middle"
                  self="center middle"
                >
                  Buka link
                </q-tooltip>
              </q-btn>
              <!-- || role==='PTK' || role==='gizi' -->
              <q-btn
                v-if="(role==='root')
                  && (row.nama === 'PEMESANAN' && (row.status>=2 && row.status<=4))"
                color="primary"
                round
                icon="icon-mat-edit"
                flat
                size="sm"
                :loading="loadingEdit(index)"
                @click="editRow(row,index)"
              >
                <q-tooltip
                  anchor="top middle"
                  self="center middle"
                >
                  Edit
                </q-tooltip>
              </q-btn>
              <!-- ||role==='PTK' || role==='gizi' -->
              <q-btn
                v-if="row.status===1 && (role==='root')"
                color="negative"
                round
                icon="icon-mat-delete_sweep"
                flat
                size="sm"
                @click="hapus(row)"
              >
                <q-tooltip
                  anchor="top middle"
                  self="center middle"
                >
                  Hapus Draft
                </q-tooltip>
              </q-btn>
              <q-btn
                v-if="row.status===2 && (role==='PTK' || role==='root'|| role==='gizi')"
                color="negative"
                round
                icon="icon-mat-delete_sweep"
                flat
                size="sm"
                @click="hapus(row)"
              >
                <q-tooltip
                  anchor="top middle"
                  self="center middle"
                >
                  Hapus
                </q-tooltip>
              </q-btn>
              <q-btn
                v-if="row.loading"
                round
                flat
                size="sm"
                :loading="row.loading"
              />
              <q-btn
                v-if="row.status===5 && (role==='gudang' || role==='root'|| role==='gizi') && !row.loading"
                color="negative"
                round
                icon="icon-mat-undo"
                flat
                size="sm"
                @click="backToVerif(row,index)"
              >
                <q-tooltip
                  anchor="top middle"
                  self="center middle"
                >
                  Kembali ke menunggu verivikasi
                </q-tooltip>
              </q-btn>
            </template>
            <template #header-left-after-search>
              <!-- <div>
                Periode :
                <q-badge>
                  {{ table.params.from ? dateFullFormat(table.params.from) : '-' }}
                </q-badge>
                sampai
                <q-badge>
                  {{ table.params.to ? dateFullFormat(table.params.to) : '-' }}
                </q-badge>
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date
                    v-model="table.tanggal"
                    range
                    mask="YYYY-MM-DD"
                    @update:model-value="table.searchTanggal"
                  >
                    <div class="row items-center justify-end q-gutter-sm">
                      <q-btn
                        v-close-popup
                        label="Cancel"
                        color="primary"
                        flat
                        @click="table.searchTanggal"
                      />
                      <q-btn
                        v-close-popup
                        label="OK"
                        color="primary"
                        flat
                      />
                    </div>
                  </q-date>
                </q-popup-proxy>
                <q-tooltip
                  anchor="top middle"
                  self="center middle"
                >
                  pilih range tanggal
                </q-tooltip>
              </div> -->
            </template>
          </app-table-view>
          <!--
            row-image="image"
            @delete-ids="table.deletesData"
            -->
        </template>
      </app-card>
    </div>
    <q-dialog v-model="openPrint">
      <q-card style="width:75vw; max-width:90vw;">
        <div class="print">
          <q-btn
            ref="refPrint"
            v-print="printObj"
            unelevated
            color="dark"
            round
            size="sm"
            icon="icon-mat-print"
          >
            <q-tooltip
              class="primary"
              :offset="[10, 10]"
            >
              Print
            </q-tooltip>
          </q-btn>
          <q-btn
            color="primary"
            round
            size="sm"
            icon="icon-my-print_setting"
            @click="tandatangan.setOpen"
          >
            <q-tooltip
              class="primary"
              :offset="[10, 10]"
            >
              Pilih tanda tangan
            </q-tooltip>
          </q-btn>
        </div>
        <div
          id="printMe"
          style="width:210mm; height:310mm; margin:10mm; "
        >
          <!-- heder -->
          <q-card-section>
            <div class="row garis-bawah">
              <div class="col-2">
                <q-img
                  src="~assets/images/logo-kota-grey.png"
                  spinner-color="white"
                  style="height: 3.56cm; max-width: 2.86cm"
                />
              </div>
              <div class="col-10">
                <div class="row justify-center f-18">
                  PEMERINTAH KOTA PROBOLINGGO
                </div>
                <div class="row justify-center f-14 text-weight-bold">
                  DINAS KESEHATAN, PENGENDALIAN PENDUDUK, DAN KELUARGA BERENCANA
                </div>
                <div class="row justify-center f-28 text-weight-bold">
                  UOBK RSUD DOKTER MOHAMAD SALEH
                </div>
                <div class="row justify-center f-14">
                  Jl. Mayjen Panjaitan No.65 Telp.(0335) 433119, 42118 Fax (0335) 432702
                </div>
                <div class="row justify-center f-14">
                  E-mail : rsudprob@probolinggokota.go.id
                </div>
                <div class="row justify-center f-14 text-weight-bold">
                  PROBOLINGGO  67219
                </div>
              </div>
            </div>
            <!-- pemesanan start -->
            <div v-if="item.nama=== 'PEMESANAN'">
              <!-- Top words -->
              <div class="row justify-center q-mt-md f-16 text-weight-bold">
                SURAT PESANAN
              </div>
              <div class="row justify-center q-mb-sm">
                NO. {{ item.nomor }}
              </div>
              <div class="row justify-start">
                Kepada : Yth. Pemilik {{ item.perusahaan?item.perusahaan.nama:'-' }}
              </div>
              <div class="row justify-start">
                <div class="col-1" />
                <div class="col-1">
                  di
                </div>
              </div>
              <div class="row justify-start">
                <div class="col-1" />
                <div class="col-4">
                  {{ item.perusahaan?item.perusahaan.alamat:'-' }}
                </div>
              </div>
              <div class="row justify-start q-mt-md q-mb-md">
                Mohon dikirim pesanan dengan spesifikasi,
              </div>
              <div v-if="!item.details">
                <app-no-data />
              </div>
              <!-- details -->
              <div v-if="item.details">
                <!-- header detail -->
                <div class="row justify-between q-col-gutter-sm">
                  <div class="col-7 text-weight-bold border-tb border-left">
                    Nama Barang
                  </div>
                  <div class="col-1 text-weight-bold border-tb border-left">
                    Jumlah
                  </div>
                  <div class="col-1 text-weight-bold border-tb border-left">
                    Satuan
                  </div>
                  <div class="col-3 text-weight-bold border-box">
                    Keterangan
                  </div>
                </div>
                <!-- body details -->
                <div
                  v-for="(det, i) in item.details"
                  :key="i"
                >
                  <div
                    class="row justify-between q-col-gutter-sm"
                  >
                    <div class="col-7 border-bottom border-left">
                      {{ i+1 }}. {{ det.barangrs?det.barangrs.nama:'Nama barang tidak ditemukan' }}
                    </div>
                    <div class="col-1 border-bottom border-left">
                      {{ det.qty===null?0:det.qty }}
                    </div>
                    <div class="col-1 border-bottom border-left">
                      {{ det.satuan?det.satuan.nama:'-' }}
                    </div>
                    <div class="col-3 border-bottom border-left border-right">
                      {{ det.merk?det.merk:'-' }}
                    </div>
                  </div>
                  <q-separator />
                </div>
              </div>
              <!-- Bottom words -->
              <div class="row justify-start q-mt-md q-mb-sm">
                Pesanan tersebut di atas dapat tersedia pada,
              </div>
              <div class="row justify-start q-mb-sm q-ml-lg">
                <div class="col-1">
                  Hari
                </div>
                <div class="col-1">
                  :
                </div>
              </div>
              <div class="row justify-start q-mb-sm q-ml-lg">
                <div class="col-1">
                  Tanggal
                </div>
                <div class="col-1">
                  :
                </div>
              </div>
              <div class="row justify-start q-mb-sm q-ml-lg">
                <div class="col-1">
                  Waktu
                </div>
                <div class="col-1">
                  :
                </div>
              </div>
              <div class="row justify-start q-mb-sm q-ml-lg">
                <div class="col-1">
                  Tempat
                </div>
                <div class="col-1">
                  :
                </div>
              </div>
              <div class="row justify-start q-mt-md q-mb-sm">
                Atas perhatiannya disampaikan terima kasih.
              </div>
            </div>
            <!-- pemesanan end -->
            <!-- penerimaan start -->
            <div v-if="item.nama=== 'PENERIMAAN'">
              <!-- Top words -->
              <div class="row justify-center q-mt-md f-16 text-weight-bold">
                BERITA ACARA SERAH TERIMA (BAST)
              </div>
              <div class="row justify-center q-mb-sm">
                NO. {{ item.no_penerimaan }}
              </div>
            </div>
            <!-- penerimaan end -->
          </q-card-section>
          <!-- tanda tangan -->
          <q-card-section>
            <div class="row justify-between q-col-gutter-sm ">
              <div class="col-6 text-center" />
              <div class="col-6 text-center">
                Probolinggo, {{ dateFullFormat(item.tanggal) }}
              </div>
            </div>
            <!-- options -->
            <div class="row justify-between q-col-gutter-sm print-hide">
              <div class="col-6 text-center">
                <app-autocomplete-new
                  v-model="tandatangan.tt.kiri"
                  label="pilih yang berdanda tangan"
                  autocomplete="nama"
                  option-label="nama"
                  option-value="value"
                  outlined
                  valid
                  :source="tandatangan.optionTT"
                  @on-select="tandatangan.kiriSelected"
                />
              </div>
              <div class="col-6 text-center">
                <app-autocomplete-new
                  v-model="tandatangan.tt.kanan"
                  label="pilih yang berdanda tangan"
                  autocomplete="nama"
                  option-label="nama"
                  option-value="value"
                  outlined
                  valid
                  :source="tandatangan.optionTT"
                  @on-select="tandatangan.kananSelected"
                />
              </div>
            </div>
            <!-- Input -->
            <div class="row justify-between q-col-gutter-sm print-hide">
              <div class="col-6 text-center">
                <app-input
                  v-model="tandatangan.kiri"
                  outlined
                  valid
                  label="Text kiri"
                />
              </div>
              <div class="col-6 text-center">
                <app-input
                  v-model="tandatangan.kanan"
                  outlined
                  valid
                  label="Text kanan"
                />
              </div>
            </div>
            <div class="row justify-between q-col-gutter-sm">
              <div class="col-6 text-center">
                {{ tandatangan.kiri }}
              </div>
              <div class="col-6 text-center">
                {{ tandatangan.kanan }}
              </div>
            </div>
            <div class="row justify-between q-col-gutter-sm q-mb-xl">
              <div class="col-6 text-center">
                {{ tandatangan.onKiri.acr }}
              </div>
              <div class="col-6 text-center">
                {{ tandatangan.onKanan.acr }}
              </div>
            </div>
            <div class="row justify-between q-col-gutter-sm">
              <div class="col-6 text-center">
                <div v-if="!tandatangan.onKiri.ada">
                  <div v-if="tandatangan.tt.kiri!==null">
                    (...................)
                  </div>
                </div>
                <div v-if="tandatangan.onKiri.ada">
                  <div class="row justify-center">
                    {{ tandatangan.onKiri.nama }}
                  </div>
                  <div class="row justify-center">
                    {{ tandatangan.onKiri.nip }}
                  </div>
                </div>
              </div>
              <div class="col-6 text-center">
                <div v-if="!tandatangan.onKanan.ada">
                  <div v-if="tandatangan.tt.kanan!==null">
                    (...................)
                  </div>
                </div>
                <div v-if="tandatangan.onKanan.ada">
                  <div class="row justify-center">
                    {{ tandatangan.onKanan.nama }}
                  </div>
                  <div class="row justify-center">
                    {{ tandatangan.onKanan.nip }}
                  </div>
                </div>
              </div>
            </div>
            <!-- option -->
            <div class="row justify-center q-col-gutter-sm print-hide">
              <div>
                <app-autocomplete-new
                  v-model="tandatangan.tt.tengah"
                  label="pilih yang berdanda tangan"
                  autocomplete="nama"
                  option-label="nama"
                  option-value="value"
                  outlined
                  valid
                  :source="tandatangan.optionTT"
                  @on-select="tandatangan.tengahSelected"
                />
              </div>
            </div>
            <!-- input -->
            <div class="row justify-center q-col-gutter-sm print-hide">
              <div>
                <app-input
                  v-model="tandatangan.tengah"
                  outlined
                  valid
                  label="Text Tengah"
                />
              </div>
            </div>
            <div class="row justify-center q-col-gutter-sm">
              <div>{{ tandatangan.tengah }}</div>
            </div>
            <div class="row justify-center q-col-gutter-sm q-mb-xl">
              <div>{{ tandatangan.onTengah.acr }}</div>
            </div>
            <div v-if="!tandatangan.onTengah.ada">
              <div
                v-if="tandatangan.tt.tengah!==null"
                class="row justify-center"
              >
                (...................)
              </div>
            </div>
            <div v-if="tandatangan.onTengah.ada">
              <div class="row justify-center">
                {{ tandatangan.onTengah.nama }}
              </div>
              <div class="row justify-center">
                {{ tandatangan.onTengah.nip }}
              </div>
            </div>
          </q-card-section>
        </div>
      </q-card>
    </q-dialog>
    <TandaTanganPage v-model="tandatangan.isOpen" />
    <DetailsTablePage v-model="detail.isOpen" />
    <editPemesananPage v-model="editPemesanan.isOpen" />
    <!-- id="printMe" -->
  </q-page>
</template>
<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { dateFullFormat, dateFull, formatRp } from 'src/modules/formatter'
import { useDetailHistoryTable } from 'src/stores/simrs/logistik/sigarang/history/details'
import { useEditPemesananStore } from 'src/stores/simrs/logistik/sigarang/history/edit/pemesanan'
import { useHistoryTable } from 'src/stores/simrs/logistik/sigarang/history/table'
import DetailsTablePage from './DetailsTablePage.vue'
import editPemesananPage from './edit/EditPemesananPage.vue'
import TandaTanganPage from 'src/pages/simrs/sigarang/tandatangan/TandaTanganPage.vue'
// import PrintPage from './PrintPage.vue'
import { routerInstance } from 'src/boot/router'
// import { notifCenterVue } from 'src/modules/utils'
import { Dialog } from 'quasar'
import { useAuthStore } from 'src/stores/auth'
import { useTandaTanganStore } from 'src/stores/simrs/logistik/sigarang/tantatangan/tandatangan'
const table = useHistoryTable()
const detail = useDetailHistoryTable()
const tandatangan = useTandaTanganStore()
tandatangan.getInitialData()

const auth = useAuthStore()
const role = computed(() => {
  return auth.role ? auth.role : ''
})
// kembalikan status ke verif (akses gudang)
function backToVerif(val, index) {
  console.log('back to', val, index)
  table.setForm('id', val.id)
  table.setForm('status', 4)
  Dialog.create({
    title: 'Konfirmasi',
    message: 'Kembalikan status permintaan ke Menungggu verivikasi?',
    cancel: true
  }).onOk(() => {
    table.getItBackToVerif(index)
  })
}
// print
const openPrint = ref(false)
// let title = ''
const printed = ref(false)
const item = ref({})
function toPrint(val) {
  console.log('print', val)
  item.value = val
  // title = 'Print ' + val.nama
  openPrint.value = true
}
const printObj = {
  id: 'printMe',
  // popTitle: title,
  // extraCss: 'https://cdn.bootcdn.net/ajax/libs/animate.css/4.1.1/animate.compat.css, https://cdn.bootcdn.net/ajax/libs/hover.css/2.3.1/css/hover-min.css',
  // extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>',
  beforeOpenCallback(vue) {
    printed.value = true
    console.log('wait...', vue)
  },
  openCallback (vue) {
    console.log('opened', vue)
  },
  closeCallback (vue) {
    openPrint.value = false
    printed.value = false
    // changePeriode()
    item.value = {}
    console.log('closePrint')
  }
}
const goTo = val => {
  const Slug = val.reff

  if (val.nama === 'PEMESANAN') {
    routerInstance.replace({ name: 'sigarang.transaksi.pemesanan', params: { slug: Slug } })
  } else if (val.nama === 'PERMINTAAN RUANGAN') {
    routerInstance.replace({ name: 'sigarang.transaksi.permintaan', params: { slug: Slug } })
  } else if (val.nama === 'PENERIMAAN') {
    routerInstance.replace({ name: 'sigarang.transaksi.penerimaan', params: { slug: Slug } })
  } else if (val.nama === 'PEMAKAIAN RUANGAN') {
    routerInstance.replace({ name: 'sigarang.transaksi.pemakaianruangan', params: { slug: Slug } })
  } else if (val.nama === 'DISTRIBUSI DEPO') {
    routerInstance.replace({ name: 'sigarang.transaksi.distribusidepo', params: { slug: Slug } })
  }
  // console.log(val)
}
const hapus = val => {
  console.log(val)
  // notifCenterVue('tombol delete belum berfungsi')
  Dialog.create({
    title: 'Konfirmasi',
    message: 'Apakan anda akan menghapus Transaksi ini?',
    ok: {
      'no-caps': true,
      label: 'Lanjutkan Hapus',
      color: 'negative',
      push: true,
      icon: 'icon-mat-delete_sweep'
    },
    cancel: {
      color: 'dark',
      'no-caps': true,
      push: true
    }
  })
    .onOk(() => {
      console.log('ok', val)
      table.deleteTransaction(val)
    })
}
// edit
const editPemesanan = useEditPemesananStore()
function editRow(val, i) {
  // console.log(val)
  editPemesanan.assignForm(val, i)
  editPemesanan.setOpen()
}
const ladingPemesanan = computed(() => {
  return editPemesanan.loading
})
function loadingEdit(index) {
  return index === editPemesanan.index && ladingPemesanan.value === true
}
const color = val => {
  switch (val) {
    case 1:
      return 'blue'
      // eslint-disable-next-line no-unreachable
      break
    case 2:
      // return 'grey'
      return 'red-4'
      // eslint-disable-next-line no-unreachable
      break
    case 3:
      return 'orange'
      // eslint-disable-next-line no-unreachable
      break
    case 4:
      return 'green'
      // eslint-disable-next-line no-unreachable
      break
    case 5:
      return 'orange'
      // eslint-disable-next-line no-unreachable
      break
    case 6:
      return 'green'
      // eslint-disable-next-line no-unreachable
      break
    case 7:
      return 'grey'
      // eslint-disable-next-line no-unreachable
      break
    case 8:
      return 'blue-grey'
      // eslint-disable-next-line no-unreachable
      break
    case 9:
      return 'brown-6'
      // eslint-disable-next-line no-unreachable
      break

    default:
      return 'red'
      // eslint-disable-next-line no-unreachable
      break
  }
}

const label = (status, nama) => {
  console.log('nama', nama)
  if (nama === 'PEMESANAN') {
    switch (status) {
      case 1:
        return 'Draft'
        // eslint-disable-next-line no-unreachable
        break
      case 2:
        return 'Menunggu diterima Gudang'
        // eslint-disable-next-line no-unreachable
        break
      case 3:
        return 'Diterima Sebagian'
        // eslint-disable-next-line no-unreachable
        break
      case 4:
        return 'Diterima Seluruhnya'
        // eslint-disable-next-line no-unreachable
        break

      default:
        return 'Belum di definisikan'
        // eslint-disable-next-line no-unreachable
        break
    }
  } else if (nama === 'DISTRIBUSI DEPO') {
    switch (status) {
      case 1:
        return 'Menunggu diterima Depo'
        // eslint-disable-next-line no-unreachable
        break
      case 2:
        return 'Diterima Depo'
        // eslint-disable-next-line no-unreachable
        break

      default:
        return 'Belum di definisikan'
        // eslint-disable-next-line no-unreachable
        break
    }
  } else if (nama === 'PENERIMAAN RUANGAN') {
    switch (status) {
      case 1:
        return 'Menunggu diterima Ruangan'
        // eslint-disable-next-line no-unreachable
        break
      case 2:
        return 'Diterima Ruangan'
        // eslint-disable-next-line no-unreachable
        break

      default:
        return 'Belum di definisikan'
        // eslint-disable-next-line no-unreachable
        break
    }
  } else if (nama === 'BARANG RUSAK') {
    switch (status) {
      case 1:
        return 'Rusak'
        // eslint-disable-next-line no-unreachable
        break
      case 3:
        return 'Dinyatakn dipakai ruangan'
        // eslint-disable-next-line no-unreachable
        break

      default:
        return 'Belum di definisikan'
        // eslint-disable-next-line no-unreachable
        break
    }
  } else if (nama === 'PEMAKAIAN RUANGAN') {
    switch (status) {
      case 1:
        return 'Menunggu diterima Ruangan'
        // eslint-disable-next-line no-unreachable
        break
      case 2:
        return 'Sudah dipakai'
        // eslint-disable-next-line no-unreachable
        break
      case 9:
        return 'Rusak'
        // eslint-disable-next-line no-unreachable
        break

      default:
        return 'Belum di definisikan'
        // eslint-disable-next-line no-unreachable
        break
    }
  } else if (nama === 'PERMINTAAN RUANGAN') {
    switch (status) {
      case 1:
        return 'Draft'
        // eslint-disable-next-line no-unreachable
        break
      case 20:
        return 'Permintaan Ditolak'
        // eslint-disable-next-line no-unreachable
        break
      case 19:
        return 'Kadaluarsa'
        // eslint-disable-next-line no-unreachable
        break
      case 18:
        return 'Invalid'
        // eslint-disable-next-line no-unreachable
        break
      case 17:
        return 'Tidak Diambil Ruangan'
        // eslint-disable-next-line no-unreachable
        break
      case 4:
        return 'Menunggu verifikasi'
        // eslint-disable-next-line no-unreachable
        break
      case 5:
        return 'Telah di verifikasi'
        // eslint-disable-next-line no-unreachable
        break
      case 6:
        return 'Barang sudah bisa diambil'
        // eslint-disable-next-line no-unreachable
        break
      case 7:
        return 'Telah di distribusikan'
        // eslint-disable-next-line no-unreachable
        break
      case 8:
        return 'Telah diterima ruangan'
        // eslint-disable-next-line no-unreachable
        break

      default:
        return 'Belum di definisikan'
        // eslint-disable-next-line no-unreachable
        break
    }
  } else { // if (nama === 'PEMESANAN') {
    switch (status) {
      case 1:
        return 'Draft'
        // eslint-disable-next-line no-unreachable
        break
      case 2:
        return 'Selesai'
        // eslint-disable-next-line no-unreachable
        break
      case 3:
        return 'Diterima Sebagian'
        // eslint-disable-next-line no-unreachable
        break
      case 4:
        return 'Diterima Seluruhnya'
        // eslint-disable-next-line no-unreachable
        break
      case 5:
        return 'Menunggu verifikasi'
        // eslint-disable-next-line no-unreachable
        break
      case 6:
        return 'Telah di verifikasi'
        // eslint-disable-next-line no-unreachable
        break
      case 7:
        return 'Telah di distribusikan'
        // eslint-disable-next-line no-unreachable
        break

      default:
        return 'Belum di definisikan'
        // eslint-disable-next-line no-unreachable
        break
    }
  }
}

onMounted(() => {
  if (table.nama === '') {
    if (role.value === 'PTK' || role.value === 'root' || role.value === 'gizi') {
      table.pilihTransaksi({ nama: 'Pemesanan' })
    }
    if (role.value === 'gudang' || role.value === 'depo' || role.value === 'ruangan') {
      table.pilihTransaksi({ nama: 'Permintaan Ruangan' })
    }
  }
})
watch(() => role.value, val => {
  if (table.nama === '') {
    if (val === 'PTK' || val === 'root' || val === 'gizi') {
      table.pilihTransaksi({ nama: 'Pemesanan' })
    }
    if (val === 'gudang' || val === 'depo' || val === 'ruangan') {
      table.pilihTransaksi({ nama: 'Permintaan Ruangan' })
    }
  }
})
// table.getDataTable()
</script>
<style scoped>
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
