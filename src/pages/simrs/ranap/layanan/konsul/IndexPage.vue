<script setup>
import { useKonsulRanapStore } from 'src/stores/simrs/ranap/konsul'
import { defineAsyncComponent, onMounted } from 'vue'

const BaseLayout = defineAsyncComponent(() => import('src/pages/simrs/ranap/layanan/components/BaseLayout.vue'))
const FormKonsul = defineAsyncComponent(() => import('./comp/FormKonsul.vue'))
// const ListTindakan = defineAsyncComponent(() => import('./comp/ListTindakan.vue'))

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

const store = useKonsulRanapStore()

onMounted(() => {
  store.initReset()
  Promise.all([
    // store.getNota(props?.pasien),
    // store.getTindakan(props?.pasien)
  ])
})

</script>

<template>
  <BaseLayout
    :pasien="props.pasien" :kasus="props.kasus" :nakes="props.nakes" :split="40"
    title-before="KONSUL SPESIALIS"
    title-after="List Permintaan Konsul"
  >
    <template #form>
      <FormKonsul :pasien="props.pasien" :kasus="props.kasus" />
    </template>
    <template #list>
      <div class="fit">
        <!-- <ListTindakan :pasien="props.pasien" :kasus="props.kasus" :key="pasien?.tindakan" /> -->
      </div>
    </template>
  </BaseLayout>
</template>
