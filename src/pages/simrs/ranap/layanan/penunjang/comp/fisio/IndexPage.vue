<script setup>
// import { useTindakanRanapStore } from 'src/stores/simrs/ranap/tindakan'
import { useFisioPoli } from 'src/stores/simrs/pelayanan/poli/fisio'
import { usePengunjungRanapStore } from 'src/stores/simrs/ranap/pengunjung'
import { defineAsyncComponent, onMounted } from 'vue'

const BaseLayout = defineAsyncComponent(() => import('src/pages/simrs/ranap/layanan/components/BaseLayout.vue'))
const FormOrder = defineAsyncComponent(() => import('src/pages/simrs/poli/tindakan/comptindakan/pagemenu/comppenunjang/compfisio/FormOrder.vue'))
const ListOrder = defineAsyncComponent(() => import('src/pages/simrs/poli/tindakan/comptindakan/pagemenu/comppenunjang/compfisio/ListOrder.vue'))

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

const store = useFisioPoli()

onMounted(() => {
  const storeRanap = usePengunjungRanapStore()
  store.dokters = storeRanap?.nakes?.filter(x => x?.kdgroupnakes === '1') ?? []
  Promise.all([
    store.getNota(props?.pasien),
    store.getData(props?.pasien)
  ])
})

</script>

<template>
  <BaseLayout
    :pasien="props.pasien" :kasus="props.kasus" :nakes="props.nakes" :split="50" nota
    title-before="FISO"
    title-after="List Permintaan Fisioterapi"
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
