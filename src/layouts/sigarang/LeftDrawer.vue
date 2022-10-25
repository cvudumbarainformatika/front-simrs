<template>
  <q-drawer
    show-if-above
    :width="70"
  >
    <!-- logo -->
    <div class="absolute-top">
      <div
        class=" flex flex-center"
        style="height: 60px;"
      >
        <q-avatar size="40px">
          <img src="~assets/logos/logo-rsud.png">
        </q-avatar>
      </div>
    </div>
    <!-- <q-scroll-area
        class="fit"
        style="height:calc(100%-50px) ;padding-top:50px"
      > -->
    <div
      class="flex column flex-center full-height"
      style="height:calc(100%-60px) "
    >
      <router-link
        v-for="(menu, i) in menus"
        :key="i"
        :to="`/${menu.link}`"
        replace
        class="sidebar flex flex-center item item-link"
        :active-class="dark? 'active-dark' : 'active'"
        exact
        @click="menuClick(menu)"
      >
        <div class="item-content">
          <q-tooltip
            class="bg-primary"
            anchor="center right"
            self="center left"
            :offset="[5, 5]"
          >
            <strong class="">{{ menu.name }}</strong>
            (
            <q-icon name="icon-mat-keyboard_arrow_right" />)
          </q-tooltip>
          <q-icon
            :name="menu.icon"
            size="25px"
          />
        </div>
      </router-link>
    </div>
    <!-- </q-scroll-area> -->

    <div class="just-shadow absolute-full overflow-hidden no-pointer-events" />
  </q-drawer>
</template>

<script setup>
// import { computed } from 'vue'
// import { useRoute } from 'vue-router'
// const path = computed(() => useRoute().name)

import { routerInstance } from 'src/boot/router'

const props = defineProps({
  dark: {
    type: Boolean,
    default: false
  },
  menus: {
    type: Array,
    default: () => []
  }
})
const menuClick = val => {
  console.log('menu', val)
  // const gaPunya = val.submenus
  console.log('name', !!val.submenus)
  if (val.value === 'sigarang.transaksi') {
    const nama = val.submenus[0].value
    routerInstance.replace({ name: nama, params: { slug: '-' } })
  } else if (val.submenus) {
    console.log('masuk', val.submenus)
    const nama = val.submenus[0].value
    routerInstance.replace({ name: nama })
  } else {
    console.log('ga masuk', val.submenus)
    const nama = val.value
    routerInstance.replace({ name: nama })
  }
}

// function activated (val) {
//   if (val) {
//     if (props.dark) {
//       return 'page-dark text-white'
//     } else {
//       return 'bg-grey-4 text-primary'
//     }
//   }
//   return 'text-grey-5'
// }
// const router = useRouter()
console.log('router', props.dark)
</script>

<style lang="scss" scoped>
.sidebar {
  width: calc(100% - 10px);
  height: 60px;
}

a.sidebar {
  text-decoration: none;
  color: $grey-5;
}

a.router-link-active,
a.router-link-exact-active,
a.active {
  margin-left: 10px;
  border-radius: 10px 0px 0px 10px;
  color: $primary;
  background-color: $grey-4;
  border-left: 3px solid $primary;
}

a.router-link-active-dark,
a.router-link-exact-active-dark,
a.active-dark {
  margin-left: 10px;
  border-radius: 10px 0px 0px 10px;
  color: white;
  background-color: $dark-light;
  border-left: 3px solid white;
}

.just-shadow {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  box-shadow: 0 0 10px 2px rgb(0 0 0 / 20%), 0 0px 10px rgb(0 0 0 / 24%);
}
</style>
