<template>
  <div class="cursor-pointer non-selectable row items-center justify-between bg-yellow-2 q-pa-xs full-width">
    <div class="q-gutter-xs">
      .
    </div>
    <div
      class="q-gutter-xs"
    >
      <q-btn
        icon="icon-mat-refresh"
        color="negative"
        size="sm"
        padding="sm"
        @click="resetTanda"
      >
        <q-tooltip>
          Reset Penandaan
        </q-tooltip>
      </q-btn>

      <q-btn
        icon="icon-mat-save"
        color="primary"
        size="sm"
        padding="sm"
        label="Simpan Gambar"
        @click="saveImage"
      />
    </div>
  </div>
</template>
<script setup>

const emits = defineEmits(['reset', 'saveImage'])

function resetTanda() {
  emits('reset')
}

function saveImage() {
  emits('saveImage')
}

</script>
