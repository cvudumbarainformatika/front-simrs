<template>
  <div class="full-height q-pa-sm">
    <q-card
      flat
      bordered
      class="full-height"
    >
      <div class="absolute left-menu invisible">
        <q-list
          padding
          class="rounded-borders text-primary"
        >
          <q-item
            v-for="(n, i) in anats"
            :key="i"
            v-ripple
            clickable
            active-class="my-menu-link"
            :active="(i)===active"
            @click="active = i"
          >
            <q-item-section
              avatar
              @mouseover="hoverred = i"
              @mouseleave="hoverred = null"
            >
              <div class="column flex-center items-center text-white q-px-xs icon--item">
                <q-icon
                  class="icon--h"
                  :class="hoverred===i?'hoverred':''"
                  :name="n.icon"
                  size="lg"
                />
                <div class="text-center q-mt-xs">
                  {{ n.name }}
                </div>
              </div>
            </q-item-section>
          </q-item>
        </q-list>
      </div>

      <div class="absolute right-menu invisible">
        asd
      </div>
      <div class="row full-height">
        <!-- <BodyPage /> -->
        <div class="col-4">
          <div class="q-pa-md">
            <canvas-page />
          </div>
        </div>
        <div class="col-8 bg-red">
          <div class="q-pa-md" />
        </div>
      </div>
    </q-card>
  </div>
</template>

<script setup>
// import BodyPage from './comppemeriksaan/Bodypage.vue'
import CanvasPage from './comppemeriksaan/CanvasPage.vue'
import { ref } from 'vue'

const anats = ref([
  { name: 'Body', icon: 'icon-my-human-body-silhouette-with-focus-on-respiratory-system-svgrepo-com' },
  { name: 'Kepala', icon: 'icon-my-human-skull-side-view-svgrepo-com' },
  { name: 'Mata', icon: 'icon-mat-visibility' },
  { name: 'Telinga', icon: 'icon-my-ear-outline-svgrepo-com' },
  { name: 'Hidung', icon: 'icon-my-nose-outline-svgrepo-com' },
  { name: 'Rambut', icon: 'icon-my-male-black-short-hair-shape-silhouette-svgrepo-com' },
  { name: 'Bibir', icon: 'icon-my-thin-lips-outline-svgrepo-com' },
  { name: 'Gigi Geligi', icon: 'icon-my-tooth-outline-svgrepo-com' }
])

const active = ref(1)
const hoverred = ref(null)
</script>
<style lang="scss" scoped>
.left-menu{
  background-color: rgba($color: $primary, $alpha: 0.9);
  width:80px;
  // height: calc(100% - 30px) !important;
  height:100%;
}
.right-menu{
  background-color: rgba($color: $grey, $alpha: 0.8);
  width:350px;
  right: 0;
  // height: calc(100% - 30px) !important;
  height:100%;
}
.my-menu-link{
  color: white;
  background: linear-gradient(90deg, rgb(255, 171, 45) 0%, rgba(255, 145, 0, 0.076) 100%);

}

.hoverred {
  transition: all .2s ease-in-out;
    // color: red !important;
    transform: scale(1.1);
  }

</style>
