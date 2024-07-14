<template>
  <q-form ref="formRef" @submit="onSubmit" @reset="onReset" class="fit bg-white">
    <div class="fit row q-col-gutter-x-sm">
      <div class="col-2 q-pa-sm q-pl-md br-1">
        <app-avatar-pasien width="100%" />
      </div>

      <!-- <q-separator vertical spaced class="q-pa-none" /> -->
      <!-- Mulai input -->
      <div class="col-3 q-pr-sm q-pt-md br-1">
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
      </div>

      <!-- <q-separator vertical spaced /> -->

      <div class="col-3 q-pr-sm q-pt-md br-1">
        <div>
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
        <div class="flex q-gutter-sm full-width q-mb-sm q-mt-xs">
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
            class="col-8"
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
            class="col-12"
          />
        </div>

        <div class="row q-mb-xs">
          <app-input-simrs v-model="store.pasien.notelp" label="No. Telp" :autofocus="false" class-tambahan="col-10" />
          <app-input-simrs v-model="store.pasien.nohp" label="No. HP" :autofocus="false" class-tambahan="col-10" :valid="{required: true}" />
        </div>
      </div>

      <!-- <q-separator vertical spaced class="q-pa-none" /> -->
      <div class="col-4 q-pt-md">
        <div class="row q-col-gutter-x-sm">
          <app-input-simrs v-model="store.pasien.alamat" type="textarea" label="Alamat Lengkap" :autofocus="false" :valid="{required: true}" class-tambahan="col-12" />
        </div>
        <div v-if="store.pasien.kewarganegaraan==='WNI'" class="row q-col-gutter-x-sm">
          <app-input-simrs v-model="store.pasien.rt" label="RT" :autofocus="false" :valid="{min: 3}" class-tambahan="col-5" />
          <app-input-simrs v-model="store.pasien.rw" label="RW" :autofocus="false" :valid="{min: 3}" class-tambahan="col-5" />
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
            class="col-6 q-my-xs"
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
            class="col-6 q-my-xs"
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
          />
        </div>
      </div>
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
import { useFormPendaftaranRanapStore } from 'src/stores/simrs/pendaftaran/ranap/formpendaftaran'
import { onBeforeMount, onMounted, ref } from 'vue'
const store = useFormPendaftaranRanapStore()

const formRef = ref(null)
const refNorm = ref(null)
const onSubmit = () => {
  console.log('simpan')
}

const onReset = () => {
  // console.log('reset', refNorm.value)
  formRef.value.resetValidation()
  refNorm.value.appInputSimrs.focus()
}
onMounted(() => {
  console.log('onMounted', Object.keys(store.pasien))
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

const cekKtp = e => {
  // console.log('e', e)
  // Output NIK tidak valid
  const digit = e?.toString().length
  if (digit !== 16) {
    console.log('nik tidak valid')
  }
  else {
    const nik = e
    const N = (new Date()).getFullYear().toString().substr(-2) // tahun sekarang
    const prov = nik.substring(0, 2)
    const kabkota = nik.substring(2, 4)
    const kec = nik.substring(4, 6)
    const tglNik = nik.substring(6, 8) // tanggal NIK
    const blnNik = nik.substring(8, 10)
    const thnNik = nik.substring(10, 12) // tahun NIK
    // const urut = nik.substring(12, 16) // nourut ktp sesuai tgl lahir di ktp

    const klmn = tglNik > 40 ? 'Perempuan' : 'Laki-laki'

    // console.log('nik valid', N)
    // console.log('nik thn', thnNik)
    // console.log('nik tgl', tglNik)
    // console.log('nik bln', blnNik)
    console.log('nik prov', prov)
    console.log('nik kabkota', kabkota)
    console.log('nik kec', kec)
    console.log('nik klmn', klmn)

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
        store.getKota()
          .then(() => {
            store.pasien.kota = kabkota
            store.getKec()
              .then(() => {
                store.pasien.kecamatan = kec
                store.getKels()
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
</script>

<style lang="scss" scoped>
.br-1 {
  border-right: 1px solid rgba(128, 128, 128, 0.2);
}
</style>
