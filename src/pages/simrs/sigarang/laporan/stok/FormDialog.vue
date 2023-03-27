<template>
  <q-dialog>
    <app-card
      style="width:900px"
      title="Form Penyesuaian Stok"
      desc="Input Form Penyesuaian Stok Depo dan Gudang"
    >
      <template #content>
        <q-form
          ref="formReff"
          @submit="onSubmit"
          @reset="onReset"
        >
          <div class="row q-col-gutter-md q-mb-sm">
            <div class="col-sm-4 col-xs-12">
              Nama Barang
            </div>
            <div class="col-sm-8 col-xs-12">
              {{ store.form.barang? store.form.barang.nama:'-' }}
            </div>
          </div>
          <div class="row q-col-gutter-md q-mb-sm">
            <div class="col-sm-4 col-xs-12">
              Tempat
            </div>
            <div class="col-sm-8 col-xs-12">
              {{ store.form.depo? store.form.depo.nama:'-' }}
            </div>
          </div>
          <div class="row q-col-gutter-md items-center q-mb-sm">
            <div class="col-sm-4 col-xs-12">
              Stok Aplikasi: {{ store.form.sisa_stok }}
            </div>
            <div class="col-sm-4 col-xs-12">
              <app-input
                v-model="store.form.jumlah"
                valid
                label="Stok fisik"
                type="number"
                outlined
                autofocus
                @update:model-value="actJumlah"
              />
            </div>
            <div class="col-sm-4 col-xs-12">
              Selisih: {{ store.form.selisih }}
            </div>
          </div>
          <div class="row q-col-gutter-md" />
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
      </template>
    </app-card>
  </q-dialog>
</template>

<script setup>
import { notifCenterVue } from 'src/modules/utils'
import { useStokOpnameStore } from 'stores/simrs/logistik/sigarang/laporan/stok/stokOpname'
import { ref } from 'vue'
const store = useStokOpnameStore()
const formReff = ref(null)

const actJumlah = val => {
  store.form.selisih = val - store.form.sisa_stok
  // console.log('jumlah', val)
}

const onSubmit = () => {
  if (store.form.selisih > 0 || store.form.selisih < 0) {
    store.simpanPenyesuaian().then(() => {
      store.setOpen()
    })
  } else {
    notifCenterVue('tidak ada perubahan data')
    store.setOpen()
  }
}
const onReset = () => {
  formReff.value.resetValidation()
  store.setOpen()
}
</script>
