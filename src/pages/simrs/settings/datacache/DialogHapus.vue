<template>
  <q-dialog transition-show="flip-down" transition-hide="flip-up" @show="onShow">
    <q-card class="bg-primary text-white">
      <q-bar>
        <div>Hapus Cache</div>

        <q-space />

        <q-btn dense flat icon="icon-mat-close" v-close-popup>
          <q-tooltip class="bg-white text-primary">
            Close
          </q-tooltip>
        </q-btn>
      </q-bar>

      <q-card-section style="min-width: 40vw;">
        <div class="text-h6">
          {{ item?.nama }} {{ ketId }}
        </div>
        <div><strong>{{ item?.ketId===null ? 'Tidak ada Id' : item?.ketId }}</strong></div>
      </q-card-section>
      <q-form @submit="onSubmit">
        <q-card-section v-if="item?.ketId" class="q-pa-lg bg-white">
          <app-input-simrs v-model="ketId" label="Masukkan Id nya" :valid="{ required: true}" />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn label="Cancel" color="dark" v-close-popup />
          <q-btn :loading="wait" :disabled="wait" type="submit" label="Hapus cache" color="negative" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { api } from 'src/boot/axios'
import { notifSuccessVue } from 'src/modules/utils'
import { ref } from 'vue'

const emits = defineEmits(['close'])

const ketId = ref(null)
const wait = ref(false)

const props = defineProps({
  item: {
    type: Object,
    default: null
  }
})

const onShow = () => {
  ketId.value = null
}

const onSubmit = () => {
  wait.value = true

  return new Promise((resolve, reject) => {
    const payload = {
      nama: props.item?.nama,
      ketId: ketId.value
    }
    api.post('v1/datacache/hapus-cache', payload)
      .then((resp) => {
        console.log(resp)
        if (resp.status === 200) {
          notifSuccessVue('Data cache success di hapus')
        }
        wait.value = false
        emits('close', true)
        resolve(resp)
      })
      .catch((err) => {
        wait.value = false
        reject(err)
      })
  })
}

</script>
