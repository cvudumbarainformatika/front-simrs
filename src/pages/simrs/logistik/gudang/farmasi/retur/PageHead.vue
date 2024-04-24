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
          :outline="path !== 'bast'"
          glossy
          push
          color="deep-orange"
          label="RETUR"
          size="md"
          @click="emits('ganti','bast')"
        />
        <q-btn
          :outline="path !== 'list'"
          glossy
          push
          color="green"
          label="LIST RETUR"
          size="md"
          @click="emits('ganti','list')"
        />
      </q-btn-group>
    </div>
  </div>
</template>

<script setup>

// const emits = defineEmits(['togleDraw'])
defineProps({
  title: {
    type: String,
    default: null
  },
  subtitle: {
    type: String,
    default: null
  },
  path: {
    type: String,
    default: null
  }
})
const emits = defineEmits(['ganti'])

</script>
