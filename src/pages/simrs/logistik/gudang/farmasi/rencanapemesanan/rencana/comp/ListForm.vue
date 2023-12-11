<template>
  <!-- perencanaan -->
  <div class="q-mt-lg q-pt-lg">
    <q-card>
      <q-card-section>
        <app-table
          title="obat"
          :columns="table.columns"
          :column-hide="table.columnHide"
          :items="table.items"
          :meta="table.meta"
          :per-page="table.params.per_page"
          :order-by="table.params.order_by"
          :sort="table.params.sort"
          :loading="table.loading || store.loading"
          :to-search="table.params.q"
          :default-btn="false"
          :ada-paginasi="false"
          :ada-cari="false"
          :ada-refresh="false"
          :ada-per-page="false"
          :ada-filter="false"
          :ada-tambah="false"
          @find="table.setSearch"
        >
          <!-- @edit-data="store.editData" -->
          <!--
            row-image="image"
            @delete-ids="table.deletesData"
            -->
          <template #col-obat>
            <div>Obat</div>
          </template>
          <template #col-stok>
            <div>Stok</div>
          </template>
          <template #col-pabrikan>
            <div>Penyedia</div>
          </template>
          <template #col-jumlah>
            <div>Jumlah</div>
          </template>
          <template #col-centang>
            <div>Beli</div>
          </template>
          <template #cell-obat="{row}">
            <div class="row no-wrap text-weight-bold text-green">
              {{ row.kd_obat }}
            </div>
            <div class="row text-weight-bold text-amber-10 box text-right no-wrap items-center">
              {{ row.nama_obat }}
            </div>
            <div class="row text-weight-bold no-wrap text-italic f-10">
              ( {{ row.satuan_k ? row.satuan_k :'-' }} )
            </div>
            <div class="row justify-start no-wrap q-my-xs">
              <div
                class="text-weight-bold"
                :class="row.status_fornas === '1'?'text-green':'text-negative'"
              >
                {{ row.status_fornas==='1' ?'Fornas':'Non-Fornas' }}
              </div>
              <div
                class="text-weight-bold q-ml-sm"
                :class="row.status_forkid === '1'?'text-green':'text-negative'"
              >
                {{ row.status_forkid==='1' ?'Forkit':'Non-Forkit' }}
              </div>
              <div
                class="text-weight-bold q-ml-sm"
                :class="row.status_generik === '1'?'text-green':'text-negative'"
              >
                {{ row.status_generik==='1' ?'Generik':'Non-Generik' }}
              </div>
            </div>
            <div class="row justify-start no-wrap q-my-xs">
              <div
                class="text-weight-bold"
                :class="row.gudang === 'Gd-03010100'?'text-blue':(row.gudang === 'Gd-05010100'?'text-primary':'text-green')"
              >
                {{ row.gudang==='Gd-03010100' ?'Gudang Floor Stok':(row.gudang === 'Gd-05010100'?'Gudang Kamar Obat':'Semua gudang') }}
              </div>
            </div>
          </template>
          <template #cell-stok="{row}">
            <div
              v-if="!store.form.kd_ruang || store.form.kd_ruang==='Gd-03010100'"
              class="row justify-between no-wrap "
              :class="row.stokGudangFs > 0 ? 'text-brown' : ''"
            >
              <div class="q-mr-xs">
                Gudang FS
              </div>
              <div class="">
                {{ row.stokGudangFs }}
              </div>
            </div>
            <div
              v-if="row.stokMaxGudangFs > 0 && (!store.form.kd_ruang || store.form.kd_ruang==='Gd-03010100')"
              class="row justify-between no-wrap "
              :class="row.stokMaxGudangFs > 0 ? 'text-purple' : ''"
            >
              <div class="q-mr-xs">
                Maksimal Gudang FS
              </div>
              <div>
                {{ row.stokMaxGudangFs }}
              </div>
            </div>
            <q-separator
              v-if="!store.form.kd_ruang || store.form.kd_ruang==='Gd-03010100'"
              class="q-my-xs"
            />
            <div
              v-if="!store.form.kd_ruang || store.form.kd_ruang==='Gd-05010100'"
              class="row justify-between no-wrap "
              :class="row.stokGudangKo > 0 ? 'text-brown' : ''"
            >
              <div class="q-mr-xs">
                Gudang KO
              </div>
              <div class="">
                {{ row.stokGudangKo }}
              </div>
            </div>

            <div
              v-if="row.stokMaxGudangKo > 0 && (!store.form.kd_ruang || store.form.kd_ruang==='Gd-05010100')"
              class="row justify-between no-wrap "
              :class="row.stokMaxGudangKo > 0 ? 'text-purple' : ''"
            >
              <div class="q-mr-xs">
                Maksimal Gudang KO
              </div>
              <div>
                {{ row.stokMaxGudangKo }}
              </div>
            </div>
            <q-separator
              v-if="!store.form.kd_ruang || store.form.kd_ruang==='Gd-05010100'"
              class="q-my-xs"
            />
            <div
              class="row justify-between no-wrap "
              :class="row.stokGudang > 0 ? 'text-brown' : ''"
            >
              <div class="q-mr-xs">
                Gudang
              </div>
              <div class="">
                {{ row.stokGudang }}
              </div>
            </div>
            <div
              class="row justify-between no-wrap "
              :class="row.stokRS > 0 ? 'text-orange' : ''"
            >
              <div class="q-mr-xs">
                Seluruh Rumah Sakit
              </div>
              <div>
                {{ row.stokRS }}
              </div>
            </div>
            <div
              class="row justify-between no-wrap "
              :class="row.stokMaxRS > 0 ? 'text-purple' : ''"
            >
              <div class="q-mr-xs">
                Maksimal Rumah Sakit
              </div>
              <div>
                {{ row.stokMaxRS }}
              </div>
            </div>
          </template>
          <template #cell-pabrikan="{row}">
            <div v-if="row.stokrealgudang.length">
              nanti isinya pabrikan
            </div>
            <div v-else>
              -
            </div>
          </template>
          <template #cell-jumlah="{row}">
            <div
              class="row justify-between no-wrap text-weight-bold"
              :class="row.bisaBeli>0?'text-green':'text-negative'"
            >
              <div class="q-mr-xs">
                Maksimal Direncanakan
              </div>
              <div>
                {{ row.bisaBeli }}
              </div>
            </div>
            <div
              class="row justify-between no-wrap"
              :class="row.sudahDirencanakan > 0 ? 'text-cyan' : ''"
            >
              <div class="q-mr-xs">
                sudah Direncanakan
              </div>
              <div>
                {{ row.sudahDirencanakan }}
              </div>
            </div>
            <div class="row justify-between no-wrap">
              <app-input
                v-model="row.jumlahBeli"
                label="Jumlah Direncanakan"
                color="green"
                outlined
                :disable="row.bisaBeli<=0"
                :rules="[
                  val=> (val <= row.bisaBeli) || 'Tidak Boleh Lebih dari Jumlah maksimal dibeli'
                ]"
                @update:model-value="setJumlah($event, row)"
              />
            </div>
          </template>
          <template #cell-centang="{row}">
            <div v-if="row.bisaBeli>0">
              <!-- <q-checkbox
                v-model="row.checked"
                dense
              /> -->
              <q-btn
                flat
                no-caps
                icon-right="icon-mat-send"
                label="kirim"
                color="primary"
                :loading="store.loading && (store.form.kd_obat === row.kd_obat)"
                @click="store.kirimRencana(row)"
              />
            </div>
            <div v-else>
              Tidak bisa melakukan perencanaan
            </div>
          </template>
        </app-table>
      </q-card-section>
    </q-card>
  </div>
</template>
<script setup>
import { useRencanaPemesananObatStore } from 'src/stores/simrs/farmasi/pemesanan/rencana'
import { useTabelObatDirencanakaStore } from 'src/stores/simrs/farmasi/pemesanan/tabelObatRencana'

const table = useTabelObatDirencanakaStore()
const store = useRencanaPemesananObatStore()

function setJumlah(evt, val) {
  const beli = !isNaN(parseFloat(evt)) ? (parseFloat(evt) < 0 ? 0 : parseFloat(evt)) : 0
  val.jumlahBeli = beli
}

</script>
