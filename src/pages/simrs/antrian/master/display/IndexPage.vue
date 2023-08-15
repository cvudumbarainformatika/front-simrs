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
            row-image="image"
            @set-row="store.setPerPage"
            @goto="store.setPage"
            @search="store.enterSearch"
            @find="store.setSearch"
            @refresh="store.refreshTable"
            @new-data="form.addNew()"
            @edit-data="(val)=>form.editData(val)"
            @delete="(id)=>store.deletesData(id)"
          >
            <!-- <template #header-left-after-search>
              <div class="q-ml-sm">
                <app-btn
                  label="Sync Simrs & Bpjs"
                  :loading="store.loading"
                  @click="store.synch()"
                />
              </div>
            </template> -->
            <template #col-nama="{left}">
              <div :class="`${left}`">
                Nama Display
              </div>
            </template>
            <template #col-kode="{left}">
              <div :class="`${left}`">
                Kode
              </div>
            </template>

            <template #cell-default-img="{row}">
              <q-avatar
                color="secondary"
                text-color="white"
                size="sm"
                class="cursor-pointer"
              >
                {{ row.kode }}
              </q-avatar>
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
import { useMasterDisplayStore } from 'src/stores/antrian/master/display'
import { useMasterDisplayFormStore } from 'src/stores/antrian/master/display/form'
import { onMounted, ref } from 'vue'
import FormDialogInput from './FormDialogInput.vue'

const store = useMasterDisplayStore()
const form = useMasterDisplayFormStore()

const formRef = ref()
// console.log(form)

onMounted(() => {
  store.getDataTable()
})

function saveForm(ref) {
  console.log(ref)
  // console.log(form.form)
  form.saveForm().then(() => {
    store.getDataTable()
    formRef.value.resetForm()
  })
}
</script>
