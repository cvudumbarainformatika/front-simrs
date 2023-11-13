<template>
  <div
    class="ttd-pad-form full-height"
  >
    <!-- tombol-atas -->
    <HeaderCanvas />
    <!-- ===========================================================================================================canvas -->
    <div class="t-canvas">
      <!-- {{ options }} -->
      <canvas
        v-show="tab === null"
        id="canvas-1"
        ref="canvasRef1"
        class="absolute "
        :width="props.width"
        :height="props.width"
        style="z-index:2;
        background-color: transparent;
        cursor: crosshair;"
        @mousedown="handlePointerDown"
        @mouseup="handlePointerUp"
        @mousemove="handleMouseMove"
        @mouseout="handleMouseOut"
      >
        <MenuCanvas
          ref="refMenu"
          @show-menu="onShowInp"
          @hide-menu="onHideInp"
          @save-shape="saveShape"
          @cancel-shape="cancelShape"
        />
      </canvas>
      <canvas
        v-show="tab === null"
        id="canvas"
        ref="canvasRef"
        class="bg-template"
        :width="props.width"
        :height="props.width"

        @change="changeCanvas"
      />
      <div v-show="tab !==null">
        <q-img
          :src="`${pathImg + tab}`"
          loading="lazy"
          spinner-color="white"
          :width="`${props.width}px`"
        />
      </div>
    </div>
    <!-- =====================================================================================================tombol-bawah -->
    <div
      class="tmp-t z-top absolute-bottom "
    >
      <div v-if="pasien?.gambars.length">
        <div class="flex">
          <div class="q-py-xs q-px-sm f-10 bg-dark text-white">
            Gambar Tersimpan
          </div>
        </div>
        <q-tabs
          v-model="tab"
          dense
          class="bg-dark text-white q-pa-none"
          align="center"
          :breakpoint="0"
          indicator-color="transparent"
          mobile-arrows
          outside-arrows
        >
          <q-tab
            v-for="(src , i) in pasien?.gambars"
            :key="i"
            :name="src.gambar"
            class="q-pa-xs"
          >
            <q-img
              :src="`${pathImg + src.gambar}`"
              loading="lazy"
              spinner-color="white"
              width="100px"
            />
          </q-tab>
        </q-tabs>
      </div>
      <div
        v-if="tab === null"
        class="cursor-pointer non-selectable row items-center justify-between bg-yellow-2 q-pa-xs full-width"
      >
        <div class="q-gutter-xs">
          <q-btn
            v-if="!store.fullCanvas"
            color="teal"
            size="sm"
            padding="sm"
            label="Template Gambar"
            @click="store.setDialogTemplate"
          />
        </div>
        <div
          class="q-gutter-xs"
        >
          <q-btn
            icon="icon-mat-refresh"
            color="negative"
            size="sm"
            padding="sm"
            @click="resetTanda"
          >
            <q-tooltip>
              Reset Penandaan
            </q-tooltip>
          </q-btn>

          <q-btn
            icon="icon-mat-save"
            color="primary"
            size="sm"
            padding="sm"
            label="Simpan Gambar"
            @click="saveImage"
          />
        </div>
      </div>

      <div
        v-else
        class="cursor-pointer non-selectable row items-center justify-between bg-yellow-2 q-pa-xs full-width"
      >
        <div class="q-gutter-xs">
          <q-btn
            icon="icon-mat-close"
            color="negative"
            size="sm"
            padding="sm"
            label="Hapus Gambar"
            :loading="store.loadingform"
            :disable="store.loadingform"
            @click="hapusGambar()"
          />
        </div>
        <div class="q-gutter-xs">
          <q-btn
            icon="icon-mat-add"
            color="dark"
            size="sm"
            padding="sm"
            label="Baru"
            @click="tab=null"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// import MyImg from 'src/assets/human/human-body.jpg'
import HeaderCanvas from './HeaderCanvas.vue'
import MenuCanvas from './MenuCanvas.vue'
import { computed, onMounted, ref, watch } from 'vue'
import { usePemeriksaanFisik } from 'src/stores/simrs/pelayanan/poli/pemeriksaanfisik'
import { useMenuPemeriksaan } from '../../forjs/menupemeriksaan'
import { pathImg } from 'src/boot/axios'
import { useQuasar } from 'quasar'
// import { useMasterPemeriksaanFisik } from 'src/stores/simrs/master/poliklinik/pemeriksaanfisik'

const emits = defineEmits(['saveImage', 'setFull'])

const store = usePemeriksaanFisik()
// const master = useMasterPemeriksaanFisik()
const { menus } = useMenuPemeriksaan()
const $q = useQuasar()

const options = ref([])
const tab = ref(null)

const canvasRef = ref()
const canvasRef1 = ref()
const refMenu = ref()
const ctx = ref()
const ctx1 = ref()
const start = ref({})
// const rects = ref([])
const writingMode = ref(false)

// const lokalisparus = ref(['Infiltrat', 'Cavitas', 'Cairan', 'Massa', 'Nodul', 'Konsolidasi', 'Air Bronchogram', 'Clear Zone (Memo Thorax)', 'Normal'])

const props = defineProps({
  width: {
    type: Number,
    default: 300
  },
  pasien: {
    type: Object,
    default: null
  },
  screenFull: {
    type: Boolean,
    default: false
  }
})

onMounted(() => {
  // console.log('document', window.innerWidth / 2)
  // console.log('canvas', canvasRef.value?.getBoundingClientRect())
  store.initReset(false, props?.pasien)
  ctx.value = canvasRef.value.getContext('2d')
  ctx1.value = canvasRef1.value.getContext('2d')

  const opt = menus.value.filter(x => x.nama !== 'Body').map(x => x.nama)
  options.value = opt
  func()
})

function onShowInp() {
  // console.log('show')
  writingMode.value = false
}

function onHideInp() {
  // writingMode.value = true
  // return refMenu.value ? refMenu.value.hide() : false
}

function saveShape() {
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

function cancelShape() {
  clearPad()
  // console.log('cancel', refMenu.value?.refMenu.hide())
  refMenu.value?.refMenu?.hide()
}

const handlePointerDown = (e) => {
  e.preventDefault()
  e.stopPropagation()
  writingMode.value = true
  const [x, y] = getTargetPosition(e)
  store.setDialogForm('x', x)
  store.setDialogForm('y', y)
  store.setTemplateActive(store.templateActive)
  startRect(e)
  // console.log(store.templateActive)
}
const handlePointerUp = (event) => {
  console.log('pointer up')
  clearTemp()
  endRect(event)
  writingMode.value = false
}

const handleMouseMove = (e) => {
  e.preventDefault()
  e.stopPropagation()
  console.log('mouseMove', writingMode.value)
  if (!writingMode.value) {
    return
  }
  if (writingMode.value === true && store.dialogForm.penanda === 'drag-segi-empat') {
    const canvas = canvasRef1.value
    const context = ctx1.value
    if (start.value.x) {
      const { x, y } = getMousePos1(canvas, e)
      context.beginPath()
      context.rect(start.value.x, start.value.y, x - start.value.x, y - start.value.y)
      context.fillRect(0, 0, canvas.width, canvas.height)
      context.clearRect(0, 0, canvas.width, canvas.height)
      context.closePath()
      context.strokeStyle = 'red'
      context.stroke()
      context.beginPath()
      context.arc(start.value.x, start.value.y, 5, 0, 2 * Math.PI)
      context.fill()
      context.beginPath()
      context.arc(x, y, 5, 0, 2 * Math.PI)
      context.fill()
    }
  }
}

const handleMouseOut = (e) => {
  clearTemp()
  writingMode.value = false
}

function clearTemp() {
  const canvas = canvasRef1.value
  const context = ctx1.value
  context.clearRect(0, 0, canvas.width, canvas.height)
}

function startRect(e) {
  start.value = getMousePos(e)
}

function endRect(e) {
  const { x, y } = getMousePos(e)
  // rects.value.push({ x: start.value.x, y: start.value.y, width: x - start.value.x, height: y - start.value.y })
  store.setDialogForm('x', start.value.x)
  store.setDialogForm('y', start.value.y)
  store.setDialogForm('width', x - start.value.x)
  store.setDialogForm('height', y - start.value.y)
  store.setTemplateActive(store.templateActive)
  drawShapes(store.dialogForm.penanda,
    store.dialogForm.x,
    store.dialogForm.y,
    store.dialogForm.ketebalan,
    store.dialogForm.warna,
    store.dialogForm.panjang,
    store.dialogForm.width,
    store.dialogForm.height,
    '')

  console.log('end rect', store.dialogForm)
  // start.value = {}
  // draw()
  // rects.value = []
}

function getMousePos(evt) {
  const canvas = canvasRef.value
  const rect = canvas.getBoundingClientRect(),
    scaleX = canvas.width / rect.width,
    scaleY = canvas.height / rect.height

  return {
    x: (evt.clientX - rect.left) * scaleX,
    y: (evt.clientY - rect.top) * scaleY
  }
}
function getMousePos1(canvas, evt) {
  const rect = canvas.getBoundingClientRect(),
    scaleX = canvas.width / rect.width,
    scaleY = canvas.height / rect.height

  return {
    x: (evt.clientX - rect.left) * scaleX,
    y: (evt.clientY - rect.top) * scaleY
  }
}

function getTargetPosition(event) {
  const x = event.clientX - event.target.getBoundingClientRect().x
  const y = event.clientY - event.target.getBoundingClientRect().y
  return [x, y]
}

function drawShapes(name, x, y, tebal, warna, p, w, h, no) {
  const cx = ctx.value
  cx.beginPath()
  if (writingMode.value) {
    if (name === 'circle') {
      cx.arc(x, y, p, 0, 2 * Math.PI)
    } else if (name === 'kotak') {
      cx.rect(x - p, y - p, p * 2, p * 2)
    } else if (name === 'drag-segi-empat') {
      cx.rect(x, y, w, h)
    }
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
  func()
}
const resetTanda = () => {
  store.resetShapes()
  func()
}

const saveImage = () => {
  const imageURL = canvasRef.value.toDataURL('image/jpeg', 1)
  // console.log('gambar', imageURL)
  emits('saveImage', imageURL)
}

function hapusGambar() {
  $q.dialog({
    dark: true,
    title: 'Peringatan',
    message: 'Gambar ini akan dihapus?',
    cancel: true,
    persistent: true
  }).onOk(() => {
    store.deleteGambar(props.pasien, tab.value).then(() => {
      clearPad()
    })
  }).onCancel(() => {
    // console.log('Cancel')
  }).onDismiss(() => {
    // console.log('I am triggered on both OK and Cancel')
  })
}

const arr = computed(() => {
  return store.shapes.filter(x => x.templategambar === store.fileGambar)
})

function func(filename) {
  const bg = new Image()
  let imageURL = null
  if (store.fileGambar === null) {
    imageURL = '..' + store?.fileGambar
  } else {
    imageURL = store?.fileGambar
  }

  bg.onload = function () {
    // console.log('bg func', bg.height)
    const cvn = canvasRef.value
    ctx.value.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height)
    cvn.height = cvn.width
    const scale = Math.min(cvn.width / bg.width, cvn.height / bg.height)
    const width = bg.width * scale
    const height = bg.height * scale
    const x = cvn.width / 2 - width / 2
    const y = cvn.height / 2 - height / 2
    ctx.value.fillStyle = '#FFFFFF'
    ctx.value.fillRect(0, 0, cvn.width, cvn.height)
    try {
      ctx.value.drawImage(bg, x, y, width, height)
      console.log('arr', arr.value)

      if (arr.value.length > 0) {
        for (let i = 0; i < arr.value.length; i++) {
          drawShapes(arr.value[i].penanda,
            arr.value[i].x,
            arr.value[i].y,
            arr.value[i].ketebalan,
            arr.value[i].warna,
            arr.value[i].panjang,
            arr.value[i].width,
            arr.value[i].height,
            i + 1)
        }
      }
    } catch (error) {
      console.log('**NO** CORS permission for:', imageURL)
    }
  }

  bg.onerror = function() {
    console.log('could not load image:', imageURL)
  }
  // bg.crossOrigin = 'anonymous'
  bg.src = imageURL
  // writingMode.value = false
}

// function fetchingImg(url) {
//   // console.log(url)
//   fetch(url)
//     .then(res => res.blob())
//     .then(blob => {
//       readFile(blob)
//       const file = new File([blob], 'image', { type: blob.type })
//       console.log(file)
//     })
// }

// function readFile(input) {
//   // const fr = new FileReader()
// }

watch(() => arr, (obj) => {
  // console.log('watch', obj)
  writingMode.value = true
  func()
}, { deep: true })
watch(() => store.fileGambar, (obj) => {
  // console.log('watch file gambar', obj)
  writingMode.value = true
  func()
}, { deep: true })
watch(() => tab.value, (obj) => {
  // console.log('watch tab gambar', obj)
  writingMode.value = false
  func()
}, { deep: true })
// watch(() => props.width, (obj) => {
//   console.log('watch width', obj)
// }, { deep: true })

</script>

<style lang="scss" scoped>
.ttd-pad-form{
  margin: 0 auto;
  position: relative;
}
.t-canvas {
  position: relative;
  canvas.bg-template {
    background: #fff;
    cursor: crosshair;
    z-index:1
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
