<template>
  <div class="full-height q-pa-sm">
    <q-card
      flat
      bordered
      class="full-height"
    >
      <div class="absolute left-menu">
        <q-list
          padding
          class="rounded-borders text-primary"
        >
          <q-item
            v-for="n in 10"
            :key="n"
            v-ripple
            clickable
            active-class="my-menu-link"
            :active="n===active"
            @click="active = n"
          >
            <q-item-section
              avatar
              @mouseover="hoverred = n"
              @mouseleave="hoverred = null"
            >
              <div class="column flex-center items-center text-white q-px-xs icon--item">
                <q-icon
                  class="icon--h"
                  :class="hoverred===n?'hoverred':''"
                  name="icon-mat-history"
                  size="lg"
                />
                <div>Inbox</div>
              </div>
            </q-item-section>
          </q-item>
        </q-list>
      </div>

      <div class="absolute right-menu">
        asd
      </div>
      <div class="column full-height scroll">
        <BodyPage />
      </div>
    </q-card>
  </div>
</template>

<script setup>
import BodyPage from './comppemeriksaan/Bodypage.vue'
import { ref } from 'vue'

const active = ref(1)
const hoverred = ref(null)
</script>
<style lang="scss" scoped>
.left-menu{
  background-color: rgba($color: $primary, $alpha: 0.8);
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
