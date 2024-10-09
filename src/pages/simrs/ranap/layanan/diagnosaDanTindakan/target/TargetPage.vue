<script setup>
import { defineAsyncComponent, onMounted } from 'vue'

const BaseLayout = defineAsyncComponent(() => import('src/pages/simrs/ranap/layanan/components/BaseLayout.vue'))
const FormTarget = defineAsyncComponent(() => import('./comp/FormTarget.vue'))

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  },
  kasus: {
    type: Object,
    default: null
  },
  nakes: {
    type: String,
    default: null
  }
})

// const store = useTindakanRanapStore()

onMounted(() => {
  Promise.all([
    // store.getNota(props?.pasien),
    // store.getTindakan(props?.pasien)
  ])
})

</script>

<template>
  <BaseLayout
    :pasien="props.pasien" :kasus="props.kasus" :nakes="props.nakes"
    title-before="Form Target" title-after="List Target"
    :split="100" :btn-full-before="false"
  >
    <template #form>
      <FormTarget :pasien="props.pasien" :kasus="props.kasus" :nakes="props.nakes" />
    </template>
    <template #list />
  </BaseLayout>
</template>
