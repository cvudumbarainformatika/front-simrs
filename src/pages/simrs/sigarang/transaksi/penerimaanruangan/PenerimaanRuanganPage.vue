<template>
  <div>
    <q-card>
      <q-card-section>
        <div class="f-14 text-weight-bold">
          Halaman Penerimaan Ruangan
        </div>
        <div class="title-desc">
          input Penerimaan Ruangan
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <div class="fit row items-center justify-start content-start q-mb-sm">
          <div class="col-3">
            Cari nomor distribusi
          </div>
          <div class="q-ml-md">
            <app-autocomplete-new
              v-model="store.form.id"
              label="pilih nomor distribusi"
              autocomplete="no_distribusi"
              option-label="no_distribusi"
              oprion-value="id"
              :source="store.permintaans"
              :loading="store.loading"
              @on-select="store.distribusiSelected"
            />
          </div>
        </div>
        <div class="fit row items-center justify-start content-start q-mb-sm">
          <div class="col-3">
            Tanggal distribusi
          </div>
          <div class="q-ml-md">
            {{ dateFull( store.form.tanggal_distribusi) }}
          </div>
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section v-if="store.form.details?Object.keys(store.form.details).length:false">
        <div class="fit row no-wrap justify-evenly items-center content-center q-my-xs text-weight-bold">
          <div class="anak text-center">
            Kode barang
          </div>
          <div class="anak text-center">
            Nama Barang Rs
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
            Stok Maksimum Ruangan
          </div>
          <div class="anak text-center">
            Stok Ruangan
          </div>
          <div class="anak text-center">
            Jumlah Distribusi
          </div>
        </div>
        <q-separator />
        <div
          v-for="(item, i) in store.form.details"
          :key="i"
        >
          <div class="fit row no-wrap justify-evenly items-center content-center q-my-xs">
            <div class="anak text-center">
              {{ item.kode_rs }}
            </div>
            <div class="anak text-center">
              {{ item.barangrs.nama }}
            </div>
            <div class="anak text-center">
              {{ item.barangrs.mapingbarang.barang108.kode }}
            </div>
            <div class="anak text-center">
              {{ item.barangrs.mapingbarang.barang108.uraian }}
            </div>
            <div class="anak text-center">
              belum ada
            </div>
            <div class="anak text-center">
              belum ada
            </div>
            <div class="anak text-center">
              belum ada
            </div>
            <div class="anak text-center">
              belum ada
            </div>
            <div class="anak text-center">
              {{ item.jumlah_disetujui }}
            </div>
          </div>
          <q-separator />
        </div>
      </q-card-section>
      <q-card-actions
        v-if="store.form.details?Object.keys(store.form.details).length:false"
        align="right"
      >
        <q-btn
          label="Simpan"
          icon="icon-mat-save"
          color="primary"
          flat
          dense
          no-caps
        />
      </q-card-actions>
    </q-card>
  </div>
</template>
<script setup>
import { dateFull } from 'src/modules/formatter'
import { usePenerimaanRuanganStore } from 'src/stores/simrs/logistik/sigarang/transaksi/penerimaanruangan/penerimaanruangan'

const store = usePenerimaanRuanganStore()
store.getInitialData()
</script>
<style lang="scss" scoped>
.anak{
  width:calc(100vw/9);
}
</style>
