<template>
  <q-page>
    <div class="q-pa-lg">
      <q-card class="my-card full-width">
        <q-card-section>
          <div class="full-width row justify-between items-center content-between">
            <div class="col-grow">
              <div
                class="flex flex-column items-center flex-center"
              >
                <div class="col text-left">
                  <div class="f-14 text-weight-bold">
                    {{ store.title }}
                  </div>
                  <div class="title-desc">
                    {{ store.subtitle }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <app-table
            id="printMe"
            title="Rekap Absens Pegawai"
            :columns="store.columns"
            :column-hide="store.columnHide"
            :items="store.items"
            :meta="store.meta"
            :per-page="store.params.per_page"
            :order-by="store.params.order_by"
            :sort="store.params.sort"
            :loading="store.loading"
            :text-size="12"
            :default-btn="true"
            :to-search="store.params.q"
            :ada-tambah="true"
            @set-row="store.setPerPage"
            @goto="store.setPage"
            @search="store.enterSearch"
            @find="store.setSearch"
            @refresh="store.refreshTable"
            @new-data="form.addNew()"
            @edit-data="(val)=>form.editData(val)"
            @delete="(id)=>store.deletesData(id)"
          >
            <template #cell-url="{row}">
              <div style="width:200px;">
                <q-video
                  :key="row.url"
                  fetchpriority="low"
                  :ratio="16/9"
                  :src="previewImage(row.url)"
                />
              </div>
            </template>
          </app-table>
        </q-card-section>
      </q-card>
    </div>

    <!-- dialog form -->
    <app-dialog-form
      ref="formRef"
      v-model="form.dialog"
      :title="form.titleDialog"
      :loading="form.loading"
      @save-form="saveForm(ref)"
    >
      <form-dialog-input />
    </app-dialog-form>
  </q-page>
</template>

<script setup>
import { useVideoStore } from 'src/stores/antrian/master/video'
import { useVideoFormStore } from 'src/stores/antrian/master/video/form'
import { onMounted, ref } from 'vue'
import { notifErrVue } from 'src/modules/utils'
import FormDialogInput from './FormDialogInput.vue'
import { pathImg } from 'src/boot/axios'

const store = useVideoStore()
const form = useVideoFormStore()

const formRef = ref()
// console.log(form)

onMounted(() => {
  store.getDataTable()
})

const previewImage = (vid) => {
  return pathImg + vid
}

function saveForm(ref) {
  // console.log(ref)
  if (form.tempImg === null) {
    return notifErrVue('maaf!, Video Belum dipilih')
  }
  // console.log(form.form)
  form.saveForm().then(() => {
    store.getDataTable()
    formRef.value.resetForm()
  })
}
</script>

<style lang="scss" scoped></style>
