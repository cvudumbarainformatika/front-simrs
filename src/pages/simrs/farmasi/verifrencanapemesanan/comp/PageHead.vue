<template>
  <div class="row items-center justify-between title-page q-mb-md">
    <div class="flex items-center">
      <div class="icon q-mr-md">
        <q-icon
          name="icon-mat-verified_user"
          size="lg"
        />
      </div>
      <div class="left">
        <div class="text-h6">
          {{ title }}
        </div>
        <div class="f-12">
          <span>{{ subtitle }}</span>
        </div>
      </div>
    </div>

    <div class="row items-center bg-grey-3">
      <q-btn-group outline>
        <q-btn
          v-for="(item,i) in heads"
          :key="i"
          :outline="head !== item.page"
          glossy
          push
          :color="item?.color??'primary'"
          :label="item.label"
          size="md"
          @click="emits('ganti',item.page)"
        />
      </q-btn-group>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: null
  },
  subtitle: {
    type: String,
    default: null
  },
  head: {
    type: String,
    default: null
  },
  heads: {
    type: Array,
    default: () => []
  }
})
const emits = defineEmits(['ganti'])

</script>
