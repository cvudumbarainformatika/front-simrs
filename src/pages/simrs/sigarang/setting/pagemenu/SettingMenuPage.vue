<template>
  <q-card class="full-width">
    <q-card-section>
      <div class="text-h6 text-weight-bold">
        Menu Setting
      </div>
      <div class="title-desc">
        Edit Menu
      </div>
    </q-card-section>
    <q-separator />
    <q-card-section horizontal>
      <q-card-section style="width:450px;">
        <div class="row q-mb-sm">
          <app-btn
            v-if="add===false"
            label="Tambah Menu"
            @click="add=true"
          />
        </div>
        <div v-if="add===true">
          <AddMenu
            :nama="namaMenu"
            :icon="iconMenu"
            :link="linkMenu"
            :loading="setting.loading"
            :value="value"
            @updateroute="uRouteMenu"
            @updatenama="uNamaMenu"
            @updateicon="uIconMenu"
            @updatelink="uLinkMenu"
            @batal="batal"
            @simpan="tambahMenu"
          />
        </div>
        <div
          v-for="(item, i) in setting.menus"
          :key="i"
        >
          <q-card>
            <q-list
              bordered
              padding
              class="rounded-borders text-primary q-mb-sm"
            >
              <q-item
                v-ripple
                class="menu"
                :active="curentmenu===item.name"
                :active-class="setting.dark ? 'page-dark text-white aktif-dark' : ' bg-grey-4 text-primary aktif'"
                clickable
                exact
                @click="pilihMenu(item, i)"
              >
                <q-item-section avatar>
                  <q-icon :name="item.icon" />
                </q-item-section>
                <q-item-section>
                  {{ item.name }}
                </q-item-section>
                <q-item-section>
                  link : {{ item.link }}
                </q-item-section>
                <q-item-section>
                  <div class="row justify-end">
                    <q-btn
                      flat
                      class=""
                      size="sm"
                      round
                      color="primary"
                      icon="icon-mat-edit"
                    >
                      <q-popup-proxy
                        :offset="[300, -42]"
                        transition-show="jump-up"
                        transition-hide="jump-down"
                        @before-show="beforeEdit(item, i)"
                      >
                        <q-banner>
                          <AddMenu
                            :nama="namaMenu"
                            :icon="iconMenu"
                            :link="linkMenu"
                            :loading="setting.loading"
                            :value="value"
                            @updateroute="uValue"
                            @updatenama="uNamaMenu"
                            @updateicon="uIconMenu"
                            @updatelink="uLinkMenu"
                            @batal="batal"
                            @simpan="saveEdit"
                          />
                        </q-banner>
                      </q-popup-proxy>
                      <q-tooltip
                        anchor="top middle"
                        self="center middle"
                      >
                        Edit Data
                      </q-tooltip>
                    </q-btn>
                    <q-btn
                      flat
                      class=""
                      size="sm"
                      round
                      color="negative"
                      icon="icon-mat-delete_sweep"
                      @click="deleteMenu(item, i)"
                    >
                      <q-tooltip
                        anchor="top middle"
                        self="center middle"
                      >
                        Delete Data
                      </q-tooltip>
                    </q-btn>
                  </div>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card>
        </div>
      </q-card-section>
      <q-card-section style="width:550px;">
        <div class="row q-mb-sm">
          <app-btn
            v-if="addsub===false"
            label="Tambah Sub Menu"
            @click="addsub=true"
          />
        </div>
        <div v-if="addsub===true">
          <AddSubMenu
            :nama="namaSubMenu"
            :link="linkSubMenu"
            :route="routeMenu"
            :loading="setting.loading"
            @updatenama="uNamaSubMenu"
            @updatelink="uLinkSubMenu"
            @updateroute="uRouteMenu"
            @batal="batalSub"
            @simpan="tambahSubMenu"
          />
        </div>
        <div v-if="setting.menus[index]">
          <q-card
            v-for="(item, i) in setting.menus[index].submenus"
            :key="i"
          >
            <q-list
              bordered
              padding
              class="rounded-borders text-primary q-mb-sm"
            >
              <q-item
                v-ripple
                class="menu"
                :active="curentSubMenu===item.value"
                :active-class="setting.dark ? 'page-dark text-white aktif-dark' : ' bg-grey-4 text-primary aktif'"
                clickable
                exact
                @click="pilihSubMenu(item)"
              >
                <!-- <q-item-section avatar>
                  <q-icon :name="item.icon" />
                </q-item-section> -->
                <q-item-section>
                  {{ item.name }}
                </q-item-section>
                <q-item-section>
                  <div class="row">
                    link : {{ item.link }}
                  </div>
                  <div class="row">
                    nama route : {{ item.value }}
                  </div>
                </q-item-section>
                <q-item-section>
                  <div class="row justify-end">
                    <q-btn
                      flat
                      class=""
                      size="sm"
                      round
                      color="primary"
                      icon="icon-mat-edit"
                    >
                      <q-popup-proxy
                        :offset="[300, -42]"
                        transition-show="jump-up"
                        transition-hide="jump-down"
                        @before-show="beforeSubEdit(item, i)"
                      >
                        <q-banner>
                          <AddSubMenu
                            :nama="namaSubMenu"
                            :link="linkSubMenu"
                            :route="routeMenu"
                            :loading="setting.loading"
                            @updatenama="uNamaSubMenu"
                            @updatelink="uLinkSubMenu"
                            @updateroute="uRouteMenu"
                            @batal="batalSub"
                            @simpan="saveSubEdit"
                          />
                        </q-banner>
                      </q-popup-proxy>
                      <q-tooltip
                        anchor="top middle"
                        self="center middle"
                      >
                        Edit Data
                      </q-tooltip>
                    </q-btn>
                    <q-btn
                      flat
                      class=""
                      size="sm"
                      round
                      color="negative"
                      icon="icon-mat-delete_sweep"
                      @click="deleteSubMenu(item,i)"
                    >
                      <q-tooltip
                        anchor="top middle"
                        self="center middle"
                      >
                        Delete Data
                      </q-tooltip>
                    </q-btn>
                  </div>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card>
        </div>
      </q-card-section>
    </q-card-section>
  </q-card>
</template>
<script setup>
import { Dialog } from 'quasar'
import { findWithAttr } from 'src/modules/utils'
import { useSettingsStore } from 'src/stores/simrs/logistik/sigarang/settings/setting'
import { computed, ref } from 'vue'

import AddMenu from './AddMenu.vue'
import AddSubMenu from './AddSubMenu.vue'
const setting = useSettingsStore()
const add = ref(false)
const addsub = ref(false)
const curentmenu = ref('Dashboard')

const index = computed(() => {
  if (!setting.menus.length) { return 0 }
  const ind = findWithAttr(setting.menus, 'name', curentmenu.value)
  console.log('index', ind)
  return ind
})
// Menu
const namaMenu = ref(null)
const iconMenu = ref('icon-mat-')
const linkMenu = ref(null)
const value = ref(null)
const uNamaMenu = val => { namaMenu.value = val }
const uIconMenu = val => { iconMenu.value = val }
const uLinkMenu = val => { linkMenu.value = val }
const uValue = val => { value.value = val }

// sub menu
const subMenus = ref([])
const namaSubMenu = ref(null)
const routeMenu = ref(null)
const linkSubMenu = ref(null)
const uNamaSubMenu = val => { namaSubMenu.value = val }
const uRouteMenu = val => { routeMenu.value = val }
const uLinkSubMenu = val => { linkSubMenu.value = val }

const save = () => {
  setting.saveSetting().then(() => {
    setting.getDataSetting()
    add.value = false
    namaMenu.value = null
    iconMenu.value = 'icon-mat-'
    linkMenu.value = null
    namaSubMenu.value = null
    routeMenu.value = null
    linkSubMenu.value = null
    addsub.value = false
  })
}
const pilihMenu = (val, index) => {
  curentmenu.value = val.name
  indexEdit = index
  console.log(val)
}
const tambahMenu = () => {
  const temp = { name: namaMenu.value, icon: iconMenu.value, link: linkMenu.value, value: value.value, subMenus: [] }
  setting.menus.push(temp)
  save()
  console.log(temp)
}
const batal = () => {
  namaMenu.value = null
  iconMenu.value = 'icon-mat-'
  linkMenu.value = null
  add.value = false
}

let indexEdit = 0
const subMenu = ref([])
const beforeEdit = (val, index) => {
  namaMenu.value = val.name
  iconMenu.value = val.icon
  linkMenu.value = val.link
  value.value = val.value
  subMenu.value = val.submenus
  indexEdit = index
}

const saveEdit = val => {
  const temp = { name: namaMenu.value, value: value.value, icon: iconMenu.value, link: linkMenu.value, submenus: subMenu.value }
  setting.menus[indexEdit] = temp
  curentmenu.value = temp.name
  save()
  // console.log('edit', menu)
}
const deleteMenu = (val, index) => {
  // const index = findWithAttr(setting.menus, 'name', val.name)
  Dialog.create({
    title: 'Konfirmasi',
    message: `Apakah <strong>menu: ${val.name}</strong> Akan dihapus?`,
    cancel: true,
    html: true
    // persistent: true
  })
    .onOk(() => {
      if (index > -1) { // only splice array when item is found
        setting.menus.splice(index, 1) // 2nd parameter means remove one item only
        save()
      }
    })
}
// sub menu
// const sub = [
//   { name: 'Master Gedung', value: 'master.gedung', link: 'master/gedung' },
//   { name: 'Master Gudang', value: 'master.gudang', link: 'master/gudang' },
//   { name: 'Master Ruang', value: 'master.ruang', link: 'master/ruang' },
//   { name: 'Master Pengguna', value: 'master.pengguna', link: 'master/pengguna' },
//   { name: 'Mapping Pengguna Ruang', value: 'master.penggunaruang', link: 'master/penggunaruang' },
//   { name: 'Master Barang 108', value: 'master.barang108', link: 'master/barang108' },
//   { name: 'Master Barang RS', value: 'master.barangrs', link: 'master/barangrs' },
//   { name: 'Master Mapping RS ke 108', value: 'master.mapingbarang', link: 'master/mapingbarang' },
//   { name: 'Master Supplier', value: 'master.supplier', link: 'master/supplier' },
//   { name: 'Master Satuan', value: 'master.satuan', link: 'master/satuan' },
//   { name: 'Master Pegawai', value: 'master.pegawai', link: 'master/pegawai' }]
const tambahSubMenu = () => {
  const temp = { name: namaSubMenu.value, value: routeMenu.value, link: linkSubMenu.value }
  const ind = findWithAttr(setting.menus, 'name', curentmenu.value)
  subMenus.value = setting.menus[ind].submenus ? setting.menus[ind].submenus : []
  // console.log('sub menu', subMenus.value)
  subMenus.value.push(temp)
  setting.menus[ind].submenus = subMenus.value
  // setting.menus[ind].submenus = sub
  save()
  console.log(temp)
}
const batalSub = () => {
  namaSubMenu.value = null
  routeMenu.value = null
  linkSubMenu.value = null
  addsub.value = false
}

let indexSubEdit = null
const beforeSubEdit = (val, index) => {
  namaSubMenu.value = val.name
  routeMenu.value = val.value
  linkSubMenu.value = val.link
  indexSubEdit = index
  console.log('before menu', setting.menus[indexEdit])
  console.log('before sub', setting.menus[indexEdit].submenus[index])
  // console.log('before sub', sub)
}
const curentSubMenu = ref('')

const saveSubEdit = val => {
  const temp = { name: namaSubMenu.value, value: routeMenu.value, link: linkSubMenu.value }
  const menu = setting.menus[indexEdit].submenus
  menu[indexSubEdit] = temp
  save()
  console.log('edit', menu)
  curentSubMenu.value = temp.name
}

const deleteSubMenu = (val, index) => {
  // const index = findWithAttr(setting.menus, 'name', val.name)
  Dialog.create({
    title: 'Konfirmasi',
    message: `Apakah <strong>sub menu: ${val.name}</strong> Akan dihapus?`,
    cancel: true,
    html: true
    // persistent: true
  })
    .onOk(() => {
      if (index > -1) { // only splice array when item is found
        setting.menus[indexEdit].submenus.splice(index, 1) // 2nd parameter means remove one item only
        save()
      }
    })
}
const pilihSubMenu = val => {
  curentSubMenu.value = val.name
  console.log(val)
}

</script>
<style lang="scss" scoped>
.menu {
  text-decoration: none;
  color: $grey-9;
}

.aktif {
  margin-left: 10px;
  border-radius: 10px 0px 0px 10px;
  border-left: 3px solid $primary;
}

.aktif-dark {
  margin-left: 10px;
  border-radius: 10px 0px 0px 10px;
  border-left: 3px solid white;
}
</style>
