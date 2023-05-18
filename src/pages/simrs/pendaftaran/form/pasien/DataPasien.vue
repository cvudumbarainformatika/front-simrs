<template>
  <div ref="refPasien">
    <!-- :simpanData="simpanData" -->
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
            <!-- lama / baru -->
            <div class="row q-col-gutter-sm items-center q-mb-xs">
              <div class="col-4">
                Pasien Baru / Lama
              </div>
              <div :class="store.form.barulama==='baru'?'col-8':'col-7'">
                <app-autocomplete-new
                  ref="refJenisPasien"
                  :model="store.form.barulama"
                  label="Pasien baru / lama"
                  autocomplete="value"
                  option-value="value"
                  option-label="nama"
                  autofocus
                  outlined
                  :loading="store.loading"
                  :disable="store.loading"
                  :source="store.jenisPasiens"
                  @on-select="setJenisPasien"
                />
              </div>
              <div
                v-if="store.form.barulama==='lama'"
                class="col-1"
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
              <div class="col-4">
                Nomor RM
              </div>
              <div class="col-8">
                <app-input
                  ref="refNoRM"
                  v-model="store.form.norm"
                  label="Nomor RM"
                  type="number"
                  autofocus
                  outlined
                  :disable="store.form.barulama!=='baru'"
                  :loading="store.loading"
                  :rules="[
                    val => (!!val) || 'Harap diisi',
                    val => val?val.length < 7:!val || 'Harus 6 Karakter',
                    val => val?val.length > 5:!val || 'Harus 6 Karakter',
                  ]"
                  @keyup.enter="inputNoRmSelesai"
                  @update:model-value="updateValNoRM"
                />
              </div>
            </div>
            <!-- nama -->
            <div class="row q-col-gutter-sm items-center q-mb-xs">
              <div class="col-4">
                Nama <span class="text-red">*</span>
              </div>
              <div class="col-8">
                <div class="row  q-col-gutter-sm items-center">
                  <div class="col-3">
                    <app-autocomplete
                      ref="refSapaan"
                      v-model="store.form.sapaan"
                      label=" "
                      autocomplete="sapaan"
                      option-value="sapaan"
                      option-label="sapaan"
                      outlined
                      :source="store.sapaans"
                      :loading="store.loading"
                      :disable="store.form.barulama!=='baru'"
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
                      outlined
                      :disable="store.form.barulama!=='baru'"
                    />
                  </div>
                </div>
              </div>
            </div>
            <!-- kelamin -->
            <div class="row q-col-gutter-sm items-center q-mb-xs">
              <div class="col-4">
                Kelamin
              </div>
              <div class="col-8">
                <app-autocomplete
                  ref="refKelamin"
                  v-model="store.form.kelamin"
                  label="Jenis kelamin"
                  autocomplete="kelamin"
                  option-value="kelamin"
                  option-label="kelamin"
                  outlined
                  :source="store.kelamins"
                  :loading="store.loading"
                  :disable="store.form.barulama!=='baru'"
                  :rules="[val => (!!val) || 'Harap diisi',]"
                  @selected="kelaminSelected"
                  @keyup.enter="kelaminSelected"
                />
              </div>
            </div>
            <!-- tempat lahir -->
            <div class="row q-col-gutter-sm items-center q-mb-xs">
              <div class="col-4">
                Tempat Lahir
              </div>
              <div class="col-8">
                <app-input
                  ref="refTempatLahir"
                  v-model="store.form.templahir"
                  label="Tempat Lahir"
                  outlined
                  :disable="store.form.barulama!=='baru'"
                />
              </div>
            </div>
            <!-- tgl lahir -->
            <div class="row q-col-gutter-sm items-center q-mb-xs">
              <div class="col-4">
                Tgl Lahir <span class="text-red">*</span>
              </div>
              <div class="col-8">
                <div class="row q-col-gutter-sm no-wrap">
                  <div>
                    <app-input
                      ref="refHariLahir"
                      v-model="store.tanggal.hari"
                      label="Hari"
                      outlined
                      type="number"
                      error-message="Periksa kembali tanggal lahir"
                      :error="lahirValid"
                      :disable="store.form.barulama!=='baru'"
                      @update:model-value="setHariLahir"
                      @focus="fokusHariLahir"
                    />
                  </div>
                  <div>
                    <app-input
                      ref="refBulanLahir"
                      v-model="store.tanggal.bulan"
                      label="Bulan"
                      outlined
                      type="number"
                      error-message="Periksa kembali tanggal lahir"
                      :error="lahirValid"
                      :disable="store.form.barulama!=='baru'"
                      @update:model-value="setBulanLahir"
                    />
                  </div>
                  <div>
                    <app-input
                      ref="refTahunLahir"
                      v-model="store.tanggal.tahun"
                      label="Tahun"
                      outlined
                      type="number"
                      :disable="store.form.barulama!=='baru'"
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
              <div class="col-4">
                Umur
              </div>
              <div class="col-8">
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
            <!-- pendidikan -->
            <div class="row q-col-gutter-sm items-center q-mb-xs">
              <div class="col-4">
                Pendidikan
              </div>
              <div class="col-8">
                <app-autocomplete
                  ref="refPendidikan"
                  v-model="store.form.pendidikan"
                  label="Pendidikan"
                  autocomplete="pendidikan"
                  option-value="pendidikan"
                  option-label="pendidikan"
                  outlined
                  :source="store.pendidikans"
                  :loading="store.loading"
                  :disable="store.form.barulama!=='baru'"
                  :rules="[val => (!!val) || 'Harap diisi',]"
                  @selected="pendidikanSelected"
                  @keyup.enter="pendidikanSelected"
                />
              </div>
            </div>
            <!-- agama -->
            <div class="row q-col-gutter-sm items-center q-mb-xs">
              <div class="col-4">
                Agama
              </div>
              <div class="col-8">
                <div class="row q-mb-xs">
                  <div class="col-12">
                    <app-autocomplete-new
                      ref="refAgama"
                      v-model="store.display.kode"
                      label="Agama"
                      autocomplete="kode"
                      option-value="kode"
                      option-label="keterangan"
                      outlined
                      :source="store.agamas"
                      :loading="store.loading"
                      :disable="store.form.barulama!=='baru'"
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
                      outlined
                    />
                  </div>
                </div>
              </div>
            </div>
            <!-- suku -->
            <div class="row q-col-gutter-sm items-center q-mb-xs">
              <div class="col-4">
                Suku
              </div>
              <div class="col-8">
                <app-input
                  ref="refSuku"
                  v-model="store.form.suku"
                  label="Suku"
                  outlined
                  :disable="store.form.barulama!=='baru'"
                />
              </div>
            </div>
            <!-- telepon -->
            <div class="row q-col-gutter-sm items-center q-mb-xs">
              <div class="col-4">
                No. Telepon
              </div>
              <div class="col-8">
                <app-input
                  ref="refNoTlp"
                  v-model="store.form.noteleponhp"
                  label="No telepon HP"
                  outlined
                  type="number"
                  :disable="store.form.barulama!=='baru'"
                />
              </div>
            </div>
            <!-- status prnikahan -->
            <div class="row q-col-gutter-sm items-center q-mb-xs">
              <div class="col-4">
                Status Pernikahan
              </div>
              <div class="col-8">
                <app-autocomplete
                  ref="refStatusPernikahan"
                  v-model="store.form.statuspernikahan"
                  label="Status Pernikahan"
                  autocomplete="statuspernikahan"
                  option-value="statuspernikahan"
                  option-label="statuspernikahan"
                  outlined
                  :source="store.statuspernikahans"
                  :loading="store.loading"
                  :disable=" store.form.barulama!=='baru'"
                />
                <!-- <app-autocomplete-new
                  ref="refStatusPernikahan"
                  :model="store.wilayah.kelurahan.kotakabupaten"
                  label="Status Pernikahan"
                  autocomplete="wilayah"
                  option-value="kotakabupaten"
                  option-label="wilayah"
                  outlined
                  :source="store.kelurahans"
                  :loading="store.loadingSelect"
                  :disable="!store.kelurahans.length || store.form.barulama!=='baru'"
                  @on-select="kelurahanSelected"
                  @clear="store.clearKelurahan"
                /> -->
              </div>
            </div>
          </div>
          <!-- kanan -->
          <div class="col-6">
            <!-- ktp -->
            <div class="row q-col-gutter-sm items-center q-mb-xs">
              <div class="col-4">
                No. KTP
              </div>
              <div class="col-8">
                <app-input
                  ref="refKtp"
                  v-model="store.form.nik"
                  label="Nomor KTP"
                  outlined
                  :disable="store.form.barulama!=='baru'"
                />
              </div>
            </div>
            <!-- KA BPJS -->
            <div class="row q-col-gutter-sm items-center q-mb-xs">
              <div class="col-4">
                No. KA BPJS
              </div>
              <div class="col-8">
                <app-input
                  ref="refNoKaBpjs"
                  v-model="store.form.nokabpjs"
                  label="Nomor KA BPJS"
                  outlined
                  :disable="store.form.barulama!=='baru'"
                />
              </div>
            </div>
            <!-- alamat -->
            <div class="row q-col-gutter-sm items-center q-mb-xs">
              <div class="col-4">
                Alamat
              </div>
              <div class="col-8">
                <app-input
                  ref="refAlamat"
                  v-model="store.form.alamat"
                  outlined
                  label="Alamat"
                  :disable="store.form.barulama!=='baru'"
                />
              </div>
            </div>
            <!-- RT / RW -->
            <div class="row q-col-gutter-sm items-center q-mb-xs">
              <div class="col-4">
                RT / RW
              </div>
              <div class="col-8">
                <div class="row items-center q-col-gutter-sm">
                  <div class="col-4">
                    <app-input
                      ref="refRT"
                      v-model="store.form.rt"
                      label="RT"
                      outlined
                      type="number"
                      :disable="store.form.barulama!=='baru'"
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
                      outlined
                      type="number"
                      :disable="store.form.barulama!=='baru'"
                    />
                  </div>
                </div>
              </div>
            </div>
            <!-- Negara -->
            <div class="row q-col-gutter-sm items-center q-mb-xs">
              <div class="col-4">
                Negara
              </div>
              <div class="col-8">
                <app-autocomplete-new
                  ref="refNegara"
                  :model="store.wilayah.kd_negara"
                  label="Cari Negara"
                  autocomplete="wilayah"
                  option-value="kd_negara"
                  option-label="wilayah"
                  outlined
                  :source="store.negaras"
                  :loading="store.loadingSelect"
                  :disable="store.form.barulama!=='baru'"
                  @on-select="negaraSelected"
                  @clear="store.clearNegara"
                />
              </div>
            </div>
            <!-- Propinsi -->
            <div class="row q-col-gutter-sm items-center q-mb-xs">
              <div class="col-4">
                Propinsi
              </div>
              <div class="col-8">
                <app-autocomplete-new
                  ref="refPropinsi"
                  :model="store.wilayah.propinsi"
                  label="Cari propinsi"
                  autocomplete="wilayah"
                  option-value="propinsi"
                  option-label="wilayah"
                  outlined
                  :source="store.propinsies"
                  :disable="!store.propinsies.length || store.form.barulama!=='baru'"
                  :loading="store.loadingSelect"
                  @on-select="propinsiSelected"
                  @clear="store.clearPropinsi"
                />
              </div>
            </div>
            <!-- kabupaten -->
            <div class="row q-col-gutter-sm items-center q-mb-xs">
              <div class="col-4">
                Kabupaten
              </div>
              <div class="col-8">
                <app-autocomplete-new
                  ref="refKabupaten"
                  :model="store.wilayah.kotakabupaten"
                  label="Cari kabupaten / kota"
                  autocomplete="wilayah"
                  option-value="kotakabupaten"
                  option-label="wilayah"
                  outlined
                  :source="store.kabupatens"
                  :loading="store.loadingSelect"
                  :disable="!store.kabupatens.length || store.form.barulama!=='baru'"
                  @on-select="kabupatenSelected"
                  @clear="store.clearKabupaten"
                />
              </div>
            </div>
            <!-- kecamatan -->
            <div class="row q-col-gutter-sm items-center q-mb-xs">
              <div class="col-4">
                Kecamatan
              </div>
              <div class="col-8">
                <app-autocomplete-new
                  ref="refKecamatan"
                  :model="store.wilayah.kecamatan.kotakabupaten"
                  label="Cari kecamatan"
                  autocomplete="wilayah"
                  option-value="kotakabupaten"
                  option-label="wilayah"
                  outlined
                  :source="store.kecamatans"
                  :loading="store.loadingSelect"
                  :disable="!store.kecamatans.length || store.form.barulama!=='baru'"
                  @on-select="kecamatanSelected"
                  @clear="store.clearKecamatan"
                />
              </div>
            </div>
            <!-- kelurahan -->
            <div class="row q-col-gutter-sm items-center q-mb-xs">
              <div class="col-4">
                Kelurahan
              </div>
              <div class="col-8">
                <app-autocomplete-new
                  ref="refKelurahan"
                  :model="store.wilayah.kelurahan.kotakabupaten"
                  label="Cari kelurahan"
                  autocomplete="wilayah"
                  option-value="kotakabupaten"
                  option-label="wilayah"
                  outlined
                  :source="store.kelurahans"
                  :loading="store.loadingSelect"
                  :disable="!store.kelurahans.length || store.form.barulama!=='baru'"
                  @on-select="kelurahanSelected"
                  @clear="store.clearKelurahan"
                />
              </div>
            </div>
            <!-- kode pos -->
            <div class="row q-col-gutter-sm items-center q-mb-xs">
              <div class="col-4">
                Kode Pos
              </div>
              <div class="col-8">
                <app-input
                  ref="refKodePos"
                  v-model="store.form.kodepos"
                  label="Kode Pos"
                  type="number"
                  outlined
                  :disable="store.form.barulama!=='baru'"
                />
              </div>
            </div>
            <!-- bahasa -->
            <div class="row q-col-gutter-sm items-center q-mb-xs">
              <div class="col-4">
                Bahasa
              </div>
              <div class="col-8">
                <app-input
                  ref="refBahasa"
                  v-model="store.form.bahasa"
                  label="Bahasa"
                  outlined
                  :disable="store.form.barulama!=='baru'"
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
            <div class="row q-col-gutter-sm items-center q-mb-xs">
              <div class="col-4">
                Alamat
              </div>
              <div class="col-8">
                <app-input
                  ref="refAlamatDomisili"
                  v-model="store.form.alamatdomisili"
                  outlined
                  label="Alamat"
                  :disable="store.form.barulama!=='baru'"
                />
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
                      ref="refRTDomisili"
                      v-model="store.form.rtdomisili"
                      label="RT"
                      outlined
                      type="number"
                      :disable="store.form.barulama!=='baru'"
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
                      outlined
                      type="number"
                      :disable="store.form.barulama!=='baru'"
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
                  ref="refNegaraDomisili"
                  :model="store.wilayahDomisili.kd_negara"
                  label="Cari Negara"
                  autocomplete="wilayah"
                  option-value="kd_negara"
                  option-label="wilayah"
                  outlined
                  :source="store.domisiliNegaras"
                  :loading="store.loadingSelectDomisili"
                  :disable="store.form.barulama!=='baru'"
                  @on-select="negaraDomisiliSelected"
                  @clear="store.clearNegaraDomisili"
                />
              </div>
            </div>
          </div>
          <div class="col-6">
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
                  outlined
                  :source="store.domisiliPropinsies"
                  :disable="!store.domisiliPropinsies.length || store.form.barulama!=='baru'"
                  :loading="store.loadingSelectDomisili"
                  @on-select="propinsiDomisiliSelected"
                  @clear="store.clearPropinsiDomisili"
                />
              </div>
            </div>
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
                  outlined
                  :source="store.domisiliKabupatens"
                  :loading="store.loadingSelectDomisili"
                  :disable="!store.domisiliKabupatens.length || store.form.barulama!=='baru'"
                  @on-select="kabupatenDomisiliSelected"
                  @clear="store.clearKabupatenDomisili"
                />
              </div>
            </div>
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
                  outlined
                  :source="store.domisiliKecamatans"
                  :loading="store.loadingSelectDomisili"
                  :disable="!store.domisiliKecamatans.length || store.form.barulama!=='baru'"
                  @on-select="kecamatanDomisiliSelected"
                  @clear="store.clearKecamatanDomisili"
                />
              </div>
            </div>
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
                  outlined
                  :source="store.domisiliKelurahans"
                  :loading="store.loadingSelectDomisili"
                  :disable="!store.domisiliKelurahans.length || store.form.barulama!=='baru'"
                  @on-select="kelurahanDomisiliSelected"
                  @clear="store.clearKelurahanDomisili"
                />
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
    <dialogCariPasien
      v-model="store.cariPasienDialog"
      @hide="cariPasienHide"
    />
  </div>
</template>
<script setup>

import { date } from 'quasar'
import { findWithAttr, notifErrVue } from 'src/modules/utils'
import { usePendaftaranPasienStore } from 'src/stores/simrs/pendaftaran/form/pasien/pasien'
import { computed, onBeforeUpdate, ref, watch } from 'vue'
import dialogCariPasien from './DialogCariPasien.vue'
import { useDialogCariPasienPendaftaranUmum } from 'src/stores/simrs/pendaftaran/form/pasien/dialogCariPasien'

const refPasien = ref(null)
const emits = defineEmits([
  'bisa-simpan',
  'tidak-simpan'
])
const props = defineProps({
  simpan: { type: Boolean, default: false }
})

const dialog = useDialogCariPasienPendaftaranUmum()
dialog.getInitialData()
const store = usePendaftaranPasienStore()

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
const refKodePos = ref(null)
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
function resetValidation() {
  // reset validation
  refJenisPasien.value.$refs.refAuto.resetValidation()
  refNoRM.value.$refs.refInput.resetValidation()
  refNama.value.$refs.refInput.resetValidation()
  refSapaan.value.$refs.refAuto.resetValidation()
  refKelamin.value.$refs.refAuto.resetValidation()
  refTempatLahir.value.$refs.refInput.resetValidation()
  refHariLahir.value.$refs.refInput.resetValidation()
  refBulanLahir.value.$refs.refInput.resetValidation()
  refTahunLahir.value.$refs.refInput.resetValidation()
  refPendidikan.value.$refs.refAuto.resetValidation()
  refAgama.value.$refs.refAuto.resetValidation()
  refSuku.value.$refs.refInput.resetValidation()
  refNoTlp.value.$refs.refInput.resetValidation()
  refBahasa.value.$refs.refInput.resetValidation()
  refKodePos.value.$refs.refInput.resetValidation()
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
  refRTDomisili.value.$refs.refInput.resetValidation()
  refRWDomisili.value.$refs.refInput.resetValidation()
  refNegaraDomisili.value.$refs.refAuto.resetValidation()
  refPropinsiDomisili.value.$refs.refAuto.resetValidation()
  refKabupatenDomisili.value.$refs.refAuto.resetValidation()
  refKecamatanDomisili.value.$refs.refAuto.resetValidation()
  refKelurahanDomisili.value.$refs.refAuto.resetValidation()
}
// -- dialog cari pasien, untuk pasien lama--start--
function cariPasienHide(val) {
  console.log('cari pasien sembunyi', store.cariPasienDialog)
}
// -- dialog cari pasien, untuk pasien lama--end--
// input no rm
function inputNoRmSelesai(val) {
  console.log('input selesai', val)
  refNoRM.value.$refs.refInput.blur()
  refSapaan.value.$refs.refAuto.focus()
}
function updateValNoRM(val) {
  console.log('ref sapaan', refSapaan.value.$refs.refAuto)

  console.log('input no rm', val.length)
  if (val.length === 6) {
    const temp = val.slice(0, 6)
    store.setForm('norm', temp)
    console.log('no rm', store.form.norm)
    refNoRM.value.$refs.refInput.blur()
    refSapaan.value.$refs.refAuto.focus()
  }
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
  refTempatLahir.value.$refs.refInput.focus()
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
  // console.log('agama index ', index)
  // console.log('agama temp ', temp)
  store.setForm('kodemapagama', temp.kodemapping)
  store.display.agama = temp.keterangan
  if (temp.keterangan === 'Lain-lain') {
    refAgama.value.$refs.refAuto.blur()
    refTulisAgama.value.$refs.refInput.focus()
  } else {
    store.setForm('agama', temp.keterangan)
    refAgama.value.$refs.refAuto.blur()
    refSuku.value.$refs.refInput.focus()
  }
  console.log('agama selected ', store.form)
}
// ---tanggal lahir start--
const refTahunLahir = ref(null)
const refBulanLahir = ref(null)
const refHariLahir = ref(null)
const refRT = ref(null)
const refRW = ref(null)
const hariIni = Date.now()
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
    refPendidikan.value.$refs.refAuto.focus()
    // refRT.value.$refs.refInput.focus()
  }
  setTanggalLahir()
}
// ----tanggal lahir end-----

// ---get negara to kelurahah start----
const refNegara = ref(null)
const refPropinsi = ref(null)
const refKabupaten = ref(null)
const refKecamatan = ref(null)
const refKelurahan = ref(null)
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
const refNegaraDomisili = ref(null)
const refPropinsiDomisili = ref(null)
const refKabupatenDomisili = ref(null)
const refKecamatanDomisili = ref(null)
const refKelurahanDomisili = ref(null)
const refRTDomisili = ref(null)
const refRWDomisili = ref(null)
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
const refNoTlp = ref(null)
const refBahasa = ref(null)
const refKtp = ref(null)
const refNoKaBpjs = ref(null)
// const lahirValid = ref(true)
// function validateTglLahir() {
//   const hariIni = new Date(date.formatDate(Date.now(), 'YYYY-MM-DD'))
//   const tanggal = new Date(date.formatDate(store.tanggal.tahun + '-' + store.tanggal.bulan + '-' + store.tanggal.hari, 'YYYY-MM-DD'))
//   console.log('validate tanggal', date.isSameDate(hariIni, tanggal, 'days'))
//   lahirValid.value = date.isSameDate(hariIni, tanggal, 'days')
// }
const lahirValid = computed(() => {
  const hariIni = new Date(date.formatDate('1970-01-01', 'YYYY-MM-DD'))
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
  const HariLahir = refHariLahir.value.$refs.refInput.validate()
  const BulanLahir = refBulanLahir.value.$refs.refInput.validate()
  const TahunLahir = refTahunLahir.value.$refs.refInput.validate()
  const Pendidikan = refPendidikan.value.$refs.refAuto.validate()
  const Agama = refAgama.value.$refs.refAuto.validate()
  const Suku = refSuku.value.$refs.refInput.validate()
  const NoTlp = refNoTlp.value.$refs.refInput.validate()
  const Bahasa = refBahasa.value.$refs.refInput.validate()
  const KodePos = refKodePos.value.$refs.refInput.validate()
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
  // console.log(
  //   'JenisPasien',
  //   JenisPasien,
  //   'NoRM',
  //   NoRM,
  //   'Nama',
  //   Nama,
  //   'Sapaan',
  //   Sapaan,
  //   'Kelamin',
  //   Kelamin,
  //   'TempatLahir',
  //   TempatLahir,
  //   'HariLahir',
  //   HariLahir,
  //   'BulanLahir',
  //   BulanLahir,
  //   'TahunLahir',
  //   TahunLahir,
  //   'Pendidikan',
  //   Pendidikan,
  //   'Agama',
  //   Agama,
  //   'Suku',
  //   Suku,
  //   'NoTlp',
  //   NoTlp,
  //   'Bahasa',
  //   Bahasa,
  //   'KodePos',
  //   KodePos,
  //   'Ktp',
  //   Ktp,
  //   'NoKaBpjs',
  //   NoKaBpjs,
  //   'Alamat',
  //   Alamat,
  //   'RT',
  //   RT,
  //   'RW',
  //   RW,
  //   'Negara',
  //   Negara,
  //   'Propinsi',
  //   Propinsi,
  //   'Kabupaten',
  //   Kabupaten,
  //   'Kecamatan',
  //   Kecamatan,
  //   'Kelurahan',
  //   Kelurahan,
  //   'RTDomisili',
  //   RTDomisili,
  //   'RWDomisili',
  //   RWDomisili,
  //   'NegaraDomisili',
  //   NegaraDomisili,
  //   'PropinsiDomisili',
  //   PropinsiDomisili,
  //   'KabupatenDomisili',
  //   KabupatenDomisili,
  //   'KecamatanDomisili',
  //   KecamatanDomisili,
  //   'KelurahanDomisili',
  //   KelurahanDomisili
  // )
  if (
    JenisPasien &&
  NoRM &&
  Nama &&
  Sapaan &&
  Kelamin &&
  TempatLahir &&
  HariLahir &&
  BulanLahir &&
  TahunLahir &&
  Pendidikan &&
  Agama &&
  Suku &&
  NoTlp &&
  Bahasa &&
  KodePos &&
  Ktp &&
  NoKaBpjs &&
  Alamat &&
  RT &&
  RW &&
  Negara &&
  Propinsi &&
  Kabupaten &&
  Kecamatan &&
  Kelurahan &&
  RTDomisili &&
  RWDomisili &&
  NegaraDomisili &&
  PropinsiDomisili &&
  KabupatenDomisili &&
  KecamatanDomisili &&
  KelurahanDomisili) { valid = true } else { valid = false }
}
watch(() => props.simpan, (baru) => {
  console.log('watch', baru)
  validasi()
  if (baru) {
    console.log('Baru', baru)
    if (valid) {
      emits('bisa-simpan')
      console.log('lanjut')
    } else {
      emits('tidak-simpan')
      notifErrVue('periksa kembali input anda')
    }
  }
})

store.getInitialData()
onBeforeUpdate(() => {
  console.log('jenis pasien', refJenisPasien.value)
})
</script>
