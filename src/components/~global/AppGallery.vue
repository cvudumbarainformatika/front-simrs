<template>
  <q-card>
    <div
      class="row"
      style="height:70vh"
    >
      <div class="col-2 col-md-2 bg-primary text-white">
        <app-list-menu
          :lists="listsMenu"
          :link="link"
          @click="clickLink"
        />
      </div>
      <!-- upload -->
      <div
        class="col-10 col-md-10 bg-grey-2 "
      >
        <div class="q-pa-md ">
          <!-- upload -->
          <q-card
            v-if="link===0"
            flat
            bordered
          >
            <q-uploader
              bordered
              label="Upload Gambar"
              :url="SERVER+'/v1/gallery/upload'"
              field-name="images[]"
              :headers="[
                {name: 'Authorization', value: `Bearer ${token}`}
              ]"
              accept=".jpg, image/*"
              class="full-width"
              auto-upload
              multiple
              max-files="9"
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
                      name="cloud_upload"
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
                    class="row q-col-gutter-md"
                    style="min-height:250px"
                  >
                    <div
                      v-for="file in scope.files"
                      :key="file.__key"
                      class="col-4"
                    >
                      <q-card
                        :flat="file.name !== selected"
                        :class="file.name === selected?'cursor-pointer active':'cursor-pointer'"
                        @click="selectedImage(file, 'upload')"
                      >
                        <q-img
                          v-if="file.__img"
                          thumbnail
                          :ratio="16/9"
                          fit="cover"
                          :src="file.__img.src"
                        >
                          <div class="absolute-bottom">
                            <div class="f-12 ellipsis">
                              {{ file.name }}
                            </div>
                            <div class="f-10">
                              {{ file.__sizeLabel }} / {{ file.__progressLabel }}
                            </div>
                          </div>
                          <div class="absolute no-padding transparent">
                            <q-icon
                              :name="file.__status==='uploaded'?'done_all':'warnimg'"
                              size="sm"
                              :color="file.__status==='idle'?'negative':'green-5'"
                              class="q-pa-xs"
                            />
                          </div>
                        </q-img>
                        <q-card-actions align="right">
                          <q-btn
                            flat
                            round
                            color="grey"
                            size="sm"
                            icon="content_copy"
                            @click="handleCopyUrl(`${pathImg}gallery/${file.name}`)"
                          />
                          <q-btn
                            flat
                            round
                            color="negative"
                            size="sm"
                            icon="delete"
                            @click="handleRemoveImage(file)"
                          />
                        </q-card-actions>
                      </q-card>
                    </div>
                  </div>
                </div>
              </template>
            </q-uploader>
          </q-card>

          <!-- gallery -->
          <q-card
            v-else
            flat
            bordered
            style="min-height:250px"
          >
            <div
              v-if="imageGalleries.length > 0"
              class="row q-pa-md q-col-gutter-md"
            >
              <div
                v-for="(item, i) in imageGalleries"
                :key="i"
                class="col-4"
              >
                <q-card
                  bordered
                  :flat="item.original !== selected"
                  :class="item.original === selected?'cursor-pointer active':'cursor-pointer'"
                  @click="selectedImage(item, 'gallery')"
                >
                  <q-img
                    round
                    :ratio="16/9"
                    :src="pathImg +'gallery/'+ item.original"
                  />
                  <q-card-section
                    class="q-pa-xs"
                    align="right"
                  >
                    <q-btn
                      flat
                      round
                      color="grey"
                      size="xs"
                      icon="content_copy"
                      @click="handleCopyUrl(`${pathImg}gallery/${item.original}`)"
                    />
                  </q-card-section>
                </q-card>
              </div>
            </div>
            <div
              v-else
              class="column flex-center text-grey-5"
              style="height:250px"
            >
              <q-icon
                name="image"
                size="lg"
              />
              <div>Data Gallery belum ada</div>
            </div>
          </q-card>
        </div>
      </div>
    </div>
  </q-card>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import * as storage from 'src/modules/storage'
import { SERVER, pathImg } from 'src/boot/axios'
import { useGalleryTable } from 'src/stores/admin/gallery/table'
import { copyToClipboard } from 'quasar'
import { notifErrVue, notifSuccessVue } from 'src/modules/utils'

const token = storage.getLocalToken()
const gallery = useGalleryTable()

onMounted(() => {
  gallery.getDataTable()
})

const emits = defineEmits(['selectImage'])

const link = ref(0)
const listsMenu = ref([
  { link: 'Upload', icon: 'upload_file' },
  { link: 'Gallery', icon: 'collections' }
])

const selected = ref(null)

const imageGalleries = computed(() => gallery.items)
console.log('computed', imageGalleries)

function onRejected (entries) {
  console.log(entries)
}

function handleRemoveImage(file) {
  console.log(file)
}
function handleCopyUrl(url) {
  copyToClipboard(url)
    .then(() => {
      notifSuccessVue('Success, copy url!')
    })
    .catch(() => {
      notifErrVue('Error, Ada Kesalahan!')
    })
}

function clickLink(val) {
  link.value = val
  if (val === 1) {
    gallery.getDataTable()
  }
}

function selectedImage(item, tag) {
  if (tag === 'gallery') {
    selected.value = item.original
  } else {
    console.log(item)
    if (item.__status === 'uploaded') {
      selected.value = item.name
    }
  }

  emits('selectImage', `${pathImg}gallery/${selected.value}`)
}
</script>

<style lang="scss" scoped>
// .image-uploader {
//   max-width:300px;
// }

.active {
  border:2px solid $primary;
}

</style>
