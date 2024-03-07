<template>
  <div class="column full-height full-width">
    <div class="col-auto bg-teal text-white">
      <div class="row q-pa-md">
        <div class="text-weight-bold f-12">
          Pra Anatesi Tersimpan ({{ pasien?.nama }})
        </div>
      </div>
    </div>
    <div class="col full-height bg-transparent">
      <q-scroll-area
        v-if="items.length"
        style="height:calc( 100% - 1px );"
      >
        <q-card
          v-for="(item, i) in items"
          :key="i"
          class="q-ma-sm relative-position"
        >
          <q-card-section>
            <div class="row">
              <!-- KEADAAN UMUM -->
              <div class="col-6">
                <div class="q-mb-xs">
                  <b>KEADAAN UMUM</b>
                </div>
                <table class="column full-width">
                  <tr class="column full-width">
                    <td>
                      <div class="flex">
                        <div> <b>Skor Mallampati</b> </div>
                        <div> : {{ item.skorMallampati }}</div>
                      </div>
                      <div class="flex">
                        <div> <b>Jantung</b> </div>
                        <div> : {{ item.jantung }}</div>
                      </div>
                      <div class="flex">
                        <div> <b>Paru-paru</b> </div>
                        <div> : {{ item.paruparu }}</div>
                      </div>
                      <div class="flex">
                        <div> <b>Abdomen</b> </div>
                        <div> : {{ item.abdomen }}</div>
                      </div>
                      <div class="flex">
                        <div> <b>Tulang Belakang</b> </div>
                        <div> : {{ item.tulangbelakang }}</div>
                      </div>
                      <div class="flex">
                        <div> <b>Ektremitas</b> </div>
                        <div> : {{ item.ekstremitas }}</div>
                      </div>
                      <div class="flex">
                        <div> <b>Neurologi</b> </div>
                        <div> : {{ item.neurologi }}</div>
                      </div>
                      <div class="flex">
                        <div> <b>Keterangan</b> </div>
                        <div> : {{ item.keterangan }}</div>
                      </div>
                    </td>
                  </tr>
                </table>

                <div class="q-ma-xs">
                  <b>ASA CLASIFICATION</b>
                </div>
                <table class="column full-width">
                  <tr class="column full-width">
                    <td>
                      <div
                        v-for="(asa, n) in item?.asaClasification"
                        :key="n"
                      >
                        - {{ asa }}
                      </div>
                      <q-separator />
                    </td>
                  </tr>
                </table>
              </div>
              <!-- KAJIAN SISTEM  -->
              <div class="col-6">
                <div class="q-mb-xs">
                  <b>KAJIAN SISTEM</b>
                </div>
                <table class="column full-width">
                  <tr class="column full-width">
                    <td>
                      <div
                        v-for="(kaj, n) in item?.kajianSistem"
                        :key="n"
                      >
                        - {{ kaj }}
                      </div>
                      <q-separator />
                      <div class="">
                        Keterangan : {{ item.keteranganKajianSistem }}
                      </div>
                    </td>
                  </tr>
                </table>
                <!-- LABORATORIUM -->
                <div class="q-ma-xs">
                  <b>LABORATORIUM</b>
                </div>
                <table class="column full-width">
                  <tr class="column full-width">
                    <td>
                      <div
                        v-for="(lab, n) in item?.laboratorium"
                        :key="n"
                      >
                        - {{ lab.nama }} : {{ lab.model }}
                      </div>
                      <q-separator />
                      <div class="">
                        Keterangan : {{ item.keteranganLaborat }}
                      </div>
                    </td>
                  </tr>
                </table>
                <!-- PENYULIT -->
                <div class="q-ma-xs">
                  <b>PENYULIT ANASTESI LAIN</b>
                </div>
                <table
                  v-if="item?.penyuliAnastesi?.length"
                  class="column full-width"
                >
                  <tr class="column full-width">
                    <td>
                      <div
                        v-for="(peny, n) in item?.penyuliAnastesi"
                        :key="n"
                      >
                        - {{ peny }}
                      </div>
                      <q-separator />
                    </td>
                  </tr>
                </table>
                <div v-else>
                  -
                </div>
              </div>
            </div>
          </q-card-section>
          <q-separator style="margin-top: -10px;" />
          <q-card-section style="margin-top: -10px;">
            <div class="row">
              <div class="col-auto">
                Catatan Tindak Lanjut
              </div>
              <div class="col full-width">
                : {{ item.catatan }}
              </div>
            </div>
            <div class="row">
              <div class="col-auto">
                Perencanaan Anastesi
              </div>
              <div class="col full-width">
                : {{ item.perencanaan }}
              </div>
            </div>
          </q-card-section>
          <q-separator style="margin-top: -10px;" />
          <q-card-section>
            <div class="flex q-gutter-sm justify-end">
              <q-btn
                flat
                size="sm"
                icon="icon-mat-delete_sweep"
                round
                color="negative"
                @click="emits('hapus', item?.id)"
              >
                <q-tooltip>Hapus Data</q-tooltip>
              </q-btn>
              <q-btn
                flat
                size="sm"
                icon="icon-mat-edit"
                round
                color="primary"
                @click="emits('edit', item)"
              >
                <q-tooltip>Edit Data</q-tooltip>
              </q-btn>
            </div>
          </q-card-section>
        </q-card>
      </q-scroll-area>
      <div class="column full-height flex-center">
        <div>📝 Belum Ada data Tersimpan</div>
      </div>
    </div>
  </div>
</template>
<script setup>
defineProps({
  pasien: {
    type: Object,
    default: null
  },
  items: {
    type: Array,
    default: () => []
  }
})

const emits = defineEmits(['hapus', 'edit'])

</script>

<style lang="scss" scoped>
table {
  width: 100%;
  border-spacing: 0px;

  th, td {
    border: 1px solid gray;
    padding: 3px 10px;
    border-collapse: collapse !important;

  }

  .vw-100{
    width: 100vw;
  }
  .vw-60{
    width: 100vw;
  }
  .vw-50{
    width: 100vw;
  }
  .vw-40{
    width: 100vw;
  }
  .vw-30{
    width: 100vw;
  }
}

</style>
