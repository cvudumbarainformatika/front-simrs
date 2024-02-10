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

          <!-- <q-btn
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
          </q-btn> -->
          <!-- <q-btn
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
          </q-btn> -->
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
      <q-card-section class="q-mt-xl">
        <div class="text-center text-weight-bold text-subtitle2">
          PERSETUJUAN UMUM / GENERAL CONSENT RAWAT JALAN & IGD
        </div>
      </q-card-section>
      <q-separator />
      <!-- <q-card-section>
        <div class="row justify-between">
          <app-input-date
            v-model="store.form.tanggal"
            label="tanggal"
            outlined
          />
          <div style="min-width: 200px;">
            <app-autocomplete
              v-model="store.form.petugas"
              label="petugas"
              outlined
            />
          </div>
        </div>
      </q-card-section> -->
      <q-separator />
      <q-card-section>
        <div class="text-weight-bold text-center">
          IDENTITAS YANG BERTANDATANGAN
        </div>
        <div class="text-caption text-center">
          (Abaikan Jika yang mengisi pasiennya sendiri)
        </div>
        <div class="row justify-between q-mt-md q-col-gutter-md">
          <div class="col-6">
            <!-- <app-input
              v-model="store.form.hubunganpasien"
              label="Hubungan Pasien"
              class="q-mb-sm"
              outlined
            /> -->
            <q-select
              v-model="store.form.hubunganpasien"
              outlined
              :options="store.options"
              dense
              label="Outlined"
              class="q-mb-sm"
              @update:model-value="changeHubunganPasien"
            />
            <app-input
              v-model="store.form.nama"
              label="nama"
              class="q-mb-sm"
              outlined
            />
            <app-input
              v-model="store.form.nohp"
              label="No Telp / Hp"
              class="q-mb-sm"
              outlined
            />
          </div>
          <div class="col-6">
            <q-input
              v-model="store.form.alamat"
              outlined
              type="textarea"
            />
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
            @click="emits('openPreviewGc')"
          >
            <q-icon
              left
              size="sm"
              name="icon-mat-menu_book"
            />
            <div>Informasi General Consent</div>
          </q-btn>
          <!-- <q-btn
            color="primary q-ma-md"
            @click="emits('openPreviewGc')"
          >
            <q-icon
              left
              size="sm"
              name="icon-mat-menu_book"
            />
            <div>Hak Dan Kewajiban Pasien</div>
          </q-btn> -->
        </div>
      </q-card-section>
      <q-separator />

      <q-card-section class="q-pb-xl">
        <div class="row q-px-xl q-col-gutter-xl">
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
              <div class="q-py-lg" />
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
      <q-separator />
      <q-card-section class="q-mb-xl text-center">
        <q-btn
          color="primary"
          label="Simpan General Consent Pasien"
          @click="store.saveGeneralConsentPasien(app?.user?.pegawai)"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useGeneralConsentStore } from 'src/stores/simrs/pendaftaran/generalconsent/index'
import { useAplikasiStore } from 'src/stores/app/aplikasi'

const maximizedToggle = ref(true)
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
  console.log(props.pasien)
  // store.resetFORM()
  changeHubunganPasien()
})

function changeHubunganPasien() {
  if (store.form.hubunganpasien === 'Diri Sendiri') {
    store.setForm('nama', props.pasien ? props.pasien.nama : '-')
    store.setForm('norm', props.pasien ? props.pasien.norm : '-')
    store.setForm('alamat', props.pasien ? props.pasien.alamat : '-')
    store.setForm('nohp', props.pasien ? props.pasien.nohp : '-')
  } else {
    store.setForm('nama', null)
    store.setForm('norm', props.pasien ? props.pasien.norm : '-')
    store.setForm('alamat', null)
    store.setForm('nohp', null)
  }
}

function cekTtdPasien() {
  const ttdpasien = props?.pasien?.ttdpasien
  store.setForm('ttdpasien', ttdpasien)
  console.log('cekttd', store.form)
}
</script>
