<template>
  <div>
    <app-card
      :is-header="false"
      flat
    >
      <template #content>
        <div class="place-of-btn row items-center">
          <q-btn
            unelevated
            round
            color="primary"
            icon="add"
            size="sm"
            @click="addData"
          >
            <q-tooltip
              transition-show="flip-right"
              transition-hide="flip-left"
            >
              Tambah Data
            </q-tooltip>
          </q-btn>
          <q-btn
            unelevated
            round
            color="secondary"
            icon="visibility"
            size="sm"
            class="q-ml-sm"
            @click="store.getData"
          >
            <q-tooltip
              transition-show="flip-right"
              transition-hide="flip-left"
            >
              lihat perubahan / preview
            </q-tooltip>
          </q-btn>
          <q-btn
            unelevated
            round
            size="sm"
            icon="refresh"
            color="yellow"
            class="q-ml-sm"
            @click="store.manageData"
          >
            <q-tooltip
              class="primary"
              :offset="[10, 10]"
            >
              Refresh Table
            </q-tooltip>
          </q-btn>
          <!-- per page -->
          <q-btn
            class="q-ml-sm"
            unelevated
            color="orange"
            round
            size="sm"
            icon="icon-mat-layers"
          >
            <q-tooltip
              class="primary"
              :offset="[10, 10]"
            >
              Per Baris
            </q-tooltip>
            <q-menu
              transition-show="flip-left"
              transition-hide="flip-right"
              class="q-pt-sm"
              anchor="top left"
              self="top right"
            >
              <q-list>
                <q-item
                  v-for="(opt, i) in options"
                  :key="i"
                  v-close-popup
                  clickable
                  tag="label"
                >
                  <q-item-section>
                    <q-radio
                      v-model="store.params.per_page"
                      size="xs"
                      :val="opt"
                      :label="opt + ' Baris'"
                      color="primary"
                      @update:model-value="store.setPerPage"
                    />
                  </q-item-section>
                  <q-item-label />
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
        <q-separator class="q-my-md" />
        <div class="place-of-list">
          <!-- jika loading -->
          <div
            v-if="store.loading"
            class="column flex-center bg-grey-2 q-pa-lg text-center"
            style="min-height:400px"
          >
            <q-inner-loading
              :showing="store.loading"
              label="Harap Tunggu..."
              label-style="font-size: 1.1em"
            />
          </div>
          <!-- jika tidak loading -->
          <div v-else>
            <!-- jika data kosong -->
            <q-card
              v-if="slides.length === 0"
              flat
              class="column flex-center bg-grey-5 q-pa-lg text-center"
              style="min-height:400px"
            >
              <div>Data Belum Ada</div>
              <div>Slide yang di tampilkan adalah slide default system</div>
            </q-card>
            <!-- jika data ada -->
            <q-list
              v-else
              separator
            >
              <q-item
                v-for="(slide, n) in slides"
                :key="n"
                clickable
              >
                <q-menu
                  transition-show="flip-right"
                  transition-hide="flip-left"
                  touch-position
                  context-menu
                  auto-close
                >
                  <q-list style="min-width: 100px">
                    <q-item
                      clickable
                      @click="editItem(slide)"
                    >
                      <q-item-section>Edit</q-item-section>
                    </q-item>
                    <q-separator />
                    <q-item
                      clickable
                      @click="store.deleteItem(slide.id)"
                    >
                      <q-item-section>Hapus</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
                <q-item-section
                  thumbnail
                  class="q-ml-none"
                >
                  <img
                    :src="pathImg+slide.image"
                    class="rounded-borders"
                  >
                </q-item-section>

                <q-item-section>
                  <q-item-label>{{ slide.title==="null" || slide.title===''?'tidak ada title':slide.title }}</q-item-label>
                  <q-item-label caption>
                    {{ slide.desc==="null" || slide.desc===''?'tidak ada deskripsi':slide.desc }}
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
            <!-- pagination -->
            <!-- Pagination -->
            <AppPaginationTable
              v-if="slides.length > 0"
              class="q-mt-md"
              :details="false"
              :meta="store.meta"
              @first="store.setPage(1)"
              @next="store.setPage(store.meta.current_page + 1)"
              @prev="store.setPage(store.meta.current_page - 1)"
              @last="store.setPage(store.meta.last_page)"
            />
          </div>
        </div>
        <q-separator class="q-my-md" />
        <div
          v-if="slides.length>0"
          class="q-pa-md bg-secondary f-20 text-white rounded-borders"
        >
          <strong>{{ store.meta.total }}</strong> data
        </div>
      </template>
    </app-card>

    <!-- dialog -->
    <q-dialog
      v-model="dialog"
      position="right"
    >
      <q-card
        style="width: 360px"
        class="full-height"
      >
        <q-card-section class="bg-grey-3">
          <div>
            <div class="text-weight-bold">
              Tambah / Edit Data
            </div>
          </div>
        </q-card-section>
        <q-card-section>
          <div class="full-width bg-grey-3 q-pa-xs img-my cursor-pointer">
            <q-img
              :src="previewImage"
              fit="fill"
              class="full-height"
              @click="imgClick()"
            />
          </div>
          <q-form @submit="onSubmit">
            <q-file
              ref="fileRef"
              v-model="tempImg"
              filled
              label="Gambar"
              accept="image/*"
              class="q-mb-md"
            />
            <app-input
              v-model="store.form.title"
              valid
              label="Judul Gambar"
              class="q-mb-md"
            />
            <app-input
              v-model="store.form.desc"
              valid
              label="Deskripsi Gambar"
              class="q-mb-md"
            />

            <q-separator class="q-mb-md" />
            <div class="text-right">
              <app-btn
                type="btn"
                label="Close"
                color="dark"
                class="q-mr-sm"
                @click="closeForm"
              />
              <app-btn
                label="Simpan Data"
                :loading="store.loading"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { pathImg } from 'src/boot/axios'
import { useCarouselApp } from 'src/stores/app/carousel'
import { computed, ref } from 'vue'
import { notifErrVue } from '../../../modules/utils'

const store = useCarouselApp()
const slides = computed(() => store.items)
const dialog = ref(false)
const fileRef = ref(null)
const tempImg = ref(null)
const tempId = ref(null)
const previewImage = computed(() => {
  const imgUrl = tempImg.value
  if (imgUrl === null) {
    if (store.form.image === null) {
      return new URL('../../../assets/images/no-image.png', import.meta.url).href
    } else {
      return pathImg + store.form.image
    }
  }
  return URL.createObjectURL(imgUrl)
})
const options = ref([4, 8])

store.manageData()

function addData() {
  dialog.value = true
  tempId.value = null
  tempImg.value = null
  store.addData()
}
function editItem(item) {
  dialog.value = true
  tempId.value = item.id
  // tempImg.value = item.image
  store.editItem(item)
}
function closeForm() {
  dialog.value = false
  tempImg.value = null
}
function imgClick() {
  fileRef.value.pickFiles()
}

function onSubmit() {
  console.log(tempId.value)
  const formData = new FormData()
  if (tempId.value !== null) {
    if (tempImg.value !== null) {
      formData.append('image', tempImg.value)
    }
    // update
    formData.append('id', tempId.value)
    // formData.append('title', store.form.title)
    // formData.append('desc', store.form.desc)
    // store.saveData(formData)
  }
  // save
  if (tempId.value === null) {
    if (tempImg.value === null) {
      return notifErrVue('Belum Ada Gambar yang dipilih')
    }
    formData.append('image', tempImg.value)
  }
  formData.append('title', store.form.title)
  formData.append('desc', store.form.desc)
  store.saveData(formData).then(() => {
    if (tempId.value !== null) {
      closeForm()
    } else {
      addData()
    }
  })
  // console.log(formData)
}
</script>

<style lang="scss" scoped>
.img-my {
  height:150px;
  overflow: hidden;
}
</style>
