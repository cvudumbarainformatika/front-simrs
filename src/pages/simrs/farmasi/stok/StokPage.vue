<template>
  <div class="column full-height">
    <div
      class="col-auto fixed-top"
      style="z-index:1 ;"
    >
      <HeaderComp
        :search="table.params.q"
        :per-page="table.params.per_page"
        @fullscreen="style.setComponentFull"
        @set-search="table.setQ"
        @set-row="table.setPerPage"
        @set-periode="table.setPeriodik"
        @refresh="table.getLists"
        @filter="table.setFilters"
        @add="openDialog"
      />
    </div>
    <div
      class="col full-height"
      style="padding-bottom: 60px; padding-top:60px"
    >
      <listForm />
    </div>
    <div class="fixed-bottom">
      <BottomComp
        v-if="table.meta !==null"
        :key="table.meta"
        :meta="table.meta"
        @go-to="table.setPage"
      />
    </div>
  </div>
  <app-dialog-not-full
    v-model="store.isOpen"
    label="Form Stok"
    label-btn-ok="Simpan"
    label-btn-close="Batal"
    :loading="store.loading"
    @on-ok="simpan"
    @on-cancel="batal"
  >
    <template #default>
      <headerForm />
    </template>
  </app-dialog-not-full>
</template>

<script setup>
import { useStyledStore } from 'src/stores/app/styled'
import { UseFarmasiStokTable } from 'src/stores/simrs/farmasi/stok/tabel'
import { UseFarmasiStokStore } from 'src/stores/simrs/farmasi/stok/form'
import { defineAsyncComponent, onMounted, watch } from 'vue'
import { useAplikasiStore } from 'src/stores/app/aplikasi'

const style = useStyledStore()

const table = UseFarmasiStokTable()
const store = UseFarmasiStokStore()
const apps = useAplikasiStore()

const BottomComp = defineAsyncComponent(() => import('./comp/CompBottom.vue'))
const HeaderComp = defineAsyncComponent(() => import('./comp/CompHeader.vue'))
const headerForm = defineAsyncComponent(() => import('./comp/CompHeaderForm.vue'))
const listForm = defineAsyncComponent(() => import('./comp/CompList.vue'))

function openDialog() {
  store.edit = false
  store.setOpen()
}

onMounted(() => {
  if (apps?.user?.kdruangansim !== '') {
    store.setForm('kdruang', apps?.user?.kdruangansim)
    table.setParam('kdruang', apps?.user?.kdruangansim)
    const dep = apps.depos.find(x => x.value === apps?.user?.kdruangansim)
    if (dep)store.setDisp('kdruang', dep.nama)
    // console.log(dep)
  }

  table.getInitialData()
  store.getInitialData()
})
watch(() => apps?.user?.kdruangansim, (obj) => {
  store.setForm('kdruang', obj)
  table.setParam('kdruang', obj)
  table.getDataTable()
  const dep = apps.depos.find(x => x.value === apps?.user?.kdruangansim)
  if (dep)store.setDisp('kdruang', dep.nama)
  // console.log(dep)
})
function simpan() {
  console.log('form', store.form)
  store.simpanForm()
}
function batal() {
  store.resetForm()
  console.log('form', store.form)
}
</script>
