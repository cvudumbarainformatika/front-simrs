<!-- eslint-disable space-before-function-paren -->
<!-- eslint-disable space-before-function-paren -->
<!-- eslint-disable space-before-function-paren -->
<!-- eslint-disable space-before-function-paren -->
<template>
  <div class="container q-pl-sm q-pr-sm">
    <div class="q-card q-mt-xs q-mt-ms">
      <q-card class="q-pa-xs">
        <div class="row bg-primary text-white q-pa-sm q-mb-xs q-mt-xs">
          <div class="f-14 text-weight-bold">
            Laporan Realisasi Anggaran | SIASIK
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
                Laporan Realisasi Anggaran Periode {{ store.display.dari + ' - ' + store.display.sampai }}
              </div>
              <!-- <div class="row justify-center text-weight-bold">
                Periode Bulan {{ bulan(store.params.bulan) }} {{ store.params.tahun }}
              </div> -->
            </div>
            <div class="q-pl-lg" />
          </div>
        </div>

        <div class="row q-col-gutter-sm q-my-sm q-pl-lg">
          <div class="col-2">
            <app-input-date-human
              :model="store.params.tgl"
              label="dari tangal"
              outlined
              :disable="store.loading"
              :loading="store.loading"
              @db-model="tglDari"
              @set-display="setDari"
            />
          </div>
          <div class="col-2">
            <app-input-date-human
              class="q-ml-md"
              :model="store.params.tglx"
              label="sampai tangal"
              outlined
              :disable="store.loading"
              :loading="store.loading"
              @db-model="tglSampai"
              @set-display="setSampai"
            />
          </div>
          <div class="col-2">
            <app-autocomplete
              v-model="store.params.bidang"
              label="Pilih Bidang"
              autocomplete="bidang"
              option-label="bidang"
              option-value="kodebidang"
              outlined
              :source="store.bidangs"
              :loading="store.loading"
            />
          </div>
          <div class="col-2">
            <app-autocomplete
              v-model="store.params.kegiatan"
              label="Pilih Kegiatan"
              autocomplete="kegiatan"
              option-label="kegiatan"
              option-value="kodekegiatan"
              outlined
              :source="store.bidangs"
              :loading="store.loading"
            />
          </div>
          <div>
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
                size="40px"
              />
              <q-spinner-pie
                color="amber-13"
                size="60px"
              />
              <q-spinner-pie
                color="amber-13"
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
              <thead class="align-middle text-center display-block">
                <tr style="font-size: 14px">
                  <th width="150px">
                    Kode Rekening
                  </th>
                  <th width="500px">
                    Uraian
                  </th>
                  <th>Anggaran (Rp.)</th>
                  <th>Realisasi Sebelumnya (Rp.)</th>
                  <th>Realisasi Sekarang (Rp.)</th>
                  <th>Selisih (Rp.)</th>
                  <th>(%)</th>
                </tr>
              </thead>
              <tbody class="align-middle q-pl-sm">
                <tr v-for="item in store.pendapatans" :key="item">
                  <td class="text-left q-pl-sm q-pr-sm">
                    <div> {{ item.kodeall3 }}  </div>
                  </td>
                  <td class="text-left q-pl-sm q-pr-sm">
                    <div> {{ item.uraian }}  </div>
                  </td>
                  <td class="text-right q-pl-sm q-pr-sm">
                    <div>{{ formattanpaRp(store.realisasipends?.totalPaguPendapatan) }}</div>
                  </td>
                  <td class="text-right q-pl-sm q-pr-sm">
                    <div>{{ formattanpaRp(store.realisasipends?.totalSebelumnya) }}</div>
                  </td>
                  <td class="text-right q-pl-sm q-pr-sm">
                    <div>{{ formattanpaRp(store.realisasipends?.totalSekarang) }}</div>
                  </td>
                  <td class="text-right q-pl-sm q-pr-sm">
                    <div> {{ formattanpaRp(store.realisasipends?.selisih) }} </div>
                  </td>
                  <td class="text-right q-pl-sm q-pr-sm">
                    <div> {{ formattanpaRp(store.realisasipends?.persen) }} </div>
                  </td>
                </tr>
                <tr class="total text-bold">
                  <td class="text-right q-pl-sm q-pr-sm" colspan="2">
                    TOTAL PENDAPATAN
                  </td>
                  <td class="text-right q-pl-sm q-pr-sm">
                    <div>{{ formattanpaRp(store.realisasipends?.totalPaguPendapatan) }}</div>
                  </td>
                  <td class="text-right q-pl-sm q-pr-sm">
                    <div> {{ formattanpaRp(store.realisasipends?.totalSebelumnya) }} </div>
                  </td>
                  <td class="text-right q-pl-sm q-pr-sm">
                    <div> {{ formattanpaRp(store.realisasipends?.totalSekarang) }} </div>
                  </td>
                  <td class="text-right q-pl-sm q-pr-sm">
                    <div> {{ formattanpaRp(store.realisasipends?.selisih) }} </div>
                  </td>
                  <td class="text-right q-pl-sm q-pr-sm">
                    <div> {{ formattanpaRp(store.realisasipends?.persen) }} </div>
                  </td>
                </tr>

                <tr v-for="item in store.items" :key="item">
                  <td class="text-left q-pl-sm q-pr-sm">
                    <div> {{ item.kodeall3 }} </div>
                  </td>
                  <td class="text-left q-pl-sm q-pr-sm">
                    <div> {{ item.uraian }} </div>
                  </td>
                  <td class="text-right q-pl-sm q-pr-sm">
                    <div>{{ formattanpaRp(item.totalPagu) }} </div>
                  </td>
                  <td class="text-right q-pl-sm q-pr-sm">
                    <div>{{ formattanpaRp(item.totalRealisasiSebelumnya) }}</div>
                  </td>
                  <td class="text-right q-pl-sm q-pr-sm">
                    <div>
                      {{ formattanpaRp(item.totalRealisasi) }}
                    </div>
                  </td>
                  <td class="text-right q-pl-sm q-pr-sm">
                    <div>
                      {{ formattanpaRp(item.selisih) }}
                    </div>
                  </td>
                  <td class="text-right q-pl-sm q-pr-sm">
                    <div>
                      {{ item.persen }}
                    </div>
                  </td>
                </tr>
                <tr class="total text-bold">
                  <td class="text-right q-pl-sm q-pr-sm" colspan="2">
                    TOTAL BELANJA
                  </td>
                  <td class="text-right q-pl-sm q-pr-sm">
                    {{ formattanpaRp(totalPagux ()) }}
                  </td>
                  <td class="text-right q-pl-sm q-pr-sm">
                    {{ formattanpaRp(totalRealisasiSebelumnya ()) }}
                  </td>
                  <td class="text-right q-pl-sm q-pr-sm">
                    {{ formattanpaRp(totalRealisasi ()) }}
                  </td>
                  <td class="text-right q-pl-sm q-pr-sm">
                    {{ formattanpaRp(totalSelisih ()) }}
                  </td>
                  <td class="text-right q-pl-sm q-pr-sm">
                    {{ formattanpaRp(totalPersen ()) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div style="padding-bottom: 50px" />
        </template>
      </q-card>
    </div>
  </div>
</template>

<script setup>
// import { date } from 'quasar'
import { formattanpaRp } from 'src/modules/formatter'
import { useLaporanLraLaprealisasianggaranStore } from 'src/stores/siasik/laporan/lra/laprealisasianggaran'
import { onMounted } from 'vue'
// import { ref } from 'vue'
const store = useLaporanLraLaprealisasianggaranStore()
store.getDataRealisasi()
store.realisasiPendapatan()
// store.getDataPendapatan()
onMounted(() => {
  store.getDataBidang()
  // store.getSebelumnya()
  // store.paguAnggaran()
  // store.realisasiAnggaran()
  // store.getBidang()
})
function tglDari (val) {
  store.setParameter('tgl', val)
}
function setDari (val) {
  store.display.dari = val
}
function tglSampai (val) {
  store.setParameter('tglx', val)
}
function setSampai (val) {
  store.display.sampai = val
}

function totalPagux () {
  const saldo = store.items
  const totalanggaran = saldo[0]?.totalPagu
  return totalanggaran
}
function totalRealisasiSebelumnya () {
  const saldo = store.items
  const totalpagu = saldo[0]?.totalRealisasiSebelumnya
  return totalpagu
}

function totalRealisasi () {
  const saldo = store.items
  const totalpagu = saldo[0]?.totalRealisasi
  return totalpagu
}

function totalSelisih () {
  const saldo = store.items
  const totalpagu = saldo[0]?.selisih
  return totalpagu
}
function totalPersen () {
  const saldo = store.items
  const totalpagu = saldo[0]?.persen
  return totalpagu
}
function ambilData () {
  // store.hitungharidalamBulan();
  store.getDataRealisasi().then(() => {
    store.emptyForm()
  })
}

</script>

<style>
table{
  border-collapse: collapse;
  border-radius: 6px;
  max-width: 1500px;
  width: 100%;
  border: 1px solid rgb(163, 163, 163);
}
thead th{
  background: #ffed86;
  height: 50px;
  border-collapse: collapse;
  border-radius: 6px;
  border: 1px solid rgb(163, 163, 163);
}
tbody tr td{
  height: 30px;
  max-height: 60px;
  border-collapse: collapse;
  border-radius: 6px;
  border: 1px solid rgb(163, 163, 163);
}
.total{
  background: #e6efff;
}

</style>
