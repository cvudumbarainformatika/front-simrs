<template>
  <app-card
    :is-header="false"
    class="q-mb-md"
  >
    <template #content>
      <app-table-input
        :title="`${map.gudang}`"
        :columns="store.columns"
        :column-hide="store.columnHide"
        :items="map.items"
        :meta="store.meta"
        :per-page="store.params.per_page"
        :order-by="store.params.order_by"

        :sort="store.params.sort"
        :loading="store.loading"
        :to-search="store.params.q"
        :bisa-edit="false"
        :bisa-delete="false"
        @goto="store.setPage"
        @set-row="store.setPerPage"
        @refresh="store.refreshTable"
        @find="store.setSearch"
        @set-order="store.setOder"
        @new-data="store.newData"
        @edit-data="store.editData"
        @delete="store.deletesData"
      >
        <template #cell-barangrs="{row}">
          <div>{{ row.barangrs?row.barangrs.nama:'-' }}</div>
        </template>
        <template #cell-satuan="{row}">
          <div>{{ row.satuan?row.satuan.nama:'-' }}</div>
        </template>
        <template #cell-gudang="{row}">
          <div>{{ row.gudang?row.gudang.nama:'-' }}</div>
        </template>
        <template #cell-ruang="{row}">
          <div>{{ row.ruang?row.ruang.uraian:'-' }}</div>
        </template>
        <template #col-gudang>
          <div>dari</div>
        </template>
        <template #col-jumlah>
          <div>Jumlah</div>
        </template>
        <template #col-ruang>
          <div>tujuan</div>
        </template>
        <template #col-kode_rs>
          <div>kode rs</div>
        </template>
        <template #col-barangrs>
          <div>Nama Barang</div>
        </template>
        <template #col-satuan>
          <div>Satuan</div>
        </template>
        <template #col-jumlah_disetujui>
          <div>Jumlah Disetujui</div>
        </template>
        <template #cell-jumlah_disetujui="{row}">
          <div v-if="edit">
            <q-input
              ref="refInput"
              v-model="row.jumlah_disetujui"
              dense
              type="number"
            />
          </div>
          <div v-if="!edit">
            {{ row.jumlah_disetujui }}
          </div>
        </template>
      </app-table-input>
      <div class="fit row no-wrap justify-end items-center q-mt-md">
        <app-btn
          v-if="!edit"
          label="Edit"
          color="dark"
          @click="onEdit"
        />
        <app-btn
          v-if="edit"
          label="Submit"
          @click="onSubmit"
        />
      </div>
    </template>
  </app-card>
</template>
<script setup>
import { useVerifPermintaanRuangan } from 'src/stores/simrs/logistik/sigarang/transaksi/verifpermintaan/form'
import { ref } from 'vue'

const store = useVerifPermintaanRuangan()
const props = defineProps({
  map: { type: Object, default: () => {} }
})
const emits = defineEmits(['onSubmit'])
const refInput = ref(null)
const edit = ref(false)
const onSubmit = () => {
  emits('onSubmit', props.map)
  edit.value = false
  // console.log('val', props.map)
}
const onEdit = () => {
  edit.value = true
}
</script>
