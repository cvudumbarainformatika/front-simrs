<template>
  <q-card-section>
    <TablePagex
      :ada-cari="false"
      :default-btn="false"
      :right-action="false"
      :items="store.items"
      :columns="store.kolom"
      :column-hide="store.columnHide"
      :loading="store.loading"
      row-no
      click-able
      @on-click="click"
      @refresh="store.refreshTable"
    >
      <template #header-left-after-search>
        <q-form
          ref="formRef"
          class="row q-pa-md q-col-gutter-xs"
          @submit="store.initAmbilData"
        >
          <div class="row q-col-gutter-sm">
            <div>
              <app-input-date-human
                :model="store.tanggal.from"
                label="dari tanggal"
                outlined
                @db-model="setTo"
                @set-display="setToDisp"
              />
            </div>
            <!-- <div>
                  <app-input-date-human
                    :model="store.tanggal.to"
                    label="sampai tanggal"
                    outlined
                    @db-model="setTox"
                    @set-display="setToFromDisp"
                  />
                </div> -->

            <div>
              <q-btn
                label="Cari"
                type="submit"
                color="primary"
                :loading="store.loading"
                :disable="store.loading"
              />
            </div>
          </div>
        </q-form>
      </template>
      <template #cell-PBF="{row}">
        {{ row?.PBF }}
      </template>
      <template #cell-Total="{row}">
        <div class="row justify-end">
          {{ formatDouble(row?.Total) }}
        </div>
      </template>
      <template #expand="{row}">
        <div v-if="row?.rinci?.length">
          <div class="row f-14 text-weight-bold q-my-sm">
            Detail Hutang Obat
          </div>
          <div class="row text-weight-bold bg-dark text-white items-center q-py-xs" style="border-bottom: 1px solid black;">
            <div class="col-1">
              No
            </div>
            <div class="col-2 ">
              No. Penerimaan
            </div>
            <div class="col-1">
              Kode
            </div>
            <div class="col-4">
              Obat
            </div>
            <div class="col-1 text-right ">
              Jumlah
            </div>
            <div class="col-1 text-right">
              Harga
            </div>
            <div class="col-1 text-right">
              PPN
            </div>
            <div class="col-1 text-right ">
              Subtotal
            </div>
          </div>
          <div v-for="(rincix,i) in row.rinci" :key="rincix">
            <div class="row no-wrap " style="border-bottom: 1px solid black;">
              <div class="col-1">
                {{ i+1 }}
              </div>
              <div class="col-2 bg-grey-2" style="white-space: normal; overflow-wrap: normal;">
                {{ rincix?.nopenerimaan }}
              </div>
              <div class="col-1 text-right" style="white-space: normal; overflow-wrap: normal;">
                <div class="q-mr-xs">
                  {{ rincix?.kdobat }}
                </div>
              </div>
              <div class="col-4 bg-grey-2" style="white-space: normal; overflow-wrap: normal;">
                {{ rincix?.masterobat?.nama_obat }}
              </div>
              <div class="col-1 text-right ">
                {{ rincix?.jml_terima_b }}
              </div>
              <div class="col-1 text-right ">
                {{ formatDouble(rincix?.harga) }}
              </div>
              <div class="col-1 text-right ">
                {{ formatDouble(rincix?.ppn_rp) }}
              </div>
              <div class="col-1 text-right ">
                {{ formatDouble(rincix?.subtotal) }}
              </div>
            </div>
          </div>
        </div>
      <!-- {{ row }} -->
      </template>
    </TablePagex>
  </q-card-section>
</template>

<script setup>
import TablePagex from './TablePageX.vue'
import { usehutangObatPerTanggalBastStore } from 'src/stores/simrs/laporan/farmasi/hutang/hutangobatpertanggalBast'
import { formatDouble } from 'src/modules/formatter'

const store = usehutangObatPerTanggalBastStore()

function click (val) {
  val.item.expand = !val.item.expand
}

function setToDisp (vaal) {
  store.tanggal.from = vaal
}

function setTo (val) {
  store.params.tgldari = val
}

</script>
