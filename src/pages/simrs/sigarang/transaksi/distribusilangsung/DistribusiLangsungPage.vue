<template>
  <div>
    <q-card>
      <q-card-section>
        <div class="f-14 text-weight-bold">
          Distribusi Langsung {{ ruang }}
        </div>
        <div class="title-desc">
          Halaman Distribusi Langsung dari {{ ruang }}
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <div class="row items-center">
          <div class="col-3">
            Pilih Tipe Barang
          </div>
          <div class="col-4">
            <app-autocomplete-new
              v-model="store.tipe"
              label="pilih tipe barang"
              autocomplete="nama"
              option-label="nama"
              option-value="value"
              outlined
              :disable="store.loadingStokDepo"
              :loading="store.loadingStokDepo"
              :source="store.options"
              @on-select="tipeSelected"
            />
          </div>
        </div>
        <div class="row items-center">
          <div class="col-3">
            Nomor Distribusi
          </div>
          <div class="col-4">
            <app-input
              v-model="store.form.no_distribusi"
              label="Nomor Distribusi"
              outlined
            />
          </div>
        </div>
        <div class="row items-center">
          <div class="col-3">
            Tanggal Distribusi
          </div>
        </div>
        <div class="row items-center">
          <div class="col-3">
            Ruangan Tujuan
          </div>
        </div>
        <div class="row items-center">
          <div class="col-3">
            Petugas Depo
          </div>
          <div class="col-9">
            {{ auth.currentUser? auth.currentUser.nama:'-' }}
          </div>
          {{ store.form }}
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>
<script setup>
import { useAuthStore } from 'src/stores/auth'
import { useTransaksiDistribusiLangsung } from 'src/stores/simrs/logistik/sigarang/transaksi/distribusilangsung/distribusilangsung'
import { computed } from 'vue'

const store = useTransaksiDistribusiLangsung()
const auth = useAuthStore()
store.getInitialData()
const ruang = computed(() => {
  const depo = auth.depo ? auth.depo.nama : false
  if (depo) {
    return depo
  } else {
    return '-'
  }
})
const tipeSelected = val => {
  console.log(val)
}
// watch(() => auth.currentUser, (data) => {
//   console.log('watch', data)
//   store.setForm('pegawai_id', data.pegawai_id)
// })
</script>
