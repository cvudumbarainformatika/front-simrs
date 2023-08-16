<template>
  <div class="full-height q-pa-sm">
    <q-card
      flat
      bordered
      class="full-height"
    >
      <!-- <div class="absolute full-height left-menu z-top"> -->
      <!-- <q-scroll-area style="height: calc(100vh-1px);"> -->
      <!-- <q-list
            padding
            dense
            class="rounded-borders text-primary"
          > -->
      <!-- <q-item
              v-for="(n, i) in anats"
              :key="i"
              v-ripple
              clickable
              active-class="my-menu-link"
              :active="(i) === active"
              @click="active = i"
            >
              <q-item-section
                avatar
                thumbnail
                @mouseover="hoverred = i"
                @mouseleave="hoverred = null"
              >
                <div class="text-white icon--item q-py-xs q-px-sm ">
                  <q-icon
                    class="icon--h"
                    :class="hoverred === i ? 'hoverred' : ''"
                    :name="n.icon"
                    size="sm"
                    dense
                  >
                    <q-tooltip
                      anchor="center right"
                      self="center left"
                      :offset="[10, 10]"
                      class="bg-dark text-white"
                    >
                      <strong>{{ n.name }}</strong> on <em>template</em>
                      (<q-icon name="icon-mat-keyboard_arrow_right" />)
                    </q-tooltip>
                  </q-icon>
                </div>
              </q-item-section>
            </q-item> -->
      <!-- </q-list> -->
      <!-- </q-scroll-area> -->
      <!-- </div> -->

      <div class="absolute right-menu invisible">
        {{ anats[active].name }}
      </div>
      <div class="row full-height">
        <div class="col full-height">
          <div class="column full-height bg-grey q-pa-sm">
            <div class="col">
              atass
            </div>
            <div class="col-auto q-pa-sm">
              sdsa
            </div>
            <div class="col-5 bg-red scroll">
              <div
                v-for="n in 100"
                :key="n"
              >
                sadsa
              </div>
            </div>
          </div>
          <!-- <div class="row full-height"> -->
          <!-- <q-card
            :square="true"
            class="full-height card-left"
          >
            <q-card-section>
              <div class="text-h5 text-white">
                {{ anats[active].name }} <span class="f-12">(Template)</span>
              </div>
              <q-separator class="q-my-sm" />
              <div class="text-caption text-grey">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </div>
            </q-card-section>
            <q-card-section
              class="bg-dark full-height scroll"
            >
              asd
            </q-card-section>
          </q-card> -->
          <!-- </div> -->
        </div>
        <div class="col-auto">
          <!-- <div class=""> -->
          <div class="column full-height flex-center">
            <canvas-page />
          </div>
        </div>
        <div class="col bg-red">
          sad
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
  { name: 'Hidung', icon: 'icon-my-big-nose-svgrepo-com' },
  { name: 'Rambut', icon: 'icon-my-male-black-short-hair-shape-silhouette-svgrepo-com' },
  { name: 'Bibir', icon: 'icon-my-thin-lips-outline-svgrepo-com' },
  { name: 'Gigi Geligi', icon: 'icon-my-tooth-outline-svgrepo-com' },
  { name: 'Lidah', icon: 'icon-my-tongue-and-mouth-svgrepo-com' },
  { name: 'Leher', icon: 'icon-my-human-neck-svgrepo-com' },
  { name: 'Tenggorokan', icon: 'icon-my-human-trachea-svgrepo-com' },
  { name: 'Tonsil', icon: 'icon-my-tonsil-svgrepo-com' },
  { name: 'Dada', icon: 'icon-my-female-torso-svgrepo-com' },
  { name: 'Payudara', icon: 'icon-my-upper-torso-of-a-woman-svgrepo-com' },
  { name: 'Punggung', icon: 'icon-my-human-back-svgrepo-com' },
  { name: 'Perut', icon: 'icon-my-stomach-svgrepo-com' },
  { name: 'Genital', icon: 'icon-my-penis-svgrepo-com' },
  { name: 'Anus/Dubur', icon: 'icon-my-tooth-outline-svgrepo-com' },
  { name: 'Lengan Atas', icon: 'icon-my-tooth-outline-svgrepo-com' },
  { name: 'Lengan Bawah', icon: 'icon-my-tooth-outline-svgrepo-com' },
  { name: 'Lengan Bawah', icon: 'icon-my-tooth-outline-svgrepo-com' },
  { name: 'Jari Tangan', icon: 'icon-my-tooth-outline-svgrepo-com' },
  { name: 'Kuku Tangan', icon: 'icon-my-tooth-outline-svgrepo-com' },
  { name: 'Persendian Tangan', icon: 'icon-my-tooth-outline-svgrepo-com' },
  { name: 'Tungkai Atas', icon: 'icon-my-tooth-outline-svgrepo-com' },
  { name: 'Tungkai Bawah', icon: 'icon-my-tooth-outline-svgrepo-com' },
  { name: 'Jari Kaki', icon: 'icon-my-tooth-outline-svgrepo-com' },
  { name: 'Kuku Kaki', icon: 'icon-my-tooth-outline-svgrepo-com' },
  { name: 'Persendian Kaki', icon: 'icon-my-tooth-outline-svgrepo-com' }
])

const active = ref(1)
// const hoverred = ref(null)
</script>
<style lang="scss" scoped>
.left-menu{
  background-color: rgba($color: $primary, $alpha: 0.9);
  width:40px;
  // height: calc(100% - 30px) !important;
  height:100%;
}

.card-left {
    background-color: rgba($color: rgb(57, 56, 56), $alpha: 0.5);
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
