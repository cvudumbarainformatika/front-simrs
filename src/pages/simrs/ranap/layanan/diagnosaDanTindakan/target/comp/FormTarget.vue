<template>
  <q-form class="fit q-pa-lg bg-grey-3 scroll" @submit="onSubmit">
    <div class="f-20">
      Target Yang ingin di capai terhadap Pasien
    </div>
    <div class="q-my-sm">
      Form ini Khusus untuk Dokter
    </div>

    <!-- <form
      autocorrect="off"
      autocapitalize="off"
      autocomplete="off"
      spellcheck="false"
    >
      <q-editor
        ref="editorRef"
        v-model="editor" min-height="10rem" paragraph-tag="div"
        :rules="[val => !!val?.length || 'Harap diisi']"
      />
    </form> -->
    <q-separator class="q-my-md" />
    <div class="row q-col-gutter-md">
      <div class="col-4">
        <q-card>
          <q-card-section>
            <q-input
              v-model="target"
              type="textarea"
              label="Target Dokter"
              outlined
              standout="bg-yellow-3"
              rows="8"
              :rules="[val => !!val?.length || 'Harap diisi']"
              hide-bottom-space
            />
          </q-card-section>
        </q-card>
      </div>
      <div class="col-4">
        <q-card>
          <q-card-section>
            <q-input
              v-model="terapi"
              type="textarea"
              label="Rencana Terapi yg diberikan"
              outlined
              standout="bg-yellow-3"
              rows="8"
              :rules="[val => !!val?.length || 'Harap diisi']"
              hide-bottom-space
            />
          </q-card-section>
        </q-card>
      </div>
      <div class="col-4">
        <q-card>
          <q-card-section>
            <q-input
              v-model="monitor"
              type="textarea"
              label="Monitoring Pasien"
              outlined
              standout="bg-yellow-3"
              rows="8"
              :rules="[val => !!val?.length || 'Harap diisi']"
              hide-bottom-space
            />
          </q-card-section>
        </q-card>
      </div>
    </div>

    <q-separator class="q-my-md" />
    <div class="text-right">
      <q-btn :loading="loading" :disable="loading" label="Simpan Planning Awal" color="primary" class="q-px-md" type="submit" />
    </div>
  </q-form>
</template>

<script setup>

import { api } from 'src/boot/axios'
import { notifSuccessVue } from 'src/modules/utils'
import { usePengunjungRanapStore } from 'src/stores/simrs/ranap/pengunjung'
import { onMounted, ref } from 'vue'

// const editor = ref('')
const target = ref('')
const terapi = ref('')
const monitor = ref('')

const loading = ref(false)

// const editorRef = ref()

const props = defineProps({
  pasien: {
    type: Object,
    default: () => null
  },
  kasus: {
    type: Object,
    default: () => null
  },
  nakes: {
    type: String,
    default: null
  }
})

onMounted(() => {
  // editorRef.value.focus()
  const plann = props?.pasien?.planningdokter

  if (plann) {
    target.value = plann?.target
    terapi.value = plann?.terapi
    monitor.value = plann?.monitor
  }
})

const onSubmit = async () => {
  // console.log('form', editor.value)
  // const plaintext = editor.value.replace(/(<([^>]+)>)/ig, '')

  // console.log('plaintext', plaintext)
  loading.value = true
  try {
    const form = {
      id: props.pasien?.planningdokter?.id || null,
      noreg: props?.pasien?.noreg,
      norm: props?.pasien?.norm,
      target: target.value,
      terapi: terapi.value,
      monitor: monitor.value,
      kdruang: props?.pasien?.kdruangan
    }

    const resp = await api.post('v1/simrs/ranap/layanan/target/simpan', form)

    if (resp.status === 200) {
      const pengunjung = usePengunjungRanapStore()
      const findPasien = pengunjung?.pasiens.filter(x => x?.noreg === props?.pasien?.noreg)
      if (findPasien.length) {
        const data = findPasien[0]
        data.planningdokter = resp?.data
      }

      loading.value = false
      notifSuccessVue('Data sukses tersimpan')
    }
    else {
      loading.value = false
    }

    console.log('resp', resp)
  }
  catch (error) {
    loading.value = false
  }
  // caret.eVm.$q
}
</script>
