<template>
  <div class="row fit">
    <div
      v-if="store.preview"
      class="col-12 full-height scroll bg-grey-4"
    >
      <div class="row justify-center">
        <div class="col-12 q-pa-lg">
          <preview-page />
        </div>
      </div>
    </div>
    <div
      v-if="!store.preview"
      class="col-12 full-height"
    >
      <q-card
        flat
        square
        class="full-height"
      >
        <q-form
          class="column full-height"
          @submit="onSubmit"
        >
          <q-card-section class="col full-height q-pa-none scroll">
            <FormComp :pasien="props?.pasien" />
            <div style="margin-bottom: 200px;" />
          </q-card-section>
          <div class="absolute-bottom full-width bg-primary q-pa-md">
            <div class="flex justify-end">
              <q-btn
                dense
                type="submit"
                :class="store.neonatuskeperawatan ? 'bg-dark text-white q-px-md' : 'bg-white q-px-md text-dark' "
                :loading="store.loadingSave"
                :disable="store.loadingSave"
              >
                {{ store.neonatuskeperawatan ? 'Update Data' : 'Simpan Data' }}
              </q-btn>
            </div>
          </div>
        </q-form>
      </q-card>
    </div>
    <!-- <div
      v-if="!store.preview"
      class="col-3 full-height bg-grey-4"
    >
      <div
        v-if="!pasien?.neonatuskeperawatan?.length"
        class="column flex-center full-height"
      >
        <div>Belum Ada Data Tersimpan ... 📋</div>
      </div>
      <div
        v-else
        class="full-height scroll"
      >
        <div class="q-pa-sm">
          <ListsComp
            :items="pasien?.neonatuskeperawatan"
            @hapus="hapusItem"
            @preview="store.previewData"
          />
        </div>
      </div>
    </div> -->
  </div>
</template>

<script setup>
import FormComp from './comKeperawatan/FormComp.vue'
import PreviewPage from './comKeperawatan/PreviewPage.vue'
// import ListsComp from './comKeperawatan/ListsComp.vue'
import { useNeonatusKeperawatanStore } from 'src/stores/simrs/pelayanan/poli/neonatuskeperawatan'
import { onMounted } from 'vue'
import { useQuasar } from 'quasar'

const store = useNeonatusKeperawatanStore()
const $q = useQuasar()

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

onMounted(() => {
  // store.initForm()
  store.getData(props.pasien)
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
