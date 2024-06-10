<template>
  <q-uploader
    ref="uploader"
    :factory="uploadFiles"
    :loading="uploadPercent"
    bordered
    flat
    :label="`Upload Gambar dokumen`"
    accept=".jpg, image/*"
    class="fit"
    multiple
    max-files="9"
    auto-upload

    @finish="finished"
    @rejected="onRejected"
  >
    <template
      #list="scope"
    >
      <div class="full-height full-width">
        <div
          v-if="scope.files.length===0"
          class="column flex-center full-height"
        >
          <q-icon
            name="icon-mat-cloud_upload"
            size="40px"
            color="primary"
          />
          <div class="f-10">
            Seret Gambar Kesini
          </div>
          <div class="text-grey-5 f-10">
            atau
          </div>
          <div class="f-10">
            Klik tanda plus diatas
          </div>
          <!-- {{ scope }} -->
        </div>
        <div
          v-else
          class="full-width full-height row"
        >
          <div
            v-for="file in scope.files"
            :key="file.__key"
            class="col-3 q-pa-xs"
          >
            <q-img
              :src="file.__img.src"
              style="border-radius: 10px; border: 2px solid grey; overflow: hidden; "
            >
              <div class="absolute-top f-12">
                <div class="row items-center justify-between">
                  <div>
                    {{ file.__sizeLabel }} / {{ file.__progressLabel }}
                  </div>
                </div>
              </div>
              <div class="absolute-bottom f-14">
                <div class="row items-center justify-between">
                  <div />
                  <q-btn
                    class="gt-xs"
                    size="sm"
                    color="negative"
                    flat
                    dense
                    round
                    icon="icon-mat-delete"
                    @click="scope.removeFile(file)"
                  />
                </div>
              </div>
            </q-img>
          </div>
        </div>
      </div>
    </template>
  </q-uploader>
</template>

<script setup>
import { ref } from 'vue'
import { useUploadDokStore } from 'src/stores/simrs/pelayanan/poli/uploaddok'
// import { onMounted } from 'vue'
// import { useQuasar } from 'quasar'
const store = useUploadDokStore()

const uploader = ref()

// const props = defineProps({
//   pasien: {
//     type: Object,
//     default: null
//   }
// })

function finished() {
  console.log('finished')
}

function onRejected() {
  console.log('rejected')
}

// function simpan() {
//   console.log('simpan')
// }

function uploadFiles(file) {
  // console.log(file)
  store.selectFiles(file)
  // store.selectFiles(file, props.pasien).then(() => {
  //   // console.log('after upload', props.pasien?.tindakan?.filter(x => x.id === props?.id))
  //   uploader.value.reset()
  // })
}

function uploadPercent(files) {
  console.log('upload percent', files)
}
</script>
