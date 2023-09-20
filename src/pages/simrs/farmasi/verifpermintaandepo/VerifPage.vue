<template>
  <div class="q-pa-md bg-white">
    <div
      class="row bg-grey q-pa-xs q-my-md"
    >
      <div class="f-16 text-weight-bold">
        Halaman Verifikasi Permintaan Depo
      </div>
    </div>
    <!-- <div class="row no-wrap">
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
              {{ store.terpilih.tgl_permintaan ? dateFullFormat(store.terpilih.tgl_permintaan) : '-' }}
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
    </div> -->
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
      row-no
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
        <div class="q-ml-md">
          filter status
        </div>
      </template>
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
      <template #cell-user="{ row }">
        <div class="row">
          {{ row.user?row.user.nama:'-' }}
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
                        {{ rin.stokreal.map(a => parseFloat(a.stokdendiri)).reduce((a, b) => a + b, 0) }}
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
                    v-if="rin.user_verif === ''"
                    class="col-12"
                  >
                    <app-input
                      v-model="rin.jumlah_diverif"
                      label="Jumlah Diverif"
                      outlined
                      :rules="[
                        val => ((parseFloat(val) <= parseFloat(rin.jumlah_minta))) || 'Tidak Boleh Lebih dari Jumlah minta'
                      ]"
                      @keyup.enter="kirim(rin)"
                      @update:model-value="setJumlah($event, rin)"
                    />
                  </div>
                  <div v-else>
                    {{ rin.jumlah_diverif }}
                  </div>
                </div>
              </div>
              <div class="col-3 ">
                <div v-if="parseFloat(rin.jumlah_diverif) > 0 && rin.user_verif === ''">
                  <!-- <div class="row justify-end">
                    <q-btn
                      dense
                      glossy
                      no-caps
                      icon="icon-mat-edit"
                      label="Edit"
                      color="primary"
                      :loading="store.loading && (store.form.id === rin.id)"
                      @click="() => { rin.jumlah_diverif = rin.jumlah_minta - 1 }"
                    >
                      <q-tooltip
                        anchor="top middle"
                        self="center middle"
                      >
                        <div>
                          Ganti Jumlah Verif
                        </div>
                      </q-tooltip>
                    </q-btn>
                  </div> -->
                  <div
                    v-if="parseFloat(rin.jumlah_diverif) <= parseFloat(rin.jumlah_minta) "
                    class="row justify-end"
                  >
                    <q-btn
                      flat
                      no-caps
                      icon-right="icon-mat-done_all"
                      label="Verif"
                      color="green"
                      :loading="store.loading && (store.form.id === rin.id)"
                      @click="kirim(row)"
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
// import { useAplikasiStore } from 'src/stores/app/aplikasi'
// import { computed } from 'vue'
import { useVerifPermintaanDepoStore } from 'src/stores/simrs/farmasi/verifpermintaandepo/verifdepo'
const store = useVerifPermintaanDepoStore()

// const apps = useAplikasiStore()
// const user = computed(() => {
//   if (apps.user.pegawai) {
//     if (apps.user.pegawai.depo) {
//       store.setParams('kdgudang', apps.user.pegawai.depo.kode)
//     }
//   }
//   return apps.user
// })

// const depo = computed((val) => {
//   console.log('computed', val)
//   return val
// })
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

function setJumlah (evt, val) {
  const beli = !isNaN(parseFloat(evt)) ? (parseFloat(evt) < 0 ? 0 : parseFloat(evt)) : 0
  console.log('beli', beli)
  val.jumlah_diverif = beli
}
function onClick (val) {
  // console.log('click', val)
  val.item.expand = !val.item.expand
  val.item.highlight = !val.item.highlight
}
function kirim (val) {
  console.log('kirim', val)
}
store.getInitialData()
</script>

<style>
.box {
  white-space: normal !important;
  inline-size: 170px;
  overflow-wrap: break-word;
}

</style>
