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
            <template #cell-perusahaan="{row}">
              {{ row.perusahaan.nama }}
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
              <q-btn
                v-if="row.status===1 && (role==='PTK' || role==='root'|| role==='gizi')"
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
          </app-table-view>
          <!--
            row-image="image"
            @delete-ids="table.deletesData"
            -->
        </template>
      </app-card>
    </div>
    <q-dialog v-model="openPrint">
      <q-card>
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
          >
            <q-tooltip
              class="primary"
              :offset="[10, 10]"
            >
              Pilih PTK dan gudang
            </q-tooltip>
          </q-btn>
        </div>
        <div
          id="printMe"
          style="width:210mm; height:310mm; margin:20mm; "
        >
          <!-- heder -->
          <q-card-section>
            <div class="row q-mb-sm">
              <div class="col-6">
                UOBK RSUD DOKTER MOHAMAD SALEH
              </div>
              <div class="col-6">
                PROBOLINGGO, {{ dateFullFormat(item.tanggal) }}
              </div>
            </div>
            <div class="row q-mb-sm">
              <div class="col-6">
                KOTA PROBOLINGGO
              </div>
              <div class="col-6">
                KEPADA: {{ item.perusahaan?item.perusahaan.nama:'perusahaan tidak ditemukan' }}
              </div>
            </div>
            <div class="row justify-center q-mb-sm">
              SURAT PESANAN
            </div>
            <div class="row justify-center q-mb-sm">
              NO. {{ item.nomor }}
            </div>
          </q-card-section>
          <q-separator />
          <q-card-section>
            <div v-if="!item.details">
              <app-no-data />
            </div>
            <div v-if="item.details">
              <!-- header detail -->
              <div class="row justify-between q-col-gutter-sm">
                <div class="col-2">
                  Nama Barang
                </div>
                <div class="col-2">
                  Jumlah
                </div>
                <div class="col-3">
                  Keterangan
                </div>
              </div>
              <q-separator />
              <div
                v-for="(det, i) in item.details"
                :key="i"
              >
                <div
                  class="row justify-between q-col-gutter-sm"
                >
                  <div class="col-2">
                    {{ i+1 }}. {{ det.barangrs?det.barangrs.nama:'Nama barang tidak ditemukan' }}
                  </div>
                  <div class="col-2">
                    {{ det.qty }} {{ det.satuan?det.satuan.nama:'-' }}
                  </div>
                  <div class="col-3">
                    {{ det.merk?det.merk:'-' }}
                  </div>
                </div>
                <q-separator />
              </div>
            </div>
          </q-card-section>
          <!-- tanda tangan -->
          <q-card-section>
            <div class="row justify-between q-col-gutter-sm">
              <div class="col-6 text-center">
                penerima
              </div>
              <div class="col-6 text-center">
                ptk
              </div>
            </div>
            <div class="row justify-center q-col-gutter-sm">
              <div>mengetahui</div>
            </div>
          </q-card-section>
        </div>
      </q-card>
    </q-dialog>
    <DetailsTablePage v-model="detail.isOpen" />
    <!-- id="printMe" -->
  </q-page>
</template>
<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { dateFullFormat, dateFull, formatRp } from 'src/modules/formatter'
import { useDetailHistoryTable } from 'src/stores/simrs/logistik/sigarang/history/details'
import { useHistoryTable } from 'src/stores/simrs/logistik/sigarang/history/table'
import DetailsTablePage from './DetailsTablePage.vue'
// import PrintPage from './PrintPage.vue'
import { routerInstance } from 'src/boot/router'
// import { notifCenterVue } from 'src/modules/utils'
import { Dialog } from 'quasar'
import { useAuthStore } from 'src/stores/auth'
const table = useHistoryTable()
const detail = useDetailHistoryTable()

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
</style>
