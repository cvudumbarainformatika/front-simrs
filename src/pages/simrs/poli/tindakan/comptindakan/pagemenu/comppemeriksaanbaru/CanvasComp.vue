<template>
  <div
    ref="el"
    class="column full-height full-width flex-center scroll bg-grey"
    style="border: 1px solid grey;"
  >
    <!-- <div class="t-canvas"> -->
    <!-- <div class="absolute-left full-height">
      <DrawerKiri />
    </div> -->
    <!-- <div class="absolute-left full-height">
      <MenuSamping />
    </div> -->
    <canvas
      id="canvas-target"
      ref="canvasRef"
      :width="widthEl"
      :height="heightEl"
    >
      <MenuCanvas
        ref="refMenu"
        :target="target"
        @show-menu="onMenuShow"
        @cancel-shape="cancelShape"
        @save-shape="saveShapes"
      />
    </canvas>
    <img
      ref="imgRef"
      :src="store.fileGambar"
      alt="gambar medis"
      class="hidden"
    >
    <!-- </div> -->
    <div class="absolute-top">
      <HeaderCanvas />
    </div>
    <div class="absolute-bottom">
      <BottomCanvas
        @reset="store.resetShapes"
      />
    </div>

    <!-- modal -->
    <!-- <q-menu
      touch-position
      :target="target?target:false"
    >
      <q-list>
        <q-item
          v-for="n in 5"
          :key="n"
          v-close-popup
          clickable
        >
          <q-item-section>Label</q-item-section>
        </q-item>
      </q-list>
    </q-menu> -->
  </div>
</template>

<script setup>
// import MenuSamping from './MenuSamping.vue'
// import DrawerKiri from './DrawerKiri.vue'
import MenuCanvas from './MenuCanvas.vue'
import HeaderCanvas from './HeaderCanvas.vue'
import BottomCanvas from './BottomCanvas.vue'
import { fabric } from 'fabric'
import { usePemeriksaanFisik } from 'src/stores/simrs/pelayanan/poli/pemeriksaanfisik'
import { ref, onMounted, markRaw, computed, watch } from 'vue'
const el = ref(null)

const heightEl = ref(400)
const widthEl = ref(400)
const canvasRef = ref(null)
const imgRef = ref(null)
const refMenu = ref()
const ctx = ref()
const cvn = ref(null)

const writingMode = ref(false)
const showMenu = ref(true)
const target = ref(null)

// const tempObjects = ref([])

const arr = computed(() => {
  return store.shapes.filter(x => x.templategambar === store.fileGambar)
})

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
  target.value = '.upper-canvas'
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
    transparentCorners: true,
    // cursor
    defaultCursor: 'crosshair'
  }))

  const canvas = cvn.value
  canvas.setDimensions({ width: widthEl.value, height: heightEl.value })
  const img = markRaw(new fabric.Image(imgRef.value, (image, isError) => {
    image.set({
      width: widthEl.value,
      heigh: heightEl.value,
      originX: 'center',
      originY: 'center'
    })
  }))
  // const circle = markRaw(new fabric.Circle({ top: 140, left: 30, radius: 75, fill: 'green' }))
  // const rect = markRaw(new fabric.Rect({ width: 120, height: 120, fill: 'blue', left: 250, top: 50 }))

  // canvas.add(img)
  const scale = Math.min(canvasRef.value.width / img.width, canvasRef.value.height / img.height)
  const center = canvas.getCenter()
  canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
    left: center.left,
    top: center.top,
    // right: 0,
    scaleX: scale,
    scaleY: scale,
    originX: 'center',
    originY: 'center'
  })
  canvas.add()
  // canvas.renderAll()
  coba()
  drawall()
}

function coba() {
  const canvas = cvn.value

  canvas.on('mouse:down', (obj) => {
    console.log('mousedown', obj)
    writingMode.value = true
    store.setDialogForm('x', obj?.pointer?.x)
    store.setDialogForm('y', obj?.pointer?.y)

    showMenu.value = true
  })

  canvas.on('mouse:move', (obj) => {
    if (writingMode.value === false) {
      return
    }
    // salah
    canvas.backgroundImage.opacity = 0.5
  })

  canvas.on('mouse:up', (obj) => {
    writingMode.value = false
    console.log('mouseup', obj)
    draw(
      store.dialogForm.penanda,
      store.dialogForm.x,
      store.dialogForm.y,
      store.dialogForm.panjang,
      store.dialogForm.width,
      store.dialogForm.height,
      store.dialogForm.warna,
      store.dialogForm.ketebalan
    )

    canvas.backroundImage.opacity = 1

    console.log('canvas', canvas)
  })
}

function onMenuShow() {
  writingMode.value = false
}

function cancelShape() {
  resetCanvas()
  refMenu.value?.refMenu?.hide()
}

function saveShapes() {
  const obj = {
    penanda: store.dialogForm.penanda,
    x: store.dialogForm.x,
    y: store.dialogForm.y,
    anatomy: store.dialogForm.anatomy,
    ket: store.dialogForm.ket,
    ketebalan: store.dialogForm.ketebalan,
    panjang: store.dialogForm.panjang,
    width: store.dialogForm.width,
    height: store.dialogForm.height,
    warna: store.dialogForm.warna,
    templatemenu: store.templateActive,
    templategambar: store.fileGambar,
    templateindex: store.gambarActive,
    noreg: props.pasien ? props.pasien.noreg : '',
    norm: props.pasien ? props.pasien.norm : ''
  }
  store.pushShapes(obj).then((x) => {
    console.log('shapes', writingMode.value)
    setTimeout(() => {
      // refMenu.value.hide()
      refMenu.value?.refMenu?.hide()
    }, 300)
  })
}

function draw(penanda, x, y, p, w, h, clr, tbl) {
  const canvas = cvn.value
  if (penanda === 'circle') {
    const circle = markRaw(new fabric.Circle({
      left: x,
      top: y,
      radius: p,
      fill: '',
      stroke: clr,
      strokeWidth: tbl,
      originX: 'center',
      originY: 'center'
    }))
    canvas.add(circle)
  } else if (penanda === 'kotak') {
    const rect = markRaw(new fabric.Rect({
      left: x,
      top: y,
      originX: 'center',
      originY: 'center',
      width: p * 2,
      height: p * 2,
      fill: 'transparent',
      stroke: clr,
      strokeWidth: tbl
      // transparentCorners: false
      // cornerSize: 6
    }))

    canvas.add(rect)
  }
}

function drawall() {
  resetCanvas()
  if (arr.value.length > 0) {
    for (let i = 0; i < arr.value.length; i++) {
      draw(arr.value[i].penanda,
        arr.value[i].x,
        arr.value[i].y,
        arr.value[i].panjang,
        arr.value[i].width,
        arr.value[i].height,
        arr.value[i].warna,
        arr.value[i].ketebalan
      )
    }
  }
}

function resetCanvas() {
  const canvas = cvn.value
  // console.log(canvas.getObjects())
  canvas.remove(...canvas.getObjects())
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

watch(() => arr, (obj) => {
  // console.log('watch', obj)
  writingMode.value = true
  drawall()
}, { deep: true })
</script>

<style lang="scss">

</style>
