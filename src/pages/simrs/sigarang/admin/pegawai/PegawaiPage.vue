<template>
  <div class="row">
    <div class="col-2">
      <DataList />
    </div>
    <div class="col-10">
      <div v-if="store.pegawai===null">
        <app-no-selected-page text="Belum ada data pegawai yang dipilih" />
      </div>
      <div v-else>
        <RegistrationForm />
      </div>
    </div>
  </div>
</template>
<script setup>
import { useAdminPegawaiStore } from 'src/stores/simrs/logistik/sigarang/admin/pegawai/pegawai'
import DataList from './DataList.vue'
import RegistrationForm from './RegistrationForm.vue'
const store = useAdminPegawaiStore()
// store.getDataTable()
</script>
