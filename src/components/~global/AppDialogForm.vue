<template>
  <q-dialog persistent>
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

      <q-separator class="q-my-md" />
      <q-form
        @submit="saveForm"
      >
        <q-card-section>
          <slot />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            v-close-popup
            label="Close"
            flat
            color="primary"
          />
          <q-btn
            label="ok"
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

function saveForm() {
  emits('saveForm')
}
</script>
