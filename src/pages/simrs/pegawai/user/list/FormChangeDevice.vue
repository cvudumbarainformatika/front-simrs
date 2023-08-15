<template>
  <q-dialog full-width>
    <q-card
      class="itu full-width"
    >
      <q-card-section>
        <div class="f-14 text-weight-bold">
          Form Input
        </div>
        <div class="title-desc">
          Input Ganti Perangkat
        </div>
      </q-card-section>
      <q-card-section>
        <q-form
          ref="formReff"
          @submit="onSubmit"
          @reset="onReset"
        >
          <div class="row q-col-gutter-md">
            <div class="col-12">
              Apakah <strong> {{ store.form.nama }}</strong> meminta untuk ganti device?
            </div>
          </div>

          <q-separator class="q-my-md" />
          <div class="text-right">
            <app-btn
              type="reset"
              color="dark"
              label="Cancel"
              class="q-mr-md"
            />
            <app-btn
              label="Simpan"
              :loading="store.loading"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { useUserStore } from 'src/stores/simrs/pegawai/user/user'
const store = useUserStore()

const onSubmit = () => {
  store.saveForm().then(() => {
    store.setOpen()
  }).catch(() => {
    store.setOpen()
  })
}
const onReset = () => {
  store.setOpen()
}
</script>
<style lang="scss" scoped>
.itu{
  width: 75vw !important;
}
</style>
