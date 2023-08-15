<template>
  <q-drawer
    show-if-above
    side="left"
    :mini="miniState"
    bordered
    @mouseover="miniState = false"
    @mouseout="miniState = true"
  >
    <!-- drawer header -->
    <div
      class="absolute-top bg-grey-5"
      style="height: 51px;"
    >
      <div
        class="flex items-center justify-between"
      >
        <div
          class="flex column flex-center items-center"
          style="width:51px; height:51px;"
        >
          <q-avatar
            size="35px"
            class="cursor-pointer bg-white"
          >
            <img src="~assets/images/actor.svg">
          </q-avatar>
        </div>
        <!-- <div v-if="!miniState">
          <q-toggle
            v-model="toggle"
            size="xs"
            color="primary"
            @update:model-value="setDark"
          />
          <q-btn
            flat
            round
            color="light"
            icon="icon-eva-bell-outline"
          />
        </div> -->
      </div>
    </div>
    <!-- drawer bottom -->
    <div
      class="absolute-bottom bg-grey-5"
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
      style="height:calc(100%-51px) ;margin-top:51px"
    />
    <q-card flat>
      <q-list
        padding
        class="text-grey-9"
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

          <q-item-section>{{ menu.label }}</q-item-section>
        </q-item>
      </q-list>
    </q-card>
  </q-drawer>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { useAuthStore } from 'src/stores/auth'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const miniState = ref(true)
const menus = ref([
  { route: 'admin.dashboard', path: '/admin/dashboard', label: 'Dashboard', icon: 'icon-mat-dashboard' },
  { route: 'admin.laborat', path: '/admin/laborat', label: 'Laboratorium', icon: 'icon-mat-dvr' }
])
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

const auth = useAuthStore()
onMounted(() => {
  auth.getUser()
})

const route = useRoute()
// console.log('leftDrawer', route.path.indexOf('/admin/berita') > -1)
</script>

<style lang="scss" scoped>
.my-menu-link{
  color: white;
  background: $primary;
}

</style>
