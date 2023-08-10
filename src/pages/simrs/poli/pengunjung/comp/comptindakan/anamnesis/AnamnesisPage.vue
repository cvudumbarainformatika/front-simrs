<template>
  <!-- <div class="row q-pa-md q-col-gutter-md">
    <div class="col-8">
      <div class="row q-mb-md">
        <div class="col-2">
          Keluhan Utama
        </div>
        <div class="col-10">
          <q-input
            v-model="text"
            outlined
            type="textarea"
          />
        </div>
      </div>
      <div class="row q-mb-md">
        <div class="col-2">
          Riwayat Penyakit
        </div>
        <div class="col-10">
          <q-input
            v-model="text"
            outlined
            type="textarea"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-2">
          Riwayat Alergi
        </div>
        <div class="col-10">
          <q-select
            v-model="model"
            dense
            outlined
            :options="options"
            stack-label
            label="Riwayat Alergi"
            emit-value
            map-options
          >
            <template #append>
              <q-icon
                v-if="model !== null"
                class="cursor-pointer"
                name="icon-mat-clear"
                size="sm"
                @click.stop.prevent="model = ''"
              />
            </template>
          </q-select>
        </div>
      </div>
    </div>
    <div class="col-4">
      <div class="full-height bg-red">
        dsfs
      </div>
    </div>
  </div> -->
  <q-splitter
    v-model="splitterModel"
    :style="`height: ${style.componentfull? 90: 70}vh`"
    class=""
    @update:model-value="dragWidth"
  >
    <template #before>
      <div class="q-pa-md">
        <div class="">
          <div class="row q-mb-md">
            <div class="col-2">
              Keluhan Utama
            </div>
            <div class="col-10">
              <q-input
                v-model="text"
                outlined
                type="textarea"
              />
            </div>
          </div>
          <div class="row q-mb-md">
            <div class="col-2">
              Riwayat Penyakit
            </div>
            <div class="col-10">
              <q-input
                v-model="text"
                outlined
                type="textarea"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-2">
              Riwayat Alergi
            </div>
            <div class="col-10">
              <q-select
                v-model="model"
                dense
                outlined
                :options="options"
                stack-label
                label="Riwayat Alergi"
                emit-value
                map-options
              >
                <template #append>
                  <q-icon
                    v-if="model !== null"
                    class="cursor-pointer"
                    name="icon-mat-clear"
                    size="sm"
                    @click.stop.prevent="model = ''"
                  />
                </template>
              </q-select>
            </div>
          </div>
          <div class="text-right q-mt-lg">
            <app-btn label="Simpan" />
          </div>
        </div>
        <div class="q-pb-xl" />
      </div>
    </template>

    <template #after>
      <div
        ref="splitTwo"
        class="bg-yellow-2"
      >
        <div
          class="bg-teal text-white fixed z-top"
          :style="`width:${wSt}px;`"
        >
          <div class="row q-pa-xs">
            <div class="col-grow">
              Anamnese / Pemeriksaan
            </div>
            <div class="col-auto">
              A
            </div>
          </div>
        </div>
        <q-separator class="q-pt-lg" />
        <q-card
          flat
          class="bg-yellow-2 scroll"
        >
          <q-list
            no-padding
            separator
          >
            <q-item
              v-for="n in 10"
              :key="n"
            >
              <q-item-section>
                <q-item-label>Keluhan Utama</q-item-label>
                <q-item-label
                  caption
                  lines="2"
                >
                  Isi Keluhan Utama
                </q-item-label>
                <q-item-label>Riwayat Penyakit</q-item-label>
                <q-item-label
                  caption
                  lines="2"
                >
                  Isi Riwayat Penyakit
                </q-item-label>
                <q-item-label>Riwayat Alergi</q-item-label>
                <q-item-label
                  caption
                  lines="2"
                >
                  Isi Riwayat Alergi
                </q-item-label>
              </q-item-section>

              <q-item-section
                side
              >
                <q-btn
                  flat
                  round
                  color="primary"
                  size="sm"
                  icon="icon-mat-delete"
                />
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </div>
    </template>
  </q-splitter>
</template>

<script setup>
import { useStyledStore } from 'src/stores/app/styled'
import { computed, onMounted, ref } from 'vue'

const splitterModel = ref(65)
const splitTwo = ref()
const splitTwoWidth = ref(0)
const text = ref('')
const options = [
  { value: '', label: 'Pilih Riwayat Alergi' },
  { value: 1, label: 'Obat' },
  { value: 2, label: 'Makanan' },
  { value: 3, label: 'Udara' },
  { value: 4, label: 'Lain-lain' }
]
const model = ref(options[0].value)

const style = useStyledStore()
const wSt = computed(() => {
  return splitterModel.value.offsetWidth + 8
})
function dragWidth() {
  // console.log(splitterModel.value)
  // console.log('width', splitTwo.value.offsetWidth)
  splitTwoWidth.value = splitTwo.value.offsetWidth
}
onMounted(() => {
  //
  splitTwoWidth.value = splitTwo.value.offsetWidth
})
</script>
