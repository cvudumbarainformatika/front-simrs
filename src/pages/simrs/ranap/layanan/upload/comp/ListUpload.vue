<template>
  <div
    v-if="!pasien?.dokumenluar?.length"
    class="full-height column flex-center"
  >
    <div>Belum Ada Data Tersimpan ... 📋</div>
  </div>
  <div
    v-else
    class="full-height scroll"
  >
    <div class="q-pa-sm">
      <ListComp
        :items="pasien?.dokumenluar"
        :key="pasien?.dokumenluar"
        @hapus="hapusItem"
      />
    </div>
  </div>
</template>

<script setup>

import { useUploadDokStore } from 'src/stores/simrs/pelayanan/poli/uploaddok'
import { defineAsyncComponent } from 'vue'
import { useQuasar } from 'quasar'

const ListComp = defineAsyncComponent(() => import('src/pages/simrs/poli/tindakan/comptindakan/pagemenu/compDokUpload/ListComp.vue'))
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

const store = useUploadDokStore()
const $q = useQuasar()

function hapusItem (item) {
  // console.log('hi', item)
  $q.dialog({
    title: 'Peringatan',
    message: 'Apakah Data ini akan dihapus?',
    cancel: true
    // persistent: true
  }).onOk(() => {
    store.deleteData(props?.pasien, item?.id)
  }).onCancel(() => {
    console.log('Cancel')
  }).onDismiss(() => {
    // console.log('I am triggered on both OK and Cancel')
  })
}
</script>
