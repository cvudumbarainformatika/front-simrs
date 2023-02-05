<template>
  <q-dialog
    persistent
    :maximized="maximizedToggle"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card class="">
      <q-bar class="bg-primary text-white">
        <q-space />

        <q-btn
          v-print="printObj"
          dense
          flat
          icon="icon-mat-print"
        >
          <q-tooltip class="bg-white text-primary">
            Print
          </q-tooltip>
        </q-btn>
        <q-btn
          v-close-popup
          dense
          flat
          icon="icon-mat-close"
        >
          <q-tooltip class="bg-white text-primary">
            Close
          </q-tooltip>
        </q-btn>
      </q-bar>
      <q-card-section class="q-pt-none">
        <div id="printTing">
          <div class="q-ma-md">
            <div class="column items-center">
              <div class="f-12 text-weight-bold">
                DATA REKAP ABSENSI KARYAWAN
              </div>
              <div class="f-12">
                UOBK RSUD MOHAMAD SALEH KOTA PROBOLINGGO
              </div>
              <div class="f-12 ">
                Periode Bulan <span class="text-weight-bold">{{ monthName }} {{ tahun }}</span> {{ store.ruanganPrint.length > 0? store.ruanganPrint[0].namaruang:'-' }}
              </div>
            </div>
          </div>
          <q-separator />
          <div class="app-table">
            <q-markup-table
              flat
              dense
              :wrap-cells="true"
            >
              <thead>
                <tr>
                  <th
                    v-for="(head, i) in store.columns"
                    :key="i"
                    class="text-left"
                  >
                    <div v-if="head === 'nama'">
                      Nama
                    </div>
                    <div
                      v-else-if="head === 'status'"
                      class="text-left"
                    >
                      Status
                    </div>
                    <div
                      v-else-if="head=== 'IJIN'"
                      class="text-right"
                    >
                      I
                    </div>
                    <div
                      v-else-if="head=== 'SAKIT'"
                      class="text-right"
                    >
                      S
                    </div>
                    <div
                      v-else-if="head=== 'DL'"
                      class="text-right"
                    >
                      DL
                    </div>
                    <div
                      v-else-if="head=== 'masuk'"
                      class="text-right"
                    >
                      Masuk (Jam)
                    </div>
                    <div
                      v-else-if="head=== 'hari'"
                      class="text-right"
                    >
                      Masuk (Hari)
                    </div>
                    <div
                      v-else-if="head=== 'kurang'"
                      class="text-right"
                    >
                      Rekap Keterlambatan
                    </div>
                    <div v-else>
                      {{ head }}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody v-if="loading">
                <tr>
                  <td :colspan="store.columns.length">
                    <div
                      class="flex column flex-center bg-loading-bg__table"
                      style="height:500px"
                    >
                      <div>
                        <q-spinner-cube
                          color="primary"
                          size="35px"
                        />
                      </div>
                      <div class="text-primary q-mt-sm">
                        harap bersabar, sedang mengumpulkan data pegawai ...
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
              <tbody v-else>
                <tr
                  v-for="(row, idx) in store.items"
                  :key="idx"
                >
                  <td
                    v-for="(col, index) in store.columns"
                    :key="index"
                    class="text-left"
                  >
                    <template v-if="!store.rincian">
                      <div v-if="col==='status'">
                        <div v-if="getStatus(row)">
                          <q-linear-progress
                            class="q-mt-xs"
                            rounded
                            size="16px"
                            :value="hitungPercent(row)"
                            :color="hitungPercent(row) > 0.99 ? 'primary'
                              : hitungPercent(row) <= 0.8 ? hitungPercent(row) <= 0.5 ? 'negative' : 'orange'
                                : 'secondary'"
                          >
                            <div class="absolute-full flex flex-center">
                              <q-badge
                                color="transparent"
                                :text-color="hitungPercent(row) > 0.99 ? 'white': 'dark'"
                              >
                                <div class="f-10">
                                  {{ (hitungPercent(row) * 100).toFixed(0) >= 100? 'complete': (hitungPercent(row) * 100).toFixed(0) + '%' }}
                                </div>
                              </q-badge>
                            </div>
                          </q-linear-progress>
                        </div>
                        <q-badge
                          v-else
                          outline
                          color="negative"
                        >
                          <div class="f-10">
                            Belum Install Xenter
                          </div>
                        </q-badge>
                      </div>
                      <div
                        v-else-if="col==='IJIN'"
                        class="text-right"
                      >
                        {{ getIjin(row, 'IJIN')===0? '-': getIjin(row, 'IJIN') }}
                      </div>
                      <div
                        v-else-if="col==='SAKIT'"
                        class="text-right"
                      >
                        {{ getIjin(row, 'SAKIT')===0? '-': getIjin(row, 'SAKIT') }}
                      </div>
                      <div
                        v-else-if="col==='DL'"
                        class="text-right"
                      >
                        {{ getIjin(row, 'DL')===0? '-': getIjin(row, 'DL') }}
                      </div>
                      <div
                        v-else-if="col==='masuk'"
                        class="text-right"
                      >
                        {{ getMasuk(row) }}
                      </div>
                      <div
                        v-else-if="col==='hari'"
                        class="text-right"
                      >
                        {{ getMasukHari(row) }} hari
                      </div>
                      <div v-else-if="col==='kurang'">
                        <div class="text-negative text-right">
                          {{ getKurang(row) }}
                        </div>
                      </div>
                      <div v-else>
                        {{ row[col] }}
                      </div>
                    </template>
                    <template
                      v-else
                    >
                      <div v-if="col==='nama'">
                        {{ row.nama }}
                      </div>
                      <div
                        v-for="num in daysInMonth"
                        :key="num"
                      >
                        <div v-if="col === getString(num)">
                          <div v-if="row.transaksi_absen.length > 0">
                            <div class="columns flex-center items-center">
                              <div>{{ getTransaksiAbsen(num, row.transaksi_absen, 'masuk') }}</div>
                              <q-separator />
                              <div :class="getTransaksiAbsen(num, row.transaksi_absen, 'pulang') === 'TAP'? 'text-negative':''">
                                {{ getTransaksiAbsen(num, row.transaksi_absen, 'pulang') }}
                              </div>
                            </div>
                          </div>
                          <div v-else>
                            -
                          </div>
                        </div>
                      </div>
                    </template>
                  </td>
                </tr>
              </tbody>
              <!-- <tbody v-else-if="store.rincian && !loading">
                <tr
                  v-for="(row, idx) in store.items"
                  :key="idx"
                >
                  <td
                    v-for="(col, index) in store.columns"
                    :key="index"
                    class="text-left"
                  >
                    <div v-if="col==='nama'">
                      {{ row[col] }}
                    </div>
                  </td>
                </tr>
              </tbody> -->
            </q-markup-table>
          </div>
        </div>
        <div style="padding-bottom:180px;" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useReportAbsensiStore } from 'src/stores/simrs/pegawai/absensi/report/report'
import { ref, onMounted } from 'vue'
const maximizedToggle = ref(true)

defineProps({
  loading: {
    type: Boolean,
    default: false
  },
  daysInMonth: {
    type: Number,
    default: 30
  },
  currentMonth: {
    type: Number,
    default: 0
  },
  tahun: {
    type: String,
    default: '2023'
  },
  monthName: {
    type: String,
    default: 'Janurari'
  },
  getStatus: {
    type: Function,
    default() {
      return false
    }
  },
  hitungPercent: {
    type: Function,
    default() {
      return 0
    }
  },
  getIjin: {
    type: Function,
    default(y, x) {
      return '-'
    }
  },
  getMasuk: {
    type: Function,
    default() {
      return 0
    }
  },
  getMasukHari: {
    type: Function,
    default() {
      return 0
    }
  },
  getKurang: {
    type: Function,
    default() {
      return ''
    }
  },
  getTransaksiAbsen: {
    type: Function,
    default(x, y, z) {
      return ''
    }
  }

})

const store = useReportAbsensiStore()

const printObj = {
  id: 'printTing',
  popTitle: 'print Absensi',
  // extraCss: 'https://cdn.bootcdn.net/ajax/libs/animate.css/4.1.1/animate.compat.css, https://cdn.bootcdn.net/ajax/libs/hover.css/2.3.1/css/hover-min.css',
  // extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>',
  beforeOpenCallback(vue) {
    // printed.value = true
    console.log('wait...')
  },
  openCallback (vue) {
    console.log('opened')
  },
  closeCallback (vue) {
    // printed.value = false
    // changePeriode()
    console.log('closePrint')
  }
}

onMounted(() => {
  // printing()
})

function getString(num) {
  return num <= 9 ? '0' + num : num.toString()
}
</script>

<style lang="scss" scoped>
$fs : 9px;
.app-table {
  width: 100%; /* print width */
  font-size:$fs;
  .q-table {
    /* max-width: 100% !important; */
  }
  .q-table td {
    padding-left: 10px;
    font-size: $fs;
  }
  .q-table th {
    padding-left: 10px;
    font-size: $fs;
  }
}

@media print {
  .app-table {
    width: 100%; /* print width */
    font-size:$fs;

    .q-table {
        max-width: 100% !important;
      }
    .q-table td {
      padding: 2px;
      font-size: $fs;
       white-space: normal !important;
        word-wrap: normal !important;
        hyphens: manual;
    }
    .q-table th {
      padding:2px;
      font-size:$fs;
      white-space: normal !important;
        word-wrap: normal !important;
        hyphens: manual;
    }

    .screenwide{
      max-width: 100% !important;
    }
  }
}

</style>
