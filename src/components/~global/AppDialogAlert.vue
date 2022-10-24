<template>
  <q-dialog
    ref="dialogRef"
    @hide="onDialogHide"
  >
    <q-card class="q-dialog-plugin">
      <q-card-section>
        <span class="text-weight-bold f-16">Konfirmasi</span>
      </q-card-section>
      <q-card-section :class="`bg-${props.color} text-white`">
        <div
          class="column flex-center"
          style="min-height:100px"
        >
          {{ props.msg }}
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <app-btn
          color="dark"
          label="Cancel"
          @click="onDialogCancel"
        />
        <app-btn
          :color="color"
          label="OK"
          @click="onOKClick"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useDialogPluginComponent } from 'quasar'

const props = defineProps({
  msg: {
    type: String,
    default: 'Ini Text Message'
  },
  color: {
    type: String,
    default: 'primary'
  }
})

defineEmits([
  // REQUIRED; need to specify some events that your
  // component will emit through useDialogPluginComponent()
  ...useDialogPluginComponent.emits
])

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()
// dialogRef      - Vue ref to be applied to QDialog
// onDialogHide   - Function to be used as handler for @hide on QDialog
// onDialogOK     - Function to call to settle dialog with "ok" outcome
//                    example: onDialogOK() - no payload
//                    example: onDialogOK({ /*...*/ }) - with payload
// onDialogCancel - Function to call to settle dialog with "cancel" outcome

// this is part of our example (so not required)
function onOKClick () {
  // on OK, it is REQUIRED to
  // call onDialogOK (with optional payload)
  onDialogOK()
  // or with payload: onDialogOK({ ... })
  // ...and it will also hide the dialog automatically
}
</script>
