<script setup>
import { useQuasar } from 'quasar'
// import { useDiagnosaKeperawatan } from 'src/stores/simrs/pelayanan/poli/diagnosakeperawatan'
import { defineAsyncComponent, onMounted } from 'vue'

const BaseLayout = defineAsyncComponent(() => import('src/pages/simrs/ranap/layanan/components/BaseLayout.vue'))
const FormAsessmentUlang = defineAsyncComponent(() => import('./comp/FormAsessmentUlang.vue'))
// const ListDiagnosaKeperawatan = defineAsyncComponent(() => import('./comp/ListDiagnosaKeperawatan.vue'))

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

// eslint-disable-next-line no-undef
// const store = useDiagnosaKeperawatan()

onMounted(() => {
  Promise.all([
    // store.getTindakan(props?.pasien)
  ])
})

// eslint-disable-next-line no-unused-vars
function hapusItem (id) {
  $q.dialog({
    dark: true,
    title: 'Peringatan',
    message: 'Apakah Data ini akan dihapus?',
    cancel: true,
    persistent: true
  }).onOk(() => {
    // console.log('OK')
    // store.deleteDiagnosa(props.pasien, id, 'ranap')
  }).onCancel(() => {
    // console.log('Cancel')
  }).onDismiss(() => {
    // console.log('I am triggered on both OK and Cancel')
  })
}

</script>

<template>
  <div class="absolute fit q-pa-xs">
    <BaseLayout
      :pasien="props.pasien" :kasus="props.kasus" :nakes="props.nakes" :split="50"
      title-before="FORM ASESTMENT ULANG (SOAP)"
      title-after="LIST SOAP TERSIMPAN"
    >
      <template #form>
        <FormAsessmentUlang :pasien="props.pasien" :kasus="props.kasus" :nakes="props.nakes" />
      </template>
      <template #list>
        <div class="fit">
          list
        <!-- <ListDiagnosaKeperawatan :pasien="props.pasien" :kasus="props.kasus" :nakes="props.nakes" @delete-item="(id)=>hapusItem(id)" /> -->
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
  </div>
</template>
