<template>
  <div>
    <q-card>
      <q-card-section>
        <div class="f-14 text-weight-bold">
          Distribusi Depo
        </div>
        <div class="title-desc">
          Halaman Distribusi ke Depo
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <div class="row items-center">
          <div class="col-2 q-mr-sm">
            Nomor Distribusi
          </div>
          <div class="col">
            {{ store.form.no_distribusi?store.form.no_distribusi:'-' }}
          </div>
        </div>
        <div class="row items-center q-mb-xs">
          <div class="col-2 q-mr-sm">
            Tanggal
          </div>
          <div class="col">
            <app-input-date-human
              :model="store.display.tanggal"
              label="dari tanggal"
              :loading="store.loading"
              @db-model="setTanggal"
              @set-display="setTanggalDisp"
            />
            <!-- {{ store.form.no_distribusi?store.form.no_distribusi:'-' }} -->
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <app-table-coba-coba
          title="Data Distribusi"
          :columns="store.columns"
          :column-hide="store.columnHide"
          :items="store.items"
          :meta="store.meta"
          :per-page="store.params.per_page"
          :order-by="store.params.order_by"
          :sort="store.params.sort"
          :loading="store.loading"
          :to-search="store.params.q"
          row-no
          :ada-tambah="false"
          :ada-edit="false"
          :ada-delete="false"
          :click-able="true"
          @goto="store.setPage"
          @set-row="store.setPerPage"
          @refresh="store.refreshTable"
          @find="store.setSearch"
          @set-order="store.setOder"
          @new-data="store.newData"
          @edit-data="store.editData"
          @delete="store.deletesData"
          @on-click="onClick"
        >
          <template #header-left-after-search>
            <!-- <div class="row q-col-guttes-sm q-ml-sm">
              <div class="q-col">
                <app-input
                  v-model="store.params.r"
                  label="cari ruangan"
                  outlined
                  valid
                  icon="icon-mat-search"
                  debounce="1000"
                  :loading="store.loading"
                  @update:model-value="store.searchRuangan"
                />
              </div>
              <div class="col cursor-pointer">
                <q-chip
                  class="f-12"
                  :color="color(store.paramStatus.value)"
                  :text-color="store.paramStatus.value===99?'dark':'white'"
                  :label="label(store.paramStatus.value,store.paramStatus.nama)"
                />
                <q-menu
                  transition-show="jump-down"
                  transition-hide="jump-up"
                  anchor="center middle"
                  self="center middle"
                  :offset="[-50, 0]"
                >
                  <q-list>
                    <q-item
                      v-for="(item,i) in store.statuses"
                      :key="i"
                      v-close-popup
                      style="min-width:250px"
                      clickable
                      :style="(item.value===99? 'color:black; ': 'color:white; ')+ 'background-color:'+color(item.value)+';'"
                      @click="store.setParamStatus(item)"
                    >
                      <q-item-section>
                        {{ item.nama }}
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </div>
            </div> -->
          </template>
          <template #col-tanggal>
            Tanggal
          </template>
          <template #cell-tanggal="{row}">
            {{ dateFullFormat(row.tanggal) }}
          </template>
          <template #col-no_penerimaan>
            Nomor Penerimaan
          </template>
          <template #col-kontrak>
            Nomor kontrak
          </template>
          <template #col-faktur>
            Nomor Faktur
          </template>
          <template #col-perusahaan>
            Nama Perusahaan
          </template>
          <template #cell-perusahaan="{row}">
            {{ row.perusahaan?row.perusahaan.nama:'-' }}
          </template>
          <template #cell-no_penerimaan="{row}">
            <div class="box">
              <div class="">
                <p>
                  {{ row.no_penerimaan }}
                </p>
              </div>
            </div>
          </template>
          <template #expand="{row}">
            <div v-if="row.details.length">
              <!-- {{ row.details }} -->
              <div class="row items-start text-weight-bold">
                <div class="col-3">
                  <div class="row">
                    <div class="col-1">
                      No
                    </div>
                    <div class="col-11">
                      Nama Barang
                    </div>
                  </div>
                </div>
                <div class="col-2">
                  Depo
                </div>
                <div class="col-1">
                  Jumlah
                </div>
                <div class="col-1">
                  Harga
                </div>
                <div class="col-1">
                  Subtotal
                </div>
                <div class="col-2">
                  <app-btn
                    v-if="row.canSave"
                    label="Distribusikan"
                    flat
                    icon-right="icon-mat-send"
                    @click="kirimPemesanan(row)"
                  />
                  <div v-else>
                    Barang ini Milik depo mana?
                  </div>
                </div>
              </div>
              <div
                v-for="(det,i) in row.details"
                :key="i"
                class="row items-center"
              >
                <div class="col-3">
                  <div class="row">
                    <div class="col-1">
                      {{ i+1 }}
                    </div>
                    <div class="col-11">
                      {{ det.nama_barang }}
                    </div>
                  </div>
                </div>
                <div class="col-2">
                  {{ det.depo?det.depo:'tidak ada depo' }}
                </div>
                <div class="col-1">
                  {{ det.qty }}
                </div>
                <div class="col-1">
                  {{ formatDouble(det.harga) }}
                </div>
                <div class="col-1">
                  {{ formatDouble(det.sub_total) }}
                </div>
              </div>
            </div>
            <div v-else>
              Tidak ada Detail
            </div>
          </template>
        </app-table-coba-coba>
      </q-card-section>
    </q-card>
  </div>
</template>
<script setup>
import { dateFullFormat, formatDouble } from 'src/modules/formatter'
import { useDistribusiDepoNewStore } from 'src/stores/simrs/logistik/sigarang/transaksi/distribusiDepo/distribusiDepoNew'
const store = useDistribusiDepoNewStore()
store.getInitialData()

// tanggal
function setTanggal(val) {
  store.setForm('tanggal', val)
}
function setTanggalDisp(val) {
  store.display.tanggal = val
}
// click
function onClick(val) {
  console.log('click ', val)
  val.item.expand = !val.item.expand
  val.item.highlight = !val.item.highlight
}
// kirim pesanan
function kirimPemesanan(val) {
  console.log('kirim ', val)
}
</script>
<style scoped>
.q-table td box {
  min-width:2vw;
  max-width:10vw;
  white-space: normal !important;
    inline-size: 100px;
    overflow-wrap: break-word;
}
</style>
