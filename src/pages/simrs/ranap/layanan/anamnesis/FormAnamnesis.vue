<template>
  <div class="row q-col-gutter-md">
    <q-input
      ref="refInputKu"
      v-model="store.form.keluhanUtama"
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
      v-model="store.form.rwPenySkr"
      outlined
      autogrow
      stack-label
      standout="bg-yellow-3"
      label="Riwayat Penyakit Sekarang"
      hide-bottom-space
      style="width:50%"
    />
    <q-input
      v-model="store.form.rwPenyDhl"
      outlined
      autogrow
      stack-label
      standout="bg-yellow-3"
      label="Riwayat Penyakit Dahulu"
      hide-bottom-space
      style="width:50%"
    />
    <q-input
      v-model="store.form.rwPenyKlrg"
      outlined
      autogrow
      stack-label
      standout="bg-yellow-3"
      label="Riwayat Penyakit Keluarga"
      hide-bottom-space
      style="width:50%"
    />
    <q-input
      v-model="store.form.rwPengobatan"
      outlined
      autogrow
      stack-label
      standout="bg-yellow-3"
      label="Riwayat Pengobatan"
      hide-bottom-space
      style="width:50%"
    />
    <q-input
      v-model="store.form.rwPkrjDgZatBahaya"
      outlined
      autogrow
      stack-label
      standout="bg-yellow-3"
      label="Riwayat Pekerjaan yg berhubung dg Zat berbahaya"
      hide-bottom-space
      style="width:50%"
    />

    <div class="col-12">
      <!-- RIWAYAT ALERGI -->
      <q-card flat bordered class="q-mb-sm">
        <q-card-section>
          <div class="text-weight-bold">
            Riwayat Alergi
          </div>
          <div class="text-grey-8 f-10">
            Riwayat alergi yang pernah dialami
            oleh pasien
          </div>
          <q-separator class="q-my-sm" />
          <div class="flex q-gutter-sm q-mb-sm">
            <q-checkbox
              dense
              v-for="(al, i) in store.alergis"
              :key="i"
              v-model="store.form.rwAlergi"
              :val="al"
              :label="al"
              color="primary"
            />
          </div>
          <q-input
            v-model="store.form.ketRwAlergi"
            outlined
            label="Keterangan Alergi"
            standout="bg-yellow-3"
            autogrow
            style="width: 70%;"
          />
        </q-card-section>
      </q-card>

      <!-- FORM 4.2 -->
      <q-card v-if="kasus?.gruping==='4.2'" flat bordered class="q-mb-sm">
        <q-card-section class="row q-col-gutter-xs">
          <div class="text-weight-bold col-12">
            Form 4.2 (Kebidanan)
            <q-separator class="q-my-sm" />
          </div>

          <q-input
            v-model="store.formKebidanan.rwObsetri"
            outlined
            label="Riwayat Peny. Obsetric/Gynecology Sekarang"
            standout="bg-yellow-3"
            autogrow
            class="col-12"
          />
          <q-input
            v-model="store.formKebidanan.rwRawat"
            outlined
            label="Pernah dirawat ?"
            standout="bg-yellow-3"
            autogrow
            class="col-6"
          />
          <q-input
            v-model="store.formKebidanan.rwOperasi"
            outlined
            label="Pernah Operasi ?"
            standout="bg-yellow-3"
            autogrow
            class="col-6"
          />

          <div class="col-12 q-mt-sm">
            <div class="text-bold">
              Riwayat Penyakit Gynecology
            </div>
            <q-separator class="q-my-sm" />

            <div class="flex q-gutter-sm">
              <q-checkbox
                dense
                v-for="(g, x) in store.gynecologys"
                :key="x"
                v-model="store.formKebidanan.rwGynecology"
                :val="g"
                :label="g"
                color="primary"
              />
            </div>
            <q-separator class="q-my-sm" />
            <div class="text-bold q-mt-sm">
              Riwayat KB
            </div>
            <q-separator class="q-my-xs" />
            <div class="row q-col-gutter-xs">
              <app-input-simrs v-model="store.formKebidanan.rwKbJns" label="Jenis" class="col-4" />
              <app-input-simrs v-model="store.formKebidanan.rwKbLama" label="Lama" class="col-4" />
              <app-input-simrs v-model="store.formKebidanan.rwKbKeluhan" label="Keluhan" class="col-4" />
            </div>
            <q-separator class="q-my-sm" />
            <div class="text-bold q-mt-sm">
              Riwayat Menstruasi
            </div>
            <q-separator class="q-my-xs" />
            <div class="row q-col-gutter-xs">
              <app-input-simrs v-model="store.formKebidanan.menarche" label="Menarche (th)" class="col-4" />
              <app-input-simrs v-model="store.formKebidanan.siklusHari" label="Siklus (hr)" class="col-4" />
              <q-select
                v-model="store.formKebidanan.siklus"
                dense
                standout="bg-yellow-3 text-black"
                outlined
                label="Siklus"
                :options="store.sikluses"
                emit-value
                map-options
                input-class="ellipsis"
                fill-input
                hide-bottom-space
                class="col-4"
              />
              <app-input-simrs v-model="store.formKebidanan.lamaMens" label="Lama (hr)" class="col-2" :valid="{number: true}" />
              <q-select
                v-model="store.formKebidanan.kondisiMens"
                dense
                standout="bg-yellow-3 text-black"
                outlined
                label="Kondisi Mens"
                :options="store.kondisiMens"
                emit-value
                map-options
                input-class="ellipsis"
                fill-input
                hide-bottom-space
                class="col-6"
              />
              <app-input-simrs v-model="store.formKebidanan.hpht" label="HPHT (hr)" class="col-4" :valid="{number: true}" />
              <app-input-date
                v-model="store.formKebidanan.tglPerkPersalinan"
                label="Tanggal Perk. Persalinan"
                outlined
                dense
                @set-model="(val)=>{store.formKebidanan.tglPerkPersalinan=val}"
                class="col-3"
              />

              <div class="col-12 q-mt-xs">
                <div class="text-bold q-mt-sm">
                  Riwayat Perkawinan
                </div>
                <q-separator />
              </div>
              <app-input-simrs v-model="store.formKebidanan.rwKawinStatus" label="Status" class="col-7" />
              <app-input-simrs v-model="store.formKebidanan.kawinKe" label="Perkawinan Ke" class="col-2" :valid="{number: true}" />
              <app-input-simrs v-model="store.formKebidanan.nikahUmur" label="Nikah Umur" class="col-2" :valid="{number: true}" />

              <div class="col-12 q-mt-xs">
                <div class="text-bold q-mt-sm">
                  Riwayat Kehamilan, Persalinan, Nifas
                </div>
                <q-separator class="q-my-sm" />
              </div>
              <app-input-simrs v-model="store.formKebidanan.g" label="G" class="col-2" />
              <app-input-simrs v-model="store.formKebidanan.p" label="P" class="col-2" />
              <app-input-simrs v-model="store.formKebidanan.ab" label="Ab" class="col-2" />
              <app-input-simrs v-model="store.formKebidanan.ah" label="Ah" class="col-2" />
              <q-select
                v-model="store.formKebidanan.imunisasi"
                dense
                standout="bg-yellow-3 text-black"
                outlined
                label="Imunisasi"
                :options="store.imunisasis"
                emit-value
                map-options
                input-class="ellipsis"
                fill-input
                hide-bottom-space
                class="col-4"
              />

              <div class="full-width">
                <div class="flex q-gutter-sm items-center q-mb-sm q-mt-xs">
                  <div class="text-bold">
                    Riwayat Kehamilan
                  </div>
                  <q-btn dense outline color="primary" icon="icon-mat-add" label="Tambah Riwayat Kehamilan" class="q-px-sm" @click="store.openDialogFormRiwayat = true" />
                </div>
                <TableRiwayatKehamilan :items="store.riwayatKehamilans" @delete="store.deleteRiwayatKehamilan()" />
              </div>
            </div>
            <div class="text-bold q-mt-sm">
              Pola Eliminasi
            </div>
            <q-separator class="q-my-xs" />

            <div class="row q-col-gutter-xs">
              <app-input-simrs v-model="store.formKebidanan.bab" label="BAB (x/hr)" class="col-2" :valid="{number: true}" />
              <q-select
                v-model="store.formKebidanan.konsistensi"
                dense
                standout="bg-yellow-3 text-black"
                outlined
                label="Konsistensi"
                :options="store.konsistensis"
                emit-value
                map-options
                input-class="ellipsis"
                fill-input
                hide-bottom-space
                class="col-3"
              />
              <q-select
                v-model="store.formKebidanan.warna"
                dense
                standout="bg-yellow-3 text-black"
                outlined
                label="Warna"
                :options="store.warnas"
                emit-value
                map-options
                input-class="ellipsis"
                fill-input
                hide-bottom-space
                class="col-4"
              />

              <app-input-simrs v-model="store.formKebidanan.peristatikUsus" label="Peri. Usus x/mnt" class="col-3" :valid="{number: true}" />
              <q-select
                v-model="store.formKebidanan.flatus"
                dense
                standout="bg-yellow-3 text-black"
                outlined
                label="Flatus"
                :options="store.yaTidaks"
                emit-value
                map-options
                input-class="ellipsis"
                fill-input
                hide-bottom-space
                class="col-2"
              />
              <app-input-simrs v-model="store.formKebidanan.bak" label="BAK x/hr" class="col-2" :valid="{number: true}" />
              <div class="col-12 q-gutter-sm flex">
                <div>Keluhan BAK :</div>
                <q-checkbox dense size="sm" v-for="n in store.keluhanBaks" :key="n" v-model="store.formKebidanan.keluhanBak" :val="n" :label="n" />
              </div>
              <div class="col-12 q-gutter-sm flex q-mb-sm">
                <div>Keluhan :</div>
                <q-checkbox dense size="sm" v-for="n in store.keluhans" :key="n" v-model="store.formKebidanan.keluhans" :val="n" :label="n" />
              </div>
              <app-input-simrs v-model="store.formKebidanan.jmlBak" label="Jml. BAK ml/hr" class="col-3" :valid="{number: true}" />
              <!-- <q-select
                v-model="store.formKebidanan.warnaUrine"
                dense
                standout="bg-yellow-3 text-black"
                outlined
                label="Warna Urine"
                :options="store.warnaUrine"
                emit-value
                map-options
                input-class="ellipsis"
                fill-input
                hide-bottom-space
                class="col-4"
              /> -->
              <q-select
                v-model="store.formKebidanan.warnaUrine"
                dense
                standout="bg-yellow-3 text-black"
                outlined
                label="Warna Urine"
                :options="store.warnaUrine"
                hide-selected
                fill-input
                use-input
                input-debounce="0"
                hide-bottom-space
                hide-dropdown-icon
                @input-value="(val)=> store.formKebidanan.warnaUrine=val"
                class="col-4"
              />
              <q-select
                v-model="store.formKebidanan.kateter"
                dense
                standout="bg-yellow-3 text-black"
                outlined
                label="Terp. Kateter"
                :options="store.yaTidaks"
                emit-value
                map-options
                input-class="ellipsis"
                fill-input
                hide-bottom-space
                class="col-3"
              />
              <app-input-simrs v-if="store.formKebidanan.kateter==='Ya'" v-model="store.formKebidanan.kttHrKe" label="Ktt Hr ke-" class="col-2" :valid="{number: true}" />
            </div>
          </div>
        </q-card-section>
      </q-card>

      <!-- FORM 4.3 -->
      <q-card v-if="kasus?.gruping==='4.3'" flat bordered class="q-mb-sm">
        <q-card-section>
          <div class="text-weight-bold">
            Form 4.3 (Neonatal)
          </div>
          <q-separator class="q-my-xs" />
          <div class="text-weight-bold">
            Riwayat Kehamilan
          </div>
          <q-separator class="q-my-xs" />
          <div class="row q-col-gutter-xs">
            <app-input-simrs v-model="store.formNeoNatal.g" label="G" class="col-2" />
            <app-input-simrs v-model="store.formNeoNatal.p" label="P" class="col-2" />
            <app-input-simrs v-model="store.formNeoNatal.a" label="A" class="col-2" />
            <app-input-simrs v-model="store.formNeoNatal.usiaGestasi" label="UG" class="col-2" />
            <q-select
              v-model="store.formNeoNatal.sgIbu"
              dense
              standout="bg-yellow-3 text-black"
              outlined
              label="Status Gizi (Ibu)"
              :options="store.baikBuruks"
              emit-value
              map-options
              input-class="ellipsis"
              fill-input
              hide-bottom-space
              class="col-4"
            />
            <app-input-simrs v-model="store.formNeoNatal.rwObat" label="Obat konsumsi slm (Hamil)" class="col-12" />
            <q-select
              v-model="store.formNeoNatal.kebiasaanIbu"
              dense
              standout="bg-yellow-3 text-black"
              outlined
              label="Kebiasaan (Ibu)"
              :options="store.kebiasaanIbus"
              hide-selected
              fill-input
              use-input
              input-debounce="0"
              hide-bottom-space
              hide-dropdown-icon
              @input-value="(val)=> store.formNeoNatal.kebiasaanIbu=val"
              class="col-4"
            />
            <q-select
              v-model="store.formNeoNatal.rwPersalinan"
              dense
              standout="bg-yellow-3 text-black"
              outlined
              label="Riwayat Persalinan"
              :options="store.riwayatPersalinans"
              hide-selected
              fill-input
              use-input
              input-debounce="0"
              hide-bottom-space
              hide-dropdown-icon
              @input-value="(val)=> store.formNeoNatal.rwPersalinan=val"
              class="col-4"
            />
            <q-select
              v-model="store.formNeoNatal.ketuban"
              dense
              standout="bg-yellow-3 text-black"
              outlined
              label="Ketuban"
              :options="store.ketubans"
              hide-selected
              fill-input
              use-input
              input-debounce="0"
              hide-bottom-space
              hide-dropdown-icon
              @input-value="(val)=> store.formNeoNatal.ketuban=val"
              class="col-4"
            />
            <q-select
              v-model="store.formNeoNatal.volume"
              dense
              standout="bg-yellow-3 text-black"
              outlined
              label="Volume"
              :options="store.volumes"
              hide-selected
              fill-input
              use-input
              input-debounce="0"
              hide-bottom-space
              hide-dropdown-icon
              @input-value="(val)=> store.formNeoNatal.volume=val"
              class="col-4"
            />
          </div>
          <q-separator class="q-my-xs" />
          <div class="text-weight-bold">
            Riwayat Lainnya
          </div>
          <q-separator class="q-my-xs" />
          <div class="row q-col-gutter-xs">
            <app-input-simrs v-model="store.formNeoNatal.rwTransDarah" label="Riwayat Transfusi Darah" class="col-12" />
            <q-input
              v-model="store.formNeoNatal.reaksiTrans"
              outlined
              label="Reaksi Ketika Transfusi Darah"
              standout="bg-yellow-3"
              autogrow
              class="col-6"
            />
            <q-input
              v-model="store.formNeoNatal.rwImunisasi"
              outlined
              label="Riwayat Imunisasi"
              standout="bg-yellow-3"
              autogrow
              class="col-6"
            />
          </div>
          <q-separator class="q-my-xs" />
          <div class="text-weight-bold">
            Riwayat Kelahiran
          </div>
          <q-separator class="q-my-xs" />
          <div class="row q-col-gutter-xs">
            <q-select
              v-model="store.formNeoNatal.crLahir"
              dense
              standout="bg-yellow-3 text-black"
              outlined
              label="Cara Kelahiran"
              :options="store.caraLahirs"
              hide-selected
              fill-input
              use-input
              input-debounce="0"
              hide-bottom-space
              hide-dropdown-icon
              @input-value="(val)=> store.formNeoNatal.crLahir=val"
              class="col-4"
            />
            <app-input-simrs v-model="store.formNeoNatal.apgarScore" label="APGAR Score" class="col-3" :valid="{ number: true}" />
            <q-select
              v-model="store.formNeoNatal.volumeKetuban"
              dense
              standout="bg-yellow-3 text-black"
              outlined
              label="Volume Air Ketuban"
              :options="store.volumes"
              hide-selected
              fill-input
              use-input
              input-debounce="0"
              hide-bottom-space
              hide-dropdown-icon
              @input-value="(val)=> store.formNeoNatal.volumeKetuban=val"
              class="col-5"
            />
            <q-select
              v-model="store.formNeoNatal.warnaKetuban"
              dense
              standout="bg-yellow-3 text-black"
              outlined
              label="Warna Air Ketuban"
              :options="store.ketubans"
              hide-selected
              fill-input
              use-input
              input-debounce="0"
              hide-bottom-space
              hide-dropdown-icon
              @input-value="(val)=> store.formNeoNatal.warnaKetuban=val"
              class="col-4"
            />
            <app-input-simrs v-model="store.formNeoNatal.pecahDini" label="Ketuban Pecah Dini" class="col-8" />
          </div>
          <q-separator class="q-my-xs" />
          <div class="text-weight-bold">
            Golongan Darah
          </div>
          <q-separator class="q-my-xs" />
          <div class="row q-col-gutter-xs">
            <q-select
              v-model="store.formNeoNatal.golDarahIbu"
              dense
              standout="bg-yellow-3 text-black"
              outlined
              label="Golongan Darah Ibu"
              :options="store.golDarahs"
              emit-value
              map-options
              input-class="ellipsis"
              fill-input
              hide-bottom-space
              class="col-4"
            />
            <q-select
              v-model="store.formNeoNatal.golDarahAyah"
              dense
              standout="bg-yellow-3 text-black"
              outlined
              label="Golongan Darah Ayah"
              :options="store.golDarahs"
              emit-value
              map-options
              input-class="ellipsis"
              fill-input
              hide-bottom-space
              class="col-4"
            />
            <q-select
              v-model="store.formNeoNatal.golDarahBayi"
              dense
              standout="bg-yellow-3 text-black"
              outlined
              label="Golongan Darah (Bayi)"
              :options="store.golDarahs"
              emit-value
              map-options
              input-class="ellipsis"
              fill-input
              hide-bottom-space
              class="col-4"
            />
          </div>
        </q-card-section>
      </q-card>

      <!-- FORM 4.4 -->
      <q-card v-if="kasus?.gruping==='4.4'" flat bordered class="q-mb-sm">
        <q-card-section>
          <div class="text-weight-bold">
            Form 4.4 (Pediatrik)
          </div>
          <q-separator class="q-my-xs" />
          <div class="text-weight-bold">
            Riwayat Penyakit Kelahiran
          </div>
          <q-separator class="q-my-xs" />
          <div class="row q-col-gutter-xs">
            <app-input-simrs v-model="store.formPediatrik.anakKe" label="Anak Ke-" class="col-2" />
            <app-input-simrs v-model="store.formPediatrik.jmlSaudara" label="Jml Saudara" class="col-2" />
            <q-select
              v-model="store.formPediatrik.crKelahiran"
              dense
              standout="bg-yellow-3 text-black"
              outlined
              label="Cara Kelahiran"
              :options="store.caraKelahirans"
              hide-selected
              fill-input
              use-input
              input-debounce="0"
              hide-bottom-space
              hide-dropdown-icon
              @input-value="(val)=> store.formPediatrik.crKelahiran=val"
              class="col-4"
            />
            <q-select
              v-model="store.formPediatrik.umurKelahiran"
              dense
              standout="bg-yellow-3 text-black"
              outlined
              label="Umur Kelahiran"
              :options="store.umurKelahirans"
              emit-value
              map-options
              input-class="ellipsis"
              fill-input
              hide-bottom-space
              class="col-4"
            />

            <app-input-simrs v-model="store.formPediatrik.klainanBawaan" label="Kelainan Bawaan" class="col-8" />
          </div>
          <q-separator class="q-my-xs" />
          <div class="text-weight-bold">
            Riwayat Imunisasi
          </div>
          <q-separator class="q-my-sm" />
          <div class="col-12 flex q-gutter-sm">
            <q-checkbox dense size="md" v-for="n in store.rwImunisasis" :key="n" v-model="store.formPediatrik.rwImunisasi" :label="n" :val="n" />
          </div>
          <q-separator class="q-my-sm" />
          <div class="text-weight-bold">
            Riwayat Tumbuh Kembang Anak
          </div>
          <q-separator class="q-my-xs" />
          <div class="row q-col-gutter-xs">
            <app-input-simrs v-model="store.formPediatrik.gigiPertama" label="Gigi Pertama, Usia" class="col-3" />
            <app-input-simrs v-model="store.formPediatrik.berjalan" label="Berjalan, Usia" class="col-3" />
            <app-input-simrs v-model="store.formPediatrik.duduk" label="Duduk, Usia" class="col-3" />
            <app-input-simrs v-model="store.formPediatrik.bicara" label="Bicara, Usia" class="col-3" />
          </div>
          <q-separator class="q-my-sm" />
          <div class="text-weight-bold">
            Kebutuhan Dasar Saat Ini
          </div>
          <q-separator class="q-my-xs" />
          <div class="row q-col-gutter-xs">
            <app-input-simrs v-model="store.formPediatrik.sukaMknan" label="Makanan yg disukai" class="col-6" />
            <app-input-simrs v-model="store.formPediatrik.tdkSukaMknan" label="Makanan yg tidak disukai" class="col-6" />
            <q-select
              v-model="store.formPediatrik.nafsuMkn"
              dense
              standout="bg-yellow-3 text-black"
              outlined
              label="Nafsu Makan"
              :options="store.nafsuMakans"
              emit-value
              map-options
              input-class="ellipsis"
              fill-input
              hide-bottom-space
              class="col-4"
            />
            <q-select
              v-model="store.formPediatrik.polaMakan"
              dense
              standout="bg-yellow-3 text-black"
              outlined
              label="Pola Makan"
              :options="store.polaMakans"
              emit-value
              map-options
              input-class="ellipsis"
              fill-input
              hide-bottom-space
              class="col-4"
            />
            <q-select
              v-model="store.formPediatrik.mknYgdiberikan"
              dense
              standout="bg-yellow-3 text-black"
              outlined
              label="Mkanan yg diberikan"
              :options="store.makananYgdiberikans"
              hide-selected
              fill-input
              use-input
              input-debounce="0"
              hide-bottom-space
              hide-dropdown-icon
              @input-value="(val)=> store.formPediatrik.mknYgdiberikan=val"
              class="col-4"
            />
          </div>
          <q-separator class="q-my-sm" />
          <div class="text-weight-bold">
            Pola Tidur
          </div>
          <q-separator class="q-my-xs" />
          <div class="row q-col-gutter-xs">
            <div class="col-6 row items-center q-col-gutter-sm">
              <div class="col-auto">
                Siang (jam / hari)
              </div>
              <app-input-simrs v-model="store.formPediatrik.tidurSiang" label="(jm/hr)" class="col-auto" />
            </div>
            <div class="col-6 row items-center q-col-gutter-sm">
              <div class="col-auto">
                Malam (jam / hari)
              </div>
              <app-input-simrs v-model="store.formPediatrik.tidurMalam" label="(jm/hr)" class="col-auto" />
            </div>
          </div>
          <q-separator class="q-my-xs" />
          <div class="row q-col-gutter-xs">
            <q-select
              v-model="store.formPediatrik.kebiasaanSblmMkn"
              dense
              standout="bg-yellow-3 text-black"
              outlined
              label="Kebiasaan sblm makan"
              :options="store.kebiasaanSblMakans"
              hide-selected
              fill-input
              use-input
              input-debounce="0"
              hide-bottom-space
              hide-dropdown-icon
              @input-value="(val)=> store.formPediatrik.kebiasaanSblmMkn=val"
              class="col-6"
            />
            <q-select
              v-model="store.formPediatrik.nyeri"
              dense
              standout="bg-yellow-3 text-black"
              outlined
              label="Adakah nyeri"
              :options="store.yaTidaks"
              hide-selected
              fill-input
              use-input
              input-debounce="0"
              hide-bottom-space
              hide-dropdown-icon
              @input-value="(val)=> store.formPediatrik.nyeri=val"
              class="col-6"
            />
          </div>

          <q-separator class="q-my-sm" />
          <div class="text-weight-bold">
            Pola Kebersihan diri
          </div>
          <q-separator class="q-my-xs" />
          <div class="row q-col-gutter-sm ">
            <app-input-simrs v-model="store.formPediatrik.mandiSendiri" label="Mnd Sndr (x/hr)" class="col-2" />
            <app-input-simrs v-model="store.formPediatrik.dimandikan" label="Dimndkan (x/hr)" class="col-2" />
            <app-input-simrs v-model="store.formPediatrik.gosokGigi" label="Gsk gg (x/hr)" class="col-2" />
            <app-input-simrs v-model="store.formPediatrik.keramas" label="Krmas (x/mgu)" class="col-2" />
            <q-select
              v-model="store.formPediatrik.kbersihanKuku"
              dense
              standout="bg-yellow-3 text-black"
              outlined
              label="Kebersihan Kuku"
              :options="['Bersih', 'Kotor']"
              emit-value
              map-options
              input-class="ellipsis"
              fill-input
              hide-bottom-space
              class="col-4"
            />
          </div>
          <q-separator class="q-my-xs q-mb-sm" />
          <div class="row q-col-gutter-xs">
            <q-select
              v-model="store.formPediatrik.aktifitas"
              dense
              standout="bg-yellow-3 text-black"
              outlined
              label="Aktifitas Bermain"
              :options="store.aktifitasBermains"
              emit-value
              map-options
              fill-input
              hide-bottom-space
              class="col-4"
            />

            <app-input-simrs v-model="store.formPediatrik.babFrekuensi" label="Frek. BAB (x/hr)" class="col-2" />
            <app-input-simrs v-model="store.formPediatrik.babKonsistensi" label="Konsis. BAB" class="col-3" />
            <app-input-simrs v-model="store.formPediatrik.babBau" label="Bau BAB" class="col-3" />

            <app-input-simrs v-model="store.formPediatrik.bakFrekuensi" label="BAK (x/hr)" class="col-2" />
            <app-input-simrs v-model="store.formPediatrik.babWarna" label="warna BAK" class="col-3" />
            <app-input-simrs v-model="store.formPediatrik.bakBau" label="Bau BAK" class="col-3" />
          </div>
        </q-card-section>
      </q-card>

      <!-- KAJIAN NYERI 4.1 -->
      <q-card v-if="kasus?.gruping==='4.1'" flat bordered class="q-mb-sm">
        <q-card-section class="q-py-xs q-px-md">
          <div class="flex q-gutter-xs items-center">
            <div class="text-weight-bold">
              Kajian Nyeri
            </div>
            <q-radio v-model="store.form.keluhannyeri.kajianNyeri" v-for="dd in store.pilihanNyeris" :key="dd" :label="dd?.text" :val="dd.text" @update:model-value="store.hitungSkorNyeri('form')" />
          </div>
          <q-separator />
        </q-card-section>
        <q-card-section>
          <div v-if="store.form.keluhannyeri.kajianNyeri==='Wong Baker Face Scale'" class="row items-center q-col-gutter-md">
            <div class="col-4">
              <!-- Keluhan Nyeri ({{ store.form.keluhannyeri.kajianNyeri.text }}) : -->
              <span class="q-ml-sm">
                <q-icon
                  size="lg"
                  color="teal"
                  :name="iconNyeri"
                />
              </span>
              <em class="text-primary q-ml-sm">{{ store.form.keluhannyeri.ket }}</em>
            </div>
            <div class="col-8">
              <q-slider
                v-model="store.form.keluhannyeri.skorNyeri"
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
                @update:model-value="(val)=>store.setKeteranganSkornyeri(val, 'form')"
                style="width: 100%;"
              />
            </div>
          </div>
          <div v-else>
            <q-separator class="q-my-xs" />
            <template v-for="(val, key) in store.form.keluhannyeri?.form" :key="val">
              <div class="row q-col-gutter-md">
                <div class="col-3 text-weight-bold">
                  {{ key }} :
                </div>
                <div class="col-9">
                  <div class="flex q-gutter-sm items-center">
                    <q-radio
                      dense size="sm" v-model="store.form.keluhannyeri.form[key]" v-for="aa in store.formNyeris?.find(x=> x.kode===key)?.values" :key="aa" :label="aa?.text" :val="aa" @update:model-value="(val)=> {
                        // store.form.ekspresiWajahKet = aa?.text
                        console.log('aa',val);

                        store.hitungSkorNyeri('form')
                      }"
                    />
                  </div>
                </div>
              </div>
              <q-separator class="q-my-sm" />
            </template>

            <!-- <div class="text-weight-bold">
              Ekspresi Wajah :
            </div>
            <q-separator class="q-my-xs" />
            <div class="flex q-gutter-sm items-center">
              <q-radio
                dense size="sm" v-model="store.form.ekspresiWajah" v-for="aa in store.ekspresiWajah" :key="aa" :label="aa?.text" :val="aa?.value" @update:model-value="(val)=> {
                  store.form.ekspresiWajahKet = aa?.text
                  store.hitungSkorNyeri('form')
                }"
              />
            </div>
            <q-separator class="q-my-xs" />
            <div class="text-weight-bold">
              Gerakan Tangan :
            </div>
            <q-separator class="q-my-xs" />
            <div class="flex q-gutter-sm items-center">
              <q-radio
                dense size="sm" v-model="store.form.gerakanTangan" v-for="aa in store.gerakanTangan" :key="aa" :label="aa?.text" :val="aa?.value" @update:model-value="(val)=> {
                  store.form.gerakanTanganKet = aa?.text
                  store.hitungSkorNyeri('form')
                }"
              />
            </div>
            <q-separator class="q-my-xs" />
            <div class="text-weight-bold">
              Kepatuhan terhadap ventilasi mekanik :
            </div>
            <q-separator class="q-my-xs" /> -->
            <!-- <div class="flex q-gutter-sm items-center">
              <q-radio
                dense size="sm" v-model="store.form.kebutuhanVentilasi" v-for="aa in store.kebutuhanVentilasi" :key="aa" :label="aa?.text" :val="aa?.value" @update:model-value="(val)=> {
                  store.form.kebutuhanVentilasiKet = aa?.text
                  store.hitungSkorNyeri('form')
                }"
              />
            </div> -->
            <q-card-section class="row items-center justify-between q-py-sm q-px-md text-primary text-bold">
              <div>SKOR NYERI : {{ store.form?.keluhannyeri?.skorNyeri }}</div>
              <div>{{ store.form?.keluhannyeri?.ket }}</div>
            </q-card-section>
          </div>
        </q-card-section>
      </q-card>

      <!-- KAJIAN NYERI 4.3 NEONATAL -->
      <q-card v-if="kasus?.gruping==='4.3'" flat bordered class="q-mb-sm">
        <q-card-section class="q-py-xs q-px-md">
          <div class="flex q-gutter-xs items-center">
            <div class="text-weight-bold q-py-xs">
              Kajian Nyeri NIPS (Neonatus Infant Pain Scale)
            </div>
          </div>
          <q-separator />
        </q-card-section>
        <q-card-section>
          <div>
            <div class="text-weight-bold">
              Ekspresi Wajah :
            </div>
            <q-separator class="q-my-xs" />
            <div class="flex q-gutter-sm items-center">
              <q-radio dense size="sm" v-model="store.formNeoNatal.ekspresiWajah" v-for="aa in store.ekspresiWajahNeo" :key="aa" :label="aa?.text" :val="aa.skor" @update:model-value="store.hitungSkorNyeri('formNeoNatal')" />
            </div>
            <q-separator class="q-my-xs" />
            <div class="text-weight-bold">
              Menangis :
            </div>
            <q-separator class="q-my-xs" />
            <div class="flex q-gutter-sm items-center">
              <q-radio dense size="sm" v-model="store.formNeoNatal.menangis" v-for="aa in store.menangisNeo" :key="aa" :label="aa?.text" :val="aa.skor" @update:model-value="store.hitungSkorNyeri('formNeoNatal')" />
            </div>
            <q-separator class="q-my-xs" />
            <div class="text-weight-bold">
              Pola Nafas :
            </div>
            <q-separator class="q-my-xs" />
            <div class="flex q-gutter-sm items-center">
              <q-radio dense size="sm" v-model="store.formNeoNatal.polaNafas" v-for="aa in store.polaNafasNeo" :key="aa" :label="aa?.text" :val="aa.skor" @update:model-value="store.hitungSkorNyeri('formNeoNatal')" />
            </div>
            <q-separator class="q-my-xs" />
            <div class="text-weight-bold">
              Lengan :
            </div>
            <q-separator class="q-my-xs" />
            <div class="flex q-gutter-sm items-center">
              <q-radio dense size="sm" v-model="store.formNeoNatal.lengan" v-for="aa in store.lenganNeo" :key="aa" :label="aa?.text" :val="aa.skor" @update:model-value="store.hitungSkorNyeri('formNeoNatal')" />
            </div>
            <q-separator class="q-my-xs" />
            <div class="text-weight-bold">
              Kaki :
            </div>
            <q-separator class="q-my-xs" />
            <div class="flex q-gutter-sm items-center">
              <q-radio dense size="sm" v-model="store.formNeoNatal.kaki" v-for="aa in store.kakiNeo" :key="aa" :label="aa?.text" :val="aa.skor" @update:model-value="store.hitungSkorNyeri('formNeoNatal')" />
            </div>
            <q-separator class="q-my-xs" />
            <div class="text-weight-bold">
              Keadaan Rangsangan :
            </div>
            <q-separator class="q-my-xs" />
            <div class="flex q-gutter-sm items-center">
              <q-radio dense size="sm" v-model="store.formNeoNatal.keadaanRangsangan" v-for="aa in store.keadaanRangsanganNeo" :key="aa" :label="aa?.text" :val="aa.skor" @update:model-value="store.hitungSkorNyeri('formNeoNatal')" />
            </div>
          </div>
        </q-card-section>
        <q-separator />
        <q-card-section class="row items-center justify-between q-py-sm q-px-md text-primary text-bold">
          <div>SKOR NYERI : {{ store.formNeoNatal?.skorNyeri }}</div>
          <div>{{ store.formNeoNatal?.keluhanNyeri }}</div>
        </q-card-section>
      </q-card>
      <!-- GIZI 4.1 DEWASA -->
      <div v-if="kasus?.gruping==='4.1'" class="skreening-gizi-dewasa">
        <q-card flat bordered>
          <q-card-section class="q-py-sm q-px-md">
            <div>
              <strong>Skreening Gizi (Dewasa)</strong>
            </div>
            <q-separator />
          </q-card-section>
          <q-card-section class="row">
            <div class="col-9">
              Apakah Ada Penurunan Berat badan yang tidak diinginkan selama 6 Bulan terakhir ?
            </div>
            <div class="col-3 flex q-gutter-sm">
              <q-radio dense v-model="store.form.sgd.bb" :val="2" label="Iya" @update:model-value="hitungSkorGizi" />
              <q-radio dense v-model="store.form.sgd.bb" :val="0" label="Tidak" @update:model-value="hitungSkorGizi" />
            </div>
          </q-card-section>
          <q-separator />
          <q-card-section class="row">
            <div class="col-9">
              Apakah Asupan Makan berkurang karena tidak nafsu makan ?
            </div>
            <div class="col-3 flex q-gutter-sm">
              <q-radio dense v-model="store.form.sgd.am" :val="1" label="Iya" @update:model-value="hitungSkorGizi" />
              <q-radio dense v-model="store.form.sgd.am" :val="0" label="Tidak" @update:model-value="hitungSkorGizi" />
            </div>
          </q-card-section>
          <q-separator />
          <q-card-section class="row">
            <div class="col-9">
              Apakah pasien memiliki diagnosa khusus / kondisi khusus ?
            </div>
            <div class="col-3 flex q-gutter-sm">
              <q-radio dense v-model="store.form.sgd.kk" :val="2" label="Iya" @update:model-value="hitungSkorGizi" />
              <q-radio dense v-model="store.form.sgd.kk" :val="0" label="Tidak" @update:model-value="hitungSkorGizi" />
            </div>
          </q-card-section>
          <q-separator />
          <q-card-section>
            <div class="flex items-center q-gutter-sm justify-end text-primary">
              <div><strong>SKOR : {{ store.form.sgdSkor }}</strong> => </div>
              <div><strong>{{ store.form.sgdKet }}</strong></div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <!-- GIZI 4.2 KEBIDANAN -->
      <div v-if="kasus?.gruping==='4.2'" class="skreening-gizi-kebidanan">
        <q-card flat bordered>
          <q-card-section class="q-py-sm q-px-md">
            <div>
              <strong>Skrining Gizi Pasien Obstetric / Kehamilan / Nifas</strong>
            </div>
            <q-separator />
          </q-card-section>
          <q-card-section class="row">
            <div class="col-9">
              Apakah asupan makan berkurang karena tidak nafsu makan ?
            </div>
            <div class="col-3 flex q-gutter-sm">
              <q-radio dense v-model="store.formKebidanan.sgk.am" :val="2" label="Iya" @update:model-value="store.hitungSkorSgk" />
              <q-radio dense v-model="store.formKebidanan.sgk.am" :val="0" label="Tidak" @update:model-value="store.hitungSkorSgk" />
            </div>
          </q-card-section>
          <q-separator />
          <q-card-section class="row">
            <div class="col-9">
              Apakah ada pertambahan BB yang kurang atau lebih selama kehamilan ?
            </div>
            <div class="col-3 flex q-gutter-sm">
              <q-radio dense v-model="store.formKebidanan.sgk.bb" :val="1" label="Iya" @update:model-value="store.hitungSkorSgk" />
              <q-radio dense v-model="store.formKebidanan.sgk.bb" :val="0" label="Tidak" @update:model-value="store.hitungSkorSgk" />
            </div>
          </q-card-section>
          <q-separator />
          <q-card-section class="row">
            <div class="col-9">
              {{ `Nilai Hb < 10 g/dl atau HCT 30%` }}
            </div>
            <div class="col-3 flex q-gutter-sm">
              <q-radio dense v-model="store.formKebidanan.sgk.hb" :val="2" label="Iya" @update:model-value="store.hitungSkorSgk" />
              <q-radio dense v-model="store.formKebidanan.sgk.hb" :val="0" label="Tidak" @update:model-value="store.hitungSkorSgk" />
            </div>
          </q-card-section>
          <q-separator />
          <q-card-section class="row q-col-gutter-md">
            <div class="col-9">
              <div>{{ `Ada gangguan metabolisme / kondisi khusus. (Penyakit tertentu)` }}</div>
              <app-input-simrs v-if="store.formKebidanan.sgk.metabolisme > 0" v-model="store.formKebidanan.sgk.metabolismeKet" label="Sebutkan" class="q-mt-sm" />
            </div>

            <div class="col-3 flex q-gutter-sm">
              <q-radio dense v-model="store.formKebidanan.sgk.metabolisme" :val="2" label="Iya" @update:model-value="store.hitungSkorSgk" />
              <q-radio dense v-model="store.formKebidanan.sgk.metabolisme" :val="0" label="Tidak" @update:model-value="store.hitungSkorSgk" />
            </div>
          </q-card-section>
          <q-separator />
          <q-card-section>
            <div class="flex items-center q-gutter-sm justify-end text-primary">
              <div><strong>SKOR : {{ store.formKebidanan.sgkSkor }}</strong> => </div>
              <div><strong>{{ store.formKebidanan.sgkKet }}</strong></div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <!-- GIZI 4.3 NEONATAL -->
      <div v-if="kasus?.gruping==='4.3'" class="skreening-gizi-neonatal">
        <q-card flat bordered>
          <q-card-section class="q-py-sm q-px-md">
            <div>
              <strong>Skrining Gizi Neonatal</strong>
            </div>
            <q-separator />
          </q-card-section>
          <q-card-section class="row">
            <div class="col-3">
              {{ store.sgn?.nm?.text }}
            </div>
            <div class="col-9 flex q-gutter-sm">
              <q-radio v-for="n in store.sgn?.nm?.pilihan" :key="n" dense v-model="store.formNeoNatal.sgn.nm" :val="n.skor" :label="n.text" @update:model-value="store.hitungSkorSgn" />
            </div>
          </q-card-section>
          <q-separator />
          <q-card-section class="row">
            <div class="col-3">
              {{ store.sgn?.km?.text }}
            </div>
            <div class="col-9 flex q-gutter-sm">
              <q-radio v-for="n in store.sgn?.km?.pilihan" :key="n" dense v-model="store.formNeoNatal.sgn.km" :val="n.skor" :label="n.text" @update:model-value="store.hitungSkorSgn" />
            </div>
          </q-card-section>
          <q-separator />
          <q-card-section class="row">
            <div class="col-3">
              {{ store.sgn?.fs?.text }}
            </div>
            <div class="col-9 flex q-gutter-sm">
              <q-radio v-for="n in store.sgn?.fs?.pilihan" :key="n" dense v-model="store.formNeoNatal.sgn.fs" :val="n.skor" :label="n.text" @update:model-value="store.hitungSkorSgn" />
            </div>
          </q-card-section>
          <q-separator />
          <q-card-section class="row">
            <div class="col-3">
              {{ store.sgn?.bb?.text }}
            </div>
            <div class="col-9 flex q-gutter-sm">
              <q-radio v-for="n in store.sgn?.bb?.pilihan" :key="n" dense v-model="store.formNeoNatal.sgn.bb" :val="n.skor" :label="n.text" @update:model-value="store.hitungSkorSgn" />
            </div>
          </q-card-section>
          <q-separator />
        </q-card>
      </div>

      <!-- {{ store.form.ekspresiWajahKet }} -->
    </div>

    <!-- DIALOG -->
    <DialogFormRiwayat v-model="store.openDialogFormRiwayat" :pasien="pasien" />
  </div>
</template>

<script setup>
import { useAnamnesisRanapStore } from 'src/stores/simrs/ranap/anamnesis'
import { computed, defineAsyncComponent, onMounted, ref } from 'vue'

const TableRiwayatKehamilan = defineAsyncComponent(() => import('./comp/TableRiwayatKehamilan.vue'))
const DialogFormRiwayat = defineAsyncComponent(() => import('./comp/DialogFormRiwayat.vue'))

const store = useAnamnesisRanapStore()

defineProps({
  pasien: {
    type: Object,
    default: null
  },
  kasus: {
    type: Object,
    default: null
  }
})

const refInputKu = ref(null)
defineExpose({
  refInputKu
})

const iconNyeri = computed(() => {
  // const val = store?.form.skorNyeri
  const val = store?.form.keluhannyeri?.skorNyeri
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

onMounted(() => {
  Promise.all([
    store.getRiwayatKehamilan(),
    store.initReset()
  ])
})

const hitungSkorGizi = () => {
  store.hitungSkorSgd()
}

// eslint-disable-next-line no-unused-vars
function filterFn (val, update, abort, arr) {
  const stringOptions = arr
  let k = arr
  if (val.length < 1) {
    // eslint-disable-next-line dot-notation
    store['ketubans'] = k
  }
  update(() => {
    const needle = val.toLocaleLowerCase()
    k = stringOptions.filter(v => v.toLocaleLowerCase().indexOf(needle) > -1)
    // eslint-disable-next-line dot-notation
    store['ketubans'] = k
  })
}
</script>
