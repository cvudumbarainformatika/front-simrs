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
                        <img :src="getImage(row.kelamin, row)">
                      </q-avatar>

                      <div class=" q-mt-md">
                        {{ row.nama }}
                      </div>
                      <div class="text-grey">
                        {{ row.relasi_jabatan? row.relasi_jabatan.jabatan:'-' }}
                      </div>
                      <div class="">
                        {{ row.jenis_pegawai? `(${row.jenis_pegawai.keterangan})`:'-' }}
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

                    <div class="column items-center">
                      marine iji
                    </div>
                  </div>
                </q-menu>
              </q-avatar>
            </div>
          </template>
          <template #cell-ruangan="{row}">
            <div>
              {{ row.ruangan? row.ruangan.namaruang:"-" }}
            </div>
          </template>
          <template #cell-rekap="{row}">
            <div>
              <!-- {{
                row.transaksi_absen ? row.transaksi_absen[0]? dateFull(row.transaksi_absen[0].updated_at) :row.transaksi_absen.length
                : row.transaksi_absen.length
              }} -->
              {{ row.transaksi_absen.length }}
            </div>
          </template>
        </app-table>
      </q-card-section>
    </q-card>
    <div style="padding-bottom:180px;" />
  </div>
</template>

<script setup>
// import { dateFull } from 'src/modules/formatter'
import { daysInMonth, bulans } from 'src/modules/datesme'
import { useReportAbsensiStore } from 'src/stores/simrs/pegawai/absensi/report/report.js'
import { onMounted, ref } from 'vue'
const date = new Date()
const bulan = date.getMonth() + 1
const year = date.getFullYear()

const store = useReportAbsensiStore()
const flag = ref('all')
const ruang = ref('all')

onMounted(() => {
  let mm = bulan.toString()
  if (mm.length === 1) {
    mm = `0${mm}`
  }
  const periode = `${year}-${'01'}`
  console.log(periode)

  store.autocomplete()
  store.setPeriode(periode)
})

console.log('bulans', bulans(bulan))
console.log('tahun', daysInMonth(bulan, year))

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
</script>
