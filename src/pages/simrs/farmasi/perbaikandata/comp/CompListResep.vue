<template>
  <q-dialog persistent @show="show()" @hide="hide()">
    <q-card style="width: 1100px; height: 90vh; max-width: 90vw;" ref="refListRes">
      <q-bar class="bg-primary">
        <q-space />

        <q-btn
          v-close-popup
          dense
          flat
          color="white"
          icon="icon-mat-close"
          @click="emits('close')"
        >
          <q-tooltip class="bg-white text-primary">
            Close
          </q-tooltip>
        </q-btn>
      </q-bar>

      <q-card-section class="">
        <div class="row items-center">
          <div class="col-2 text-weight-bold">
            Nompr Penerimaan Lebih Transaksi
          </div>
          <div class="col-8">
            <div class="row items-center bg-dark text-white">
              <div class="col-auto" style="width: 5%;">
                No
              </div>
              <div class="col-4">
                Nopenerimaan
              </div>
              <div class="col-1">
                Masuk
              </div>
              <div class="col-1">
                Keluar
              </div>
              <div class="col-1">
                Diff
              </div>
              <div class="col-1">
                Opname
              </div>
              <div class="col-3">
                Rinc Keluar
              </div>
            </div>

            <div v-for="(ku,i) in item?.data?.data?.penKur" :key="i">
              <div class="row items-center " :class="i%2==0?'bg-grey-2':'bg-grey-4'">
                <div class="col-auto" style="width: 5%;">
                  {{ i+1 }}
                </div>
                <div class="col-4">
                  {{ ku?.noper }}
                </div>
                <div class="col-1">
                  {{ ku?.maSuk }}
                </div>
                <div class="col-1">
                  {{ ku?.keLuar }}
                </div>
                <div class="col-1">
                  {{ ku?.sts }}
                </div>
                <div class="col-1">
                  {{ ku?.stOpnya }}
                </div>
                <div class="col-3">
                  <div class="row">
                    Mutasi : {{ ku?.keluarnya?.mutKel }}
                  </div>
                  <div class="row">
                    Resep : {{ ku?.keluarnya?.resepNRac }}
                  </div>
                  <div class="row">
                    Resep Rac : {{ ku?.keluarnya?.resepRac }}
                  </div>
                  <div class="row">
                    Retur : {{ ku?.keluarnya?.retGud }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="col-2 text-right">
              <div class="row justify-end">
                <q-btn
                  dense
                  no-caps
                  label="Fix Mutasi"
                  color="orange"
                  :loading="loadingFixMutasi"
                  @click="fixMutasi()"
                />
              </div>
            </div> -->
        </div>
      </q-card-section>
      <q-card-section class="q-mb-lg">
        <q-scroll-area
          :style="`height: ${he-250}px; max-height: 80vh;`"
        >
          <div v-if="loading" style="height: 300px;">
            <app-loading />
          </div>
          <div v-if="!loading && (!data?.mutasi?.length && !data?.mutasiruangan?.length && !data?.resep?.length && !data?.resepracikan?.length && !data?.retur?.length)" style="height: 300px;">
            <app-no-data />
          </div>
          <div v-if="!loading && ((data?.mutasi?.length || data?.mutasiruangan?.length || data?.resep?.length || data?.resepracikan?.length || data?.retur?.length))" style="height: 300px;">
            <div v-if="data?.mutasiruangan?.length">
              <div class="row items-center ">
                <div class="col-6 text-weight-bold f-14 ">
                  Mutasi ke Ruangan
                </div>
                <div class="col-6 text-right">
                  <div class="row justify-end">
                    <q-btn
                      dense
                      no-caps
                      label="Fix Mutasi Ruangan"
                      color="orange"
                      :loading="loadingFixMutasi"
                      @click="fixMutasi('default')"
                    />
                  </div>
                </div>
              </div>
              <div class="row bg-dark text-white">
                <div class="col-auto" style="width: 5%;">
                  No
                </div>
                <div class="col-auto" style="width: 22%;">
                  Nomor Permintaan
                </div>
                <div class="col-auto" style="width: 22%;">
                  Nomor Penerimaaan
                </div>
                <div class="col-auto" style="width: calc(30% / 2)">
                  Tgl Kirim
                </div>
                <div class="col-auto" style="width: calc(30% / 2)">
                  Depo
                </div>
                <div class="col-auto text-right" style="width: calc(20% / 2)">
                  Jumlah
                </div>
                <div class="col-auto text-right" style="width: calc(20% / 2)">
                  Harga
                </div>
              </div>
              <div v-for="(da,i) in data?.mutasiruangan" :key="i">
                <div class="row items-center" :class="i%2==0?'bg-grey-2':'bg-grey-4'">
                  <div class="col-auto" style="width: 5%;">
                    {{ i+1 }}
                  </div>
                  <div class="col-auto" style="width: 22%;">
                    {{ da?.no_permintaan }}
                  </div>
                  <div class="col-auto" :class="cekNoper(da?.nopenerimaan)" style="width: 22%;">
                    {{ da?.nopenerimaan }}
                  </div>
                  <div class="col-auto" style="width: calc(30% / 2)">
                    {{ dateFull( da?.header?.tgl_kirim_depo) }}
                  </div>
                  <div class="col-auto" style="width: calc(30% / 2)">
                    {{ da?.header?.ruangan?.uraian }}
                  </div>
                  <div class="col-auto text-right" style="width: calc(20% / 2)">
                    {{ da?.jml }}
                  </div>
                  <div class="col-auto text-right" style="width: calc(20% / 2)">
                    {{ da?.harga }}
                  </div>
                </div>
              </div>
            </div>
            <!-- Resep -->
            <div v-if="data?.resep?.length" class="q-mb-md">
              <div class="row items-center ">
                <div class="col-6 text-weight-bold f-14 ">
                  Resep Keluar
                </div>
                <div class="col-4 text-right">
                  <div class="row justify-end">
                    <q-btn
                      dense
                      no-caps
                      label="Fix Resep Keluar"
                      color="orange"
                      :loading="loadingFixMutasi"
                      @click="fixMutasi('default')"
                    />
                  </div>
                </div>
                <div class="col-2 text-right">
                  <div class="row justify-end">
                    <q-btn
                      v-if="!showResep"
                      dense
                      no-caps
                      label="Show"
                      color="primary"
                      :loading="loadingFixMutasi"
                      @click="showResep=true"
                    />
                    <q-btn
                      v-if="showResep"
                      dense
                      no-caps
                      label="Hide"
                      color="primary"
                      :loading="loadingFixMutasi"
                      @click="showResep=false"
                    />
                  </div>
                </div>
              </div>
              <div v-if="showResep">
                <div class="row bg-dark text-white">
                  <div class="col-auto" style="width: 5%;">
                    No
                  </div>
                  <div class="col-auto" style="width: 22%;">
                    Nomor Resep
                  </div>
                  <div class="col-auto" style="width: 22%;">
                    Nomor Penerimaaan
                  </div>
                  <div class="col-auto" style="width: calc(30% / 2)">
                    Tgl Selesai
                  </div>
                  <div class="col-auto" style="width: calc(30% / 2)">
                    Ruangan / Poli
                  </div>
                  <div class="col-auto text-right" style="width: calc(20% / 2)">
                    Jumlah
                  </div>
                  <div class="col-auto text-right" style="width: calc(20% / 2)">
                    Harga
                  </div>
                </div>
                <div v-for="(da,i) in data?.resep" :key="i">
                  <div class="row items-center" :class="i%2==0?'bg-grey-2':'bg-grey-4'">
                    <div class="col-auto" style="width: 5%;">
                      {{ i+1 }}
                    </div>
                    <div class="col-auto" style="width: 22%;">
                      {{ da?.noresep }}
                    </div>
                    <div class="col-auto" :class="cekNoper(da?.nopenerimaan)" style="width: 22%;">
                      {{ da?.nopenerimaan }}
                    </div>
                    <div class="col-auto" style="width: calc(30% / 2)">
                      {{ dateFull( da?.heder?.tgl_selesai) }}
                    </div>
                    <div class="col-auto" style="width: calc(30% / 2)">
                      {{ da?.heder?.ruanganranap?.rs2 ??da?.heder?.poli?.rs2 }}
                    </div>
                    <div class="col-auto text-right" style="width: calc(20% / 2)">
                      {{ da?.jumlah }}
                    </div>
                    <div class="col-auto text-right" style="width: calc(20% / 2)">
                      {{ da?.harga_beli }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Resep Rac -->
            <div v-if="data?.resepracikan?.length" class="q-mb-md">
              <div class="row items-center ">
                <div class="col-6 text-weight-bold f-14 ">
                  Resep Keluar Racikan
                </div>
                <div class="col-4 text-right">
                  <div class="row justify-end">
                    <q-btn
                      dense
                      no-caps
                      label="Fix Resep Keluar"
                      color="orange"
                      :loading="loadingFixMutasi"
                      @click="fixMutasi('racikan')"
                    />
                  </div>
                </div>
                <div class="col-2 text-right">
                  <div class="row justify-end">
                    <q-btn
                      v-if="!showRacikan"
                      dense
                      no-caps
                      label="Show"
                      color="primary"
                      :loading="loadingFixMutasi"
                      @click="showRacikan=true"
                    />
                    <q-btn
                      v-if="showRacikan"
                      dense
                      no-caps
                      label="Hide"
                      color="primary"
                      :loading="loadingFixMutasi"
                      @click="showRacikan=false"
                    />
                  </div>
                </div>
              </div>
              <div v-if="showRacikan">
                <div class="row bg-dark text-white">
                  <div class="col-auto" style="width: 5%;">
                    No
                  </div>
                  <div class="col-auto" style="width: 22%;">
                    Nomor Resep
                  </div>
                  <div class="col-auto" style="width: 22%;">
                    Nomor Penerimaaan
                  </div>
                  <div class="col-auto" style="width: calc(30% / 2)">
                    Tgl Selesai
                  </div>
                  <div class="col-auto" style="width: calc(30% / 2)">
                    Ruangan / Poli
                  </div>
                  <div class="col-auto text-right" style="width: calc(20% / 2)">
                    Jumlah
                  </div>
                  <div class="col-auto text-right" style="width: calc(20% / 2)">
                    Harga
                  </div>
                </div>
                <div v-for="(da,i) in data?.resepracikan" :key="i">
                  <div class="row items-center" :class="i%2==0?'bg-grey-2':'bg-grey-4'">
                    <div class="col-auto" style="width: 5%;">
                      {{ i+1 }}
                    </div>
                    <div class="col-auto" style="width: 22%;">
                      {{ da?.noresep }}
                    </div>
                    <div class="col-auto" :class="cekNoper(da?.nopenerimaan)" style="width: 22%;">
                      {{ da?.nopenerimaan }}
                    </div>
                    <div class="col-auto" style="width: calc(30% / 2)">
                      {{ dateFull( da?.header?.tgl_selesai) }}
                    </div>
                    <div class="col-auto" style="width: calc(30% / 2)">
                      {{ da?.header?.ruanganranap?.rs2??da?.header?.poli?.rs2 }}
                    </div>
                    <div class="col-auto text-right" style="width: calc(20% / 2)">
                      {{ da?.jumlah }}
                    </div>
                    <div class="col-auto text-right" style="width: calc(20% / 2)">
                      {{ da?.harga_beli }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- mutasi antar -->
            <div v-if="data?.mutasi?.length">
              <div class="row items-center ">
                <div class="col-6 text-weight-bold f-14 ">
                  Mutasi Antar Depo
                </div>
                <div class="col-4 text-right">
                  <div class="row justify-end">
                    <q-btn
                      dense
                      no-caps
                      label="Fix Mutasi Antar"
                      color="orange"
                      :loading="loadingFixMutasi"
                      @click="fixMutasi('antar')"
                    />
                  </div>
                </div>
                <div class="col-2 text-right">
                  <div class="row justify-end">
                    <q-btn
                      v-if="!showMutasiAntar"
                      dense
                      no-caps
                      label="Show"
                      color="primary"
                      :loading="loadingFixMutasi"
                      @click="showMutasiAntar=true"
                    />
                    <q-btn
                      v-if="showMutasiAntar"
                      dense
                      no-caps
                      label="Hide"
                      color="primary"
                      :loading="loadingFixMutasi"
                      @click="showMutasiAntar=false"
                    />
                  </div>
                </div>
              </div>
              <div v-if="showMutasiAntar">
                <div class="row bg-dark text-white">
                  <div class="col-auto" style="width: 5%;">
                    No
                  </div>
                  <div class="col-auto" style="width: 22%;">
                    Nomor Permintaan
                  </div>
                  <div class="col-auto" style="width: 22%;">
                    Nomor Penerimaaan
                  </div>
                  <div class="col-auto" style="width: calc(30% / 2)">
                    Tgl Kirim
                  </div>
                  <div class="col-auto" style="width: calc(30% / 2)">
                    Depo
                  </div>
                  <div class="col-auto text-right" style="width: calc(20% / 2)">
                    Jumlah
                  </div>
                  <div class="col-auto text-right" style="width: calc(20% / 2)">
                    Harga
                  </div>
                </div>
                <div v-for="(da,i) in data?.mutasi" :key="i">
                  <div class="row items-center" :class="i%2==0?'bg-grey-2':'bg-grey-4'">
                    <div class="col-auto" style="width: 5%;">
                      {{ i+1 }}
                    </div>
                    <div class="col-auto" style="width: 22%;">
                      {{ da?.no_permintaan }}
                    </div>
                    <div class="col-auto" :class="cekNoper(da?.nopenerimaan)" style="width: 22%;">
                      {{ da?.nopenerimaan }}
                    </div>
                    <div class="col-auto" style="width: calc(30% / 2)">
                      {{ dateFull( da?.header?.tgl_kirim_depo) }}
                    </div>
                    <div class="col-auto" style="width: calc(30% / 2)">
                      {{ da?.header?.asal?.nama }}
                    </div>
                    <div class="col-auto text-right" style="width: calc(20% / 2)">
                      {{ da?.jml }}
                    </div>
                    <div class="col-auto text-right" style="width: calc(20% / 2)">
                      {{ da?.harga }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Retur -->
            <div v-if="data?.retur?.length" class="q-mb-md">
              <div class="row items-center ">
                <div class="col-6 text-weight-bold f-14 ">
                  Retur
                </div>
                <div class="col-4 text-right">
                  <div class="row justify-end">
                    <q-btn
                      dense
                      no-caps
                      label="Fix Resep Keluar"
                      color="orange"
                      :loading="loadingFixMutasi"
                      @click="fixMutasi('retur')"
                    />
                  </div>
                </div>
                <div class="col-2 text-right">
                  <div class="row justify-end">
                    <q-btn
                      v-if="!showRetur"
                      dense
                      no-caps
                      label="Show"
                      color="primary"
                      :loading="loadingFixMutasi"
                      @click="showRetur=true"
                    />
                    <q-btn
                      v-if="showRetur"
                      dense
                      no-caps
                      label="Hide"
                      color="primary"
                      :loading="loadingFixMutasi"
                      @click="showRetur=false"
                    />
                  </div>
                </div>
              </div>
              <div v-if="showRetur">
                <div class="row bg-dark text-white">
                  <div class="col-auto" style="width: 5%;">
                    No
                  </div>
                  <div class="col-auto" style="width: 22%;">
                    Nomor Resep
                  </div>
                  <div class="col-auto" style="width: 22%;">
                    Nomor Penerimaaan
                  </div>
                  <div class="col-auto" style="width: calc(30% / 2)">
                    Tgl Retur
                  </div>
                  <div class="col-auto" style="width: calc(30% / 2)">
                    Ruangan / Poli
                  </div>
                  <div class="col-auto text-right" style="width: calc(20% / 2)">
                    Jumlah
                  </div>
                  <div class="col-auto text-right" style="width: calc(20% / 2)">
                    Harga
                  </div>
                </div>
                <div v-for="(da,i) in data?.retur" :key="i">
                  <div class="row items-center" :class="i%2==0?'bg-grey-2':'bg-grey-4'">
                    <div class="col-auto" style="width: 5%;">
                      {{ i+1 }}
                    </div>
                    <div class="col-auto" style="width: 22%;">
                      {{ da?.noresep }}
                    </div>
                    <div class="col-auto" :class="cekNoper(da?.nopenerimaan)" style="width: 22%;">
                      {{ da?.nopenerimaan }}
                    </div>
                    <div class="col-auto" style="width: calc(30% / 2)">
                      {{ dateFull( da?.heder?.tgl_retur) }}
                    </div>
                    <div class="col-auto" style="width: calc(30% / 2)">
                      {{ da?.header?.ruanganranap?.rs2??da?.header?.poli?.rs2 }}
                    </div>
                    <div class="col-auto text-right" style="width: calc(20% / 2)">
                      {{ da?.jumlah_retur }}
                    </div>
                    <div class="col-auto text-right" style="width: calc(20% / 2)">
                      {{ da?.harga_beli }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </q-scroll-area>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { dateFull } from 'src/modules/formatter'
import { computed, ref } from 'vue'

const props = defineProps({
  item: { type: Object, default: () => {} },
  data: { type: Object, default: () => {} },
  loading: { type: Boolean, default: false },
  loadingResep: { type: Boolean, default: false },
  loadingFixMutasi: { type: Boolean, default: false }
})
const refListRes = ref(null)
const he = ref()
const emits = defineEmits(['close', 'fixResep'])
// eslint-disable-next-line no-unused-vars
const showResep = ref(false)
// eslint-disable-next-line no-unused-vars
const showRacikan = ref(false)
const showMutasiAntar = ref(false)
// eslint-disable-next-line no-unused-vars
const showRetur = ref(false)
const kur = ref([])
const nokur = computed(() => kur.value.map((v) => v?.noper))
function cekNoper (val) {
  if (nokur.value.includes(val)) {
    return 'bg-negative text-white'
  }
  // console.log('noper', nokur.includes(val), val)
}
// eslint-disable-next-line no-unused-vars
function fixMutasi (val) {
  console.log('fi', props.item)
  emits('fixResep', { obat: props.item?.kd_obat, tipe: val })
}
function show () {
  kur.value = props.item?.data?.data?.penKur
  he.value = refListRes.value?.$el?.clientHeight
  console.log('kur', refListRes.value?.$el?.clientHeight, props.item?.data?.data?.penKur)
}
function hide () {}

</script>
