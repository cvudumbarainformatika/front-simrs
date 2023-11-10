<template>
  <div class="full-height">
    <div class="q-pa-md text-weight-bold">
      FORM DIAGNOSA KEPERAWATAN
      <div class="f-10 text-weight-light">
        <em>Pilih Diagnosa Keperawatan dibawah berikut </em>
      </div>
    </div>
    <q-separator />
    <q-form
      ref="formRef"
      class="row q-pa-md q-col-gutter-xs"
      @submit="onSubmit"
    >
      <q-option-group
        v-model="store.selectDiagnosa"
        :options="options"
        color="primary"
        type="checkbox"
        inline
      />
    </q-form>
  </div>
</template>

<script setup>

import { useDiagnosaKeperawatan } from 'src/stores/simrs/pelayanan/poli/diagnosakeperawatan'
import { computed, onMounted } from 'vue'

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

const store = useDiagnosaKeperawatan()

const options = computed(() => {
  const arr = store.diagnosas
  if (arr.length) {
    return arr.map(x => {
      const obj = {
        label: x.kode + ' - ' + x.nama,
        value: x
      }
      return obj
    })
  }

  return []
})

function onSubmit() {
  console.log('save')
}

onMounted(() => {
  console.log(props.pasien)
  store.getData()
})
</script>
