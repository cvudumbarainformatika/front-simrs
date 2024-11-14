<template>
  <q-card>
    <q-card-section>
      <div class="text-h6">
        Perbaikan Stok
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
      <div v-if="props.data?.data?.stok?.length === 0">
        <app-no-data />
      </div>
      <div v-for="(item,i) in props.data?.data?.stok" :key="item">
        <div v-if="item?.loading" class="row items-center justify-center bg-dark text-white">
          Mohon tunggu sebentar ...
        </div>
        <div v-else>
          <div
            class="row items-center"
            :class="i%2===0? (parseFloat(item?.harga) === parseFloat(cekHarga(item)?.harga)?'bg-grey-2':'bg-negative text-white cursor-pointer'):(parseFloat(item?.harga) === parseFloat(cekHarga(item)?.harga)?'bg-grey-4':'bg-negative text-white cursor-pointer')"
            @click="()=>{
              if (parseFloat(item?.harga) !== parseFloat(cekHarga(item)?.harga)) {
                $q.dialog({
                  title: 'Konfirmasi',
                  message: 'Apakah anda ingin merubah harga?',
                  cancel: {
                    color: 'negative',
                    label: 'Tidak',
                    'no-caps': true
                  },
                  ok: {
                    color: 'primary',
                    label: 'Ubah',
                    'no-caps': true
                  },
                  persistent: true
                }).onOk(() => {
                  emits('ubahharga',{item,penerimaan:cekHarga(item),harga:cekHarga(item)?.harga,tipe:'stok',id:item?.id})
                })
              }
            }"
          >
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
              {{ cekHarga(item)?.nopenerimaan }}
            </div>
            <div class="col-2">
              {{ cekHarga(item)?.harga }}
            </div>
            <div class="col-2">
              {{ cekHarga(item)?.nobatch }}
            </div>
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
const emits = defineEmits(['ubahharga'])
function cekHarga (item) {
  if (item?.nopenerimaan?.includes('awal')) return props.data?.data?.awal?.find(p => p?.nopenerimaan === item?.nopenerimaan)
  else return props.data?.data?.penerimaan?.find(p => p?.nopenerimaan === item?.nopenerimaan)
}
</script>
