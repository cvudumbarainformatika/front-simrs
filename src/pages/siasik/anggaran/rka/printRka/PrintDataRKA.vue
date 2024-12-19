<template>
  <q-dialog persistent backdrop-filter="blur(4px)">
    <q-card style="min-width:80vw; max-width: 180vw; height: 600px">
      <q-layout view="lHh Lpr lFf" container class="shadow-2 rounded-borders">
        <q-header elevated>
          <q-bar class="bg-black text-white">
            <div>Cetak RKA</div>
            <q-space />

            <q-btn dense flat icon="icon-mat-close" v-close-popup>
              <q-tooltip>Close</q-tooltip>
            </q-btn>
          </q-bar>
        </q-header>
        <q-page-container>
          <div id="printMe" class="f-12 q-py-md row justify-center">
            <q-card-section>
              <div class="col-auto" style="font-size: 1.2em">
                <div class="row  justify-between full-width full-height ">
                  <div class="row b1 justify-between full-width">
                    <div class="row b2" style="width:70%">
                      <div class="row flex-center full-width">
                        <div class="col text-weight-bold full-width q-pa-sm b3 text-center">
                          <div>
                            RENCANA KERJA DAN ANGGARAN
                          </div>
                          <div>
                            SATUAN KERJA PERANGKAT DAERAH
                          </div>
                        </div>
                      </div>
                      <div class="row text-center full-width q-py-sm">
                        <div class="full-width">
                          UOBK RSUD DOKTER MOHAMAD SALEH
                        </div>
                        <div class="full-width">
                          TAHUN ANGGARAN {{ store.reqs.tahun }}
                        </div>
                      </div>
                    </div>

                    <div class="row" style="width:30%">
                      <div class="row text-weight-bold full-width text-center">
                        <div class="col flex-center q-pa-md full-width">
                          <div>
                            Formulir
                          </div>
                          <div>
                            RKA - RINCIAN BELANJA SKPD
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="row b4 justify-between full-width full-height ">
                    <div class="row q-pl-sm q-py-xs" style="width:100%">
                      <div class="row q-pl-sm q-py-xs flex-center">
                        <div class="col-auto" style="width:150px">
                          <div class="q-py-xs" style="height: 35px">
                            URUSAN PEMERINTAHAN
                          </div>
                          <div class="q-py-xs" style="height: 35px">
                            BIDANG URUSAN
                          </div>
                          <div class="q-py-xs" style="height: 35px">
                            PROGRAM
                          </div>
                          <div class="q-py-xs" style="height: 35px">
                            KEGIATAN
                          </div>
                          <div class="q-py-xs" style="height: 35px">
                            ORGANISASI
                          </div>
                          <div class="q-py-xs" style="height: 35px">
                            SUB ORGANISASI
                          </div>
                        </div>
                        <div class="q-px-md" />
                        <div class="col-auto">
                          <div class="q-py-xs" style="height: 35px">
                            : 1 -  URUSAN PEMERINTAHAN WAJIB YANG BERKAITAN DENGAN PELAYANAN DASAR
                          </div>
                          <div class="q-py-xs" style="height: 35px">
                            : 1.02 - URUSAN PEMERINTAHAN BIDANG KESEHATAN
                          </div>
                          <div class="q-py-xs" style="height: 35px">
                            : 1.02.01 - PROGRAM PENUNJANG URUSAN PEMERINTAHAN DAERAH KABUPATEN/KOTA
                          </div>
                          <div class="q-py-xs" style="height: 35px">
                            : 1.02.01.2.10 - PENINGKATAN PELAYANAN BLUD
                          </div>
                          <div class="q-py-xs" style="height: 35px">
                            : 1.02.2.14.0.00.03.0000 - DINAS KESEHATAN, PENGENDALIAN PENDUDUK DAN KELUARGA BERENCANA
                          </div>
                          <div class="q-py-xs" style="height: 35px">
                            : 1.02.2.14.0.00.03.0301 - UOBK RSUD DOKTER MOHAMAD SALEH
                          </div>
                        </div>
                        <div class="q-px-md" />
                      </div>
                    </div>
                  </div>

                  <div class="row b6 justify-between full-width full-height ">
                    <div class="row q-pl-sm q-py-xs" style="width:100%">
                      <div class="row q-pl-sm q-pb-xs flex-center full-width text-center">
                        Indikator Tolak Ukur Kinerja Kegiatan
                      </div>
                    </div>
                  </div>

                  <div class="row justify-between full-width full-height ">
                    <div class="row full-width" style="width:100%">
                      <table class="justify-center full-width">
                        <thead>
                          <tr style="height: 25px">
                            <th rowspan="2" style="width:210px">
                              Indikator
                            </th>
                            <th colspan="2">
                              Tolak Ukur Kerja
                            </th>
                          </tr>
                          <tr style="height: 25px">
                            <th>
                              Uraian
                            </th>
                            <th style="width:200px">
                              Target Kinerja
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr style="height: 25px">
                            <td>
                              Capaian Kegiatan
                            </td>
                            <td>
                              {{ store.capaiankegiatan }}
                            </td>
                            <td class="text-right">
                              {{ store.targetcapaian }}
                            </td>
                          </tr>
                          <tr style="height: 25px">
                            <td>
                              Masukan
                            </td>
                            <td>
                              {{ store.masukan }}
                            </td>
                            <td class="text-right">
                              {{ formatRpDouble(store.totalPagukegiatan[0].pagu) }}
                            </td>
                          </tr>
                          <tr style="height: 25px">
                            <td>
                              Keluaran
                            </td>
                            <td>
                              {{ store.keluaran }}
                            </td>
                            <td class="text-right">
                              {{ store.targetkeluaran }}
                            </td>
                          </tr>
                          <tr style="height: 25px">
                            <td>
                              Hasil
                            </td>
                            <td>
                              {{ store.hasil }}
                            </td>
                            <td class="text-right">
                              {{ store.targethasil }}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div class="row b4 justify-between full-width full-height ">
                    <div class="row q-pl-sm q-py-xs" style="width:100%">
                      <div class="row q-pl-sm q-py-xs flex-center">
                        <div class="col-auto" style="width:150px">
                          <div class="q-py-xs" style="height: 35px">
                            SUB KEGIATAN
                          </div>
                          <div class="q-py-xs" style="height: 35px">
                            KEGIATAN BLUD
                          </div>
                          <div class="q-py-xs" style="height: 35px">
                            SUMBER PENDANAAN
                          </div>
                          <div class="q-py-xs" style="height: 35px">
                            WAKTU PELAKSANAAN
                          </div>
                        </div>
                        <div class="q-px-md" />
                        <div class="col-auto">
                          <div class="q-py-xs" style="height: 35px">
                            : 1.02.01.2.10.0001 - Pelayanan dan Penunjang Pelayanan BLUD
                          </div>
                          <div class="q-py-xs" style="height: 35px">
                            : {{ store.kegiatanblud }}
                          </div>
                          <div class="q-py-xs" style="height: 35px">
                            : Pendapatan dari BLUD
                          </div>
                          <div class="q-py-xs" style="height: 35px">
                            : Januari s/d Desember {{ store.reqs.tahun }}
                          </div>
                        </div>
                        <div class="q-px-md" />
                      </div>
                    </div>
                  </div>

                  <div class="row justify-between full-width full-height ">
                    <div class="row full-width" style="width:100%">
                      <table class="justify-center full-width">
                        <thead>
                          <tr style="height:50px">
                            <th>KODE REKENING</th>
                            <th>URAIAN</th>
                            <th>VOLUME</th>
                            <th>SATUAN</th>
                            <th>HARGA</th>
                            <th>PAGU</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="it in store.datarka" :key="it">
                            <td>
                              <div class="text-bold q-py-sm" style="height: 50px">
                                {{ it.kode }}
                              </div>
                              <div class="q-pl-md q-py-sm" style="height: 45px" v-for="rinci in it?.rincian" :key="rinci">
                                {{ rinci.kode108 }}
                              </div>
                            </td>
                            <td>
                              <div class="text-bold q-py-sm" style="height: 50px">
                                {{ it.uraian }}
                              </div>
                              <div class="q-pl-md q-py-sm" style="height: 45px" v-for="rinci in it?.rincian" :key="rinci">
                                - {{ rinci.usulan }}
                              </div>
                            </td>
                            <td class="text-right">
                              <div class="q-py-md" style="height: 50px" />
                              <div class="q-pl-md q-py-sm" style="height: 45px" v-for="rinci in it?.rincian" :key="rinci">
                                {{ rinci.volume }}
                              </div>
                            </td>
                            <td>
                              <div class="q-py-md" style="height: 50px" />
                              <div class="q-pl-md q-py-sm" style="height: 45px" v-for="rinci in it?.rincian" :key="rinci">
                                {{ rinci.satuan }}
                              </div>
                            </td>
                            <td class="text-right">
                              <div class="q-py-md" style="height: 50px" />
                              <div class="q-pl-md q-py-sm" style="height: 45px" v-for="rinci in it?.rincian" :key="rinci">
                                {{ formattanpaRp(rinci.harga) }}
                              </div>
                            </td>
                            <td class="text-right">
                              <div class="text-bold q-py-md" style="height: 50px">
                                {{ formattanpaRp(it.pagu) }}
                              </div>
                              <div class="q-pl-md q-py-sm" style="height: 45px" v-for="rinci in it?.rincian" :key="rinci">
                                {{ formattanpaRp(rinci.pagu) }}
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div class="row b5 justify-between q-pt-xl q-pb-md full-width full-height ">
                    <div class="row q-pl-sm q-py-xs text-weight-bold" style="width:100%">
                      <div class="col full-width" />
                      <div class="col text-center" v-for="it in tt.ttd" :key="it">
                        <div class="q-py-xs">
                          Probolinggo {{ store.display.sekarang }}
                        </div>
                        <div class="text-bold">
                          Pengguna Anggaran
                        </div>
                        <div style="padding-bottom: 60px" />
                        <div class="underline text-bold q-py-xs">
                          {{ it.nama }}
                          <div class="garis-bawah" style="text-decoration-line: underline;" />
                        </div>
                        <div>
                          NIP. {{ it.nip }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </q-card-section>
          </div>
        </q-page-container>
        <q-footer elevated>
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
        </q-footer>
      </q-layout>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { useBukubesarStore } from 'src/stores/siasik/akuntansi/bukubesar/bukubesar'
import { onMounted, ref } from 'vue'

// eslint-disable-next-line no-unused-vars
import listData from '../inpage/ListDataRKA.vue'
import { useRkaStore } from 'src/stores/siasik/anggaran/storerka'
import { formatRpDouble, formattanpaRp } from 'src/modules/formatter'
// import listDataPsap from '../inpage/ListDataLoPsap.vue'
const tt = useBukubesarStore()
const store = useRkaStore()
onMounted(() => {
  tt.getTtd()
  // store.getDataBukubesar()
})
const printed = ref(false)
const printObj = {
  id: 'printMe',
  popTitle: 'Rencana Kerja dan Anggaran | SIASIK',
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
<style>
.b {
  border-bottom-style: solid;
  border-width: 2px;
}
.b1 {
  border-style: solid;
  border-width: 2px;
}
.b2 {
  border-right-style: solid;
  border-width: 2px;
}
.b3 {
  border-bottom-style: solid;
  border-width: 2px;
}
.b4 {
  border-right-style: solid;
  border-left-style: solid;
  border-width: 2px;
}
.b5 {
  border-right-style: solid;
  border-left-style: solid;
  border-bottom-style: solid;
  border-width: 2px;
}

.b6 {
  border-right-style: solid;
  border-left-style: solid;
  border-top-style: solid;
  border-width: 2px;
}
table, th, td {
  border-width: 2px;
  border-style: solid;
  border-collapse: collapse;
  border-right-style: solid;
  border-left-style: solid;
}
td {
  padding-left: 10px;
  padding-right: 10px;
}
</style>
