<template>
  <div>
    <q-card>
      <q-card-section>
        <div class="f-14 text-weight-bold">
          Barang Rusak
        </div>
        <div class="title-desc">
          Input Barang Rusak di ruangan
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <div class="fit row q-col-gutter-md">
          <div class="col-6">
            <div class="row no-wrap items-center q-mb-sm">
              <div class="col-md-3 col-sm-3 col-xs-12">
                Nomor Transaksi
              </div>
              <div
                class="q-ml-sm col-xs-12 col-md-9 col-sm-9"
              >
                {{ store.form.reff?store.form.reff:'-' }}
              </div>
            </div>
            <div class="row no-wrap items-center q-mb-sm">
              <div class="col-md-3 col-sm-3 col-xs-12">
                Ruangan
              </div>
              <div class="q-ml-sm col-xs-12 col-md-9 col-sm-9">
                <app-autocomplete-new
                  ref="refRuangan"
                  label="pilih ruangan"
                  :model="store.form.kode_pengguna"
                  autocomplete="uraian"
                  option-label="uraian"
                  option-value="kode"
                  :loading="store.loading"
                  :source="store.ruangans"
                  @on-select="penggunaSelected"
                  @clear="penggunaCleared"
                />
              </div>
            </div>
            <div class="row no-wrap items-center q-mb-sm">
              <div class="col-md-3 col-sm-3 col-xs-12">
                Kode Barang
              </div>
              <div class="q-ml-sm col-xs-12 col-md-9 col-sm-9">
                <app-autocomplete-new
                  ref="refBarang"
                  label="pilih barang"
                  :model="store.input.kode_rs"
                  autocomplete="nama"
                  option-label="nama"
                  option-value="kode"
                  :loading="store.loading"
                  :source="store.barangrs"
                  @on-select="barangSelected"
                  @clear="barangCleared"
                />
              </div>
            </div>
            <div class="row no-wrap items-center q-mb-sm">
              <div class="col-md-3 col-sm-3 col-xs-12">
                Jumlah
              </div>
              <div class="q-ml-sm col-xs-12 col-md-9 col-sm-9">
                <app-input
                  ref="refJumlah"
                  v-model="store.details.jumlah"
                  label="jumlah"
                  type="number"
                  @keyup.enter="tambah"
                />
              </div>
            </div>
          </div>
          <div class="col-6">
            <div class="row no-wrap items-center q-mb-sm">
              <div class="col-md-3 col-sm-3 col-xs-12">
                Nama Barang
              </div>
              <div class="q-ml-sm col-xs-12 col-md-9 col-sm-9">
                {{ store.input.nama?store.input.nama:'-' }}
              </div>
            </div>
            <div class="row no-wrap items-center q-mb-sm">
              <div class="col-md-3 col-sm-3 col-xs-12">
                Kode 108
              </div>
              <div class="q-ml-sm col-xs-12 col-md-9 col-sm-9">
                {{ store.details.kode_108?store.details.kode_108:'-' }}
              </div>
            </div>
            <div class="row no-wrap items-center q-mb-sm">
              <div class="col-md-3 col-sm-3 col-xs-12">
                Uraian 108
              </div>
              <div class="q-ml-sm col-xs-12 col-md-9 col-sm-9">
                {{ store.input.uraian?store.input.uraian:'-' }}
              </div>
            </div>
            <div class="row no-wrap items-center q-mb-sm">
              <div class="col-md-3 col-sm-3 col-xs-12">
                Satuan
              </div>
              <div class="q-ml-sm col-xs-12 col-md-9 col-sm-9">
                {{ store.input.satuan?store.input.satuan:'-' }}
              </div>
            </div>
          </div>
        </div>
        <div class="fit row no-wrap justify-end items-center">
          <app-btn
            label="Tambahkan"
            icon="icon-mat-add_circle"
            flat
            @click="tambah"
          />
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <div v-if="!store.displays.length">
          <app-no-data />
        </div>
        <div v-if="store.displays.length">
          <div class="fit row no-wrap justify-between items-center text-weight-bold">
            <div class="anak text-center">
              Kode Barang
            </div>
            <div class="anak text-center">
              Nama Barang
            </div>
            <div class="anak text-center">
              Kode 108
            </div>
            <div class="anak text-center">
              Uraian 108
            </div>
            <div class="anak text-center">
              Satuan
            </div>
            <div class="anak text-center">
              Jumlah
            </div>
            <div class="anak text-center">
              #
            </div>
          </div>
          <div
            v-for="(input, i) in store.displays"
            :key="i"
            class="fit row no-wrap justify-between items-center"
          >
            <div class="anak text-center">
              {{ input.kode_rs }}
            </div>
            <div class="anak text-center">
              {{ input.nama }}
            </div>
            <div class="anak text-center">
              {{ input.kode_108 }}
            </div>
            <div class="anak text-center">
              {{ input.uraian }}
            </div>
            <div class="anak text-center">
              {{ input.satuan }}
            </div>
            <div class="anak text-center">
              {{ input.jumlah }}
            </div>
            <div class="anak text-center">
              <q-btn
                round
                icon="icon-mat-delete"
                size="xs"
                color="negative"
                flat
                @click="remove(i)"
              />
            </div>
          </div>
        </div>
      </q-card-section>
      <q-card-actions
        v-if="store.displays.length"
        align="right"
      >
        <app-btn
          label="Simpan"
          icon="icon-mat-save"
          flat
          @click="simpan"
        />
      </q-card-actions>
    </q-card>
  </div>
</template>
<script setup>
import { notifErrVue } from 'src/modules/utils'
import { useBarangRusakStore } from 'src/stores/simrs/logistik/sigarang/transaksi/barangrusak/barangrusak'
import { ref } from 'vue'

const store = useBarangRusakStore()
store.getInitialData()

const refBarang = ref(null)
const barangSelected = (val) => {
  console.log('val', val)
  store.setDetail('kode_rs', val)
  store.setInput('kode_rs', val)
  const maping = store.mapingBarangs.filter(mp => {
    return mp.kode_rs === val
  })
  if (maping.length) {
    store.setDetail('kode_108', maping[0].kode_108)
    store.setDetail('kode_satuan', maping[0].kode_satuan)
    store.setInput('kode_108', maping[0].kode_108)
    store.setInput('kode_satuan', maping[0].kode_satuan)
    store.setInput('nama', maping[0].barangrs.nama)
    store.setInput('uraian', maping[0].barang108.uraian)
    store.setInput('satuan', maping[0].satuan.nama)
    console.log('maping', maping[0])
  }
}
const barangCleared = () => {
  refBarang.value.$refs.refAuto.resetValidation()
  store.setInput('kode_rs', null)
}
const penggunaSelected = (val) => {
  store.resetInput()
  store.setForm('kode_pengguna', val)
}
const penggunaCleared = () => {
  store.setInput('kode_pengguna', null)
  refBarang.value.$refs.refAuto.resetValidation()
  store.resetInput()
}

const refRuangan = ref(null)
const refJumlah = ref(null)
const tambah = () => {
  store.setInput('jumlah', store.details.jumlah)
  if (Object.keys(store.input).length && store.details.jumlah > 0) {
    store.form.details.push(store.details)
    store.displays.push(store.input)
    store.resetInput()
    console.log('tambah', refJumlah.value.$refs.refAuto)
    refBarang.value.$refs.refAuto.resetValidation()
    refJumlah.value.$refs.refInput.resetValidation()
    refBarang.value.$refs.refAuto.focus()
  } else {
    notifErrVue('Periksa kembali input yang belum terisi')
  }
}

const remove = val => {
  store.displays.splice(val, 1)
  store.form.details.splice(val, 1)
  console.log(val)
}

const simpan = () => {
  store.saveForm().then(() => {
    store.resetAll()
    refBarang.value.$refs.refAuto.resetValidation()
    refJumlah.value.$refs.refInput.resetValidation()
    refRuangan.value.$refs.refAuto.resetValidation()
    refRuangan.value.$refs.refAuto.focus()
  })
}
</script>
<style lang="scss" scoped>
.anak{
  width:calc(100vw/7);
}
</style>
