<template>
  <q-page class="q-ma-sm">
    <div class="row q-col-gutter-md">
      <div class="col-2">
        <menuPage />
      </div>
      <div class="col-10">
        <SettingMenuPage v-if="setting.menu==='menu'" />
      </div>
    </div>
  </q-page>
</template>
<script setup>
import { useSettingsStore } from 'src/stores/simrs/logistik/sigarang/settings/setting'
import menuPage from './menu/MenuPage.vue'
import SettingMenuPage from './pagemenu/SettingMenuPage.vue'
const setting = useSettingsStore()
</script>
