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

      <!-- <q-menu
        touch-position
        context-menu
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

    </canvas>
    <img
      ref="imgRef"
      :src="store.fileGambar"
      alt="gambar medis"
      class="hidden"
    >

    <!-- <div
      v-if="objectSelected"
      :style="`
        position: absolute;
        left:${leftX}px;
        top:${topY}px;
      `"
    >
      <div class="flex">
        <q-btn
          icon="icon-mat-delete"
          color="negative"
          flat
          size="xs"
          round
          @click="deleteObject"
        />
        <q-btn
          icon="icon-mat-delete"
          color="primary"
          flat
          size="xs"
          round
          @click="deleteObject"
        />
      </div>
    </div> -->

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
// const isRightClick = ref(false)
const start = ref(null)
const objectSelected = ref(null)
const options = ref([])
const { menus } = useMenuPemeriksaan()

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
    selectionColor: '#9494948f',
    selectionLineWidth: 3,
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

  // icons
  const deleteIcon = "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E"
  const deleteImg = document.createElement('img')
  deleteImg.src = deleteIcon

  const cloneIcon = "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='iso-8859-1'%3F%3E%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 55.699 55.699' width='100px' height='100px' xml:space='preserve'%3E%3Cpath style='fill:%23010002;' d='M51.51,18.001c-0.006-0.085-0.022-0.167-0.05-0.248c-0.012-0.034-0.02-0.067-0.035-0.1 c-0.049-0.106-0.109-0.206-0.194-0.291v-0.001l0,0c0,0-0.001-0.001-0.001-0.002L34.161,0.293c-0.086-0.087-0.188-0.148-0.295-0.197 c-0.027-0.013-0.057-0.02-0.086-0.03c-0.086-0.029-0.174-0.048-0.265-0.053C33.494,0.011,33.475,0,33.453,0H22.177 c-3.678,0-6.669,2.992-6.669,6.67v1.674h-4.663c-3.678,0-6.67,2.992-6.67,6.67V49.03c0,3.678,2.992,6.669,6.67,6.669h22.677 c3.677,0,6.669-2.991,6.669-6.669v-1.675h4.664c3.678,0,6.669-2.991,6.669-6.669V18.069C51.524,18.045,51.512,18.025,51.51,18.001z M34.454,3.414l13.655,13.655h-8.985c-2.575,0-4.67-2.095-4.67-4.67V3.414z M38.191,49.029c0,2.574-2.095,4.669-4.669,4.669H10.845 c-2.575,0-4.67-2.095-4.67-4.669V15.014c0-2.575,2.095-4.67,4.67-4.67h5.663h4.614v10.399c0,3.678,2.991,6.669,6.668,6.669h10.4 v18.942L38.191,49.029L38.191,49.029z M36.777,25.412h-8.986c-2.574,0-4.668-2.094-4.668-4.669v-8.985L36.777,25.412z M44.855,45.355h-4.664V26.412c0-0.023-0.012-0.044-0.014-0.067c-0.006-0.085-0.021-0.167-0.049-0.249 c-0.012-0.033-0.021-0.066-0.036-0.1c-0.048-0.105-0.109-0.205-0.194-0.29l0,0l0,0c0-0.001-0.001-0.002-0.001-0.002L22.829,8.637 c-0.087-0.086-0.188-0.147-0.295-0.196c-0.029-0.013-0.058-0.021-0.088-0.031c-0.086-0.03-0.172-0.048-0.263-0.053 c-0.021-0.002-0.04-0.013-0.062-0.013h-4.614V6.67c0-2.575,2.095-4.67,4.669-4.67h10.277v10.4c0,3.678,2.992,6.67,6.67,6.67h10.399 v21.616C49.524,43.26,47.429,45.355,44.855,45.355z'/%3E%3C/svg%3E%0A"
  const cloneImg = document.createElement('img')
  cloneImg.src = cloneIcon

  function renderIcon(icon) {
    return function renderIcon(ctx, left, top, styleOverride, fabricObject) {
      const size = this.cornerSize
      ctx.save()
      ctx.translate(left, top)
      ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle))
      ctx.drawImage(icon, -size / 2, -size / 2, size, size)
      // ctx.drawImage(icon, -size, -size, size, size)
      ctx.restore()
    }
  }

  fabric.Object.prototype.controls.deleteControl = markRaw(new fabric.Control({
    x: 0.5,
    y: -0.5,
    offsetY: -10,
    offsetX: 10,
    cursorStyle: 'pointer',
    mouseUpHandler: deleteObject,
    render: renderIcon(deleteImg),
    cornerSize: 16
  }))

  fabric.Object.prototype.controls.clone = markRaw(new fabric.Control({
    x: -0.5,
    y: -0.5,
    offsetY: -10,
    offsetX: -10,
    cursorStyle: 'pointer',
    mouseUpHandler: cloneObject,
    render: renderIcon(cloneImg),
    cornerSize: 16
  }))

  function deleteObject() {
    console.log('delete Object', objectSelected.value)
    const x = objectSelected.value?.left
    const y = objectSelected.value?.top
    store.deleteObjectOnShapes(x, y).then(() => {
      drawall()
    })
  }

  function cloneObject(eventData, transform) {
    const target = transform.target
    const obj = arr.value[target.ids]
    console.log('clone', target)
    const clone = {
      penanda: obj?.penanda,
      x: obj?.x + 10,
      y: obj?.y + 10,
      anatomy: obj?.anatomy,
      ket: obj?.ket,
      ketebalan: obj?.ketebalan,
      panjang: obj?.panjang,
      width: obj?.width,
      height: obj?.height,
      warna: obj?.warna,
      fill: obj?.fill,
      angle: obj?.angle,
      tinggi: obj?.tinggi,
      templatemenu: store.templateActive,
      templategambar: store.fileGambar,
      templateindex: store.gambarActive,
      noreg: props.pasien ? props.pasien.noreg : '',
      norm: props.pasien ? props.pasien.norm : ''
    }
    store.pushShapes(clone).then((x) => {
    // console.log('shapes', writingMode.value)
      drawall()
      // setTimeout(() => {
      // }, 100)
    })
  }

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
      setBtns(canvas, obj)

      // addBtns(canvas, object)
      // canvas.renderAll()
    } else {
      // JIKA MENU MUNCUL
      canvas.discardActiveObject()
      objectSelected.value = null
      writingMode.value = true
      target.value = '.upper-canvas'

      showMenu.value = true
    }
  })

  canvas.on('mouse:move', (obj) => {
    // objectSelected.value = null
  })

  canvas.on('mouse:up', (obj) => {
    if (store?.dialogForm?.penanda === 'drag-segi-empat') {
      target.value = '.upper-canvas'
    }
    writingMode.value = false
    console.log('mouseup', obj)
    if (store?.dialogForm?.penanda === 'drag-segi-empat') {
      const x = obj.pointer.x
      const y = obj.pointer.y
      store.setDialogForm('width', x - start.value.x)
      store.setDialogForm('height', y - start.value.y)
    }
    // } else if (store?.dialogForm?.penanda === 'kotak') {
    //   store.setDialogForm('width', store.dialogForm.width)
    //   store.setDialogForm('height', store.dialogForm.width)
    // }

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

    if (target.value === null) {
      setBtns(canvas, obj)
      // objectSelected.value = null
      // setBtns(canvas, obj)
    }

    // console.log('canvas mouse up', canvas)
  })

  canvas.on({
    'object:moving': onChange,
    'object:scaling': onChange,
    'object:rotating': onChange
  })

  canvas.on('mouse:over', function (e) {
    // const obj = arr.value[e?.target?.ids]
    if (objectSelected.value === null || objectSelected.value?.ids !== e?.target?.ids) {
      e?.target?.set('fill', '#9494948f')
      canvas.renderAll()
    }
  })
  canvas.on('mouse:out', function(e) {
    const obj = arr.value[e?.target?.ids]
    console.log('mouseout', obj)
    e?.target?.set('fill', obj?.fill)
    canvas.renderAll()
  })
}

function setBtns(canvas, obj) {
  const object = canvas.item(obj?.target?.ids)
  objectSelected.value = object
  // console.log('mousedown select', obj)
  // console.log('mouseevent object', object)
  object.set({
    transparentCorners: false,
    cornerColor: 'aqua',
    cornerStrokeColor: 'red',
    borderColor: 'red',
    cornerSize: 6,
    padding: 5,
    cornerStyle: 'circle',
    borderDashArray: [3, 3],
    rotatingPointOffset: 4
  })
  // canvas.setActiveObject(object)
  canvas.item(obj?.target?.ids).hasControls = true
  canvas.item(obj?.target?.ids).controls.mtr.offsetY = -20
}

const onChange = (obj) => {
  objectSelected.value = null
  const action = obj?.transform?.action
  const ids = obj?.target?.ids
  const object = obj?.target
  objectSelected.value = object
  // console.log('onChange', objectSelected.value)
  if (action === 'drag') {
    // move
    console.log('drag', obj)
    store.setShapeObject(ids, 'x', obj?.target?.left)
    store.setShapeObject(ids, 'y', obj?.target?.top)
  } else if (action === 'scale') {
    // scaling
    console.log('scale', obj)
    // console.log('onChange-arr', store.shapes[ids])
    store.setShapeObject(ids, 'width', object?.width * object?.scaleX)
    store.setShapeObject(ids, 'height', object?.height * object?.scaleY)
    store.setShapeObject(ids, 'panjang', parseInt(object?.width * object?.scaleX) / 2)
    store.setShapeObject(ids, 'tinggi', parseInt(object?.height * object?.scaleY) / 2)
    // console.log('onChange-arr', store.shapes[ids])
  } else if (action === 'scaleX') {
    // scaling
    console.log('scaleX', obj)
    store.setShapeObject(ids, 'width', object?.width * object?.scaleX)
    store.setShapeObject(ids, 'panjang', parseInt(object?.width * object?.scaleX) / 2)
  } else if (action === 'scaleY') {
    // scaling
    console.log('scaleY', obj)
    store.setShapeObject(ids, 'height', object?.height * object?.scaleY)
    store.setShapeObject(ids, 'tinggi', parseInt(object?.height * object?.scaleY) / 2)
  } else if (action === 'rotate') {
    console.log('rotate', obj)
    store.setShapeObject(ids, 'x', obj?.target?.left)
    store.setShapeObject(ids, 'y', obj?.target?.top)
    store.setShapeObject(ids, 'angle', obj?.target?.angle)
  }
}

function onMenuShow() {
  writingMode.value = false
}

function cancelShape() {
  store.resetDialogForm(store.templateActive)
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
    // console.log('shapes', writingMode.value)
    drawall()
    setTimeout(() => {
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
      // width: p * 2,
      // height: p * 2,
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

    // eslint-disable-next-line new-cap
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

    const poly = markRaw(new fabric.Polygon(
      [
        { x: p, y: p / 3 },
        { x: p * 3, y: p / 3 },
        { x: p * 3 + (p / 3), y: (p / 3) * 4 },
        { x: p - (p / 3), y: (p / 3) * 4 }],
      {
        ids,
        // left: x,
        // top: y,
        originX: 'center',
        originY: 'center',
        // width: p * 3,
        // height: p * 2,
        // stroke: clr,
        // strokeWidth: tbl,
        fill,
        angle,
        stroke: clr,
        left: x,
        top: y,
        strokeWidth: tbl,
        strokeLineJoin: 'bevil'
      }))
    canvas.add(poly)
  }
}

function drawall() {
  resetCanvas()
  objectSelected.value = null
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
        i,
        arr.value[i].angle,
        arr.value[i].fill,
        arr.value[i].tinggi
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

</script>

<style lang="scss">

</style>
