<template>
  <div>
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
      <!-- @edit-data="store.editData" -->
      <!--
            row-image="image"
            @delete-ids="table.deletesData"
            -->

      <!-- <template #header-left-after-search>
        <div class="q-ml-md text-white">
          <div class="row q-mb-xs q-ml-xs items-center">

          </div>
        </div>
      </template> -->
      <template #col-nomor>
        <div>Nomor</div>
      </template>
      <template #col-tanggal>
        <div>Tanggal</div>
      </template>
      <template #col-penyedia>
        <div>Penyedia</div>
      </template>
      <template #col-total>
        <div>Jumlah</div>
      </template>
      <template #col-oleh>
        <div>Oleh</div>
      </template>

      <template #cell-tanggal="{ row }">
        <div class="row justify-between no-wrap">
          <div class="q-mr-sm">
            Trans
          </div>
          <div>
            {{ row.tgl_trans ? dateFullFormat(row.tgl_trans):'-' }}
          </div>
        </div>
        <div class="row justify-between no-wrap">
          <div class="q-mr-sm">
            Bast
          </div>
          <div>
            {{ row.tgl_bast ? dateFullFormat(row.tgl_bast):'-' }}
          </div>
        </div>
        <div class="row justify-between no-wrap">
          <div class="q-mr-sm">
            Pencairan NPK
          </div>
          <div>
            {{ row.tgl_pencairan_npk ? dateFullFormat(row.tgl_pencairan_npk):'-' }}
          </div>
        </div>
        <div class="row justify-between no-wrap">
          <div class="q-mr-sm">
            Pembaayaran
          </div>
          <div>
            {{ row.tgl_pembayaran ? dateFullFormat(row.tgl_pembayaran):'-' }}
          </div>
        </div>
      </template>
      <template #cell-nomor="{ row }">
        <div class="row justify-between no-wrap q-mt-xs">
          <div class="q-mr-sm">
            Trans List
          </div>
          <div class=" text-weight-bold">
            {{ row.notranskonsi??'-' }}
          </div>
        </div>
        <div class="row justify-between no-wrap q-mt-xs">
          <div class="q-mr-sm">
            Bast
          </div>
          <div class=" text-weight-bold">
            {{ row.nobast??'-' }}
          </div>
        </div>
        <div class="row justify-between no-wrap q-mt-xs">
          <div class="q-mr-sm">
            NPD
          </div>
          <div class=" text-weight-bold">
            {{ row.no_npd??'-' }}
          </div>
        </div>
        <div class="row justify-between no-wrap q-mt-xs">
          <div class="q-mr-sm">
            Kwitansi
          </div>
          <div class=" text-weight-bold">
            {{ row.no_kwitansi??'-' }}
          </div>
        </div>
      </template>
      <template #cell-penyedia="{ row }">
        <div class="row justify-between no-wrap">
          {{ row?.penyedia?.nama ?? '-' }}
        </div>
      </template>

      <template #cell-total="{ row }">
        <div class="row justify-between no-wrap">
          <div class="q-mr-sm">
            Trans Konsi
          </div>
          <div :class="parseFloat(row?.jumlah_konsi)>0?'text-weight-bold':''">
            {{ formatDouble(row?.jumlah_konsi,2)??0 }}
          </div>
        </div>
        <div class="row justify-between no-wrap">
          <div class="q-mr-sm">
            BAST
          </div>
          <div :class="parseFloat(row?.jumlah_bast)>0?'text-weight-bold':''">
            {{ (formatDouble(row?.jumlah_bastx,2)??formatDouble(row?.jumlah_bast,2))??0 }}
          </div>
        </div>
        <div class="row justify-between no-wrap">
          <div class="q-mr-sm">
            Pembayaran
          </div>
          <div :class="parseFloat(row?.nilai_pembayaran)>0?'text-weight-bold':''">
            {{ formatDouble(row?.nilai_pembayaran,2)??0 }}
          </div>
        </div>
      </template>
      <template #cell-oleh="{ row }">
        <div class="row justify-between no-wrap">
          <div class="q-mr-sm">
            Trans Konsi
          </div>
          <div>
            {{ row?.konsi?.nama?? '-' }}
          </div>
        </div>
        <div class="row justify-between no-wrap">
          <div class="q-mr-sm">
            BAST
          </div>
          <div>
            {{ row?.bast?.nama?? '-' }}
          </div>
        </div>
        <div class="row justify-between no-wrap">
          <div class="q-mr-sm">
            Pembayaran
          </div>
          <div>
            {{ row?.bayar?.nama?? '-' }}
          </div>
        </div>
      </template>

      <template #expand="{ row }">
        <div v-if="row.rinci?.length">
          <div class="row items-center text-weight-bold">
            <div class="col-1 ">
              No
            </div>
            <div class="col-3 ">
              Obat
            </div>
            <div class="col-3 ">
              Identitas
            </div>
            <div class="col-3 ">
              Nomor
            </div>
            <div class="col-2 text-right">
              Jumlah
            </div>
          </div>
          <q-separator />
          <div
            v-for="(rin, i) in row.rinci"
            :key="i"
          >
            <div class="row items-center q-col-gutter-sm">
              <div class="col-1">
                {{ i+1 }}
              </div>
              <div class="col-3">
                <div class="row">
                  {{ rin?.obat?.nama_obat }}
                </div>
                <div class="row f-10 text-italic">
                  {{ rin?.kdobat }}
                </div>
              </div>
              <div class="col-3">
                <div class="row justify-between no-wrap">
                  <div class="q-mr-sm">
                    Pasien
                  </div>
                  <div class="">
                    {{ rin?.pasien?.rs2 }}
                  </div>
                  <div class="f-10 text-italic">
                    ({{ rin?.noreg }})
                  </div>
                </div>
                <div class="row justify-between no-wrap">
                  <div class="q-mr-sm">
                    Dokter
                  </div>
                  <div class="">
                    {{ rin?.iddokter?.nama }}
                  </div>
                </div>
              </div>
              <div class="col-3">
                <div class="row justify-between no-wrap">
                  <div class="q-mr-sm">
                    Penerimaan
                  </div>
                  <div class="text-weight-bold text-primary">
                    {{ rin?.nopenerimaan }}
                  </div>
                </div>
                <div class="row justify-between no-wrap">
                  <div class="q-mr-sm">
                    Permintaan OP
                  </div>
                  <div class="text-weight-bold text-orange">
                    {{ rin?.nopermintaan }}
                  </div>
                </div>
                <div class="row justify-between no-wrap">
                  <div class="q-mr-sm">
                    Resep
                  </div>
                  <div class="text-weight-bold text-green">
                    {{ rin?.noresep }}
                  </div>
                </div>
              </div>
              <div class="col-2 text-right">
                <div class="row justify-between no-wrap">
                  <div class="q-mr-sm">
                    Jumlah
                  </div>
                  <div class="">
                    {{ rin?.jumlah }} ({{ rin?.obat?.satuan_k }})
                  </div>
                </div>
                <div class="row justify-between no-wrap">
                  <div class="q-mr-sm">
                    Harga
                  </div>
                  <div class="">
                    {{ formatDouble(rin?.harga_net,2) }}
                  </div>
                </div>
                <div class="row justify-between no-wrap">
                  <div class="q-mr-sm">
                    subtotal
                  </div>
                  <div class="text-weight-bold">
                    {{ formatDouble(rin?.subtotal,2) }}
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
import { dateFullFormat, formatDouble } from 'src/modules/formatter'
import { useListBastKonsinyasiFarmasiStore } from 'src/stores/simrs/farmasi/bast/listkonsinyasi'

const store = useListBastKonsinyasiFarmasiStore()
// click
function onClick (val) {
  console.log('click', val)
  val.item.expand = !val.item.expand
  val.item.highlight = !val.item.highlight
}
store.getInitialData()
</script>
<style scoped>

.box {
  white-space: normal !important;
    inline-size: 400px;
    overflow-wrap: break-word;
}
.box2 {
  white-space: normal !important;
    inline-size: 150px;
    overflow-wrap: break-word;
}
.terima{
  background-color: rgba(120, 231, 51, 0.549);
}
.anu:hover{
  background-color: rgba(166, 173, 144, 0.548);
}
.anudua:hover{
  background-color: rgb(54, 196, 231);
}
</style>
