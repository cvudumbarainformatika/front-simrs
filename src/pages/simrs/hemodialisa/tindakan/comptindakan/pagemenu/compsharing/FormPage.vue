<template>
  <q-card
    flat
    bordered
    square
    class="full-height"
  >
    <div class="full-height column">
      <div class="col-auto bg-primary text-white">
        <q-bar>
          <div>Form Sharing Biaya</div>
        </q-bar>
      </div>
      <div class="col full-height">
        <q-form
          ref="refForm"
          class="q-pa-sm "
          @submit="onSubmit"
        >
          <q-card-section
            class="full-height scroll"
          >
            <div class="row q-col-gutter-md q-mb-sm items-center">
              <div class="col-4">
                Tindakan Yang Disharing
              </div>
              <div class="col-8">
                <app-autocomplete
                  v-model="store.form.kodesharing"
                  autocomplete="namasharing"
                  option-label="namasharing"
                  option-value="namasharing"
                  label=" "
                  :source="store.sharings"
                  :loading="store.loading"
                  outlined
                />
              </div>
            </div>
            <div class="row q-col-gutter-md q-mb-sm items-center">
              <div class="col-4">
                Tagihan Pasien
              </div>
              <div class="col-8">
                <app-input
                  v-model="store.form.nominal"
                  label="Tagihan"
                  outlined
                  @update:model-value="setNumber($event,'nominal')"
                />
              </div>
            </div>
            <div class="row q-col-gutter-md q-mb-sm items-center">
              <div class="col-4">
                Jumlah
              </div>
              <div class="col-8">
                <app-input
                  v-model="store.form.jumlah"
                  label="jumlah"
                  outlined
                  @update:model-value="setNumber($event,'jumlah')"
                />
              </div>
            </div>
          </q-card-section>
          <q-card-actions align="right">
            <app-btn
              label="Simpan"
              type="submit"
              :loading="store.loadingSave"
              :disable="store.loadingSave"
            />
          </q-card-actions>
        </q-form>
      </div>
    </div>
  </q-card>
</template>
<script setup>
import { usePoliSharingStore } from 'src/stores/simrs/pelayanan/poli/sharing'

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})
const store = usePoliSharingStore()
function setNumber(evt, form) {
  const num = !isNaN(parseFloat(evt)) ? parseFloat(evt) : 0
  store.setForm(form, num)
}
function onSubmit() {
  console.log('form', store.form)
  store.simpan(props?.pasien)
}

</script>
