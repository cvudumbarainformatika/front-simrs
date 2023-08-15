<template>
  <q-page class="padding-page">
    <div class="row q-col-gutter-lg">
      <div class="col-md-8 col-xs-12">
        <app-cardnews />
        <q-separator class="q-my-md" />
        <div class="f-14 text-weight-bold">
          Berita Terpopuler
        </div>
        <q-separator class="q-mt-md" />
        <div>
          <q-carousel
            v-model="slide"
            transition-prev="slide-right"
            transition-next="slide-left"
            swipeable
            animated
            infinite
            autoplay
            arrows
            class="rounded-borders"
            height="250px"
          >
            <q-carousel-slide
              :name="1"
              class="column no-wrap"
            >
              <div class="row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap">
                <app-smallcard-news class="col-4" />
                <app-smallcard-news class="col-4" />
                <app-smallcard-news class="col-4" />
              </div>
            </q-carousel-slide>
          </q-carousel>
        </div>
      </div>
      <div class="col-md-4 col-xs-12">
        <div class="f-14 text-weight-bold">
          Berita Terbaru
        </div>
        <q-separator class="q-my-md" />
        <app-list-news />
        <q-separator class="q-my-md" />
        <div class="f-14 text-weight-bold">
          Kategori
        </div>
        <q-separator class="q-my-md" />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'

const slide = ref(1)
</script>

<style lang="scss" scoped>
.padding-page {
  padding-top:60px;
}
</style>
