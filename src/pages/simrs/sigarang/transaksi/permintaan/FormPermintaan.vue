<template>
  <div class="q-pt-sm q-pb-lg-xl">
    <app-card
      title="Form Permintaan"
      desc="Form Permintaan Ruangan"
    >
      <template #content>
        <div class="row q-col-gutter-md q-mb-sm">
          <div class="col-6">
            <div class="row q-col-gutter-md q-mb-sm items-center">
              <div class="col-md-4 col-xs-12">
                Tanggal Permintaan
              </div>
              <div class="col-md-6 col-xs-12">
                <app-input
                  v-model="store.tanggal"
                  readonly
                  label="Tanggal Permintaan"
                  outlined
                  dense
                />
              </div>
            </div>
            <div class="row q-col-gutter-md q-mb-sm items-center">
              <div class="col-md-4 col-xs-12">
                Penanggung jawab
              </div>
              <div class="col-md-6 col-xs-12">
                <app-autocomplete-new
                  :model="store.form.kode_penanggungjawab"
                  outlined
                  label="Penanggung jawab*"
                  autocomplete="jabatan"
                  option-value="kode"
                  :loading="store.loading"
                  option-label="jabatan"
                  :source="store.penggunas"
                  @on-select="pilihPenanggungjawab"
                  @clear="clearPenanggungjawab"
                />
              </div>
            </div>
          </div>
        </div>
      </template>
    </app-card>
  </div>
</template>
<script setup>
import { useTransaksiPermintaanForm } from 'src/stores/simrs/logistik/sigarang/transaksi/permintaan/form'

const store = useTransaksiPermintaanForm()

const clearPenanggungjawab = () => {
  store.setForm('kode_penanggungjawab', null)
}
const pilihPenanggungjawab = (val) => {
  store.setForm('kode_penanggungjawab', val)
}
</script>
