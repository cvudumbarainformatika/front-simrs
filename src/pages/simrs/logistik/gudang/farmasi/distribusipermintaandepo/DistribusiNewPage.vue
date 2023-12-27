<template>
  <div class="q-pa-xs bg-white">
    <div class="row bg-primary text-white q-pa-xs q-mb-md">
      <div class="f-16 text-weight-bold">
        Halaman Distribusi Permintaan Depo
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
      </template>
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
        <div v-if="row.flag==='3'">
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
              Sudah di kirim ke depo
            </q-tooltip>
          </q-btn>
        </div>
        <div v-if="row.flag==='1'">
          <q-btn
            flat
            icon="icon-mat-move_to_inbox"
            dense
            color="primary"
            :loading="store.loadingKunci && row.no_permintaan === toloadBeli"
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
        <div v-if="row.flag==='2'">
          <q-btn
            flat
            icon="icon-mat-send"
            dense
            color="green"
            :loading="store.loadingKunci && row.no_permintaan === toloadBeli"
            @click="distribusikan(row)"
          >
            <q-tooltip
              class="primary"
              :offset="[10, 10]"
            >
              Distribusikan
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
                  <div class=" text-weight-bold">
                    {{ rin.masterobat ? rin.masterobat.nama_obat : '-' }}
                  </div>
                </div>
                <div class="row justify-between no-wrap q-mt-xs anu">
                  <div
                    class=" text-weight-bold"
                    :class="rin.masterobat.status_fornas === '1' ? 'text-green' : 'text-negative'"
                  >
                    {{ rin.masterobat.status_fornas === '1' ? 'Fronas' : 'Non-Fornas' }}
                  </div>
                  <div
                    class=" text-weight-bold"
                    :class="rin.masterobat.status_forkid === '1' ? 'text-green' : 'text-negative'"
                  >
                    {{ rin.masterobat.status_forkid === '1' ? 'Forkit' : 'Non-Forkit' }}
                  </div>
                  <div
                    class=" text-weight-bold"
                    :class="rin.masterobat.status_generik === '1' ? 'text-green' : 'text-negative'"
                  >
                    {{ rin.masterobat.status_generik === '1' ? 'Generik' : 'Non-Generik' }}
                  </div>
                </div>

                <div class="row justify-between no-wrap q-mt-xs anu f-10 text-italic">
                  <div class=" text-weight-bold">
                    ({{ rin.masterobat.satuan_k }})
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
                        {{ rin.stokreal.filter(x => x.kdruang === row.dari).map(a => parseFloat(a.stokdendiri)).reduce((a,
                                                                                                                        b) => a + b, 0) }}
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
                <div class="row justify-between no-wrap q-mt-xs text-green">
                  <div class="q-mr-xs">
                    Permintaan
                  </div>
                  <div class="text-weight-bold">
                    {{ rin.jumlahdiminta }}
                  </div>
                </div>

                <div class="row justify-between no-wrap q-mt-xs">
                  <div
                    v-if="row.flag === '2' || rin.editable"
                    class="col-12"
                  >
                    <app-input
                      ref="refInputVerif"
                      v-model="rin.jumlah_minta"
                      label="Jumlah Didistribusikan"
                      outlined
                      debounce="800"
                      :rules="[
                        val => parseFloat(val) > 0 || 'Harus lebih lebih besar dari 0',
                        val => ((parseFloat(val) <= parseFloat(rin.jumlahdiminta))) || 'Tidak Boleh Lebih dari Jumlah minta'
                      ]"
                      @focus="setNol(rin)"
                      @keyup.enter="kirim(rin, i,row)"
                      @update:model-value="setJumlah($event, rin)"
                    />
                  </div>
                  <div
                    v-else
                    class="col-12"
                  >
                    <app-input
                      ref="refInputVerif"
                      v-model="rin.jumlah_minta"
                      label="Jumlah Didistribusikan"
                      outlined
                      debounce="800"
                      readonly
                      :rules="[
                        val => parseFloat(val) > 0 || 'Harus lebih lebih besar dari 0',
                        val => ((parseFloat(val) <= parseFloat(rin.jumlahdiminta))) || 'Tidak Boleh Lebih dari Jumlah minta'
                      ]"
                      @keyup.enter="gaKirim(rin, i)"
                      @update:model-value="sudah($event, rin)"
                    />
                  </div>
                </div>
              </div>
              <div class="col-3 ">
                <div v-if="parseFloat(rin.jumlah_minta) > 0 && row.flag==='2'">
                  <div
                    v-if="parseFloat(rin.jumlah_minta) <= parseFloat(rin.jumlahdiminta) && row.flag==='2'"
                    class="row justify-end"
                  >
                    <q-btn
                      flat
                      no-caps
                      icon-right="icon-mat-send"
                      label="Distribusikan"
                      color="green"
                      :loading="store.loadingSimpan && (store.form.id === rin.id)"
                      @click="kirim(rin, i,row)"
                    >
                      <q-tooltip
                        anchor="top middle"
                        self="center middle"
                      >
                        <div class="row justify-end">
                          Distribusikan Obat ini
                        </div>
                      </q-tooltip>
                    </q-btn>
                  </div>
                </div>
                <div v-else>
                  <div
                    v-if="parseFloat(rin.jumlah_minta) <= 0 && row.flag==='2'"
                    class="row justify-end text-weight-bold"
                  >
                    Jumlah Distribusi salah
                  </div>
                  <div
                    v-if="row.flag==='3'"
                    class="row justify-end text-weight-bold text-green"
                  >
                    Sudah Di Distribusikan
                  </div>
                  <div
                    v-if="row.flag==='1'"
                    class="row justify-end text-weight-bold text-red"
                  >
                    Terima Terlebih dahulu
                  </div>
                  <div
                    v-if="rin.user_verif !== '' && !rin.editable && row.flag === '2'"
                    class="row justify-end text-weight-bold text-green q-py-xs"
                  >
                    <div class="row justify-end">
                      <q-btn
                        dense
                        glossy
                        no-caps
                        icon="icon-mat-edit"
                        label="Edit"
                        color="primary"
                        :loading="store.loading && (store.form.id === rin.id)"
                        @click="setEdit(rin)"
                      >
                        <q-tooltip
                          anchor="top middle"
                          self="center middle"
                        >
                          <div>
                            edit
                          </div>
                        </q-tooltip>
                      </q-btn>
                    </div>
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
import { useAplikasiStore } from 'src/stores/app/aplikasi'
import { useDistribusiPermintaanDepoStore } from 'src/stores/simrs/farmasi/distribusipermintaandepo/distribusi'
import { ref, onMounted } from 'vue'
const store = useDistribusiPermintaanDepoStore()
const apps = useAplikasiStore()
onMounted(() => {
  store.setForm('kdgudang', apps?.user?.pegawai?.kdruangansim)
  store.setParams('kdgudang', apps?.user?.pegawai?.kdruangansim)
  store.getInitialData()
})
function depo (val) {
  const temp = store.depos.filter(a => a.value === val)
  // console.log('temp', temp)
  if (temp.length) {
    return temp[0].nama
  } else {
    return val
  }
}
// click
function onClick (val) {
  // console.log('click', val)
  val.item.expand = !val.item.expand
  val.item.highlight = !val.item.highlight
}
const toloadBeli = ref('')
function kunci (val) {
  val.expand = !val.expand
  val.highlight = !val.highlight
  toloadBeli.value = val.no_permintaan
  const form = {
    no_permintaan: val.no_permintaan
  }
  console.log('val', val, form)

  store.kunci(form)
}
function distribusikan (val) {
  val.expand = !val.expand
  val.highlight = !val.highlight
  toloadBeli.value = val.no_permintaan
  const form = {
    no_permintaan: val.no_permintaan
  }
  console.log('val', val, form)

  store.distribusi(form)
}

function setEdit(val) {
  console.log('edit ', val)
  val.editable = true
}
const refInputVerif = ref(null)
function kirim (val, i, row) {
  console.log('ref', refInputVerif.value, i)
  const valid = refInputVerif.value[i].$refs.refInput.validate()
  console.log('kirim', val)
  console.log('kirim row', row)
  if (valid) {
    store.setForm('id', val.id)
    const form = {
      id: val.id,
      jumlahdiminta: val.jumlahdiminta,
      jumlah_minta: val.jumlah_minta,
      kodeobat: val.kdobat,
      kdgudang: row.tujuan,
      nopermintaan: row.no_permintaan

    }
    console.log('form', form)
    store.simpanDetail(form).then(() => {
      val.editable = false
    })
  }
  val.editable = false
}
function gaKirim (val, i) {
  console.log('ref', refInputVerif.value, i)
}

function setNol (val) {
  const beli = !isNaN(parseFloat(val.jumlah_minta)) ? (parseFloat(val.jumlah_minta) <= 0 ? 0 : parseFloat(val.jumlah_minta)) : 0
  val.jumlah_minta = beli
}
function setJumlah (evt, val) {
  const inc = evt.includes('.')
  const ind = evt.indexOf('.')
  const panj = evt.length
  const beli = isNaN(parseFloat(evt)) ? 0 : (inc && (ind === (panj - 1)) ? evt : parseFloat(evt))
  // const beli = !isNaN(parseFloat(evt)) ? (parseFloat(evt) <= 0 ? 0 : parseFloat(evt)) : 0
  val.jumlah_minta = beli
  console.log('beli', beli)
}
function sudah(evt, val) {
  const anu = val.jumlah_minta
  val.jumlah_minta = anu
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
</style>
