<template>
  <div
    class="fixed-top row no-wrap items-center justify-between bg-primary text-white q-pb-sm"
    style="z-index: 10;"
  >
    <div class="q-ml-sm">
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

        <div
          v-if="store.form.no_rencbeliobat"
          class="q-ml-md"
        >
          <!-- Kunci Rencana pemesanan di List -->
          <q-btn
            v-if="store.form.no_rencbeliobat"
            flat
            icon="icon-mat-done"
            dense
            color="green"
            disable
            @click="store.selesaiDanKunci()"
          >
            <q-tooltip
              class="green"
              :offset="[10, 10]"
            >
              Kunci Rencana pemesanan di List Rencana Pemesanan
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
          dark
          @set-display="setDispTanggal"
          @db-model="setTanggal"
        />
      </div>
    </div>
    <div
      v-if="apps?.user?.pegawai?.depo_sim"
      class="text-weight-bold text-white q-mr-sm"
    >
      {{ apps?.user?.pegawai?.depo_sim?.nama }}
    </div>
    <div
      v-else-if="apps?.user?.pegawai?.kdruangansim!==''"
      class="text-weight-bold text-white q-mr-sm"
    >
      {{ gudang(store.form.kd_ruang) }}
    </div>
    <div
      v-else
      class="text-weight-bold text-primary col-3 q-mr-sm"
    >
      <app-autocomplete-new
        :model="store.form.kd_ruang"
        outlined
        label="direncanakan untuk gudang : "
        autocomplete="nama"
        option-label="nama"
        option-value="value"
        dark
        :source="store.gudangs"
        @on-select="store.gudangSelected"
        @clear="store.gudangDeleted"
      />
    </div>
  </div>
</template>

<script setup>
import { useAplikasiStore } from 'src/stores/app/aplikasi'
import { useRencanaPemesananObatStore } from 'src/stores/simrs/farmasi/pemesanan/rencana'
import { onMounted, watch } from 'vue'

const apps = useAplikasiStore()
const store = useRencanaPemesananObatStore()

function setDispTanggal(val) {
  store.disp.tanggal = val
}
function setTanggal(val) {
  store.setParam('tanggal', val)
  console.log('param ', store.param)
}
function gudang(val) {
  const gud = store.gudangs.filter(a => a.value === val)
  if (gud.length) return gud[0].nama
  else return 'form gudang tidak terisi'
}
onMounted(() => {
  if (apps?.user?.kdruangansim !== '') {
    store.setForm('kd_ruang', apps?.user?.kdruangansim)
  }
})
watch(() => apps?.user?.kdruangansim, (obj) => {
  store.setForm('kd_ruang', obj)
})
</script>
