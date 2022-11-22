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
          @click="resetJadwal"
        >
          <q-tooltip class="bg-white text-primary">
            Close
          </q-tooltip>
        </q-btn>
      </q-bar>

      <q-card-section>
        <div class="text-h6">
          Jadwal {{ rekap.user.nama }}
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div
          v-if="!rekap.jadwals.length"
          class="flex flex-center"
        >
          <app-loading />
        </div>
        <div
          v-for="(jadwal,i) in rekap.jadwals"
          :key="i"
        >
          <q-card
            :style="jadwal.status==='1' ? 'background-color: red;' : `background-color: ${jadwal.kategory.warna};`"
            class="q-mt-sm"
          >
            <q-card-section>
              <div
                v-if="jadwal.status==='1'"
                class="row q-col-gutter-md text-white"
              >
                <div class="col-2">
                  {{ jadwal.hari }}
                </div>
                <div class="col-2">
                  Libur
                </div>
              </div>
              <div
                v-if="jadwal.status==='2'"
                class="row q-col-gutter-md text-white"
              >
                <div class="col-2">
                  {{ jadwal.hari }}
                </div>
                <div class="col-2">
                  {{ jadwal.kategory.nama }}
                </div>
                <div class="col-2">
                  Absen Masuk : {{ jadwal.masuk }}
                </div>
                <div class="col-2">
                  Absen Pulang : {{ jadwal.pulang }}
                </div>
              </div>
              <!-- {{ jadwal }} -->
            </q-card-section>
          </q-card>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { useRekapAbesensiUserStore } from 'src/stores/simrs/pegawai/user/rekap/rekap'

const rekap = useRekapAbesensiUserStore()
const resetJadwal = () => {
  rekap.jadwals = []
}
</script>
