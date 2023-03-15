<template>
  <q-page
    ref="main"
    class=""
  >
    <div
      class="padding-xxxl q-pt-md"
    >
      <q-card
        class="card-my shadow-22"
        :style="`height:${h}px`"
      >
        <div
          style="height:70px"
          class="q-px-lg q-py-md"
        >
          <app-input
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
            @icon-app-change="(val)=>iconAppClick(val)"
            @delete-new="(val)=>store.deleteNew(val)"
            @add-menu="(val)=>store.addMenu(val)"
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

    <div
      v-if="store.pegawai !== null"
      class="absolute-left q-pa-md"
      style="width:20%"
    >
      <card-pegawai :item="store.pegawai" />
    </div>

    <!-- modal -->
    <app-get-icon
      v-model="modalIcon"
      @copy-text="(val)=>changeIconApp(val)"
    />
    <DialogSearchUser
      v-model="modalSearch"
      @updated="(val)=>setPegawai(val)"
    />
  </q-page>
</template>

<script setup>
import { useSettingsAplikasi } from 'src/stores/simrs/settings'
import { ref, onMounted } from 'vue'

import ListItems from './aplikasi/ListItems.vue'
import DialogSearchUser from './aplikasi/DialogSearchUser.vue'
import CardPegawai from './aplikasi/CardPegawai.vue'

const main = ref(null)
const h = ref()
const hScroll = ref()

const store = useSettingsAplikasi()

const newValue = ref({
  aplikasi: '',
  color: '',
  icon: '',
  id: 0,
  julukan: 'kosong',
  menus: [],
  nama: '',
  url: ''
})
const modalIcon = ref(false)
const modalSearch = ref(false)
const edited = ref(null)
const indexApp = ref(null)

onMounted(() => {
  h.value = main.value.$el.offsetHeight - 35
  hScroll.value = h.value - (72 + 70)

  console.log(newValue.value)
  store.getData()
})

function newData() {
  store.addNew(newValue.value)
}
function saveNew(val) {
  store.saveNew(val).then(() => {
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

function setPegawai(val) {
  console.log('set', val)
  store.setPegawai(val)
  modalSearch.value = false
}
</script>

<style lang="scss" scoped>
.padding-xxxl {
  padding-left: 20%;
  padding-right: 20%;
}
</style>
