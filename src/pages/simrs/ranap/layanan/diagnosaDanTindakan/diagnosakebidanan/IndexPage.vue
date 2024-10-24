<script setup>
// import { useTindakanRanapStore } from 'src/stores/simrs/ranap/tindakan'
import { useDiagnosaKebidananStore } from 'src/stores/simrs/pelayanan/poli/diagnosakebidanan'
import { defineAsyncComponent, onMounted } from 'vue'

const BaseLayout = defineAsyncComponent(() => import('src/pages/simrs/ranap/layanan/components/BaseLayout.vue'))
const FormDiagnosa = defineAsyncComponent(() => import('src/pages/simrs/poli/tindakan/comptindakan/pagemenu/complayanan/compDiagnosaKebidanan/FormDiagnosaKebidanan.vue'))
const ListDiagnosa = defineAsyncComponent(() => import('src/pages/simrs/poli/tindakan/comptindakan/pagemenu/complayanan/compDiagnosaKebidanan/ListsComp.vue'))
// const FormTindakan = defineAsyncComponent(() => import('./comp/FormTindakan.vue'))
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

const store = useDiagnosaKebidananStore()

onMounted(() => {
  Promise.all([
    store.initReset(),
    store.getData()
  ])
})

</script>

<template>
  <BaseLayout
    :pasien="props.pasien" :kasus="props.kasus" :nakes="props.nakes" :split="50" nota
    title-before="DIAGNOSA KEBIDANAN"
    title-after="List Diagnosa Kebidanan"
  >
    <template #form>
      <FormDiagnosa :pasien="props.pasien" :kasus="props.kasus" />
    </template>
    <template #list>
      <div class="fit">
        <ListDiagnosa :pasien="props.pasien" :kasus="props.kasus" />
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
