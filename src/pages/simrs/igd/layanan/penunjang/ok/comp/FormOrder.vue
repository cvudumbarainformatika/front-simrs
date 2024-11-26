<template>
  <div class="fit column scroll">
    <q-bar class="col-auto bg-dark text-white">
      <div class="q-py-sm f-14 ">
        Form Permintaan Operasi
      </div>
    </q-bar>
    <div class="col">
      <!-- <q-scroll-area style="height: calc(100% - 1px);"> -->
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
          <app-autocomplete-new
            ref="refPerawat"
            :model="store.form.kodedokter"
            label="Dokter"
            autocomplete="nama"
            option-value="kdpegsimrs"
            option-label="nama"
            outlined
            :source="store.dokters"
            @on-select="(val)=> {
              store.form.kodedokter = val
            }"
            @clear="store.form.kodedokter = null"
            :rules="[val => !!val || 'Harap Diisi terlebih dahulu']"
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
      <!-- </q-scroll-area> -->
    </div>
  </div>
</template>

<script setup>
import { useOperasiIgd } from 'src/stores/simrs/igd/operasi'
import { onMounted, ref } from 'vue'

const store = useOperasiIgd()
const formRef = ref()
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})
console.log(props?.peasien)

function saveOrder () {
  store.saveOrder(props.pasien).then(() => {
    formRef.value.resetValidation()
  })
}
onMounted(() => {
  formRef.value.resetValidation()
})
</script>
