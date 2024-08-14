<template>
  <div
    ref="refPasien"
    class="q-pa-xs"
  >
    <!-- :simpanData="simpanData" -->
    <div
      v-if="notEdit"
      class="absolute-top row items-center justify-between bg-grey q-pa-sm"
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
          v-if="bisaFull"
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
                  outlined
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
                  outlined
                  :disable="store.form.barulama!=='baru'"
                  :loading="store.loading || store.loadingNorm"
                  :rules="[
                    val => (!!val) || 'Harap diisi',
                    val => val?val.length > 5:!val || 'Harus 6 Karakter',
                    val=>regex.test(val)||'Hanya angka'
                  ]"
                  @keyup.enter="inputNoRmSelesai"
                  @update:model-value="updateValNoRM"
                  @blur="store.cekDulu($event,'norm')"
                />
                <!-- val => val?val.length < 7:!val || 'Harus 6 Karakter', -->
                <div>
                  Kewarganegaraan :
                  <q-radio
                    v-for="item in store.kewarganegaran"
                    :key="item"
                    v-model="store.form.kewarganegaraan"
                    :val="item"
                    :label="item"
                    dense
                    size="xs"
                    @update:model-value="gantiKewarganegaraan"
                  />
                </div>
              </div>
            </div>
            <!-- ktp -->
            <div v-if="store.form.kewarganegaraan==='WNI'">
              <div class="row q-col-gutter-sm items-center q-mb-xs">
                <div class="col-12">
                  <app-input
                    ref="refKtp"
                    v-model="store.form.nik"
                    label="Nomor KTP"
                    outlined
                    :right-icon="!!bpjs"
                    right-icon-name="icon-mat-dvr"
                    :loading="store.loadingNik"
                    :disable="store.form.barulama!=='baru'&&!store.edit&&(!store.form.nik?false:store.form.nik.length>=16)"
                    right-icon-tooltip="Cek BPJS"
                    :rules="[
                      val=>( !store.form.nomoridentitaslain ? !!val : true)||'Harap di isi',
                      val=>( (!store.form.nomoridentitaslain && val.length > 0) ? regex.test(val) : true)||'Hanya angka',
                      val=> (!store.form.nomoridentitaslain && val.length >= 16) ||'Minimal 16 angka',
                    ]"
                    @icon-right-click="cekBpjsbyNik"
                    @update:model-value="cekKtpKitas"
                    @blur="store.cekDulu($event, 'nik')"
                  />
                </div>
              </div>
            </div>
            <!-- kitas -->
            <div v-else>
              <div
                v-if="!bpjs"
                class="row q-col-gutter-sm items-center q-mb-xs"
              >
                <div class="col-12">
                  <app-input
                    ref="refKitas"
                    v-model="store.form.nomoridentitaslain"
                    label="Nomor Paspor / KITAS"
                    outlined
                    :disable="store.form.barulama!=='baru'&&!store.edit"
                    :rules="[
                      val=>( !store.form.nik ? !!val : true)||'Harap di isi',
                      val => ( (!store.form.nik && val.length > 0)? regex.test(val) : true) || 'Hanya angka'
                    ]"
                    @update:model-value="cekKtpKitas"
                  />
                </div>
              </div>
            <!-- KA BPJS -->
            </div>
            <div class="row justify-between q-col-gutter-sm items-center q-mb-xs">
              <div :class="bpjs || pelayanan?'bagi-tiga':'satu'">
                <app-input
                  ref="refNoKaBpjs"
                  v-model="store.form.noka"
                  label="Nomor KA BPJS"
                  outlined
                  :disable="store.form.barulama!=='baru'&&!store.edit"
                  :loading="store.loadingNoka"
                  :rules="[val=> (!!val ? regex.test( val ) : true) ||'Hanya angka']"
                  @update:model-value="setNokaBPJS"
                  @blur="store.cekDulu($event, 'noka')"
                />
              </div>
              <div
                v-if="bpjs || pelayanan"
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
                v-if="bpjs || pelayanan"
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
                      outlined
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
                      outlined
                      :disable="store.form.barulama!=='baru'&&!store.edit"
                    />
                  </div>
                </div>
              </div>
            </div>
            <!-- Nama ibu kandung -->
            <div class="row q-col-gutter-sm items-center q-mb-xs">
              <div class="col-12">
                <app-input
                  ref="refIbu"
                  v-model="store.form.namaibukandung"
                  label="Nama Ibu Kandung"
                  outlined
                  :disable="store.form.barulama!=='baru'&&!store.edit"
                />
              </div>
            </div>
            <!-- Gelar -->
            <div class="row q-col-gutter-sm items-center q-mb-xs">
              <div class="col-12">
                <div class="row  q-col-gutter-sm items-center">
                  <div class="col-6">
                    <app-input
                      v-model="store.form.gelardepan"
                      label="Gelar Depan"
                      valid
                      outlined
                      :disable="store.form.barulama!=='baru'&&!store.edit"
                    />
                  </div>
                  <div class="col-6">
                    <app-input
                      v-model="store.form.gelarbelakang"
                      label="Gelar Belakang"
                      valid
                      outlined
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
                  outlined
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
                      outlined
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
                      outlined
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
                      outlined
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
                  outlined
                  :source="store.kelamins"
                  :loading="store.loading"
                  :disable="store.form.barulama!=='baru'&&!store.edit"
                  :rules="[val => (!!val) || 'Harap diisi',]"
                  @selected="kelaminSelected"
                />
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
                  outlined
                  :source="store.pendidikans"
                  :loading="store.loading"
                  :disable="store.form.barulama!=='baru'&&!store.edit"
                  :rules="[val => (!!val) || 'Harap diisi',]"
                  @selected="pendidikanSelected"
                />
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
                      outlined
                      :source="store.agamas"
                      :loading="store.loading"
                      :disable="store.form.barulama!=='baru'&&!store.edit"
                      :rules="[val => (!!val) || 'Harap diisi',]"
                      @on-select="setAgama"
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
              <!-- <div class="col-4">
                Suku
              </div>
              <div class="col-8"> -->
              <div class="col-12">
                <app-input
                  ref="refSuku"
                  v-model="store.form.suku"
                  label="Suku"
                  outlined
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
                <app-autocomplete
                  ref="refBahasa"
                  v-model="store.form.bahasa"
                  label="Bahasa"
                  autocomplete="bahasa"
                  option-value="bahasa"
                  option-label="bahasa"
                  outlined
                  :source="store.bahasas"
                  :loading="store.loading"
                  :disable="store.form.barulama!=='baru'&&!store.edit"
                  :rules="[val => (!!val) || 'Harap diisi',]"
                />
                <!-- @selected="kelaminSelected" -->
                <!-- <app-input
                  ref="refBahasa"
                  v-model="store.form.bahasa"
                  label="Bahasa"
                  outlined
                  :disable="store.form.barulama!=='baru'&&!store.edit"
                /> -->
              </div>
            </div>
            <!-- Baca Tulis -->
            <div class="row q-col-gutter-sm items-center q-mb-xs">
              <div>
                <q-radio
                  v-model="store.form.bacatulis"
                  :class="!!store.form.bacatulis?'dark':'merah'"
                  :color="!!store.form.bacatulis?'primary':'negative'"
                  :keep-color="!store.form.bacatulis"
                  dense
                  checked-icon="icon-mat-task_alt"
                  unchecked-icon="icon-mat-panorama_fish_eye"
                  val="YA"
                  label="Bisa Baca & Tulis"
                />
              </div>
              <div>
                <q-radio
                  v-model="store.form.bacatulis"
                  :class="!!store.form.bacatulis?'dark':'merah'"
                  :color="!!store.form.bacatulis?'primary':'negative'"
                  :keep-color="!store.form.bacatulis"
                  dense
                  checked-icon="icon-mat-task_alt"
                  unchecked-icon="icon-mat-panorama_fish_eye"
                  val="TIDAK"
                  label="Tidak Bisa Baca & Tulis"
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
                  outlined
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
                  outlined
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
                      outlined
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
                      outlined
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
                  v-model="store.form.noteleponrumah"
                  label="No telepon rumah"
                  outlined
                  valid
                  type="number"
                  :disable="store.form.barulama!=='baru'&&!store.edit"
                  @update:model-value="setTlpRumah"
                />
                <!-- :prefix="'+'+(store.form.negara?store.form.negara:'62')" -->
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
                  v-model="store.form.noteleponhp"
                  label="No Ponsel"
                  outlined
                  :disable=" store.form.barulama!=='baru' && !store.edit && (!!store.form.noteleponhp)"
                  @blur="setTlpHP($event)"
                />
                <!-- :prefix="'+'+(store.form.negara?store.form.negara:'62')" -->
                <!-- @update:model-value="setTlpHP" -->
                <!-- type="number" -->
              </div>
            </div>
            <!-- hambatan -->
            <!-- <div class="row q-col-gutter-sm items-center q-mb-xs">
              <div
                v-for="(ham,i) in store.hambatans"
                :key="i"
              >
                <q-radio
                  v-model="store.form.kdhambatan"
                  dense
                  checked-icon="icon-mat-task_alt"
                  unchecked-icon="icon-mat-panorama_fish_eye"
                  :val="ham.id"
                  :label="ham.hambatan"
                />
              </div>
            </div> -->
          </div>
          <!-- kanan -->
          <div class="col-4">
            <!-- hambatan -->
            <div class="row q-col-gutter-sm items-center q-mb-xs">
              <div class="col-12">
                <app-autocomplete
                  ref="refHambatan"
                  :key="store.form.kdhambatan"
                  v-model="store.form.kdhambatan"
                  label="Hambatan"
                  autocomplete="hambatan"
                  option-value="kdhambatan"
                  option-label="hambatan"
                  outlined
                  :source="store.hambatans"
                  :loading="store.loading"
                  :disable="store.form.barulama!=='baru'&&!store.edit"
                  :rules="[val => (!!val) || 'Harap diisi',]"
                />
              </div>
            </div>
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
                  outlined
                  label="Alamat"
                  :disable="store.form.barulama!=='baru'&&!store.edit"
                  @update:model-value="setAlamat"
                />
              </div>
            </div>
            <!-- RT / RW -->
            <div v-if="store.form.kewarganegaraan==='WNI'">
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
                        outlined
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
                        outlined
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
                    outlined
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
                    outlined
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
                    outlined
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
                    outlined
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
                    outlined
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
                    outlined
                    :disable="store.form.barulama!=='baru'&&!store.edit"
                    @update:model-value="setKodepos"
                  />
                </div>
              </div>
              <!-- Antrian -->
              <div v-if="pelayanan !== 'igd'">
                <div class="row q-col-gutter-sm items-center q-mb-xs">
                  <div class="col-12">
                    <app-input
                      ref="refNoAntrian"
                      v-model="store.form.noantrian"
                      label="Nomor Antrian"
                      outlined
                      @blur="setNoAntrian($event)"
                    />
                    <!-- @update:model-value="setNoAntrian" -->
                  </div>
                </div>
              </div>
            </div>
            <div v-else>
              <div class="row q-col-gutter-sm items-center q-mb-xs">
                <div class="col-12">
                  <q-select
                    ref="refCity"
                    v-model="weather"
                    outlined
                    label="Pencarian Kota Luar Negeri"
                    dense
                    use-input
                    hide-selected
                    fill-input
                    input-debounce="200"
                    :options="store.countrys"
                    @filter="filterFn"
                    placeholder="Minimal 3 character"
                    autofocus
                    class="full-width"
                    hide-bottom-space
                    hide-dropdown-icon
                    no-error-icon
                    option-label="name"
                    option-value="name"
                    @update:model-value="citySelected"
                  >
                    <template #prepend>
                      <q-icon name="icon-mat-search" />
                    </template>
                    <template #option="scope">
                      <q-item v-bind="scope.itemProps">
                        <div>
                          {{ scope.opt.name }}
                        </div>
                        <div class="q-ml-sm">
                          ({{ scope.opt.country }})
                        </div>
                      </q-item>
                      <q-separator />
                    </template>
                  </q-select>
                </div>
              </div>
              <div class="row q-col-gutter-sm items-center q-mb-xs">
                <div class="col-12">
                  <app-input v-model="store.country" label="Country" :autofocus="false" outlined />
                </div>
              </div>
              <div class="row q-col-gutter-sm items-center q-mb-xs">
                <div class="col-12">
                  <app-input v-model="store.city" label="City" :autofocus="false" outlined />
                </div>
              </div>
              <div class="row q-col-gutter-sm items-center q-mb-xs">
                <div class="col-12">
                  <app-input v-model="store.region" label="Region" :autofocus="false" outlined />
                </div>
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
                  outlined
                  label="Alamat"
                  :disable="store.form.barulama!=='baru'&&!store.edit"
                />
              </div>
            </div>
            <!-- RT / RW domisili -->
            <div v-if="store.form.kewarganegaraan==='WNI'">
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
                        outlined
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
                    outlined
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
                    outlined
                    :source="store.domisiliPropinsies"
                    :disable="!store.domisiliPropinsies.length || (store.form.barulama!=='baru' && !store.edit)"
                    :loading="store.loadingPropinsiDomisili"
                    @on-select="propinsiDomisiliSelected"
                    @clear="store.clearPropinsiDomisili"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="col-6">
            <!-- kabupaten domisili -->
            <div v-if="store.form.kewarganegaraan==='WNI'">
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
                    outlined
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
                    outlined
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
                    outlined
                    :disable="store.form.barulama!=='baru'&&!store.edit"
                  />
                </div>
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
    <app-dialog-not-full
      v-model="store.alert"
      :label="store.alertMsg.kode==='0'?'Status Finger Pasien':'Data Peserta BPJS'"
      style="width:500px;"
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
          <q-card
            flat
            class="full-width"
          >
            <q-card-section>
              <div class="row flex-wrap">
                <div
                  class="foto bg-grey-4 col-3"
                >
                  <!-- <q-img
                        :src="foto"
                        :ratio="1"
                      /> -->
                  <app-avatar-pasien
                    :key="pasien"
                    :pasien="pasien"
                    width="150px"
                  />
                  <div class="text-center">
                    <q-item-label class="f-16 text-weight-bold">
                      {{ pasien? pasien.norm:'-' }}
                    </q-item-label>
                  </div>
                </div>
                <div class="col-9">
                  <q-list
                    dense
                    separator
                  >
                    <q-item>
                      <q-item-label class="text-weight-bold">
                        {{ store.alertMsg.peserta.nama }}
                      </q-item-label>
                    </q-item>
                    <q-item>
                      <q-item-label class="">
                        {{ pasien? pasien.templahir: '-' }}, {{ pasien? dateFullFormat(pasien.tgllahir) : '-' }}
                      </q-item-label>
                    </q-item>
                    <q-item>
                      <q-item-label class="">
                        💳 {{ pasien? pasien.nik:'-' }}
                      </q-item-label>
                    </q-item>
                    <q-item>
                      <q-item-label class="">
                        ⚥ {{ pasien? pasien.kelamin:'-' }} / ✒️ {{ pasien? pasien.usia:'-' }}
                      </q-item-label>
                    </q-item>
                    <q-item>
                      <q-item-label class="">
                        🏠 {{ pasien? pasien.alamat: '-' }}
                      </q-item-label>
                    </q-item>
                    <q-item>
                      <q-item-label class="">
                        ♡ ♥💕 {{ pasien? pasien.statuspernikahan:'-' }}
                      </q-item-label>
                    </q-item>
                  </q-list>
                </div>
                <!-- <div class=" absolute-top-right text-right q-pa-md">
                      <div class="f-12">
                        NO. REKAM MEDIS
                      </div>
                      <div class="f-16 text-weight-bold">
                        {{ pasien? pasien.norm:'-' }}
                      </div>
                    </div> -->
              </div>
            </q-card-section>
            <q-separator />
            <q-list separator>
              <q-item>
                <q-item-section>
                  <q-item-label>
                    🃏 Noka JKN / BPJS
                  </q-item-label>
                  <q-item-label class="text-weight-bold">
                    {{ store.alertMsg.peserta.noKartu }}
                  </q-item-label>
                </q-item-section>
              </q-item>

              <q-item>
                <q-item-section>
                  <q-item-label>
                    Asal Faskes
                  </q-item-label>
                  <q-item-label class="text-weight-bold">
                    {{ store.alertMsg.peserta.provUmum.nmProvider }}
                  </q-item-label>
                </q-item-section>
              </q-item>

              <q-item>
                <q-item-section>
                  <q-item-label>
                    Hak Kelas
                  </q-item-label>
                  <q-item-label class="text-weight-bold">
                    {{ store.alertMsg.peserta.hakKelas.keterangan }}
                  </q-item-label>
                </q-item-section>
              </q-item>

              <q-item>
                <q-item-section>
                  <q-item-label>
                    Status Peserta
                  </q-item-label>
                  <q-item-label
                    class="text-weight-bold"
                    :class="store.alertMsg.peserta.statusPeserta.keterangan === 'AKTIF' ? ' text-primary': ' text-negative'"
                  >
                    {{ store.alertMsg.peserta.statusPeserta.keterangan }}
                  </q-item-label>
                </q-item-section>
              </q-item>

              <q-item>
                <q-item-section>
                  <q-item-label>
                    Jenis Peserta
                  </q-item-label>
                  <q-item-label class="text-weight-bold">
                    {{ store.alertMsg.peserta.jenisPeserta.keterangan }}
                  </q-item-label>
                </q-item-section>
              </q-item>

              <q-item>
                <q-item-section>
                  <q-item-label>
                    🆔 SATU SEHAT
                  </q-item-label>
                  <q-item-label class="text-weight-bold">
                    -
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card>
        </div>
        <div v-if="store.alertMsg.kode&&(store.alertMsg.kode!=='' && store.alertMsg.status!=='')">
          <app-no-selected-page
            class="q-mx-md"
            color="primary"
            :icon="store.alertMsg.kode==='1'?'icon-mat-done':'icon-mat-report'"
            :text="store.alertMsg.status"
          />
        </div>
        <!-- {{ store.alertMsg }} -->
      </template>
    </app-dialog-not-full>
  </div>
</template>
<script setup>

import { date } from 'quasar'
import { findWithAttr, notifErrVue } from 'src/modules/utils'
import { dateFullFormat } from 'src/modules/formatter'
import { usePendaftaranPasienStore } from 'src/stores/simrs/pendaftaran/form/pasien/pasien'
import { computed, onBeforeUpdate, ref } from 'vue'
import dialogCariPasien from './DialogCariPasien.vue'
import { useDialogCariPasienPendaftaranUmum } from 'src/stores/simrs/pendaftaran/form/pasien/dialogCariPasien'
import { api } from 'src/boot/axios'

const gantiKewarganegaraan = e => {
  if (e === 'WNI') {
    store.paramWilayah.kd_negara = '62'
  }
  else {
    store.paramWilayah.kd_negara = ''
  }
}

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
  notEdit: { type: Boolean, default: true },
  bisaFull: { type: Boolean, default: true },
  pelayanan: { type: [String, Number], default: '' }
})
const regex = /^\d+$/
const dialog = useDialogCariPasienPendaftaranUmum()
dialog.getInitialData()
const store = usePendaftaranPasienStore()
const pasien = computed(() => {
  return store.form
})

// set noka bpjs
function setNokaBPJS (val) {
  store.setForm('nokabpjs', val)
}
// cek BPJS
function cekBpjsbyNik () {
  if (refKtp.value.$refs.refInput.validate()) {
    const form = { nik: store.form.nik, tglsep: props.tglsep }
    store.cekPesertaByNik(form).then(resp => {
      store.alert = true
      // store.alertMsg = resp.data.result
      store.alertMsg = resp
    })
  }
  else {
    notifErrVue('Nomor KTP Kosong')
  }
}
function cekBpjsByNoka () {
  if (refNoKaBpjs.value.$refs.refInput.validate() && !!store.form.noka) {
    const form = { noka: store.form.noka, tglsep: props.tglsep }
    store.cekPesertaByNoka(form).then(resp => {
      store.alert = true
      // store.alertMsg = resp.data.result
      store.alertMsg = resp
    })
  }
  else {
    notifErrVue('Nomor BPJS Kosong')
  }
}
function cekFinger () {
  if (refNoKaBpjs.value.$refs.refInput.validate() && !!store.form.noka) {
    const form = { noka: store.form.noka, tglsep: props.tglsep }
    store.cekPesertaFinger(form).then(resp => {
      store.alert = true
      store.alertMsg = resp.result
    })
  }
  else {
    notifErrVue('Nomor BPJS Kosong')
  }
}
function dialogOk () {
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
const refKitas = ref(null)
const refNoKaBpjs = ref(null)
const refStatusPernikahan = ref(null)
const refPekerjaan = ref(null)
const refInputPekerjaan = ref(null)
const refNegara = ref(null)
const refPropinsi = ref(null)
const refKabupaten = ref(null)
const refKecamatan = ref(null)
const refKelurahan = ref(null)
const refHambatan = ref(null)
// validasi ktp dan kitas
function cekKtpKitas () {
  if (store.form.kewarganegaraan === 'WNI') {
    refKtp.value.$refs.refInput.validate()
  }
  if (refKitas.value) refKitas.value.$refs.refInput.validate()
}

// validasi noka dan norm
function validateNokaAndNorm () {
  if (refNoRM.value.$refs.refInput.validate() &&
   refNoKaBpjs.value.$refs.refInput.validate()) {
    emits('surat', { nik: store.form.nik, noka: store.form.noka, norm: store.form.norm })
    return { nik: store.form.nik, noka: store.form.noka, norm: store.form.norm }
  }
  else {
    if (refNoRM.value.$refs.refInput.validate() === false) { notifErrVue('No RM Kosong') }
    if (refNoKaBpjs.value.$refs.refInput.validate() === false) { notifErrVue('No BPJS Kosong') }
    return false
  }
}
function validateNoka () {
  if (refNoKaBpjs.value.$refs.refInput.validate()) {
    return { noka: store.form.noka }
  }
  else {
    notifErrVue('No BPJS Kosong')
  }
}
// reset validasi
function resetValidation () {
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
  refKodePos.value.$refs.refInput.resetValidation()
  if (refNoAntrian.value) refNoAntrian.value.$refs.refInput.resetValidation()
  if (refKtp.value) refKtp.value.$refs.refInput.resetValidation()
  if (refKitas.value) refKitas.value.$refs.refInput.resetValidation()
  refNoKaBpjs.value.$refs.refInput.resetValidation()
  refAlamat.value.$refs.refInput.resetValidation()
  if (refRT.value) refRT.value.$refs.refInput.resetValidation()
  if (refRW.value) refRW.value.$refs.refInput.resetValidation()
  refBahasa.value.$refs.refAuto.resetValidation()
  if (refNegara.value) refNegara.value.$refs.refAuto.resetValidation()
  if (refPropinsi.value) refPropinsi.value.$refs.refAuto.resetValidation()
  if (refKabupaten.value) refKabupaten.value.$refs.refAuto.resetValidation()
  if (refKecamatan.value) refKecamatan.value.$refs.refAuto.resetValidation()
  if (refKelurahan.value) refKelurahan.value.$refs.refAuto.resetValidation()
  refPekerjaan.value.$refs.refAuto.resetValidation()
  refHambatan.value.$refs.refAuto.resetValidation()
  refStatusPernikahan.value.$refs.refAuto.resetValidation()
  if (refTulisAgama.value !== null) { refTulisAgama.value.$refs.refInput.resetValidation() }
  if (refInputPekerjaan.value !== null) { refInputPekerjaan.value.$refs.refInput.resetValidation() }
  if (!store.alamataDomisiliSama) { refRTDomisili?.value?.$refs?.refInput.resetValidation() }
  if (!store.alamataDomisiliSama) { refRWDomisili?.value?.$refs?.refInput.resetValidation() }
  if (!store.alamataDomisiliSama) { refNegaraDomisili?.value?.$refs?.refAuto.resetValidation() }
  if (!store.alamataDomisiliSama) { refPropinsiDomisili?.value?.$refs?.refAuto.resetValidation() }
  if (!store.alamataDomisiliSama) { refKabupatenDomisili?.value?.$refs?.refAuto.resetValidation() }
  if (!store.alamataDomisiliSama) { refKecamatanDomisili?.value?.$refs?.refAuto.resetValidation() }
  if (!store.alamataDomisiliSama) { refKelurahanDomisili?.value?.$refs?.refAuto.resetValidation() }
  if (!store.alamataDomisiliSama) { refKodePosDom?.value?.$refs?.refInput?.resetValidation() }
}
// hari ini
const hariIni = Date.now()
// jenis pasien lama / baru
function setJenisPasien (val) {
  store.clearForm()
  emits('gantiPasien')
  store.setForm('barulama', val)
  if (val === 'baru') {
    refJenisPasien.value.$refs.refAuto.blur()
    refNoRM.value.$refs.refInput.focus()
    store.form = { barulama: 'baru' }
    store.lahirHariIni()
    // console.log('pasien baru')
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
function cariPasienHide (val) {
  console.log('cari pasien sembunyi', store.cariPasienDialog)
}
// alamat
function setAlamat (val) {
  if (store.alamataDomisiliSama) { store.setForm('alamatdomisili', val) }
}
// set RT / RW
function setRT (val) {
  if (store.alamataDomisiliSama) { store.setForm('rtdomisili', val) }
  if (val.length === 3) {
    refRT.value.$refs.refInput.blur()
    refRW.value.$refs.refInput.focus()
  }
}
function setRW (val) {
  if (store.alamataDomisiliSama) { store.setForm('rwdomisili', val) }
  if (val.length === 3) {
    refRW.value.$refs.refInput.blur()
    refNegara.value.$refs.refAuto.focus()
  }
}
// set nomor Antrian
function setNoAntrian (evt) {
  const val = evt.target.value
  store.noantrian = val
  store.setNoAntrian(val)
}
// -- dialog cari pasien, untuk pasien lama--end--
// input no rm
function inputNoRmSelesai (val) {
  // console.log('input selesai', val)
  refNoRM.value.$refs.refInput.blur()
  refKtp.value.$refs.refInput.focus()
  // refSapaan.value.$refs.refAuto.focus()
}
function updateValNoRM (val) {
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
function sapaanSelected (val) {
  refSapaan.value.$refs.refAuto.blur()
  refNama.value.$refs.refInput.focus()
  console.log('sapaan selected', val)
}
function sapaanEnter () {
  refSapaan.value.$refs.refAuto.blur()
  refNama.value.$refs.refInput.focus()
  console.log('sapaan selesai')
}

// refkelamin
function kelaminSelected (val) {
  const index = findWithAttr(store.kelamins, 'kelamin', val)

  if (index >= 0) {
    store.setForm('kodekelamin', store.kelamins[index].kode)
  }
  console.log('kelamin obj', store.form)
  refKelamin.value.$refs.refAuto.blur()
  refPendidikan.value.$refs.refAuto.focus()
  // refTempatLahir.value.$refs.refInput.focus()
}

// ref pendidikan
function pendidikanSelected (val) {
  const index = findWithAttr(store.pendidikans, 'pendidikan', val)
  if (index >= 0) {
    store.setForm('kodependidikan', store.pendidikans[index].kode)
  }
  refPendidikan.value.$refs.refAuto.blur()
  refAgama.value.$refs.refAuto.focus()
}

// ref agama
const refTulisAgama = ref(null)
function setAgama (val) {
  const index = findWithAttr(store.agamas, 'kode', val)
  if (index >= 0) {
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
    }
    else {
      store.setForm('agama', temp.keterangan)
      refAgama.value.$refs.refAuto.blur()
      refSuku.value.$refs.refInput.focus()
    }
  }
  else {
    notifErrVue('kode Agama tidak ditemukan')
  }
  console.log('agama selected ', store.form)
}

// status pernikahan
function statusPernikahanSelected (val) {
  refStatusPernikahan.value.$refs.refAuto.blur()
  refPekerjaan.value.$refs.refAuto.focus()
}
// ---tanggal lahir start--

function setTanggalLahir () {
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
  store.form.umurbln = (daysDiff < 0 && monthsDiff === 0) ? 11 : (monthsDiff < 0 ? 12 - bulanLahir + bulahini : monthsDiff)
  store.form.umurthn = (daysDiff < 0 && monthsDiff === 0) ? yearsDiff - 1 : (monthsDiff < 0 ? yearsDiff - 1 : yearsDiff)
  store.setForm('tgllahir', tanggal)

  console.log('perbedaan ', yearsDiff, monthsDiff, daysDiff)
  console.log('perbedaan umur asem', store.form.umurthn, store.form.umurbln, store.form.umurhari)
}
function fokusHariLahir () {
  refHariLahir.value.$refs.refInput.select()
}
function setHariLahir (val) {
  if (val.length === 2) {
    refHariLahir.value.$refs.refInput.blur()
    refBulanLahir.value.$refs.refInput.focus()
    refBulanLahir.value.$refs.refInput.select()
  }
  setTanggalLahir()
}

function setBulanLahir (val) {
  if (val.length === 2) {
    refBulanLahir.value.$refs.refInput.blur()
    refTahunLahir.value.$refs.refInput.focus()
    refTahunLahir.value.$refs.refInput.select()
  }
  setTanggalLahir()
}

function setTahunLahir (val) {
  if (val.length === 4) {
    refTahunLahir.value.$refs.refInput.blur()
    refKelamin.value.$refs.refAuto.focus()
    // refRT.value.$refs.refInput.focus()
  }
  setTanggalLahir()
}
// ----tanggal lahir end-----

// ---get negara to kelurahah start----

function negaraSelected (val) {
  store.negaraSelected(val)
  store.getProvinces().then(() => {
    refNegara.value.$refs.refAuto.blur()
    refPropinsi.value.$refs.refAuto.focus()
    refPropinsi.value.$refs.refAuto.showPopup()
  })
}
function propinsiSelected (val) {
  store.propinsiSelected(val)
  store.getKota().then(() => {
    refPropinsi.value.$refs.refAuto.blur()
    refKabupaten.value.$refs.refAuto.focus()
    refKabupaten.value.$refs.refAuto.showPopup()
  })
}
function kabupatenSelected (val) {
  store.kabupatenSelected(val)
  store.getKec().then(() => {
    refKabupaten.value.$refs.refAuto.blur()
    refKecamatan.value.$refs.refAuto.focus()
    refKecamatan.value.$refs.refAuto.showPopup()
  })
}
function kecamatanSelected (val) {
  store.kecamatanSelected(val)
  store.getKels().then(() => {
    refKecamatan.value.$refs.refAuto.blur()
    refKelurahan.value.$refs.refAuto.focus()
    refKelurahan.value.$refs.refAuto.showPopup()
  })
}
function kelurahanSelected (val) {
  store.kelurahanSelected(val)
  refKelurahan.value.$refs.refAuto.blur()
  refKodePos.value.$refs.refInput.focus()
}
// ---get negara to kelurahah end----
function setKodepos (val) {
  console.log('kodepos', val)
  if (store.alamataDomisiliSama) {
    store.setForm('kodeposdomisili', val)
  }
}
// ---get negara to kelurahah domisili start----

function negaraDomisiliSelected (val) {
  store.negaraDomisiliSelected(val)
  store.getProvincesDomisili().then(() => {
    refNegaraDomisili.value.$refs.refAuto.blur()
    refPropinsiDomisili.value.$refs.refAuto.focus()
    refPropinsiDomisili.value.$refs.refAuto.showPopup()
  })
}
function propinsiDomisiliSelected (val) {
  store.propinsiDomisiliSelected(val)
  store.getKotaDomisili().then(() => {
    refPropinsiDomisili.value.$refs.refAuto.blur()
    refKabupatenDomisili.value.$refs.refAuto.focus()
    refKabupatenDomisili.value.$refs.refAuto.showPopup()
  })
}
function kabupatenDomisiliSelected (val) {
  store.kabupatenDomisiliSelected(val)
  store.getKecDomisili().then(() => {
    refKabupatenDomisili.value.$refs.refAuto.blur()
    refKecamatanDomisili.value.$refs.refAuto.focus()
    refKecamatanDomisili.value.$refs.refAuto.showPopup()
  })
}
function kecamatanDomisiliSelected (val) {
  store.kecamatanDomisiliSelected(val)
  store.getKelsDomisili().then(() => {
    refKecamatanDomisili.value.$refs.refAuto.blur()
    refKelurahanDomisili.value.$refs.refAuto.focus()
    refKelurahanDomisili.value.$refs.refAuto.showPopup()
  })
}
function kelurahanDomisiliSelected (val) {
  store.kelurahanDomisiliSelected(val)
  refKelurahanDomisili.value.$refs.refAuto.blur()
  // refBahasa.value.$refs.refInput.focus()
}
// ---get negara to kelurahah domisili end----

function setTlpRumah (val) {
  // console.log('form', store.form)
  // if (val.charAt(0) === '0') {
  //   // console.log('val', val.charAt(0), val.slice(1, val.length))
  //   store.setForm('noteleponrumah', '+' + (store.form.negara ? store.form.negara : '62') + val.slice(1, val.length))
  // } else {
  //   // console.log('val', val.charAt(0), val.slice(0, 1))
  //   store.setForm('noteleponrumah', '+' + (store.form.negara ? store.form.negara : '62') + val)
  // }
}
function setTlpHP (evt) {
  // const val = evt.target.value
  // console.log('val', val)
  // if (val.charAt(0) === '0' || val.charAt(0) === '+') {
  //   // console.log('val', val.charAt(0), val.slice(1, val.length))
  //   store.setForm('noteleponhp', '+' + (store.form.negara ? store.form.negara : '62') + val.slice(1, val.length))
  // } else {
  //   // console.log('val', val.charAt(0), val.slice(0, 1))
  //   store.setForm('noteleponhp', '+' + (store.form.negara ? store.form.negara : '62') + val)
  // }
  // console.log('form', store.form)
}
function setPekerjaan (val) {
  // console.log(val)
  if (val === 'Lain-lain') {
    if (store.form.pekerjaan) delete store.form.pekerjaan
    setTimeout(() => {
      refPekerjaan.value.$refs.refAuto.blur()
      // refInputPekerjaan.value.$refs.refInput.focus()
    }, 500)
  }
  else {
    refPekerjaan.value.$refs.refAuto.blur()
    // refKtp.value.$refs.refInput.focus()
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
function validasi () {
  // eslint-disable-next-line no-undef, no-use-before-define

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
  const KodePos = refKodePos.value ? refKodePos.value?.$refs?.refInput.validate() : true
  const NoAntrian = refNoAntrian.value ? refNoAntrian.value.$refs.refInput.validate() : true

  const Ktp = refKtp.value ? refKtp.value?.$refs?.refInput.validate() : true
  const Kitas = refKitas.value ? refKitas.value.$refs.refInput.validate() : true
  const NoKaBpjs = refNoKaBpjs.value.$refs.refInput.validate()
  const Alamat = refAlamat.value.$refs.refInput.validate()
  const RT = refRT.value ? refRT.value?.$refs?.refInput.validate() : true
  const RW = refRW.value ? refRW.value?.$refs?.refInput.validate() : true
  const Bahasa = refBahasa.value.$refs.refAuto.validate()
  const Hambatan = refHambatan.value.$refs.refAuto.validate()
  const Negara = refNegara.value ? refNegara.value?.$refs?.refAuto.validate() : true
  const Propinsi = refPropinsi.value ? refPropinsi.value.$refs.refAuto.validate() : true
  const Kabupaten = refKabupaten.value ? refKabupaten.value.$refs.refAuto.validate() : true
  const Kecamatan = refKecamatan.value ? refKecamatan.value.$refs.refAuto.validate() : true
  const Kelurahan = refKelurahan.value ? refKelurahan.value.$refs.refAuto.validate() : true

  const RTDomisili = store.alamataDomisiliSama || store.form?.kewarganegaraan === 'WNA' ? true : refRTDomisili?.value?.$refs?.refInput?.validate()
  const RWDomisili = store.alamataDomisiliSama || store.form?.kewarganegaraan === 'WNA' ? true : refRWDomisili?.value?.$refs?.refInput?.validate()
  const NegaraDomisili = store.alamataDomisiliSama || store.form?.kewarganegaraan === 'WNA' ? true : refNegaraDomisili?.value?.$refs?.refAuto?.validate()
  const PropinsiDomisili = store.alamataDomisiliSama || store.form?.kewarganegaraan === 'WNA' ? true : refPropinsiDomisili?.value?.$refs?.refAuto?.validate()
  const KabupatenDomisili = store.alamataDomisiliSama || store.form?.kewarganegaraan === 'WNA' ? true : refKabupatenDomisili?.value?.$refs?.refAuto?.validate()
  const KecamatanDomisili = store.alamataDomisiliSama || store.form?.kewarganegaraan === 'WNA' ? true : refKecamatanDomisili?.value?.$refs?.refAuto?.validate()
  const KelurahanDomisili = store.alamataDomisiliSama || store.form?.kewarganegaraan === 'WNA' ? true : refKelurahanDomisili?.value?.$refs?.refAuto?.validate()
  const KodePosDom = store.alamataDomisiliSama || store.form?.kewarganegaraan === 'WNA' ? true : refKodePosDom?.value?.$refs?.refInput?.validate()
  const bacatulis = !!store.form.bacatulis
  if (!bacatulis) {
    notifErrVue('Bisa / Tidak bisa baca tulis belum dipilih')
  }

  if (
    JenisPasien && NoRM && Nama && Sapaan && Kelamin &&
  TempatLahir && HariLahir && BulanLahir && TahunLahir && Ibu &&
  Pendidikan && StatusPernikahan && Pekerjaan && InputPekerjaan &&
  Agama && TulisAgama && Suku && NoTlp && Bahasa && KodePos && NoAntrian &&
  Ktp && NoKaBpjs && Alamat && RT && RW && Negara && Propinsi &&
  Kabupaten && Kecamatan && Kelurahan && RTDomisili && RWDomisili &&
  NegaraDomisili && PropinsiDomisili && KabupatenDomisili &&
  KecamatanDomisili && KodePosDom && KelurahanDomisili && Kitas && Hambatan && bacatulis
  ) {
    valid = true
  }
  else { valid = false }
}
function set () {
  validasi()
  // console.log('Baru', baru)
  if (valid) {
    emits('bisa-simpan', { form: store.form, save: true })
    return { form: store.form, save: true }
    // console.log('lanjut')
  }
  else {
    emits('bisa-simpan', { form: store.form, save: false })
    // emits('tidak-simpan')
    notifErrVue('periksa kembali input data pasien anda')
    return { form: store.form, save: false }
  }
}

function cekBpjs () {
  console.log('Cek bpjs awal')
  if (refNoKaBpjs.value.$refs.refInput.validate() && !!store.form.noka) {
    const form = { noka: store.form.noka, tglsep: props.tglsep }
    store.cekPesertaByNoka(form).then(() => {
      console.log('Cek bpjs', store.form)
    })
  }
  else {
    notifErrVue('Nomor BPJS Kosong')
  }
}

function clearForm () {
  store.clearForm()
  return store.form
}

defineExpose({
  set,
  cekBpjs,
  resetValidation,
  validateNokaAndNorm,
  validateNoka,
  clearForm,
  cekFinger
})

store.getInitialData()
onBeforeUpdate(() => {
  // console.log('jenis pasien', refJenisPasien.value)
})

async function filterFn (val, update, abort) {
  if (val.length < 3) {
    abort()
    return
  }

  const param = {
    q: val
  }

  const params = { params: param }

  const resp = await api.get('v1/simrs/pendaftaran/ranap/wheatherapi-country', params)
  console.log('resp', resp)

  update(() => {
    store.countrys = resp.data
  })
}

function citySelected (val) {
  store.setForm('city', val.name)
  store.setForm('country', val.country)
  store.setForm('region', val.region)

  store.city = val.name
  store.country = val.country
  store.region = val.region
}

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
.merah{
  color: $negative;
}
</style>
