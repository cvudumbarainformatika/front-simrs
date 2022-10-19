<template>
  <div
    v-for="(item, i) in items.submenus"
    :key="i"
  >
    <q-card>
      <q-list
        bordered
        padding
        class="rounded-borders text-primary q-mb-sm"
      >
        <q-item
          v-ripple
          class="menu"
          :active="table.nama===item.value"
          :active-class="setting.dark ? 'page-dark text-white aktif-dark' : ' bg-grey-4 text-primary aktif'"
          clickable
          exact
          @click="table.pilihTransaksi(item)"
        >
          <!-- <q-item-section avatar>
            <q-icon :name="item.icon" />
          </q-item-section> -->
          <q-item-section>
            {{ item.name }}
          </q-item-section>
        </q-item>
      </q-list>
    </q-card>
  </div>
</template>
<script setup>
import { useHistoryTable } from 'src/stores/simrs/logistik/sigarang/history/table'
import { useSettingsStore } from 'src/stores/simrs/logistik/sigarang/settings/setting'
import { computed } from 'vue'
const items = computed(() => {
  const apem = setting.menus.filter(data => { return data.name === 'History' })
  if (apem.length) return apem[0]
  return [0, 0]
})
// const items = ref([
// {  name: 'Seluruhnya', value: 'all', icon: 'icon-mat-density_small' },
// {  name: 'Draft', value: 'draft', icon: 'icon-mat-insert_drive_file' },
// { name: 'Pemesanan', value: 'Pemesanan', icon: 'icon-mat-inventory_2' },
// { name: 'Penerimaan', value: 'Penerimaan', icon: 'icon-mat-shopping_bag' },
// { name: 'Gudang', value: 'Gudang', icon: 'icon-mat-account_balance_wallet' }
// {  name: 'Beban Biaya', value: 'BEBAN', icon: 'icon-mat-payment' },
// {  name: 'Retur Pembelian', value: 'RETUR PEMBELIAN', icon: 'icon-mat-assignment_return' },
// {  name: 'Retur Penjualan', value: 'RETUR PENJUALAN', icon: 'icon-mat-assignment_return' },
// {  name: 'Form Penyesuaian', value: 'FORM PENYESUAIAN', icon: 'icon-mat-tune' }
// ])
const setting = useSettingsStore()
const table = useHistoryTable()
</script>
<style lang="scss" scoped>
.menu {
  text-decoration: none;
  color: $grey-5;
}

.aktif {
  margin-left: 10px;
  border-radius: 10px 0px 0px 10px;
  border-left: 3px solid $primary;
}

.aktif-dark {
  margin-left: 10px;
  border-radius: 10px 0px 0px 10px;
  border-left: 3px solid white;
}
</style>
