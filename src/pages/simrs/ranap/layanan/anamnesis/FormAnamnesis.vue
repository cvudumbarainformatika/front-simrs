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
      :lazy-rules="true"
      hide-bottom-space
      :style="`${ulang ? 'width:100%' : 'width:50%'}`"
    />
    <q-input
      v-if="!ulang"
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
      v-if="!ulang"
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
      v-if="!ulang"
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
      v-if="!ulang"
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
      v-if="!ulang"
      v-model="store.form.rwPkrjDgZatBahaya"
      outlined
      autogrow
      stack-label
      standout="bg-yellow-3"
      label="Riwayat Pekerjaan yg berhubung dg Zat berbahaya"
      hide-bottom-space
      style="width:50%"
    />

    <div v-if="nakes==='2'" class="col-12">
      <!-- RIWAYAT ALERGI -->
      <q-card v-if="!ulang" flat bordered class="q-mb-sm">
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

      <!-- KAJIAN NYERI 4.1 -->
      <q-card v-if="gruping==='4.1'" flat bordered class="q-mb-sm">
        <q-card-section class="q-py-xs q-px-md">
          <div class="q-mt-sm">
            <div class="text-weight-bold">
              Kajian Nyeri
            </div>
            <!-- <q-separator class="q-my-sm" /> -->
            <q-radio
              v-model="store.form.keluhannyeri.kajianNyeri"
              v-for="dd in store.pilihanNyeris" :key="dd" :label="dd?.text" :val="dd.text"
              @update:model-value="(val)=>{
                if (val==='Wong Baker Face Scale') store.form.keluhannyeri.skorNyeri=0
                store.hitungSkorNyeri('form')
              }"
            />
          </div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <div v-if="store.form.keluhannyeri.kajianNyeri==='Wong Baker Face Scale'" class="row items-center q-col-gutter-md">
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
                @update:model-value="(val)=>{
                  console.log('jenis',store.form.keluhannyeri.kajianNyeri);

                  store.hitungSkorNyeri('form')
                }"
                style="width: 100%;"
              />
            </div>
            <div class="col-4">
              <div class="flex flex-center">
                <div class="">
                  <q-icon
                    size="lg"
                    color="teal"
                    :name="iconNyeri"
                  />
                </div>
                <div><em class="text-primary q-ml-sm">{{ store.form.keluhannyeri.ket }}</em></div>
              </div>
            </div>
          </div>
          <div v-else>
            <template v-for="(val, key) in store.form.keluhannyeri?.form" :key="val">
              <div class="row q-col-gutter-md">
                <div class="col-3 text-weight-bold">
                  {{ store.formNyeris?.find(x=> x.kode===key)?.label }}
                </div>
                <div class="col-9">
                  <div class="flex q-gutter-sm items-center">
                    <q-radio
                      dense size="sm" v-model="store.form.keluhannyeri.form[key]" v-for="aa in store.formNyeris?.find(x=> x.kode===key)?.values" :key="aa" :label="aa?.text" :val="aa"
                      @update:model-value="(val)=> {
                        // store.form.ekspresiWajahKet = aa?.text
                        // console.log('aa',val);

                        store.hitungSkorNyeri('form')
                      }"
                    />
                  </div>
                </div>
              </div>
              <q-separator class="q-my-sm" />
            </template>
            <q-card-section class="row items-center justify-between q-py-sm q-px-md text-primary text-bold">
              <div>SKOR NYERI : {{ store.form?.keluhannyeri?.skorNyeri }}</div>
              <div>{{ store.form?.keluhannyeri?.ket }}</div>
            </q-card-section>
          </div>
        </q-card-section>
      </q-card>

      <!-- KAJIAN NYERI 4.2 -->
      <q-card v-if="gruping==='4.2'" flat bordered class="q-mb-sm">
        <q-card-section class="q-py-xs q-px-md">
          <div class="q-mt-sm">
            <div class="text-weight-bold">
              Kajian Nyeri Kebidanan
            </div>
            <q-radio
              v-model="store.formKebidanan.keluhannyeri.kajianNyeri"
              v-for="dd in store.pilihanNyeris" :key="dd" :label="dd?.text" :val="dd.text"
              @update:model-value="(val)=>{
                if (val==='Wong Baker Face Scale') store.formKebidanan.keluhannyeri.skorNyeri=0
                store.hitungSkorNyeri('form')
              }"
            />
          </div>
          <q-separator />
        </q-card-section>
        <q-card-section>
          <div v-if="store.formKebidanan.keluhannyeri.kajianNyeri==='Wong Baker Face Scale'" class="row items-center q-col-gutter-md">
            <div class="col-4">
              <div class="flex flex-center">
                <div class="">
                  <q-icon
                    size="lg"
                    color="teal"
                    :name="iconNyeriKebidanan"
                  />
                </div>
                <div><em class="text-primary q-ml-sm">{{ store.formKebidanan.keluhannyeri.ket }}</em></div>
              </div>
            </div>
            <div class="col-8">
              <q-slider
                v-model="store.formKebidanan.keluhannyeri.skorNyeri"
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
                @update:model-value="(val)=>store.hitungSkorNyeri('kebidanan')"
                style="width: 100%;"
              />
            </div>
          </div>
          <div v-else>
            <q-separator class="q-my-xs" />
            <template v-for="(val, key) in store.formKebidanan.keluhannyeri?.form" :key="val">
              <div class="row q-col-gutter-md">
                <div class="col-3 text-weight-bold">
                  {{ store.formNyeris?.find(x=> x.kode===key)?.label }}
                </div>
                <div class="col-9">
                  <div class="flex q-gutter-sm items-center">
                    <q-radio
                      dense size="sm" v-model="store.formKebidanan.keluhannyeri.form[key]" v-for="aa in store.formNyeris?.find(x=> x.kode===key)?.values" :key="aa" :label="aa?.text" :val="aa"
                      @update:model-value="(val)=> {
                        // store.form.ekspresiWajahKet = aa?.text
                        // console.log('aa',val);

                        store.hitungSkorNyeri('kebidanan')
                      }"
                    />
                  </div>
                </div>
              </div>
              <q-separator class="q-my-sm" />
            </template>
            <q-card-section class="row items-center justify-between q-py-sm q-px-md text-primary text-bold">
              <div>SKOR NYERI : {{ store.formKebidanan?.keluhannyeri?.skorNyeri }}</div>
              <div>{{ store.formKebidanan?.keluhannyeri?.ket }}</div>
            </q-card-section>
          </div>
        </q-card-section>
      </q-card>

      <!-- KAJIAN NYERI 4.3 NEONATAL -->
      <q-card v-if="gruping==='4.3'" flat bordered class="q-mb-sm">
        <q-card-section>
          <div class="text-weight-bold">
            Kajian Nyeri NIPS (Neonatus Infant Pain Scale)
          </div>
        </q-card-section>
        <q-separator />
        <q-card-section class="q-pa-none">
          <q-list bordered separator>
            <q-item v-for="(val, key) in store.formNeoNatal.keluhannyeri?.form" :key="val">
              <q-item-section style="max-width: 25%;">
                <q-item-label>
                  {{ store.formNyeriNeonatals?.find(x=> x.kode===key)?.label }}
                </q-item-label>
              </q-item-section>
              <q-item-section>
                <div class="flex q-gutter-sm items-center">
                  <q-radio
                    dense size="sm" v-model="store.formNeoNatal.keluhannyeri.form[key]" v-for="aa in store.formNyeriNeonatals?.find(x=> x.kode===key)?.values" :key="aa" :label="aa?.text" :val="aa"
                    @update:model-value="(val)=> {
                      store.hitungSkorNyeri('formNeoNatal')
                    }"
                  />
                </div>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
        <q-separator />
        <q-card-section class="row items-center justify-between  text-primary text-bold">
          <div>SKOR NYERI : {{ store.formNeoNatal?.keluhannyeri?.skorNyeri }}</div>
          <div>{{ store.formNeoNatal?.keluhannyeri?.ket }}</div>
        </q-card-section>
      </q-card>

      <!-- KAJIAN NYERI 4.4 Pediatrik -->
      <q-card v-if="gruping==='4.4'" flat bordered class="q-mb-sm">
        <q-card-section class="q-py-xs q-px-md">
          <div class="q-mt-sm">
            <div class="text-weight-bold">
              Kajian Nyeri
            </div>
            <q-radio
              v-model="store.formPediatrik.keluhannyeri.kajianNyeri"
              v-for="dd in store.pilihanNyeris" :key="dd" :label="dd?.text" :val="dd.text"
              @update:model-value="(val)=>{
                if (val==='Wong Baker Face Scale') store.formPediatrik.keluhannyeri.skorNyeri=0
                store.hitungSkorNyeri('form')
              }"
            />
          </div>
          <q-separator />
        </q-card-section>
        <q-card-section>
          <div v-if="store.formPediatrik.keluhannyeri.kajianNyeri==='Wong Baker Face Scale'" class="row items-center q-col-gutter-md">
            <div class="col-8">
              <q-slider
                v-model="store.formPediatrik.keluhannyeri.skorNyeri"
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
                @update:model-value="(val)=>store.setKeteranganSkornyeri(val, 'pediatrik')"
                style="width: 100%;"
              />
            </div>
            <div class="col-4">
              <div class="flex flex-center">
                <div class="">
                  <q-icon
                    size="lg"
                    color="teal"
                    :name="iconNyeri"
                  />
                </div>
                <div><em class="text-primary q-ml-sm">{{ store.formPediatrik.keluhannyeri.ket }}</em></div>
              </div>
            </div>
          </div>
          <div v-else>
            <q-separator class="q-my-xs" />
            <template v-for="(val, key) in store.formPediatrik.keluhannyeri?.form" :key="val">
              <div class="row q-col-gutter-md">
                <div class="col-3 text-weight-bold">
                  {{ store.formNyeris?.find(x=> x.kode===key)?.label }}
                </div>
                <div class="col-9">
                  <div class="flex q-gutter-sm items-center">
                    <q-radio
                      dense size="sm" v-model="store.formPediatrik.keluhannyeri.form[key]" v-for="aa in store.formNyeris?.find(x=> x.kode===key)?.values" :key="aa" :label="aa?.text" :val="aa"
                      @update:model-value="(val)=> {
                        // store.form.ekspresiWajahKet = aa?.text
                        // console.log('aa',val);

                        store.hitungSkorNyeri('pediatrik')
                      }"
                    />
                  </div>
                </div>
              </div>
              <q-separator class="q-my-sm" />
            </template>
            <q-card-section class="row items-center justify-between q-py-sm q-px-md text-primary text-bold">
              <div>SKOR NYERI : {{ store.formPediatrik?.keluhannyeri?.skorNyeri }}</div>
              <div>{{ store.formPediatrik?.keluhannyeri?.ket }}</div>
            </q-card-section>
          </div>
        </q-card-section>
      </q-card>

      <!-- GIZI 4.1 DEWASA -->
      <div v-if="gruping==='4.1' && !ulang" class="skreening-gizi-dewasa q-mb-sm">
        <q-card flat bordered>
          <q-card-section class="q-py-sm q-px-md">
            <div>
              <strong>Skreening Gizi (Dewasa)</strong>
            </div>
            <q-separator />
          </q-card-section>

          <template v-for="(val, key) in store.form.skreeninggizi?.form" :key="val">
            <q-card-section class="row">
              <div class="col-9">
                {{ store.formGizis?.find(x=> x.kode===key)?.label }}
              </div>
              <div class="col-3 flex q-gutter-sm justify-end">
                <q-radio v-for="aa in store.formGizis?.find(x=>x.kode===key)?.values" dense v-model="store.form.skreeninggizi.form[key]" :val="aa" :label="aa?.text" @update:model-value="hitungSkorGizi" />
              </div>
            </q-card-section>
            <q-separator />
          </template>

          <q-card-section class="row items-center justify-between q-py-md q-px-md text-primary text-bold">
            <div>SKOR GIZI : {{ store.form.skreeninggizi.skor }}</div>
            <div>{{ store.form.skreeninggizi.ket }}</div>
          </q-card-section>
        </q-card>
      </div>
      <!-- GIZI 4.2 KEBIDANAN -->
      <div v-if="gruping==='4.2' && !ulang" class="skreening-gizi-kebidanan q-mb-sm">
        <q-card flat bordered>
          <q-card-section class="q-py-sm q-px-md">
            <div>
              <strong>Skrining Gizi Pasien Obstetric / Kehamilan / Nifas</strong>
            </div>
            <q-separator />
          </q-card-section>

          <template v-for="(val, key) in store.formKebidanan.skreeninggizi?.form" :key="val">
            <q-card-section class="row">
              <div class="col-9">
                {{ store.formGiziObgyns?.find(x=> x.kode===key)?.label }}
              </div>
              <div class="col-3 flex q-gutter-sm justify-end">
                <q-radio v-for="aa in store.formGiziObgyns?.find(x=>x.kode===key)?.values" dense v-model="store.formKebidanan.skreeninggizi.form[key]" :val="aa" :label="aa?.text" @update:model-value="store.hitungSkorSgk" />
              </div>
            </q-card-section>
            <q-separator />
          </template>

          <q-card-section class="row items-center justify-between q-py-md q-px-md text-primary text-bold">
            <div>SKOR GIZI : {{ store.formKebidanan?.skreeninggizi?.skor }}</div>
            <div>{{ store.formKebidanan?.skreeninggizi?.ket }}</div>
          </q-card-section>
        </q-card>
      </div>
      <!-- GIZI 4.3 NEONATAL -->
      <div v-if="gruping==='4.3' && !ulang" class="skreening-gizi-neonatal q-mb-sm">
        <q-card flat bordered>
          <q-card-section class="q-py-sm q-px-md">
            <div>
              <strong>Skrining Gizi Neonatal</strong>
            </div>
            <q-separator />
          </q-card-section>

          <template v-for="(val, key) in store.formNeoNatal.skreeninggizi?.form" :key="val">
            <q-card-section class="row">
              <div class="col-3">
                {{ store.formGiziNeonatals?.find(x=> x.kode===key)?.label }}
              </div>
              <div class="col-9 flex q-gutter-sm">
                <q-radio v-for="aa in store.formGiziNeonatals?.find(x=>x.kode===key)?.values" dense v-model="store.formNeoNatal.skreeninggizi.form[key]" :val="aa" :label="aa?.text" @update:model-value="store.hitungSkorSgn" />
              </div>
            </q-card-section>
            <q-separator />
          </template>

          <q-card-section class="row items-center justify-between q-py-md q-px-md text-primary text-bold">
            <div>SKOR GIZI : {{ store.formNeoNatal?.skreeninggizi?.skor }}</div>
            <div>{{ store.formNeoNatal?.skreeninggizi?.ket }}</div>
          </q-card-section>
        </q-card>
      </div>

      <!-- GIZI 4.4 PEDIATRIK -->
      <div v-if="gruping==='4.4' && !ulang" class="skreening-gizi-pediatrik q-mb-sm">
        <q-card flat bordered>
          <q-card-section class="">
            <div>
              <strong>Skrining Gizi Pediatrik</strong>
            </div>
          </q-card-section>

          <q-separator />
          <q-card-section class="q-pa-none">
            <q-list separator>
              <q-item v-for="(val, aa) in store.formPediatrik?.skreeninggizi?.form" :key="aa">
                <q-item-section class="q-gutter-sm">
                  <div v-for="(ll, i) in store.formGiziPediatrik?.find(x => x?.kode === aa)?.label" :key="i" :class="i===0? '':'text-italic'">
                    <div :class="i>0 ? 'q-ml-sm':''">
                      <span v-if="i>0">-</span> {{ ll }}
                    </div>
                  </div>
                </q-item-section>
                <q-item-section style="max-width:22%" top>
                  <div class="flex q-gutter-sm">
                    <q-radio dense v-for="n in store.formGiziPediatrik?.find(x=>x?.kode === aa)?.values" :key="n" size="sm" v-model="store.formPediatrik.skreeninggizi.form[aa]" :label="n?.text" :val="n" @update:model-value="store.hitungSkorSgp" />
                  </div>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
          <q-separator />
          <q-card-section class="row items-center justify-between q-py-md q-px-md text-primary text-bold">
            <div>SKOR GIZI : {{ store.formPediatrik?.skreeninggizi?.skor }}</div>
            <div>{{ store.formPediatrik?.skreeninggizi?.ket }}</div>
          </q-card-section>
        </q-card>
      </div>

      <!-- FORM 4.2 -->
      <q-card v-if="gruping==='4.2' && !ulang" flat bordered class="q-mb-sm">
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
              <app-input-simrs v-if="store.formKebidanan.rwGynecology.includes('Lain-lain')" v-model="store.formKebidanan.rwGynecologyLain" label="Jelaskan" class="full-width" />
            </div>
            <q-separator class="q-my-sm" />
            <div class="text-bold q-mt-sm">
              Riwayat KB
            </div>
            <q-separator class="q-my-xs" />
            <div class="row q-col-gutter-xs">
              <app-input-simrs v-model="store.formKebidanan.rwKbJns" label="Jenis" class="col-4" />
              <app-input-simrs v-model="store.formKebidanan.rwKbLama" label="Lama" class="col-2" />
              <app-input-simrs v-model="store.formKebidanan.rwKbKeluhan" label="Keluhan" class="col-6" />
            </div>
            <q-separator class="q-my-sm" />
            <div class="text-bold q-mt-sm">
              Riwayat Menstruasi
            </div>
            <q-separator class="q-my-xs" />
            <div class="row q-col-gutter-xs">
              <app-input-simrs v-model="store.formKebidanan.menarche" label="Menarche (th)" class="col-2" />
              <app-input-simrs v-model="store.formKebidanan.siklusHari" label="Siklus (hr)" class="col-2" />
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
                class="col-3"
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
                class="col-5"
              />
              <app-input-simrs v-model="store.formKebidanan.hpht" label="HPHT (hr)" class="col-2" :valid="{number: true}" />
              <app-input-date
                v-model="store.formKebidanan.tglPerkPersalinan"
                label="Tgl Prk. Persalinan"
                outlined
                dense
                @set-model="(val)=>{store.formKebidanan.tglPerkPersalinan=val}"
                valid
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
              <div class="col-12">
                <q-separator class="q-my-sm" />
                <div class="flex q-gutter-sm">
                  <div>Keluhan BAK :</div>
                  <q-checkbox dense size="sm" v-for="n in store.keluhanBaks" :key="n" v-model="store.formKebidanan.keluhanBak" :val="n" :label="n" />
                </div>
                <q-separator class="q-my-sm" />

                <div class="q-gutter-sm flex">
                  <div>Keluhan :</div>
                  <q-checkbox dense size="sm" v-for="n in store.keluhans" :key="n" v-model="store.formKebidanan.keluhans" :val="n" :label="n" />
                </div>
                <q-separator class="q-my-xs" />
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
                label="Terpsg Kateter"
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
      <q-card v-if="gruping==='4.3' && !ulang" flat bordered class="q-mb-sm">
        <q-card-section>
          <div class="text-weight-bold">
            Form 4.3 (Neonatal)
          </div>
          <q-separator class="q-my-sm" />
          <div class="text-weight-bold">
            Informasi Bayi
          </div>
          <q-separator class="q-my-xs" />
          <div class="row q-col-gutter-xs">
            <q-select
              v-model="store.formNeoNatal.crMasuk"
              dense
              standout="bg-yellow-3 text-black"
              outlined
              label="Cara Masuk"
              :options="store.caraMasuks"
              emit-value
              map-options
              input-class="ellipsis"
              fill-input
              hide-bottom-space
              class="col-4"
            />
            <q-select
              v-model="store.formNeoNatal.asalMasuk"
              dense
              standout="bg-yellow-3 text-black"
              outlined
              label="Asal Masuk"
              :options="store.asalMasuks"
              emit-value
              map-options
              input-class="ellipsis"
              fill-input
              hide-bottom-space
              class="col-8"
            />
            <app-input-simrs v-model="store.formNeoNatal.penanggungJawab" label="Nama Penanggung Jawab" class="col-6" />
            <app-input-simrs v-model="store.formNeoNatal.noHpPj" label="No Telp /HP penanggung jawab" class="col-5" />
            <app-input-simrs v-model="store.formNeoNatal.alamatPj" label="Alamat penanggung jawab" class="col-8" />
            <q-select
              v-model="store.formNeoNatal.hubPj"
              dense
              standout="bg-yellow-3 text-black"
              outlined
              label="Hub. penanggung jawab"
              :options="store.hubPj"
              hide-selected
              fill-input
              use-input
              input-debounce="0"
              hide-bottom-space
              hide-dropdown-icon
              @input-value="(val)=> store.formNeoNatal.hubPj=val"
              class="col-4"
            />
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
          <q-list bordered separator>
            <q-item>
              <q-item-section>
                <div class="row q-gutter-md items-center">
                  <div style="width: 50px;">
                    Ayah
                  </div>
                  <q-radio dense size="sm" v-model="store.formNeoNatal.golDarahAyah" v-for="aa in store.golDarahs" :key="aa" :label="aa" :val="aa" />
                  <div>RH</div>
                  <q-radio dense size="sm" v-model="store.formNeoNatal.rhDarahAyah" v-for="aa in store.rhesus" :key="aa" :label="aa" :val="aa" />
                </div>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <div class="row q-gutter-md items-center">
                  <div style="width: 50px;">
                    Ibu
                  </div>
                  <q-radio dense size="sm" v-model="store.formNeoNatal.golDarahIbu" v-for="aa in store.golDarahs" :key="aa" :label="aa" :val="aa" />
                  <div>RH</div>
                  <q-radio dense size="sm" v-model="store.formNeoNatal.rhDarahIbu" v-for="aa in store.rhesus" :key="aa" :label="aa" :val="aa" />
                </div>
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section>
                <div class="row q-gutter-md items-center">
                  <div style="width: 50px;">
                    Bayi
                  </div>
                  <q-radio dense size="sm" v-model="store.formNeoNatal.golDarahBayi" v-for="aa in store.golDarahs" :key="aa" :label="aa" :val="aa" />
                  <div>RH</div>
                  <q-radio dense size="sm" v-model="store.formNeoNatal.rhDarahBayi" v-for="aa in store.rhesus" :key="aa" :label="aa" :val="aa" />
                </div>
              </q-item-section>
            </q-item>
          </q-list>
          <!-- <div class="row q-col-gutter-xs">
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
          </div> -->
        </q-card-section>
      </q-card>

      <!-- FORM 4.4 -->
      <q-card v-if="gruping==='4.4' && !ulang" flat bordered class="q-mb-sm">
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
          <div class="row q-col-gutter-x-md">
            <div class="col-4">
              <div class="row items-center">
                <div class="col-auto q-mr-md">
                  Gigi Pertama, Usia
                </div>
                <app-input-simrs v-model="store.formPediatrik.gigiPertama" label="" class="col-3" />
              </div>
            </div>
            <div class="col-4">
              <div class="row items-center">
                <div class="col-auto q-mr-md">
                  Mulai Berjalan, Usia
                </div>
                <app-input-simrs v-model="store.formPediatrik.berjalan" label="" class="col-3" />
              </div>
            </div>
            <div class="col-4">
              <div class="row items-center">
                <div class="col-auto q-mr-md">
                  Bisa membaca, usia
                </div>
                <app-input-simrs v-model="store.formPediatrik.membaca" label="" class="col-3" />
              </div>
            </div>
            <div class="col-4">
              <div class="row items-center">
                <div class="col-auto q-mr-md">
                  Bisa duduk, usia
                </div>
                <app-input-simrs v-model="store.formPediatrik.duduk" label="" class="col-3" />
              </div>
            </div>
            <div class="col-4">
              <div class="row items-center">
                <div class="col-auto q-mr-md">
                  Bisa Bicara, usia
                </div>
                <app-input-simrs v-model="store.formPediatrik.bicara" label="" class="col-3" />
              </div>
            </div>
            <!-- <app-input-simrs v-model="store.formPediatrik.gigiPertama" label="Gigi Pertama, Usia" class="col-3" />
            <app-input-simrs v-model="store.formPediatrik.berjalan" label="Berjalan, Usia" class="col-3" />
            <app-input-simrs v-model="store.formPediatrik.duduk" label="Duduk, Usia" class="col-3" />
            <app-input-simrs v-model="store.formPediatrik.bicara" label="Bicara, Usia" class="col-3" /> -->
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

      <!-- {{ gruping }} -->
    </div>

    <!-- DIALOG -->
    <DialogFormRiwayat v-model="store.openDialogFormRiwayat" :pasien="pasien" />
  </div>
</template>

<script setup>
import { useAplikasiStore } from 'src/stores/app/aplikasi'
import { useAnamnesisRanapStore } from 'src/stores/simrs/ranap/anamnesis'
import { computed, defineAsyncComponent, onMounted, ref } from 'vue'

const TableRiwayatKehamilan = defineAsyncComponent(() => import('./comp/TableRiwayatKehamilan.vue'))
const DialogFormRiwayat = defineAsyncComponent(() => import('./comp/DialogFormRiwayat.vue'))

const store = useAnamnesisRanapStore()

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  },
  kasus: {
    type: Object,
    default: null
  },
  ulang: {
    type: Boolean,
    default: false
  }
})

const auth = useAplikasiStore()

// eslint-disable-next-line no-unused-vars
const gruping = computed(() => {
  const nakes = auth?.user?.pegawai?.kdgroupnakes
  const dokter = nakes === '1'
  const perawat = nakes === '2'

  let gruping = null
  if (dokter) gruping = props?.kasus?.medis
  else if (perawat) gruping = props?.kasus?.gruping

  // console.log('gruping', gruping, nakes, props.kasus)

  return gruping
})

const nakes = computed(() => {
  return auth?.user?.pegawai?.kdgroupnakes
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
  else if (val >= 10) {
    icon = 'icon-my-emoticon-cry-outline'
  }

  return icon
})
const iconNyeriKebidanan = computed(() => {
  // const val = store?.form.skorNyeri
  const val = store?.formKebidanan.keluhannyeri?.skorNyeri
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
  else if (val >= 10) {
    icon = 'icon-my-emoticon-cry-outline'
  }

  return icon
})

onMounted(() => {
  Promise.all([
    // store.getRiwayatKehamilan()
    // store.initReset(null)
  ])
})

// eslint-disable-next-line no-unused-vars
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
