<template>
  <div class="bg-secondary q-pa-md">
    <div class="row items-center justify-between">
      <div class="col">
        <div class="f-14 text-weight-bold">
          {{ pasien? pasien.norm:'-' }}
        </div>
        <div class="f-14 text-weight-bold text-dark">
          {{ pasien? pasien.nama : '-' }}
        </div>
        <div>{{ pasien?pasien.templahir:'-' }}, {{ pasien?pasien.tgllahir:'-' }} | <span class="text-dark">{{ pasien? pasien.usia:'-' }}</span></div>
        <div>Status Pasien</div>
      </div>
      <div class="col text-right">
        <!-- {{ pasien }} -->
        <div class="f-16 text-weight-bold text-dark">
          {{ pasien? pasien.dokter:'-' }}
        </div>
        <div class="f-14 text-weight-bold">
          {{ pasien? pasien.poli:'-' }}
        </div>
        <div>MASUK : {{ pasien?pasien.tgl_kunjungan:'-' }}</div>
        <div class="text-weight-bold text-negative">
          {{ pasien?pasien.sistembayar:'-' }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  pasien: {
    type: Object,
    default: null
  }
})
</script>
