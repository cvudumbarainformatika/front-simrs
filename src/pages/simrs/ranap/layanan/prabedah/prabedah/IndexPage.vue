<script setup>
import { usePraAnastesiStore } from 'src/stores/simrs/pelayanan/poli/praanastesi'
import { defineAsyncComponent, onMounted } from 'vue'

const BaseLayout = defineAsyncComponent(() => import('src/pages/simrs/ranap/layanan/components/BaseLayout.vue'))

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

const store = usePraAnastesiStore()

onMounted(() => {
  Promise.all([
    store.getData(props.pasien)
      .then(() => store.initForm())
  ])
})

// function lihat (val) {
//   // console.log(val)
//   store.initForm(val)
// }

// const $q = useQuasar()
// function hapusData (val) {
//   $q.dialog({
//     title: 'Peringatan',
//     message: 'Apakah Data ini akan dihapus?',
//     cancel: true
//     // persistent: true
//   }).onOk(() => {
//     // const params = { id: selected.value }
//     store.deleteData(val)
//   }).onCancel(() => {
//     console.log('Cancel')
//   }).onDismiss(() => {
//     // console.log('I am triggered on both OK and Cancel')
//   })
// }

</script>

<template>
  <BaseLayout
    :pasien="props.pasien" :kasus="props.kasus" :nakes="props.nakes" :split="60" nota
    title-before="FORM PRA BEDAH"
    title-after="List Pra Bedah"
  >
    <template #form>
      <!-- <FormPage :pasien="props.pasien" :kasus="props.kasus" /> -->
      Masih Dalam Pengembangan
    </template>
    <template #list>
      <div class="fit">
        Masih Dalam Pengembangan
        <!-- <ListPage
          :key="pasien"
          :pasien="pasien"
          :items="store.resultPraAnastesi"
          @hapus="(val)=> hapusData(val)"
          @edit="(val)=> lihat(val)"
        /> -->
      </div>
    </template>

    <template #nota>
      <!-- <q-select
        v-model="store.form.nota"
        outlined
        standout="bg-yellow-3"
        bg-color="white"
        dense
        :options="store.notas"
        :display-value="`NOTA: ${store.form.nota==='' || store.form.nota === 'BARU'? 'BARU': store.form.nota}`"
        style="min-width: 200px;"
      /> -->
    </template>
  </BaseLayout>
</template>
