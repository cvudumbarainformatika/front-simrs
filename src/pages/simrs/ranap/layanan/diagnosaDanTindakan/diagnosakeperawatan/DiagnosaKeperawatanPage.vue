<script setup>
import { useQuasar } from 'quasar'
import { useDiagnosaKeperawatan } from 'src/stores/simrs/pelayanan/poli/diagnosakeperawatan'
import { defineAsyncComponent, onMounted } from 'vue'

const BaseLayout = defineAsyncComponent(() => import('src/pages/simrs/ranap/layanan/components/BaseLayout.vue'))
const FormDiagnosaKeperawatan = defineAsyncComponent(() => import('./comp/FormDiagnosaKeperawatan.vue'))
const ListDiagnosaKeperawatan = defineAsyncComponent(() => import('./comp/ListDiagnosaKeperawatan.vue'))

const $q = useQuasar()

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

const store = useDiagnosaKeperawatan()

onMounted(() => {
  Promise.all([
    store.getDiagnosaByNoreg(props?.pasien)
    // store.getTindakan(props?.pasien)
  ])
})

function hapusItem (id) {
  $q.dialog({
    dark: true,
    title: 'Peringatan',
    message: 'Apakah Data ini akan dihapus?',
    cancel: true,
    persistent: true
  }).onOk(() => {
    // console.log('OK')
    store.deleteDiagnosa(props.pasien, id, 'ranap')
  }).onCancel(() => {
    // console.log('Cancel')
  }).onDismiss(() => {
    // console.log('I am triggered on both OK and Cancel')
  })
}

</script>

<template>
  <BaseLayout
    :pasien="props.pasien" :kasus="props.kasus" :nakes="props.nakes" :split="60"
    title-before="FORM DIAGNOSA KEPERAWATAN"
    title-after="LIST DIAGNOSA KEPERAWATAN"
  >
    <template #form>
      <FormDiagnosaKeperawatan :pasien="props.pasien" :kasus="props.kasus" :nakes="props.nakes" />
    </template>
    <template #list>
      <div class="fit">
        <ListDiagnosaKeperawatan :pasien="props.pasien" :kasus="props.kasus" :nakes="props.nakes" @delete-item="(id)=>hapusItem(id)" />
      </div>
    </template>

    <!-- <template #nota>
      <q-select
        v-model="store.notaTindakan"
        outlined
        standout="bg-yellow-3"
        bg-color="white"
        dense
        :options="store.notaTindakans"
        :display-value="`NOTA: ${store.notaTindakan==='' || store.notaTindakan === 'BARU'? 'BARU': store.notaTindakan}`"
        style="min-width: 200px;"
      />
    </template> -->
  </BaseLayout>
</template>
