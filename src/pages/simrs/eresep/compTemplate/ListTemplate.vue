<template>
  <div class="fit q-pa-sm scroll bg-grey-4">
    <q-card
      v-ripple
      flat borderred v-for="(item, n) in items" :key="n"
      :class="classHover === n ? 'bg-grey-3 text-orange' : 'bg-white'"
      class="q-mb-sm cursor-pointer"
      @mouseover="onMouseOver(n)"
      @mouseleave="onMouseOver(-1)"
    >
      <!-- <q-card-section class="row items-center q-px-md q-py-sm">
        <div>{{ item?.nama }}</div>
        <q-space />
        <q-btn flat icon="icon-mat-keyboard_arrow_right" color="primary" round size="sm" />
      </q-card-section> -->
      <q-item clickable @click="emits('select', item)">
        <q-item-section>
          <q-item-label>{{ item?.nama }}</q-item-label>
        </q-item-section>
        <q-item-section side @click="emits('delete', item)">
          <q-btn flat icon="icon-mat-delete" color="negative" round size="sm" />
        </q-item-section>
      </q-item>
    </q-card>

    <div style="margin-bottom: 100px;" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const classHover = ref(-1)

defineProps({
  items: {
    type: Array,
    default: () => []
  }
})

const emits = defineEmits(['select', 'delete'])

const onMouseOver = (val) => {
  classHover.value = val
}

</script>
