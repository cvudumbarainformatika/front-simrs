<template>
  <q-dialog
    full-height
  >
    <q-card style="width:80vw;">
      <div class="column full-height">
        <!-- <div class="col-auto header--modal bg-primary text-white">
          <div class="q-pa-md">
            Form Upload Tindakan
          </div>
        </div> -->
        <div class="col full-height bg-yellow">
          <!-- <div class="column flex-center full-height"> -->
          <q-form
            ref="formRef"
            class="full-height full-width"
            @submit="simpan"
          >
            <q-uploader
              ref="uploader"
              :factory="uploadFiles"
              :loading="uploadPercent"
              bordered
              flat
              :label="`Upload Gambar dokumen`"
              accept=".jpg, image/*"
              class="full-width full-height"
              auto-upload
              multiple
              max-files="9"
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
          <!-- </div> -->
        </div>
        <div class="col-auto q-pa-md bg-primary">
          <div class="text-right">
            <q-btn
              v-close-popup
              label="close"
              color="dark"
              dense
              class="q-px-md"
            />
          </div>
        </div>
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useLayananPoli } from 'src/stores/simrs/pelayanan/poli/layanan'
import { ref } from 'vue'

const store = useLayananPoli()

const props = defineProps({
  id: {
    type: Number,
    default: 0
  },
  pasien: {
    type: Object,
    default: null
  }
})

const formRef = ref()
const uploader = ref()

function finished() {
  console.log('finished')
}

function onRejected() {
  console.log('rejected')
}

function simpan() {
  console.log('simpan')
}

function uploadFiles(file) {
  store.uploadImages(file, props.id, props.pasien).then(() => {
    // console.log('after upload', props.pasien?.tindakan?.filter(x => x.id === props?.id))
    uploader.value.reset()
  })
}

function uploadPercent(files) {
  console.log('upload percent', files)
}
</script>

<style lang="scss" scoped>
.q-uploader--bordered{
  max-height: 100% !important;
}

</style>
