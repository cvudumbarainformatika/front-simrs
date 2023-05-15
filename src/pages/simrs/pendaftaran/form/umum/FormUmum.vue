<template>
  <q-page>
    <q-card
      class="full-width"
    >
      <q-card-section>
        <div class="f-14 text-weight-bold">
          Form Pendaftaran
        </div>
        <div class="title-desc">
          Form Pendaftaran Pasien Umum
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <div class="f-14 text-weight-bold q-mb-md">
          Pasien
        </div>
        <div class="row fit q-col-gutter-sm q-mb-md">
          <!-- kiri -->
          <div class="col-6">
            <div class="row q-col-gutter-sm items-center q-mb-xs">
              <div class="col-4">
                Pasien Baru / Lama
              </div>
              <div class="col-8">
                <app-autocomplete-new
                  :model="store.form.barulama"
                  label="Propinsi"
                  autocomplite="value"
                  option-value="value"
                  option-label="nama"
                  outlined
                  :source="store.jenisPasiens"
                  @on-select="setJenisPasien"
                />
              </div>
            </div>
            <div class="row q-col-gutter-sm items-center q-mb-xs">
              <div class="col-4">
                Nomor RM
              </div>
              <div class="col-8">
                anu
              </div>
            </div>
            <div class="row q-col-gutter-sm items-center q-mb-xs">
              <div class="col-4">
                Nama <span class="text-red">*</span>
              </div>
              <div class="col-8">
                <div class="row  q-col-gutter-sm items-center">
                  <div class="col-3">
                    <app-autocomplete
                      v-model="store.form.sapaan"
                      label=" "
                      autocomplite="sapaan"
                      option-value="sapaan"
                      option-label="sapaan"
                      outlined
                      :source="store.sapaans"
                      :loading="store.loading"
                    />
                  </div>
                  <div class="col-9">
                    <app-input
                      v-model="store.form.nama"
                      label="Nama"
                      outlined
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="row q-col-gutter-sm items-center q-mb-xs">
              <div class="col-4">
                Kelamin
              </div>
              <div class="col-8">
                <app-autocomplete
                  v-model="store.form.kelamin"
                  label="Jenis kelamin"
                  autocomplite="value"
                  option-value="value"
                  option-label="nama"
                  outlined
                  :source="store.kelamins"
                  :loading="store.loading"
                />
              </div>
            </div>
            <div class="row q-col-gutter-sm items-center q-mb-xs">
              <div class="col-4">
                Pendidikan
              </div>
              <div class="col-8">
                <app-autocomplete
                  v-model="store.form.pendidikan"
                  label="Pendidikan"
                  autocomplite="pendidikan"
                  option-value="pendidikan"
                  option-label="pendidikan"
                  outlined
                  :source="store.pendidikans"
                  :loading="store.loading"
                />
              </div>
            </div>
            <div class="row q-col-gutter-sm items-center q-mb-xs">
              <div class="col-4">
                Agama
              </div>
              <div class="col-8">
                <app-autocomplete-new
                  v-model="store.display.kode"
                  label="Agama"
                  autocomplite="kode"
                  option-value="kode"
                  option-label="keterangan"
                  outlined
                  :source="store.agamas"
                  :loading="store.loading"
                  @on-select="setAgama"
                />
              </div>
            </div>
            <div class="row q-col-gutter-sm items-center q-mb-xs">
              <div class="col-4">
                Alamat
              </div>
              <div class="col-8">
                <app-input
                  v-model="store.form.alamat"
                  outlined
                  label="Alamat"
                  type="textarea"
                />
              </div>
            </div>

            <div class="row q-col-gutter-sm items-center q-mb-xs">
              <div class="col-4">
                Suku
              </div>
              <div class="col-8">
                <app-input
                  v-model="store.form.suku"
                  label="Suku"
                  outlined
                />
              </div>
            </div>
            <div class="row q-col-gutter-sm items-center q-mb-xs">
              <div class="col-4">
                No. Telepon
              </div>
              <div class="col-8">
                <app-input
                  v-model="store.form.noteleponhp"
                  label="No telepon HP"
                  outlined
                  type="number"
                />
              </div>
            </div>
            <div class="row q-col-gutter-sm items-center q-mb-xs">
              <div class="col-4">
                Bahasa
              </div>
              <div class="col-8">
                <app-input
                  v-model="store.form.bahasa"
                  label="Bahasa"
                  outlined
                />
              </div>
            </div>
          </div>
          <!-- kanan -->
          <div class="col-6">
            <div class="row q-col-gutter-sm items-center q-mb-xs">
              <div class="col-4">
                No. KTP
              </div>
              <div class="col-8">
                <app-input
                  v-model="store.form.nik"
                  label="Nomor KTP"
                  outlined
                />
              </div>
            </div>
            <div class="row q-col-gutter-sm items-center q-mb-xs">
              <div class="col-4">
                No. KA BPJS
              </div>
              <div class="col-8">
                <app-input
                  v-model="store.form.nokabpjs"
                  label="Nomor KA BPJS"
                  outlined
                />
              </div>
            </div>
            <div class="row q-col-gutter-sm items-center q-mb-xs">
              <div class="col-4">
                Tempat Lahir
              </div>
              <div class="col-8">
                <app-input
                  v-model="store.form.templahir"
                  label="Tempat Lahir"
                  outlined
                />
              </div>
            </div>
            <div class="row q-col-gutter-sm items-center q-mb-xs">
              <div class="col-4">
                Tgl Lahir <span class="text-red">*</span>
              </div>
              <div class="col-8">
                <!-- <app-input-date-human
                  :model="store.tglLahir"
                  label="Tanggal lahir"
                  outlined
                  @set-model="setModelTglLahir"
                  @set-display="setDispTglLahir"
                /> -->
                <div class="row q-col-gutter-sm no-wrap">
                  <div>
                    <app-input
                      v-model="store.tanggal.hari"
                      label="Hari"
                      outlined
                      type="number"
                      @update:model-value="setHariLahir"
                    />
                  </div>
                  <div>
                    <app-input
                      v-model="store.tanggal.bulan"
                      label="Bulan"
                      outlined
                      type="number"
                      @update:model-value="setBulanLahir"
                    />
                  </div>
                  <div>
                    <app-input
                      v-model="store.tanggal.tahun"
                      label="Tahun"
                      outlined
                      type="number"
                      @update:model-value="setTahunLahir"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="row q-col-gutter-sm items-center q-mb-xs">
              <div class="col-4">
                Umur
              </div>
              <div class="col-8">
                <div class="row items-center q-col-gutter-sm">
                  <div class="col-2">
                    {{ store.form.umurthn }}
                    <!-- <app-input
                      v-model="store.form.umurthn"
                      label=""
                      outlined
                      type="number"
                    /> -->
                  </div>
                  <div class="col-2">
                    thn
                  </div>
                  <div class="col-2">
                    {{ store.form.umurbln }}
                    <!-- <app-input
                      v-model="store.form.umurbln"
                      label=""
                      outlined
                      type="number"
                    /> -->
                  </div>
                  <div class="col-2">
                    bln
                  </div>
                  <div class="col-2">
                    {{ store.form.umurhari }}
                    <!-- <app-input
                      v-model="store.form.umurhari"
                      label=""
                      outlined
                      type="number"
                    /> -->
                  </div>
                  <div class="col-2">
                    hari
                  </div>
                </div>
              </div>
            </div>
            <div class="row q-col-gutter-sm items-center q-mb-xs">
              <div class="col-4">
                RT / RW
              </div>
              <div class="col-8">
                <div class="row items-center q-col-gutter-sm">
                  <div class="col-4">
                    <app-input
                      v-model="store.form.rt"
                      label="RT"
                      outlined
                      type="number"
                    />
                  </div>
                  <div class="col-1 text-center">
                    /
                  </div>
                  <div class="col-4">
                    <app-input
                      v-model="store.form.rw"
                      label="RW"
                      outlined
                      type="number"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="row q-col-gutter-sm items-center q-mb-xs">
              <div class="col-4">
                Negara
              </div>
              <div class="col-8">
                <app-autocomplete-new
                  :model="store.wilayah.kd_negara"
                  label="Cari Negara"
                  autocomplite="wilayah"
                  option-value="kd_negara"
                  option-label="wilayah"
                  outlined
                  :source="store.negaras"
                  :loading="store.loadingSelect"
                  @on-select="store.negaraSelected"
                  @clear="store.clearNegara"
                />
              </div>
            </div>
            <div class="row q-col-gutter-sm items-center q-mb-xs">
              <div class="col-4">
                Propinsi
              </div>
              <div class="col-8">
                <app-autocomplete-new
                  :model="store.wilayah.propinsi"
                  label="Cari propinsi"
                  autocomplite="wilayah"
                  option-value="propinsi"
                  option-label="wilayah"
                  outlined
                  :source="store.propinsies"
                  :disable="!store.propinsies.length"
                  :loading="store.loadingSelect"
                  @on-select="store.propinsiSelected"
                  @clear="store.clearPropinsi"
                />
              </div>
            </div>
            <div class="row q-col-gutter-sm items-center q-mb-xs">
              <div class="col-4">
                Kabupaten
              </div>
              <div class="col-8">
                <app-autocomplete-new
                  :model="store.wilayah.kotakabupaten"
                  label="Cari kabupaten / kota"
                  autocomplite="wilayah"
                  option-value="kotakabupaten"
                  option-label="wilayah"
                  outlined
                  :source="store.kabupatens"
                  :loading="store.loadingSelect"
                  :disable="!store.kabupatens.length"
                  @on-select="store.kabupatenSelected"
                  @clear="store.clearKabupaten"
                />
              </div>
            </div>
            <div class="row q-col-gutter-sm items-center q-mb-xs">
              <div class="col-4">
                Kecamatan
              </div>
              <div class="col-8">
                <app-autocomplete-new
                  :model="store.wilayah.kecamatan.kotakabupaten"
                  label="Cari kecamatan"
                  autocomplite="wilayah"
                  option-value="kotakabupaten"
                  option-label="wilayah"
                  outlined
                  :source="store.kecamatans"
                  :loading="store.loadingSelect"
                  :disable="!store.kecamatans.length"
                  @on-select="store.kecamatanSelected"
                  @clear="store.clearKecamatan"
                />
              </div>
            </div>
            <div class="row q-col-gutter-sm items-center q-mb-xs">
              <div class="col-4">
                Kelurahan
              </div>
              <div class="col-8">
                <app-autocomplete-new
                  :model="store.wilayah.kelurahan.kotakabupaten"
                  label="Cari kelurahan"
                  autocomplite="wilayah"
                  option-value="kotakabupaten"
                  option-label="wilayah"
                  outlined
                  :source="store.kelurahans"
                  :loading="store.loadingSelect"
                  :disable="!store.kelurahans.length"
                  @on-select="store.kelurahanSelected"
                  @clear="store.clearKelurahan"
                />
              </div>
            </div>
            <!-- <div class="row q-col-gutter-sm items-center q-mb-xs">
              <div class="col-4">
                Foto
              </div>
              <div class="col-8">
                <app-input-image
                  :model="store.form.foto"
                  label="foto"
                  outlined
                  @on-file="setImage"
                />
              </div>
            </div> -->
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>
<script setup>
// import { date } from 'quasar'
import { findWithAttr } from 'src/modules/utils'
import { usePendaftaranPasienUmumStore } from 'src/stores/simrs/pendaftaran/form/umum/pendaftaranUmum'

const store = usePendaftaranPasienUmumStore()

function setJenisPasien(val) {
  store.setForm('barulama', val)
  console.log('baru lama', val)
}
function setHariLahir() {
  console.log('hari', store.tanggal)
}
function setBulanLahir() {
  console.log('hari', store.tanggal)
}
function setTahunLahir() {
  console.log('hari', store.tanggal)
}
// function setModelTglLahir(val) {
//   console.log('model tgl', val)
//   store.setForm('tgllahir', date.formatDate(val, 'YYYY-MM-DD'))
// }
// function setDispTglLahir(val) {
//   console.log('disp tgl', val)
//   store.tglLahir = val
//   // store.setForm('sapaan', val)
// }
// function setImage(val) {
//   console.log('image', val)
//   store.setForm('foto', val)
// }
function setAgama(val) {
  const index = findWithAttr(store.agamas, 'kode', val)
  const temp = store.agamas[index]
  store.setForm('agama', temp.keterangan)
  store.setForm('kodemapagama', temp.kodemapping)
  console.log('agama selected ', store.form)
}
// function setSapaan(val) {
// console.log('sapaan selected ', val)
// const index = findWithAttr(store.agamas, 'kode', val)
// const temp = store.agamas[index]
// store.setForm('agama', temp.keterangan)
// store.setForm('kodemapagama', temp.kodemapping)
// console.log('sapaan selected ', store.form)
// }
store.getInitialData()
</script>
