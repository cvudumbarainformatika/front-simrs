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
    <div>
      <app-kop-surat />
    </div>
    <div class="row justify-center q-mt-md f-18 text-weight-bold">
      SURAT PERNYATAAN KEGIATAN STOK OPNAME
    </div>
    <div class="row justify-center q-mb-md q-mt-sm print-only">
      Nomor : {{ store.form.no_sp }}
    </div>
    <div class="row justify-center items-center q-mb-md q-mt-sm print-hide">
      <div class="col-srink q-mr-sm">
        Nomor :
      </div> <div class="col-shrink" style="width: 40%;">
        <app-input
          v-model="store.form.no_sp"
          label="Nomor Surat"
          outlined
        />
      </div>
    </div>
    <div class="row q-mt-lg">
      Yang bertanda tangan di bawah ini:
    </div>
    <!-- Ka Farmasi -->
    <div class="row q-mt-sm">
      <div class="col-auto" style="width: 3%;">
        1.
      </div>
      <div class="col-1">
        Nama
      </div>
      <div class="col-auto" style="width: 2%;">
        :
      </div>
      <div class="col-grow">
        {{ store.KaFarmasi?.nama }}
      </div>
    </div>
    <div class="row">
      <div class="col-auto" style="width: 3%;" />
      <div class="col-1">
        Jabatan
      </div>
      <div class="col-auto" style="width: 2%;">
        :
      </div>
      <div class="col-grow">
        {{ store.KaFarmasi?.relasi_jabatan?.jabatan?.toLowerCase()?.includes('farmasi')?store.KaFarmasi?.relasi_jabatan?.jabatan:store.KaFarmasi?.jabatan_tambahan?.jabatan }}
      </div>
    </div>
    <!-- Ka Keuangan -->
    <div class="row q-mt-sm">
      <div class="col-auto" style="width: 3%;">
        2.
      </div>
      <div class="col-1">
        Nama
      </div>
      <div class="col-auto" style="width: 2%;">
        :
      </div>
      <div class="col-grow">
        {{ store.KaUang?.nama }}
      </div>
    </div>
    <div class="row">
      <div class="col-auto" style="width: 3%;" />
      <div class="col-1">
        Jabatan
      </div>
      <div class="col-auto" style="width: 2%;">
        :
      </div>
      <div class="col-grow">
        {{ store.KaUang?.relasi_jabatan?.jabatan }}
      </div>
    </div>
    <div class="row">
      <div class="print-hide" style="width: 20%;">
        <app-input-date-human
          :model="store.periodeOpname.tgl_mulai" label="Tanggal Mulai" outlined @set-display="(val)=>{
            store.periodeOpname.tgl_mulai=val
          }"
          @db-model="val=>{
            store.form.tgl_mulai=val
          }"
        />
      </div>
      <div class="print-hide" style="width: 20%;">
        <app-input-date-human
          :model="store.periodeOpname.tgl_selesai" label="Tanggal Selesai" outlined @set-display="(val)=>{
            store.periodeOpname.tgl_selesai=val
          }"
          @db-model="val=>{
            store.form.tgl_selesai=val
          }"
        />
      </div>
    </div>
    <p>
      Dengan ini menyatakan bahwa kegiatan stok opname persediaan farmasi telah dilaksanakan pada tanggal
      <span class="q-mx-xs">{{ date.formatDate( store.form.tgl_mulai, 'DD MMMM YYYY') }}</span>
      sampai dengan tanggal
      <span class="q-mx-xs">{{ date.formatDate( store.form.tgl_selesai, 'DD MMMM YYYY') }}</span>
      di ruangan sebagai berikut:
    </p>

    <div class="row q-ml-sm">
      1. Gudang Kamar Obat
    </div>

    <div class="row q-ml-sm">
      2. Gudang Floorstok
    </div>

    <div class="row q-ml-sm">
      3. Depo Rawat Jalan
    </div>

    <div class="row q-ml-sm">
      4. Depo Rawat Inap
    </div>

    <div class="row q-ml-sm">
      5. Depo IGD
    </div>

    <div class="row q-ml-sm">
      6. Depo Kamar Operasi
    </div>
    <p>
      Kegiatan stok opname ini telah dilaksanakan sesuai dengan prosedur yang berlaku dan hasilnya telah disahkan dalam berita acara stok opname nomor {{ store.form.no_ba }}.
    </p>
    <p>
      Demikian surat pernyataan ini dibuat dengan sebenar-benarnya untuk dapat digunakan sebagaimana mestinya.
    </p>
    <div class="row q-mt-xl justify-end q-mr-lg">
      <div class="col-4 text-center">
        Probolinggo, {{ date.formatDate(store.form.tgl_selesai, 'dddd') }} {{ date.formatDate(store.form.tgl_selesai, 'DD MMMM YYYY') }}
      </div>
    </div>
    <div class="row q-mt-sm q-mb-xl justify-between q-mx-lg">
      <div class="col-4 text-center">
        {{ store.KaFarmasi?.relasi_jabatan?.jabatan?.toLowerCase()?.includes('farmasi')?store.KaFarmasi?.relasi_jabatan?.jabatan:store.KaFarmasi?.jabatan_tambahan?.jabatan }}
      </div>
      <div class="col-4 text-center">
        {{ store.KaUang?.relasi_jabatan?.jabatan }}
      </div>
    </div>
    <div class="row q-my-xl justify-between q-mx-lg">
      <div class="col-4 text-center">
        {{ store.KaFarmasi?.nama }}
      </div>
      <div class="col-4 text-center">
        {{ store.KaUang?.nama }}
      </div>
    </div>
  </div>
</template>
<script setup>
import { date } from 'quasar'
import { useSPJOPNameStore } from 'src/stores/simrs/farmasi/spjopname/spjopname'

const store = useSPJOPNameStore()

const printObj = {
  id: 'printMe',
  popTitle: 'Laporan Persediaan Farmasi'

}
</script>
<style lang="scss" scoped>
p{
  text-indent: 25px;
  padding-top: 10px;
  padding-bottom: 5px;
}
</style>
