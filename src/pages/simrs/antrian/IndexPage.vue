<template>
  <q-page padding>
    <div v-if="speech.isLoading">
      <app-loading />
    </div>
    <div v-else>
      <app-input
        v-model="model"
        class="q-mb-md"
      />
      <app-btn
        label="Ngomong!"
        @click="clickBtn"
      />
    </div>
  </q-page>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useSpeechStore } from 'src/stores/antrian/speech.js'

const speech = useSpeechStore()

const model = ref('Nomor Antrian. 345.. menuju. Poli Kandungan..')
onMounted(() => {
  const voices = speech.synth.getVoices()
  if (voices.length) {
    speech.setLoading(false)
    console.log('onMounted :', voices)
  }

  speech.synth.onvoiceschanged = () => {
    speech.setVoiceList(speech.synth.getVoices())
    // give a bit of delay to show loading screen
    // just for the sake of it, I suppose. Not the best reason
    setTimeout(() => {
      speech.setLoading(false)
    }, 800)
  }
})

function clickBtn() {
  speech.synth.speak(setSpeech())
}

function setSpeech() {
  console.log(speech.voiceList[11])
  const voice = speech.utterance
  voice.text = model.value
  voice.voice = speech.voiceList[11]

  voice.volume = 1
  voice.pitch = 0.8
  voice.rate = 0.85

  return voice
}
</script>
