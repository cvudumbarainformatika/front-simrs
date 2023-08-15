<template>
  <q-list
    bordered
    class="rounded-borders full-height"
  >
    <q-item
      v-for="(list,i) in lists"
      :key="i"
      v-ripple
      clickable
      :active="link === i"
      active-class="bg-grey-9 text-white"
      @click="handleClick(i)"
    >
      <q-item-section avatar>
        <q-icon :name="list.icon" />
      </q-item-section>

      <q-item-section>{{ list.link }}</q-item-section>
    </q-item>
  </q-list>
</template>
<script setup>

const emits = defineEmits(['click'])
defineProps({
  lists: {
    type: Array,
    default: () => []
  },
  link: {
    type: Number,
    default: 0
  }
})

function handleClick(i) {
  emits('click', i)
}
</script>
