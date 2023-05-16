<template>
  <q-dialog
    @hide="$emit('hide')"
  >
    <q-card>
      <q-card-section>
        <div class="f-14 text-weight-bold">
          Cari Pasien
        </div>
        <div class="title-desc">
          Dialog pencarian pasien
        </div>
      </q-card-section>
      <q-separator />
    </q-card>
  </q-dialog>
</template>
<script setup>
defineEmits(['hide'])
</script>
