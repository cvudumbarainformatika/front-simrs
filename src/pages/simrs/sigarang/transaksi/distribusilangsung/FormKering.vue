<template>
  <div class="q-mt-sm">
    <q-card>
      <q-card-section>
        <div class="f-12 text-weight-bold">
          Form Input Barang Kering
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <div class="row q-col-gutter-sm">
          <div class="col-6">
            <!-- input -->
            <div class="row items-center">
              <div class="col-4">
                Nama Barang
              </div>
              <div class="col-8">
                <app-autocomplete-new
                  ref="refBarang"
                  :model="store.form.kode_rs"
                  label="Nama Barang"
                  option-value="kode_rs"
                  option-label="nama"
                  autocomplete="nama"
                  outlined
                  :source="store.barangKerings"
                  :loading="store.loadingStokDepo"
                  @on-select="barangSelected"
                  @clear="barangCleared"
                />
              <!-- @buang="store.getRuangs"-->
              </div>
            </div>
            <div class="row items-center q-mt-sm">
              <div class="col-4">
                Jumlah
              </div>
              <div class="col-8">
                <app-input
                  ref="refJumlah"
                  v-model="store.form.jumlah"
                  label="Jumlah"
                  type="number"
                  outlined
                  :rules="[
                    val=> (val <= (store.barang.totalStok?store.barang.totalStok:0) ) ||'tidak boleh melebihi jumlah stok',
                    val=> (val !== 0 && val !== '') ||'Harap di isi dengan nilai yang benar',
                  ]"
                  @keyup.enter="simpanList"
                />
              </div>
            </div>
          </div>
          <div class="col-6">
            <!-- keterangan -->
            <div class="row items-center">
              <div class="col-3">
                Sisa Stok Depo
              </div>
              <div class="col-1">
                {{ store.barang ? store.barang.totalStok : 0 }}
              </div>
              <div class="col-2">
                {{ store.barang ? store.barang.namaSatuan : '-' }}
              </div>
            </div>
          </div>
        </div>
        <div class="row q-col-gutter-sm">
          <!-- {{ store.form }} -->
          <div class="col-6">
            <div class="row items-center justify-end q-mr-sm q-my-sm">
              <app-btn
                label="Simpan List"
                color="secondary"
                :loading="store.loading"
                :disable="store.loading"
                @click="simpanList"
              />
            </div>
          </div>
          <div class="col-6">
            <div class="row items-center justify-end q-mr-sm q-my-sm">
              <app-btn
                label="Selesai Input"
              />
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>
<script setup>
import { useTransaksiDistribusiLangsung } from 'src/stores/simrs/logistik/sigarang/transaksi/distribusilangsung/distribusilangsung'
import { ref } from 'vue'

const store = useTransaksiDistribusiLangsung()
const emits = defineEmits(['simpanList'])
const barangSelected = val => {
  const temp = store.barangKerings.filter(kering => {
    return kering.kode_rs === val
  })
  if (temp.length) {
    store.barang = temp[0]
    store.setForm('kode_rs', store.barang.kode_rs)
    store.setForm('kode_satuan', store.barang.kode_satuan)
  }
  console.log('barang', store.barang)
  console.log('form', store.form)
}
const barangCleared = () => {
  store.setForm('kode_rs', null)
}
const refBarang = ref(null)
const refJumlah = ref(null)
const simpanList = () => {
  console.log('stok', store.barang.totalStok)
  refBarang.value.$refs.refAuto.validate()
  refJumlah.value.$refs.refInput.validate()
  if (refBarang.value.$refs.refAuto.validate() && refJumlah.value.$refs.refInput.validate()) {
    store.detailIsValid = true
  }
  emits('simpanList')
  if (store.formIsValid && store.detailIsValid) {
    store.saveList()
  }
}
</script>
