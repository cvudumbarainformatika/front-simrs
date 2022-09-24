<template>
  <div class="tiptap-custom-image-container">
    <!-- <vue-draggable-resizable
      :w="width"
      :h="height"
      :draggable="false"
      :lock-aspect-ratio="true"
      @resizestop="onResize"
    >
      <div :style="`background-image:url('${src}');background-size:cover;background-repeat:no-repeat;position:absolute;top:0;left:0;right:0;bottom:0;`" />
    </vue-draggable-resizable> -->
    <q-img :src="src" />
  </div>
</template>
<script>
// import VueDraggableResizable from 'vue-draggable-resizable'
// import 'vue-draggable-resizable/dist/VueDraggableResizable.css'
export default {
  // components: {
  //   'vue-draggable-resizable': VueDraggableResizable
  // },
  props: ['node', 'updateAttrs', 'view', 'selected', 'getPos', 'options'],
  computed: {
    src: {
      get() {
        return this.node.attrs.src
      },
      set(src) {
        this.updateAttrs({ src })
      }
    },
    width: {
      get() {
        return parseInt(this.node.attrs.width)
      },
      set(width) {
        this.updateAttrs({
          width
        })
      }
    },
    height: {
      get() {
        return parseInt(this.node.attrs.height)
      },
      set(height) {
        this.updateAttrs({
          height
        })
      }
    }
  },
  methods: {
    onResize(x, y, width, height) {
      this.width = width
      this.height = height
    }
  }
}
</script>
