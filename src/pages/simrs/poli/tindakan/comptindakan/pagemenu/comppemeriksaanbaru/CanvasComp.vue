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
        @reset="resetShapes"
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
// import { ref, onMounted, markRaw, computed, watch } from 'vue'
import { ref, onMounted, markRaw, computed } from 'vue'
import { useMenuPemeriksaan } from '../../forjs/menupemeriksaan'

const el = ref(null)

const heightEl = ref(400)
const widthEl = ref(400)
const canvasRef = ref(null)
const imgRef = ref(null)
const refMenu = ref()
const ctx = ref()
const cvn = ref(null)

const writingMode = ref(false)
const showMenu = ref(false)
const target = ref(null)
const start = ref(null)
// const objectSelected = ref(null)
const options = ref([])
const { menus } = useMenuPemeriksaan()

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

  options.value = menus.value.filter(x => x.nama !== 'Body').map(x => x.nama)
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
    selectionBorderColor: 'red',
    selectionColor: 'black',
    selectionLineWidth: 4,
    borderColor: 'grey',
    cornerColor: 'black',
    cornerSize: 8,
    transparentCorners: false,
    // cursor
    defaultCursor: 'crosshair',
    hoverCursor: 'pointer'
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
  onCanvas()
  drawall()
}

function onCanvas() {
  const canvas = cvn.value

  canvas.on('mouse:down', (obj) => {
    store.setDialogForm('x', obj?.pointer?.x)
    store.setDialogForm('y', obj?.pointer?.y)

    start.value = { x: obj.pointer.x, y: obj.pointer.y }
    if (store?.dialogForm?.penanda === 'drag-segi-empat') {
      target.value = null
    }
    if (obj.target !== null) {
      target.value = null
      // writingMode.value = false
      // SELEKSI OBJECT
      const object = canvas.item(obj?.target?.ids)
      console.log('mousedown select', obj)
      console.log('mousedown bject', object)
      object.set({
        transparentCorners: false,
        cornerColor: 'aqua',
        cornerStrokeColor: 'red',
        borderColor: 'red',
        cornerSize: 6,
        padding: 5,
        cornerStyle: 'circle',
        borderDashArray: [3, 3]
      })
      // canvas.setActiveObject(object)
      // canvas.item(obj?.target?.ids).hasControls = true
      // canvas.renderAll()
    } else {
      // JIKA MENU MUNCUL
      canvas.discardActiveObject()
      writingMode.value = true
      target.value = '.upper-canvas'

      showMenu.value = true
    }
  })

  canvas.on('mouse:move', (obj) => {
  })

  canvas.on('mouse:up', (obj) => {
    if (store?.dialogForm?.penanda === 'drag-segi-empat' && !obj.target === null) {
      target.value = '.upper-canvas'
    }
    writingMode.value = false
    console.log('mouseup', obj)
    const x = obj.pointer.x
    const y = obj.pointer.y
    store.setDialogForm('width', x - start.value.x)
    store.setDialogForm('height', y - start.value.y)
    if (obj.target === null) {
      draw(
        store.dialogForm.penanda,
        store.dialogForm.x,
        store.dialogForm.y,
        store.dialogForm.panjang,
        store.dialogForm.width,
        store.dialogForm.height,
        store.dialogForm.warna,
        store.dialogForm.ketebalan,
        null,
        store.dialogForm.angle,
        store.dialogForm.fill,
        store.dialogForm.tinggi
      )
    }

    console.log('canvas mouse up', canvas)
  })

  canvas.on({
    'object:moving': onChange,
    'object:scaling': onChange,
    'object:rotating': onChange
  })
}

// const onMoving = (obj) => {
//   console.log('object moving', obj)
//   store.setShapeObject(obj?.target?.ids, 'x', obj?.target?.left)
//   store.setShapeObject(obj?.target?.ids, 'y', obj?.target?.top)
// }

const onChange = (obj) => {
  const action = obj?.transform?.action
  const ids = obj?.target?.ids
  if (action === 'drag') {
    // move
    store.setShapeObject(ids, 'x', obj?.target?.left)
    store.setShapeObject(ids, 'y', obj?.target?.top)
  } else if (action === 'scale') {
    // scaling
    console.log('scale', obj)
    store.setShapeObject(ids, 'width', obj?.target?.width)
    store.setShapeObject(ids, 'height', obj?.target?.height)
    store.setShapeObject(ids, 'panjang', parseInt(obj?.target?.width * obj?.target.scaleX) / 2)
  } else if (action === 'rotate') {
    store.setShapeObject(ids, 'x', obj?.target?.left)
    store.setShapeObject(ids, 'y', obj?.target?.top)
    store.setShapeObject(ids, 'angle', obj?.target?.angle)
  }
}

function onMenuShow() {
  writingMode.value = false
}

function cancelShape() {
  refMenu.value?.refMenu?.hide()
  drawall()
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
    fill: store.dialogForm.fill,
    angle: store.dialogForm.angle,
    tinggi: store.dialogForm.tinggi,
    templatemenu: store.templateActive,
    templategambar: store.fileGambar,
    templateindex: store.gambarActive,
    noreg: props.pasien ? props.pasien.noreg : '',
    norm: props.pasien ? props.pasien.norm : ''
  }
  store.pushShapes(obj).then((x) => {
    console.log('shapes', writingMode.value)
    drawall()
    setTimeout(() => {
      // refMenu.value.hide()
      refMenu.value?.refMenu?.hide()
    }, 300)
  })
}

function draw(penanda, x, y, p, w, h, clr, tbl, ids, angle, fill, tinggi) {
  const canvas = cvn.value
  if (penanda === 'circle') {
    const circle = markRaw(new fabric.Circle({
      ids,
      left: x,
      top: y,
      radius: p,
      stroke: clr,
      strokeWidth: tbl,
      originX: 'center',
      originY: 'center',
      fill,
      angle
    }))
    canvas.add(circle)
  } else if (penanda === 'kotak') {
    const rect = markRaw(new fabric.Rect({
      ids,
      left: x,
      top: y,
      originX: 'center',
      originY: 'center',
      width: p * 2,
      height: p * 2,
      stroke: clr,
      strokeWidth: tbl,
      fill,
      angle
      // transparentCorners: false
      // cornerSize: 6
    }))

    canvas.add(rect)
  } else if (penanda === 'drag-segi-empat') {
    const rect = markRaw(new fabric.Rect({
      ids,
      left: x,
      top: y,
      originX: 'left',
      originY: 'top',
      width: w,
      height: h,
      stroke: clr,
      strokeWidth: tbl,
      fill,
      angle
      // transparentCorners: false
      // cornerSize: 6
    }))

    canvas.add(rect)
  } else if (penanda === 'Segitiga') {
    const triangle = markRaw(new fabric.Triangle({
      ids,
      left: x,
      top: y,
      width: p * 2,
      height: p * 2,
      stroke: clr,
      strokeWidth: tbl,
      originX: 'center',
      originY: 'center',
      fill,
      angle
    }))

    canvas.add(triangle)
  } else if (penanda === 'Polyline') {
    // const svgUrl = new URL('../../../../../../../assets/images/actor.svg', import.meta.url).href

    // // eslint-disable-next-line new-cap
    // markRaw(new fabric.loadSVGFromURL(svgUrl, (objects, options) => {
    //   const loadedObject = fabric.util.groupSVGElements(objects, options)
    //   loadedObject.set({
    //     left: x,
    //     top: y,
    //     width: w,
    //     height: h
    //   }).setCoords()
    //   canvas.add(loadedObject)
    //   console.log(loadedObject)
    // }))

    const poly = markRaw(new fabric.Rect({
      ids,
      left: x,
      top: y,
      originX: 'center',
      originY: 'center',
      width: p * 3,
      height: p * 2,
      stroke: clr,
      strokeWidth: tbl,
      fill,
      angle
      // transparentCorners: false
      // cornerSize: 6
    }))
    canvas.add(poly)
  }
}

function drawall() {
  resetCanvas()
  // if (writingMode.value) {
  if (arr.value.length > 0) {
    for (let i = 0; i < arr.value.length; i++) {
      draw(arr.value[i].penanda,
        arr.value[i].x,
        arr.value[i].y,
        arr.value[i].panjang,
        arr.value[i].width,
        arr.value[i].height,
        arr.value[i].warna,
        arr.value[i].ketebalan,
        i, arr.value[i].angle, arr.value[i].fill, arr.value[i].tinggi
      )
    }
  }
  // }
}

function resetCanvas() {
  const canvas = cvn.value
  canvas.remove(...canvas.getObjects())
}

function resetShapes() {
  store.resetShapes()
  setTimeout(() => {
    drawall()
  }, 300)
}

// watch(() => arr, (obj) => {
//   // console.log('watch', obj)
//   writingMode.value = true
//   drawall()
// }, { deep: true })
</script>

<style lang="scss">

</style>
