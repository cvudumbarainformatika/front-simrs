<template>
  <app-card
    :key="map.items"
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
        :click-able="true"
        @on-click="onClick"
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
        <template #cell-kode_rs="{row}">
          <div class="print-hide">
            {{ row.kode_rs }}
          </div>
        </template>
        <template #col-gudang>
          <div>dari</div>
        </template>
        <template #col-stokDepo>
          <div>Stok Depo</div>
        </template>
        <template #col-jumlah>
          <div>Jumlah</div>
        </template>
        <template #col-ruang>
          <div>Ruangan</div>
        </template>
        <template #col-kode_rs>
          <div class="print-hide">
            kode rs
          </div>
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
          <div v-if="edit && row.alokasi>0">
            <q-input
              ref="refInput"
              v-model="row.jumlah_disetujui"
              dense
              type="number"
              :rules="[
                (val)=>(val && val.length>0)||'periksa kembali input',
                (val)=> val <= row.alokasi+row.jumlah || 'tidak boleh melebih alokasi'
              ]"
              @keyup.enter="onSubmit"
            />
          </div>
          <div v-if="edit && row.alokasi===0">
            Tidak ada Alokasi
          </div>
          <div v-if="!edit">
            {{ row.jumlah_disetujui }}
          </div>
        </template>
      </app-table-input>
      <div class="fit row no-wrap justify-end items-center q-mt-md">
        <app-btn
          label="Tolak Permintaan"
          color="red"
          class="q-mr-sm"
          @click="onDenied"
        />
        <app-btn
          v-if="!edit"

          label="Edit"
          color="dark"
          @click="onEdit"
        />
        <app-btn
          v-if="edit"
          class="q-mr-sm"
          color="dark"
          label="Batal"
          @click="onCancel"
        />
        <app-btn
          v-if="edit"
          label="Verif"
          @click="onSubmit"
        />
      </div>
    </template>
  </app-card>
</template>
<script setup>
import { Dialog } from 'quasar'
import { useVerifPermintaanRuangan } from 'src/stores/simrs/logistik/sigarang/transaksi/verifpermintaan/form'
import { ref } from 'vue'

const store = useVerifPermintaanRuangan()
defineProps({
  map: { type: Object, default: () => {} }
})
// const emits = defineEmits(['onSubmit'])
const refInput = ref(null)
const edit = ref(false)
const onClick = (val, i) => {
  // console.log('clicked', i)
  // console.log('clicked', val)
}
const onSubmit = () => {
  if (refInput.value) refInput.value.validate()
  // perlu cek dulu tiap detail ada yang melebihi alokasi atau tidak
  store.saveForm()
  // emits('onSubmit', props.map.items)
  edit.value = false
  // console.log('val', refInput.value)
}
const onEdit = () => {
  edit.value = true
}
const onCancel = () => {
  edit.value = false
}
const onDenied = () => {
  // const permintaan = store.permintaan.details.map(detail => {
  //   const temp = detail.barangrs ? detail.barangrs.nama : '-'
  //   return temp
  // })
  // console.log('onDenied', permintaan)
  Dialog.create({
    title: 'Konfirmasi',
    message: 'Tolak Permintaan?',
    cancel: true
  }).onOk(() => {
    store.tolakPermintaan()
  })
}
</script>
