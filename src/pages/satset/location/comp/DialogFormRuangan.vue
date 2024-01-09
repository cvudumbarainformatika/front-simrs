<template>
  <q-dialog persistent>
    <q-card style="width: 70%;">
      <q-bar>
        <q-icon name="icon-eva-home-outline" />
        <div>Data Ruangan {{ store.ruangan.uraian }}</div>

        <q-space />

        <q-btn
          v-close-popup
          dense
          flat
          icon="icon-mat-close"
        >
          <q-tooltip>Close</q-tooltip>
        </q-btn>
      </q-bar>
      <q-separator />

      <q-form
        ref="formRef"
        @submit="onSubmit"
      >
        <q-card-section class="q-pa-sm">
          <div class="row q-col-gutter-sm">
            <q-input
              v-model="store.ruangan.departement_uuid"
              label="uuid Departement"
              outlined
              standout="bg-yellow-3"
              dense
              class="col-12"
              readonly
              :rules="[val => !!val || 'Harap diisi']"
              hide-bottom-space
            />
            <q-input
              v-model="store.ruangan.gedung"
              label="Gedung"
              outlined
              standout="bg-yellow-3"
              dense
              class="col-2"
              :rules="[val => !!val || 'Harap diisi']"
              hide-bottom-space
            />
            <q-input
              v-model="store.ruangan.lantai"
              label="Lantai"
              outlined
              standout="bg-yellow-3"
              dense
              class="col-2"
              :rules="[val => !!val || 'Harap diisi']"
              hide-bottom-space
            />
            <q-input
              v-model="store.ruangan.ruang"
              label="Ruangan No"
              outlined
              standout="bg-yellow-3"
              dense
              class="col-2"
              :rules="[val => !!val || 'Harap diisi']"
              hide-bottom-space
            />
            <q-input
              v-model="store.ruangan.uraian"
              label="Nama Ruangan"
              outlined
              standout="bg-yellow-3"
              dense
              class="col-6"
              :rules="[val => !!val || 'Harap diisi']"
              hide-bottom-space
            />
            <q-input
              v-model="store.ruangan.kode"
              label="Kode Ruangan"
              outlined
              standout="bg-yellow-3"
              dense
              class="col-4"
              :rules="[val => !!val || 'Harap diisi']"
              hide-bottom-space
            />
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions
          class="bg-primary"
        >
          <div class="row justify-between full-width">
            <div class="kiri">
              <!-- <q-btn
                label="Update Satu Sehat"
                color="teal"
              /> -->
            </div>
            <div class="kanan q-gutter-sm">
              <q-btn
                label="Update & Kirim ke Satset"
                color="orange"
              />
              <q-btn
                v-close-popup
                label="Tutup"
                color="dark"
              />
            </div>
          </div>
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useLocationSatsetStore } from 'src/stores/satset/location'
import { ref } from 'vue'

const store = useLocationSatsetStore()
const formRef = ref()

function onSubmit() {
  console.log('ok')
}
</script>
