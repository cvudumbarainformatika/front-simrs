<template>
  <div class="q-mb-xl">
    <div class="q-pa-md">
      <!-- Nomor BAST -->
      <div class="row q-col-gutter-sm items-center q-mb-sm">
        <div class="col-2">
          BAST
        </div>
        <div class="col-1">
          :
        </div>
        <div class="col-9">
          <app-autocomplete-new
            v-model="store.form.nobast"
            label="pilih Nomor BAST"
            debounce="700"
            autocomplete="nobast"
            option-label="nobast"
            option-value="nobast"
            outlined
            valid
            :loading="store.loadingCari"
            :source="store.basts"
            @on-select="store.bastSelected"
          />
        </div>
      </div>
      <!-- Nomor Pemesanan -->
      <div class="row q-col-gutter-sm items-center q-mb-sm">
        <div class="col-2">
          Nomor Surat Pesanan
        </div>
        <div class="col-1">
          :
        </div>
        <div class="col-9">
          <app-input
            v-model="store.form.nopemesanan"
            label="nomor Pemesanan"
            outlined
            valid
            readonly
          />
        </div>
      </div>
      <!-- Nomor kwitansi -->
      <div class="row q-col-gutter-sm items-center q-mb-sm">
        <div class="col-2">
          Nomor Kwitansi
        </div>
        <div class="col-1">
          :
        </div>
        <div class="col-9">
          <app-input
            ref="refNoKwitansi"
            v-model="store.form.no_kwitansi"
            label="nomor kwitansi keuangan"
            outlined
          />
        </div>
      </div>
      <!-- tanggal pembayaran -->
      <div class="row q-col-gutter-sm items-center q-mb-sm">
        <div class="col-2">
          Tanggal Pembayaran
        </div>
        <div class="col-1">
          :
        </div>
        <div class="col-9">
          <app-input-date-human
            ref="refTglBayar"
            :model="store.form.tanggalByr"
            label="Tanggal Pembayaran"
            outlined
            @set-display="setTanggalByrDisp"
            @db-model="setTanggalByr"
          />
        </div>
      </div>
      <!-- Nomor NPD -->
      <div class="row q-col-gutter-sm items-center q-mb-sm">
        <div class="col-2">
          Nomor NPD
        </div>
        <div class="col-1">
          :
        </div>
        <div class="col-9">
          <app-input
            ref="refNpd"
            v-model="store.form.no_npd"
            label="nomor NPD"
            outlined
          />
        </div>
      </div>
      <!-- tanggal pencairan -->
      <div class="row q-col-gutter-sm items-center q-mb-sm">
        <div class="col-2">
          Tanggal Pencairan
        </div>
        <div class="col-1">
          :
        </div>
        <div class="col-9">
          <app-input-date-human
            ref="refTglCair"
            :model="store.form.tanggalCair"
            label="Tanggal Pencairan"
            outlined
            @set-display="setTanggalCairDisp"
            @db-model="setTanggalCair"
          />
        </div>
      </div>
      <!-- jumlah pembayaran -->
      <div class="row q-col-gutter-sm items-center q-mb-sm">
        <div class="col-2">
          Jumlah Pembayaran
        </div>
        <div class="col-1">
          :
        </div>
        <div class="col-9">
          <app-input
            ref="refJmlBayar"
            v-model="store.form.total_pembayaran"
            label="jumlah pembayaran"
            outlined
            @update:model-value="setJmBayar($event)"
          />
        </div>
      </div>
      <!-- tombol simpan -->
      <div class="row items-center q-my-sm justify-end">
        <app-btn
          label="Simpan Pembayaran"
          :disable=" store.loading || !store.form.nobast "
          :loading="store.loading"
          @click="simpanPembayaran"
        />
      </div>
    </div>
    <div class="bg-grey q-pa-sm text-white f-16 q-mb-md">
      Daftar Penerimaan
    </div>
    <div>
      <div v-if="store.loadingAmbil">
        <app-loading />
      </div>
      <div v-if="!store.loadingAmbil && !store.penerimaans.length">
        <app-no-data />
      </div>
      <div v-if="!store.loadingAmbil && store.penerimaans.length">
        <div class="row bg-dark text-white q-px-sm q-py-xs q-mb-sm">
          <div
            class="col-auto"
            style="width:3%"
          >
            No
          </div>
          <div
            class="col-auto"
            style="width:32%"
          >
            Nomor Penerimaan
          </div>
          <div
            class="col-auto text-right"
            style="width:15%"
          >
            Nilai Penerimaan
          </div>
          <div
            class="col-auto text-right"
            style="width:15%"
          >
            Nilai Retur
          </div>
          <div
            class="col-auto  text-right"
            style="width:15%"
          >
            Nilai Tagihan
          </div>
          <div
            class="col-auto text-right"
            style="width:15%"
          >
            Nilai Pembayaran
          </div>
        </div>
        <div
          v-for="(trm,i) in store.penerimaans"
          :key="i"
        >
          <div class="row items-center q-mb-sm q-px-sm">
            <div
              class="col-auto"
              style="width:3%"
            >
              {{ i+1 }}
            </div>
            <div
              class="col-auto"
              style="width:32%"
            >
              {{ trm?.nopenerimaan }}
            </div>
            <div
              class="col-auto text-right"
              style="width:15%"
            >
              {{ formatRpDouble(trm?.nilai_penerimaan,2) }}
            </div>
            <div
              class="col-auto text-right"
              style="width:15%"
            >
              {{ formatRpDouble(trm?.nilai_retur,2) }}
            </div>
            <div
              class="col-auto  text-right"
              style="width:15%"
            >
              {{ formatRpDouble(trm?.nilai_tagihan,2) }}
            </div>
            <div
              class="col-auto text-right"
              style="width:15%"
            >
              {{ formatRpDouble(trm?.nilai_pembayaran,2) }}
            </div>
          </div>
        </div>
        <div class="row bg-dark text-white q-px-sm q-py-xs q-mb-sm">
          <div
            class="col-auto  text-right"
            style="width:80%"
          >
            Total
          </div>
          <div
            class="col-auto text-right"
            style="width:15%"
          >
            {{ formatRpDouble(store.penerimaans[0].jumlah_bast,2) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { formatRpDouble } from 'src/modules/formatter'
import { notifErrVue } from 'src/modules/utils'
import { useFarmasiPembayaranPenerimaanStore } from 'src/stores/simrs/farmasi/pembayaran/pembayaran'
import { onBeforeMount, ref } from 'vue'
const store = useFarmasiPembayaranPenerimaanStore()

const refNoKwitansi = ref(null)
const refTglBayar = ref(null)
const refNpd = ref(null)
const refTglCair = ref(null)
const refJmlBayar = ref(null)

function setTanggalByrDisp (val) {
  store.setForm('tanggalByr', val)
}
function setTanggalByr (val) {
  console.log('tgl_pembayaran', val)
  store.setForm('tgl_pembayaran', val)
}
function setTanggalCairDisp (val) {
  store.setForm('tanggalCair', val)
}
function setTanggalCair (val) {
  store.setForm('tgl_pencairan_npk', val)
}
function setJmBayar (evt) {
  const inc = evt.includes('.')
  const ind = evt.indexOf('.')
  const panj = evt.length
  const nilai = isNaN(parseFloat(evt)) ? 0 : (inc && (ind === (panj - 2)) ? evt : parseFloat(evt))
  store.setForm('total_pembayaran', nilai)
}
function resetValidation () {
  refTglBayar.value.$refs.refInputDate.resetValidation()
  refTglCair.value.$refs.refInputDate.resetValidation()

  refNoKwitansi.value.$refs.refInput.resetValidation()
  refNpd.value.$refs.refInput.resetValidation()
  refJmlBayar.value.$refs.refInput.resetValidation()
}
function validate () {
  console.log(refNoKwitansi.value.$refs.refInput)
  console.log(refTglBayar.value.$refs.refInputDate)
  const tglByr = refTglBayar.value.$refs.refInputDate.validate()
  const tglCair = refTglCair.value.$refs.refInputDate.validate()

  const noKwitansi = refNoKwitansi.value.$refs.refInput.validate()
  const noNpd = refNpd.value.$refs.refInput.validate()
  const noJmlBayar = refJmlBayar.value.$refs.refInput.validate()
  if (tglByr && tglCair && noKwitansi && noNpd && noJmlBayar) return true
  else return false
}
function simpanPembayaran () {
  if (!validate()) return notifErrVue('Periksa Kembali Input Anda')
  store.setForm('penerimaans', store.penerimaans)
  console.log(store.form)
  store.simpanPembayaran().then(() => {
    resetValidation()
  })
}
onBeforeMount(() => {
  store.getInitialData()
})
</script>
