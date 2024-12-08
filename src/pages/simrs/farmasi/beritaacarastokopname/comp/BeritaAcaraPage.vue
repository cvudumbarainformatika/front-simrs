<template>
  <div>
    <div class="row justify-end q-py-sm">
      <div class="col-auto q-mr-md">
        <q-btn
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
        </q-btn>
      </div>
    </div>
  </div>
  <div id="printMe">
    <!-- Surat -->
    <div>
      <div>
        <app-kop-surat />
      </div>
      <div class="row justify-center q-mt-md f-18 text-weight-bold">
        BERITA ACARA STOK OPNAME
      </div><div class="row justify-center q-mb-md q-mt-sm print-only">
        Nomor : {{ store.form.no_ba }}
      </div>
      <div class="row justify-center items-center q-mb-md q-mt-sm print-hide">
        <div class="col-srink q-mr-sm">
          Nomor :
        </div> <div class="col-shrink" style="width: 40%;">
          <app-input
            v-model="store.form.no_ba"
            label="Nomor Surat"
            outlined
          />
        </div>
      </div>
      <div class="row">
        <div class="print-hide" style="width: 20%;">
          <app-input-date-human
            :model="store.periodeOpname.tgl_ba" label="Tanggal Berita Acara" outlined @set-display="(val)=>{
              store.periodeOpname.tgl_ba=val
            }"
            @db-model="val=>{
              store.form.tgl_ba=val
            }"
          />
        </div>
      </div>
      <p>Pada hari ini, {{ date.formatDate(store.form.tgl_ba, 'dddd') }}, tanggal {{ date.formatDate(store.form.tgl_ba, 'DD MMMM YYYY') }}, petugas farmasi yang disebutkan di bawah ini:</p>
      <!-- para pelaksana -->
      <div v-for="(item,i) in store.form.pelaksanas" :key="item">
        <div class="row">
          <div class="col-auto" style="width: 3%;">
            {{ i+1 }}.
          </div>
          <div class="col-auto" style="width: 40%;">
            {{ store.pelaksanas.find(f=>f.id===item)?.nama??'pelaksana tidak ditemukan' }}
          </div>
          <div class="col-auto" style="width: 2%;">
            -
          </div>
          <div class="col-auto" style="width: 50%;">
            {{ store.pelaksanas.find(f=>f.id===item)?.relasi_jabatan?.jabatan??'jabatan tidak ditemukan' }}
          </div>
          <div class="col-auto text-right print-hide" style="width: 5%;">
            <q-btn
              dense
              flat
              color="negative"
              icon="icon-mat-delete_sweep"
              @click="()=>{
                const index=store.form.pelaksanas.findIndex(f=>f===item)
                console.log('index',index);

                if(index>=0) store.form.pelaksanas.splice(index,1)
              }"
            >
              <q-tooltip>Hapus Pelaksana</q-tooltip>
            </q-btn>
          </div>
        </div>
      </div>

      <p> Telah melaksanakan kegiatan stok opname persediaan farmasi di ruangan sebagai berikut:</p>
      <div class="row q-ml-md">
        1. Gudang Kamar Obat
      </div>
      <div class="row q-ml-md">
        2. Gudang Floorstok
      </div>
      <div class="row q-ml-md">
        3. Depo Rawat Jalan
      </div>
      <div class="row q-ml-md">
        4. Depo Rawat Inap
      </div>
      <div class="row q-ml-md">
        5. Depo IGD
      </div>
      <div class="row q-ml-md">
        6. Depo OK
      </div>
      <p>
        Adapun hasil dari stok opname tersebut tercantum dalam lampiran.
      </p>
      <p>
        Demikian berita acara ini dibuat dengan sebenar-benarnya untuk dapat digunakan sebagaimana mestinya.
      </p>
      <div class="row q-mt-xl justify-end q-mr-lg print-hide">
        <div class="col-6">
          <app-autocomplete
            v-model="store.form.peg_id_pj_so"
            label="Pilih Penanggung Jawab"
            :source="store.pegawaies"
            option-label="nama"
            option-value="id"
            outlined
            clearable
          />
        </div>
      </div>
      <div class="row q-mt-xl justify-end q-mr-lg">
        <div class="col-4 text-center">
          Probolinggo, {{ date.formatDate(store.form.tgl_selesai, 'dddd') }} {{ date.formatDate(store.form.tgl_selesai, 'DD MMMM YYYY') }}
        </div>
      </div>
      <div class="row q-mt-sm q-mb-xl justify-between q-mx-lg">
        <div class="col-4 text-center">
          {{ store.KaUang?.relasi_jabatan?.jabatan }}
        </div>
        <div class="col-4 text-center">
          {{ store.KaFarmasi?.relasi_jabatan?.jabatan?.toLowerCase()?.includes('farmasi')?store.KaFarmasi?.relasi_jabatan?.jabatan:store.KaFarmasi?.jabatan_tambahan?.jabatan }}
        </div>
        <div class="col-4 text-center">
          Penanggung Jawab
        </div>
      </div>
      <div class="row q-my-xl justify-between q-mx-lg">
        <div class="col-4 text-center">
          {{ store.KaUang?.nama }}
        </div>
        <div class="col-4 text-center">
          {{ store.KaFarmasi?.nama }}
        </div>

        <div class="col-4 text-center">
          {{ store.pegawaies.find(f=>f.id===store.form.peg_id_pj_so)?.nama??'Penanggung Jawab Belum dipilih' }}
        </div>
      </div>
    </div>

    <!-- lampiran -->
    <div v-if="store.form?.tglopname">
      <div class="q-mt-xl q-mb-md " />
      <div v-for="(gudang , i) in store.gudangs" :key="gudang" class="q-my-md">
        <div class="row text-weight-bold">
          Lampiran {{ i+1 }}
        </div>
        <div class="row q-mb-sm">
          {{ gudang?.nama }}
        </div>
        <div v-if="gudang?.opname?.length">
          <div class="row bg-dark text-white text-weight-bold q-pa-xs">
            <div class="col-auto" style="width: 5%;">
              No
            </div>
            <div class="col-auto" style="width: 10%;">
              Kode Obat
            </div>
            <div class="col-auto" style="width: 20%;">
              Nama Obat
            </div>
            <div class="col-auto" style="width: 10%;">
              Satuan
            </div>
            <div class="col-auto" style="width: 10%;">
              Stok Fisik
            </div>
            <div class="col-auto" style="width: 10%;">
              Stok Sistem
            </div>
            <div class="col-auto" style="width: 10%;">
              Selisih Stok
            </div>
            <div class="col-auto" style="width: 25%;">
              Keterangan
            </div>
          </div>
          <div v-for="(item, t) in gudang?.opname" :key="item">
            <div class="row" :class="t%2===1?'bg-grey-4':'bg-grey-1'">
              <div class="col-auto" style="width: 5%;">
                {{ t+1 }}.
              </div>
              <div class="col-auto f-10" style="width: 10%;">
                {{ item?.kd_obat }}
              </div>
              <div class="col-auto" style="width: 20%;">
                {{ item?.nama_obat }}
              </div>
              <div class="col-auto" style="width: 10%;">
                {{ item?.satuan_k }}
              </div>
              <div class="col-auto" style="width: 10%;">
                {{ formatDouble( parseFloat(item?.jmlFisik??0),2) }}
              </div>
              <div class="col-auto" style="width: 10%;">
                {{ formatDouble( parseFloat(item?.jmlOpname??0),2) }}
              </div>
              <div class="col-auto" :class="(parseInt(item?.jmlFisik??0) - parseInt(item?.jmlOpname??0))!==0?'text-negative':''" style="width: 10%;">
                {{ formatDouble( (parseFloat(item?.jmlFisik??0) - parseFloat(item?.jmlOpname??0)),2) }}
              </div>
              <div class="col-auto" style="width: 25%;">
                {{ item?.keterangan }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { date } from 'quasar'
import { formatDouble } from 'src/modules/formatter'
import { useSPJOPNameStore } from 'src/stores/simrs/farmasi/spjopname/spjopname'

const store = useSPJOPNameStore()

const printObj = {
  id: 'printMe',
  popTitle: 'Laporan Persediaan Farmasi'

}
</script>
<style lang="scss" scoped>
p{
  text-indent: 15px;
  padding-top: 10px;
  padding-bottom: 5px;
}
</style>
