<template>
  <div>
    <q-carousel
      v-if="!store.loading"
      v-model="slide"
      animated
      arrows
      infinite
      :autoplay="true"
      :style="`height:${height}px`"
    >
      <!-- transition-prev="slide-right"
    transition-next="slide-left" -->
      <q-carousel-slide
        v-for="(img, i) in slides"
        :key="i"
        :name="i"
        :img-src="getImage(img.image)"
      >
        <div
          v-show="img.title!=='null'"
          class="absolute-bottom custom-caption"
        >
          <div class="text-h3">
            {{ img.title==="null" || img.title===""?'':img.title }}
          </div>
          <div class="text-subtitle1">
            {{ img.desc==="null" || img.desc===""?'':img.desc }}
          </div>
        </div>
      </q-carousel-slide>
    </q-carousel>
    <q-skeleton
      v-else
      :height="`${height}px`"
    />
  </div>
</template>

<script setup>
import { pathImg } from 'src/boot/axios'
import { useCarouselApp } from 'src/stores/app/carousel'
import { computed, ref } from 'vue'

defineProps({
  height: {
    type: Number,
    default: 500
  }
})

const store = useCarouselApp()
store.getData()

const slides = computed(() => store.slides)

const slide = ref(0)

function getImage(img) {
  if (store.carousels.length > 0) {
    return pathImg + img
  }
  return img
}
</script>

<style lang="scss" scoped>
.custom-caption{
  text-align: right;
  padding: 40px;
  color: white;
  background-color: rgba(0, 0, 0, .3);
}

</style>
