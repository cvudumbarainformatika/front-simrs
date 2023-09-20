<template>
  <div class="q-pa-md">
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
        <app-table
          title="obat"
          :columns="store.columns"
          :items="store.terpilih.permintaanrinci"
          :meta="store.meta"
          :loading="store.loading"
          :default-btn="false"
          :ada-refresh="false"
          :ada-filter="false"
          :ada-tambah="false"
          :ada-cari="false"
          :ada-per-page="false"
          :ada-paginasi="false"
          row-no
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
          <template #col-jumlah>
            <div>Jumlah</div>
          </template>
          <template #col-centang>
            <div />
          </template>
          <template #cell-obat="{ row }">
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
                {{ row.masterobat ? row.masterobat.nama_obat : '-' }}
              </div>
            </div>
            <!-- <div v-if="row.mobat"> -->
            <div class="row justify-between no-wrap anu">
              <div class="q-mr-xs">
                Fornas
              </div>
              <div
                class=" text-weight-bold"
                :class="row.masterobat.status_fornas === '1' ? 'text-green' : 'text-negative'"
              >
                {{ row.masterobat.status_fornas === '1' ? 'Ya' : 'Tidak' }}
              </div>
            </div>
            <div class="row justify-between no-wrap anu">
              <div class="q-mr-xs">
                Forkit
              </div>
              <div
                class=" text-weight-bold"
                :class="row.masterobat.status_forkid === '1' ? 'text-green' : 'text-negative'"
              >
                {{ row.masterobat.status_forkid === '1' ? 'Ya' : 'Tidak' }}
              </div>
            </div>
            <div class="row justify-between no-wrap anu">
              <div class="q-mr-xs">
                Generik
              </div>
              <div
                class=" text-weight-bold"
                :class="row.masterobat.status_generik === '1' ? 'text-green' : 'text-negative'"
              >
                {{ row.masterobat.status_generik === '1' ? 'Ya' : 'Tidak' }}
              </div>
            </div>

            <div class="row justify-between no-wrap anu">
              <div class="q-mr-xs">
                Sistem Bayar
              </div>
              <div
                class=" text-weight-bold"
              >
                {{ row.masterobat.sistembayar }}
              </div>
            </div>
            <div class="row justify-between no-wrap anu">
              <div class="q-mr-xs">
                Satuan
              </div>
              <div
                class=" text-weight-bold"
              >
                {{ row.masterobat.satuan_k }}
              </div>
            </div>
            <!-- </div> -->
          </template>
          <template #cell-stok="{ row }">
            <div class="row justify-between no-wrap text-purple">
              <div class="q-mr-xs">
                Depo
              </div>
              <div class="">
                <div v-if="row.stokreal">
                  <div v-if="row.stokreal.length">
                    {{ row.stokreal.map(a=> parseFloat(a.stokdendiri)).reduce((a,b)=>a+b,0) }}
                  </div>
                </div>
              </div>
            </div>
            <div class="row justify-between no-wrap text-cyan">
              <div class="q-mr-xs">
                Max Stok
              </div>
              <div class="">
                {{ parseFloat(row.mak_stok) }}
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
              <div v-if="((parseFloat(row.jumlah_diverif) < parseFloat(row.jumlah_minta)) || parseFloat(row.jumlah_diverif) > parseFloat(row.jumlah_minta) && row.user_verif === '')">
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
          <template #cell-centang="{ row }">
            <div v-if="parseFloat(row.jumlah_diverif) > 0 ">
              <div class="row">
                <q-btn
                  dense
                  glossy
                  no-caps
                  icon="icon-mat-edit"
                  label="Edit"
                  color="primary"
                  :loading="store.loading && (store.form.id === row.id)"
                  @click="()=>{ row.jumlah_diverif = row.jumlah_minta - 1 }"
                >
                  <q-tooltip
                    anchor="top middle"
                    self="center middle"
                  >
                    <div class="row">
                      Ganti Jumlah Verif
                    </div>
                  </q-tooltip>
                </q-btn>
              </div>
              <div class="row">
                <q-btn
                  flat
                  no-caps
                  icon-right="icon-mat-done_all"
                  label="Verif"
                  color="green"
                  :loading="store.loading && (store.form.id === row.id)"
                  @click="kirim(row)"
                >
                  <q-tooltip
                    anchor="top middle"
                    self="center middle"
                  >
                    <div class="row">
                      Verif Obat ini
                    </div>
                  </q-tooltip>
                </q-btn>
              </div>
            </div>
            <div v-else>
              <div class="row">
                Tidak Perlu Verif
              </div>
            </div>
          </template>
        </app-table>
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
import { computed } from 'vue'
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

function setJumlah (evt, val) {
  const beli = !isNaN(parseFloat(evt)) ? (parseFloat(evt) < 0 ? 0 : parseFloat(evt)) : 0
  val.jumlah_diverif = beli
}

function kirim(val) {
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
.mini {
  white-space: normal !important;
    inline-size: 10px;
    overflow-wrap: break-word;
}
</style>
