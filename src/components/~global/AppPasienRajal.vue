<template>
  <q-dialog
    persistent
    :maximized="maximizedToggle"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card
      class="bg-grey-4"
      flat
    >
      <q-bar class="bg-primary text-white">
        <q-space />

        <q-btn
          dense
          flat
          icon="icon-mat-minimize"
          :disable="!maximizedToggle"
          @click="maximizedToggle = false"
        >
          <q-tooltip
            v-if="maximizedToggle"
            class="bg-white text-primary"
          >
            Minimize
          </q-tooltip>
        </q-btn>
        <q-btn
          dense
          flat
          icon="icon-mat-crop_square"
          :disable="maximizedToggle"
          @click="maximizedToggle = true"
        >
          <q-tooltip
            v-if="!maximizedToggle"
            class="bg-white text-primary"
          >
            Maximize
          </q-tooltip>
        </q-btn>
        <q-btn
          v-close-popup
          dense
          flat
          icon="icon-mat-close"
        >
          <q-tooltip class="bg-white text-primary">
            Close
          </q-tooltip>
        </q-btn>
      </q-bar>

      <q-card-section>
        <div class="row q-col-gutter-md">
          <!-- IDENTITAS PASIEN -->
          <div class="col-md-3 col-lg-3 col-xl-3 col-sm-12 col-xs-12">
            <q-card flat>
              <q-img
                src="https://picsum.photos/500/300"
                :ratio="1"
              />
              <q-card-section>
                <div class="text-h6">
                  ini nanti Nama Pasien
                </div>
                <div class="text-subtitle2 text-right">
                  <div class="text-caption">
                    NO. REKAM MEDIS
                  </div>
                  <div class="text-weight-bold">
                    56789678
                  </div>
                </div>
              </q-card-section>
              <q-separator />
              <q-list separator>
                <q-item>
                  <q-item-section>
                    <q-item-label caption>
                      💳 Nik
                    </q-item-label>
                    <q-item-label>
                      Alamat
                    </q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-item-label caption>
                      🃏 Noka JKN
                    </q-item-label>
                    <q-item-label>
                      Alamat
                    </q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-item-label caption>
                      📞 phone / Hp
                    </q-item-label>
                    <q-item-label>
                      Alamat
                    </q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-item-label caption>
                      📍 Alamat
                    </q-item-label>
                    <q-item-label>
                      Alamat
                    </q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-item-label caption>
                      ⚥ Jenis Kelamin
                    </q-item-label>
                    <q-item-label>
                      Alamat
                    </q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-item-label caption>
                      ✒️ Usia
                    </q-item-label>
                    <q-item-label>
                      Alamat
                    </q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-item-label caption>
                      ♡ ♥💕 Status Pernikahan
                    </q-item-label>
                    <q-item-label>
                      Alamat
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card>
          </div>
          <div class="col-md-9 col-lg-9 col-xl-9 col-sm-12 col-xs-12">
            <!-- RIWAYAT KUNJUNGAN -->
            <q-card flat>
              <div class="bg-deep-orange text-white q-pa-md">
                <div class="row items-center justify-between">
                  <div class="text-subtitle1">
                    📜 Riwayat Kunjungan Rawat Jalan Pasien
                  </div>
                  <div>
                    <q-icon
                      name="icon-mat-fullscreen"
                      size="md"
                      class="cursor-pointer"
                    />
                  </div>
                </div>
              </div>
              <q-card-section>
                <q-timeline color="secondary">
                  <q-timeline-entry
                    title="Event Title"
                    subtitle="February 22, 1986"
                  >
                    <div>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </div>
                  </q-timeline-entry>

                  <q-timeline-entry
                    title="Event Title"
                    subtitle="February 21, 1986"
                    icon="icon-mat-delete"
                  >
                    <div>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </div>
                  </q-timeline-entry>
                </q-timeline>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { ref } from 'vue'

const maximizedToggle = ref(true)
</script>
