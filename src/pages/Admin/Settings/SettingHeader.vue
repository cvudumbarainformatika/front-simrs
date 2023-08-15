<template>
  <div>
    <q-card flat>
      <q-card-section>
        <div
          class="text-center"
        >
          <q-avatar
            rounded
            size="200px"
            color="grey"
            class="cursor-pointer logo"
            @click="uploadLogo"
          >
            <q-img
              :src="logo"
              :ratio="1"
              fit="cover"
            >
              <div class="absolute bg-dark full-width full-height flex column flex-center mask">
                <q-icon
                  name="image"
                  size="md"
                  color="grey-4"
                />
                <div class="f-12 text-white">
                  <div>Ubah Logo</div>
                </div>
              </div>
            </q-img>
          </q-avatar>
          <!-- <q-input
            ref="refFile"
            type="file"
            @update:model-value="val=>changeLogo(val)"
          /> -->
          <div class="hiding">
            <q-file
              ref="refFile"
              v-model="logoTemp"
              name="logo"
              label="Pick one file"
              accept="image/*"
              @update:model-value="changeLogo"
            />
          </div>
        </div>
      </q-card-section>
    </q-card>
    <!-- edit selain logo -->
    <q-card
      flat
      class="q-mt-md"
    >
      <q-card-section>
        <div class="flex items-center">
          <q-icon
            name="edit"
            class="q-mr-sm"
          />
          <div>Edit Header & Footer</div>
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <q-form @submit="store.onSubmit">
          <app-input
            v-model="store.header.title"
            label="title"
            class="q-mb-md"
          />
          <app-input
            v-model="store.header.desc"
            label="deskripsi"
            class="q-mb-md"
          />
          <app-input
            v-model="store.header.alamat"
            label="Alamat"
            class="q-mb-md"
          />
          <app-input
            v-model="store.header.phone"
            label="contact / customer service"
            class="q-mb-md"
          />
          <app-input
            v-model="store.header.email"
            validator="email"
            label="e-mail"
            class="q-mb-md"
          />
          <app-input
            v-model="store.header.link_fb"
            label="link facebook"
            class="q-mb-md"
          />
          <app-input
            v-model="store.header.link_instagram"
            label="link instagram"
            class="q-mb-md"
          />
          <app-input
            v-model="store.header.link_youtube"
            label="link youtube"
            class="q-mb-md"
          />
          <app-input
            v-model="store.header.link_map"
            label="link Map"
            class="q-mb-md"
          />

          <q-separator />

          <div class="text-right q-my-md">
            <app-btn
              label="Simpan Perubahan"
              :loading="store.loading"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>
<script setup>
import { pathImg } from 'src/boot/axios'
import { useAppStore } from 'src/stores/app'
import { computed, ref } from 'vue'

const store = useAppStore()
const logoTemp = ref(null)
const logo = computed(() => {
  const imgUrl = logoTemp.value
  if (imgUrl === null) {
    if (store.logo === null) {
      return new URL('../../../assets/logos/logo.png', import.meta.url).href
    } else {
      return pathImg + store.logo
    }
  }
  return URL.createObjectURL(imgUrl)
})
const refFile = ref(null)
function uploadLogo() {
  refFile.value.$el.click()
}
function changeLogo() {
  console.log('inpout', logoTemp.value)
  const form = new FormData()
  form.append('logo', logoTemp.value)
  store.updateLogo(form)
}
</script>
<style lang="scss" scoped>
.q-avatar {
  overflow: hidden;
}
.logo{
  position: relative;
  .mask{
    opacity: 0;
    transform: translateY(150px);
    transition: all .2s;
  }
  :hover {
    .mask {
      transform: translateY(0);
      opacity: .8;
    }
  }
}
.hiding{
  display:none;
}
</style>
