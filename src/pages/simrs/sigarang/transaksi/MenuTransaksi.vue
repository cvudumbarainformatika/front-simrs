<template>
  <!-- <q-card> -->
  <!-- elevated -->
  <q-bar
    dark
  >
    <div class="vertical-top ">
      <!-- <q-icon name="icon-mat-menu" :color=" setting.dark ? 'white' : 'primary' " size="25px" @click="openDialog" /> -->
      <q-btn
        icon="icon-mat-menu"
        flat
        :color="setting.dark ? 'white' : 'primary' "
        round
        size="15px"
        :disable="setting.transaksiLoading"
        :loading="setting.transaksiLoading"
        class="menu-button"
      >
        <app-dialog-list
          position="left"
          :menus="menus.submenus"
        />
        <template #loading>
          <!-- class="on-left" -->
          <q-spinner-hourglass
            size="18px"
          />
        </template>
      </q-btn>
    </div>
  </q-bar>
  <!-- </q-card> -->
</template>
<script setup>
import { useSettingsStore } from 'src/stores/simrs/logistik/sigarang/settings/setting'
import { computed } from 'vue'
const menus = computed(() => {
  const apem = setting.menus.filter(data => { return data.name === 'Transaksi' })
  if (apem.length) return apem[0]
  return [0, 0]
})

const setting = useSettingsStore()

// const menus = ref([
//   { name: 'Transaksi Pemesanan', value: 'transaksi.pemesanan', link: 'transaksi/pemesanan/TRP-' },
//   { name: 'Transaksi Penerimaan', value: 'transaksi.penerimaan', link: 'transaksi/penerimaan/TRM-' }
// {  name: 'Data User', icon: 'icon-mat-badge', link: 'admin/user' },
// {  name: 'Registrasi Pegawai', icon: 'icon-mat-badge', link: 'admin/pegawai' }
// {  name: 'transaksi', icon: 'icon-mat-sync_alt', link: 'transaksi' },
// {  name: 'history', icon: 'icon-mat-history', link: 'history' },
// {  name: 'laporan', icon: 'icon-mat-description', link: 'laporan' },
// {  name: 'setting', icon: 'icon-mat-settings', link: 'setting' }
// ])
</script>
<style lang="scss">
.menu-button{
  margin-left:-15px ;
}
</style>
