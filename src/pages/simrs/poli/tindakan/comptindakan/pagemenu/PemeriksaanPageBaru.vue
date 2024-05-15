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
          tooltip="History Pasien (Shift + H)"
          @open-history="seamless = !seamless"
        />
      </div>
      <div
        class="absolute-right full-height bg-white"
        style="width:30%;"
      >
        <ListPemeriksaan
          :key="pasien"
          :pasien="pasien"
        />
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

      <app-drawer-right-new
        :key="pasien"
        style="width:60%;"
        :seamless="seamless"
        :pasien="pasien"
        @click-btn="clickslideRight"
      >
        <template #content>
          <HistoryPemeriksaan
            :key="pasien"
            :pasien="pasien"
            title="HISTORY PEMERIKSAAN FISIK LALU"
          />
        </template>
      </app-drawer-right-new>
    </div>
  </q-card>
</template>

<script setup>
// import HeaderComp from './comppemeriksaanbaru/HeaderComp.vue'
import TemplateGambar from './comppemeriksaanbaru/TemplateGambar.vue'
import FormPemeriksaan from './comppemeriksaanbaru/FormPemeriksaan.vue'
import ListPemeriksaan from './comppemeriksaanbaru/ListPemeriksaan.vue'
import CanvasComp from './comppemeriksaanbaru/CanvasComp.vue'
import { useSlideFromLeft } from 'src/composable/gsap/slidefromleft'
import { usePemeriksaanFisik } from 'src/stores/simrs/pelayanan/poli/pemeriksaanfisik'
import { computed, onBeforeUnmount, ref } from 'vue'
import HistoryPemeriksaan from './comppemeriksaanbaru/HistoryPemeriksaan.vue'
// import { ref } from 'vue'

const { enter, leave } = useSlideFromLeft()
const store = usePemeriksaanFisik()
const seamless = ref(false)

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

const filterShapes = computed(() => {
  return store.shapes.filter(x => x.templategambar === store.fileGambar)
})

onBeforeUnmount(() => {
  console.log('pemeriksaan fisik ditutup')
})

const clickslideRight = () => {
  // console.log('ok')
  seamless.value = !seamless.value
}
</script>
