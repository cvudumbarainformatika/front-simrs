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
              title="Form Tindakan" bg-color="bg-primary" text-color="text-white" @full="()=> {
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
              title="List Tindakan" bg-color="bg-dark" text-color="text-white" :btn-full="false"
            >
              <template #other v-if="nota">
                <q-input dark dense outlined label="Nota" color="white" style="min-width:200px;" />
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
