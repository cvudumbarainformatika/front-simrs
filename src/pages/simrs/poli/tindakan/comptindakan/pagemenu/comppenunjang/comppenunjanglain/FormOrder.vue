<template>
  <div class="column full-height">
    <q-bar class="col-auto bg-dark text-white">
      <div class="q-py-sm f-14 ">
        Form Order Penunjang Lain
      </div>
    </q-bar>
    <div class="col full-height">
      <q-scroll-area style="height: calc(100% - 1px);">
        <q-form
          ref="formRef"
          class="row q-pa-md q-col-gutter-xs"
          @submit="saveOrder"
        >
          <div class="col-6">
            <q-select
              v-model="store.form.kodepenunjang"
              label="Penunjang Tujuan"
              dense
              outlined
              standout="bg-yellow-3"
              use-input
              input-debounce="0"
              :options="store.penunjangs"
              option-label="nama"
              option-value="kode"
              emit-value
              map-options
              :rules="[val => !!val || 'Harap Pilih Tujuan Permintaan']"
              hide-bottom-space
            />
          </div>
          <div class="col-12">
            <q-input
              v-model="store.form.keterangan"
              label="Keterangan"
              autogrow
              outlined
              standout="bg-yellow-3"
            />
          </div>

          <div class="col-12">
            <q-separator class=" q-my-lg" />
            <div class="text-right q-gutter-sm">
              <q-btn
                label="Simpan & Kirim Order"
                color="primary"
                type="submit"
                :loading="store.loadingOrder"
                :disable="store.loadingOrder"
              />
            </div>
          </div>
        </q-form>
      </q-scroll-area>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { usePenunjangLainPoliStore } from 'src/stores/simrs/pelayanan/poli/penunjanglain'

const formRef = ref()
const store = usePenunjangLainPoliStore()

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

function saveOrder() {
  store.saveOrder(props.pasien).then(() => {
    formRef.value.resetValidation()
  })
}
</script>
