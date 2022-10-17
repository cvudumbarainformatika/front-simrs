<template>
  <q-bar elevated>
    <div class="vertical-top ">
      <q-btn
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
</template>
<script setup>
import { useSettingsStore } from 'src/stores/simrs/logistik/sigarang/settings/setting'
import { computed } from 'vue'
const menus = computed(() => {
  const apem = setting.menus.filter(data => { return data.name === 'Master' })
  if (apem.length) return apem[0]
  return [0, 0]
})
const setting = useSettingsStore()
// const modelDialog = ref(false)
// const openDialog = () => {
//   modelDialog.value = !modelDialog.value
// }
// const menus = ref([
// { name: 'Master Gedung', value: 'master.gedung', link: 'master/gedung' },
// { name: 'Master Gudang', value: 'master.gudang', link: 'master/gudang' },
// { name: 'Master Ruang', value: 'master.ruang', link: 'master/ruang' },
// { name: 'Master Pengguna', value: 'master.pengguna', link: 'master/pengguna' },
// { name: 'Mapping Pengguna Ruang', value: 'master.penggunaruang', link: 'master/penggunaruang' },
// { name: 'Master Barang 108', value: 'master.barang108', link: 'master/barang108' },
// { name: 'Master Barang RS', value: 'master.barangrs', link: 'master/barangrs' },
// { name: 'Master Mapping RS ke 108', value: 'master.mapingbarang', link: 'master/mapingbarang' },
// { name: 'Master Supplier', value: 'master.supplier', link: 'master/supplier' },
// { name: 'Master Satuan', value: 'master.satuan', link: 'master/satuan' },
// { name: 'Master Pegawai', value: 'master.pegawai', link: 'master/pegawai' },
//   { name: 'Master Kontrak Pengerjaan', value: 'master.kontrakpengerjaan', link: 'master/kontrakpengerjaan' }
// { id: 1, name: 'Master Supplier', icon: 'icon-mat-local_shipping', link: 'master/supplier' },
// { id: 2, name: 'Master Pegawai', icon: 'icon-mat-badge', link: 'master/pegawai' },
// { id: 3, name: 'Master Satuan', icon: 'icon-mat-sell', link: 'master/satuan' },
// { id: 3, name: 'Master Gedung', icon: 'icon-mat-corporate_fare', link: 'master/gedung' },
// { id: 4, name: 'Master Ruang', icon: 'icon-mat-meeting_room', link: 'master/ruang' }
// { id: 4, name: 'laporan', icon: 'icon-mat-description', link: 'laporan' },
// { id: 5, name: 'setting', icon: 'icon-mat-settings', link: 'setting' }
// { id: 3, name: 'Master Gedung', link: 'master/gedung' },
// ])
</script>
<style lang="scss" scoped>

</style>
