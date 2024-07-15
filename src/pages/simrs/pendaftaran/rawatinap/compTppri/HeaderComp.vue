<template>
  <div class="flex items-center justify-between">
    <div class="kiri flex items-center">
      <q-icon
        :name="tab?.icon"
        size="md"
        :color="tab?.color"
      />
      <div class="q-ml-sm">
        <div class="f-18">
          <b class="text-grey-8">{{ tab?.title }}</b>
        </div>
        <div class="f-10">
          {{ tab?.subtitle }}
        </div>
      </div>
    </div>

    <div class="kanan flex items-center q-gutter-sm">
      <q-btn
        v-for="(menu, i) in menus" :key="i"
        outline
        color="grey-8"
        :class="`${tab === menu ? 'bg-white': 'bg-grey-4'}`"
        padding="sm"
        size="sm"
        no-caps
        @click="emits('goTo', menu)"
      >
        <q-icon :name="menu?.icon" :color="`${tab === menu ? menu?.color : 'grey-8'}`" />
        <q-tooltip>{{ menu?.title }}</q-tooltip>
      </q-btn>
    </div>
  </div>
</template>

<script setup>

defineProps({
  menus: {
    type: Array,
    default: () => []
  },
  tab: {
    type: Object,
    default: null
  }
})

const emits = defineEmits(['goTo'])
</script>
