<template>
  <q-card flat bordered class="bg-transparent full-height column q-ma-xs">
    <div class="col-auto bg-primary text-white q-pa-md">
      <div class="row justify-between items-center">
        <div>
          <div class="f-20">
            LIST ASESSMENT ULANG
          </div>
          <div class="caption text-grey-4">
            Sebagai Catatan Perkembangan Pasien
          </div>
        </div>
        <div>
          <q-btn
            rounded
            outline
            color="white"
            @click="settings.isForm = !settings.isForm"
          >
            <q-icon name="icon-mat-add" size="xs" /><span class="q-ml-xs">Tambah</span>
          </q-btn>
        </div>
      </div>
    </div>
    <div class="col full-height">
      <ListSoap :pasien="pasien" :kasus="kasus" :nakes="nakes" :items="store.items" />
    </div>

    <DialogForm v-model="settings.isForm" :pasien="pasien" :kasus="kasus" :nakes="nakes" @exit="settings.isForm = false" />
  </q-card>
</template>

<script setup>
import { defineAsyncComponent, onMounted } from 'vue'
import useForm from './comp/useForm'

const ListSoap = defineAsyncComponent(() => import('./comp/ListSoap.vue'))
const DialogForm = defineAsyncComponent(() => import('./comp/DialogForm.vue'))

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  pasien: { type: Object, default: () => null },
  kasus: { type: Object, default: () => null },
  nakes: { type: String, default: null }
})

// eslint-disable-next-line no-unused-vars
const { settings, store, storeAnamnesis, storePemeriksaanUmum, storePenilaian } = useForm(props.pasien)

onMounted(() => {
  // console.log('props', props?.pasien?.cppt)

  store.getCppt(props?.pasien?.cppt)
  Promise.all([
    // store.getCppt(props.pasien)
    // storeAnamnesis.getData(props.pasien),
    // storePemeriksaanUmum.getData(props.pasien),
    // storePenilaian.getData(props.pasien)
  ])
})

</script>
