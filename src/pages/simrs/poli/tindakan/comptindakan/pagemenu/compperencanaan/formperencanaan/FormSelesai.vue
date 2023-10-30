<template>
  <div>
    <q-form
      ref="formRef"
      @submit="simpan"
    >
      <div class="row q-col-gutter-sm">
        <div class="col-12">
          Pasien dinyatakan sudah tidak memerlukan kontrol ke poli ini
        </div>
        <div class="col-12">
          <q-separator class=" q-my-md" />
          <div class="text-right q-gutter-sm">
            <q-btn
              label="Simpan"
              color="primary"
              type="submit"
              :loading="store.loadingSaveSelesai"
              :disable="store.loadingSaveSelesai"
            />
          </div>
        </div>
      </div>
    </q-form>
  </div>
</template>

<script setup>
import { usePerencanaanPoliStore } from 'src/stores/simrs/pelayanan/poli/perencanaan'
import { ref } from 'vue'

const store = usePerencanaanPoliStore()
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

const formRef = ref()
function simpan() {
  store.saveSelesai(props.pasien)
}
</script>
