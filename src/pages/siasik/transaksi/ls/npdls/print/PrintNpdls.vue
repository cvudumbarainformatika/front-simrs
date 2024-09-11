<template>
  <div class="cont row justify-center q-pt-md">
    <div class="row">
      <div class="col-1 q-pl-md">
        <q-img
          src="~assets/images/Pemkot.svg"
          style="height: 2.6cm; width: 2cm"
        />
      </div>
      <div class="col-10">
        <div class="row justify-center text-h6">
          PEMERINTAH KOTA PROBOLINGGO
        </div>
        <div class="row justify-center text-h7 text-weight-bold">
          DINAS KESEHATAN, PENGENDALIAN PENDUDUK, DAN KELUARGA BERENCANA
        </div>
        <div class="row justify-center text-h5 text-weight-bold">
          UOBK RSUD DOKTER MOHAMAD SALEH
        </div>
        <div class="row justify-center text-h8">
          Jl. Mayjen Panjaitan No.65 Telp.(0335) 433119, 42118 Fax (0335)
          432702
        </div>
        <div class="row justify-center text-h8 text-weight-bold">
          PROBOLINGGO 67219
        </div>
      </div>
      <div class="col-1 logo_kanan">
        <q-img
          src="~assets/logos/logo-rsud.png"
          style="height: 2.6cm; width: 2.6cm"
        />
      </div>
      <div class="kop col-12" />
      <div class="col-12 q-pt-md">
        <div class="row justify-center text-weight-bold">
          Nota Permintaan Dana Langsung (NPD-LS)
        </div>
        <div class="row justify-center text-weight-bold">
          Nomor : {{ store.form.nonpdls }}
        </div>
        <!-- <div class="row justify-center text-weight-bold">
            Periode Bulan {{ bulan(store.params.bulan) }} {{ store.params.tahun }}
          </div> -->
      </div>
      <div class="q-pl-lg" />
    </div>

    <div class="headerkedua row items-left q-pt-xl">
      <table>
        <tbody>
          <tr>
            <td width="150px">
              Kegiatan BLUD
            </td>
            <td width="min:150px">
              : {{ store.form.kegiatanblud }}
            </td>
          </tr>
          <tr>
            <td width="150px">
              Pihak Ketiga
            </td>
            <td width="min:150px">
              : {{ store.form.penerima }}
            </td>
          </tr>
          <tr>
            <td width="150px">
              Nama Bank
            </td>
            <td width="min:150px">
              : {{ store.form.bank }}
            </td>
          </tr>
          <tr>
            <td width="150px">
              No. Rekening
            </td>
            <td width="min:150px">
              : {{ store.form.rekening }}
            </td>
          </tr>
          <tr>
            <td width="150px">
              NPWP
            </td>
            <td width="min:150px">
              : {{ store.form.npwp }}
            </td>
          </tr>
          <tr>
            <td width="150px">
              Keperluan
            </td>
            <td width="min:150px">
              : {{ store.form.keterangan }}
            </td>
          </tr>
        </tbody>
      </table>

      <div class="table row q-pt-xl">
        <template v-if="store.reqs.rincianmanual">
          <div class="float-center">
            <q-table
              :rows="store.form.rincians"
              :columns="columns"
              row-key="name"
              hide-bottom
              dense
              style="min-width:1050px; width:fit-content;"
              class="float-center"
            >
              <template #body="props">
                <q-tr :props="props">
                  <q-td key="koderek50" :props="props" class="text-left">
                    {{ props.row.koderek50 }}
                  </q-td>
                  <q-td key="rincianbelanja" :props="props" class="text-left  grid">
                    {{ props.row.rincianbelanja }}
                  </q-td>
                  <q-td key="itembelanja" :props="props" class="text-left">
                    {{ props.row.itembelanja }}
                  </q-td>
                  <q-td key="nominalpembayaran" :props="props" class="text-right">
                    {{ formattanpaRp(props.row.nominalpembayaran) }}
                  </q-td>
                </q-tr>
              </template>
            </q-table>
          </div>
        </template>
        <template v-else-if="store.form.rincians">
          <div>
            <q-table
              :rows="store.form.rincians"
              :columns="columnbast"
              row-key="name"
              hide-bottom
            >
              <template #body="props">
                <q-tr :props="props">
                  <q-td key="nopenerimaan" :props="props" class="text-left">
                    {{ props.row.nopenerimaan }}
                  </q-td>
                  <q-td key="koderek50" :props="props">
                    {{ props.row.koderek50 }}
                  </q-td>
                  <q-td key="rincianbelanja" :props="props">
                    {{ props.row.rincianbelanja }}
                  </q-td>
                  <q-td key="koderek108" :props="props">
                    {{ props.row.koderek108 }}
                  </q-td>
                  <q-td key="itembelanja" :props="props">
                    {{ props.row.itembelanja }}
                  </q-td>
                  <q-td key="nominalpembayaran" :props="props" class="text-right">
                    {{ formattanpaRp(props.row.nominalpembayaran) }}
                  </q-td>
                </q-tr>
              </template>
            </q-table>
          </div>
        </template>
        <div class="subtotal">
          <table class="vertical-center">
            <tbody>
              <tr>
                <td width="100px" class="text-bold q-pl-md">
                  SUBTOTAL
                </td>
                <td width="20px" class="text-bold">
                  :
                </td>
                <td class="text-left text-bold q-pr-md">
                  {{ 'Rp. ' + formattanpaRp(store.reqs.subtotal) }}
                </td>
              </tr>
              <tr>
                <td width="100px" class="text-bold q-pl-md">
                  Terbilang
                </td>
                <td width="20px" class="text-bold">
                  :
                </td>
                <td class="text-right text-bold q-pr-md">
                  {{ terbilangRupiah(store.reqs.subtotal) + ' Rupiah' }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="ttd-kanan">
          <div>
            Probolinggo {{ store.display.sekarang }}
          </div>
          <div class="text-bold">
            Bendahara Pengeluaran
          </div>
          <div style="padding-bottom: 40px" />
          <div class="underline text-bold">
            {{ pegawai.pegawais[0]?.nama }}
            <div class="garis-bawah" style="text-decoration-line: underline;" />
          </div>
          <div>
            NIP. {{ pegawai.pegawais[0]?.nip }}
          </div>
        </div>
        <div class="ttd-kiri">
          <div class="invisible">
            .
          </div>
          <div class="text-bold">
            Pejabat Teknis Kegiatan
          </div>
          <div style="padding-bottom: 40px" />
          <div class="underline text-bold">
            {{ store.form.pptk }}
            <div class="garis-bawah" style="text-decoration-line: underline;" />
          </div>
          <div>
            NIP. {{ store.form.kodepptk }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { formNotaPermintaanDanaLS } from 'src/stores/siasik/transaksi/ls/npdls/formnpdls'
import { useLaporanBkuPengeluaranStore } from 'src/stores/siasik/laporan/bku/bkupengeluaran'

import { formattanpaRp } from 'src/modules/formatter'
// eslint-disable-next-line no-unused-vars
import { terbilangRupiah } from 'src/modules/utils'

const store = formNotaPermintaanDanaLS()
const pegawai = useLaporanBkuPengeluaranStore()

import { onMounted, ref } from 'vue'
const tablerinci = [
  {
    label: 'Rekening',
    name: 'koderek50',
    align: 'center',
    field: 'koderek50'
  },
  {
    label: 'Rincian Belanja',
    name: 'rincianbelanja',
    align: 'center',
    field: 'rincianbelanja'
  },
  {
    label: 'Item Belanja',
    name: 'itembelanja',
    align: 'center',
    field: 'itembelanja'
  },
  {
    label: 'Jumlah',
    name: 'nominalpembayaran',
    align: 'center',
    field: 'nominalpembayaran'
  }
]
const columns = ref(tablerinci)

const tablebast = [
  {
    label: 'No BAST',
    name: 'nopenerimaan',
    align: 'center',
    field: 'nopenerimaan'
  },
  {
    label: 'Rekening 50',
    name: 'koderek50',
    align: 'center',
    field: 'koderek50'
  },
  {
    label: 'Uraian',
    name: 'rincianbelanja',
    align: 'center',
    field: 'rincianbelanja'
  },
  {
    label: 'Rekening 108',
    name: 'koderek108',
    align: 'center',
    field: 'koderek108'
  },
  {
    label: 'Item Belanja',
    name: 'itembelanja',
    align: 'center',
    field: 'itembelanja'
  },
  {
    label: 'Nominal Pembayaran',
    name: 'nominalpembayaran',
    align: 'center',
    field: 'nominalpembayaran'
  }
]
const columnbast = ref(tablebast)
onMounted(() => {
  pegawai.getDataTable()
})

// function hitungSubtotal () {
//   const arr = store.form.rincians
//   const obj = arr.length ? arr.map((x) => x.nominalpembayaran) : []
//   const subtotal = obj.reduce((x, y) => x + y, 0)
//   // console.log('jumlah', obj)
//   // const total = nominal.reduce((x, y) => x + y, 0)
//   return subtotal
// }
</script>
<style lang="scss" scoped>
.headerkedua{
  position: fixed;
  justify-content: left;
  left: 20px;
  top: 200px;
  width: fit-content;
}
.kop{
  border-bottom: 1px solid grey;
  width: fit-content;
}
.logo_kanan{
  right: 5%;
  position: relative;
}
.subtotal{
  position: relative;
  width: 100%;
  height: 100px;
  border-radius: 5px;
}
.vertical-center {
  margin: 0;
  position: absolute;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}
.table{
  position: relative;
  break-inside: auto;
  top: 32%;
  align-content: center;
}

.ttd-kanan{
  position: relative;
  top: 80px;
  margin-left: 350px;
  text-align: center;
  justify-content: center;
  width: 65%;
  height: 100px;
}
.ttd-kiri{
  position: relative;
  bottom: 20px;
  margin-left: -150px;
  text-align: center;
  justify-content: center;
  width: 65%;
  height: 100px;
}
.underline {
  text-decoration-line: underline;

}
</style>
