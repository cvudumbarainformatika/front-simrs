<template>
  <div class="column full-height">
    <q-bar class="col-auto bg-dark text-white">
      <div class="q-py-sm f-14 ">
        Form Permintaan Operasi
      </div>
    </q-bar>
    <div class="col full-height">
      <q-scroll-area style="height: calc(100% - 1px);">
        <q-form
          ref="formRef"
          class="row q-pa-md q-col-gutter-xs"
          @submit="saveOrder"
        >
          <div class="col-12">
            <q-input
              v-model="store.form.permintaan"
              label="Permintaan"
              autogrow
              outlined
              standout="bg-yellow-3"
              icon="icon-mat-search"
              :rules="[val => !!val || 'Harap Isi pemeriksaan terlebih dahulu']"
              hide-bottom-space
            />
          </div>

          <div class="col-12">
            <q-separator class="q-my-sm" />
          </div>
          <div class="col-12">
            <div class="text-right">
              <q-btn
                label="Simpan & Kirim Permintaan"
                type="submit"
                color="primary"
                :loading="store.loadingSave"
                :disable="store.loadingSave"
              />
            </div>
          </div>
        </q-form>
      </q-scroll-area>
    </div>
  </div>
</template>

<script setup>
import { useOperasiPoli } from 'src/stores/simrs/pelayanan/poli/operasi'
import { onMounted, ref } from 'vue'

const store = useOperasiPoli()
const formRef = ref()
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})
console.log(props?.peasien)

function saveOrder() {
  store.saveOrder(props.pasien).then(() => {
    formRef.value.resetValidation()
  })
}
onMounted(() => {
  formRef.value.resetValidation()
})
</script>
