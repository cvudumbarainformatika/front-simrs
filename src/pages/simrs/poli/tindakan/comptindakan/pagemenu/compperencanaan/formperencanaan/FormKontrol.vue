<template>
  <div>
    <q-form
      ref="formRef"
      @submit="simpan"
    >
      <div class="row q-col-gutter-sm">
        <div class="col-5">
          <app-input-date
            :model="store.formKontrol.tgl_rencana_kontrol"
            label="Tgl Rencana Kontrol"
            outlined
            @set-model="(val) => store.setFormKontrol('tgl_rencana_kontrol', val)"
          />
        </div>
        <!-- <div class="col-7">
          <q-select
            v-model="store.formKonsul.kdpoli_tujuan"
            label="Poli Tujuan"
            dense
            outlined
            standout="bg-yellow-3"
            option-value="rs1"
            option-label="rs2"
            emit-value
            map-options
            use-input
            input-debounce="0"
            :options="store.poli"
          />
        </div> -->
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
  store.saveKontrol(props.pasien)
}
</script>
