<template>
  <q-card
    flat
    bordered
    dark
  >
    <div class="q-pa-xs">
      STATUS PSIKOLOGIS
      <div class="text-yellow">
        {{ props?.psiko ?? '-' }}
      </div>
    </div>
    <div class="q-pa-xs">
      SOSIAL EKONOMI
      <div class="text-yellow">
        {{ props?.sosek??'-' }}
      </div>
    </div>
    <div class="q-pa-xs">
      SPIRITUAL
      <div class="text-yellow">
        {{ props?.spirit??'-' }}
      </div>
    </div>
  </q-card>
</template>

<script setup>
const props = defineProps({
  psiko: {
    type: String,
    default: null
  },
  sosek: {
    type: String,
    default: null
  },
  spirit: {
    type: String,
    default: null
  }
})

console.log(props)
</script>
