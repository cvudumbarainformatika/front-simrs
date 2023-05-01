<template>
  <div class="q-px-lg q-pt-md">
    <q-card>
      <q-card-section>
        <div class="full-width row justify-between items-center content-between">
          <div class="bg-white col-grow">
            <div
              class="flex flex-column items-center flex-center"
            >
              <div class="col text-left">
                <div class="f-14 text-weight-bold">
                  Rekap Absensi Pegawai
                </div>
                <div class="title-desc">
                  Halaman Rekap Absensi per bulan
                </div>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <div class="row items-center q-mb-md">
          <q-btn
            outline
            round
            color="primary"
            dense
            icon="icon-mat-chevron_left"
            size="sm"
            @click="prevMonth()"
          />
          <div class="q-mx-sm">
            {{ bulanName }} {{ tahun }}
          </div>
          <q-btn
            outline
            round
            color="primary"
            dense
            icon="icon-mat-chevron_right"
            size="sm"
            @click="nextMonth()"
          />
          <div class="q-ml-md">
            <q-toggle
              v-model="store.rincian"
              label="Laporan Rinci"
            />
          </div>
        </div>
        <app-table
          id="printMe"
          title="Rekap Absens Pegawai"
          :columns="store.columns"
          :column-hide="store.columnHide"
          :items="store.items"
          :meta="store.meta"
          :per-page="store.params.per_page"
          :order-by="store.params.order_by"
          :sort="store.params.sort"
          :loading="store.loading"
          row-image="foto"
          :text-size="11"
          :default-btn="false"
          :ada-tambah="false"
          :to-search="store.params.q"
          @set-row="store.setPerPage"
          @goto="store.setPage"
          @search="store.enterSearch"
          @find="store.setSearch"
          @refresh="store.refreshTable"
        >
          <template #header-for-print>
            <div class="column items-center q-my-md">
              <div class="f-12 text-weight-bold">
                DATA REKAP ABSENSI KARYAWAN
              </div>
              <div class="f-12">
                UOBK RSUD MOHAMAD SALEH KOTA PROBOLINGGO
              </div>
              <div class="f-12">
                Periode Bulan {{ bulanName }} {{ tahun }} {{ store.ruanganPrint.length > 0? store.ruanganPrint[0].namaruang:'-' }}
              </div>
            </div>
          </template>
          <template #header-left-after-search>
            <div class="q-ml-sm">
              <q-select
                v-model="flag"
                dense
                outlined
                option-value="kode_jenis"
                option-label="jenispegawai"
                behavior="menu"
                map-options
                emit-value
                :options="store.jenis_pegawai"
                label="Jenis Pegawai"
                style="min-width:150px"
                @update:model-value="changeFlag"
              />
            </div>
            <div class="q-ml-sm">
              <q-select
                v-model="ruang"
                dense
                outlined
                option-value="koderuangan"
                option-label="namaruang"
                behavior="menu"
                map-options
                emit-value
                :options="store.ruangan"
                label="Ruangan"
                style="min-width:150px"
                @update:model-value="changeRuang"
              />
            </div>
          </template>
          <template #header-right-before>
            <q-btn
              class="q-mr-sm"
              unelevated
              color="negative"
              round
              size="sm"
              icon="icon-mat-print"
              @click="printMode()"
            >
              <q-tooltip
                class="primary"
                :offset="[10, 10]"
              >
                Print model 1
              </q-tooltip>
            </q-btn>
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
                Print model 2
              </q-tooltip>
            </q-btn>
          </template>
          <template
            #col-status
          >
            <div class="">
              Status
            </div>
          </template>
          <template #col-IJIN>
            I
          </template>
          <template #col-SAKIT>
            S
          </template>
          <template #col-masuk>
            Masuk (jam)
          </template>
          <template #col-hari>
            Masuk (Hari)
          </template>
          <template #col-kurang>
            Rekap keterlambatan
          </template>
          <template #cell-default-img="{row}">
            <div class="row">
              <q-avatar
                size="30px"
                class="cursor-pointer"
                :class="row.kelamin ==='Perempuan'?'bg-secondary':'bg-orange'"
              >
                <img :src="getImage(row.kelamin, row)">
                <q-menu>
                  <div class="row no-wrap q-pa-md">
                    <div class="column items-center">
                      <div class="text-h6 q-mb-md">
                        Detail Pegawai
                      </div>
                      <q-avatar size="100px">
                        <img
                          :ratio="1"
                          fit="cover"
                          :src="getImage(row.kelamin, row)"
                        >
                      </q-avatar>

                      <div class=" q-mt-md">
                        {{ row.nama }}
                      </div>
                      <div class="text-primary">
                        {{ row.relasi_jabatan? row.relasi_jabatan.jabatan:'-' }}
                      </div>
                      <div class="">
                        {{ row.jenis_pegawai? `(${row.jenis_pegawai.keterangan})`:'-' }}
                      </div>
                      <div class="text-grey">
                        {{ row.ruangan? row.ruangan.namaruang:'-' }}
                      </div>

                      <!-- <q-btn
                        v-close-popup
                        color="primary"
                        label="Logout"
                        push
                        size="sm"
                      /> -->
                    </div>

                    <q-separator
                      vertical
                      inset
                      class="q-mx-lg"
                    />

                    <div class="column">
                      <div class=" q-mt-md">
                        Alamat : {{ row.alamat_detil }}
                      </div>
                      <div class="">
                        {{ row.kelurahan }} {{ row.kecamatan }} {{ row.kota }}
                      </div>
                      <div class="">
                        Email : {{ row.email }}
                      </div>
                      <div class="">
                        Jns : {{ row.jenispegawai }}
                      </div>
                    </div>
                  </div>
                </q-menu>
              </q-avatar>
            </div>
          </template>
          <template #cell-nama="{row}">
            <div class="text-xs">
              {{ row.nama }}
              <!-- <q-linear-progress
                class="q-mt-xs"
                rounded
                size="xl"
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
              </q-linear-progress> -->
            </div>
          </template>
          <template #cell-status="{row}">
            <div class="">
              <div v-if="getStatus(row)">
                <!-- <q-linear-progress
                  class="q-mt-xs"
                  rounded
                  size="20px"
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
                </q-linear-progress> -->
                <q-badge
                  v-if="getStatus(row)"
                  outline
                  color="primary"
                >
                  <div class="f-10">
                    Installed
                  </div>
                </q-badge>
              </div>
              <q-badge
                v-else
                outline
                color="negative"
              >
                <div class="f-10">
                  Blm Install
                </div>
              </q-badge>
            </div>
          </template>
          <template #cell-IJIN="{row}">
            <div class="">
              {{ getIjin(row, 'IJIN')===0? '-': getIjin(row, 'IJIN') }}
            </div>
          </template>
          <template #cell-SAKIT="{row}">
            <div class="">
              {{ getIjin(row, 'SAKIT')===0? '-': getIjin(row, 'SAKIT') }}
            </div>
          </template>
          <template #cell-DL="{row}">
            <div class="">
              {{ getIjin(row, 'DL')===0? '-': getIjin(row, 'DL') }}
            </div>
          </template>
          <template #cell-DSPEN="{row}">
            <div class="">
              {{ getIjin(row, 'DISPEN')===0? '-': getIjin(row, 'DISPEN') }}
            </div>
          </template>
          <template #cell-CUTI="{row}">
            <div class="">
              {{ getIjin(row, 'CUTI')===0? '-': getIjin(row, 'CUTI') }}
            </div>
          </template>
          <template #cell-A="{row}">
            <div class="">
              {{ getAlpha(row)===0? '-': getAlpha(row) }}
            </div>
          </template>

          <template #cell-masuk="{row}">
            <div style="max-width:50px">
              <div class="text-xs text-dark">
                {{ toHoursAndMinutes(getMasuk(row) * 60) }}
              </div>
            </div>
          </template>
          <template #cell-hari="{row}">
            <div style="max-width:50px">
              <div class="text-xs text-dark">
                {{ getMasukHari(row) }} hari
              </div>
            </div>
          </template>
          <template #cell-percent="{row}">
            <q-linear-progress
              size="25px"
              :value="hitungPercent(row)"
              :color="hitungPercent(row) > 0.99 ? 'primary'
                : hitungPercent(row) < 0.99 ? hitungPercent(row) < 0.5 ? 'negative' : 'orange'
                  : 'secondary'"
            >
              <div class="absolute-full flex flex-center">
                <q-badge
                  color="white"
                  text-color="accent"
                  :label="`${(hitungPercent(row) * 100).toFixed(0)}%`"
                />
              </div>
            </q-linear-progress>
          </template>
          <template #cell-kurang="{row}">
            <div class="text-negative">
              <!-- {{ getKurang(row) }} -  -->
              <!-- {{ getRekapTerlambat(row) }} -->
              {{ getRekapTerlambatMinute(getRekapTerlambat(row)) }} => {{ getRekapTerlambatPercent(getRekapTerlambat(row)) }}%
            </div>
          </template>

          <!-- rincian -->
          <template
            v-for="(num, i) in daysInMonth(currentMonth, tahun)"
            :key="i"
            #[getSlotRinci(num)]="{row}"
          >
            <!-- <div v-if="row.transaksi_absen.length > 0 && !getIjinRinci(num, row) && !getAlphaRinci(num, row)">
              <div
                class="columns flex-center items-center f-10"
              >
                <div>{{ getTransaksiAbsen(num, row.transaksi_absen, 'masuk') }}</div>
                <div :class="getTransaksiAbsen(num, row.transaksi_absen, 'pulang') === 'TAP'? 'text-negative':''">
                  {{ getTransaksiAbsen(num, row.transaksi_absen, 'pulang') }}
                </div>
              </div>
            </div>
            <div v-else-if="row.transaksi_absen.length > 0 && getIjinRinci(num, row)">
              <div class="text-orange">
                {{ getIjinRinci(num, row) }}
              </div>
            </div>
            <div
              v-else
              class="text-negative"
            >
              {{ getAlphaRinci(num, row) }}
            </div> -->
            <div v-if="getTransaksiAbsens(num, row) === 'MSK'">
              <div class="f-10">
                {{ getTransaksiAbsen(num, row.transaksi_absen, 'masuk') }}
              </div>
              <div :class="getTransaksiAbsen(num, row.transaksi_absen, 'pulang') === 'TAP'? 'text-negative f-10':'f-10'">
                {{ getTransaksiAbsen(num, row.transaksi_absen, 'pulang') }}
              </div>
            </div>
            <div
              v-else
              :class="getTransaksiAbsens(num, row) === 'A'? 'text-negative':
                getTransaksiAbsens(num, row) === 'CB'? 'text-primary':'text-green'
              "
            >
              {{ getTransaksiAbsens(num, row) }}
            </div>
          </template>
        </app-table>
      </q-card-section>
    </q-card>
    <div style="padding-bottom:180px;" />

    <!-- dialog print -->
    <print-dialog
      v-model="openDialog"
      :loading="store.loadingDialog"
      :current-month="currentMonth"
      :tahun="tahun.toString()"
      :month-name="bulanName"
      :get-status="(val)=>getStatus(val)"
      :hitung-percent="(val)=>hitungPercent(val)"
      :get-ijin="(val,x)=>getIjin(val,x)"
      :get-masuk="(val)=>toHoursAndMinutes(getMasuk(val) * 60)"
      :get-masuk-hari="(val)=>getMasukHari(val)"
      :get-kurang="(val)=>getKurang(val)"
      :days-in-month="daysInMonth(currentMonth, tahun)"
      :get-transaksi-absen="(x,y,z) => getTransaksiAbsen(x,y,z)"
    />
  </div>
</template>

<script setup>
import { calcDate, dateDbFormat, formatJam, jamTnpDetik } from 'src/modules/formatter'
import { daysInMonth, bulans } from 'src/modules/datesme'
import { useReportAbsensiStore } from 'src/stores/simrs/pegawai/absensi/report/report.js'
import { computed, onMounted, ref, watch } from 'vue'

import PrintDialog from './PrintDialog.vue'
// import IsiCellRinci from './IsiCellRinci.vue'

const date = new Date()
const bulan = date.getMonth() + 1
// const year = date.getFullYear()

const store = useReportAbsensiStore()
const flag = ref('all')
const ruang = ref('all')
const openDialog = ref(false)
const refPrint = ref(null)

const currentMonth = ref(date.getMonth() + 1)
const tahun = ref(date.getFullYear())
const perwali = ref(38)
const printed = ref(false)

const bulanName = computed(() => bulans(currentMonth.value))

const lhb = computed(() => store.jumlahProta)

const changePeriode = () => {
  let mm = currentMonth.value.toString()
  if (mm.length === 1) {
    mm = `0${mm}`
  }
  const periode = `${tahun.value}-${mm}`
  console.log('periode', periode)
  store.setPeriode(periode)
  store.prota(periode)
}

onMounted(() => {
  store.autocomplete()
  changePeriode()

  console.log('ref', refPrint.value)
})

console.log('prota', lhb.value)
console.log('currentMoth', currentMonth.value)
console.log('bulans', bulans(bulan))
console.log('tahun', daysInMonth(currentMonth.value, tahun.value))
console.log('rumus', rumusTerkecil())

function nextMonth() {
  const month = currentMonth.value
  if (month >= 12) {
    currentMonth.value = 1
    tahun.value = tahun.value + 1
  } else {
    currentMonth.value = month + 1
  }
  console.log('next', currentMonth.value)
  changePeriode()
  const obj = store.rincian
  obj ? store.setColumns(daysInMonth(currentMonth.value, tahun.value)) : store.setColumns('default')
}
function prevMonth() {
  const month = currentMonth.value
  if (month <= 1) {
    currentMonth.value = 12
    tahun.value = tahun.value - 1
  } else {
    currentMonth.value = month - 1
  }
  console.log('next', currentMonth.value)
  changePeriode()
  const obj = store.rincian
  obj ? store.setColumns(daysInMonth(currentMonth.value, tahun.value)) : store.setColumns('default')
}

function getSlotRinci(num) {
  return num <= 9 ? 'cell-0' + num.toString() : 'cell-' + num.toString()
}

function getTransaksiAbsen(num, data, jns) {
  const bulanX = currentMonth.value <= 9 ? '0' + currentMonth.value : (currentMonth.value).toString()
  const cellDate = num <= 9 ? tahun.value + '-' + bulanX + '-0' + num.toString() : tahun.value + '-' + bulanX + '-' + num.toString()
  const trans = data.filter(x => x.tanggal === cellDate)
  if (trans.length > 0) {
    if (jns === 'masuk') {
      return jamTnpDetik(trans[0].created_at)
    } else {
      return jamTnpDetik(trans[0].updated_at) === jamTnpDetik(trans[0].created_at) ? 'TAP' : jamTnpDetik(trans[0].updated_at)
    }
  }
  return ''
}
function getTransaksiAbsens(num, data) {
  const bulanX = currentMonth.value <= 9 ? '0' + currentMonth.value : (currentMonth.value).toString()
  const cellDate = num <= 9 ? tahun.value + '-' + bulanX + '-0' + num.toString() : tahun.value + '-' + bulanX + '-' + num.toString()
  const trans = data.transaksi_absen.filter(x => x.tanggal === cellDate)
  const libur = store.protas.filter(x => x.tgl_libur === cellDate)
  const ijin = getIjinRinci(num, data)
  const alpha = getAlphaRinci(num, data)
  // console.log('trans', trans)
  console.log('libur', libur)
  if (trans.length && !ijin) {
    return 'MSK'
  } else {
    if (ijin) {
      return ijin
    } else if (libur.length) {
      return 'CB'
    } else if (alpha) {
      return 'A'
    }
    return 'L'
  }
}

function getAlpha(row) {
  console.log('alpha', row)
  const days = daysInMonth(currentMonth.value, tahun.value)
  const bulanX = currentMonth.value <= 9 ? '0' + currentMonth.value : (currentMonth.value).toString()
  // const ijin = []
  const absen = []

  // for (let x = 1; x <= days; x++) {
  //   absen.push(x)
  // }

  for (let i = 0; i < days; i++) {
    const cellDate = i <= 9 ? tahun.value + '-' + bulanX + '-0' + (i + 1).toString() : tahun.value + '-' + bulanX + '-' + (i + 1).toString()
    absen.push(i)
    const trans = row.transaksi_absen.filter(x => x.tanggal === cellDate)
    const libur = store.protas.filter(x => x.tgl_libur === cellDate)
    const ijin = getIjinRinci(i + 1, row)
    const alpha = getAlphaRinci(i + 1, row)

    if (trans.length && !ijin) {
      absen[i] = 'M'
    } else {
      if (ijin) {
        absen[i] = 'I'
      } else if (libur.length) {
        absen[i] = 'C'
      } else if (alpha) {
        absen[i] = 'A'
      } else {
        absen[i] = 'L'
      }
    }
  }

  // return absen
  return absen.filter(x => x === 'A').length
}
function getImage(kelamin, row) {
  if (row.foto === null || row.foto === '' || row.foto === 'undefined') {
    return kelamin === 'Perempuan'
      ? new URL('../../../../../assets/images/actress.svg', import.meta.url).href
      : new URL('../../../../../assets/images/user-avatar.svg', import.meta.url).href
  } else {
    return 'http://192.168.100.100/simpeg/foto/' + row.nip + '/' + row.foto
  }
}

const changeFlag = (val) => {
  store.filterByFlag(val)
}
const changeRuang = (val) => {
  store.filterByRuang(val)
}

function hitungPercent(row) {
  const hitung = (getMasuk(row) / rumusTerkecil(getIjin(row)))
  return hitung
}

function rumusTerkecil(libur) {
  const extra = libur + lhb.value
  const perbulan = (perwali.value * (daysInMonth(currentMonth.value, tahun.value) - extra)) / 7
  return perbulan.toFixed(1)
}

function getStatus(row) {
  return !!row.user
}

function getIjin(row, fx) {
  const user = row.user
  if (user) {
    const ada = user.libur.length
    if (ada > 0) {
      const libur = user.libur
      if (fx) {
        return libur.filter(x => x.flag === fx).length
      }
      return libur.length
    }
    return 0
  }

  return 0
}

function getAlphaRinci(num, row) {
  // console.log('alpha', num)
  const bulanX = currentMonth.value <= 9 ? '0' + currentMonth.value : (currentMonth.value).toString()
  const cellDate = num <= 9 ? tahun.value + '-' + bulanX + '-0' + num.toString() : tahun.value + '-' + bulanX + '-' + num.toString()
  const alpha = row.alpha
  if (alpha.length > 0) {
    return alpha.filter(x => x.tanggal === cellDate).length > 0 ? 'A' : 0
  }
  return 0
}

function getIjinRinci(num, row) {
  const bulanX = currentMonth.value <= 9 ? '0' + currentMonth.value : (currentMonth.value).toString()
  const cellDate = num <= 9 ? tahun.value + '-' + bulanX + '-0' + num.toString() : tahun.value + '-' + bulanX + '-' + num.toString()
  // console.log('cellDate', cellDate)
  const user = row.user
  if (user) {
    const ada = user.libur.length
    if (ada > 0) {
      const libur = user.libur
      return libur.filter(x => x.tanggal === cellDate).map(y => y.flag)[0]
    }
    return 0
  }

  return 0
}
function getMasuk(row) {
  const ada = row.transaksi_absen.length
  if (ada > 0) {
    const data = row.transaksi_absen
    let hitung = 0.0
    for (let i = 0; i < data.length; i++) {
      const kategoryMasuk = data[i].kategory ? data[i].kategory.masuk : '00:00:00'
      const kategoryPulang = data[i].kategory ? data[i].kategory.pulang : '00:00:00'

      const tglPulangServer = dateDbFormat(data[i].updated_at)
      const jamPulangServer = formatJam(data[i].updated_at)
      const jamMasukServer = formatJam(data[i].created_at)
      // const jamMasukServer = formatJam(data[i].masuk)
      const tglMasukServer = dateDbFormat(data[i].created_at)

      const waktuMasuk = new Date(tglMasukServer + ' ' + jamMasukServer) < new Date(tglMasukServer + ' ' + kategoryMasuk) ? tglMasukServer + ' ' + kategoryMasuk : tglMasukServer + ' ' + jamMasukServer
      const waktuPulang = new Date(tglPulangServer + ' ' + jamPulangServer) > new Date(tglPulangServer + ' ' + kategoryPulang) ? tglPulangServer + ' ' + kategoryPulang : tglPulangServer + ' ' + jamPulangServer
      if (data[i].pulang === null || data[i].pulang === '') {
        hitung += 0
      } else {
        hitung += calcDate(waktuPulang, waktuMasuk, 'minutes') / 60
      }
    }
    return hitung.toFixed(1)
  }
  return 0
}

function getKurang(row) {
  const ada = row.transaksi_absen.length
  if (ada) {
    const data = row.transaksi_absen
    let hitung = 0
    for (let i = 0; i < data.length; i++) {
      const kategoryMasuk = data[i].kategory ? data[i].kategory.masuk : '00:00:00'
      const jamMasukServer = formatJam(data[i].created_at)
      const tglMasukServer = dateDbFormat(data[i].created_at)

      const terlambat = new Date(tglMasukServer + ' ' + jamMasukServer) > new Date(tglMasukServer + ' ' + kategoryMasuk)

      if (terlambat) {
        hitung += calcDate(new Date(tglMasukServer + ' ' + jamMasukServer), new Date(tglMasukServer + ' ' + kategoryMasuk), 'minutes')
      } else {
        hitung += 0
      }
    }

    return toHoursAndMinutes(hitung)
  }
  const x = rumusTerkecil(getIjin(row)) * 60
  return toHoursAndMinutes(x)
}

function getRekapTerlambat(row) {
  // console.log('row', row)
  const days = daysInMonth(currentMonth.value, tahun.value)
  const bulanX = currentMonth.value <= 9 ? '0' + currentMonth.value : (currentMonth.value).toString()
  const ijin = []
  const absen = []
  for (let i = 1; i <= days; i++) {
    const cellDate = i <= 9 ? tahun.value + '-' + bulanX + '-0' + i.toString() : tahun.value + '-' + bulanX + '-' + i.toString()

    // INI UNTUK IJIN
    const user = row.user
    if (user) {
      const trans = row.transaksi_absen.filter(w => w.tanggal === cellDate)
      if (user.libur.length) {
        // const libur = user.libur.filter(x => x.tanggal === cellDate).map(y => y.flag)[0]
        const libur = user.libur.filter(x => x.tanggal === cellDate)
        ijin.push(libur.length ? 0 : trans[0] ? hitungTelat(trans[0]) : 0)
      } else {
        ijin.push(trans[0] ? hitungTelat(trans[0]) : 0)
      }
    } else {
      const trans = row.transaksi_absen.filter(w => w.tanggal === cellDate)
      ijin.push(trans[0] ? hitungTelat(trans[0]) : 0)
    }

    // ini untuk yang absen
    const trans = row.transaksi_absen.filter(w => w.tanggal === cellDate)[0]
    absen.push(trans || 0)
    // const trans = row.transaksi_absen.filter(w => w.tanggal === cellDate)
    // absen.push(trans.length || 0)
  }

  // return toHoursAndMinutes(ijin.reduce((x, y) => parseInt(x + y)))
  // return ijin
  return ijin.reduce((x, y) => parseInt(x + y))
}

function getRekapTerlambatPercent(e) {
  if (e > 0 && e <= 60) {
    return 5
  } else if (e > 60 && e <= 120) {
    return 10
  } else if (e >= 121) {
    return 20
  } else {
    return 0
  }
}
function getRekapTerlambatMinute(x) {
  return toHoursAndMinutes(x)
}

function hitungTelat(x) {
  const kategoryMasuk = x.kategory ? x.kategory.masuk : '00:00:00'
  const jamMasukServer = formatJam(x.created_at)
  const tglMasukServer = dateDbFormat(x.created_at)

  const terlambat = new Date(tglMasukServer + ' ' + jamMasukServer) > new Date(tglMasukServer + ' ' + kategoryMasuk)
  let hitung = 0

  if (terlambat) {
    hitung = calcDate(new Date(tglMasukServer + ' ' + jamMasukServer), new Date(tglMasukServer + ' ' + kategoryMasuk), 'minutes')
  }
  return hitung
}

function toHoursAndMinutes(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  return `${hours > 0 ? ` ${hours} jam` : ''}
        ${minutes > 0 ? ` ${minutes.toFixed(0)} mnt` : ''}`
}

function getMasukHari(row) {
  const ada = row.transaksi_absen.length
  return ada
}

const printObj = {
  id: 'printMe',
  popTitle: 'print Absensi',
  // extraCss: 'https://cdn.bootcdn.net/ajax/libs/animate.css/4.1.1/animate.compat.css, https://cdn.bootcdn.net/ajax/libs/hover.css/2.3.1/css/hover-min.css',
  // extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>',
  beforeOpenCallback(vue) {
    printed.value = true
    console.log('wait...')
  },
  openCallback (vue) {
    console.log('opened')
  },
  closeCallback (vue) {
    printed.value = false
    changePeriode()
    console.log('closePrint')
  }
}

function printMode() {
  // openDialog = !openDialog
  // store.getDataPrint()
  openDialog.value = !openDialog.value
}

watch(() => store.rincian, (obj) => {
  obj ? store.setColumns(daysInMonth(currentMonth.value, tahun.value)) : store.setColumns('default')
  console.log('watch', store.columns)
}, { deep: true })
</script>

<style lang="scss" scoped>
</style>
