<template>
  <q-card>
    <q-card-section>
      <div class="text-h6">
        Penerimaan
      </div>

      <div class="row items-center bg-dark text-white">
        <div class="col-2">
          Nopenerimaan
        </div>
        <div class="col-2">
          Tgl Penerimaan
        </div>
        <div class="col-2">
          Jumlah
        </div>
        <div class="col-2">
          Harga
        </div>
        <div class="col-2">
          Nobatch
        </div>
        <div class="col-2">
          Exp
        </div>
      </div>
      <div v-if="props.data?.data?.penerimaan?.length === 0">
        <app-no-data />
      </div>
      <div v-for="(item,i) in props.data?.data?.penerimaan" :key="item">
        <div class="row items-center" :class="i%2===0? 'bg-grey-2':'bg-grey-4'">
          <div class="col-2">
            {{ item?.nopenerimaan }}
          </div>
          <div class="col-2">
            {{ item?.header?.tglpenerimaan }}
          </div>
          <div class="col-2">
            {{ item?.jumlah }}
          </div>
          <div class="col-2">
            {{ item?.harga }}
          </div>
          <div class="col-2">
            {{ item?.nobatch }}
          </div>
          <div class="col-2">
            {{ item?.tglexp }}
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
</script>
