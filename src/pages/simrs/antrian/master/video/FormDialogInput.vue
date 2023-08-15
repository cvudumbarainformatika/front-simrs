<template>
  <div>
    <div v-if="store.form.id">
      <app-input
        v-model="store.form.id"
        label="id"
      />
    </div>
    <q-img
      v-if="store.form.url === null && store.tempImg===null"
      :key="previewImage"
      :src="previewImage"
      fit="fill"
      class="full-height cursor-pointer"
      @click="imgClick()"
    />
    <q-video
      v-else
      :key="store.form.url"
      :ratio="16/9"
      fetchpriority="low"
      :src="previewImage"
    />
    <q-file
      ref="fileRef"
      v-model="store.tempImg"
      filled
      dense
      label="Video"
      accept="video/*"
      class="q-mb-md"
      @update:model-value="lihat()"
    />
    <!-- <app-input
      v-model="store.form.nama"
      label="Nama Video"
      outlined
      class="q-my-sm"
    /> -->
  </div>
</template>

<script setup>
// import { pathImg } from 'src/boot/axios'
import { pathImg } from 'src/boot/axios'
import { useVideoFormStore } from 'src/stores/antrian/master/video/form'
import { computed, ref } from 'vue'

const store = useVideoFormStore()

const fileRef = ref(null)

const previewImage = computed(() => {
  const imgUrl = store.tempImg
  if (imgUrl === null) {
    if (store.form.url !== null) {
      return previewVideo(store.form.url)
    }
    return new URL('../../../../../assets/images/no-image.png', import.meta.url).href
  }
  return URL.createObjectURL(imgUrl)
})

const previewVideo = (vid) => {
  // console.log('sseeep')
  return pathImg + vid
}

function imgClick() {
  fileRef.value.pickFiles()
}

function lihat() {
  console.log(store.tempImg)
  store.setForm('nama', store.tempImg.name)
  store.setForm('type', store.tempImg.type)
  console.log('ubah form', store.form)
}
</script>
