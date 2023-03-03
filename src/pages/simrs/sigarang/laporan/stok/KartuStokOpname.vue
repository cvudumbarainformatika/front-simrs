<template>
  <q-dialog>
    <q-card style="width: 900px; max-width: 85vw;">
      <q-card-section>
        <div class="f-18 text-weight-bold text-center">
          {{ depo() }}
        </div>
        <div class="f-14 text-weight-bold">
          Kartu Stok Opname
        </div>
        <div class="title-desc">
          Detail Transaksi data barang
        </div>
      </q-card-section>
      <q-card-section>
        <div class="row fit no-wrap items-center q-mb-md">
          <div class="col-4">
            <div class="row">
              Kode Barang
            </div>
            <div class="row">
              Nama Barang
            </div>
          </div>
          <div class="col-4 text-weight-bold">
            <div class="row">
              {{ data.kode }}
            </div>
            <div class="row">
              {{ data.nama }}
            </div>
          </div>
        </div>
        <q-separator class="q-mb-sm" />
        <!-- header -->
        <div class="row fit no-wrap text-weight-bold items-center q-mb-sm q-col-gutter-sm">
          <div class="col-2">
            Tanggal
          </div>
          <div class="col-2">
            Mutasi
          </div>
          <div class="col-2">
            No Peneriman
          </div>
          <div class="col-1">
            Masuk
          </div>
          <div class="col-1">
            Keluar
          </div>
          <div class="col-2">
            keterangan
          </div>
        </div>
        <!-- row -->
        <!-- stok awal -->
        <!-- {{ data.stok_awal }} -->
        <div
          v-if="!data.stok_awal.length"
          class="row fit no-wrap items-center q-mb-sm q-col-gutter-sm"
        >
          <div class="col-2">
            -
          </div>
          <div class="col-2">
            Stok Opname Bulan lalu
          </div>
          <div class="col-2">
            -
          </div>
          <div class="col-1">
            0
          </div>
          <div class="col-1">
            0
          </div>
          <div class="col-2">
            tidak ada data stok opname bulan lalu
          </div>
        </div>
        <div
          v-if="data.stok_awal.length"
        >
          <div
            v-for="(awal,i) in data.stok_awal"
            :key="i"
            class="row fit no-wrap items-center q-mb-sm q-col-gutter-sm"
          >
            <div class="col-2">
              {{ awal?dateFullFormat(awal.tanggal):'' }}
            </div>
            <div class="col-2">
              Stok Opname Bulan lalu
            </div>
            <div class="col-2">
              <div style="width:5vw;">
                <div class="ellipsis">
                  {{ awal?awal.no_penerimaan:'-' }}
                </div>
                <q-tooltip
                  anchor="top middle"
                  self="center middle"
                >
                  {{ awal?awal.no_penerimaan:'-' }}
                </q-tooltip>
              </div>
            </div>
            <div class="col-1">
              {{ awal?awal.sisa_stok:0 }}
            </div>
            <div class="col-1">
              0
            </div>
            <div class="col-2">
              tidak ada data stok opname bulan lalu
            </div>
          </div>
        </div>

        <!-- penrimaan -->
        <!-- {{ data.detail_penerimaan }} -->
        <!-- <div
          v-if="data.detail_penerimaan"
        >
          <div
            v-for="(terima,i) in data.detail_penerimaan"
            :key="i"
            class="row fit no-wrap items-center q-mb-sm q-col-gutter-sm"
          >
            <div class="col-2">
              {{ dateFullFormat(terima.tanggal) }}
            </div>
            <div class="col-2">
              Penerimaan
            </div>
            <div class="col-2">
              <div style="width:5vw;">
                <div class="ellipsis">
                  {{ terima.no_penerimaan }}
                </div>
                <q-tooltip
                  anchor="top middle"
                  self="center middle"
                >
                  {{ terima.no_penerimaan }}
                </q-tooltip>
              </div>
            </div>
            <div class="col-1">
              {{ terima.qty }}
            </div>
            <div class="col-1">
              0
            </div>
            <div class="col-2">
              Diterima Gudang
            </div>
          </div>
        </div>
        <div
          v-if="!data.detail_penerimaan"
          class="row fit no-wrap items-center q-mb-sm q-col-gutter-sm"
        >
          <div class="col-1">
            -
          </div>
          <div class="col-2">
            Penerimaan
          </div>
          <div class="col-2">
            -
          </div>
          <div class="col-2">
            0
          </div>
          <div class="col-2">
            0
          </div>
          <div class="col-1">
            tidak ada Penerimaan bulan ini
          </div>
        </div> -->

        <!-- distribusi depo -->

        <div
          v-if="data.detail_distribusi_depo.length"
        >
          <div
            v-for="(dist,i) in data.detail_distribusi_depo"
            :key="i"
            class="row fit no-wrap items-center q-mb-sm q-col-gutter-sm"
          >
            <div class="col-2">
              {{ dateFullFormat(dist.tanggal) }}
            </div>
            <div class="col-2">
              Distribusi depo
            </div>
            <div class="col-2">
              <div style="width:5vw;">
                <div class="ellipsis">
                  {{ dist.no_penerimaan }}
                </div>
                <q-tooltip
                  anchor="top middle"
                  self="center middle"
                >
                  {{ dist.no_penerimaan }}
                </q-tooltip>
              </div>
            </div>
            <div class="col-1">
              {{ dist.jumlah }}
            </div>
            <div class="col-1">
              0
            </div>
            <div class="col-2">
              Diterima depo
            </div>
          </div>
        </div>
        <div
          v-if="!data.detail_distribusi_depo.length"
          class="row fit no-wrap items-center q-mb-sm q-col-gutter-sm"
        >
          <div class="col-2">
            -
          </div>
          <div class="col-2">
            Distribusi depo
          </div>
          <div class="col-2">
            -
          </div>
          <div class="col-1">
            0
          </div>
          <div class="col-1">
            0
          </div>
          <div class="col-2">
            Tidak ada distribusi ke depo
          </div>
        </div>

        <!-- permintaan ruanagan -->
        <div
          v-if="data.detail_permintaanruangan.length"
        >
          <div
            v-for="(minta,i) in data.detail_permintaanruangan"
            :key="i"
            class="row fit no-wrap items-center q-mb-sm q-col-gutter-sm"
          >
            <div class="col-2">
              {{ dateFullFormat(minta.tanggal) }}
            </div>
            <div class="col-2">
              Permintaan Ruangan
            </div>
            <div class="col-2">
              <div style="width:5vw;">
                <div class="ellipsis">
                  {{ minta.no_penerimaan }}
                </div>
                <q-tooltip
                  anchor="top middle"
                  self="center middle"
                >
                  {{ minta.no_penerimaan }}
                </q-tooltip>
              </div>
            </div>
            <div class="col-1">
              0
            </div>
            <div class="col-1">
              {{ minta.jumlah_distribusi }}
            </div>
            <div class="col-1">
              {{ minta.alasan }}
            </div>
          </div>
        </div>
        <div
          v-if="!data.detail_permintaanruangan.length"
          class="row fit no-wrap items-center q-mb-sm q-col-gutter-sm"
        >
          <div class="col-2">
            -
          </div>
          <div class="col-2">
            Permintaan Ruangan
          </div>
          <div class="col-2">
            -
          </div>
          <div class="col-1">
            0
          </div>
          <div class="col-1">
            0
          </div>
          <div class="col-1">
            Tidak ada Prmintaan ruangan
          </div>
        </div>
      </q-card-section>
      <q-separator class="q-mb-sm" />
      <q-card-section>
        <div class="row fit f-18 justify-end q-col-gutter-sm text-weight-bold">
          <div class="col-2">
            Sisa stok depo
          </div>
          <div class="col-1">
            {{ data.stok_transaksi }}
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { dateFullFormat } from 'src/modules/formatter'
import { useStokOpnameStore } from 'src/stores/simrs/logistik/sigarang/laporan/stok/stokOpname'
import { computed } from 'vue'

const store = useStokOpnameStore()
const data = computed(() => {
  return store.dataKartuStok
})
function depo() {
  const a = store.gudangDepo.filter(anu => anu.kode === store.kode_tempat)
  return a[0].nama
}
</script>
