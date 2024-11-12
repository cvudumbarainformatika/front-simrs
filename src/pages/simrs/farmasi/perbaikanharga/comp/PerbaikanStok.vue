<template>
  <q-card>
    <q-card-section>
      <div class="text-h6">
        Perbaikan Stok
      </div>
      <div>{{ props.data }}</div>
    </q-card-section>
    <q-card-actions align="right">
      <q-btn flat label="Close" @click="emits('close')" />
      <q-btn color="primary" label="Simpan" @click="emits('simpan')" />
    </q-card-actions>
  </q-card>
</template>

<script setup>
const emits = defineEmits(['close', 'simpan'])
const props = defineProps({
  data: {
    type: String,
    default: ''
  }
})
</script>
