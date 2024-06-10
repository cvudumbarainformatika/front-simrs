<template>
  <div class="column">
    <div class="row justify-between items-center q-pa-sm bg-primary text-white">
      <div class="kiri row q-gutter-sm">
        <q-input
          v-model="store.params.q"
          outlined
          dark
          color="white"
          dense
          placeholder="Cari Obat ..."
          debounce="500"
          style="min-width: 200px;"
          @keyup.enter="store.goToPage(1)"
        >
          <template
            v-if="store.params.q"
            #append
          >
            <q-icon
              name="icon-mat-close"
              size="xs"
              class="cursor-pointer"
              @click.stop.prevent="clearSearch"
            />
          </template>
          <template #prepend>
            <q-icon
              size="sm"
              name="icon-mat-search"
            />
          </template>
        </q-input>
        <q-select
          v-model="bulan"
          :options="bulans"
          outlined
          dark
          dense
          color="white"
          style="width:150px"
          @update:model-value="changeMonth"
        />
        <q-select
          v-model="store.params.tahun"
          :options="tahuns"
          outlined
          dark
          dense
          color="white"
          style="width:100px"
        />
      </div>
      <div class="kanan">
        <q-btn flat round icon="icon-my-file-excel" size="sm" padding="sm" @click="store.exportExcel= !store.exportExcel">
          <q-tooltip>export to excel</q-tooltip>
        </q-btn>
        <!-- <q-btn flat round icon="icon-mat-print" size="sm" padding="sm">
          <q-tooltip>print</q-tooltip>
        </q-btn> -->
      </div>
    </div>

    <div>
      <q-list
        dark
        class="bg-dark"
        dense
      >
        <q-item>
          <q-item-section style="width:40%">
            Nama Obat
          </q-item-section>
          <q-item-section
            style="width:60%"
            side
          >
            <div class="row items-center full-width q-col-gutter-xs">
              <div class="col-3 text-right">
                Stok Awal
              </div>
              <div class="col-3 text-right">
                Stok Masuk
              </div>
              <div class="col-3 text-right">
                Stok Keluar
              </div>
              <div class="col-3 text-right">
                Stok Akhir
              </div>
            </div>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useKartuStokFarmasiStore } from '../../../../../../../stores/simrs/farmasi/katustok'
// import { months } from '../../../../../../../modules/datesme'

const store = useKartuStokFarmasiStore()
const bulan = ref('Januari')
const bulans = ref(['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'Novermber', 'Desember'])
const tahuns = ref([])

onMounted(() => {
  init()
})

function init () {
  const d = new Date()
  const b = d.getMonth()
  bulan.value = bulans.value[b]
  // store.setTahun(d.getFullYear())
  store.params.tahun = d.getFullYear()
  generateArrayOfYears()
  changeMonth(bulan.value)
}

function generateArrayOfYears () {
  const max = new Date().getFullYear()
  const min = max - 5
  const years = []

  for (let i = max; i >= min; i--) {
    years.push(i)
  }
  tahuns.value = years
}

function changeMonth (val) {
  const cariIndexBulans = bulans.value.findIndex((x) => x === val) + 1
  const serial = cariIndexBulans <= 9 ? '0' + cariIndexBulans : cariIndexBulans
  store.params.bulan = serial
  // store.getData()
}

const clearSearch = () => {
  store.params.q = ''
  store.goToPage(1)
}

</script>
