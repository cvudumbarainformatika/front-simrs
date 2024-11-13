<template>
  <q-card>
    <q-card-section>
      <div class="text-h6">
        Perbaikan Mutasi Keluar (Depo Floor Stok)
      </div>
      <div v-for="item in props.data?.data?.mutasikeluar" :key="item">
        {{ item }}
      </div>
    </q-card-section>
    <q-card-actions align="right">
      <q-btn flat label="Close" @click="emits('close')" />
      <q-btn color="primary" label="Simpan" @click="emits('simpan')" />
    </q-card-actions>
  </q-card>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Object,
    default: () => {}
  }
})
const emits = defineEmits(['close', 'simpan'])
</script>
