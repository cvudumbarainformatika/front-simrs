<template>
  <div>
    <!-- header -->
    <app-card
      flat
      :is-header="false"
    >
      <template #content>
        <div class="row items-center">
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
          <div class="q-ml-md">
            <i>Maxinal Data :</i> 4
          </div>
        </div>
      </template>
    </app-card>

    <!-- lists -->

    <!-- jika data kosong -->
    <div v-if="items.length === 0">
      <q-card
        flat
        class="column flex-center bg-grey-5 q-pa-lg text-center"
        style="min-height:400px"
      >
        <div>Data Belum Ada</div>
        <div>Data yang di tampilkan adalah data default system</div>
      </q-card>
    </div>
    <!-- jika data ada -->
    <div v-else>
      <q-card
        flat
        class="q-mt-xs"
      >
        <q-list
          bordered
          separator
        >
          <q-item
            v-for="(item, i) in items"
            :key="i"
            v-ripple
            clickable
          >
            <q-item-section
              avatar
              class="q-ml-none"
            >
              <q-avatar>
                <img :src="pathImg+item.image">
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label lines="1">
                {{ item.nama }}
              </q-item-label>
              <q-item-label
                caption
                lines="2"
              >
                <span class="text-weight-bold">{{ item.jabatan }}</span>
              </q-item-label>
            </q-item-section>

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
                  @click="editItem(item)"
                >
                  <q-item-section>Edit</q-item-section>
                </q-item>
                <q-separator />
                <q-item
                  clickable
                  @click="deleteItem(item.id)"
                >
                  <q-item-section>Hapus</q-item-section>
                </q-item>
              </q-list>
            </q-menu>

            <q-separator />
          </q-item>
        </q-list>
      </q-card>
    </div>

    <!-- form -->
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
              :ratio="1"
              fit="cover"
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
              v-model="form.nama"
              label="Nama"
              class="q-mb-md"
            />
            <app-input
              v-model="form.jabatan"
              label="Jabatan"
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
import { useAppStore } from 'src/stores/app'
import { computed, ref } from 'vue'
import { notifErrVue } from '../../../modules/utils'

const store = useAppStore()
const dialog = ref(false)
const tempImg = ref(null)
const tempId = ref(null)
const fileRef = ref(null)
const form = ref({
  image: null,
  nama: null,
  desc: null
})
const items = computed(() => store.section_three)
const previewImage = computed(() => {
  const imgUrl = tempImg.value
  if (imgUrl === null) {
    if (form.value.image === null) {
      return new URL('../../../assets/images/no-image.png', import.meta.url).href
    } else {
      return pathImg + form.value.image
    }
  }
  return URL.createObjectURL(imgUrl)
})

function imgClick() {
  fileRef.value.pickFiles()
}

function addData() {
  if (items.value.length === 4) {
    return notifErrVue('Maaf, Maximal 4')
  }
  tempId.value = null
  tempImg.value = null
  form.value.image = null
  form.value.nama = null
  form.value.jabatan = null
  dialog.value = true
}
function closeForm() {
  dialog.value = false
}

function onSubmit() {
  const formData = new FormData()
  if (tempImg.value === null && tempId.value === null) {
    return notifErrVue('Belum Ada Gambar yang dipilih')
  }
  if (tempId.value !== null) {
    formData.append('id', tempId.value)
  }
  if (tempImg.value !== null) {
    formData.append('image', tempImg.value)
  }

  formData.append('nama', form.value.nama)
  formData.append('jabatan', form.value.jabatan)
  store.setStaf(formData).then(() => {
    dialog.value = false
  })
}

function editItem(item) {
  tempId.value = item.id
  form.value.image = item.image
  form.value.nama = item.nama
  form.value.jabatan = item.jabatan
  dialog.value = true
}
function deleteItem(id) {
  const params = { id }
  store.removeStaf(params)
}
</script>
