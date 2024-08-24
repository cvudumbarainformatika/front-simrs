<template>
  <app-table-extend
    id="printMe"
    :columns="store.columns"
    :items="store.items"
    :meta="store.meta"
    :per-page="store.params.per_page"
    :loading="store.loading"
    :to-search="store.params.q"
    :default-btn="false"
    :ada-tambah="false"
    :ada-filter="false"
    row-no
    use-full
    text-cari="Cari ..."
    @find="store.setSearch"
    @goto="store.setPage"
    @set-row="store.setPerPage"
    @refresh="store.refreshTable"
  >
    <template #header-left-after-search>
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
                    @click="store.getDataTable()"
                  />
                </div>
              </div>
            </div>
          </q-menu>
        </q-btn>
      </div>
      <div class="col-auto q-ml-sm">
        <div v-if="store.items.length">
          <download-excel
            class="btn"
            :fields="store.fields"
            :fetch="store.fetch"
            :before-generate="store.startDownload"
            :before-finish="store.finishDownload"
            :name="'Pemakaian Obat ' + ' '+ store?.params?.from + ' sd ' + store?.params?.to+'.xls'"
          >
            <app-btn
              color="orange"
              label="Download Excel"
              icon="icon-mat-download"
              push
              :loading="store.loadingDownload"
              :disable="store.loadingDownload"
            />
          </download-excel>
        </div>
      </div>
    </template>
    <!-- col -->
    <template #col-obat>
      <div>Obat</div>
    </template>
    <template #col-jenis_belanja>
      <div>Jenis Belanja</div>
    </template>
    <template #col-kode_108>
      <div>Group Kode Barang</div>
    </template>
    <template #col-harga>
      <div class="row">
        Harga
      </div>
      <div class="row f-8 text-italic">
        * Harga beli berlaku
      </div>
    </template>
    <template #col-pbf>
      <div>PBF</div>
    </template>
    <template #col-stok_awal>
      <div>Stok Awal</div>
    </template>
    <template #col-stok_akhir>
      <div>Stok Akhir</div>
    </template>
    <template #col-masuk>
      <div>Masuk</div>
    </template>
    <template #col-keluar>
      <div>Keluar</div>
    </template>
    <!-- cell -->
    <template #cell-obat="{row}">
      <div class="row f-12 text-weight-bold" style="min-width: 200px; white-space: normal;">
        {{ row?.nama_obat }}
      </div>
      <div class="row f-10 text-italic">
        {{ row?.kd_obat }}
      </div>
      <div class="row f-10 ">
        {{ row?.bentuk_sediaan }}
      </div>
      <div class="row f-10 q-col-gutter-sm text-weight-bold">
        <div v-if="row?.status_forkid==='1'" class="col-auto text-green">
          Forkit
        </div>
        <div v-if="row?.status_fornas==='1'" class="col-auto text-green">
          Fornas
        </div>
        <div v-if="row?.status_generik==='1'" class="col-auto text-green">
          Generik
        </div>
        <div v-if="row?.status_prb==='1'" class="col-auto text-green">
          PRB
        </div>
        <div v-if="row?.status_konsinyasi==='1'" class="col-auto text-orange">
          Konsinyasi
        </div>
        <div v-if="row?.status_kronis==='1'" class="col-auto text-blue">
          Kronis
        </div>
        <div v-if="row?.kelompok_psikotropika==='1'" class="col-auto text-negative">
          Psikotropika
        </div>
      </div>
    </template>
    <template #cell-kode_108="{row}">
      {{ row.kode108 }}
    </template>
    <template #cell-jenis_belanja="{row}">
      {{ row?.kodebelanja?.uraianB }}
    </template>
    <template #cell-harga="{row}">
      <div class="row justify-end">
        {{ formatDouble( row?.harga,2) }}
      </div>
    </template>
    <template #cell-stok_awal="{row}">
      <div class="row justify-end">
        {{ formatDouble( row?.stok_awal,2) }}
      </div>
    </template>
    <template #cell-stok_akhir="{row}">
      <div class="row justify-end">
        {{ formatDouble(row?.stok_akhir,2) }}
      </div>
    </template>
    <template #cell-masuk="{row}">
      <div class="row justify-end">
        {{ formatDouble( row?.masuk,2) }}
      </div>
    </template>
    <template #cell-keluar="{row}">
      <div class="row justify-between no-wrap" style="min-width: 150px; white-space: normal;">
        <div class="col-auto q-mr-sm">
          Umum
        </div>
        <div class="col-auto text-rignt">
          {{ formatDouble( row?.kelUmum,2) }}
        </div>
      </div>
      <div class="row justify-between no-wrap" style="min-width: 150px; white-space: normal;">
        <div class="col-auto q-mr-sm">
          Bpjs
        </div>
        <div class="col-auto text-rignt">
          {{ formatDouble( row?.kelBpjs,2) }}
        </div>
      </div>
      <div class="row justify-between no-wrap" style="min-width: 150px; white-space: normal;">
        <div class="col-auto q-mr-sm">
          Tagihan
        </div>
        <div class="col-auto text-rignt">
          {{ formatDouble( row?.kelTagihan,2) }}
        </div>
      </div>
      <div class="row justify-between no-wrap" style="min-width: 150px; white-space: normal;">
        <div class="col-auto q-mr-sm">
          Sktm
        </div>
        <div class="col-auto text-rignt">
          {{ formatDouble( row?.kelSktm,2) }}
        </div>
      </div>
      <div class="row justify-between no-wrap" style="min-width: 150px; white-space: normal;">
        <div class="col-auto q-mr-sm">
          Lain
        </div>
        <div class="col-auto text-rignt">
          {{ formatDouble( row?.kelLain,2) }}
        </div>
      </div>
    </template>
  </app-table-extend>
</template>
<script setup>
import { formatDouble } from 'src/modules/formatter'
import { useLaporanPemakaianObatStore } from 'src/stores/simrs/laporan/farmasi/pemakaianobat/pemakaian'
import { onMounted, ref } from 'vue'

const store = useLaporanPemakaianObatStore()

const showMenuPeriode = ref(false)

onMounted(() => {
  store.getInitialData()
})
</script>
