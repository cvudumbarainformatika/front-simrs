<template>
  <div>
    <app-card
      title="Form Registrasi Pegawai"
      desc="Registrasi pegawai menjadi user Sigarang"
    >
      <template #content>
        <!-- <form ref="formReff" @submit="onSubmit" @reset="onReset"> -->
        <div class="row">
          <div class="col-3">
            Nama
          </div>
          <div class="col">
            {{ store.pegawai.nama }}
          </div>
        </div>
        <div class="row">
          <div class="col-3">
            NIP
          </div>
          <div class="col">
            {{ store.pegawai.nip }}
          </div>
        </div>
        <div class="row">
          <div class="col-3">
            Email
          </div>
          <div
            v-if="store.pegawai.email===''"
            class="col"
          >
            <div class="row items-center">
              <span class="q-mr-lg cursor-pointer"><strong>tidak ada</strong>
                <q-popup-edit
                  v-slot="scope"
                  v-model="store.pegawai.email"
                  auto-save
                >
                  <app-input
                    v-model="scope.value"
                    type="email"
                    label="email"
                    dense
                    autofocus
                    counter
                    @keyup.enter="scope.set"
                  />
                </q-popup-edit>
              </span>
              <q-icon
                size="16px"
                name="icon-mat-help_outline"
                color="info"
                class="cursor-pointer"
              >
                <q-tooltip
                  anchor="top middle"
                  self="bottom middle"
                  :offset="[10, 10]"
                >
                  <strong>Tidak ada email ?</strong> <br>
                  <em>Klik 2 untuk input email</em><br>
                  <strong>Namun,</strong><br>
                  <em>input email disini</em><br>
                  <em>tidak akan masuk ke data kepegaiawan </em>
                  <strong>Disarankan,</strong><br>
                  <em>memasukkan email terlebih dahulu </em>
                  <em>di aplikasi data kepegawaian </em>
                </q-tooltip>
              </q-icon>
            </div>
          </div>
          <div
            v-else
            class="col cursor-pointer"
          >
            {{ store.pegawai.email }}
            <q-popup-edit
              v-slot="scope"
              v-model="store.pegawai.email"
              auto-save
            >
              <app-input
                v-model="scope.value"
                type="email"
                label="email"
                dense
                autofocus
                counter
                @keyup.enter="scope.set"
              />
            </q-popup-edit>
          </div>
        </div>
        <div class="row items-center">
          <div class="col-3 ">
            Level
          </div>
          <div class="col">
            <app-autocomplete-new
              v-model="store.pegawai.role"
              option-value="id"
              option-label="nama"
              autocomplete="nama"
              outlined
              label="Level"
              :source="setting.levels"
            />
          </div>
        </div>
        <div class="row items-center">
          <div class="col-3">
            Username
          </div>
          <div class="col">
            <app-input
              v-model="store.pegawai.username"
              outlined
              label="Username"
            />
          </div>
        </div>
        <div class="row items-center">
          <div class="col-3">
            Password
          </div>
          <div class="col">
            <app-input
              v-model="store.pegawai.password"
              outlined
              label="Input Password"
              type="password"
            />
          </div>
        </div>
        <div class="row items-center">
          <div class="col-3">
            Konfirmasi Password
          </div>
          <div class="col">
            <app-input
              v-model="store.pegawai.password_confirmation"
              outlined
              label="Konfirmasi Password"
              type="password"
            />
          </div>
        </div>

        <div class="row q-col-gutter-md q-my-sm">
          <div class="text-right col-9" />
          <div class="text-right col">
            <div class="row">
              <div class="col">
                <!-- <app-btn dense type="reset" color="black" label="Batal" /> -->
                <app-btn
                  dense
                  color="black"
                  label="Batal"
                  :loading="store.loading"
                  @click="onReset"
                />
              </div>
              <div class="col">
                <!-- <app-btn dense type="submit" color="primary" label="Kirim" :loading="store.loading" /> -->
                <app-btn
                  dense
                  color="primary"
                  label="Kirim"
                  :loading="store.loading"
                  @click="onSubmit"
                />
              </div>
            </div>
          </div>
        </div>
        <!-- </form> -->
      </template>
    </app-card>
  </div>
</template>
<script setup>
import { useAdminPegawaiStore } from 'src/stores/simrs/logistik/sigarang/admin/pegawai/pegawai'
import { useSettingsStore } from 'src/stores/simrs/logistik/sigarang/settings/setting'

const store = useAdminPegawaiStore()
const setting = useSettingsStore()
const onSubmit = () => {
  store.userRegistration()
  console.log(store.pegawai)
}
const onReset = () => {
  store.pegawai = null
}
</script>
