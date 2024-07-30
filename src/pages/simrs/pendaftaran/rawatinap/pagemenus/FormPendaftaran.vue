<template>
  <q-form class="fit" ref="formRef" @submit="onSubmit" @reset="onReset">
    <div class="fit scroll">
      <q-card square>
        <q-bar class="bg-dark text-white">
          <div>Biodata Pasien </div>
          <q-space />
        </q-bar>
        <div class="row q-col-gutter-x-sm">
          <div class="col-2 q-pa-sm q-pl-md br-1">
            <app-avatar-pasien v-if="store.pasien.usia && store.pasien.tanggallahir && store.pasien.kelamin" width="100%" :pasien="store.pasien" />
            <div v-else>
              <q-img
                src="~assets/images/nouser.png"
                spinner-color="white"
              />
            </div>

            <!-- STatus Bpjs -->
            <div v-if="store.pasien.nokabpjs">
              <div class="text-weight-bold q-my-sm">
                PESERTS BPJS
              </div>
              <q-separator class="q-my-sm" />
              <div class="text-weight-bold">
                HAK KELAS : {{ store.pasien.hakKelasBpjs }}
              </div>
              <q-separator class="q-my-sm" />
            </div>
          </div>

          <!-- <q-separator vertical spaced class="q-pa-none" /> -->
          <!-- Mulai input -->
          <div class="col-3 q-pr-sm q-py-md br-1">
            <div class="flex q-gutter-sm full-width q-mb-sm">
              <div>Status Pasien : </div>
              <q-radio
                v-for="item in store.statusPasiens"
                :key="item"
                v-model="store.pasien.barulama"
                :val="item"
                :label="item"
                dense
                size="xs"
                @update:model-value="(val)=>gantiBaruLama(val)"
              />
            </div>
            <app-input-simrs
              ref="refNorm" v-model="store.pasien.norm" label="No. RM" :valid="{required: true, number: true}"
              :error-from-server="store.errors.norm"
              @update:model-value="store.errors.norm = null"
              :lazy-rules="false"
            />
            <div class="flex q-gutter-sm full-width q-pb-sm q-pt-xs" style="margin-top: -12px;">
              <div>Kewarganegaraan : </div>
              <q-radio
                v-for="item in store.kewarganegaran"
                :key="item"
                v-model="store.pasien.kewarganegaraan"
                :val="item"
                :label="item"
                dense
                size="xs"
                @update:model-value="gantiKewarganegaraan"
              />
            </div>
            <div v-if="store.pasien.kewarganegaraan==='WNI'">
              <app-input-simrs
                v-model="store.pasien.noktp" label="NIK / NO. KTP" :valid="{min: 16, number: true}" :autofocus="false"
                :error-from-server="store.errors.noktp"
                @update:model-value="store.errors.noktp = null"
              />
            </div>
            <div v-else>
              <app-input-simrs v-model="store.pasien.paspor" label="NO. Passport" :valid="{required: true}" :autofocus="false" />
            </div>
            <app-input-simrs v-model="store.pasien.nokabpjs" label="NO KA BPJS" :autofocus="false" />

            <app-input-simrs v-model="store.pasien.nama" label="Nama Lengkap" :valid="{required: true}" :autofocus="false" />

            <div class="row q-col-gutter-xs q-mb-xs">
              <div class="col-4">
                <app-autocomplete
                  ref="refSapaan"
                  v-model="store.pasien.sapaan"
                  label="Sapaan"
                  autocomplete="sapaan"
                  option-value="sapaan"
                  option-label="sapaan"
                  outlined
                  :source="store.sapaans"
                  :rules="[val => (!!val) || 'Harap diisi']"
                />
              </div>
              <div class="col-8">
                <app-autocomplete
                  ref="refKelamin"
                  v-model="store.pasien.kelamin"
                  label="Jenis kelamin"
                  autocomplete="kelamin"
                  option-value="kelamin"
                  option-label="kelamin"
                  outlined
                  :source="store.kelamins"
                  :rules="[val => (!!val) || 'Harap diisi',]"
                  @update:model-value="(val)=>{
                    const cek = store.kelamins?.filter(el => el.kelamin === val)
                    store.pasien.kd_kelamin = cek[0]?.kode ?? ''
                  }"
                />
              </div>
            </div>

            <app-input-simrs v-model="store.pasien.ibukandung" label="Nama Ibu Kandung" :autofocus="false" :valid="{required: true}" />
            <app-input-simrs v-model="store.pasien.tempatlahir" label="Tempat Lahir" :autofocus="false" :valid="{required: true}" />
            <app-input-date
              :model="store.pasien.tanggallahir"
              label="tanggal Lahir"
              outlined
              @set-model="val=>store.pasien.tanggallahir=val"
            />

            <div class="q-pt-xs">
              <app-autocomplete
                ref="refKelamin"
                v-model="store.pasien.pendidikan"
                label="Pendidikan Terakhir"
                autocomplete="pendidikan"
                option-value="pendidikan"
                option-label="pendidikan"
                outlined
                :source="store.pendidikans"
                :rules="[val => (!!val) || 'Harap diisi',]"
                @update:model-value="(val)=>{
                  const cek = store.pendidikans?.filter(el => el.pendidikan === val)
                  store.pasien.kd_pendidikan = cek[0]?.kode ?? ''
                }"
              />
            </div>
            <div class="row q-col-gutter-xs q-my-xs">
              <app-autocomplete
                v-model="store.pasien.agama"
                label="Agama"
                autocomplete="kode"
                option-value="keterangan"
                option-label="keterangan"
                outlined
                :source="store.agamas"
                :rules="[val => (!!val) || 'Harap diisi',]"
                class="col-6"
                @update:model-value="(val)=>{
                  const cek = store.agamas?.filter(el => el.keterangan === val)
                  store.pasien.kd_agama = cek[0]?.kodemapping ?? ''
                }"
              />
              <app-input-simrs v-if="store.pasien.agama==='8'" v-model="store.pasien.agamalain" label="Jelaskan" :autofocus="false" :valid="{required: true}" class="col-6" />
            </div>

            <div class="row q-col-gutter-xs">
              <app-input-simrs v-model="store.pasien.suku" label="Suku" :autofocus="false" :valid="{required: true}" class="col-6" />
              <app-autocomplete
                v-model="store.pasien.bahasa"
                label="Bahasa"
                autocomplete="bahasa"
                option-value="bahasa"
                option-label="bahasa"
                outlined
                :source="store.bahasas"
                :rules="[val => (!!val) || 'Harap diisi',]"
                class="col-6"
              />
            </div>
          </div>

          <!-- <q-separator vertical spaced /> -->

          <div class="col-4 q-pr-sm q-pt-md br-1">
            <div class="flex q-gutter-sm full-width q-mb-sm">
              <div>Bisa Baca Tulis ? : </div>
              <q-radio
                v-for="item in store.bisabacatulis"
                :key="item"
                v-model="store.pasien.bisabacatulis"
                :val="item"
                :label="item"
                dense
                size="xs"
              />
            </div>

            <div class="row q-col-gutter-xs q-mb-xs">
              <app-autocomplete
                v-model="store.pasien.statuspernikahan"
                label="Status Pernikahan"
                autocomplete="statuspernikahan"
                option-value="statuspernikahan"
                option-label="statuspernikahan"
                outlined
                :source="store.statuspernikahans"
                :rules="[val => (!!val) || 'Harap diisi',]"
                class="col-6"
              />
              <app-autocomplete
                v-model="store.pasien.pekerjaan"
                label="Pekerjaan"
                autocomplete="pekerjaan"
                option-value="pekerjaan"
                option-label="pekerjaan"
                outlined
                :source="store.pekerjaans"
                :rules="[val => (!!val) || 'Harap diisi',]"
                class="col-6"
                @update:model-value="(val)=>{
                  const cek = store.pekerjaans?.filter(el => el.pekerjaan === val)
                  store.pasien.kd_pekerjaan = cek[0]?.kode ?? ''
                }"
              />
            </div>

            <div class="row q-mb-xs q-col-gutter-xs">
              <app-input-simrs v-model="store.pasien.notelp" label="No. Telp" :autofocus="false" class-tambahan="col-6" />
              <app-input-simrs v-model="store.pasien.nohp" label="No. HP" :autofocus="false" class-tambahan="col-6" :valid="{required: true, number: true}" />
            </div>
            <div class="text-weight-bold q-my-xs">
              Alamat (KTP / SIM / Paspor / Kitas)
            </div>
            <q-separator />
            <div class="row q-col-gutter-x-sm">
              <app-input-simrs v-model="store.pasien.alamat" type="textarea" label="Alamat Lengkap" :autofocus="false" :valid="{required: true}" class-tambahan="col-12" />
            </div>
            <div v-if="store.pasien.kewarganegaraan==='WNI'" class="row q-col-gutter-x-xs">
              <app-input-simrs v-model="store.pasien.rt" label="RT" :autofocus="false" :valid="{min: 3}" class-tambahan="col-3 q-my-xs" />
              <app-input-simrs v-model="store.pasien.rw" label="RW" :autofocus="false" :valid="{min: 3}" class-tambahan="col-3 q-my-xs" />
              <app-autocomplete-new
                ref="refNegara"
                :model="store.paramWilayah.kd_negara"
                label="Negara"
                autocomplete="wilayah"
                option-value="kd_negara"
                option-label="wilayah"
                outlined
                :source="store.negaras"
                class="col-6 q-my-xs"
                @on-select="(val)=> store.paramWilayah.kd_negara=val"
              />
              <app-autocomplete-new
                ref="refPropinsi"
                :model="store.paramWilayah.kd_propinsi"
                label="Propinsi"
                autocomplete="wilayah"
                option-value="propinsi"
                option-label="wilayah"
                outlined
                :source="store.propinsies"
                class="col-10 q-my-xs"
                @on-select="(val)=>autocompleteSelected(val, store.propinsies,'propinsi', 'refPropinsi', 'propinsi', 'wilayah')"
                @clear="()=> {
                  store.pasien.propinsi=null
                  store.pasien.kota=null
                  store.pasien.kecamatan=null
                  store.pasien.kelurahan=null
                  store.paramWilayah.kd_propinsi=null
                  store.paramWilayah.kd_kotakabupaten=null
                  store.paramWilayah.kd_kecamatan=null
                  store.paramWilayah.kd_kelurahan=null
                }"
              />
              <app-autocomplete-new
                ref="refKabupaten"
                :model="store.paramWilayah.kd_kotakabupaten"
                label="kabupaten / kota"
                autocomplete="wilayah"
                option-value="kotakabupaten"
                option-label="wilayah"
                outlined
                :source="store.kabupatens"
                class="col-10 q-my-xs"
                @on-select="(val)=>autocompleteSelected(val, store.kabupatens,'kotakabupaten', 'refPropinsi', 'kota', 'wilayah')"
                @clear="()=> {
                  store.pasien.kota=null
                  store.pasien.kecamatan=null
                  store.pasien.kelurahan=null
                  store.paramWilayah.kd_kotakabupaten=null
                  store.paramWilayah.kd_kecamatan=null
                  store.paramWilayah.kd_kelurahan=null
                }"
              />
              <app-autocomplete-new
                ref="refKecamatan"
                :model="store.paramWilayah.kd_kecamatan"
                label="Kecamatan"
                autocomplete="wilayah"
                option-value="kotakabupaten"
                option-label="wilayah"
                outlined
                :source="store.kecamatans"
                class="col-6 q-my-xs"
                @on-select="(val)=>autocompleteSelected(val, store.kecamatans,'kotakabupaten', 'refKecamatan', 'kecamatan', 'wilayah')"
                @clear="()=> {
                  store.pasien.kecamatan=null
                  store.pasien.kelurahan=null
                  store.paramWilayah.kd_kecamatan=null
                  store.paramWilayah.kd_kelurahan=null
                }"
              />
              <app-autocomplete-new
                ref="refKelurahan"
                :model="store.paramWilayah.kd_kelurahan"
                label="Kelurahan"
                autocomplete="wilayah"
                option-value="kotakabupaten"
                option-label="wilayah"
                outlined
                :source="store.kelurahans"
                class="col-6 q-my-xs"
                @on-select="(val)=>autocompleteSelected(val, store.kelurahans,'kotakabupaten', 'refKelurahan', 'kelurahan', 'wilayah')"
                @clear="()=> {
                  store.pasien.kelurahan=null
                  store.paramWilayah.kd_kelurahan=null
                }"
              />
              <app-input-simrs
                v-model="store.pasien.kodepos" label="Kode Pos" :autofocus="false" class-tambahan="col-5" @update:model-value="(val)=> {
                  if(store.domisiliSama) store.pasien.kodeposDomisili = val
                }"
              />
            </div>
            <div v-else>
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
              <app-input-simrs v-model="store.pasien.country" label="Country" :autofocus="false" class-tambahan="col-12 q-mt-sm" />
              <app-input-simrs v-model="store.pasien.city" label="City" :autofocus="false" class-tambahan="col-12" />
              <app-input-simrs v-model="store.pasien.region" label="Region" :autofocus="false" class-tambahan="col-12" />
            </div>
          </div>

          <!-- <q-separator vertical spaced class="q-pa-none" /> -->
          <div class="col-3 q-pt-md q-pr-md">
            <div class="text-weight-bold q-my-xs">
              Alamat Domisili
            </div>
            <q-separator />
            <div class="flex items-center q-gutter-sm full-width q-mb-sm">
              <div>Sama dg Alamat KTP ? : </div>
              <q-checkbox v-model="store.domisiliSama" size="sm" @update:model-value="setDomisiliSama" />
            </div>

            <app-input-simrs v-model="store.pasien.alamatDomisili" type="textarea" label="Alamat Lengkap" :autofocus="false" :valid="{required: true}" class-tambahan="col-12" />
            <div v-if="store.pasien.kewarganegaraan==='WNI'" class="row q-col-gutter-x-xs">
              <app-input-simrs v-model="store.pasien.rtDomisili" label="RT" :autofocus="false" :valid="{min: 3}" class-tambahan="col-6 q-my-xs" />
              <app-input-simrs v-model="store.pasien.rwDomisili" label="RW" :autofocus="false" :valid="{min: 3}" class-tambahan="col-6 q-my-xs" />
              <app-autocomplete-new
                ref="refNegara"
                :model="store.paramWilayahDomisili.kd_negara"
                label="Negara"
                autocomplete="wilayah"
                option-value="kd_negara"
                option-label="wilayah"
                outlined
                :source="store.negaras"
                class="col-12 q-my-xs"
                @on-select="(val)=>store.paramWilayahDomisili.kd_negara=val"
              />
              <app-autocomplete-new
                ref="refPropinsi"
                :model="store.paramWilayahDomisili.kd_propinsi"
                label="Propinsi"
                autocomplete="wilayah"
                option-value="propinsi"
                option-label="wilayah"
                outlined
                :source="store.propinsies"
                class="col-12 q-my-xs"
                @on-select="(val)=>autocompleteSelected(val, store.propinsies,'propinsi', 'refPropinsi', 'propinsiDomisili', 'wilayah')"
                @clear="()=> {
                  store.pasien.propinsiDomisili=null
                  store.pasien.kotaDomisili=null
                  store.pasien.kecamatanDomisili=null
                  store.pasien.kelurahanDomisili=null
                }"
              />
              <app-autocomplete-new
                ref="refKabupaten"
                :model="store.paramWilayahDomisili.kd_kotakabupaten"
                label="kabupaten / kota"
                autocomplete="wilayah"
                option-value="kotakabupaten"
                option-label="wilayah"
                outlined
                :source="store.kabupatens"
                class="col-12 q-my-xs"
                @on-select="(val)=>autocompleteSelected(val, store.kabupatens,'kotakabupaten', 'refKabupaten', 'kotaDomisili', 'wilayah')"
                @clear="()=> {
                  store.pasien.kotaDomisili=null
                  store.pasien.kecamatanDomisili=null
                  store.pasien.kelurahanDomisili=null
                }"
              />
              <app-autocomplete-new
                ref="refKecamatan"
                :model="store.paramWilayahDomisili.kd_kecamatan"
                label="Kecamatan"
                autocomplete="wilayah"
                option-value="kotakabupaten"
                option-label="wilayah"
                outlined
                :source="store.kecamatans"
                class="col-12 q-my-xs"
                @on-select="(val)=>autocompleteSelected(val, store.kecamatans,'kotakabupaten', 'refKecamatan', 'kecamatanDomisili','wilayah')"
                @clear="()=> {
                  store.pasien.kecamatanDomisili=null
                  store.pasien.kelurahanDomisili=null
                }"
              />
              <app-autocomplete-new
                ref="refKelurahan"
                :model="store.paramWilayahDomisili.kd_kelurahan"
                label="Kelurahan"
                autocomplete="wilayah"
                option-value="kotakabupaten"
                option-label="wilayah"
                outlined
                :source="store.kelurahans"
                class="col-8 q-my-xs"
                @on-select="(val)=>autocompleteSelected(val, store.kelurahans,'kotakabupaten', 'refKelurahan', 'kelurahanDomisili', 'wilayah')"
                @clear="store.pasien.kelurahanDomisili=null"
              />
              <app-input-simrs v-model="store.pasien.kodeposDomisili" label="Kode Pos" :autofocus="false" class-tambahan="col-4 q-my-xs" />
            </div>
          </div>
        </div>
      </q-card>

      <q-separator />
      <q-card square>
        <q-bar class="bg-dark text-white">
          <div>Registrasi / Penginap </div>
          <q-space />
        </q-bar>
        <div class="row q-col-gutter-x-sm q-pa-sm">
          <div class="col-4">
            <!-- <app-input-simrs label="No. registrasi (automatis)" readonly /> -->
            <app-autocomplete
              ref="refAsalRujukan"
              v-model="store.pasien.asalrujukan"
              label="Asal Rujukan"
              autocomplete="asalrujukan"
              option-value="kode"
              option-label="asalrujukan"
              outlined
              :source="store.asalrujukans"
              class="q-mb-xs"
              :rules="[val => (!!val) || 'Harap diisi',]"
            />
            <app-input-simrs v-model="store.pasien.nama_penanggungjawab" label="Nama Penanggung Jawab" />
            <app-input-simrs v-model="store.pasien.notelp_penanggungjawab" label="No Telp Penang Jawab" />
            <app-autocomplete
              ref="refDokter"
              v-model="store.pasien.kd_dokter_bpjs"
              label="Dokter"
              autocomplete="nama"
              option-value="kddpjp"
              option-label="nama"
              outlined
              :source="store.dokters"
              class="q-mb-xs"
              :rules="[val => (!!val) || 'Harap diisi',]"
              @selected="(val)=>pilihDokter(val)"
            />
          </div>
          <div class="col-4">
            <div class="row q-col-gutter-x-xs">
              <select-diagnosa v-model="store.pasien.diagnosaAwal" class="q-mb-xs" :model="store.pasien.diagnosaAwal" @clear="store.pasien.diagnosaAwal=null" />
              <div class="col-5">
                <app-autocomplete
                  ref="refJnsSistemBayar"
                  v-model="store.pasien.jnsBayar"
                  label="Pilih Sistem Bayar"
                  autocomplete="sistembayar"
                  option-value="kode"
                  option-label="sistembayar"
                  outlined
                  :source="store.jnsSistemBayars"
                  class="q-mb-xs"
                  :rules="[val => (!!val) || 'Harap diisi',]"
                  @selected="(val)=>store.filterSistemBayar(val)"
                />
              </div>
              <div class="col-7">
                <app-autocomplete
                  ref="refSistemBayar"
                  v-model="store.pasien.kodesistembayar"
                  label="Sistem Bayar"
                  autocomplete="sistembayar"
                  option-value="kode"
                  option-label="sistembayar"
                  outlined
                  :source="store.sistembayars"
                  class="q-mb-xs"
                  :rules="[val => (!!val) || 'Harap diisi',]"
                />
              </div>
              <app-autocomplete
                ref="refCategoryKasus"
                v-model="store.pasien.kategoriKasus"
                label="Kategori Kasus"
                autocomplete="uraian"
                option-value="kode"
                option-label="uraian"
                outlined
                :source="store.categories"
                class="q-mb-xs col-12"
                :rules="[val => (!!val) || 'Harap diisi',]"
              />
            </div>
          </div>
          <div class="col-4">
            <!-- <app-input-simrs label="Diagnosa Awal" /> -->

            <div class="row q-col-gutter-xs">
              <!-- <q-btn dense color="primary" class="col-12 full-width q-ma-xs" @click="previewListKamar">
                Cari Ruangan
              </q-btn> -->
              <app-autocomplete
                ref="refHakRuang"
                v-model="store.pasien.hakruang"
                label="Hak Ruang"
                autocomplete="rs2"
                option-value="rs1"
                option-label="rs2"
                outlined
                :source="store.kamars"
                class="q-mb-xs col-12"
                :rules="[val => (!!val) || 'Harap diisi',]"
                @selected="(val)=>pilihRuang(val)"
              />
              <div class="flex q-gutter-sm full-width q-mb-sm">
                <div>Titipkan Pasien ? : </div>
                <q-radio
                  v-for="item in store.titipans"
                  :key="item"
                  v-model="store.pasien.isTitipan"
                  :val="item"
                  :label="item"
                  dense
                  size="xs"
                  @update:model-value="(val)=>{
                    if (val==='Ya') {
                      store.pasien.kode_ruang= null
                      store.pasien.kamar= null
                      store.pasien.no_bed= null
                    } else {
                      store.pasien.kode_ruang= store.pasien.hakruang
                      if(store.pasien.hakruang !== null) pilihRuang(store.pasien.hakruang)
                    }
                  }"
                />
              </div>
              <app-autocomplete
                v-if="store.pasien.isTitipan ==='Ya'"
                ref="refKodeRuang"
                v-model="store.pasien.kode_ruang"
                label="Pilih Ruangan"
                autocomplete="rs2"
                option-value="rs1"
                option-label="rs2"
                outlined
                :source="store.kamars"
                class="q-mb-xs col-12"
                :rules="[val => (!!val) || 'Harap diisi',]"
                @selected="(val)=>pilihRuang(val)"
              />
              <app-autocomplete
                ref="refGrupKamar"
                v-model="store.pasien.kamar"
                label="Pilih Kamar"
                autocomplete="label"
                option-value="value"
                option-label="label"
                outlined
                :source="grupKamar"
                class="q-mb-xs col-8"
                :rules="[val => (!!val) || 'Harap diisi',]"
                @selected="(val)=>pilihKamar(val)"
              />

              <q-select
                dense outlined standout="bg-yellow-3"
                v-model="store.pasien.no_bed"
                :options="kamars" label="NO BED"
                option-value="rs2"
                :option-label="opt=> Object(opt) === opt && 'rs2' in opt ? `${opt.rs2}  -  ${opt.kunjungan.length ? 'Terisi' : 'Kosong'}` : '- Null -'"
                map-options
                emit-value
                class="q-mb-xs col-4"
              />
              <!-- <app-autocomplete
                ref="refKamar"
                v-model="store.pasien.no_bed"
                label="NO BED"
                autocomplete="rs2"
                option-value="rs5"
                option-label="rs2"
                outlined
                :source="kamars"
                class="q-mb-xs col-4"
                :rules="[val => (!!val) || 'Harap diisi',]"
              /> -->
              <!-- <app-input-simrs v-model="store.pasien.ruang" label="Ruang" class="col-12" readonly :valid="{ required: true }" />
              <app-input-simrs v-model="store.pasien.kamar" label="Kamar" class="col-8" readonly :valid="{ required: true }" />
              <app-input-simrs v-model="store.pasien.no_bed" label="BED" class="col-4" readonly :valid="{ required: true }" /> -->
              <!-- <app-input-simrs
                v-if="store.pasien.kelas !== store.pasien.hakKelasBpjs || !store.pasien.hakKelasBpjs === null" v-model="store.pasien.indikatorPerubahanKelas"
                label="Indikator Perubahan Kelas"
                class="col-6"
              /> -->
            </div>
          </div>
          <!-- <div class="col-2">
            <app-input-simrs v-model="store.pasien.biaya_admin" label="Biaya Administrasi " readonly />
            <app-input-simrs v-model="store.pasien.biaya_kamar" label="Biaya Kamar" readonly />
            <app-input-simrs label="Jml Identitas" />
          </div> -->
        </div>
        <div style="padding-bottom: 100px;" />
      </q-card>
    </div>
    <div class="absolute-bottom full-width bg-primary q-px-sm q-pa-sm">
      <div class="flex q-gutter-sm justify-start">
        <q-btn type="submit" label="Simpan Pasien" color="white" text-color="black" dense class="q-px-md" />
        <q-btn label="Lihat Kamar" color="yellow-3" text-color="black" dense class="q-px-md" @click="previewListKamar" />
        <q-btn type="reset" label="Reset" color="dark" text-color="white" dense class="q-px-md" />
      </div>
    </div>

    <!-- DIALOG PESERTA -->
    <dialog-peserta v-model="store.openDialogPeserta" :peserta="store.cekPeserta" @ok="copyDataFromBpjs()" />
    <!-- DIALOG KAMAR -->
    <dialog-show-kamar v-model="store.openDialogShowKamar" :items="store.listKamars" :loading="store.loadingShowKamar" @close="store.openDialogShowKamar = false" />
    <dialog-cari-pasien v-model="store.openDialogCariPasien" @selected="selectPasien" />
  </q-form>
</template>

<script setup>
import { api } from 'src/boot/axios'
import { useFormPendaftaranRanapStore } from 'src/stores/simrs/pendaftaran/ranap/formpendaftaran'
import { defineAsyncComponent, onBeforeMount, onMounted, ref, watch, watchEffect } from 'vue'

const DialogPeserta = defineAsyncComponent(() => import('./compFormPendaftaran/DialogPeserta.vue'))
const SelectDiagnosa = defineAsyncComponent(() => import('./compFormPendaftaran/SelectDiagnosa.vue'))
const DialogShowKamar = defineAsyncComponent(() => import('./compFormPendaftaran/DialogShowKamar.vue'))
const DialogCariPasien = defineAsyncComponent(() => import('./compFormPendaftaran/DialogCariPasien.vue'))
const store = useFormPendaftaranRanapStore()

const weather = ref(null)
const formRef = ref(null)
const refNorm = ref(null)
const refKelurahan = ref(null)
const grupKamar = ref([])
const kamars = ref([])
const onSubmit = () => {
  // console.log('simpan', store.pasien)
  store.simpanPasien()
}

const onReset = () => {
  // console.log('reset', refNorm.value)
  formRef.value.resetValidation()
  refNorm.value.appInputSimrs.focus()
}
onMounted(() => {
  // console.log('onMounted', refNorm.value)
  onReset()
  Promise.all([
    gantiKewarganegaraan('WNI')

    // store.getMasterTarif()
  ])
})

onBeforeMount(() => {
  store.initForm()
})

const gantiKewarganegaraan = e => {
  if (e === 'WNI') {
    store.paramWilayah.kd_negara = '62'
  }
  else {
    store.paramWilayah.kd_negara = ''
  }
}

function isNumber (input) {
  return !isNaN(input) && !isNaN(parseFloat(input))
}

const cekKtp = (e) => {
  // console.log('e', e)
  // Output NIK tidak valid
  if (!isNumber(e)) {
    console.log('nik tidak valid')
    return
  }
  const digit = e?.toString().length
  if (digit !== 16) {
    console.log('nik tidak valid')
  }
  else {
    const nik = e.toString()
    const N = (new Date()).getFullYear().toString().substr(-2) // tahun sekarang
    const prov = nik?.substring(0, 2) ?? ''
    const kabkota = nik?.substring(2, 4) ?? ''
    const kec = nik?.substring(4, 6) ?? ''
    const tglNik = nik?.substring(6, 8) ?? '' // tanggal NIK
    const blnNik = nik?.substring(8, 10) ?? ''
    const thnNik = nik?.substring(10, 12) ?? '' // tahun NIK
    // const urut = nik.substring(12, 16) // nourut ktp sesuai tgl lahir di ktp

    const klmn = tglNik > 40 ? 'Perempuan' : 'Laki-laki'

    // console.log('nik valid', N)
    // console.log('nik thn', thnNik)
    // console.log('nik tgl', tglNik)
    // console.log('nik bln', blnNik)
    // console.log('nik prov', prov)
    // console.log('nik kabkota', kabkota)
    // console.log('nik kec', kec)
    // console.log('nik klmn', klmn)

    // update store kode ktp
    store.kodeKtp.kelamin = klmn
    store.kodeKtp.tglLahir = tglNik
    store.kodeKtp.blnLahir = blnNik
    store.kodeKtp.thnLahir = thnNik
    store.kodeKtp.prov = prov
    store.kodeKtp.kabKota = kabkota
    store.kodeKtp.kec = kec

    // update paramWilayah
    store.paramWilayah.kd_propinsi = prov
    store.paramWilayah.kd_kotakabupaten = kabkota
    store.paramWilayah.kd_kecamatan = kec

    autoGetServer(prov, kabkota, kec)

    const tahun = parseInt(thnNik) < parseInt(N) ? `20${thnNik}` : `19${thnNik}`
    const tglAsli = tglNik > 40 ? tglNik - 40 : tglNik
    const tgl = tglAsli < 10 ? `${tglAsli}` : tglAsli

    // update store pasien
    store.pasien.kelamin = klmn
    store.pasien.tanggallahir = `${tahun}-${blnNik}-${tgl}`

    store.cekPesertaBpjs('nik', nik)
  }
}

const autoGetServer = (prov, kabkota, kec) => {
  store.getProvinces()
    .then(() => {
      const xx = store.propinsies.filter(item => item.propinsi === prov)
      store.pasien.propinsi = xx[0]?.wilayah ?? null
      store.pasien.propinsiDomisili = xx[0]?.wilayah ?? null
      store.getKota()
        .then(() => {
          const xx = store.kabupatens.filter(item => item.kotakabupaten === kabkota)
          store.pasien.kota = xx[0]?.wilayah ?? null
          store.pasien.kotaDomisili = xx[0]?.wilayah ?? null
          store.getKec()
            .then(() => {
              const xx = store.kecamatans.filter(item => item.kotakabupaten === kec)
              store.pasien.kecamatan = xx[0]?.wilayah ?? null
              store.pasien.kecamatanDomisili = xx[0]?.wilayah ?? null
              store.getKels()
                .then(() => {
                  store.pasien.kelurahan = null
                  store.pasien.kelurahanDomisili = null
                })
            })
        })
    })
}

const setDomisiliSama = (val) => {
  // if (val) {
  // }
}

const autocompleteSelected = (val, fromArr, objVal, el, model, key) => {
  console.log('val', val)
  // store.setForm(model, val)
  // console.log('arr', fromArr)
  // console.log('el', el)
  // console.log('model', model)
  const finder = fromArr.length ? fromArr.filter(x => x[objVal] === val) : []
  // console.log('index', finder)
  store.pasien[model] = finder[0][key] ?? null
  if (store.domisiliSama) {
    store.pasien[model + 'Domisili'] = finder[0][key] ?? null
  }

  if (model === 'kelurahan') {
    store.paramWilayah.kd_kelurahan = val
    if (store.domisiliSama) store.paramWilayahDomisili.kd_kelurahan = val
  }
  if (model === 'kecamatan') {
    store.paramWilayah.kd_kecamatan = val
    // store.paramWilayahDomisili.kd_kecamatan = val
    store.domisiliSama ? store.paramWilayahDomisili.kd_kecamatan = val : store.paramWilayahDomisili.kd_kecamatan = null
    store.getKels()
      .then(() => {
        store.paramWilayah.kd_kelurahan = null
        store.pasien.kelurahan = null
        if (store.domisiliSama) {
          store.paramWilayahDomisili.kd_kelurahan = null
          store.pasien.kelurahanDomisili = null
        }
      })
  }
  if (model === 'kota') {
    store.paramWilayah.kd_kotakabupaten = val
    store.domisiliSama ? store.paramWilayahDomisili.kd_kotakabupaten = val : store.paramWilayahDomisili.kd_kotakabupaten = null
    store.getKec()
      .then(() => {
        store.paramWilayah.kd_kecamatan = null
        store.paramWilayah.kd_kelurahan = null
        store.pasien.kecamatan = null
        store.pasien.kelurahan = null
        if (store.domisiliSama) {
          store.paramWilayahDomisili.kd_kecamatan = null
          store.paramWilayahDomisili.kd_kelurahan = null
          store.pasien.kecamatanDomisili = null
          store.pasien.kelurahanDomisili = null
        }
      })
  }
  if (model === 'propinsi') {
    store.paramWilayah.kd_propinsi = val
    store.domisiliSama ? store.paramWilayahDomisili.kd_propinsi = val : store.paramWilayahDomisili.kd_propinsi = null
    store.getKota()
      .then(() => {
        store.paramWilayah.kd_kotakabupaten = null
        store.paramWilayah.kd_kecamatan = null
        store.paramWilayah.kd_kelurahan = null

        store.pasien.kota = null
        store.pasien.kecamatan = null
        store.pasien.kelurahan = null
        if (store.domisiliSama) {
          store.paramWilayahDomisili.kd_kotakabupaten = null
          store.paramWilayahDomisili.kd_kecamatan = null
          store.paramWilayahDomisili.kd_kelurahan = null

          store.pasien.kotaDomisili = null
          store.pasien.kecamatanDomisili = null
          store.pasien.kelurahanDomisili = null
        }
      })
  }

  // if (el === 'refKelurahan') refKelurahan.value.$refs.refAuto.blur()

  // DOMISILI
  if (model === 'kelurahanDomisili') {
    store.paramWilayahDomisili.kd_kelurahan = val
  }
  if (model === 'kecamatanDomisili') {
    store.paramWilayahDomisili.kd_kecamatan = val
    store.getKels()
      .then(() => {
        store.pasien.kelurahanDomisili = null
      })
  }
  if (model === 'kotaDomisili') {
    store.paramWilayahDomisili.kd_kotakabupaten = val
    store.getKec()
      .then(() => {
        // if (store.domisiliSama) {
        store.pasien.kecamatanDomisili = null
        store.pasien.kelurahanDomisili = null
        // }
      })
  }
  if (model === 'propinsiDomisili') {
    store.paramWilayahDomisili.kd_propinsi = val
    store.getKota()
      .then(() => {
        // store.pasien.kota = null
        // store.pasien.kecamatan = null
        // store.pasien.kelurahan = null
        // if (store.domisiliSama) {
        store.pasien.kotaDomisili = null
        store.pasien.kecamatanDomisili = null
        store.pasien.kelurahanDomisili = null
        // }
      })
  }
}

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
  console.log('val', val)
  store.pasien.city = val.name
  store.pasien.country = val.country
  store.pasien.region = val.region
}

function hitungUsia (tanggalLahir) {
  tanggalLahir = new Date(tanggalLahir)
  const hariIni = new Date()
  let usia = hariIni.getFullYear() - tanggalLahir.getFullYear()

  if (hariIni.getMonth() < tanggalLahir.getMonth() || (hariIni.getMonth() === tanggalLahir.getMonth() && hariIni.getDate() < tanggalLahir.getDate())) {
    usia--
  }
  store.pasien.usia = usia.toString()
  return usia
}

function copyDataFromBpjs () {
  store.pasien.nama = store.cekPeserta?.nama
  store.pasien.nokabpjs = store.cekPeserta?.noKartu
  store.pasien.norm = store.cekPeserta?.mr?.noMR ?? store.pasien.norm
  store.pasien.notelp = store.cekPeserta?.mr?.noTelepon ?? store.pasien.notelp
  store.pasien.nohp = store.cekPeserta?.mr?.noTelepon ?? store.pasien.nohp

  store.pasien.hakKelasBpjs = store.cekPeserta?.hakKelas?.kode
  store.pasien.jnsBayar = '1'

  store.openDialogPeserta = false
}

// eslint-disable-next-line no-unused-vars
function pilihRuang (val) {
  store.pasien.kamar = null
  const arr = store.kamars
  const obj = arr.length ? arr.find(x => x.rs1 === val) : null
  console.log('pilihRuang', obj)
  const group = obj?.rs4 ?? null
  // const kodeRuang = obj?.rs1 ?? null
  const kelas = obj?.rs3 ?? null
  const flag = obj?.rs6 ?? null

  // store.pasien.kode_ruang = kodeRuang
  store.pasien.kelas = kelas
  store.pasien.flag_ruang = flag
  store.pasien.group = group

  store.pasien.kamar = null
  store.pasien.no_bed = null

  store.showKamar()
    .then(() => {
      grupKamar.value = []
      kamars.value = []
      const pilihan = store.listKamars.find(x => x.groups === group)
      console.log('pilihan', pilihan)
      const kamarsx = pilihan?.kamars?.length
        ? pilihan?.kamars?.filter(x => {
          return x.rs6 === group && (x?.rs5 === `${group + kelas}` || x?.rs5 === '-')
        })
        : []
      console.log('kamars', kamars)
      const mapKamar = kamarsx?.length ? kamarsx?.map(x => x.rs1) : []
      const grup = [...new Set(mapKamar)]
      // grupKamar.value = grup
      console.log('grup', grup)
      // const thumb = []
      for (let i = 0; i < grup.length; i++) {
        const el = grup[i]
        // const anggotaKamar = kamarsx?.filter(x => x.rs1 === el)?.sort((x, y) => x.rs2 - y.rs2)
        // const anggotaKamar = kamarsx?.find(x => x.rs1 === el)

        // thumb.push(anggotaKamar ?? null)
        grupKamar.value.push({
          label: el,
          value: el
        })
      }
      // kamars.value = thumb
    })

  // cariBiayaAdministrasi()
  // cariBiayaKamar()
}

function pilihKamar (val) {
  console.log('pilihKamar', val)
  const arr = store.listKamars?.find(x => x.groups === store.pasien.group)?.kamars || []
  // console.log('arr', arr)
  const lists = arr?.length ? arr?.filter(x => x.rs1 === val) : []
  console.log('lihatKamar', lists)
  kamars.value = lists
}

function pilihDokter (val) {
  const arr = store.dokters
  const obj = arr.length ? arr.find(x => x.kddpjp === val) : null
  // console.log('pilihKamar', obj)
  store.pasien.nama_dokter = obj?.nama ?? null
  store.pasien.kd_dokter = obj?.kdpegsimrs ?? null

  // cariBiayaAdministrasi()
  // cariBiayaKamar()
}

// function cariBiayaAdministrasi () {
//   if (store.pasien.kode_ruang && store.pasien.kelas) {
//     const arr = store.tarifs
//     const tarifs = arr.length ? arr.find(x => x.rs3 === 'A1#') : null
//     console.log('tarifs', tarifs)
//     const kelas = store.pasien.kelas
//     let biaya1 = 0
//     let biaya2 = 0
//     if (kelas === '3' || kelas === 'IC' || kelas === 'ICC' || kelas === 'NICU' || kelas === 'IN') {
//       biaya1 = tarifs?.rs8
//       biaya2 = tarifs?.rs9
//     }
//     else if (kelas === '2') {
//       biaya1 = tarifs?.rs11
//       biaya2 = tarifs?.rs12
//     }
//     else if (kelas === '1') {
//       biaya1 = tarifs?.rs14
//       biaya2 = tarifs?.rs15
//     }
//     else if (kelas === 'U') {
//       biaya1 = tarifs?.rs17
//       biaya2 = tarifs?.rs18
//     }
//     else if (kelas === 'VIP') {
//       biaya1 = tarifs?.rs20
//       biaya2 = tarifs?.rs21
//     }
//     else if (kelas === 'VVIP') {
//       biaya1 = tarifs?.rs23
//       biaya2 = tarifs?.rs24
//     }

//     const biaya = biaya1 + biaya2
//     store.pasien.biaya_admin = biaya1
//     console.log('biaya1', biaya1)
//     console.log('biaya2', biaya2)
//     return biaya
//   }
// }

// function cariBiayaKamar () {
//   if (store.pasien.kode_ruang && store.pasien.kelas) {
//     const arr = store.tarifs
//     let tarifs = null
//     if (store.pasien.flag_ruang === 'ISO') {
//       tarifs = arr.length ? arr.find(x => x.rs3 === 'B1#' && x.rs4.includes(store.pasien.kode_ruang + '|') && x.rs5.includes(store.pasien.flag_ruang + '|')) : null
//     }
//     else {
//       tarifs = arr.length ? arr.find(x => x.rs3 === 'B1#' && x.rs4.includes(store.pasien.kode_ruang + '|') && x.rs5.includes(store.pasien.kelas + '|')) : null
//     }

//     console.log('tarifs', tarifs)
//     const kelas = store.pasien.kelas
//     let biaya1 = 0
//     let biaya2 = 0
//     if (kelas === '3' || kelas === 'IC' || kelas === 'ICC' || kelas === 'NICU' || kelas === 'IN') {
//       biaya1 = tarifs?.rs8
//       biaya2 = tarifs?.rs9
//     }
//     else if (kelas === '2') {
//       biaya1 = tarifs?.rs11
//       biaya2 = tarifs?.rs12
//     }
//     else if (kelas === '1') {
//       biaya1 = tarifs?.rs14
//       biaya2 = tarifs?.rs15
//     }
//     else if (kelas === 'U') {
//       biaya1 = tarifs?.rs17
//       biaya2 = tarifs?.rs18
//     }
//     else if (kelas === 'VIP') {
//       biaya1 = tarifs?.rs20
//       biaya2 = tarifs?.rs21
//     }
//     else if (kelas === 'VVIP') {
//       biaya1 = tarifs?.rs23
//       biaya2 = tarifs?.rs24
//     }

//     const biaya = biaya1 + biaya2
//     store.pasien.biaya_kamar = biaya1
//     console.log('biaya kamar1', biaya1)
//     console.log('biaya kamar2', biaya2)
//     return biaya
//   }
// }

function previewListKamar () {
  store.openDialogShowKamar = true
  store.showKamar()
}

const gantiBaruLama = (val) => {
  console.log('barulama', val)
  if (val === 'Lama') {
    store.openDialogCariPasien = true
  }
}

const selectPasien = (val) => {
  store.setFormFromServer(val)
    .then(() => {
      autoGetServer(val.kodepropinsi, val.kodekabupatenkota, val.kodekecamatan)
    })
}

watch(() => store.pasien.noktp, (val) => {
  if (val !== null && val !== '') {
    cekKtp(val)
  }
}, { deep: true })

watch(() => store.pasien.tanggallahir, (val) => {
  if (val !== null && val !== '') {
    hitungUsia(val)
    console.log('watch new', hitungUsia(val))
  }
}, { deep: true })

watch(() => store.pasien.jnsBayar, (val) => {
  if (val !== null) {
    store.filterSistemBayar(val)
  }
})
watch(() => store.pasien.alamat, () => {
  if (store.domisiliSama === true) {
    store.pasien.alamatDomisili = store.pasien.alamat
  }
})
watch(() => store.pasien.rt, () => {
  if (store.domisiliSama === true) {
    store.pasien.rtDomisili = store.pasien.rt
  }
})
watch(() => store.pasien.rw, () => {
  if (store.domisiliSama === true) {
    store.pasien.rwDomisili = store.pasien.rw
  }
})

watch(() => store.paramWilayah.kd_negara, (obj) => {
  if (obj) {
    store.getNegara().then(() => {
      store.getProvinces()
    })
  }
})

watchEffect(() => {
  if (store.domisiliSama === true) {
    store.paramWilayahDomisili.kd_negara = store.paramWilayah.kd_negara
    store.paramWilayahDomisili.kd_propinsi = store.paramWilayah.kd_propinsi
    store.paramWilayahDomisili.kd_kotakabupaten = store.paramWilayah.kd_kotakabupaten
    store.paramWilayahDomisili.kd_kecamatan = store.paramWilayah.kd_kecamatan
    store.paramWilayahDomisili.kd_kelurahan = store.paramWilayah.kd_kelurahan

    store.pasien.alamatDomisili = store.pasien.alamat
    store.pasien.rtDomisili = store.pasien.rt
    store.pasien.rwDomisili = store.pasien.rw
    store.pasien.kodeposDomisili = store.pasien.kodepos
  }

  if (store.pasien.isTitipan === 'Tidak') {
    store.pasien.kode_ruang = store.pasien.hakruang
  }
})

</script>

<style lang="scss" scoped>
.br-1 {
  border-right: 1px solid rgba(128, 128, 128, 0.2);
}
</style>
