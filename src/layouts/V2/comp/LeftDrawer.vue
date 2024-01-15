<template>
  <q-drawer
    show-if-above
    side="left"
    :mini="miniState"
    mini-to-overlay
    :behavior="tampil?'desktop':'mobile'"
    bordered
    @mouseover="miniState = false"
    @mouseout="miniState = true"
  >
    <!-- drawer content -->
    <q-scroll-area
      class="fit"
      style="height:calc(100%-60px);"
      :thumb-style="thumbStyle"
      :bar-style="barStyle"
    >
      <q-list
        :class="dark?'bg-dark q-mb-xl':'bg-white text-dark q-mb-xl'"
      >
        <!-- INI JIKA TIDAK PUNYA SUBMENU -->
        <template
          v-for="(menu, i) in filtermenus"
          :key="i"
        >
          <q-item
            v-if="menu.submenus.length === 0"
            v-ripple
            clickable
            :active-class="route.path.indexOf(aturLink(menu.link)) > -1?'bg-primary text-white':''"
            :to="`${aturLink(menu.link)}`"
          >
            <!-- :active="link === 'inbox'" -->
            <q-item-section avatar>
              <!-- <q-icon :name="menu.icon" /> -->
              <q-avatar
                size="32px"
                :icon="menu.icon"
                color="white"
                text-color="dark"
                font-size="20px"
              />
            </q-item-section>

            <q-item-section>
              {{ menu.nama }}
            </q-item-section>
          </q-item>
          <q-expansion-item
            v-else
            no-padding
            style="padding-left: -72px;"
            :header-class="route.matched[1].path === aturLink(menu.link)?'bg-primary text-white':''"
            :value="route.matched[1].path === aturLink(menu.link)"
            :expand-icon-class="route.matched[1].path === aturLink(menu.link)?'text-white':''"
            :default-opened="route.matched[1].path === aturLink(menu.link)"
          >
            <template #header>
              <q-item-section avatar>
                <q-avatar
                  size="32px"
                  :icon="menu.icon"
                  color="white"
                  text-color="dark"
                  font-size="20px"
                />
              </q-item-section>

              <q-item-section>
                {{ menu.nama }}
              </q-item-section>
            </template>

            <q-list
              separator
              :class="dark?'bg-dark':'bg-grey-3 text-dark'"
            >
              <template
                v-for="(sub, x) in menu.submenus"
                :key="x"
              >
                <q-item
                  v-if="foundAkses(sub)"
                  v-ripple
                  clickable
                  :active-class="route.path.indexOf(aturLink(sub.link)) > -1?'bg-dark text-white':null"
                  :to="`${aturLink(sub.link)}`"
                  class="q-pl-xl"
                >
                  <!-- :active="link === 'inbox'" -->
                  <q-item-section avatar>
                    <q-icon
                      :name="route.path.indexOf(aturLink(sub.link)) > -1?'icon-mat-check_circle':'icon-mat-lens'"
                      size="xs"
                    />
                  </q-item-section>

                  <q-item-section>
                    {{ sub.nama }}
                  </q-item-section>
                </q-item>
              </template>
            </q-list>
          </q-expansion-item>
          <!-- {{ route.matched }} -->
        </template>
      </q-list>
    </q-scroll-area>

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
  </q-drawer>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { useAplikasiStore } from 'src/stores/app/aplikasi'
import { useAuthStore } from 'src/stores/auth'
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

defineProps({
  tampil: { type: Boolean, default: true }
})

const miniState = ref(true)
const route = useRoute()
const router = useRouter()
const auth = useAuthStore()
const apps = useAplikasiStore()

const thumbStyle = ref({
  right: '0px',
  borderRadius: '5px',
  backgroundColor: '#027be3',
  width: '2px',
  opacity: 0.75
})
const barStyle = ref({
  right: '0px',
  borderRadius: '9px',
  backgroundColor: '#027be3',
  width: '5px',
  opacity: 0.2
})

const filtermenus = computed(() => {
  const menus = apps.currentApp ? apps.currentApp.menus : []
  const akses = apps.aksesApps
  if (akses === 'all') {
    return menus
  }
  const curr = akses.filter(x => x.aplikasi_id === apps.currentApp.id)

  const filt = curr.reduce(function(r, e) {
    r[e.menu_id] = (r[e.menu_id] || 0) + e.menu_id
    return r
  }, {})
  const group = Object.keys(filt)
  const grouped = group.map(x => parseInt(x)) // kumpulan menu_id
  const r = menus.filter((a) => grouped.some(x => x === a.id))
  return r
})

const middleWare = computed(() => {
  const aksesmenus = filtermenus.value.map(x => x.link)
  return aksesmenus.includes(route.path) || aksesmenus.includes(route.path.substring(1))
})
const $q = useQuasar()
// const mobile = $q.screen.lt.md

const dark = computed(() => {
  return $q.dark.isActive
})
// const toggle = ref(false)
// console.log(dark)
// function setDark(val) {
//   $q.dark.set(val)
// }

onMounted(() => {
  // auth.getUserNew()
  // // console.log('left drawer route', route.matched[2].path)
  // // console.log('left drawer filtermenus', filtermenus.value)
  // // console.log('middleware', middleWare.value)
  if (!middleWare.value) {
    const newroute = route.matched[0].path + '/notfound'
    router.replace({ path: newroute })
  }
})

function aturLink(val) {
  const firstTxt = val.charAt(0)
  if (firstTxt !== '/') {
    return `/${val}`
  }
  return val
}

function foundAkses(val) {
  const akses = apps.aksesApps
  if (akses === 'all') {
    return true
  }
  const curr = akses.filter(x => x.aplikasi_id === apps.currentApp.id && x.menu_id === val.menu_id)
  const filt = curr.reduce(function(r, e) {
    r[e.submenu_id] = (r[e.submenu_id] || 0) + e.submenu_id
    return r
  }, {})
  const group = Object.keys(filt)
  const grouped = group.map(x => parseInt(x)) // kumpulan menu_id
  return grouped.includes(val.id)
}
</script>

<style lang="scss" scoped>
.my-menu-link{
  color: white;
  background: $primary;
}

</style>
