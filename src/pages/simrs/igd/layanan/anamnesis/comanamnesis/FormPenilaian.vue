<template>
  <q-card
    flat
    bordered
    square
    class="full-height"
    style="overflow: hidden;"
  >
    <q-form
      ref="refForm"
      class="full-height"
    >
      <q-card-section class="q-px-md q-py-xs bg-primary text-white">
        <div class="row items-center justify-between">
          <div class="f-12 text-weight-bold">
            Form Penilaian Kajian Resiko Jatuh
          </div>
          <div>
            <q-btn
              flat
              dense
              size="md"
              icon="icon-mat-history"
            >
              <q-tooltip class="bg-dark text-white" />
            </q-btn>
          </div>
        </div>
      </q-card-section>
      <q-separator />
      <div class="bg-grey-4 text-weight-bold q-py-xs shadow-2">
        {{ storepenilaian.formpenilaians.desc }}
      </div>
      <q-card-section
        v-if="storepenilaian.formpenilaians.kode === 'ontario'"
        class="full-height scroll"
      >
        <div class="row q-col-gutter-sm">
          <div class="col-12">
            <div
              class="row items-center q-col-gutter-sm" v-for="(item , n) in storepenilaian.formpenilaians.form"
              :key="n"
            >
              <div class="col-4">
                {{ item.label }} :
              </div>
              <div class="col-8 text-weight-bold">
                <span
                  v-for="(kategori , x) in item.categories"
                  :key="x"
                ><q-radio v-model="storepenilaian.olahform" :val="kategori" :label="kategori.label" color="primary" @update:model-value="updateSelection" /></span>
              </div>
              <div class="col-12">
                <q-separator class="q-my-xs" />
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
      <q-card-section
        v-else
        class="full-height scroll"
      >
        <div class="row q-col-gutter-sm">
          <div class="col-12">
            <div
              class="row items-center q-col-gutter-sm" v-for="(item , n) in storepenilaian.formpenilaians.form"
              :key="n"
            >
              <div class="col-4">
                {{ item.label }} :
              </div>
              <div class="col-8 text-weight-bold">
                <span
                  v-for="(kategori , x) in item.categories"
                  :key="x"
                ><q-radio v-model="storepenilaian.olahform" :val="kategori" :label="kategori.label" color="primary" @update:model-value="updateSelection" /></span>
              </div>
              <div class="col-12">
                <q-separator class="q-my-xs" />
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-form>
  </q-card>
</template>
<script setup>
import { usePenilaianAnamnesisIgd } from 'src/stores/simrs/igd/penilaiananamnesis'

const storepenilaian = usePenilaianAnamnesisIgd()
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  },
  loadingaja: {
    type: Boolean,
    default: false
  }
})
function updateSelection (val) {
  // console.log(val.join(','))
  storepenilaian.setForm('doa', val.join(', '))
}

</script>
