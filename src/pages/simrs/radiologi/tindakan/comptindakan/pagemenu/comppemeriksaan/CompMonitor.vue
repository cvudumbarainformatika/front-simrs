<template>
  <q-card
    flat
    bordered
    dark
  >
    <div class="column flex-center relative-position q-pa-md">
      <div
        class="text-h3 q-pa-sm relative-position"
        :class="ciri?.color?? ''"
      >
        {{ props?.nilai }}
        <div
          v-if="celcius"
          class="absolute-top-right q-ma-xs"
        >
          <div class="f-10">
            0
          </div>
        </div>
      </div>

      <div class="absolute-top q-ma-xs">
        <div class="text-orange">
          {{ props?.label }}
        </div>
      </div>
      <div class="absolute-bottom-right q-ma-sm">
        <q-icon
          :name="props?.icon"
          color="grey"
          size="sm"
        />
      </div>
      <div
        class="absolute-bottom f-10 q-ma-xs"
      >
        {{ ciri?.res ?? '-' }}
      </div>
    </div>
  </q-card>
</template>

<script setup>
const props = defineProps({
  nilai: {
    type: String,
    default: '0'
  },
  label: {
    type: String,
    default: 'N (HR)'
  },
  icon: {
    type: String,
    default: 'icon-my-monitor_heart'
  },
  celcius: {
    type: Boolean,
    default: false
  },
  ciri: { type: Object, default: null }
})
</script>
