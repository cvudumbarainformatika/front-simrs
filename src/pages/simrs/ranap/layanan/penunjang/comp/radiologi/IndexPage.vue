<script setup>
// import { useTindakanRanapStore } from 'src/stores/simrs/ranap/tindakan'
import { useRadiologiPoli } from 'src/stores/simrs/pelayanan/poli/radiologi'
import { usePengunjungRanapStore } from 'src/stores/simrs/ranap/pengunjung'
import { defineAsyncComponent, onMounted } from 'vue'

const BaseLayout = defineAsyncComponent(() => import('src/pages/simrs/ranap/layanan/components/BaseLayout.vue'))
// const FormTindakan = defineAsyncComponent(() => import('./comp/FormTindakan.vue'))
// const ListTindakan = defineAsyncComponent(() => import('./comp/ListTindakan.vue'))
const FormOrder = defineAsyncComponent(() => import('src/pages/simrs/poli/tindakan/comptindakan/pagemenu/comppenunjang/compradiologi/FormOrder.vue'))
const ListOrder = defineAsyncComponent(() => import('src/pages/simrs/poli/tindakan/comptindakan/pagemenu/comppenunjang/compradiologi/ListOrder.vue'))

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

const store = useRadiologiPoli()

onMounted(() => {
  const storeRanap = usePengunjungRanapStore()
  store.dokters = storeRanap?.nakes?.filter(x => x?.kdgroupnakes === '1') ?? []
  const isRanap = true
  Promise.all([
    store.getNota(props?.pasien, isRanap),
    store.getData(props?.pasien, isRanap)
  ])
})

</script>

<template>
  <BaseLayout
    :pasien="props.pasien" :kasus="props.kasus" :nakes="props.nakes" :split="50" nota
    title-before="RADIOLOGHY"
    title-after="List Permintaan Radiologi"
  >
    <template #form>
      <FormOrder :pasien="props.pasien" unit="ranap" />
    </template>
    <template #list>
      <div class="fit">
        <ListOrder :pasien="props.pasien" />
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
