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
    </q-card>
  </div>
</template>

<script setup>
import { daysInMonth, bulans } from 'src/modules/datesme'
const date = new Date()
const bulan = date.getMonth() + 1
const year = date.getFullYear()

console.log('bulans', bulans(bulan))
console.log('bulan', bulan)
console.log('tahun', daysInMonth(bulan, year))
</script>
