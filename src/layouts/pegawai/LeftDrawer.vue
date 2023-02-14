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
      v-if="menus.length"
      class="flex column flex-center full-height"
      style="height:calc(100%-60px) "
    >
      <div
        v-for="(menu, i) in menus"
        :key="i"
        @mouseenter="hover(menu,i)"
      >
        <!-- @mouseleave="leave(menu,i)" -->
        <!-- :to="`/${menu.link}`" -->
        <q-item
          ref="refItem"
          replace
          class="sidebar flex flex-center item item-link"
          :active-class="dark? 'active-dark' : 'active'"
          exact
          :active="aktif(path)===menu.name"
          @click="menuClick(menu)"
        >
          <q-menu
            ref="refMenu"
            anchor="top right"
            self="top left"
            transition-show="slide-down"
            transition-hide="slide-right"
            :offset="[0,0]"
          >
            <q-card style="width:150px;">
              <q-card-section>
                <div class="text-weight-bold f-12">
                  {{ menu.nama }}
                </div>
                <q-separator class="q-my-sm" />

                <div
                  v-for="(submenu,n) in menu.submenus"
                  :key="n"
                >
                  <div v-if="submenu.link">
                    <q-item
                      ref="refSubItem"
                      :to="`/${submenu.link}`"
                      replace
                      class="submenu flex flex-center item item-link"
                      :active-class="dark? 'active-dark' : 'active'"
                      :active="path===submenu.name"
                      exact
                    >
                      <!-- {{ aktif(menu.name) }} : {{ path }} -->
                      <q-item-section>{{ submenu.nama }}</q-item-section>
                    </q-item>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </q-menu>
          <div class="item-content">
            <q-tooltip
              v-if="!menu.submenus.length"
              class="bg-primary"
              anchor="center right"
              self="center left"
              :offset="[5, 5]"
            >
              <strong class="">{{ menu.nama }}</strong>
              (
              <q-icon name="icon-mat-keyboard_arrow_right" />)
            </q-tooltip>
            <q-icon
              :name="menu.icon"
              size="25px"
            />
          </div>
        </q-item>
      </div>
    </div>
    <!-- Skleleton -->
    <div
      v-if="!menus.length"
      class="flex column flex-center full-height"
      style="height:calc(100%-60px) "
    >
      <div class="sidebar flex flex-center item item-link">
        <q-skeleton
          animation="pulse"
          width="25px"
          height="25px"
        />
      </div>
      <div class="sidebar flex flex-center item item-link">
        <q-skeleton
          animation="pulse"
          width="25px"
          height="25px"
        />
      </div>
      <div class="sidebar flex flex-center item item-link">
        <q-skeleton
          animation="pulse"
          width="25px"
          height="25px"
        />
      </div>
      <div class="sidebar flex flex-center item item-link">
        <q-skeleton
          animation="pulse"
          width="25px"
          height="25px"
        />
      </div>
      <!-- <div class="sidebar flex flex-center item item-link">
        <q-skeleton
          animation="pulse"
          width="25px"
          height="25px"
        />
      </div>
      <div class="sidebar flex flex-center item item-link">
        <q-skeleton
          animation="pulse"
          width="25px"
          height="25px"
        />
      </div>
      <div class="sidebar flex flex-center item item-link">
        <q-skeleton
          animation="pulse"
          width="25px"
          height="25px"
        />
      </div> -->
    </div>
    <!-- </q-scroll-area> -->

    <div class="just-shadow absolute-full overflow-hidden no-pointer-events" />
  </q-drawer>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'

import { routerInstance } from 'src/boot/router'
const path = computed(() => useRoute().name)

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
// const aktif = computed((apem) => {
//   const temp = apem.split('.')
//   return temp[0] + '.' + temp[1]
// })
const aktif = (apem) => {
  const temp = apem.split('.')
  return temp[0] + '.' + temp[1]
}
const refItem = ref(null)
const refMenu = ref(null)
const prev = ref(0)
const hover = (menu, i) => {
  if (menu.submenus.length) {
    refMenu.value[i].show()
    if (!refItem.value[i].active) {
      refMenu.value[i].offset[0] = 16
      refMenu.value[i].offset[1] = 0
    } else {
      refMenu.value[i].offset[0] = 0
      refMenu.value[i].offset[1] = 0
    }
  }
  // console.log('prev', prev.value)
  if (i !== prev.value) {
    leave(prev.value)
  }
  // console.log('prev', prev.value, 'i', i)
  prev.value = i

  // console.log('ref item', refItem.value)
  // console.log('ref menu', refMenu.value[i])
}
const leave = (i) => {
  refMenu.value[i].hide()
  // if (menu.submenus.length) {
  // }
  // console.log('leave', i)
  // console.log('ref item ', [i], refItem.value[i].active)
  // console.log('ref menu', refMenu.value[i])
}
const menuClick = val => {
  // const gaPunya = val.submenus
  // console.log('name', !!val.submenus)
  if (val.name === 'sigarang.transaksi') {
    const nama = val.submenus[0].name
    routerInstance.replace({ name: nama, params: { slug: '-' } })
  } else if (val.submenus.length) {
    // console.log('masuk', val.submenus)
    const nama = val.submenus[0].name
    routerInstance.replace({ name: nama })
  } else {
    console.log('ga masuk', val.submenus)
    const nama = val.name
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
  color: $grey-5;
}
.submenu {
  width: calc(100% - 10px);
  height: 30px;
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
.active {
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
.active-dark {
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
