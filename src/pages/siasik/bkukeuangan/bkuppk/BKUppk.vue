<template>
  <div class="container q-pl-sm q-pr-sm">
    <div class="q-card q-mt-xs q-mt-ms">
      <q-card class="q-pa-xs">
        <div class="row bg-primary text-white q-pa-sm q-mb-xs q-mt-xs">
          <div class="f-14 text-weight-bold">
            Laporan BKU Pejabat Penatausahaan Keuangan | SIASIK
          </div>
        </div>
      </q-card>
    </div>
    <div class="q-card q-mt-sm">
      <q-card class="q-pa-xs">
        <div class="row justify-center q-pt-md">
          <div class="row">
            <div class="col-1">
              <q-img
                src="~assets/images/logo_kota_original.png"
                spinner-color="white"
                style="height: 3.3cm; width: 2.6cm"
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
            <div class="col-1">
              <q-img
                src="~assets/logos/logo-rsud.png"
                spinner-color="white"
                style="height: 3cm; width: 3cm"
              />
            </div>

            <div class="col-12 q-pt-md">
              <div class="row justify-center text-weight-bold">
                Buku Kas Umum Pejabat Pengelola Keuangan
              </div>
              <div class="row justify-center text-weight-bold">
                Periode Bulan {{ bulan(store.params.bulan) }} {{ store.params.tahun }}
              </div>
            </div>
          </div>
        </div>

        <div class="row q-col-gutter-sm q-my-sm q-pl-lg">
          <div class="col-2">
            <app-autocomplete
              v-model="store.params.bulan"
              label="Pilih Bulan"
              autocomplete="nama"
              option-label="nama"
              option-value="value"
              outlined
              :source="store.bulans"
            />
          </div>
          <div class="col-2">
            <app-input
              v-model="store.params.tahun"
              label="Tahun"
              outlined
            />
          </div>
          <div class="col-2">
            <app-btn
              label="Ambil Data"
              :disable="store.loading"
              :loading="store.loading"
              @click="ambilData()"
            />
          </div>
        </div>
      </q-card>
    </div>

    <div class="q-card q-mt-sm">
      <q-card class="q-pa-xs">
        <template v-if="store.loading">
          <div class="row justify-center">
            <div class="q-gutter-md">
              <q-spinner-pie
                color="amber-13"
                type="circle"
                animation="pulse-x"
                size="40px"
              />
              <q-spinner-pie
                color="amber-13"
                type="circle"
                animation="pulse-x"
                size="60px"
              />
              <q-spinner-pie
                color="amber-13"
                type="circle"
                animation="pulse-x"
                size="40px"
              />
            </div>
          </div>
        </template>
        <template v-else>
          <div class="row flex flex-center">
            <table
              class="table table-responsive"
              style="font-size: 13px"
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
          </div>
          <div class="contaier q-pt-lg q-pl-xl">
            <q-card
              class="saldo bg-grey-3 q-pa-xs"
              style="width: 500px; height: 120px"
            >
              <div
                class="row justify-center q-pt-sm"
                style="font-size: 14px"
              >
                <table
                  class="text-weight-bolder"
                  style="width: 400px; height: 100px"
                >
                  <tr class="no-border">
                    <td
                      class="text-left no-border"
                      width="120px"
                    >
                      Saldo Awal
                    </td>
                    <td
                      width="50px"
                      class="no-border"
                    >
                      :
                    </td>
                    <td
                      class="text-right no-border"
                      width="170px"
                    >
                      {{ formattanpaRp(0) }}
                    </td>
                  </tr>
                  <tr>
                    <td
                      class="text-left no-border"
                      width="120px"
                    >
                      Masuk
                    </td>
                    <td
                      width="50px"
                      class="no-border"
                    >
                      :
                    </td>
                    <td
                      class="text-right no-border"
                      width="170px"
                    >
                      {{ formattanpaRp(totaldebit()) }}
                    </td>
                  </tr>
                  <tr>
                    <td
                      class="text-left no-border"
                      width="120px"
                    >
                      Keluar
                    </td>
                    <td
                      width="50px"
                      class="no-border"
                    >
                      :
                    </td>
                    <td
                      class="text-right no-border"
                      width="170px"
                    >
                      {{ formattanpaRp(totalkredit()) }}
                    </td>
                  </tr>
                  <tr>
                    <td
                      class="text-left no-border"
                      width="120px"
                    >
                      Saldo Akhir
                    </td>
                    <td
                      width="50px"
                      class="no-border"
                    >
                      :
                    </td>
                    <td
                      class="text-right no-border"
                      width="170px"
                    >
                      {{ formattanpaRp(totalsaldo()) }}
                    </td>
                  </tr>
                </table>
              </div>
            </q-card>
          </div>
          <div style="padding-bottom: 50px" />
        </template>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import { formattanpaRp } from 'src/modules/formatter'
import { useLaporanBkuPpkStore } from 'src/stores/siasik/laporan/bku/bkuppk'
import { onMounted } from 'vue'
// import VueHtml2pdf from 'vue-html2pdf'

const store = useLaporanBkuPpkStore()
onMounted(() => {
  store.getDataTable()
})
function bulan (val) {
  const bulan = store.bulans.find((x) => x.value === val)
  return bulan?.nama ?? '-'
}

function ambilData () {
  // store.hitungharidalamBulan();
  store.getDataTable()
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
  return totalsaldo
}
// function saldoindex(ss) {
//   const saldoss = store.hasilArray[ss];
//   let saldoawal = 0;
//   let saldototal = 0;

//   if (ss === 0) {
//     saldoawal = saldoss.penerimaan - saldoss.pengeluaran;
//     saldototal = saldoawal;
//   } else if (ss > 0) {
//     const saldoseblumnya =
//       store.hasilArray[ss - 1].penerimaan -
//       store.hasilArray[ss - 1].pengeluaran;
//     const saldoskg =
//       store.hasilArray[ss].penerimaan - store.hasilArray[ss].pengeluaran;
//     saldototal = saldoseblumnya + saldoskg;
//   }
//   // console.log(saldototal);
//   return saldototal;
// }
</script>

<style>
table {
  border-collapse: collapse;
  border-radius: 6px;
  max-width: 1500px;
  width: 100%;
}

td,
th {
  border-collapse: collapse;
  border: 1px solid rgb(163, 163, 163);
  text-align: center;
}

thead tr {
  height: 60px;
  background: #ffed86;
  font-size: 16px;
}

tbody tr {
  height: 48px;
  border-bottom: 1px solid #e3f1d5;
}

td,
th {
  text-align: center;
}
.grs_bawah {
  border-bottom: 1px solid grey;
}
</style>
