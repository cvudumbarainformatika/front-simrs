<template>
  <div>
    <div
      id="printMe"
      class="column items-center"
    >
      <div
        class="col no-wrap garis2 text-center"
      >
        <div class="row no-wrap justify-center">
          <div
            class="q-mr-sm"
            style="min-width: 1cm;"
          >
            <q-img
              src="~assets/logos/logo-rsud.png"
              spinner-color="white"
              style="height: 0.9cm; max-width: 0.9cm"
            />
          </div>
          <div class="">
            <div class="f-12">
              Instalasi Farmasi
            </div>
            <div class="">
              RSUD dr.Moh Saleh
            </div>
            <div class="f-8">
              (0335) 433478,433119,421118
            </div>
            <div class="f-8 q-mb-xs">
              Fax. (0335) 432702
            </div>
          </div>
        </div>
      </div>
      <div class="garis" />
      <div class="garis" />
      <div class=" q-mt-xs f-10">
        <span class="f-12 text-weight-bold">{{ store?.resep?.noresep }}</span> / {{ dateFull(store?.resep?.tgl_kirim) }}
      </div>
      <div class="f-12">
        {{ store.resep?.norm }} - {{ store.resep?.datapasien?.nama }}
      </div>
      <div class="text-italic f-10">
        {{ store.resep?.datapasien?.usia }}
      </div>
      <div class="row ">
        <div class="col-shrink q-mr-xs">
          {{ store?.resep?.dokter?.nama }}
        </div>
        <div
          v-if="store?.resep?.poli"
          class="col-shrink "
        >
          - {{ store?.resep?.poli?.rs2 }}
        </div>
        <div
          v-if="store?.resep?.ruanganranap"
          class="col-shrink "
        >
          - {{ store?.resep?.ruanganranap?.rs2 }}
        </div>
      </div>
      <div
        v-if="store?.resep?.diagnosa"
        class="row q-mb-xs"
      >
        <div class="col-shrink q-mr-xs">
          diagnosa :
        </div>
        <div class="col-grow">
          {{ store?.resep?.diagnosa }}
        </div>
      </div>
      <div class="garis" />
      <div class="garis" />
      <div
        v-if="store?.resep?.permintaanresep?.length"
        class="q-mt-sm full-width"
      >
        <!-- <div class="row items-center">
          <div class="col-shrink text-weight-bold">
            Non Racikan
          </div>
          <div class="col-grow">
            <q-separator
              size="2px"
              color="primary"
              inset
            />
          </div>
        </div> -->
        <q-list
          separator
          bordered
          class="full-width"
        >
          <q-item
            v-for="(rinc,j) in store?.resep?.permintaanresep"
            :key="j"
            class="full-width"
          >
            <q-item-section style="width: 40%;">
              <div class="row ">
                {{ rinc?.mobat?.nama_obat }}
              </div>
              <div class="row f-10">
                ( {{ rinc?.kandungan }} )
              </div>
              <!-- <div class="row text-italic f-10">
                {{ rinc?.kdobat }}
              </div> -->

              <!-- <div class="row q-col-gutter-sm  f-10">
                <div
                  class="col-shrink"
                  :class="rinc?.fornas==='1'?'text-green':'text-red'"
                >
                  {{ rinc?.fornas==='1'?'Fornas':'Non-Fornas' }}
                </div>
                <div
                  class="col-shrink"
                  :class="rinc?.forkit==='1'?'text-green':'text-red'"
                >
                  {{ rinc?.forkit==='1'?'Forkit':'Non-Forkit' }}
                </div>
                <div
                  class="col-shrink"
                  :class="rinc?.generik==='1'?'text-green':'text-red'"
                >
                  {{ rinc?.generik==='1'?'Generik':'Non-Generik' }}
                </div>
              </div> -->
            </q-item-section>
            <q-item-section
              side
              style="width:60%"
            >
              <div class="row full-width">
                <div class="col-6">
                  <div class="row q-mt-xs">
                    <div class="col-4">
                      Aturan
                    </div>
                    <div class="col-8">
                      {{ rinc?.aturan }}
                    </div>
                  </div>
                  <div class="row q-mt-xs items-end">
                    <div class="col-4">
                      Jml Obat
                    </div>
                    <div class="col-2 text-right">
                      {{ rinc?.jumlah }}
                    </div>
                    <div class="col-auto f-10">
                      ( {{ rinc?.mobat?.satuan_k }} )
                    </div>
                  </div>
                  <!-- <div class="row q-mt-xs">
                    <div class="col-4">
                      Konsumsi
                    </div>
                    <div class="col-8">
                      {{ formatDouble( parseFloat(rinc?.konsumsi),1) }} hari
                    </div>
                  </div> -->
                </div>
                <div class="col-6">
                  <div class="row q-mt-xs">
                    <div class="col-4">
                      Harga
                    </div>
                    <div class="col-8">
                      {{ formatDouble(parseFloat(rinc?.hargajual),2) }}
                    </div>
                  </div>
                  <div class="row q-mt-xs">
                    <div class="col-4">
                      Ket
                    </div>
                    <div class="col-8">
                      {{ rinc?.keterangan }}
                    </div>
                  </div>
                </div>
              </div>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
      <div
        v-if="store?.resep?.listRacikan?.length"
        class="q-mt-sm full-width"
      >
        <!-- <div class="row items-center">
          <div class="col-shrink text-weight-bold">
            Racikan
          </div>
          <div class="col-grow">
            <q-separator
              size="2px"
              color="deep-orange"
              inset
            />
          </div>
        </div> -->
        <div
          v-for="(item,i) in store?.resep?.listRacikan"
          :key="i"
          class="full-width"
        >
          <div class="q-ml-md row items-center">
            <div class="col-shrink q-mr-xs">
              {{ item?.namaracikan }}
            </div>
            <!-- <div class="col-shrink q-mr-xs">
              <q-chip
                square
                class="f-10"
                color="primary"
                text-color="white"
                outline
              >
                {{ item?.tiperacikan }}
              </q-chip>
            </div> -->
            <div class="col-shrink q-mr-xs text-green text-weight-bold">
              {{ item?.jumlahdibutuhkan }}
            </div>
            <div class="col-shrink q-mr-xs">
              ({{ item?.satuan_racik }})
            </div>
            <div class="col-shrink q-mr-xs text-italic">
              {{ item?.aturan }}
            </div>
            <div class="col-shrink q-mr-xs">
              {{ item?.keterangan }}
            </div>
            <div class="col-shrink q-mr-xs text-italic f-10">
              ( {{ formatDouble( parseFloat(item?.konsumsi),1) }} hari)
            </div>
            <div class="col-grow">
              <q-separator
                size="1px"
                color="deep-orange"
                inset
              />
            </div>
          </div>
          <q-list
            separator
            bordered
            class="full-width"
          >
            <q-item
              v-for="(rinc,j) in item?.rincian"
              :key="j"
              class="full-width"
            >
              <q-item-section style="width: 40%;">
                <div class="row ">
                  {{ rinc?.mobat?.nama_obat }}
                </div>
                <div class="row f-10">
                  ( {{ rinc?.kandungan }} )
                </div>
                <!-- <div class="row text-italic f-10">
                  {{ rinc?.kdobat }}
                </div> -->

                <!-- <div class="row q-col-gutter-sm  f-10">
                  <div
                    class="col-shrink"
                    :class="rinc?.fornas==='1'?'text-green':'text-red'"
                  >
                    {{ rinc?.fornas==='1'?'Fornas':'Non-Fornas' }}
                  </div>
                  <div
                    class="col-shrink"
                    :class="rinc?.forkit==='1'?'text-green':'text-red'"
                  >
                    {{ rinc?.forkit==='1'?'Forkit':'Non-Forkit' }}
                  </div>
                  <div
                    class="col-shrink"
                    :class="rinc?.generik==='1'?'text-green':'text-red'"
                  >
                    {{ rinc?.generik==='1'?'Generik':'Non-Generik' }}
                  </div>
                </div> -->
              </q-item-section>
              <q-item-section
                side
                style="width:60%"
              >
                <div class="row full-width">
                  <div class="col-6">
                    <!-- <div class="row q-mt-xs">
                      <div class="col-5">
                        Ds Obat
                      </div>
                      <div class="col-7">
                        {{ rinc?.dosisobat }}
                      </div>
                    </div>
                    <div class="row q-mt-xs">
                      <div class="col-5">
                        Ds Resep
                      </div>
                      <div class="col-7">
                        {{ rinc?.dosismaksimum }}
                      </div>
                    </div>
                    <div class="row q-mt-xs">
                      <div class="col-5">
                        Jml Resep
                      </div>
                      <div class="col-7">
                        {{ rinc?.jumlahresep }}
                      </div>
                    </div> -->
                    <div class="row q-mt-xs items-end">
                      <div class="col-4">
                        Jml Obat
                      </div>
                      <div class="col-2 text-right">
                        {{ rinc?.jumlahobat }}
                      </div>
                      <div class="col-auto f-10">
                        ( {{ rinc?.mobat?.satuan_k }} )
                      </div>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="row q-mt-xs">
                      <div class="col-4">
                        Harga
                      </div>
                      <div class="col-8">
                        {{ formatDouble(parseFloat(rinc?.harga),2) }}
                      </div>
                    </div>
                    <div class="row q-mt-xs">
                      <div class="col-4">
                        Ket
                      </div>
                      <div class="col-8">
                        {{ rinc?.keteranganx }}
                      </div>
                    </div>
                  </div>
                </div>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </div>
      <div class="f-10 text-italic q-my-md">
        {{ dateFullFormat(new Date()) }} : {{ formatJam(new Date()) }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { dateFullFormat, formatJam, dateFull, formatDouble } from 'src/modules/formatter'
import { onMounted } from 'vue'
import { usePrintEresepStore } from 'src/stores/simrs/farmasi/eresep/printesep'

const store = usePrintEresepStore()

onMounted(() => {
  // myPrinting() //
})
// eslint-disable-next-line no-unused-vars
function myPrinting () {
  console.log('print ')
  setTimeout(function () {
    window.print()
  }, 500)
  setTimeout(function () {
    afterPrint()
  }, 500)
}

function afterPrint () {
  // const r = confirm('Press a button!')
  // if (r === true) {
  // router.push({ path: store.prevUrl ? store.prevUrl : '/history' })
  window.close()
  // } else {
  //   window.close()
  // }
}

</script>

<style lang="scss" scoped>
.garis {
  width: 90%;
  border-top: 1px dashed black;
  margin-bottom: 2px;
}
.garis2 {
  width: 90%;
}
</style>
