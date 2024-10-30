<script setup>
import { useEdukasiPoliStore } from 'src/stores/simrs/pelayanan/poli/edukasi'
import { defineAsyncComponent, onMounted } from 'vue'

const BaseLayout = defineAsyncComponent(() => import('src/pages/simrs/ranap/layanan/components/BaseLayout.vue'))
const FormEdukasi = defineAsyncComponent(() => import('src/pages/simrs/poli/tindakan/comptindakan/pagemenu/compedukasi/FormEdukasi.vue'))
const ListEdukasi = defineAsyncComponent(() => import('src/pages/simrs/poli/tindakan/comptindakan/pagemenu/compedukasi/ListEdukasi.vue'))
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

// eslint-disable-next-line no-unused-vars
const store = useEdukasiPoliStore()

onMounted(() => {
  Promise.all([
    // store.getNota(props?.pasien),
    // store.getTindakan(props?.pasien)
  ])
})

</script>

<template>
  <BaseLayout
    :pasien="props.pasien" :kasus="props.kasus" :nakes="props.nakes" :split="60" nota
    title-before="EDUKASI"
    title-after="List Edukasi"
  >
    <template #form>
      <FormEdukasi :pasien="props.pasien" />
    </template>
    <template #list>
      <div class="fit">
        <ListEdukasi :pasien="props.pasien" />
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
