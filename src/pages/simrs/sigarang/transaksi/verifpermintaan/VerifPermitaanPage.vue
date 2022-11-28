<template>
  <div class="q-mb-xl">
    <app-card
      title="Verifikasi Permintaan"
      desc="Form Verifikasi Permintaan Ruangan"
      class="q-mb-md"
    >
      <template #content>
        <div class="row q-col-gutter-sm q-mb-sm">
          <div class="col-6">
            <div class="row q-col-gutter-sm q-mb-sm items-center">
              <div class="col-4">
                Nomor Permintaan
              </div>
              <div class="col-8">
                <app-autocomplete-new
                  :model="store.form.no_permintaan"
                  valid
                  outlined
                  label="cari nomor permintaan*"
                  autocomplete="no_permintaan"
                  option-value="no_permintaan"
                  :loading="store.loading"
                  option-label="no_permintaan"
                  :source="store.permintaans"
                  @on-select="store.permintaanSelected"
                  @clear="clearPermintaan"
                />
                <!-- @buang="store.setSearch" -->
              </div>
            </div>
          </div>
          <div class="col-6">
            <div class="row q-col-gutter-sm q-mb-sm items-center">
              <div class="col-4">
                Tanggal Permintaan
              </div>
              <div class="col-8">
                : {{ Object.keys(store.permintaan).length ? store.permintaan.tanggal:'belum dipilih' }}
              </div>
            </div>
            <div class="row q-col-gutter-sm q-mb-sm items-center">
              <div class="col-4">
                User Ruangan
              </div>
              <div class="col-8">
                : {{ Object.keys(store.permintaan).length ? store.permintaan.pengguna.jabatan : 'belum dipilih' }}
              </div>
            </div>
          </div>
        </div>
      </template>
    </app-card>
    <!-- <div
      v-for="(apem,i) in store.mapGudang"
      :key="i"
      class="col-12"
    >
      <tabelVerifGudang
        :map="apem"
        @on-submit="onSubmit"
      />
    </div> -->
    <div
      v-if="Object.keys(store.mapGudang).length"
      class="col-12"
    >
      <tabelVerifGudang
        :map="store.mapGudang"
      />
    </div>
  </div>
</template>
<script setup>
import { useVerifPermintaanRuangan } from 'src/stores/simrs/logistik/sigarang/transaksi/verifpermintaan/form'
import tabelVerifGudang from './TabelVerifGudang.vue'

const store = useVerifPermintaanRuangan()
store.getDepo()
store.getPermintaan()

// const onSubmit = val => {
// console.log('val', val)
// console.log('mapGudang', store.mapGudang)
// console.log('permintaan', store.permintaan)
// }

const clearPermintaan = () => {
  store.setForm('no_permintaan', null)
  store.mapGudang = []
  store.permintaan = {}
}
</script>
