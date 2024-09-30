<template>
  <div class="row fit">
    <div class="col fit">
      <div class="full-height row q-col-gutter-x-xs">
        <div class=" full-height" :class="full ? 'col-12' : 'col-8'">
          <q-card flat bordered class="column fit" style="overflow: hidden;">
            <div class="col-auto">
              <BarComp title="Form Pemeriksaan Umum & Fisik (Keperawatan)" bg-color="bg-primary" text-color="text-white" @full="full = !full" />
            </div>
            <q-card-section class="col full-height scroll">
              <q-form ref="myForm" class="">
                <FormPemeriksaanUmum ref="formRef" :pasien="pasien" :kasus="kasus" />
                <q-separator class="q-my-md" />
                <q-btn label="Simpan" type="button" color="primary" @click="validate" />
              </q-form>
            </q-card-section>
          </q-card>
        </div>
        <div v-if="!full" class="full-height" :class="full ? 'col-0' : 'col-4'">
          <q-card flat bordered class="fit column bg-transparent">
            <div class="col-auto">
              <BarComp title="Informasi Pemeriksaan Umum & Fisik" bg-color="bg-dark" text-color="text-white" :btn-full="false" />
            </div>
            <div class="col full-height scroll">
              <ListPemeriksaanUmum :pasien="pasien" :kasus="kasus" />
            </div>
          </q-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { usePemeriksaanUmumRanapStore } from 'src/stores/simrs/ranap/pemeriksaanumum'
import { defineAsyncComponent, ref } from 'vue'
import { scroll } from 'quasar'
import { notifErrVue } from 'src/modules/utils'
const { getScrollTarget, setVerticalScrollPosition } = scroll

const BarComp = defineAsyncComponent(() => import('../../components/BarComp.vue'))
const FormPemeriksaanUmum = defineAsyncComponent(() => import('./pemeriksaanUmum/FormPemeriksaanUmum.vue'))
const ListPemeriksaanUmum = defineAsyncComponent(() => import('./pemeriksaanUmum/ListPemeriksaanUmum.vue'))

// eslint-disable-next-line no-unused-vars
const store = usePemeriksaanUmumRanapStore()

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  pasien: {
    type: Object,
    default: () => null
  },
  kasus: {
    type: Object,
    default: () => null
  }
})

const full = ref(false)
const myForm = ref(null)
const formRef = ref(null)

// const onSubmit = () => {
//   console.log('submit')
// }

const validate = () => {
  // console.log(formRef.value?.refInputKu)

  myForm.value.validate().then(success => {
    if (success) {
      // yay, models are correct
      // console.log('success', store.formKebidanan)
      store.saveForm(props?.kasus, props.pasien)
    }
    else {
      // oh no, user has filled in
      // at least one invalid value
      notifErrVue('Mohon Lengkapi Data Terlebih Dahulu')
      console.log('failed')
      formRef.value?.refKeadaanUmum.focus()
      scrollToElement(formRef.value?.refKeadaanUmum.$el)
    }
  })
}
function scrollToElement (el) {
  const target = getScrollTarget(el)
  // console.log('target', target)

  const offset = el.offsetTop
  // console.log('offset', offset)

  const duration = 200
  setVerticalScrollPosition(target, offset, duration)
}
</script>
