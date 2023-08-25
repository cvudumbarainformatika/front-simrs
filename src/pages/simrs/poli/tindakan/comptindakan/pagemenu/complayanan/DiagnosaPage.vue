<template>
  <div class="full-height full-width">
    <div class="row full-height">
      <div class="col-6 full-height">
        <div class="row q-pa-md q-col-gutter-xs">
          <div class="col-3">
            <div>Diagnosa</div>
          </div>
          <div class="col-9">
            <q-input
              label="Cari ICD"
              dense
              outlined
              standout="bg-yellow-3"
              :rules="[val => !!val || 'Harus diisi']"
              hide-bottom-space
            />
          </div>
          <div class="col-3">
            <div>Keterangan</div>
          </div>
          <div class="col-9">
            <q-input
              label="Keterangan"
              autogrow
              outlined
              standout="bg-yellow-3"
              :rules="[val => !!val || 'Harus diisi']"
              hide-bottom-space
            />
          </div>
          <div class="col-3">
            <div>Kasus Baru?</div>
          </div>
          <div class="col-9">
            <q-radio
              v-model="shape"
              val="line"
              label="Line"
            />
            <q-radio
              v-model="shape"
              val="rectangle"
              label="Rectangle"
            />
          </div>
        </div>
      </div>
      <div class="col-6 bg-red">
        sadas
      </div>
    </div>
  </div>
</template>
