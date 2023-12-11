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
        <div class="row q-col-gutter-md no-wrap q-mb-xs">
          <div class="col-12">
            <app-autocomplete-debounce-input
              ref="refPbf"
              v-model="store.form.kdpbf"
              label="Cari Penyedia"
              autocomplete="nama"
              option-label="nama"
              option-value="kode"
              outlined
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
    <q-separator class="q-mb-xs" />
    <!-- detail -->
    <div class="row items-center q-col-gutter-sm">
      <div class="col-4">
        <app-autocomplete-new
          :model="store.form.kdobat"
          autocomplete="namaobat"
          option-label="namaobat"
          option-value="kodeobat"
          label="Pilih Obat"
          outlined
          :source="store.obats"
          :loading="store.loadingCari"
          @on-select="store.obatSelected"
          @clear="store.clearObat"
          @buang="cariObat"
        />
      </div>
      <div class="col-2">
        <app-input
          v-model="store.form.isi"
          label="konversi satuan besar ke kecil"
          outlined
          @update:model-value="setIsi($event)"
        />
      </div>
      <div class="col-2">
        <div class="row text-italic f-10">
          satuan :
        </div>
        <div class="row">
          <div
            v-if="store.form.satuan_bsr"
          >
            <div class="text-weight-bold">
              1 {{ store.form.satuan_bsr }}
            </div>
          </div>
          <div
            v-if="store.form.satuan_kcl"
            class="q-ml-sm"
          >
            <div class="text-weight-bold">
              = {{ store.form.isi }} {{ store.form.satuan_kcl }}
            </div>
          </div>
          <div v-else>
            obat belum dipilih
          </div>
        </div>
      </div>

      <div class="col-3">
        <app-input
          v-model="store.form.jml_pesan"
          label="Jumlah"
          outlined
          @update:model-value="setJumlah($event)"
        />
      </div>
      <div class="col-2">
        <app-input
          v-model="store.form.harga"
          label="Harga (satuan besar)"
          outlined
          @update:model-value="setHarga($event)"
        />
      </div>
      <div class="col-2">
        <app-input
          v-model="store.form.diskon"
          label="Diskon"
          outlined
          @update:model-value="setDiskon($event)"
        />
      </div>
      <div class="col-2">
        <app-input
          v-model="store.form.ppn"
          label="ppn"
          outlined
          @update:model-value="setPpn($event)"
        />
      </div>
      <div class="col-2">
        harga netto : {{ formatRp(store.form.harga_netto) }}
      </div>
      <div class="col-3">
        subtotal : {{ formatRp(store.form.subtotal) }}
      </div>
      <div class="col-2">
        <app-input
          v-model="store.form.no_batch"
          label="No Batch"
          outlined
        />
      </div>
      <div class="col-2">
        <app-input-date-human
          :model="store.disp.tgl_exp"
          label="Tanggal Kadaluarsa"
          outlined
          @set-display="store.setDisp('tgl_exp', $event)"
          @db-model="store.setForm('tgl_exp', $event)"
        />
      </div>
      <div class="col-2">
        <app-input
          v-model="store.form.no_retur_rs"
          label="No Retur Rs"
          outlined
        />
      </div>
      <!-- <div class="col-3">
        <app-input
          v-model="store.form.pengirim"
          label="Pengirim"
          outlined
        />
      </div> -->
    </div>
    <div class="row items-center justify-end q-mr-sm q-mt-md">
      <div>
        <q-btn
          label="Simpan obat"
          no-caps
          icon="icon-mat-save"
          color="primary"
          push
          :loading="store.loading"
          :disable="store.loading"
          @click="simpan()"
        >
          <q-tooltip
            class="primary"
            :offset="[10, 10]"
          >
            Simpan Rincian Penerimaan
          </q-tooltip>
        </q-btn>
      </div>
    </div>
  </div>
</template>
<script setup>
import { formatRp } from 'src/modules/formatter'
import { useStyledStore } from 'src/stores/app/styled'
import { usePenerimaanLangsungFarmasiStore } from 'src/stores/simrs/farmasi/penerimaan/penerimaanlangsung'

const style = useStyledStore()
const store = usePenerimaanLangsungFarmasiStore()
function setIsi(val) {
  const temp = !isNaN(parseFloat(val)) ? parseFloat(val) : 0
  store.setForm('isi', temp)
}
function setJumlah(val) {
  const temp = !isNaN(parseFloat(val)) ? parseFloat(val) : 0
  store.setForm('jml_pesan', temp)
}
function setHarga(val) {
  const temp = !isNaN(parseFloat(val)) ? parseFloat(val) : 0
  store.setForm('harga', temp)
}
function setDiskon(val) {
  const temp = !isNaN(parseFloat(val)) ? parseFloat(val) : 0
  store.setForm('diskon', temp)
}
function setPpn(val) {
  const temp = !isNaN(parseFloat(val)) ? parseFloat(val) : 0
  store.setForm('ppn', temp)
}
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
  store.setForm('batasbayar', val)
}
function dispTempo (val) {
  store.setDisp('tempo', val)
}

function cariPihakTiga (val) {
  console.log('cari pihak tiga', val)
  store.namaPihakKetiga = val
  store.getPihakKetiga()
}
function myDebounce(func, timeout = 800) {
  let timer
  return (...arg) => {
    clearTimeout(timer)
    timer = setTimeout(() => { func.apply(this, arg) }, timeout)
  }
}
const cariObat = myDebounce((val) => {
  store.getDataObat(val)
})

function simpan() {
  console.log('from ', store.form)
}
</script>
