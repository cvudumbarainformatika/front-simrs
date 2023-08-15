<template>
  <div
    class="q-py-lg"
  >
    <div
      class="row items-center q-col-gutter-lg"
      :class="admin?'':'container-padding'"
    >
      <div class="col-md-8 col-xs-12 no-wrap">
        <div class="">
          <div class="visi">
            <div class="text-h4 text-weight-bold q-mb-md">
              <span
                v-if="!store.loading"
                class="text-secondary"
                :class="admin?'cursor-pointer':''"
              > {{ items.point_1.title }}
                <q-popup-edit
                  v-if="admin"
                  v-slot="scope"
                  v-model="items.point_1.title"
                  :cover="false"
                  :offset="[0, 0]"
                  auto-save
                  :validate="val => val.length > 0"
                >
                  <q-input
                    v-model="scope.value"
                    :model-value="scope.value"
                    dense
                    autofocus
                    counter
                    :rules="[
                      val => scope.validate(val) || 'Harap diisi'
                    ]"
                    @keyup.enter="scope.set"
                  />
                </q-popup-edit>
              </span>
              <span
                v-else
              > <q-skeleton type="QChip" /></span>
            </div>
            <div class="q-mb-lg">
              <div
                v-for="(visi, i) in items.point_1.data"
                :key="i"
                class="row q-col-gutter-sm q-mb-md"
              >
                <div class="col-1 text-right">
                  <q-avatar
                    size="sm"
                    color="negative"
                    text-color="white"
                    icon="done"
                  />
                </div>
                <div
                  class="col-11"
                >
                  <div
                    :class="admin?'cursor-pointer':''"
                  >
                    {{ visi }}
                    <q-popup-edit
                      v-if="admin"
                      v-slot="scope"
                      v-model="items.point_1.data[i]"
                      :offset="[0, 10]"
                      auto-save
                      :validate="val => val.length > 0"
                    >
                      <div class="row items-center justify-between">
                        <q-input
                          v-model="scope.value"
                          dense
                          autofocus
                          counter
                          style="width:85%"
                          :rules="[
                            val => scope.validate(val) || 'Harap diisi'
                          ]"
                          @keyup.enter="scope.set"
                        />
                        <div class="text-right">
                          <q-btn
                            round
                            size="sm"
                            icon="add"
                            color="primary"
                            @click="pushList(1)"
                          />
                          <q-btn
                            round
                            size="sm"
                            icon="delete"
                            color="negative"
                            @click="store.removeListSectionOne(1,i)"
                          />
                        </div>
                      </div>
                    </q-popup-edit>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="misi">
            <div class="text-h4 text-weight-bold q-mb-md">
              <span
                v-if="!store.loading"
                class="text-primary"
                :class="admin?'cursor-pointer':''"
              > {{ items.point_2.title?items.point_2.title:'MISI' }}
                <q-popup-edit
                  v-if="admin"
                  v-slot="scope"
                  v-model="items.point_2.title"
                  :cover="false"
                  :offset="[0, 0]"
                  auto-save
                  :validate="val => val.length > 0"
                >
                  <q-input
                    v-model="scope.value"
                    dense
                    autofocus
                    counter
                    :rules="[
                      val => scope.validate(val) || 'Harap diisi'
                    ]"
                    @keyup.enter="scope.set"
                  />
                </q-popup-edit>
              </span>
              <span
                v-else
              > <q-skeleton type="QChip" /></span>
            </div>
            <div class="q-mb-lg">
              <div
                v-for="(misi, i) in items.point_2.data"
                :key="i"
                class="row q-col-gutter-sm q-mb-md"
              >
                <div class="col-1 text-right">
                  <q-avatar
                    size="sm"
                    color="negative"
                    text-color="white"
                    icon="done"
                  />
                </div>
                <div class="col-11">
                  <div :class="admin?'cursor-pointer':''">
                    {{ misi }}
                    <q-popup-edit
                      v-if="admin"
                      v-slot="scope"
                      v-model="items.point_2.data[i]"
                      :offset="[0, 10]"
                      auto-save
                      :validate="val => val.length > 0"
                    >
                      <div class="row items-center justify-between">
                        <q-input
                          v-model="scope.value"
                          dense
                          autofocus
                          counter
                          style="width:85%"
                          :rules="[
                            val => scope.validate(val) || 'Harap diisi'
                          ]"
                          @keyup.enter="scope.set"
                        />
                        <div class="text-right">
                          <q-btn
                            round
                            size="sm"
                            icon="add"
                            color="primary"
                            @click="pushList(2)"
                          />
                          <q-btn
                            round
                            size="sm"
                            icon="delete"
                            color="negative"
                            @click="store.removeListSectionOne(2,i)"
                          />
                        </div>
                      </div>
                    </q-popup-edit>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4 col-xs-12 no-wrap">
        <div>
          <q-img
            :src="image"
            spinner-color="white"
            img-class="my-custom-image"
            class="my-pict-style"
            :ratio="1"
          >
            <div
              v-if="admin"
              class="absolute-bottom bg-dark cursor-pointer"
              @click="ubahPhoto"
            >
              <q-icon
                name="photo_camera"
                size="sm"
              /> Ubah Photo
              <q-file
                ref="refFile"
                v-model="imgTemp"
                name="image"
                label="Pick one file"
                accept="image/*"
                class="hidden"
                @update:model-value="changeImg"
              />
            </div>
          </q-img>
        </div>
      </div>
    </div>
    <div v-if="admin">
      <q-separator class="q-my-md" />
      <div class="row no-wrap">
        <div class="col bg-secondary text-white q-pa-md">
          <strong>INFO</strong> <br>
          untuk mengedit text: klik pada text yang ingin di edit, <br>
          untuk menambah list text: klik text , lalu klik icon plus, <br>
          untuk menghapus list text: klik text , lalu klik icon sampah, <br>
          untuk mengubah foto: klik pada icon ubah Photo <br>
          ====================================<br>
          setelah selesai ... klik simpan perubahan
        </div>
        <div class="col text-right">
          <app-btn
            type="button"
            label="simpan Perubahan"
            :loading="store.loading"
            @click="store.uploadImageSectionOne()"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useAppStore } from 'src/stores/app'
import { computed, ref } from 'vue'
import { pathImg } from 'src/boot/axios'

defineProps({
  admin: {
    type: Boolean,
    default: false
  }
})

const store = useAppStore()

const items = computed(() => store.section_one)

const imgTemp = ref(null)
const refFile = ref(null)
const image = computed(() => {
  if (imgTemp.value === null) {
    if (store.section_one.image === null || store.section_one.image === 'null' || store.section_one.image === '') {
      return new URL('../../assets/images/rsud.jpg', import.meta.url).href
    } else if (isFile(store.section_one.image)) {
      return URL.createObjectURL(store.section_one.image)
    } else {
      return pathImg + store.section_one.image
    }
  }
  return URL.createObjectURL(imgTemp.value)
})
// ============================================================================================METHOD
function isFile(input) {
  if ('File' in window && input instanceof File) { return true } else return false
}

function ubahPhoto() {
  console.log('aaa')
  refFile.value.pickFiles()
}
function changeImg() {
  // console.log('upload image to server ...')
  store.uploadImageSectionOne(imgTemp.value)
}

function pushList(x) {
  // console.log(store)
  store.pushListSectionOne(x)
}
</script>
<style lang="scss" scoped>
.big__text {
    font-size: 60px;
}
.my-pict-style {
    border-radius:  40% 20px 40% 20px ;
}
</style>
