<template>
  <div class="fit">
    <q-form
      class="fit q-pa-sm"
      @submit="onSubmit"
    >
      <div class="full-height scroll">
        <div class="bg-white q-pa-sm q-mb-sm">
          <div>Dokumen apa yang akan di Upload? </div>
          <q-separator class="q-my-sm" />
          <div class="q-gutter-sm">
            <q-radio
              v-for="item in store.masters"
              :key="item"
              v-model="store.form.nama"
              :val="item"
              :label="item"
              dense
              size="xs"
            />
          </div>
        </div>
        <FormComp
          v-if="store.form.nama"
          :pasien="pasien"
        />
      </div>
      <div class="absolute-bottom bg-primary q-pa-md">
        <div class="row justify-end">
          <q-btn
            label="Simpan"
            type="submit"
            class="bg-white text-dark q-px-lg"
            :loading="store.loadingSave"
            :disable="store.loadingSave"
            dense
          />
        </div>
      </div>
    </q-form>
  </div>
</template>

<script setup>
import { useUploadDokStore } from 'src/stores/simrs/pelayanan/poli/uploaddok'
import { defineAsyncComponent, onMounted } from 'vue'

const FormComp = defineAsyncComponent(() => import('src/pages/simrs/poli/tindakan/comptindakan/pagemenu/compDokUpload/FormComp.vue'))

const store = useUploadDokStore()
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

onMounted(() => {
  const isRanap = true
  Promise.all([
    store.initForm(),
    store.getMaster(isRanap)
  ])
})

function onSubmit () {
  const isRanap = true
  store.saveData(props?.pasien, isRanap)
}

</script>

<style lang="scss" scoped>
.q-uploader {
    // max-height: 500px !important;
}
</style>
