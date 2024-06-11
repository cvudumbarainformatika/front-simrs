<template>
  <q-dialog
    persistent
    :maximized="maximizedToggle"
    transition-show="slide-left"
    transition-hide="slide-right"
    @before-show="cekTtdPasien"
  >
    <q-card flat>
      <div
        class="fixed-top"
        style="z-index: 1;"
      >
        <q-bar class="bg-primary text-white">
          <div class="f-14">
            📝 Form General Consent Pasien
          </div>
          <q-space />
          <q-btn
            v-close-popup
            dense
            flat
            icon="icon-mat-close"
            @click="emits('close')"
          >
            <q-tooltip class="bg-white text-primary">
              Close
            </q-tooltip>
          </q-btn>
        </q-bar>
      </div>
      <q-card-section class="q-mt-lg">
        <div class="text-center text-weight-bold text-subtitle2">
          PERSETUJUAN UMUM / GENERAL CONSENT RAWAT JALAN & IGD
        </div>
      </q-card-section>
      <q-separator />
      <q-separator />
      <q-card-section>
        <div class="text-weight-bold text-center">
          IDENTITAS YANG BERTANDATANGAN
        </div>

        <div class="row justify-between q-mt-md q-col-gutter-md bg-grey-3">
          <div class="col-6 q-pa-md">
            <q-card class="q-pa-md">
              <div class="text-caption text-center">
                (Abaikan Jika yang mengisi pasiennya sendiri)
              </div>
              <!-- <q-select
                v-model="store.form.hubunganpasien"
                outlined
                :options="store.options"
                dense
                label="Outlined"
                class="q-mb-xs"
                @update:model-value="changeHubunganPasien"
              /> -->
              <app-input
                v-model="store.form.nama"
                label="Nama"
                class="q-mb-xs"
                outlined
              />
              <app-input
                v-model="store.form.nohp"
                label="No Telp / Hp"
                class="q-mb-xs"
                outlined
              />
              <q-input
                v-model="store.form.alamat"
                outlined
                type="textarea"
                rows="2"
                class="q-mb-xs"
                label="Alamat"
              />
              <q-select
                v-model="store.form.hubunganpasien"
                outlined
                :options="store.options"
                dense
                label="Hubungan Dengan Pasien"
                class="q-mb-xs"
                @update:model-value="changeHubunganPasien"
              />
            </q-card>
          </div>

          <div class="col-6 q-pa-md">
            <q-card class="q-pa-md">
              <div>Memberikan kuasa/ wewenang terhadap informasi kesehatan dan pengambilan keputusan kepada pihak yang di tunjuk pasien</div>
              <q-separator />
              <q-card-section>
                <div class="row">
                  <div class="col-auto">
                    <q-avatar
                      color="primary"
                      text-color="white"
                      size="25px"
                      class="q-mr-md"
                    >
                      1
                    </q-avatar>
                  </div>
                  <div class="col full-width">
                    <div class="full-width">
                      <app-input
                        v-model="store.form.wali1"
                        label="Yang diberi Kuasa"
                        class="q-mb-xs"
                        outlined
                        valid
                      />
                    </div>
                    <div class="full-width q-gutter-xs q-mt-sm">
                      <div>Hubungan dengan Pasien ?</div>
                      <q-radio
                        v-for="item in store.wali"
                        :key="item"
                        v-model="store.form.hubunganWali1"
                        :val="item"
                        :label="item"
                        color="teal"
                        dense
                        size="xs"
                      />

                      <q-btn
                        flat
                        round
                        color="red"
                        icon="icon-mat-refresh"
                        dense
                        @click="store.form.hubunganWali1=null"
                      />
                    </div>
                  </div>
                </div>
                <q-separator class="q-my-sm" />
                <div class="row">
                  <div class="col-auto">
                    <q-avatar
                      color="primary"
                      text-color="white"
                      size="25px"
                      class="q-mr-md"
                    >
                      2
                    </q-avatar>
                  </div>
                  <div class="col full-width">
                    <div class="full-width">
                      <app-input
                        v-model="store.form.wali2"
                        label="Yang diberi Kuasa"
                        class="q-mb-xs"
                        outlined
                        valid
                      />
                    </div>
                    <div class="full-width q-gutter-xs q-mt-sm">
                      <div>Hubungan dengan Pasien ?</div>
                      <q-radio
                        v-for="item in store.wali"
                        :key="item"
                        v-model="store.form.hubunganWali2"
                        :val="item"
                        :label="item"
                        color="teal"
                        dense
                        size="xs"
                      />

                      <q-btn
                        flat
                        round
                        color="red"
                        icon="icon-mat-refresh"
                        dense
                        @click="store.form.hubunganWali2=null"
                      />
                    </div>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <div class="text-center ">
          <div class="text-weight-bold text-subtitle1 q-mb-md">
            PASIEN DAN/ ATAU WALI HUKUM MEMBACA, MEMAHAMI DAN MENGISI INFORMASI BERIKUT
          </div>
          <q-btn
            color="teal"
            class="q-my-md"
            @click="emits('openPreviewGc')"
          >
            <q-icon
              left
              size="sm"
              name="icon-mat-menu_book"
            />
            <div>Informasi General Consent</div>
          </q-btn>
        </div>
        <div class="column flex-center q-mt-lg">
          <q-checkbox
            v-model="pernyataan"
            label="Saya
                    menjamin bahwa pasien sudah membaca dan menandatangani form consent
                    pembukaan data dari SATUSEHAT"
          />
        </div>
      </q-card-section>
      <q-separator />

      <!-- <q-card-section>
        <div class="column flex-center">
          <q-checkbox
            v-model="pernyataan"
            label="Saya
                    menjamin bahwa pasien sudah membaca dan menandatangani form consent
                    pembukaan data dari SATUSEHAT"
          />
        </div>
      </q-card-section> -->
      <q-separator />

      <q-card-section
        class="q-pb-xl"
      >
        <div class="row q-px-md q-col-gutter-xl">
          <div class="col-6">
            <div class="text-center">
              <div>Petugas RS</div>
              <!-- <div
                class="ttd-petugas q-px-xl"
                style="min-height:150px; border:1px solid gray"
              /> -->
              <!-- <app-ttd
                :ttd="store.form.ttdpetugas"
                @save-ttd="(val)=> store.setForm('ttdpetugas',val)"
              /> -->
              <!-- <div class="q-py-lg" /> -->
              <!-- <app-ttd-wacom
                :key="pasien"
                :ttd="store.form.ttdpetugas"
                @save-ttd="(val)=> store.setForm('ttdpetugas',val)"
              /> -->
              <div class="row full-width text-center justify-center">
                <div style="width: 200px;">
                  <vue-qrcode
                    :value="qrUrl"
                    tag="svg"
                    :options="{
                      errorCorrectionLevel: 'Q',
                      color: {
                        dark: '#000000',
                        light: '#ffffff',
                      },
                      margin:2
                    }"
                  />
                </div>
              </div>
              <div>{{ app?.user?.pegawai?.nama }}</div>
            </div>
          </div>
          <div class="col-6">
            <div class="text-center">
              <div>Pasien / Wali</div>
              <!-- <app-ttd
                :ttd="store.form.ttdpasien"
                @save-ttd="(val)=> store.setForm('ttdpasien',val)"
              /> -->
              <app-ttd-wacom
                :key="pasien"
                :ttd="store.form.ttdpasien"
                @save-ttd="(val)=> store.setForm('ttdpasien',val)"
              />
              <div>{{ pasien?.nama }}</div>
            </div>
          </div>
        </div>
      </q-card-section>
      <q-card-section
        class="q-mb-xl text-center"
        style="margin-top: -20px;"
      >
        <q-separator class="q-mb-md" />
        <q-btn
          color="primary"
          label="Simpan General Consent Pasien"
          @click="saveGeneralConsent"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useGeneralConsentStore } from 'src/stores/simrs/pendaftaran/generalconsent/index'
import { useAplikasiStore } from 'src/stores/app/aplikasi'

const maximizedToggle = ref(true)
const pernyataan = ref(false)
const app = useAplikasiStore()
const emits = defineEmits(['close', 'openPreviewGc'])

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

const store = useGeneralConsentStore()

onMounted(() => {
  // store.getData()
  // console.log(props.pasien)
  // store.resetFORM()
  cekTtdPasien()
  changeHubunganPasien()
})

function changeHubunganPasien () {
  if (store.form.hubunganpasien === 'Diri Sendiri') {
    store.setForm('nama', props.pasien ? props.pasien.nama : '-')
    store.setForm('norm', props.pasien ? props.pasien.norm : '-')
    store.setForm('alamat', props.pasien ? props.pasien.alamat : '-')
    store.setForm('nohp', props.pasien ? props.pasien.nohp : '-')
  }
  else {
    store.setForm('nama', null)
    store.setForm('norm', props.pasien ? props.pasien.norm : '-')
    store.setForm('alamat', null)
    store.setForm('nohp', null)
  }
}

function cekTtdPasien () {
  // const ttdPas = props?.pasien?.generalcons?.ttdpasien_url
  // store.form.ttdpasien = ttdPas
  const ttdpetugas = app?.user?.pegawai?.ttdpegawai
  const ttdpasien = props?.pasien?.generalcons?.ttdpasien_url ?? props?.pasien?.ttdpasien
  store.setForm('ttdpasien', ttdpasien)
  store.setForm('ttdpetugas', ttdpetugas)
  console.log('cekttd', ttdpasien)
}

const qrUrl = computed(() => {
  const noreg = props?.pasien?.norm// noreg
  const dok = 'GENERAL-CONSENT.png'
  const asal = 'GENERAL-CONSENT'
  const enc = btoa(`${noreg}|${dok}|${asal}`)
  return `https://rsud.probolinggokota.go.id/dokumen-simrs/legalitas/${enc}`
  // return `https://xenter.my.id/qr-document?noreg=${noreg}&dokumen=${dok}&asal=${asal}`
})

function saveGeneralConsent () {
  store.saveGeneralConsentPasien(app?.user?.pegawai)
    .then(() => {
      // ini buat pdf
      emits('openPreviewGc', 'cetak')
    })
}
</script>
