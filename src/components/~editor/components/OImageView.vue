<template>
  <node-view-wrapper
    as="span"
    class="image-container"
    :class="{ 'selected': selected || resizing,'left': left, 'right':right}"
    :contenteditable="selected || resizing"
  >
    <img
      :ref="node.attrs.ref"
      :src="src"
      :width="node.attrs.width"
      :height="node.attrs.height"
      :class="{ 'selected': selected || resizing, 'cursor-pointer text-left': node.attrs.ref }"
      @click="selectImage"
      @mousedown="onHover"
      @mouseout="hovered = false"
    >
    <div
      v-if="editor.view.editable"
      v-show="selected || resizing"
      class="image-resizer"
    >
      <span
        v-for="(item, index) in resizeDirections"
        :key="index"
        :class="`image-resizer__handler--${item.value}`"
        class="image-resizer__handler"
        @mousedown="(evt)=> onMouseDown(evt, item.value)"
      />
    </div>

    <!-- toolbar -->
    <div class="row items-center o-toolbar">
      <div class="col-auto actions">
        <q-btn
          v-if="selected || resizing"
          color="yellow"
          icon="icon-mat-settings"
          size="xs"
          padding="xs"
          flat
        >
          <q-tooltip
            anchor="top middle"
            self="bottom middle"
          >
            Setting Image
          </q-tooltip>
          <q-menu
            ref="optRef"
            anchor="top right"
            self="top left"
            content-class="o-menu o-image-menu"
          >
            <section class="q-px-md q-pb-sm">
              <div class="row justify-between items-center text-bold q-py-sm">
                <div>Settings</div>
                <div>
                  <q-btn
                    v-close-popup
                    icon="icon-mat-close"
                    size="0.7rem"
                    flat
                    dense
                  />
                </div>
              </div>
              <q-separator />
              <div class="row col-12 items-start q-pa-sm">
                <q-btn
                  icon="icon-mat-menu"
                  color="primary"
                  @click="handleClassP"
                />
                <!-- <q-input
                  v-model="imgOption.width"
                  type="number"
                  debounce="500"
                  standout
                  :hint="$o.lang.image.width"
                  suffix="px"
                  @input="onInput($event, 'width')"
                /> -->
                <!-- <div class="q-px-sm">
                  <q-btn
                    :icon="keepRatio ? 'link' : 'link_off'"
                    dense
                    flat
                    @click="keepRatio = !keepRatio"
                  >
                    <q-tooltip>{{ keepRatio ? $o.lang.image.lockAspectRatio : $o.lang.image.unlockAspectRatio }}</q-tooltip>
                  </q-btn>
                </div> -->
                <!-- <q-input
                  v-model="imgOption.height"
                  type="number"
                  debounce="500"
                  standout
                  :hint="$o.lang.image.height"
                  suffix="px"
                  @input="onInput($event, 'height')"
                /> -->
              </div>
              <div />
            </section>
          </q-menu>
        </q-btn>
      </div>
    </div>
  </node-view-wrapper>
</template>

<script setup>
import { NodeViewWrapper, nodeViewProps } from '@tiptap/vue-3'
import { clamp } from 'src/modules/shared'
// import { NodeSelection } from 'prosemirror-state'
import { computed, onMounted, ref } from 'vue'
const props = defineProps(nodeViewProps)

// const refImage = ref()
const maxWidth = ref(0)
const keepRatio = ref(true)
const resizing = ref(false)

const hovered = ref(false)
const optRef = ref()
const left = ref(false)
const right = ref(false)

const imgOption = ref({
  src: '',
  caption: '',
  ref: '',
  width: 0,
  height: 0,
  originalWidth: 0,
  originalHeight: 0
})
const resizerState = ref({
  x: 0,
  y: 0,
  w: 0,
  h: 0,
  dir: ''
})

const src = computed({
  get() {
    return props.node.attrs.src
  },
  set(src) {
    props.updateAttributes(src)
  }
})

const resizeDirections = computed(() => {
  return [
    { label: '', value: 'tl' },
    { label: '', value: 'tr' },
    { label: '', value: 'bl' },
    { label: '', value: 'br' }
  ]
})

onMounted(() => {
  console.log(props)
  getMaxSize()
  imgOption.value = {
    src: src.value,
    ref: props.node.attrs.ref,
    width: props.node.attrs.width || 100,
    height: props.node.attrs.height || 100,
    originalWidth: props.node.attrs.width || 100,
    originalHeight: props.node.attrs.height || 100
  }
})

function getMaxSize () {
  const { width } = getComputedStyle(props.editor.view.dom)
  maxWidth.value = parseInt(width, 10)
  // console.log(maxWidth.value)
}

function selectImage (e) {
  console.log(props.decorations)
}
function onHover() {
  // console.log('onMouse', props.editor.view.dom.firstChild.classList)
  hovered.value = true
}

function handleClassP() {
  // console.log('handleClassP', props.editor.view.dom.firstChild.classList)
  // const p = props.editor.view.dom.firstChild
  // p.classList.add('row')
  // console.log('handleClassP', props)
  left.value = true
  right.value = false
}

function onMouseDown(e, direction) {
  e.preventDefault()
  e.stopPropagation()

  console.log(e)

  resizerState.value.x = e.clientX
  resizerState.value.y = e.clientY
  resizerState.value.w = Math.min(imgOption.value.width, maxWidth.value)
  resizerState.value.h = imgOption.value.height
  resizerState.value.direction = direction

  resizing.value = true
  onEvents()
}

function onEvents () {
  document.addEventListener('mousemove', onMouseMove, true)
  document.addEventListener('mouseup', onMouseUp, true)
}

function onMouseMove (e) {
  e.preventDefault()
  e.stopPropagation()
  if (!resizing.value) {
    return
  }

  const ratio = imgOption.value.originalWidth / imgOption.value.originalHeight
  // console.log(imgOption.value.originalWidth)
  const { x, y, w, h, direction } = resizerState.value
  const dx = (e.clientX - x) * (/l/.test(direction) ? -1 : 1)
  const dy = (e.clientY - y) * (/t/.test(direction) ? -1 : 1)
  let width = clamp(w + dx, 20, 100000)
  let height = Math.max(h + dy, 20)

  if (keepRatio.value) {
    const newRatio = width / height
    if (newRatio > ratio) {
      width = parseInt(height * ratio, 100)
    } else if (newRatio < ratio) {
      height = parseInt(width / ratio, 100)
    }
  }

  resize(width, height)
  imgOption.value.width = width
  imgOption.value.height = height
}
function resize (width, height) {
  props.updateAttributes({
    width,
    height
  })
}
function onMouseUp (e) {
  e.preventDefault()
  e.stopPropagation()

  if (!resizing.value) {
    return
  }

  resizing.value = false
  resizerState.value = {
    x: 0,
    y: 0,
    w: 0,
    h: 0,
    direction: ''
  }

  offEvents()
  selectImage()
}

function offEvents () {
  document.removeEventListener('mousemove', onMouseMove, true)
  document.removeEventListener('mouseup', onMouseUp, true)
}
</script>

<style lang="scss" scoped>
.image-container {
  position: relative;
  display: inline-block;
  padding: 0;
  margin: 0;
  outline-style: solid;
  outline-width: 1px;
  outline-color: transparent;
  clear: both;
  box-sizing: border-box;

  &.left{
    float: left;
  }
  &.right{
    float: right;
  }

  img {
    display: block;
  }

  &.selected {
    outline-style: solid;
    outline-color: #1976D2;
  }

  .image-resizer {
    position: absolute;
    height: 100%;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 1;

    &__handler {
      background-color: #1976D2;
      border: 1px solid white;
      border-radius: 2px;
      box-sizing: border-box;
      display: block;
      height: 12px;
      position: absolute;
      width: 12px;
      z-index: 2;

      &--tl {
        cursor: nwse-resize;
        left :-6px;
        top :-6px;
      }

      &--tr {
        cursor: nesw-resize;
        right: -6px;
        top: -6px;
      }

      &--bl {
        bottom: -6px;
        cursor: nesw-resize;
        left: -6px;
      }

      &--br {
        bottom: -6px;
        cursor: nwse-resize;
        right: -6px;
      }
    }
  }

  .o-toolbar {
    position :absolute;
    top :0;
    margin :0;
    right: 0;
    visibility :visible;
    z-index :10;
  }
}
</style>
