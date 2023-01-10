<template>
  <div>
    <q-card>
      <q-card-section>
        <div class="f-14 text-weight-bold">
          Halaman Pemakaian Ruangan
        </div>
        <div class="title-desc">
          Input Pemakaian barang oleh Ruangan
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <div class="fit row items-center justify-start content-start q-mb-sm">
          <div class="col-3">
            Nomor Pemakaian
          </div>
          <div class="q-ml-md">
            {{ store.form.reff }}
          </div>
        </div>
        <div class="fit row items-center justify-start content-start q-mb-sm">
          <div class="col-3">
            Cari Penanggungajawab Ruangan
          </div>
          <div class="q-ml-md">
            <app-autocomplete-new
              ref="refPj"
              :model="store.pj"
              label="pilih penanggungjawab"
              autocomplete="jabatan"
              option-label="jabatan"
              option-value="kode"
              :source="store.penanggungjawabs"
              :loading="store.loading"
              @on-select="store.penanggungjawabSelected"
              @clear="cleared"
            />
          </div>
        </div>
        <div class="fit row items-center justify-start content-start q-mb-sm">
          <div class="col-3">
            <div v-if="(store.ruangans.length > 1)">
              Cari Ruangan
            </div>
            <div v-else>
              Ruangan
            </div>
          </div>
          <div class="q-ml-md">
            <div v-if="(store.ruangans.length > 0)">
              <app-autocomplete-new
                ref="refUs"
                :model="store.user"
                label="pilih Ruangan"
                autocomplete="uraian"
                option-label="uraian"
                option-value="kode_ruang"
                :source="store.ruangans"
                :loading="store.loadingMaping"
                :disable="store.loadingMaping"
                valid
                @on-select="store.penggunaSelected"
                @clear="penggunaCleared"
              />
            </div>
            <div v-else>
              {{ store.filteredPengguna[0] ? store.filteredPengguna[0].jabatan : '' }}
            </div>
          </div>
        </div>
        <div class="fit row items-center justify-start content-start q-mb-sm">
          <div class="col-3">
            Tanggal Pemakaian
          </div>
          <div
            v-if="store.form.tanggal"
            class="q-ml-md"
          >
            {{ dateFull(store.form.tanggal) }}
          </div>
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section v-if="(!store.items.length && store.loading && store.pj!==null)">
        <div class="fit row no-wrap justify-evenly items-center content-center q-my-xs text-weight-bold">
          sedang menghitung data barang yang tersedia
        </div>
      </q-card-section>
      <q-card-section v-if="store.items.length">
        <div class="fit row no-wrap justify-evenly items-center content-center q-my-xs text-weight-bold">
          <div class="anak text-center">
            Kode barang
          </div>
          <div class="anak text-center">
            Nama Barang RS
          </div>
          <div class="anak text-center">
            Kode 108
          </div>
          <div class="anak text-center">
            Uraian 108
          </div>
          <div class="anak text-center">
            Stok Ruangan
          </div>
          <div class="anak text-center">
            Jumlah Pemakaian
          </div>
          <div class="anak text-center">
            Sisa Stok
          </div>
        </div>
        <div class="fit row no-wrap justify-evenly items-center content-center q-my-xs">
          <div class="anak text-center">
            {{ Object.keys(store.detail).length? store.detail.kode_rs:'barang belum dipilih' }}
          </div>
          <div class="anak text-center">
            <app-autocomplete-new
              ref="refUs"
              :model="store.detail.kode_rs"
              label="pilih Kode barang"
              autocomplete="nama"
              option-label="nama"
              option-value="kode_rs"
              :source="store.items"
              :loading="store.loading"
              @on-select="store.itemSelectod"
              @clear="itemCleared"
            />
          </div>
          <div class="anak text-center">
            {{ Object.keys(store.detail).length? store.detail.kode_108:'barang belum dipilih' }}
          </div>
          <div class="anak text-center">
            {{ Object.keys(store.detail).length? store.detail.uraian:'barang belum dipilih' }}
          </div>
          <div class="anak text-center">
            {{ Object.keys(store.detail).length? store.detail.stokRuangan:'barang belum dipilih' }}
          </div>
          <div class="anak text-center">
            <q-input
              ref="refInput"
              v-model="store.detail.jumlah"
              label="Jumlah pemakaian"
              hint="tekan enter untuk input"
              dense
              type="number"
              @update:model-value="store.updateJumlah"
              @keyup.enter="saveInput"
            />
          </div>
          <div class="anak text-center">
            {{ Object.keys(store.detail).length? store.detail.sisaStok:'barang belum dipilih' }}
          </div>
        </div>
        <div
          v-for="(detail, i) in store.displays"
          :key="i"
          class="fit row no-wrap justify-evenly items-center content-center q-my-xs"
        >
          <div class="anak text-center">
            {{ detail.kode_rs }}
          </div>
          <div class="anak text-center">
            {{ detail.nama }}
          </div>
          <div class="anak text-center">
            {{ detail.kode_108 }}
          </div>
          <div class="anak text-center">
            {{ detail.uraian }}
          </div>
          <div class="anak text-center">
            {{ detail.stokRuangan }}
          </div>
          <div class="anak text-center">
            {{ detail.jumlah }}
          </div>
          <div class="anak text-center">
            {{ detail.sisaStok }}
          </div>
        </div>
      </q-card-section>
      <q-card-actions
        v-if="store.details.length"
        align="right"
      >
        <q-btn
          color="primary"
          no-caps
          label="Simpan"
          icon="icon-mat-save"
          flat
          dense
          @click="store.saveInput"
        />
      </q-card-actions>
    </q-card>
  </div>
</template>
<script setup>
// rencana : simpan sementara di local storage
import { routerInstance } from 'src/boot/router'
import { dateFull } from 'src/modules/formatter'
import { setTempData } from 'src/modules/storage'
import { usePemakaianRuanganStore } from 'src/stores/simrs/logistik/sigarang/transaksi/pemakaianruangan/pemakaianruangan'
import { ref } from 'vue'
const refPj = ref(null)
const refUs = ref(null)
const refInput = ref(null)
const store = usePemakaianRuanganStore()
store.getInitialData()
const cleared = () => {
  store.form = {}
  store.pj = null
  store.user = null
  store.items = []
  store.filteredPengguna = []
  refPj.value.$refs.refAuto.resetValidation()
}
const penggunaCleared = () => {
  delete store.form.kode_pengguna
  store.user = null
  store.items = []
  refUs.value.$refs.refAuto.resetValidation()
}
const itemCleared = () => {
  store.detail = {}
  refUs.value.$refs.refAuto.resetValidation()
}
const saveInput = () => {
  const path = routerInstance.currentRoute.value.name
  // const detail = store.detail
  const temp = {
    kode_rs: store.detail.kode_rs ? store.detail.kode_rs : '',
    kode_108: store.detail.kode_108 ? store.detail.kode_108 : '',
    kode_satuan: store.detail.kode_satuan ? store.detail.kode_satuan : '',
    jumlah: store.detail.jumlah ? store.detail.jumlah : 0,
    id: null
  }
  store.displays.push(store.detail)
  store.details.push(temp)
  store.detail = {}
  refUs.value.$refs.refAuto.resetValidation()
  // store.setForm('details', store.details)
  const tempData = {
    path,
    form: store.form
  }
  setTempData(tempData)
  // console.log('save input', path)
  // console.log('detail', detail)
  // console.log('temp', store.form)
}
</script>
<style lang="scss" scoped>
.anak{
  width:calc(100vw/7);
}
</style>
