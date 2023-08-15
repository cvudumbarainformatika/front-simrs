<template>
  <!-- <q-card> -->
  <q-bar
    elevated
    dark
  >
    <div class="vertical-top ">
      <q-btn
        class="menu-button"
        icon="icon-mat-menu"
        flat
        :color=" setting.dark ? 'white' : 'primary' "
        round
        size="15px"
      >
        <app-dialog-list
          position="left"
          :menus="menus.submenus"
        />
      </q-btn>
    </div>
  </q-bar>
  <!-- </q-card> -->
</template>
<script setup>
import { useSettingsStore } from 'src/stores/simrs/logistik/sigarang/settings/setting'
import { computed } from 'vue'
const menus = computed(() => {
  const apem = setting.menus.filter(data => { return data.name === 'Admin' })
  if (apem.length) return apem[0]
  return [0, 0]
})
const setting = useSettingsStore()
// const modelDialog = ref(false)
// const openDialog = () => {
//   modelDialog.value = !modelDialog.value
// }
// const menus = ref([
//   { name: 'Data User', value: 'admin.user', link: 'admin/user' },
//   { name: 'Registrasi Pegawai', value: 'admin.pegawai', link: 'admin/pegawai' }
// {  name: 'Data User', icon: 'icon-mat-badge', link: 'admin/user' },
// {  name: 'Registrasi Pegawai', icon: 'icon-mat-badge', link: 'admin/pegawai' }
// {  name: 'transaksi', icon: 'icon-mat-sync_alt', link: 'transaksi' },
// {  name: 'history', icon: 'icon-mat-history', link: 'history' },
// {  name: 'laporan', icon: 'icon-mat-description', link: 'laporan' },
// {  name: 'setting', icon: 'icon-mat-settings', link: 'setting' }
// ])
</script>
<style lang="scss" scoped>

</style>
