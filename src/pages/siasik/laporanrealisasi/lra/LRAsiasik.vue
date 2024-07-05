<!-- eslint-disable space-before-function-paren -->
<!-- eslint-disable space-before-function-paren -->
<!-- eslint-disable space-before-function-paren -->
<!-- eslint-disable space-before-function-paren -->
<template>
  <div id="printMe">
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
      <div class="q-card q-mt-sm q-pr-lg">
        <q-card class="q-pa-xs">
          <q-card-section>
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
          </q-card-section>

          <div class="print-hide row middle q-pa-md q-gutter-md">
            <app-input-date-human
              :model="store.params.tgl"
              label="dari tangal"
              outlined
              :disable="store.loading"
              :loading="store.loading"
              @db-model="tglDari"
              @set-display="setDari"
            />
            <app-input-date-human
              :model="store.params.tglx"
              label="sampai tangal"
              outlined
              :disable="store.loading"
              :loading="store.loading"
              @db-model="tglSampai"
              @set-display="setSampai"
            />
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
            <app-autocomplete
              v-model="store.params.kegiatan"
              label="Pilih Kegiatan"
              autocomplete="kegiatan"
              option-label="kegiatan"
              option-value="kodekegiatan"
              outlined
              :source="store.kegiatans"
              :loading="store.loading"
            />
            <div>
              <app-btn
                label="Ambil Data"
                :disable="store.loading"
                :loading="store.loading"
                @click="ambilData()"
              />
            </div>
            <div>
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
          <template v-else-if="store.items.length === 0">
            <div class="row flex flex-center">
              <div class="kosong">
                <div>Data Belum Ada</div>
                <div>Silahkan Pilih Parameter</div>
              </div>
            </div>
          </template>

          <template v-else>
            <div class="row flex flex-center" id="printMe">
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
                    <th>Total Realisasi (Rp.)</th>
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
                      <div>{{ formattanpaRp(store.realisasipends?.totalRealisasi) }}</div>
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
                      <div>{{ formattanpaRp(store.realisasipends?.totalRealisasi) }}</div>
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
                        {{ formattanpaRp(item.RealisasiSemua) }}
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
                      {{ formattanpaRp(store.items[0]?.totalPagu) }}
                    </td>
                    <td class="text-right q-pl-sm q-pr-sm">
                      {{ formattanpaRp(store.items[0]?.totalRealisasiSebelumnya) }}
                    </td>
                    <td class="text-right q-pl-sm q-pr-sm">
                      {{ formattanpaRp(store.items[0]?.totalRealisasi) }}
                    </td>
                    <td class="text-right q-pl-sm q-pr-sm">
                      {{ formattanpaRp(store.items[0]?.RealisasiSemua) }}
                    </td>
                    <td class="text-right q-pl-sm q-pr-sm">
                      {{ formattanpaRp(store.items[0]?.selisih) }}
                    </td>
                    <td class="text-right q-pl-sm q-pr-sm">
                      {{ formattanpaRp(store.items[0]?.persen) }}
                    </td>
                  </tr>

                  <tr class="total text-bold">
                    <td class="text-right q-pl-sm q-pr-sm" colspan="2">
                      SURPLUS / (DEFISIT)
                    </td>
                    <td class="text-right q-pl-sm q-pr-sm">
                      {{ formattanpaRp(hitungPagu()) }}
                    </td>
                    <td class="text-right q-pl-sm q-pr-sm">
                      {{ formattanpaRp(hitungSebelumnya()) }}
                    </td>
                    <td class="text-right q-pl-sm q-pr-sm">
                      {{ formattanpaRp(hitungSekarang()) }}
                    </td>
                    <td class="text-right q-pl-sm q-pr-sm">
                      {{ formattanpaRp(hitungTotalRealisasi()) }}
                    </td>
                    <td class="text-right q-pl-sm q-pr-sm">
                      {{ formattanpaRp(hitungSelisih()) }}
                    </td>
                    <td class="text-right q-pl-sm q-pr-sm">
                      {{ formattanpaRp(HitungPersen()) }}
                    </td>
                  </tr>
                  <tr v-for="rek in store.pembiayaans" :key="rek">
                    <td class="text-left q-pl-sm q-pr-sm">
                      <div> {{ rek.kodeall3 }}  </div>
                    </td>
                    <td class="text-left q-pl-sm q-pr-sm">
                      <div> {{ rek.uraian }}  </div>
                    </td>
                    <td class="text-right q-pl-sm q-pr-sm">
                      <div>{{ formattanpaRp(0) }}</div>
                    </td>
                    <td class="text-right q-pl-sm q-pr-sm">
                      <div>{{ formattanpaRp(0) }}</div>
                    </td>
                    <td class="text-right q-pl-sm q-pr-sm">
                      <div>{{ formattanpaRp(0) }}</div>
                    </td>
                    <td class="text-right q-pl-sm q-pr-sm">
                      <div>{{ formattanpaRp(0) }}</div>
                    </td>
                    <td class="text-right q-pl-sm q-pr-sm">
                      <div> {{ formattanpaRp(0) }} </div>
                    </td>
                    <td class="text-right q-pl-sm q-pr-sm">
                      <div> {{ formattanpaRp(0) }} </div>
                    </td>
                  </tr>
                  <tr class="total text-bold">
                    <td class="text-right q-pl-sm q-pr-sm" colspan="2">
                      TOTAL PEMBIAYAAN
                    </td>
                    <td class="text-right q-pl-sm q-pr-sm">
                      <div>{{ formattanpaRp(0) }}</div>
                    </td>
                    <td class="text-right q-pl-sm q-pr-sm">
                      <div> {{ formattanpaRp(0) }} </div>
                    </td>
                    <td class="text-right q-pl-sm q-pr-sm">
                      <div> {{ formattanpaRp(0) }} </div>
                    </td>
                    <td class="text-right q-pl-sm q-pr-sm">
                      <div>{{ formattanpaRp(0) }}</div>
                    </td>
                    <td class="text-right q-pl-sm q-pr-sm">
                      <div> {{ formattanpaRp(0) }} </div>
                    </td>
                    <td class="text-right q-pl-sm q-pr-sm">
                      <div> {{ formattanpaRp(0) }} </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="ttd" v-for="data in store.penggunaAnggaran" :key="data">
              <div>
                Probolinggo {{ store.display.sekarang }}
              </div>
              <div class="text-bold">
                Pengguna Anggaran
              </div>
              <div style="padding-bottom: 40px" />
              <div class="underline text-bold">
                {{ data?.nama }}
                <div class="garis-bawah" style="text-decoration-line: underline;" />
              </div>
              <div>
                NIP. {{ data?.nip }}
              </div>
            </div>
            <div style="padding-bottom: 80px" />
          </template>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script setup>
// import { date } from 'quasar'
import { formattanpaRp } from 'src/modules/formatter'
import { useLaporanLraLaprealisasianggaranStore } from 'src/stores/siasik/laporan/lra/laprealisasianggaran'
import { onMounted, ref } from 'vue'
// import { ref } from 'vue'
const store = useLaporanLraLaprealisasianggaranStore()

store.realisasiPendapatan()
// store.getDataPendapatan()
onMounted(() => {
  store.getDataBidang()
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

const printed = ref(false)
const printObj = {
  id: 'printMe',
  popTitle: 'Laporan Realisasi Anggaran',
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
function hitungPagu () {
  const saldo = store.items
  const PaguBelanja = saldo[0]?.totalPagu
  const PaguPendapatan = store.realisasipends?.totalPaguPendapatan
  const NilaiPagu = PaguPendapatan - PaguBelanja
  // console.log('nilaipagu', NilaiPagu)
  return NilaiPagu
}
function hitungSebelumnya () {
  const saldo = store.items
  const PaguBelanja = saldo[0]?.totalRealisasiSebelumnya
  const PaguPendapatan = store.realisasipends?.totalSebelumnya
  const NilaiPagu = PaguPendapatan - PaguBelanja
  // console.log('nilaipagu', NilaiPagu)
  return NilaiPagu
}
function hitungSekarang () {
  const saldo = store.items
  const PaguBelanja = saldo[0]?.totalRealisasi
  const PaguPendapatan = store.realisasipends?.totalSekarang
  const NilaiPagu = PaguPendapatan - PaguBelanja
  // console.log('nilaipagu', NilaiPagu)
  return NilaiPagu
}
function hitungTotalRealisasi () {
  const saldo = store.items
  const PaguBelanja = saldo[0]?.RealisasiSemua
  const PaguPendapatan = store.realisasipends?.totalRealisasi
  const NilaiPagu = PaguPendapatan - PaguBelanja
  // console.log('nilaipagu', NilaiPagu)
  return NilaiPagu
}
function hitungSelisih () {
  const saldo = store.items
  const PaguBelanja = saldo[0]?.selisih
  const PaguPendapatan = store.realisasipends?.selisih
  const NilaiPagu = PaguPendapatan - PaguBelanja
  // console.log('nilaipagu', NilaiPagu)
  return NilaiPagu
}
function HitungPersen () {
  const saldo = store.items
  const PaguBelanja = saldo[0]?.persen
  const PaguPendapatan = store.realisasipends?.persen
  const NilaiPagu = PaguPendapatan - PaguBelanja
  // console.log('nilaipagu', NilaiPagu)
  return NilaiPagu
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
  font-size: 1em;
}
tbody tr td{
  height: 30px;
  max-height: 60px;
  border-collapse: collapse;
  border-radius: 6px;
  border: 1px solid rgb(163, 163, 163);
  font-size: 1em;
}
.total{
  background: #e6efff;
}
.ttd{
  position: relative;
  top: 30px;
  left: 60%;
  text-align: center;
  justify-content: center;
  width: 25%;
  height: 100px;
}
.underline{
  text-decoration-line: underline;
}
.kosong{
  position: relative;
  padding-top: 100px;
  text-align: center;
  justify-content: center;
  width: 25%;
  height: 270px;
  font-size: 1.5em;
}
</style>
