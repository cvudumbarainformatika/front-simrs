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
        <template
          v-for="(menu, i) in menus"
          :key="i"
        >
          <q-item
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

            <!-- submenu -->
          </q-item>
          <q-list
            v-if="menu.submenu.length"
            class="text-grey-9 q-pt-none q-pl-lg"
          >
            <q-item
              v-for="(sub, x) in menu.submenu"
              :key="x"
              v-ripple
              clickable
              :active-class="route.path.indexOf(sub.path) > -1?'bg-primary text-white':''"
              :to="{ name: sub.route }"
            >
              <q-item-section avatar>
                <q-icon :name="sub.icon" />
              </q-item-section>

              <q-item-section>{{ sub.label }}</q-item-section>
            </q-item>
          </q-list>
        </template>
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
  { route: 'antrian.dashboard', path: '/admin/antrian/dashboard', label: 'Dashboard', icon: 'icon-mat-dashboard', submenu: [] },
  {
    route: 'antrian.master',
    path: '',
    label: 'Master',
    icon: 'icon-mat-dvr',
    submenu: [
      { route: 'antrian.master.poli', path: '/admin/antrian/master/poli', label: 'Master Poli', icon: 'icon-mat-dvr' }
    ]
  }
  // { route: 'lab.permintaan-luar', path: '/admin/laborat/permintaan-luar', label: 'Permintaan Luar', icon: 'icon-mat-transfer_within_a_station' }
])
const $q = useQuasar()

const dark = computed(() => {
  return $q.dark.isActive
})
console.log(dark)

const auth = useAuthStore()
onMounted(() => {
  auth.getUser()
})

const route = useRoute()
console.log('mini', miniState.value)
</script>

<style lang="scss" scoped>
.my-menu-link{
  color: white;
  background: $primary;
}

</style>
