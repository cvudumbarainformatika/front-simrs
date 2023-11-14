<template>
  <q-page
    ref="main"
    class=""
  >
    <div
      :class="store.pegawai !== null?'padding-right q-pt-md':'padding-xxxl q-pt-md'"
    >
      <q-card
        class="card-my shadow-22"
        :style="`height:${h}px`"
      >
        <div
          style="height:70px"
          class="q-px-lg q-py-md row justify-between"
        >
          <div @click="()=>router.push({path:'/admin/sso', replace:true})">
            <q-avatar
              size="35px"
              class="cursor-pointer bg-white"
            >
              <img src="~assets/logos/logo-rsud.png">
            </q-avatar>
          </div>
          <app-input
            class="col-10"
            dense
            valid
            label="search"
          />
        </div>
        <q-scroll-area :style="`height:${hScroll}px`">
          <list-items
            :items="store.items"
            :loading="store.loading"
            :edited="edited"
            @add="newData()"
            @save-new="(val)=> saveNew(val)"
            @save-new-menu="(val)=> saveNewMenu(val)"
            @save-edit-menu="(val)=> saveEditMenu(val)"
            @save-new-sub-menu="(val)=> saveNewSubMenu(val)"
            @save-edit-sub-menu="(val)=> saveEditSubMenu(val)"
            @edit-app="(val)=> editApp(val)"
            @icon-app-change="(val)=>iconAppClick(val)"
            @icon-menu-change="(val)=>iconMenuClick(val)"
            @delete-new="(val)=>store.deleteNew(val)"
            @delete-new-menu="(val)=>store.deleteNewMenu(val)"
            @delete-new-sub-menu="(val)=>store.deleteNewSubMenu(val)"
            @add-menu="(val)=>store.addMenu(val)"
            @add-sub-menu="(val)=>store.addSubMenu(val)"
          />
        </q-scroll-area>
        <div
          ref="bot"
          style="height:72px"
          class="absolute-bottom bg-primary text-white q-px-lg q-py-md"
        >
          <div class="row">
            <q-avatar
              size="40px"
              font-size="20px"
              color="dark"
              text-color="white"
              icon="icon-mat-person"
              @click="modalSearch = true"
            />
            <q-space />
            <q-btn
              flat
              padding="sm"
              icon="icon-mat-settings"
            >
              <q-menu>
                <q-list style="min-width: 100px">
                  <q-item
                    v-close-popup
                    clickable
                    @click="modalSearch = true"
                  >
                    <q-item-section>Hak Akses User</q-item-section>
                  </q-item>
                  <q-item
                    v-close-popup
                    clickable
                  >
                    <q-item-section>New incognito tab</q-item-section>
                  </q-item>
                  <q-separator />
                  <q-item
                    v-close-popup
                    clickable
                  >
                    <q-item-section>Settings</q-item-section>
                  </q-item>
                  <q-separator />
                  <q-item
                    v-close-popup
                    clickable
                  >
                    <q-item-section>Help &amp; Feedback</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </div>
        </div>
      </q-card>
    </div>

    <!-- <div
      v-if="store.pegawai !== null"
      class="absolute-left q-pa-md"
      style="width:20%"
    > -->
    <div
      v-if="store.pegawai !== null"
      class="absolute-left q-pa-md"
      style="width:39%"
    >
      <card-pegawai
        :item="store.pegawai"
        :menus="menus"
        :loading="store.loading"
        @simpan="onSimpanUserMenu"
        @all-check="allCheck"
        @app-check="appCheck"
        @menu-check="menuCheck"
        @submenu-check="submenuCheck"
      />
    </div>

    <!-- modal -->
    <app-get-icon
      v-model="modalIcon"
      @copy-text="(val)=>changeIconApp(val)"
    />
    <app-get-icon
      v-model="modalMenuIcon"
      @copy-text="(val)=>changeIconMenu(val)"
    />
    <DialogSearchUser
      v-model="modalSearch"
      @updated="(val)=>setPegawai(val)"
    />
  </q-page>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import ListItems from './aplikasi/ListItems.vue'
import DialogSearchUser from './aplikasi/DialogSearchUser.vue'
import CardPegawai from './aplikasi/CardPegawai.vue'
import { findWithAttr, notifErrVue } from 'src/modules/utils'

import { useSettingsAplikasi } from 'src/stores/simrs/settings'
import { useRouter } from 'vue-router'
const store = useSettingsAplikasi()
const router = useRouter()

const main = ref(null)
const h = ref()
const hScroll = ref()

const menus = computed(() => store.pegawai.menus)
const newValue = ref({
  aplikasi: '',
  color: '',
  icon: '',
  itemId: 0,
  julukan: 'kosong',
  menus: [],
  nama: '',
  url: '',
  singkatan: ''
})
const modalIcon = ref(false)
const modalMenuIcon = ref(false)
const modalSearch = ref(false)
const edited = ref(null)
const indexApp = ref(null)

onMounted(() => {
  h.value = main.value.$el.offsetHeight - 35
  hScroll.value = h.value - (72 + 70)

  console.log(newValue.value)
  store.getData()
  store.getRuang()
  store.getRole()
  store.getPoli()
})

function newData() {
  console.log(store.items)
  const ada = store.items.filter(anu => anu.itemId === 0)
  if (ada.length) {
    notifErrVue('isi dulu yang ada')
  } else {
    store.addNew(newValue.value)
  }
}

function saveNew(val) {
  store.saveNew(val).then(() => {
    edited.value = null
    indexApp.value = null
  })
}
function editApp(val) {
  console.log(val)
  store.editApp(val).then(() => {
    edited.value = null
    indexApp.value = null
    delete val.item.save
  })
}

function saveNewMenu(val) {
  console.log('new Menu', val)
  store.saveNewMenu(val)
    .then(() => {
      edited.value = null
      indexApp.value = null
    })
}
function saveEditMenu(val) {
  console.log('edit Menu', val)
  store.saveEditMenu(val)
    .then(() => {
      edited.value = null
      indexApp.value = null
    })
}

function saveNewSubMenu(val) {
  console.log('new Menu', val)
  store.saveNewSubMenu(val)
    .then(() => {
      edited.value = null
      indexApp.value = null
    })
}
function saveEditSubMenu(val) {
  console.log('edit Menu', val)
  store.saveEditSubMenu(val)
    .then(() => {
      edited.value = null
      indexApp.value = null
    })
}

function iconAppClick(index) {
  modalIcon.value = true
  indexApp.value = index
  console.log('index app', index)
}

function changeIconApp(val) {
  modalIcon.value = false
  console.log(val)
  store.changeAppIcon(indexApp.value, val).then(() => {
    edited.value = 'edited-' + val
    console.log(edited.value)
  })
}
const indexMenu = ref(null)
function iconMenuClick(index) {
  console.log('icon menu', index)
  modalMenuIcon.value = true
  indexApp.value = index.app
  indexMenu.value = index.menu
  console.log('index app', index)
}
function changeIconMenu(val) {
  console.log('change icon', val)
  modalMenuIcon.value = false
  console.log(val)
  store.changeMenuIcon(indexApp.value, indexMenu.value, val).then(() => {
    edited.value = 'edited-' + val
    console.log(edited.value)
  })
}

function setPegawai(val) {
  console.log('items', store.items)
  console.log('set', val)
  if (val !== null) {
    const menus = store.items.map(item => {
      const it = item
      it.checked = false
      it.menus.map(menu => {
        const men = menu
        // console.log('men length', men)
        men.checked = false
        men.submenus.map(sub => {
          const su = sub
          // console.log('su length', su)
          su.checked = false
          return su
        })
        return men
      })
      return it
    })
    const userMenu = val.user.akses
    if (userMenu.length) {
    // const anu = []
      const menu = menus
      userMenu.forEach(dat => {
        const appInd = findWithAttr(menu, 'id', dat.aplikasi_id)
        const menuInd = findWithAttr(menu[appInd].menus, 'id', dat.menu_id)
        const subInd = menu[appInd].menus[menuInd] ? findWithAttr(menu[appInd].menus[menuInd].submenus, 'id', dat.submenu_id) : -1
        // console.log('index nya', appInd, menuInd, subInd)
        if (appInd >= 0) menu[appInd].checked = true
        if (menuInd >= 0) menu[appInd].menus[menuInd].checked = true
        if (subInd >= 0) menu[appInd].menus[menuInd].submenus[subInd].checked = true
      })
      // console.log('user menu', userMenu, menu)
      val.menus = menu
    } else {
      val.menus = menus
    }
    modalSearch.value = false
  }
  console.log('menu', val)
  store.setPegawai(val)
}

function onSimpanUserMenu(val) {
  const app = val.filter(app => app.checked)
  const menu = app.map(app => {
    const men = app.menus.filter(men => men.checked)
    men.forEach(a => {
      const sub = a.submenus.filter(anu => anu.checked)
      a.submenus = sub
    })
    app.menus = men
    return app
  })
  // console.log('app', app)
  // console.log('menu', menu)

  store.simpanAksesMenu(menu)
}

function allCheck(val) {
  const all = store.pegawai.menus
  let data = []
  if (val === true) {
    data = []
    all.forEach(app => {
      app.checked = true
      if (app.menus.length) {
        app.menus.forEach(men => {
          men.checked = true
          if (men.submenus.length) {
            men.submenus.forEach(sub => {
              sub.checked = true
              data.push({ user_id: store.pegawai.user.id, aplikasi_id: app.id, menu_id: men.id, submenu_id: sub.id })
            })
          }
        })
      }
    })
  } else {
    data = []
    all.forEach(app => {
      app.checked = false
      if (app.menus.length) {
        app.menus.forEach(men => {
          men.checked = false
          if (men.submenus.length) {
            men.submenus.forEach(sub => {
              sub.checked = false
              data.push({ user_id: store.pegawai.user.id, aplikasi_id: app.id, menu_id: men.id, submenu_id: sub.id })
            })
          }
        })
      }
    })
  }
  store.simpanAksesMenu('all', val, data)
  // console.log('all menus', val, all)
}
function appCheck(val) {
  const app = store.pegawai.menus[val.i]
  const menus = app.menus
  let data = []
  console.log('app ', val, 'menus', menus)
  if (app.checked) {
    data = []
    menus.forEach(men => {
      men.checked = true
      if (men.submenus.length) {
        men.submenus.forEach(sub => {
          sub.checked = true
          data.push({ user_id: store.pegawai.user.id, aplikasi_id: app.id, menu_id: men.id, submenu_id: sub.id })
        })
      } else {
        data.push({ user_id: store.pegawai.user.id, aplikasi_id: app.id, menu_id: men.id, submenu_id: null })
      }
    })
  } else {
    data = []
    const temp = menus.filter(m => m.checked)
    temp.forEach(men => {
      men.checked = false
      if (men.submenus.length) {
        const anu = men.submenus.filter(a => a.checked)
        anu.forEach(sub => {
          sub.checked = false
          data.push({ user_id: store.pegawai.user.id, aplikasi_id: app.id, menu_id: men.id, submenu_id: sub.id })
        })
      } else {
        data.push({ user_id: store.pegawai.user.id, aplikasi_id: app.id, menu_id: men.id, submenu_id: null })
      }
    })
  }
  store.simpanAksesMenu('app', app.checked, data)
}
function menuCheck(val) {
  const app = store.pegawai.menus[val.i]
  const sub = val.menu.submenus
  let data = []
  // console.log('menu ', val, 'app', app, 'sub', sub)
  if (val.menu.checked) {
    data = []
    if (!app.checked) {
      app.checked = true
    }
    if (sub.length) {
      sub.forEach(s => {
        s.checked = true
        data.push({ user_id: store.pegawai.user.id, aplikasi_id: app.id, menu_id: val.menu.id, submenu_id: s.id })
      })
    } else {
      data.push({ user_id: store.pegawai.user.id, aplikasi_id: app.id, menu_id: val.menu.id, submenu_id: null })
      // store.simpanAksesMenuOnly('menu', val.menu.checked, data)
    }
  } else {
    data = []
    const menu = app.menus.filter(a => a.checked === true)
    if (!menu.length) {
      app.checked = false
    }
    if (sub.length) {
      const tmp = sub.filter(anu => anu.checked)
      tmp.forEach(s => {
        s.checked = false
        data.push({ user_id: store.pegawai.user.id, aplikasi_id: app.id, menu_id: val.menu.id, submenu_id: s.id })
      })
    } else {
      data.push({ user_id: store.pegawai.user.id, aplikasi_id: app.id, menu_id: val.menu.id, submenu_id: null })
      // store.simpanAksesMenuOnly('menu', val.menu.checked, data)
    }
  }
  store.simpanAksesMenu('menu', val.menu.checked, data)
}
function submenuCheck(val) {
  const app = store.pegawai.menus[val.i]
  const menu = app.menus[val.n]
  console.log('app ', app)
  console.log('menu ', menu)
  console.log('submenu ', val.sub.id)
  if (val.sub.checked === true) {
    app.checked = true
    menu.checked = true
  } else {
    const subs = menu.submenus.filter(a => a.checked === true)
    if (!subs.length) {
      menu.checked = false
    }
    const mens = app.menus.filter(n => n.checked === true)
    if (!mens.length) {
      app.checked = false
    }
  }
  const data = []
  data.push({ user_id: store.pegawai.user.id, aplikasi_id: app.id, menu_id: menu.id, submenu_id: val.sub.id })

  store.simpanAksesMenu('submenu', val.sub.checked, data)
}
</script>

<style lang="scss" scoped>
.padding-xxxl {
  padding-left: 20%;
  padding-right: 20%;
}
.padding-right {
  padding-left: 39%;
  padding-right: 1%;
}
</style>
