<template>
  <q-dialog
    persistent
  >
    <q-card style="min-width: 500px;">
      <q-bar class="bg-primary">
        <q-space />

        <q-btn
          v-close-popup
          dense
          flat
          color="white"
          icon="icon-mat-close"
          @click="store.setClose"
        >
          <q-tooltip class="bg-white text-primary">
            Close
          </q-tooltip>
        </q-btn>
      </q-bar>
      <q-card-section
        v-if="store.loadingRinci"
        style="height: 300px;"
      >
        <app-loading />
      </q-card-section>
      <q-card-section v-else>
        <div class="row text-weight-bold text-amber-10">
          {{ store?.obat?.namaobat??store?.obat?.nama_obat }}
        </div>
        <div class="row text-italic f-10">
          {{ store?.obat?.kd_obat }}
        </div>
        <q-separator class="q-my-sm" />
        <div v-if="store.rincis.length">
          <div class="row text-weight-bold fit q-mb-sm">
            <div class="col-6">
              Gudang / Depo / Ruangan
            </div>
            <div class="col-2">
              Min
            </div>
            <div class="col-2">
              Max
            </div>
            <div class="col-2">
              Stok
            </div>
          </div>
          <div
            v-for="(rinc,i) in store.rincis"
            :key="i"
          >
            <div
              class="row items-center"
              :class="i%2===0?'':'bg-blue-grey-3'"
            >
              <div class="col-6">
                <div class="row">
                  {{ rinc?.nama_ruang }}
                </div>
                <div class="row text-italic f-10">
                  ({{ rinc?.kode_ruang?.includes('R-')?'Ruangan': 'Gudang / Depo' }})
                </div>
              </div>
              <div class="col-2">
                {{ rinc?.min }}
              </div>
              <div class="col-2">
                {{ rinc?.max }}
              </div>
              <div class="col-2">
                {{ rinc?.stok }}
              </div>
            </div>
          </div>
          <q-separator class="q-my-sm" />
          <div class="row text-weight-bold fit q-mb-sm">
            <div class="col-6">
              Jumlah
            </div>
            <div class="col-2">
              {{ store.viewrinci.min }}
            </div>
            <div class="col-2">
              {{ store.viewrinci.max }}
            </div>
            <div class="col-2">
              {{ store.viewrinci.stok }}
            </div>
          </div>
        </div>
        <div v-else>
          <app-no-data />
        </div>
      </q-card-section>

      <q-separator />
    </q-card>
  </q-dialog>
</template>
<script setup>
import { useRencanaPemesananObatStore } from 'src/stores/simrs/farmasi/pemesanan/rencana'

// eslint-disable-next-line no-unused-vars
const store = useRencanaPemesananObatStore()

</script>
