<template>
  <q-list
    separator
    no-padding
  >
    <q-item
      v-for="item in 10"
      :key="item"
      v-ripple
      clickable
    >
      <q-item-section avatar>
        <q-skeleton
          type="circle"
          size="30px"
        />
      </q-item-section>

      <q-item-section>
        <q-skeleton
          width="150px"
          class="q-mb-sm"
        />
        <q-skeleton width="150px" />
      </q-item-section>

      <q-item-section side>
        <q-skeleton
          type="circle"
          size="30px"
        />
      </q-item-section>
    </q-item>
  </q-list>
</template>
