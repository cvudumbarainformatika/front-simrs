<template>
  <div class="q-mr-sm" style="white-space: normal !important;">
    <app-table-extend
      :columns="store.columns"
      :column-hide="store.columnHide"
      :items="store.items"
      :meta="store.meta"
      :per-page="store.params.per_page"
      :loading="store.loading"
      :to-search="store.params.q"
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
      <template #col-nopem>
        <div>Nomor Pengembalian</div>
      </template>
      <template #col-noperkem>
        <div>Nomor Penerimaan Asal</div>
      </template>
      <template #col-pbf>
        <div>Penyedia</div>
      </template>
      <template #col-tgl>
        <div>Tanggal</div>
      </template>
      <template #col-status>
        <div>Status</div>
      </template>
      <template #cell-nopem="{ row }">
        {{ row.nopengembalian ?? '-' }}
      </template>
      <template #cell-noperkem="{ row }">
        {{ row.nopenerimaan_asal ?? '-' }}
      </template>
      <template #cell-pbf="{ row }">
        {{ row.pihakketiga?.nama ?? '-' }}
      </template>
      <template #cell-tgl="{ row }">
        <div class="row justify-between no-wrap">
          <div class="col-auto q-mr-sm">
            Pengembalian
          </div>
          <div class="col-auto text-italic">
            {{ dateFullFormat(row.tgl_pengembalian) ?? '-' }}
          </div>
        </div>
        <div v-if="row.tgl_kunci" class="row justify-between no-wrap">
          <div class="col-auto q-mr-sm">
            Kuci
          </div>
          <div class="col-auto text-italic">
            {{ dateFullFormat(row.tgl_kunci) ?? '-' }}
          </div>
        </div>
      </template>
      <template #left-acttion="{ row }">
        <div
          v-if="row.kunci<=0"
          class="row items-center"
        >
          <q-btn
            class="q-mr-md"
            flat
            icon="icon-mat-add_circle"
            dense
            color="primary"
            :loading="row?.loading"
            :disable="row?.loadingHapus || row?.loading || row?.loadingKunci"
            @click="()=>{
              row.expand = !row.expand
              row.highlight = !row.highlight
              // tambahPenerimaan(row)
              emits('tambah', {
                nopenerimaan:row?.nopenerimaan_asal,
                nopengembalian:row?.nopengembalian,
                kdpbf:row?.kdpbf,
                rincian:row?.rincian,
                tgl_pengembalian:row?.tgl_pengembalian
              })
            }"
          >
            <q-tooltip
              class="primary"
              :offset="[10, 10]"
            >
              Tambah Penerimaan
            </q-tooltip>
          </q-btn>
          <q-btn
            flat
            icon="icon-mat-delete"
            dense
            size="sm"
            color="negative"
            :loading="row?.loadingHapus"
            :disable="row?.loadingHapus || row?.loading || row?.loadingKunci"
            @click="()=>{
              row.expand = !row.expand
              row.highlight = !row.highlight
              Dialog.create({
                title: 'Konfirmasi',
                message: 'Apakah anda yakin ingin menghapus data ini ?',
                ok: {
                  push: true,
                  color: 'negative',
                  label: 'Hapus'
                },
                cancel: {
                  push: true,
                  color: 'dark',
                  label: 'Batal'
                }
              }).onOk(() => {
                store.hapusHeader(row)
              })
            }"
          >
            <q-tooltip
              class="primary"
              :offset="[10, 10]"
            >
              Hapus
            </q-tooltip>
          </q-btn>
          <q-btn
            flat
            icon="icon-mat-lock_open"
            dense
            color="green"
            :loading="row?.loadingKunci"
            :disable="row?.loading || row?.loadingHapus || row?.loadingKunci"
            @click="()=>{
              row.expand = !row.expand
              row.highlight = !row.highlight
              store.kunciPengembalian(row)
            }"
          >
            <q-tooltip
              class="primary"
              :offset="[10, 10]"
            >
              Kunci Pengembalian dan Keluarkan Stok
            </q-tooltip>
          </q-btn>
        </div>
      </template>

      <!-- eslint-disable-next-line vue/no-unused-vars -->
      <template #expand="{ row }">
        <div class="row bg-amber-10 text-white text-weight-bold q-pa-sm f-14 q-mb-sm">
          Rincian Item Dikembalikan
        </div>
        <div class="row bg-dark text-white text-weight-bold q-pa-sm">
          <div class="col-auto" style="width: 5%">
            No
          </div>
          <div class="col-auto" style="width: 10%">
            Kode
          </div>
          <div class="col-auto" style="width: 25%">
            Nama Obat
          </div>
          <div class="col-auto" style="width: 10%">
            Satuan
          </div>
          <div class="col-auto text-right" style="width: calc(40%/3)">
            <div class="q-mr-xs">
              Jumlah Dikembalikan
            </div>
          </div>
          <div class="col-auto text-right" style="width: calc(40%/3)">
            <div class="q-mr-xs">
              Jumlah Stok
            </div>
          </div>
          <div class="col-auto  text-right" style="width: calc(40%/3)">
            <div class="q-mr-xs">
              Harga
            </div>
          </div>
          <div class="col-auto  text-right" style="width: 10%">
            <div class="q-mr-xs">
              #
            </div>
          </div>
        </div>
        <div v-for="(item, i) in row.rincian" :key="i">
          <div class="row q-pa-sm" :class="i%2===1?'bg-amber-4':'bg-amber-2'">
            <div class="col-auto" style="width: 5%">
              {{ i+1 }}
            </div>
            <div class="col-auto" style="width: 10%">
              {{ item?.masterobat?.kd_obat }}
            </div>
            <div class="col-auto" style="width: 25%">
              {{ item?.masterobat?.nama_obat }}
            </div>
            <div class="col-auto" style="width: 10%">
              {{ item?.masterobat?.satuan_k }}
            </div>
            <div class="col-auto text-right" style="width: calc(40%/3)">
              <div class="q-mr-xs">
                {{ formatDouble(parseFloat(item?.jml_dikembalikan),2) }}
              </div>
            </div>
            <div class="col-auto text-right" style="width: calc(40%/3)">
              <div class="q-mr-xs">
                {{ formatDouble(parseFloat(item?.jmlstok),2) }}
              </div>
            </div>
            <div class="col-auto  text-right" style="width: calc(40%/3)">
              <div class="q-mr-xs">
                {{ formatDouble(parseFloat(item?.harga),2) }}
              </div>
            </div>
            <div class="col-auto  text-right" style="width: 10%">
              <div class="q-mr-xs">
                <q-btn
                  flat
                  icon="icon-mat-delete"
                  dense
                  size="sm"
                  color="negative"
                  :loading="item.loadingHapus"
                  :disable="item.loadingHapus"
                  @click="()=>{
                    Dialog.create({
                      title: 'Konfirmasi',
                      message: 'Apakah anda yakin ingin menghapus data ini ?',
                      ok: {
                        push: true,
                        color: 'negative',
                        label: 'Hapus'
                      },
                      cancel: {
                        push: true,
                        color: 'dark',
                        label: 'Batal'
                      }
                    })
                      .onOk(() => {
                        store.hapusRinci(item, row?.id)
                      })
                  }"
                >
                  <q-tooltip
                    class="primary"
                    :offset="[10, 10]"
                  >
                    Hapus
                  </q-tooltip>
                </q-btn>
              </div>
            </div>
          </div>
        </div>
        <!-- {{ row }} -->
      </template>
    </app-table-extend>
  </div>
</template>
<script setup>
import { Dialog } from 'quasar'
import { dateFullFormat, formatDouble } from 'src/modules/formatter'
import { useListPengembalianPinjamanStore } from 'src/stores/simrs/farmasi/pengembalian/listpengembalian'
import { onMounted, ref } from 'vue'

const store = useListPengembalianPinjamanStore()
const showMenuPeriode = ref(false)
const emits = defineEmits(['tambah'])
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
