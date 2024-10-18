<script setup>
import { usePermintaanBankDarahStore } from 'src/stores/simrs/ranap/bankdarah'
import { defineAsyncComponent, onMounted } from 'vue'

const BaseLayout = defineAsyncComponent(() => import('src/pages/simrs/ranap/layanan/components/BaseLayout.vue'))
const FormOrder = defineAsyncComponent(() => import('./comp/FormOrder.vue'))
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

const store = usePermintaanBankDarahStore()

onMounted(() => {
  Promise.all([
    store.initReset()
    // store.getTindakan(props?.pasien)
  ])
})

</script>

<template>
  <BaseLayout
    :pasien="props.pasien" :kasus="props.kasus" :nakes="props.nakes" :split="50" nota
    title-before="FORM PERMINTAAN BANK DARAH"
    title-after="List Permintaan Darah"
  >
    <template #form>
      <FormOrder :pasien="props.pasien" :kasus="props.kasus" />
    </template>
    <template #list>
      <div class="fit">
        <!-- <ListTindakan :pasien="props.pasien" :kasus="props.kasus" :key="pasien?.tindakan" /> -->
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
