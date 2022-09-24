<template>
  <q-item
    class="o-common-item"
    :class="dense ? 'dense' : ''"
    :to="to"
    clickable
    :v-close-popup="closable"
    exact
  >
    <div v-if="avatar">
      <q-item-section avatar>
        <q-avatar
          :size="size"
          :icon="icon"
          :text-color="color"
          class="themed"
        />
      </q-item-section>
    </div>
    <div v-else>
      <q-item-section class="q-px-md q-py-sm">
        <q-item-label class="text-weight-bold">
          {{ icon }}
        </q-item-label>
      </q-item-section>
    </div>
    <q-item-section class="q-pr-md">
      <q-item-label>{{ label }}</q-item-label>
      <q-item-label
        v-if="sublabel"
        caption
      >
        {{ sublabel }}
      </q-item-label>
    </q-item-section>
    <q-item-section
      v-if="sideIcon"
      side
    >
      <q-avatar
        :size="size"
        :icon="sideIcon"
      />
    </q-item-section>
    <q-item-section
      v-if="sideLabel"
      side
    >
      <q-item-label class="q-pr-md">
        {{ sideLabel }}
      </q-item-label>
      <q-item-label
        v-if="sideSublabel"
        caption
      >
        {{ sideSublabel }}
      </q-item-label>
    </q-item-section>
    <slot />
  </q-item>
</template>

<script setup>
// import { computed } from 'vue'

defineEmits(['confirm'])

defineProps({
  avatar: {
    type: Boolean,
    default: true
  },
  closable: {
    type: Boolean,
    default: false
  },
  dense: {
    type: Boolean,
    default: false
  },
  id: {
    type: String,
    default: ''
  },
  to: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: '2.4rem'
  },
  color: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: 'apps'
  },
  label: {
    type: String,
    default: 'Label'
  },
  sublabel: {
    type: String,
    default: ''
  },
  sideIcon: {
    type: String,
    default: ''
  },
  sideLabel: {
    type: String,
    default: ''
  },
  sideSublabel: {
    type: String,
    default: ''
  },
  labelIcon: {
    type: String,
    default: ''
  }
})

</script>

<style lang="scss">
  .o-common-item {
    padding: 0;
    min-height: unset;
    .q-item__section--avatar {
      min-width: unset;
    }

    .q-item__section--side {
     font-size: 0.8rem;
     padding-right: 0;
    }
    .q-item__section--main ~ .q-item__section--side {
      padding-left: 0;
    }
  }

  .o-common-item.dense {
    min-height: unset;

    .q-avatar {
      font-size: 1.5rem !important;
    }
  }
</style>
