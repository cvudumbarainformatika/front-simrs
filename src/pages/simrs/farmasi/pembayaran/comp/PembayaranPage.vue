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
            ref="refNoBast"
            v-model="store.form.nopemesanan"
            label="nomor Pemesanan"
            outlined
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
            @set-model="setTanggalByr"
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
            @set-model="setTanggalCair"
          />
        </div>
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
import { useFarmasiPembayaranPenerimaanStore } from 'src/stores/simrs/farmasi/pembayaran/pembayaran'
import { onBeforeMount, ref } from 'vue'
const store = useFarmasiPembayaranPenerimaanStore()

const refNoKwitansi = ref(null)
const refTglBayar = ref(null)
const refNpd = ref(null)
const refTglCair = ref(null)

function setTanggalByrDisp(val) {
  store.setForm('tanggalByr', val)
}
function setTanggalByr(val) {
  store.setForm('tgl_pembayaran', val)
}
function setTanggalCairDisp(val) {
  store.setForm('tanggalCair', val)
}
function setTanggalCair(val) {
  store.setForm('tgl_pencairan_npk', val)
}
onBeforeMount(() => {
  store.getInitialData()
})
</script>
