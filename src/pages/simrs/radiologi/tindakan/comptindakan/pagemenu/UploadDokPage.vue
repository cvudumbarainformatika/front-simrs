<template>
  <div class="fit">
    <div class="row full-height">
      <div class="col-8 full-height">
        <q-form
          class="fit q-pa-sm"
          @submit="onSubmit"
        >
          <div class="full-height scroll">
            <div class="bg-white q-pa-sm q-mb-sm">
              <div>Dokumen apa yang akan di Upload? </div>
              <q-separator class="q-my-sm" />
              <div class="q-gutter-sm">
                <q-radio
                  v-for="item in store.masters"
                  :key="item"
                  v-model="store.form.nama"
                  :val="item"
                  :label="item"
                  dense
                  size="xs"
                />
              </div>
            </div>
            <FormComp
              v-if="store.form.nama"
              :pasien="pasien"
            />
          </div>
          <div class="absolute-bottom bg-primary q-pa-md">
            <div class="row justify-end">
              <q-btn
                label="Simpan"
                type="submit"
                class="bg-white text-dark q-px-lg"
                :loading="store.loadingSave"
                :disable="store.loadingSave"
                dense
              />
            </div>
          </div>
        </q-form>
      </div>
      <div class="col-4 full-height bg-grey-4">
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
              @hapus="hapusItem"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import FormComp from './compDokUpload/FormComp.vue'
import ListComp from './compDokUpload/ListComp.vue'
import { useUploadDokStore } from 'src/stores/simrs/pelayanan/poli/uploaddok'
import { onMounted } from 'vue'
import { useQuasar } from 'quasar'
const store = useUploadDokStore()
const $q = useQuasar()

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

onMounted(() => {
  store.initForm()
  store.getMaster()
})

function onSubmit () {
  store.saveData(props?.pasien)
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
</script>

<style lang="scss" scoped>
.q-uploader {
    // max-height: 500px !important;
}
</style>
