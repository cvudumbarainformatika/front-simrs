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
            <template #header-left-after-search>
              <div class="q-ml-sm">
                ini
              </div>
            </template>
            <template #col-max="{right}">
              <div :class="`${right}`">
                Max Antrian {{ set }}
              </div>
            </template>
            <template #col-max_ol="{right}">
              <div :class="`${right}`">
                Max Antrian OL
              </div>
            </template>
            <template #cell-max="{row}">
              <div class="text-right">
                {{ row.max }}
              </div>
            </template>
            <template #cell-max_ol="{row}">
              <div class="text-right">
                {{ row.max_ol }}
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
      <app-input
        v-model="form.form.nama"
        label="Nama Poli"
        outlined
        class="q-my-sm"
      />
      <app-input
        v-model="form.form.max"
        label="Max Antrian"
        type="number"
        style="width: 40%;"
        outlined
        class="q-my-sm"
      />
      <app-input
        v-model="form.form.max_ol"
        label="Max Antrian OL"
        type="number"
        style="width: 40%;"
        outlined
        class="q-my-sm"
      />
    </app-dialog-form>
  </q-page>
</template>

<script setup>
import { useMasterPoliStore } from 'src/stores/antrian/master/poli'
import { useFormMasterPoliStore } from 'src/stores/antrian/master/poliform'
import { onMounted, ref } from 'vue'

const store = useMasterPoliStore()
const form = useFormMasterPoliStore()

const formRef = ref()
// console.log(form)

onMounted(() => {
  store.getDataTable()
})

function saveForm(ref) {
  console.log(ref)
  form.saveForm().then(() => {
    store.getDataTable()
    formRef.value.resetForm()
  })
}
</script>
