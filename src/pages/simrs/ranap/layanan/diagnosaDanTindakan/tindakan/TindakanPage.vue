<script setup>
import { defineAsyncComponent } from 'vue'

const BaseLayout = defineAsyncComponent(() => import('src/pages/simrs/ranap/layanan/components/BaseLayout.vue'))
const FormTindakan = defineAsyncComponent(() => import('./comp/FormTindakan.vue'))
const ListTindakan = defineAsyncComponent(() => import('./comp/ListTindakan.vue'))

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
  },
  items: {
    type: Array,
    default: () => []
  }
})

</script>

<template>
  <BaseLayout :pasien="props.pasien" :kasus="props.kasus" :nakes="props.nakes" :split="50" nota>
    <template #form>
      <FormTindakan :pasien="props.pasien" :kasus="props.kasus" />
    </template>
    <template #list>
      <div class="fit">
        <ListTindakan :pasien="props.pasien" :kasus="props.kasus" />
      </div>
    </template>
  </BaseLayout>
</template>
