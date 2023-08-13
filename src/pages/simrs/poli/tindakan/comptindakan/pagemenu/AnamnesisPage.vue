<template>
  <div class="full-height q-pa-sm">
    <div class="row q-col-gutter-x-xs full-height">
      <div class="col-7 full-height">
        <q-card
          flat
          bordered
          square
          class="full-height"
        >
          <q-card-section>
            <div class="f-14 text-weight-bold">
              Form Anamnesis
            </div>
          </q-card-section>
          <q-separator />
          <q-card-section
            class="scroll"
          >
            <div class="">
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
                    standout="bg-yellow-3"
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
                    standout="bg-yellow-3"
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
                <div class="col-6">
                  <q-select
                    v-model="model"
                    dense
                    outlined
                    :options="options"
                    stack-label
                    emit-value
                    map-options
                    standout="bg-yellow-3"
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
                    standout="bg-yellow-3"
                  />
                </div>
              </div>
            </div>
          </q-card-section>
          <!-- <q-separator class="q-my-lg" /> -->
          <q-card-actions
            align="right"
            class="bg-primary text-white absolute-bottom"
          >
            <app-btn
              color="dark"
              label="Simpan Data"
              tooltip="Simpan Data"
              tip
            />
          </q-card-actions>
        </q-card>
      </div>
      <div class="col-5 full-height">
        <q-card
          flat
          bordered
          square
          class="full-height bg-teal-2"
          style="overflow: hidden;"
        >
          <q-bar
            class="bg-teal text-white z-top"
            style="width: inherit;"
          >
            <div class="f-12">
              Data Anamnesis
            </div>
            <q-space />
            <q-btn
              dense
              size="sm"
              icon="icon-mat-close"
              flat
            />
          </q-bar>
          <q-card-section
            style="padding:0"
            class="full-height"
          >
            <q-scroll-area style="height:calc(100% - 40px);">
              <q-list separator>
                <q-item
                  v-for="n in 2"
                  :key="n"
                >
                  <q-item-section>
                    <q-item-label
                      lines="2"
                      class="f-12"
                    >
                      <span class="text-weight-bold">Keluhan Utama</span> : ....
                    </q-item-label>
                    <q-item-label
                      lines="2"
                    >
                      <span class="text-weight-bold">Riwayat Penyakit</span> : ....
                    </q-item-label>
                    <q-item-label
                      lines="2"
                    >
                      <span class="text-weight-bold">Riwayat Alergi</span> : ....
                    </q-item-label>
                    <q-item-label
                      lines="2"
                    >
                      <span class="text-weight-bold">Riwayat Pengobatan</span> : ....
                    </q-item-label>
                  </q-item-section>

                  <q-item-section
                    side
                    top
                  >
                    <q-btn
                      flat
                      round
                      size="sm"
                      icon="icon-mat-edit"
                    />
                    <q-btn
                      flat
                      round
                      size="sm"
                      icon="icon-mat-delete"
                      color="negative"
                    />
                  </q-item-section>
                </q-item>
                <q-separator />
              </q-list>
            </q-scroll-area>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script setup>
// import { useStyledStore } from 'src/stores/app/styled'
import { onMounted, ref } from 'vue'

// const splitterModel = ref(65)
// const splitTwo = ref()
// const splitTwoWidth = ref(0)
// const options = [
//   { value: '', label: '' },
//   { value: 1, label: 'Obat' },
//   { value: 2, label: 'Makanan' },
//   { value: 3, label: 'Udara' },
//   { value: 4, label: 'Lain-lain' }
// ]
const options = ['Obat', 'Makanan', 'Udara', 'Lain-lain']
const model = ref(options[0].value)
const text = ref('')
// const lorem = ref('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.')

onMounted(() => {
  //
  // splitTwoWidth.value = splitTwo.value.offsetWidth
  console.log(model.value)
  console.log(text.value)
})
</script>
