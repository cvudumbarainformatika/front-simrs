<template>
  <q-card
    flat
    square
    class="full-height"
  >
    <q-card-section
      horizontal
      class="full-height"
    >
      <q-card-section
        class="col scroll"
      >
        <div class="q-pa-md">
          <div class="row q-col-gutter-md q-mb-md">
            <div class="col-4">
              <div class="text-weight-bold">
                Keluhan Utama
              </div>
              <div class="text-grey-8 f-10">
                Keluhan yang menjadi alasan utama
                pasien
              </div>
            </div>
            <div class="col-8">
              <q-input
                v-model="text"
                outlined
                autogrow
              />
            </div>
          </div>
          <div class="row q-col-gutter-md q-mb-md">
            <div class="col-4">
              <div class="text-weight-bold">
                Riwayat Penyakit
              </div>
              <div class="text-grey-8 f-10">
                Riwayat penyakit yang pernah diderita
                oleh pasien
              </div>
            </div>
            <div class="col-8">
              <q-input
                v-model="text"
                outlined
                autogrow
              />
            </div>
          </div>
          <div class="row q-col-gutter-md q-mb-md">
            <div class="col-4">
              <div class="text-weight-bold">
                Riwayat Alergi
              </div>
              <div class="text-grey-8 f-10">
                Riwayat alergi yang pernah dialami
                oleh pasien
              </div>
            </div>
            <div class="col-4">
              <q-select
                v-model="model"
                dense
                outlined
                :options="options"
                stack-label
                emit-value
                map-options
              >
                <template #append>
                  <q-icon
                    v-if="model !== null"
                    class="cursor-pointer"
                    name="icon-mat-clear"
                    size="xs"
                    @click.stop.prevent="model = ''"
                  />
                </template>
              </q-select>
            </div>
          </div>
          <div class="row q-col-gutter-md q-mb-md">
            <div class="col-4">
              <div class="text-weight-bold">
                Riwayat Pengobatan
              </div>
              <div class="text-grey-8 f-10">
                Riwayat obat-obatan yang pernah
                dikonsumsi oleh pasien
              </div>
            </div>
            <div class="col-8">
              <q-input
                v-model="text"
                outlined
                autogrow
              />
            </div>
          </div>
          <q-separator class="q-my-lg" />
          <div class="text-right">
            <app-btn label="Simpan" />
          </div>
        </div>
        <div class="q-pb-xl" />
      </q-card-section>

      <q-separator vertical />
      <q-card-section
        class="col-auto scroll"
        style="padding:0;
        max-width:350px;
        width:350px;
        border-left:4px solid rgba(128, 128, 128, 0.473);"
      >
        <div
          class="fixed bg-teal text-white"
          style="width: inherit;"
        >
          <div class="row q-pa-xs justify-between">
            <div>Anamnese</div>
            <div class="text-right">
              <q-btn
                flat
                size="xs"
                padding="xs"
                icon="icon-mat-close"
              />
            </div>
          </div>
        </div>
        <div class="q-mt-lg q-pt-xs">
          <div
            v-for="n in 20"
            :key="n"
          >
            {{ lorem }}
          </div>
        </div>
      </q-card-section>
    </q-card-section>
  </q-card>
</template>

<script setup>
// import { useStyledStore } from 'src/stores/app/styled'
import { onMounted, ref } from 'vue'

// const splitterModel = ref(65)
// const splitTwo = ref()
// const splitTwoWidth = ref(0)
const options = [
  { value: '', label: '' },
  { value: 1, label: 'Obat' },
  { value: 2, label: 'Makanan' },
  { value: 3, label: 'Udara' },
  { value: 4, label: 'Lain-lain' }
]
const model = ref(options[0].value)
const text = ref('')
const lorem = ref('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.')

// const style = useStyledStore()
// const wSt = computed(() => {
//   return splitterModel.value.offsetWidth + 8
// })
// function dragWidth() {
//   splitTwoWidth.value = splitTwo.value.offsetWidth
// }
onMounted(() => {
  //
  // splitTwoWidth.value = splitTwo.value.offsetWidth
  console.log(model.value)
  console.log(text.value)
})
</script>
