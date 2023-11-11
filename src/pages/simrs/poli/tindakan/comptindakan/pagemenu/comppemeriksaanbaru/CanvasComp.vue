<template>
  <div
    ref="el"
    class="column full-height full-width flex-center"
  >
    <!-- <div class="t-canvas"> -->
    <div class="absolute-left full-height">
      <MenuSamping />
    </div>
    <canvas
      id="canvas"
      ref="canvasRef"
      class="bg-white"
      :width="widthEl"
      :height="heightEl"
    />
    <!-- </div> -->
  </div>
</template>

<script setup>
import MenuSamping from './MenuSamping.vue'
import { ref, onMounted } from 'vue'
const el = ref(null)

const heightEl = ref(400)
const widthEl = ref(400)
const canvasRef = ref(null)
const ctx = ref()

onMounted(() => {
  // console.log(el.value.offsetHeight)
  window.addEventListener('resize', resizeCanvas)
  ctx.value = canvasRef.value.getContext('2d')
  resizeCanvas()
  func()
})

const resizeCanvas = () => {
  heightEl.value = el.value.clientHeight - 40
  widthEl.value = el.value.offsetWidth / 3
}

async function func() {
  const cvn = canvasRef.value
  // const context = ctx.value
  ctx.value.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height)
  cvn.height = cvn.width
  const bg = new Image()
  bg.src = '..' + '/src/assets/human/anatomys/body-human.jpg'
  bg.onload = function () {
    console.log('bg', bg.height)
    const scale = Math.min(cvn.width / bg.width, cvn.height / bg.height)
    const width = bg.width * scale
    const height = bg.height * scale
    const x = cvn.width / 2 - width / 2
    const y = cvn.height / 2 - height / 2
    ctx.value.fillStyle = '#FFFFFF'
    ctx.value.fillRect(0, 0, cvn.width, cvn.height)
    ctx.value.drawImage(bg, x, y, width, height)
    // console.log('func', arr)
    // if (arr.value.length > 0) {
    //   for (let i = 0; i < arr.value.length; i++) {
    //     drawShapes(arr.value[i].penanda,
    //       arr.value[i].x, arr.value[i].y,
    //       arr.value[i].ketebalan,
    //       arr.value[i].warna,
    //       arr.value[i].panjang, i + 1)
    //   }
    // }
  }
}
</script>

<style lang="scss">

</style>
