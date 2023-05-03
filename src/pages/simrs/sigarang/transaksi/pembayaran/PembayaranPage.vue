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
                  @set-display="setTanggalDisp"
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
              <div class="col-8 text-weight-bold">
                {{ dateFullFormat( store.kontrak.tglmulaikontrak) }}
              </div>
            </div>
            <div class="row fit q-col-gutter-sm items-center q-mb-xs">
              <div class="col-4">
                Nama Penyedia
              </div>
              <div class="col-8 text-weight-bold">
                {{ store.kontrak.penenyedia?store.kontrak.penenyedia.nama:store.kontrak.namaperusahaan }}
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <div>
          <app-btn
            label="Simpan"
            :disable="store.loading"
            :loading="store.loading"
            @click="simpan"
          />
        </div>
      </q-card-actions>
    </q-card>
    <q-card
      v-if="store.penerimaans.length && !store.loading"
      class="q-mt-md"
    >
      <q-card-section>
        <div
          class="row fit q-col-gutter-sm text-weight-bold q-mb-sm"
        >
          <div class="col-1">
            No
          </div>
          <div class="col-2">
            No Faktur
          </div>
          <div class="col-5">
            Kode Belanja
          </div>
          <div class="col-2">
            Nilai Tagihan
          </div>
          <div class="col-2">
            Nilai Belanja
          </div>
        </div>
        <div
          v-for="(trm,i) in store.penerimaans"
          :key="i"
          class="row fit q-col-gutter-sm items-center q-mb-xs"
        >
          <div class="col-1">
            {{ i+1 }}
          </div>
          <div class="col-2">
            {{ trm.faktur?trm.faktur:'tidak ada faktur' }}
          </div>
          <div class="col-5">
            <div
              v-for="(det,j) in trm.details"
              :key="j"
            >
              {{ det.uraian_50?det.uraian_50:'tidak ada kode Belanja' }}
            </div>
          </div>
          <div class="col-2">
            {{ trm.nilai_tagihan?formatRpDouble(trm.nilai_tagihan,2):formatRpDouble(0,2) }}
          </div>
          <div class="col-2">
            <app-input
              v-model="trm.nilai_belanja"
              label="Nilai Belanja"
              outlined
            />
          </div>
        </div>
      </q-card-section>
    </q-card>
    <q-card
      v-if="!store.penerimaans.length && !store.loading"
      class="q-mt-md"
    >
      <q-card-section><app-no-data /></q-card-section>
    </q-card>
    <q-card
      v-if="store.loading"
      class="q-mt-md"
      style="height:300px"
    >
      <q-card-section
        class="row fit items-center justify-center"
      >
        <app-loading />
      </q-card-section>
    </q-card>
  </div>
</template>
<script setup>
import { date } from 'quasar'
import { dateFullFormat, formatRpDouble } from 'src/modules/formatter'
import { usePembayaranStore } from 'src/stores/simrs/logistik/sigarang/transaksi/pembayaran/pembayaran'

const store = usePembayaranStore()
store.getKontraks()
function setTanggal(val) {
  store.setForm('tanggal_pembayaran', date.formatDate(val, 'YYYY-MM-DD'))
}
function setTanggalDisp(val) {
  store.setForm('tangl', val)
  console.log(store.form)
}

function simpan() {
  console.log('simpan', store.form)
}
</script>
