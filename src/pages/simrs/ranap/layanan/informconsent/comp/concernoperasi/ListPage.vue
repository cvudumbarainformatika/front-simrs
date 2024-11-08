<template>
  <div class="q-pa-md">
    <q-card v-for="item in pasien?.informconcern" :key="item" class="q-mb-md">
      <q-card-section>
        <div class="text-h6">
          Inform Concern
        </div>
        <div class="text-bold">
          {{ item?.jenis }}
        </div>
        <div class="text-right ">
          <q-btn flat icon="icon-mat-visibility" padding="xs" round color="primary" @click="emits('preview', item)" />
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
