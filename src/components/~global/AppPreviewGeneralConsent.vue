<template>
  <q-dialog
    persistent
    transition-show="slide-up"
    transition-hide="slide-down"
    maximized
  >
    <q-card
      flat
    >
      <div class="column fit">
        <q-bar class="col-auto bg-secondary">
          <div>📝 Preview General Consent Pasien</div>
          <q-space />

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
          />
        <!-- </div> -->
        </q-card-section>
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup>
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

</script>
