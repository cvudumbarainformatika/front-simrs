<template>
  <div
    class="row no-wrap items-center justify-between q-mx-sm bg-white q-mt-lg q-pt-lg"
    style="z-index: 10;"
  >
    <div>
      <div class="row items-center">
        <div class="q-mr-md">
          No Pemesanan:
        </div>
        <div class="q-mr-sm">
          {{ store.form.nopemesanan ? store.form.nopemesanan :'-' }}
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
          <q-icon
            v-if="store.form.nopemesanan"
            flat
            name="icon-mat-lock"
            color="primary"
            size="sm"
          >
            <q-tooltip
              class="primary"
              :offset="[10, 10]"
            >
              Selesai dan Kunci Pemesanan di List
            </q-tooltip>
          </q-icon>
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
  </div>
  <!-- perencanaan -->
  <div class="q-mt-sm">
    <!-- header -->
    <div class="row q-col-gutter-md q-px-sm ">
      <div class="col-6">
        <div class="row q-mb-md q-ml-xs">
          <div class="col-12">
            <app-input
              v-model="store.form.no_rencbeliobat"
              label="No Penrencanaan"
              outlined
              readonly
              valid
            />
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <app-input-date-human
              :model="table.tglRencana"
              outlined
              disable
              label="Tanggal Perencanaan"
            />
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
              @on-select="selected"
            />
          </div>
        </div>
        <div class="row q-my-md q-ml-xs">
          <div class="col-12">
            <app-input
              v-model="table.gudang"
              label="Direncanakan Oleh"
              outlined
              readonly
            />
          </div>
        </div>
      </div>
    </div>
    <div class="row justify-between items-center q-pb-md">
      <div class="col-auto"></div>
      <div class="col-auto text-right q-mr-md">
        <q-btn 
          icon="icon-mat-done_all"
          size="sm"
          color="negative"
          :loading="store.loadingAnggap"
          :disable="store.loadingAnggap"
          @click="dianggapSelesai()"
         >
          <q-tooltip>
            Rencana Pemesanan Dianggap Selesai
          </q-tooltip>
        </q-btn>
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
          :loading="table.loadingList || table.loading"
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
          <template #col-harga>
            <div>Harga</div>
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
            <div class="row no-wrap text-weight-bold text-green">
              {{ row.kdobat }}
            </div>
            <div class="row text-weight-bold text-amber-10 box text-right no-wrap items-center">
              {{ row.namaobat }}
            </div>
            <div
              v-if="row.satuan_k"
              class="row text-weight-bold no-wrap text-italic f-10"
            >
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
            <!-- <div class="row justify-start no-wrap q-my-xs">
              <div
                class="text-weight-bold"
                :class="row.gudang === 'Gd-03010100'?'text-blue':(row.gudang === 'Gd-05010100'?'text-primary':'text-green')"
              >
                {{ row.gudang==='Gd-03010100' ?'Gudang Floor Stok':(row.gudang === 'Gd-05010100'?'Gudang Kamar Obat':'Semua gudang') }}
              </div>
            </div> -->

            <!-- </div> -->
          </template>
          <template #cell-stok="{row}">
            <div class="row justify-between no-wrap text-purple">
              <div class="q-mr-xs">
                Seluruh Gudang
              </div>
              <div class="">
                {{ row.stokgudang }}
              </div>
            </div>
            <div class="row justify-between no-wrap text-cyan">
              <div class="q-mr-xs">
                Gudang
              </div>
              <div class="">
                {{ row.stokrs }}
              </div>
            </div>
            <div class="row justify-between no-wrap text-negative">
              <div class="q-mr-xs">
                Maksimal Gudang
              </div>
              <div class="">
                {{ row.stomaxkrs }}
              </div>
            </div>
          </template>
          <template #cell-jumlah="{row}">
            <div class="row justify-between no-wrap text-green">
              <div class="q-mr-xs">
                di verif
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
            <div class="row justify-between no-wrap text-negative">
              <div class="q-mr-xs">
                Ditolak
              </div>
              <div class="text-weight-bold">
                {{ row.ditolak ? row.ditolak : 0 }}
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
          <template #cell-harga="{row}">
            <div class="row justify-between no-wrap items-end">
              <app-input
                v-model="row.harga"
                :label="'Harga / ' + row.satuan_k??'-'"
                outlined
                @update:model-value="setHarga($event, row)"
              />
              <!-- <div class="f-10 text-italic">
                ( {{ row.satuan_k ? row.satuan_k :'-' }} )
              </div> -->
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
                :disable="(store.loading && (store.form.noperencanaan === row.noperencanaan)) || parseFloat(row.jumlahdipesan) <= 0"
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
                Perencanaan diverifikasi {{ row.jumlahdirencanakan }}
              </div>
              <div
                v-if="(row.jumlahdirencanakan <= parseFloat(row.jumlahallpesan))"
                class="row"
              >
                Jumlah Pesanan <strong>sudah sama dengan</strong> / <strong>melebihi</strong>  jumlah Diverif
              </div>
            </div>
          </template>
        </app-table>
      </q-card-section>
    </q-card>
  </div>
</template>
<script setup>
import { Dialog } from 'quasar'
import { dateFullFormat } from 'src/modules/formatter'
import { notifErrVue } from 'src/modules/utils'
import { usePemesananObatStore } from 'src/stores/simrs/farmasi/pemesanan/pesanan'
import { useTabelPemesananObatStore } from 'src/stores/simrs/farmasi/pemesanan/tabelObat'
import { ref } from 'vue'

const store = usePemesananObatStore()
const table = useTabelPemesananObatStore()

function selected (val) {
  const current = store?.form?.kdpbf
  console.log(store?.form?.kdpbf)
  console.log(val)
  if (store?.form?.nopemesanan) {
    Dialog.create({
      title: 'KonFirmasi',
      message: 'Anda akan mengganti Penyedia, akan dibuatkan Nomor Pemesanan baru, dan Anda tidak bisa kembali menggunakan Nomor Pemesanan sebelumnya. Apakah akan dilajutkan ?',
      ok: {
        push: true,
        label: 'Lanjut',
        color: 'primary',
        'no-caps': true
      },
      cancel: {
        push: true,
        label: 'Batal',
        color: 'dark',
        'no-caps': true
      }
    })
      .onOk(() => {
        // store.resetForm()
        // store?.form?.nopemesanan=''
        store.setForm('nopemesanan', '')
        store.setForm('kdpbf', val)
      })
      .onCancel(() => {
        store.setForm('kdpbf', current)
      })
  }
}
function setDispTanggal (val) {
  store.disp.tanggal = val
}
function setTanggal (val) {
  store.setParam('tanggal', val)
  console.log('param ', store.param)
}

function setHarga (evt, val) {
  const inc = evt.includes('.')
  const ind = evt.indexOf('.')
  const panj = evt.length
  const nilai = isNaN(parseFloat(evt)) ? 0 : (inc && (ind === (panj - 1)) ? evt : parseFloat(evt))
  // const dipesan = !isNaN(parseFloat(evt)) ? (parseFloat(evt) < 0 ? 0 : parseFloat(evt)) : 0

  val.harga = nilai
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
      // table.getObatMauBeli().then(resp => {
      //   console.log('get obat setelah kirim', resp)
      table.rencanaSelected(store.form.no_rencbeliobat, 'form')
      // if (!resp.length) store.setClose()
      // })
    })
  }
}

// dianggap selesai
function dianggapSelesai(){
  
  Dialog.create({
    title:'Konfirmasi',
    message:'Apakah Rencana Pemesanan Akan Dianggap Selesai?',
    ok:{
      push:true,
      color:'primary',
      label:'Ok',
      'no-caps':true
    },
    cancel:{
      push:true,
      color:'dark',
      label:'Batal',
      'no-caps':true
    }
  })
  .onOk(()=>{
    // console.log(store.form)
    store.anggapSelesaiRencana().then(() => {
      table.rencanaSelected(store.form.no_rencbeliobat, 'form')
    })
  })
}

</script>
<style lang="scss" scoped>

.anu:hover{
  background-color: #87e9df;
}
</style>
