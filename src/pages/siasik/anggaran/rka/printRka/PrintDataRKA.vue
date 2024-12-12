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
          <div id="printMe" class="f-12 row justify-center">
            <q-card-section>
              <div class="col-auto">
                <div class="row b1 justify-between full-width full-height ">
                  <div class="row b justify-between full-width">
                    <div class="row b2" style="width:50%">
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
                      </div>
                    </div>

                    <div class="row" style="width:50%">
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

                  <div class="row b justify-between full-width full-height ">
                    <div class="row q-pl-sm q-py-xs" style="width:100%">
                      <div class="row q-pl-sm q-py-xs flex-center">
                        <div class="col-auto">
                          <div class="q-py-xs">
                            URUSAN PEMERINTAHAN
                          </div>
                          <div class="q-py-xs">
                            BIDANG URUSAN
                          </div>
                          <div class="q-py-xs">
                            ORGANISASI
                          </div>
                          <div class="q-py-xs">
                            SUB ORGANISASI
                          </div>
                          <div class="q-py-xs">
                            PROGRAM
                          </div>
                          <div class="q-py-xs">
                            KEGIATAN
                          </div>
                          <div class="q-py-xs">
                            KEGIATAN BLUD
                          </div>
                          <div class="q-py-xs">
                            WAKTU PELAKSANAAN
                          </div>
                        </div>
                        <div class="q-px-md" />
                        <div class="col-auto">
                          <div class="q-py-xs">
                            : 1
                          </div>
                          <div class="q-py-xs">
                            : 1.02
                          </div>
                          <div class="q-py-xs">
                            : 1.02.2.14.0.00.03.0000
                          </div>
                          <div class="q-py-xs">
                            : 1.02.2.14.0.00.03.0301
                          </div>
                          <div class="q-py-xs">
                            : 1.02.01
                          </div>
                          <div class="q-py-xs">
                            : 1.02.01.2.10
                          </div>
                          <div class="q-py-xs">
                            :
                          </div>
                          <div class="q-py-xs">
                            : Januari s/d Desember {{ store.reqs.tahun }}
                          </div>
                        </div>
                        <div class="q-px-md" />

                        <div class="col full-width">
                          <div class="q-py-xs">
                            URUSAN PEMERINTAHAN WAJIB YANG BERKAITAN DENGAN PELAYANAN DASAR
                          </div>
                          <div class="q-py-xs">
                            URUSAN PEMERINTAHAN BIDANG KESEHATAN
                          </div>
                          <div class="q-py-xs">
                            DINAS KESEHATAN, PENGENDALIAN PENDUDUK DAN KELUARGA BERENCANA
                          </div>
                          <div class="q-py-xs">
                            UOBK RSUD DOKTER MOHAMAD SALEH
                          </div>
                          <div class="q-py-xs">
                            PROGRAM PENUNJANG URUSAN PEMERINTAHAN DAERAH KABUPATEN/KOTA
                          </div>
                          <div class="q-py-xs">
                            Peningkatan Pelayanan BLUD
                          </div>
                          <div class="q-py-xs">
                            {{ store.kegiatanblud }}
                          </div>
                          <div class="text-white q-py-xs">
                            .
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="row b justify-between full-width full-height ">
                    <div class="row q-pl-sm q-py-xs" style="width:100%">
                      <div class="row q-pl-sm q-pt-xs flex-center">
                        <div class="col-auto">
                          <div>
                            Hendaklah mencairkan / memindahkan dari Rekening Nomor
                          </div>
                        </div>
                        <div class="q-px-md" />
                        <div class="col full-width">
                          <div>
                            : 0121161061
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="row q-pl-sm q-pb-xs" style="width:100%">
                      <div class="row q-pl-sm q-pb-xs flex-center">
                        <div class="col-auto">
                          <div class="q-py-xs">
                            Uang Sebesar
                          </div>
                          <div class="q-py-xs">
                            Terbilang
                          </div>
                        </div>
                        <div class="q-px-md" />
                        <div class="col full-width">
                          <div class="q-py-xs">
                            : xxx
                          </div>
                          <div class="q-py-xs">
                            : xxx
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="row b4 justify-between full-width full-height ">
                    <div class="row q-pl-sm q-py-xs" style="width:100%">
                      <div class="row q-pl-sm q-pb-xs flex-center">
                        <div class="col-auto">
                          <div class="q-py-xs">
                            Pihak Ketiga
                          </div>
                          <div class="q-py-xs">
                            Rekening Bank
                          </div>
                          <div class="q-py-xs">
                            No. Rekening
                          </div>
                          <div class="q-py-xs">
                            NPWP
                          </div>
                          <div class="q-py-xs">
                            Untuk Keperluan
                          </div>
                        </div>
                        <div class="q-px-sm" />
                        <div class="col full-width">
                          <div class="q-py-xs">
                            : xxx
                          </div>
                          <div class="q-py-xs">
                            : xxx
                          </div>
                          <div class="q-py-xs">
                            : xxx
                          </div>
                          <div class="q-py-xs">
                            : xxx
                          </div>
                          <div class="q-py-xs">
                            : xxx
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="row justify-between full-width full-height ">
                    <div class="row" style="width:100%">
                      <table class="items-center full-width">
                        <thead>
                          <tr>
                            <th>
                              No.
                            </th>
                            <th>
                              Kode Rekening
                            </th>
                            <th>
                              Uraian
                            </th>
                            <th>
                              Jumlah (Rp.)
                            </th>
                          </tr>
                        </thead>
                      </table>
                    </div>
                  </div>

                  <div class="row b4 justify-between full-width full-height ">
                    <div class="row q-pl-sm q-py-xs" style="width:100%">
                      <div class="row q-pl-sm q-pb-xs flex-center">
                        Potongan-potongan :
                      </div>
                    </div>
                  </div>

                  <div class="row justify-between full-width full-height ">
                    <div class="row" style="width:100%">
                      <table class="items-center full-width">
                        <thead>
                          <tr>
                            <th style="width: 40px">
                              No.
                            </th>
                            <th>
                              Uraian
                            </th>
                            <th>
                              Jumlah (Rp.)
                            </th>
                          </tr>
                        </thead>
                      </table>
                    </div>
                  </div>

                  <!-- <div class="row b4 justify-between full-width full-height ">
                  <div class="row q-pl-sm q-py-xs text-weight-bold" style="width:100%">
                    <template v-if="store.npddatasave.pajak != null">
                      <div>
                        Uang Sejumlah : {{ terbilangRupiah(store.npddatasave.totalbayar) }}
                      </div>
                    </template>
                    <template v-else>
                      <div>
                        Uang Sejumlah : {{ terbilangRupiah(store.npddatasave.total) }}
                      </div>
                    </template>
                  </div>
                </div> -->

                  <div class="row b justify-between full-width full-height ">
                    <div class="row q-pl-sm q-py-xs text-weight-bold" style="width:100%">
                      <div class="col full-width" />
                      <div class="col text-center">
                        <div class="q-py-xs">
                          Probolinggo {{ store.display.tahunsekarang }}
                        </div>
                        <div class="text-bold">
                          PEJABAT PENATAUSAHAAN KEUANGAN
                        </div>
                        <div style="padding-bottom: 40px" />
                        <div class="underline text-bold q-py-xs">
                          xxxxx
                          <!-- {{ pegawai.pegawais[2]?.nama }} -->
                          <div class="garis-bawah" style="text-decoration-line: underline;" />
                        </div>
                        <div>
                          xxxxx
                          <!-- NIP. {{ pegawai.pegawais[2]?.nip }} -->
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
  border-right-style: solid;
  border-left-style: solid;
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
  border-top-style: solid;
  border-width: 2px;
}
table, th, td {
  border-width: 2px;
  border-style: solid;
  border-collapse: collapse;
}
td {
  padding-left: 10px;
  padding-right: 10px;
}
</style>
