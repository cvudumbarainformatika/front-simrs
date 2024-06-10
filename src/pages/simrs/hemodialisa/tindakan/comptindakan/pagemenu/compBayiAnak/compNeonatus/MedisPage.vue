<template>
  <div class="fit row">
    <div class="col-12 full-height">
      <q-form
        class="full-height"
        @submit="onSubmit"
      >
        <div class="full-height q-pa-xs scroll">
          <FormMedis :pasien="pasien" />
        </div>
        <div class="absolute-bottom bg-primary q-pa-md">
          <div class="text-right">
            <q-btn
              :label="store.neonatusmedis ? 'Update Data' : 'Simpan Data'"
              :class="store.neonatusmedis?`bg-dark text-white`:`bg-white text-dark`"
              type="submit"
              :loading="store.loadingSave"
              :disable="store.loadingSave"
            />
          </div>
        </div>
      </q-form>
    </div>
    <!-- <div class="col-4 full-height bg-grey-4">
      <div
        v-if="!pasien?.neonatusmedis?.length"
        class="full-height column flex-center"
      >
        <div>Belum Ada Data Tersimpan ... 📋</div>
      </div>
      <div
        v-else
        class="full-height scroll"
      >
        <div class="q-pa-sm">
          <ListsMedis
            :items="pasien?.neonatusmedis"
            @hapus="hapusItem"
          />
        </div>
      </div>
    </div> -->
  </div>
</template>

<script setup>
// import { onMounted } from 'vue'
import FormMedis from './compMedis/FormMedis.vue'
// import ListsMedis from './compMedis/ListsMedis.vue'

import { useNeonatusMedisStore } from 'src/stores/simrs/pelayanan/poli/neonatusmedis'
import { useQuasar } from 'quasar'
import { onMounted } from 'vue'

const $q = useQuasar()
// eslint-disable-next-line no-unused-vars
const store = useNeonatusMedisStore()
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

onMounted(() => {
  store.getData(props.pasien)
  store.getRiwayatKehamilan(props.pasien)
})

function onSubmit () {
  store.saveData(props.pasien)
}

// eslint-disable-next-line no-unused-vars
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
