<template>
  <transition
    appear
    @enter="enter"
    @leave="leave"
  >
    <div
      v-if="seamless"
      class="absolute-top-right full-height"
      style="width:40vw; border-left: 2px solid rgb(172, 171, 171);"
    >
      <q-card
        class="full-width full-height relative-position"
        square
      >
        <div
          class="absolute-left column flex-center "
          style="left: -40px; "
        >
          <div
            class="bg-dark column items-center"
            style="width: 40px;
              border-top-left-radius: 8px;
              border-bottom-left-radius: 8px;
              z-index: 0;
              overflow: hidden;
            "
          >
            <q-btn
              icon="icon-mat-close"
              size="sm"
              color="negative"
              class="q-py-md"
              @click="emits('clickBtn')"
            />
          </div>
        </div>

        <slot name="content" />
      </q-card>
    </div>
  </transition>
</template>

<script setup>
// eslint-disable-next-line no-unused-vars
import { ref } from 'vue'
import { useSlideFromRight } from 'src/composable/gsap/slidefromright'
import { useAnamnesis } from 'src/stores/simrs/pelayanan/poli/anamnesis'
// eslint-disable-next-line no-unused-vars
import { humanDate } from 'src/modules/formatter'
const { enter, leave } = useSlideFromRight()

const store = useAnamnesis()
defineProps({
  seamless: {
    type: Boolean,
    default: false
  }
})

// eslint-disable-next-line no-unused-vars
const emits = defineEmits(['clickBtn'])

// eslint-disable-next-line no-unused-vars
function pilihData(row) {
  // console.log(row)
  store.pilihHistory(row)
}

</script>
