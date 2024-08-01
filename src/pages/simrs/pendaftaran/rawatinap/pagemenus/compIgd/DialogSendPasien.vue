<template>
  <q-dialog persistent backdrop-filter="blur(4px)" @show="init">
    <q-card style="min-width:40vw; max-width: 40vw;">
      <q-bar class="bg-primary text-white">
        <!-- <q-icon name="network_wifi" />
        <q-icon name="network_cell" />
        <q-icon name="battery_full" /> -->
        <div>Mutasi Pasien</div>

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
              </div>

              <div class="column">
                <q-btn
                  :label="pasien.sistembayar"
                  color="primary"
                  outline
                  disabled
                />
                <div class="text-right q-py-sm f-14 text-weight-bold">
                  {{ store.cekPeserta?.hakKelas?.keterangan }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
      <q-separator />
      <q-form @submit="sendPasien">
        <q-card-section class="q-pa-none ">
          <div class="row q-pa-md q-col-gutter-sm">
            <app-autocomplete
              v-if="pendaftaran.jnsSistemBayars.length > 0"
              ref="refJnsSistemBayar"
              v-model="store.form.jnsBayar"
              label="Pilih Sistem Bayar"
              autocomplete="sistembayar"
              option-value="kode"
              option-label="sistembayar"
              outlined
              :source="pendaftaran.jnsSistemBayars"
              class="col-5 q-mb-xs"
              :rules="[val => (!!val) || 'Harap diisi',]"
              @selected="(val)=>pendaftaran.filterSistemBayar(val)"
            />
            <app-autocomplete
              ref="refSistemBayar"
              v-model="store.form.kodesistembayar"
              label="Sistem Bayar"
              autocomplete="sistembayar"
              option-value="kode"
              option-label="sistembayar"
              outlined
              :source="pendaftaran.sistembayars"
              class="col-7 q-mb-xs"
              :rules="[val => (!!val) || 'Harap diisi',]"
            />
            <app-autocomplete
              v-if="pendaftaran.kamars.length > 0"
              ref="refHakRuang"
              v-model="store.form.hakruang"
              label="Hak Ruang"
              autocomplete="rs2"
              option-value="rs1"
              option-label="rs2"
              outlined
              :source="pendaftaran.kamars"
              class="q-mb-xs col-12"
              :rules="[val => (!!val) || 'Harap diisi',]"
              @selected="(val)=>store.pilihRuang(val)"
            />
            <div class="flex q-gutter-sm full-width q-mb-sm">
              <div>Titipkan Pasien ? : </div>
              <q-radio
                v-for="item in pendaftaran.titipans"
                :key="item"
                v-model="store.form.isTitipan"
                :val="item"
                :label="item"
                dense
                size="xs"
                @update:model-value="(val)=>{
                  if (val==='Ya') {
                    store.form.kode_ruang= null
                    store.form.kamar= null
                    store.form.no_bed= null
                    store.grupKamars= []
                    store.beds= []
                  } else {
                    store.form.kode_ruang= store.form.hakruang
                    if(store.form.hakruang !== null) store.pilihRuang(store.form.hakruang)
                  }
                }"
              />
            </div>
            <app-autocomplete
              v-if="store.form.isTitipan ==='Ya'"
              ref="refKodeRuang"
              v-model="store.form.kode_ruang"
              label="Pilih Ruangan"
              autocomplete="rs2"
              option-value="rs1"
              option-label="rs2"
              outlined
              :source="pendaftaran.kamars"
              class="q-mb-xs col-12"
              :rules="[val => (!!val) || 'Harap diisi',]"
              @selected="(val)=>store.pilihRuang(val)"
            />
            <app-autocomplete
              ref="refGrupKamar"
              v-model="store.form.kamar"
              label="Pilih Kamar"
              autocomplete="label"
              option-value="value"
              option-label="label"
              outlined
              :source="store.grupKamars"
              :loading="pendaftaran.loadingShowKamar"
              :disable="pendaftaran.loadingShowKamar"
              class="q-mb-xs col-8"
              :rules="[val => (!!val) || 'Harap diisi',]"
              @selected="(val)=>store.pilihKamar(val)"
            />
            <q-select
              :key="store.grupKamars"
              dense outlined standout="bg-yellow-3"
              v-model="store.form.no_bed"
              :options="store.beds"
              :loading="pendaftaran.loadingShowKamar"
              :disable="pendaftaran.loadingShowKamar"
              label="NO BED"
              option-value="rs2"
              :option-label="opt=> Object(opt) === opt && 'rs2' in opt ? `${opt.rs2}  -  ${opt.pasien.length ? 'Terisi' : 'Kosong'}` : '- Null -'"
              map-options
              emit-value
              :rules="[
                val => (!!val) || 'Harap diisi',
                val => (store.beds?.find(item=>item.rs2===val)?.pasien?.length === 0) || 'Bed sudah terisi'
              ]"
              class="q-mb-xs col-4"
              @update:model-value="(val)=>pilihBed(val)"
              hide-bottom-space
            />
            <app-autocomplete
              ref="refDokter"
              v-model="store.form.kd_dokter"
              label="Dokter Utama"
              autocomplete="nama"
              option-value="kdpegsimrs"
              option-label="nama"
              outlined
              :source="pendaftaran.dokters"
              :valid="true"
              class="col-12 q-mb-xs"
              :rules="[val => (!!val) || 'Harap diisi',]"
              @selected="(val)=>store.pilihDokter(val)"
            />
            <app-autocomplete
              ref="refCategoryKasus"
              v-model="store.form.kategoriKasus"
              label="Kategori Kasus"
              autocomplete="uraian"
              option-value="kode"
              option-label="uraian"
              outlined
              :source="pendaftaran.categories"
              class="q-mb-xs col-12"
              :rules="[val => (!!val) || 'Harap diisi',]"
            />
          </div>
        </q-card-section>

        <q-card-section class="q-pa-none bg-primary text-white">
          <div class="q-pa-md row justify-between items-center">
            <div><q-btn label="Tutup" color="dark" text-color="white" @click="store.dialogSend=false" /></div>
            <div>
              <q-btn :loading="store.loadingSend" :disable="store.loadingSend" type="submit" label="Kirim Pasien" color="yellow-3" text-color="dark" />
            </div>
          </div>
        </q-card-section>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useFormPendaftaranRanapStore } from 'src/stores/simrs/pendaftaran/ranap/formpendaftaran'
import { useListPendaftaranRanapStore } from 'src/stores/simrs/pendaftaran/ranap/listtunggu'
// import { onMounted } from 'vue'

const store = useListPendaftaranRanapStore()
const pendaftaran = useFormPendaftaranRanapStore()
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

// onMounted(() => {

// })

const init = () => {
  console.log('init', props.pasien)
  store.formFromDialogSend(props.pasien)
  store.cekPesertaBpjs('nik', props.pasien?.nktp)
}

const sendPasien = () => {
  // console.log('send pasien', store.form)
  // console.log('send pasien 2 cek', store.cekPeserta)
  store.mutasiPasien()
}

function pilihBed (val) {
  console.log('pilih bed', store.beds)
}
</script>
