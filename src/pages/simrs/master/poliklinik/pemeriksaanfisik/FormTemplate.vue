<template>
  <q-form
    ref="formRef"
    class="q-gutter-sm q-pa-sm"
    @submit="simpan"
  >
    <q-uploader
      ref="uploader"
      :factory="uploadFiles"
      :loading="uploadPercent"
      bordered
      :label="`Upload Gambar ${store?.formImg?.nama}`"
      accept=".jpg, image/*"
      class="full-width"
      auto-upload
      multiple
      max-files="9"
      @finish="finished"
      @rejected="onRejected"
    >
      <template #list="scope">
        <div>
          <div
            v-if="scope.files.length===0"
            class="column flex-center"
            style="min-height:250px"
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
          >
            <q-list separator>
              <q-item
                v-for="file in scope.files"
                :key="file.__key"
              >
                <q-item-section>
                  <q-item-label class="full-width ellipsis">
                    {{ file.name }}
                  </q-item-label>

                  <q-item-label caption>
                    Status: {{ file.__status }}
                  </q-item-label>

                  <q-item-label caption>
                    {{ file.__sizeLabel }} / {{ file.__progressLabel }}
                  </q-item-label>
                </q-item-section>

                <q-item-section
                  v-if="file.__img"
                  thumbnail
                  class="gt-xs"
                >
                  <img
                    :src="file.__img.src"
                    width="100px"
                  >
                </q-item-section>

                <q-item-section
                  top
                  side
                >
                  <q-btn
                    class="gt-xs"
                    size="12px"
                    flat
                    dense
                    round
                    icon="icon-mat-delete"
                    @click="scope.removeFile(file)"
                  />
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </div>
      </template>
    </q-uploader>
  </q-form>
</template>
<script setup>

import { useMasterPemeriksaanFisik } from 'src/stores/simrs/master/poliklinik/pemeriksaanfisik'
import { ref } from 'vue'
// import { pathImg } from 'src/boot/axios'

const store = useMasterPemeriksaanFisik()
const formRef = ref()
const uploader = ref()
function simpan() {
  store.simpanMaster().then(() => {
    formRef.value.resetValidation()
  })
}

function onRejected (entries) {
  console.log(entries)
}
function finished (entries) {
  console.log(entries)
}

function uploadFiles(file) {
  store.uploadImages(file).then(() => {
    console.log(uploader.value)
    uploader.value.reset()
  })
}

function uploadPercent(files) {
  console.log('upload percent', files)
}

// function handleRemoveImage(file, scope) {
//   console.log(file)
//   console.log(scope)
// }

</script>
