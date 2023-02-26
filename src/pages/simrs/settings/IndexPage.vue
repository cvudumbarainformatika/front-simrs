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
            @icon-app-change="(val)=>iconAppClick(val)"
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
            />
          </div>
        </div>
      </q-card>
    </div>

    <!-- modal -->
    <app-get-icon
      v-model="modalIcon"
      @copy-text="(val)=>changeIconApp(val)"
    />
  </q-page>
</template>

<script setup>
import { useSettingsAplikasi } from 'src/stores/simrs/settings'
import { ref, onMounted } from 'vue'

import ListItems from './aplikasi/ListItems.vue'

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
const edited = ref(null)

onMounted(() => {
  h.value = main.value.$el.offsetHeight - 35
  hScroll.value = h.value - (72 + 70)

  console.log(newValue.value)
  store.getData()
})

function newData() {
  store.addNew(newValue.value)
}

const indexApp = ref(null)
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
</script>

<style lang="scss" scoped>
.padding-xxxl {
  padding-left: 20%;
  padding-right: 20%;
}
</style>
