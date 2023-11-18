<template>
  <div class="column">
    <!-- <div
      class="cursor-pointer non-selectable flex items-center justify-between bg-yellow-2 q-pa-sm tmp-t"
    >
      <div class="row items-center justify-between">
        <div class="row items-center">
          <div
            class="flex"
            style="width: 75px;"
          >
            <div class="f-10" />
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
            <div class="f-10" />
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
    </div> -->
    <!-- <div class="row items-center bg-yellow-3 q-pa-xs">
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
    </div> -->
    <div class="q-px-sm q-py-md flex flex-center full-width">
      <div
        class="bg-dark q-pa-xs shadow-2"
        style="border-radius: 20px ;"
      >
        <div
          v-if="!isBtn"
          class="row items-center"
        >
          <q-btn-group
            rounded
          >
            <q-btn
              v-for="btn in btns"
              :key="btn.name"
              :color="btn.name !== store.dialogForm.penanda? 'dark':'white'"
              :text-color="btn.name !== store.dialogForm.penanda? 'white':'black'"
              rounded
              :glossy="btn.name === store.dialogForm.penanda"
              :icon="btn.icon"
              push
              size="sm"
              dense
              @click="store.setDialogForm('penanda',btn.name)"
            >
              <q-tooltip>
                {{ btn.name }}
              </q-tooltip>
            </q-btn>
          </q-btn-group>
          <q-separator
            vertical
            dark
            class="q-mx-md"
          />
          <q-btn-group
            rounded
          >
            <q-btn
              v-for="drag in dragers"
              :key="drag.name"
              :color="drag.name !== store.dialogForm.penanda? 'dark':'white'"
              :text-color="drag.name !== store.dialogForm.penanda? 'white':'black'"
              rounded
              :glossy="drag.name === store.dialogForm.penanda"
              :icon="drag.icon"
              push
              size="sm"
              dense
              @click="store.setDialogForm('penanda',drag.name)"
            >
              <q-tooltip>
                {{ drag.name }}
              </q-tooltip>
            </q-btn>
          </q-btn-group>
        </div>
        <div
          v-else
          class="row items-center q-pa-xs"
        >
          <div class="row items-center">
            <div
              class="flex q-px-sm"
              style="width: 85px;"
            >
              <q-slider
                v-model="store.dialogForm.ketebalan"
                :min="2"
                :max="20"
                label
                switch-label-side
                color="white"
                dense
                size="xs"
                dark
                label-color="black"
              />
            </div>
          </div>
          <q-separator
            vertical
            dark
            class="q-mx-xs"
          />
          <div class="row items-center">
            <div class="q-mr-sm text-white f-10">
              Stroke
            </div>
            <q-btn
              padding="sm"
              size="sm"
              :style="`background-color: ${store.dialogForm.warna};`"
              class="q-mr-md"
            >
              <q-tooltip>
                Ganti Warna Stroke
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
            <div class="q-mr-sm text-white f-10">
              Fill
            </div>
            <q-btn
              padding="sm"
              size="sm"
              :style="`background-color: ${store.dialogForm.fill};`"
              class="q-mr-md"
            >
              <q-tooltip>
                Ganti Warna Fill
              </q-tooltip>
              <q-menu>
                <q-item
                  v-close-popup
                  clickable
                  style="padding:0"
                >
                  <q-color
                    v-model="store.dialogForm.fill"
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
      </div>
    </div>
  </div>
</template>

<script setup>
import { usePemeriksaanFisik } from 'src/stores/simrs/pelayanan/poli/pemeriksaanfisik'
import { ref } from 'vue'

const store = usePemeriksaanFisik()

defineProps({
  isBtn: {
    type: Boolean,
    default: true
  }
})

const btns = ref([
  { name: 'circle', icon: 'icon-mat-circle' },
  { name: 'kotak', icon: 'icon-mat-check_box_outline' },
  { name: 'Segitiga', icon: 'icon-my-triangle-outline' },
  { name: 'Polyline', icon: 'icon-my-trapezoid' }
])
const dragers = ref([
  { name: 'drag-segi-empat', icon: 'icon-my-shape-rectangle-plus' }
])

// function setFull() {
//   store.setFullCanvas()
// }
</script>
