<template>
  <div>
    <q-card>
      <q-card-section>
        <div class="f-14 text-weight-bold">
          Distribusi Depo
        </div>
        <div class="title-desc">
          Halaman Distribusi ke Depo
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <div class="row items-center">
          <div class="col-2 q-mr-sm">
            Nomor Distribusi
          </div>
          <div class="col">
            {{ store.form.no_distribusi?store.form.no_distribusi:'-' }}
          </div>
        </div>
        <div class="row items-center">
          <div class="col-2 q-mr-sm">
            Depo Tujuan
          </div>
          <div class="col">
            <app-autocomplete-new
              label="pilih depo"
              :model="store.form.kode_depo"
              autocomplete="nama"
              option-label="nama"
              option-value="kode"
              :loading="store.loading"
              :source="store.depos"
              @on-select="depoSelected"
              @clear="depoCleared"
            />
          </div>
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <!-- header -->
        <div class="fit row no-wrap justify-evenly items-center content-center q-my-xs text-weight-bold">
          <div class="anak text-center">
            Kode Barang
          </div>
          <div class="anak text-center">
            Nama Barang RS
          </div>
          <div class="anak text-center">
            Kode 108
          </div>
          <div class="anak text-center">
            Uraian 108
          </div>
          <div class="anak text-center">
            Stok Depo
          </div>
          <div class="anak text-center">
            Stok Alokasi Depo
          </div>
          <div class="anak text-center">
            Stok Minimum Depo
          </div>
          <div class="anak text-center">
            Stok Maksimum Depo
          </div>
          <div class="anak text-center">
            Jumlah Distribusi
          </div>
        </div>
        <!-- input -->
        <div class="fit row no-wrap justify-evenly items-center content-center q-my-xs">
          <div class="anak text-center">
            {{ store.input.kode_barang?store.input.kode_barang:'-' }}
          </div>
          <div class="anak text-center">
            <app-autocomplete-new
              label="pilih barang"
              :model="store.input.kode_barang"
              autocomplete="nama"
              option-label="nama"
              option-value="kode"
              :loading="store.loading"
              :source="store.barangrses"
              @on-select="barangSelected"
              @clear="barangCleared"
            />
          </div>
          <div class="anak text-center">
            {{ store.input.kode_108?store.input.kode_108:'-' }}
          </div>
          <div class="anak text-center">
            {{ store.input.uraian?store.input.uraian:'-' }}
          </div>
          <div class="anak text-center">
            {{ store.input.stok_depo?store.input.stok_depo:'-' }}
          </div>
          <div class="anak text-center">
            {{ store.input.stok_alokasi_depo?store.input.stok_alokasi_depo:'-' }}
          </div>
          <div class="anak text-center">
            {{ store.input.stok_min_depo?store.input.stok_min_depo:'-' }}
          </div>
          <div class="anak text-center">
            {{ store.input.stok_max_depo?store.input.stok_max_depo:'-' }}
          </div>
          <div class="anak text-center">
            <q-input
              v-model="store.input.jumlah"
              label="Jumlah"
              type="number"
              dense
              borderless
              :loading="store.loading"
              hint="tekan enter untuk input"
              @keyup.prevent.enter="addInput"
            />
          </div>
        </div>
        <!-- display -->
        <div class="fit row no-wrap justify-evenly items-center content-center q-my-xs">
          <div class="anak text-center">
            Kode Barang
          </div>
          <div class="anak text-center">
            Nama Barang RS
          </div>
          <div class="anak text-center">
            Kode 108
          </div>
          <div class="anak text-center">
            Uraian 108
          </div>
          <div class="anak text-center">
            Stok Gudang
          </div>
          <div class="anak text-center">
            Stok Alokasi Gudang
          </div>
          <div class="anak text-center">
            Stok Minimum Depo
          </div>
          <div class="anak text-center">
            Stok Maksimum Depo
          </div>
          <div class="anak text-center">
            Jumlah Distribusi
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>
<script setup>
import { useDistribusiDepoStore } from 'src/stores/simrs/logistik/sigarang/transaksi/distribusiDepo/distribusiDepo'

const store = useDistribusiDepoStore()
store.getInitialData()
const depoSelected = val => {
  store.setForm('kode_depo', val)
  const minmax = store.minMaxDepos.filter(data => {
    return data.kode_depo === val
  })
  console.log('min max', minmax)
}
const depoCleared = () => {
  store.setForm('kode_depo', null)
}
const barangSelected = val => {
  store.setInput('kode_barang', val)
  const barang = store.mappingBarangs.filter(sel => {
    return sel.kode_rs === val
  })
  const minmax = store.minMaxDepos.filter(data => {
    return data.kode_depo === store.form.kode_depo
  })
  const minMaxBarang = minmax.filter(data => {
    return data.kode_rs === val
  })
  store.setInput('kode_108', barang[0].kode_108)
  store.setInput('uraian', barang[0].barang108.uraian)
  store.setInput('stok_min_depo', minMaxBarang[0].min_stok)
  store.setInput('stok_max_depo', minMaxBarang[0].max_stok)
  store.setDetail('kode_rs', val)
  store.setDetail('kode_108', barang[0].kode_108)
  store.setDetail('kode_satuan', barang[0].kode_satuan)

  console.log('min max', minMaxBarang)
  console.log('barang', barang)
}
const barangCleared = () => {
  store.setInput('kode_barang', null)
}
const addInput = () => {
  console.log('add input')
}
</script>
<style lang="scss" scoped>
.anak{
  width:calc(100vw/8);
}
</style>
