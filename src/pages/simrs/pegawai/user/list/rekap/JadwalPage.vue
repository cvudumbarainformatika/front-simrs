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
          v-if="rekap.loading"
          class="flex flex-center"
        >
          <app-loading />
        </div>
        <div
          v-if="!rekap.jadwals.length && !rekap.loading"
          class="flex flex-center"
        >
          <app-no-data />
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
                class="fit row no-wrap justify-start items-center content-center q-col-gutter-sm text-white"
              >
                <div class="col-auto ">
                  {{ jadwal.hari }}
                </div>
                <div class="col-auto">
                  Libur
                </div>
              </div>
              <div
                v-if="jadwal.status==='2'"
                class="fit row no-wrap justify-evenly items-center content-center q-col-gutter-sm text-white"
              >
                <div class="">
                  {{ jadwal.hari }}
                </div>
                <div class="">
                  {{ jadwal.kategory.nama }}
                </div>
                <div class="">
                  <!-- :style="`background-color: ${jadwal.kategory.warna};`" -->
                  <!-- text-color="white" -->
                  <q-chip
                    color="white"
                    class="chip-able"
                    dense
                    square
                    outline
                  >
                    <div class="f-12 text-center">
                      Absen Masuk : {{ jadwal.masuk }}
                    </div>
                  </q-chip>
                </div>
                <div class="">
                  <q-chip
                    color="white"
                    class="chip-able"
                    dense
                    square
                    outline
                  >
                    <div class="f-12 text-center">
                      Absen Pulang : {{ jadwal.pulang }}
                    </div>
                  </q-chip>
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
