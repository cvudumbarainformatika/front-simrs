<template>
  <q-card>
    <q-card-section>
      <div class="f-14 text-weight-bold">
        Kartu Stok
      </div>
      <div class="title-desc">
        Infromasi Pergerakan Barang
      </div>
    </q-card-section>
    <q-separator />
    <q-card-section>
      <div
        class="row justify-start q-col-gutter-sm q-mt-sm q-mb-sm"
      >
        <div class="col-4">
          <app-autocomplete-debounce-input
            v-model="store.params.kd_barang"
            label="Cari Barang"
            autocomplete="nama"
            option-label="nama"
            option-value="kode"
            :hint="store.item!==null?'depo : ' + store.item.depo.nama:''"
            :source="store.barangs"
            :loading="store.loadingBarang"
            @buang="cariBarang"
            @on-select="barangSelected"
          />
        </div>
        <div class="col-2">
          <app-autocomplete-debounce-input
            v-model="store.params.bln"
            label="Pilih bulan"
            autocomplete="nama"
            option-label="nama"
            option-value="value"
            :source="months"
          />
        </div>
        <div class="col-2">
          <app-autocomplete
            v-model="store.params.thn"
            label="Pilih tahun"
            :filled="false"
            :source="years"
          />
        </div>
        <div class="col-2">
          <app-autocomplete-debounce-input
            :key="store.tempats"
            v-model="store.params.kd_tempat"
            label="Cari tempat"
            autocomplete="nama"
            option-label="nama"
            option-value="kode"
            :source="store.tempats"
            :loading="store.loadingRuangan"
            @buang="cariTempat"
          />
        </div>
        <div class="col-1">
          <app-btn
            label="cari"
            @click="cariDataStok"
          />
        </div>
      </div>
    </q-card-section>
    <q-card-section>
      <div v-if="store.itemsGudang.length">
        <app-no-selected-page
          text="Kartu stok gudang"
          color="orange"
        />
      </div>
      <div v-else-if="store.itemsDepo.length">
        <app-no-selected-page
          text="Kartu stok depo"
          color="orange"
        />
      </div>
      <div v-else-if="store.itemsRuangan.length">
        <app-no-selected-page
          text="Kartu stok Ruangan"
          color="orange"
        />
      </div>
      <app-loading v-else-if="store.loading" />
      <app-no-data v-else />
    </q-card-section>
  </q-card>
</template>
<script setup>
// import { dateFullFormat } from 'src/modules/formatter'
import { findWithAttr, notifErrVue } from 'src/modules/utils'
import { useKartuStokStore } from 'src/stores/simrs/logistik/sigarang/laporan/stok/kartuStok'
import { ref } from 'vue'

const store = useKartuStokStore()
const props = defineProps({
  role: { type: String, default: '' },
  pegawai: { type: Object, default: () => {} }
})

const months = ref([
  { nama: 'Januari', value: '1' },
  { nama: 'Februari', value: '2' },
  { nama: 'Maret', value: '3' },
  { nama: 'April', value: '4' },
  { nama: 'Mei', value: '5' },
  { nama: 'Juni', value: '6' },
  { nama: 'Juli', value: '7' },
  { nama: 'Agustus', value: '8' },
  { nama: 'September', value: '9' },
  { nama: 'Oktober', value: '10' },
  { nama: 'November', value: '11' },
  { nama: 'Desember', value: '12' }

])
const curY = parseInt(store.params.thn)
const years = ref([])
for (let index = 0; index < 11; index++) {
  years.value[index] = String(curY - 5 + index)
}

// barang dipilih
function barangSelected(val) {
  console.log('barang dipilih ', val)
  const index = findWithAttr(store.barangs, 'kode', val)
  if (index >= 0) {
    store.item = store.barangs[index]
  } else {
    store.item = null
  }
}

// cari barang
function cariBarang(val) {
  store.paramBarang.q = val
  // console.log('cari barang ', store.paramBarang)
  store.getDataBarang()
}
// cari tempat
function cariTempat(val) {
  // store.paramBarang.q = val
  // console.log('cari tempat ', val)
  store.getDataRuangan(val)
}
// cari data di kartu stok
function cariDataStok() {
  if (store.params.kd_tempat) {
    if (store.params.kd_tempat.includes('Gd-')) {
      if (store.params.kd_tempat === 'Gd-02010100' && (props.role === 'gudang' || props.role === 'gizi' || props.role === 'root')) {
        // console.log('params Ke gudang', store.params)
        store.getKartuStokGudang()
      } else {
        // console.log('params Ke Depo', store.params)
        store.getKartuStokDepo()
      }
    } else {
      // console.log('params ruangan', store.params)
      // console.log('role ', props.role)
      store.getKartuStokRuangan()
    }
  } else {
    // console.log('ga onok ruangane cak ')
    notifErrVue('Tempat belum dipilih')
  }
  console.log('params ', store.params)
}
store.getInitialData()
// store.getDataByBarang()
</script>
