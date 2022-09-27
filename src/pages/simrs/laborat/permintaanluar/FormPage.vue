<template>
  <q-page>
    <q-card>
      <q-card-section>
        <q-form>
          <div class="row q-col-gutter-lg">
            <div class="col-md-6 col-lg-6 col-xl-6 col-xs-12">
              <div class="row q-col-gutter-md">
                <app-input
                  label="Nota (auto)"
                  readonly
                  style="width:40%"
                />
                <app-input
                  label="Nomor Surat"
                  outlined
                  style="width:60%"
                />
                <app-input
                  label="Nomor KTP"
                  style="width:70%"
                />
                <app-input
                  label="Nama"
                  style="width:100%"
                />
                <app-input
                  label="Tempat Lahir"
                  style="width:40%"
                />
                <app-input
                  label="Tgl Lahir"
                  style="width:40%"
                />
                <app-input
                  label="sampel diambil"
                  style="width:40%"
                />
                <app-input
                  label="jam"
                  style="width:40%"
                />
                <app-input
                  label="sampel selesai"
                  style="width:40%"
                />
                <app-input
                  label="jam"
                  style="width:40%"
                />
                <app-input
                  label="kelamin"
                  style="width:40%"
                />
                <app-input
                  label="alamat"
                  style="width:100%"
                />
                <app-input
                  label="agama"
                  style="width:40%"
                />
                <app-input
                  label="pekerjaan"
                  style="width:40%"
                />
                <app-input
                  label="Jenis Pembayaran"
                  style="width:40%"
                />
                <app-input
                  label="No Telp"
                  style="width:40%"
                />
                <app-input
                  label="Dokter Pengirim"
                  style="width:70%"
                />
              </div>
            </div>
            <div class="col-md-6 col-lg-6 col-xl-6 col-xs-12">
              <q-tabs
                v-model="tab"
                dense
                class="bg-grey-3"
                active-color="primary"
                indicator-color="primary"
                align="left"
                narrow-indicator
              >
                <q-tab
                  name="mails"
                  label="Mails"
                />
                <q-tab
                  name="alarms"
                  label="Alarms"
                />
                <q-tab
                  name="movies"
                  label="Movies"
                />
              </q-tabs>
              <q-separator />

              <q-tab-panels
                v-model="tab"
                animated
              >
                <q-tab-panel name="mails">
                  <div class="text-h6">
                    Mails
                  </div>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </q-tab-panel>

                <q-tab-panel name="alarms">
                  <div class="text-h6">
                    Alarms
                  </div>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </q-tab-panel>

                <q-tab-panel name="movies">
                  <div class="text-h6">
                    Movies
                  </div>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </q-tab-panel>
              </q-tab-panels>
            </div>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>
<script setup>
import { ref } from 'vue'

const tab = ref('mails')
</script>
