<template>
  <div>
    <q-card>
      <q-card-section>
        <div class="f-14 text-weight-bold">
          Registrasi / Kunjungan
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <div class="row fit q-col-gutter-sm q-mb-md">
          <!-- kiri -->
          <div class="col-6">
            <!-- no Registrasi -->
            <div class="row q-col-gutter-sm items-center q-mb-xs">
              <div class="col-4">
                Nomor Registrasi
              </div>
              <div class="col-8">
                : {{ store.form.noreg }}
              </div>
            </div>
            <!-- no Registrasi -->
            <div class="row q-col-gutter-sm items-center q-mb-xs">
              <div class="col-12">
                <app-autocomplete
                  v-model="store.form.asalrujukan"
                  label="Asal Rujukan"
                  autocomplete="asalrujukan"
                  option-value="asalrujukan"
                  option-label="asalrujukan"
                  :filled="false"
                  :source="store.asalrujukans"
                  :loading="store.loading"
                  :disable="pasien.form.barulama!=='baru'"
                  :rules="[val => (!!val) || 'Harap diisi',]"
                />
              </div>
            </div>
            <!-- kartu / karcis -->
            <div class="row q-col-gutter-sm items-center q-mb-xs">
              <div class="col-6">
                <app-autocomplete
                  v-model="store.form.asalrujukan"
                  label="Flag Kartu"
                  autocomplete="asalrujukan"
                  option-value="asalrujukan"
                  option-label="asalrujukan"
                  :filled="false"
                  :source="store.asalrujukans"
                  :loading="store.loading"
                  :disable="pasien.form.barulama!=='baru'"
                  :rules="[val => (!!val) || 'Harap diisi',]"
                />
              </div>
              <div class="col-6">
                <app-input
                  v-model="store.form.karcis"
                  label="Karcis"
                  :filled="false"
                  :disable="pasien.form.barulama!=='baru'"
                />
              </div>
            </div>
            <!-- DPJP -->
            <div class="row q-col-gutter-sm items-center q-mb-xs">
              <div class="col-12">
                <app-autocomplete
                  v-model="store.form.dpjp"
                  label="DPJP"
                  autocomplete="asalrujukan"
                  option-value="asalrujukan"
                  option-label="asalrujukan"
                  :filled="false"
                  :source="store.dpjps"
                  :loading="store.loading"
                  :disable="pasien.form.barulama!=='baru'"
                  :rules="[val => (!!val) || 'Harap diisi',]"
                />
              </div>
            </div>
          </div>
          <!-- kanan -->
          <div class="col-6">
            <!-- poli tujuan -->
            <div class="row q-col-gutter-md items-center q-mb-xs">
              <div class="col-12">
                <app-autocomplete
                  v-model="store.form.kodepoli"
                  label="Poli Tujuan"
                  autocomplete="polirs"
                  option-value="kodepoli"
                  option-label="polirs"
                  :filled="false"
                  :source="store.polis"
                  :loading="store.loading"
                  :disable="pasien.form.barulama!=='baru'"
                  :rules="[val => (!!val) || 'Harap diisi',]"
                />
              </div>
            </div>
            <!-- sistem bayar -->
            <div class="row q-col-gutter-md items-center q-mb-xs">
              <div class="col-12">
                <app-autocomplete
                  v-model="store.display.groupsistembayar"
                  label="Sistem bayar"
                  autocomplete="groupsistembayar"
                  option-value="groupsistembayar"
                  option-label="groupsistembayar"
                  :filled="false"
                  :source="store.sistembayars"
                  :loading="store.loading"
                  :disable="pasien.form.barulama!=='baru'"
                  :rules="[val => (!!val) || 'Harap diisi',]"
                  @selected="setSistembayar"
                />
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>
<script setup>
import { useRegistrasiPasienUmumStore } from 'src/stores/simrs/pendaftaran/form/umum/registrasi'
import { usePendaftaranPasienStore } from 'src/stores/simrs/pendaftaran/form/pasien/pasien'
const pasien = usePendaftaranPasienStore()
const store = useRegistrasiPasienUmumStore()
store.getInitialData()
function setSistembayar(val) {
  store.setForm('sistembayar', val)
  console.log('form', store.form)
}
</script>
