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
        >
          <template
            v-if="store.params.q"
            #append
          >
            <q-icon
              name="icon-mat-close"
              size="xs"
              class="cursor-pointer"
              @click.stop.prevent="store.params.q = ''"
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
        />
        <q-select
          v-model="tahun"
          :options="tahuns"
          outlined
          dark
          dense
          color="white"
          style="width:100px"
        />
      </div>
      <div>kanan</div>
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
                Saldo Awal
              </div>
              <div class="col-3 text-right">
                Trans In
              </div>
              <div class="col-3 text-right">
                Trans Out
              </div>
              <div class="col-3 text-right">
                Saldo Akhir
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
const tahun = ref(2024)
const tahuns = ref([])
onMounted(() => {
  init()
  store.getData()
})

function init() {
  const d = new Date()
  const b = d.getMonth()
  bulan.value = bulans.value[b]
  tahun.value = d.getFullYear()
  generateArrayOfYears()
  // console.log('bulan', bulan)
  // console.log('tahun', tahun.value)
}

function generateArrayOfYears() {
  const max = new Date().getFullYear()
  const min = max - 5
  const years = []

  for (let i = max; i >= min; i--) {
    years.push(i)
  }
  tahuns.value = years
}
</script>
