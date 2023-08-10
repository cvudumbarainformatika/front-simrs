<template>
  <div class="row q-pa-md q-col-gutter-md">
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
      sad
    </div>
  </div>
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
</script>
