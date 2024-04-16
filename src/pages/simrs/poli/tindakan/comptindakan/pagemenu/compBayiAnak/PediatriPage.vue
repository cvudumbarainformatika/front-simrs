<template>
  <div class="fit">
    <div class="row full-height">
      <div class="col-8 full-height">
        <q-form
          class="fit"
          @submit="onSubmit"
        >
          <div class="full-height scroll">
            <FormComp />
            <div style="margin-bottom:150px;" />
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
      <div class="col-4 full-height bg-grey-4">
        tempat list
      </div>
    </div>
  </div>
</template>

<script setup>
import FormComp from './compPediatri/FormComp.vue'
import { usePediatriStore } from 'src/stores/simrs/pelayanan/poli/pediatri'
import { onMounted } from 'vue'
const store = usePediatriStore()

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

onMounted(() => {
  store.initForm()
})

function onSubmit() {
  store.saveData(props?.pasien)
}
</script>
