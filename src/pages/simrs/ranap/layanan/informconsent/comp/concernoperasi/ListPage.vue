<template>
  <div class="q-pa-md">
    <q-card v-for="item in pasien?.informconcern" :key="item" class="q-mb-md">
      <q-card-section>
        <div class="text-subtitle">
          INFORMED CONSENT
        </div>
        <div class="text-bold f-14">
          {{ item?.jenis }}
        </div>
        <q-separator class="q-my-sm" />
        <div class="flex items-center justify-between">
          <div>
            <q-btn flat icon="icon-mat-delete" padding="xs" size="sm" round color="negative" @click="emits('delete', item)" />
          </div>
          <div>
            <q-btn flat icon="icon-fa-file-regular" padding="xs" round color="primary" @click="emits('preview', item)" />
          </div>
        </div>
      </q-card-section>
    </q-card>
    <div style="margin-bottom: 100px;" />
  </div>
</template>

<script setup>
defineProps({
  pasien: {
    type: Object,
    default: null
  },
  menu: {
    type: Object,
    default: null
  }
})

const emits = defineEmits(['preview'])
</script>
