<template>
  <q-dialog position="right">
    <q-card style="width: 500px; height: 100vh">
      <q-card-section class="column full-height q-pa-none">
        <div class="col-auto q-pa-md">
          <div class="text-weight-bold">
            History Pra Anastesi (Rajal)
          </div>
          <div class="text-grey">
            Diambil dari Poli Anestesi Kunjungan Terakhir
          </div>
        </div>
        <div class="col full-height scroll bg-grey-4 q-pa-lg">
          {{ data }}
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { onMounted } from 'vue'

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  },
  data: {
    type: Object,
    default: null
  }
})

onMounted(() => {
  console.log(props.pasien)
})

</script>
