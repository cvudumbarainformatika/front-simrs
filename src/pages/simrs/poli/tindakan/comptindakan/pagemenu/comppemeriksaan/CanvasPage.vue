<template>
  <div
    class="ttd-pad-form full-height"
  >
    <!-- tombol-atas -->
    <div
      class="cursor-pointer non-selectable flex items-center justify-between bg-yellow-2 q-pa-sm tmp-t"
    >
      <div class="row items-center">
        <div class="q-gutter-xs">
          <q-btn
            v-for="(btnx, i) in btns"
            :key="i"
            :flat="btnx.name !== store.dialogForm.penanda"
            :glossy="btnx.name === store.dialogForm.penanda"
            padding="xs"
            size="sm"
            :icon="btnx.icon"
            color="dark"
            @click="store.setDialogForm('penanda',btnx.name)"
          >
            <q-tooltip>
              {{ btnx.name }}
            </q-tooltip>
          </q-btn>
        </div>
        <q-separator
          vertical
          class="q-mx-sm"
        />
        <div
          class="flex"
          style="width: 75px;"
        >
          <div class="f-10">
            Ketebalan {{ store.dialogForm.ketebalan }}
          </div>
          <q-slider
            v-model="store.dialogForm.ketebalan"
            :min="1"
            :max="10"
            label
            switch-label-side
            color="dark"
            dense
          />
        </div>
        <q-separator
          vertical
          class="q-mx-sm"
        />
        <div
          class="flex"
          style="width: 75px;"
        >
          <div class="f-10">
            Luas {{ store.dialogForm.panjang }} px
          </div>
          <q-slider
            v-model="store.dialogForm.panjang"
            :min="1"
            :max="20"
            label
            switch-label-side
            color="primary"
            dense
          />
        </div>
        <q-separator
          vertical
          class="q-mx-sm"
        />
        <q-btn
          flat
          padding="xs"
          size="xs"
          label="CR"
          :style="`background-color: ${store.dialogForm.warna};`"
        >
          <q-tooltip>
            Ganti Warna
          </q-tooltip>
          <q-menu>
            <q-item
              v-close-popup
              clickable
              style="padding:0"
            >
              <q-color
                v-model="store.dialogForm.warna"
                no-header
                no-footer
                default-view="palette"
                class="my-picker"
              />
            </q-item>
          </q-menu>
        </q-btn>
      </div>
      <div />
    </div>
    <!-- ===========================================================================================================canvas -->
    <div class="t-canvas">
      <canvas
        v-show="tab === null"
        id="canvas"
        ref="canvasRef"
        class="bg-template"
        :width="props.width"
        :height="props.width"
        @mousedown="handlePointerDown"
        @mouseup="handlePointerUp"
      >
        <q-menu
          ref="refMenu"
          touch-position
          @show="onShowInp"
          @hide="onHideInp"
        >
          <q-card
            flat
            style="width:350px"
            dark
          >
            <q-card-section>
              Keterangan
            </q-card-section>
            <q-separator dark />
            <q-card-section>
              <q-select
                v-model="store.dialogForm.anatomy"
                outlined
                standout="bg-yellow-2 text-black"
                bg-color="white"
                color="orange"
                use-input
                input-debounce="0"
                label="Nama Anatomy"
                :options="options"
                dense
                class="q-mb-md"
                :rules="[val => !!val || 'Pilih Data Terlebih dahulu']"
                :disable="store.templateActive !== 'Body'"
                @filter="filterFn"
              >
                <template #no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      Tidak ditemukan
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
              <q-input
                v-model="store.dialogForm.ket"
                standout="bg-yellow-2"
                outlined
                autogrow
                label="keterangan"
                bg-color="white"
                color="orange"
              />
            </q-card-section>
            <q-separator dark />
            <div class="row">
              <q-btn
                class="col q-pa-md"
                color="primary"
                square
                size="md"
                icon="icon-mat-check"
                @click="saveShape"
              />
              <q-btn
                class="col"
                color="negative"
                icon="icon-mat-close"
                square
                size="md"
                @click="cancelShape"
              />
            </div>
          </q-card>
        </q-menu>
      </canvas>
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
import { computed, onMounted, ref, watch } from 'vue'
import { usePemeriksaanFisik } from 'src/stores/simrs/pelayanan/poli/pemeriksaanfisik'
import { useMenuPemeriksaan } from '../../forjs/menupemeriksaan'
import { pathImg } from 'src/boot/axios'
import { useQuasar } from 'quasar'

const emits = defineEmits(['saveImage'])

const store = usePemeriksaanFisik()
const { menus } = useMenuPemeriksaan()
const $q = useQuasar()

const options = ref([])
const tab = ref(null)

const canvasRef = ref()
const refMenu = ref()
const ctx = ref()
const writingMode = ref(false)

const props = defineProps({
  width: {
    type: Number,
    default: 300
  },
  pasien: {
    type: Object,
    default: null
  }
})

const btns = ref([
  { name: 'circle', icon: 'icon-mat-circle' },
  { name: 'kotak', icon: 'icon-mat-check_box_outline' }
])

onMounted(() => {
  // console.log('document', window.innerWidth / 2)
  ctx.value = canvasRef.value.getContext('2d')
  tab.value = null

  const opt = menus.value.filter(x => x.name !== 'Body').map(x => x.name)
  options.value = opt
  // resizeCanvas()
  func()
})

// function resizeCanvas() {
//   const cnv = canvasRef.value
// }

const filterFn = (val, update) => {
  if (val === '') {
    update(() => {
      options.value = menus.value.filter(x => x.name !== 'Body').map(x => x.name)
    })
    return
  }

  update(() => {
    const needle = val.toLowerCase()
    const arr = menus.value.map(x => x.name)
    options.value = arr.filter(v => v.toLowerCase().indexOf(needle) > -1 && v !== 'Body')
  })
}

function onShowInp() {
  console.log('show')
  writingMode.value = true
  drawShapes(store.dialogForm.penanda, store.dialogForm.x, store.dialogForm.y, store.dialogForm.ketebalan, store.dialogForm.warna, store.dialogForm.panjang, '')

  // saveShape()
}

function onHideInp() {
  // writingMode.value = false
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
    warna: store.dialogForm.warna,
    templatemenu: store.templateActive,
    templategambar: store.fileGambar,
    templateindex: store.gambarActive,
    noreg: props.pasien ? props.pasien.noreg : '',
    norm: props.pasien ? props.pasien.norm : ''
  }
  store.pushShapes(obj).then((x) => {
    // console.log('shapes')
    setTimeout(() => {
      refMenu.value.hide()
    }, 300)
  })
}

function cancelShape() {
  clearPad()
  refMenu.value.hide()
}

const handlePointerDown = (event) => {
  const [x, y] = getTargetPosition(event)
  store.setDialogForm('x', x)
  store.setDialogForm('y', y)
  console.log(store.dialogForm)
}
const handlePointerUp = (event) => {
  console.log('pointer up')
}

function getTargetPosition(event) {
  const x = event.clientX - event.target.getBoundingClientRect().x
  const y = event.clientY - event.target.getBoundingClientRect().y
  return [x, y]
}

function drawShapes(name, x, y, tebal, warna, p, no) {
  const cx = ctx.value
  cx.beginPath()
  if (writingMode.value) {
    if (name === 'circle') {
      cx.arc(x, y, p, 0, 2 * Math.PI)
    } else if (name === 'kotak') {
      cx.rect(x - p, y - p, p * 2, p * 2)
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
    // console.log('hapus gambar', tab.value)
    store.deleteGambar(props.pasien, tab.value).then(() => {
      clearPad()
    })
    // console.log('OK')
  }).onCancel(() => {
    // console.log('Cancel')
  }).onDismiss(() => {
    // console.log('I am triggered on both OK and Cancel')
  })
}

const arr = computed(() => {
  return store.shapes.filter(x => x.templategambar === store.fileGambar)
})
async function func(filename) {
  const cvn = canvasRef.value
  // const context = ctx.value
  ctx.value.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height)
  cvn.height = cvn.width
  const bg = new Image()
  bg.src = '..' + store.fileGambar
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
    if (arr.value.length > 0) {
      for (let i = 0; i < arr.value.length; i++) {
        drawShapes(arr.value[i].penanda,
          arr.value[i].x, arr.value[i].y,
          arr.value[i].ketebalan,
          arr.value[i].warna,
          arr.value[i].panjang, i + 1)
      }
    }
  }
}

watch(() => arr, (obj) => {
  console.log('watch', obj)
  writingMode.value = true
  func()
}, { deep: true })
watch(() => store.fileGambar, (obj) => {
  console.log('watch file gambar', obj)
  writingMode.value = true
  func()
}, { deep: true })
watch(() => tab.value, (obj) => {
  console.log('watch tab gambar', obj)
  writingMode.value = false
  func()
}, { deep: true })
watch(() => props.width, (obj) => {
  console.log('watch width', obj)
}, { deep: true })

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
