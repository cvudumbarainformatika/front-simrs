<template>
  <q-card
    flat
    bordered
    dark
  >
    <div class="column flex-center relative-position q-pa-md">
      <div class=" text-h3 q-pa-sm relative-position">
        <span :class="sysObj?.color ?? 'text-white'">{{ props?.sistole }}</span>/<span :class="diasObj?.color ?? 'text-white'">{{ props.diastole }}</span>
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
      <div class="absolute-bottom q-ma-sm">
        <div class="f-10 text-grey">
          {{ sysObj?.res ?? '' }} / {{ diasObj?.res ?? '' }}
        </div>
      </div>
    </div>
  </q-card>
</template>

<script setup>
const props = defineProps({
  sistole: {
    type: String,
    default: '0'
  },
  sysObj: {
    type: Object,
    default: null
  },
  diastole: {
    type: String,
    default: '0'
  },
  diasObj: {
    type: Object,
    default: null
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
  }
})
</script>
