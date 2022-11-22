<template>
  <q-dialog
    persistent
    maximized
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

      <q-card-section>
        <div class="text-h6">
          Halaman Rekap Absensi {{ rekap.user.nama }}
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div
          v-if="!rekap.rekaps.length"
          class="flex flex-center"
        >
          <app-loading />
        </div>

        <q-date
          v-model="date"
          minimal
          :events="rekap.tanggals"
          event-color="green"
        />
        <div class="row">
          {{ rekap.tanggals }}
        </div>
        {{ rekap.rekaps }}
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { ref } from 'vue'
import { useRekapAbesensiUserStore } from 'src/stores/simrs/pegawai/user/rekap/rekap'

const rekap = useRekapAbesensiUserStore()
const date = ref(null)

// const eventsFn = (date) => {
//   rekap.tanggals.forEach(tanggal => {
//     if (tanggal === date) return true
//   })
//   console.log(rekap.tanggals)
// }

const deleteParamsId = () => {
  rekap.delParams('id')
  rekap.rekaps = []
}
</script>
