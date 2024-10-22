<script setup>
// import { useTindakanRanapStore } from 'src/stores/simrs/ranap/tindakan'
import { usePermintaanApheresisStore } from 'src/stores/simrs/ranap/apheresis'
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

const store = usePermintaanApheresisStore()

onMounted(() => {
  Promise.all([
    store.initReset(),
    store.getNota(props?.pasien)
    // store.getTindakan(props?.pasien)
  ])
})

</script>

<template>
  <BaseLayout
    :pasien="props.pasien" :kasus="props.kasus" :nakes="props.nakes" :split="50" nota
    title-before="FORM PERMINTAAN APHERESIS"
    title-after="List Permintaan Apheresis"
  >
    <template #form>
      <FormOrder :pasien="props.pasien" :kasus="props.kasus" />
    </template>
    <template #list>
      <div class="fit">
        <ListOrder :pasien="props.pasien" :kasus="props.kasus" :items="props.pasien?.apheresis" />
      </div>
    </template>

    <template #nota>
      <q-select
        v-model="store.form.nota"
        outlined
        standout="bg-yellow-3"
        bg-color="white"
        dense
        :options="store.notas"
        :display-value="`NOTA: ${store.form.nota==='' || store.form.nota === 'BARU'? 'BARU': store.form.nota}`"
        style="min-width: 200px;"
      />
    </template>
  </BaseLayout>
</template>
