<template>
  <q-dialog
    persistent
    :maximized="true"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card class="bg-grey-4 column fit">
      <div class="bg-primary text-white col-auto">
        <div class="row justify-between items-center q-px-md q-py-xs">
          <div class="f-12">
            Form Assessment Ulang
          </div>
          <q-btn size="12px" dense flat icon="icon-mat-close" v-close-popup>
            <q-tooltip class="bg-white text-primary">
              Close
            </q-tooltip>
          </q-btn>
        </div>

        <q-card-section class="bg-grey-2">
          <div class="q-gutter-md">
            <q-btn
              rounded
              outline
              color="orange"
              icon="icon-mat-arrow_back"
              v-close-popup
            >
              <span class="text-orange-9 q-ml-sm">Kembali </span>
            </q-btn>
            <q-btn
              rounded
              outline
              color="primary"
              icon="icon-mat-edit_document"
              @click="store.getPreviousForm(pasien)"
            >
              <span class="text-primary q-ml-sm">Inputan Sebelumnya</span>
            </q-btn>
            <q-btn
              rounded
              outline
              color="primary"
              icon="icon-mat-dvr"
            >
              <span class="text-primary q-ml-sm">Hasil Laboratorium</span>
            </q-btn>
            <q-btn
              rounded
              outline
              color="primary"
              icon="icon-my-human-hand-bones-svgrepo-com"
            >
              <span class="text-primary q-ml-sm">Hasil Radiologi</span>
            </q-btn>
          </div>
        </q-card-section>
      </div>

      <q-card-section class="col full-height scroll">
        <FormSoap :pasien="pasien" :kasus="kasus" :nakes="nakes" @exit="emits('exit')" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'
import useForm from './useForm'

const FormSoap = defineAsyncComponent(() => import('./FormSoap.vue'))

const props = defineProps({
  pasien: {
    type: Object,
    default: () => {}
  },
  kasus: {
    type: Object,
    default: () => {}
  },
  nakes: {
    type: String,
    default: null
  }
})

const emits = defineEmits(['exit'])

const { store } = useForm(props?.pasien)
</script>
