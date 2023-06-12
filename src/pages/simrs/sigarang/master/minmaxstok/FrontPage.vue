<template>
  <q-card>
    <q-tabs
      v-model="tab"
      dense
      class="text-grey"
      active-color="primary"
      indicator-color="primary"
      align="justify"
      narrow-indicator
    >
      <q-tab
        v-if="role!=='depo'"
        name="depo"
        label="Depo"
        no-caps
      />
      <q-tab
        name="pengguna"
        label="Ruangan"
        no-caps
      />
    </q-tabs>

    <q-separator />

    <q-tab-panels
      v-model="tab"
      animated
    >
      <q-tab-panel name="depo">
        <DepoTable />
      </q-tab-panel>

      <q-tab-panel name="pengguna">
        <PenggunaTable />
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
</template>
<script setup>
import { useAuthStore } from 'src/stores/auth'
import { useMinMaxStokForm } from 'src/stores/simrs/logistik/sigarang/master/minmaxstok/form'
import { computed, ref } from 'vue'
import DepoTable from './depo/DepoTable.vue'
import PenggunaTable from './pengguna/PenggunaTable.vue'

const store = useMinMaxStokForm()
const auth = useAuthStore()
const role = computed(() => {
  return auth.currentUser.pegawai ? auth.currentUser.pegawai.role.nama : ''
})
const tab = role.value !== '' ? ref('depo') : ref('pengguna')
store.getRequredDataForm()
</script>
