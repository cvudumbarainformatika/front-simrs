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
    style="height: 80vh"
    class=""
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
      </div>
    </template>

    <template #after>
      <div class="q-pa-md">
        <div class="text-h6 q-mb-md">
          Anamnese / Pemeriksaan
        </div>
        <div
          v-for="n in 20"
          :key="n"
          class="q-my-md"
        >
          {{ n }}. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.
        </div>
      </div>
    </template>
  </q-splitter>
</template>

<script setup>
import { ref } from 'vue'

const text = ref('')
const options = [
  { value: '', label: 'Pilih Riwayat Alergi' },
  { value: 1, label: 'Obat' },
  { value: 2, label: 'Makanan' },
  { value: 3, label: 'Udara' },
  { value: 4, label: 'Lain-lain' }
]
const model = ref(options[0].value)
const splitterModel = ref(70)
</script>
