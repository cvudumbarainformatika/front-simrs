<template>
  <div class="fit column absolute">
    <div class="col full-height ">
      <q-card
        flat
        bordered
        square
        class="full-height "
        style="overflow: hidden;"
      >
        <q-form
          ref="refForm"
          @submit="onSubmit"
          class="column full-height"
        >
          <q-card-section class="q-px-md q-py-xs bg-primary text-white col-auto full-width">
            <div class="row items-center justify-between">
              <div class="f-12 text-weight-bold">
                Form Anamnesis
              </div>
              <div>
                <q-btn
                  flat
                  dense
                  size="md"
                  icon="icon-mat-history"
                >
                  <q-tooltip class="bg-dark text-white">
                    {{ tooltip }}
                  </q-tooltip>
                </q-btn>
              </div>
            </div>
          </q-card-section>
          <q-card-section class="col full-height scroll">
            <div class="row q-col-gutter-sm ">
              <q-input
                v-model="store.form.keluhanutama"
                outlined
                autogrow
                stack-label
                standout="bg-yellow-3"
                label="Keluhan Utama"
                :rules="[val => !!val || 'Harap Diisi terlebih dahulu']"
                hide-bottom-space
                style="width:50%"
              />
              <q-input
                v-model="store.form.riwayatpenyakitsekarang"
                outlined
                autogrow
                standout="bg-yellow-3"
                label="Riwayat Penyakit Sekarang"
                stack-label
                style="width:50%"
              />
              <q-input
                v-model="store.form.riwayatpenyakit"
                outlined
                autogrow
                standout="bg-yellow-3"
                label="Riwayat Penyakit (Dahulu)"
                stack-label
                style="width:50%"
              />
              <q-input
                v-model="store.form.riwayatpengobatan"
                outlined
                autogrow
                standout="bg-yellow-3"
                style="width:50%"
                label="Riwayat Pengobatan"
                stack-label
              />
              <q-input
                v-model="store.form.riwayatpenyakitkeluarga"
                outlined
                autogrow
                standout="bg-yellow-3"
                style="width:50%"
                label="Riwayat Penyakit Keluarga"
                stack-label
              />
              <q-input
                v-model="store.form.riwayatpekerjaan"
                outlined
                autogrow
                standout="bg-yellow-3"
                style="width:50%"
                label="Riwayat Pekerjaan yg berhubungan dgn zat berbahaya"
                stack-label
              />
              <div class="col-12">
                <div class="text-weight-bold">
                  Riwayat Alergi
                </div>
                <div class="text-grey-8 f-10">
                  Riwayat alergi yang pernah dialami
                  oleh pasien
                </div>
                <q-separator class="q-my-sm" />
                <q-checkbox
                  v-for="(al, i) in store.alergis"
                  :key="i"
                  v-model="store.selection"
                  :val="al"
                  :label="al"
                  color="primary"
                  @update:model-value="updateSelection"
                />
                <q-input
                  v-model="store.form.riwayatalergi"
                  outlined
                  label="Riwayat"
                  standout="bg-yellow-3"
                  readonly
                  class="q-mb-sm hidden"
                  autogrow
                />
                <q-input
                  v-model="store.form.keteranganalergi"
                  outlined
                  autogrow
                  label="Keterangan Alergi"
                  stack-label
                  standout="bg-yellow-3"
                />
              </div>
              <div class="col-12 q-mt-xs">
                <q-separator class="q-my-xs" />
                <div class="text-weight-bold">
                  Skreening Gizi :
                </div>
                <div class="col-12">
                  <q-option-group :options="optionskriniggizi" v-model="store.form.optionskriniggizi" @update:model-value="metodeskrininggizi" />
                </div>
              </div>
              <div v-if="store.form.optionskriniggizi === 1">
                <div class="col-12 q-mt-xs">
                  <q-separator class="q-my-xs" />
                  <div class="row items-center">
                    <div class="col-8">
                      Apakah Ada Penurunan Berat badan yang tidak diinginkan selama 6 Bulan terakhir ?
                    </div>
                    <div class="col-4">
                      <q-option-group
                        v-model="store.form.skreeninggizi"
                        :options="optionSkreening"
                        color="primary"
                        inline
                        dense
                        @update:model-value="lihatPerubahan"
                      />
                    </div>
                  </div>
                  <div class="row items-center">
                    <div class="col-8">
                      Apakah Asupan Makan berkurang karena tidak nafsu makan ?
                    </div>
                    <div class="col-4">
                      <q-option-group
                        v-model="store.form.asupanmakan"
                        :options="optionAsupanMakan"
                        color="primary"
                        inline
                        dense
                        @update:model-value="lihatPerubahan"
                      />
                    </div>
                  </div>
                </div>
                <div class="col-12">
                  <q-separator class="q-my-xs" />
                  <div class="row items-center q-col-gutter-sm">
                    <div class="col-10">
                      Kondisi Khusus (Penyakit DM/Kemoterapi/haemodialisa/geriatri/imunitas menurun/lain-lain):
                    </div>
                    <div class="col-2">
                      <q-select
                        v-model="store.form.kondisikhusus"
                        transition-show="flip-up"
                        transition-hide="flip-down"
                        option-label="label"
                        option-value="optionKondisiKhusus.value"
                        dense
                        outlined
                        :options="optionKondisiKhusus"
                        @update:model-value="(val) => lihatPerubahan(val, 1)"
                      />
                      <!-- <q-input
                        v-model="store.form.kondisikhusus"
                        outlined
                        dense
                        standout="bg-yellow-3"
                        label="Kondisi Khusus"
                        stack-label
                        @update:model-value="lihatPerubahan"
                      />-->
                    </div>
                    <div class="col-12">
                      <q-separator class="q-my-xs" />
                      <div class="flex">
                        Skor Skreening Gizi (Pasien Dengan Masalah Ginekologi/Onkologi)
                        = <div class="q-mx-sm">
                          <q-badge color="green" v-if="store.form.skor < 2">
                            {{ store.form.skor }}
                          </q-badge>
                          <q-badge color="red" v-else>
                            {{ store.form.skor }}
                          </q-badge>
                        </div> <div>
                          Keterangan :
                          <q-badge outline color="green" v-if="store.form.skor < 2">
                            {{ store.keteranganSkorGizi(store.form.skor) }}
                          </q-badge>
                          <q-badge outline color="red" v-else>
                            {{ store.keteranganSkorGizi(store.form.skor) }}
                          </q-badge>
                        </div>
                      </div>
                    </div>
                  </div>
                  <q-separator class="q-my-xs" />
                </div>
              </div>
              <div v-if="store.form.optionskriniggizi === 2">
                <q-separator class="q-my-xs" />
                <div class="row items-center">
                  <div class="col-8">
                    Apakah Asupan Makan Berkurang Karena Tidak Nafsu Makan?
                  </div>
                  <div class="col-4">
                    <q-option-group
                      v-model="store.form.asupanmakanberkurang"
                      :options="optionAsupanMakanx"
                      color="primary"
                      inline
                      dense
                      @update:model-value="lihatPerubahankasuskehamilan"
                    />
                  </div>
                </div>
                <div class="row items-center">
                  <div class="col-8">
                    Ada Gangguan Metabolisme (DM, Gangguan Fungsi Tiroid, Infeksi Kronis dll)
                  </div>
                  <div class="col-4">
                    <q-option-group
                      v-model="store.form.metabolisme"
                      :options="optionMetabolisme"
                      color="primary"
                      inline
                      dense
                      @update:model-value="lihatPerubahankasuskehamilan"
                    />
                  </div>
                </div>
                <div class="row items-center">
                  <div class="col-8">
                    Ada Penambahan Berat Badan Yang Kurang Atau Lebih Sesuai Dengan Usia Kehamilan?
                  </div>
                  <div class="col-4">
                    <q-option-group
                      v-model="store.form.penambahanbb"
                      :options="optionPenambahanBB"
                      color="primary"
                      inline
                      dense
                      @update:model-value="lihatPerubahankasuskehamilan"
                    />
                  </div>
                </div>
                <div class="row items-center">
                  <div class="col-8">
                    Nilai Hb Kurang Dari 10g/dL, atau HCT Kurang Dari 30%
                  </div>
                  <div class="col-4">
                    <q-option-group
                      v-model="store.form.nilaihbberkurang"
                      :options="optionNilaiHb"
                      color="primary"
                      inline
                      dense
                      @update:model-value="lihatPerubahankasuskehamilan"
                    />
                  </div>
                </div>
                <div class="col-12">
                  <q-separator class="q-my-xs" />
                  <div class="flex">
                    Skor Skreening Gizi (Pasien Dengan Masalah Obstetri/Kehamilan/Nifas)
                    = <div class="q-mx-sm">
                      <q-badge color="red" v-if="store.form.skorgizix >= 2">
                        {{ store.form.skorgizix }}
                      </q-badge>
                      <q-badge color="green" v-else>
                        {{ store.form.skorgizix }}
                      </q-badge>
                    </div> <div>
                      Keterangan :
                      <q-badge outline color="red" v-if="store.form.skorgizix >= 2">
                        {{ store.keteranganSkorGizi(store.form.skorgizix) }}
                      </q-badge>
                      <q-badge outline color="green" v-else>
                        {{ store.keteranganSkorGizi(store.form.skorgizix) }}
                      </q-badge>
                    </div>
                  </div>
                  <q-separator class="q-my-xs" />
                </div>
              </div>
              <div class="col-12">
                <span class="text-bold">Assesmen Nyeri</span>
                <q-option-group
                  v-model="store.form.metodenyeri"
                  @update:model-value="(val) => chagngereset(val)"
                  inline
                  :options="[
                    { label: 'Numeric Rating Scale', value: 'nrt' },
                    { label: 'Behavioral Pain Scale (BPS)', value: 'bps' },
                    { label: 'NIPS (Neonatus Infant Pain Scale)', value: 'nips' }
                  ]"
                />
                <!-- <span class="text-bold">Asessment Nyeri</span>
                <q-radio v-model="store.form.metode" val="nrt" label="Numeric Rating Scale" @update:model-value="(val) => chagngereset(val)" />
                <q-radio v-model="store.form.metode" val="bps" label="Behavioral Pain Scale (BPS)" @update:model-value="(val) => chagngereset(val)" />
                <q-radio v-model="store.form.metode" val="nips" label="NIPS (Neonatus Infant Pain Scale)" @update:model-value="(val) => chagngereset(val)" /> -->
              </div>
            </div>
            <q-tab-panels v-model="store.form.metodenyeri" animated class="shadow-2 rounded-borders">
              <q-tab-panel name="nrt">
                <div class="col-12">
                  <div class="col-12 text-weight-bold">
                    <span>Assesmen Nyeri</span>
                  </div>
                  <div class="col-12">
                    <div>
                      Keluhan Nyeri ? <em class="text-primary">{{ store.form.keteranganscorenyeri }}</em>
                      <span class="q-ml-sm">
                        <q-icon
                          size="lg"
                          color="teal"
                          :name="iconNyeri"
                        />
                      </span>
                    </div>
                    <q-separator class="q-my-xs" />
                    <q-slider
                      v-model="store.form.skornyeri"
                      color="primary"
                      thumb-color="primary"
                      label-color="primary"
                      label-text-color="yellow"
                      markers
                      :marker-labels="(val)=> fnMarkerLabel"
                      marker-labels-class="text-primary"
                      label-always
                      switch-label-side
                      :min="0"
                      :max="10"
                      @update:model-value="store.setKeteranganSkornyeri"
                    />
                  </div>
                </div>
              </q-tab-panel>
              <br>
              <q-tab-panel name="bps">
                <div class="col-12">
                  <div class="col-6 text-bold">
                    Behavioral Pain Scale (BPS)
                  </div>
                  <div class="col-3">
                    - Ekspresi Wajah
                  </div>
                  <div class="col-9">
                    <q-select
                      v-model="store.form.ekspresiwajah"
                      transition-show="flip-up"
                      transition-hide="flip-down"
                      dense
                      outlined
                      :options="ekspresiwajah"
                      @update:model-value="(val) => nilaiexpresiwajah(val)"
                    />
                  </div>
                  <div class="col-2">
                    - Gerakan Tangan
                  </div>
                  <div class="col-10">
                    <q-select
                      dense outlined
                      v-model="store.form.gerakantangan"
                      :options="gerakantangan"
                      transition-show="flip-up"
                      transition-hide="flip-down"
                      @update:model-value="(val) => nilaigerakantangan(val)"
                    />
                  </div>
                  <div class="col-4">
                    - Kepatuhan terhadap ventilasi mekanik
                  </div>
                  <div class="col-8">
                    <q-select
                      dense outlined
                      v-model="store.form.kepatuhanventilasimekanik"
                      :options="kepatuhanventilasimekanik"
                      transition-show="flip-up"
                      transition-hide="flip-down"
                      @update:model-value="(val) => nilaikepatuhanventilasi(val)"
                    />
                  </div>
                  <div class="col-12">
                    <q-separator class="q-my-xs" />
                    <div class="flex">
                      Skor Nyeri (BPS)
                      = <div class="q-mx-sm">
                        <q-badge :color="store.form.ketcolorbps">
                          {{ store.form.scroebps }}
                        </q-badge>
                      </div> <div>
                        Keterangan : <q-badge outline :color="store.form.ketcolorbps">
                          {{ store.form.ketscorebps }}
                        </q-badge>
                      </div>
                    </div>
                    <q-separator class="q-my-xs" />
                  </div>
                </div>
              </q-tab-panel>
              <q-tab-panel name="nips">
                <div class="col-12">
                  <div class="col-6 text-bold">
                    NIPS (Neonatus Infant Pain Scale)
                  </div>
                  <div class="col-6">
                    - Ekspresi Wajah
                  </div>
                  <div class="col-6">
                    <q-select
                      dense
                      outlined
                      v-model="store.form.ekspresiwajahnips"
                      :options="ekspresiwajahnips"
                      transition-show="flip-up"
                      transition-hide="flip-down"
                      @update:model-value="(val) => nilaiekspresiwajahnips(val)"
                    />
                  </div>
                  <div class="col-6">
                    - Menangis
                  </div>
                  <div class="col-6">
                    <q-select
                      dense outlined
                      v-model="store.form.menangis"
                      :options="menangis"
                      transition-show="flip-up"
                      transition-hide="flip-down"
                      @update:model-value="(val) => nilaimenangis(val)"
                    />
                  </div>
                  <div class="col-6">
                    - Pola Nafas
                  </div>
                  <div class="col-6">
                    <q-select
                      dense outlined
                      v-model="store.form.polanafas"
                      :options="polanafas"
                      transition-show="flip-up"
                      transition-hide="flip-down"
                      @update:model-value="(val) => nilaipolanafas(val)"
                    />
                  </div>
                  <div class="col-6">
                    - Lengan
                  </div>
                  <div class="col-6">
                    <q-select
                      dense outlined
                      v-model="store.form.lengan"
                      :options="lengan"
                      transition-show="flip-up"
                      transition-hide="flip-down" @update:model-value="(val) => nilailengan(val)"
                    />
                  </div>
                  <div class="col-6">
                    - Kaki
                  </div>
                  <div class="col-6">
                    <q-select
                      dense outlined
                      v-model="store.form.kaki"
                      :options="kaki"
                      transition-show="flip-up"
                      transition-hide="flip-down"
                      @update:model-value="(val) => nilaikaki(val)"
                    />
                  </div>
                  <div class="col-6">
                    - Keadaan Rangsangan
                  </div>
                  <div class="col-6">
                    <q-select
                      dense outlined
                      v-model="store.form.keadaanrangsangan"
                      :options="keadaanrangsangan"
                      transition-show="flip-up"
                      transition-hide="flip-down"
                      @update:model-value="(val) => nilairangsangan(val)"
                    />
                  </div>
                  <div class="col-12">
                    <q-separator class="q-my-xs" />
                    <div class="flex">
                      Skor Nyeri (NIPS)
                      = <div class="q-mx-sm">
                        <q-badge :color="store.form.ketcolornips">
                          {{ store.form.scroenips }}
                        </q-badge>
                      </div> <div>
                        Keterangan : <q-badge outline :color="store.form.ketcolornips">
                          {{ store.form.ketscorenips }}
                        </q-badge>
                      </div>
                    </div>
                    <q-separator class="q-my-xs" />
                  </div>
                </div>
              </q-tab-panel>
            </q-tab-panels>
            <br>

            <div class="row q-col-gutter-sm">
              <div class="col-4 text-bold">
                Lokasi Nyeri
              </div>
              <div class="col-8">
                <q-input dense outlined v-model="store.form.lokasinyeri" />
              </div>
              <div class="col-4 text-bold">
                Durasi Nyeri
              </div>
              <div class="col-8">
                <q-input dense outlined v-model="store.form.durasinyeri" />
              </div>
              <div class="col-4 text-bold">
                Penyebab Nyeri
              </div>
              <div class="col-8">
                <q-input dense outlined v-model="store.form.penyebabnyeri" />
              </div>
              <div class="col-4 text-bold">
                Frekwensi Nyeri
              </div>
              <div class="col-8">
                <q-input dense outlined v-model="store.form.frekwensinyeri" />
              </div>
              <div class="col-4 text-bold">
                Nyeri Hilang
              </div>
              <div class="col-8">
                <!-- <q-select dense outlined v-model="store.form.nyerihilang" :options="nyerihilang" /> -->
                <q-checkbox
                  v-for="(al, i) in nyerihilang"
                  :key="i"
                  v-model="store.pilihnyerihilang"
                  :val="al"
                  :label="al"
                  color="primary"
                  @update:model-value="updateNyerihilang"
                /> <q-input label="Sebutkan" dense v-model="store.form.sebutkannyerihilang" v-if="store.pilihnyerihilang.includes('Lainnya')" />
              </div>
            </div>
            <q-separator class="q-my-xs" />
            <div class="row q-col-gutter-sm">
              <div class="col-12 text-bold">
                Kebutuhan Komunikasi dan Edukasi
              </div>
              <div class="col-6">
                - Bicara
              </div>
              <div class="col-6">
                <q-option-group
                  v-model="store.form.kebutuhankomunikasidanedukasi"
                  :options="optionkebutuhankomunikasidanedukasi"
                  color="primary"
                  inline
                  dense
                />
                <q-input v-model="store.form.sebutkankomunaksilainnya" dense label="Sebutkan" v-if="store.form.kebutuhankomunikasidanedukasi === 'Lainnya'" />
              </div>
              <div class="col-6">
                - Dibutuhkan Penerjemah
              </div>
              <div class="col-6">
                <q-option-group
                  v-model="store.form.penerjemah"
                  :options="optionpenerjemah"
                  color="primary"
                  inline
                  dense
                /><q-input v-model="store.form.sebutkanpenerjemah" dense label="Sebutkan" v-if="store.form.penerjemah === 'Ya'" />
              </div>
              <div class="col-6">
                - Bahasa Isyarat
              </div>
              <div class="col-6">
                <q-option-group
                  v-model="store.form.bahasaisyarat"
                  :options="optionbahasaisyarat"
                  color="primary"
                  inline
                  dense
                />
              </div>
              <div class="col-6">
                - Hambatan
              </div>
              <div class="col-6">
                <q-option-group
                  v-model="store.form.hamabatan"
                  :options="optionhamabatan"
                  color="primary"
                  inline
                  dense
                /><q-input v-model="store.form.sebutkanhambatan" dense label="Sebutkan" v-if="store.form.hamabatan === 'Ya'" />
              </div>
            </div>
            <q-separator class="q-my-xs" />
            <div class="row q-col-gutter-sm">
              <div class="col-12 text-bold">
                Riwayat Pemakaian Alat Kontrasepsi
              </div>
              <div class="col-6">
                - Pernah :
              </div>
              <div class="col-6">
                <q-option-group
                  v-model="store.form.alatkontrasepsi"
                  :options="optionAlatkontrasepsi"
                  color="primary"
                  inline
                  dense
                />
              </div>
              <div class="col-6">
                - Jenis :
              </div>
              <div class="col-6">
                <q-select
                  outlined=""
                  v-model="store.form.jeniskontasepsi"
                  :options="optionJenisKOntasepsi"
                  color="primary"
                  inline
                  dense
                  transition-show="flip-up"
                  transition-hide="flip-down"
                />
              </div>
              <div class="col-6 ">
                - Lama Pemakaian :
              </div>
              <div class="col-6 ">
                <div class="row q-col-gutter-sm">
                  <q-input
                    v-model="store.form.tahunlamapemakaiankontrasepsi"
                    label="Tahun"
                    type="number"
                    dense
                    outlined
                    style="width: 80px;"
                  />
                  <q-input
                    v-model="store.form.bulanlamapemakaiankontrasepsi"
                    label="Bulan"
                    type="number"
                    dense
                    outlined
                    style="width: 80px;"
                  />
                  <q-input
                    v-model="store.form.minggulamapemakaiankontrasepsi"
                    label="Minggu"
                    type="number"
                    dense
                    outlined
                    style="width: 80px;"
                  />
                  <q-input
                    v-model="store.form.harilamapemakaiankontrasepsi"
                    label="Hari"
                    type="number"
                    dense
                    outlined
                    style="width: 80px;"
                  />
                </div>
              </div>
              <div class="col-6">
                - Keluhan :
              </div>
              <div class="col-6">
                <q-input
                  v-model="store.form.keluhankontrasepsi"
                  outlined
                  dense
                />
              </div>
            </div>
            <q-separator class="q-my-xs" />
            <div class="row q-col-gutter-sm">
              <div class="col-12 text-bold">
                Riwayat Pernikahan
              </div>
              <div class="col-6">
                - Status Pernikahan :
              </div>
              <div class="col-6">
                <div class="row q-col-gutter-sm">
                  <q-select
                    v-model="store.form.statuspernikahan"
                    :options="optionStatusPernikahan"
                    color="primary"
                    outlined
                    dense
                    transition-show="flip-up"
                    transition-hide="flip-down"
                  /><q-input v-model="store.form.jumlahpernikahan" outlined type="number" dense label="Berapa Kali" v-if="store.form.statuspernikahan === 'Menikah'" />
                </div>
              </div>
              <div class="col-6">
                - Umur Pertama Kali Kawin :
              </div>
              <div class="col-6">
                <q-input v-model="store.form.umurpertamanikah" outlined type="number" dense />
              </div>
              <div class="col-12 ">
                - Kawin Dengan Suami Ke  <q-btn round color="primary" icon="icon-mat-post_add" size="sm" @click="opendialog()" />
              </div>
              <div class="col-12">
                <q-card>
                  <div v-if="lists?.length > 0">
                    <q-list
                      v-for="(item , n) in lists"
                      :key="n"
                    >
                      <q-item>
                        <q-item-section>
                          <q-item-label>Suami Ke :</q-item-label>
                          <q-item-label>
                            Lama Pernikahan :
                          </q-item-label>
                        </q-item-section>
                        <q-item-section side top>
                          <q-item-label caption>
                            {{ item.suami_ke }}
                          </q-item-label>
                          {{ item.lamapernikahan }} Tahun
                        </q-item-section>
                        <q-separator vertical color="primary" />
                        <q-item-section side>
                          <q-btn
                            flat
                            round
                            size="sm"
                            icon="icon-mat-delete"
                            color="negative"
                            @click="hapusItem(item.id)"
                          />
                        </q-item-section>
                      </q-item>
                      <q-separator />
                    </q-list>
                  </div>
                  <div v-else class="text-center">
                    <q-badge color="red" outline>
                      Data Kawin Dengan Suami Belum Ada..
                    </q-badge>
                  </div>
                </q-card>
              </div>
              <div class="col-12 text-bold">
                <q-separator class="q-mt-sm" />
                Riwayat Menstruasi
              </div>
              <div class="col-6">
                - Menarche Umur (tahun)
              </div>
              <div class="col-6">
                <q-input v-model="store.form.menarcheumur" outlined type="number" dense />
              </div>
              <div class="col-6">
                - Siklus (hari)
              </div>
              <div class="col-6">
                <q-input v-model="store.form.siklus" outlined type="number" dense />
              </div>
              <div class="col-6">
                - Keteraturan
              </div>
              <div class="col-6">
                <q-select
                  v-model="store.form.keteraturan" transition-show="flip-up"
                  transition-hide="flip-down" outlined :options="keteraturan" dense
                />
              </div>
              <div class="col-6">
                - Lama Hari
              </div>
              <div class="col-6">
                <q-input v-model="store.form.lamahaririwayatmens" outlined type="number" dense />
              </div>
              <div class="col-6">
                - Keluhan Haid
              </div>
              <div class="col-6">
                <q-select
                  v-model="store.form.keluhanhaid"
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  outlined
                  :options="keluhan"
                  dense
                />
                <q-input dense label="Jelaskan" v-model="store.form.sebutkankeluhanhaid" v-if="store.form.keluhanhaid === 'Ya'" />
              </div>
              <div class="col-12 text-bold">
                <q-separator class="q-mt-sm" />
                Riwayat Penyakit Ginekologi
              </div>
              <div class="col-6">
                - Apakah terdapat riwayat penyakit ginekologi?
              </div>
              <div class="col-6">
                <q-select
                  v-model="store.form.riwayatginekologi"
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  outlined
                  :options="riwayatgonekologo"
                  dense
                  @update:model-value="(val) => riwayatgonekologi(val)"
                />
              </div>
              <div class="col-12" v-if="store.form.riwayatginekologi === 'Ya'">
                <q-checkbox
                  v-for="(al, i) in store.ginekologis"
                  :key="i"
                  v-model="store.selectionginekologis"
                  :val="al"
                  :label="al"
                  color="primary"
                  @update:model-value="updateSelectionginekologis"
                /> <q-input label="Sebutkan" dense v-model="store.form.sebutkanginekologis" v-if="store.selectionginekologis.includes('Lain-lain')" />
                <q-separator class="q-mt-sm" />
              </div>
              <div class="col-12 text-bold">
                Riwayat Hamil
              </div>
              <div class="col-6">
                <app-input-date
                  :model="store.form.haid"
                  mask="date"
                  outlined
                  standout="bg-yellow-3"
                  label="Hari Pertama Haid Terakir"
                  @set-model="val=>store.form.haid=val"
                >
                  <template #append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-date v-model="date">
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Close" color="primary" flat />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </app-input-date>
              </div>
              <div class="col-6">
                <q-input
                  dense
                  v-model="store.form.gravida"
                  outlined
                  standout="bg-yellow-3"
                  label="Gravida"
                />
              </div>
              <div class="col-6">
                <q-input
                  v-model="store.form.partus"
                  outlined
                  dense
                  standout="bg-yellow-3"
                  label="Partus"
                />
              </div>
              <div class="col-6">
                <q-input
                  v-model="store.form.abortus"
                  outlined
                  dense
                  standout="bg-yellow-3"
                  label="Abortus"
                />
              </div>
              <div class="col-6">
                <app-input-date
                  :model="store.form.taksiranpartus"
                  mask="date"
                  outlined
                  standout="bg-yellow-3"
                  label="Taksiran Partus"
                  @set-model="val=>store.form.taksiranpartus=val"
                >
                  <template #append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-date v-model="date">
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Close" color="primary" flat />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </app-input-date>
              </div>
              <div class="col-6">
                <q-select
                  v-model="store.form.asupanantenatal"
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  label="Asuhan Antenatal "
                  outlined
                  :options="asupanantenatal"
                  dense
                  @update:model-value="(val) => fungsiasupanantenatal(val)"
                />
              </div>
              <div class="col-12" v-if="store.form.asupanantenatal === 'Ya'">
                <q-checkbox
                  v-for="(alx, ix) in store.asupanantenatals"
                  :key="ix"
                  v-model="store.selectionasupanantenatal"
                  :val="alx"
                  :label="alx"
                  color="primary"
                  @update:model-value="updateasupanantenatal"
                /> <q-input label="Sebutkan" dense v-model="store.form.sebutkanasupanantenatal" v-if="store.selectionasupanantenatal.includes('Lain-Lain')" />
              </div>
              <div class="col-6">
                <q-select
                  v-model="store.form.frekuensi"
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  label="Frekuensi"
                  outlined
                  :options="frekuensi"
                  dense
                />
              </div>
              <div class="col-6">
                <q-select
                  v-model="store.form.imunisasitt"
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  label="Imunisasi TT"
                  outlined
                  :options="imunisasitt"
                  dense
                  @update:model-value="(val) => fungsiimunisasit(val)"
                /> <q-input label="Berpa kali" type="number" dense v-model="store.form.sebutkanimunisasitt" v-if="store.form.imunisasitt === 'Ya'" />
              </div>
              <div class="col-12 text-bold">
                - Keluhan saat hamil
              </div>
              <div class="col-12">
                <q-checkbox
                  v-for="(al, i) in store.keluhanhamils"
                  :key="i"
                  v-model="store.selectionkeluhanhamils"
                  :val="al"
                  :label="al"
                  color="primary"
                  @update:model-value="updateSelectionkeluhanhamils"
                /> <q-input label="Sebutkan" dense v-model="store.form.sebutkeluhanhamils" v-if="store.selectionkeluhanhamils.includes('Lain-lain')" />
                <q-separator class="q-mt-sm" />
              </div>
              <div class="col-12 text-bold">
                Status Obstetri dan ginekologi
              </div>
              <div class="col-12">
                <q-input label="Periksa Luar" dense outlined v-model="store.form.periksaluarginekologi" />
              </div>
              <div class="col-12">
                <q-input label="Inspekulo" dense outlined v-model="store.form.inspekuloginekologi" />
              </div>
              <div class="col-12">
                <q-input label="Periksa Dalam" dense outlined v-model="store.form.periksadalamginekologi" />
                <q-separator class="q-mt-sm" />
              </div>
              <div class="col-12 text-bold">
                Riwayat Kehamilan, Persalinan dan Nifas <q-btn round color="primary" icon="icon-mat-post_add" size="sm" @click="opendialogkehamilan()" />
              </div>
              <div class="col-12 full-width">
                <div class="row" style="width: 800px;">
                  <q-markup-table>
                    <thead>
                      <tr style="background-color:#31b0d5;">
                        <th class="text-center">
                          No.
                        </th>
                        <th class="text-center">
                          Tgl Partus
                        </th>
                        <th class="text-center">
                          Umur Kehamilan <br> (bulan)
                        </th>
                        <th class="text-center">
                          Jenis Persalinan
                        </th>

                        <th class="text-center">
                          Penyulit
                        </th>
                        <th class="text-center">
                          Anak
                        </th>

                        <th class="text-center">
                          Nifas
                        </th>
                        <th class="text-center">
                          Keadaan Anak Sekarang
                        </th>
                        <th class="text-center">
                          #
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(xxx, x) in listskehamilan" :key="x">
                        <td class="text-center">
                          {{ x+1 }}
                        </td>
                        <td class="text-rigth">
                          <span class="text-h7">{{ xxx?.tanggal_partus }} </span>
                          <br>
                          <q-badge outline color="primary">
                            Tempat
                          </q-badge>  {{ xxx?.tempat }}
                        </td>
                        <td class="text-center ">
                          {{ xxx?.umurkehamilan }}
                        </td>
                        <td class="text-rigth ">
                          {{ xxx?.jenispersalinan }}
                          <br>
                          <q-badge outline color="primary">
                            Penolong :
                          </q-badge>{{ xxx?.penolong }}
                        </td>
                        <td class="text-center">
                          {{ xxx?.penyulit }}
                        </td>
                        <td class="text-rigth">
                          <q-badge outline color="primary">
                            JK
                          </q-badge> : {{ xxx?.jeniskelamin }}
                          <br>
                          <q-badge outline color="primary">
                            BB
                          </q-badge> : {{ xxx?.beratbadan }}
                          <br>
                          <q-badge outline color="primary">
                            PB
                          </q-badge>
                          : {{ xxx?.pb }}
                        </td>

                        <td class="text-center">
                          {{ xxx?.nifas }}
                        </td>
                        <td class="text-center">
                          {{ xxx?.penyulit }}
                        </td>
                        <td class="text-center">
                          <q-btn
                            flat
                            round
                            size="sm"
                            icon="icon-mat-delete"
                            color="negative"
                            @click="hapusItemKehamilan(xxx.id)"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </q-markup-table>
                </div>
              </div>
              <div class="col-12">
                <div
                  class="text-right"
                  style="margin-bottom: 50px;"
                >
                  <app-btn
                    color="primary"
                    label="Simpan"
                    tooltip="Simpan Data"
                    type="submit"
                    tip
                    :loading="store.loadingForm"
                  />
                </div>
              </div>
            </div>
            <q-card-section class="col full-height scroll" />
          </q-card-section>
        </q-form>
        <div style="margin-bottom: 100px;" />
      </q-card>
    </div>
  </div>
  <form-dialog-his-pernikahan :pasien="props.pasien" />
  <FormDialogHisKehamilan :pasien="props.pasien" />
</template>
<script setup>
import { useAnamneseKebidananStore } from 'src/stores/simrs/igd/anamnesekebidanan'
import { useHistoryPernikahanStore } from 'src/stores/simrs/igd/historypernikahanpasien'
import { computed, ref } from 'vue'
import FormDialogHisPernikahan from './FormDialogHisPernikahan.vue'
import { useQuasar } from 'quasar'
import { useHistoryKehamilanStore } from 'src/stores/simrs/igd/historykehamilan'
import FormDialogHisKehamilan from './FormDialogHisKehamilan.vue'

const store = useAnamneseKebidananStore()
const storeHistoryPernikahan = useHistoryPernikahanStore()
const storeHistorykehamilan = useHistoryKehamilanStore()
// const panel = ref(['nrt'])

const optionKondisiKhusus = ref(
  [
    { label: 'Tidak', value: 0 },
    { label: 'Ya', value: 2 }
  ]
)

const refForm = ref()
const $q = useQuasar()

function opendialog () {
  storeHistoryPernikahan.fixed = true
}

function opendialogkehamilan () {
  storeHistorykehamilan.fixed = true
}

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  },
  triage: {
    type: Object,
    default: null
  },
  tooltip: {
    type: String,
    default: 'History Pasien'
  }
})
function onSubmit () {
  console.log('wew')
  store.saveData(props.pasien).then(() => {
    refForm.value.resetValidation()
  })
}

const keteraturan = ref(['Teratur', 'Tidak Teratur'])

const keluhan = ref(['Ya', 'Tidak'])
const asupanantenatal = ref(['Ya', 'Tidak'])
const riwayatgonekologo = ref(['Ya', 'Tidak'])

const iconNyeri = computed(() => {
  const val = store?.form.skornyeri
  let icon = 'icon-my-emoticon-excited-outline'
  if (val < 2) {
    icon = 'icon-my-emoticon-excited-outline'
  }
  else if (val >= 2 && val < 4) {
    icon = 'icon-my-emoticon-outline'
  }
  else if (val >= 4 && val < 6) {
    icon = 'icon-my-emoticon-neutral-outline'
  }
  else if (val >= 6 && val < 8) {
    icon = 'icon-my-emoticon-confused-outline'
  }
  else if (val >= 8 && val < 10) {
    icon = 'icon-my-emoticon-angry-outline'
  }
  else if (val === 10) {
    icon = 'icon-my-emoticon-cry-outline'
  }

  return icon
})

const optionSkreening = ref([
  { label: 'Iya (2)', value: 2 },
  { label: 'Tidak (0)', value: 0 }
])
const optionAsupanMakan = ref([
  { label: 'Iya (1)', value: 1 },
  { label: 'Tidak (0)', value: 0 }
])

const optionAsupanMakanx = ref([
  { label: 'Iya (1)', value: 1 },
  { label: 'Tidak (0)', value: 0 }
])

const optionMetabolisme = ref([
  { label: 'Iya (1)', value: 1 },
  { label: 'Tidak (0)', value: 0 }
])

const optionPenambahanBB = ref([
  { label: 'Iya (1)', value: 1 },
  { label: 'Tidak (0)', value: 0 }
])

const optionNilaiHb = ref([
  { label: 'Iya (1)', value: 1 },
  { label: 'Tidak (0)', value: 0 }
])

const optionStatusPernikahan = ref([
  'Single', 'Menikah', 'Bercerai'
])

const frekuensi = ref(['1x', '2x', '3x', '>3x'])
const imunisasitt = ref(['Ya', 'Tidak'])

const optionskriniggizi = ref([
  { label: 'Pasien Dengan Masalah Ginekologi/Onkologi', value: 1 },
  { label: 'Pasien Dengan Masalah Obstetri/Kehamilan/Nifas', value: 2 }
])

const nyerihilang = ref([
  'Minum Obat', 'Istirahat', 'Mendengarkan Musik', 'Berubah Posisi Tidur', 'Lainnya'
])

const ekspresiwajah = ref([
  'Santai, Tanpa Ketegangan',
  'Sedikit Tegang, Seperti Dahi Berkerut',
  'Sedikit Tegang, Mata Tertutup Rapat',
  'Ekpresi Menunjukan Nyeri Parah, Seperti Menangis Atau Mengerutkan Wajah'
])

const gerakantangan = ref([
  'Tidak Ada Gerakan',
  'Ada Gerakan Ringan, Seperti Mengerutkan atau Menggerakan Telapak Tangan Tanpa Arah',
  'Ada Gerakan Kuat, Seperti Menarik Tangan Atau Berusaha Melepas Alat Medis',
  'Gerakan Tidak Terkendali, Seperti Upaya Melarikan Diri'
])

const kepatuhanventilasimekanik = ref([
  'Toleran, Tidak Ada Perlawanan',
  'Sedikit Tidak Toleran, Batuk Sekali atau Melawan Sedikit',
  'Sering Batuk atau Melawan Ventilasi',
  'Tidak Toleran Sama Sekali, Melawan Ventilasi Secara Konstan'
])

const ekspresiwajahnips = ref([
  'Santai',
  'Meringis'
])

const menangis = ref([
  'Tidak Menangis',
  'Merengek/Merintih',
  'Menangis'
])

const polanafas = ref([
  'Santai',
  'Perubahan Pola Nafas'
])

const lengan = ref([
  'Santai',
  'Flexi/Extensi'
])

const kaki = ref([
  'Santai',
  'Flexi/Extensi'
])
const keadaanrangsangan = ref([
  'Tertidur/Bangun',
  'Rewel'
])

const optionkebutuhankomunikasidanedukasi = ref([
  { label: 'Normal', value: 'Normal' },
  { label: 'Gangguan Bicara', value: 'Gangguan Bicara' },
  { label: 'Lainnya', value: 'Lainnya' }
])
const optionpenerjemah = ref([
  { label: 'Tidak', value: 'Tidak' },
  { label: 'Ya', value: 'Ya' }

])

const optionbahasaisyarat = ref([
  { label: 'Tidak', value: 'Tidak' },
  { label: 'Ya', value: 'Ya' }
])
const optionhamabatan = ref([
  { label: 'Tidak', value: 'Tidak' },
  { label: 'Ya', value: 'Ya' }
])

const optionAlatkontrasepsi = ref([
  { label: 'Tidak', value: 'Tidak' },
  { label: 'Ya', value: 'Ya' }
])

const optionJenisKOntasepsi = ref(['Kondom', 'Pil KB', 'Suntik KB 1 Bulan', 'Suntik KB 3 Bulan', 'IUD', 'Implan', 'Vasektomi(MOP)', 'Tubektomi(MOW)'])

function metodeskrininggizi (val) {
  store.form.optionskriniggizi = val
  if (val === 1) {
    store.form.ketmetodeskrininggizi = 'Pasien Dengan Masalah Ginekologi/Onkologi'
    store.form.asupanmakanberkurang = 0
    store.form.metabolisme = 0
    store.form.penambahanbb = 0
    store.form.nilaihbberkurang = 0
    store.form.skorgizix = 0
  }
  else {
    store.form.ketmetodeskrininggizi = 'Pasien Dengan Masalah Obstetri/Kehamilan/Nifas'
    store.form.skreeninggizi = 0
    store.form.asupanmakan = 0
    store.form.kondisikhusus = ''
    store.form.skor = 0
  }
}
function lihatPerubahan (val, x) {
  if (x === 1) {
    store.form.kondisikhusus = val?.label
    store.form.skorkondisikhusus = val?.value
  }
  store.hitungNilaiSkor()
}

function updateSelection (val) {
  // console.log(val.join(','))
  store.setForm('riwayatalergi', val.join(', '))
}

function updateNyerihilang (val) {
  store.setForm('nyerihilang', val.join(', '))
}

function updateasupanantenatal (val) {
  if (!store.selectionasupanantenatal.includes('Lain-Lain')) {
    store.form.sebutkanasupanantenatal = ''
  }
  store.setForm('updateasupanantenatal', val.join(', '))
}

function updateSelectionginekologis (val) {
  // console.log(val.join(','))
  store.setForm('ginekologis', val.join(', '))
}

function updateSelectionkeluhanhamils (val) {
  if (!store.selectionkeluhanhamils.includes('Lain-lain')) {
    store.form.sebutkeluhanhamils = ''
  }
  store.setForm('keluhanhamil', val.join(', '))
}

function lihatPerubahankasuskehamilan () {
  const skor = parseInt(store.form.asupanmakanberkurang) + parseInt(store.form.metabolisme) + parseInt(store.form.penambahanbb) + parseInt(store.form.nilaihbberkurang)
  store.form.skorgizix = skor
}

function nilaiexpresiwajah (val) {
  if (val === 'Santai, Tanpa Ketegangan') {
    store.nilaiekspresiwajah = 1
  }
  else if (val === 'Sedikit Tegang, Seperti Dahi Berkerut') {
    store.nilaiekspresiwajah = 2
  }
  else if (val === 'Sedikit Tegang, Mata Tertutup Rapat') {
    store.nilaiekspresiwajah = 3
  }
  else if (val === 'Ekpresi Menunjukan Nyeri Parah, Seperti Menangis Atau Mengerutkan Wajah') {
    store.nilaiekspresiwajah = 4
  }

  hitungscorebps()
}

function nilaigerakantangan (val) {
  if (val === 'Tidak Ada Gerakan') {
    store.nilaigerakantangan = 1
  }
  else if (val === 'Ada Gerakan Ringan, Seperti Mengerutkan atau Menggerakan Telapak Tangan Tanpa Arah') {
    store.nilaigerakantangan = 2
  }
  else if (val === 'Ada Gerakan Kuat, Seperti Menarik Tangan Atau Berusaha Melepas Alat Medis') {
    store.nilaigerakantangan = 3
  }
  else if (val === 'Gerakan Tidak Terkendali, Seperti Upaya Melarikan Diri') {
    store.nilaigerakantangan = 4
  }

  hitungscorebps()
}

function nilaikepatuhanventilasi (val) {
  if (val === 'Toleran, Tidak Ada Perlawanan') {
    store.nilaikepatuhanventilasi = 1
  }
  else if (val === 'Sedikit Tidak Toleran, Batuk Sekali atau Melawan Sedikit') {
    store.nilaikepatuhanventilasi = 2
  }
  else if (val === 'Sering Batuk atau Melawan Ventilasi') {
    store.nilaikepatuhanventilasi = 3
  }
  else if (val === 'Tidak Toleran Sama Sekali, Melawan Ventilasi Secara Konstan') {
    store.nilaikepatuhanventilasi = 4
  }

  hitungscorebps()
}

function hitungscorebps () {
  // store.form.scroebps = parseInt(store.nilaiekspresiwajah) + parseInt(store.nilaigerakantangan) + parseInt(store.nilaikepatuhanventilasi)

  store.form.scroebps = parseInt(store.nilaiekspresiwajah) + parseInt(store.nilaigerakantangan) + parseInt(store.nilaikepatuhanventilasi)
  if (store.form.scroebps === 3) {
    store.form.ketscorebps = 'Tidak Ada Nyeri'
    store.form.ketcolorbps = 'light-green'
  }
  else if (store.form.scroebps >= 4 && store.form.scroebps <= 6) {
    store.form.ketscorebps = 'Nyeri Ringan'
    store.form.ketcolorbps = 'green'
  }
  else if (store.form.scroebps >= 7 && store.form.scroebps <= 9) {
    store.form.ketscorebps = 'Nyeri Sedang'
    store.form.ketcolorbps = 'orange'
  }
  else if (store.form.scroebps >= 10 && store.form.scroebps <= 12) {
    store.form.ketscorebps = 'Nyeri Berat'
    store.form.ketcolorbps = 'red'
  }
}

function nilaiekspresiwajahnips (val) {
  if (val === 'Santai') {
    store.nilaiekspresiwajahnips = 0
  }
  else if (val === 'Meringis') {
    store.nilaiekspresiwajahnips = 1
  }
  hitungscorenipsb()
}

function nilaimenangis (val) {
  if (val === 'Tidak Menangis') {
    store.nilaimenangis = 0
  }
  else if (val === 'Merengek/Merintih') {
    store.nilaimenangis = 1
  }
  else if (val === 'Menangis') {
    store.nilaimenangis = 2
  }
  hitungscorenipsb()
}

function nilaipolanafas (val) {
  if (val === 'Santai') {
    store.nilaipolanafas = 0
  }
  else if (val === 'Perubahan Pola Nafas') {
    store.nilaipolanafas = 1
  }
  hitungscorenipsb()
}

function nilailengan (val) {
  if (val === 'Santai') {
    store.nilailengan = 0
  }
  else if (val === 'Flexi/Extensi') {
    store.nilailengan = 1
  }
  hitungscorenipsb()
}

function nilaikaki (val) {
  if (val === 'Santai') {
    store.nilaikaki = 0
  }
  else if (val === 'Flexi/Extensi') {
    store.nilaikaki = 1
  }
  hitungscorenipsb()
}

function nilairangsangan (val) {
  if (val === 'Tertidur/Bangun') {
    store.nilairangsangan = 0
  }
  else if (val === '') {
    store.nilairangsangan = 1
  }
  hitungscorenipsb()
}

function hitungscorenipsb () {
  store.form.scroenips = parseInt(store.nilaiekspresiwajahnips) + parseInt(store.nilaimenangis) + parseInt(store.nilaipolanafas) +
  parseInt(store.nilailengan) + parseInt(store.nilaikaki) + parseInt(store.nilairangsangan)

  if (store.form.scroenips === 0) {
    store.form.ketscorenips = 'Tidak Nyeri'
    store.form.ketcolornips = 'light-green'
  }
  else if (store.form.scroenips <= 2) {
    store.form.ketscorenips = 'Tidak Nyaman'
    store.form.ketcolornips = 'green'
  }
  else if (store.form.scroenips > 2 && store.form.scroenips <= 4) {
    store.form.ketscorenips = 'Nyeri Ringan - Sedang'
    store.form.ketcolornips = 'orange'
  }
  else if (store.form.scroenips >= 5 && store.form.scroenips <= 8) {
    store.form.ketscorenips = 'Nyeri Sedang - Berat'
    store.form.ketcolornips = 'red'
  }
}

function chagngereset (val) {
  console.log('sasasa', val)
  if (val === 'bps') {
    resetnrt()
    resetnips()
  }
  else if (val === 'nrt') {
    resetnips()
    resetbps()
  }
  else if (val === 'nips') {
    resetnrt()
    resetbps()
  }
}

function riwayatgonekologi (val) {
  if (val === 'Tidak') {
    store.selectionginekologis = []
    store.form.sebutkanginekologis = ''
  }
}

function resetbps () {
  store.form.ekspresiwajah = ''
  store.form.gerakantangan = ''
  store.form.kepatuhanventilasimekanik = ''
  store.form.scroebps = 0
  store.form.ketscorebps = ''
}

function resetnrt () {
  store.form.keteranganscorenyeri = 'tidak ada nyeri'
  store.form.skornyeri = 0
}

function resetnips () {
  store.form.ekspresiwajahnips = ''
  store.form.menangis = ''
  store.form.polanafas = ''
  store.form.lengan = ''
  store.form.kaki = ''
  store.form.keadaanrangsangan = ''
  store.form.scroenips = 0
  store.form.ketscorenips = ''
}

function hapusItem (id) {
  $q.dialog({
    dark: true,
    title: 'Peringatan',
    message: 'Apakah Data ini akan dihapus?',
    cancel: true,
    persistent: true
  }).onOk(() => {
    // console.log('OK')
    storeHistoryPernikahan.deleteData(props.pasien, id)
  }).onCancel(() => {
    // console.log('Cancel')
  }).onDismiss(() => {
    // console.log('I am triggered on both OK and Cancel')
  })
}

function hapusItemKehamilan (id) {
  $q.dialog({
    dark: true,
    title: 'Peringatan',
    message: 'Apakah Data ini akan dihapus?',
    cancel: true,
    persistent: true
  }).onOk(() => {
    // console.log('OK')
    storeHistorykehamilan.deleteData(props.pasien, id)
  }).onCancel(() => {
    // console.log('Cancel')
  }).onDismiss(() => {
    // console.log('I am triggered on both OK and Cancel')
  })
}

function fungsiasupanantenatal (val) {
  if (val === 'Tidak') {
    store.selectionasupanantenatal = []
    store.form.sebutkanasupanantenatal = ''
  }
}

function fungsiimunisasit (val) {
  if (val === 'Tidak') {
    store.form.sebutkanimunisasitt = ''
  }
}

store.form.optionskriniggizi = 1
store.form.metode = 'nrt'
store.initGpa(props.triage)

// eslint-disable-next-line no-unused-vars
const lists = computed(() => {
  const arr = props.pasien?.historyperkawinan
  return arr?.sort((a, b) => { return b.id - a.id })
})

const listskehamilan = computed(() => {
  const arr = props.pasien?.historykehamilan
  return arr?.sort((a, b) => { return b.id - a.id })
})

</script>
