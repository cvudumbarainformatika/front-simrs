<template>
  <div class="ttd-pad-form">
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
            bordered
            style="min-width:250px"
          >
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
            <q-separator
              dark
            />
            <div class="row">
              <q-btn
                class="col"
                color="primary"
                square
                icon="icon-mat-check"
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
    <div
      class="cursor-pointer non-selectable flex items-center justify-between bg-grey-4 q-pa-sm tmp-t"
      style="margin-top:-5px"
    >
      <div>
        <q-btn
          flat
          padding="xs"
          icon="icon-mat-circle"
          color="negative"
        />
        <q-btn
          flat
          padding="xs"
          color="negative"
          icon="icon-mat-close"
        />
        <q-btn
          flat
          padding="xs"
          color="negative"
          icon="icon-mat-change_history"
        />
        <q-btn
          flat
          padding="xs"
          color="negative"
          icon="icon-mat-check_box_outline"
        />
      </div>
      <div>
        <q-btn
          flat
          padding="xs"
          icon="icon-mat-refresh"
          color="dark"
          @click="clearPad"
        >
          <q-tooltip>
            Bersihkan Penandaan
          </q-tooltip>
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script setup>
import MyImg from 'src/assets/human/human-body.jpg'
import { onMounted, ref } from 'vue'

const txt = ref(null)
const canvasRef = ref()
const refMenu = ref()
const ctx = ref()
const writingMode = ref(false)
const positionX = ref()
const positionY = ref()

onMounted(() => {
  console.log(refMenu.value)
  ctx.value = canvasRef.value.getContext('2d')

  func()
})

function onShowInp() {
  console.log('show')
  writingMode.value = true
  drawShapes(ctx.value, positionX.value, positionY.value)
}

const handlePointerDown = (event) => {
  // console.log('pointerdown', event)
  // writingMode.value = !writingMode.value
  // console.log(writingMode.value)
  // console.log(refMenu.value)
  const [x, y] = getTargetPosition(event)
  positionX.value = x
  positionY.value = y
  // drawShapes(ctx.value, x, y)
}
const handlePointerUp = (event) => {
  // console.log('pointerup', event)
  writingMode.value = false
}

function getTargetPosition(event) {
  positionX.value = event.clientX - event.target.getBoundingClientRect().x
  positionY.value = event.clientY - event.target.getBoundingClientRect().y
  return [positionX.value, positionY.value]
  // console.log('positionX', positionX.value)
}

function drawShapes(cx, x, y) {
  if (writingMode.value) {
    console.log('ok')
    cx.beginPath()
    cx.arc(x, y, 10, 0, 2 * Math.PI)
    cx.lineWidth = 4
    cx.strokeStyle = 'orange'
    cx.stroke()
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
