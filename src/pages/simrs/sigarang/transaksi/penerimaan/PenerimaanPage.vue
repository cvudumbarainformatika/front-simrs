<template>
  <div>
    <q-card class="emak">
      <q-tabs
        v-model="tab"
        dense
        class="text-grey text-weight-bold anak bg-white full-width"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab
          name="terima"
          label="Penerimaan"
        />
        <q-tab
          name="surat"
          label="Input kelengkapan surat"
        />
      </q-tabs>

      <q-separator />

      <q-tab-panels
        v-model="tab"
        animated
        class="panel"
      >
        <q-tab-panel name="terima">
          <PenerimaanForm />
        </q-tab-panel>

        <q-tab-panel name="surat">
          <kelengkapan-surat />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
</template>
<script setup>
import { routerInstance } from 'src/boot/router'
import { uniqueId } from 'src/modules/utils'
import { useTransaksiPenerimaanForm } from 'src/stores/simrs/logistik/sigarang/transaksi/penerimaan/form'
import { useKelengkapanSuratPenerimaan } from 'src/stores/simrs/logistik/sigarang/transaksi/penerimaan/kelengkapan'
import { ref } from 'vue'
import PenerimaanForm from './PenerimaanForm.vue'
import KelengkapanSurat from './KelengkapanSurat.vue'

const tab = ref('terima')
// const oldSlug = routerInstance.currentRoute.value.params.slug
const store = useTransaksiPenerimaanForm()
store.searchPemesanan()
const slug = 'TRM-' + uniqueId()
store.setForm('reff', slug)
routerInstance.replace({ name: 'sigarang.transaksi.penerimaan', params: { slug } })
useKelengkapanSuratPenerimaan().getDataPenerimaan()
useKelengkapanSuratPenerimaan().getDataPemesanan()
// store.getDataPenerimaan().then(data => {
//   console.log('data', data)
//   if (data !== undefined) {
//     routerInstance.replace({ name: 'transaksi.penerimaan', params: { slug: oldSlug } })
//     store.setForm('reff', oldSlug)
//   } else {
//   }
// })
</script>
<style lang="scss" scoped>
.emak{
  // width: calc(100%);
  z-index: 10;
  overflow: hidden;
  position: relative;

  // background-color: $grey-1;
}
.anak{
  overflow: hidden;
  position: fixed;
  z-index: 11;
}
.panel{
  margin-top: 1cm;
}
</style>
