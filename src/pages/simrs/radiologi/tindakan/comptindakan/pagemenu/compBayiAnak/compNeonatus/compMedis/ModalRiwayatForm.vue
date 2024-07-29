<template>
  <q-dialog>
    <q-card style="min-width: 40%;">
      <q-card-section class="row items-center q-pa-sm">
        <div class="f-14 text-weight-bold">
          Riwayat Persalinan
        </div>
        <q-space />
        <q-btn
          v-close-popup
          icon="icon-mat-close"
          flat
          round
          dense
          size="sm"
        />
      </q-card-section>
      <q-separator />
      <q-form @submit="onSubmit">
        <q-card-section>
          <q-input
            v-model="store.formRiwayat.kehamilanNo"
            label="Kehamilan No"
            autofocus
            dense
            outlined
            standout="bg-yellow-3"
            style="width: 30%;"
            class="q-mb-xs"
          />
          <q-input
            v-model="store.formRiwayat.penyulitKehamilan"
            label="Penyulit Kehamilan"
            autofocus
            dense
            outlined
            standout="bg-yellow-3"
            class="q-mb-xs"
          />
          <q-input
            v-model="store.formRiwayat.macamPersalinan"
            label="Macam Persalinan"
            autofocus
            dense
            outlined
            standout="bg-yellow-3"
            class="q-mb-xs"
          />
          <q-option-group
            v-model="store.formRiwayat.lp"
            :options="options"
            color="primary"
            inline
          />
          <q-option-group
            v-model="store.formRiwayat.hidupmati"
            :options="hidupMatis"
            color="primary"
            inline
          />
          <q-input
            v-model="store.formRiwayat.umursekarang"
            label="Umur Skr Wkt Mati"
            autofocus
            dense
            outlined
            standout="bg-yellow-3"
            class="q-mb-xs"
            style="width: 30%;"
          />
          <q-input
            v-model="store.formRiwayat.sebabKematian"
            label="Sebab Kematian"
            autofocus
            dense
            outlined
            standout="bg-yellow-3"
            class="q-mb-xs"
          />
        </q-card-section>
        <q-separator />
        <q-card-actions class="justify-between q-pa-md bg-yellow-3">
          <div>
            <q-btn
              v-close-popup
              label="Tutup"
              color="dark"
              class="q-px-lg"
              dense
            />
          </div>
          <div>
            <q-btn
              type="submit"
              label="Simpan"
              color="primary"
              :loading="store.loadingSave"
              :disable="store.loading"
              class="q-px-lg"
              dense
            />
          </div>
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useNeonatusMedisStore } from 'src/stores/simrs/pelayanan/poli/neonatusmedis'
import { onMounted } from 'vue'

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

// eslint-disable-next-line no-unused-vars
const store = useNeonatusMedisStore()

const options = [
  {
    label: 'Laki-laki',
    value: 'L'
  },
  {
    label: 'Perempuan',
    value: 'P'
  }
]
const hidupMatis = [
  {
    label: 'Hidup',
    value: 'Hidup'
  },
  {
    label: 'Mati',
    value: 'Mati'
  }
]

onMounted(() => {
  store.initFormRiwayat()
})

function onSubmit() {
  store.saveRiwayat(props?.pasien)
}
</script>
