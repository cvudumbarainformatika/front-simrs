<template>
  <div class="q-pa-sm">
    <div v-if="loading">
      <app-loading />
    </div>
    <div v-else>
      <div class="row justify-center text-weight-bold f-18">
        Blangko Stok Opname
      </div>
      <div class="row justify-center text-weight-bold f-16">
        {{ tempat }}
      </div>
      <div class="row justify-center text-weight-bold f-16">
        {{ keterangan }} per Tanggal {{ tanggal }}
      </div>
      <app-table-extend
        id="printMe"
        :columns="columns"
        :items="items"
        :loading="loading"
        :default-btn="false"
        :ada-tambah="false"
        :ada-filter="false"
        :ada-paginasi="false"
        :ada-cari="false"
        :ada-refresh="false"
        :ada-per-page="false"
        row-no
      >
        <!-- tanda-tangan -->
        <template #header-for-print>
          <div class="garis-bawah">
            <div class="row justify-center text-weight-bold f-18">
              Blangko Stok Opname
            </div>
            <div class="row justify-center text-weight-bold f-16">
              {{ tempat }}
            </div>
            <div class="row justify-center text-weight-bold f-16">
              {{ keterangan }} per Tanggal {{ tanggal }}
            </div>
          </div>
        </template>

        <template #col-kd_obat>
          <div>Kode Obat</div>
        </template>
        <template #col-nama_obat>
          <div>Nama Obat</div>
        </template>
        <template #col-stok>
          <div>Stok</div>
        </template>
        <template #col-fisik>
          <div>Fisik</div>
        </template>
        <template #col-tgl>
          <div>Tanggal Cek Fisik</div>
        </template>
        <template #cell-status="{row}">
          <div
            v-if="row.status<=1"
            class="text-negative text-weight-bold"
          >
            Belum Diterima gudang
          </div>
          <div
            v-if="row.status>=2 && row.sisa_stok > 0"
            class="text-deep-orange text-weight-bold"
          >
            Sudah di Gudang
          </div>
          <div
            v-if="row.status>=2 && row.sisa_stok <= 0"
            class="text-green"
          >
            Sudah di distribusikan
          </div>
        </template>
      </app-table-extend>
    </div>
  </div>
</template>
<script setup>
import { date } from 'quasar'
import { api } from 'src/boot/axios'
import { onMounted, ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const loading = ref(false)
const depos = [
  { nama: 'Floor Stock 1 (AKHP)', value: 'Gd-03010101' },
  { nama: 'Depo Rawat inap', value: 'Gd-04010102' },
  { nama: 'Depo OK', value: 'Gd-04010103' },
  { nama: 'Depo Rawat Jalan', value: 'Gd-05010101' },
  { nama: 'Depo IGD', value: 'Gd-02010104' },
  { nama: 'Gudang Farmasi ( Kamar Obat )', value: 'Gd-05010100' },
  { nama: 'Gudang Farmasi (Floor Stok)', value: 'Gd-03010100' }
]
const tempat = computed(() => {
  const tempt = depos.find(x => x.value === route?.query.kdruang)
  return tempt?.nama ?? 'Depo / Gudang tidak ditemukan'
})
const keterangan = ref('ket')
const tanggal = ref(null)
const columns = ref([
  'kd_obat',
  'nama_obat',
  'stok',
  'fisik',
  'tgl'
])
const items = ref([])
function getData () {
  const param = {
    params: {
      kdruang: route?.query.kdruang,
      from: route?.query.from,
      to: route?.query.to
    }
  }
  loading.value = true
  return new Promise(resolve => {
    api.get('v1/simrs/farmasinew/penerimaan/list-blangko', param)
      .then(resp => {
        loading.value = false
        console.log('data', resp?.data)
        items.value = resp?.data?.data
        if (items.value.length) {
          const ada = items.value.filter(a => a.oneopname)
          if (ada.length) {
            keterangan.value = 'Stok Opname '
            tanggal.value = date.formatDate(ada[0]?.oneopname?.tglopname, 'DD MMMM YYYY')
            // console.log('ada', ada[0?.oneopname])
            items.value.forEach(it => {
              it.stok = it?.oneopname?.total ?? 0
            })
          }
          else {
            keterangan.value = 'Stok Sekarang '
            tanggal.value = date.formatDate(Date.now(), 'DD MMMM YYYY HH:mm:ss')
            // console.log('ada', ada[0?.oneopname])
            items.value.forEach(it => {
              it.stok = it?.onestok?.total ?? 0
            })
          }
        }
        myPrinting()
        // setTimeout(() => {
        // }, 100)
        resolve(resp)
      })
      .catch(() => {
        loading.value = false
      })
  })
}
// eslint-disable-next-line no-unused-vars
function myPrinting () {
  console.log('print ')
  setTimeout(function () {
    const printContents = document.getElementById('printMe').innerHTML
    // const originalContents = document.body.innerHTML

    document.body.innerHTML = printContents

    window.print()
  }, 300)
  setTimeout(function () {
    afterPrint()
  }, 500)
}

function afterPrint () {
  // const r = confirm('Press a button!')
  // if (r === true) {
  // router.push({ path: store.prevUrl ? store.prevUrl : '/history' })
  window.close()
  // } else {
  //   window.close()
  // }
}
onMounted(() => {
  getData()
})
</script>
<style lang="scss" scoped>
$fs : 10px;
.app-table {
  width: 100%; /* print width */
  font-size:$fs;

  .q-table td {
    padding-left: 10px;
    font-size: $fs;
  }
  .q-table th {
    padding-left: 10px;
    font-size: $fs;
  }
}

@media print {
  .app-table {
    width: 100%; /* print width */
    font-size:$fs;

    .q-table {
        max-width: 100% !important;
      }
    .q-table td {
      padding: 2px;
      font-size: $fs;
       white-space: normal !important;
        word-wrap: normal !important;
        hyphens: manual;
    }
    .q-table th {
      padding:2px;
      font-size:$fs;
      white-space: normal !important;
        word-wrap: normal !important;
        hyphens: manual;
    }

    .screenwide{
      max-width: 100% !important;
    }
  }
}

</style>
