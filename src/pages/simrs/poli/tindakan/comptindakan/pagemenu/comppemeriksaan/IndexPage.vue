<template>
  <div
    class="full-height q-pa-sm"
    style="overflow: hidden;"
  >
    <q-card
      flat
      bordered
      class="full-height"
    >
      <div class="row full-height">
        <!-- ===============================================================================ROW CANVAS GAMBAR -->
        <!-- <div class="col-auto"> -->
        <div
          ref="canvasEl"
          class="col-4"
        >
          <transition
            appear
            @enter="enter"
            @leave="leave"
          >
            <div
              v-if="store.dialogTemplate"
              class="absolute left-menu"
            >
              <template-gambar
                style="border-right:2px solid gray;"
                :active="store.templateActive"
                :gambar-active="store.gambarActive"
              />
            </div>
          </transition>
          <div class="row full-height">
            <div class="column full-height">
              <canvas-page
                :key="pasien"
                :width="canvasWidth"
                :pasien="pasien"
                :screen-full="store?.fullCanvas"
                @save-image="saveImage"
              />
            </div>
          </div>
        </div>

        <!-- ===============================================================================ROW FORM -->
        <div
          class="col-4 scroll"
          style="border-left: 1px solid gray; border-right: 1px solid gray;"
        >
          <FormPemeriksaan
            :key="pasien"
            :pasien="pasien"
            :filter-shapes="filterShapes"
            @open-history="seamless = !seamless"
          />
        </div>
        <div
          class="col-4 scroll"
        >
          <ListPemeriksaan
            :key="pasien"
            :pasien="pasien"
          />

          <HistoryPemeriksaan
            :key="pasien"
            :seamless="seamless"
            :pasien="pasien"
            @close="seamless =!seamless"
          />
        </div>
      </div>
    </q-card>
  </div>
</template>

<script setup>
// import BodyPage from './comppemeriksaan/Bodypage.vue'
import CanvasPage from './CanvasPage.vue'
import TemplateGambar from './TemplateGambar.vue'
import FormPemeriksaan from './FormPemeriksaan.vue'
import ListPemeriksaan from './ListPemeriksaan.vue'
import HistoryPemeriksaan from './HistoryPemeriksaan.vue'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { usePemeriksaanFisik } from 'src/stores/simrs/pelayanan/poli/pemeriksaanfisik'
import { useMenuPemeriksaan } from '../../forjs/menupemeriksaan'
import { useSlideFromLeft } from 'src/composable/gsap/slidefromleft'
// import { useAplikasiStore } from 'src/stores/app/aplikasi'

const seamless = ref(false)
const store = usePemeriksaanFisik()
// const storageApps = useAplikasiStore()
const { getImage } = useMenuPemeriksaan()
const { enter, leave } = useSlideFromLeft()
// const active = ref(0)

const canvasEl = ref()
const canvasWidth = ref(0)
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

const filterShapes = computed(() => {
  return store.shapes.filter(x => x.templategambar === store.fileGambar)
})

onMounted(() => {
  // console.log('canvas', canvasEl.value?.clientWidth)
  getImage()
  window.addEventListener('resize', resizeCanvas)
  resizeCanvas()
})

onUnmounted(() => {
  window.removeEventListener('resize', resizeCanvas)
})

const resizeCanvas = () => {
  canvasWidth.value = canvasEl.value?.clientWidth
  return canvasWidth.value
}

function saveImage(img) {
  store.saveImage(img, props.pasien, filterShapes.value)
}

// function changeCanvasScreen() {
//   console.log('ok')
//   store.setFullCanvas()
// }

watch(() => canvasWidth.value, (obj) => {
  console.log('watch canvasWidth', obj)
}, { deep: true })
</script>
<style lang="scss" scoped>
.bingkai{
  border: 2px solid rgb(219, 219, 219);
  writing-mode: vertical-lr;
  display: inline-block;
  cursor: pointer;
  z-index: 120001;
  &:hover{
    background-color: $dark;
  }
}
.card-left {
    background-color: rgba($color: rgb(57, 56, 56), $alpha: 0.3);
  }
.right-menu{
  background-color: rgba($color: $grey, $alpha: 0.8);
  width:350px;
  right: 0;
  // height: calc(100% - 30px) !important;
  height:100%;
}
.left-menu{
  background-color: rgba($color: $dark, $alpha: 0.98);
  width:600px;
  left: 0;
  // height: calc(100% - 30px) !important;
  height:100%;
  z-index:120000;
}
.my-menu-link{
  color: white;
  background: linear-gradient(90deg, rgb(255, 171, 45) 0%, rgba(255, 145, 0, 0.076) 100%);

}

.hoverred {
  transition: all .2s ease-in-out;
    transform: scale(1.1);
  }

</style>
