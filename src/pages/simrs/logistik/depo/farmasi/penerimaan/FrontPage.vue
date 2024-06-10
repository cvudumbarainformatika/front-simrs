<template>
  <div class="q-pa-xs bg-white">
    <div class="row bg-primary text-white q-pa-sm q-mb-sm rouded-border">
      <div class="f-16 text-weight-bold">
        Halaman Penerimaan Depo
      </div>
    </div>
    <app-table-extend
      :columns="store.columns"
      :items="store.items"
      :meta="store.meta"
      :per-page="store.params.per_page"
      :loading="store.loading"
      :to-search="store.params.no_permintaan"
      :click-able="true"
      :default-btn="false"
      :ada-tambah="false"
      :ada-filter="false"
      :ada-cari="false"
      row-no
      use-full
      text-cari="Cari ..."
      @find="store.setSearch"
      @goto="store.setPage"
      @set-row="store.setPerPage"
      @refresh="store.refreshTable"
      @on-click="onClick"
    >
      <!-- @edit-data="store.editData" -->
      <!--
            row-image="image"
            @delete-ids="table.deletesData"
            -->

      <!-- <template #header-left-after-search>
        <div class="q-ml-md text-white">
          <div class="row q-mb-xs q-ml-xs items-center">
            <div class="q-mr-sm">
              Status :
            </div>
            <div class="q-mr-sm">
              <q-radio
                v-model="store.params.jenisdistribusi"
                checked-icon="icon-mat-task_alt"
                unchecked-icon="icon-mat-panorama_fish_eye"
                val="non-konsinyasi"
                label="Non-Konsinyasi"
                keep-color
                color="white"
                :disable="store.loading"
                @update:model-value="store.gantiJenisDistribusi"
              />
            </div>
            <div class="q-mr-sm">
              <q-radio
                v-model="store.params.jenisdistribusi"
                checked-icon="icon-mat-task_alt"
                unchecked-icon="icon-mat-panorama_fish_eye"
                val="konsinyasi"
                label="Konsinyasi"
                keep-color
                color="white"
                :disable="store.loading"
                @update:model-value="store.gantiJenisDistribusi"
              />
            </div>
          </div>
        </div>
      </template> -->
      <template #col-no_permintaan>
        <div>No Pemintaan</div>
      </template>
      <template #col-tgl_permintaan>
        <div>Tanggal Permintaan</div>
      </template>
      <template #col-dari>
        <div>Dari</div>
      </template>
      <template #col-jumlah>
        <div>Jumlah</div>
      </template>
      <template #col-user>
        <div>User Entri</div>
      </template>
      <template #col-act>
        <div>#</div>
      </template>
      <template #cell-tgl_permintaan="{ row }">
        <div class="row justify-between no-wrap">
          {{ row.tgl_permintaan ? dateFullFormat(row.tgl_permintaan):'-' }}
        </div>
      </template>
      <template #cell-no_permintaan="{ row }">
        <div class="row justify-between no-wrap q-mt-xs">
          <div class=" text-weight-bold">
            {{ row.no_permintaan }}
          </div>
        </div>
      </template>
      <template #cell-dari="{ row }">
        <div class="row justify-between no-wrap">
          {{ row.dari?depo(row?.dari) :'-' }}
        </div>
      </template>
      <template #cell-status="{ row }">
        <div class="row">
          <q-chip
            class="f-10"
            :color="color(row.flag)"
            :label="label(row.flag)"
            text-color="white"
          />
        </div>
      </template>
      <template #cell-user="{ row }">
        <div class="row">
          {{ row.user ? row.user.nama : '-' }}
        </div>
      </template>
      <template #cell-act="{ row }">
        <div class="row">
          <div v-if="row.flag==='4'">
            <q-btn
              flat
              icon="icon-mat-lock"
              dense
              color="negative"
              :loading="store.loadingKunci && row.no_permintaan === toloadBeli"
              :disable="store.loadingKunci && row.no_permintaan === toloadBeli"
            >
              <!-- @click="kunci(row)" -->
              <q-tooltip
                class="primary"
                :offset="[10, 10]"
              >
                Sudah diterima
              </q-tooltip>
            </q-btn>
          </div>
          <div v-if="row.flag==='3'">
            <q-btn
              flat
              icon="icon-mat-move_to_inbox"
              dense
              color="primary"
              :loading="store.loadingSimpan && row.no_permintaan === toloadBeli"
              :disable="store.loadingSimpan && row.no_permintaan === toloadBeli"
              @click="kunci(row)"
            >
              <q-tooltip
                class="primary"
                :offset="[10, 10]"
              >
                Terima
              </q-tooltip>
            </q-btn>
          </div>
          <div v-if="row.flag==='1' || row.flag==='4'">
            <q-btn
              round
              icon="icon-mat-print"
              dense
              color="dark"
              size="sm"
              @click="toPrint(row)"
            >
              <q-tooltip
                class="primary"
                :offset="[10, 10]"
              >
                Print
              </q-tooltip>
            </q-btn>
          </div>
          <div
            v-else
            class="text-primary text-weight-bold"
          >
            <q-tooltip
              class="primary"
              :offset="[10, 10]"
            >
              Tidak Ada yang perlu dilakukan
            </q-tooltip>
          </div>
        </div>
      </template>
      <template #expand="{ row }">
        <div v-if="row.permintaanrinci.length">
          <div class="row items-center text-weight-bold">
            <div class="col-3 text-center">
              Obat
            </div>
            <div class="col-3 text-center">
              Stok
            </div>
            <div class="col-3 text-center">
              Jumlah
            </div>
            <div class="col-3 text-right">
              #
            </div>
          </div>
          <q-separator />
          <div
            v-for="(rin, i) in row.permintaanrinci"
            :key="i"
          >
            <div class="row items-center q-col-gutter-sm anu">
              <div class="col-3">
                <div class="row justify-between no-wrap q-mt-xs">
                  <div class="text-deep-purple text-weight-bold">
                    {{ rin.kdobat }}
                  </div>
                </div>
                <div class="row justify-between no-wrap q-mt-xs">
                  <div
                    class=" text-weight-bold"
                    style="white-space: normal;"
                  >
                    {{ rin.masterobat ? rin.masterobat.nama_obat : '-' }}
                  </div>
                </div>
                <div class="row justify-between no-wrap q-mt-xs anu f-10 text-italic">
                  <div class=" text-weight-bold">
                    ({{ rin.masterobat.satuan_k }})
                  </div>
                </div>
                <div class="row no-wrap q-mt-xs anu f-10">
                  <div
                    class="text-weight-bold q-mr-sm"
                    :class="rin.masterobat.status_fornas === '1' ? 'text-green' : 'text-negative'"
                  >
                    {{ rin.masterobat.status_fornas === '1' ? 'Fronas' : 'Non-Fornas' }}
                  </div>
                  <div
                    class=" text-weight-bold  q-mr-sm"
                    :class="rin.masterobat.status_forkid === '1' ? 'text-green' : 'text-negative'"
                  >
                    {{ rin.masterobat.status_forkid === '1' ? 'Forkit' : 'Non-Forkit' }}
                  </div>
                  <div
                    class=" text-weight-bold  q-mr-sm"
                    :class="rin.masterobat.status_generik === '1' ? 'text-green' : 'text-negative'"
                  >
                    {{ rin.masterobat.status_generik === '1' ? 'Generik' : 'Non-Generik' }}
                  </div>
                </div>
                <div class="row f-10 no-wrap q-mt-xs anu">
                  <div
                    class=" text-weight-bold q-mr-sm"
                    :class="rin.masterobat.status_kronis === '1' ? 'text-green' : 'text-negative'"
                  >
                    {{ rin.masterobat.status_kronis === '1' ? 'Kronis' : 'Non-Kronis' }}
                  </div>
                  <div
                    class=" text-weight-bold q-mr-sm"
                    :class="rin.masterobat.status_prb === '1' ? 'text-green' : 'text-negative'"
                  >
                    {{ rin.masterobat.status_prb === '1' ? 'PRB' : 'Non-PRB' }}
                  </div>
                </div>
              </div>
              <div class="col-3">
                <div class="row justify-between no-wrap q-mt-xs text-purple">
                  <div class="q-mr-xs">
                    Depo
                  </div>
                  <div class="">
                    <div v-if="rin.stokreal">
                      <div v-if="rin.stokreal.length">
                        {{ rin.stokreal.filter(x => x.kdruang === row.dari).map(a => parseFloat(a.jumlah)).reduce((a, b) => a + b, 0) }}
                      </div>
                      <div v-if="!rin.stokreal.length">
                        0
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row justify-between no-wrap q-mt-xs text-cyan">
                  <div class="q-mr-xs">
                    Max
                  </div>
                  <div class="">
                    {{ parseFloat(rin.mak_stok) }}
                  </div>
                </div>
              </div>
              <div class="col-3">
                <div class="row justify-between no-wrap q-mt-xs text-orange">
                  <div class="q-mr-xs">
                    Permintaan
                  </div>
                  <div class="text-weight-bold">
                    {{ parseFloat(rin?.jumlah_minta) }}
                  </div>
                </div>
                <div class="row justify-between no-wrap q-mt-xs text-green">
                  <div class="q-mr-xs">
                    Didistribusikan
                  </div>
                  <div class="text-weight-bold">
                    {{ rin?.distribusi }}
                  </div>
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
    </app-table-extend>
    <app-print-surat
      ref="dialogPrint"
      v-model="store.isOpen"
      :tanggal="store.dataToPrint?.flag==='1'?store.dataToPrint?.tgl_kirim:store.dataToPrint?.tgl_terima_depo"
      @close="store.isOpen=false"
    >
      <template #isi>
        <!-- Top words -->
        <div
          v-if="store.dataToPrint?.flag==='1'"
          class="row justify-center q-mt-md f-16 text-weight-bold"
        >
          DATA PERMINTAAN
        </div>
        <div
          v-if="store.dataToPrint?.flag==='4'"
          class="row justify-center q-mt-md f-16 text-weight-bold"
        >
          DATA PENERIMAAN
        </div>

        <div
          v-if="store.dataToPrint?.flag==='1'"
          class="row justify-center q-mb-sm"
        >
          <div class="col-2">
            Tanggal Permintaan
          </div>
          <div class="col-1">
            :
          </div>
          <div class="col-9">
            {{ dateFullFormat(store.dataToPrint?.tgl_kirim) }}
          </div>
        </div>
        <div
          v-if="store.dataToPrint?.flag==='4'"
          class="row justify-center q-mb-sm"
        >
          <div class="col-2">
            Tanggal Penerimaan
          </div>
          <div class="col-1">
            :
          </div>
          <div class="col-9">
            {{ dateFullFormat(store.dataToPrint?.tgl_terima_depo) }}
          </div>
        </div>
        <div class="row justify-center q-mb-sm">
          <div class="col-2">
            No. Permintaan
          </div>
          <div class="col-1">
            :
          </div>
          <div class="col-9">
            {{ store.dataToPrint?.no_permintaan }}
          </div>
        </div>
        <div
          v-if="store.dataToPrint?.flag==='1'"
          class="row justify-start q-mb-md"
        >
          <p>
            Telah dikirimkan ke
            <span class="text-weight-bold">
              {{ store.dataToPrint?.menuju?store.dataToPrint?.menuju.nama:'-' }}
            </span> permintaan barang dalam list dibawah ini :
          </p>
        </div>
        <div
          v-if="store.dataToPrint?.flag==='4'"
          class="row justify-start q-mb-md"
        >
          <p>
            Telah diterima dari
            <span class="text-weight-bold">
              {{ store.dataToPrint?.menuju?store.dataToPrint?.menuju.nama:'-' }}
            </span> barang dalam list dibawah ini :
          </p>
        </div>

        <!-- no details -->
        <div v-if="!store.dataToPrint?.permintaanrinci">
          <app-no-data />
        </div>
        <!-- details -->
        <div v-if="store.dataToPrint?.permintaanrinci">
          <!-- header detail -->
          <div class="row justify-between q-col-gutter-sm">
            <div class="col-5 text-weight-bold border-tb border-left">
              Nama Barang
            </div>
            <div class="col-1 text-weight-bold border-tb border-left">
              Jumlah
            </div>
            <div class="col-2 text-weight-bold border-tb border-left">
              Satuan
            </div>
            <div class="col-4 text-weight-bold border-box">
              Keterangan
            </div>
          </div>
          <!-- body details -->
          <div
            v-for="(det, i) in store.dataToPrint?.permintaanrinci"
            :key="i"
          >
            <div
              class="row justify-between q-col-gutter-sm"
            >
              <div class="col-5 border-bottom border-left">
                {{ i+1 }}. {{ det.masterobat?det.masterobat.nama_obat:'Nama barang tidak ditemukan' }}
              </div>
              <div
                v-if="store.dataToPrint?.flag==='1'"
                class="col-1 border-bottom border-left"
              >
                {{ det.jumlah_minta===null?0:det.jumlah_minta }}
              </div>
              <div
                v-if="store.dataToPrint?.flag==='4'"
                class="col-1 border-bottom border-left"
              >
                {{ det.distribusi===null?0:det.distribusi }}
              </div>
              <div
                class="col-2 border-bottom border-left"
              >
                {{ det.masterobat?det.masterobat.satuan_k:'-' }}
              </div>
              <div class="col-4 border-bottom border-left border-right">
                <div class="print-only">
                  {{ det?.keterangan??'-' }}
                </div>
                <div class="print-hide">
                  <app-input
                    v-model="det.keterangan"
                    label="keterangan"
                    outlined
                    valid
                  />
                </div>
              </div>
            </div>
            <q-separator />
          </div>
        </div>
      </template>
    </app-print-surat>
  </div>
</template>

<script setup>
import { dateFullFormat } from 'src/modules/formatter'
import { useDistribusiPenerimaanDepoStore } from 'src/stores/simrs/farmasi/penerimaandepo/penerimaandepo'
import { useAplikasiStore } from 'src/stores/app/aplikasi'
import { onMounted, ref, watch } from 'vue'

const store = useDistribusiPenerimaanDepoStore()
const apps = useAplikasiStore()

function toPrint (val) {
  store.dataToPrint = val
  val.expand = !val.expand
  val.highlight = !val.highlight
  store.isOpen = true
}

onMounted(() => {
  store.setForm('kddepo', apps?.user?.kdruangansim)
  store.setParams('kddepo', apps?.user?.kdruangansim)
  store.getInitialData()
})
watch(() => apps?.user?.kdruangansim, (obj) => {
  store.setForm('kddepo', obj)
  store.setParams('kddepo', obj)
  store.getInitialData()
})

function onClick (val) {
  // console.log('click', val)
  val.item.expand = !val.item.expand
  val.item.highlight = !val.item.highlight
}
function depo (val) {
  const temp = store.depos.filter(a => a.value === val)
  // console.log('temp', temp)
  if (temp.length) {
    return temp[0].nama
  }
  else {
    return val
  }
}

const toloadBeli = ref('')
function kunci (val) {
  val.expand = !val.expand
  val.highlight = !val.highlight
  toloadBeli.value = val.no_permintaan
  const form = {
    no_permintaan: val.no_permintaan,
    kdruang: val.tujuan, // gudang
    tujuan: val.dari// depo
  }
  console.log('val', val, form)

  store.simpanDetail(form)
}
const color = val => {
  switch (val) {
    case 99:
      return 'white'
      // eslint-disable-next-line no-unreachable
      break
    case '':
      return 'negative'
      // eslint-disable-next-line no-unreachable
      break
    case '1':
      return 'cyan'
      // eslint-disable-next-line no-unreachable
      break
    case '2':
      return 'blue'
      // eslint-disable-next-line no-unreachable
      break
    case '3':
      return 'orange'
      // eslint-disable-next-line no-unreachable
      break
    case '4':
      return 'grey'
      // eslint-disable-next-line no-unreachable
      break

    default:
      return 'red'
      // eslint-disable-next-line no-unreachable
      break
  }
}

const label = (status) => {
  switch (status) {
    case '':
      return 'Draft'
      // eslint-disable-next-line no-unreachable
      break
    case '1':
      return 'Permintaan dikirim ke Gudang'
      // eslint-disable-next-line no-unreachable
      break
    case '2':
      return 'Diterima Gudang'
      // eslint-disable-next-line no-unreachable
      break
    case '3':
      return 'Telah di distribusikan'
      // eslint-disable-next-line no-unreachable
      break
    case '4':
      return 'Diterima Depo'
      // eslint-disable-next-line no-unreachable
      break
    case 99:
      return 'Status belum di filter'
      // eslint-disable-next-line no-unreachable
      break

    default:
      return 'Belum di definisikan'
      // eslint-disable-next-line no-unreachable
      break
  }
}

</script>

<style>
.box {
  white-space: normal !important;
  inline-size: 170px;
  overflow-wrap: break-word;
}
.rouded-border{
  border-radius: 5px;
}
</style>
