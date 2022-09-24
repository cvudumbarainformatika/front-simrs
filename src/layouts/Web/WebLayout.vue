<template>
  <q-layout view="lHh Lpr lFf">
    <header-web />
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import HeaderWeb from 'src/components/~web/HeaderWeb.vue'
</script>
