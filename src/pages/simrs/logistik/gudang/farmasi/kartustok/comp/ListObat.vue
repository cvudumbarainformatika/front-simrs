<template>
  <q-list
    separator
  >
    <template v-if="store.loading">
      <q-item
        v-for="n in 30"
        :key="n"
      >
        <q-item-section style="width:40%">
          <q-skeleton type="text" />
        </q-item-section>
        <q-item-section
          style="width:60%"
          side
        >
          <div class="row items-center full-width q-col-gutter-xs">
            <div class="col-3">
              <div
                style="display: flex; justify-content: end;"
                class="full-width"
              >
                <q-skeleton
                  type="text"
                  width="100px"
                />
              </div>
            </div>
            <div class="col-3 row justify-end">
              <q-skeleton
                type="text"
                width="100px"
              />
            </div>
            <div class="col-3 row justify-end">
              <q-skeleton
                type="text"
                width="100px"
              />
            </div>
            <div class="col-3 row justify-end">
              <q-skeleton
                type="text"
                width="100px"
              />
            </div>
          </div>
        </q-item-section>
      </q-item>
    </template>
    <template v-else>
      <q-item
        v-for="(item, i) in store.items"
        :key="i"
        clickable
        @click="store.setItem(item)"
        id="tableItem"
      >
        <q-item-section style="width:40%">
          <div class="row">
            <div>{{ item?.nama_obat }}</div> <div class="text-negative f-10 q-ml-lg">
              {{ item?.kd_obat }}
            </div>
          </div>
        </q-item-section>
        <q-item-section
          style="width:60%"
          side
        >
          <div class="row items-center full-width q-col-gutter-xs">
            <div class="col-3 text-right">
              {{ hitungSaldoAwal(item?.saldoawal) ?? 0 }}
            </div>
            <div class="col-3 text-right text-primary">
              {{ hitungPenerimaan(item?.penerimaanrinci) + hitungMutasiMasuk(item?.mutasimasuk) + hitungPenyesuaianMasuk(item?.stok) }}
            </div>
            <div class="col-3 text-right text-negative">
              {{ hitungMutasiKeluar(item?.mutasikeluar) + hitungResepKeluar(item?.resepkeluar) + hitungPenyesuaianKeluar(item?.stok) }}
            </div>

            <div class="col-3 text-right text-teal text-weight-bold">
              {{ (hitungSaldoAwal(item?.saldoawal) ?? 0) + (hitungPenerimaan(item?.penerimaanrinci)?? 0) + (hitungMutasiMasuk(item?.mutasimasuk) ?? 0) - (hitungMutasiKeluar(item?.mutasikeluar) ?? 0) - hitungResepKeluar(item?.resepkeluar) }}
            </div>
          </div>
        </q-item-section>
      </q-item>
    </template>
  </q-list>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { useKartuStokFarmasiStore } from 'src/stores/simrs/farmasi/katustok'
import { watchEffect } from 'vue'

const store = useKartuStokFarmasiStore()

// const tableItem = ref(null)
const $q = useQuasar()

function hitungSaldoAwal (arr) {
  return arr?.reduce((x, y) => parseFloat(x) + parseFloat(y.jumlah), 0)
}

// ini khusus gudang
function hitungPenerimaan (arr) {
  // jika jenis penerimaan bukan 'Pesanan' maka langsung jadi stok .... asal kunci =1
  // jika jenis penerimaan = 'Pesanan' maka harus jadi Faktur dulu,  jadi stok .... asal kunci = 1
  // const filt = arr?.filter((x) => x.jenissurat !== 'Surat Jalan')

  const terimalangsung = arr?.filter((x) => x.jenis_penerimaan !== 'Pesanan' && x.kunci === '1')
  const jmlterimalangsung = terimalangsung?.reduce((x, y) => parseFloat(x) + parseFloat(y.jml_terima_k), 0)

  const terimafaktur = arr?.filter((x) => x.jenis_penerimaan === 'Pesanan' && x.kunci === '1' && x.jenissurat === 'Faktur')
  const jmlterimafaktur = terimafaktur?.reduce((x, y) => parseFloat(x) + parseFloat(y.jml_terima_k), 0)

  // console.log('penerimaan', arr, jmlterimalangsung, jmlterimafaktur)
  // eslint-disable-next-line no-unused-vars
  const totalJml = jmlterimalangsung + jmlterimafaktur

  // return arr?.reduce((x, y) => parseFloat(x) + parseFloat(y.jml_terima_k), 0)
  return totalJml
}
function hitungMutasiKeluar (arr) {
  return arr?.reduce((x, y) => parseFloat(x) + parseFloat(y.jml), 0)
}
function hitungMutasiMasuk (arr) {
  return arr?.reduce((x, y) => parseFloat(x) + parseFloat(y.jml), 0)
}
function hitungResepKeluar (arr) {
  return arr?.reduce((x, y) => parseFloat(x) + parseFloat(y.jumlah), 0)
}

function hitungPenyesuaianMasuk (arr) {
  const penye = arr?.map(m => m.ssw)?.filter(f => f.penyesuaian > 0)

  return penye?.reduce((x, y) => parseFloat(x) + parseFloat(y.penyesuaian), 0)
}
function hitungPenyesuaianKeluar (arr) {
  const penye = arr?.map(m => m.ssw)?.filter(f => f.penyesuaian < 0)

  return penye?.reduce((x, y) => parseFloat(x) + parseFloat(y.penyesuaian), 0)
}

function exportToExcel (tableId, filename) {
  // const el = document.getElementById(tableId)
  // const filenames = filename ? filename + '.xls' : 'KartuStokFarmasi.xls'
  // const columns = store.items
  // const content = [columns.map(col => wrapCsvValue(col.label))].concat(
  //   rows.map(row => columns.map(col => wrapCsvValue(
  //     typeof col.field === 'function'
  //       ? col.field(row)
  //       : row[col.field === void 0 ? col.name : col.field],
  //     col.format,
  //     row
  //   )).join(','))
  // ).join('\r\n')

  // const status = exportFile(
  //   'table-export.csv',
  //   content,
  //   'text/csv'
  // )
  // console.log('mulai export', el?.parentElement)
  $q.notify({
    message: 'Masih dibuatkan ... harap tunggu',
    color: 'negative',
    icon: 'icon-mat-warning'
  })
}

watchEffect(() => {
  if (store.exportExcel) {
    // console.log('store.exportExcel', store.exportExcel)
    exportToExcel('tableItem', 'KartuStokFarmasi')
  }
})
</script>
