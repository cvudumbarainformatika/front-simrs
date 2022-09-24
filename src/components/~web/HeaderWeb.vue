<template>
  <div
    class="bg-transparent text-white"
    :class="fixed?'fixed-top':'relative'"
    style="z-index:10"
  >
    <!-- <transition
      appear
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    > -->
    <div
      v-if="!store.visible"
      class="header-one transparent"
    >
      <q-bar class="container-padding bg-primary text-white">
        <q-icon
          name="call"
          size="14px"
        />
        <div class="f-12">
          {{ store.header.phone }}
        </div>

        <q-space />

        <q-btn
          class="q-mr-sm"
          dense
          flat
          icon="ti-facebook"
          size="xs"
          :href="store.header.link_fb"
          target="_blank"
        />
        <q-btn
          class="q-mr-sm"
          dense
          flat
          icon="ti-instagram"
          size="xs"
          :href="store.header.link_instagram"
          target="_blank"
        />
        <q-btn
          class="q-mr-sm"
          dense
          flat
          icon="ti-youtube"
          size="xs"
          :href="store.header.link_youtube"
          target="_blank"
        />
      </q-bar>
    </div>
    <!-- </transition> -->
    <div :class="store.visible?'bg-primary':'transparent'">
      <q-bar
        class="container-padding"
        style="height:60px"
      >
        <div class="logo-web text-center q-pa-xs bg-primary">
          <q-skeleton
            v-if="store.loading"
            type="QAvatar"
            style="height: 45px; margin-top:5px;"
          />
          <q-img
            :src="logo"
            :ratio="1"
            fit="cover"
          />
        </div>
        <div class="title-website q-ml-sm">
          <div class="f-18">
            {{ store.header.title }}
          </div>
          <div class="f-10">
            {{ store.header.desc }}
          </div>
        </div>
        <q-space />

        <div
          v-if="fixed"
          class="menu__header deskt-only flex"
        >
          <router-link
            v-for="(menu, i) in menus"
            :key="i"
            :to="`/${menu.name}`"
            class="menu__item"
          >
            {{ menu.title }}
          </router-link>
        </div>
      </q-bar>
    </div>
  </div>
</template>
<script setup>
import { pathImg } from 'src/boot/axios'
import { useAppStore } from 'src/stores/app'
import { computed, ref } from 'vue'

defineProps({
  fixed: {
    type: Boolean,
    default: true
  }
})

const store = useAppStore()
store.getAppHeader()

const logo = computed(() => {
  if (store.logo === null) {
    return new URL('../../assets/logos/logo.png', import.meta.url).href
  }

  return pathImg + store.logo
})

const menus = ref([
  { name: 'beranda', url: '/', title: 'Beranda', active: false },
  { name: 'berita', url: '/berita', title: 'Berita', active: false },
  { name: 'pelayanan', url: '/pelayanan', title: 'Pelayanan', active: false },
  { name: 'galeri', url: '/galeri', title: 'Galeri', active: false },
  { name: 'profil', url: '/profil', title: 'Profil', active: false }
])

</script>

<style lang="scss" scoped>
.logo-web {
    width:60px;
    height:60px;
    overflow: hidden;
}

a.menu__item {
  position: relative;
  margin-right: 3px;
  font-size: 12px;
  padding: 5px 10px;
  color:#fff;
  text-decoration: none;

  &::before {
    content: "";
    position: absolute;
    border-radius: 10px;
    background-color: $secondary;
    top: 25px;
    /* bottom: -3px; */
    left: 10px;
    width: 0px;
    height: 2px;
    opacity: 0;
    transition: all 0.3s ease;
  }
  &:hover {
      &::before {
        width: 20px;
        opacity: 1
      }
    }
}
a.router-link-active {
  background-color: $secondary;
  border-radius: 5px;
  transition: all 0.3s ease;
}
</style>
