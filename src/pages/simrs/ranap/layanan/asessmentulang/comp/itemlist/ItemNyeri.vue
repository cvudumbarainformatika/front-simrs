<template>
  <div class="q-ml-sm column">
    <div class="flex flex-wrap">
      <div class="flex">
        <span> {{ item?.ket }}</span>
      </div>
      <!-- <div v-if="(item?.kajianNyeri !== 'Wong Baker Face Scale')" class="column q-ml-sm">
        <span v-for="(sub, key) in item?.form" :key="key"> {{ sub?.text }}</span>
      </div> -->
    </div>
    <div class="flex">
      <div>Skor : </div> <div class="q-ml-sm">
        {{ item?.skorNyeri }}
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  item: {
    type: Object,
    default: null
  }
})
</script>
