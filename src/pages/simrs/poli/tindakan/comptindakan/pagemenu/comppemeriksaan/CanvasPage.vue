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
