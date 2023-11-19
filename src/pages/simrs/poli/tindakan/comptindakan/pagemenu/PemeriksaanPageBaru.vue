<template>
  <q-card
    flat
    class="column full-height bg-grey-4 shadow-1"
  >
    <!-- <div
      class="col-auto bg-white"
      style="border-bottom: 1px solid grey;"
    >
      <HeaderComp />
    </div> -->
    <div class="col full-height full-width relative-position">
      <div
        class="absolute-left full-height bg-white"
        style="width:35%;"
      >
        <transition
          v-if="!store.fullCanvas"
          appear
          @enter="enter"
          @leave="leave"
        >
          <TemplateGambar
            v-show="store.dialogTemplate"
            style="border-right:2px solid gray;"
            :active="store.templateActive"
            :gambar-active="store.gambarActive"
          />
        </transition>
        <!-- INI FORM -->
        <FormPemeriksaan
          :key="pasien"
          :pasien="pasien"
          :filter-shapes="filterShapes"
        />
      </div>
      <div
        class="absolute-right full-height bg-white"
        style="width:30%;"
      >
        dsfs
      </div>
      <div
        style="width:35%; margin-left: 35%;"
        class="absolute full-height"
      >
        <CanvasComp
          :key="props?.pasien"
          :pasien="props?.pasien"
          @open-template="store.setDialogTemplate"
        />
      </div>
    </div>
  </q-card>
</template>

<script setup>
// import HeaderComp from './comppemeriksaanbaru/HeaderComp.vue'
import TemplateGambar from './comppemeriksaanbaru/TemplateGambar.vue'
import FormPemeriksaan from './comppemeriksaan/FormPemeriksaan.vue'
import { usePemeriksaanFisik } from 'src/stores/simrs/pelayanan/poli/pemeriksaanfisik'
import CanvasComp from './comppemeriksaanbaru/CanvasComp.vue'
import { useSlideFromLeft } from 'src/composable/gsap/slidefromleft'
import { computed } from 'vue'
// import { ref } from 'vue'

const { enter, leave } = useSlideFromLeft()
const store = usePemeriksaanFisik()

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

const filterShapes = computed(() => {
  return store.shapes.filter(x => x.templategambar === store.fileGambar)
})
</script>
