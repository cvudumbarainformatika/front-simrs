<script setup>
import { usePermintaanPerawatanJenazahStore } from 'src/stores/simrs/ranap/perawatanjenazah'
import { defineAsyncComponent, onMounted } from 'vue'

const BaseLayout = defineAsyncComponent(() => import('src/pages/simrs/ranap/layanan/components/BaseLayout.vue'))
const FormOrder = defineAsyncComponent(() => import('./comp/FormOrder.vue'))
const ListOrder = defineAsyncComponent(() => import('./comp/ListOrder.vue'))

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

const store = usePermintaanPerawatanJenazahStore()

onMounted(() => {
  Promise.all([
    store.getNota(props?.pasien)
    // store.getTindakan(props?.pasien)
  ])
})

</script>

<template>
  <BaseLayout
    :pasien="props.pasien" :kasus="props.kasus" :nakes="props.nakes" :split="50" nota
    title-before="PERAWATAN JENAZAH"
    title-after="List Permintaan Perawatan Jenazah"
  >
    <template #form>
      <FormOrder :pasien="props.pasien" :kasus="props.kasus" />
    </template>
    <template #list>
      <div class="fit">
        <ListOrder :pasien="props.pasien" :kasus="props.kasus" />
      </div>
    </template>

    <template #nota>
      <!-- <q-select
        v-model="store.notaTindakan"
        outlined
        standout="bg-yellow-3"
        bg-color="white"
        dense
        :options="store.notaTindakans"
        :display-value="`NOTA: ${store.notaTindakan==='' || store.notaTindakan === 'BARU'? 'BARU': store.notaTindakan}`"
        style="min-width: 200px;"
      /> -->
    </template>
  </BaseLayout>
</template>
