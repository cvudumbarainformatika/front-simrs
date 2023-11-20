<template>
  <div class="column">
    <div class="flex flex-center full-width q-pt-sm q-pb-xs">
      Status Lokalis {{ store.templateActive }}
    </div>
    <div class="q-px-sm q-pb-md flex flex-center full-width">
      <div
        class="bg-dark q-pa-xs shadow-2"
        style="border-radius: 20px;"
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
            class="q-mx-sm"
          />
          <q-btn-group
            rounded
          >
            <q-btn
              v-for="sym in symbols"
              :key="sym.name"
              :color="sym.name !== store.dialogForm.penanda? 'dark':'white'"
              :text-color="sym.name !== store.dialogForm.penanda? 'white':'black'"
              rounded
              :glossy="sym.name === store.dialogForm.penanda"
              :label="sym.label"
              push
              size="sm"
              style="padding-left: 5px; padding-right: 5px; font-size: 10px; font-weight: bold; line-height: 1px;"
              dense
              @click="store.setDialogForm('penanda',sym.name)"
            >
              <q-tooltip>
                {{ sym.name }}
              </q-tooltip>
            </q-btn>
          </q-btn-group>
          <q-separator
            vertical
            dark
            class="q-mx-sm"
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
                @update:model-value="gantiStroke"
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
              :style="`background-color: ${store.dialogForm.warna}; border:1px solid white;`"
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
                    @update:model-value="gantiStroke"
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
              :style="`background-color: ${store.dialogForm.fill}; border:1px solid white;`"
              class="q-mr-xs"
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
                    @update:model-value="gantiFill"
                  />
                </q-item>
              </q-menu>
            </q-btn>
            <!-- transparent -->
            <q-btn
              padding="sm"
              size="sm"
              :style="`background-color: white; border:1px solid white;`"
              class="q-mr-xs"
              @click="gantiFill(false)"
            >
              <q-tooltip>
                No Color
              </q-tooltip>
            </q-btn>
            <!-- pattern -->
            <!-- <q-btn
              padding="sm"
              size="sm"
              :style="`background-color: grey; border:1px solid white;`"
              class="q-mr-xs"
              @click="arsir()"
            >
              <q-tooltip>
                Tambah Arsiran
              </q-tooltip>
            </q-btn> -->

            <q-btn
              v-for="set in sets"
              :key="set.name"
              :color="set.name === 'ok'? 'primary':'negative'"
              text-color="white"
              rounded
              :icon="set.icon"
              push
              size="sm"
              dense
              @click="emits('ok')"
            >
              <q-tooltip>
                {{ set.name }}
              </q-tooltip>
            </q-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { usePemeriksaanFisik } from 'src/stores/simrs/pelayanan/poli/pemeriksaanfisik'
// import { ref, markRaw } from 'vue'
import { ref } from 'vue'

const store = usePemeriksaanFisik()

const props = defineProps({
  isBtn: {
    type: Boolean,
    default: true
  },
  canvas: {
    type: Object,
    default: null
  }
})

const emits = defineEmits(['ok'])

const btns = ref([
  { name: 'circle', icon: 'icon-mat-circle' },
  { name: 'kotak', icon: 'icon-mat-check_box_outline' },
  { name: 'Segitiga', icon: 'icon-my-triangle-outline' },
  { name: 'Polyline', icon: 'icon-my-trapezoid' }
])

const symbols = ref([
  { name: 'Radix dention', label: '√' },
  { name: 'Non Vital', label: '∫' },
  { name: 'Gigi Hilang / tidak ada', label: 'X' },
  { name: 'Tumpatan lain / inlay', label: '⊠' },
  { name: 'Anomali', label: 'A' },
  { name: 'Carries/temporary filling', label: '〇' },
  { name: 'Partial Denture, etc', label: 'PD' },
  { name: 'Unerupted teeth', label: 'UE' },
  { name: 'Partial Erupted teeth', label: 'PE' },
  { name: 'Amalgam Filling', label: '10' }

])
const dragers = ref([
  { name: 'drag-segi-empat', icon: 'icon-my-shape-rectangle-plus' }
])

const sets = ref([
  { name: 'ok', icon: 'icon-mat-check' }
])

// function setFull() {
//   store.setFullCanvas()
// }

function gantiStroke() {
  const canvas = props?.canvas
  const activeObject = canvas.getActiveObject()
  if (activeObject === undefined || activeObject === null) {
    return false
  } else {
    activeObject?.set({
      strokeWidth: store.dialogForm.ketebalan,
      stroke: store.dialogForm.warna
    })
    store.setShapeObject(activeObject.ids, 'ketebalan', store.dialogForm.ketebalan)
    store.setShapeObject(activeObject.ids, 'warna', store.dialogForm.warna)
    canvas.renderAll()
  }
}

function gantiFill(color) {
  const canvas = props?.canvas
  const activeObject = canvas.getActiveObject()
  if (activeObject === undefined || activeObject === null) {
    return false
  } else {
    activeObject?.set({
      fill: color ? store.dialogForm.fill : 'transparent'
    })
    store.setShapeObject(activeObject.ids, 'fill', color ? store.dialogForm.fill : 'transparent')
    canvas.renderAll()
  }
}

// function arsir() {
//   const canvas = props?.canvas
//   const activeObject = canvas.getActiveObject()
//   // const width = activeObject?.width
//   // const height = activeObject?.height

//   const myShape = myShapes()
//   const patternSourceCanvas = new fabric.StaticCanvas()
//   patternSourceCanvas.add(myShape)

//   patternSourceCanvas.renderAll()

//   const pattern = new fabric.Pattern({
//     source: patternSourceCanvas.getElement(),
//     repeat: 'repeat'
//   })

//   if (activeObject === undefined || activeObject === null) {
//     return false
//   } else {
//     activeObject?.set({
//       fill: pattern
//     })
//     // store.setShapeObject(activeObject.ids, 'ketebalan', store.dialogForm.ketebalan)
//     // store.setShapeObject(activeObject.ids, 'warna', store.dialogForm.warna)
//     canvas.renderAll()
//   }

//   // console.log('width', width)
//   // console.log('height', height)
//   // console.log('shape', myShape)
// }

// function myShapes() {
//   const canvas = props?.canvas
//   const activeObject = canvas.getActiveObject()
//   const width = activeObject?.width
//   const height = activeObject?.height

//   const ctx = canvas.getContext('2d')
//   ctx.strokeStyle = 'black'
//   ctx.lineWidth = 2
//   ctx.beginPath()
//   ctx.moveTo(0, width)
//   ctx.lineTo(height, 0)
//   ctx.closePath()
//   ctx.stroke()

//   return true
// }
</script>
