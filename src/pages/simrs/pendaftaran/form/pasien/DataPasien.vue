<template>
  <div
    ref="refPasien"
    class="q-pa-xs"
  >
    <!-- :simpanData="simpanData" -->
    <div
      v-if="notEdit"
      class="fixed-top row items-center justify-between bg-grey q-pa-sm"
      style="z-index: 10;"
    >
      <div class="f-14 text-weight-bold">
        Form Identitas Pasien I.1
      </div>
      <div>
        <q-checkbox
          v-model="store.edit"
          label="Edit Form "
          dense
        />
        <q-btn
          flat
          :icon="!full?'icon-mat-open_in_full':'icon-mat-close_fullscreen'"
          round
          size="sm"
          class="q-ml-md"
          color="white"
          @click="emits('fullScreen')"
        />
      </div>
    </div>
    <q-card
      class="full-width"
      flat
      style="margin-top: 60px;"
    >
      <q-card-section no-padding>
        <div
          class="row fit q-col-gutter-md q-mb-md"
        >
          <!-- kiri -->
          <div class="col-4">
            <!-- lama / baru -->
            <div
              class="row justify-between items-center q-mb-xs"
            >
              <div :class="store.form.barulama==='baru'?'satu':'bagi-dua'">
                <app-autocomplete-new
                  ref="refJenisPasien"
                  :model="store.form.barulama"
                  label="Pasien baru / lama"
                  autocomplete="value"
                  option-value="value"
                  option-label="nama"
                  autofocus
                  :filled="false"
                  :loading="store.loading"
                  :disable="store.loading || !notEdit"
                  :source="store.jenisPasiens"
                  @on-select="setJenisPasien"
                />
              </div>
              <div
                v-if="store.form.barulama==='lama'"
              >
                <q-btn
                  dense
                  flat
                  round
                  icon="icon-mat-search"
                  color="grey"
                  @click="store.cariPasienDialog=true"
                >
                  <q-tooltip
                    anchor="top middle"
                    self="center middle"
                  >
                    Cari pasien lain
                  </q-tooltip>
                  <template #loading>
                    <q-spinner-hourglass
                      class="on-left"
                      size="18px"
                    />
                    <span class="f-12"> Loading </span>
                  </template>
                </q-btn>
              </div>
            </div>
            <!-- no rm -->
            <div class="row q-col-gutter-sm items-center q-mb-xs">
              <div class="col-12">
                <app-input
                  ref="refNoRM"
                  v-model="store.form.norm"
                  label="Nomor RM"
                  autofocus
                  :filled="false"
                  :disable="store.form.barulama!=='baru'&&!store.edit"
                  :loading="store.loading"
                  :rules="[
                    val => (!!val) || 'Harap diisi',
                    val => val?val.length > 5:!val || 'Harus 6 Karakter',
                    val=>regex.test(val)||'Hanya angka'
                  ]"
                  @keyup.enter="inputNoRmSelesai"
                  @update:model-value="updateValNoRM"
                />
                <!-- val => val?val.length < 7:!val || 'Harus 6 Karakter', -->
              </div>
            </div>
            <!-- ktp -->
            <div class="row q-col-gutter-sm items-center q-mb-xs">
              <div class="col-12">
                <app-input
                  ref="refKtp"
                  v-model="store.form.nik"
                  label="Nomor KTP"
                  :filled="false"
                  :right-icon="!!bpjs"
                  right-icon-name="icon-mat-dvr"
                  :disable="store.form.barulama!=='baru'&&!store.edit&&(!store.form.nik?false:store.form.nik.length>=16)"
                  right-icon-tooltip="Cek BPJS"
                  :rules="[val=>regex.test(val)||'Hanya angka']"
                  @icon-right-click="cekBpjsbyNik"
                />
              </div>
            </div>
            <!-- kitas -->
            <div
              v-if="!bpjs"
              class="row q-col-gutter-sm items-center q-mb-xs"
            >
              <div class="col-12">
                <app-input
                  ref="refKitas"
                  v-model="store.form.kitas"
                  label="Nomor Paspor / KITAS"
                  :filled="false"
                  :disable="store.form.barulama!=='baru'&&!store.edit"
                  :rules="[val => ( !store.form.nik ? regex.test(val) : true) || 'Hanya angka']"
                />
              </div>
            </div>
            <!-- Nama ibu kandung -->
            <div class="row q-col-gutter-sm items-center q-mb-xs">
              <div class="col-12">
                <app-input
                  ref="refIbu"
                  v-model="store.form.namaibukandung"
                  label="Nama Ibu Kandung"
                  :filled="false"
                  :disable="store.form.barulama!=='baru'&&!store.edit"
                />
              </div>
            </div>
            <!-- KA BPJS -->
            <div class="row justify-between q-col-gutter-sm items-center q-mb-xs">
              <div :class="bpjs?'bagi-tiga':'satu'">
                <app-input
                  ref="refNoKaBpjs"
                  v-model="store.form.noka"
                  label="Nomor KA BPJS"
                  :filled="false"
                  :disable="store.form.barulama!=='baru'&&!store.edit"
                  :rules="[val=> (!!val ? regex.test( val ) : true) ||'Hanya angka']"
                  @update:model-value="setNokaBPJS"
                />
              </div>
              <div
                v-if="bpjs"
              >
                <q-btn
                  color="primary"
                  dense
                  flat
                  label="BPJS"
                  :loading="store.loadingNoka"
                  @click="cekBpjsByNoka"
                />
              </div>
              <div
                v-if="bpjs"
              >
                <q-btn
                  no-caps
                  color="primary"
                  dense
                  flat
                  label="finger"
                  :loading="store.loadingFinger"
                  @click="cekFinger"
                />
              </div>
            </div>
            <!-- nama -->
            <div class="row q-col-gutter-sm items-center q-mb-xs">
              <!-- <div class="col-4">
                Nama <span class="text-red">*</span>
              </div>
              <div class="col-8"> -->
              <div class="col-12">
                <div class="row  q-col-gutter-sm items-center">
                  <div class="col-3">
                    <app-autocomplete
                      ref="refSapaan"
                      v-model="store.form.sapaan"
                      label="Sapaan"
                      autocomplete="sapaan"
                      option-value="sapaan"
                      option-label="sapaan"
                      :filled="false"
                      :source="store.sapaans"
                      :loading="store.loading"
                      :disable="store.form.barulama!=='baru'&&!store.edit"
                      :rules="[val => (!!val) || 'Harap diisi',]"
                      @selected="sapaanSelected"
                      @keyup.enter="sapaanEnter"
                    />
                  </div>
                  <div class="col-9">
                    <app-input
                      ref="refNama"
                      v-model="store.form.nama"
                      label="Nama"
                      :filled="false"
                      :disable="store.form.barulama!=='baru'&&!store.edit"
                    />
                  </div>
                </div>
              </div>
            </div>
            <!-- tempat lahir -->
            <div class="row q-col-gutter-sm items-center q-mb-xs">
              <!-- <div class="col-4">
                Tempat Lahir
              </div>
              <div class="col-8"> -->
              <div class="col-12">
                <app-input
                  ref="refTempatLahir"
                  v-model="store.form.templahir"
                  label="Tempat Lahir"
                  :filled="false"
                  :disable="store.form.barulama!=='baru'&&!store.edit"
                />
              </div>
            </div>
            <!-- tgl lahir -->
            <div class="row q-col-gutter-sm items-center q-mb-xs">
              <!-- <div class="col-4">
                Tgl Lahir <span class="text-red">*</span>
              </div>
              <div class="col-8"> -->
              <div class="col-12">
                <div class="row q-col-gutter-sm no-wrap">
                  <div>
                    <app-input
                      ref="refHariLahir"
                      v-model="store.tanggal.hari"
                      label="Hari"
                      :filled="false"
                      type="number"
                      error-message="Periksa kembali tanggal lahir"
                      :error="lahirValid"
                      :disable="store.form.barulama!=='baru' && !store.edit"
                      @update:model-value="setHariLahir"
                      @focus="fokusHariLahir"
                    />
                  </div>
                  <div>
                    <app-input
                      ref="refBulanLahir"
                      v-model="store.tanggal.bulan"
                      label="Bulan"
                      :filled="false"
                      type="number"
                      error-message="Periksa kembali tanggal lahir"
                      :error="lahirValid"
                      :disable="store.form.barulama!=='baru' && !store.edit"
                      @update:model-value="setBulanLahir"
                    />
                  </div>
                  <div>
                    <app-input
                      ref="refTahunLahir"
                      v-model="store.tanggal.tahun"
                      label="Tahun"
                      :filled="false"
                      type="number"
                      :disable="store.form.barulama!=='baru' && !store.edit"
                      error-message="Periksa kembali tanggal lahir"
                      :error="lahirValid"
                      @update:model-value="setTahunLahir"
                    />
                  </div>
                </div>
              </div>
            </div>
            <!-- umur -->
            <div class="row q-col-gutter-sm items-center q-mb-xs">
              <!-- <div class="col-4">
                Umur
              </div>
              <div class="col-8"> -->
              <div class="col-12">
                <div class="row items-center q-col-gutter-sm">
                  <div class="col-2">
                    {{ store.form.umurthn }}
                  </div>
                  <div class="col-2">
                    thn
                  </div>
                  <div class="col-2">
                    {{ store.form.umurbln }}
                  </div>
                  <div class="col-2">
                    bln
                  </div>
                  <div class="col-2">
                    {{ store.form.umurhari }}
                  </div>
                  <div class="col-2">
                    hari
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- tengah -->
          <div class="col-4">
            <!-- kelamin -->
            <div class="row q-col-gutter-sm items-center q-mb-xs">
              <!-- <div class="col-4">
                Kelamin
              </div>
              <div class="col-8"> -->
              <div class="col-12">
                <app-autocomplete
                  ref="refKelamin"
                  v-model="store.form.kelamin"
                  label="Jenis kelamin"
                  autocomplete="kelamin"
                  option-value="kelamin"
                  option-label="kelamin"
                  :filled="false"
                  :source="store.kelamins"
                  :loading="store.loading"
                  :disable="store.form.barulama!=='baru'&&!store.edit"
                  :rules="[val => (!!val) || 'Harap diisi',]"
                  @selected="kelaminSelected"
                />
                <!-- @keyup.enter="kelaminSelected" -->
              </div>
            </div>
            <!-- pendidikan -->
            <div class="row q-col-gutter-sm items-center q-mb-xs">
              <!-- <div class="col-4">
                Pendidikan
              </div>
              <div class="col-8"> -->
              <div class="col-12">
                <app-autocomplete
                  ref="refPendidikan"
                  v-model="store.form.pendidikan"
                  label="Pendidikan"
                  autocomplete="pendidikan"
                  option-value="pendidikan"
                  option-label="pendidikan"
                  :filled="false"
                  :source="store.pendidikans"
                  :loading="store.loading"
                  :disable="store.form.barulama!=='baru'&&!store.edit"
                  :rules="[val => (!!val) || 'Harap diisi',]"
                  @selected="pendidikanSelected"
                />
                <!-- @keyup.enter="pendidikanSelected" -->
              </div>
            </div>
            <!-- agama -->
            <div class="row q-col-gutter-sm items-center q-mb-xs">
              <!-- <div class="col-4">
                Agama
              </div>
              <div class="col-8"> -->
              <div class="col-12">
                <div class="row q-mb-xs">
                  <div class="col-12">
                    <app-autocomplete-new
                      ref="refAgama"
                      v-model="store.display.kode"
                      label="Agama"
                      autocomplete="kode"
                      option-value="kode"
                      option-label="keterangan"
                      :filled="false"
                      :source="store.agamas"
                      :loading="store.loading"
                      :disable="store.form.barulama!=='baru'&&!store.edit"
                      :rules="[val => (!!val) || 'Harap diisi',]"
                      @on-select="setAgama"
                      @keyup.enter="setAgama"
                    />
                  </div>
                </div>
                <div
                  v-if="store.display.agama==='Lain-lain'"
                  class="row"
                >
                  <div class="col-12">
                    <app-input
                      ref="refTulisAgama"
                      v-model="store.form.agama"
                      label="Tulis Agama"
                      :filled="false"
                    />
                  </div>
                </div>
              </div>
            </div>
            <!-- suku -->
            <div class="row q-col-gutter-sm items-center q-mb-xs">
              <!-- <div class="col-4">
                Suku
              </div>
              <div class="col-8"> -->
              <div class="col-12">
                <app-input
                  ref="refSuku"
                  v-model="store.form.suku"
                  label="Suku"
                  :filled="false"
                  :disable="store.form.barulama!=='baru' && !store.edit"
                />
              </div>
            </div>
            <!-- bahasa -->
            <div class="row q-col-gutter-sm items-center q-mb-xs">
              <!-- <div class="col-4">
                Bahasa
              </div>
              <div class="col-8"> -->
              <div class="col-12">
                <app-input
                  ref="refBahasa"
                  v-model="store.form.bahasa"
                  label="Bahasa"
                  :filled="false"
                  :disable="store.form.barulama!=='baru'&&!store.edit"
                />
              </div>
            </div>
            <!-- status prnikahan -->
            <div class="row q-col-gutter-sm items-center q-mb-xs">
              <!-- <div class="col-4">
                Status Pernikahan
              </div>
              <div class="col-8"> -->
              <div class="col-12">
                <app-autocomplete
                  ref="refStatusPernikahan"
                  v-model="store.form.statuspernikahan"
                  label="Status Pernikahan"
                  autocomplete="statuspernikahan"
                  option-value="statuspernikahan"
                  option-label="statuspernikahan"
                  :filled="false"
                  :rules="[val => (!!val) || 'Harap diisi',]"
                  :source="store.statuspernikahans"
                  :loading="store.loading"
                  :disable="store.form.barulama!=='baru' && !store.edit"
                  @selected="statusPernikahanSelected"
                />
                <!-- <app-autocomplete-new
                  ref="refStatusPernikahan"
                  :model="store.wilayah.kelurahan.kotakabupaten"
                  label="Status Pernikahan"
                  autocomplete="wilayah"
                  option-value="kotakabupaten"
                  option-label="wilayah"
                  :filled="false"
                  :source="store.kelurahans"
                  :loading="store.loadingSelect"
                  :disable="!store.kelurahans.length || store.form.barulama!=='baru'"
                  @on-select="kelurahanSelected"
                  @clear="store.clearKelurahan"
                /> -->
              </div>
            </div>
            <!-- pekerjaan -->
            <div class="row q-col-gutter-sm items-center q-mb-xs">
              <!-- <div class="col-4">
                Pekerjaan
              </div>
              <div class="col-8"> -->
              <div class="col-12">
                <div class="row q-mb-xs">
                  <div class="col-12">
                    <app-autocomplete
                      ref="refPekerjaan"
                      v-model="store.display.pekerjaan"
                      label="Pilih Pekerjaan"
                      autocomplete="pekerjaan"
                      option-value="pekerjaan"
                      option-label="pekerjaan"
                      :filled="false"
                      :rules="[val => (!!val) || 'Harap diisi',]"
                      :source="store.pekerjaans"
                      :loading="store.loading"
                      :disable="store.form.barulama!=='baru' && !store.edit"
                      @selected="setPekerjaan"
                    />
                  </div>
                </div>
                <div
                  v-if="store.display.pekerjaan==='Lain-lain'"
                  class="row"
                >
                  <div class="col-12">
                    <app-input
                      ref="refInputPekerjaan"
                      v-model="store.form.pekerjaan"
                      label="tulis Pekerjaan"
                      :filled="false"
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- telepon Rumah -->
            <div class="row q-col-gutter-sm items-center q-mb-xs">
              <!-- <div class="col-4">
                No. Telepon Rumah
              </div>
              <div class="col-8"> -->
              <div class="col-12">
                <app-input
                  ref="refNoTlpRumah"
                  v-model="store.form.teleponrumah"
                  label="No telepon rumah"
                  :filled="false"
                  valid
                  :prefix="'+'+(store.form.negara?store.form.negara:'62')"
                  type="number"
                  :disable="store.form.barulama!=='baru'&&!store.edit"
                  @update:model-value="setTlpRumah"
                />
              </div>
            </div>
            <!-- telepon -->
            <div class="row q-col-gutter-sm items-center q-mb-xs">
              <!-- <div class="col-4">
                No. Ponsel
              </div>
              <div class="col-8"> -->
              <div class="col-12">
                <app-input
                  ref="refNoTlp"
                  v-model="store.form.teleponhp"
                  label="No Ponsel"
                  :filled="false"
                  :prefix="'+'+(store.form.negara?store.form.negara:'62')"
                  type="number"
                  :disable="store.form.barulama!=='baru'&&!store.edit"
                  @update:model-value="setTlpHP"
                />
              </div>
            </div>
          </div>
          <!-- kanan -->
          <div class="col-4">
            <!-- alamat -->
            <div class="row q-col-gutter-sm items-center q-mb-xs">
              <!-- <div class="col-4">
                Alamat
              </div>
              <div class="col-8"> -->
              <div class="col-12">
                <app-input
                  ref="refAlamat"
                  v-model="store.form.alamat"
                  :filled="false"
                  label="Alamat"
                  :disable="store.form.barulama!=='baru'&&!store.edit"
                  @update:model-value="setAlamat"
                />
              </div>
            </div>
            <!-- RT / RW -->
            <div class="row q-col-gutter-sm items-center q-mb-xs">
              <!-- <div class="col-4">
                RT / RW
              </div>
              <div class="col-8"> -->
              <div class="col-12">
                <div class="row items-center q-col-gutter-sm">
                  <div class="col-4">
                    <app-input
                      ref="refRT"
                      v-model="store.form.rt"
                      label="RT"
                      :filled="false"
                      type="number"
                      :disable="store.form.barulama!=='baru'&&!store.edit"
                      @update:model-value="setRT"
                    />
                  </div>
                  <div class="col-1 text-center">
                    /
                  </div>
                  <div class="col-4">
                    <app-input
                      ref="refRW"
                      v-model="store.form.rw"
                      label="RW"
                      :filled="false"
                      type="number"
                      :disable="store.form.barulama!=='baru'&&!store.edit"
                      @update:model-value="setRW"
                    />
                  </div>
                </div>
              </div>
            </div>
            <!-- Negara -->
            <div class="row q-col-gutter-sm items-center q-mb-xs">
              <!-- <div class="col-4">
                Negara
              </div>
              <div class="col-8"> -->
              <div class="col-12">
                <app-autocomplete-new
                  ref="refNegara"
                  :model="store.wilayah.kd_negara"
                  label="Cari Negara"
                  autocomplete="wilayah"
                  option-value="kd_negara"
                  option-label="wilayah"
                  :filled="false"
                  :source="store.negaras"
                  :loading="store.loadingSelect"
                  :disable="store.form.barulama!=='baru'&&!store.edit"
                  @on-select="negaraSelected"
                  @clear="store.clearNegara"
                />
              </div>
            </div>
            <!-- Propinsi -->
            <div class="row q-col-gutter-sm items-center q-mb-xs">
              <!-- <div class="col-4">
                Propinsi
              </div>
              <div class="col-8"> -->
              <div class="col-12">
                <app-autocomplete-new
                  ref="refPropinsi"
                  :model="store.wilayah.propinsi"
                  label="Cari propinsi"
                  autocomplete="wilayah"
                  option-value="propinsi"
                  option-label="wilayah"
                  :filled="false"
                  :source="store.propinsies"
                  :disable="!store.propinsies.length || (store.form.barulama!=='baru' && !store.edit)"
                  :loading="store.loadingPropinsi"
                  @on-select="propinsiSelected"
                  @clear="store.clearPropinsi"
                />
              </div>
            </div>
            <!-- kabupaten -->
            <div class="row q-col-gutter-sm items-center q-mb-xs">
              <!-- <div class="col-4">
                Kabupaten
              </div>
              <div class="col-8"> -->
              <div class="col-12">
                <app-autocomplete-new
                  ref="refKabupaten"
                  :model="store.wilayah.kotakabupaten"
                  label="Cari kabupaten / kota"
                  autocomplete="wilayah"
                  option-value="kotakabupaten"
                  option-label="wilayah"
                  :filled="false"
                  :source="store.kabupatens"
                  :loading="store.loadingKabupaten"
                  :disable="!store.kabupatens.length || (store.form.barulama!=='baru' && !store.edit)"
                  @on-select="kabupatenSelected"
                  @clear="store.clearKabupaten"
                />
              </div>
            </div>
            <!-- kecamatan -->
            <div class="row q-col-gutter-sm items-center q-mb-xs">
              <!-- <div class="col-4">
                Kecamatan
              </div>
              <div class="col-8"> -->
              <div class="col-12">
                <app-autocomplete-new
                  ref="refKecamatan"
                  :model="store.wilayah.kecamatan.kotakabupaten"
                  label="Cari kecamatan"
                  autocomplete="wilayah"
                  option-value="kotakabupaten"
                  option-label="wilayah"
                  :filled="false"
                  :source="store.kecamatans"
                  :loading="store.loadingKecamatan"
                  :disable="!store.kecamatans.length || (store.form.barulama!=='baru' && !store.edit)"
                  @on-select="kecamatanSelected"
                  @clear="store.clearKecamatan"
                />
              </div>
            </div>
            <!-- kelurahan -->
            <div class="row q-col-gutter-sm items-center q-mb-xs">
              <!-- <div class="col-4">
                Kelurahan
              </div>
              <div class="col-8"> -->
              <div class="col-12">
                <app-autocomplete-new
                  ref="refKelurahan"
                  :model="store.wilayah.kelurahan.kotakabupaten"
                  label="Cari kelurahan"
                  autocomplete="wilayah"
                  option-value="kotakabupaten"
                  option-label="wilayah"
                  :filled="false"
                  :source="store.kelurahans"
                  :loading="store.loadingKelurahan"
                  :disable="!store.kelurahans.length || (store.form.barulama!=='baru' && !store.edit)"
                  @on-select="kelurahanSelected"
                  @clear="store.clearKelurahan"
                />
              </div>
            </div>
            <!-- kode pos -->
            <div class="row q-col-gutter-sm items-center q-mb-xs">
              <!-- <div class="col-4">
                Kode Pos
              </div>
              <div class="col-8"> -->
              <div class="col-12">
                <app-input
                  ref="refKodePos"
                  v-model="store.form.kodepos"
                  label="Kode Pos"
                  type="number"
                  :filled="false"
                  :disable="store.form.barulama!=='baru'&&!store.edit"
                />
              </div>
            </div>
            <!-- Antrian -->
            <div class="row q-col-gutter-sm items-center q-mb-xs">
              <div class="col-12">
                <app-input
                  ref="refNoAntrian"
                  v-model="store.form.noantrian"
                  label="Nomor Antrian"
                  :filled="false"
                  @update:model-value="setNoAntrian"
                />
              </div>
            </div>
          </div>
        </div>
        <!-- check box alamat domisili sama -->
        <div class="row fit q-col-gutter-sm q-mb-md">
          <div class="col-12 text-right">
            <q-checkbox
              v-model="store.alamataDomisiliSama"
              label="Alamat dan Alamat Domisili sama "
              dense
              @update:model-value="store.samakanAlamatDanDomisili"
            />
          </div>
        </div>
      </q-card-section>
      <q-separator />
      <!-- alamat domisili -->
      <q-card-section v-if="!store.alamataDomisiliSama">
        <div class="text-weight-bold q-mb-md">
          <div class="row fit q-col-gutter-sm q-mb-md">
            <div class="f-14  col-6">
              Alamat Domisili
            </div>
          </div>
        </div>
        <div class="row fit q-col-gutter-sm q-mb-md">
          <div class="col-6">
            <!-- alamat domisili -->
            <div class="row q-col-gutter-sm items-center q-mb-xs">
              <div class="col-4">
                Alamat
              </div>
              <div class="col-8">
                <app-input
                  ref="refAlamatDomisili"
                  v-model="store.form.alamatdomisili"
                  :filled="false"
                  label="Alamat"
                  :disable="store.form.barulama!=='baru'&&!store.edit"
                />
              </div>
            </div>
            <!-- RT / RW domisili -->
            <div class="row q-col-gutter-sm items-center q-mb-xs">
              <div class="col-4">
                RT / RW
              </div>
              <div class="col-8">
                <div class="row items-center q-col-gutter-sm">
                  <div class="col-4">
                    <app-input
                      ref="refRTDomisili"
                      v-model="store.form.rtdomisili"
                      label="RT"
                      :filled="false"
                      type="number"
                      :disable="store.form.barulama!=='baru'&&!store.edit"
                    />
                  </div>
                  <div class="col-1 text-center">
                    /
                  </div>
                  <div class="col-4">
                    <app-input
                      ref="refRWDomisili"
                      v-model="store.form.rwdomisili"
                      label="RW"
                      :filled="false"
                      type="number"
                      :disable="store.form.barulama!=='baru'&&!store.edit"
                    />
                  </div>
                </div>
              </div>
            </div>
            <!-- negara domisili -->
            <div class="row q-col-gutter-sm items-center q-mb-xs">
              <div class="col-4">
                Negara
              </div>
              <div class="col-8">
                <app-autocomplete-new
                  ref="refNegaraDomisili"
                  :model="store.wilayahDomisili.kd_negara"
                  label="Cari Negara"
                  autocomplete="wilayah"
                  option-value="kd_negara"
                  option-label="wilayah"
                  :filled="false"
                  :source="store.domisiliNegaras"
                  :loading="store.loadingSelectDomisili"
                  :disable="store.form.barulama!=='baru'&&!store.edit"
                  @on-select="negaraDomisiliSelected"
                  @clear="store.clearNegaraDomisili"
                />
              </div>
            </div>
            <!-- propinsi domisili -->
            <div class="row q-col-gutter-sm items-center q-mb-xs">
              <div class="col-4">
                Propinsi
              </div>
              <div class="col-8">
                <app-autocomplete-new
                  ref="refPropinsiDomisili"
                  :model="store.wilayahDomisili.propinsi"
                  label="Cari propinsi"
                  autocomplete="wilayah"
                  option-value="propinsi"
                  option-label="wilayah"
                  :filled="false"
                  :source="store.domisiliPropinsies"
                  :disable="!store.domisiliPropinsies.length || (store.form.barulama!=='baru' && !store.edit)"
                  :loading="store.loadingPropinsiDomisili"
                  @on-select="propinsiDomisiliSelected"
                  @clear="store.clearPropinsiDomisili"
                />
              </div>
            </div>
          </div>
          <div class="col-6">
            <!-- kabupaten domisili -->
            <div class="row q-col-gutter-sm items-center q-mb-xs">
              <div class="col-4">
                Kabupaten
              </div>
              <div class="col-8">
                <app-autocomplete-new
                  ref="refKabupatenDomisili"
                  :model="store.wilayahDomisili.kotakabupaten"
                  label="Cari kabupaten / kota"
                  autocomplete="wilayah"
                  option-value="kotakabupaten"
                  option-label="wilayah"
                  :filled="false"
                  :source="store.domisiliKabupatens"
                  :loading="store.loadingKabupatenDomisili"
                  :disable="!store.domisiliKabupatens.length || (store.form.barulama!=='baru' && !store.edit)"
                  @on-select="kabupatenDomisiliSelected"
                  @clear="store.clearKabupatenDomisili"
                />
              </div>
            </div>
            <!-- kecamatan domisili -->
            <div class="row q-col-gutter-sm items-center q-mb-xs">
              <div class="col-4">
                Kecamatan
              </div>
              <div class="col-8">
                <app-autocomplete-new
                  ref="refKecamatanDomisili"
                  :model="store.wilayahDomisili.kecamatan.kotakabupaten"
                  label="Cari kecamatan"
                  autocomplete="wilayah"
                  option-value="kotakabupaten"
                  option-label="wilayah"
                  :filled="false"
                  :source="store.domisiliKecamatans"
                  :loading="store.loadingKecamatanDomisili"
                  :disable="!store.domisiliKecamatans.length || (store.form.barulama!=='baru' && !store.edit)"
                  @on-select="kecamatanDomisiliSelected"
                  @clear="store.clearKecamatanDomisili"
                />
              </div>
            </div>
            <!-- kelurahan domisili -->
            <div class="row q-col-gutter-sm items-center q-mb-xs">
              <div class="col-4">
                Kelurahan
              </div>
              <div class="col-8">
                <app-autocomplete-new
                  ref="refKelurahanDomisili"
                  :model="store.wilayahDomisili.kelurahan.kotakabupaten"
                  label="Cari kelurahan"
                  autocomplete="wilayah"
                  option-value="kotakabupaten"
                  option-label="wilayah"
                  :filled="false"
                  :source="store.domisiliKelurahans"
                  :loading="store.loadingKelurahanDomisili"
                  :disable="!store.domisiliKelurahans.length || (store.form.barulama!=='baru' && !store.edit)"
                  @on-select="kelurahanDomisiliSelected"
                  @clear="store.clearKelurahanDomisili"
                />
              </div>
            </div>
            <!-- kode pos domisili-->
            <div class="row q-col-gutter-sm items-center q-mb-xs">
              <div class="col-4">
                Kode Pos
              </div>
              <div class="col-8">
                <app-input
                  ref="refKodePosDom"
                  v-model="store.form.kodeposdomisili"
                  label="Kode Pos"
                  type="number"
                  :filled="false"
                  :disable="store.form.barulama!=='baru'&&!store.edit"
                />
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
    <dialogCariPasien
      v-model="store.cariPasienDialog"
      :bpjs="bpjs"
      @hide="cariPasienHide"
      @ganti-pasien="emits('gantiPasien')"
    />
    <app-dialog
      v-model="store.alert"
      :label="store.alertMsg.kode==='0'?'Status Finger Pasien':'Data Peserta BPJS'"
      @on-ok="dialogOk"
      @keyup="store.alert=false"
    >
      <template #default>
        <div
          v-if="store.alertMsg==='Tidak ditemukan'"
        >
          <app-no-selected-page
            color="primary"
            :text="store.alertMsg"
          />
        </div>
        <div
          v-if="store.alertMsg.peserta"
          class="q-pa-md"
        >
          <div class="row items-center q-my-sm">
            <div class="col-4">
              Nama
            </div>
            <div class="col-8">
              {{ store.alertMsg.peserta.nama }}
            </div>
          </div>
          <div class="row items-center q-my-sm">
            <div class="col-4">
              Hak Kelas
            </div>
            <div class="col-8">
              {{ store.alertMsg.peserta.hakKelas.keterangan }}
            </div>
          </div>
          <div class="row items-center q-my-sm">
            <div class="col-4">
              No. Kartu
            </div>
            <div class="col-8">
              {{ store.alertMsg.peserta.noKartu }}
            </div>
          </div>
          <div class="row items-center q-my-sm">
            <div class="col-4">
              Telepon
            </div>
            <div class="col-8">
              {{ store.alertMsg.peserta.mr.noTelepon?store.alertMsg.peserta.mr.noTelepon:'-' }}
            </div>
          </div>
          <div class="row items-center q-my-sm">
            <div class="col-4">
              Jenis Kelamin
            </div>
            <div class="col-8">
              {{ store.alertMsg.peserta.sex }}
            </div>
          </div>
          <div class="row items-center q-my-sm">
            <div class="col-4">
              Asal Faskes
            </div>
            <div class="col-8">
              {{ store.alertMsg.peserta.provUmum.nmProvider }}
            </div>
          </div>
          <div class="row items-center q-my-sm">
            <div class="col-4">
              Status Peserta
            </div>
            <div class="col-8">
              {{ store.alertMsg.peserta.statusPeserta.keterangan }}
            </div>
          </div>
          <div class="row items-center q-my-sm">
            <div class="col-4">
              Jenis Peserta
            </div>
            <div class="col-8">
              {{ store.alertMsg.peserta.jenisPeserta.keterangan }}
            </div>
          </div>
          <div class="row items-center q-my-sm">
            <div class="col-4">
              NIK
            </div>
            <div class="col-8">
              {{ store.alertMsg.peserta.nik }}
            </div>
          </div>
          <div class="row items-center q-my-sm">
            <div class="col-4">
              Dinsos
            </div>
            <div class="col-8">
              {{ store.alertMsg.peserta.informasi.dinsos?store.alertMsg.peserta.informasi.dinsos:'-' }}
            </div>
          </div>
          <div class="row items-center q-my-sm">
            <div class="col-4">
              No SKTM
            </div>
            <div class="col-8">
              {{ store.alertMsg.peserta.informasi.noSKTM?store.alertMsg.peserta.informasi.noSKTM:'-' }}
            </div>
          </div>
          <div class="row items-center q-my-sm">
            <div class="col-4">
              Prolanis PRB
            </div>
            <div class="col-8">
              {{ store.alertMsg.peserta.informasi.proranisPRB?store.alertMsg.peserta.informasi.proranisPRB:'-' }}
            </div>
          </div>
          <div class="row items-center q-my-sm">
            <div class="col-4">
              e SEP
            </div>
            <div class="col-8">
              {{ store.alertMsg.peserta.informasi.eSEP?store.alertMsg.peserta.informasi.eSEP:'-' }}
            </div>
          </div>
        </div>
        <div v-if="store.alertMsg.kode&&(store.alertMsg.kode!=='' && store.alertMsg.status!=='')">
          <app-no-selected-page
            color="primary"
            :icon="store.alertMsg.kode==='1'?'icon-mat-done':'icon-mat-report'"
            :text="store.alertMsg.status"
          />
        </div>
        <!-- {{ store.alertMsg }} -->
      </template>
    </app-dialog>
  </div>
</template>
<script setup>

import { date } from 'quasar'
import { findWithAttr, notifErrVue } from 'src/modules/utils'
import { usePendaftaranPasienStore } from 'src/stores/simrs/pendaftaran/form/pasien/pasien'
import { computed, onBeforeUpdate, ref } from 'vue'
import dialogCariPasien from './DialogCariPasien.vue'
import { useDialogCariPasienPendaftaranUmum } from 'src/stores/simrs/pendaftaran/form/pasien/dialogCariPasien'

const refPasien = ref(null)
const emits = defineEmits([
  'bisa-simpan',
  'tidak-simpan',
  'surat',
  'gantiPasien',
  'fullScreen'
])
const props = defineProps({
  bpjs: { type: Boolean, default: false },
  tampil: { type: Boolean, default: false },
  nik: { type: [String, Number], default: '' },
  noka: { type: [String, Number], default: '' },
  tglsep: { type: [String, Number], default: '' },
  full: { type: Boolean, default: false },
  notEdit: { type: Boolean, default: true }
})

const regex = /^\d+$/
const dialog = useDialogCariPasienPendaftaranUmum()
dialog.getInitialData()
const store = usePendaftaranPasienStore()

// set noka bpjs
function setNokaBPJS(val) {
  store.setForm('nokabpjs', val)
}
// cek BPJS
function cekBpjsbyNik() {
  if (refKtp.value.$refs.refInput.validate()) {
    const form = { nik: store.form.nik, tglsep: props.tglsep }
    store.cekPesertaByNik(form).then(resp => {
      store.alert = true
      store.alertMsg = resp.data.result
    })
  } else {
    notifErrVue('Nomor KTP Kosong')
  }
}
function cekBpjsByNoka() {
  if (refNoKaBpjs.value.$refs.refInput.validate() && !!store.form.noka) {
    const form = { noka: store.form.noka, tglsep: props.tglsep }
    store.cekPesertaByNoka(form).then(resp => {
      store.alert = true
      store.alertMsg = resp.data.result
    })
  } else {
    notifErrVue('Nomor BPJS Kosong')
  }
}
function cekFinger() {
  if (refNoKaBpjs.value.$refs.refInput.validate() && !!store.form.noka) {
    const form = { noka: store.form.noka, tglsep: props.tglsep }
    store.cekPesertaFinger(form)
  } else {
    notifErrVue('Nomor BPJS Kosong')
  }
}
function dialogOk() {
  store.alert = false
}
// -----

// refs
const refJenisPasien = ref(null)
const refNoRM = ref(null)
const refSapaan = ref(null)
const refNama = ref(null)
const refKelamin = ref(null)
const refTempatLahir = ref(null)
const refPendidikan = ref(null)
const refAgama = ref(null)
const refAlamat = ref(null)
const refSuku = ref(null)
const refIbu = ref(null)
const refKodePos = ref(null)
const refNoAntrian = ref(null)
const refKodePosDom = ref(null)
const refTahunLahir = ref(null)
const refBulanLahir = ref(null)
const refHariLahir = ref(null)
const refRT = ref(null)
const refRW = ref(null)
const refNegaraDomisili = ref(null)
const refPropinsiDomisili = ref(null)
const refKabupatenDomisili = ref(null)
const refKecamatanDomisili = ref(null)
const refKelurahanDomisili = ref(null)
const refRTDomisili = ref(null)
const refRWDomisili = ref(null)
const refNoTlp = ref(null)
const refBahasa = ref(null)
const refKtp = ref(null)
const refNoKaBpjs = ref(null)
const refStatusPernikahan = ref(null)
const refPekerjaan = ref(null)
const refInputPekerjaan = ref(null)
const refNegara = ref(null)
const refPropinsi = ref(null)
const refKabupaten = ref(null)
const refKecamatan = ref(null)
const refKelurahan = ref(null)
// validasi noka dan norm
function validateNokaAndNorm() {
  if (refNoRM.value.$refs.refInput.validate() &&
   refNoKaBpjs.value.$refs.refInput.validate()) {
    emits('surat', { nik: store.form.nik, noka: store.form.noka, norm: store.form.norm })
    return { nik: store.form.nik, noka: store.form.noka, norm: store.form.norm }
  } else {
    if (refNoRM.value.$refs.refInput.validate() === false) { notifErrVue('No RM Kosong') }
    if (refNoKaBpjs.value.$refs.refInput.validate() === false) { notifErrVue('No BPJS Kosong') }
    return false
  }
}
function validateNoka() {
  if (refNoKaBpjs.value.$refs.refInput.validate()) {
    return { noka: store.form.noka }
  } else {
    notifErrVue('No BPJS Kosong')
  }
}
// reset validasi
function resetValidation() {
  // reset validation
  refJenisPasien.value.$refs.refAuto.resetValidation()
  refNoRM.value.$refs.refInput.resetValidation()
  refNama.value.$refs.refInput.resetValidation()
  refSapaan.value.$refs.refAuto.resetValidation()
  refKelamin.value.$refs.refAuto.resetValidation()
  refTempatLahir.value.$refs.refInput.resetValidation()
  refIbu.value.$refs.refInput.resetValidation()
  refHariLahir.value.$refs.refInput.resetValidation()
  refBulanLahir.value.$refs.refInput.resetValidation()
  refTahunLahir.value.$refs.refInput.resetValidation()
  refPendidikan.value.$refs.refAuto.resetValidation()
  refAgama.value.$refs.refAuto.resetValidation()
  refSuku.value.$refs.refInput.resetValidation()
  refNoTlp.value.$refs.refInput.resetValidation()
  refBahasa.value.$refs.refInput.resetValidation()
  refKodePos.value.$refs.refInput.resetValidation()
  refNoAntrian.value.$refs.refInput.resetValidation()
  refKtp.value.$refs.refInput.resetValidation()
  refNoKaBpjs.value.$refs.refInput.resetValidation()
  refAlamat.value.$refs.refInput.resetValidation()
  refRT.value.$refs.refInput.resetValidation()
  refRW.value.$refs.refInput.resetValidation()
  refNegara.value.$refs.refAuto.resetValidation()
  refPropinsi.value.$refs.refAuto.resetValidation()
  refKabupaten.value.$refs.refAuto.resetValidation()
  refKecamatan.value.$refs.refAuto.resetValidation()
  refKelurahan.value.$refs.refAuto.resetValidation()
  refPekerjaan.value.$refs.refAuto.resetValidation()
  refStatusPernikahan.value.$refs.refAuto.resetValidation()
  if (refTulisAgama.value !== null) { refTulisAgama.value.$refs.refInput.resetValidation() }
  if (refInputPekerjaan.value !== null) { refInputPekerjaan.value.$refs.refInput.resetValidation() }
  if (!store.alamataDomisiliSama) { refRTDomisili.value.$refs.refInput.resetValidation() }
  if (!store.alamataDomisiliSama) { refRWDomisili.value.$refs.refInput.resetValidation() }
  if (!store.alamataDomisiliSama) { refNegaraDomisili.value.$refs.refAuto.resetValidation() }
  if (!store.alamataDomisiliSama) { refPropinsiDomisili.value.$refs.refAuto.resetValidation() }
  if (!store.alamataDomisiliSama) { refKabupatenDomisili.value.$refs.refAuto.resetValidation() }
  if (!store.alamataDomisiliSama) { refKecamatanDomisili.value.$refs.refAuto.resetValidation() }
  if (!store.alamataDomisiliSama) { refKelurahanDomisili.value.$refs.refAuto.resetValidation() }
  if (!store.alamataDomisiliSama) { refKodePosDom.value.$refs.refInput.resetValidation() }
}
// hari ini
const hariIni = Date.now()
// jenis pasien lama / baru
function setJenisPasien(val) {
  store.setForm('barulama', val)
  if (val === 'baru') {
    refJenisPasien.value.$refs.refAuto.blur()
    refNoRM.value.$refs.refInput.focus()
    store.form = { barulama: 'baru' }
    store.lahirHariIni()
    console.log('pasien baru')
    setTimeout(() => {
      resetValidation()
    }, 1000)
  }
  if (val === 'lama') {
    refJenisPasien.value.$refs.refAuto.blur()
    store.cariPasienDialog = true
    resetValidation()
    // lahirValid.value = false
    // console.log('lahir valid', lahirValid.value)
    //
  }
}
// -- dialog cari pasien, untuk pasien lama--start--
function cariPasienHide(val) {
  console.log('cari pasien sembunyi', store.cariPasienDialog)
}
// alamat
function setAlamat(val) {
  if (store.alamataDomisiliSama) { store.setForm('alamatdomisili', val) }
}
// set RT / RW
function setRT(val) {
  if (store.alamataDomisiliSama) { store.setForm('rtdomisili', val) }
  if (val.length === 3) {
    refRT.value.$refs.refInput.blur()
    refRW.value.$refs.refInput.focus()
  }
}
function setRW(val) {
  if (store.alamataDomisiliSama) { store.setForm('rwdomisili', val) }
  if (val.length === 3) {
    refRW.value.$refs.refInput.blur()
    refNegara.value.$refs.refAuto.focus()
  }
}
// set nomor Antrian
function setNoAntrian(val) {
  if (val.length > 1) {
    const temp = parseInt(val.slice(1, val.length))
    console.log('antrian ', val.length)
    console.log('temp ', temp)
    store.setForm('angkaantrean', temp)
  }
}
// -- dialog cari pasien, untuk pasien lama--end--
// input no rm
function inputNoRmSelesai(val) {
  // console.log('input selesai', val)
  refNoRM.value.$refs.refInput.blur()
  refKtp.value.$refs.refInput.focus()
  // refSapaan.value.$refs.refAuto.focus()
}
function updateValNoRM(val) {
  store.setForm('norm', val)
  // console.log('ref sapaan', refSapaan.value.$refs.refAuto)

  // console.log('input no rm', val.length)
  // if (val.length === 6) {
  // const temp = val.slice(0, 6)
  // console.log('no rm', store.form.norm)
  // refNoRM.value.$refs.refInput.blur()?
  // refKtp.value.$refs.refInput.focus()
  // refSapaan.value.$refs.refAuto.focus()
  // }
}
// input sapaan dan nama
function sapaanSelected(val) {
  refSapaan.value.$refs.refAuto.blur()
  refNama.value.$refs.refInput.focus()
  console.log('sapaan selected', val)
}
function sapaanEnter() {
  refSapaan.value.$refs.refAuto.blur()
  refNama.value.$refs.refInput.focus()
  console.log('sapaan selesai')
}

// refkelamin
function kelaminSelected() {
  refKelamin.value.$refs.refAuto.blur()
  refPendidikan.value.$refs.refAuto.focus()
  // refTempatLahir.value.$refs.refInput.focus()
}

// ref pendidikan
function pendidikanSelected() {
  refPendidikan.value.$refs.refAuto.blur()
  refAgama.value.$refs.refAuto.focus()
}

// ref agama
const refTulisAgama = ref(null)
function setAgama(val) {
  const index = findWithAttr(store.agamas, 'kode', val)
  const temp = store.agamas[index]
  // console.log('agama temp ', temp)
  store.setForm('kodemapagama', temp.kodemapping)
  store.display.agama = temp.keterangan
  if (temp.keterangan === 'Lain-lain') {
    if (store.form.agama) delete store.form.agama
    setTimeout(() => {
      refAgama.value.$refs.refAuto.blur()
      refTulisAgama.value.$refs.refInput.focus()
    }, 500)
  } else {
    store.setForm('agama', temp.keterangan)
    refAgama.value.$refs.refAuto.blur()
    refSuku.value.$refs.refInput.focus()
  }
  console.log('agama selected ', store.form)
}

// status pernikahan
function statusPernikahanSelected(val) {
  refStatusPernikahan.value.$refs.refAuto.blur()
  refPekerjaan.value.$refs.refAuto.focus()
}
// ---tanggal lahir start--

function setTanggalLahir() {
  const tanggal = store.tanggal.tahun + '-' + store.tanggal.bulan + '-' + store.tanggal.hari
  const tahunini = parseInt(date.formatDate(hariIni, 'YYYY'))
  const bulahini = parseInt(date.formatDate(hariIni, 'MM'))
  const hariini = parseInt(date.formatDate(hariIni, 'DD'))

  const hariLahir = parseInt(store.tanggal.hari)
  const bulanLahir = parseInt(store.tanggal.bulan)
  const tahunLahir = parseInt(store.tanggal.tahun)
  const tglLahir = new Date(tanggal)

  const daysDiff = hariini - hariLahir
  const monthsDiff = bulahini - bulanLahir
  const yearsDiff = tahunini - tahunLahir

  store.form.umurhari = daysDiff < 0 ? parseInt(date.daysInMonth(tglLahir) - hariLahir + hariini) : daysDiff
  store.form.umurbln = monthsDiff < 0 ? 12 - bulanLahir + bulahini : monthsDiff
  store.form.umurthn = monthsDiff < 0 ? yearsDiff - 1 : yearsDiff

  console.log('perbedaan ', yearsDiff, monthsDiff, daysDiff)
}
function fokusHariLahir() {
  refHariLahir.value.$refs.refInput.select()
}
function setHariLahir(val) {
  if (val.length === 2) {
    refHariLahir.value.$refs.refInput.blur()
    refBulanLahir.value.$refs.refInput.focus()
    refBulanLahir.value.$refs.refInput.select()
  }
  setTanggalLahir()
}

function setBulanLahir(val) {
  if (val.length === 2) {
    refBulanLahir.value.$refs.refInput.blur()
    refTahunLahir.value.$refs.refInput.focus()
    refTahunLahir.value.$refs.refInput.select()
  }
  setTanggalLahir()
}

function setTahunLahir(val) {
  if (val.length === 4) {
    refTahunLahir.value.$refs.refInput.blur()
    refKelamin.value.$refs.refAuto.focus()
    // refRT.value.$refs.refInput.focus()
  }
  setTanggalLahir()
}
// ----tanggal lahir end-----

// ---get negara to kelurahah start----

function negaraSelected(val) {
  store.negaraSelected(val)
  store.getProvinces().then(() => {
    refNegara.value.$refs.refAuto.blur()
    refPropinsi.value.$refs.refAuto.focus()
    refPropinsi.value.$refs.refAuto.showPopup()
  })
}
function propinsiSelected(val) {
  store.propinsiSelected(val)
  store.getKota().then(() => {
    refPropinsi.value.$refs.refAuto.blur()
    refKabupaten.value.$refs.refAuto.focus()
    refKabupaten.value.$refs.refAuto.showPopup()
  })
}
function kabupatenSelected(val) {
  store.kabupatenSelected(val)
  store.getKec().then(() => {
    refKabupaten.value.$refs.refAuto.blur()
    refKecamatan.value.$refs.refAuto.focus()
    refKecamatan.value.$refs.refAuto.showPopup()
  })
}
function kecamatanSelected(val) {
  store.kecamatanSelected(val)
  store.getKels().then(() => {
    refKecamatan.value.$refs.refAuto.blur()
    refKelurahan.value.$refs.refAuto.focus()
    refKelurahan.value.$refs.refAuto.showPopup()
  })
}
function kelurahanSelected(val) {
  store.kelurahanSelected(val)
  refKelurahan.value.$refs.refAuto.blur()
  refKodePos.value.$refs.refInput.focus()
}
// ---get negara to kelurahah end----

// ---get negara to kelurahah domisili start----

function negaraDomisiliSelected(val) {
  store.negaraDomisiliSelected(val)
  store.getProvincesDomisili().then(() => {
    refNegaraDomisili.value.$refs.refAuto.blur()
    refPropinsiDomisili.value.$refs.refAuto.focus()
    refPropinsiDomisili.value.$refs.refAuto.showPopup()
  })
}
function propinsiDomisiliSelected(val) {
  store.propinsiDomisiliSelected(val)
  store.getKotaDomisili().then(() => {
    refPropinsiDomisili.value.$refs.refAuto.blur()
    refKabupatenDomisili.value.$refs.refAuto.focus()
    refKabupatenDomisili.value.$refs.refAuto.showPopup()
  })
}
function kabupatenDomisiliSelected(val) {
  store.kabupatenDomisiliSelected(val)
  store.getKecDomisili().then(() => {
    refKabupatenDomisili.value.$refs.refAuto.blur()
    refKecamatanDomisili.value.$refs.refAuto.focus()
    refKecamatanDomisili.value.$refs.refAuto.showPopup()
  })
}
function kecamatanDomisiliSelected(val) {
  store.kecamatanDomisiliSelected(val)
  store.getKelsDomisili().then(() => {
    refKecamatanDomisili.value.$refs.refAuto.blur()
    refKelurahanDomisili.value.$refs.refAuto.focus()
    refKelurahanDomisili.value.$refs.refAuto.showPopup()
  })
}
function kelurahanDomisiliSelected(val) {
  store.kelurahanDomisiliSelected(val)
  refKelurahanDomisili.value.$refs.refAuto.blur()
  // refBahasa.value.$refs.refInput.focus()
}
// ---get negara to kelurahah domisili end----

function setTlpRumah(val) {
  // console.log('form', store.form)
  if (val.charAt(0) === '0') {
    // console.log('val', val.charAt(0), val.slice(1, val.length))
    store.setForm('noteleponrumah', '+' + (store.form.negara ? store.form.negara : '62') + val.slice(1, val.length))
  } else {
    // console.log('val', val.charAt(0), val.slice(0, 1))
    store.setForm('noteleponrumah', '+' + (store.form.negara ? store.form.negara : '62') + val)
  }
}
function setTlpHP(val) {
  // console.log('val', val)
  if (val.charAt(0) === '0') {
    // console.log('val', val.charAt(0), val.slice(1, val.length))
    store.setForm('noteleponhp', '+' + (store.form.negara ? store.form.negara : '62') + val.slice(1, val.length))
  } else {
    // console.log('val', val.charAt(0), val.slice(0, 1))
    store.setForm('noteleponhp', '+' + (store.form.negara ? store.form.negara : '62') + val)
  }
  // console.log('form', store.form)
}
function setPekerjaan(val) {
  // console.log(val)
  if (val === 'Lain-lain') {
    if (store.form.pekerjaan) delete store.form.pekerjaan
    setTimeout(() => {
      refPekerjaan.value.$refs.refAuto.blur()
      refInputPekerjaan.value.$refs.refInput.focus()
    }, 500)
  } else {
    refPekerjaan.value.$refs.refAuto.blur()
    refKtp.value.$refs.refInput.focus()
    store.setForm('pekerjaan', val)
  }
}
const lahirValid = computed(() => {
  const hariIni = new Date(date.formatDate('1900-01-01', 'YYYY-MM-DD'))
  const tanggal = new Date(date.formatDate(store.tanggal.tahun + '-' + store.tanggal.bulan + '-' + store.tanggal.hari, 'YYYY-MM-DD'))
  // console.log('validate tanggal', date.isSameDate(hariIni, tanggal, 'days'), hariIni, tanggal)
  return date.isSameDate(hariIni, tanggal, 'days')
})
let valid = false
function validasi() {
  const JenisPasien = refJenisPasien.value.$refs.refAuto.validate()
  const NoRM = refNoRM.value.$refs.refInput.validate()
  const Nama = refNama.value.$refs.refInput.validate()
  const Sapaan = refSapaan.value.$refs.refAuto.validate()
  const Kelamin = refKelamin.value.$refs.refAuto.validate()
  const TempatLahir = refTempatLahir.value.$refs.refInput.validate()
  const Ibu = refIbu.value.$refs.refInput.validate()
  const HariLahir = refHariLahir.value.$refs.refInput.validate()
  const BulanLahir = refBulanLahir.value.$refs.refInput.validate()
  const TahunLahir = refTahunLahir.value.$refs.refInput.validate()
  const Pendidikan = refPendidikan.value.$refs.refAuto.validate()
  const StatusPernikahan = refStatusPernikahan.value.$refs.refAuto.validate()

  const Pekerjaan = refPekerjaan.value.$refs.refAuto.validate()
  const InputPekerjaan = store.display.pekerjaan === 'Lain-lain' ? refInputPekerjaan.value.$refs.refInput.validate() : true

  const Agama = refAgama.value.$refs.refAuto.validate()
  const TulisAgama = store.display.agama === 'Lain-lain' ? refTulisAgama.value.$refs.refInput.validate() : true

  const Suku = refSuku.value.$refs.refInput.validate()

  const NoTlp = refNoTlp.value.$refs.refInput.validate()
  const Bahasa = refBahasa.value.$refs.refInput.validate()
  const KodePos = refKodePos.value.$refs.refInput.validate()
  const NoAntrian = refNoAntrian.value.$refs.refInput.validate()
  const Ktp = refKtp.value.$refs.refInput.validate()
  const NoKaBpjs = refNoKaBpjs.value.$refs.refInput.validate()
  const Alamat = refAlamat.value.$refs.refInput.validate()
  const RT = refRT.value.$refs.refInput.validate()
  const RW = refRW.value.$refs.refInput.validate()
  const Negara = refNegara.value.$refs.refAuto.validate()
  const Propinsi = refPropinsi.value.$refs.refAuto.validate()
  const Kabupaten = refKabupaten.value.$refs.refAuto.validate()
  const Kecamatan = refKecamatan.value.$refs.refAuto.validate()
  const Kelurahan = refKelurahan.value.$refs.refAuto.validate()

  const RTDomisili = store.alamataDomisiliSama ? true : refRTDomisili.value.$refs.refInput.validate()
  const RWDomisili = store.alamataDomisiliSama ? true : refRWDomisili.value.$refs.refInput.validate()
  const NegaraDomisili = store.alamataDomisiliSama ? true : refNegaraDomisili.value.$refs.refAuto.validate()
  const PropinsiDomisili = store.alamataDomisiliSama ? true : refPropinsiDomisili.value.$refs.refAuto.validate()
  const KabupatenDomisili = store.alamataDomisiliSama ? true : refKabupatenDomisili.value.$refs.refAuto.validate()
  const KecamatanDomisili = store.alamataDomisiliSama ? true : refKecamatanDomisili.value.$refs.refAuto.validate()
  const KelurahanDomisili = store.alamataDomisiliSama ? true : refKelurahanDomisili.value.$refs.refAuto.validate()
  const KodePosDom = store.alamataDomisiliSama ? true : refKodePosDom.value.$refs.refInput.validate()

  console.log('StatusPernikahan', StatusPernikahan)

  if (
    JenisPasien && NoRM && Nama && Sapaan && Kelamin &&
  TempatLahir && HariLahir && BulanLahir && TahunLahir && Ibu &&
  Pendidikan && StatusPernikahan && Pekerjaan && InputPekerjaan &&
  Agama && TulisAgama && Suku && NoTlp && Bahasa && KodePos && NoAntrian &&
  Ktp && NoKaBpjs && Alamat && RT && RW && Negara && Propinsi &&
  Kabupaten && Kecamatan && Kelurahan && RTDomisili && RWDomisili &&
  NegaraDomisili && PropinsiDomisili && KabupatenDomisili &&
  KecamatanDomisili && KodePosDom && KelurahanDomisili) {
    valid = true
  } else { valid = false }
}
function set() {
  validasi()
  // console.log('Baru', baru)
  if (valid) {
    emits('bisa-simpan', { form: store.form, save: true })
    return { form: store.form, save: true }
    // console.log('lanjut')
  } else {
    emits('bisa-simpan', { form: store.form, save: false })
    // emits('tidak-simpan')
    notifErrVue('periksa kembali input data pasien anda')
    return { form: store.form, save: false }
  }
}

function cekBpjs() {
  console.log('Cek bpjs awal')
  if (refNoKaBpjs.value.$refs.refInput.validate() && !!store.form.noka) {
    const form = { noka: store.form.noka, tglsep: props.tglsep }
    store.cekPesertaByNoka(form).then(() => {
      console.log('Cek bpjs', store.form)
    })
  } else {
    notifErrVue('Nomor BPJS Kosong')
  }
}

defineExpose({ set, cekBpjs, resetValidation, validateNokaAndNorm, validateNoka })

store.getInitialData()
onBeforeUpdate(() => {
  // console.log('jenis pasien', refJenisPasien.value)
})
</script>
<style lang="scss" scoped>
.bagi-tiga{
  width:70%;
}
.bagi-dua{
  width:90%;
}
.satu{
  width:100%;
}
</style>
