<template>
  <div class="ttd-pad-form full-height">
    <!-- tombol-atas -->
    <div
      class="cursor-pointer non-selectable flex items-center justify-between bg-yellow-2 q-pa-sm tmp-t"
    >
      <div class="row items-center">
        <div class="q-gutter-xs">
          <q-btn
            v-for="(btnx, i) in btns"
            :key="i"
            :flat="btnx.name !== btn"
            :glossy="btnx.name === btn"
            padding="xs"
            size="sm"
            :icon="btnx.icon"
            color="dark"
            @click="btn = btnx.name"
          >
            <q-tooltip>
              {{ btnx.name }}
            </q-tooltip>
          </q-btn>
        </div>
        <q-separator
          vertical
          class="q-mx-sm"
        />
        <div
          class="flex"
          style="width: 75px;"
        >
          <div class="f-10">
            Ketebalan {{ lineWidth }}
          </div>
          <q-slider
            v-model="lineWidth"
            :min="1"
            :max="10"
            label
            switch-label-side
            color="dark"
            dense
          />
        </div>
        <q-separator
          vertical
          class="q-mx-sm"
        />
        <div
          class="flex"
          style="width: 75px;"
        >
          <div class="f-10">
            Luas {{ luas }} px
          </div>
          <q-slider
            v-model="luas"
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
          flat
          padding="xs"
          size="xs"
          label="CR"
          :style="`background-color: ${hex};`"
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
                v-model="hex"
                no-header
                no-footer
                default-view="palette"
                class="my-picker"
              />
            </q-item>
          </q-menu>
        </q-btn>
      </div>
      <div />
    </div>
    <!-- canvas -->
    <div class="t-canvas">
      <canvas
        id="canvas"
        ref="canvasRef"
        width="500"
        height="500"
        @mousedown="handlePointerDown"
        @mouseup="handlePointerUp"
      >
        <q-menu
          ref="refMenu"
          touch-position
          @show="onShowInp"
          @hide="writingMode=false"
        >
          <q-card
            dark
            flat
            style="min-width:250px"
          >
            <q-card-section>
              Keterangan
            </q-card-section>
            <q-separator dark />
            <q-card-section>
              <q-input
                v-model="txt"
                standout="bg-yellow-2"
                dense
                dark
                label="nama"
                class="q-mb-sm"
              />
              <q-input
                v-model="txt"
                standout="bg-yellow-2"
                dense
                dark
                label="keterangan"
              />
            </q-card-section>
            <q-separator />
            <div class="row">
              <q-btn
                class="col"
                color="primary"
                square
                icon="icon-mat-check"
                @click="saveShape()"
              />
              <q-btn
                class="col"
                color="negative"
                icon="icon-mat-close"
                square
                @click="refMenu.hide()"
              />
            </div>
          </q-card>
        </q-menu>
      </canvas>
    </div>
    <!-- tombol-bawah -->
    <div
      class="cursor-pointer non-selectable flex items-center justify-between bg-yellow-2 q-pa-xs tmp-t z-top absolute-bottom"
    >
      <div>.</div>
      <div class="q-gutter-xs">
        <q-btn
          icon="icon-mat-refresh"
          color="negative"
          size="sm"
          padding="sm"
          label="Reset Penandaan"
          @click="clearPad"
        />
        <q-btn
          icon="icon-mat-add"
          color="dark"
          size="sm"
          padding="sm"
          label="Baru"
        />
        <q-btn
          icon="icon-mat-save"
          color="primary"
          size="sm"
          padding="sm"
          label="Simpan Gambar"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import MyImg from 'src/assets/human/human-body.jpg'
import { onMounted, ref } from 'vue'

const txt = ref(null)
const desc = ref(null)
const canvasRef = ref()
const refMenu = ref()
const ctx = ref()
const writingMode = ref(false)
const positionX = ref()
const positionY = ref()
const lineWidth = ref(2)
const luas = ref(15)
const shapes = ref([])

const btns = ref([
  { name: 'circle', icon: 'icon-mat-circle' },
  { name: 'kotak', icon: 'icon-mat-check_box_outline' }
])

const btn = ref(btns.value[0].name)
const hex = ref('#000000')
onMounted(() => {
  console.log(refMenu.value)
  ctx.value = canvasRef.value.getContext('2d')

  func()
})

function onShowInp() {
  console.log('show')
  writingMode.value = true
  drawShapes(btn.value, positionX.value, positionY.value, lineWidth.value, hex.value, luas.value, '')
  const shape = {
    penanda: btn.value,
    width: lineWidth.value,
    luas: luas.value,
    x: positionX.value,
    y: positionY.value,
    nama: txt.value,
    ket: desc.value,
    warna: hex.value
  }
  shapes.value.push(shape)
  // saveShape()
}

function saveShape() {
  const arr = shapes.value
  for (let i = 0; i < arr.length; i++) {
    drawShapes(arr[i].penanda, arr[i].x, arr[i].y, arr[i].width, arr[i].warna, arr[i].luas, i + 1)
  }
  console.log('write', writingMode.value)
  refMenu.value.hide()
}

const handlePointerDown = (event) => {
  const [x, y] = getTargetPosition(event)
  positionX.value = x
  positionY.value = y
}
const handlePointerUp = (event) => {
  console.log('pointer up')
}

function getTargetPosition(event) {
  positionX.value = event.clientX - event.target.getBoundingClientRect().x
  positionY.value = event.clientY - event.target.getBoundingClientRect().y
  return [positionX.value, positionY.value]
}

function drawShapes(name, x, y, tebal, warna, p, no) {
  const cx = ctx.value
  if (writingMode.value) {
    cx.beginPath()
    if (name === 'circle') {
      cx.arc(x, y, p, 0, 2 * Math.PI)
    } else if (name === 'kotak') {
      cx.rect(x - p, y - p, p * 2, p * 2)
    }
    // else {
    //   cx.moveTo(x, y)
    //   cx.lineTo(x - p, y)
    //   cx.lineTo(x - p, y - p)
    //   cx.closePath()
    // }
    cx.lineWidth = tebal
    cx.strokeStyle = warna
    cx.stroke()
    // cx.fill()
    cx.font = 'bold 16px Arial'
    cx.fillStyle = warna
    cx.textAlign = 'center'
    cx.fillText(no, x - p * 1.5, y + p / 2)
  }
}

const clearPad = () => {
  ctx.value.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height)
  func()
}

// const savePad = () => {
//   const imageURL = canvasRef.value.toDataURL()
// }
function func() {
  const cvn = canvasRef.value
  // const context = ctx.value

  cvn.height = cvn.width
  const bg = new Image()
  bg.src = MyImg
  bg.onload = function () {
    console.log('bg', bg.height)
    const scale = Math.min(cvn.width / bg.width, cvn.height / bg.height)
    const width = bg.width * scale
    const height = bg.height * scale
    const x = cvn.width / 2 - width / 2
    const y = cvn.height / 2 - height / 2
    ctx.value.drawImage(bg, x, y, width, height)
  }
}

</script>

<style lang="scss" scoped>
.ttd-pad-form{
  margin: 0 auto;
  position: relative;
}
.t-canvas {
  position: relative;
  canvas {
    background: #fff;
    cursor: crosshair;
    // border:1px solid black;
  }
  .fab-x{
    position: absolute;
  }
}

.tmp-t{
  width: 100%;
  // border: 1px solid rgba(128, 128, 128, 0.81);
}

@media(pointer:coarse){
    body {
      overflow: hidden;
    }
  }
</style>
