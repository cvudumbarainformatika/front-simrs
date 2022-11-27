<template>
  <q-dialog
    persistent
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card class="">
      <q-bar>
        <q-space />
        <q-btn
          v-close-popup
          dense
          flat
          icon="icon-mat-close"
          @click="deleteParamsId"
        >
          <q-tooltip class="bg-white text-primary">
            Close
          </q-tooltip>
        </q-btn>
      </q-bar>

      <q-card-section class="q-pa-md">
        <div class="text-h5 text-weight-bold">
          Rekap Absensi {{ rekap.user.nama }}
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none q-pa-lg">
        <div class="fit row justify-center q-mb-md">
          <q-card>
            <q-card-section>
              {{ rekap.user.nama }} terlambat {{ rekap.telat }} dari {{ rekap.tanggals.length }} kali absen
              ({{ isNaN((rekap.telat/rekap.tanggals.length*100).toPrecision(4)) ? 0 : (rekap.telat/rekap.tanggals.length*100).toPrecision(4) }}%)
            </q-card-section>
          </q-card>
        </div>
        <div
          v-if="rekap.loading"
          class="flex flex-center"
        >
          <app-loading />
        </div>
        <div class="fit row justify-center">
          <app-calender-new
            :data="rekap.rekaps"
            :loading="rekap.loading"
            @on-prev="prev"
            @on-next="next"
          />
        </div>
        <!-- <div class="row q-col.gutter-sm">
          <div class="col-2" />
          <div class="col-1">
            Senin
          </div>
          <div class="col-1">
            Selasa
          </div>
          <div class="col-1">
            Rabu
          </div>
          <div class="col-1">
            Kamis
          </div>
          <div class="col-1">
            Jum'at
          </div>
          <div class="col-1">
            Sabtu
          </div>
          <div class="col-1">
            Minggu
          </div>
        </div>
        <div
          v-for="(week,i) in rekap.weeksData"
          :key="i"
        >
          <div class="row q-col.gutter-sm items-center">
            <div class="col-2" />
            <div
              v-for="(day, n) in week"
              :key="n"
              class="col-1"
            >
              <div
                v-if="!day"
                class="row"
              >
                <q-chip
                  color="red"
                  text-color="white"
                  class="chip"
                  dense
                  square
                >
                  <div class="f-12 text-center">
                    None
                  </div>
                </q-chip>
              </div>
              <div
                v-if="day"
                class="row"
              >
                <q-chip
                  :style="`background-color: ${day.kategory.warna};`"
                  text-color="white"
                  class="chip"
                  dense
                  square
                >
                  <div class="f-12 text-center">
                    {{ dateHalfFormat(day.tanggal) }}
                  </div>
                </q-chip>
              </div>
              <div
                v-if="day"
                class="row"
              >
                <q-chip
                  color="green"
                  text-color="white"
                  class="chip"
                  dense
                  square
                >
                  <div class="f-12 text-center">
                    In   : {{ day.masuk }}
                  </div>
                </q-chip>
              </div>
              <div
                v-if="day"
                class="row"
              >
                <q-chip
                  color="orange"
                  text-color="white"
                  class="chip"
                  dense
                  square
                >
                  <div class="f-12 text-center">
                    Out : {{ day.pulang }}
                  </div>
                </q-chip>
              </div>
              <div
                v-if="day"
                class="row"
              >
                <q-chip
                  color="dark"
                  text-color="white"
                  class="chip"
                  dense
                  square
                >
                  <div class="f-12 text-center">
                    late : {{ day.diff }}
                  </div>
                </q-chip>
              </div>
            </div>
          </div>
        </div> -->
        <!-- <q-date
          v-model="date"
          minimal
          :events="rekap.tanggals"
          event-color="green"
        />
        <div class="row">
          {{ rekap.tanggals }}
        </div>
        {{ rekap.rekaps }} -->
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup>
// import { computed } from 'vue'
// import { dateHalfFormat } from 'src/modules/formatter'
import { useRekapAbesensiUserStore } from 'src/stores/simrs/pegawai/user/rekap/rekap'

const rekap = useRekapAbesensiUserStore()
// const bulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
// const namaBulan = computed(() => {
//   return bulan[rekap.params.bulan - 1]
// })
// const eventsFn = (date) => {
//   rekap.tanggals.forEach(tanggal => {
//     if (tanggal === date) return true
//   })
//   console.log(rekap.tanggals)
// }
const prev = val => {
  rekap.setParams('bulan', val.bulan)
  rekap.setParams('tahun', val.tahun)
  rekap.getRekapAbsensiByUser()
  console.log('prev', val)
}
const next = val => {
  rekap.setParams('bulan', val.bulan)
  rekap.setParams('tahun', val.tahun)
  rekap.getRekapAbsensiByUser()
  console.log('next', val)
}
const deleteParamsId = () => {
  rekap.delParams('id')
  rekap.rekaps = []
  rekap.tanggals = []
  rekap.telat = 0
  rekap.weeksData = []
}
</script>
<style lang="scss" scoped>
.chip{
  width:100px;
  padding:5px;
}
</style>
