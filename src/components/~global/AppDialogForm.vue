<template>
  <q-dialog
    ref="dialogR"
    persistent
  >
    <q-card style="width:400px;">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">
          {{ title }}
        </div>
        <q-space />
        <q-btn
          v-close-popup
          icon="icon-mat-close"
          flat
          round
          dense
        />
      </q-card-section>

      <q-separator class="q-mt-md" />
      <q-form
        ref="formRef"
        @submit="saveForm"
      >
        <q-card-section>
          <div class="q-px-md">
            <slot />
          </div>
        </q-card-section>
        <q-separator />
        <q-card-actions align="right">
          <q-btn
            v-close-popup
            label="Close"
            flat
            color="dark"
          />
          <q-btn
            label="Simpan"
            type="submit"
            flat
            color="primary"
            :loading="loading"
            :disable="loading"
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from 'vue'

const formRef = ref(null)
const dialogR = ref(null)

defineProps({
  title: {
    type: String,
    default: 'Title'
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['saveForm'])

function resetForm () {
  console.log('child', formRef.value)
  formRef.value.resetValidation()
}
defineExpose({ resetForm })

function saveForm () {
  emits('saveForm')
}
</script>
