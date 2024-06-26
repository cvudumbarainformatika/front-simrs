<template>
  <div class="column full-height">
    <div
      class="col-auto fixed-top"
      style="z-index:1 ;"
    >
      <HeaderComp
        :search="table.params.q"
        :per-page="table.params.per_page"
        :tutup="table.tutup"
        :loading-tutup="table.loadingTutup"
        @fullscreen="style.setComponentFull"
        @set-search="table.setQ"
        @set-row="table.setPerPage"
        @set-periode="table.setPeriode"
        @refresh="table.getLists"
        @filter="table.setFilters"
        @add="openDialog"
        @print="print"
        @tutup-opname="tutupOpname"
      />
    </div>
    <div
      class="col full-height"
      style="padding-bottom: 60px; padding-top:36px"
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
    label="Form Tambah Item Stok Opname"
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
import { useRouter } from 'vue-router'

const style = useStyledStore()

const table = UseFarmasiStokTable()
const store = UseFarmasiStokStore()
const apps = useAplikasiStore()

const BottomComp = defineAsyncComponent(() => import('./comp/CompBottom.vue'))
const HeaderComp = defineAsyncComponent(() => import('./comp/CompHeader.vue'))
const headerForm = defineAsyncComponent(() => import('./comp/CompHeaderForm.vue'))
const listForm = defineAsyncComponent(() => import('./comp/CompList.vue'))

function openDialog () {
  store.edit = false
  store.setForm('tglopname', table.params.to + ' 23:59:58')
  store.setOpen()
}
const router = useRouter()
function print () {
  const routeData = router.resolve({ path: '/print/opname', query: { kdruang: apps?.user?.kdruangansim, from: table.params.from, to: table.params.to } })
  window.open(routeData.href, '_blank')
}
function tutupOpname () {
  console.log('tutup Opname')
  const form = {
    tglopname: table.params.to + ' 23:59:58'
  }
  table.tutupOpname(form)
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
function simpan () {
  console.log('form', store.form)
  store.simpanFormNew()
}
function batal () {
  store.resetForm()
  console.log('form', store.form)
}
</script>
