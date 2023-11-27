<template>
  <div>
    <q-form
      ref="formRef"
      @submit="simpan"
    >
      <div class="row q-col-gutter-sm">
        <div class="col-5">
          <app-input-date
            :model="store.formKontrol.tglrencanakunjungan"
            label="Tgl Rencana Kontrol"
            outlined
            @set-model="gantiTanggal"
          />
        </div>
        <div class="col-5">
          <app-autocomplete
            :key="store.formKontrol.kodedokterdpjp"
            v-model="store.formKontrol.kodedokterdpjp"
            outlined
            label="Pilih Dokter"
            autocomplete="namadokter"
            option-label="namadokter"
            option-value="kodedokter"
            :loading="store.loadingJadwalDokter"
            :disable="store.loadingJadwalDokter"
            :source="store.jadwalDpjps"
          />
        </div>
        <div class="col-12">
          <q-separator class=" q-my-md" />
          <div class="text-right q-gutter-sm">
            <q-btn
              label="Simpan"
              color="primary"
              type="submit"
              :loading="store.loadingSaveKontrol"
              :disable="store.loadingSaveKontrol"
            />
          </div>
        </div>
      </div>
    </q-form>
  </div>
</template>

<script setup>
import { usePerencanaanPoliStore } from 'src/stores/simrs/pelayanan/poli/perencanaan'
import { ref, onMounted } from 'vue'

const store = usePerencanaanPoliStore()
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

const formRef = ref()
function simpan() {
  store.saveKontrol(props.pasien)
}
function gantiTanggal(val) {
  store.setFormKontrol('tglrencanakunjungan', val)
  store.getjadwalDokterDpjp(props.pasien, val)
}
onMounted(() => {
  store.getjadwalDokterDpjp(props.pasien, false)
})
</script>
