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
            <template #header-left-after-search>
              <div class="q-ml-sm">
                <app-btn
                  label="Sync Simrs & Bpjs"
                  :loading="store.loading"
                  @click="store.synch()"
                />
              </div>
            </template>
            <template #col-nama="{left}">
              <div :class="`${left}`">
                Kode / Nama
              </div>
            </template>
            <template #col-max="{right}">
              <div :class="`${right}`">
                Kuota NonJkn
              </div>
            </template>
            <template #col-max_ol="{right}">
              <div :class="`${right}`">
                Kuota JKN
              </div>
            </template>
            <template #cell-nama="{row}">
              <div class="text-left">
                {{ row.kode_simrs }}
              </div>
              <div class="text-left text-weight-bold">
                {{ row.nama }}
              </div>
            </template>
            <template #cell-max="{row}">
              <div class="text-right">
                {{ row.max_of }}
              </div>
            </template>
            <template #cell-max_ol="{row}">
              <div class="text-right">
                {{ row.max_ol }}
              </div>
            </template>
            <template #cell-default-img="{row}">
              <q-avatar
                color="primary"
                text-color="white"
                size="lg"
                class="cursor-pointer"
                :class="row.nama.substring(0,1)=== 'P'? 'bg-negative':'bg-primary'"
              >
                {{ row.nama.substring(0,1) }}
                <q-menu>
                  <div class="row no-wrap q-pa-md">
                    <div class="column items-center">
                      <div class="text-h6 q-mb-md">
                        Detail Poli
                      </div>
                      <q-avatar
                        color="primary"
                        text-color="white"
                        size="lg"
                        class="cursor-pointer"
                        :class="row.nama.substring(0,1)=== 'P'? 'bg-negative':'bg-primary'"
                      >
                        {{ row.nama.substring(0,1) }}
                      </q-avatar>
                      <div class=" q-mt-md">
                        {{ row.nama }}
                      </div>
                    </div>
                    <q-separator
                      vertical
                      inset
                      class="q-mx-lg"
                    />
                    <div class="column">
                      <div class="f-14 text-weight-bold q-mb-md">
                        Detail Poli BPJS
                      </div>
                      <q-separator class="q-mb-sm" />
                      <div>
                        Kode : <span class="text-weight-bold">{{ row.poli_bpjs? row.poli_bpjs.kode:'-' }}</span>
                      </div>
                      <div>
                        Nama : <span class="text-weight-bold">{{ row.poli_bpjs? row.poli_bpjs.nama:'-' }}</span>
                      </div>
                      <q-separator class="q-my-md" />
                      <div class="f-14 text-weight-bold q-mb-md">
                        Pencarian yang ditemukan Bpjs
                      </div>
                      <q-list
                        v-if="row.referensi_poli_bpjs.length>0"
                        dense
                        bordered
                        padding
                        class="rounded-borders"
                        separator
                      >
                        <q-item
                          v-for="(item,i) in row.referensi_poli_bpjs"
                          :key="i"
                        >
                          <q-item-section>
                            {{ item.nama }}
                          </q-item-section>
                          <q-item-section side>
                            {{ item.kode }}
                          </q-item-section>
                        </q-item>
                      </q-list>
                      <div v-else>
                        Data tidak ditemukan
                      </div>
                    </div>
                  </div>
                </q-menu>
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
      <app-input
        v-model="form.form.kode_simrs"
        label="Kode Unit"
        outlined
        class="q-my-sm"
      />
      <app-input
        v-model="form.form.nama"
        label="Nama Unit"
        outlined
        class="q-my-sm"
      />
      <app-input
        v-model="form.form.max_of"
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
