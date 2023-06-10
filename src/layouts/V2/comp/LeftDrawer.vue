<template>
  <q-drawer
    show-if-above
    side="left"
    :mini="miniState"
    mini-to-overlay
    behavior="desktop"
    bordered
    @mouseover="miniState = false"
    @mouseout="miniState = true"
  >
    <div
      class="absolute-bottom bg-grey-4"
    >
      <div
        class=" row items-center justify-between q-pa-sm"
      >
        <q-avatar
          size="35px"
          class="cursor-pointer"
          color="negative"
          text-color="white"
          icon="icon-mat-logout"
          @click="auth.logout"
        /> <span v-if="!miniState">Logout</span>
      </div>
    </div>
    <!-- drawer content -->
    <q-scroll-area
      style="height:calc(100%-60px)"
    />
    <q-list
      class="bg-white text-dark full-height"
    >
      <q-item
        v-for="(menu, i) in menus"
        :key="i"
        v-ripple
        clickable
        :active-class="route.path.indexOf(menu.path) > -1?'bg-primary text-white':''"
        :to="{ name: menu.route }"
      >
        <!-- :active="link === 'inbox'" -->
        <q-item-section avatar>
          <q-icon :name="menu.icon" />
        </q-item-section>

        <q-item-section>
          {{ menu.label }}
        </q-item-section>
      </q-item>
    </q-list>
  </q-drawer>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { useAplikasiStore } from 'src/stores/app/aplikasi'
import { useAuthStore } from 'src/stores/auth'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const miniState = ref(true)
// const menus = ref([
//   { route: 'lab.dashboard', path: '/admin/laborat/dashboard', label: 'Dashboard', icon: 'icon-mat-dashboard' },
//   { route: 'lab.laborat', path: '/admin/laborat/table', label: 'Laboratorium', icon: 'icon-mat-dvr' },
//   { route: 'lab.permintaan-luar', path: '/admin/laborat/permintaan-luar', label: 'Permintaan Luar', icon: 'icon-mat-transfer_within_a_station' }
// ])

const menus = computed(() => {
  return apps.currentApp.menus
})
const $q = useQuasar()
// const mobile = $q.screen.lt.md

const dark = computed(() => {
  return $q.dark.isActive
})
// const toggle = ref(false)
console.log(dark)
// function setDark(val) {
//   $q.dark.set(val)
// }

const route = useRoute()
const auth = useAuthStore()
const apps = useAplikasiStore()
onMounted(() => {
  auth.getUser()
  console.log('left drawer', route)
  console.log('left drawer apps', apps.currentApp)
})
// console.log('leftDrawer', route.path.indexOf('/admin/berita') > -1)
</script>

<style lang="scss" scoped>
.my-menu-link{
  color: white;
  background: $primary;
}

</style>
