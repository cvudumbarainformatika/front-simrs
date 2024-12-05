<script setup>
// import { useTindakanRanapStore } from 'src/stores/simrs/ranap/tindakan'
import { useLaboratPoli } from 'src/stores/simrs/pelayanan/poli/laborat'
import { defineAsyncComponent, onMounted } from 'vue'

const BaseLayout = defineAsyncComponent(() => import('src/pages/simrs/ranap/layanan/components/BaseLayout.vue'))
// const FormTindakan = defineAsyncComponent(() => import('./comp/FormTindakan.vue'))
// const ListTindakan = defineAsyncComponent(() => import('./comp/ListTindakan.vue'))

const FormOrder = defineAsyncComponent(() => import('src/pages/simrs/poli/tindakan/comptindakan/pagemenu/comppenunjang/complaboratbaru/FormOrder.vue'))
const ListPemeriksaans = defineAsyncComponent(() => import('src/pages/simrs/poli/tindakan/comptindakan/pagemenu/comppenunjang/complaboratbaru/ListPemeriksaans.vue'))

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

const store = useLaboratPoli()

onMounted(() => {
  // console.log('mmounted index', store.loading)
  const isRanap = true
  Promise.all([
    // store.getNota(props?.pasien, isRanap),
    store.getData(props?.pasien, isRanap)
  ])
})

</script>

<template>
  <BaseLayout
    :pasien="props.pasien" :kasus="props.kasus" :nakes="props.nakes" :split="50" nota
    title-before="LABORAT"
    title-after="List Permintaan Laborat"
  >
    <template #form>
      <!-- <FormTindakan :pasien="props.pasien" :kasus="props.kasus" /> -->
      <FormOrder :pasien="props.pasien" unit="ranap" />
    </template>
    <template #list>
      <div class="fit">
        <!-- <ListTindakan :pasien="props.pasien" :kasus="props.kasus" :key="pasien?.tindakan" /> -->
        <ListPemeriksaans :pasien="props.pasien" :loading="store.loading" :key="props?.pasien" />
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
