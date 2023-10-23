<template>
  <div>
    <div
      v-if="!items?.length"
      class="column flex-center"
      style="min-height:400px"
    >
      No Data Available
    </div>
    <q-list
      v-else
      bordered
      class="rounded-borders bg-white"
      dense
      separator
    >
      <q-expansion-item
        v-for="(item, i) in items"
        :key="i"
        expand-separator
        hide-expand-icon
      >
        <template #header>
          <q-item-section avatar>
            <q-avatar
              :icon="item?.icon"
              color="primary"
              text-color="white"
              size="sm"
            />
          </q-item-section>

          <q-item-section>
            {{ item?.nama }}
          </q-item-section>

          <q-item-section side>
            <div class="row items-center q-gutter-sm">
              <q-btn
                icon="icon-mat-plus"
                flat
                size="sm"
                dense
                label="tambah gambar"
                color="pink"
                @click="tambahGambar(item)"
              />
              <q-btn
                icon="icon-mat-edit"
                flat
                size="sm"
                round
                @click="selectedItem(item)"
              />
            </div>
          </q-item-section>
        </template>
        <q-card dark>
          <q-card-section v-if="!item?.gambars?.length">
            <div class="column flex-center">
              Data Template Belum Ada
            </div>
          </q-card-section>
          <!-- <q-card-section
            v-else
            class="row"
          > -->
          <q-list
            v-else
            separator
            class="full-width"
            dark
          >
            <q-item
              v-for="file in item?.gambars"
              :key="file"
              class="full-width"
              dark
            >
              <q-item-section
                thumbnail
                class="q-py-xs q-px-md"
              >
                <img
                  :src="`${pathImg + file.url}`"
                  width="100px"
                >
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ file.original }}</q-item-label>
                <q-item-label caption>
                  {{ file.nama }}
                </q-item-label>
              </q-item-section>

              <q-item-section
                side
              >
                <q-btn
                  class="gt-xs"
                  size="12px"
                  flat
                  dense
                  round
                  icon="icon-mat-delete"
                  @click="deleteImg(item.id, file.id)"
                />
              </q-item-section>
            </q-item>
          </q-list>
          <!-- </q-card-section> -->
        </q-card>
      </q-expansion-item>
    </q-list>
  </div>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { pathImg } from 'src/boot/axios'

const $q = useQuasar()
defineProps({
  items: {
    type: Array,
    default: () => []
  }
})

const emits = defineEmits(['selected', 'addImg', 'deleteImg'])

function selectedItem(item) {
  emits('selected', item)
}

function tambahGambar(item) {
  emits('addImg', item)
}

function deleteImg(itemid, id) {
  const payload = { itemid, id }
  // console.log(payload)

  $q.dialog({
    dark: true,
    title: 'Peringatan',
    message: 'Apakah Data ini akan dihapus?',
    cancel: true,
    persistent: true
  }).onOk(() => {
    // console.log('HAPUS', id)
    emits('deleteImg', payload)
  }).onCancel(() => {
    // console.log('Cancel')
  }).onDismiss(() => {
    // console.log('I am triggered on both OK and Cancel')
  })
}
</script>
