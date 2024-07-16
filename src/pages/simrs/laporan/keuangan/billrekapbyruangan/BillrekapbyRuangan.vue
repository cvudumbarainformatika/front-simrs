<template>
  <q-page padding>
    <q-card>
      <q-card-section>
        <div class="row items-center garis-bawah">
          <div class="col-2">
            <q-img
              src="~assets/images/logo-kota-grey.png"
              spinner-color="white"
              style="height: 3.56cm; max-width: 2.86cm"
            />
          </div>
          <div class="col-8">
            <div class="row justify-center f-18">
              PEMERINTAH KOTA PROBOLINGGO
            </div>
            <div class="row justify-center f-14 text-weight-bold">
              DINAS KESEHATAN, PENGENDALIAN PENDUDUK, DAN KELUARGA BERENCANA
            </div>
            <div class="row justify-center f-28 text-weight-bold">
              UOBK RSUD DOKTER MOHAMAD SALEH
            </div>
            <div class="row justify-center f-14">
              Jl. Mayjen Panjaitan No.65 Telp.(0335) 433119, 42118 Fax (0335) 432702
            </div>
            <div class="row justify-center f-14">
              E-mail : rsudprob@probolinggokota.go.id
            </div>
            <div class="row justify-center f-14 text-weight-bold">
              PROBOLINGGO  67219
            </div>
          </div>
          <div class="col-2">
            <q-img
              src="~assets/logos/logo-rsud.png"
              spinner-color="white"
              style="height: 4cm; max-width: 4cm"
            />
          </div>
        </div>
        <div class="row fit justify-center items-center text-weight-bold f-18">
          REKAP TAGIHAN PASIEN PER RUANGAN
        </div>
        <div class="row fit justify-center items-center text-weight-bold f-14">
          periode
        </div>
      </q-card-section>
      <q-card-section>
        <Customtable
          :ada-cari="false"
          :items="store.items"
          :columns="store.kolom"
          :column-hide="store.kolomhide"
          :default-btn="false"
          :right-action="false"
          row-no
        >
          <!-- tombol print -->
          <template #header-right-before>
            <!-- <q-btn
              ref="refPrint"
              v-print="printObj"
              unelevated
              color="dark"
              round
              size="sm"
              icon="icon-mat-print"
            >
              <q-tooltip
                class="primary"
                :offset="[10, 10]"
              >
                Print
              </q-tooltip>
            </q-btn> -->
          </template>
          <template #header-left-after-search>
            <q-form
              ref="formRef"
              class="row q-pa-md q-col-gutter-xs"
              @submit="store.initAmbilData"
            >
              <div class="row q-col-gutter-sm">
                <div>
                  <app-input-date-human
                    :model="store.tanggal.from"
                    label="dari tanggal"
                    outlined
                    @db-model="setTo"
                    @set-display="setToDisp"
                  />
                </div>
                <div>
                  <app-input-date-human
                    :model="store.tanggal.to"
                    label="sampai tanggal"
                    outlined
                    @db-model="setTox"
                    @set-display="setToFromDisp"
                  />
                </div>
                <div>
                  <q-select
                    v-model="store.params.layanan"
                    use-input
                    fill-input
                    hide-selected
                    option-value="kodelayanan"
                    option-label="namalayanan"
                    :options="layanan"
                    emit-value
                    map-options
                    dense
                    outlined
                    label="Pilih Layanan"
                    transition-show="scale"
                    transition-hide="scale"
                    :rules="[
                      val => !!val || 'Harus diisi'
                    ]"
                    @update:model-value="(val) => isiLayananx(val)"
                  />
                </div>
                <div>
                  <q-select
                    v-model="store.params.ruangan"
                    use-input
                    fill-input
                    hide-selected
                    option-value="koderuangan"
                    option-label="namaruangan"
                    :options="ruangan"
                    emit-value
                    map-options
                    dense
                    outlined
                    label="Pilih Ruangan"
                    transition-show="scale"
                    transition-hide="scale"
                    :rules="[
                      val => !!val && !!store.params.layanan || 'Harus diisi'
                    ]"
                  />
                </div>
                <div>
                  <q-btn
                    label="Cari"
                    type="submit"
                    color="primary"
                    :loading="store.loading"
                    :disable="store.loading"
                  />
                </div>
              </div>
            </q-form>
          </template>
          <template #cell-Identitas="{row}">
            Noreg : {{ row?.rs1 }} <br>
            Norm : {{ row?.rs2 }} <br>
            Tgl MRS : {{ row?.rs3 }} <br>
            Tgl KRS : {{ row?.rs4 }}
          </template>
          <template #cell-Admin="{row}">
            <q-item
              v-for="(admin , a) in row?.Admin"
              :key="a"
              class="list-move"
            >
              {{ admin?.namaruangan }} = {{ formatDouble(admin?.subtotal) }} <br>
            </q-item>
          </template>
          <template #cell-AkomodasiKamar="{row}">
            <q-item
              v-for="(akomodasiruangan , n) in row?.akomodasiKamar"
              :key="n"
              class="list-move"
            >
              {{ akomodasiruangan?.namaruangan }} = {{ formatDouble(akomodasiruangan?.subtotal) }} <br>
            </q-item>
          </template>
          <template #cell-BiayaMatrei="{row}">
            <q-item
              v-for="(biayamaterai , n) in row?.biayamaterai"
              :key="n"
              class="list-move"
            >
              {{ biayamaterai?.namaruangan }} = {{ formatDouble(biayamaterai?.subtotal) }} <br>
            </q-item>
          </template>
          <template #cell-TindakanDokter="{row}">
            <!-- <q-item
              v-for="(TindakanDokter , n) in row?.TindakanDokter"
              :key="n"
              class="list-move"
            > -->
            <div
              v-if="row?.TindakanDokter.length >= 0"
            >
              <q-item
                v-for="(TindakanDokter , td) in row?.TindakanDokter"
                :key="td"
                class="list-move"
              >
                {{ TindakanDokter?.namaruangan }} = {{ formatDouble(TindakanDokter?.subtotal) }} <br>
              </q-item>
            </div>
          </template>
          <template #cell-Visite="{row}">
            <div
              v-if="row?.Visite.length >= 0"
            >
              <q-item
                v-for="(Visite , v) in row?.Visite"
                :key="v"
                class="list-move"
              >
                {{ Visite?.namaruangan }} = {{ formatDouble(Visite?.subtotal) }} <br>
              </q-item>
            </div>
          </template>
          <template #cell-TindakanKeperawatan="{row}">
            <div
              v-if="row?.TindakanPerawat.length >= 0"
            >
              <q-item
                v-for="(TindakanPerawat , tp) in row?.TindakanPerawat"
                :key="tp"
                class="list-move"
              >
                {{ TindakanPerawat?.namaruangan }} = {{ formatDouble(TindakanPerawat?.subtotal) }} <br>
              </q-item>
            </div>
          </template>
          <template #cell-MakanPasien="{row}">
            <div
              v-if="row?.MakanPasien.length >= 0"
            >
              <q-item
                v-for="(MakanPasien , mp) in row?.MakanPasien"
                :key="mp"
                class="list-move"
              >
                {{ MakanPasien?.namaruangan }} = {{ formatDouble(MakanPasien?.subtotal) }} <br>
              </q-item>
            </div>
          </template>
          <template #cell-Oksigen="{row}">
            <div
              v-if="row?.Oksigen.length >= 0"
            >
              <q-item
                v-for="(Oksigen , ok) in row?.Oksigen"
                :key="ok"
                class="list-move"
              >
                {{ Oksigen?.namaruangan }} = {{ formatDouble(Oksigen?.subtotal) }} <br>
              </q-item>
            </div>
          </template>
          <template #cell-Keperawatan="{row}">
            <div
              v-if="row?.Keperawatan.length >= 0"
            >
              <q-item
                v-for="(Keperawatan , kp) in row?.Keperawatan"
                :key="kp"
                class="list-move"
              >
                {{ Keperawatan?.namaruangan }} = {{ formatDouble(Keperawatan?.subtotal) }} <br>
              </q-item>
            </div>
          </template>
          <template #cell-Laborat="{row}">
            <div
              v-if="row?.Laborat.length >= 0"
            >
              <q-item
                v-for="(Laborat , lab) in row?.Laborat"
                :key="lab"
                class="list-move"
              >
                {{ Laborat?.namaruangan }} = {{ formatDouble(Laborat?.subtotal) }} <br>
              </q-item>
            </div>
          </template>
          <template #cell-Radiologi="{row}">
            <div
              v-if="row?.Laborat.length >= 0"
            >
              <q-item
                v-for="(Radiologi , rad) in row?.Radiologi"
                :key="rad"
                class="list-move"
              >
                {{ Radiologi?.namaruangan }} = {{ formatDouble(Radiologi?.subtotal) }} <br>
              </q-item>
            </div>
          </template>
          <template #cell-Endoscopy="{row}">
            <div
              v-if="row?.Endoscopy.length >= 0"
            >
              <q-item
                v-for="(Endoscopy , end) in row?.Endoscopy"
                :key="end"
                class="list-move"
              >
                {{ Endoscopy?.namaruangan }} = {{ formatDouble(Endoscopy?.subtotal) }} <br>
              </q-item>
            </div>
          </template>
          <template #cell-KamarOperasiIbs="{row}">
            <div
              v-if="row?.Kamaroperasiibs.length >= 0"
            >
              <q-item
                v-for="(Kamaroperasiibs , kob) in row?.Kamaroperasiibs"
                :key="kob"
                class="list-move"
              >
                {{ Kamaroperasiibs?.namaruangan }} = {{ formatDouble(Kamaroperasiibs?.subtotal) }} <br>
              </q-item>
            </div>
          </template>
          <template #cell-KamarOperasiIgd="{row}">
            <div
              v-if="row?.Kamaroperasiigd.length >= 0"
            >
              <q-item
                v-for="(Kamaroperasiigd , okigd) in row?.Kamaroperasiigd"
                :key="okigd"
                class="list-move"
              >
                {{ Kamaroperasiigd?.namaruangan }} = {{ formatDouble(Kamaroperasiigd?.subtotal) }} <br>
              </q-item>
            </div>
          </template>
          <template #cell-TindakanOperasi="{row}">
            <div
              v-if="row?.Tindakanoperasi.length >= 0"
            >
              <q-item
                v-for="(Tindakanoperasi , end) in row?.Tindakanoperasi"
                :key="end"
                class="list-move"
              >
                {{ Tindakanoperasi?.namaruangan }} = {{ formatDouble(Tindakanoperasi?.subtotal) }} <br>
              </q-item>
            </div>
          </template>
          <template #cell-TindakanOperasiIgd="{row}">
            <div
              v-if="row?.TindakanOperasiIgd.length >= 0"
            >
              <q-item
                v-for="(TindakanOperasiIgd , toi) in row?.TindakanOperasiIgd"
                :key="toi"
                class="list-move"
              >
                {{ TindakanOperasiIgd?.namaruangan }} = {{ formatDouble(TindakanOperasiIgd?.subtotal) }} <br>
              </q-item>
            </div>
          </template>
          <template #cell-TindakanFisioterapi="{row}">
            <div
              v-if="row?.TindakanFisioterapi.length >= 0"
            >
              <q-item
                v-for="(TindakanFisioterapi , tfi) in row?.TindakanFisioterapi"
                :key="tfi"
                class="list-move"
              >
                {{ TindakanFisioterapi?.namaruangan }} = {{ formatDouble(TindakanFisioterapi?.subtotal) }} <br>
              </q-item>
            </div>
          </template>
          <template #cell-Sedasi="{row}">
            <div
              v-if="row?.TindakananastesidiLuarOkdanIcu.length >= 0"
            >
              <q-item
                v-for="(TindakananastesidiLuarOkdanIcu , s) in row?.TindakananastesidiLuarOkdanIcu"
                :key="s"
                class="list-move"
              >
                {{ TindakananastesidiLuarOkdanIcu?.namaruangan }} = {{ formatDouble(TindakananastesidiLuarOkdanIcu?.subtotal) }} <br>
              </q-item>
            </div>
          </template>
          <template #cell-TindakanCardio="{row}">
            <div
              v-if="row?.TindakanCardio.length >= 0"
            >
              <q-item
                v-for="(TindakanCardio , tc) in row?.TindakanCardio"
                :key="tc"
                class="list-move"
              >
                {{ TindakanCardio?.namaruangan }} = {{ formatDouble(TindakanCardio?.subtotal) }} <br>
              </q-item>
            </div>
          </template>
          <template #cell-TindakanEeg="{row}">
            <div
              v-if="row?.TindakanEeg.length >= 0"
            >
              <q-item
                v-for="(TindakanEeg , te) in row?.TindakanEeg"
                :key="te"
                class="list-move"
              >
                {{ TindakanEeg?.namaruangan }} = {{ formatDouble(TindakanEeg?.subtotal) }} <br>
              </q-item>
            </div>
          </template>
          <template #cell-PsikologtransUmum="{row}">
            <div
              v-if="row?.PsikologtransUmum.length >= 0"
            >
              <q-item
                v-for="(PsikologtransUmum , ps) in row?.PsikologtransUmum"
                :key="ps"
                class="list-move"
              >
                {{ PsikologtransUmum?.namaruangan }} = {{ formatDouble(PsikologtransUmum?.subtotal) }} <br>
              </q-item>
            </div>
          </template>
          <template #cell-Bdrs="{row}">
            <div
              v-if="row?.Bdrs.length >= 0"
            >
              <q-item
                v-for="(Bdrs , bd) in row?.Bdrs"
                :key="bd"
                class="list-move"
              >
                {{ Bdrs?.namaruangan }} = {{ formatDouble(Bdrs?.subtotal) }} <br>
              </q-item>
            </div>
          </template>
          <template #cell-Penunjangkeluar="{row}">
            <div
              v-if="row?.Penunjangkeluar.length >= 0"
            >
              <q-item
                v-for="(Penunjangkeluar , bd) in row?.Penunjangkeluar"
                :key="bd"
                class="list-move"
              >
                {{ Penunjangkeluar?.namaruangan }} = {{ formatDouble(Penunjangkeluar?.subtotal) }} <br>
              </q-item>
            </div>
          </template>
          <template #cell-Farmasi="{row}">
            <div
              v-if="row?.Farmasi.length >= 0"
            >
              <q-item
                v-for="(Farmasi , fr) in row?.Farmasi"
                :key="fr"
                class="list-move"
              >
                <div class="on-left">
                  {{ Farmasi?.namaruangan }} = {{ formatDouble(Farmasi?.subtotal) }}
                </div>
                <br>
              </q-item>
            </div>
          </template>
          <template #cell-Total="{row}">
            <div
              v-if="row?.TotalAll.length >= 0"
            >
              <q-item
                v-for="(TotalAll , t) in row?.TotalAll"
                :key="t"
                class="list-move"
              >
                <div class="on-left">
                  Total {{ formatDouble(TotalAll?.subtotal) }}
                </div>
                <br>
              </q-item>
            </div>
          </template>
        </Customtable>
      </q-card-section>
    </q-card>
  </q-page>
</template>
<script setup>
import { ref } from 'vue'
import { formatDouble } from 'src/modules/formatter'
import Customtable from '../../rekap/CustomTable.vue'
import { useLaporanRekapBillByRuanganStore } from 'src/stores/simrs/laporan/keuangan/billbyruangan/billrekapbyruangan'

const store = useLaporanRekapBillByRuanganStore()
// const to = date.formatDate(Date.now(), 'DD MMMM YYYY')
// const from = date.formatDate(Date.now(), 'DD MMMM YYYY')
const layanan = ref([
  {
    kodelayanan: '1',
    namalayanan: 'IGD'
  },
  {
    kodelayanan: '2',
    namalayanan: 'RAWAT JALAN'
  },
  {
    kodelayanan: '3',
    namalayanan: 'RAWAT INAP'
  }
])
const ruangan = ref([])
// const koderuangan = ref(null)

function isiLayananx (val) {
  store.params.ruangan = ''
  console.log('sasa', val)
  if (val === '1') {
    this.ruangan = [
      {
        koderuangan: 'POL014',
        namaruangan: 'IGD'
      }
    ]
  }
  else if (val === '2') {
    this.ruangan = store.rajal.map(x => {
      return {
        koderuangan: x.kodepoli,
        namaruangan: x.polirs
      }
    })
    this.ruangan.unshift(
      {
        koderuangan: '1',
        namaruangan: 'Semua Ruangan'
      }
    )
  }
  else if (val === '3') {
    this.ruangan = store.ranap.map(x => {
      return {
        koderuangan: x.rs4,
        namaruangan: x.rs5
      }
    })
    this.ruangan.unshift(
      {
        koderuangan: '1',
        namaruangan: 'Semua Ruangan'
      }
    )
  }
}

function setToDisp (vaal) {
  store.tanggal.from = vaal
}

function setToFromDisp (vaal) {
  store.tanggal.to = vaal
}

function setTo (val) {
  store.params.tgldari = val
}

function setTox (val) {
  store.params.tglsampai = val
}

store.getRuanganPoli()
store.getRuanganRanap()
store.getTigaPuluhTarif()

</script>

<style lang="scss" scoped>
.garis-bawah{
  border-bottom: 6px solid black;
  border-bottom-style: double;
}
.anu{
  max-width: 150px;
  min-width: 50px;
}
.wrap_it{
  overflow-wrap: normal !important;
  word-wrap: normal !important;
  white-space: normal !important;
  word-break: break-word;
}
.kecilin{
  min-width: 10px;
  max-width: 100px;
  white-space: normal !important;
  overflow-wrap: normal !important;
  word-wrap: normal !important;
  word-break: break-word;
}

</style>
