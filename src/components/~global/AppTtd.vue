<template>
  <div class="ttd-pad-form">
    <canvas
      v-show="imgTtd === null"
      ref="canvasRef"
      class="ttd-pad"
      height="150"
      width="300"
      @pointerdown="handlePointerDown"
      @pointermove="handlePointerMove"
      @pointerup="handlePointerUp"
    />
    <q-img
      v-show="imgTtd !== null"
      :src="imgTtd"
      height="150"
      width="300"
    />
    <div class="absolute-bottom-right q-ma-md">
      <q-btn
        flat
        icon="icon-mat-refresh"
        size="md"
        padding="xs"
        round
        color="negative"

        @click="clearPad()"
      />
      <q-btn
        flat
        icon="icon-mat-save"
        size="md"
        padding="xs"
        round
        color="primary"
        @click="savePad()"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'

// import { useTtd } from 'src/composable/ttd'
// const { x, y } = useTtd()
// console.log(canvas)
const canvasRef = ref()
const ctx = ref()
const writingMode = ref(false)
const positionX = ref()
const positionY = ref()

// const imgSrc = ref(null)

const props = defineProps({ ttd: { type: String, default: null } })
const emits = defineEmits(['saveTtd'])

const imgTtd = computed({
  get() {
    return props.ttd
  },
  set(nwVal) {
    emits('saveTtd', nwVal)
  }
})

onMounted(() => {
  // const canvas = document.querySelector('canvas')
  ctx.value = canvasRef.value.getContext('2d')
  ctx.value.lineWidth = 3
  ctx.value.lineJoin = ctx.value.lineCap = 'round'

  console.log('ttd', props.ttd)
})

const handlePointerDown = (event) => {
  console.log('pointerdown', event)
  writingMode.value = true
  ctx.value.beginPath()

  getTargetPosition(event)
  ctx.value.moveTo(positionX.value, positionY.value)
  // ctx.value.arc(positionX, positionY, 10, 0, 2 * Math.PI)
  // ctx.value.stroke()
}
const handlePointerUp = (event) => {
  // console.log('pointerup', event)
  writingMode.value = false
}
const handlePointerMove = (event) => {
  // console.log('pointermove', event)
  if (writingMode.value === false) return
  const [posX, posY] = getTargetPosition(event)
  ctx.value.lineTo(posX, posY)
  ctx.value.stroke()

  // console.log('positionX', posX)
}

function getTargetPosition(event) {
  positionX.value = event.clientX - event.target.getBoundingClientRect().x
  positionY.value = event.clientY - event.target.getBoundingClientRect().y
  return [positionX.value, positionY.value]
  // console.log('positionX', positionX.value)
}

const clearPad = () => {
  // imgSrc.value = null
  ctx.value.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height)
  emits('saveTtd', null)
}

const savePad = () => {
  const imageURL = canvasRef.value.toDataURL()
  // imgSrc.value = imageURL
  // console.log(imageURL)
  emits('saveTtd', imageURL)
}

// onUnmounted(() => {
//   const canvas = document.querySelector('canvas')
//   canvas.removeEventListener('pointerdown', handlePointerDown)
//   canvas.removeEventListener('pointerup', handlePointerUp)
//   canvas.removeEventListener('pointermove', handlePointerMove)
// })
</script>

<style lang="scss" scoped>
.ttd-pad-form{
  // min-height: 100px;
  max-width: 300px;
  margin: 0 auto;
  // border: 1px solid black;
  position: relative;

}

canvas.ttd-pad {
  cursor: crosshair;
  border: 2px solid black;
  border-radius: 4px;
  color: black;
}

  @media(pointer:coarse){
    body {
      overflow: hidden;
    }
  }

</style>
