<template>
  <div class="q-pa-xs bg-white">
    <app-table-extend
      :columns="store.columns"
      :items="store.items"
      :meta="store.meta"
      :per-page="store.params.per_page"
      :loading="store.loading"
      :to-search="store.params.q"
      :click-able="true"
      :default-btn="false"
      :ada-tambah="false"
      :ada-filter="false"
      row-no
      use-full
      text-cari="Cari ..."
      @find="store.setSearch"
      @goto="store.setPage"
      @set-row="store.setPerPage"
      @refresh="store.refreshTable"
      @on-click="onClick"
    >
      <template #col-no_retur>
        <div>Nomor Retur</div>
      </template>
      <template #col-tgl_retur>
        <div>Tanggal retur</div>
      </template>
      <template #col-depo>
        <div>Dari Depo</div>
      </template>
      <template #col-gudang>
        <div>Ke Gudang</div>
      </template>
      <template #col-user>
        <div>User Entri</div>
      </template>
      <template #col-status>
        <div>#</div>
      </template>
      <template #cell-tgl_retur="{ row }">
        <div class="row justify-between no-wrap">
          {{ row.tgl_retur ? dateFullFormat(row.tgl_retur):'-' }}
        </div>
      </template>
      <template #cell-no_retur="{ row }">
        <div class="row justify-between no-wrap q-mt-xs">
          <div class=" text-weight-bold">
            {{ row.no_retur }}
          </div>
        </div>
      </template>
      <template #cell-depo="{ row }">
        <div class="row justify-between no-wrap">
          {{ row?.depos?.nama }}
        </div>
      </template>
      <template #cell-status="{ row }">
        <div class="row">
          <q-chip
            class="f-10"
            :color="color(row.kunci)"
            :label="label(row.kunci)"
            text-color="white"
          />
        </div>
      </template>
      <template #cell-user="{ row }">
        <div class="row">
          {{ row.user ? row.user.nama : '-' }}
        </div>
      </template>
      <template #cell-gudang="{ row }">
        <div class="row justify-between no-wrap">
          {{ row?.gudangs?.nama }}
        </div>
      </template>
      <template #expand="{ row }">
        <div v-if="row.details.length">
          <div class="row items-center text-weight-bold">
            <div class="col-6 text-center">
              Obat
            </div>
            <div class="col-3 ">
              Alasan
            </div>
            <div class="col-3 text-right">
              Jumlah Retur
            </div>
          </div>
          <q-separator />
          <div
            v-for="(rin, i) in row.details"
            :key="i"
          >
            <div class="row items-center q-col-gutter-sm anu">
              <div class="col-6">
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
                    {{ rin.masterobat.status_fornas === '1' ? 'Fronas' : '' }}
                  </div>
                  <div
                    class=" text-weight-bold  q-mr-sm"
                    :class="rin.masterobat.status_forkid === '1' ? 'text-green' : 'text-negative'"
                  >
                    {{ rin.masterobat.status_forkid === '1' ? 'Forkit' : '' }}
                  </div>
                  <div
                    class=" text-weight-bold  q-mr-sm"
                    :class="rin.masterobat.status_generik === '1' ? 'text-green' : 'text-negative'"
                  >
                    {{ rin.masterobat.status_generik === '1' ? 'Generik' : '' }}
                  </div>
                </div>
                <div class="row f-10 no-wrap q-mt-xs anu">
                  <div
                    class=" text-weight-bold q-mr-sm"
                    :class="rin.masterobat.status_kronis === '1' ? 'text-green' : 'text-negative'"
                  >
                    {{ rin.masterobat.status_kronis === '1' ? 'Kronis' : '' }}
                  </div>
                  <div
                    class=" text-weight-bold q-mr-sm"
                    :class="rin.masterobat.status_prb === '1' ? 'text-green' : 'text-negative'"
                  >
                    {{ rin.masterobat.status_prb === '1' ? 'PRB' : '' }}
                  </div>
                </div>
              </div>
              <div class="col-3">
                <div class="row  no-wrap q-mt-xs">
                  {{ rin?.alasan }}
                </div>
              </div>
              <div class="col-3">
                <div class="row justify-end no-wrap q-mt-xs text-weight-bold">
                  {{ rin?.jumlah_retur }}
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
import { onMounted, watch } from 'vue'
import { useListReturGudangStore } from 'src/stores/simrs/farmasi/returgudang/list'

const store = useListReturGudangStore()
const apps = useAplikasiStore()

onMounted(() => {
  store.setParams('depo', apps?.user?.kdruangansim)
  store.getDataTable()
})
watch(() => apps?.user?.kdruangansim, (obj) => {
  store.setParams('depo', obj)
  store.getDataTable()
})

function onClick (val) {
  // console.log('click', val)
  val.item.expand = !val.item.expand
  val.item.highlight = !val.item.highlight
}
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
      return 'negative'
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
      return 'Dikunci'
      // eslint-disable-next-line no-unreachable
      break
    case '2':
      return 'status dua'
      // eslint-disable-next-line no-unreachable
      break
    case '3':
      return 'status tiga'
      // eslint-disable-next-line no-unreachable
      break
    case '4':
      return 'status empat'
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
