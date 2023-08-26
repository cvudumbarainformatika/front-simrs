<template>
  <div class="q-pa-md text-weight-bold">
    FORM Tindakan
    <!-- <div class="f-10 text-weight-light">
      <em>form Tindakan sekaligus pensimulasian INACBG </em>
    </div> -->
  </div>
  <q-separator />
  <q-scroll-area style="height: calc(100% - 50px);">
    <q-form
      class="row q-pa-md q-col-gutter-sm"
      @submit="onSubmit"
      @reset="onReset"
    >
      <div class="col-9">
        <q-input
          v-model="store.formtindakan.tindakan"
          label="Cari Tindakan"
          dense
          outlined
          standout="bg-yellow-3"
          :rules="[val => !!val || 'Harus diisi']"
          hide-bottom-space
        />
      </div>
      <div class="col-3">
        <q-input
          v-model="store.formtindakan.jumlah"
          label="Qty"
          dense
          outlined
          standout="bg-yellow-3"
          :rules="[val => !!val || 'Harus diisi',
                   val => !isNaN(val) || 'Harus pakai Nomor',
          ]"
          hide-bottom-space
        />
      </div>
      <div class="col-12">
        <q-input
          v-model="store.formtindakan.keterangan"
          label="Keterangan"
          autogrow
          outlined
          standout="bg-yellow-3"
          hide-bottom-space
        />
      </div>
      <div class="col-12">
        <q-separator class="q-my-md" />
      </div>
      <div class="col-12 text-right">
        <q-btn
          label="Simpan Tindakan"
          color="primary"
          type="submit"
        />
      </div>
    </q-form>
    <!-- <div class="q-pb-xl" /> -->
  </q-scroll-area>
</template>

<script setup>
import { useLayananPoli } from 'src/stores/simrs/pelayanan/poli/layanan'

const store = useLayananPoli()

function onSubmit() {
  console.log('ok')
}
</script>
