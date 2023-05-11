<template>
  <div
    :key="store.form"
    class="q-mb-xl"
  >
    <div class="print">
      <q-btn
        ref="refPrint"
        unelevated
        color="dark"
        round
        size="sm"
        icon="icon-mat-print"
        @click="print"
      >
        <q-tooltip
          class="primary"
          :offset="[10, 10]"
        >
          Print verifikasi
        </q-tooltip>
      </q-btn>
    </div>
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
                <div
                  v-if="store.loadingPermintaan"
                  class="row q-col-gutter-md"
                >
                  <div class="col-6">
                    <q-skeleton type="rect" />
                  </div>
                  <div class="col-6">
                    memperbarui data..
                  </div>
                </div>
                <div
                  v-if="store.loading"
                  class="row q-col-gutter-md"
                >
                  <div class="col-6">
                    <q-skeleton type="rect" />
                  </div>
                  <div class="col-6">
                    sedang menyimpan..
                  </div>
                </div>
                <div v-if="!store.loadingPermintaan && !store.loading">
                  <app-autocomplete-new
                    :model="store.form.no_permintaan"
                    valid
                    outlined
                    label="cari nomor permintaan*"
                    autocomplete="no_permintaan"
                    option-value="no_permintaan"
                    :loading="store.loadingPermintaan"
                    option-label="no_permintaan"
                    :source="store.permintaans"
                    @on-select="store.permintaanSelected"
                    @clear="clearPermintaan"
                  />
                <!-- @buang="store.setSearch" -->
                </div>
              </div>
            </div>
          </div>
          <div class="col-6">
            <div class="row q-col-gutter-sm q-mb-sm items-center">
              <div class="col-4">
                Tanggal Permintaan
              </div>
              <div class="col-8">
                : {{ Object.keys(store.permintaan).length ? dateFull( store.permintaan.tanggal):'belum dipilih' }}
              </div>
            </div>
            <div class="row q-col-gutter-sm q-mb-sm items-center">
              <div class="col-4">
                Tanggal Verifikasi
              </div>
              <div class="col-8">
                <div class="row items-center">
                  :
                  <app-input-date
                    class="q-ml-sm"
                    :model="store.tanggal"
                    label="Tanggal verifikasi"
                    outlined
                    dense
                    @set-model="setTanggal"
                  />
                </div>
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
      v-if="Object.keys(store.mapGudang).length && !store.loading"
      class="col-12"
    >
      <tabelVerifGudang
        :map="store.mapGudang"
      />
    </div>
  </div>
</template>
<script setup>
import { date } from 'quasar'
import { dateFull } from 'src/modules/formatter'
import { useVerifPermintaanRuangan } from 'src/stores/simrs/logistik/sigarang/transaksi/verifpermintaan/form'
import tabelVerifGudang from './TabelVerifGudang.vue'

const store = useVerifPermintaanRuangan()
store.getDepo()
store.getPermintaan()

const print = () => {
  window.print()
}
const setTanggal = val => {
  store.tanggal = date.formatDate(val, 'DD MMMM YYYY')
  store.setForm('tanggal', date.formatDate(val, 'YYYY-MM-DD HH:mm:ss'))
  // console.log(store.form)
}
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
<style scoped>
.print{
  position: absolute;
    right: 30px;
    top: 24px;
    z-index: 10;
}
</style>
