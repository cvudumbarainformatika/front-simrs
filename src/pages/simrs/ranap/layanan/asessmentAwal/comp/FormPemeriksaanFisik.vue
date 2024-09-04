<template>
  <div class="row q-col-gutter-md">
    <div class="col-6">
      <div class="text-weight-bold">
        Keadaan Umum dan Tanda Vital (Vital Sign)
      </div>
      <div class="text-grey-8 f-10">
        Riwayat alergi yang pernah dialami
        oleh pasien
      </div>

      <q-separator class="q-my-sm" />
      <app-input-simrs v-model="store.form.keadaanUmum" label="Keadaan Umum" />
      <app-input-simrs v-model="store.form.keadaanUmum" label="Keadaan Umum" />
    </div>
  </div>
</template>

<script setup>
import { useAsesmentAwalKeperawatanRanapStore } from 'src/stores/simrs/ranap/asesmentAwalKeperawatan'
// import { computed } from 'vue'
const store = useAsesmentAwalKeperawatanRanapStore()

</script>
