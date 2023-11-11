<template>
  <q-card
    flat
    bordered
    square
    class="full-height"
  >
    <div class="full-height column">
      <div class="col-auto bg-primary text-white">
        <q-bar>
          <div>Dokumen Pasien</div>
        </q-bar>
        <div class="q-pa-sm row items-center q-gutter-sm ">
          <q-option-group
            v-model="doc"
            :options="documents"
            color="white"
            inline
            dark
          />
        </div>
      </div>
      <div class="col">
        <div
          class="q-pa-md"
        >
          Dokumen {{ doc }}
          <q-separator class="q-my-sm" />
          <div>
            <component
              :is="cekPanel()"
              :key="props.pasien"
              :pasien="props.pasien"
            />
          </div>
        </div>
      </div>
    </div>
  </q-card>
</template>
<script setup>
import { findWithAttr } from 'src/modules/utils'
import { ref, defineAsyncComponent } from 'vue'
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

const doc = ref('Resume')
const documents = ref([
  {
    label: 'Resume',
    value: 'Resume'
  },
  {
    label: 'Billing',
    value: 'Billing'
  }
])
const comp = [
  { nama: 'Resume', page: defineAsyncComponent(() => import('../resume/ResumePage.vue')) },
  { nama: 'Billing', page: defineAsyncComponent(() => import('./BillingPage.vue')) }
]
const cekPanel = () => {
  const val = doc.value
  const ganti = val.replace(/ /g, '')
  const arr = findWithAttr(comp, 'nama', ganti)

  return arr >= 0 ? comp[arr].page : ''
}
</script>
