<template>
  <div class="full-width full-height bg-white q-pa-sm">
    <div class="row q-py-xs">
      <div class="col-2">
        Ruangan
      </div>
      <div class="col-8">
        <div class="row">
          {{ ruangan }}
        </div>
        <div class="row f-8 text-right text-italic">
          *otomatis sesuai hak akses
        </div>
      </div>
    </div>
    <div class="row q-py-xs">
      <div class="col-2">
        Tanggal penyesuaian
      </div>
      <div class="col-8">
        {{ dateFull( store.form.tgl_penyesuaian) }}
      </div>
    </div>
    <div class="row items-center q-py-xs">
      <div class="col-2">
        Obat
      </div>
      <div class="col-8">
        <q-select
          v-model="model"
          outlined
          dense
          use-input
          fill-input
          input-debounce="200"
          label="Cari Obat"
          option-label="nama_obat"
          option-value="kd_obat"
          :options="options"
          hide-dropdown-icon
          hide-selected
          @filter="filterFn"
          @update:model-value="modelSelected"
          @clear="clearModel"
        >
          <template v-if="model" #append>
            <q-icon name="icon-mat-cancel" @click.stop.prevent="model = null" class="cursor-pointer" @click="clearModel" />
          </template>
          <template #option="scope">
            <q-item v-bind="scope.itemProps" class="row items-end">
              <div class="text-weight-bold" style="width: 30%">
                {{ scope.opt.nama_obat }}
              </div>
              <div class="q-ml-xs " style="width: calc(70%/5)">
                <div class="row justify-between" style="width: 90%;">
                  <span class="text-light-blue">awal :</span> <span class="text-light-blue text-weight-bold">{{ scope.opt.sAawal }}</span>
                </div>
              </div>
              <div class="q-ml-xs" style="width: calc(70%/5)">
                <div class="row justify-between" style="width: 90%;">
                  <span class="text-green">masuk :</span>  <span class="text-green text-weight-bold">{{ scope.opt.masuk }}</span>
                </div>
              </div>
              <div class="q-ml-xs" style="width: calc(70%/5)">
                <div class="row justify-between" style="width: 90%;">
                  <span class="text-orange">keluar :</span> <span class="text-orange text-weight-bold">{{ scope.opt.keluar }}</span>
                </div>
              </div>
              <div class="q-ml-xs" style="width: calc(70%/5)">
                <div class="row justify-between" style="width: 90%;">
                  <span :class="scope.opt.sAkhir !== scope.opt.sSekarang ? 'text-negative text-weight-bold' : 'text-purple'">akhir :</span> <span :class="scope.opt.sAkhir !== scope.opt.sSekarang ? 'text-negative text-weight-bold' : 'text-purple text-weight-bold'">{{ scope.opt.sAkhir }}</span>
                </div>
              </div>
              <div class="q-ml-xs" style="width: calc(70%/5)">
                <div class="row justify-between" style="width: 90%;">
                  <span :class="scope.opt.sAkhir !== scope.opt.sSekarang ? 'text-negative text-weight-bold' : 'text-deep-purple'">skr :</span> <span :class="scope.opt.sAkhir !== scope.opt.sSekarang ? 'text-negative text-weight-bold' : 'text-deep-purple text-weight-bold'">{{ scope.opt.sSekarang }}</span>
                </div>
              </div>
            </q-item>
          </template>
        </q-select>
      </div>
      <div class="col-2 text-right">
        <app-btn
          label="Ambil Transaksi"
          :loading="store.loadingGetTr"
          :disable="store.loadingGetTr || !store.params.kdobat || !model"
          @click="store.getTransaksi()"
        />
      </div>
    </div>
    <!-- detail obat -->
    <div v-if="store?.obat" class="q-pa-sm">
      <!-- rekap -->
      <div class="row f-18" style="width: 100%;">
        <div class="col-grow" style="width: 30%;">
          <div class="row text-weight-bold">
            {{ store?.obat?.nama_obat }}
          </div>
          <div class="row f-10 text-italic">
            {{ store?.obat?.kd_obat }}
          </div>
        </div>
        <div class="col-grow" style="width: 70%/5;">
          <div class="row justify-between q-mx-sm text-light-blue">
            <div>Awal</div>
            <div class="text-weight-bold">
              {{ store?.obat?.sAawal }}
            </div>
          </div>
        </div>
        <div class="col-grow" style="width: 70%/5;">
          <div class="row justify-between q-mx-sm text-green">
            <div>Masuk</div>
            <div class="text-weight-bold">
              {{ store?.obat?.masuk }}
            </div>
          </div>
        </div>
        <div class="col-grow" style="width: 70%/5;">
          <div class="row justify-between q-mx-sm text-orange">
            <div>Keluar</div>
            <div class="text-weight-bold">
              {{ store?.obat?.keluar }}
            </div>
          </div>
        </div>
        <div class="col-grow" style="width: 70%/5;">
          <div class="row justify-between q-mx-sm " :class="store?.obat?.sAkhir !== store?.obat?.sSekarang ? 'text-negative' : 'text-purple'">
            <div>Akhir</div>
            <div class="text-weight-bold">
              {{ store?.obat?.sAkhir }}
            </div>
          </div>
        </div>
        <div class="col-grow" style="width: 70%/5;">
          <div class="row justify-between q-mx-sm" :class="store?.obat?.sAkhir !== store?.obat?.sSekarang ? 'text-negative text-weight-bold' : 'text-deep-purple'">
            <div>Sekarang</div>
            <div>{{ store?.obat?.sSekarang }}</div>
          </div>
        </div>
      </div>
      <!-- penerimaan -->
      <div v-if="store?.gudangs?.includes( store?.params.kdruang)">
        <div class="bg-primary text-white q-pa-xs f-18 q-mb-sm text-weight-bold">
          Data Penerimaan
        </div>
        <div class="row bg-dark q-pa-xs text-white">
          <div class="col-shrink" style="width: 5%;">
            No
          </div>
          <div class="col-grow" style="width: 10%;">
            <div class="q-mr-xs">
              Tgl Penerimaan
            </div>
          </div>
          <div class="col-grow" style="width: calc(35%/2);">
            No penerimaan
          </div>
          <div class="col-grow" style="width: calc(35%/2);">
            No Faktur
          </div>
          <div class="col-grow" style="width: 25%;">
            PBF
          </div>
          <div class="col-grow text-right" style="width: 10%;">
            <div class="q-mr-xs">
              Nilai
            </div>
          </div>
          <div class="col-grow text-center" style="width: 10%;">
            <div class="q-mr-xs">
              Status
            </div>
          </div>
          <div class="col-grow text-right" style="width: 5%;">
            <div class="q-mr-xs">
              #
            </div>
          </div>
        </div>
        <div v-if="store?.obat?.penerimaan?.length > 0" class="q-pa-xs">
          <div v-for="(item,i) in store?.obat?.penerimaan" :key="i">
            <div
              class="row q-pa-xs cursor-pointer" :class="i%2===1?'bg-grey-4':'bg-white'"
              @click="item.expand = !item.expand"
            >
              <div class="col-shrink" style="width: 5%;">
                {{ i +1 }}
              </div>
              <div class="col-grow" style="width: 10%;">
                <div class="q-mr-xs">
                  {{ dateFullFormat(item?.tglpenerimaan) }}
                </div>
              </div>
              <div class="col-grow" style="width: calc(35%/2);">
                {{ item?.nopenerimaan }}
              </div>
              <div class="col-grow" style="width: calc(35%/2);">
                {{ item?.faktur?.no_faktur ??item?.nomorsurat }}
              </div>
              <div class="col-grow" style="width: 25%;">
                {{ item?.pihakketiga?.nama??'PBF tidak ditemukan' }}
              </div>
              <div class="col-grow text-right" style="width: 10%;">
                <div class="q-mr-xs">
                  {{ formatDouble(parseFloat(item?.faktur?.total_faktur??item?.total_faktur_pbf),2) }}
                </div>
              </div>
              <div class="col-grow text-center" style="width: 10%;">
                <div v-if="item?.tgl_pembayaran" class="q-mr-xs">
                  <q-chip dense class="glossy" square color="negative" text-color="white">
                    Dibayar
                  </q-chip>
                </div>
                <div v-else-if="item?.tgl_bast" class="q-mr-xs">
                  <q-chip dense class="glossy" square color="deep-orange" text-color="white">
                    Sudah BAST
                  </q-chip>
                </div>
                <div v-else class="q-mr-xs">
                  <q-chip dense class="glossy" square color="orange" text-color="white">
                    Di kunci
                  </q-chip>
                </div>
              </div>
              <div class="col-grow" style="width: 5%;">
                <div class="row no-wrap justify-end q-mr-xs">
                  aksi
                </div>
              </div>
            </div>
            <div v-if="item.expand" :class="i%2===1?'bg-grey-4':'bg-white'">
              <div class="q-mx-sm">
                <div class="row bg-blue-grey text-white q-pa-xs">
                  <div class="col-auto" style="width: 5%;">
                    NO
                  </div>
                  <div class="col-auto" style="width: 10%;">
                    Kode Obat
                  </div>
                  <div class="col-auto" style="width: 20%;">
                    Nama Obat
                  </div>
                  <div class="col-auto" style="width: calc(55%/5);">
                    No Batch
                  </div>
                  <div class="col-auto" style="width: calc(55%/5);">
                    Tgl Exp
                  </div>
                  <div class="col-auto text-right" style="width: calc(55%/5);">
                    <div q-mr-xs>
                      Jumlah
                    </div>
                  </div>
                  <div class="col-auto text-right" style="width: calc(55%/5);">
                    <div q-mr-xs>
                      Harga
                    </div>
                  </div>
                  <div class="col-auto text-right" style="width: calc(55%/5);">
                    <div q-mr-xs>
                      Subtotal
                    </div>
                  </div>
                  <div class="col-grow text-right" style="width: 10%;">
                    <div class="q-mr-xs">
                      #
                    </div>
                  </div>
                </div>
                <div v-if="item?.penerimaanrinci?.length > 0">
                  <div v-for="(rinci,i2) in item?.penerimaanrinci" :key="i2">
                    <div :class="(i2%2===1?'bg-blue-grey-2':(i%2===1?'bg-grey-4':'bg-white')) +' row q-pa-xs'">
                      <div class="col-auto" style="width: 5%;">
                        NO
                      </div>
                      <div class="col-auto" style="width: 10%;">
                        Kode Obat
                      </div>
                      <div class="col-auto" style="width: 20%;">
                        Nama Obat
                      </div>
                      <div class="col-auto" style="width: calc(55%/5);">
                        No Batch
                      </div>
                      <div class="col-auto" style="width: calc(55%/5);">
                        Tgl Exp
                      </div>
                      <div class="col-auto text-right" style="width: calc(55%/5);">
                        <div q-mr-xs>
                          Jumlah
                        </div>
                      </div>
                      <div class="col-auto text-right" style="width: calc(55%/5);">
                        <div q-mr-xs>
                          Harga
                        </div>
                      </div>
                      <div class="col-auto text-right" style="width: calc(55%/5);">
                        <div q-mr-xs>
                          Subtotal
                        </div>
                      </div>
                      <div class="col-grow text-right" style="width: 10%;">
                        <div class="q-mr-xs">
                          #
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-else>
                  <app-no-data-small />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <app-no-data />
        </div>
      </div>
    </div>
    <div v-else>
      <app-no-data text="Obat Belum dipilih" />
    </div>
  </div>
</template>
<script setup>
import { dateFull, dateFullFormat, formatDouble } from 'src/modules/formatter'
import { useAplikasiStore } from 'src/stores/app/aplikasi'
import { usePenyesuaianFarmasiStore } from 'src/stores/simrs/farmasi/penyesuaian/form'
import { computed, onMounted, ref } from 'vue'

const apps = useAplikasiStore()
const ruangan = computed(() => {
  const ru = apps?.gudangs?.find(f => f.kode === apps?.user?.kdruangansim)
  store.setForm('kdruang', ru?.kode)
  store.setparams('kdruang', ru?.kode)
  clearModel()
  return ru?.nama
})

const store = usePenyesuaianFarmasiStore()
const model = ref(null)
const options = ref([])
function filterFn (val, update) {
  store.getObat(val).then(() => {
    options.value = store.obats
    update(() => {
      options.value = store.obats
    })
  })
}
function modelSelected (val) {
  // console.log('selected', val, model.value)
  store.setForm('kdobat', val.kd_obat)
  store.setparams('kdobat', val.kd_obat)
  store.obat = {
    kd_obat: val.kd_obat,
    nama_obat: val.nama_obat,
    masuk: val.masuk,
    keluar: val.keluar,
    sAawal: val.sAawal,
    sAkhir: val.sAkhir,
    sSekarang: val.sSekarang,
    satuan_b: val.satuan_b,
    satuan_k: val.satuan_k
  }
  console.log('obat', store.obat)

  store.getTransaksi()
}
function clearModel (val) {
  model.value = null
  store.setForm('kdobat', null)
  store.setparams('kdobat', null)
  store.setObat(null)
}
onMounted(() => {
  // store.getObat()
})
</script>
