<template>
  <q-dialog persistent>
    <q-card style="min-width: 800px;">
      <q-bar class="bg-primary">
        <q-space />

        <q-btn
          v-close-popup
          dense
          flat
          color="white"
          icon="icon-mat-close"
          @click="store.closeCopy()"
        >
          <q-tooltip class="bg-white text-primary">
            Close
          </q-tooltip>
        </q-btn>
      </q-bar>
      <q-card-section>
        <div class="row bg-dark text-white q-pa-xs">
          <div
            class="col-auto"
            style="width:5%;"
          >
            No
          </div>
          <div class="col-4">
            Nomor Resep
          </div>
          <div class="col-4">
            Nomor Resep Asal
          </div>
          <div class="col-3">
            Tanggal Copy Resep
          </div>
        </div>
        <div
          v-for="(his, i) in store.historys"
          :key="i"
        >
          <div
            class="row q-pa-xs cursor-pointer"
            :class="i%2===1?'bg-grey-4':''"
            @click="his.show = !his.show"
          >
            <div
              class="col-auto"
              style="width:5%;"
            >
              {{ i+1 }}
            </div>
            <div class="col-4">
              {{ his?.noresep }}
            </div>
            <div class="col-4">
              {{ his?.noresep_asal }}
            </div>
            <div class="col-3">
              {{ dateFullFormat(his?.tgl) }}
            </div>
            <div v-if="his.show">
              <div v-if="his?.asalpermintaanresep.length">
                <div class="row bg-teal text-white">
                  <div
                    class="col-auto"
                    style="width:5%;"
                  >
                    No
                  </div>
                  <div class="col-7">
                    Obat Non Racikan
                  </div>
                  <div class="col-2">
                    Jumlah Minta
                  </div>
                  <div class="col-2">
                    Jumlah Keluar
                  </div>
                </div>
                <div
                  v-for="(res, r) in his?.asalpermintaanresep"
                  :key="r"
                >
                  <div
                    class="row"
                    :class="r%2===1?'bg-teal-2':'bg-white'"
                  >
                    <div
                      class="col-auto"
                      style="width:5%;"
                    >
                      {{ r+1 }}
                    </div>
                    <div class="col-7">
                      <div class="row">
                        {{ res?.mobat?.nama_obat }}
                      </div>
                      <div class="row f-10 text-italic">
                        {{ res?.mobat?.kd_obat }}
                      </div>
                      <div class="row f-10 text-weight-bold">
                        {{ res?.mobat?.kandungan }}
                      </div>
                    </div>
                    <div class="col-2">
                      <div class="row items-end">
                        <div class="col-auto q-mr-sm">
                          {{ res?.jumlah }}
                        </div>
                        <div class="col-auto q-mr-sm f-10 text-italic">
                          ({{ res?.mobat?.satuan_k }})
                        </div>
                      </div>
                    </div>
                    <div class="col-2">
                      <div class="row items-end">
                        <div class="col-auto q-mr-sm">
                          {{ cariJumlahResep(res?.kdobat, his?.noresep) }}
                        </div>
                        <div class="col-auto q-mr-sm f-10 text-italic">
                          ({{ res?.mobat?.satuan_k }})
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="his?.listRacikan?.length">
                <div class="row bg-orange-10 text-white">
                  <div
                    class="col-auto"
                    style="width:5%;"
                  >
                    No
                  </div>
                  <div class="col-3">
                    Nama Racikan
                  </div>
                  <div class="col-2">
                    Tipe Racikan
                  </div>
                  <div class="col-3">
                    Jumlah Racikan
                  </div>
                  <div class="col-3">
                    Satuan Racikan
                  </div>
                </div>
                <div
                  v-for="(rac, c) in his?.listRacikan"
                  :key="c"
                >
                  <div :class="c % 2 === 1 ? 'row bg-orange-3 ' :'row bg-white '">
                    <div
                      class="col-auto"
                      style="width:5%;"
                    >
                      {{ c+1 }}
                    </div>
                    <div class="col-3">
                      {{ rac?.namaracikan }}
                    </div>
                    <div class="col-2">
                      {{ rac?.tiperacikan }}
                    </div>
                    <div class="col-3">
                      {{ rac?.jumlahdibutuhkan }}
                    </div>
                    <div class="col-3">
                      {{ rac?.satuan_racik ?? 'tidak ada satuan racikan' }}
                    </div>
                  </div>
                  <div
                    v-if="rac.rincian?.length"
                    class="q-ml-md"
                  >
                    <div class="row bg-light-green-10 text-white">
                      <div
                        class="col-auto"
                        style="width:5%;"
                      >
                        No
                      </div>
                      <div class="col-7">
                        Obat
                      </div>
                      <div class="col-2">
                        Jumlah Minta
                      </div>
                      <div class="col-2">
                        Jumlah Keluar
                      </div>
                    </div>
                    <div
                      v-for="(rinc, n) in rac.rincian"
                      :key="n"
                    >
                      <div :class="n % 2 === 1 ? 'row bg-light-green-3' :'row bg-white'">
                        <div
                          class="col-auto"
                          style="width:5%;"
                        >
                          {{ n+1 }}
                        </div>
                        <div class="col-7">
                          <div class="row">
                            {{ rinc?.mobat?.nama_obat }}
                          </div>
                          <div class="row f-10 text-italic">
                            {{ rinc?.mobat?.kd_obat }}
                          </div>
                          <div class="row f-10 text-weight-bold">
                            {{ rinc?.mobat?.kandungan }}
                          </div>
                        </div>
                        <div class="col-2">
                          <div class="row items-end">
                            <div class="col-auto q-mr-sm">
                              {{ rinc?.jumlah }}
                            </div>
                            <div class="col-auto q-mr-sm f-10 text-italic">
                              ({{ rinc?.mobat?.satuan_k }})
                            </div>
                          </div>
                        </div>
                        <div class="col-2">
                          <div class="row items-end">
                            <div class="col-auto q-mr-sm">
                              {{ rinc?.jumlahKeluar }}
                            </div>
                            <div class="col-auto q-mr-sm f-10 text-italic">
                              ({{ rinc?.mobat?.satuan_k }})
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- {{ his }} -->
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { dateFullFormat } from 'src/modules/formatter'
import { useEResepDepoFarmasiStore } from 'src/stores/simrs/farmasi/eresep/eresep'

const store = useEResepDepoFarmasiStore()
function cariJumlahResep(res, his) {
  const history = store.historys.find(h => h.noresep === his)
  if (history) {
    const resep = history.rincian.find(rin => rin.kdobat === res)
    if (resep) return resep.jumlah
    else return 'Tidak Ditemukan'
  } else {
    return 'Tidak ditemukan'
  }
}
</script>
