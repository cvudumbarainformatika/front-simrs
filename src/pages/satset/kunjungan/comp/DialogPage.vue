<template>
  <q-dialog
    persistent
    :maximized="true"
    transition-show="slide-left"
    transition-hide="slide-right"
  >
    <q-card
      class="column relative-position"
      style="overflow: hidden;"
    >
      <div class="col-auto">
        <q-bar class="bg-primary text-white">
          <q-icon
            :name="item?.icon"
            size="xs"
          />
          <div class="f-12">
            Data {{ props?.item?.desc }}
          </div>
          <q-space />

          <q-btn
            v-close-popup
            dense
            flat
            icon="icon-mat-close"
          >
            <q-tooltip class="bg-white text-primary">
              Tutup
            </q-tooltip>
          </q-btn>
        </q-bar>
      </div>

      <div class="col full-height">
        <!-- <q-scroll-area style="height:calc( 100% - 1px)"> -->
        <component
          :is="layout"
        />
        <!-- </q-scroll-area> -->
        <!-- <div class="absolute-bottom q-pa-sm bg-primary">
          Bottom Page
        </div> -->
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup>
import PageRajal from './contents/PageRajal.vue'
import PageRanap from './contents/PageRanap.vue'
import BlockPage from './contents/BlockPage.vue'

import { computed } from 'vue'
const props = defineProps({
  item: {
    type: Object,
    default: null
  }
})
const layouts = {
  default: BlockPage,
  PageRajal,
  PageRanap,
  BlockPage
}
const defaultLayout = 'PageRajal'
const layout = computed(() => layouts[props?.item?.comp] || defaultLayout)
</script>
