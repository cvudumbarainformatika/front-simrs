<template>
  <q-card
    v-for="item in items"
    :key="item"
    flat
    bordered
    class="q-mb-sm"
  >
    <q-card-section>
      <div>Diinput Oleh : {{ item?.pegawai?.nama }}</div>
    </q-card-section>
    <q-separator />
    <q-card-section class="q-pa-sm row justify-between">
      <div>
        <q-btn
          icon="icon-mat-visibility"
          size="sm"
          flat
          round
          color="primary"
          @click="emits('preview', item)"
        >
          <q-tooltip>Lihat Selengkapnya</q-tooltip>
        </q-btn>
      </div>
      <div>
        <q-btn
          icon="icon-mat-delete"
          size="sm"
          flat
          round
          color="negative"
          @click="emits('hapus', item)"
        >
          <q-tooltip>Hapus Data</q-tooltip>
        </q-btn>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>

defineProps({
  items: {
    type: Array,
    default: () => []
  }
})

const emits = defineEmits(['hapus', 'edit', 'preview'])

</script>
