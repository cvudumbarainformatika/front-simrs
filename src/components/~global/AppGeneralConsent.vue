<template>
  <q-dialog
    persistent
    :maximized="maximizedToggle"
    transition-show="slide-left"
    transition-hide="slide-right"
  >
    <q-card flat>
      <q-bar>
        <div>📝 Form General Consent Pasien</div>
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
          @click="emits('close')"
        >
          <q-tooltip class="bg-white text-primary">
            Close
          </q-tooltip>
        </q-btn>
      </q-bar>

      <q-card-section>
        <div class="text-center text-weight-bold text-subtitle2">
          PERSETUJUAN UMUM / GENERAL CONSENT RAWAT JALAN & IGD
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <div class="row justify-between">
          <app-input-date label="tanggal" />
          <app-autocomplete label="petugas" />
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <div class="text-weight-bold">
          IDENTITAS YANG BERTANDATANGAN
        </div>
        <div class="row justify-between q-mt-md">
          <div>
            <app-input
              label="nama"
              class="q-mb-sm"
            />
            <app-input label="Alamat" />
          </div>
          <div>
            <app-input
              label="No Telp / Hp"
              class="q-mb-sm"
            />
            <app-input label="Hubungan Pasien" />
          </div>
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <div class="text-center ">
          <div class="text-weight-bold text-subtitle1 q-mb-md">
            PASIEN DAN/ ATAU WALI HUKUM HARUS MEMBACA, MEMAHAMI DAN MENGISI INFORMASI BERIKUT
          </div>
          <q-btn color="teal">
            <q-icon
              left
              size="sm"
              name="icon-mat-menu_book"
            />
            <div>Informasi General Consent</div>
          </q-btn>
          <q-btn color="primary q-ma-md">
            <q-icon
              left
              size="sm"
              name="icon-mat-menu_book"
              @click="dialog == !dialog"
            />
            <div>Hak Dan Kewajiban Pasien</div>
          </q-btn>
        </div>
      </q-card-section>
      <q-separator />

      <q-card-section>
        <div class="row q-px-xl q-col-gutter-xl">
          <div class="col-6">
            <div class="text-center">
              <div>Petugas RS</div>
              <div
                class="ttd-petugas q-px-xl"
                style="min-height:150px; border:1px solid gray"
              />
              <div>Nama & Tanda Tangan</div>
            </div>
          </div>
          <div class="col-6">
            <div class="text-center">
              <div>Pasien / Wali</div>
              <div
                class="ttd-pasien q-px-xl"
                style="min-height:150px; border:1px solid gray"
              />
              <div>Nama & Tanda Tangan</div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useGeneralConsentStore } from 'src/stores/simrs/pendaftaran/generalconsent/index'

const maximizedToggle = ref(true)
const emits = defineEmits(['close', 'openPreviewGc'])

const dialog = ref(false)

defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

const store = useGeneralConsentStore()

onMounted(() => {
  store.getData()
})
</script>
