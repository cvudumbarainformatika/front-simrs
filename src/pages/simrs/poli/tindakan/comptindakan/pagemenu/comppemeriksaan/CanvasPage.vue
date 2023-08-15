<template>
  <canvas
    id="canvas"
    ref="canvasRef"
  />
  <div
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
  </div>
</template>

<script setup>
import MyImg from 'src/assets/human/human-body.jpg'
import { onMounted, ref } from 'vue'
const canvasRef = ref()

function func() {
  const cvn = canvasRef.value
  const ctx = cvn.getContext('2d')
  cvn.height = cvn.width
  const bg = new Image()
  bg.src = MyImg
  bg.onload = function () {
    console.log('bg', bg.height)
    // console.log('ctx', cvn.width)
    // ctx.drawImage(bg, 0, 0, bg.width, bg.height)
    // const offsetX = 0.5 // center x
    // const offsetY = 0.5
    const scale = Math.min(cvn.width / bg.width, cvn.height / bg.height)
    // const ratio = bg.width / bg.height
    const width = bg.width * scale
    const height = bg.height * scale
    const x = cvn.width / 2 - width / 2
    const y = cvn.height / 2 - height / 2
    // drawImageProp(ctx, bg, 0, 0, width, height)
    ctx.drawImage(bg, x, y, width, height)
  }
}

// function drawImageProp(ctx, img, x, y, w, h, offsetX, offsetY) {
//   if (arguments.length === 2) {
//     x = y = 0
//     w = ctx.canvas.width
//     h = ctx.canvas.height
//   }

//   // default offset is center
//   offsetX = typeof offsetX === 'number' ? offsetX : 0.5
//   offsetY = typeof offsetY === 'number' ? offsetY : 0.5

//   // keep bounds [0.0, 1.0]
//   if (offsetX < 0) offsetX = 0
//   if (offsetY < 0) offsetY = 0
//   if (offsetX > 1) offsetX = 1
//   if (offsetY > 1) offsetY = 1

//   const iw = img.width,
//     ih = img.height,
//     r = Math.min(w / iw, h / ih)
//   let nw = iw * r, // new prop. width
//     nh = ih * r, // new prop. height
//     cx, cy, cw, ch, ar = 1

//   // decide which gap to fill
//   if (nw < w) ar = w / nw
//   if (Math.abs(ar - 1) < 1e-14 && nh < h) ar = h / nh // updated
//   nw *= ar
//   nh *= ar

//   // calc source rectangle
//   cw = iw / (nw / w)
//   ch = ih / (nh / h)

//   cx = (iw - cw) * offsetX
//   cy = (ih - ch) * offsetY

//   // make sure source rectangle is valid
//   if (cx < 0) cx = 0
//   if (cy < 0) cy = 0
//   if (cw > iw) cw = iw
//   if (ch > ih) ch = ih

//   // fill image in dest. rectangle
//   ctx.drawImage(img, cx, cy, cw, ch, x, y, w, h)
// }

onMounted(() => {
  func()
  console.log(canvasRef.value)
})
</script>

<style lang="scss" scoped>
canvas {
  width: 100%;
  background: #fff;
  border: 1px solid rgba(128, 128, 128, 0.81);
}
.tmp-t{
  width: 100%;
  border: 1px solid rgba(128, 128, 128, 0.81);
}
</style>
