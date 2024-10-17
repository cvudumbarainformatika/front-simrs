<template>
  <div class="fit q-pa-lg scroll">
    <div class="f-20">
      Target Yang ingin di capai terhadap Pasien
    </div>
    <div class="q-my-sm">
      Form ini Khusus untuk Dokter
    </div>

    <form
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
    </form>
    <q-separator class="q-my-md" />
    <div class="text-right">
      <q-btn v-if="editor?.length" label="Simpan Target Pasien" color="primary" class="q-px-md" type="button" @click="onSubmit" />
    </div>
  </div>
</template>

<script setup>

import { api } from 'src/boot/axios'
import { ref } from 'vue'

const editor = ref('')

const editorRef = ref()

defineProps({
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

const onSubmit = async () => {
  console.log('form', editor.value)
  const plaintext = editor.value.replace(/(<([^>]+)>)/ig, '')

  console.log('plaintext', plaintext)
  const form = {
    target: editor.value
  }

  const resp = await api.post('v1/simrs/ranap/layanan/target/simpan', form)

  console.log('resp', resp)
  // caret.eVm.$q
}
</script>
