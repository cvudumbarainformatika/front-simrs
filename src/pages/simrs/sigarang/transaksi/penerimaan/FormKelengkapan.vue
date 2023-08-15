<template>
  <div>
    <app-no-data v-if="!Object.keys(kelengkapan.form).length" />
    <div v-if="Object.keys(kelengkapan.form).length">
      <div class="col-md-6 col-xs-12">
        <div class="row q-col-gutter-md q-mb-sm items-center">
          <div class="col-md-4 col-xs-12">
            Tanggal Surat Jalan
          </div>
          <div class="col-md-6 col-xs-12">
            <app-input-date
              ref="refTanggalSurat"
              :model="kelengkapan.form.tanggal_surat"
              icon="icon-mat-event"
              outlined
              label="Tanggal*"
              @set-model="setSurat"
            />
          </div>
        </div>

        <div class="row q-col-gutter-md q-mb-sm items-center">
          <div class="col-md-4 col-xs-12">
            Nomor Surat Jalan
          </div>
          <div class="col-md-6 col-xs-12">
            <app-input
              ref="refNomorSurat"
              v-model="kelengkapan.form.surat_jalan"
              input-class="text-left"
              label="Nomor Surat*"
              outlined
            />
            <!-- @update:model-value="kelengkapan.inputSurat" -->
          </div>
        </div>

        <div class="row q-col-gutter-md q-mb-sm items-center">
          <div class="col-md-4 col-xs-12">
            Tanggal Faktur
          </div>
          <div class="col-md-6 col-xs-12">
            <app-input-date
              ref="refTanggalFaktur"
              :model="kelengkapan.form.tanggal_faktur"
              icon="icon-mat-event"
              outlined
              label="Tanggal*"
              @set-model="setFaktur"
            />
          </div>
        </div>

        <div class="row q-col-gutter-md q-mb-sm items-center">
          <div class="col-md-4 col-xs-12">
            Nomor Faktur
          </div>
          <div class="col-md-6 col-xs-12">
            <app-input
              ref="refNomorFaktur"
              v-model="kelengkapan.form.faktur"
              input-class="text-left"
              label="Nomor Faktur*"
              outlined
            />
            <!-- @update:model-value="kelengkapan.inputSurat" -->
          </div>
        </div>

        <div class="row q-col-gutter-md q-mb-sm items-center">
          <div class="col-md-4 col-xs-12">
            Batas Akhir Pembayaran (tempo)
          </div>
          <div class="col-md-6 col-xs-12">
            <app-input-date
              ref="refTempo"
              :model="kelengkapan.form.tempo"
              icon="icon-mat-event"
              outlined
              label="Tempo"
              @set-model="setModel"
            />
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="Object.keys(kelengkapan.form).length"
      class="row q-col-gutter-md q-mb-sm items-center"
    >
      <div class="col-md-5 col-xs-12" />
      <div class="col-md-3 col-xs-12">
        <app-btn
          label="Batal"
          color="dark"
          :disable="kelengkapan.loading"
          @click="onCacel"
        />
      </div>
      <div class="col-md-1 col-xs-12" />
      <div class="col-md-3 col-xs-12">
        <app-btn
          label="Simpan"
          color="primary"
          :loading="kelengkapan.loading"
          @click="onSimpan"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import { useKelengkapanSuratPenerimaan } from 'src/stores/simrs/logistik/sigarang/transaksi/penerimaan/kelengkapan'

const kelengkapan = useKelengkapanSuratPenerimaan()
const onSimpan = () => {
  // console.log('simpan')
  kelengkapan.simpanSurat().then(() => {
    kelengkapan.emptyForm()
  })
}
const onCacel = () => {
  kelengkapan.emptyForm()
}
const setModel = val => {
  kelengkapan.setForm('tempo', val)
  kelengkapan.setForm('tempo', val)
  // console.log('tempo', val)
}
const setSurat = val => {
  kelengkapan.setForm('tanggal_surat', val)
}
const setFaktur = val => {
  kelengkapan.setForm('tanggal_faktur', val)
}
</script>
