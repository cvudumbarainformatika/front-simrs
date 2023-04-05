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
                <q-linear-progress
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
              {{ getKurang(row) }}
            </div>
          </template>

          <!-- rincian -->
          <template
            v-for="(num, i) in daysInMonth(currentMonth, tahun)"
            :key="i"
            #[getSlotRinci(num)]="{row}"
          >
            <div v-if="row.transaksi_absen.length > 0 ">
              <div class="columns flex-center items-center">
                <div>{{ getTransaksiAbsen(num, row.transaksi_absen, 'masuk') }}</div>
                <q-separator />
                <div :class="getTransaksiAbsen(num, row.transaksi_absen, 'pulang') === 'TAP'? 'text-negative':''">
                  {{ getTransaksiAbsen(num, row.transaksi_absen, 'pulang') }}
                </div>
              </div>
            </div>
            <div v-else-if="getIjinRinci(num, row) !==0">
              <div class="text-primary">
                {{ getIjinRinci(num, row) }}
              </div>
            </div>
            <div v-else>
              {{ getAlphaRinci(num, row) }}
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
  store.prota(periode)
  store.setPeriode(periode)
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
  const bulanX = currentMonth.value <= 9 ? '0' + currentMonth.value : (currentMonth.value).toString()
  const cellDate = num <= 9 ? tahun.value + '-' + bulanX + '-0' + num.toString() : tahun.value + '-' + bulanX + '-' + num.toString()
  // console.log('cellDate', cellDate)
  const alpha = row.alpha
  if (alpha.length > 0) {
    return alpha.filter(x => x.tanggal === cellDate).length > 0 ? 'A' : '-'
  }
  return '-'
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
  if (ada > 0) {
    const data = row.transaksi_absen
    let hitung = 0
    for (let i = 0; i < data.length; i++) {
      const kategoryMasuk = data[i].kategory ? data[i].kategory.masuk : '00:00:00'
      // const kategoryPulang = data[i].kategory.pulang

      // const tglPulangServer = dateDbFormat(data[i].updated_at)
      // const jamPulangServer = formatJam(data[i].updated_at)
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

// function calcDate(masuk, pulang) {
//   const date1 = new Date(masuk)
//   const date2 = new Date(pulang)

//   // Get the Timestamp
//   const date1timestamp = date1.getTime()
//   const date2timestamp = date2.getTime()

//   let calc

//   // Check which timestamp is greater
//   if (date1timestamp > date2timestamp) {
//     calc = new Date(date1timestamp - date2timestamp)
//   } else {
//     calc = new Date(date1timestamp - date2timestamp)
//   }

//   // Retrieve the date, month and year
//   const calcFormatTmp = calc.getDate() + '-' + (calc.getMonth() + 1) + '-' + calc.getFullYear()
//   // Convert to an array and store
//   const calcFormat = calcFormatTmp.split('-')

//   // Subtract each member of our array from the default date
//   const dayspassed = Number(Math.abs(calcFormat[0]) - 1)
//   const monthspassed = Number(Math.abs(calcFormat[1]) - 1)
//   const yearspassed = Number(Math.abs(calcFormat[2]) - 1970)

//   // Set up custom text
//   const yrsTxt = ['year', 'years']
//   const mnthsTxt = ['month', 'months']
//   const daysTxt = ['day', 'days']

//   // Convert to days and sum together
//   const totaldays = (yearspassed * 365) + (monthspassed * 30.417) + dayspassed

//   // display result with custom text
//   const result = ((yearspassed === 1) ? yearspassed + ' ' + yrsTxt[0] + ' ' : (yearspassed > 1)
//     ? yearspassed + ' ' + yrsTxt[1] + ' ' : '') +
//         ((monthspassed === 1) ? monthspassed + ' ' + mnthsTxt[0] : (monthspassed > 1)
//           ? monthspassed + ' ' + mnthsTxt[1] + ' ' : '') +
//         ((dayspassed === 1) ? dayspassed + ' ' + daysTxt[0] : (dayspassed > 1)
//           ? dayspassed + ' ' + daysTxt[1] : '')

//   console.log(totaldays)
//   console.log(result)
//   return result.trim()
// }

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
