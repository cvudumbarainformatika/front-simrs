<template>
  <q-dialog persistent @show="show()" @hide="hide()">
    <q-card style="width: 1100px; height: 90vh; max-width: 90vw;">
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
              <div class="col-6">
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
            </div>

            <div v-for="(ku,i) in item?.data?.data?.penKur" :key="i">
              <div class="row items-center " :class="i%2==0?'bg-grey-2':'bg-grey-4'">
                <div class="col-auto" style="width: 5%;">
                  {{ i+1 }}
                </div>
                <div class="col-6">
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
              </div>
            </div>
          </div>
          <div class="col-2 text-right">
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
          </div>
        </div>
      </q-card-section>
      <q-card-section class="q-mb-lg">
        <div v-if="eksekusi" class="q-mb-md">
          <div class="row items-center">
            <div class="col-2">
              <div class="row items-center">
                <div class="col-9">
                  Jumlah transaksi ditemukan
                </div>
                <div class="col-1">
                  :  {{ eksekusi?.count }}
                </div>
              </div>
            </div>
            <div class="col-10">
              <div v-for="ret in eksekusi?.retMutasi" :key="ret">
                <div class="row items-center">
                  <div class="col-2">
                    <div class="row items-center">
                      <div class="col-8">
                        Target Jumlah:
                      </div>
                      <div class="col-4 text-weight-bold text-primary" style="overflow-wrap: break-word;">
                        {{ formatDouble(parseFloat(ret?.targetJumlah),2) }}
                      </div>
                    </div>
                  </div>
                  <div class="col-2">
                    <div class="row items-center">
                      <div class="col-8">
                        Jumlah Ditemukan:
                      </div>
                      <div class="col-4 text-weight-bold text-negative" style="overflow-wrap: break-word;">
                        {{ formatDouble(parseFloat(ret?.accJumlah),2) }}
                      </div>
                    </div>
                  </div>
                  <div class="col-4">
                    <div class="row items center">
                      <div class="col-4">
                        Target Nomor Penerimaan
                      </div>
                      <div class="col-8">
                        <div v-for="tar in ret?.targets" :key="tar">
                          <div class="row">
                            {{ tar?.noper }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-4">
                    <div class="row items center">
                      <div class="col-4">
                        Target Ditemukan
                      </div>
                      <div v-if="ret?.dataBolehDiganti?.length" class="col-8">
                        <q-scroll-area style="height: 100px;">
                          <div v-for="tar in ret?.dataBolehDiganti" :key="tar">
                            <div class="row">
                              <div class="col-8">
                                {{ tar?.noresep }}
                              </div>
                              <div class="col-4">
                                {{ tar?.jumlah }}
                              </div>
                            </div>
                          </div>
                        </q-scroll-area>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="loading" style="height: 300px;">
          <app-loading />
        </div>
        <div v-if="!loading && !data?.length" style="height: 300px;">
          <app-no-data />
        </div>
        <div v-if="!loading && data?.length" style="height: 300px;">
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
          <div v-for="(da,i) in data" :key="i">
            <div
              class="row items-center" :class="i%2==0?'bg-grey-2':'bg-grey-4'+ ' ' + (nokur.includes(da?.nopenerimaan)?'cursor-pointer bisa-hover':'')"
              @click="()=>{
                if(nokur.includes(da?.nopenerimaan)){
                  console.log(nokur.includes(da?.nopenerimaan), da);
                  bukaPecah=true
                  dataResep=da
                  kdobat=da?.kd_obat
                  tipeResep='mutasi'
                }
              }"
            >
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
      </q-card-section>
      <PecahNomor
        v-model="bukaPecah"
        :data="dataResep"
        :tipe="tipeResep"
        :kdobat="kdobat"
        :eksekusi="eksekusi"
        :kur="item?.data?.data?.penKur"
        @close="()=>{
          bukaPecah=false
          dataResep={}
          tipeResep=''
          kdobat=''
        }"
        @simpan="(val)=>{
          emits('simpanPecah',val)
        }"
        @ganti="(val)=>{
          emits('ganti',val)
        }"
      />
    </q-card>
  </q-dialog>
</template>
<script setup>
import { dateFull, formatDouble } from 'src/modules/formatter'
import { computed, defineAsyncComponent, ref } from 'vue'

const props = defineProps({
  item: { type: Object, default: () => {} },
  data: { type: Object, default: () => {} },
  loading: { type: Boolean, default: false },
  loadingResep: { type: Boolean, default: false },
  loadingFixMutasi: { type: Boolean, default: false }
})

const PecahNomor = defineAsyncComponent(() => import('./CompPecahNomor.vue'))
const bukaPecah = ref(false)
const dataResep = ref({})
const tipeResep = ref('')
const kdobat = ref('')

const emits = defineEmits(['close', 'fixMutasi', 'simpanPecah', 'ganti'])
const kur = ref([])
const nokur = computed(() => props.item?.data?.data?.penKur.map((v) => v?.noper))
const eksekusi = computed(() => props.item?.data?.data?.eksekusi)
function cekNoper (val) {
  if (nokur.value.includes(val)) {
    return 'bg-negative text-white'
  }
  // console.log('noper', nokur.includes(val), val)
}
function fixMutasi () {
  console.log('fi', props.item)
  emits('fixMutasi', props.item?.kd_obat)
}
function show () {
  kur.value = props.item?.data?.data?.penKur
  // nokur = kur.value.map((v) => v?.noper)
  console.log('kur', kur.value)
}
function hide () {
  bukaPecah.value = false
  dataResep.value = {}
  tipeResep.value = ''
  kdobat.value = ''
}

</script>

<style lang="scss" scoped>
.bisa-hover:hover{
  background-color: #81e6db !important;
}
</style>
