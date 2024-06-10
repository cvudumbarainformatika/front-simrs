<template>
  <div class="fit">
    <div class="row full-height">
      <div class="col-7 full-height">
        <q-form
          class="fit"
          @submit="onSubmit"
        >
          <div class="full-height scroll">
            <FormComp :pasien="pasien" />
            <div style="margin-bottom:150px;" />
          </div>
          <div class="absolute-bottom bg-primary q-pa-md">
            <div class="row justify-end">
              <q-btn
                :label="store.kandungan ? 'Simpan' : 'Simpan'"
                type="submit"
                :class="store.kandungan ? `bg-white text-dark q-px-lg` : `bg-white text-dark q-px-lg`"
                :loading="store.loadingSave"
                :disable="store.loadingSave"
                dense
              />
            </div>
          </div>
        </q-form>
      </div>
      <div class="col-5 full-height bg-grey-4">
        <div
          v-if="!store?.kandungans?.length"
          class="column full-height flex-center"
        >
          <div>Belum Ada Data Tersimpan ... 📋</div>
        </div>
        <div
          v-else
          class="full-height column q-pa-sm"
        >
          <div class="col-auto">
            <div class="q-pb-sm">
              <b>History Kunjungan</b>
            </div>
          </div>
          <div class="col full-height scroll">
            <ListsComp
              :items="store?.kandungans"
              @hapus="hapusItem"
              @edit="editItem"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted } from 'vue'
import FormComp from './compKandungan/FormComp.vue'
import ListsComp from './compKandungan/ListsComp.vue'

import { useKandunganStore } from 'src/stores/simrs/pelayanan/poli/kandungan'
import { useQuasar } from 'quasar'

const store = useKandunganStore()
const $q = useQuasar()
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

onMounted(() => {
  store.getData(props.pasien)
  store.getRiwayatObsetri(props.pasien)
  store.initForm()
  store.initFormRiwayatObsetri()
})

function onSubmit () {
  store.saveData(props.pasien)
}

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

function editItem (item) {
  console.log(item)
  store.kandungan = null
  store.kandungan = item
  store.initForm()
}

</script>
