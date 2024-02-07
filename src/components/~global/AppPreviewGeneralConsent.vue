<template>
  <q-dialog
    persistent
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card
      flat
      style="min-width:90vw; "
    >
      <q-bar class="bg-secondary">
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
        style="max-height: 90vh"
        class="scroll bg-grey-4"
      >
        <master-general-consent
          :editable-master="false"
          :isi-pasien="pasien"
        />
        <!-- </div> -->
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
defineProps({
  pasien: {
    type: Object,
    default: null
  }
})
const emits = defineEmits(['close'])
</script>
