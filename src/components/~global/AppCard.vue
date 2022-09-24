<template>
  <q-card
    class="full-width"
    :flat="flat"
  >
    <q-card-section v-if="isHeader">
      <div class="f-14 text-weight-bold">
        {{ title }}
      </div>
      <div class="title-desc">
        {{ desc }}
      </div>
    </q-card-section>
    <q-separator />
    <q-card-section>
      <slot name="content" />
    </q-card-section>
  </q-card>
</template>
<script setup>

defineProps({
  title: {
    type: String,
    default: 'Title'
  },
  desc: {
    type: String,
    default: 'Deskripsi'
  },
  isHeader: {
    type: Boolean,
    default: true
  },
  flat: {
    type: Boolean,
    default: false
  }
})
</script>
