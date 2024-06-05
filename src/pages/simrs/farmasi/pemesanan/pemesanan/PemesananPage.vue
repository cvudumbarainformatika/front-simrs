<template>
  <div
    class="fixed-top row no-wrap items-center justify-between q-mx-sm bg-white"
    style="z-index: 10;"
  >
    <div>
      <div class="row items-center">
        <div class="q-mr-md">
          No Pemesanan:
        </div>
        <div class="q-mr-sm">
          {{ store.form.nopenerimaan ? store.form.nopenerimaan :'-' }}
        </div>
        <!-- <app-input
          v-model="store.form.nopemesanan"
          label="Nomor Pemesanan obat"
          outlined
          readonly
          valid
          :loading="store.loading"
        /> -->
        <div class="q-ml-md">
          <q-btn
            v-if="store.form.nopemesanan"
            flat
            icon="icon-mat-done"
            dense
            color="primary"
            @click="store.selesaiDanKunci()"
          >
            <q-tooltip
              class="primary"
              :offset="[10, 10]"
            >
              Selesai dan Kunci Pemesanan
            </q-tooltip>
          </q-btn>
        </div>
      </div>
    </div>
    <div>
      <div class="row items-center no-wrap">
        <div class="q-mr-md">
          Tanggal Pemesanan:
        </div>
        <app-input-date-human
          :model="store.disp.tanggal"
          label="Tanggal"
          outlined
          @set-display="setDispTanggal"
          @db-model="setTanggal"
        />
      </div>
    </div>
    <div>
      <q-btn
        flat
        :icon="!style.componentfull?'icon-mat-open_in_full':'icon-mat-close_fullscreen'"
        round
        :color="style.componentfull?'green':'primary'"
        size="12px"
        class="q-ml-md"
        @click="style.setComponentFull"
      />
    </div>
  </div>
  <!-- perencanaan -->
  <div class="q-mt-lg q-pt-lg">
    <!-- header -->
    <div class="row q-col-gutter-md q-px-sm q-pb-md">
      <div class="col-6">
        <div class="row q-mb-xs">
          <div class="col-12">
            <app-autocomplete-new
              :model="store.form.no_rencbeliobat"
              autocomplete="no_rencbeliobat"
              option-label="no_rencbeliobat"
              option-value="no_rencbeliobat"
              label="Pilih Nomor Rencana Pemesanan"
              outlined
              :source="table.norencanas"
              @on-select="table.rencanaSelected"
              @clear="table.clearRencana"
            />
          </div>
        </div>
        <div class="row q-my-md q-ml-xs">
          <div class="col-6">
            Tanggal Perencanaan
          </div>
          <div class="col-6">
            {{ table.tglRencana? dateFullFormat(table.tglRencana):'-' }}
          </div>
        </div>
      </div>
      <div class="col-6">
        <div class="row items-center no-wrap">
          <div class="col-12">
            <app-autocomplete-debounce-input
              ref="refPbf"
              v-model="store.form.kdpbf"
              label="Penyedia"
              autocomplete="nama"
              option-label="nama"
              option-value="kode"
              outlined
              :loading="store.loadingPihakTiga"
              :source="store.pihakTigas"
              :rules="[
                val => !!val || 'tidak boleh kosong'
              ]"
              @buang="cariPihakTiga"
            />
          </div>
        </div>
      </div>
    </div>
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
          :loading="table.loading"
          :default-btn="false"
          :ada-refresh="false"
          :ada-filter="false"
          :ada-tambah="false"
          :ada-cari="false"
          @set-row="table.setPerPage"
          @goto="table.setPage"
        >
          <!-- @edit-data="store.editData" -->
          <!--
            row-image="image"
            @delete-ids="table.deletesData"
            -->
          <template #col-rencana>
            <div>Perencanaan</div>
          </template>
          <template #col-obat>
            <div>Obat</div>
          </template>
          <template #col-stok>
            <div>Stok</div>
          </template>
          <template #col-jumlah>
            <div>Jumlah</div>
          </template>
          <template #col-centang>
            <div />
          </template>
          <template #cell-rencana="{row}">
            <div class="row justify-between no-wrap">
              <div class="q-mr-xs">
                Nomor
              </div>
              <div class="text-primary text-weight-bold">
                {{ row.noperencanaan }}
              </div>
            </div>
            <div class="row justify-between no-wrap">
              <div class="q-mr-xs">
                tanggal
              </div>
              <div>
                {{ row.tglperencanaan ? dateFullFormat( row.tglperencanaan):'-' }}
              </div>
            </div>
          </template>
          <template #cell-obat="{row}">
            <div class="row justify-between no-wrap">
              <div class="q-mr-xs">
                Kode
              </div>
              <div class="text-deep-purple text-weight-bold">
                {{ row.kdobat }}
              </div>
            </div>
            <div class="row justify-between no-wrap">
              <div class="q-mr-xs">
                Nama
              </div>
              <div class=" text-weight-bold">
                {{ row.namaobat ? row.namaobat:'-' }}
              </div>
            </div>
            <!-- <div v-if="row.mobat"> -->
            <div class="row justify-between no-wrap anu">
              <div class="q-mr-xs">
                Fornas
              </div>
              <div
                class=" text-weight-bold"
                :class=" row.status_fornas === '1' ? 'text-green' : 'text-negative'"
              >
                {{ row.status_fornas==='1' ?'Ya':'Tidak' }}
              </div>
            </div>
            <div class="row justify-between no-wrap anu">
              <div class="q-mr-xs">
                Forkit
              </div>
              <div
                class=" text-weight-bold"
                :class=" row.status_forkid === '1' ? 'text-green' : 'text-negative'"
              >
                {{ row.status_forkid==='1' ?'Ya':'Tidak' }}
              </div>
            </div>
            <div class="row justify-between no-wrap anu">
              <div class="q-mr-xs">
                Generik
              </div>
              <div
                class=" text-weight-bold"
                :class=" row.status_generik === '1' ? 'text-green' : 'text-negative'"
              >
                {{ row.status_generik==='1' ?'Ya':'Tidak' }}
              </div>
            </div>

            <div class="row justify-between no-wrap anu">
              <div class="q-mr-xs">
                Sistem Bayar
              </div>
              <div
                class=" text-weight-bold"
              >
                {{ row.sistembayar }}
              </div>
            </div>
            <!-- </div> -->
          </template>
          <template #cell-stok="{row}">
            <div class="row justify-between no-wrap text-purple">
              <div class="q-mr-xs">
                Gudang
              </div>
              <div class="">
                {{ row.stokgudang }}
              </div>
            </div>
            <div class="row justify-between no-wrap text-cyan">
              <div class="q-mr-xs">
                Seluruh Rumah Sakit
              </div>
              <div class="">
                {{ row.stokrs }}
              </div>
            </div>
            <div class="row justify-between no-wrap text-negative">
              <div class="q-mr-xs">
                Maksimal Rumah Sakit
              </div>
              <div class="">
                {{ row.stomaxkrs }}
              </div>
            </div>
          </template>
          <template #cell-jumlah="{row}">
            <div class="row justify-between no-wrap text-green">
              <div class="q-mr-xs">
                di rencakan
              </div>
              <div class="text-weight-bold">
                {{ row.jumlahdirencanakan }}
              </div>
            </div>
            <div class="row justify-between no-wrap text-green">
              <div class="q-mr-xs">
                sudah dipesan
              </div>
              <div class="text-weight-bold">
                {{ row.jumlahallpesan ? row.jumlahallpesan : 0 }}
              </div>
            </div>
            <div class="row justify-between no-wrap">
              <app-input
                v-model="row.jumlahdipesan"
                label="Jumlah Dipesan"
                outlined
                :disable="row.jumlahdirencanakan<=0"
                :rules="[
                  val=> (val <= row.jumlahdirencanakan) || 'Tidak Boleh Lebih dari Jumlah maksimal dibeli'
                ]"
                @update:model-value="setJumlah($event, row)"
              />
            </div>
          </template>
          <template #cell-centang="{row}">
            <!-- {{ parseFloat(row.jumlahallpesan) }} -->
            <!-- {{ row.jumlahdirencanakan >= parseFloat(row.jumlahallpesan) }} -->
            <div v-if="row.jumlahdirencanakan > 0 && row.bolehdipesan > 0 && (row.jumlahdirencanakan >= (isNaN(parseFloat(row.jumlahallpesan) ? 0: parseFloat(row.jumlahallpesan) )))">
              <q-btn
                flat
                no-caps
                icon-right="icon-mat-send"
                label="Beli"
                color="primary"
                :loading="store.loading && (store.form.kdobat === row.kdobat) && (store.form.noperencanaan === row.noperencanaan)"
                @click="kirimRencana(row)"
              >
                <q-tooltip
                  anchor="top middle"
                  self="center middle"
                >
                  <div class="row">
                    Maksimal Pemesanan {{ row.bolehdipesan }}
                  </div>
                  <div class="row">
                    Rencana Pemesanan {{ row.jumlahdirencanakan }}
                  </div>
                </q-tooltip>
              </q-btn>
            </div>
            <div v-else>
              <div class="row">
                Tidak bisa melakukan pemesanan
              </div>
              <div
                v-if="row.bolehdipesan <= 0"
                class="row"
              >
                Maksimal Pemesanan {{ row.bolehdipesan }}
              </div>
              <div
                v-if="row.jumlahdirencanakan > 0"
                class="row"
              >
                Perencanaan {{ row.jumlahdirencanakan }}
              </div>
              <div
                v-if="(row.jumlahdirencanakan <= parseFloat(row.jumlahallpesan))"
                class="row"
              >
                Jumlah Pesanan <strong>sudah sama dengan</strong> / <strong>melebihi</strong>  jumlah Direncanakan
              </div>
            </div>
          </template>
        </app-table>
      </q-card-section>
    </q-card>
  </div>
</template>
<script setup>
import { dateFullFormat } from 'src/modules/formatter'
import { notifErrVue } from 'src/modules/utils'
import { useStyledStore } from 'src/stores/app/styled'
import { usePemesananObatStore } from 'src/stores/simrs/farmasi/pemesanan/pesanan'
import { useTabelPemesananObatStore } from 'src/stores/simrs/farmasi/pemesanan/tabelObat'
import { ref } from 'vue'

const style = useStyledStore()
const store = usePemesananObatStore()
const table = useTabelPemesananObatStore()

function setDispTanggal (val) {
  store.disp.tanggal = val
}
function setTanggal (val) {
  store.setParam('tanggal', val)
  console.log('param ', store.param)
}

function setJumlah (evt, val) {
  const dipesan = !isNaN(parseFloat(evt)) ? (parseFloat(evt) < 0 ? 0 : parseFloat(evt)) : 0
  if (dipesan > val.bolehdipesan) {
    if (val.bolehdipesan > val.jumlahdirencanakan) {
      val.jumlahdipesan = val.jumlahdirencanakan
      notifErrVue('Jumlah Maksimal yang boleh dipesan adalah ' + val.jumlahdirencanakan)
    }
    else {
      notifErrVue('Jumlah Maksimal yang boleh dipesan adalah ' + val.bolehdipesan)
      val.jumlahdipesan = val.bolehdipesan
    }
  }
  else {
    if (dipesan > val.jumlahdirencanakan) {
      val.jumlahdipesan = val.jumlahdirencanakan
      notifErrVue('Jumlah Maksimal yang boleh dipesan adalah ' + val.jumlahdirencanakan)
    }
    else {
      val.jumlahdipesan = dipesan
    }
  }
}

function cariPihakTiga (val) {
  console.log('cari pihak tiga', val)
  store.namaPihakKetiga = val
  store.getPihakKetiga()
}
const refPbf = ref(null)
function kirimRencana (val) {
  if (refPbf.value.$refs.refAuto.validate()) {
    store.kirimRencana(val).then(() => {
      table.getObatMauBeli().then(() => {
        table.rencanaSelected(store.form.no_rencbeliobat)
      })
    })
  }
}

table.getInitialData()
store.getInitialData()
</script>
<style lang="scss" scoped>

.anu:hover{
  background-color: #87e9df;
}
</style>
