<template>
  <div>
    <div class="row q-mt-sm q-col-gutter-sm">
      <div class="col-6">
        <div
          v-if="props.header.nomor"
          class="row q-mt-sm"
        >
          <div class="col-4">
            Nomor Pemesanan
          </div>
          <div class="col-6">
            {{ props.header.nomor }}
          </div>
        </div>

        <div
          v-if="props.header.no_penerimaan"
          class="row q-mt-sm"
        >
          <div class="col-4">
            Nomor Penerimaan
          </div>
          <div class="col-6">
            {{ props.header.no_penerimaan }}
          </div>
        </div>

        <div
          v-if="props.header.no_permintaan"
          class="row q-mt-sm"
        >
          <div class="col-4">
            Nomor Permintaan
          </div>
          <div class="col-6">
            {{ props.header.no_permintaan }}
          </div>
        </div>

        <div
          v-if="props.header.no_distribusi"
          class="row q-mt-sm"
        >
          <div class="col-4">
            Nomor Distribusi
          </div>
          <div class="col-6">
            {{ props.header.no_distribusi }}
          </div>
        </div>

        <div class="row q-mt-sm">
          <div class="col-4">
            Tanggal
          </div>
          <div class="col-6">
            {{ dateFullFormat(props.header.tanggal) }}
          </div>
        </div>

        <div
          v-if="props.header.tanggal_verif"
          class="row q-mt-sm"
        >
          <div class="col-4">
            Tanggal Verif
          </div>
          <div class="col-6">
            {{ dateFull(props.header.tanggal_verif) }}
          </div>
        </div>

        <div
          v-if="props.header.tanggal_distribusi"
          class="row q-mt-sm"
        >
          <div class="col-4">
            Tanggal Distribusi
          </div>
          <div class="col-6">
            {{ dateFull(props.header.tanggal_distribusi) }}
          </div>
        </div>
      </div>
      <div class="col-6">
        <div
          v-if="props.header.kontrak"
          class="row q-mt-sm"
        >
          <div class="col-4">
            Nomor Kontrak
          </div>
          <div class="col-6">
            {{ props.header.kontrak }}
          </div>
        </div>

        <div
          v-if="props.header.perusahaan"
          class="row q-mt-sm"
        >
          <div class="col-4">
            Nama Perusahaan
          </div>
          <div class="col-6">
            {{ props.header.perusahaan?props.header.perusahaan.nama:'-' }}
          </div>
        </div>

        <div
          v-if="props.header.pengguna"
          class="row q-mt-sm"
        >
          <div class="col-4">
            Nama Pengguna
          </div>
          <div class="col-6">
            {{ props.header.pengguna?props.header.pengguna.jabatan:'-' }}
          </div>
        </div>

        <div
          v-if="props.header.pj"
          class="row q-mt-sm"
        >
          <div class="col-4">
            Nama Penanggungjawab
          </div>
          <div class="col-6">
            {{ props.header.pj?props.header.pj.jabatan:'-' }}
          </div>
        </div>

        <div
          v-if="props.header.depo"
          class="row q-mt-sm"
        >
          <div class="col-4">
            Depo
          </div>
          <div class="col-6">
            {{ props.header.depo?props.header.depo.nama:'-' }}
          </div>
        </div>

        <div
          v-if="props.header.total"
          class="row q-mt-sm"
        >
          <div class="col-4">
            Total
          </div>
          <div class="col-6">
            {{ formatRp(props.header.total) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { dateFull, dateFullFormat, formatRp } from 'src/modules/formatter'

const props = defineProps({
  header: { type: Object, default: () => {} }
})

</script>
