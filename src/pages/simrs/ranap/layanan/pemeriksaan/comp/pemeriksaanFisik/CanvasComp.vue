<template>
  <div class="canvas-box fit design-stage-grid">
    <div class="inside-shadow" />
    <q-resize-observer :debounce="200" @resize="onResize" />
    <div class="absolute-top z-top fit column flex-center">
      <SvgComp
        ref="svgRef"
        :workspace="setWorkspace"
      />
    </div>
    <canvas ref="canvasRef" id="canvas" :class="ruler ? 'design-stage-grid' : ''" />
    <!-- <dragMode v-if="state.show" /> -->
    <!-- <zoom /> -->
  </div>
</template>

<script setup>
// eslint-disable-next-line no-unused-vars
import { defineAsyncComponent, onMounted, onUnmounted, ref, shallowRef, watchEffect } from 'vue'
import useCanvas from './canvasUse/useCanvas'

// defineProps({
//   pasien: {
//     type: Object,
//     default: () => null
//   }
// })

// eslint-disable-next-line no-unused-vars
const SvgComp = defineAsyncComponent(() => import('./SvgComp.vue'))
// const SvgComp = import('./SvgComp.vue')

// const cvs = ref(null)
const canvasRef = ref(null)
const svgRef = ref(null)
// eslint-disable-next-line no-unused-vars
const { ruler, initCanvas, setWorkspace, svgEl } = useCanvas()

onMounted(async () => {
  // console.log('svg mounted', svgRef)

  const canvas = canvasRef.value
  const workspaceEl = document.querySelector('#workspace')
  const width = workspaceEl.offsetWidth
  const height = workspaceEl.offsetHeight

  await initCanvas(canvas, width, height)
})

const onResize = (dimensions) => {
  console.log('dimensions', dimensions)
  const canvas = canvasRef.value
  initCanvas(canvas, dimensions.width, dimensions.height)
}

onUnmounted(() => {
  console.log('canvas unmounted')
})

watchEffect(() => {
  // log
})

</script>

<style lang="scss" scoped>
.canvas-box {
  position: relative;
}
#canvas {
  // width: 300px;
  // height: 300px;
  margin: 0 auto;
  // background-color: white;
  // background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAHUlEQVQ4jWNgYGAQIYAJglEDhoUBg9+FowbQ2gAARjwKARjtnN8AAAAASUVORK5CYII=");
  // background-size: 30px 30px;
}

.inside-shadow {
  position: absolute;
  width: 100%;
  height: 100%;
  box-shadow: inset 15px 5px blue;
  box-shadow: inset 0 0 9px 2px #0000001f;
  z-index: 2;
  pointer-events: none;
}

.design-stage-grid {
  // dom.style.setProperty('--offsetX', `${point.x + e.clientX}px`) 通过修改 偏移量 可实现跟随鼠标效果 --size 则为间距
  // dom.style.setProperty('--offsetY', `${point.y + e.clientY}px`)
  --offsetX: 0px;
  --offsetY: 0px;
  --size: 16px;
  --color: #dedcdc;
  background-image: linear-gradient(
      45deg,
      var(--color) 25%,
      transparent 0,
      transparent 75%,
      var(--color) 0
    ),
    linear-gradient(45deg, var(--color) 25%, transparent 0, transparent 75%, var(--color) 0);
  background-position: var(--offsetX) var(--offsetY),
    calc(var(--size) + var(--offsetX)) calc(var(--size) + var(--offsetY));
  background-size: calc(var(--size) * 2) calc(var(--size) * 2);
}

</style>
