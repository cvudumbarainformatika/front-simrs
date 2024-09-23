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
              Buku Kas Umum Pejabat Pengelola Keuangan
            </div>
            <div class="row justify-center text-weight-bold">
              Periode Bulan {{ bulan(store.params.bulan) }} {{ store.params.tahun }}
            </div>
          </div>

          <q-card-section class="q-pa-md full-width">
            <template v-if="store.hasilArray">
              <table
                class="full-width"
              >
                <thead class="align-middle text-center display-block thead-sticky">
                  <tr style="font-size: 13px">
                    <th width="50px">
                      No
                    </th>
                    <th width="100px">
                      Tanggal
                    </th>
                    <th width="200px">
                      Register/Rekening
                    </th>
                    <th width="500px">
                      Uraian
                    </th>
                    <th>Penerimaan (Rp.)</th>
                    <th>Pengeluaran (Rp.)</th>
                    <th>Saldo (Rp.)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item, n) in store.hasilArray"
                    :key="item"
                  >
                    <td
                      data-th="No"
                      class="text-reguler"
                    >
                      {{ n + 1 }}
                    </td>
                    <td
                      data-th="Tanggal"
                      class="text-reguler"
                    >
                      {{ item?.tgl }}
                    </td>

                    <!-- REGISTER -->
                    <td
                      data-th="Register/Rekening"
                      class="text-left q-pl-sm"
                    >
                      <div class="text-reguler">
                        {{ item?.notrans }}
                      </div>
                    </td>

                    <!-- URAIAN -->
                    <td
                      data-th="Uraian"
                      class="text-left q-pl-sm"
                    >
                      <div class="text-reguler">
                        {{ item?.uraian }}
                      </div>
                    </td>

                    <!-- PENERIMAAN -->
                    <td
                      data-th="Penerimaan"
                      class="text-right q-pr-sm"
                    >
                      <div class="text-reguler">
                        {{ formattanpaRp(item?.penerimaan) }}
                      </div>
                    </td>

                    <!-- PENGELUARAN -->
                    <td
                      data-th="Pengeluaran"
                      class="text-right q-pr-sm"
                    >
                      <div class="text-reguler">
                        {{ formattanpaRp(item?.pengeluaran) }}
                      </div>
                    </td>

                    <!-- SALDO -->
                    <td
                      data-th="Saldo"
                      class="text-right q-pr-sm text-bold"
                    >
                      {{ formattanpaRp(item.total) }}
                    </td>
                  </tr>
                  <tr>
                    <th colspan="4">
                      TOTAL
                    </th>
                    <th class="text-right text-weight-bolder q-pr-sm">
                      {{ formattanpaRp(totaldebit()) }}
                    </th>
                    <th class="text-right text-weight-bolder q-pr-sm">
                      {{ formattanpaRp(totalkredit()) }}
                    </th>
                    <th class="text-right text-weight-bolder q-pr-sm">
                      {{ formattanpaRp(totalsaldo()) }}
                    </th>
                  </tr>
                </tbody>
              </table>
            </template>
          </q-card-section>
          <q-card-section>
            <div
              class="row"
            >
              <table
                class="text-bold no-border"
                style="width:400px; height: auto;"
              >
                <tr class="no-border" style="height: 0;">
                  <td
                    class="text-left no-border" style="height: 0;"
                  >
                    Saldo Awal
                  </td>
                  <td
                    class="no-border" style="height: 0;"
                  >
                    :
                  </td>
                  <td
                    class="text-right no-border" style="height: 0;"
                  >
                    {{ formattanpaRp(0) }}
                  </td>
                </tr>
                <tr>
                  <td
                    class="text-left no-border" style="height: 0;"
                  >
                    Masuk
                  </td>
                  <td
                    class="no-border" style="height: 0;"
                  >
                    :
                  </td>
                  <td
                    class="text-right no-border" style="height: 0;"
                  >
                    {{ formattanpaRp(totaldebit()) }}
                  </td>
                </tr>
                <tr>
                  <td
                    class="text-left no-border" style="height: 0;"
                  >
                    Keluar
                  </td>
                  <td
                    class="no-border" style="height: 0;"
                  >
                    :
                  </td>
                  <td
                    class="text-right no-border" style="height: 0;"
                  >
                    {{ formattanpaRp(totalkredit()) }}
                  </td>
                </tr>
                <tr>
                  <td
                    class="text-left no-border" style="height: 0;"
                  >
                    Saldo Akhir
                  </td>
                  <td
                    class="no-border" style="height: 0;"
                  >
                    :
                  </td>
                  <td
                    class="text-right no-border" style="height: 0;"
                  >
                    {{ formattanpaRp(totalsaldo()) }}
                  </td>
                </tr>
              </table>
            </div>
          </q-card-section>
          <div class="ttd-kanan">
            <div class="q-py-xs">
              Probolinggo {{ store.display.sekarang }}
            </div>
            <div class="text-bold">
              Pejabat Penatausahaan Keuangan
            </div>
            <div style="padding-bottom: 40px" />
            <div class="underline text-bold q-py-xs">
              {{ pegawai.pegawais[2]?.nama }}
              <div class="garis-bawah" style="text-decoration-line: underline;" />
            </div>
            <div>
              NIP. {{ pegawai.pegawais[2]?.nip }}
            </div>
          </div>
        </div>
      </div>
      <q-card-section class="bg-primary text-white">
        <div class="row justify-end items-end">
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
import { formattanpaRp } from 'src/modules/formatter'
// eslint-disable-next-line no-unused-vars
import { terbilangRupiah } from 'src/modules/utils'

import { onMounted, ref } from 'vue'
import { useLaporanBkuPpkStore } from 'src/stores/siasik/laporan/bku/bkuppk'
import { useLaporanBkuPengeluaranStore } from 'src/stores/siasik/laporan/bku/bkupengeluaran'

const store = useLaporanBkuPpkStore()
const pegawai = useLaporanBkuPengeluaranStore()
onMounted(() => {
  pegawai.getDataTable()
})

function bulan (val) {
  const bulan = store.bulans.find((x) => x.value === val)
  return bulan?.nama ?? '-'
}
function totaldebit () {
  const debit = store.hasilArray
  // console.log("njaaias", debit);
  const totaldebit = debit?.length
    ? debit?.map((x) => x.penerimaan).reduce((x, y) => x + y, 0)
    : 0
  // console.log("debit", totaldebit);
  return totaldebit
}
function totalkredit () {
  const kredit = store.hasilArray
  // console.log("njaaias", debit);
  const totalkredit = kredit?.length
    ? kredit?.map((x) => x.pengeluaran).reduce((x, y) => x + y, 0)
    : 0
  // console.log("debit", totaldebit);
  return totalkredit
}

function totalsaldo () {
  const saldo = store.hasilArray
  // console.log("njaaias", debit);
  const totalsaldo = saldo?.length
    ? saldo?.map((x) => x.penerimaan).reduce((x, y) => x + y, 0) -
      saldo?.map((x) => x.pengeluaran).reduce((x, y) => x + y, 0)
    : 0
  // console.log("debit", totaldebit);
  store.saldoakhir = totalsaldo
  return totalsaldo
}
const printed = ref(false)
const printObj = {
  id: 'printMe',
  popTitle: 'BKU Pejabat Penatausahaan Keuangan | SIASIK',
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

.ttd-kanan{
  position: relative;
  top: 5px;
  text-align: center;
  justify-content: center;
  width: 60%;
  height: 100px;
  left: 40%;
}
.underline {
  text-decoration-line: underline;

}
</style>
