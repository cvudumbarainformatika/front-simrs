<template>
  <q-dialog full-width>
    <q-card
      class="itu full-width"
    >
      <q-card-section>
        <div class="f-14 text-weight-bold">
          Form Input
        </div>
        <div class="title-desc">
          Input Kategori Jadwal
        </div>
      </q-card-section>
      <q-card-section>
        <q-form
          ref="formReff"
          @submit="onSubmit"
          @reset="onReset"
        >
          nama masuk pulang warna durasi
          <div class="row q-col-gutter-sm q-mt-xs items-center">
            <div class="col-xs-12 col-sm-4">
              Nama Kategori
            </div>
            <div class="col-xs-12 col-sm-8">
              <app-input
                v-model="store.form.nama"
                label="Nama Kategori"
              />
            </div>
          </div>
          <div class="row q-col-gutter-sm q-mt-xs items-center">
            <!-- masuk -->
            <div class="col-xs-4 col-sm-4">
              Jam Masuk
            </div>
            <div class="col-xs-4 col-sm-1 text-center">
              <q-btn
                icon="icon-mat-access_time"
                round
                color="positive"
              >
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                  @before-show="store.updateMasuk"
                >
                  <q-time
                    v-model="store.form.masuk"
                    color="positive"
                  >
                    <div class="row items-center justify-end q-gutter-sm">
                      <q-btn
                        v-close-popup
                        label="Cancel"
                        color="dark"
                        flat
                      />
                      <q-btn
                        v-close-popup
                        label="OK"
                        color="primary"
                        flat
                        @click="store.saveMasuk"
                      />
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-btn>
            </div>
            <div class="col-xs-12 col-sm-3 text-center">
              <div class="q-mr-sm">
                <q-badge color="positive">
                  {{ store.form.masuk }}
                </q-badge>
                <q-tooltip
                  class="bg-primary"
                  anchor="center right"
                  self="center left"
                  :offset="[5, 5]"
                >
                  <strong class="">Klick tombol disamping</strong>
                  (
                  <q-icon name="icon-mat-keyboard_arrow_left" />)
                </q-tooltip>
              </div>
            </div>
          </div>
          <div class="row q-col-gutter-sm q-mt-xs items-center">
            <!-- pulang -->
            <div class="col-xs-4 col-sm-4">
              Jam Pulang
            </div>
            <div class="col-xs-4 col-sm-1 text-center">
              <q-btn
                icon="icon-mat-access_time"
                round
                color="negative"
              >
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                  @before-show="store.updatePulang"
                >
                  <q-time
                    v-model="store.form.pulang"
                    color="negative"
                  >
                    <div class="row items-center justify-end q-gutter-sm">
                      <q-btn
                        v-close-popup
                        label="Cancel"
                        color="dark"
                        flat
                      />
                      <q-btn
                        v-close-popup
                        label="OK"
                        color="primary"
                        flat
                        @click="store.savePulang"
                      />
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-btn>
            </div>
            <div class="col-xs-12 col-sm-3 text-center">
              <div class="q-mr-sm">
                <q-badge color="negative">
                  {{ store.form.pulang }}
                </q-badge>
              </div>
            </div>
          </div>
          <div class="row q-col-gutter-sm q-mt-xs items-center">
            <div class="col-xs-3 col-sm-4">
              warna
            </div>
            <div class="col-xs-3 col-sm-4">
              <!-- <app-autocomplete
                v-model="store.form.warna"
                label="Pilih warna"
                option-label="nama"
                option-value="value"
                autocomplete="nama"
                :source="store.colors"
              /> -->
              <q-btn
                icon="icon-mat-palette"
                round
                flat
                color="primary"
              >
                <q-menu
                  anchor="top right"
                  self="top left"
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-color
                    v-model="store.form.warna"
                    format-model="hex"
                  />
                </q-menu>
                <!-- @change="val => changeColor(i, val)" -->
              </q-btn>
            </div>
            <div class="col-xs-6 col-sm-4">
              <q-card
                flat
                class="text-white"
                :style="`background-color: ${store.form.warna };`"
              >
                <q-card-section>
                  <div :style="`color: ${store.form.warna };`">
                    {{ store.form.warna }}
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </div>
          <div class="row q-col-gutter-sm q-mt-xs items-center">
            <div class="col-xs-12 col-sm-4">
              Durasi Per-minggu
            </div>
            <div class="col-xs-12 col-sm-8">
              <div class="row q-col-gutter-md">
                <div class="col-6">
                  <app-input
                    v-model="store.form.jam"
                    label="jam"
                    type="number"
                  />
                </div>
                <div class="col-6">
                  <app-input
                    v-model="store.form.menit"
                    label="menit"
                    type="number"
                    valid
                  />
                </div>
              </div>
            </div>
          </div>
          <q-separator class="q-my-md" />
          <div class="text-right">
            <app-btn
              type="reset"
              color="dark"
              label="Cancel"
              class="q-mr-md"
            />
            <app-btn
              label="Simpan"
              :loading="store.loading"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { useKategoriJadwalStore } from 'src/stores/simrs/pegawai/master/kategori/kategori'

const store = useKategoriJadwalStore()

const onSubmit = () => {
  store.saveForm().then(() => {
    store.setOpen()
  }).catch(() => {
    store.setOpen()
  })
}
const onReset = () => {
  store.setOpen()
}
</script>
<style lang="scss" scoped>
.itu{
  width: 75vw !important;
}
</style>
