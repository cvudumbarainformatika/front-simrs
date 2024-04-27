<template>
  <q-dialog
    persistent
    transition-show="slide-up"
    transition-hide="slide-down"
    maximized
  >
    <div
      v-if="cetak"
      class="fit column flex-center absolute-top z-top dimmed"
    >
      <q-spinner-dots
        color="negative"
        size="4em"
      />
      <div class="text-negative">
        Harap Tunggu ...
      </div>
    </div>
    <q-card
      flat
    >
      <div class="column fit">
        <q-bar
          class="col-auto text-white q-pa-xs"
          :class="cetak? 'bg-primary':'bg-secondary'"
        >
          <div>📝 Preview General Consent Pasien</div>
          <q-space />

          <q-btn
            dense
            flat
            icon="icon-mat-refresh"
            @click="refresh=true"
          >
            <q-tooltip
              class="bg-white text-primary"
            >
              Refresh / Cancel Seluruh Perubahan
            </q-tooltip>
          </q-btn>
          <q-btn
            dense
            flat
            icon="icon-mat-close"
            @click="emits('close')"
          >
            <q-tooltip
              class="bg-white text-primary"
            >
              close
            </q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section
          style="max-height: 100vh"
          class="col full-height scroll bg-grey-4"
        >
          <master-general-consent
            :editable-master="false"
            :isi-pasien="pasien"
            :cetak="cetak"
            :refresh="refresh"
            @after-refresh="refresh=false"
          />
        <!-- </div> -->
        </q-card-section>
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from 'vue'
// import { useContent } from '../~static/generalconsent/content'

const refresh = ref(false)
defineProps({
  pasien: {
    type: Object,
    default: null
  },
  cetak: {
    type: Boolean,
    default: false
  }
})
const emits = defineEmits(['close'])
// const { isi, pasien, defaultForm, changeIsi, isOk, getDataIrja } = useContent(props?.isiPasien, true)

</script>
