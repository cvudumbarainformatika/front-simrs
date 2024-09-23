<template>
  <div class="justify-content-center">
    <div class="print-hide row middle q-pa-md q-gutter-md">
      <app-input-date
        :model="store.params.tgl"
        label="dari tangal"
        outlined
        :disable="store.loading"
        :loading="store.loading"
        @db-model="tglDari"
        @set-display="setDari"
      />
      <app-input-date
        :model="store.params.tglx"
        label="sampai tangal"
        outlined
        :disable="store.loading"
        :loading="store.loading"
        @db-model="tglSampai"
        @set-display="setSampai"
      />
      <div>
        <app-btn
          label="Ambil Data"
          :disable="store.loading"
          :loading="store.loading"
          @click="ambilData()"
        />
      </div>
      <div>
        <q-btn
          ref="refPrint"
          v-print="printObj"
          unelevated
          color="dark"
          round
          size="sm"
          icon="icon-mat-print"
        >
          <q-tooltip
            class="primary"
            :offset="[10, 10]"
          >
            Print
          </q-tooltip>
        </q-btn>
      </div>
    </div>
    <template v-if="store.kodetigas">
      <q-table
        class="my-sticky-table"
        :rows="store.kodetigas"
        :columns="columns"
        row-key="name"
        dense
        wrap-cells
      >
        <template #body="props">
          <q-tr>
            <q-td key="rekening" :props="props">
              <div>
                {{ props.row?.kode1 }}
              </div>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </template>
  </div>
</template>
<script setup>
import { useLaporanLraLaprealisasianggaranStore } from 'src/stores/siasik/laporan/lra/laprealisasianggaran'
import { onMounted, ref } from 'vue'

const store = useLaporanLraLaprealisasianggaranStore()

onMounted(() => {
  store.getDataRealisasi()
})
function tglDari (val) {
  store.setParameter('tgl', val)
}
function setDari (val) {
  store.display.dari = val
}
function tglSampai (val) {
  store.setParameter('tglx', val)
}
function setSampai (val) {
  store.display.sampai = val
}

const listlra = [
  {
    label: 'Uraian',
    name: 'rekening',
    field: row => [row.kodeall3],
    align: 'center',
    headerStyle: 'width: 200px;'
  }
]
// eslint-disable-next-line no-unused-vars
const columns = ref(listlra)

function ambilData () {
  // store.hitungharidalamBulan();
  store.getDataRealisasi().then(() => {
    store.emptyForm()
  })
}
const printed = ref(false)
const printObj = {
  id: 'printMe',
  popTitle: 'Laporan Realisasi Anggaran',
  beforeOpenCallback (vue) {
    printed.value = true
    console.log('wait...')
  },
  openCallback (vue) {
    console.log('opened')
  },
  closeCallback (vue) {
    printed.value = false
    console.log('closePrint')
  }
}
</script>
