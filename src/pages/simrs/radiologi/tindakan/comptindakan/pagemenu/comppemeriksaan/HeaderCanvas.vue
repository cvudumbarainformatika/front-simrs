<template>
  <div class="column">
    <div
      class="cursor-pointer non-selectable flex items-center justify-between bg-yellow-2 q-pa-sm tmp-t"
    >
      <div class="row items-center justify-between">
        <div class="row items-center">
          <!-- <q-separator
            vertical
            class="q-mx-sm"
          /> -->
          <div
            class="flex"
            style="width: 75px;"
          >
            <div class="f-10">
              <!-- Ketebalan {{ store.dialogForm.ketebalan }} -->
            </div>
            <q-slider
              v-model="store.dialogForm.ketebalan"
              :min="1"
              :max="10"
              label
              switch-label-side
              color="dark"
              dense
              size="xs"
            />
          </div>
          <q-separator
            vertical
            class="q-mx-md"
          />
          <div
            class="flex"
            style="width: 75px;"
          >
            <div class="f-10">
              <!-- Luas {{ store.dialogForm.panjang }} px -->
            </div>
            <q-slider
              v-model="store.dialogForm.panjang"
              :min="1"
              :max="20"
              label
              switch-label-side
              color="primary"
              dense
            />
          </div>
          <q-separator
            vertical
            class="q-mx-sm"
          />
          <q-btn

            padding="sm"
            size="sm"
            :style="`background-color: ${store.dialogForm.warna};`"
          >
            <q-tooltip>
              Ganti Warna
            </q-tooltip>
            <q-menu>
              <q-item
                v-close-popup
                clickable
                style="padding:0"
              >
                <q-color
                  v-model="store.dialogForm.warna"
                  no-header
                  no-footer
                  default-view="palette"
                  class="my-picker"
                />
              </q-item>
            </q-menu>
          </q-btn>
        </div>
      </div>
      <div>
        <q-btn
          flat
          padding="xs"
          size="sm"
          :icon="store.fullCanvas?'icon-mat-open_in_full' :'icon-mat-fullscreen'"
          @click="setFull"
        >
          <q-tooltip>
            {{ store.fullCanvas?'kembali': 'Halaman Full' }}
          </q-tooltip>
        </q-btn>
      </div>
    </div>
    <div class="row items-center bg-yellow-3 q-pa-xs">
      <div class="q-gutter-xs">
        <q-btn
          v-for="(btnx, i) in btns"
          :key="i"
          :flat="btnx.name !== store.dialogForm.penanda"
          :glossy="btnx.name === store.dialogForm.penanda"
          padding="xs"
          size="xs"
          :icon="btnx.icon"
          color="dark"
          @click="store.setDialogForm('penanda',btnx.name)"
        >
          <q-tooltip>
            {{ btnx.name }}
          </q-tooltip>
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script setup>
import { usePemeriksaanFisik } from 'src/stores/simrs/pelayanan/poli/pemeriksaanfisik'
import { ref } from 'vue'

const store = usePemeriksaanFisik()

const btns = ref([
  { name: 'circle', icon: 'icon-mat-circle' },
  { name: 'kotak', icon: 'icon-mat-check_box_outline' },
  { name: 'drag-segi-empat', icon: 'icon-mat-backup_table' }
])

function setFull() {
  store.setFullCanvas()
}
</script>
