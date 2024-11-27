<script setup>
import { useDiagnosaGiziStore } from 'src/stores/simrs/ranap/diagnosagizi'
import { defineAsyncComponent, onMounted } from 'vue'

const BaseLayout = defineAsyncComponent(() => import('src/pages/simrs/ranap/layanan/components/BaseLayout.vue'))
const FormDiagnosaGizi = defineAsyncComponent(() => import('./comp/FormDiagnosaGizi.vue'))
const ListDiagnosaGizi = defineAsyncComponent(() => import('./comp/ListDiagnosaGizi.vue'))

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

const store = useDiagnosaGiziStore()

onMounted(() => {
  Promise.all([
    store.initReset()
    // store.getData()
  ])
})

</script>

<template>
  <BaseLayout
    :pasien="props.pasien" :kasus="props.kasus" :nakes="props.nakes" :split="50" nota
    title-before="DIAGNOSA GIZI"
    title-after="List Diagnosa Gizi"
  >
    <template #form>
      <FormDiagnosaGizi :ulang="false" :pasien="props.pasien" :kasus="props.kasus" :nakes="props.nakes" />
    </template>
    <template #list>
      <div class="fit">
        <ListDiagnosaGizi :pasien="props.pasien" />
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
