<template>
  <div>
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
      :ada-refresh="false"
      :ada-per-page="false"
      :ada-paginasi="Object.keys( store.meta).length>0"
      row-no
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

      <template #col-pasien>
        <div>Pasien</div>
      </template>
      <template #col-resep>
        <div>Resep</div>
      </template>
      <template #col-tagihan>
        <div>Tagihan</div>
      </template>
      <template #col-ina>
        <div>Inacgbg</div>
      </template>
      <template #col-act>
        <div>#</div>
      </template>
      <template #cell-pasien="{ row }">
        <div class="row justify-between no-wrap text-teal">
          {{ row?.noreg }} || {{ row?.norm }}
        </div>
        <div class="row justify-between no-wrap text-orange">
          {{ row?.sistembayar?.rs2 }}
        </div>
        <div class="row no-wrap">
          <div
            class="col"
            style="white-space: normal;"
          >
            {{ row?.diagnosa }}
          </div>
        </div>
      </template>
      <template #cell-resep="{ row }">
        <div class="row justify-between no-wrap q-mt-xs">
          {{ row?.nota }}
        </div>
        <div class="row justify-between no-wrap q-mt-xs">
          {{ row?.noresep }}
        </div>
        <div class="row justify-between no-wrap q-mt-xs">
          {{ dateFullFormat( row?.tgl) }}
        </div>
      </template>
      <template #cell-tagihan="{ row }">
        <div class="row justify-between no-wrap">
          {{ formatRp( row?.tagihanrs) }}
        </div>
      </template>
      <template #cell-ina="{ row }">
        <div class="row">
          {{ row?.kodeincbg ?? '-' }}
        </div>
        <div class="row">
          {{ row?.uraianinacbg ?? '-' }}
        </div>
        <div class="row">
          {{ row?.tarifina?formatRp(parseFloat(row?.tarifina)) : 0 }}
        </div>
      </template>
      <template #cell-act="{ row }">
        <div>
          <q-btn
            flat
            icon="icon-mat-delete_sweep"
            dense
            color="negative"
            :loading="store.loadingHapus"
            @click="hapusResep(row)"
          >
            <q-tooltip
              class="primary"
              :offset="[10, 10]"
            >
              Hapus Resep
            </q-tooltip>
          </q-btn>
        </div>
      </template>
      <template #expand="{ row }">
        <div v-if="row?.rincian?.length">
          <div class="row items-center text-weight-bold">
            <div class="col-3">
              Obat
            </div>
            <div class="col-2">
              Kandungan
            </div>
            <div class="col-2">
              Jumlah
            </div>
            <div class="col-2">
              Aturan
            </div>
            <div class="col-3">
              <div class="row justify-between">
                <div>
                  Keterangan
                </div>
                <div class="q-mr-sm">
                  #
                </div>
              </div>
            </div>
          </div>
          <q-separator />
          <div
            v-for="(rin, i) in row.rincian"
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
                    {{ rin.mobat ? rin.mobat.nama_obat : '-' }}
                  </div>
                </div>
                <div class="row justify-between no-wrap q-mt-xs anu">
                  <div
                    class=" text-weight-bold"
                    :class="rin.mobat.status_fornas === '1' ? 'text-green' : 'text-negative'"
                  >
                    {{ rin.mobat.status_fornas === '1' ? 'Fronas' : 'Non-Fornas' }}
                  </div>
                  <div
                    class=" text-weight-bold"
                    :class="rin.mobat.status_forkid === '1' ? 'text-green' : 'text-negative'"
                  >
                    {{ rin.mobat.status_forkid === '1' ? 'Forkit' : 'Non-Forkit' }}
                  </div>
                  <div
                    class=" text-weight-bold"
                    :class="rin.mobat.status_generik === '1' ? 'text-green' : 'text-negative'"
                  >
                    {{ rin.mobat.status_generik === '1' ? 'Generik' : 'Non-Generik' }}
                  </div>
                </div>

                <div class="row justify-between no-wrap q-mt-xs anu f-10 text-italic">
                  <div class=" text-weight-bold">
                    ({{ rin.mobat.satuan_k }})
                  </div>
                </div>
              </div>
              <div class="col-2">
                <div class="row justify-between no-wrap q-mt-xs text-purple">
                  <div class="q-mr-xs">
                    {{ rin?.mobat?.kandungan }}
                  </div>
                </div>
              </div>
              <div class="col-2">
                <div class="row justify-between no-wrap">
                  <div class="q-mr-xs">
                    {{ rin.jumlah }}
                  </div>
                </div>
              </div>
              <div class="col-2">
                <div class="row justify-between no-wrap">
                  <div class="q-mr-xs">
                    {{ rin.aturan }}
                  </div>
                </div>
              </div>
              <div class="col-3">
                <div class="row justify-between no-wrap">
                  <div class="q-mr-xs">
                    {{ rin.keterangan }}
                  </div>
                  <div class="q-mr-sm">
                    <div class="row q-col-gutter-sm">
                      <q-btn
                        flat
                        icon="icon-mat-print"
                        dense
                        color="dark"
                        round
                        @click="toPrint(row,rin)"
                      >
                        <q-tooltip
                          class="primary"
                          :offset="[10, 10]"
                        >
                          Print Etiket
                        </q-tooltip>
                      </q-btn>
                      <q-btn
                        flat
                        icon="icon-mat-delete_sweep"
                        dense
                        color="negative"
                        :loading="store.loadingHapus && id===rin.id"
                        @click="hapusResep(row,rin)"
                      >
                        <q-tooltip
                          class="primary"
                          :offset="[10, 10]"
                        >
                          Hapus Obat
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
import { dateFullFormat, formatRp } from 'src/modules/formatter'
import { useAplikasiStore } from 'src/stores/app/aplikasi'
import { useListResepDepoStore } from 'src/stores/simrs/farmasi/resepdepo/listresep'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const store = useListResepDepoStore()
const apps = useAplikasiStore()
const router = useRouter()
onMounted(() => {
  store.setParam('kddepo', apps?.user?.pegawai?.kdruangansim)
  store.getInitialData()
})
function onClick (val) {
  // console.log('click', val)
  val.item.expand = !val.item.expand
  val.item.highlight = !val.item.highlight
}
const id = ref(null)
function hapusResep (val, rin) {
  // console.log('click', val)
  // val.expand = !val.expand
  // val.highlight = !val.highlight
  id.value = rin.id
  store.hapusResep(val, rin).then(() => {
    id.value = null
  })
}
function toPrint(row, rin) {
  console.log('row', row)
  console.log('rin', rin)
  const tglResep = row?.tgl
  const norm = row?.norm
  const noresep = row?.noresep
  const aturan = rin?.aturan
  const keterangan = rin?.keterangan
  const obat = rin?.mobat?.nama_obat
  const nama = row?.datapasien?.rs2
  const routeData = router.resolve({
    path: '/print/etiket',
    query: {
      tglResep,
      norm,
      noresep,
      aturan,
      keterangan,
      obat,
      nama
    }
  })
  window.open(routeData.href, '_blank')
}
</script>
