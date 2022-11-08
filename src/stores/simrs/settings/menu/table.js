import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { notifSuccess } from 'src/modules/utils'

export const useTableMenu = defineStore('table_menu', {
  state: () => ({
    items: [],
    form: {
      nama: null
    },

    subForm: {
      menu_id: 0,
      nama: null,
      icon: null
    },
    dialog: false,
    dialogSub: false,
    edited: false,
    editedSub: false,
    loading: false
  }),
  // getters: {
  //   doubleCount: (state) => state.counter * 2
  // },
  actions: {
    async getData() {
      await api.get('/v1/menus').then(resp => {
        console.log('menus', resp)
        this.items = resp.data
      })
    },

    addNew() {
      this.newData()
      this.dialog = true
    },
    addNewSub(menuid) {
      // this.newSubData(menuid)
      this.subForm = {}
      const columns = ['nama', 'icon']
      for (let i = 0; i < columns.length; i++) {
        this.setSubForm(columns[i], null)
      }
      this.setSubForm('menu_id', menuid)
      this.editedSub = false
      this.dialogSub = true
    },

    async saveForm() {
      this.loading = true
      await api.post('/v1/store_menu', this.form).then((resp) => {
        console.log('form', resp)
        if (resp.status === 201) {
          if (!this.edited) {
            this.form.nama = null
          }
          this.getData()
          this.loading = false
          notifSuccess(resp)
          return new Promise((resolve, reject) => {
            resolve(resp)
          })
        }

        this.loading = false
      })
    },
    async saveSubForm() {
      this.loading = true
      await api.post('/v1/store_submenu', this.subForm).then((resp) => {
        console.log('form', resp)
        if (resp.status === 201) {
          if (!this.edited) {
            this.subForm.nama = null
            this.subForm.icon = null
          }
          this.getData()
          this.loading = false
          notifSuccess(resp)
          return new Promise((resolve, reject) => {
            resolve(resp)
          })
        }

        this.loading = false
      })
    },

    setForm (name, val) {
      this.form[name] = val
    },
    setSubForm (name, val) {
      this.subForm[name] = val
    },
    resetFORM () {
      this.form = {}
      const columns = ['nama']
      for (let i = 0; i < columns.length; i++) {
        this.setForm(columns[i], null)
      }
    },
    // resetSUBFORM (menuid) {
    //   this.subForm = {}
    //   const columns = ['nama']
    //   for (let i = 0; i < columns.length; i++) {
    //     this.setSubForm(columns[i], null)
    //   }
    //   this.setSubForm('menu_id', menuid)
    // },
    newData () {
      this.resetFORM()
      this.edited = false
    },
    // newSubData (menuid) {
    //   this.resetSUBFORM(menuid)
    //   this.editedSub = false
    // },
    editData(val) {
      // console.log(val)
      this.edited = true
      this.form.id = val.id
      this.form.nama = val.nama
      this.dialog = true
    },
    editSubData(val) {
      // console.log(val)
      this.editedSub = true
      this.subForm.id = val.id
      this.subForm.menu_id = val.menu_id
      this.subForm.nama = val.nama
      this.dialogSub = true
    },
    async deleteData(payload) {
      this.loading = true
      const params = { id: payload }
      try {
        await api.post('/v1/delete_menu', params).then(resp => {
          notifSuccess(resp)
          this.getData()
          this.loading = false
          return new Promise((resolve, reject) => {
            resolve(resp)
          })
        })
      } catch (error) {
        this.loading = false
      }
    }
  }
})
