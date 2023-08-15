import { defineStore } from 'pinia'

export const useSettingMenuStore = defineStore('setting_menu', {
  state: () => ({
    aplications: [],
    menus: [],
    rawMenus: []
  }),
  actions: {

    mapingMenu(val) {
      console.log('data menu', val)
      // ini sebagai catatan
      console.log('prototype aplikasi', Object.getPrototypeOf(val.aplikasi).constructor.name === 'Object')
      console.log('prototype menu', Object.getPrototypeOf(val.menus).constructor.name === 'Object')
      console.log('prototype role', Object.getPrototypeOf(val.role).constructor.name === 'Array')
      console.log('prototype submenu', Object.getPrototypeOf(val.submenu).constructor.name === 'Array')
    }
  }
})
