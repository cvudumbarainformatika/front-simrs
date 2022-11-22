<template>
  <q-dialog full-width>
    <q-card
      class="itu"
    >
      <q-bar>
        <q-space />
        <q-btn
          v-close-popup
          dense
          flat
          icon="icon-mat-close"
          @click="deleteImage"
        >
          <q-tooltip class="bg-white text-primary">
            Close
          </q-tooltip>
        </q-btn>
      </q-bar>
      <q-card-section>
        <q-img
          :src="store.image"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { useLiburAbsenStore } from 'src/stores/simrs/pegawai/user/libur/libur'

const store = useLiburAbsenStore()
const deleteImage = () => {
  store.image = ''
  store.setExpand()
}
</script>
