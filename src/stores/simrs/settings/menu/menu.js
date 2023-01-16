import { defineStore } from 'pinia'

export const useSettingMenuStore = defineStore('setting_menu', {
  state: () => ({
    aplications: [],
    menus: [],
    rawMenus: []
  }),
  actions: {

    mapingMenu() {}
  }
})
