<template>
  <q-dialog
    persistent
    style="width:50vw;"
  >
    <q-card style="max-width:80vw;">
      <q-card-section>
        <div class="text-h6">
          {{ label }}
        </div>
      </q-card-section>

      <q-separator />
      <div
        style="max-height: 70vh;"
        class="scroll"
      >
        <slot />
      </div>
      <!-- <q-card-section
        style="max-height: 70vh; height:70vh"
        class="scroll"
      >
        <slot />
      </q-card-section> -->

      <q-separator />

      <q-card-actions align="right">
        <app-btn
          v-close-popup
          color="dark"
          :label="labelBtnClose"
          :loading="loading"
          @click="emits('onCancel')"
        />
        <app-btn
          :loading="loading"
          :disble="loading"
          :label="labelBtnOk"
          @click="emits('onOk')"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup>
const emits = defineEmits(['onOk', 'onCancel'])
defineProps({
  loading: {
    type: Boolean,
    default: false
  },
  label: {
    type: String,
    default: 'Dialog'
  },
  labelBtnOk: {
    type: String,
    default: 'Ok'
  },
  labelBtnClose: {
    type: String,
    default: 'Close'
  },
  size: {
    type: String,
    default: 'xl'
  }
})
</script>
