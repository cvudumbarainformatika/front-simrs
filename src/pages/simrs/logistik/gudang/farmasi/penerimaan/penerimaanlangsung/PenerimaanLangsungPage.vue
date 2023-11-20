<template>
  <div
    class="fixed-top row no-wrap items-center justify-between q-mx-sm bg-white"
    style="z-index: 10;"
  >
    <div>
      <div class="row items-center">
        <div class="q-mr-md">
          No Penerimaan:
        </div>
        <div class="q-mr-sm">
          {{ store.form.nopenerimaan? store.form.nopenerimaan :'-' }}
        </div>
        <!-- <app-input
          v-model="store.form.nopenerimaan"
          label="Nomor Penerimaan"
          readonly
          valid
          :loading="store.loading"
        /> -->
        <div class="q-ml-md">
          <q-btn
            v-if="store.form.nopenerimaan"
            flat
            icon="icon-mat-done"
            dense
            color="primary"
            @click="store.selesaiDanKunci()"
          >
            <q-tooltip
              class="primary"
              :offset="[10, 10]"
            >
              Selesai dan Kunci Penerimaan
            </q-tooltip>
          </q-btn>
        </div>
      </div>
    </div>
    <div>
      <q-btn
        flat
        :icon="!style.componentfull ? 'icon-mat-open_in_full' : 'icon-mat-close_fullscreen'"
        round
        :color="style.componentfull ? 'green' : 'primary'"
        size="12px"
        class="q-ml-md"
        @click="style.setComponentFull"
      />
    </div>
  </div>
  <!-- penerimaan -->
  <div class="q-mt-lg q-py-md q-px-sm">
    <!-- header -->
    <div class="row items-center q-col-gutter-md q-px-sm q-pb-md">
      <div class="col-6">
        <div class="row q-col-gutter-md no-wrap">
          <div class="col-12">
            <app-autocomplete-debounce-input
              ref="refPbf"
              v-model="store.form.kdpbf"
              label="Cari Penyedia"
              autocomplete="nama"
              option-label="nama"
              option-value="kode"
              :loading="store.loadingPihakTiga"
              :source="store.pihakTigas"
              :rules="[
                val => !!val || 'tidak boleh kosong'
              ]"
              @buang="cariPihakTiga"
            />
          </div>
        </div>

        <div class="row q-mb-xs">
          <div class="col-12">
            <app-autocomplete-new
              :model="store.form.jenispenerimaan"
              autocomplete="nama"
              option-label="nama"
              option-value="nama"
              label="Jenis Penerimaan"
              outlined
              :source="store.jenisPenerimaans"
              @on-select="store.jenisPenerimaanSelected"
              @clear="store.clearJenisPenerimaan"
            />
          </div>
        </div>

        <div class="row q-mb-xs">
          <div class="col-12">
            <app-autocomplete-new
              ref="refJenisSurat"
              :model="store.form.jenissurat"
              autocomplete="nama"
              option-label="nama"
              option-value="nama"
              label="Pilih Jenis Surat"
              outlined
              :source="store.jenisSuratLs"
              @on-select="store.jenisSuratSelected"
              @clear="store.clearJenisSurat"
            />
          </div>
        </div>
        <div class="row q-mb-xs">
          <div class="col-12">
            <app-input
              ref="refNoSurat"
              v-model="store.form.nomorsurat"
              label="Nomor Surat"
              outlined
            />
          </div>
        </div>
        <div class="row q-mb-xs">
          <div class="col-12">
            <app-input
              ref="refPengirim"
              v-model="store.form.pengirim"
              label="Nama Pengirim"
              outlined
            />
          </div>
        </div>
      </div>
      <div class="col-6">
        <div class="row q-mb-xs">
          <div class="col-12">
            <app-autocomplete-new
              ref="refGudang"
              :model="store.form.gudang"
              autocomplete="nama"
              option-label="nama"
              option-value="value"
              label="Pilih Gudang"
              outlined
              :source="store.gudangs"
              @on-select="store.gudangSelected"
              @clear="store.clearGudang"
            />
          </div>
        </div>

        <div class="row q-mb-xs">
          <div class="col-12">
            <app-input-date-human
              :model="store.disp.tanggal"
              label="Tanggal Transaksi"
              outlined
              @set-display="dispTanggal"
              @db-model="setTanggal"
            />
          </div>
        </div>
        <div class="row q-mb-xs">
          <div class="col-12">
            <app-input-date-human
              :model="store.disp.surat"
              label="Tanggal Surat"
              outlined
              @set-display="dispSurat"
              @db-model="setSurat"
            />
          </div>
        </div>
        <div class="row q-mb-xs">
          <div class="col-12">
            <app-input-date-human
              :model="store.disp.tempo"
              label="Batas Akhir Pembayaran"
              outlined
              @set-display="dispTempo"
              @db-model="setTempo"
            />
          </div>
        </div>
        <div class="row q-mb-xs">
          <div class="col-12">
            <app-input
              ref="refTotalFaktur"
              v-model="store.form.total_faktur_pbf"
              label="Total Faktur PBF"
              outlined
              :rules="[
                val => !isNaN(val) || 'Harus pakai Nomor'
              ]"
            />
          </div>
        </div>
      </div>
    </div>
    <q-separator />
    <!-- detail -->
  </div>
</template>
<script setup>
import { useStyledStore } from 'src/stores/app/styled'
import { usePenerimaanFarmasiStore } from 'src/stores/simrs/farmasi/penerimaan/penerimaan'

const style = useStyledStore()
const store = usePenerimaanFarmasiStore()

function setTanggal (val) {
  store.setForm('tanggal', val)
}
function dispTanggal (val) {
  store.setDisp('tanggal', val)
}

function setSurat (val) {
  store.setForm('surat', val)
}
function dispSurat (val) {
  store.setDisp('surat', val)
}

function setTempo (val) {
  store.setForm('tempo', val)
}
function dispTempo (val) {
  store.setDisp('tempo', val)
}

function cariPihakTiga (val) {
  console.log('cari pihak tiga', val)
  store.namaPihakKetiga = val
  store.getPihakKetiga()
}

</script>
