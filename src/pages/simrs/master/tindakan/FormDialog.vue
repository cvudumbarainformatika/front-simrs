<template>
  <q-dialog>
    <q-card
      class="lebar"
    >
      <q-card-section>
        <div class="f-14 text-weight-bold">
          Form Tindakan
        </div>
        <div class="title-desc">
          Input data Tindakan
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <q-form
          @submit="onSubmit"
          @reset="onReset"
        >
          <div class="row q-col-gutter-md q-mb-sm">
            <div class="col-md-6 col-xs-12">
              <app-input
                v-model="store.form.kdtindakan"
                label="Kode Tindakan"
                outlined
                valid
                :loading="store.loading"
                readonly
              />
            </div>
            <div class="col-md-6 col-xs-12">
              <app-input
                v-model="store.form.nmtindakan"
                label="Nama Tindakan"
                outlined
                :loading="store.loading"
                :disable="store.loading || store.edit"
                :autofocus="!store.edit"
              />
            </div>
          </div>
          <div class="row q-col-gutter-md q-mb-sm">
            <div class="col-md-3 col-xs-12">
              <app-input
                v-model="store.form.js3"
                valid
                label="JS Kelas 3"
                outlined
                :loading="store.loading"
                :disable="store.loading"
                :autofocus="store.edit"
                @update:model-value="setJs3"
              />
            </div>
            <div class="col-md-3 col-xs-12">
              <app-input
                v-model="store.form.jp3"
                valid
                label="JP Kelas 3"
                outlined
                :loading="store.loading"
                :disable="store.loading"
                @update:model-value="setJp3"
              />
            </div>
            <div class="col-md-3 col-xs-12">
              <app-input
                v-model="store.form.habispake3"
                valid
                label="Habis Pakai Kelas 3"
                outlined
                :loading="store.loading"
                :disable="store.loading"
                @update:model-value="setHabispake3"
              />
            </div>
            <div class="col-md-3 col-xs-12">
              <app-input
                v-model="store.form.tarif3"
                valid
                label="Tarif Kelas 3"
                outlined
                :loading="store.loading"
                readonly
              />
            </div>
          </div>
          <div class="row q-col-gutter-md q-mb-sm">
            <div class="col-md-3 col-xs-12">
              <app-input
                v-model="store.form.js2"
                valid
                label="JS Kelas 2"
                outlined
                :loading="store.loading"
                :disable="store.loading"
                :autofocus="store.edit"
                @update:model-value="setJs2"
              />
            </div>
            <div class="col-md-3 col-xs-12">
              <app-input
                v-model="store.form.jp2"
                valid
                label="JP Kelas 2"
                outlined
                :loading="store.loading"
                :disable="store.loading"
                @update:model-value="setJp2"
              />
            </div>
            <div class="col-md-3 col-xs-12">
              <app-input
                v-model="store.form.habispake2"
                valid
                label="Habis Pakai Kelas 2"
                outlined
                :loading="store.loading"
                :disable="store.loading"
                @update:model-value="setHabispake2"
              />
            </div>
            <div class="col-md-3 col-xs-12">
              <app-input
                v-model="store.form.tarif2"
                valid
                label="Tarif Kelas 2"
                outlined
                :loading="store.loading"
                readonly
              />
            </div>
          </div>
          <div class="row q-col-gutter-md q-mb-sm">
            <div class="col-md-3 col-xs-12">
              <app-input
                v-model="store.form.js1"
                valid
                label="JS Kelas 1"
                outlined
                :loading="store.loading"
                :disable="store.loading"
                :autofocus="store.edit"
                @update:model-value="setJs1"
              />
            </div>
            <div class="col-md-3 col-xs-12">
              <app-input
                v-model="store.form.jp1"
                valid
                label="JP Kelas 1"
                outlined
                :loading="store.loading"
                :disable="store.loading"
                @update:model-value="setJp1"
              />
            </div>
            <div class="col-md-3 col-xs-12">
              <app-input
                v-model="store.form.habispake1"
                valid
                label="Habis Pakai Kelas 1"
                outlined
                :loading="store.loading"
                :disable="store.loading"
                @update:model-value="setHabispake1"
              />
            </div>
            <div class="col-md-3 col-xs-12">
              <app-input
                v-model="store.form.tarif1"
                valid
                label="Tarif Kelas 1"
                outlined
                :loading="store.loading"
                readonly
              />
            </div>
          </div>
          <div class="row q-col-gutter-md q-mb-sm">
            <div class="col-md-3 col-xs-12">
              <app-input
                v-model="store.form.jsutama"
                valid
                label="JS Utama"
                outlined
                :loading="store.loading"
                :disable="store.loading"
                :autofocus="store.edit"
                @update:model-value="setJsUtama"
              />
            </div>
            <div class="col-md-3 col-xs-12">
              <app-input
                v-model="store.form.jputama"
                valid
                label="JP Utama"
                outlined
                :loading="store.loading"
                :disable="store.loading"
                @update:model-value="setJpUtama"
              />
            </div>
            <div class="col-md-3 col-xs-12">
              <app-input
                v-model="store.form.habispakeutama"
                valid
                label="Habis Pakai Kelas Utama"
                outlined
                :loading="store.loading"
                :disable="store.loading"
                @update:model-value="setHabispakeutama"
              />
            </div>
            <div class="col-md-3 col-xs-12">
              <app-input
                v-model="store.form.tarifutama"
                valid
                label="Tarif Kelas utama"
                outlined
                :loading="store.loading"
                readonly
              />
            </div>
          </div>
          <div class="row q-col-gutter-md q-mb-sm">
            <div class="col-md-3 col-xs-12">
              <app-input
                v-model="store.form.jsvip"
                valid
                label="JS VIP"
                outlined
                :loading="store.loading"
                :disable="store.loading"
                :autofocus="store.edit"
                @update:model-value="setJsVip"
              />
            </div>
            <div class="col-md-3 col-xs-12">
              <app-input
                v-model="store.form.jpvip"
                valid
                label="JP VIP"
                outlined
                :loading="store.loading"
                :disable="store.loading"
                @update:model-value="setJpVip"
              />
            </div>
            <div class="col-md-3 col-xs-12">
              <app-input
                v-model="store.form.habispakevip"
                valid
                label="Habis Pakai Kelas Vip"
                outlined
                :loading="store.loading"
                :disable="store.loading"
                @update:model-value="setHabispakevip"
              />
            </div>
            <div class="col-md-3 col-xs-12">
              <app-input
                v-model="store.form.tarifvip"
                valid
                label="Tarif Kelas vip"
                outlined
                :loading="store.loading"
                readonly
              />
            </div>
          </div>
          <div class="row q-col-gutter-md q-mb-sm">
            <div class="col-md-3 col-xs-12">
              <app-input
                v-model="store.form.jsvvip"
                valid
                label="JS VVIP"
                outlined
                :loading="store.loading"
                :disable="store.loading"
                :autofocus="store.edit"
                @update:model-value="setJsVvip"
              />
            </div>
            <div class="col-md-3 col-xs-12">
              <app-input
                v-model="store.form.jpvvip"
                valid
                label="JP VVIP"
                outlined
                :loading="store.loading"
                :disable="store.loading"
                @update:model-value="setJpVvip"
              />
            </div>
            <div class="col-md-3 col-xs-12">
              <app-input
                v-model="store.form.habispakevvip"
                valid
                label="Habis Pakai Kelas Vvip"
                outlined
                :loading="store.loading"
                :disable="store.loading"
                @update:model-value="setHabispakevvip"
              />
            </div>
            <div class="col-md-3 col-xs-12">
              <app-input
                v-model="store.form.tarifvvip"
                valid
                label="Tarif Kelas vvip"
                outlined
                :loading="store.loading"
                readonly
              />
            </div>
          </div>
          <q-separator class="q-my-md" />
          <div class="text-right">
            <app-btn
              type="reset"
              color="dark"
              label="Cancel"
              class="q-mr-md"
              :loading="store.loading"
              :disable="store.loading"
            />
            <app-btn
              label="Simpan"
              :loading="store.loading"
              :disable="store.loading"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup>

import { useMasterTindakanJsJpStore } from 'src/stores/simrs/master/tindakan/tindakan'
const store = useMasterTindakanJsJpStore()
// set tarif start
function setJs3(evt) {
  console.log('form js 3', evt, isNaN(evt), parseInt(evt))
  const val = !isNaN(evt) && evt !== '' ? parseInt(evt) : 0
  const jp = !isNaN(store.form.jp3) && store.form.jp3 !== '' ? parseInt(store.form.jp3) : 0
  const habispake = !isNaN(store.form.habispake3) && store.form.habispake3 !== '' ? parseInt(store.form.habispake3) : 0
  store.setForm('js3', val)
  store.setForm('tarif3', val + jp + habispake)
}
function setJp3(evt) {
  const val = !isNaN(evt) && evt !== '' ? parseInt(evt) : 0
  const js = !isNaN(store.form.js3) && store.form.js3 !== '' ? parseInt(store.form.js3) : 0
  const habispake = !isNaN(store.form.habispake3) && store.form.habispake3 !== '' ? parseInt(store.form.habispake3) : 0
  store.setForm('jp3', val)
  store.setForm('tarif3', val + js + habispake)
}
function setHabispake3(evt) {
  const val = !isNaN(evt) && evt !== '' ? parseInt(evt) : 0
  const js = !isNaN(store.form.js3) && store.form.js3 !== '' ? parseInt(store.form.js3) : 0
  const jp = !isNaN(store.form.jp3) && store.form.jp3 !== '' ? parseInt(store.form.jp3) : 0
  store.setForm('habispake3', val)
  store.setForm('tarif3', val + js + jp)
}
//
function setJs2(evt) {
  const val = !isNaN(evt) && evt !== '' ? parseInt(evt) : 0
  const jp = !isNaN(store.form.jp2) && store.form.jp2 !== '' ? parseInt(store.form.jp2) : 0
  const habispake = !isNaN(store.form.habispake2) && store.form.habispake2 !== '' ? parseInt(store.form.habispake2) : 0
  store.setForm('js2', val)
  store.setForm('tarif2', val + jp + habispake)
}
function setJp2(evt) {
  const val = !isNaN(evt) && evt !== '' ? parseInt(evt) : 0
  const js = !isNaN(store.form.js2) && store.form.js2 !== '' ? parseInt(store.form.js2) : 0
  const habispake = !isNaN(store.form.habispake2) && store.form.habispake2 !== '' ? parseInt(store.form.habispake2) : 0
  store.setForm('jp2', val)
  store.setForm('tarif2', val + js + habispake)
}
function setHabispake2(evt) {
  const val = !isNaN(evt) && evt !== '' ? parseInt(evt) : 0
  const js = !isNaN(store.form.js2) && store.form.js2 !== '' ? parseInt(store.form.js2) : 0
  const jp = !isNaN(store.form.jp2) && store.form.jp2 !== '' ? parseInt(store.form.jp2) : 0
  store.setForm('habispake2', val)
  store.setForm('tarif2', val + js + jp)
}
//
function setJs1(evt) {
  const val = !isNaN(evt) && evt !== '' ? parseInt(evt) : 0
  const jp = !isNaN(store.form.jp1) && store.form.jp1 !== '' ? parseInt(store.form.jp1) : 0
  const habispake = !isNaN(store.form.habispake1) && store.form.habispake1 !== '' ? parseInt(store.form.habispake1) : 0
  store.setForm('js1', val)
  store.setForm('tarif1', val + jp + habispake)
}
function setJp1(evt) {
  const val = !isNaN(evt) && evt !== '' ? parseInt(evt) : 0
  const js = !isNaN(store.form.js1) && store.form.js1 !== '' ? parseInt(store.form.js1) : 0
  const habispake = !isNaN(store.form.habispake1) && store.form.habispake1 !== '' ? parseInt(store.form.habispake1) : 0
  store.setForm('jp1', val)
  store.setForm('tarif1', val + js + habispake)
}
function setHabispake1(evt) {
  const val = !isNaN(evt) && evt !== '' ? parseInt(evt) : 0
  const js = !isNaN(store.form.js1) && store.form.js1 !== '' ? parseInt(store.form.js1) : 0
  const jp = !isNaN(store.form.jp1) && store.form.jp1 !== '' ? parseInt(store.form.jp1) : 0
  store.setForm('habispake1', val)
  store.setForm('tarif1', val + js + jp)
}
//
function setJsUtama(evt) {
  const val = !isNaN(evt) && evt !== '' ? parseInt(evt) : 0
  const jp = !isNaN(store.form.jputama) && store.form.jputama !== '' ? parseInt(store.form.jputama) : 0
  const habispake = !isNaN(store.form.habispakeutama) && store.form.habispakeutama !== '' ? parseInt(store.form.habispakeutama) : 0
  store.setForm('jsutama', val)
  store.setForm('tarifutama', val + jp + habispake)
}
function setJpUtama(evt) {
  const val = !isNaN(evt) && evt !== '' ? parseInt(evt) : 0
  const js = !isNaN(store.form.jsutama) && store.form.jsutama !== '' ? parseInt(store.form.jsutama) : 0
  const habispake = !isNaN(store.form.habispakeutama) && store.form.habispakeutama !== '' ? parseInt(store.form.habispakeutama) : 0
  store.setForm('jputama', val)
  store.setForm('tarifutama', val + js + habispake)
}
function setHabispakeutama(evt) {
  const val = !isNaN(evt) && evt !== '' ? parseInt(evt) : 0
  const js = !isNaN(store.form.jsutama) && store.form.jsutama !== '' ? parseInt(store.form.jsutama) : 0
  const jp = !isNaN(store.form.jputama) && store.form.jputama !== '' ? parseInt(store.form.jputama) : 0
  store.setForm('habispakeutama', val)
  store.setForm('tarifutama', val + js + jp)
}
//
function setJsVip(evt) {
  const val = !isNaN(evt) && evt !== '' ? parseInt(evt) : 0
  const jp = !isNaN(store.form.jpvip) && store.form.jpvip !== '' ? parseInt(store.form.jpvip) : 0
  const habispake = !isNaN(store.form.habispakevip) && store.form.habispakevip !== '' ? parseInt(store.form.habispakevip) : 0
  store.setForm('jsvip', val)
  store.setForm('tarifvip', val + jp + habispake)
}
function setJpVip(evt) {
  const val = !isNaN(evt) && evt !== '' ? parseInt(evt) : 0
  const js = !isNaN(store.form.jsvip) && store.form.jsvip !== '' ? parseInt(store.form.jsvip) : 0
  const habispake = !isNaN(store.form.habispakevip) && store.form.habispakevip !== '' ? parseInt(store.form.habispakevip) : 0
  store.setForm('jpvip', val)
  store.setForm('tarifvip', val + js + habispake)
}
function setHabispakevip(evt) {
  const val = !isNaN(evt) && evt !== '' ? parseInt(evt) : 0
  const js = !isNaN(store.form.jsvip) && store.form.jsvip !== '' ? parseInt(store.form.jsvip) : 0
  const jp = !isNaN(store.form.jpvip) && store.form.jpvip !== '' ? parseInt(store.form.jpvip) : 0
  store.setForm('habispakevip', val)
  store.setForm('tarifvip', val + js + jp)
}
//
function setJsVvip(evt) {
  const val = !isNaN(evt) && evt !== '' ? parseInt(evt) : 0
  const jp = !isNaN(store.form.jpvvip) && store.form.jpvvip !== '' ? parseInt(store.form.jpvvip) : 0
  const habispake = !isNaN(store.form.habispakevvip) && store.form.habispakevvip !== '' ? parseInt(store.form.habispakevvip) : 0
  store.setForm('jsvvip', val)
  store.setForm('tarifvvip', val + jp + habispake)
}
function setJpVvip(evt) {
  const val = !isNaN(evt) && evt !== '' ? parseInt(evt) : 0
  const js = !isNaN(store.form.jsvvip) && store.form.jsvvip !== '' ? parseInt(store.form.jsvvip) : 0
  const habispake = !isNaN(store.form.habispakevvip) && store.form.habispakevvip !== '' ? parseInt(store.form.habispakevvip) : 0
  store.setForm('jpvvip', val)
  store.setForm('tarifvvip', val + js + habispake)
}
function setHabispakevvip(evt) {
  const val = !isNaN(evt) && evt !== '' ? parseInt(evt) : 0
  const js = !isNaN(store.form.jsvvip) && store.form.jsvvip !== '' ? parseInt(store.form.jsvvip) : 0
  const jp = !isNaN(store.form.jpvvip) && store.form.jpvvip !== '' ? parseInt(store.form.jpvvip) : 0
  store.setForm('habispakevvip', val)
  store.setForm('tarifvvip', val + js + jp)
}
// set tarif end
// simpan
const onSubmit = () => {
  console.log('simpan', store.form)
  store.saveForm()
}
const onReset = () => {
  store.setOpen()
  // myDialog(coba, 'anu coab')
}
</script>
<style lang="scss" scoped>
.lebar{
  max-width:80vw;
  width:60vw;
}
</style>
