<template>
  <!-- <div
    class="fixed-top row items-center justify-end q-mr-sm"
    style="z-index: 10;"
  >
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
  </div> -->
  <div class="q-mx-sm">
    <app-table-extend
      :columns="store.columns"
      :column-hide="store.columnHide"
      :items="store.items"
      :meta="store.meta"
      :per-page="store.param.per_page"
      :loading="store.loading"
      :to-search="store.param.no_rencbeliobat"
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
      <template #col-no_rencbeliobat>
        <div>Nomor Rencana Beli</div>
      </template>
      <template #col-tgl>
        <div>Tanggal</div>
      </template>
      <template #cell-tgl="{row}">
        <div>{{ row.tgl? dateFullFormat( row.tgl) : '-' }}</div>
      </template>
      <template #expand="{row}">
        <div v-if="row.rincian.length">
          <div class="row items-center text-weight-bold">
            <div class="col-3">
              Obat
            </div>
            <div class="col-6">
              <div class="row justify-center">
                Stok
              </div>
              <div class="row">
                <!-- <div class="col-4">
                  Stok Gudang
                </div> -->
                <div class="col-4">
                  Stok RS
                </div>
                <div class="col-4">
                  Stok Max
                </div>
              </div>
            </div>
            <div class="col-2">
              Rencana Beli
            </div>
            <div class="col-1 text-right">
              <div class="q-mr-sm">
                #
              </div>
            </div>
          </div>
          <q-separator />
          <div
            v-for="(rin, i) in row.rincian"
            :key="i"
          >
            <div class="row items-center anu">
              <div class="col-3">
                <div
                  class="row"
                  style="white-space: normal;"
                >
                  {{ rin?.mobat?.nama_obat }}
                </div>
                <div class="row text-italic f-8">
                  {{ rin.kdobat }}
                </div>
              </div>
              <div class="col-6">
                <div class="row">
                  <!-- <div class="col-4">
                    {{ rin.stok_real_gudang }}
                  </div> -->
                  <div class="col-4">
                    {{ rin.stok_real_rs }}
                  </div>
                  <div class="col-4">
                    {{ rin.stok_max_rs }}
                  </div>
                </div>
              </div>
              <div class="col-2">
                <div v-if="!rin.edit">
                  {{ rin.jumlahdirencanakan }}
                </div>
                <div v-if="rin.edit">
                  <q-input
                    ref="refInpJum"
                    v-model="rin.jumlahdirencanakan"
                    label="Jumlah Direncanakan"
                    dense
                    standout="bg-yellow-3"
                    outlined
                    @update:model-value="setJumlah($event, rin)"
                  />
                </div>
              </div>
              <div class="col-1 text-right">
                <div
                  v-if="!row.flag"
                  class="q-mr-sm"
                >
                  <q-btn
                    v-if="!rin.edit"
                    class="q-mr-md"
                    flat
                    icon="icon-mat-delete"
                    dense
                    size="sm"
                    color="negative"
                    :loading="store.loadingHapus && rin.loading"
                    @click="store.hapusRinci(rin, row)"
                  >
                    <q-tooltip
                      class="primary"
                      :offset="[10, 10]"
                    >
                      Hapus Rencana Pembelian
                    </q-tooltip>
                  </q-btn>
                  <q-btn
                    v-if="!rin.edit"
                    round
                    flat
                    icon="icon-mat-edit"
                    size="sm"
                    color="primary"
                    @click="setEdit(row,rin,i)"
                  >
                    <q-tooltip
                      transition-show="flip-right"
                      transition-hide="flip-left"
                    >
                      Edit
                    </q-tooltip>
                  </q-btn>
                  <q-btn
                    v-if="rin.edit"
                    round
                    flat
                    icon="icon-mat-save"
                    size="sm"
                    color="primary"
                    :disable="parseFloat(rin?.jumlahdirencanakan) === parseFloat(rin.prevRenc)"
                    :loading="store.loadingSimpan && rin.loading"
                    @click="simpan(row,rin)"
                  >
                    <q-tooltip
                      transition-show="flip-right"
                      transition-hide="flip-left"
                    >
                      simpan
                    </q-tooltip>
                  </q-btn>
                  <q-btn
                    v-if="rin.edit"
                    round
                    flat
                    icon="icon-mat-cancel"
                    size="sm"
                    color="dark"
                    :loading="store.loadingSimpan && rin.loading"
                    @click="batalEdit(row,rin)"
                  >
                    <q-tooltip
                      transition-show="flip-right"
                      transition-hide="flip-left"
                    >
                      batal edit
                    </q-tooltip>
                  </q-btn>
                </div>
              </div>
            </div>
            <q-separator />
          </div>
        </div>
        <div v-else>
          Tidak ada Rincian
        </div>
      </template>
      <template #left-acttion="{row}">
        <div v-if="!row.flag">
          <q-btn
            class="q-mr-md"
            flat
            icon="icon-mat-add_circle"
            dense
            color="primary"
            :loading="store.loadingHapus && row.loading"
            @click="tambahObat(row)"
          >
            <q-tooltip
              class="primary"
              :offset="[10, 10]"
            >
              Tambah Obat
            </q-tooltip>
          </q-btn>
          <q-btn
            class="q-mr-md"
            flat
            icon="icon-mat-delete"
            dense
            size="sm"
            color="negative"
            :loading="store.loadingHapus && row.loading"
            @click="hapusHeader(row)"
          >
            <q-tooltip
              class="primary"
              :offset="[10, 10]"
            >
              Hapus Rencana Pembelian
            </q-tooltip>
          </q-btn>
          <q-btn
            flat
            icon="icon-mat-lock_open"
            dense
            color="green"
            :loading="rencana.loading && row.no_rencbeliobat=== toloadBeli"
            @click="kunci(row)"
          >
            <q-tooltip
              class="primary"
              :offset="[10, 10]"
            >
              Rencana Pemesanan sudah selesai dan siap di kunci
            </q-tooltip>
          </q-btn>
        </div>
        <div v-if="row.flag">
          <q-btn
            flat
            icon="icon-mat-lock"
            dense
            color="negative"
            @click="info(row)"
          >
            <q-tooltip
              class="primary"
              :offset="[10, 10]"
            >
              Rencana Pemesanan sudah di kunci
            </q-tooltip>
          </q-btn>
          <q-btn
            flat
            icon="icon-mat-print"
            dense
            color="primary"
            @click="viewcetak(row)"
          >
            <q-tooltip
              class="primary"
              :offset="[10, 10]"
            >
              Cetak Rencana Pemesanan
            </q-tooltip>
          </q-btn>
        </div>
      </template>
    </app-table-extend>
  </div>
  <CetakPemesananComp
    ref="refCetakPemesanan"
    v-model="printCetakPemesanan"
  />
</template>
<script setup>
import { dateFullFormat } from 'src/modules/formatter'
import { notifSuccessVue, notifErrVue } from 'src/modules/utils'
// import { useStyledStore } from 'src/stores/app/styled'
import { useListRencanaPemesananStore } from 'src/stores/simrs/farmasi/pemesanan/listrencana'
import { useRencanaPemesananObatStore } from 'src/stores/simrs/farmasi/pemesanan/rencana'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import CetakPemesananComp from './comp/CetakPemesananComp.vue'

// const style = useStyledStore()
const store = useListRencanaPemesananStore()
const rencana = useRencanaPemesananObatStore()

// eslint-disable-next-line no-unused-vars
const emits = defineEmits(['printCetakPemesanan'])

const refCetakPemesanan = ref(null)
const printCetakPemesanan = ref(false)
// click
function onClick (val) {
  console.log(val)
  val.item.expand = !val.item.expand
  val.item.highlight = !val.item.highlight
}
function info(val) {
  console.log(val)
  val.expand = !val.expand
  val.highlight = !val.highlight
  notifSuccessVue('Rencana Pembelian nomor ' + val.no_rencbeliobat + ' Sudah dikunci dan dapat dilakukan Pemesanan')
}
const toloadBeli = ref('')
function kunci(val) {
  val.expand = !val.expand
  val.highlight = !val.highlight
  toloadBeli.value = val.no_rencbeliobat
  rencana.kunci(val.no_rencbeliobat).then(() => {
    toloadBeli.value = ''
    if (!val.flag) val.flag = 1
  })
}
function hapusHeader(val) {
  val.expand = !val.expand
  val.highlight = !val.highlight
  toloadBeli.value = val.no_rencbeliobat
  store.hapusHeader(val)
  // .then(() => {
  //   toloadBeli.value = ''
  //   if (!val.flag) val.flag = 1
  // })
}
function setJumlah(evt, val) {
  const beli = !isNaN(parseFloat(evt)) ? (parseFloat(evt) < 0 ? 0 : parseFloat(evt)) : 0
  const bisaRen = parseFloat(val?.jumlah_bisa_dibeli)

  if (bisaRen < beli) {
    notifErrVue('Maksimal Direncanakan adalah ' + bisaRen)
    val.jumlahdirencanakan = bisaRen
  } else { val.jumlahdirencanakan = beli }
}

const refInpJum = ref(null)
const urutanInp = ref([])
let inpIndex = 0
function setEdit(row, rin, i) {
  rin.edit = true
  rin.prevRenc = rin.jumlahdirencanakan
  const temp = { index: inpIndex, id: rin.id }
  inpIndex = +1
  urutanInp.value.push(temp)
  setTimeout(() => {
    const index = urutanInp.value.findIndex(ind => ind.id === rin.id)
    console.log('ect rin', urutanInp.value, rin, index)
    if (index >= 0) {
      refInpJum.value[index].focus()
      refInpJum.value[index].select()
    }
  }, 200)
}

function simpan(row, rin) {
  console.log('rinci', rin)
  if (parseFloat(rin?.jumlahdirencanakan) <= 0) {
    rin.jumlahdirencanakan = rin.prevRenc
    return notifErrVue('Tidak boleh 0, silahkan hapus obat jika memang tidak adakan direncanakan')
  }

  const index = urutanInp.value.findIndex(ind => ind.id === rin.id)
  urutanInp.value.splice(index, 1)
  inpIndex = urutanInp.value.length - 1

  if (parseFloat(rin?.jumlahdirencanakan) === parseFloat(rin.prevRenc)) {
    rin.edit = false
    return notifErrVue('Tidak ada perubahan, tidak perlu di simpan')
  }
  store.simpan(rin)
    .then(() => {
      rin.edit = false
    })
}
function batalEdit(row, rin) {
  const index = urutanInp.value.findIndex(ind => ind.id === rin.id)
  urutanInp.value.splice(index, 1)
  inpIndex = urutanInp.value.length - 1

  rin.edit = false
}
const router = useRouter()
function tambahObat(val) {
  val.expand = !val.expand
  val.highlight = !val.highlight
  rencana.setForm('no_rencbeliobat', val?.no_rencbeliobat)

  router.push({ path: '/gudang/farmasi/rencanapemesanan/rencana', replace: true })
  console.log('tambah obat', val)
  console.log('router', router)
}

function viewcetak(val) {
  const nomor = val.no_rencbeliobat
  val.expand = !val.expand
  val.highlight = !val.highlight
  printCetakPemesanan.value = true
  rencana.cetaks = []
  rencana.getPesananBynomor(nomor)
}
store.getInitialData()
</script>
<style lang="scss" scoped>
.anu{
  padding-top:2px;
  padding-bottom:2px;
}
.anu:hover{
  background-color: #87e9df;
}
</style>
