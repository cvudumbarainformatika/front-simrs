<template>
  <div class="fit container column flex-center items-center q-pa-lg">
    <div class="wrapper q-gutter-md">
      <q-card
        v-for="(item, i) in menus" :key="i"
        class="cursor-pointer"
        style="min-width: 25%;"
        @mouseover="ind = i"
        @mouseleave="ind = -1"
        @click="clickedItem(item)"
      >
        <q-card-section>
          <div class="row full-width">
            <div :class="`col-auto bg-${ind === i ? item?.color+'-2' : item?.color+'-1'} q-pa-sm`" style="border-radius: 10px;">
              <q-icon :name="item?.icon" size="lg" :color="`${item?.color}-10`" />
            </div>
            <div class="col-grow text-right">
              <q-btn round size="5px" :color="`${ind === i ? item?.color+'-5' : item?.color+'-2'}`" :push="ind === i" />
            </div>
          </div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div class="text-h5" :class="`${ind === i ? 'text-'+item?.color : item?.color}`">
            {{ item?.title }}
          </div>
          <div class="text-subtitle">
            {{ item?.subtitle }}
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup>

import { computed, ref } from 'vue'

const props = defineProps({
  lists: {
    type: Array,
    default: () => []
  }
})

const menus = computed(() => {
  return props.lists?.filter(x => x.name !== 'tppri-page')
})

const emits = defineEmits(['onSelect'])

const ind = ref(-1)

const clickedItem = (item) => {
  // console.log('clicked item', item)
  emits('onSelect', item)
}
</script>

<style lang="scss" scoped>
.container {
  overflow: auto;
    .wrapper {
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      align-content: stretch;
      justify-content: center;
    }
  }
</style>
