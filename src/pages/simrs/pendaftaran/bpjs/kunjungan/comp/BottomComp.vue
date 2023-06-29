<template>
  <div
    class="row items-center justify-between q-pa-sm"
    :class="`${color} text-${textColor}`"
  >
    <div>
      <div class="row items-center">
        <q-btn
          flat
          :color="textColor"
          icon="icon-mat-skip_previous"
          size="sm"
          round
        />
        <q-btn
          flat
          :color="textColor"
          icon="icon-mat-chevron_left"
          size="sm"
          round
        />
        <div class="q-px-sm">
          | <span class="q-px-sm">Hal</span> |
        </div>
        <q-btn
          flat
          :color="textColor"
          icon="icon-mat-chevron_right"
          size="sm"
          round
        />
        <q-btn
          flat
          :color="textColor"
          icon="icon-mat-skip_next"
          size="sm"
          round
        />
      </div>
    </div>
    <div>asd</div>
  </div>
</template>

<script setup>
defineProps({
  color: {
    type: String,
    default: 'bg-primary'
  },
  textColor: {
    type: String,
    default: 'white'
  }
})
</script>
