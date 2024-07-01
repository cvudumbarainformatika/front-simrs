<template>
  <div class="q-pa-xs bg-white">
    <div v-if="apps?.user?.kdruangansim !== 'Gd-04010103'">
      <div
        class="bg-yellow-2 wrap columns content-center"
        style="height: 90vh; width: 100%;"
      >
        <div class="text-negative text-center">
          <q-icon
            name="icon-mat-warning"
            size="100px"
          />
        </div>
        <div class="text-negative f-20  text-center">
          Hanya untuk Depo OK
        </div>
      </div>
    </div>
    <div
      v-if="apps?.user?.kdruangansim === 'Gd-04010103'"
      class="row bg-primary text-white q-pa-sm q-mb-sm rouded-border"
    >
      <div class="f-16 text-weight-bold">
        Halaman Distribusi Permintaan Ruangan Untuk Persiapan Operasi
      </div>
    </div>
    <app-table-extend
      v-if="apps?.user?.kdruangansim === 'Gd-04010103'"
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
      simple-paginasi
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
            <div class="q-mr-sm cursor-pointer waktu">
              <div class="row text-yellow q-pt-xs q-px-xs">
                {{ dateFullFormat(store.params.from) }}
              </div>
              <q-separator color="white" />
              <div class="row text-amber q-pb-xs q-px-xs">
                {{ dateFullFormat(store.params.to) }}
              </div>
              <q-menu
                @show="menuShow"
                @hide="menuHide"
              >
                <q-card flat>
                  <q-card-section>
                    <app-input-date
                      :model="store.params.from"
                      outlined
                      label="Dari tanggal"
                      standout="bg-yellow-3"
                      @set-model="store.setParams('from',$event)"
                    />
                  </q-card-section>
                  <q-card-section>
                    <app-input-date
                      :model="store.params.to"
                      outlined
                      label="Sampai tanggal"
                      standout="bg-yellow-3"
                      @set-model="store.setParams('to',$event)"
                    />
                  </q-card-section>
                </q-card>
              </q-menu>
            </div>

            <div class="q-mr-sm">
              <q-input
                v-model="store.params.q"
                label="cari ..."
                dense
                outlined
                dark
                debounce="500"
                @update:model-value="cariByQ"
              />
            </div>
            <div class="q-mr-sm">
              <q-option-group
                v-model="store.params.flag"
                :options="flagOptions"
                color="primary"
                class="q-ml-sm"
                dense
                type="checkbox"
                inline
                @update:model-value="gantiFlag"
              />
            </div>
          </div>
        </div>
      </template>
      <template #col-permintaan>
        <div>Pemintaan</div>
      </template>
      <template #col-pasien>
        <div>Pasien</div>
      </template>
      <template #col-tanggal>
        <div>Tanggal</div>
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
      <template #cell-pasien="{ row }">
        <div class="row justify-between text-weight-bold">
          {{ row?.pasien?.rs2 }}
        </div>
        <div class="row justify-between text-italic f-10">
          {{ row?.noreg }} || {{ row?.norm }}
        </div>
      </template>
      <template #cell-tanggal="{ row }">
        <div class="row justify-between no-wrap">
          <div class="q-mr-sm">
            Distribusi
          </div>
          <div class="text-italic">
            {{ row.tgl_distribusi ? dateFull(row.tgl_distribusi):'-' }}
          </div>
        </div>
        <div class="row justify-between no-wrap">
          <div class="q-mr-sm">
            Dibuatkan Resep
          </div>
          <div class="text-italic">
            {{ row.tgl_resep ? dateFull(row.tgl_resep):'-' }}
          </div>
        </div>
      </template>
      <template #cell-permintaan="{ row }">
        <div class="row justify-between no-wrap q-mt-xs">
          <div class=" text-weight-bold">
            {{ row.nopermintaan }}
          </div>
        </div>
        <div class="row justify-between no-wrap text-italic f-10">
          {{ row.tgl_permintaan ? dateFull(row.tgl_permintaan):'-' }}
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
          <div v-if="row.flag==='2' || row.flag==='4'" class="row items-center justify-between" :style="row.flag==='2'?'min-width: 200px;':'min-width: 100px;'">
            <!-- print -->
            <div class="col-auto">
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
            <!-- tambah -->
            <div v-if="row.flag==='2'" class="col-auto">
              <q-btn
                round
                icon="icon-mat-add"
                dense
                color="primary"
                size="sm"
                @click="toAdd(row)"
              >
                <q-tooltip
                  class="primary"
                  :offset="[10, 10]"
                >
                  Tambahkan Obat susulan
                </q-tooltip>
              </q-btn>
            </div>
            <!-- batal -->
            <div v-if="row.flag==='2'" class="col-auto">
              <!-- batal -->
              <q-btn
                flat
                icon="icon-mat-hand-front-left"
                dense
                color="negative"
                :loading="store.batalOperasi && row.loading"
                :disable="store.batalOperasi && row.loading"
                @click="batalOperasi(row)"
              >
                <q-tooltip
                  class="primary"
                  :offset="[10, 10]"
                >
                  Batal Operasi
                </q-tooltip>
              </q-btn>
            </div>
            <div v-if="row.flag==='4'" class="col-auto">
              <q-btn
                flat
                icon="icon-mat-lock"
                dense
                color="negative"
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
          </div>
          <div v-if="row.flag==='1'">
            <div class="row justify-between" style="min-width: 150px;">
              <div class="col-auto">
                <!-- kirim -->
                <q-btn
                  flat
                  icon="icon-mat-send"
                  dense
                  color="primary"
                  :loading="store.loadingDistribusi && row.loading"
                  :disable="store.loadingDistribusi && row.loading"
                  @click="distribusi(row)"
                >
                  <q-tooltip
                    class="primary"
                    :offset="[10, 10]"
                  >
                    Distribusikan
                  </q-tooltip>
                </q-btn>
              </div>
              <div class="col-auto">
                <!-- batal -->
                <q-btn
                  flat
                  icon="icon-mat-hand-front-left"
                  dense
                  color="negative"
                  :loading="store.loadingBatalOperasi && row.loading"
                  :disable="store.loadingBatalOperasi && row.loading"
                  @click="batalOperasi(row)"
                >
                  <q-tooltip
                    class="primary"
                    :offset="[10, 10]"
                  >
                    Batal Operasi
                  </q-tooltip>
                </q-btn>
              </div>
            </div>
          </div>

          <div v-if="row.flag==='3'">
            <!-- pengembalian -->
            <q-btn
              flat
              icon="icon-mat-move_to_inbox"
              dense
              color="primary"
              :loading="store.loadingSimpan && row.loading"
              :disable="store.loadingSimpan && row.loading"
              @click="teimaPengembalian(row)"
            >
              <q-tooltip
                class="primary"
                :offset="[10, 10]"
              >
                Terima Pengembalian
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
        <div v-if="row.rinci.length">
          <div class="row items-center text-weight-bold">
            <div class="col-3 ">
              Obat
            </div>
            <div class="col-3 ">
              Jumlah
            </div>
            <div class="col-3 ">
              Input
            </div>
            <div class="col-3 text-right">
              #
            </div>
          </div>
          <q-separator />
          <div
            v-for="(rin, i) in row.rinci"
            :key="i"
          >
            <div class="row items-center q-col-gutter-sm anu">
              <div class="col-3">
                <div class="row justify-between no-wrap q-mt-xs">
                  <div
                    class=" text-weight-bold"
                    style="white-space: normal;"
                  >
                    {{ rin.obat ? rin.obat.nama_obat : '-' }}
                  </div>
                </div>
                <div class="row justify-between f-10 no-wrap q-mt-xs">
                  <div class="text-deep-purple text-italic">
                    {{ rin.kd_obat }}
                  </div>
                </div>
                <div class="row justify-between no-wrap q-mt-xs anu f-10 text-italic">
                  <div class="">
                    ({{ rin.obat.satuan_k }})
                  </div>
                </div>
                <!-- <div class="row no-wrap q-mt-xs anu f-10">
                  <div
                    class="text-weight-bold q-mr-sm"
                    :class="rin.obat.status_fornas === '1' ? 'text-green' : 'text-negative'"
                  >
                    {{ rin.obat.status_fornas === '1' ? 'Fronas' : 'Non-Fornas' }}
                  </div>
                  <div
                    class=" text-weight-bold  q-mr-sm"
                    :class="rin.obat.status_forkid === '1' ? 'text-green' : 'text-negative'"
                  >
                    {{ rin.obat.status_forkid === '1' ? 'Forkit' : 'Non-Forkit' }}
                  </div>
                  <div
                    class=" text-weight-bold  q-mr-sm"
                    :class="rin.obat.status_generik === '1' ? 'text-green' : 'text-negative'"
                  >
                    {{ rin.obat.status_generik === '1' ? 'Generik' : 'Non-Generik' }}
                  </div>
                </div>
                <div class="row f-10 no-wrap q-mt-xs anu">
                  <div
                    class=" text-weight-bold q-mr-sm"
                    :class="rin.obat.status_kronis === '1' ? 'text-green' : 'text-negative'"
                  >
                    {{ rin.obat.status_kronis === '1' ? 'Kronis' : 'Non-Kronis' }}
                  </div>
                  <div
                    class=" text-weight-bold q-mr-sm"
                    :class="rin.obat.status_prb === '1' ? 'text-green' : 'text-negative'"
                  >
                    {{ rin.obat.status_prb === '1' ? 'PRB' : 'Non-PRB' }}
                  </div>
                </div> -->
              </div>
              <div class="col-3">
                <div class="row justify-between no-wrap q-mt-xs text-purple">
                  <div class="q-mr-xs">
                    Minta
                  </div>
                  <div class="text-weight-bold">
                    {{ rin?.jumlah_minta }}
                  </div>
                </div>
                <div
                  v-if="parseInt( row?.flag)>=2"
                  class="row justify-between no-wrap q-mt-xs text-green"
                >
                  <div class="q-mr-xs">
                    Di distribusikan
                  </div>
                  <div class="text-weight-bold">
                    {{ rin?.jumlah_distribusi }}
                  </div>
                </div>
                <div
                  v-if="parseInt( row?.flag)>=3"
                  class="row justify-between no-wrap q-mt-xs text-green"
                >
                  <div class="q-mr-xs">
                    <div class="row">
                      Diresepkan Dokter
                    </div>
                    <div class="row f-10 text-italic" v-if="!!rin.noresep">
                      noresep : {{ rin?.noresep }}
                    </div>
                  </div>
                  <div class="text-weight-bold">
                    {{ rin?.jumlah_resep }}
                  </div>
                </div>
                <div
                  v-if="parseInt( row?.flag)>=4"
                  class="row justify-between no-wrap q-mt-xs text-green"
                >
                  <div class="q-mr-xs">
                    Dikembalikan
                  </div>
                  <div class="text-weight-bold">
                    {{ rin?.jumlah_kembali }}
                  </div>
                </div>
              </div>
              <div class="col-3">
                <div
                  v-if="row?.flag==='1'"
                  class="row justify-between no-wrap q-mt-xs text-orange"
                >
                  <div class="col-12 q-mr-xs">
                    <q-input
                      ref="refDistribusi"
                      v-model="rin.jumlah_distribusi"
                      outlined
                      label="Jumlah Distribusi"
                      dense
                      standout="bg-yellow-3"
                      :rules="[
                        val => parseFloat(val) > 0 || 'Harus lebih lebih besar dari 0',
                        val => ((parseFloat(val) <= parseFloat(rin.jumlah_minta))) || 'Tidak Boleh Lebih dari Jumlah minta'
                      ]"
                      @update:model-value="setJumlah($event,rin,'jumlah_distribusi')"
                    />
                  </div>
                </div>

                <div
                  v-if="row?.flag==='3'"
                  class="row justify-between no-wrap q-mt-xs text-green"
                >
                  <div class="col-12 q-mr-xs">
                    <q-input
                      ref="refKembali"
                      v-model="rin.jumlah_kembali"
                      outlined
                      label="Jumlah Kembali"
                      dense
                      standout="bg-yellow-3"
                      :rules="[
                        val => (parseFloat(val) <= (parseFloat(rin.jumlah_distribusi) - parseFloat(rin.jumlah_resep))) || 'Tidak Boleh Lebih dari Jumlah distribusi dikurangi jumlah diresepkan dokter',
                        // val => (parseFloat(val) >= (parseFloat(rin.jumlah_distribusi) - parseFloat(rin.jumlah_resep))) || 'Apakah ada obat yang hilang?'
                      ]"
                      @update:model-value="setJumlah($event,rin,'jumlah_kembali')"
                    />
                  </div>
                </div>
              </div>
              <div v-if="rin?.susulan" class="col-3">
                {{ rin?.susulan?.nama }}
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
  <app-print-surat
    ref="dialogPrint"
    v-model="store.isOpen"
    class="page-x"
    :tanggal="store.dataToPrint?.flag==='2'?store.dataToPrint?.tgl_distribusi:store.dataToPrint?.tgl_retur"
    @close="store.isOpen=false"
  >
    <template #isi>
      <!-- Top words -->
      <div
        v-if="store.dataToPrint?.flag==='2'"
        class="row justify-center q-mt-md f-16 text-weight-bold"
      >
        DATA DISTRIBUSI
      </div>
      <div
        v-if="store.dataToPrint?.flag==='4'"
        class="row justify-center q-mt-md f-16 text-weight-bold"
      >
        DATA RESEP DAN RETUR
      </div>

      <div
        v-if="store.dataToPrint?.flag==='2'"
        class="row justify-center q-mb-sm default-font"
      >
        <div class="col-2">
          Tanggal Distribusi
        </div>
        <div class="col-1">
          :
        </div>
        <div class="col-9">
          {{ dateFullFormat(store.dataToPrint?.tgl_distribusi) }}
        </div>
      </div>
      <div
        v-if="store.dataToPrint?.flag==='4'"
        class="row justify-center q-mb-sm default-font"
      >
        <div class="col-2">
          Tanggal Resep
        </div>
        <div class="col-1">
          :
        </div>
        <div class="col-9">
          {{ dateFullFormat(store.dataToPrint?.tgl_resep) }}
        </div>
      </div>
      <div
        v-if="store.dataToPrint?.flag==='4'"
        class="row justify-center q-mb-sm default-font"
      >
        <div class="col-2">
          Tanggal Retur
        </div>
        <div class="col-1">
          :
        </div>
        <div class="col-9">
          {{ dateFullFormat(store.dataToPrint?.tgl_retur) }}
        </div>
      </div>
      <div class="row justify-center q-mb-sm default-font">
        <div class="col-2">
          No. Permintaan
        </div>
        <div class="col-1">
          :
        </div>
        <div class="col-9">
          {{ store.dataToPrint?.nopermintaan }}
        </div>
      </div>
      <div
        v-if="store.dataToPrint?.flag==='2'"
        class="row justify-start  default-font"
      >
        <p>
          Telah dikirimkan Kepada
        </p>
      </div>
      <div
        v-if="store.dataToPrint?.flag==='4'"
        class="row justify-start  default-font"
      >
        <p>
          Telah diterima resep dan retur dari:
        </p>
      </div>
      <div class="row justify-start default-font q-ml-md">
        {{ store.dataToPrint?.pasien?.rs2 }} -  {{ store.dataToPrint?.pasien?.rs1 }} - {{ store.dataToPrint?.list?.sistembayar?.rs2 }}
      </div>
      <div class="row justify-start default-font q-ml-md">
        {{ store.dataToPrint?.list.rs4 }} -  {{ store.dataToPrint?.list?.kunjunganranap?.relmasterruangranap?.rs2 ?? store.dataToPrint?.list?.kunjunganrajal?.relmpoli?.rs2 }}
      </div>
      <div
        class="row justify-start q-mb-md default-font"
      >
        <p>
          <span class="text-weight-bold">
            Obat untuk Operasi
          </span> pada list dibawah ini :
        </p>
      </div>

      <!-- no details -->
      <div v-if="!store.dataToPrint?.rinci">
        <app-no-data />
      </div>
      <!-- details -->
      <div v-if="store.dataToPrint?.rinci">
        <!-- header detail -->
        <div class="row justify-between q-col-gutter-sm default-font">
          <div class="col-1 border-tb border-left">
            No
          </div>
          <div
            v-if="store.dataToPrint?.flag==='2'"
            class="col-7 text-weight-bold border-tb border-left"
          >
            Nama Barang
          </div>
          <div
            v-if="store.dataToPrint?.flag==='4'"
            class="col-7 text-weight-bold border-tb border-left"
          >
            Nama Barang
          </div>
          <div
            v-if="store.dataToPrint?.flag==='2'"
            class="col-2 text-weight-bold border-tb border-left"
          >
            Jumlah
          </div>
          <div
            v-if="store.dataToPrint?.flag==='4'"
            class="col-1 text-weight-bold border-tb border-left"
          >
            Jumlah Resep
          </div>
          <div
            v-if="store.dataToPrint?.flag==='4'"
            class="col-1 text-weight-bold border-tb border-left"
          >
            Jumlah Retur
          </div>
          <div class="col-2 text-weight-bold border-tb border-left">
            Satuan
          </div>
          <!-- <div class="col-4 text-weight-bold border-box">
            Keterangan
          </div> -->
        </div>
        <!-- body details -->
        <div
          v-for="(det, i) in store.dataToPrint?.rinci"
          :key="i"
        >
          <div
            class="row justify-between q-col-gutter-sm default-font"
          >
            <div class="col-1 border-bottom border-left">
              {{ i+1 }}.
            </div>
            <div
              v-if="store.dataToPrint?.flag==='2'"
              class="col-7 border-bottom border-left"
            >
              {{ det.obat?det.obat.nama_obat:'Nama barang tidak ditemukan' }}
            </div>
            <div
              v-if="store.dataToPrint?.flag==='4'"
              class="col-7 border-bottom border-left"
            >
              {{ det.obat?det.obat.nama_obat:'Nama barang tidak ditemukan' }}
            </div>
            <div
              v-if="store.dataToPrint?.flag==='2'"
              class="col-2 border-bottom border-left"
            >
              {{ det.jumlah_distribusi===null?0:det.jumlah_distribusi }}
            </div>
            <div
              v-if="store.dataToPrint?.flag==='4'"
              class="col-1 border-bottom border-left"
            >
              {{ det.jumlah_resep===null?0:det.jumlah_resep }}
            </div>
            <div
              v-if="store.dataToPrint?.flag==='4'"
              class="col-1 border-bottom border-left"
            >
              {{ det.jumlah_kembali===null?0:det.jumlah_kembali }}
            </div>
            <div
              class="col-2 border-bottom border-left"
            >
              {{ det.obat?det.obat.satuan_k:'-' }}
            </div>
            <!-- <div class="col-4 border-bottom border-left border-right">
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
            </div> -->
          </div>
          <q-separator />
        </div>
      </div>
    </template>
  </app-print-surat>
  <add-surat v-model="tambah.isOpen" @close="tambah.isOpen = false" />
</template>

<script setup>
import { dateFull, dateFullFormat } from 'src/modules/formatter'
import { useAplikasiStore } from 'src/stores/app/aplikasi'
import { onMounted, ref, watch, defineAsyncComponent } from 'vue'
import { useDistribusiPersiapanOperasiStore } from 'src/stores/simrs/farmasi/distribusipersiapanok/distribusi'
import { notifErrVue } from 'src/modules/utils'
import { useTambahObatDistribusiPersiapanOperasiStore } from 'src/stores/simrs/farmasi/distribusipersiapanok/tambah'
import { Dialog } from 'quasar'

const store = useDistribusiPersiapanOperasiStore()
const tambah = useTambahObatDistribusiPersiapanOperasiStore()
const apps = useAplikasiStore()

const addSurat = defineAsyncComponent(() => import('./comp/DialogAddObat.vue'))

function batalOperasi (val) {
  val.expand = !val.expand
  val.highlight = !val.highlight
  console.log('val', val)
  Dialog.create({
    title: 'Konfirmasi',
    message: val?.flag === '1' ? 'Apakah Operasi dibatalkan?' : 'Apakah Operasi dibatalkan, dan Obat akan dikembalikan ke depo?',
    ok: {
      'no-caps': true,
      push: true,
      color: 'negative',
      label: 'Batal Operasi'
    },
    cancel: {
      'no-caps': true,
      push: true,
      color: 'dark',
      label: 'Tidak Batal Operasi'
    }
  }).onOk(() => {
    store.batalOperasi(val)
  })
}
function cariByQ (val) {
  store.setParams('q', val)
  store.setParams('page', 1)
  store.getPermintaan()
}
function gantiFlag () {
  store.setParams('page', 1)
  store.getPermintaan()
}
function toPrint (val) {
  store.dataToPrint = val
  val.expand = !val.expand
  val.highlight = !val.highlight
  store.isOpen = true
}
function toAdd (val) {
  console.log('val', val)
  val.expand = !val.expand
  val.highlight = !val.highlight
  tambah.isOpen = true
  tambah.groups = val?.list?.sistembayar?.groups
  tambah.setForm('nopermintaan', val?.nopermintaan)
}
onMounted(() => {
  if (apps?.user?.kdruangansim !== 'Gd-04010103') {
    return notifErrVue('Distribusi persiapan operasi hanya untuk depo OK')
    // apps.user.kdruangansim = 'Gd-04010103'
  }
  store.setForm('kddepo', apps?.user?.kdruangansim)
  store.setParams('kddepo', apps?.user?.kdruangansim)
  store.getInitialData()
})
watch(() => apps?.user?.kdruangansim, (obj) => {
  if (obj !== 'Gd-04010103') {
    // apps.user.kdruangansim = 'Gd-04010103'
    return notifErrVue('Distribusi persiapan operasi hanya untuk depo OK')
  }
  store.setForm('kddepo', 'Gd-04010103')
  store.setParams('kddepo', 'Gd-04010103')
  store.getInitialData()
})

// menu hide and show
let prevFrom = null
let prevTo = null
function menuShow () {
  prevFrom = store.params.from
  prevTo = store.params.to
  // console.log('show', prevFrom, prevTo)
}
function menuHide () {
  const samaFrom = store.params.from === prevFrom
  const samaTo = store.params.to === prevTo
  // console.log('hide', samaFrom, samaTo)
  if (!samaFrom || !samaTo) store.getPermintaan()
}

/// /
function onClick (val) {
  store.items.forEach(item => {
    if (item.id !== val.item.id) {
      item.expand = false
      item.highlight = false
    }
  })
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
// flag
const flagOptions = ref([
  { label: 'Dikirim', value: '1' },
  { label: 'Didistribusikan', value: '2' },
  { label: 'Ada Resep', value: '3' },
  { label: 'Selesai', value: '4' },
  { label: 'Batal', value: '5' }
])

const refDistribusi = ref(null)
const refKembali = ref(null)
function teimaPengembalian (val) {
  val.expand = !val.expand
  val.highlight = !val.highlight

  // console.log('val', val, refKembali.value)
  // console.log('ref', refKembali.value)
  setTimeout(() => {
    const valid = []
    if (refKembali.value?.length) {
      refKembali.value.forEach(ref => {
        // console.log('fref', ref.validate())
        if (!ref.validate()) valid.push(false)
      })
      console.log('valid', valid.length)
      if (valid.length <= 0) store.terimaPengembalian(val)
      else notifErrVue('periksa kembali jumlah kembali')
    }
    else {
      // console.log('else', val?.rinci)
      val?.rinci.forEach(rin => { rin.sisa = parseFloat(rin.jumlah_distribusi - rin.jumlah_resep) })
      const ada = val?.rinci.filter(a => a.sisa !== a.jumlah_kembali)
      if (ada.length) return notifErrVue('periksa kembali jumlah pengembalian, ada yang tidak sama antara jumlah distribusi dikurangi jumlah resep dengan jumlah kembali')
      else store.terimaPengembalian(val)
    }
  }, 100)
}
function distribusi (val) {
  val.expand = !val.expand
  val.highlight = !val.highlight

  // console.log('val', val, refDistribusi.value)
  console.log('ref', refDistribusi.value)
  setTimeout(() => {
    const valid = []
    if (refDistribusi.value?.length) {
      refDistribusi.value.forEach(ref => {
        console.log('fref', ref.validate())
        if (!ref.validate()) valid.push(false)
      })
      console.log('valid', valid.length)
      if (valid.length <= 0) store.simpanDistribusi(val)
      else notifErrVue('periksa kembali jumlah distribusi')
    }
    else {
      // console.log('else', val?.rinci)
      const ada = val?.rinci.filter(a => a.jumlah_distribusi <= 0)
      // console.log('ada', ada)
      if (ada.length) return notifErrVue('periksa kembali jumlah distribusi, tidak boleh 0')
      else store.simpanDistribusi(val)
    }
  }, 100)
  // store.simpanDistribusi(val)
}

function setJumlah (evt, det, key) {
  const inc = evt.includes('.')
  const ind = evt.indexOf('.')
  const panj = evt.length
  const beli = isNaN(parseFloat(evt)) ? 0 : (inc && (ind === (panj - 1)) ? evt : parseFloat(evt))
  // const beli = !isNaN(parseFloat(evt)) ? (parseFloat(evt) <= 0 ? 0 : parseFloat(evt)) : 0
  det[key] = beli
  if (key === 'jumlah_distribusi') {
    if (parseFloat(det.jumlah_minta) < beli) {
      notifErrVue('jumlah distribusi tidak boleh lebih dari jumlah minta')
      det[key] = parseFloat(det.jumlah_minta)
    }
  }
  if (key === 'jumlah_kembali') {
    const sisa = parseFloat(det.jumlah_distribusi) - parseFloat(det.jumlah_resep)
    if (sisa < beli) {
      notifErrVue('jumlah kembali tidak boleh lebih dari jumlah didisribusikan dikurangi jumlah resep')
      det[key] = sisa
    }
  }
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
    case '5':
      return 'negative'
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
      return 'Permintaan dikirim ke Depo'
      // eslint-disable-next-line no-unreachable
      break
    case '2':
      return 'Telah di distribusikan'
      // eslint-disable-next-line no-unreachable
      break
    case '3':
      return 'Dibuatkan Resep'
      // eslint-disable-next-line no-unreachable
      break
    case '4':
      return 'Selesai'
      // eslint-disable-next-line no-unreachable
      break
    case '5':
      return 'Batal'
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

<style lang="scss" scoped>
.page-x{
  display: block;
  margin-left: auto;
  margin-right: auto;
  max-width: 27.94cm;
  height: fit-content;
  padding: 1mm;
  // font-size: 10px !important;
}
.default-font{
  font-size: 14px;
  font-weight: bold;
}
.box {
  white-space: normal !important;
  inline-size: 170px;
  overflow-wrap: break-word;
}
.rouded-border{
  border-radius: 5px;
}
.waktu{
  border: 1px solid rgb(255, 255, 255);
  border-radius: 5px;
  background-color: rgb(84, 139, 188);
}
.garis-bawah{
  border-bottom: 6px solid black;
  border-bottom-style: double;
}
.border-box{
  border: 1px solid black;
}
.border-tb{
  border-top: 1px solid black;
  border-bottom: 1px solid black;
}
.border-left{
  border-left: 1px solid black;
}
.border-right{
  border-right: 1px solid black;
}
.border-bottom{
  border-bottom: 1px solid black;
}
.border-top{
  border-top: 1px solid black;
}
</style>
