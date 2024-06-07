<template>
  <q-dialog
    persistent
    :maximized="true"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card
      class=""
      style="overflow: hidden;"
    >
      <div class="column full-height scroll">
        <div class="col-auto">
          <div class="column">
            <q-bar class="bg-primary text-white">
              <q-space />
              <q-btn
                v-close-popup
                dense
                flat
                icon="icon-mat-close"
              >
                <q-tooltip class="bg-white text-primary">
                  Close
                </q-tooltip>
              </q-btn>
            </q-bar>

            <div class="q-px-md q-py-sm">
              <div class="row justify-between">
                <div class="kiri column">
                  <div class="row">
                    <div style="width:100px">
                      Ruangan
                    </div>
                    <div> : {{ params.koderuangan }}</div>
                  </div>
                  <div class="row">
                    <div style="width:100px">
                      Kode Barang
                    </div>
                    <div> : {{ item?.kd_obat }}</div>
                  </div>
                  <div class="row">
                    <div style="width:100px">
                      Nama Barang
                    </div>
                    <div> : {{ item?.nama_obat }}</div>
                  </div>
                </div>
                <div class="kanan column">
                  <div class="text-right">
                    Periode
                  </div>
                  <div>
                    Bulan {{ bulans[parseInt(params?.bulan) - 1??0] }} Tahun {{ params?.tahun }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col full-height">
          <q-scroll-area style="height: calc( 100% - 1px );">
            <table>
              <thead>
                <tr>
                  <th>Tanggal</th>
                  <th>Keterangan</th>
                  <th class="text-end">
                    Masuk
                  </th>
                  <th class="text-end">
                    Keluar
                  </th>
                  <th class="text-end">
                    Stok
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td
                    colspan="4"
                  >
                    <b>Saldo Awal</b>
                  </td>
                  <td class="text-end ">
                    <b>{{ saldoAwal }}</b>
                  </td>
                </tr>
                <template v-if="bentukArrBaru.length">
                  <tr
                    v-for="(item, n) in bentukArrBaru"
                    :key="item"
                  >
                    <td>{{ item?.tanggal }}</td>
                    <td>
                      {{ item?.keterangan }}
                    </td>
                    <td class="text-end">
                      {{ formatRp(item?.masuk ?? 0) }}
                    </td>
                    <td class="text-end">
                      {{ formatRp(item?.keluar ?? 0) }}
                    </td>
                    <td class="text-end">
                      {{ formatRp(cariHasilAkhirArray(n) ?? 0) }}
                    </td>
                  </tr>
                  <tr>
                    <td colspan="4">
                      <b>Saldo Akhir</b>
                    </td>
                    <td class="text-end">
                      <b>{{ formatRp(cariHasilAkhirArray(bentukArrBaru.length)?? 0) }}</b>
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
          </q-scroll-area>
        </div>
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { date } from 'quasar'
import { formatRp } from 'src/modules/formatter'

const props = defineProps({
  item: {
    type: Object,
    default: null
  },
  params: {
    type: Object,
    default: null
  }
})

const bulans = ref(['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'Novermber', 'Desember'])

const bentukArrBaru = computed(() => {
  const terimalangsung = props?.item?.penerimaanrinci?.filter((x) => x.jenis_penerimaan === 'Pembelian langsung' && x.kunci === '1')?.map(x => {
    return {
      tanggal: date.formatDate(x?.tglpenerimaan, 'DD, MMM YYYY'),
      jam: date.formatDate(x?.tglpenerimaan, 'HH:mm'),
      keterangan: 'Penerimaan Langsung',
      masuk: parseFloat(x?.jml_terima_k),
      keluar: 0,
      total: 0
    }
  })

  const terimapesan = props?.item?.penerimaanrinci?.filter((x) => x.jenis_penerimaan !== 'Pembelian langsung' && x.kunci === '1' && x.jenissurat === 'Faktur')?.map(x => {
    return {
      tanggal: date.formatDate(x?.tglpenerimaan, 'DD, MMM YYYY'),
      jam: date.formatDate(x?.tglpenerimaan, 'HH:mm'),
      keterangan: x?.jenis_penerimaan === 'Pembelian langsung' ? 'Penerimaan langsung' : 'Penerimaan By Pesan',
      masuk: parseFloat(x?.jml_terima_k),
      keluar: 0,
      total: 0
    }
  })

  const mutasikeluar = props?.item?.mutasikeluar?.map(x => {
    return {
      tanggal: date.formatDate(x?.tgl_permintaan, 'DD, MMM YYYY'),
      jam: date.formatDate(x?.tgl_permintaan, 'HH:mm'),
      keterangan: 'Mutasi Keluar',
      masuk: 0,
      keluar: parseFloat(x?.jml),
      total: 0
    }
  })

  const mutasimasuk = props?.item?.mutasimasuk?.map(x => {
    return {
      tanggal: date.formatDate(x?.tgl_permintaan, 'DD, MMM YYYY'),
      jam: date.formatDate(x?.tgl_permintaan, 'HH:mm'),
      keterangan: 'Mutasi Masuk',
      masuk: parseFloat(x?.jml),
      keluar: 0,
      total: 0
    }
  })

  const resepkeluar = props?.item?.resepkeluar?.map(x => {
    return {
      tanggal: date.formatDate(x?.tgl_permintaan, 'DD, MMM YYYY'),
      jam: date.formatDate(x?.tgl_permintaan, 'HH:mm'),
      keterangan: 'Resep Keluar',
      masuk: 0,
      keluar: parseFloat(x?.jumlah),
      total: 0
    }
  })

  const gabung = [terimalangsung, terimapesan, mutasikeluar, mutasimasuk, resepkeluar]

  const hasil = gabung.flat(Infinity)

  return hasil
})

const saldoAwal = computed(() => {
  const awal = props?.item?.saldoawal
  const saldoAwal = awal?.reduce((x, y) => parseFloat(x) + parseFloat(y.jumlah), 0)

  return saldoAwal
})

// eslint-disable-next-line no-unused-vars
function cariHasilAkhirArray (i) {
  // const total = 0
  const arr = bentukArrBaru.value ?? []
  if (arr.length) {
    // for (let i = 0; i < arr.length; i++) {
    // if (i === 0) {
    //   total = arr[0]?.penerimaan - arr[0]?.pengeluaran
    //   arr[0].total = total
    // }
    // else {
    const hinggaKeIndex = i + 1
    const arrBaru = arr.slice(0, hinggaKeIndex)
    // const awal = arr[0]?.penerimaan - arr[0]?.pengeluaran
    // const subT = arr[i]?.penerimaan - arr[i]?.pengeluaran;
    const obj = arrBaru.map((x) => x?.masuk - x?.keluar)
    const skrg = obj?.reduce((x, y) => x + y, 0)

    const total = skrg + saldoAwal.value
    // }
    // }
    return total
  }
  return 0
}

onMounted(() => {
  console.log('props', props?.item)
  console.log('computed', bentukArrBaru.value)
  console.log('saldoAwal', saldoAwal.value)
})
</script>

<style lang="scss" scoped>

.text-end{
  text-align: end;
}
/* Standard Tables */

table {
  // margin: 1em 0;
  // border-collapse: collapse;
  border: 0.1em solid #d6d6d6;
  width: 100%;
}

caption {
  text-align: left;
  font-style: italic;
  padding: 0.25em 0.5em 0.5em 0.5em;
  // position: -webkit-sticky;
  // position: sticky;
  // top: 0;
  // z-index: 2;
}

th,
td {
  padding: 0.25em 0.5em 0.25em 1em;
  vertical-align: text-top;
  text-align: left;
  text-indent: -0.5em;
}

th {
  vertical-align: bottom;
  background-color: #666;
  color: #fff;
}

tr:nth-child(even) th[scope=row] {
  background-color: #f2f2f2;
}

tr:nth-child(odd) th[scope=row] {
  background-color: #fff;
}

tr:nth-child(even) {
  background-color: rgba(0, 0, 0, 0.05);
}

tr:nth-child(odd) {
  background-color: rgba(255, 255, 255, 0.05);
}

td:nth-of-type(2) {
  font-style: italic;
}

// th:nth-of-type(3),
// td:nth-of-type(3) {
//   text-align: right;
// }
/* Fixed Headers */

th {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 2;
}

th[scope=row] {
  position: -webkit-sticky;
  position: sticky;
  left: 0;
  z-index: 1;
}

th[scope=row] {
  vertical-align: top;
  color: inherit;
  background-color: inherit;
  background: linear-gradient(90deg, transparent 0%, transparent calc(100% - .05em), #d6d6d6 calc(100% - .05em), #d6d6d6 100%);
}

table:nth-of-type(2) th:not([scope=row]):first-child {
  left: 0;
  z-index: 3;
  background: linear-gradient(90deg, #666 0%, #666 calc(100% - .05em), #ccc calc(100% - .05em), #ccc 100%);
}

/* Strictly for making the scrolling happen. */

th[scope=row] + td {
  min-width: 24em;
}

th[scope=row] {
  min-width: 20em;
}

</style>
