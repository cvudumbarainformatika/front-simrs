<template>
  <q-dialog persistent backdrop-filter="blur(4px)">
    <q-card style="min-width:80vw; max-width: 80vw;">
      <q-bar class="bg-black text-white">
        <div>Cetak NPD-LS</div>
        <q-space />

        <q-btn dense flat icon="icon-mat-close" v-close-popup>
          <q-tooltip>Close</q-tooltip>
        </q-btn>
      </q-bar>

      <div id="printMe" class="f-12 row justify-center q-pt-md">
        <div class="row">
          <div class="col-1 q-pl-md">
            <q-img
              src="~assets/images/Pemkot.svg"
              style="height: 2.6cm; width: 2cm"
            />
          </div>
          <div class="col-10">
            <div class="row justify-center text-h6">
              PEMERINTAH KOTA PROBOLINGGO
            </div>
            <div class="row justify-center text-h7 text-weight-bold">
              DINAS KESEHATAN, PENGENDALIAN PENDUDUK, DAN KELUARGA BERENCANA
            </div>
            <div class="row justify-center text-h5 text-weight-bold">
              UOBK RSUD DOKTER MOHAMAD SALEH
            </div>
            <div class="row justify-center text-h8">
              Jl. Mayjen Panjaitan No.65 Telp.(0335) 433119, 42118 Fax (0335)
              432702
            </div>
            <div class="row justify-center text-h8 text-weight-bold">
              PROBOLINGGO 67219
            </div>
          </div>
          <div class="col-1 logo_kanan">
            <q-img
              src="~assets/logos/logo-rsud.png"
              style="height: 2.6cm; width: 2.6cm"
            />
          </div>

          <div class="col-12 q-pt-md">
            <div class="row justify-center text-weight-bold q-py-xs">
              Nota Permintaan Dana Langsung (NPD-LS)
            </div>
            <div class="row justify-center text-weight-bold q-py-xs">
              Nomor : {{ store.npddatasave.nonpdls }}
            </div>
          </div>
          <q-separator style="margin-top: -10px;" />
          <q-card-section class="q-pa-sm full-width">
            <div class="col-auto">
              <div class="row q-col-gutter-md full-width">
                <div class="col-auto">
                  <div class="q-py-xs">
                    Kegiatan BLUD
                  </div>
                  <div>
                    Pihak Ketiga
                  </div>
                  <div class="q-py-xs">
                    Nama Bank
                  </div>
                  <div>
                    No. Rekening
                  </div>
                  <div class="q-py-xs">
                    NPWP
                  </div>
                  <div>
                    Keterangan
                  </div>
                </div>
                <div class="col full-width">
                  <div class="q-py-xs">
                    : {{ store.npddatasave.kegiatanblud }}
                  </div>
                  <div>
                    : {{ store.npddatasave.penerima }}
                  </div>
                  <div class="q-py-xs">
                    : {{ store.npddatasave.bank }}
                  </div>
                  <div>
                    : {{ store.npddatasave.rekening }}
                  </div>
                  <div class="q-py-xs">
                    : {{ store.npddatasave.npwp }}
                  </div>
                  <div>
                    : {{ store.npddatasave.keterangan }}
                  </div>
                </div>
              </div>
            </div>
          </q-card-section>
          <q-card-section class="q-pa-md full-width">
            <!-- <template v-if="!store.npddatasave.rincian.nopenerimaan">
              <table
                class="full-width"
              >
                <thead>
                  <tr>
                    <th width="20%">
                      Kode Rekening 50
                    </th>
                    <th width="40%">
                      Rincian Belanja
                    </th>
                    <th width="20%">
                      Item Belanja
                    </th>
                    <th width="20%">
                      Nominal Pembayaran
                    </th>
                  </tr>
                </thead>
                <tbody class="align-middle q-pl-sm">
                  <tr v-for="item in store.npddatasave.rincian" :key="item">
                    <td>
                      <div>{{ item.koderek50 }}</div>
                    </td>
                    <td>
                      <div>{{ item.rincianbelanja }}</div>
                    </td>
                    <td>
                      <div>{{ item.itembelanja }}</div>
                    </td>
                    <td class="text-right">
                      <div>{{ formattanpaRp(item.nominalpembayaran) }}</div>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="3" class="text-center text-bold">
                      <div>Jumlah Pengajuan</div>
                    </td>
                    <td class="text-right text-bold">
                      <div>{{ formattanpaRp(store.reqs.subtotal) }}</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </template> -->

            <table
              class="float-center bordered"
            >
              <thead>
                <tr>
                  <th width="30%">
                    Kode Rekening 50
                  </th>
                  <th width="30%">
                    Rincian Belanja
                  </th>
                  <th width="20%">
                    Item Belanja
                  </th>
                  <th width="15%">
                    Nominal Pembayaran
                  </th>
                </tr>
              </thead>
              <tbody class="align-middle q-pl-sm">
                <tr v-for="item in store.npddatasave.rincian" :key="item">
                  <td>
                    <div>{{ item.nopenerimaan }}</div>
                    <div>{{ item.koderek50 }}</div>
                  </td>
                  <td>
                    <div>{{ item.rincianbelanja }}</div>
                  </td>
                  <td>
                    <div>{{ item.itembelanja }}</div>
                  </td>
                  <td class="text-right">
                    <div>{{ formattanpaRp(item.nominalpembayaran) }}</div>
                  </td>
                </tr>
                <tr>
                  <td colspan="3" class="text-center text-bold">
                    <div>Jumlah Pengajuan</div>
                  </td>
                  <td class="text-right text-bold">
                    <div>{{ formattanpaRp(store.npddatasave.total) }}</div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="col-auto q-pt-md text-bold">
              <div class="row q-col-gutter-md full-width">
                <div class="col-auto">
                  <div class="q-py-xs">
                    Nilai Pengajuan
                  </div>
                  <div>Terbilang</div>
                </div>
                <div class="col full-width">
                  <div class="q-py-xs">
                    : {{ 'Rp. ' + formattanpaRp(store.npddatasave.total) }}
                  </div>
                  <div>: {{ terbilangRupiah(store.npddatasave.total) + ' Rupiah' }} </div>
                </div>
              </div>
            </div>
          </q-card-section>

          <div class="ttd-kanan">
            <div class="q-py-xs">
              Probolinggo {{ store.display.sekarang }}
            </div>
            <div class="text-bold">
              Bendahara Pengeluaran
            </div>
            <div style="padding-bottom: 40px" />
            <div class="underline text-bold q-py-xs">
              {{ pegawai.pegawais[0]?.nama }}
              <div class="garis-bawah" style="text-decoration-line: underline;" />
            </div>
            <div>
              NIP. {{ pegawai.pegawais[0]?.nip }}
            </div>
          </div>
          <div class="ttd-kiri">
            <div class="invisible">
              .
            </div>
            <div class="text-bold q-py-xs q-pt-sm">
              Pejabat Teknis Kegiatan
            </div>
            <div style="padding-bottom: 40px" />
            <div class="underline text-bold q-py-xs">
              {{ store.npddatasave.pptk }}
              <div class="garis-bawah" style="text-decoration-line: underline;" />
            </div>
            <div>
              NIP. {{ store.npddatasave.kodepptk }}
            </div>
          </div>
        </div>
      </div>
      <q-card-section class="q-pa-none bg-primary text-white">
        <div class="q-pa-md row justify-end items-end">
          <div class="items-end">
            <q-btn
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
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { formNotaPermintaanDanaLS } from 'src/stores/siasik/transaksi/ls/npdls/formnpdls'
import { useLaporanBkuPengeluaranStore } from 'src/stores/siasik/laporan/bku/bkupengeluaran'

import { formattanpaRp } from 'src/modules/formatter'
// eslint-disable-next-line no-unused-vars
import { terbilangRupiah } from 'src/modules/utils'

const store = formNotaPermintaanDanaLS()
const pegawai = useLaporanBkuPengeluaranStore()

import { onMounted, ref } from 'vue'

onMounted(() => {
  pegawai.getDataTable()
  store.listdatanpd()
})

const printed = ref(false)
const printObj = {
  id: 'printMe',
  popTitle: 'Nota Permintaan Dana Langsung (NPD-LS) | SIASIK',
  beforeOpenCallback (vue) {
    printed.value = true
    console.log('wait...')
  },
  openCallback (vue) {
    console.log('opened')
  },
  closeCallback (vue) {
    printed.value = false
    console.log('closePrint')
  }
}
// const init = () => {
//   store.dataTersimpan()
// }
// const cetakNPD = ref(false)
// function hitungSubtotal () {
//   const arr = store.form.rincians
//   const obj = arr.length ? arr.map((x) => x.nominalpembayaran) : []
//   const subtotal = obj.reduce((x, y) => x + y, 0)
//   // console.log('jumlah', obj)
//   // const total = nominal.reduce((x, y) => x + y, 0)
//   return subtotal
// }
</script>
<style lang="scss" scoped>
.daftarkegiatan{
  left: 120px;
  top: 200px;
  width: fit-content;
}
.kop{
  border-bottom: 1px solid grey;
  width: fit-content;
}
.logo_kanan{
  right: 5%;
  position: relative;
}
.subtotal{
  position: relative;
  width: 100%;
  height: 100px;
  border-radius: 5px;
}
.vertical-center {
  margin: 0;
  position: absolute;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}
table, th, td {
  border: 1px solid black;
  border-collapse: collapse;
}
th, td {
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 5px;
  padding-right: 5px;
}
.ttd-kanan{
  position: relative;
  top: 50px;
  text-align: center;
  justify-content: center;
  width: 60%;
  height: 100px;
  left: 40%;
}
.ttd-kiri{
  position: relative;
  bottom: 50px;
  text-align: center;
  justify-content: center;
  width: 50%;
  height: 100px;
}
.underline {
  text-decoration-line: underline;

}
</style>
