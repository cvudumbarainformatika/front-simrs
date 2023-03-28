<template>
  <q-dialog>
    <q-card
      style="width:70vw; max-width:95vw;"
    >
      <q-card-section>
        <div
          v-if="store.isEditDetail"
          class="f-16 text-weight-bold q-mb-sm"
        >
          Edit Barang
        </div>
        <div
          v-if="store.newDetail"
          class="f-16 text-weight-bold q-mb-sm"
        >
          Tambah Barang
        </div>
      </q-card-section>
      <q-card-section>
        <div class="row q-col-gutter-sm">
          <div class="col-6">
            <div class="row q-mb-sm">
              <div class="col-12">
                <app-autocomplete-new
                  :model="store.form.kode_rs"
                  outlined
                  label="Nama Barang RS"
                  autocomplete="nama"
                  option-value="kode"
                  option-label="nama"
                  input-debounce="1000"
                  :disable="store.isEditDetail"
                  :source="store.barangs"
                  :loading="store.barangLoading"
                  @on-select="store.barangSelected"
                  @clear="clearBarangRs"
                  @buang="modelSet"
                />
                <!-- @set-model="modelSet" -->
              </div>
            </div>
            <div
              v-if="store.form.kode_rs"
              class="row q-mb-sm"
            >
              <div class="col-12">
                <app-input
                  v-model="store.form.jumlah"
                  input-class="text-right"
                  label="Jumlah Pemesanan*"
                  outlined
                  type="number"
                  :disable="store.loadingTambah"
                  @update:model-value="store.updateHarga"
                />
              </div>
            </div>
            <div class="row q-mb-sm">
              <div class="col-12">
                <app-input
                  v-model="store.form.harga"
                  type="number"
                  label="Harga Pembelian*"
                  outlined
                  :disable="store.loadingTambah"
                  @update:model-value="store.updateHarga"
                  @keyup.enter="onSubmit"
                />
              </div>
            </div>
            <div class="row q-mb-sm">
              <div class="col-12">
                <app-input
                  v-model="store.form.merk"
                  input-class="text-right"
                  valid
                  label="Keterangan / Merk"
                  outlined
                  counter
                  type="text"
                  :rules="[ val => val.length <= 255 || 'maximal 255 karakter']"
                  :disable="store.loadingTambah"
                />
              </div>
            </div>
          </div>
          <div class="col-6">
            <div class="row q-col-gutter-sm q-mb-sm">
              <div class="col-4">
                Kode Barang
              </div>
              <div class="col-8">
                {{ store.form.kode_rs }}
              </div>
            </div>
            <div class="row q-col-gutter-sm q-mb-sm">
              <div class="col-4">
                urain 108
              </div>
              <div class="col-8">
                {{ store.form.uraian_108 }}
              </div>
            </div>
            <div class="row q-col-gutter-sm q-mb-sm">
              <div class="col-4">
                uraian 50
              </div>
              <div class="col-8">
                {{ store.form.uraian_108 }}
              </div>
            </div>
            <div class="row q-col-gutter-sm q-mb-sm">
              <div class="col-4">
                satuan
              </div>
              <div class="col-8">
                {{ store.form.satuan_besar }}
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
      <!-- <q-card-section v-if="store.isEditDetail">
        edit
      </q-card-section> -->
      <q-card-section>
        <div class="row q-col-gutter-sm">
          <div class="col-6 text-right ">
            <app-btn
              label="Batal"
              color="dark"
              :loading="store.loadingTambah"
              :disable="store.loadingTambah"
              @click="closeForm"
            />
          </div>
          <div class="col-6 text-right ">
            <app-btn
              label="Kirim"
              :loading="store.loadingTambah"
              :disable="store.loadingTambah"
              @click="onSubmit"
            />
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { useEditPemesananStore } from 'src/stores/simrs/logistik/sigarang/history/edit/pemesanan'

const store = useEditPemesananStore()

const clearBarangRs = () => {
  store.setForm('kode_rs', null)
  store.clearFormBarang()
}
const modelSet = val => {
  store.params.q = val
  store.getMapingBarang()
}

function onSubmit() {
  // console.log('form submit', store.form)
  store.storeDetail().then(resp => {
    closeForm()
    updateData(resp)
  })
}
function closeForm() {
  store.openForm()
  store.newDetail = false
  store.isEditDetail = false
  clearBarangRs()
}

function updateData(data) {
  // console.log('index', store.tableHis.items[store.index])
  // console.log('data', data.data.data)
  store.tableHis.items[store.index] = data.data.data
  store.item = data.data.data
}
</script>
