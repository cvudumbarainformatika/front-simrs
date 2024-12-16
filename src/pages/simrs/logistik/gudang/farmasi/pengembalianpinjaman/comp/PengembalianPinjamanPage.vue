<template>
  <div class="row q-pa-sm bg-primary text-white f-18 text-weight-bold">
    Form Pengeluaran Pengembalian Barang Pinjaman
  </div>
  <div>
    <div class="row items-center q-py-sm q-col-gutter-sm">
      <div class="col-3">
        <app-autocomplete
          v-model="store.params.kdpbf"
          label="Pilih Penyedia"
          :source="store.penyedias"
          option-label="nama"
          option-value="kode"
          :loading="store.loading"
          :disable="store.loading || store.loadingNoper"
          outlined
          clearable
          @selected="pbfSelected"
        />
      </div>
      <div class="col-3">
        <app-autocomplete
          v-model="store.params.nopenerimaan"
          label="Pilih Nomor Penerimaan"
          :source="store.nopenerimaans"
          option-label="nopenerimaan"
          option-value="nopenerimaan"
          :loading="store.loadingNoper"
          :disable="store.loading || store.loadingNoper"
          outlined
          :valid="!store.params.kdpbf || !!store.params.nopenerimaan"
          clearable
          @selected="penerimaanSelected"
        />
      </div>
      <div class="col-3">
        <app-input-date
          :model="store.form.tgl_pengembalian"
          label="Tanggal Pengembalian"
          outlined
          @set-model="(val) => store.setForm('tgl_pengembalian', val)"
        />
      </div>
      <div class="col-3">
        <app-input
          v-model="store.form.nopengembalian"
          label="Nomor Pengembalian"
          outlined
          valid
          readonly
        />
      </div>
    </div>
  </div>
  <div class="q-mt-lg">
    <div class="row text-white bg-amber text-weight-bold q-pa-sm f-14">
      Rincian Penerimaan
    </div>
    <div v-if="store.loadingNoper">
      <app-loading />
    </div>
    <div v-else>
      <div v-if="!store.form.nopenerimaan">
        <app-no-data text="Nomor Penerimaan Belum dipilih" />
      </div>
      <div v-else-if="!store.penerimaanRinci?.penerimaanrinci?.length">
        <app-no-data text="Tidak Ada Data Rinci Penerimaan" />
      </div>
      <div v-else class="q-mt-sm">
        <div class="row items-center bg-dark text-white text-weight-bold q-pa-xs">
          <div class="col-auto" style="width: 5%;">
            No
          </div>
          <div class="col-auto" style="width: 10%;">
            Kode Obat
          </div>
          <div class="col-auto" style="width: 30%;">
            Nama Obat
          </div>
          <div class="col-auto" style="width: 10%;">
            Satuan
          </div>
          <div class="col-auto text-right" style="width: 10%;">
            <div class="q-mr-xs">
              Jumlah Pinjam
            </div>
          </div>
          <div class="col-auto text-right" style="width: 10%;">
            <div class="q-mr-xs">
              Dikembalikan
            </div>
          </div>
          <div class="col-auto text-right" style="width: 10%;">
            <div class="q-mr-xs">
              Total Kembali
            </div>
          </div>
          <div class="col-auto text-right" style="width: 10%;">
            <div class="q-mr-xs">
              Harga
            </div>
          </div>
          <div class="col-auto text-right" style="width: 5%;">
            <div class="q-mr-xs">
              #
            </div>
          </div>
        </div>
        <div v-for="(item, i) in store.penerimaanRinci.penerimaanrinci" :key="item">
          <div class="row items-center q-pa-xs" :class="i % 2 === 0 ? 'bg-grey-1' : 'bg-grey-4'">
            <div class="col-auto" style="width: 5%;">
              {{ i+1 }}
            </div>
            <div class="col-auto" style="width: 10%;">
              {{ item?.masterobat?.kd_obat }}
            </div>
            <div class="col-auto" style="width: 30%;">
              {{ item?.masterobat?.nama_obat }}
            </div>
            <div class="col-auto" style="width: 10%;">
              {{ item?.masterobat?.satuan_k }}
            </div>
            <div class="col-auto text-right" style="width: 10%;">
              <div class="q-mr-xs">
                {{ formatDouble(parseFloat(item?.jml_terima_k),2) }}
              </div>
            </div>
            <div class="col-auto text-right" style="width: 10%;">
              <div class="q-mr-xs">
                <app-input
                  v-model="item.jml_dikembalikan"
                  label=""
                  class="full-width"
                  outlined
                  valid
                  :loading="item?.loading"
                  :disable="item?.loading || (item?.pengembalian_rinci?.reduce((a, b) => a + parseFloat(b?.jml_dikembalikan), 0)===item?.jml_terima_k)"
                  @update:model-value="(evt)=>{
                    const inc = evt.includes('.')
                    const ind = evt.indexOf('.')
                    const panj = evt.length
                    const nilai = isNaN(parseFloat(evt)) ? 0 : (inc && (ind === (panj - 1)) ? evt : parseFloat(evt))
                    item.jml_dikembalikan=nilai
                    const sudahDiterima=item?.pengembalian_rinci?.reduce((a, b) => a + parseFloat(b?.jml_dikembalikan), 0)
                    const sisa=item?.jml_terima_k-sudahDiterima
                    if (nilai > sisa) {
                      item.jml_dikembalikan = sisa
                      notifErrVue('Jumlah dikembalikan tidak boleh melebihi jumlah pinjam')
                    }

                  }"
                  @keyup.prevent.enter="store.simpanDetail(item)"
                />
              </div>
            </div>
            <div class="col-auto text-right" style="width: 10%;">
              <div class="q-mr-xs">
                {{ item?.pengembalian_rinci?.reduce((a, b) => a + parseFloat(b?.jml_dikembalikan), 0) }}
              </div>
            </div>
            <div class="col-auto text-right" style="width: 10%;">
              <div class="q-mr-xs">
                {{ formatDouble(parseFloat(item?.harga),2) }}
              </div>
            </div>
            <div class="col-auto text-right" style="width: 5%;">
              <div class="q-mr-xs">
                <q-btn
                  dense
                  flat
                  icon="icon-mat-save"
                  color="primary"
                  :loading="item?.loading"
                  :disable="item?.loading"
                  @click="store.simpanDetail(item)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { formatDouble } from 'src/modules/formatter'
import { notifErrVue } from 'src/modules/utils'
import { usePengembalianPinjamanStore } from 'src/stores/simrs/farmasi/pengembalian/pengembalianpinjaman'
import { onUnmounted } from 'vue'
const store = usePengembalianPinjamanStore()

// eslint-disable-next-line no-unused-vars
const emits = defineEmits([
  'tambah' // tambah ini hanya agar tidak keluar warning karena di front komponen nya dinamis
])
function pbfSelected (val) {
  store.setParams('kdpbf', val)
  store.setForm('kdpbf', val)
  if (val) store.getNopenerimaans()

  store.nopenerimaans = []
  store.setForm('nopenerimaan', null)
  store.setParams('nopenerimaan', null)
  store.penerimaanRinci = []
}
function penerimaanSelected (val) {
  console.log(val)
  store.setForm('nopenerimaan', val)
  if (val)store.penerimaanRinci = store.nopenerimaans.find(item => item.nopenerimaan === val) ?? []
  else store.penerimaanRinci = {}
  console.log(store.penerimaanRinci)
}

onUnmounted(() => {
  store.resetForm()
  store.resetParams()
})
</script>
