<template>
  <q-menu
    persistent
    auto-close
    transition-show="slide-right"
    transition-hide="slide-left"
    :offset="[-4, -7]"
  >
    <q-card style="position:relative;">
      <q-bar>
        <q-btn
          v-close-popup
          class="text-right"
          dense
          flat
          icon="icon-mat-close"
        >
          <q-tooltip>Close</q-tooltip>
        </q-btn>
      </q-bar>
      <q-card-section class="row items-center no-wrap">
        <div
          class="flex column flex-start full-height"
          style="height:calc(100%-60px) "
        >
          <!-- <router-link v-for="(menu, i) in props.menus" :key="i" :to="`/${menu.link}`" replace
            class="sidebar flex flex-start" style="min-width:30px;" @click="closePopup" :active="menu.name === path"
            :active-class="setting.dark ? 'active-dark' : 'active'" exact>
            <div v-if="menu.icon">
              <q-tooltip class="bg-primary" anchor="center right" self="center left" :offset="[5, 5]">
                <strong class="">{{ menu.name }}</strong>
                (
                <q-icon name="icon-mat-keyboard_arrow_right" />)
              </q-tooltip>
              <q-icon :name="menu.icon" size="25px" />
            </div>
            <div class="row items-center" v-if="!menu.icon" style="width:160px;">
              <div class="col-10 text-left">
                <strong> {{ menu.name }}</strong>
              </div>
              <div class="col-2 text-right">
                <q-icon name="icon-mat-chevron_right" size="25px" />
              </div>
            </div>
          </router-link> -->
          <q-list>
            <q-item
              v-for="(menu, i) in props.menus"
              :key="i"
              :to="`/${menu.link}`"
              replace
              class="sidebar flex flex-start"
              style="min-width:30px;"
              :active="menu.value === path"
              :active-class="setting.dark ? 'active-dark' : 'active'"
              exact
              @click="closePopup"
            >
              <q-item-section>
                <div v-if="menu.icon">
                  <q-tooltip
                    class="bg-primary"
                    anchor="center right"
                    self="center left"
                    :offset="[5, 5]"
                  >
                    <strong class="">{{ menu.name }}</strong>
                    (
                    <q-icon name="icon-mat-keyboard_arrow_right" />)
                  </q-tooltip>
                  <q-icon
                    :name="menu.icon"
                    size="25px"
                  />
                </div>
                <div
                  v-if="!menu.icon"
                  class="row items-center"
                  style="width:160px;"
                >
                  <div class="col-10 text-left">
                    <strong> {{ menu.name }}</strong>
                  </div>
                  <div class="col-2 text-right">
                    <q-icon
                      name="icon-mat-chevron_right"
                      size="25px"
                    />
                  </div>
                </div>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </q-card-section>
    </q-card>
  </q-menu>
</template>
<script setup>
import { useSettingsStore } from 'src/stores/simrs/logistik/sigarang/settings/setting'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
const path = computed(() => useRoute().name)
const props = defineProps({
  menus: { type: Array, default: () => { return [] } }
})
const setting = useSettingsStore()
const emits = defineEmits(['tutup'])
// const toOpen = computed({
//   get () { return props.isOpen }, set (val) { emits('tutup', val) }
// })
const closePopup = () => {
  emits('tutup')
}
</script>
<style lang="scss" scoped>
.sidebar {
  width: calc(100% - 10px);
  height: 45px;
}

a.sidebar {
  text-decoration: none;
  color: $grey-5;
}

a.router-link-active,
a.router-link-exact-active,
a.active {
  margin-left: 10px;
  border-radius: 10px 0px 0px 10px;
  color: $primary;
  background-color: $grey-4;
  border-left: 3px solid $primary;
}

a.router-link-active-dark,
a.router-link-exact-active-dark,
a.active-dark {
  margin-left: 10px;
  border-radius: 10px 0px 0px 10px;
  color: white;
  background-color: $dark-light;
  border-left: 3px solid white;
}

.just-shadow {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  box-shadow: 0 0 10px 2px rgb(0 0 0 / 20%), 0 0px 10px rgb(0 0 0 / 24%);
}
</style>
