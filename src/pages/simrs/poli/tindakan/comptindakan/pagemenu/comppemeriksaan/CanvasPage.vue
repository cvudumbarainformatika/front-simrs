<template>
  <div class="ttd-pad-form">
    <div class="t-canvas">
      <canvas
        id="canvas"
        ref="canvasRef"
        width="400"
        height="400"
        @mousedown="handlePointerDown"
        @mouseup="handlePointerUp"
      />
      <!-- <div class="absolute-bottom z-top">
        <div class="text-right q-py-sm">
          <div class="q-gutter-xs">
            <q-btn
              icon="icon-mat-refresh"
              padding="sm"
              color="orange"
            />
          </div>
        </div>
      </div> -->
    </div>
    <!-- <div
      class="cursor-pointer non-selectable flex items-center flex-center bg-grey-2 q-py-sm tmp-t"
      style="margin-top:-5px"
    >
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
    </div> -->
  </div>
</template>

<script setup>
import MyImg from 'src/assets/human/human-body.jpg'
import { onMounted, ref } from 'vue'

const canvasRef = ref()
const ctx = ref()
const writingMode = ref(false)
const positionX = ref()
const positionY = ref()

onMounted(() => {
  console.log(window.innerWidth)
  ctx.value = canvasRef.value.getContext('2d')

  func()
})

const handlePointerDown = (event) => {
  console.log('pointerdown', event)
  writingMode.value = true
  ctx.value.beginPath()

  const [x, y] = getTargetPosition(event)
  drawShapes(ctx.value, x, y)
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
    cx.arc(x, y, 10, 0, 2 * Math.PI)
    cx.lineWidth = 4
    cx.strokeStyle = 'orange'
    cx.stroke()
  }
}

// const clearPad = () => {
//   ctx.value.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height)
// }

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
    border: 1px solid rgba(128, 128, 128, 0.81);
    cursor: crosshair;
  }
  .fab-x{
    position: absolute;
  }
}

.tmp-t{
  width: 100%;
  border: 1px solid rgba(128, 128, 128, 0.81);
}

@media(pointer:coarse){
    body {
      overflow: hidden;
    }
  }
</style>
