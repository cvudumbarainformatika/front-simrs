<!-- eslint-disable no-unused-vars -->
<template>
  <div class="garis-bawah q-pb-sm q-mb-md">
    <div
      class="row q-col-gutter-lg"
      style="margin-left: 50px;"
    >
      <div class="col-1">
        No. Reg
      </div>
      <div class="col-1">
        :
      </div>
      <div class="col-4">
        {{ pasien?.noreg }}
      </div>
      <div class="col-1">
        Nama
      </div>
      <div class="col-1">
        :
      </div>
      <div class="col-4">
        {{ pasien?.nama }}
      </div>
    </div>
    <div
      class="row q-col-gutter-lg"
      style="margin-left: 50px;"
    >
      <div class="col-1">
        No. RM
      </div>
      <div class="col-1">
        :
      </div>
      <div class="col-4">
        {{ pasien?.norm }}
      </div>
      <div class="col-1">
        Alamat
      </div>
      <div class="col-1">
        :
      </div>
      <div class="col-4">
        {{ pasien?.alamat }}
      </div>
    </div>
    <div
      class="row q-col-gutter-lg"
      style="margin-left: 50px;"
    >
      <div class="col-1">
        Tanggal Masuk
      </div>
      <div class="col-1">
        :
      </div>
      <div class="col-4">
        {{ pasien?.tgl_kunjungan }}
      </div>
      <div class="col-1">
        Umur
      </div>
      <div class="col-1">
        :
      </div>
      <div class="col-4">
        {{ pasien?.usia }}
      </div>
    </div>
    <div
      class="row q-col-gutter-lg"
      style="margin-left: 50px;"
    >
      <div class="col-1">
        Sistem Bayar
      </div>
      <div class="col-1">
        :
      </div>
      <div class="col-4">
        {{ pasien?.sistembayar }}
      </div>
      <div class="col-1">
        Kelamin
      </div>
      <div class="col-1">
        :
      </div>
      <div class="col-4">
        {{ pasien?.kelamin }}
      </div>
    </div>
    <div
      class="row q-col-gutter-lg"
      style="margin-left: 50px;"
    >
      <div class="col-1">
        Ruangan
      </div>
      <div class="col-1">
        :
      </div>
      <div class="col-4">
        {{ pasien?.poli }}
      </div>
      <div class="col-1">
        Dokter
      </div>
      <div class="col-1">
        :
      </div>
      <div class="col-4">
        {{ pasien?.dokter }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
// eslint-disable-next-line import/named
import { useDokumen } from 'src/stores/simrs/pelayanan/poli/dokument.js'

// eslint-disable-next-line no-unused-vars
const store = useDokumen()
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

</script>

<style lang="scss" scoped>

.garis-bawah{
  border-bottom: 2px solid rgba(0, 0, 0, 0.572);
}
</style>
