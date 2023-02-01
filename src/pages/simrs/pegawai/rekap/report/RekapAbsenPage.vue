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
        <app-table
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
          :default-btn="false"
          :ada-tambah="false"
          :to-search="store.params.q"
          @set-order="store.setOder"
          @set-row="store.setPerPage"
          @goto="store.setPage"
          @search="store.enterSearch"
          @find="store.setSearch"
          @refresh="store.refreshTable"
        >
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
                style="min-width:200px"
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
                style="min-width:200px"
                @update:model-value="changeRuang"
              />
            </div>
          </template>
          <template #col-masuk>
            Masuk (jam)
          </template>
          <template #col-hari>
            Masuk (Hari)
          </template>
          <template #cell-default-img="{row}">
            <div class="row">
              <q-avatar
                size="40px"
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
          <template #cell-status="{row}">
            <q-badge
              v-if="getStatus(row)"
              outline
              color="primary"
              label="Valid"
            />
            <q-badge
              v-else
              outline
              color="negative"
              label="Belum Install Xenter"
            />
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
                {{ getMasuk(row) }}
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
              :color="hitungPercent(row) >= 1 ? 'primary'
                : hitungPercent(row) < 0.9 ? 'orange' : 'secondary'"
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
        </app-table>
      </q-card-section>
    </q-card>
    <div style="padding-bottom:180px;" />
  </div>
</template>

<script setup>
import { calcDate } from 'src/modules/formatter'
import { daysInMonth, bulans } from 'src/modules/datesme'
import { useReportAbsensiStore } from 'src/stores/simrs/pegawai/absensi/report/report.js'
import { computed, onMounted, ref } from 'vue'
const date = new Date()
const bulan = date.getMonth() + 1
const year = date.getFullYear()

const store = useReportAbsensiStore()
const flag = ref('all')
const ruang = ref('all')

// const bulanName = computed(() => bulans(bulan))

const lhb = computed(() => store.jumlahProta)

onMounted(() => {
  let mm = bulan.toString()
  if (mm.length === 1) {
    mm = `0${mm}`
  }
  const periode = `${year}-${'01'}`
  console.log(periode)

  store.autocomplete()
  store.prota(periode)
  store.setPeriode(periode)
})

console.log('prota', lhb)
console.log('bulans', bulans(bulan))
console.log('tahun', daysInMonth(bulan, year))
console.log('rumus', rumusTerkecil())

function getImage(kelamin, row) {
  if (row.foto === null || row.foto === '' || row.foto === 'undefined') {
    return kelamin === 'Perempuan'
      ? new URL('../../../../../assets/images/actress.svg', import.meta.url).href
      : new URL('../../../../../assets/images/user-avatar.svg', import.meta.url).href
  } else {
    return 'https://rsudmsaleh.probolinggokota.go.id/simpeg/foto/' + row.nip + '/' + row.foto
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
  const perwali = 38
  const perbulan = (perwali * (daysInMonth(bulan, year) - libur)) / 7
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
function getMasuk(row) {
  const ada = row.transaksi_absen.length
  if (ada > 0) {
    const data = row.transaksi_absen
    // const hitung = calcDate(data[0].updated_at, data[0].created_at, 'minutes') / 60
    let hitung = 0
    for (let i = 0; i < data.length; i++) {
      hitung += calcDate(data[i].updated_at, data[i].created_at, 'minutes') / 60
    }
    // data.reduce((a, b) => a + b, 0)
    return hitung.toFixed(1)
  }
  return ada
  // return 0
}
function getMasukHari(row) {
  const ada = row.transaksi_absen.length
  return ada
  // return 0
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
</script>
