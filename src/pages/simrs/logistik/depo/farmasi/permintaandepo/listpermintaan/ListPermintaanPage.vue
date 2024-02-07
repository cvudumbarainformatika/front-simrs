<template>
  <!-- <div
    class="fixed-top row items-center justify-end q-mr-sm"
    style="z-index: 10;"
  >
    <div>
      <q-btn
        flat
        :icon="!style.componentfull ? 'icon-mat-open_in_full' : 'icon-mat-close_fullscreen'"
        round
        :color="style.componentfull ? 'green' : 'primary'"
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
      :to-search="store.param.no_permintaan"
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
      <template #col-no_permintaan>
        <div>Nomor Permintaan</div>
      </template>
      <template #col-tgl_permintaan>
        <div>Tanggal</div>
      </template>
      <template #col-dari>
        <div>Dari</div>
      </template>
      <template #col-tujuan>
        <div>Tujuan</div>
      </template>
      <template #col-flag>
        <div class="text-center">
          Status
        </div>
      </template>
      <template #cell-tgl_permintaan="{ row }">
        <div class="row items-center justify-between no-wrap q-mb-xs">
          <div class="">
            {{ row.tgl_permintaan ? dateFullFormat(row.tgl_permintaan) : '-' }}
          </div>
        </div>
      </template>
      <template #cell-flag="{ row }">
        <q-chip
          class="f-12"
          :color="color(row.flag)"
          text-color="white"
          :label="label(row.flag)"
        />
      </template>
      <template #cell-dari="{ row }">
        {{ row?.asal?.nama }}
      </template>
      <template #cell-tujuan="{ row }">
        {{ row?.menuju?.nama }}
      </template>
      <template #expand="{ row }">
        <div v-if="row.permintaanrinci.length">
          <div class="row items-center text-weight-bold">
            <div class="col-4">
              Obat
            </div>
            <div class="col-2">
              Jumlah
            </div>
          </div>
          <div
            v-for="(rin, i) in row.permintaanrinci"
            :key="i"
          >
            <div class="row items-center q-col-gutter-sm anu">
              <div class="col-4">
                <div class="row justify-between no-wrap">
                  <div class="q-mr-sm">
                    Kode
                  </div>
                  <div class="text-weight-bold text-primary">
                    {{ rin.kdobat }}
                  </div>
                </div>
                <div class="row justify-between no-wrap items-center">
                  <div class="q-mr-sm">
                    Nama
                  </div>
                  <div
                    class="text-weight-bold text-primary text-right"
                    style="white-space: normal;"
                  >
                    {{ rin.masterobat ? rin.masterobat.nama_obat : '-' }}
                  </div>
                </div>
                <div class="row justify-between no-wrap">
                  <div class="q-mr-sm">
                    satuan
                  </div>
                  <div class="text-weight-bold text-deep-purple">
                    {{ rin.masterobat ? rin.masterobat.satuan_k : '-' }}
                  </div>
                </div>
              </div>
              <div class="col-2">
                <div class="row justify-between no-wrap">
                  <div class="q-mr-sm">
                    Minta
                  </div>
                  <div class="text-weight-bold">
                    {{ rin.jumlah_minta }}
                  </div>
                </div>
                <div class="row justify-between no-wrap">
                  <div class="q-mr-sm">
                    Disetujui
                  </div>
                  <div class="text-weight-bold">
                    {{ rin.jumlah_disetujui? rin.jumlah_disetujui:'-' }}
                  </div>
                </div>
                <div class="row justify-between no-wrap">
                  <div class="q-mr-sm">
                    Maks Stok
                  </div>
                  <div class="text-weight-bold">
                    {{ rin.mak_stok? rin.mak_stok:'-' }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          Tidak ada Rincian
        </div>
      </template>
      <template #left-acttion="{ row }">
        <div v-if="!row.flag">
          <q-btn
            flat
            icon="icon-mat-lock_open"
            dense
            color="green"
            :loading="permintaan.loadingKunci && row.no_permintaan === toloadBeli"
            @click="kunci(row)"
          >
            <q-tooltip
              class="primary"
              :offset="[10, 10]"
            >
              Permintaan Depo sudah selesai dan siap di kunci
            </q-tooltip>
          </q-btn>
        </div>
        <div v-if="row.flag">
          <div class="row items-center">
            <div class="q-mr-sm" />
            <div>
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
                  Permintaan Depo sudah di kunci
                </q-tooltip>
              </q-btn>
            </div>
          </div>
        </div>
      </template>
    </app-table-extend>
  </div>
</template>
<script setup>
import { dateFullFormat } from 'src/modules/formatter'
import { notifSuccessVue } from 'src/modules/utils'
import { useAplikasiStore } from 'src/stores/app/aplikasi'
import { useListPermintaanStore } from 'src/stores/simrs/farmasi/permintaandepo/listpermintaan'
import { useFarmasiPermintaanDepoStore } from 'src/stores/simrs/farmasi/permintaandepo/permintaandepo'
import { ref, onMounted, watch } from 'vue'

const store = useListPermintaanStore()
const permintaan = useFarmasiPermintaanDepoStore()
const apps = useAplikasiStore()
onMounted(() => {
  store.setParam('kddepo', apps?.user?.kdruangansim)
  store.getInitialData()
})
watch(() => apps?.user?.kdruangansim, (obj) => {
  store.setParam('kddepo', obj)
  store.getInitialData()
})
// click
function onClick (val) {
  // console.log('click', val)
  val.item.expand = !val.item.expand
  val.item.highlight = !val.item.highlight
}

function info (val) {
  val.expand = !val.expand
  val.highlight = !val.highlight
  notifSuccessVue('Penerimaan nomor ' + val.no_permintaan + ' Sudah dikunci dan dapat dilakukan Penerimaan')
}
const toloadBeli = ref('')
function kunci (val) {
  val.expand = !val.expand
  val.highlight = !val.highlight
  toloadBeli.value = val.no_permintaan
  permintaan.kunci(val.no_permintaan).then(() => {
    toloadBeli.value = ''
    if (!val.flag) val.flag = 1
  })
}

function color(val) {
  switch (val) {
    case '':
      return 'grey'
      // eslint-disable-next-line no-unreachable
      break
    case '1':
      return 'cyan'
      // eslint-disable-next-line no-unreachable
      break
    case '2':
      // return 'grey'
      return 'blue'
      // eslint-disable-next-line no-unreachable
      break
    case '3':
      // return 'grey'
      return 'orange'
      // eslint-disable-next-line no-unreachable
      break
    case '4':
      // return 'grey'
      return 'purple'
      // eslint-disable-next-line no-unreachable
      break

    default:
      return 'red'
      // eslint-disable-next-line no-unreachable
      break
  }
}
function label (val) {
  switch (val) {
    case '':
      return 'Draft'
      // eslint-disable-next-line no-unreachable
      break
    case '1':
      return 'Dikirim Ke Gudang'
      // eslint-disable-next-line no-unreachable
      break
    case '2':
      // return 'grey'
      return 'Sudah Diverif'
      // eslint-disable-next-line no-unreachable
      break
    case '3':
      // return 'grey'
      return 'Sudah Di distribusikan'
      // eslint-disable-next-line no-unreachable
      break
    case '4':
      // return 'grey'
      return 'Diterima Depo'
      // eslint-disable-next-line no-unreachable
      break

    default:
      return 'status belum ditentukan'
      // eslint-disable-next-line no-unreachable
      break
  }
}
</script>
<style lang="scss" scoped>
.anu {
  margin-top: 2px;
  margin-bottom: 2px;
}

.anu:hover {
  background-color: #87e9df;
}
</style>
