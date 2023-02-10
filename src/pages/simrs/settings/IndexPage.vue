<template>
  <q-page>
    <div class="header bg-primary text-white q-pa-md padding-xxxl ">
      <div class="row items-center">
        <div class="col">
          <div class="row items-center q-col-gutter-md">
            <div>
              <q-avatar
                size="80px"
                font-size="40px"
                color="indigo"
                text-color="white"
                icon="icon-mat-person"
              />
            </div>
            <div class="column">
              <div class="text-h6">
                SIMRS IT
              </div>
              <div>Halaman Ini Khusu SIMRS / IT</div>
            </div>
          </div>
        </div>
        <div class="col text-right">
          <div class="text-h6">
            SETTINGS APLIKASI
          </div>
          <div>SISTEM INFORMASI RUMAH SAKIT </div>
        </div>
      </div>
    </div>
    <div class="content padding-xxxl q-pa-lg">
      <div class="row  q-col-gutter-lg">
        <div class="col">
          <app-setting-card url="settings.menu" />
        </div>
        <div class="col">
          <app-setting-card
            title="Setting Pengguna"
            subtitle="Pengaturan data Pengguna Aplikasi"
            icon="icon-mat-person_2"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>
<script setup>
import AppSettingCard from 'src/components/~global/AppSettingCard.vue'
import { useSettingsAplikasi } from 'src/stores/simrs/settings'
import { onMounted } from 'vue'

const store = useSettingsAplikasi()

onMounted(() => {
  store.getData()
})

</script>

<style lang="scss" scoped>
.padding-xxxl {
  padding-left: 20%;
  padding-right: 20%;
}

</style>
