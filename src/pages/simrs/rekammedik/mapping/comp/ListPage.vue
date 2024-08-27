<template>
  <q-list bordered separator class="rounded-borders bg-white">
    <q-item clickable v-ripple>
      <q-item-section>Single line item</q-item-section>
    </q-item>

    <q-item clickable v-ripple>
      <q-item-section>
        <q-item-label>Item with caption</q-item-label>
        <q-item-label caption>
          Caption
        </q-item-label>
      </q-item-section>
    </q-item>

    <q-item clickable v-ripple>
      <q-item-section>
        <q-item-label overline>
          OVERLINE
        </q-item-label>
        <q-item-label>Item with overline</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script setup></script>
