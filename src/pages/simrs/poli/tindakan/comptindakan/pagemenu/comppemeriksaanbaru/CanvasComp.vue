<template>
  <div
    ref="el"
    class="column full-height full-width flex-center scroll"
  >
    <!-- <div class="t-canvas"> -->
    <!-- <div class="absolute-left full-height">
      <DrawerKiri />
    </div> -->
    <!-- <div class="absolute-left full-height">
      <MenuSamping />
    </div> -->
    <canvas
      id="c"
      ref="canvasRef"
      :width="widthEl"
      :height="heightEl"
    />
    <img
      ref="imgRef"
      :src="store.fileGambar"
      alt="gambar medis"
      class="hidden"
    >
    <!-- </div> -->
    <div class="absolute-bottom">
      <q-btn
        dense
        label="circle"
        color="primary"
        @click="coba"
      />
    </div>
  </div>
</template>

<script setup>
// import MenuSamping from './MenuSamping.vue'
// import DrawerKiri from './DrawerKiri.vue'
import { fabric } from 'fabric'
import { usePemeriksaanFisik } from 'src/stores/simrs/pelayanan/poli/pemeriksaanfisik'
import { ref, onMounted, markRaw } from 'vue'
const el = ref(null)

const heightEl = ref(400)
const widthEl = ref(400)
const canvasRef = ref(null)
const imgRef = ref(null)
const ctx = ref()
const cvn = ref(null)

const store = usePemeriksaanFisik()
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})
onMounted(() => {
  // console.log(el.value.offsetHeight)
  store.initReset(false, props.pasien)
  setTimeout(() => {
    window.addEventListener('resize', resizeCanvas)
    ctx.value = canvasRef.value.getContext('2d')
    resizeCanvas()
    init()
  }, 100)

  // console.log('gambar height', imgRef.value.height)
})

const resizeCanvas = () => {
  // heightEl.value = el.value.clientHeight - 4
  const width = el.value.offsetWidth
  const scale = Math.min(width / imgRef.value.width, width / imgRef.value.height)
  // const imgRatio = imgRef.value.width / imgRef.value.height
  widthEl.value = width
  // heightEl.value = el.value.clientHeight
  heightEl.value = imgRef.value.height * scale
  imgRef.value.width = widthEl.value
  imgRef.value.height = heightEl.value
  console.log('gambar height', scale)
  // func()
}

function init() {
  if (!canvasRef.value) return
  cvn.value = markRaw(new fabric.Canvas(canvasRef.value, {
    // isDrawingMode: true,
    centeredScaling: true,
    backgroundColor: '#fff',
    selectionBorderColor: 'rgba(255, 255, 255, 0.8)',
    selectionColor: 'rgba(255, 255, 255, 0.8)',
    selectionLineWidth: 2,
    borderColor: 'gray',
    cornerColor: 'black',
    cornerSize: 12,
    transparentCorners: true
  }))

  const canvas = cvn.value
  canvas.setDimensions({ width: widthEl.value, height: heightEl.value })
  const img = markRaw(new fabric.Image(imgRef.value, (image, isError) => {
    image.set({ width: widthEl.value, heigh: heightEl.value })
  }))
  // const circle = markRaw(new fabric.Circle({ top: 140, left: 30, radius: 75, fill: 'green' }))
  // const rect = markRaw(new fabric.Rect({ width: 120, height: 120, fill: 'blue', left: 250, top: 50 }))

  // canvas.add(img)
  const scale = Math.min(canvasRef.value.width / img.width, canvasRef.value.height / img.height)
  canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
    left: 0,
    top: 0,
    scaleX: scale,
    scaleY: scale
  })
  canvas.add()
  // canvas.renderAll()

  // console.log(canvas)
}

function coba() {
  const canvas = cvn.value
  canvas.on('mouse:down', (obj) => {
    console.log(obj)
  })
}

// async function func() {
//   const cvn = canvasRef.value
//   // const context = ctx.value
//   ctx.value.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height)
//   cvn.height = cvn.width
//   const bg = new Image()
//   bg.src = '..' + '/src/assets/human/anatomys/body-human.jpg'
//   bg.onload = function () {
//     console.log('bg', bg.height)
//     const scale = Math.min(cvn.width / bg.width, cvn.height / bg.height)
//     const width = bg.width * scale
//     const height = bg.height * scale
//     const x = cvn.width / 2 - width / 2
//     const y = cvn.height / 2 - height / 2
//     ctx.value.fillStyle = '#FFFFFF'
//     ctx.value.fillRect(0, 0, cvn.width, cvn.height)
//     ctx.value.drawImage(bg, x, y, width, height)
//     // console.log('func', arr)
//     // if (arr.value.length > 0) {
//     //   for (let i = 0; i < arr.value.length; i++) {
//     //     drawShapes(arr.value[i].penanda,
//     //       arr.value[i].x, arr.value[i].y,
//     //       arr.value[i].ketebalan,
//     //       arr.value[i].warna,
//     //       arr.value[i].panjang, i + 1)
//     //   }
//     // }
//   }
// }
</script>

<style lang="scss">

</style>
