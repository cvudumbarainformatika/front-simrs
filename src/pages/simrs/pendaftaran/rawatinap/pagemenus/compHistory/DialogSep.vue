<template>
  <q-dialog persistent backdrop-filter="blur(4px)" @show="init">
    <q-card style="min-width:70vw; max-width: 70vw;">
      <q-bar class="text-white" :class="sep.edited ? 'bg-dark' : 'bg-teal'">
        <div>{{ sep.edited ? 'Edit SEP -- '+sep?.t_sep?.noSep : 'Create SEP' }}</div>

        <q-space />

        <q-btn dense flat icon="icon-mat-close" v-close-popup>
          <q-tooltip>Close</q-tooltip>
        </q-btn>
      </q-bar>

      <q-card-section class="bg-grey-4">
        <div class="row q-col-gutter-x-sm">
          <div class="col-auto">
            <app-avatar-pasien :pasien="pasien" width="70px" />
          </div>
          <div class="col full-width">
            <div class="row justify-between">
              <div>
                <div class="text-weight-bold">
                  {{ pasien?.nama }}
                </div>
                <div>
                  NORM : {{ pasien?.norm }}
                </div>
                <div>
                  NIK : {{ pasien?.nktp ?? '-' }}
                </div>
                <div>
                  NOREG : {{ pasien?.noreg }}
                </div>
                <div>
                  NOKA : {{ pasien?.noka }}
                </div>
                <div class="text-weight-bold">
                  {{ pasien?.ruangan }}
                </div>
              </div>

              <div class="column q-gutter-y-sm">
                <q-btn
                  :label="pasien.sistembayar"
                  color="primary"
                  outline
                  disabled
                  dense
                  class="q-px-md"
                />
                <q-btn
                  color="accent"
                  outline
                  disabled
                  dense
                  class="q-px-md"
                >
                  <div class="text-weight-bold">
                    Hak {{ store.cekPeserta?.hakKelas?.keterangan }}
                  </div>
                </q-btn>
                <q-btn
                  color="dark"
                  outline
                  disabled
                  dense
                  class="q-px-md"
                >
                  <div class="text-weight-bold f-12">
                    LAMA : {{ pasien?.lama ?? '0' }} Hari
                  </div>
                </q-btn>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
      <q-separator />
      <div v-if="sep.loadingCariSep" class="column flex-center light-dimmed" style="height:58vh">
        <q-spinner color="primary" size="3em" />
        <div>Harap Tunggu ... Mengkoneksikan dengan BPJS </div>
      </div>
      <q-form v-else @submit="sep.onSubmit">
        <q-card-section class="scroll" style="max-height: 58vh">
          <div class="row q-col-gutter-sm">
            <div class="col-6" style="border-right: 1px solid grey;">
              <div class="row q-col-gutter-sm q-pa-sm">
                <app-input-date
                  :model="sep.t_sep.tglSep"
                  label="Tanggal SEP"
                  outlined
                  :disable="true"
                  @set-model="val=>sep.t_sep.tglSep=val"
                  class="col-5"
                />
                <app-autocomplete
                  ref="refJnsPelayanan"
                  v-model="sep.t_sep.jnsPelayanan"
                  label="Jenis Pelayanan"
                  autocomplete="label"
                  option-value="value"
                  option-label="label"
                  outlined
                  :source="sep.jnsPelayanans"
                  :rules="[val => (!!val) || 'Harap diisi',]"
                  @update:model-value="(val)=>{
                    sep.t_sep.jnsPelayanan = val
                  }"
                  :key="sep.t_sep.jnsPelayanan"
                  class="col-7"
                />

                <!-- klsRawat -->
                <app-autocomplete
                  ref="refKlsRwt"
                  v-model="sep.t_sep.klsRawat.klsRawatHak"
                  label="Hak Kelas"
                  autocomplete="label"
                  option-value="value"
                  option-label="label"
                  outlined
                  :source="sep.klsRawats"
                  @update:model-value="(val)=>{
                    sep.t_sep.klsRawat.klsRawatHak = val
                  }"
                  class="col-6"
                />
                <app-autocomplete
                  ref="refKlsRwtNaik"
                  v-model="sep.t_sep.klsRawat.klsRawatNaik"
                  label="Kls Rawat Naik"
                  autocomplete="label"
                  option-value="value"
                  option-label="label"
                  outlined
                  :source="sep.klsRawatNaiks"
                  valid
                  @update:model-value="(val)=>{
                    sep.t_sep.klsRawat.klsRawatNaik = val
                  }"
                  class="col-6"
                />
                <app-autocomplete
                  v-if="sep.t_sep.klsRawat.klsRawatNaik !== ''"
                  ref="refPembiayaan"
                  v-model="sep.t_sep.klsRawat.pembiayaan"
                  label="Pembiayaan"
                  autocomplete="label"
                  option-value="value"
                  option-label="label"
                  outlined
                  :source="sep.pembiayaans"
                  :rules="[val => (!!val) || 'Harap diisi',]"
                  @update:model-value="(val)=>{
                    const x = sep.pembiayaans.find(y => y.value === val)
                    sep.t_sep.klsRawat.pembiayaan = val
                    sep.t_sep.klsRawat.penanggungJawab = x?.label
                  }"
                  class="col-12"
                />

                <!-- Rujukan -->
                <app-input-simrs
                  v-if="!sep.edited"
                  v-model="sep.t_sep.rujukan.noRujukan" label="No. Rujukan" :valid="{required: true}" :autofocus="false"
                  class="col-7"
                />
                <div class="col-5" v-if="!sep.edited">
                  <div class="flex q-gutter-sm">
                    <q-btn dense class="q-px-sm" color="primary" :loading="sep.loadingRujukanInternal" :disable="sep.loadingRujukanInternal" @click="sep.getRujukanInternal(pasien)">
                      Get
                    </q-btn>
                    <q-btn dense class="q-px-md" color="dark" @click="sep.onPreviewListRujukan(pasien)">
                      List Rujukan
                    </q-btn>
                  </div>
                </div>
                <app-input-date
                  v-if="!sep.rujukanInternal"
                  :model="sep.t_sep.rujukan.tglRujukan"
                  label="Tanggal Rujukan"
                  outlined
                  @set-model="val=>sep.t_sep.rujukan.tglRujukan=val"
                  class="col-5"
                />
                <app-autocomplete
                  v-if="!sep.rujukanInternal"
                  ref="refAsalRujukan"
                  v-model="sep.t_sep.rujukan.asalRujukan"
                  label="Asal Rujukan"
                  autocomplete="label"
                  option-value="value"
                  option-label="label"
                  outlined
                  :source="sep.asalRujukans"
                  :rules="[val => (!!val) || 'Harap diisi',]"
                  @update:model-value="(val)=>{
                    sep.t_sep.rujukan.asalRujukan = val
                  }"
                  class="col-7"
                />
                <q-select
                  v-if="!sep.rujukanInternal"
                  ref="refSelectPpkRujukan"
                  v-model="sep.ppkRujukan"
                  label="PPK Rujukan"
                  outlined
                  dense
                  use-input
                  hide-selected
                  fill-input
                  input-debounce="200"
                  :rules="[(val) => (!!val) || 'Harap diisi']"
                  :options="sep.ppkRujukans"
                  @filter="ppkRujukanFn"
                  placeholder="Min 3 character untuk pencarian"
                  option-label="nama"
                  option-value="kode"
                  autofocus
                  hide-bottom-space
                  hide-dropdown-icon
                  no-error-icon
                  @update:model-value="ppkRujukanSelected"
                  class="col-12"
                />
                <app-input-simrs
                  v-model="sep.t_sep.catatan" label="Catatan Peserta" :autofocus="false"
                  class="col-12"
                />
              </div>
            </div>
            <div class="col-6">
              <div class="row q-col-gutter-sm q-pa-sm">
                <app-autocomplete
                  ref="refCob"
                  v-model="sep.t_sep.cob.cob"
                  label="COB"
                  autocomplete="label"
                  option-value="value"
                  option-label="label"
                  outlined
                  :source="sep.cobs"
                  @update:model-value="(val)=>{
                    sep.t_sep.cob.cob = val
                  }"
                  class="col-4"
                />
                <app-autocomplete
                  ref="refCob"
                  v-model="sep.t_sep.katarak.katarak"
                  label="Katarak"
                  autocomplete="label"
                  option-value="value"
                  option-label="label"
                  outlined
                  :source="sep.kataraks"
                  @update:model-value="(val)=>{
                    sep.t_sep.katarak.katarak = val
                  }"
                  class="col-4"
                />

                <!-- laka lantas -->
                <app-autocomplete
                  ref="refLakaLantas"
                  v-model="sep.t_sep.jaminan.lakaLantas"
                  label="Kecelakaan"
                  autocomplete="label"
                  option-value="value"
                  option-label="label"
                  outlined
                  :source="sep.lakaLantas"
                  @update:model-value="(val)=>{
                    sep.t_sep.jaminan.lakaLantas = val
                  }"
                  class="col-12"
                />
                <app-input-simrs
                  v-if="sep.t_sep.jaminan.lakaLantas!=='0'"
                  v-model="sep.t_sep.jaminan.noLP" label="No LP" :autofocus="false"
                  class="col-12"
                />

                <!--  jika ada laka lantas-->
                <div class="col-12 row q-col-gutter-sm" v-if="sep.t_sep.jaminan.lakaLantas!=='0'">
                  <app-input-date
                    :model="sep.t_sep.jaminan.penjamin.tglKejadian"
                    label="Tanggal Kejadian"
                    outlined
                    @set-model="val=>sep.t_sep.jaminan.penjamin.tglKejadian=val"
                    class="col-5"
                  />
                  <app-input-simrs
                    v-model="sep.t_sep.jaminan.penjamin.keterangan" label="Keterangan" :autofocus="false"
                    class="col-7"
                  />

                  <!-- suplesi -->
                  <app-autocomplete
                    ref="refPropinsi"
                    v-model="sep.t_sep.jaminan.penjamin.suplesi.lokasiLaka.kdPropinsi"
                    label="Propinsi"
                    autocomplete="nama"
                    option-value="kode"
                    option-label="nama"
                    outlined
                    :source="sep.propinsis"
                    @update:model-value="(val)=>{
                      sep.t_sep.jaminan.penjamin.suplesi.lokasiLaka.kdPropinsi = val
                      sep.getKabupatenBpjs(val)
                    }"
                    class="col-12"
                  />
                  <app-autocomplete
                    ref="refKabupaten"
                    v-model="sep.t_sep.jaminan.penjamin.suplesi.lokasiLaka.kdKabupaten"
                    label="Kabupaten / Kota"
                    autocomplete="nama"
                    option-value="kode"
                    option-label="nama"
                    outlined
                    :source="sep.kabupatens"
                    @update:model-value="(val)=>{
                      sep.t_sep.jaminan.penjamin.suplesi.lokasiLaka.kdKabupaten = val
                      sep.getKecamatanBpjs(val)
                    }"
                    class="col-12"
                  />
                  <app-autocomplete
                    ref="refKecamatan"
                    v-model="sep.t_sep.jaminan.penjamin.suplesi.lokasiLaka.kdKecamatan"
                    label="Kecamatan"
                    autocomplete="nama"
                    option-value="kode"
                    option-label="nama"
                    outlined
                    :source="sep.kecamatans"
                    @update:model-value="(val)=>{
                      sep.t_sep.jaminan.penjamin.suplesi.lokasiLaka.kdKecamatan = val
                    }"
                    class="col-12"
                  />
                  <app-autocomplete
                    ref="refSuplesi"
                    v-model="sep.t_sep.jaminan.penjamin.suplesi.suplesi"
                    label="Suplesi"
                    autocomplete="label"
                    option-value="value"
                    option-label="label"
                    outlined
                    :source="sep.suplesis"
                    @update:model-value="(val)=>{
                      sep.t_sep.jaminan.penjamin.suplesi.suplesi = val
                    }"
                    class="col-4"
                  />
                  <div v-if="sep.t_sep.jaminan.penjamin.suplesi.suplesi!=='0'" class="col-4">
                    <q-btn dense color="primary" class="q-px-md" label="Cek Suplesi" @click="sep.getSuplesiJasaRaharjaByBpjs(pasien)" />
                  </div>
                  <app-input-simrs
                    v-if="sep.t_sep.jaminan.penjamin.suplesi.suplesi!=='0'"
                    v-model="sep.t_sep.jaminan.penjamin.suplesi.noSepSuplesi" label="No. SEP Suplesi" :autofocus="false"
                    class="col-8"
                  />
                </div>
              </div>
            </div>

            <q-separator class="col-12 " />
            <div class="col-12">
              <div class="row q-col-gutter-sm">
                <q-select
                  ref="refSelectDiagnosa"
                  v-model="sep.diagnosa"
                  label="Diagnosa Awal"
                  outlined
                  dense
                  use-input
                  hide-selected
                  fill-input
                  input-debounce="200"
                  :options="sep.diagnosas"
                  @filter="diagnosaFn"
                  placeholder="Min 3 character untuk pencarian"
                  option-label="nama"
                  option-value="kode"
                  autofocus
                  hide-bottom-space
                  hide-dropdown-icon
                  no-error-icon
                  @update:model-value="diagnosaSelected"
                  :rules="[val => (!!val) || 'Harap diisi',]"
                  class="col-9"
                >
                  <template v-if="sep.diagnosa" #append>
                    <q-icon
                      name="icon-mat-cancel" @click.stop.prevent="()=> {
                        sep.diagnosa = null
                        sep.t_sep.diagAwal = ''
                        sep.t_sep.sepRanap.diagnosa = null
                      }" class="cursor-pointer"
                    />
                  </template>
                </q-select>
                <div class="col-3 text-right">
                  <q-btn dense color="dark" class="q-px-md" label="Cek Diagnosa Pasien" @click="sep.dialogDiagnosa = true" />
                </div>
                <app-autocomplete
                  v-if="!sep.edited"
                  ref="refTujuanKunjungan"
                  v-model="sep.t_sep.tujuanKunj"
                  label="Tujuan Kunjungan"
                  autocomplete="label"
                  option-value="value"
                  option-label="label"
                  outlined
                  :source="sep.tujuanKunjs"
                  @update:model-value="(val)=>{
                    sep.t_sep.tujuanKunj = val
                    if (val === '0') {
                      sep.t_sep.flagProcedure = ''
                      sep.t_sep.kdPenunjang = ''
                    }
                  }"
                  class="col-2"
                />
                <app-autocomplete
                  v-if="sep.t_sep.tujuanKunj !== '0' && !sep.edited"
                  ref="refProcedure"
                  v-model="sep.t_sep.flagProcedure"
                  label="Procedure"
                  autocomplete="label"
                  option-value="value"
                  option-label="label"
                  valid
                  outlined
                  :source="sep.flagProcedurs.filter(val => val.value !== '')"
                  @update:model-value="(val)=>{
                    sep.t_sep.flagProcedure = val
                  }"
                  class="col-5"
                />
                <app-autocomplete
                  v-if="sep.t_sep.tujuanKunj !== '0' && !sep.edited"
                  ref="refKdPenunjang"
                  v-model="sep.t_sep.kdPenunjang"
                  label="Penunjang"
                  autocomplete="label"
                  option-value="value"
                  option-label="label"
                  valid
                  outlined
                  :source="sep.kdPenunjangs.filter(val => val.value !== '')"
                  @update:model-value="(val)=>{
                    sep.t_sep.kdPenunjang = val
                  }"
                  class="col-4"
                />

                <app-input-simrs
                  v-if="!sep.edited"
                  v-model="sep.t_sep.skdp.noSurat" label="NO SPRI" :autofocus="false"
                  class="col-4"
                  append
                  :append-btn="true"
                  @append-click="sep.getSpri(pasien)"
                />
                <!-- <div class="col-1">
                  <q-btn dense color="primary" class="q-px-md" label="Cek" @click="sep.getSpri(pasien)" />
                </div> -->
                <!-- <app-autocomplete
                  ref="refDokter"
                  v-model="sep.t_sep.skdp.kodeDPJP"
                  label="Dokter"
                  autocomplete="nama"
                  option-value="kddpjp"
                  option-label="nama"
                  outlined
                  :source="pendaftaran.dokters"
                  class="col-6"
                  valid
                  @selected="(val)=>{
                    console.log('dokter', val);

                    sep.t_sep.skdp.kodeDPJP = val

                  }"
                  :key="sep.t_sep.skdp.kodeDPJP"
                /> -->

                <q-select
                  v-if="!sep.edited"
                  ref="refSelectDokter"
                  v-model="sep.dokter"
                  label="Dokter"
                  outlined
                  dense
                  use-input
                  hide-selected
                  fill-input
                  input-debounce="50"
                  :options="sep.dokters"
                  @filter="dokterFn"
                  placeholder="Min 2 character untuk pencarian"
                  option-label="nama"
                  option-value="kddpjp"
                  autofocus
                  hide-bottom-space
                  hide-dropdown-icon
                  no-error-icon
                  @update:model-value="dokterSelected"
                  class="col-6"
                >
                  <template v-if="sep.dokter" #append>
                    <q-icon name="icon-mat-cancel" @click.stop.prevent="sep.dokter = null" class="cursor-pointer" />
                  </template>
                </q-select>
                <q-select
                  v-if="sep.edited"
                  ref="refSelectDPJP"
                  v-model="sep.dokter"
                  label="DPJP"
                  outlined
                  dense
                  use-input
                  hide-selected
                  fill-input
                  input-debounce="50"
                  :options="sep.dokters"
                  @filter="dokterFn"
                  placeholder="Min 2 character untuk pencarian"
                  option-label="nama"
                  option-value="kddpjp"
                  autofocus
                  hide-bottom-space
                  hide-dropdown-icon
                  no-error-icon
                  @update:model-value="dpjpSelected"
                  class="col-6"
                >
                  <template v-if="sep.dokter" #append>
                    <q-icon name="icon-mat-cancel" @click.stop.prevent="sep.dokter = null" class="cursor-pointer" />
                  </template>
                </q-select>
                <app-input-simrs
                  v-model="sep.t_sep.user" label="Petugas" :autofocus="false"
                  class="col-4"
                  :readonly="true"
                />
              </div>
            </div>
          </div>
        </q-card-section>
        <q-separator />
        <q-card-section class="q-pa-none text-white" :class="sep.edited ? 'bg-dark' : 'bg-teal'">
          <div class="q-pa-md row justify-between items-center">
            <div class="flex q-gutter-sm">
              <q-btn label="Tutup" color="dark" text-color="white" @click="store.dialogSep=false" />
            </div>
            <div>
              <q-btn :loading="sep.loading" :disabled="sep.loading" type="submit" :label="sep.edited? 'Edit SEP' : 'Create SEP'" color="yellow-3" text-color="dark" />
              <!-- <q-btn
                type="button" label="Coba Create SEP" color="yellow-3" text-color="dark" @click="()=> {
                  console.log('simpan sep', sep.t_sep);

                }"
              /> -->
            </div>
          </div>
        </q-card-section>
      </q-form>
    </q-card>

    <!-- Dialog List Rujukan -->
    <DialogListRujukan
      v-model="sep.dialogListRujukan" :loading="sep.loadingListRujukan" :p-cares="sep.listsRujukanPcare" :list-rs="sep.listsRujukanRs" :terpilih="sep.t_sep.rujukan.noRujukan"
      @pilih="(val, asal)=> {
        sep.fromListRujukan(val, asal)
      }"
    />

    <!-- Dialog List spri -->
    <DialogListSpri
      v-model="sep.dialogListSpri" :loading="sep.loadingListSpri" :lists="sep.listSpri"
      :terpilih="sep.t_sep.skdp.noSurat"
      :pasien="pasien"
      @get-spri="val=>sep.getSpri(val)"
      @pilih="val=>sep.fromListSpri(val)"
    />

    <!-- Dialog List suplesi -->
    <DialogListSuplesi
      v-model="sep.dialogListSuplesi" :loading="sep.loadingListSuplesi" :lists="sep.listSuplesis"
      :terpilih="sep.t_sep.jaminan.penjamin.suplesi.noSepSuplesi"
      @pilih="val=>sep.t_sep.jaminan.penjamin.suplesi.noSepSuplesi = (val.noSep)"
    />
    <!-- Dialog List Diagnosa -->
    <DialogDiagnosaPasien
      v-model="sep.dialogDiagnosa"
      :pasien="pasien"
      @pilih="val=>{
        // console.log('diagnosa pilih', val);
        sep.diagnosa = {
          kode: val?.kode,
          nama: val?.kode + ' - ' + val?.inggris
        }

        sep.t_sep.diagAwal = val?.kode
        sep.t_sep.sepRanap.diagnosa = val?.nama

        sep.dialogDiagnosa = false
      }"
      :key="pasien"
    />
  </q-dialog>
</template>

<script setup>
import { api } from 'src/boot/axios'
// import { dateDbFormat } from 'src/modules/formatter'
import { useAplikasiStore } from 'src/stores/app/aplikasi'
import { useBuatSepRanapStore } from 'src/stores/simrs/pendaftaran/ranap/buatsep'
import { useFormPendaftaranRanapStore } from 'src/stores/simrs/pendaftaran/ranap/formpendaftaran'
import { useListHistoryPendaftaranRanapStore } from 'src/stores/simrs/pendaftaran/ranap/history.js'
import { defineAsyncComponent } from 'vue'

// import BarcodeGenerator from 'src/components/callComponents/BarcodeGenerator.vue'
// import { ref } from 'vue'
const store = useListHistoryPendaftaranRanapStore()
const sep = useBuatSepRanapStore()
const app = useAplikasiStore()
const pendaftaran = useFormPendaftaranRanapStore()

const DialogListRujukan = defineAsyncComponent(() => import('./DialogListRujukan.vue'))
const DialogListSpri = defineAsyncComponent(() => import('./DialogListSpri.vue'))
const DialogListSuplesi = defineAsyncComponent(() => import('./DialogListSuplesi.vue'))
const DialogDiagnosaPasien = defineAsyncComponent(() => import('./DialogDiagnosaPasien.vue'))

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

// const dokters = ref([])

const init = () => {
  console.log('init')
  sep.initForm(props.pasien, app?.user?.pegawai?.nama)
  sep.dokters = pendaftaran?.dokters
  Promise.all([
    store.cekPesertaBpjs('nokartu', props.pasien?.noka)
      .then((resp) => {
        console.log('cek Peserta', store.cekPeserta)
        sep.hakKelas = store.cekPeserta?.hakKelas?.kode
        sep.t_sep.klsRawat.klsRawatHak = store.cekPeserta?.hakKelas?.kode
        sep.t_sep.sepRanap.jenispeserta = store.cekPeserta?.jenisPeserta?.keterangan
        sep.t_sep.sepRanap.hakKelas = store.cekPeserta?.hakKelas?.keterangan
        sep.t_sep.sepRanap.namaAsuransiCob = store.cekPeserta?.cob?.nmAsuransi
        // sep.t_sep.rujukan.ppkRujukan = store.cekPeserta?.provUmum?.kdProvider
        // sep.t_sep.rujukan.asalRujukan = '2'

        // sep.ppkRujukan = {
        //   kode: store.cekPeserta?.provUmum?.kdProvider,
        //   nama: store.cekPeserta?.provUmum?.nmProvider
        // }
      }),
    // sep.getRujukanBridging(props.pasien),
    sep.getPropinsiBpjs()
  ])
}

async function ppkRujukanFn (val, update, abort) {
  if (val.length < 3) {
    abort()
    return
  }

  const params = {
    param: val,
    jnsFaskes: sep.t_sep?.rujukan?.asalRujukan
  }

  const resp = await api.post('v1/simrs/pendaftaran/ranap/get-ppk-rujukan', params)
  console.log('resp', resp.data)
  let data = []
  if (resp.data?.metadata?.code === '200') {
    const result = resp?.data?.result?.faskes
    if (result) {
      data = result
    }
  }

  update(() => {
    sep.ppkRujukans = data
  })
}
async function diagnosaFn (val, update, abort) {
  if (val.length < 3) {
    abort()
    return
  }

  const params = {
    param: val
  }

  const resp = await api.post('v1/simrs/pendaftaran/ranap/get-diagnosa-bpjs', params)
  console.log('resp', resp.data)
  let data = []
  if (resp.data?.metadata?.code === '200') {
    const result = resp?.data?.result?.diagnosa
    if (result) {
      data = result
    }
  }

  update(() => {
    sep.diagnosas = data
  })
}

function dokterFn (val, update, abort) {
  if (val.length < 1) {
    update(() => {
      sep.dokters = pendaftaran.dokters
    })
  }
  update(() => {
    const needle = val?.toLowerCase()
    sep.dokters = pendaftaran.dokters.filter((v) => v?.nama?.toLowerCase().indexOf(needle) > -1 || v?.kddpjp?.toLowerCase().indexOf(needle) > -1)
  })
}

const dokterSelected = (val) => {
  console.log('selected dokter', val)
  sep.t_sep.skdp.kodeDPJP = val?.kddpjp
}
const dpjpSelected = (val) => {
  console.log('selected dpjp', val)
  sep.t_sep.dpjpLayan = val?.kddpjp
  sep.t_sep.sepRanap.namaDpjp = val?.nama
}

const ppkRujukanSelected = (val) => {
  console.log('selected', val)
  sep.t_sep.rujukan.ppkRujukan = val?.kode
}
const diagnosaSelected = (val) => {
  console.log('selected diagnosa', val)
  sep.t_sep.diagAwal = val?.kode
  sep.t_sep.sepRanap.diagnosa = val?.nama
}
// const propinsiSelected = (val) => {
//   console.log('selected propinsi', val)
//   // sep.t_sep.diagAwal = val?.kode
//   sep.t_sep.jaminan.penjamin.suplesi.lokasiLaka.kdPropinsi = val?.kode
// }
// const kabupatenSelected = (val) => {
//   console.log('selected kabupaten', val)
//   // sep.t_sep.diagAwal = val?.kode
//   sep.t_sep.jaminan.penjamin.suplesi.lokasiLaka.kdKabupaten = val?.kode
// }

// const kecamatanSelected = (val) => {
//   console.log('selected kecamatan', val)
//   // sep.t_sep.diagAwal = val?.kode
//   sep.t_sep.jaminan.penjamin.suplesi.lokasiLaka.kdKecamatan = val?.kode
// }
</script>
