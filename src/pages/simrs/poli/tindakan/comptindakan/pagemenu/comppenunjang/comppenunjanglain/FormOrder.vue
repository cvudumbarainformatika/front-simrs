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
          <div class="col-12">
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
              :rules="[val => !!val || 'Harap cari pemeriksaan dahulu']"
            />
          </div>
          div
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

function saveOrder() {
  console.log('ok')
}
</script>
