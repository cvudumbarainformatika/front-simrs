<template>
  <q-page class="q-pa-lg">
    <div class="title-page q-mb-md">
      <div class="text-h6">
        Setting Beranda Website
      </div>
      <div class="f-14">
        Setting Tema warna, Header, Slide Images, Banner, dll
      </div>
    </div>
    <!-- setting Tema  -->
    <app-card
      title="Setting Themes"
      desc="setting tema warna website"
      class="q-mb-md"
    >
      <template #content>
        <setting-theme />
      </template>
    </app-card>
    <!-- setting header -->
    <app-card
      title="Setting Header"
      desc="edit logo, title header, deskripsi header dll"
    >
      <template #content>
        <!-- header -->
        <div class="">
          <div
            class="cursor-pointer"
            @click="editContent('Header & Footer')"
          >
            <HeaderWeb :fixed="false" />
            <app-footer class="q-mt-sm" />
          </div>
        </div>
      </template>
    </app-card>
    <!-- Setting slides -->
    <app-card
      title="Setting Slide"
      desc="add / edit slide images di halaman beranda"
      class="q-mt-md"
    >
      <template #content>
        <div class="row q-col-gutter-lg">
          <div class="col-md-9 col-xs-12">
            <div
              class="cursor-pointer"
              @click="editContent('Slide')"
            >
              <CarouselWeb
                :height="300"
              />
            </div>
          </div>
          <div class="col-md-3 col-xs-12  ">
            <div class="q-pa-md bg-secondary text-white rounded-borders">
              Slide yang ditampilkan maximal <strong>8 Gambar</strong> terbaru,
              <i>untuk menambah, ubah dan hapus gambar</i> ..klik pada gambar disamping
            </div>
          </div>
        </div>
      </template>
    </app-card>
    <!-- Setting section one -->
    <app-card
      title="Setting Visi Misi"
      desc="edit visi misi lembaga"
      class="q-mt-md"
    >
      <template #content>
        <section-one admin />
      </template>
    </app-card>
    <!-- Setting section two -->
    <app-card
      title="Setting Info"
      desc="edit info pelayanan, moto lembaga dll"
      class="q-mt-md"
    >
      <template #content>
        <section-two admin />
      </template>
    </app-card>
    <!-- Setting section three -->
    <app-card
      title="Setting Direksi"
      desc="tambah / edit data direksi utama yang ingin ditampilkan"
      class="q-mt-md"
    >
      <template #content>
        <div
          class="cursor-pointer"
          @click="editContent('Direksi')"
        >
          <section-three admin />
        </div>
      </template>
    </app-card>
    <!-- Setting Footer -->
    <app-card
      title="Setting Banner"
      desc="edit gambar Banner"
      class="q-mt-md"
    >
      <template #content>
        <div>
          BANNER
        </div>
      </template>
    </app-card>

    <!-- DRAWER RIGHT -->
    <app-drawer-right
      v-model="app.rightDrawerOpen"
      :title="`Setting ${edit}`"
    >
      <template #content>
        <div v-if="edit === 'Header & Footer'">
          <setting-header />
        </div>
        <div v-if="edit === 'Slide'">
          <setting-slide />
        </div>
        <div v-if="edit === 'Direksi'">
          <setting-staf />
        </div>
      </template>
    </app-drawer-right>
  </q-page>
</template>

<script setup>
/*
====================================================================IMPORT CONTENT
*/
import HeaderWeb from 'src/components/~web/HeaderWeb.vue'
import CarouselWeb from 'src/components/~web/CarouselWeb.vue'
import SectionOne from 'src/components/~web/SectionOne.vue'
import SectionTwo from 'src/components/~web/SectionTwo.vue'
import SectionThree from 'src/components/~web/SectionThree.vue'
import SettingTheme from './SettingTheme.vue'
/*
====================================================================IMPORT EDIT
*/
import SettingHeader from './SettingHeader.vue'
import SettingSlide from './SettingSlide.vue'
import SettingStaf from './SettingStaf.vue'
/*
====================================================================SCRIPt
*/
import { useAppStore } from 'src/stores/app'
import { ref } from 'vue'
// import { useCarouselApp } from 'src/stores/app/carousel'

const app = useAppStore()
// const carousel = useCarouselApp()
const edit = ref('')

function editContent(val) {
  app.openRight()
  edit.value = val
}

</script>

<style lang="scss" scoped>

</style>
