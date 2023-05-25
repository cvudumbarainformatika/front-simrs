<template>
  <q-page>
    <div class="q-pa-lg">
      <q-card class="my-card full-width">
        <q-card-section>
          <div class="full-width row justify-between items-center content-between">
            <div class="col-grow">
              <div
                class="flex flex-column items-center flex-center"
              >
                <div class="col text-left">
                  <div class="f-14 text-weight-bold">
                    {{ store.title }}
                  </div>
                  <div class="title-desc">
                    {{ store.subtitle }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <app-table
            id="printMe"
            :columns="store.columns"
            :column-hide="store.columnHide"
            :items="store.items"
            :meta="store.meta"
            :per-page="store.params.per_page"
            :order-by="store.params.order_by"
            :sort="store.params.sort"
            :loading="store.loading"
            :text-size="12"
            :default-btn="false"
            :to-search="store.params.q"
            :ada-tambah="true"
            @set-row="store.setPerPage"
            @goto="store.setPage"
            @search="store.enterSearch"
            @find="store.setSearch"
            @refresh="store.refreshTable"
            @new-data="form.addNew()"
            @edit-data="(val)=>form.editData(val)"
            @delete="(id)=>store.deletesData(id)"
          >
            <!-- <template #header-left-after-search>
              <div class="q-ml-sm">
                <app-btn
                  label="Sync Simrs & Bpjs"
                  :loading="store.loading"
                  @click="store.synch()"
                />
              </div>
            </template> -->
            <template #col-status="{left}">
              <div :class="`${left}`">
                Status
              </div>
            </template>
            <template #custom-btn="{row}">
              <div class="row">
                <!-- <q-btn
                  round
                  size="sm"
                  icon="icon-mat-mic_external_on"
                  color="dark"
                  class="q-mr-sm"
                  @click="panggil(row, 'nama')"
                >
                  <q-tooltip>
                    Panggil Nama Antrian
                  </q-tooltip>
                </q-btn>
                <q-btn
                  round
                  size="sm"
                  icon="icon-mat-volume_up"
                  color="teal"
                  @click="panggil(row,'nomor')"
                >
                  <q-tooltip>
                    Panggil NOMOR Antrian
                  </q-tooltip>
                </q-btn> -->
                <q-btn
                  round
                  size="sm"
                  icon="icon-mat-volume_up"
                  color="teal"
                  @click="calling(row)"
                >
                  <q-tooltip>
                    Panggil NOMOR Antrian
                  </q-tooltip>
                </q-btn>
              </div>
            </template>
            <!-- <template #col-kode="{left}">
              <div :class="`${left}`">
                Kode
              </div>
            </template> -->

            <!-- <template #cell-default-img="{row}">
              <q-avatar
                color="secondary"
                text-color="white"
                size="sm"
                class="cursor-pointer"
              >
                {{ row.kode }}
              </q-avatar>
            </template> -->
          </app-table>
        </q-card-section>
      </q-card>
    </div>

    <!-- dialog form -->
    <!-- <app-dialog-form
      ref="formRef"
      v-model="form.dialog"
      :title="form.titleDialog"
      :loading="form.loading"
      @save-form="saveForm(ref)"
    >
      <form-dialog-input />
    </app-dialog-form> -->
  </q-page>
</template>

<script setup>
import { useCallStore } from 'src/stores/antrian/call/index'
// import { useMasterDisplayFormStore } from 'src/stores/antrian/master/display/form'
import { onMounted } from 'vue'
// import FormDialogInput from './FormDialogInput.vue'
import { useSpeechStore } from 'src/stores/antrian/speech.js'

const store = useCallStore()
// const form = useMasterDisplayFormStore()

// const formRef = ref()
// console.log(form)

onMounted(() => {
  store.getDataTable()
})

const speech = useSpeechStore()

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

// function setSpeech(txt) {
//   console.log(speech.voiceList[11])
//   const voice = speech.utterance
//   voice.text = txt
//   voice.voice = speech.voiceList[11]

//   voice.volume = 1
//   voice.pitch = 1
//   voice.rate = 0.7

//   return voice
// }

// function panggil(row, jns) {
//   const txt1 = 'Saudara... ' + (row.namapasien).toLowerCase() + ' ...Harap menuju... ke... ' + row.namapoli
//   const txt2 = 'Nomor Antrean ... ' + (row.nomorantrean.toUpperCase()) + '...Harap menuju... ke...' + row.namapoli
//   const txt = jns === 'nama' ? txt1 : txt2
//   speech.synth.speak(setSpeech(txt))
// }
import { usePanggilStore } from 'src/stores/antrian/call/panggil'
const call = usePanggilStore()

function calling(row) {
  call.callLayanan(row)
}
</script>
