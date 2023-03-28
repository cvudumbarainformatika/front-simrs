<template>
  <q-dialog>
    <q-card
      style="width:80vw; max-width:95vw;"
    >
      <q-card-section>
        <div class="f-16 text-weight-bold q-mb-sm">
          Edit Penerimaan
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <!-- header -->
        <div class="row items-center q-col-gutter-sm">
          <div class="col-6">
            <div class="row q-mb-sm items-center">
              <div class="col-3">
                Perusahaan
              </div>
              <div class="col-9 text-weight-bold">
                {{ store.item.perusahaan?store.item.perusahaan.nama:'-' }}
              </div>
            </div>
            <div class="row q-mb-sm items-center">
              <div class="col-3">
                Kontrak
              </div>
              <div class="col-9 text-weight-bold">
                {{ store.item.kontrak }}
              </div>
            </div>
            <div class="row q-mb-sm items-center">
              <div class="col-3">
                Nomor Pemesanan
              </div>
              <div class="col-9">
                <app-input
                  v-model="store.form.nomor"
                  label="Nomor Pemesanan"
                  outlined
                  debounce="1000"
                  @update:model-value="gantiNomorPesanan"
                />
                <!-- {{ store.form.nomor }} -->
              </div>
            </div>
            <div class="row q-mb-sm items-center">
              <div class="col-3">
                Nomor Penerimaan
              </div>
              <div class="col-9">
                <div v-if="!store.loadingNoPenerimaan">
                  <!-- {{ store.form.no_penerimaan }} -->
                  <app-input
                    v-model="store.form.no_penerimaan "
                    label="Nomor Penerimaan"
                    outlined
                  />
                </div>
                <div v-if="store.loadingNoPenerimaan">
                  <q-btn
                    flat
                    loading
                  />
                </div>
              </div>
            </div>
            <div class="row q-mb-sm items-center">
              <div class="col-3">
                Pengirim
              </div>
              <div class="col-9">
                <!-- {{ store.form.pengirim }} -->
                <app-input
                  v-model="store.form.pengirim "
                  label="Pengirim"
                  outlined
                />
              </div>
            </div>
          </div>
          <div class="col-6">
            <div class="row q-mb-sm items-center">
              <div class="col-3">
                Tanggal Transaksi
              </div>
              <div class="col-9">
                <!-- {{ store.form.tanggal }} -->
                <app-input-date
                  :model="store.form.tanggal"
                  label="Tanggal"
                  outlined
                  @set-model="setModel"
                />
              </div>
            </div>
            <div class="row q-mb-sm items-center">
              <div class="col-3">
                Surat Jalan
              </div>
              <div class="col-9">
                <!-- {{ store.form.surat_jalan }} -->
                <app-input
                  v-model="store.form.surat_jalan "
                  label="Nomor Surat jalan"
                  outlined
                />
              </div>
            </div>
            <div class="row q-mb-sm items-center">
              <div class="col-3">
                Tanggal Surat Jalan
              </div>
              <div class="col-9">
                <!-- {{ store.form.tanggal_surat }} -->
                <app-input-date
                  :model="store.form.tanggal_surat"
                  label="Tanggal"
                  outlined
                  @set-model="setTglSuratjalan"
                />
              </div>
            </div>
            <div class="row q-mb-sm items-center">
              <div class="col-3">
                Faktur
              </div>
              <div class="col-9">
                <!-- {{ store.form.faktur }} -->
                <app-input
                  v-model="store.form.faktur "
                  label="Nomor Faktur"
                  outlined
                />
              </div>
            </div>
            <div class="row q-mb-sm items-center">
              <div class="col-3">
                Tempo
              </div>
              <div class="col-9">
                <!-- {{ store.form.tempo }} -->
                <app-input-date
                  :model="store.form.tempo"
                  label="Tanggal"
                  outlined
                  @set-model="setTempo"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="row justify-end q-mr-md">
          <app-btn
            label="Simpan Perubahan Header Transaksi"
            @click="store.simpanHeader"
          />
        </div>
      </q-card-section>
      <q-separator />
      <!-- details -->
      <q-card-section>
        <div
          v-if="!store.item.details.length"
          style="height:300px"
        >
          <app-no-data />
        </div>
        <div v-if="store.item.details.length">
          <!-- header -->
          <div class="row text-weight-bold q-col-gutter-sm q-mb-sm q-mt-sm">
            <div class="col-1 btb bl">
              Kode Barang
            </div>
            <div class="col-3 btb bl">
              Nama barang
            </div>
            <div class="col-1 btb bl">
              Harga
            </div>
            <div class="col-1 btb bl">
              Dipesan
            </div>
            <div class="col-1 btb bl">
              Diterima
            </div>
            <div class="col-1 btb bl">
              Satuan
            </div>
            <div class="col-3 btb bl">
              Keterangan
            </div>
            <div class="col-1 btb bl br">
              Aksi
            </div>
          </div>
          <!-- data -->
          <div
            v-for="(detail,i) in store.item.details"
            :key="i"
          >
            <div class="row q-col-gutter-sm q-mb-sm">
              <div class="col-1 bb bl">
                <div class="row">
                  <div class="text-weight-bold col-3">
                    {{ i+1 }}.
                  </div>
                  <div class="col-9">
                    {{ detail.barangrs?detail.barangrs.kode:'-' }}
                  </div>
                </div>
              </div>
              <div class="col-3 bb bl">
                {{ detail.barangrs?detail.barangrs.nama:'-' }}
              </div>
              <div class="col-1 bb bl">
                <div class="text-right">
                  {{ formatRpDouble(detail.harga) }}
                </div>
              </div>
              <div class="col-1 bb bl">
                {{ detail.dipesan?detail.dipesan:'-' }}
              </div>
              <div class="col-1 bb bl">
                {{ detail.qty }}
              </div>
              <div class="col-1 bb bl">
                {{ detail.satuan?detail.satuan.nama:'-' }}
              </div>
              <div class="col-3 bb bl">
                {{ detail.merk }}
              </div>
              <div
                v-if="store.loadingDetailPemesanan"
                class="col-1 bb bl br"
              >
                <q-btn
                  v-if="store.loadingDetailPemesanan"
                  size="sm"
                  loading
                  dense
                  style="min-width:25px"
                  color="primary"
                  flat
                >
                  <template #loading>
                    <q-spinner-hourglass
                      class="on-left"
                      size="18px"
                    />
                  </template>
                </q-btn>
              </div>
              <div
                v-if="!store.loadingDetailPemesanan"
                class="col-1 bb bl br"
              >
                <!-- <div v-if="detail.diterima===null || detail.diterima===0 || !detail.diterima"> -->
                <div>
                  <q-btn
                    color="primary"
                    round
                    icon="icon-mat-edit"
                    flat
                    size="sm"
                    @click="editRow(detail,i)"
                  >
                    <q-tooltip
                      anchor="top middle"
                      self="center middle"
                    >
                      Edit
                    </q-tooltip>
                  </q-btn>
                  <q-btn
                    color="negative"
                    round
                    icon="icon-mat-delete_sweep"
                    flat
                    size="sm"
                    @click="hapus(detail,i)"
                  >
                    <q-tooltip
                      anchor="top middle"
                      self="center middle"
                    >
                      Hapus
                    </q-tooltip>
                  </q-btn>
                </div>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { formatRpDouble } from 'src/modules/formatter'
import { useEditPenerimaanStore } from 'src/stores/simrs/logistik/sigarang/history/edit/penerimaan'

/**
  edit pemesanan meliputi:
  * edit Faktur
  * pecah Faktur
  * edit nomor pemesananan
  * edit nomor BAST (berpengaruh pada tabel recent stok update)
  * edit jumlah penerimaan
  * hapus penerimaan (termasuk data di gudang jika masih belum di distribusikan)
  * hapus detail penerimaan (termasuk data di gudang jika masih belum di distribusikan)
 */
const store = useEditPenerimaanStore()
function gantiNomorPesanan(val) {
  // store.params.nomor = val
  console.log('nomor pemesanan', val)
  store.getJumlahNomorPenerimaan(val)
  console.log('form', store.form)
}
function setModel(val) {
  store.setForm('tanggal', val)
}
function setTglSuratjalan(val) {
  store.setForm('tanggal_surat', val)
}
function setTempo(val) {
  store.setForm('tempo', val)
}
</script>
<style lang="scss" scoped>
.btb{
  border-top: 1px solid black;
  border-bottom: 1px solid black;
}
.bt{
  border-top: 1px solid black;
}
.bl{
  border-left: 1px solid black;
}
.br{
  border-right: 1px solid black;
}
.bb{
  border-bottom: 1px solid black;
}
</style>
