<template>
  <q-card>
    <q-card-section
      :class="`bg-${color} text-${colorTxt}`"
    >
      <div class="row items-center justify-between">
        <div class="txt">
          <div
            v-if="!loading"
            class="text-h4"
          >
            {{ nilai }}
          </div>
          <div v-else>
            <q-skeleton animation="pulse-y" />
          </div>
          <div>Hari ini</div>
        </div>
        <div class="icone">
          <q-icon
            size="60px"
            :name="icon"
          />
        </div>
      </div>
    </q-card-section>

    <q-separator />

    <q-card-section align="right">
      <div class="text-subtitle">
        {{ subtitle }}
      </div>
      <div class="f-10 text-grey">
        {{ subtitle2 }}
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
defineProps({
  color: {
    type: String,
    default: 'primary'
  },
  subtitle: {
    type: String,
    default: 'Pemeriksaan Laborat'
  },
  subtitle2: {
    type: String,
    default: 'Pemeriksaan Laborat'
  },
  nilai: {
    type: Number,
    default: 0
  },
  icon: {
    type: String,
    default: 'icon-mat-insights'
  },
  colorTxt: {
    type: String,
    default: 'white'
  },
  loading: {
    type: Boolean,
    default: false
  }
})
</script>
