<template>
  <div class="row">
    <app-table
      title="obat"
      :columns="table.columns"
      :column-hide="table.columnHide"
      :items="table.items"
      :meta="table.meta"
      :per-page="table.params.per_page"
      :order-by="table.params.order_by"
      :sort="table.params.sort"
      :loading="table?.loading"
      :to-search="table.params.q"
      :default-btn="false"
      :ada-paginasi="false"
      :ada-cari="false"
      :ada-refresh="false"
      :ada-per-page="false"
      :ada-filter="false"
      :ada-tambah="false"
    >
      <template #col-obat>
        <div>Obat</div>
      </template>
      <template #col-stok>
        <div>Stok</div>
      </template>
      <template #col-stokalokasi>
        <div>Stok Min</div>
      </template>
      <template #col-minta>
        <div>Sedang Proses</div>
      </template>

      <template #cell-obat="{row}">
        <div class="row no-wrap text-weight-bold text-green">
          {{ row.kd_obat }}
        </div>
        <div class="row text-weight-bold text-amber-10 box text-right no-wrap items-center">
          {{ row.nama_obat }}
        </div>
        <!-- <div class="row text-weight-bold no-wrap text-italic f-10">
          ( {{ row.satuan_k ? row.satuan_k :'-' }} )
        </div> -->
        <div class="row justify-start no-wrap q-my-xs">
          <div
            class="text-weight-bold"
            :class="row.status_fornas === '1'?'text-green':'text-negative'"
          >
            {{ row.status_fornas==='1' ?'Fornas':'' }}
          </div>
          <div
            class="text-weight-bold q-ml-sm"
            :class="row.status_forkid === '1'?'text-green':'text-negative'"
          >
            {{ row.status_forkid==='1' ?'Forkit':'' }}
          </div>
          <div
            class="text-weight-bold q-ml-sm"
            :class="row.status_generik === '1'?'text-green':'text-negative'"
          >
            {{ row.status_generik==='1' ?'Generik':'' }}
          </div>
        </div>
        <div class="row justify-start no-wrap q-my-xs">
          <div
            class="text-weight-bold"
            :class="row.gudang === 'Gd-03010100'?'text-blue':(row.gudang === 'Gd-05010100'?'text-primary':'text-green')"
          >
            {{ row.gudang==='Gd-03010100' ?'Gudang Floor Stok':(row.gudang === 'Gd-05010100'?'Gudang Kamar Obat':'Semua gudang') }}
          </div>
        </div>
      </template>
      <template #cell-stok="{row}">
        <div class="row no-wrap text-italic">
          {{ cariGudang(row.kdruang) }}
          <!-- {{ store?.disp?.kdruang }} -->
        </div>
        <div class="row no-wrap text-weight-bold  items-end">
          <div>
            {{ row.total }}
          </div>
          <div class="q-ml-sm f-10 text-italic">
            ( {{ row.satuan_k ? row.satuan_k :'-' }} )
          </div>
        </div>
        <div class="row no-wrap text-italic f-10">
          {{ row.harga? 'Rp ' + formatRp( row.harga ): 'Harga tidak ditemukan' }}
        </div>
        <div class="row no-wrap text-italic f-10">
          {{ row.tglexp ?'exp : ' + dateFullFormat( row.tglexp ):'tanggal expired tidak ditemukan' }}
        </div>
      </template>
      <template #cell-stokalokasi="{row}">
        <div
          class="row no-wrap text-weight-bold  items-end"
        >
          <div>
            {{ row?.minvalue }}
          </div>
          <div class="q-ml-sm f-10 text-italic">
            ( {{ row.satuan_k ? row.satuan_k :'-' }} )
          </div>
        </div>
      </template>
      <template #cell-minta="{row}">
        <div
          v-if="row?.permintaanobatrinci.length"
          class="row no-wrap text-weight-bold  items-end"
        >
          <div v-for="(minta) in row?.permintaanobatrinci" :key="minta">
            <div class="row items-end no-wrap">
              <div class="col-auto">
                {{ parseFloat(minta?.jml) > 0 ? minta?.jml : minta?.jumlah_minta }}
              </div>
              <div class="col-auto q-ml-sm f-10 text-italic">
                ( {{ row.satuan_k ? row.satuan_k :'-' }} )
              </div>
              <div :class="'col-auto q-ml-sm text-' + color(minta?.flag) ">
                {{ status(minta?.flag) }}
              </div>
            </div>
          </div>
        </div>
      </template>
    </app-table>
    <DetailAlokasi v-model="table.isOpen" />
  </div>
</template>
<script setup>
import { dateFullFormat, formatRp } from 'src/modules/formatter'
import { useAplikasiStore } from 'src/stores/app/aplikasi'
import { defineAsyncComponent, onMounted } from 'vue'
import { UseFarmasiStokMinDepoTable } from 'src/stores/simrs/farmasi/stokmindepo/tabel'
import { UseFarmasiStokMinDepoStore } from 'src/stores/simrs/farmasi/stokmindepo/form'
import { laravelEcho } from 'src/modules/newsockets'

const table = UseFarmasiStokMinDepoTable()
const store = UseFarmasiStokMinDepoStore()
const apps = useAplikasiStore()

const DetailAlokasi = defineAsyncComponent(() => import('./DetailAlokasi.vue'))

function subscribedChannel () {
  const channel = laravelEcho.private('private.notif.depo-farmasi')
  channel.subscribed(() => {
    console.log('subscribed private.notif.depo-farmasi channel !!!')
  }).listen('.notif-message', (e) => {
    console.log('listen notif', e)
    if (apps?.user?.kdruangansim === e?.message?.data?.depo) {
      const kdobat = e?.message?.data?.kdobat
      if (e?.message?.data?.aksi === 'simpan') {
        const item = table.items?.find(it => it.kdobat === kdobat)
        if (item) {
          const datanya = {
            kdobat,
            jumlah_minta: e?.message?.data?.jumlah_minta,
            no_permintaan: e?.message?.data?.no_permintaan,
            dari: e?.message?.data?.dari,
            flag: e?.message?.data?.flag ?? '',
            jml: e?.message?.data?.jml ?? 0
          }
          const index = item?.permintaanobatrinci.findIndex(ind => ind.kdobat === kdobat && ind.no_permintaan === e?.message?.data?.no_permintaan)
          if (index >= 0) {
            item.permintaanobatrinci[index] = datanya
          }
          else item.permintaanobatrinci.push(datanya)
        }
        console.log('simp', item)
      }
      if (e?.message?.data?.aksi === 'distribusi') {
        const item = table.items?.find(it => it.kdobat === kdobat)
        // console.log('dist', item)
        if (item) {
          const index = item?.permintaanobatrinci.findIndex(ind => ind.kdobat === kdobat && ind.no_permintaan === e?.message?.data?.no_permintaan)
          if (index >= 0) { item.permintaanobatrinci[index].jml = e?.message?.data?.jml }
        }
        console.log('dist', item)
      }
      if (e?.message?.data?.aksi === 'kunci') {
        if (parseInt(e?.message?.data?.flag) >= 4) table.getDataTable()
        const kodeobats = e?.message?.data?.kodeobats
        if (kodeobats.length) {
          kodeobats?.forEach(kd => {
            const kdobat = kd?.kdobat
            const item = table.items?.find(it => it.kdobat === kdobat)
            // console.log(item)
            if (item) {
              const index = item?.permintaanobatrinci.findIndex(ind => ind.kdobat === kdobat && ind.no_permintaan === e?.message?.data?.no_permintaan)
              if (index >= 0) item.permintaanobatrinci[index].flag = e?.message?.data?.flag
            }
            // console.log('kun', item)
          })
        }
      }
    }
  })
}

function cariGudang (val) {
  if (table.gudangs.length) {
    const gudang = table.gudangs.filter(gud => gud.kode === val)
    if (apps?.user?.kdruangansim !== '') {
      const gudang2 = table.gudangs.filter(gud => gud.kode === apps?.user?.kdruangansim)
      store.setDisp('kdruang', gudang2[0]?.nama)
    }
    if (gudang.length) {
      return gudang[0]?.nama
    }
    else return 'Gudang / Depo tidak ditemukan'
  }
  else {
    return 'menunggu data Gudang / Depo'
  }
}
const status = (status) => {
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
    case '5':
      return 'Ditolak'
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
onMounted(() => {
  subscribedChannel()
})
</script>
