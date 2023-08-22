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
        <app-input
          v-model="store.form.nopenerimaan"
          label="Nomor Penerimaan"
          :filled="false"
          readonly
          valid
          :loading="store.loading"
        />
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
    <div class="row items-center q-col-gutter-md q-px-sm">
      <div class="col-6">
        <div class="row">
          <div class="col-4">
            Nama Penyedia :
          </div>
          <div class="col-8 text-orange">
            {{ store.namaPenyedia }}
          </div>
        </div>

        <div class="row">
          <div class="col-12">
            <app-autocomplete-new
              :model="store.form.nopemesanan"
              autocomplete="nopemesanan"
              option-label="nopemesanan"
              option-value="nopemesanan"
              label="Pilih Pemesanan"
              :filled="false"
              :source="store.pemesanans"
              @on-select="store.pemesananSelected"
              @clear="store.clearPemesanan"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <app-autocomplete-new
              :model="store.form.jenisPenerimaan"
              autocomplete="nama"
              option-label="nama"
              option-value="nama"
              label="Pilih Jenis Penerimaan"
              :filled="false"
              :source="store.jenisPenerimaans"
              @on-select="store.jenisPenerimaanSelected"
              @clear="store.clearJenisPenerimaan"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <app-autocomplete-new
              :model="store.form.jenisSurat"
              autocomplete="nama"
              option-label="nama"
              option-value="nama"
              label="Pilih Jenis Surat"
              :filled="false"
              :source="store.jenisSurats"
              @on-select="store.jenisSuratSelected"
              @clear="store.clearJenisSurat"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <app-input
              v-model="store.form.pengirim"
              label="Nama Pengirim"
              :filled="false"
            />
          </div>
        </div>
      </div>
      <div class="col-6">
        <div class="row">
          <div class="col-12">
            <app-input
              v-model="store.form.no_surat"
              label="Nomor Surat"
              :filled="false"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <app-input-date-human
              :model="store.disp.tanggal"
              label="Tanggal Transaksi"
              :filled="false"
              @set-display="dispTanggal"
              @db-modet="setTanggal"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <app-input-date-human
              :model="store.disp.surat"
              label="Tanggal Surat"
              :filled="false"
              @set-display="dispSurat"
              @db-modet="setSurat"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <app-input-date-human
              :model="store.disp.tempo"
              label="Batas Akhir Pembayaran"
              :filled="false"
              @set-display="dispTempo"
              @db-modet="setTempo"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="row items-center q-mt-md">
      detail
    </div>
  </div>
</template>
<script setup>
import { useStyledStore } from 'src/stores/app/styled'
import { usePenerimaanFarmasiStore } from 'src/stores/simrs/farmasi/penerimaan/penerimaan'

const style = useStyledStore()
const store = usePenerimaanFarmasiStore()

function setTanggal(val) {
  store.setForm('tanggal', val)
}
function dispTanggal(val) {
  store.setDisp('tanggal', val)
}

function setSurat(val) {
  store.setForm('surat', val)
}
function dispSurat(val) {
  store.setDisp('surat', val)
}

function setTempo(val) {
  store.setForm('tempo', val)
}
function dispTempo(val) {
  store.setDisp('tempo', val)
}

store.getInitialData()
</script>
