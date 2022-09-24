<template>
  <q-drawer
    side="right"
    bordered
    :width="360"
  >
    <!-- drawer content -->
    <div
      class="bg-grey-4 text-grey-9 absolute-top"
      style="height:51px; z-index:10"
    >
      <div class="flex items-center q-pa-md">
        <div class="flex items-center">
          <div>
            <q-icon
              name="close"
              size="25px"
              class="cursor-pointer q-mr-md"
              @click="store.openRight"
            />
          </div>
          <div class="f-14">
            {{ title }}
          </div>
        </div>
      </div>
    </div>
    <div
      style="padding-top:51px"
      :class="dark?'full-height page-dark':'full-height bg-grey-4'"
    >
      <slot name="content" />
    </div>
  </q-drawer>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { useAppStore } from 'src/stores/app'
import { computed } from 'vue'

defineProps({
  title: {
    type: String,
    default: 'Title'
  }
})

const $q = useQuasar()
// const mobile = $q.screen.lt.md
// console.log(mobile)
const dark = computed(() => {
  return $q.dark.isActive
})

const store = useAppStore()
</script>
