<template>
  <div class="q-mb-xl">
    <q-card>
      <q-card-section>
        <div class="row fit q-col-gutter-sm items-center">
          <div class="col-9">
            <div class="row fit q-col-gutter-sm items-center q-mb-xs">
              <div class="col-4">
                Penyedia
              </div>
              <div class="col-8">
                <app-autocomplete-new
                  v-model="store.form.penyedia"
                  label="pilih Penyedia"
                  debounce="700"
                  autocomplete="nama"
                  option-label="nama"
                  option-value="kode"
                  outlined
                  valid
                  :loading="store.loading"
                  :source="store.penyedias"
                  @on-select="store.penyediaSelected"
                />
              </div>
            </div>
            <div class="row fit q-col-gutter-sm items-center q-mb-xs">
              <div class="col-4">
                Nomor BAST
              </div>
              <div class="col-8">
                <app-autocomplete-new
                  v-model="store.form.bast"
                  label="Pilih Nomor BAST"
                  debounce="700"
                  autocomplete="no_bast"
                  option-label="no_bast"
                  option-value="no_bast"
                  outlined
                  valid
                  :loading="store.loading"
                  :source="store.basts"
                  @on-select="store.bastSelected"
                />
              </div>
            </div>
            <div class="row fit q-col-gutter-sm items-center q-mb-xs">
              <div class="col-4">
                Nomor NPD
              </div>
              <div class="col-8">
                <app-input
                  ref="refKwitansi"
                  v-model="store.form.no_kwitansi"
                  label="isi Nomor NPD"
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
                  ref="tglByr"
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
                Tanggal Kontrak
              </div>
              <div class="col-8 text-weight-bold">
                {{ dateFullFormat( store.kontrak.tglmulaikontrak) }}
              </div>
            </div>
            <div class="row fit q-col-gutter-sm items-center q-mb-xs">
              <div class="col-4">
                Nomor Pembayaran
              </div>
              <div class="col-8">
                <app-input
                  ref="refNoBayar"
                  v-model="store.form.no_pembayaran"
                  label="isi Nomor pembayaran"
                  outlined
                  :loading="store.loading"
                />
              </div>
            </div>
          </div>
          <!--
              <div class="col-6">
              <div class="row fit q-col-gutter-sm items-center q-mb-xs">
              <div class="col-4">
                Nama Penyedia
              </div>
              <div class="col-8 text-weight-bold">
                {{ store.kontrak.penenyedia?store.kontrak.penenyedia.nama:store.kontrak.namaperusahaan }}
              </div>
            </div>
          </div>
          -->
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
          <div class="col-2 text-right">
            {{ trm.nilai_tagihan?formatRpDouble(trm.nilai_tagihan,2):formatRpDouble(0,2) }}
          </div>
          <div class="col-2 text-right">
            <app-input
              ref="refBayar"
              v-model="trm.nilai_pembayaran"
              label="Nilai Belanja"
              outlined
              valid
              @update:model-value="setNilaiBelanja($event,trm)"
            />
            <!-- type="number"
              :rules="[val => val > 0 || 'Input tidak valid' ]" -->
          </div>
        </div>
        <div
          class="row fit q-col-gutter-sm f-16 text-weight-bold q-mb-sm"
        >
          <div class="col-9">
            Total Belanja
          </div>
          <div class="col-3 text-right">
            {{ formatRpDouble((store.penerimaans.map(a=>a.nilai_pembayaran).reduce((x,y)=>x+y,0)),2) }}
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
import { notifErrVue } from 'src/modules/utils'
import { usePembayaranStore } from 'src/stores/simrs/logistik/sigarang/transaksi/pembayaran/pembayaran'
import { ref } from 'vue'

const store = usePembayaranStore()
store.getKontraks()
store.getPenyedias()
function setTanggal(val) {
  store.setForm('tanggal_pembayaran', date.formatDate(val, 'YYYY-MM-DD'))
}
function setTanggalDisp(val) {
  store.setForm('tangl', val)
  console.log(store.form)
}

const refKwitansi = ref(null)
const refNoBayar = ref(null)
const tglByr = ref(null)
const refBayar = ref(null)

function setNilaiBelanja(evt, trm) {
  const value = !isNaN(parseFloat(evt)) ? (parseFloat(evt) < 0 ? 0 : parseFloat(evt)) : 0
  trm.nilai_pembayaran = value
  console.log('evt', parseFloat(evt), value)
  // console.log('evt', evt, 'trm', trm)
}
function simpan() {
  console.log('kwitansi', refKwitansi.value.$refs.refInput)
  const dbyr = store.penerimaans.filter(trm => trm.nilai_pembayaran > 0)
  if (tglByr.value.$refs.refInputDate.validate()) {
    const ada = []
    refBayar.value.forEach(belanja => {
      if (belanja.$refs.refInput.validate() === false) {
        ada.push(belanja.$refs.refInput.validate())
      }
    })
    const anu = ada.filter(a => a === false)
    // console.log('satu belanja', anu)
    if (anu.length) {
      notifErrVue('Semua BAST harus dibayar')
    } else {
      store.setForm('penerimaans', dbyr)
      store.simpanPembayaran().then(() => {
        tglByr.value.$refs.refInputDate.resetValidation()
        refKwitansi.value.$refs.refInput.resetValidation()
        refNoBayar.value.$refs.refInput.resetValidation()
      })
    }
    // console.log('bisa dibayar')
  } else {
    notifErrVue('Tanggal Pembayaran belum di isi')
  }
  // console.log(tglByr.value.$refs.refInputDate.validate())
  // console.log('simpan', store.form)
}

</script>
