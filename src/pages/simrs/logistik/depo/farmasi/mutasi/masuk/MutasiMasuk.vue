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

      <template #header-left-after-search>
        <div class="q-ml-md text-white">
          <div class="row q-mb-xs q-ml-xs items-center">
            <div class="q-mr-sm">
              <app-autocomplete
                v-model="store.params.jenisdistribusi"
                label="Status Obat"
                option-value="value"
                option-label="label"
                :source="statOptions"
                outlined
                dark
                @selected="jenisDistSelected"
              />
            </div>
            <!-- <div class="q-mr-sm">
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
            </div> -->
            <div class="q-mx-sm">
              <app-autocomplete
                v-model="store.params.kdgudang"
                label="Tujuan"
                option-value="value"
                option-label="label"
                :source="gudangs"
                outlined
                dark
                @selected="selectGudang"
              />
            </div>
            <div class="q-mx-sm">
              <app-autocomplete
                v-model="store.params.flag"
                label="Status Mutasi"
                option-value="value"
                option-label="label"
                :source="flagOptions"
                outlined
                dark
                @selected="selectFlag"
              />
            </div>
            <!-- <div class="q-mx-sm">
              Tujuan :
            </div>
            <div class="q-mr-sm">
              <q-option-group
                v-model="gud"
                :options="gudangs"
                color="primary"
                class="q-ml-sm"
                dense
                type="checkbox"
                @update:model-value="selectGudang"
              />
            </div> -->
            <!-- <div class="q-mx-sm">
              ||
            </div>
            <div class="q-mx-sm">
              status :
            </div>
            <div class="q-mr-sm">
              <q-option-group
                v-model="store.params.flag"
                :options="flagOptions"
                color="primary"
                class="q-ml-sm"
                dense
                type="checkbox"
                @update:model-value="selectFlag"
              />
            </div> -->
          </div>
        </div>
      </template>
      <template #col-no_permintaan>
        <div>No Pemintaan</div>
      </template>
      <template #col-tgl_permintaan>
        <div>Tanggal Permintaan</div>
      </template>
      <template #col-dari>
        <div>Mutasi Dari</div>
      </template>
      <template #col-tujuan>
        <div>Tujuan</div>
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
      <template #cell-tujuan="{ row }">
        <div class="row justify-between no-wrap">
          {{ row.tujuan?depo(row?.tujuan) :'-' }}
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
        <div v-if="row.flag==='4'">
          <q-btn
            flat
            icon="icon-mat-lock"
            dense
            color="negative"
            :loading="store.loadingKunci && row.no_permintaan === toloadBeli"
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
  </div>
</template>

<script setup>
import { dateFullFormat } from 'src/modules/formatter'
import { useMutasiMasukDepoStore } from 'src/stores/simrs/farmasi/mutasi/depo/masuk'
import { useAplikasiStore } from 'src/stores/app/aplikasi'
import { onMounted, ref, watch } from 'vue'

const store = useMutasiMasukDepoStore()
const apps = useAplikasiStore()
const statOptions = ref([
  { label: 'Non-Konsinyasi', value: 'non-konsinyasi' },
  { label: 'Konsinyasi', value: 'konsinyasi' }
])
const flagOptions = ref([
  { label: 'Draft', value: '' },
  { label: 'Pemintaan Dikirim', value: '1' },
  { label: 'Diterima', value: '2' },
  { label: 'Permintaan Selesai', value: '3' },
  { label: 'Diterima', value: '4' }
])
const gudangs = ref([])
const gd = apps.depos
// const gud = ref([])
function selectGudang(val) {
  console.log('select gudang', val)
  store.setParams('kdgudang', val)
  store.getPermintaanDepo()
}
function selectFlag(val) {
  // console.log('select gudang', val)
  // store.setParams('kdgudang', val)
  store.getPermintaanDepo()
}
function jenisDistSelected(val) {
  console.log('jenis dist', val)
  // store.setParams('kdgudang', val)
  store.getPermintaanDepo()
}
onMounted(() => {
  gd.forEach(a => {
    a.label = a.nama
  })
  gudangs.value = gd
  if (apps?.user?.kdruangansim) {
    gudangs.value = apps.depos.filter(x => x.value !== apps?.user?.kdruangansim)
    gudangs.value.forEach(a => { a.label = a.nama })

    if (store.form.kdgudang === '' || store.params.kdgudang === '') {
      setTimeout(() => {
        store.setForm('kdgudang', gudangs.value[0].value)
        store.setParams('kdgudang', gudangs.value[0].value)
      }, 800)
    }
    if (store.form.kdgudang === apps?.user?.kdruangansim || store.params.kdgudang === apps?.user?.kdruangansim) {
      store.setForm('kdgudang', gudangs.value[0].value)
      store.setParams('kdgudang', gudangs.value[0].value)
      // store.params.kdgudang = []
      // store.params.kdgudang.push(gudangs.value[0].value)
      // gud.value.push(gudangs.value[0].value)
    }
  }
  store.setForm('kddepo', apps?.user?.kdruangansim)
  store.setParams('kddepo', apps?.user?.kdruangansim)
  store.getInitialData()
  console.log(gudangs.value)
})
watch(() => apps?.user?.kdruangansim, (obj) => {
  gudangs.value = apps.depos.filter(x => x.value !== apps?.user?.kdruangansim)
  gudangs.value.forEach(a => { a.label = a.nama })
  store.setForm('kddepo', obj)
  store.setParams('kddepo', obj)
  if (store.form.kdgudang === apps?.user?.kdruangansim || store.params.kdgudang === apps?.user?.kdruangansim) {
    store.setForm('kdgudang', gudangs.value[0].value)
    store.setParams('kdgudang', gudangs.value[0].value)
    // store.params.kdgudang = []
    // store.params.kdgudang.push(gudangs.value[0].value)
    // gud.value = []
    // gud.value.push(gudangs.value[0].value)
  }
  store.getInitialData()
})

function onClick (val) {
  // console.log('click', val)
  val.item.expand = !val.item.expand
  val.item.highlight = !val.item.highlight
}
function depo (val) {
  const temp = apps.gudangs.filter(a => a.kode === val)
  // console.log('temp', temp)
  if (temp.length) {
    return temp[0].nama
  } else {
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
