<script setup>
import { usePermintaanBankDarahStore } from 'src/stores/simrs/ranap/bankdarah'
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

const store = usePermintaanBankDarahStore()

onMounted(() => {
  console.log('props', props.pasien)

  Promise.all([
    store.getNota(props?.pasien),
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
        <ListOrder :pasien="props.pasien" :kasus="props.kasus" :items="props.pasien?.bankdarah" />
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
        :display-value="`NOTA: ${store.form.nota==='' || store.form.nota === 'BARU' || store.form.nota === null ? 'BARU': store.form.nota}`"
        style="min-width: 200px;"
        @update:model-value="(val)=> console.log(val)"
      />
    </template>
  </BaseLayout>
</template>
