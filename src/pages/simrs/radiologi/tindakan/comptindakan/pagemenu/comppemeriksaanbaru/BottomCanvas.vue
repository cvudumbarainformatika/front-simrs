<template>
  <div class="column">
    <div class="q-px-sm q-py-md flex flex-center full-width">
      <div
        class="bg-dark q-px-sm q-py-xs shadow-2"
        style="border-radius: 23px ;"
      >
        <!-- {{ tab }} -->
        <div
          v-if="!tab"
          class="row items-center"
        >
          <!-- <q-btn-group
            rounded
          > -->
          <q-btn
            color="negative"
            text-color="white"
            rounded
            icon="icon-mat-refresh"
            push
            size="sm"
            padding="sm"
            flat
            @click="resetTanda"
          >
            <q-tooltip>
              reset penandaan
            </q-tooltip>
          </q-btn>
          <q-separator
            vertical
            class="q-mx-sm"
            dark
          />
          <q-btn
            icon="icon-mat-save"
            text-color="white"
            size="sm"
            rounded
            :label="`simpan Gambar`"
            class="q-px-sm"
            :disable="store.loadingform"
            :loading="store.loadingform"
            @click="saveImage"
          />
          <q-separator
            vertical
            class="q-mx-sm"
            dark
          />
          <q-btn
            color="negative"
            text-color="white"
            rounded
            icon="icon-my-color_lens"
            push
            size="sm"
            padding="sm"
            flat
            @click="emits('isTemplate')"
          >
            <q-tooltip>
              Buka Template
            </q-tooltip>
          </q-btn>
          <q-btn
            color="negative"
            text-color="white"
            rounded
            icon="icon-mat-insert_photo"
            push
            size="sm"
            padding="sm"
            flat
            @click="emits('listImages')"
          >
            <q-tooltip>
              Gambar Tersimpan
            </q-tooltip>
          </q-btn>
        </div>
        <div
          v-else
          class="row items-center"
        >
          <q-btn
            color="negative"
            text-color="white"
            rounded
            icon="icon-mat-add"
            push
            size="sm"
            padding="sm"
            flat
            @click="emits('newEditor')"
          >
            <q-tooltip>
              Buat Gambar Baru
            </q-tooltip>
          </q-btn>
          <q-separator
            vertical
            class="q-mx-sm"
            dark
          />
          <q-btn
            color="negative"
            icon="icon-mat-close"
            text-color="white"
            size="sm"
            rounded
            :label="`Hapus Gambar`"
            class="q-px-sm"
            :disable="store.loadingform"
            :loading="store.loadingform"
            @click="emits('deleteImage')"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { usePemeriksaanFisik } from 'src/stores/simrs/pelayanan/poli/pemeriksaanfisik'

const store = usePemeriksaanFisik()

defineProps({
  tab: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['reset', 'saveImage', 'isTemplate', 'newEditor', 'listImages', 'deleteImage'])

function resetTanda() {
  emits('reset')
}

function saveImage() {
  emits('saveImage')
}

</script>
