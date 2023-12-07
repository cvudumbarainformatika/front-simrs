<template>
  <div
    class="q-pa-md"
    style="margin-top:28px"
  >
    <div class="row no-wrap">
      <div class="col-6">
        <div>
          <app-autocomplete-debounce-input
            :model="store.disp.no_permintaan"
            label="Cari Nomor permintaan"
            autocomplete="no_permintaan"
            option-label="no_permintaan"
            option-value="no_permintaan"
            outlined
            :loading="store.loadingCariPermintaan"
            :disable="store.loadingCariPermintaan"
            :source="store.items"
            @on-select="store.permintaanSelected"
            @buang="store.cariPermintaan"
          />
        </div>
        <div v-if="store.terpilih">
          <div class="row no-wrap justify-between items-center q-pr-md q-my-sm">
            <div>Tanggal Permintaan</div>
            <div class="text-weight-bold">
              {{ store.terpilih.tgl_permintaan? dateFullFormat(store.terpilih.tgl_permintaan):'-' }}
            </div>
          </div>
          <div class="row no-wrap justify-between items-center q-pr-md q-my-sm">
            user peminta (info / cari)
          </div>
        </div>
      </div>
      <div class="col-6">
        <div class="row no-wrap text-primary text-weight-bold q-px-md q-my-sm">
          {{ user.nama }}
        </div>
        <div
          v-if="user.pegawai"
          class="row no-wrap q-px-md q-my-sm"
        >
          <div v-if="user.pegawai.depo">
            {{ user.pegawai.depo.nama }}
          </div>
        </div>
      </div>
    </div>

    <div v-if="store.terpilih.permintaanrinci">
      <div
        v-if="store.terpilih.permintaanrinci.length"
        class="row no-wrap"
      >
        <!-- {{ store.terpilih.permintaanrinci }} -->
        <app-table-extend
          title="obat"
          :columns="store.columns"
          :column-hide="store.columnHide"
          :items="store.items"
          :meta="store.meta"
          :per-page="store.params.per_page"
          :order-by="store.params.order_by"
          :sort="store.params.sort"
          :loading="store.loading || store.loading"
          :to-search="store.params.q"
          :default-btn="false"
          :ada-paginasi="false"
          :ada-cari="false"
          :ada-refresh="false"
          :ada-per-page="false"
          :ada-filter="false"
          :ada-tambah="false"
          @find="store.setSearch"
        >
          <!-- @edit-data="store.editData" -->
          <!--
            row-image="image"
            @delete-ids="table.deletesData"
            -->

          <template #col-no_permintaan>
            <div>Nomor Pemintaan</div>
          </template>
          <template #col-tgl_permintaan>
            <div>Tanggal Permintaan</div>
          </template>
          <template #col-dari>
            <div>Dari</div>
          </template>
          <template #col-tujuan>
            <div>Tujuan</div>
          </template>
          <template #col-user>
            <div>User Entri</div>
          </template>
          <template #col-act>
            <div>#</div>
          </template>
          <template #cell-tgl_permintaan="{ row }">
            {{ dateFullFormat(row.tgl_permintaan) }}
          </template>
          <template #cell-dari="{ row }">
            <div class="">
              {{ depo(row.dari) }}
            </div>
          </template>
          <template #cell-tujuan="{ row }">
            <div class="">
              <div class="">
                {{ gudang(row.tujuan) }}
              </div>
            </div>
          </template>
          <template #cell-jumlah="{ row }">
            <div class="row justify-between no-wrap text-green">
              <div class="q-mr-xs">
                Permintaan
              </div>
              <div class="text-weight-bold">
                {{ row.jumlah_minta }}
              </div>
            </div>
            <div class="row justify-between no-wrap">
              <div
                v-if="((parseFloat(row.jumlah_diverif) < parseFloat(row.jumlah_minta)) || parseFloat(row.jumlah_diverif) > parseFloat(row.jumlah_minta) && row.user_verif === '')"
              >
                <app-input
                  v-model="row.jumlah_diverif"
                  label="Jumlah Diverif"
                  outlined
                  :rules="[
                    val => ((parseFloat(val) <= parseFloat(row.jumlah_minta))) || 'Tidak Boleh Lebih dari Jumlah minta'
                  ]"
                  @keyup.enter="kirim(row)"
                  @update:model-value="setJumlah($event, row)"
                />
              </div>
              <div v-else>
                {{ row.jumlah_diverif }}
              </div>
            </div>
          </template>
          <template #cell-status="{ row }">
            <div class="row">
              <q-chip
                class="f-12"
                :color="color(row.flag)"
                :text-color="row.flag === 99 ? 'dark' : 'white'"
                :label="label(row.flag)"
              />
            </div>
          </template>
          <template #cell-user="{ row }">
            <div class="row">
              {{ row.user?row.user.nama:'-' }}
            </div>
          </template>
          <template #cell-act="{ row }">
            <div v-if="parseInt(row.flag)<2 && parseInt(row.flag) >= 1">
              <q-btn
                flat
                icon="icon-mat-lock_open"
                dense
                color="negative"
                :loading="store.loadingKunci && row.no_permintaan === toloadBeli"
                @click="kunci(row)"
              >
                <q-tooltip
                  class="primary"
                  :offset="[10, 10]"
                >
                  Verifikasi Permintaan Depo sudah selesai dan siap di kunci
                </q-tooltip>
              </q-btn>
            </div>
            <div v-if="parseInt(row.flag) >= 2">
              <div>
                <q-btn
                  flat
                  icon="icon-mat-lock"
                  dense
                  color="green"
                  @click="info(row)"
                >
                  <q-tooltip
                    class="primary"
                    :offset="[10, 10]"
                  >
                    Verifikasi Permintaan Depo sudah di kunci
                  </q-tooltip>
                </q-btn>
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
                      <div class="q-mr-xs">
                        Kode
                      </div>
                      <div class="text-deep-purple text-weight-bold">
                        {{ rin.kdobat }}
                      </div>
                    </div>
                    <div class="row justify-between no-wrap q-mt-xs">
                      <div class="q-mr-xs">
                        Nama
                      </div>
                      <div class=" text-weight-bold">
                        {{ rin.masterobat ? rin.masterobat.nama_obat : '-' }}
                      </div>
                    </div>
                    <div class="row justify-between no-wrap q-mt-xs anu">
                      <div class="q-mr-xs">
                        Fornas
                      </div>
                      <div
                        class=" text-weight-bold"
                        :class="rin.masterobat.status_fornas === '1' ? 'text-green' : 'text-negative'"
                      >
                        {{ rin.masterobat.status_fornas === '1' ? 'Ya' : 'Tidak' }}
                      </div>
                    </div>
                    <div class="row justify-between no-wrap q-mt-xs anu">
                      <div class="q-mr-xs">
                        Forkit
                      </div>
                      <div
                        class=" text-weight-bold"
                        :class="rin.masterobat.status_forkid === '1' ? 'text-green' : 'text-negative'"
                      >
                        {{ rin.masterobat.status_forkid === '1' ? 'Ya' : 'Tidak' }}
                      </div>
                    </div>
                    <div class="row justify-between no-wrap q-mt-xs anu">
                      <div class="q-mr-xs">
                        Generik
                      </div>
                      <div
                        class=" text-weight-bold"
                        :class="rin.masterobat.status_generik === '1' ? 'text-green' : 'text-negative'"
                      >
                        {{ rin.masterobat.status_generik === '1' ? 'Ya' : 'Tidak' }}
                      </div>
                    </div>

                    <div class="row justify-between no-wrap q-mt-xs anu">
                      <div class="q-mr-xs">
                        Sistem Bayar
                      </div>
                      <div
                        class=" text-weight-bold"
                      >
                        {{ rin.masterobat.sistembayar }}
                      </div>
                    </div>
                    <div class="row justify-between no-wrap q-mt-xs anu">
                      <div class="q-mr-xs">
                        Satuan
                      </div>
                      <div
                        class=" text-weight-bold"
                      >
                        {{ rin.masterobat.satuan_k }}
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
                            {{ rin.stokreal.filter(x=>x.kdruang === row.dari).map(a => parseFloat(a.stokdendiri)).reduce((a, b) => a + b, 0) }}
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
                        {{ rin.jumlah_minta }}
                      </div>
                    </div>

                    <div class="row justify-between no-wrap q-mt-xs">
                      <!-- v-if="(
                      (parseFloat(rin.jumlah_diverif) < parseFloat(rin.jumlah_minta) ||
                        parseFloat(rin.jumlah_diverif) > parseFloat(rin.jumlah_minta)) &&
                      rin.user_verif === ''
                    )" -->
                      <div
                        v-if="rin.user_verif === '' || rin.editable"
                        class="col-12"
                      >
                        <app-input
                          ref="refInputVerif"
                          v-model="rin.jumlah_diverif"
                          label="Jumlah Diverif"
                          outlined
                          debounce="800"
                          :rules="[
                            val => parseFloat(val) > 0 || 'Harus lebih lebih besar dari 0',
                            val => ((parseFloat(val) <= parseFloat(rin.jumlah_minta))) || 'Tidak Boleh Lebih dari Jumlah minta'
                          ]"
                          @focus="setNol(rin)"
                          @keyup.enter="kirim(rin,i)"
                          @update:model-value="setJumlah($event, rin)"
                        />
                      </div>
                      <div
                        v-else
                        class="col-12"
                      >
                        <app-input
                          ref="refInputVerif"
                          v-model="rin.jumlah_diverif"
                          label="Jumlah Diverif"
                          outlined
                          debounce="800"
                          readonly
                          :rules="[
                            val => parseFloat(val) > 0 || 'Harus lebih lebih besar dari 0',
                            val => ((parseFloat(val) <= parseFloat(rin.jumlah_minta))) || 'Tidak Boleh Lebih dari Jumlah minta'
                          ]"
                          @keyup.enter="gaKirim(rin, i)"
                          @update:model-value="sudah($event, rin)"
                        />
                        <!-- {{ rin.jumlah_diverif }} -->
                      </div>
                    </div>
                  </div>
                  <div class="col-3 ">
                    <div v-if="parseFloat(rin.jumlah_diverif) > 0 && rin.user_verif === ''">
                      <div
                        v-if="parseFloat(rin.jumlah_diverif) <= parseFloat(rin.jumlah_minta) "
                        class="row justify-end"
                      >
                        <q-btn
                          flat
                          no-caps
                          icon-right="icon-mat-send"
                          label="Verif"
                          color="green"
                          :loading="store.loading && (store.form.id === rin.id)"
                          @click="kirim(rin,i)"
                        >
                          <q-tooltip
                            anchor="top middle"
                            self="center middle"
                          >
                            <div class="row justify-end">
                              Verif Obat ini
                            </div>
                          </q-tooltip>
                        </q-btn>
                      </div>
                    </div>
                    <div v-else>
                      <div
                        v-if="parseFloat(rin.jumlah_diverif) <= 0 "
                        class="row justify-end text-weight-bold"
                      >
                        Jumlah Verif salah
                      </div>
                      <div
                        v-if="rin.user_verif !== ''"
                        class="row justify-end text-weight-bold text-green"
                      >
                        Sudah Di verif
                      </div>
                      <div
                        v-if="rin.user_verif !== '' && !rin.editable && row.flag=== '1' "
                        class="row justify-end text-weight-bold text-green q-py-xs"
                      >
                        <div class="row justify-end">
                          <q-btn
                            dense
                            push
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
      <div
        v-if="!store.terpilih.permintaanrinci.length"
        class="row no-wrap"
      >
        <app-no-data />
      </div>
    </div>
    <div v-if="!store.terpilih.permintaanrinci">
      <app-no-data />
    </div>
  </div>
</template>

<script setup>
import { dateFullFormat } from 'src/modules/formatter'
import { useAplikasiStore } from 'src/stores/app/aplikasi'
import { useVerifPermintaanDepoStore } from 'src/stores/simrs/farmasi/verifpermintaandepo/verifdepo'
import { computed, ref } from 'vue'
const store = useVerifPermintaanDepoStore()

const apps = useAplikasiStore()
const user = computed(() => {
  if (apps.user.pegawai) {
    if (apps.user.pegawai.depo) {
      store.setParams('kdgudang', apps.user.pegawai.depo.kode)
    }
  }
  return apps.user
})

function setEdit(val) {
  console.log('edit ', val)
  val.editable = true
}
function depo(val) {
  const temp = store.depos.filter(a => a.value === val)
  // console.log('temp', temp)
  if (temp.length) {
    return temp[0].nama
  } else {
    return val
  }
}
function gudang(val) {
  const temp = store.gudangs.filter(a => a.value === val)
  // console.log('temp', temp)
  if (temp.length) {
    return temp[0].nama
  } else {
    return val
  }
}

function setNol (val) {
  const beli = !isNaN(parseFloat(val.jumlah_diverif)) ? (parseFloat(val.jumlah_diverif) <= 0 ? 0 : parseFloat(val.jumlah_diverif)) : 0
  val.jumlah_diverif = beli
}
function setJumlah (evt, val) {
  const beli = !isNaN(parseFloat(evt)) ? (parseFloat(evt) <= 0 ? 0 : parseFloat(evt)) : 0
  val.jumlah_diverif = beli
  console.log('beli', beli)
}
function sudah(evt, val) {
  const anu = val.jumlah_diverif
  val.jumlah_diverif = anu
}
// eslint-disable-next-line no-unused-vars
function onClick (val) {
  // console.log('click', val)
  val.item.expand = !val.item.expand
  val.item.highlight = !val.item.highlight
}

const refInputVerif = ref(null)
function kirim (val, i) {
  console.log('ref', refInputVerif.value, i)
  const valid = refInputVerif.value[i].$refs.refInput.validate()
  console.log('kirim', val)
  if (valid) {
    store.setForm('id', val.id)
    const form = {
      id: val.id,
      jumlah_minta: val.jumlah_minta,
      jumlah_diverif: val.jumlah_diverif
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
  // const valid = refInputVerif.value[i].$refs.refInput.validate()
  // console.log('kirim', val)
  // if (valid) {
  //   store.setForm('id', val.id)
  //   const form = {
  //     id: val.id,
  //     jumlah_minta: val.jumlah_minta,
  //     jumlah_diverif: val.jumlah_diverif
  //   }
  //   console.log('form', form)
  //   store.simpanDetail(form)
  // }
}

function info (val) {
  val.expand = !val.expand
  val.highlight = !val.highlight
  console.log('info', val)
}
const toloadBeli = ref('')
function kunci (val) {
  val.expand = !val.expand
  val.highlight = !val.highlight
  toloadBeli.value = val.no_permintaan
  store.kunci(val.no_permintaan)
  // .then(() => {
  //   toloadBeli.value = ''
  //   // if (!val.flag) val.flag = 1
  // })
}
store.getInitialData()

const color = val => {
  switch (val) {
    case 99:
      return 'white'
      // eslint-disable-next-line no-unreachable
      break
    case '':
      return 'grey'
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
      return 'Tampilkan semua'
      // eslint-disable-next-line no-unreachable
      break
    case '1':
      return 'Menunggu verifikasi'
      // eslint-disable-next-line no-unreachable
      break
    case '2':
      return 'Telah di verifikasi'
      // eslint-disable-next-line no-unreachable
      break
    case '3':
      return 'Telah di distribusikan'
      // eslint-disable-next-line no-unreachable
      break
    case '4':
      return 'Telah di distribusikan'
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
