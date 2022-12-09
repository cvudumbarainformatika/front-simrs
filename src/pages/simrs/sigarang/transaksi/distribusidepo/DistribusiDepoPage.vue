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
}
const depoCleared = () => {
  store.setForm('kode_depo', null)
}
</script>
<style lang="scss" scoped>
.anak{
  width:calc(100vw/8);
}
</style>
