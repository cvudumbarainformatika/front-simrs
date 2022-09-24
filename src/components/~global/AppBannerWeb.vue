<template>
  <div class="container-padding">
    <q-parallax
      :height="250"
      :speed="0.5"
    >
      <template #media>
        <img src="https://cdn.quasar.dev/img/parallax1.jpg">
      </template>

      <div class="absolute-bottom text-center q-ma-lg">
        <div class=" my--style text-h6 text-white">
          Berita
        </div>
      </div>
    </q-parallax>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.my--style{
  min-width: 100px;
}
</style>
