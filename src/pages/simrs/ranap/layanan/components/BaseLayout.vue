<script setup>
import { defineAsyncComponent, ref } from 'vue'

const BarComp = defineAsyncComponent(() => import('src/pages/simrs/ranap/layanan/components/BarComp.vue'))
// const FormTindakan = defineAsyncComponent(() => import('./comp/FormTindakan.vue'))

const full = ref(false)

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
  },
  split: {
    type: Number,
    default: 50
  },
  nota: {
    type: Boolean,
    default: false
  },
  btnFullBefore: {
    type: Boolean,
    default: true
  },
  btnFullAfter: {
    type: Boolean,
    default: false
  },
  titleBefore: {
    type: String,
    default: 'Form Tindakan'
  },
  titleAfter: {
    type: String,
    default: 'List Tindakan'
  }
})

const splitterModel = ref(props.split)

</script>

<template>
  <div class="fit " style="padding-top: 1px;">
    <q-splitter
      v-model="splitterModel"
      separator-class="bg-grey-4"
      separator-style="width: 5px"
      :limits="[0, 100]"
      before-class="overflow-hidden"
      after-class="overflow-hidden"
      class="fit "
    >
      <template #before>
        <div class="column fit bg-white">
          <div class="col-auto">
            <BarComp
              :title="titleBefore" bg-color="bg-primary" text-color="text-white"
              :btn-full="btnFullBefore"
              @full="()=> {
                full = !full
                splitterModel = full ? 100 : split
              }"
            />
          </div>
          <div class="col full-height">
            <slot name="form" />
          </div>
        </div>
      </template>

      <template #after>
        <div class="column fit">
          <div class="col-auto full-width">
            <BarComp
              :title="titleAfter" bg-color="bg-dark" text-color="text-white" :btn-full="btnFullAfter"
            >
              <template #other v-if="nota">
                <slot name="nota" />
              </template>
            </BarComp>
          </div>
          <div class="col full-height full-width">
            <slot name="list" />
          </div>
        </div>
      </template>
    </q-splitter>
  </div>
</template>
