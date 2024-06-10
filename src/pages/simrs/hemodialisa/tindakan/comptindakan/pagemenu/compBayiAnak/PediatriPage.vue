<template>
  <div class="fit">
    <div class="row full-height">
      <!-- <div :class="`col-${store.bukaCdc ? '12' : '8'} full-height`"> -->
      <div :class="`col-12 full-height`">
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
                :label="store.isEdited ? 'Update Data' : 'Simpan Data'"
                type="submit"
                :class="store.isEdited ? `bg-dark text-white q-px-lg` : `bg-white text-dark q-px-lg`"
                :loading="store.loadingSave"
                :disable="store.loadingSave"
                dense
              />
            </div>
            <!-- <div v-else class="row justify-end">
              <q-btn
                label="Kembali"
                class="bg-dark text-white q-px-lg"
                dense
                @click="store.bukaCdc = false"
              />
            </div> -->
          </div>
        </q-form>
      </div>
      <!-- <div v-if="!store.bukaCdc" class="col-4 full-height bg-grey-4">
        <div
          v-if="!pasien?.pediatri?.length"
          class="full-height column flex-center"
        >
          <div>Belum Ada Data Tersimpan ... 📋</div>
        </div>
        <div
          v-else
          class="full-height scroll"
        >
          <div class="q-pa-sm">
            <ListsComp
              :items="pasien?.pediatri"
              @hapus="hapusItem"
            />
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script setup>
import FormComp from './compPediatri/FormComp.vue'
// import ListsComp from './compPediatri/ListsComp.vue'
import { usePediatriStore } from 'src/stores/simrs/pelayanan/poli/pediatri'
import { onMounted, watchEffect } from 'vue'
import { useQuasar } from 'quasar'
const store = usePediatriStore()
const $q = useQuasar()

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

onMounted(async () => {
  // console.log('pediatri', props?.pasien)
  store.bukaCdc = false
  // store.initForm(props.pasien)
  await store.getMasterCdc()
  // store.getJsonData()
})

watchEffect(() => {
  // console.log('watch effect', props.pasien)
  const pFisik = props?.pasien?.pemeriksaanfisik
  if (pFisik?.length) {
    store.form.bb = pFisik[0]?.beratbadan ?? null
    store.form.pb = pFisik[0]?.tinggibadan ?? null
  }
})

function onSubmit () {
  store.saveData(props?.pasien)
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
