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
                  label="Pasien Baru / Pasien lama"
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
                      autocomplite="value"
                      option-value="value"
                      option-label="nama"
                      outlined
                      :source="store.sapaans"
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
                  autocomplite="value"
                  option-value="value"
                  option-label="nama"
                  outlined
                  :source="store.pendidikans"
                />
              </div>
            </div>
            <div class="row q-col-gutter-sm items-center q-mb-xs">
              <div class="col-4">
                Agama
              </div>
              <div class="col-8">
                <app-autocomplete
                  v-model="store.form.agama"
                  label="Agama"
                  autocomplite="value"
                  option-value="value"
                  option-label="nama"
                  outlined
                  :source="store.agamas"
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
                Propinsi
              </div>
              <div class="col-8">
                anu
              </div>
            </div>
            <div class="row q-col-gutter-sm items-center q-mb-xs">
              <div class="col-4">
                Suku
              </div>
              <div class="col-8">
                <app-autocomplete
                  v-model="store.form.suku"
                  label="Suku"
                  autocomplite="value"
                  option-value="value"
                  option-label="nama"
                  outlined
                  :source="store.sukus"
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
                <app-input-date-human
                  :model="store.tglLahir"
                  label="Tanggal lahir"
                  outlined
                  @set-model="setModelTglLahir"
                  @set-display="setDispTglLahir"
                />
              </div>
            </div>
            <div class="row q-col-gutter-sm items-center q-mb-xs">
              <div class="col-4">
                Umur
              </div>
              <div class="col-8">
                <div class="row items-center q-col-gutter-sm">
                  <div class="col-2">
                    <app-input
                      v-model="store.form.umurthn"
                      label=""
                      outlined
                      type="number"
                    />
                  </div>
                  <div class="col-2">
                    thn
                  </div>
                  <div class="col-2">
                    <app-input
                      v-model="store.form.umurbln"
                      label=""
                      outlined
                      type="number"
                    />
                  </div>
                  <div class="col-2">
                    bln
                  </div>
                  <div class="col-2">
                    <app-input
                      v-model="store.form.umurhari"
                      label=""
                      outlined
                      type="number"
                    />
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
                Kelurahan
              </div>
              <div class="col-8">
                <app-input
                  v-model="store.form.kelurahan"
                  label="Kelurahan"
                  outlined
                />
              </div>
            </div>
            <div class="row q-col-gutter-sm items-center q-mb-xs">
              <div class="col-4">
                Kabupaten
              </div>
              <div class="col-8">
                anu
              </div>
            </div>
            <div class="row q-col-gutter-sm items-center q-mb-xs">
              <div class="col-4">
                Kecamatan
              </div>
              <div class="col-8">
                anu
              </div>
            </div>
            <div class="row q-col-gutter-sm items-center q-mb-xs">
              <div class="col-4">
                Foto
              </div>
              <div class="col-8">
                <app-input-image
                  :model="store.form.foto"
                  label="foto"
                  outlined
                  @update:model="setImage"
                />
              </div>
            </div>
            <div class="row q-col-gutter-sm items-center q-mb-xs">
              <div class="col-4">
                No. Antrian
              </div>
              <div class="col-8">
                <app-input
                  v-model="store.form.noantrian"
                  label="Kelurahan"
                  outlined
                />
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>
<script setup>
import { date } from 'quasar'
import { usePendaftaranPasienUmumStore } from 'src/stores/simrs/pendaftaran/form/umum/pendaftaranUmum'

const store = usePendaftaranPasienUmumStore()

function setJenisPasien(val) {
  store.setForm('barulama', val)
  console.log('baru lama', val)
}
function setModelTglLahir(val) {
  console.log('model tgl', val)
  store.setForm('tgllahir', date.formatDate(val, 'YYYY-MM-DD'))
}
function setDispTglLahir(val) {
  console.log('disp tgl', val)
  store.tglLahir = val
  // store.setForm('sapaan', val)
}
function setImage(val) {
  console.log('image', val)
  store.setForm('foto', val)
}
</script>
