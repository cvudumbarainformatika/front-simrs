<template>
  <q-tooltip
    class="tooltip"
    :class="`tooltip-arrow-${arrowClass}`"
  >
    <div class="tooltip-text bg-grey-10 relative-position">
      <slot />
    </div>
    <div class="tooltip-arrow bg-grey-10 absolute" />
  </q-tooltip>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
  arrow: {
    type: String,
    default: 'top'
  }
})

const arrowClass = computed(() => {
  const cor = props.arrow?.replace(' ', '-')
  const allowed = ['top', 'top-left', 'top-right', 'bottom', 'bottom-left', 'bottom-right', 'left', 'left-top', 'left-bottom', 'right', 'right-top', 'right-bottom']
  if (!allowed.includes(cor)) {
    console.error('Arrow class not allowed')
    return 'top'
  }
  return cor
})
</script>

<style lang="scss">
$box-shadow: 0 0 20px 0 rgba(0,0,0,0.5);
.tooltip {

  overflow: visible;
  background: transparent;
  padding: 0;
  box-shadow: $box-shadow;
  border-radius: 10px;

  &-text{
    border-radius: 10px;
    padding: 20px;
    z-index: 10;
  }

  &-arrow {
    z-index: 5;
    box-shadow: $box-shadow;
    width: 20px;
    height: 20px;

    transform: translateX(-50%) rotate(-45deg) skew(-20deg, -20deg);

    // top-arrows
    [class*="tooltip-arrow-top"] & {
      top:0;
    }

    .tooltip-arrow-top & {
      left: 50%;
    }
    .tooltip-arrow-top-left & {
      left: 20px;
    }
    .tooltip-arrow-top-right & {
      right: 0;
    }

    // bottom-arrows
    [class*="tooltip-arrow-bottom"] & {
      bottom:0;
    }

    .tooltip-arrow-bottom & {
      left: 50%;
    }
    .tooltip-arrow-bottom-left & {
      left: 20px;
    }
    .tooltip-arrow-bottom-right & {
      right: 0;
    }

    // -left
    [class*="tooltip-arrow-left"] & {
      transform: translateY(-50%) rotate(45deg) skew(-20deg, -20deg);
      left: 0;
    }

    .tooltip-arrow-left & {
      top: 50%;
    }
    .tooltip-arrow-left-top & {
      top: 12px;
    }
    .tooltip-arrow-left-bottom & {
      bottom: -9px;
    }
    // -right
    [class*="tooltip-arrow-right"] & {
      transform: translateY(-50%) rotate(45deg) skew(-20deg, -20deg);
      right: 0;
    }

    .tooltip-arrow-right & {
      top: 50%;
    }
    .tooltip-arrow-right-top & {
      top: 12px;
    }
    .tooltip-arrow-right-bottom & {
      bottom: -9px;
    }
  }
}
</style>
