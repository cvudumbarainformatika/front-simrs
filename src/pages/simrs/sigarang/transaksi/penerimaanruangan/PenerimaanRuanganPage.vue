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
              ref="refPermintaan"
              :model="store.form.permintaan_id"
              label="pilih nomor distribusi"
              autocomplete="no_distribusi"
              option-label="no_distribusi"
              option-value="id"
              :source="store.permintaans"
              :loading="store.loading"
              @on-select="store.distribusiSelected"
              @clear="cleared"
            />
          </div>
        </div>
        <div class="fit row items-center justify-start content-start q-mb-sm">
          <div class="col-3">
            Tanggal distribusi
          </div>
          <div class="q-ml-md">
            {{ dateFull( store.tanggal_distribusi) }}
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
            Stok Depo
          </div>
          <div class="anak text-center">
            Stok Alokasi Depo
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
          v-for="(item, i) in store.details"
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
              {{ item.barangrs.barang108.kode }}
            </div>
            <div class="anak text-center">
              {{ item.barangrs.barang108.uraian }}
            </div>
            <div class="anak text-center">
              {{ item.barangrs.stokDepo }}
            </div>
            <div class="anak text-center">
              {{ item.barangrs.alokasi }}
            </div>
            <div class="anak text-center">
              {{ item.barangrs.maxStok }}
            </div>
            <div class="anak text-center">
              {{ item.barangrs.stokRuangan }}
            </div>
            <div class="anak text-center">
              {{ item.jumlah }}
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
          :loading="store.loading"
          @click="save"
        />
      </q-card-actions>
    </q-card>
  </div>
</template>
<script setup>
import { dateFull } from 'src/modules/formatter'
import { usePenerimaanRuanganStore } from 'src/stores/simrs/logistik/sigarang/transaksi/penerimaanruangan/penerimaanruangan'
import { ref } from 'vue'

const store = usePenerimaanRuanganStore()
store.getInitialData()

const refPermintaan = ref(null)
const save = () => {
  // console.log(refPermintaan.value.$refs.refAuto)
  if (store.form.permintaan_id) {
    store.saveForm()
    refPermintaan.value.$refs.refAuto.resetValidation()
  } else {
    refPermintaan.value.$refs.refAuto.validate()
  }
}
const cleared = () => {
  console.log('cleared')
  store.resetFORM()
  refPermintaan.value.$refs.refAuto.resetValidation()
}
</script>
<style lang="scss" scoped>
.anak{
  width:calc(100vw/9);
}
</style>
