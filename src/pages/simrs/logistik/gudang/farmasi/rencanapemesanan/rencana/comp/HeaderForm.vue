<template>
  <div
    class="fixed-top row no-wrap items-center justify-between q-mx-sm bg-white"
    style="z-index: 10;"
  >
    <div>
      <div class="row items-center">
        <div class="q-mr-md">
          No Perencanaan:
        </div>
        <div class="q-mr-sm">
          {{ store.form.no_rencbeliobat? store.form.no_rencbeliobat:'-' }}
        </div>
        <!-- <app-input
          v-model="store.form.no_rencbeliobat"
          label="Nomor rencana beli obat"
          outlined
          readonly
          valid
          :loading="store.loading"
        /> -->

        <div class="q-ml-md">
          <q-btn
            v-if="store.form.no_rencbeliobat"
            flat
            icon="icon-mat-done"
            dense
            color="primary"
            @click="store.selesaiDanKunci()"
          >
            <q-tooltip
              class="primary"
              :offset="[10, 10]"
            >
              Selesai dan Kunci Rencana Pemesanan
            </q-tooltip>
          </q-btn>
        </div>
      </div>
    </div>
    <div>
      <div class="row items-center no-wrap">
        <div class="q-mr-md">
          Tanggal Perencanaan:
        </div>
        <app-input-date-human
          :model="store.disp.tanggal"
          label="Tanggal"
          outlined
          @set-display="setDispTanggal"
          @db-model="setTanggal"
        />
      </div>
    </div>
    <div>
      <!-- <q-btn
        flat
        :icon="!style.componentfull?'icon-mat-open_in_full':'icon-mat-close_fullscreen'"
        round
        :color="style.componentfull?'green':'primary'"
        size="12px"
        class="q-ml-md"
        @click="style.setComponentFull"
      /> -->
    </div>
  </div>
</template>

<script setup>
import { useRencanaPemesananObatStore } from 'src/stores/simrs/farmasi/pemesanan/rencana'
// import { useStyledStore } from 'src/stores/app/styled'

// const style = useStyledStore()
const store = useRencanaPemesananObatStore()

function setDispTanggal(val) {
  store.disp.tanggal = val
}
function setTanggal(val) {
  store.setParam('tanggal', val)
  console.log('param ', store.param)
}

</script>
