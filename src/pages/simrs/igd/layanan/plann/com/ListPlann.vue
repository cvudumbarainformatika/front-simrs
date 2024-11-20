<template>
  <q-card
    flat
    bordered
    square
    class="full-height bg-teal-2"
    style="overflow: hidden;"
  >
    <q-bar
      class="bg-teal text-white z-top"
      style="width: inherit;"
    >
      <div class="f-12">
        Data Planing
      </div>
      <q-space />
    </q-bar>
    <q-card-section
      style="padding:0"
      class="full-height bg-grey"
    >
      <div
        v-if="loadingaja"
        class="column full-height flex-center"
      >
        <div class="text-white">
          Harap Tunggu .....
        </div>
        <div class="text-white">
          Sinkron Data Ke DATABASE
        </div>
      </div>
      <div
        v-if="pasien?.planheder?.length <= 0"
        class="column full-height flex-center"
      >
        <div class="text-white">
          Belum Ada data tersimpan
        </div>
      </div>
      <q-scroll-area
        v-else
        style="height:calc(100% - 32px);"
      >
        <q-list
          class="bg-white"
          separator
        >
          <transition-group name="list">
            <q-item
              v-for="(item , n) in lists"
              :key="n"
              class="list-move"
            >
              <q-item-section>
                <q-item-label
                  class="f-12"
                >
                  <span class="">Plann </span> : <span class="text-weight-bold">{{ item.rs4 }}</span>
                </q-item-label>
                <div v-if="item?.rs4 === 'Rawat Inap'">
                  <q-item-label>Operasi : <span class="text-weight-bold">{{ item?.planranap?.operasi }}</span></q-item-label>
                  <q-item-label>Jenis Operasi : <span class="text-weight-bold">{{ item?.planranap?.jenisoperasi }}</span></q-item-label>
                  <q-item-label>Tanggal Operasi : <span class="text-weight-bold">{{ item?.planranap?.tgloperasi }}</span></q-item-label>
                  <q-item-label>Ruang Tujuan : <span class="text-weight-bold">{{ item?.planranap?.ruangranap?.rs2 }}</span></q-item-label>
                </div>
                <div v-if="item?.rs4 === 'Rujuk Ke Rumah Sakit'">
                  <q-item-label>Alasan Dirujuk : <span class="text-weight-bold">{{ item?.planrujukan?.atas_dasar }}</span></q-item-label>
                  <q-item-label>Jenis Pelayanan : <span class="text-weight-bold">{{ item?.planrujukan?.jenis_pelayanan }}</span></q-item-label>
                  <q-item-label>Tanggal Rujukan : <span class="text-weight-bold">{{ item?.planrujukan?.tgl_rujukan }}</span></q-item-label>
                  <q-item-label>Tanggal Rencana Kunjungan : <span class="text-weight-bold">{{ item?.planrujukan?.tgl_rencana_kunjungan }}</span></q-item-label>
                  <q-item-label>Type  Faskes : <span class="text-weight-bold">{{ item?.planrujukan?.type_faskes }}</span></q-item-label>
                  <q-item-label>Dirujuk Ke : <span class="text-weight-bold">{{ item?.planrujukan?.di_rujuk_ke }} ({{ item?.planrujukan?.koders }})</span></q-item-label>
                  <q-item-label>Poli : <span class="text-weight-bold">{{ item?.planrujukan?.poli_rujukan }} ({{ item?.planrujukan?.kodepoli }})</span></q-item-label>
                  <q-item-label>Keterangan : <span class="text-weight-bold">{{ item?.planrujukan?.keterangan ?? '-' }}</span></q-item-label>
                </div>
                <div v-if="item?.rs4 === 'Pulang'">
                  <q-item-label>Alasan Pulang : <span class="text-weight-bold">{{ item?.planpulang?.atas_dasar }}</span></q-item-label>
                  <q-item-label v-if="item?.planpulang?.atas_dasar === 'Meninggal'">
                    Tanggal Meninggal : <span class="text-weight-bold">{{ item?.planpulang?.tgl_meninggal }} {{ item?.planpulang?.jam_meninggal }}</span>
                  </q-item-label>
                  <q-item-label v-if="item?.planpulang?.atas_dasar === 'Meninggal'">
                    Alasan Meninggal : <span class="text-weight-bold">{{ item?.planpulang?.atas_dasar }}</span>
                  </q-item-label>
                </div>
              </q-item-section>
            </q-item>
          </transition-group>
        </q-list>
      </q-scroll-area>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  },
  loadingaja: {
    type: Boolean,
    default: false
  }
})

const lists = computed(() => {
  const arr = props.pasien?.planheder
  return arr?.sort((a, b) => { return b.id - a.id })
})

// function hapusItem (id) {
//   $q.dialog({
//     dark: true,
//     title: 'Peringatan',
//     message: 'Apakah Data ini akan dihapus?',
//     cancel: true,
//     persistent: true
//   }).onOk(() => {
//     // console.log('OK')
//     store.deleteData(props.pasien, id)
//   }).onCancel(() => {
//     // console.log('Cancel')
//   }).onDismiss(() => {
//     // console.log('I am triggered on both OK and Cancel')
//   })
// }

</script>
