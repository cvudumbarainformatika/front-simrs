<template>
  <q-dialog persistent>
    <q-card style="width: 80vw; max-width: 80vw;">
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
        <div>
          <div class="row ">
            <div class="col-6">
              <div class="row q-col-gutter-sm q-pa-md">
                <q-input
                  v-model="store.ruangan.departement_uuid"
                  label="uuid Departement"
                  outlined
                  standout="bg-yellow-3"
                  dense
                  class="col-12"
                  readonly
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
                  readonly
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
                  readonly
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
                  readonly
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
                  readonly
                />
                <q-input
                  v-model="store.ruangan.phone"
                  label="Phone"
                  outlined
                  standout="bg-yellow-3"
                  dense
                  class="col-4"
                  :rules="[val => !!val || 'Harap diisi']"
                  hide-bottom-space
                />
                <q-input
                  v-model="store.ruangan.fax"
                  label="Fax"
                  outlined
                  standout="bg-yellow-3"
                  dense
                  class="col-4"
                  :rules="[val => !!val || 'Harap diisi']"
                  hide-bottom-space
                />
                <q-input
                  v-model="store.ruangan.email"
                  label="Email"
                  outlined
                  standout="bg-yellow-3"
                  dense
                  class="col-5"
                  :rules="[val => !!val || 'Harap diisi']"
                  hide-bottom-space
                />
                <q-input
                  v-model="store.ruangan.alamat"
                  label="Alamat"
                  outlined
                  standout="bg-yellow-3"
                  dense
                  class="col-7"
                  :rules="[val => !!val || 'Harap diisi']"
                  hide-bottom-space
                />
                <q-input
                  v-model="store.ruangan.rt"
                  label="RT"
                  outlined
                  standout="bg-yellow-3"
                  dense
                  class="col-2"
                  :rules="[val => !!val || 'Harap diisi']"
                  hide-bottom-space
                />
                <q-input
                  v-model="store.ruangan.rw"
                  label="RW"
                  outlined
                  standout="bg-yellow-3"
                  dense
                  class="col-2"
                  :rules="[val => !!val || 'Harap diisi']"
                  hide-bottom-space
                />
                <q-input
                  v-model="store.ruangan.longitude"
                  label="Longitude"
                  outlined
                  standout="bg-yellow-3"
                  dense
                  class="col-3"
                  :rules="[val => !!val || 'Harap diisi']"
                  hide-bottom-space
                />
                <q-input
                  v-model="store.ruangan.latitude"
                  label="Latitude"
                  outlined
                  standout="bg-yellow-3"
                  dense
                  class="col-3"
                  :rules="[val => !!val || 'Harap diisi']"
                  hide-bottom-space
                />
                <q-input
                  v-model="store.ruangan.altitude"
                  label="Altitude"
                  outlined
                  standout="bg-yellow-3"
                  dense
                  class="col-2"
                  :rules="[val => !!val || 'Harap diisi']"
                  hide-bottom-space
                />
              </div>
            </div>

            <div
              style="height: 350px;"
              class="col-6 scroll q-pa-sm bg-dark"
            >
              <div
                v-if="!store.ruangan.satset"
                class="column full-height flex-center"
              >
                <div class="text-white">
                  Belum Terkoneksi Ke satu sehat
                </div>
              </div>
              <pre
                v-else
                class="text-yellow "
              >{{ store.ruangan?.satset?.response }}</pre>
            </div>
          </div>
        </div>

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
                type="submit"
                :disable="store.loading"
                :loading="store.loading"
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

function onSubmit () {
  store.updateDataRuangan()
    .then(() => {
      store.dialogFormRuangan = false
    })
  // .then(() => {
  //   store.dialogFormRuangan = false
  //   if (store.type === 'rajal') {
  //     store.getRuanganRajal()
  //   }
  //   else if (store.type === 'ranap') {
  //     store.getRuanganRanap()
  //   }
  // })
}
</script>
