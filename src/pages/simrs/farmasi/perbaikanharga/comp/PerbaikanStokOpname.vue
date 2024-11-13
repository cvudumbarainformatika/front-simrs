<template>
  <q-card>
    <q-card-section>
      <div class="text-h6">
        Perbaikan Stok Opname
      </div>
      <div class="row items-center bg-dark text-white">
        <div class="col-2">
          Nopenerimaan
        </div>
        <div class="col-2">
          Harga
        </div>
        <div class="col-2">
          Nobatch
        </div>
        <div class="col-2">
          Penerimaan / Awal
        </div>
        <div class="col-2">
          Harga
        </div>
        <div class="col-2">
          Nobatch
        </div>
      </div>
      <div v-for="(item,i) in props.data?.data?.opname" :key="item">
        <div class="row items-center" :class="i%2===0? (parseFloat(item?.harga) === cekHarga(item)?'bg-grey-2':'bg-negative text-white'):(parseFloat(item?.harga) === cekHarga(item)?'bg-grey-4':'bg-negative text-white')">
          <div class="col-2">
            {{ item?.nopenerimaan }}
          </div>
          <div class="col-2">
            {{ item?.harga }}
          </div>
          <div class="col-2">
            {{ item?.nobatch }}
          </div>
          <div class="col-2">
            {{ item?.nopenerimaan?.includes('awal')? props?.data.data?.awal?.find(p => p?.nopenerimaan === item?.nopenerimaan)?.nopenerimaan :props?.data.data?.penerimaan?.find(p => p?.nopenerimaan === item?.nopenerimaan)?.nopenerimaan }}
          </div>
          <div class="col-2">
            {{ item?.nopenerimaan?.includes('awal')? props?.data.data?.awal?.find(p => p?.nopenerimaan === item?.nopenerimaan)?.harga :props?.data.data?.penerimaan?.find(p => p?.nopenerimaan === item?.nopenerimaan)?.harga }}
          </div>
          <div class="col-2">
            {{ item?.nopenerimaan?.includes('awal')? props?.data.data?.awal?.find(p => p?.nopenerimaan === item?.nopenerimaan)?.nobatch :props?.data.data?.penerimaan?.find(p => p?.nopenerimaan === item?.nopenerimaan)?.nobatch }}
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Object,
    default: () => {}
  }
})
function cekHarga (item) {
  if (item?.nopenerimaan?.includes('awal')) return parseFloat(props.data?.data?.awal?.find(p => p?.nopenerimaan === item?.nopenerimaan)?.harga)
  else return parseFloat(props.data?.data?.penerimaan?.find(p => p?.nopenerimaan === item?.nopenerimaan)?.harga)
}
</script>
