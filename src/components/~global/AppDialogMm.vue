<template>
  <q-dialog
    persistent
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
          v-if="btnClose"
          v-close-popup
          color="dark"
          :label="labelBtnClose"
          @click="emits('onClose')"
        />
        <app-btn
          v-if="btnOk"
          :label="labelBtnOk"
          @click="emits('onOk')"
        />
        <slot name="right-btn" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup>
const emits = defineEmits(['onOk', 'onClose'])
defineProps({
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
  },
  btnOk: {
    type: Boolean,
    default: true
  },
  btnClose: {
    type: Boolean,
    default: true
  }
})
</script>
