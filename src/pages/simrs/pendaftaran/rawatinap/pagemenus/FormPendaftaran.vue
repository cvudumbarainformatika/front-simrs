<template>
  <q-form class="fit" ref="formRef" @submit="onSubmit" @reset="onReset">
    <div class="fit scroll">
      <q-card>
        <div class="row q-col-gutter-x-sm">
          <div class="col-2 q-pa-sm q-pl-md br-1">
            <app-avatar-pasien width="100%" />
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
              />
            </div>
            <app-input-simrs ref="refNorm" v-model="store.pasien.norm" label="No. RM" :valid="{required: true}" />
            <div class="flex q-gutter-sm full-width q-pb-sm" style="margin-top: -12px;">
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
              <app-input-simrs v-model="store.pasien.noktp" label="NIK / NO. KTP" :valid="{min: 16}" :autofocus="false" @update:model-value="cekKtp" />
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
                  :loading="store.loading"
                  :rules="[val => (!!val) || 'Harap diisi',]"
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
              />
            </div>
            <div class="row q-col-gutter-xs q-my-xs">
              <app-autocomplete
                v-model="store.pasien.agama"
                label="Agama"
                autocomplete="kode"
                option-value="kode"
                option-label="keterangan"
                outlined
                :source="store.agamas"
                :rules="[val => (!!val) || 'Harap diisi',]"
                class="col-6"
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
              />
            </div>

            <div class="row q-mb-xs q-col-gutter-xs">
              <app-input-simrs v-model="store.pasien.notelp" label="No. Telp" :autofocus="false" class-tambahan="col-6" />
              <app-input-simrs v-model="store.pasien.nohp" label="No. HP" :autofocus="false" class-tambahan="col-6" :valid="{required: true}" />
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
                :model="store.pasien.negara"
                label="Negara"
                autocomplete="wilayah"
                option-value="kd_negara"
                option-label="wilayah"
                outlined
                :source="store.negaras"
                class="col-6 q-my-xs"
              />
              <app-autocomplete-new
                ref="refPropinsi"
                :model="store.pasien.propinsi"
                label="Propinsi"
                autocomplete="wilayah"
                option-value="propinsi"
                option-label="wilayah"
                outlined
                :source="store.propinsies"
                class="col-10 q-my-xs"
                @on-select="(val)=>autocompleteSelected(val, store.propinsies,'propinsi', 'refPropinsi', 'propinsi')"
                @clear="()=> {
                  store.pasien.propinsi=null
                  store.pasien.kota=null
                  store.pasien.kecamatan=null
                  store.pasien.kelurahan=null
                }"
              />
              <app-autocomplete-new
                ref="refKabupaten"
                :model="store.pasien.kota"
                label="kabupaten / kota"
                autocomplete="wilayah"
                option-value="kotakabupaten"
                option-label="wilayah"
                outlined
                :source="store.kabupatens"
                class="col-10 q-my-xs"
                @on-select="(val)=>autocompleteSelected(val, store.kabupatens,'kotakabupaten', 'refKabupaten', 'kota')"
                @clear="()=> {
                  store.pasien.kota=null
                  store.pasien.kecamatan=null
                  store.pasien.kelurahan=null
                }"
              />
              <app-autocomplete-new
                ref="refKecamatan"
                :model="store.pasien.kecamatan"
                label="Kecamatan"
                autocomplete="wilayah"
                option-value="kotakabupaten"
                option-label="wilayah"
                outlined
                :source="store.kecamatans"
                class="col-6 q-my-xs"
                @on-select="(val)=>autocompleteSelected(val, store.kecamatans,'kotakabupaten', 'refKecamatan', 'kecamatan')"
                @clear="()=> {
                  store.pasien.kecamatan=null
                  store.pasien.kelurahan=null
                }"
              />
              <app-autocomplete-new
                ref="refKelurahan"
                :model="store.pasien.kelurahan"
                label="Kelurahan"
                autocomplete="wilayah"
                option-value="kotakabupaten"
                option-label="wilayah"
                outlined
                :source="store.kelurahans"
                class="col-6 q-my-xs"
                @on-select="(val)=>autocompleteSelected(val, store.kelurahans,'kotakabupaten', 'refKelurahan', 'kelurahan')"
                @clear="store.pasien.kelurahan=null"
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
              <q-checkbox v-model="store.domisiliSama" size="sm" />
            </div>

            <app-input-simrs v-model="store.pasien.alamatDomisili" type="textarea" label="Alamat Lengkap" :autofocus="false" :valid="{required: true}" class-tambahan="col-12" />
            <div v-if="store.pasien.kewarganegaraan==='WNI'" class="row q-col-gutter-x-xs">
              <app-input-simrs v-model="store.pasien.rtDomisili" label="RT" :autofocus="false" :valid="{min: 3}" class-tambahan="col-6 q-my-xs" />
              <app-input-simrs v-model="store.pasien.rwDomisili" label="RW" :autofocus="false" :valid="{min: 3}" class-tambahan="col-6 q-my-xs" />
              <app-autocomplete-new
                ref="refNegara"
                :model="store.pasien.negaraDomisili"
                label="Negara"
                autocomplete="wilayah"
                option-value="kd_negara"
                option-label="wilayah"
                outlined
                :source="store.negaras"
                class="col-12 q-my-xs"
              />
              <app-autocomplete-new
                ref="refPropinsi"
                :model="store.pasien.propinsiDomisili"
                label="Propinsi"
                autocomplete="wilayah"
                option-value="propinsi"
                option-label="wilayah"
                outlined
                :source="store.propinsies"
                class="col-12 q-my-xs"
                @on-select="(val)=>autocompleteSelected(val, store.propinsies,'propinsi', 'refPropinsi', 'propinsiDomisili')"
                @clear="()=> {
                  store.pasien.propinsiDomisili=null
                  store.pasien.kotaDomisili=null
                  store.pasien.kecamatanDomisili=null
                  store.pasien.kelurahanDomisili=null
                }"
              />
              <app-autocomplete-new
                ref="refKabupaten"
                :model="store.pasien.kotaDomisili"
                label="kabupaten / kota"
                autocomplete="wilayah"
                option-value="kotakabupaten"
                option-label="wilayah"
                outlined
                :source="store.kabupatens"
                class="col-12 q-my-xs"
                @on-select="(val)=>autocompleteSelected(val, store.kabupatens,'kotakabupaten', 'refKabupaten', 'kotaDomisili')"
                @clear="()=> {
                  store.pasien.kotaDomisili=null
                  store.pasien.kecamatanDomisili=null
                  store.pasien.kelurahanDomisili=null
                }"
              />
              <app-autocomplete-new
                ref="refKecamatan"
                :model="store.pasien.kecamatanDomisili"
                label="Kecamatan"
                autocomplete="wilayah"
                option-value="kotakabupaten"
                option-label="wilayah"
                outlined
                :source="store.kecamatans"
                class="col-12 q-my-xs"
                @on-select="(val)=>autocompleteSelected(val, store.kecamatans,'kotakabupaten', 'refKecamatan', 'kecamatanDomisili')"
                @clear="()=> {
                  store.pasien.kecamatanDomisili=null
                  store.pasien.kelurahanDomisili=null
                }"
              />
              <app-autocomplete-new
                ref="refKelurahan"
                :model="store.pasien.kelurahanDomisili"
                label="Kelurahan"
                autocomplete="wilayah"
                option-value="kotakabupaten"
                option-label="wilayah"
                outlined
                :source="store.kelurahans"
                class="col-8 q-my-xs"
                @on-select="(val)=>autocompleteSelected(val, store.kelurahans,'kotakabupaten', 'refKelurahan', 'kelurahanDomisili')"
                @clear="store.pasien.kelurahanDomisili=null"
              />
              <app-input-simrs v-model="store.pasien.kodeposDomisili" label="Kode Pos" :autofocus="false" class-tambahan="col-4 q-my-xs" />
            </div>
          </div>
        </div>
      </q-card>

      <q-separator />
      <q-card v-for="n in 20" :key="n">
        saf
      </q-card>
    </div>
    <div class="absolute-bottom full-width bg-primary q-px-sm q-pa-sm">
      <div class="flex q-gutter-sm justify-end">
        <q-btn type="reset" label="Reset" color="dark" text-color="white" dense class="q-px-md" />
        <q-btn type="submit" label="Simpan Pasien" color="white" text-color="black" dense class="q-px-md" />
      </div>
    </div>
  </q-form>
</template>

<script setup>
import { api } from 'src/boot/axios'
import { useFormPendaftaranRanapStore } from 'src/stores/simrs/pendaftaran/ranap/formpendaftaran'
import { onBeforeMount, onMounted, ref, watch } from 'vue'
const store = useFormPendaftaranRanapStore()

const weather = ref(null)
const formRef = ref(null)
const refNorm = ref(null)
const refKelurahan = ref(null)
const onSubmit = () => {
  console.log('simpan')
}

const onReset = () => {
  // console.log('reset', refNorm.value)
  formRef.value.resetValidation()
  refNorm.value.appInputSimrs.focus()
}
onMounted(() => {
  // console.log('onMounted', Object.keys(store.pasien))
  onReset()
  Promise.all([
    store.getKelamin(),
    store.getSapaan(),
    store.getPendidikan(),
    store.getAgama(),
    store.getBahasa(),
    store.getStatusPernikahan(),
    store.getPekerjaan(),
    gantiKewarganegaraan('WNI')
  ])
})

onBeforeMount(() => {
  store.initForm()
})

const gantiKewarganegaraan = e => {
  if (e === 'WNI') {
    store.paramWilayah.kd_negara = '62'
    store.getNegara()
  }
  else {
    store.paramWilayah.kd_negara = ''
  }
}

const cekKtp = (e) => {
  // console.log('e', e)
  // Output NIK tidak valid
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

    store.getProvinces()
      .then(() => {
        store.pasien.propinsi = prov
        store.pasien.propinsiDomisili = prov
        store.getKota()
          .then(() => {
            store.pasien.kota = kabkota
            store.pasien.kotaDomisili = kabkota
            store.getKec()
              .then(() => {
                store.pasien.kecamatan = kec
                store.pasien.kecamatanDomisili = kec
                store.getKels()
                  .then(() => {
                    store.pasien.kelurahan = null
                    store.pasien.kelurahanDomisili = null
                  })
              })
          })
      })

    const tahun = parseInt(thnNik) < parseInt(N) ? `20${thnNik}` : `19${thnNik}`
    const tglAsli = tglNik > 40 ? tglNik - 40 : tglNik
    const tgl = tglAsli < 10 ? `0${tglAsli}` : tglAsli

    // update store pasien
    store.pasien.kelamin = klmn
    store.pasien.tanggallahir = `${tahun}-${blnNik}-${tgl}`
  }
}

const autocompleteSelected = (val, fromArr, objVal, el, model) => {
  // console.log('val', val)
  // console.log('arr', fromArr)
  // console.log('el', el)
  // console.log('model', model)
  const index = fromArr.findIndex(x => x[objVal] === val)
  console.log('index', index)
  store.setForm(model, val)
  if (model === 'kelurahan') {
    if (store.domisiliSama) store.pasien.kelurahanDomisili = val
  }
  if (model === 'kecamatan') {
    store.paramWilayah.kd_kecamatan = val
    store.domisiliSama ? store.pasien.kecamatanDomisili = val : store.pasien.kecamatanDomisili = null
    store.getKels()
      .then(() => {
        store.pasien.kelurahan = null
        if (store.domisiliSama) store.pasien.kelurahanDomisili = null
      })
  }
  if (model === 'kota') {
    store.paramWilayah.kd_kotakabupaten = val
    store.getKec()
      .then(() => {
        store.pasien.kecamatan = null
        store.pasien.kelurahan = null
        if (store.domisiliSama) {
          store.pasien.kecamatanDomisili = null
          store.pasien.kelurahanDomisili = null
        }
      })
  }
  if (model === 'propinsi') {
    store.paramWilayah.kd_propinsi = val
    store.getKota()
      .then(() => {
        store.pasien.kota = null
        store.pasien.kecamatan = null
        store.pasien.kelurahan = null
        if (store.domisiliSama) {
          store.pasien.kotaDomisili = null
          store.pasien.kecamatanDomisili = null
          store.pasien.kelurahanDomisili = null
        }
      })
  }

  // if (el === 'refKelurahan') refKelurahan.value.$refs.refAuto.blur()

  // DOMISILI
  if (model === 'kecamatanDomisili') {
    store.paramWilayah.kd_kecamatan = val
    store.getKels()
      .then(() => {
        store.pasien.kelurahanDomisili = null
      })
  }
  if (model === 'kota') {
    store.paramWilayah.kd_kotakabupaten = val
    store.getKec()
      .then(() => {
        // if (store.domisiliSama) {
        store.pasien.kecamatanDomisili = null
        store.pasien.kelurahanDomisili = null
        // }
      })
  }
  if (model === 'propinsi') {
    store.paramWilayah.kd_propinsi = val
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

watch(() => store.pasien.noktp, (val) => {
  // console.log('watch old', old)
  console.log('watch new', val)
  if (val !== null && val !== '') {
    cekKtp(val)
  }
}, { deep: true })
</script>

<style lang="scss" scoped>
.br-1 {
  border-right: 1px solid rgba(128, 128, 128, 0.2);
}
</style>
