<template>
  <div class="q-mr-sm" style="white-space: normal !important;">
    <app-table-extend
      :columns="store.columns"
      :column-hide="store.columnHide"
      :items="store.items"
      :meta="store.meta"
      :per-page="store.params.per_page"
      :loading="store.loading"
      :to-search="store.params.cari"
      :click-able="true"
      :default-btn="false"
      :ada-tambah="false"
      :ada-filter="false"
      row-no
      use-full
      @find="store.setSearch"
      @goto="store.setPage"
      @set-row="store.setPerPage"
      @refresh="store.refreshTable"
      @on-click="onClick"
    >
      <template #header-left-after-search>
        <div class="q-ml-sm row">
          <div class="col-auto q-ml-sm">
            <q-btn
              outline
              color="white"
              class="bg-primary"
              no-caps
            >
              <div class="flex items-center q-mx-xs">
                <div class="f-12 q-mr-sm">
                  {{ store.header.periode }}
                </div>
                <transition>
                  <q-icon
                    :name="`${showMenuPeriode?'icon-mat-keyboard_arrow_up':'icon-mat-keyboard_arrow_down'}`"
                    size="16px"
                  />
                </transition>
              </div>

              <q-menu
                @show="showMenuPeriode=true"
                @hide="showMenuPeriode=false"
              >
                <div class="row no-wrap q-pa-sms">
                  <q-list style="min-width: 100px">
                    <q-item
                      v-for="item in store.periods"
                      :key="item"
                      clickable
                      :active="item === store.header.periode"
                      active-class="bg-primary text-white"
                      :disable="item === 'Custom'"
                      @click="store.setPeriode(item)"
                    >
                      <q-item-section>{{ item }}</q-item-section>
                    </q-item>
                  </q-list>
                  <q-separator
                    vertical
                    inset
                  />

                  <div class="column">
                    <div class="row q-pa-sm q-col-gutter-sm">
                      <div class="col">
                        <q-date
                          v-model="store.params.from"
                          minimal
                          bordered
                          flat
                          mask="YYYY-MM-DD"
                          @update:model-value="store.setPeriode('Custom')"
                        />
                        <div class="f-10 text-grey-8 q-mt-xs">
                          DARI TANGGAL : <b>{{ store.params.from }}</b>
                        </div>
                      </div>
                      <div class="col">
                        <q-date
                          v-model="store.params.to"
                          minimal
                          bordered
                          flat
                          mask="YYYY-MM-DD"
                          @update:model-value="store.setPeriode('Custom')"
                        />
                        <div class="f-10 text-grey-8 q-mt-xs">
                          SAMPAI TANGGAL : <b>{{ store.params.to }}</b>
                        </div>
                      </div>
                    </div>
                    <q-separator />
                    <div class="row q-pa-sm justify-end">
                      <q-btn
                        v-close-popup
                        color="primary"
                        label="Terapkan"
                        push
                        size="sm"
                        @click="store.cariRencanaBeli"
                      />
                    </div>
                  </div>
                </div>
              </q-menu>
            </q-btn>
          </div>
        </div>
      </template>
    </app-table-extend>
  </div>
</template>
<script setup>
import { useListPengembalianPinjamanStore } from 'src/stores/simrs/farmasi/pengembalian/listpengembalian'
import { onMounted } from 'vue'

const store = useListPengembalianPinjamanStore()

// click
function onClick (val) {
  // console.log('click', val)
  val.item.expand = !val.item.expand
  val.item.highlight = !val.item.highlight
}
onMounted(() => {
  store.getInitialData()
})
</script>
