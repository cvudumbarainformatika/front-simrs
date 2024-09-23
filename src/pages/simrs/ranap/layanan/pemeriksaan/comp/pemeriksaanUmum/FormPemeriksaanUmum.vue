<template>
  <div class="row q-col-gutter-xs full-width">
    <q-card flat bordered class="col-12 relative-position">
      <q-card-section class="q-pa-sm bg-grey-4">
        <strong>Pemeriksaan Umum</strong>
      </q-card-section>
      <q-separator />
      <q-card-section class="q-pa-sm row q-col-gutter-xs ">
        <q-select
          v-model="store.form.keadaanUmum"
          dense
          standout="bg-yellow-3 text-black"
          outlined
          label="Keadaan Umum"
          :options="store.keadaanUmums"
          class="col-4"
          input-class="ellipsis"
          fill-input
          :rules="[val => !!val || 'Harap diisi']"
          hide-bottom-space
        />
        <app-input-simrs label="BB (kg)" class-tambahan="col-2" v-model="store.form.bb" :valid="{ number: true }" :lazy-rules="false" />
        <app-input-simrs label="TB (cm)" class="col-2" v-model="store.form.tb" :valid="{ number: true }" />
        <app-input-simrs label="N (x/mnt)" class="col-2" v-model="store.form.nadi" :valid="{ number: true }" :lazy-rules="true" />
        <app-input-simrs label="Sis (mmHg)" class="col-2" v-model="store.form.sistole" :valid="{ number: true }" :lazy-rules="true" />
        <app-input-simrs label="Dia (mmHg)" class="col-2" v-model="store.form.diastole" :valid="{ number: true }" :lazy-rules="true" />
        <app-input-simrs label="RR (x/mnt)" class="col-2" v-model="store.form.pernapasan" :valid="{ number: true }" :lazy-rules="true" />
        <app-input-simrs label="Spo (%)" class="col-2" v-model="store.form.spo" :valid="{ number: true }" :lazy-rules="true" />
        <app-input-simrs label="Suhu C" class="col-3" v-model="store.form.suhu" :valid="{ number: true }" :lazy-rules="true" />

        <q-select
          v-model="store.form.tkKesadaran"
          dense
          standout="bg-yellow-3 text-black"
          outlined
          label="Tingkat Kesadaran"
          :options="store.optionsTingkatkesadaran"
          emit-value
          map-options
          input-class="ellipsis"
          fill-input
          hide-bottom-space
          class="col-8"
        />
      </q-card-section>
      <div class="absolute q-pa-md" style="right: 0; bottom:0">
        <q-card flat bordered>
          <q-card-section align="center">
            <div class="f-12 ">
              SKOR
            </div>
            <div class="f-18 text-bold">
              0
            </div>
          </q-card-section>
        </q-card>
      </div>
    </q-card>

    <!-- psikologis , ekonomi, spiritual -->
    <q-card flat bordered class="col-12">
      <q-card-section class="q-pa-sm bg-grey-4">
        <strong>Pemeriksaan Psikologis, Sosial Ekonomi, Spiritual</strong>
      </q-card-section>
      <q-card-section class="row q-pa-sm q-col-gutter-xs">
        <q-input
          v-model="store.form.sosial"
          outlined
          autogrow
          stack-label
          standout="bg-yellow-3"
          label="Sosial"
          hide-bottom-space
          style="width:50%"
        />
        <q-input
          v-model="store.form.spiritual"
          outlined
          autogrow
          stack-label
          standout="bg-yellow-3"
          label="Spiritual"
          hide-bottom-space
          style="width:50%"
        />
        <q-select
          v-model="store.form.statusPsikologis"
          dense
          standout="bg-yellow-3 text-black"
          outlined
          label="Status Psikologis"
          :options="store.statusPsikologis"
          stack-label
          emit-value
          map-options
          input-class="ellipsis"
          fill-input
          hide-bottom-space
          class="col-6"
        />
        <q-select
          v-model="store.form.ansuransi"
          dense
          standout="bg-yellow-3 text-black"
          outlined
          label="Ekonomi, Punya Ansuransi ?"
          :options="store.adaTidaks"
          emit-value
          map-options
          input-class="ellipsis"
          fill-input
          hide-bottom-space
          class="col-6"
        />
        <q-list flat bordered separator class="col-12 q-mt-xs">
          <q-item v-for="item in store.form.edukasi" :key="item">
            <q-item-section>
              <q-item-label>{{ item?.label }}</q-item-label>
            </q-item-section>
            <q-item-section>
              <div class="flex q-gutter-sm">
                <q-radio dense v-for="n in store.yaTidaks" :key="n" v-model="item.value" :val="n" :label="n" />
              </div>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>

    <!-- kultural -->
    <q-card flat bordered class="col-12">
      <q-card-section class="q-pa-sm bg-grey-4">
        <strong>Kultural</strong>
      </q-card-section>
      <q-card-section class="row q-pa-sm q-col-gutter-xs">
        <q-select
          v-model="store.form.penyebabSakit"
          dense
          standout="bg-yellow-3 text-black"
          outlined
          label="Penyebab Penyakit"
          :options="store.penyebabs"
          emit-value
          map-options
          input-class="ellipsis"
          fill-input
          hide-bottom-space
          class="col-6"
        />
        <q-select
          v-model="store.form.komunikasi"
          dense
          standout="bg-yellow-3 text-black"
          outlined
          label="Pola Komunikasi"
          :options="store.komunikasi"
          stack-label
          emit-value
          map-options
          input-class="ellipsis"
          fill-input
          hide-bottom-space
          class="col-6"
        />
        <div class="col-6">
          <div class="col-6 flex q-gutter-sm q-my-xs">
            <div>Makanan Pokok : </div>
            <q-radio dense v-for="m in store.makanans" :val="m" :label="m" v-model="store.form.makananPokok" />
          </div>
          <app-input-simrs v-if="store.form.makananPokok==='Selain Nasi'" label="Selain Nasi" class="full-width" v-model="store.form.makananPokokLain" />
        </div>
        <app-input-simrs class="col-6" label="Pantangan Makanan" v-model="store.form.pantanganMkanan" />
      </q-card-section>
    </q-card>

    <!-- end 4.1 -->
    <!-- start 4.2 -->
    <q-card flat bordered class="col-12">
      <q-card-section class="q-pa-sm bg-grey-4">
        <strong>FORM 4.2 KEBIDANAN</strong>
      </q-card-section>
      <q-card-section class="row q-pa-sm q-col-gutter-xs">
        <q-select
          v-model="store.formKebidanan.nyeri"
          dense
          standout="bg-yellow-3 text-black"
          outlined
          label="Nyeri"
          :options="store.normals"
          emit-value
          map-options
          input-class="ellipsis"
          fill-input
          hide-bottom-space
          class="col-4"
        />
        <q-select
          v-model="store.formKebidanan.lochea"
          dense
          standout="bg-yellow-3 text-black"
          outlined
          label="Nyeri"
          :options="store.normals"
          emit-value
          map-options
          input-class="ellipsis"
          fill-input
          hide-bottom-space
          class="col-4"
        />
        <q-select
          v-model="store.formKebidanan.proteinUrin"
          dense
          standout="bg-yellow-3 text-black"
          outlined
          label="Penyuluhan"
          :options="store.proteinUrins"
          emit-value
          map-options
          input-class="ellipsis"
          fill-input
          hide-bottom-space
          class="col-4"
        />
      </q-card-section>
      <q-card-section class="q-px-sm q-py-none">
        <strong>Anatomi</strong>
      </q-card-section>
      <q-separator class="q-my-xs" />
      <q-card-section class="row q-col-gutter-xs q-px-sm q-py-none">
        <autocomplete-input v-model="store.formKebidanan.mata" :options="store.matas" label="Mata" class="col-4" @set-model="(val)=> store.formKebidanan.mata=val" />
        <autocomplete-input v-model="store.formKebidanan.leher" :options="store.lehers" label="Leher" class="col-4" @set-model="(val)=> store.formKebidanan.leher=val" />
        <autocomplete-input v-model="store.formKebidanan.dada" :options="store.dadas" label="Dada" class="col-4" @set-model="(val)=> store.formKebidanan.dada=val" />
      </q-card-section>
      <q-card-section class="q-px-sm q-py-none q-pt-sm">
        <em>Payudara / Puting Susu :</em>
      </q-card-section>
      <q-separator class="q-my-xs" />
      <q-card-section class="row q-col-gutter-xs q-px-sm q-py-none">
        <app-input-simrs label="Menonjol" class="col-4" v-model="store.formKebidanan.putingMenonjol" />
        <autocomplete-input v-model="store.formKebidanan.hiperpigmentasi" :options="store.yaTidaks" label="Hiperpigmentasi Areola" class="col-4" @set-model="(val)=> store.formKebidanan.hiperpigmentasi=val" />
        <app-input-simrs label="Kolostrum" class="col-4" v-model="store.formKebidanan.kolostrum" />
        <autocomplete-input v-model="store.formKebidanan.konsistensiPayudara" :options="store.konsistensis" label="Konsistensi Payudara" class="col-4" @set-model="(val)=> store.formKebidanan.konsistensiPayudara=val" />

        <app-input-simrs label="Nyeri Tekan" class="col-4" v-model="store.formKebidanan.nyeriTekan" />
        <select-input v-model="store.formKebidanan.benjolan" :options="store.adaTidaks" label="Benjolan Abnormal" class="col-4" />
        <autocomplete-input v-model="store.formKebidanan.abdomen" :options="store.abdomens" label="Abdomen" class="col-4" @set-model="(val)=> store.formKebidanan.abdomen=val" />
        <autocomplete-input v-model="store.formKebidanan.anoGenital" :options="store.anogenitals" label="Anogenital" class="col-4" @set-model="(val)=> store.formKebidanan.anoGenital=val" />
        <autocomplete-input v-model="store.formKebidanan.ekstremitasTungkai" :options="store.ekstremitas" label="Ekstremitas Tungkai" class="col-4" @set-model="(val)=> store.formKebidanan.ekstremitasTungkai=val" />
      </q-card-section>
      <q-card-section class="q-px-sm q-py-none q-pt-sm">
        <strong>Pemeriksaan Khusus</strong>
      </q-card-section>
      <q-separator class="q-my-xs" />
      <q-card-section class="q-px-sm q-py-none q-pt-sm">
        <strong>Hamil / Bersalin</strong>
      </q-card-section>
      <q-separator class="q-my-xs" />
      <q-card-section class="row q-col-gutter-xs q-px-sm q-py-none">
        <autocomplete-input v-model="store.formKebidanan.hmlInspeksi" :options="store.inspeksis" label="Inspeksi" class="col-4" @set-model="(val)=> store.formKebidanan.hmlInspeksi=val" />
        <div class="col-8">
          <div class="row q-col-gutter-xs">
            <div class="col-2 text-right">
              Palpasi
            </div>
            <app-input-simrs label="Puka (cm)" class="col-3" v-model="store.formKebidanan.hmlTfuPuka" />
            <app-input-simrs label="Puki (cm)" class="col-3" v-model="store.formKebidanan.hmlTfuPuki" />
            <autocomplete-input v-model="store.formKebidanan.hmlTfuPresentasi" :options="store.presentasis" label="Presentasi" class="col-4" @set-model="(val)=> store.formKebidanan.hmlTfuPresentasi=val" />
          </div>
        </div>

        <select-input v-model="store.formKebidanan.hmlNyeri" :options="store.adaTidaks" label="Nyeri Tekan" class="col-3" />
        <select-input v-model="store.formKebidanan.hmlOsborn" :options="store.adaTidaks" label="Osborn Test" class="col-3" />
        <select-input v-model="store.formKebidanan.hmlCekung" :options="store.adaTidaks" label="Cekungan pd Prt/Bandle" class="col-4" />
      </q-card-section>
      <q-separator class="q-my-xs" />
      <q-card-section class="row q-col-gutter-xs q-px-sm q-py-none q-pt-sm">
        <div class="col-2">
          <em>Auskultasi</em>
        </div>
        <app-input-simrs label="HR x/mnt" class="col-2" v-model="store.formKebidanan.hmlAusDenyut" />
        <select-input v-model="store.formKebidanan.hmlAusTeratur" :options="store.yaTidaks" label="Apakah Teratur?" class="col-4" />
      </q-card-section>
      <q-card-section class="row q-col-gutter-xs q-px-sm q-py-none">
        <div class="col-2">
          <em> His / Kontraksi</em>
        </div>
        <app-input-simrs label="Frekuensi x/mnt" class="col-3" v-model="store.formKebidanan.hmlHisFrekuensi" />
        <select-input v-model="store.formKebidanan.hmlHisIntensitas" :options="store.intensitas" label="Intensitas" class="col-4" />
      </q-card-section>
      <q-card-section class="row q-col-gutter-xs q-px-sm q-py-none">
        <div class="col-12">
          <em> Pengeluaran per-vaginam</em>
        </div>
        <select-input v-model="store.formKebidanan.hmlVgnBentuk" :options="store.bentuks" label="Bentuk" class="col-3" />
        <select-input v-model="store.formKebidanan.hmlVgnJml" :options="store.jumlahs" label="Jumlah" class="col-3" />
        <select-input v-model="store.formKebidanan.hmlVgnKtuban" :options="store.yaTidaks" label="Air Ktuban" class="col-3" />
        <select-input v-model="store.formKebidanan.hmlVgnToucher" :options="store.yaTidaks" label="Vgn Toucher" class="col-3" />
      </q-card-section>
      <q-separator class="q-my-xs" />
      <q-card-section class="q-px-sm q-py-none q-pt-sm">
        <strong>Nifas</strong>
      </q-card-section>
      <q-separator class="q-my-xs" />
      <q-card-section class="row q-col-gutter-xs q-px-sm q-py-none">
        <app-input-simrs label="Tinggi Fundus Uteri (TFU)" class="col-6" v-model="store.formKebidanan.nfsTfu" />
        <select-input v-model="store.formKebidanan.nfsUterus" :options="store.kontraksis" label="Kontraksi Uterus" class="col-4" />
      </q-card-section>
      <q-separator class="q-my-xs" />
      <q-card-section class="q-px-sm q-py-none">
        <em>Pengeluaran per-vaginam</em>
      </q-card-section>
      <q-separator class="q-my-xs" />
      <q-card-section class="row q-col-gutter-xs q-px-sm q-py-none q-pb-md">
        <select-input v-model="store.formKebidanan.nfsVgnBentuk" :options="store.bentuks" label="Bentuk" class="col-3" />
        <select-input v-model="store.formKebidanan.nfsVgnJml" :options="store.jumlahs" label="Jumlah" class="col-3" />
        <select-input v-model="store.formKebidanan.nfsVgnLochea" :options="store.locheas" label="Lochea" class="col-3" />
        <select-input v-model="store.formKebidanan.nfsVgnLuka" :options="store.locheas" label="Luka Jlr Lhr" class="col-3" />
        <select-input v-model="store.formKebidanan.nfsVgnDrjLuka" :options="store.derajats" label="Derajat Luka" class="col-3" />
        <select-input v-model="store.formKebidanan.nfsVgnLukaPost" :options="store.adaTidaks" label="Luka Post Sectio" class="col-3" />
      </q-card-section>
    </q-card>

    <!-- start 4.2 -->
    <q-card flat bordered class="col-12">
      <q-card-section class="q-pa-sm bg-grey-4">
        <strong>FORM 4.3 NEONATAL</strong>
      </q-card-section>
      <q-card-section class="q-px-sm q-py-none q-pt-sm">
        <div class="row items-center justify-between">
          <div><strong>APGAR SCORE : {{ store.formNeonatal.apgarScore }}</strong></div>
          <div><em class="text-orange-10">{{ store.formNeonatal.apgarKet }}</em></div>
        </div>
      </q-card-section>
      <q-separator class="q-my-xs" />
      <q-card-section class="row q-col-gutter-xs q-px-sm q-py-none q-pb-md">
        <q-select
          dense
          v-model="store.formNeonatal.appearance"
          standout="bg-yellow-3 text-black"
          outlined
          label="Appearance"
          :options="store.appearances"
          :option-value="option => option"
          emit-value
          map-options
          option-label="label"
          fill-input
          input-debounce="0"
          hide-bottom-space
          class="col-12"
          @update:model-value="store.hitungSkorApgar"
        />
        <q-select
          dense
          v-model="store.formNeonatal.pulse"
          standout="bg-yellow-3 text-black"
          outlined
          label="Appearance"
          :options="store.pulses"
          :option-value="option => option"
          emit-value
          map-options
          option-label="label"
          fill-input
          input-debounce="0"
          hide-bottom-space
          class="col-12"
          @update:model-value="store.hitungSkorApgar"
        />
        <q-select
          dense
          v-model="store.formNeonatal.grimace"
          standout="bg-yellow-3 text-black"
          outlined
          label="Grimace"
          :options="store.grimaces"
          :option-value="option => option"
          emit-value
          map-options
          option-label="label"
          fill-input
          input-debounce="0"
          hide-bottom-space
          class="col-12"
          @update:model-value="store.hitungSkorApgar"
        />

        <q-select
          dense
          v-model="store.formNeonatal.activity"
          standout="bg-yellow-3 text-black"
          outlined
          label="Activity"
          :options="store.activitys"
          :option-value="option => option"
          emit-value
          map-options
          option-label="label"
          fill-input
          input-debounce="0"
          hide-bottom-space
          class="col-12"
          @update:model-value="store.hitungSkorApgar"
        />
        <q-select
          dense
          v-model="store.formNeonatal.respiration"
          standout="bg-yellow-3 text-black"
          outlined
          label="Respiration"
          :options="store.respirations"
          :option-value="option => option"
          emit-value
          map-options
          option-label="label"
          fill-input
          input-debounce="0"
          hide-bottom-space
          class="col-12"
          @update:model-value="store.hitungSkorApgar"
        />
      </q-card-section>
      <q-card-section class="q-pa-sm bg-grey-4">
        <strong>ANTOPOMETRI</strong>
      </q-card-section>
      <q-card-section class="row q-col-gutter-xs q-px-sm q-py-xs q-pb-xs">
        <app-input-simrs label="Lingkar Kpl (cm)" class="col-4" v-model="store.formNeonatal.lila" />
        <app-input-simrs label="Lingkar Dada (cm)" class="col-4" v-model="store.formNeonatal.lida" />
        <app-input-simrs label="Lingkar Pert (cm)" class="col-4" v-model="store.formNeonatal.lirut" />
      </q-card-section>
      <q-card-section class="q-pa-sm bg-grey-4">
        <strong>ANATOMY</strong>
      </q-card-section>
      <q-card-section class="row q-col-gutter-xs q-px-sm q-py-xs q-pb-xs">
        <app-input-simrs label="Lingkar Kpl (cm)" class="col-4" v-model="store.formNeonatal.lila" />
        <app-input-simrs label="Lingkar Dada (cm)" class="col-4" v-model="store.formNeonatal.lida" />
        <app-input-simrs label="Lingkar Pert (cm)" class="col-4" v-model="store.formNeonatal.lirut" />
      </q-card-section>
      <q-card-section class="q-px-sm q-py-none">
        <strong>Pengkajian Persistem</strong>
      </q-card-section>
      <q-card-section class="q-px-sm q-py-none">
        <em>1. Sistem Susunan Syaraf Pusat</em>
      </q-card-section>
      <q-separator class="q-my-xs" />
      <q-card-section class="q-px-sm q-py-none row q-col-gutter-xs q-mb-xs">
        <select-input v-model="store.formNeonatal.grkBayi" :options="store.aktifs" label="Gerak Bayi" class="col-4" />
        <autocomplete-input v-model="store.formNeonatal.uub" :options="store.uubs" label="UUB" class="col-4" @set-model="(val)=> store.formNeonatal.uub=val" />
        <autocomplete-input v-model="store.formNeonatal.kejang" :options="store.adaTidaks" label="Kejang?" class="col-4" @set-model="(val)=> store.formNeonatal.kejang=val" />
        <autocomplete-input v-model="store.formNeonatal.refleks" :options="store.refleks" label="Refleks" class="col-4" @set-model="(val)=> store.formNeonatal.refleks=val" />
        <autocomplete-input v-model="store.formNeonatal.tngsBayi" :options="store.tngsBayis" label="Tangis Bayi" class="col-4" @set-model="(val)=> store.formNeonatal.tngsBayi=val" />
      </q-card-section>
      <q-separator class="q-my-xs" />
      <q-card-section class="q-px-sm q-py-none">
        <em>2. Sistem Penglihatan</em>
      </q-card-section>
      <q-separator class="q-my-xs" />
      <q-card-section class="q-px-sm q-py-none row q-col-gutter-xs q-mb-xs">
        <select-input v-model="store.formNeonatal.pssMata" :options="store.posisiMatas" label="Posisi Mata" class="col-3" />
        <select-input v-model="store.formNeonatal.bsrPupil" :options="store.pupils" label="Besar Pupil" class="col-3" />
        <autocomplete-input v-model="store.formNeonatal.klpkMata" :options="store.klpkMatas" label="Kelopak Mata" class="col-6" @set-model="(val)=> store.formNeonatal.klpkMata=val" />
        <autocomplete-input v-model="store.formNeonatal.konjungtiva" :options="store.konjungtivas" label="Konjungtiva" class="col-6" @set-model="(val)=> store.formNeonatal.konjungtiva=val" />
        <autocomplete-input v-model="store.formNeonatal.sklera" :options="store.skleras" label="Sklera" class="col-6" @set-model="(val)=> store.formNeonatal.sklera=val" />
      </q-card-section>
      <q-separator class="q-my-xs" />
      <q-card-section class="q-px-sm q-py-none">
        <em>3. Sistem Pendengaran</em>
      </q-card-section>
      <q-separator class="q-my-xs" />
      <q-card-section class="q-px-sm q-py-none row q-col-gutter-xs q-mb-xs">
        <autocomplete-input v-model="store.formNeonatal.pendengaran" :options="store.pendengarans" label="Penciuman" class="col-12" @set-model="(val)=> store.formNeonatal.pendengaran=val" />
      </q-card-section>
      <q-separator class="q-my-xs" />
      <q-card-section class="q-px-sm q-py-none">
        <em>4. Sistem Penciuman</em>
      </q-card-section>
      <q-separator class="q-my-xs" />
      <q-card-section class="q-px-sm q-py-none row q-col-gutter-xs q-mb-xs">
        <autocomplete-input v-model="store.formNeonatal.penciuman" :options="store.penciumans" label="Penciuman" class="col-12" @set-model="(val)=> store.formNeonatal.penciuman=val" />
      </q-card-section>
      <q-separator class="q-my-xs" />
      <q-card-section class="q-px-sm q-py-none">
        <em>5. Sistem Kardiovaskular</em>
      </q-card-section>
      <q-separator class="q-my-xs" />
      <q-card-section class="q-px-sm q-py-none row q-col-gutter-xs q-mb-xs">
        <autocomplete-input v-model="store.formNeonatal.warnaKlt" :options="store.warnaKulits" label="Warna Kulit" class="col-3" @set-model="(val)=> store.formNeonatal.warnaKlt=val" />
        <autocomplete-input v-model="store.formNeonatal.denyutNadi" :options="store.denyutNadis" label="Dennyut Nadi" class="col-3" @set-model="(val)=> store.formNeonatal.denyutNadi=val" />
        <autocomplete-input v-model="store.formNeonatal.sirkulasi" :options="store.sirkulasis" label="Dennyut Nadi" class="col-3" @set-model="(val)=> store.formNeonatal.sirkulasi=val" />
        <autocomplete-input v-model="store.formNeonatal.sirkulasi" :options="store.sirkulasis" label="Dennyut Nadi" class="col-3" @set-model="(val)=> store.formNeonatal.sirkulasi=val" />
      </q-card-section>
      <q-separator class="q-my-xs" />
      <q-card-section class="q-px-sm q-py-none">
        <em>6. Sistem Pernapasan</em>
      </q-card-section>
      <q-separator class="q-my-xs" />
      <q-card-section class="q-px-sm q-py-none row q-col-gutter-xs q-mb-xs">
        <autocomplete-input v-model="store.formNeonatal.polaNafas" :options="store.polaNafas" label="Pola Nafas" class="col-4" @set-model="(val)=> store.formNeonatal.polaNafas=val" />
        <autocomplete-input v-model="store.formNeonatal.jnsPernafasan" :options="store.jnsPernafasans" label="Jenis Pernafasan" class="col-4" @set-model="(val)=> store.formNeonatal.jnsPernafasan=val" />
        <autocomplete-input v-model="store.formNeonatal.irmNapas" :options="store.iramaNapas" label="Irama Napas" class="col-4" @set-model="(val)=> store.formNeonatal.irmNapas=val" />
        <autocomplete-input v-model="store.formNeonatal.retraksi" :options="store.retraksis" label="Retraksi" class="col-4" @set-model="(val)=> store.formNeonatal.retraksi=val" />
        <autocomplete-input v-model="store.formNeonatal.airEntri" :options="store.airEntris" label="Air Entri" class="col-4" @set-model="(val)=> store.formNeonatal.airEntri=val" />
        <autocomplete-input v-model="store.formNeonatal.merintih" :options="store.merintihs" label="Merintih" class="col-4" @set-model="(val)=> store.formNeonatal.merintih=val" />
        <autocomplete-input v-model="store.formNeonatal.suaraNapas" :options="store.suaraNapas" label="Suara Napas" class="col-4" @set-model="(val)=> store.formNeonatal.suaraNapas=val" />
      </q-card-section>
      <q-separator class="q-my-xs" />
      <q-card-section class="q-px-sm q-py-none">
        <em>7. Sistem Pencernaan</em>
      </q-card-section>
      <q-separator class="q-my-xs" />
      <q-card-section class="q-px-sm q-py-none row q-col-gutter-xs q-mb-xs">
        <autocomplete-input v-model="store.formNeonatal.mulut" :options="store.muluts" label="Mulut" class="col-4" @set-model="(val)=> store.formNeonatal.mulut=val" />
        <autocomplete-input v-model="store.formNeonatal.lidah" :options="store.lidahs" label="Lidah" class="col-4" @set-model="(val)=> store.formNeonatal.lidah=val" />
        <autocomplete-input v-model="store.formNeonatal.oesofagus" :options="store.oesofagus" label="Oesofagus" class="col-4" @set-model="(val)=> store.formNeonatal.oesofagus=val" />
        <autocomplete-input v-model="store.formNeonatal.abdomen" :options="store.abdomensAnatomy" label="Abdomen" class="col-6" @set-model="(val)=> store.formNeonatal.abdomen=val" />
        <autocomplete-input v-model="store.formNeonatal.bab" :options="store.babs" label="BAB" class="col-6" @set-model="(val)=> store.formNeonatal.bab=val" />
        <autocomplete-input v-model="store.formNeonatal.warnaBab" :options="store.warnaFeses" label="Warna" class="col-6" @set-model="(val)=> store.formNeonatal.warnaBab=val" />
      </q-card-section>
      <q-separator class="q-my-xs" />
      <q-card-section class="q-px-sm q-py-none">
        <em>8. Sistem Genitourinaris</em>
      </q-card-section>
      <q-separator class="q-my-xs" />
      <q-card-section class="q-px-sm q-py-none row q-col-gutter-xs q-mb-xs">
        <autocomplete-input v-model="store.formNeonatal.bak" :options="store.baks" label="BAK" class="col-6" @set-model="(val)=> store.formNeonatal.bak=val" />
        <autocomplete-input v-model="store.formNeonatal.warnaUrine" :options="store.warnaUrines" label="Warna Urin" class="col-6" @set-model="(val)=> store.formNeonatal.warnaUrine=val" />
      </q-card-section>
      <q-separator class="q-my-xs" />
      <q-card-section class="q-px-sm q-py-none">
        <em>9. Sistem Reproduksi</em>
      </q-card-section>
      <q-separator class="q-my-xs" />
      <q-card-section class="q-px-sm q-py-none row q-col-gutter-xs q-mb-xs">
        <autocomplete-input v-model="store.formNeonatal.laki" :options="store.lakilakis" label="Laki-laki" class="col-6" @set-model="(val)=> store.formNeonatal.laki=val" />
        <autocomplete-input v-model="store.formNeonatal.perempuan" :options="store.perempuans" label="Perempuan" class="col-6" @set-model="(val)=> store.formNeonatal.perempuan=val" />
      </q-card-section>
      <q-separator class="q-my-xs" />
      <q-card-section class="q-px-sm q-py-none">
        <em>10. Sistem Integument</em>
      </q-card-section>
      <q-separator class="q-my-xs" />
      <q-card-section class="q-px-sm q-py-none row q-col-gutter-xs q-mb-xs">
        <autocomplete-input v-model="store.formNeonatal.vernicKasesosa" :options="store.vernicKasesosas" label="Vernic Kasesosa" class="col-4" @set-model="(val)=> store.formNeonatal.vernicKasesosa=val" />
        <autocomplete-input v-model="store.formNeonatal.lanugo" :options="store.lanugos" label="Lanugo" class="col-4" @set-model="(val)=> store.formNeonatal.lanugo=val" />
        <autocomplete-input v-model="store.formNeonatal.warnaIntegument" :options="store.warnas" label="Warna" class="col-4" @set-model="(val)=> store.formNeonatal.warnaIntegument=val" />
        <autocomplete-input v-model="store.formNeonatal.turgor" :options="store.turgors" label="Turgor" class="col-4" @set-model="(val)=> store.formNeonatal.turgor=val" />
        <autocomplete-input v-model="store.formNeonatal.kulit" :options="store.kulits" label="Kulit" class="col-4" @set-model="(val)=> store.formNeonatal.kulit=val" />
      </q-card-section>
      <q-separator class="q-my-xs" />
      <q-card-section class="q-px-sm q-py-none">
        <em>11. Sistem Muskuloskkeletal</em>
      </q-card-section>
      <q-separator class="q-my-xs" />
      <q-card-section class="q-px-sm q-py-none row q-col-gutter-xs q-mb-xs">
        <autocomplete-input v-model="store.formNeonatal.lengan" :options="store.lengans" label="Lengan" class="col-6" @set-model="(val)=> store.formNeonatal.lengan=val" />
        <autocomplete-input v-model="store.formNeonatal.tungkai" :options="store.tungkals" label="Tungkal" class="col-6" @set-model="(val)=> store.formNeonatal.tungkai=val" />
        <autocomplete-input v-model="store.formNeonatal.rekoilTelinga" :options="store.rekoilTelingas" label="Rekoil Telinga" class="col-6" @set-model="(val)=> store.formNeonatal.rekoilTelinga=val" />
        <autocomplete-input v-model="store.formNeonatal.grsTlpkKaki" :options="store.grsTelapakKakis" label="Garis Telapak Kaki" class="col-6" @set-model="(val)=> store.formNeonatal.grsTlpkKaki=val" />
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { usePemeriksaanUmumRanapStore } from 'src/stores/simrs/ranap/pemeriksaanumum'
import { defineAsyncComponent, onMounted } from 'vue'

const AutocompleteInput = defineAsyncComponent(() => import('../../../components/AutocompleteInput.vue'))
const SelectInput = defineAsyncComponent(() => import('../../../components/SelectInput.vue'))

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

const store = usePemeriksaanUmumRanapStore()

onMounted(() => {
  store.initReset()
})
</script>
