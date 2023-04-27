<template>
  <div class="q-mb-xl">
    <q-card>
      <q-card-section>
        <div class="row fit q-col-gutter-sm items-center">
          <div class="col-6">
            <div class="row fit q-col-gutter-sm items-center q-mb-xs">
              <div class="col-4">
                Nomor Kontrak
              </div>
              <div class="col-8">
                <app-autocomplete-new
                  v-model="store.form.kontrak"
                  label="pilih kontrak"
                  debounce="700"
                  autocomplete="kontrak"
                  option-label="kontrak"
                  option-value="kontrak"
                  outlined
                  valid
                  :loading="store.loading"
                  :source="store.kontraks"
                  @on-select="store.kontrakSelected"
                />
              </div>
            </div>
            <div class="row fit q-col-gutter-sm items-center q-mb-xs">
              <div class="col-4">
                Nomor Kwitansi
              </div>
              <div class="col-8">
                <app-input
                  v-model="store.form.no_kwitansi"
                  label="isi Nomor Kwitansi"
                  outlined
                  :loading="store.loading"
                />
              </div>
            </div>
            <div class="row fit q-col-gutter-sm items-center q-mb-xs">
              <div class="col-4">
                Tanggal Pembayaran
              </div>
              <div class="col-8">
                <app-input-date-human
                  :model="store.form.tangl"
                  label="tanggal bayar"
                  outlined
                  :loading="store.loading"
                  @set-model="setTanggal"
                />
              </div>
            </div>
            <div class="row fit q-col-gutter-sm items-center q-mb-xs">
              <div class="col-4">
                Nomor Pembayaran
              </div>
              <div class="col-8">
                <app-input
                  v-model="store.form.no_pembayaran"
                  label="isi Nomor pembayaran"
                  outlined
                  :loading="store.loading"
                />
              </div>
            </div>
          </div>
          <div class="col-6">
            <div class="row fit q-col-gutter-sm items-center q-mb-xs">
              <div class="col-4">
                Tanggal Kontrak
              </div>
              <div class="col-8">
                display
              </div>
            </div>
            <div class="row fit q-col-gutter-sm items-center q-mb-xs">
              <div class="col-4">
                Nama Penyedia
              </div>
              <div class="col-8">
                display
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>
<script setup>
import { date } from 'quasar'
import { usePembayaranStore } from 'src/stores/simrs/logistik/sigarang/transaksi/pembayaran/pembayaran'

const store = usePembayaranStore()
store.getKontraks()
function setTanggal(val) {
  store.setForm('tangl', val)
  store.setForm('tanggal_pembayaran', date.formatDate(val, 'YYYY-MM-DD'))
  console.log(store.form)
}
</script>
