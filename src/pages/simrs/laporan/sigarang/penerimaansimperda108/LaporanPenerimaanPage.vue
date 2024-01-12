<template>
  <div class="q-pa-sm">
    <div class="row bg-primary q-pa-sm q-mb-sm">
      <div class="f-14 text-white text-weight-bold">
        Laporan Penerimaan Simperda 108
      </div>
    </div>

    <div
      id="printMe"
      class="q-px-md"
    >
      <div class="row items-center">
        <div class="col-2">
          <q-img
            src="~assets/images/logo_kota_original.png"
            spinner-color="white"
            style="height: 3.56cm; max-width: 2.86cm"
          />
        </div>
        <div class="col-8">
          <div class="row justify-center f-20 text-weight-bold q-mb-md">
            PEMERINTAH KOTA PROBOLINGGO
          </div>
          <div class="row justify-center f-20 text-weight-bold q-mb-md">
            LAPORAN REKONSILIASI BELANJA PERSEDIAAN
          </div>
          <div class="row justify-center f-14 text-weight-bold">
            TAHUN ANGGARAN {{ tahun }}
          </div>
        </div>
        <div class="col-2">
          <q-img
            src="~assets/logos/logo-rsud.png"
            spinner-color="white"
            style="height: 3cm; max-width: 3cm"
          />
        </div>
      </div>
      <div class="row items-center print-hide q-my-sm">
        <!-- req tanggl -->
        <div class="col-6">
          <div class="row items-center">
            <app-input-date
              :model="store.params.tgl"
              label="dari tangal"
              outlined
              :disable="store.loading"
              :loading="store.loading"
              @set-model="val => { store.params.tgl = val }"
            />
            <app-input-date
              class="q-ml-md"
              :model="store.params.tglx"
              label="sampai tangal"
              outlined
              :disable="store.loading"
              :loading="store.loading"
              @set-model="val => { store.params.tglx = val }"
            />
            <div class="q-ml-md">
              <app-btn
                label="ambil data"
                :disable="store.loading"
                :loading="store.loading"
                @click="store.getDataPenerimaan()"
              />
            </div>
          </div>
          <div class="row q-col-gutter-sm q-my-sm">
            <app-autocomplete
              v-model="store.params.kode_ruang"
              label="Pilih Gudang / Depo"
              autocomplete="nama"
              option-label="nama"
              option-value="value"
              valid
              outlined
              :source="store.gudangs"
              :loading="store.loading"
            />
            <!-- <div class="col-6">
            </div> -->
            <!-- <div class="col-2">
              <app-btn
                label="Ambil Data"
                :disable="store.loading"
                :loading="store.loading"
                @click="store.getDataTable"
              />
            </div> -->
          </div>
        </div>
        <!-- tgl dan print -->
        <div class="col-6">
          <div class="row items-center justify-end q-mr-md">
            <div class="q-ml-md">
              <app-input
                v-model="tahun"
                label="Isi tahun jika tahun tidak sesuai"
                outlined
              />
            </div>
            <div class="q-ml-md text-right">
              <q-btn
                v-print="printObj"
                unelevated
                color="dark"
                round
                size="sm"
                icon="icon-mat-print"
              >
                <q-tooltip
                  class="primary"
                  :offset="[10, 10]"
                >
                  Print
                </q-tooltip>
              </q-btn>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="store.items.length"
        class="garis-luar-tabel q-mx-sm"
      >
        <!-- header -->
        <div class="row items-center text-weight-bold garis-bawah">
          <div class="col-2 garis-kanan">
            <div class="q-ml-sm">
              Kode
            </div>
          </div>
          <div class="col-8 garis-kanan">
            <div class="q-ml-sm">
              Uraian
            </div>
          </div>
          <div class="col-2">
            <div class="q-ml-sm">
              Jumlah
            </div>
          </div>
        </div>
        <!-- level 4 -->
        <div
          v-if="store.level4"
          class="row text-weight-bold garis-bawah"
        >
          <div class="col-2 garis-kanan">
            <div class="q-ml-sm">
              {{ store.level4.kode }}
            </div>
          </div>
          <div class="col-8 garis-kanan">
            <div class="q-ml-sm">
              {{ store.level4.uraian50 }}
            </div>
          </div>
          <div class="col-2">
            <div class="q-ml-sm">
              Rp. {{ formatRp(store.level4.nilai) }}
            </div>
          </div>
        </div>
        <!-- level 5 -->
        <div
          v-if="store.level5"
          class="row items-center text-weight-bold"
        >
          <div class="col-2 garis-kanan">
            <div class="q-ml-sm">
              {{ store.level5.kode }}
            </div>
          </div>
          <div class="col-8 garis-kanan">
            <div class="q-ml-sm">
              {{ store.level5.uraian50 }}
            </div>
          </div>
          <div class="col-2">
            <div class="q-ml-sm">
              Rp. {{ formatRp(store.level5.nilai) }}
            </div>
          </div>
        </div>
        <!-- 50 -->
        <div
          v-for="(limaP, i) in store.items"
          :key="i"
          class="no-margin"
        >
          <div class="row items-center text-weight-bold">
            <div class="col-2 garis-kanan">
              <div class="q-ml-sm">
                {{ limaP.kode }}
              </div>
            </div>
            <div class="col-8 garis-kanan">
              <div class="q-ml-sm">
                {{ limaP.uraian50 }}
              </div>
            </div>
            <div class="col-2 garis-atas">
              <div class="q-ml-sm">
                Rp. {{ formatRp(limaP.subtotal) }}
              </div>
            </div>
          </div>
          <!-- 108 -->
          <div
            v-for="(satuNol, j) in limaP.kode108"
            :key="j"
            class="no-margin"
          >
            <div class="row items-center">
              <div class="col-2 garis-kanan">
                <div class="q-ml-sm">
                  {{ satuNol.kode_108 }}
                </div>
              </div>
              <div class="col-8 garis-kanan">
                <div class="q-ml-sm">
                  {{ satuNol.uraian_108 }}
                </div>
              </div>
              <div class="col-2">
                <div class="q-ml-sm text-right">
                  Rp. {{ formatRp(satuNol.subtotal) }}
                </div>
              </div>
            </div>
            <!-- <div v-for="(barang, k) in satuNol.kode_barang" :key="k" class="no-margin">
              <div class="row items-center">
                <div class="col-2 garis-kanan">
                  <div class="q-ml-sm">
                    {{ barang.kode_rs }}
                  </div>
                </div>
                <div class="col-8 garis-kanan">
                  <div class="q-ml-sm">
                    {{ barang.nama_barang }}
                  </div>
                </div>
                <div class="col-2 garis-bawah">
                  <div class="q-ml-sm">
                    {{ formatRp(barang.subtotal) }}
                  </div>
                </div>
              </div>
            </div> -->
          </div>
        </div>
        <div
          v-if="store.level5"
          class="row text-weight-bold garis-bawah garis-atas"
        >
          <div class="col-2 garis-kanan" />
          <div class="col-8 garis-kanan">
            <div class="q-ml-sm">
              Jumlah
            </div>
          </div>
          <div class="col-2">
            <div class="q-ml-sm">
              Rp. {{ formatRp(store.level5.nilai) }}
            </div>
          </div>
        </div>
      </div>
      <div v-if="!store.items.length">
        <app-no-data />
      </div>
    </div>
  </div>
</template>
<script setup>
import { date } from 'quasar'
import { formatRp } from 'src/modules/formatter'
import { useSimrsLaporanSigarangPenerimaanSimperda108Store } from 'src/stores/simrs/laporan/sigarang/penerimaansimperda108/penerimaan'
import { ref } from 'vue'

const store = useSimrsLaporanSigarangPenerimaanSimperda108Store()
const tahun = ref(date.formatDate(Date.now(), 'YYYY'))

// print start
const printObj = {
  id: 'printMe',
  popTitle: 'Penerimaan 108'
}
// print end
store.getInitialData()
</script>
<style lang="scss" scoped>
.no-margin {
  margin: 0px;
}

.garis-atas-tebal {
  border-top: 3px solid black;
}

.garis-luar-tabel {
  border-top: 3px solid black;
  // border-bottom: 2px solid black;
  border-left: 2px solid black;
  border-right: 2px solid black;
  margin: 0px;
}

.garis-atas {
  border-top: 2px solid black;
  margin: 0px;
}

.garis-bawah {
  border-bottom: 2px solid black;
  padding-top: 1px;
  padding-bottom: 2px;
  margin: 0px;
}

.garis-kiri {
  border-left: 2px solid black;
  padding-top: 1px;
  padding-bottom: 2px;
  margin: 0px;
}

.garis-kanan {
  border-right: 2px solid black;
  padding-top: 1px;
  padding-bottom: 2px;
  margin: 0px;
}

.garis-bawah-tipis {
  border-bottom: 1px solid black;
}

.garis-kiri-tipis {
  border-left: 1px solid black;
}

.garis-kanan-tipis {
  border-right: 1px solid black;
}
$fs : 9px;
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
