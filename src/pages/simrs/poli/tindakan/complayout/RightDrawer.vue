<template>
  <div class="column full-height">
    <div class="col-auto">
      <q-bar>
        <q-btn
          flat
          rounded
          padding="xs"
          size="xs"
          icon="icon-mat-close"
          @click="emits('close')"
        />
        <q-space />
        <div>History Pasien</div>
      </q-bar>
    </div>
    <div class="col full-height">
      <div class="col-auto bg-red">
        <q-tabs
          v-model="store.tab"
          no-caps
          inline-label
          class="bg-primary text-white shadow-2"
          align="left"
          dense
          active-color="yellow"
          active-bg-color="dark"
        >
          <q-tab
            v-for="(item, i) in store.tabs"
            :key="i"
            :name="item"
            :label="item"
          />
        </q-tabs>
      </div>
      <div
        v-if="store.loading"
        class="col full-height"
        style="overflow: hidden;"
      >
        <app-loading />
      </div>
      <div
        v-if="!store.loading"
        class="col full-height"
        style="overflow: hidden;"
      >
        <q-tab-panels
          v-model="store.tab"
          animated
          class="full-height"
        >
          <q-tab-panel
            name="Rawat Jalan"
            class="full-height q-pa-none"
          >
            <q-scroll-area style="height:calc(100% - 50px)">
              <q-list
                v-if="store?.items?.length"
                bordered
                separator
              >
                <div v-if="filteredItems?.length">
                  <q-expansion-item
                    v-for="(item, i) in filteredItems"
                    :key="i"
                    expand-separator
                    :label="item?.ruangan + ' | ' + item?.rs1 + ' | DPJP : ' + item?.dpjp"
                    :caption="tanggal(item?.tanggal)"
                    @click="store.getEresep(item?.norm)"
                  >
                    <q-card dark>
                      <q-separator />
                      <q-card-section class="q-pa-none">
                        <div v-if="item?.anamnesis.length">
                          <q-bar class="bg-accent">
                            <div>ANAMNESIS</div>
                          </q-bar>
                          <q-list dark>
                            <q-item
                              v-for="(anamnesis, a) in item?.anamnesis"
                              :key="a"
                            >
                              <q-item-section>
                                <q-item-label>Keluhan Utama</q-item-label>
                                <q-item-label
                                  caption
                                  lines="2"
                                >
                                  {{ anamnesis?.rs4 }}
                                </q-item-label>
                                <q-item-label>Riwayat Penyakit (Sekarang)</q-item-label>
                                <q-item-label
                                  caption
                                  lines="2"
                                >
                                  {{ anamnesis?.riwayatpenyakitsekarang }}
                                </q-item-label>
                                <q-item-label>Riwayat Penyakit</q-item-label>
                                <q-item-label
                                  caption
                                  lines="2"
                                >
                                  {{ anamnesis?.riwayatpenyakit }}
                                </q-item-label>
                                <q-item-label>Riwayat Alergi</q-item-label>
                                <q-item-label
                                  caption
                                  lines="2"
                                >
                                  {{ anamnesis?.riwayatalergi }}
                                </q-item-label>
                                <q-item-label>Reaksi berupa</q-item-label>
                                <q-item-label
                                  caption
                                  lines="2"
                                >
                                  {{ anamnesis?.keteranganalergi }}
                                </q-item-label>
                                <q-item-label>Riwayat Pengobatan</q-item-label>
                                <q-item-label
                                  caption
                                  lines="2"
                                >
                                  {{ anamnesis?.riwayatpengobatan }}
                                </q-item-label>
                                <q-item-label>Penurunan Berat Badan</q-item-label>
                                <q-item-label
                                  caption
                                  lines="2"
                                >
                                  {{ anamnesis?.skreeninggizi == 0 ? "Tidak" : "Ya" }}
                                </q-item-label>
                                <q-item-label>Asupan Makan Berkurang</q-item-label>
                                <q-item-label
                                  caption
                                  lines="2"
                                >
                                  {{ anamnesis?.asupanmakan == 0 ? "Tidak" : "Ya" }}
                                </q-item-label>
                                <q-item-label>Kondisi Khusus</q-item-label>
                                <q-item-label
                                  caption
                                  lines="2"
                                >
                                  {{ anamnesis?.kondisikhusus }}
                                </q-item-label>
                                <q-item-label>Score Nyeri</q-item-label>
                                <q-item-label
                                  caption
                                  lines="2"
                                >
                                  {{ anamnesis?.scorenyeri }} ( {{ anamnesis?.keteranganscorenyeri }} )
                                </q-item-label>
                              </q-item-section>
                            </q-item>
                          </q-list>
                        </div>
                        <div v-else>
                          <q-bar class="bg-accent">
                            <div>ANAMNESA tidak ada</div>
                          </q-bar>
                        </div>
                      </q-card-section>
                      <q-card-section
                        v-if="item?.pemeriksaanfisik?.length"
                        flat
                        bordered
                        square
                        dark
                      />
                      <q-list separator>
                        <q-bar class="bg-accent">
                          <div>PEMERIKSAAN FISIK</div>
                        </q-bar>
                        <!-- <transition-group name="list"> -->
                        <div
                          v-for="(pemeriksaanfisik, f) in item?.pemeriksaanfisik"
                          :key="f"
                        >
                          <!-- NADI-->
                          <q-item
                            v-ripple
                            class="q-pa-xs list-move"
                            dark
                            clickable
                          >
                            <q-item-section avatar>
                              <q-icon
                                :color="nadi(pemeriksaanfisik?.rs4).color"
                                name="icon-my-monitor_heart"
                                size="lg"
                              />
                            </q-item-section>
                            <q-item-section class="q-pa-xs">
                              <q-item-label :class="`text-h4 text-${nadi(pemeriksaanfisik?.rs4).color}`">
                                {{ pemeriksaanfisik?.rs4 }}
                              </q-item-label>
                            </q-item-section>
                            <q-item-section side>
                              <q-item-label class="text-right f-10">
                                N (HR)
                              </q-item-label>
                              <q-item-label class="text-right f-10">
                                {{ nadi(pemeriksaanfisik?.rs4).res }}
                              </q-item-label>
                            </q-item-section>
                          </q-item>
                          <q-separator
                            dark
                            inset
                          />
                          <q-item
                            v-ripple
                            class="q-pa-xs list-move"
                            dark
                            clickable
                          >
                            <q-item-section avatar>
                              <q-icon
                                color="white"
                                name="icon-my-local_hospital"
                                size="lg"
                              />
                            </q-item-section>
                            <q-item-section class="q-pa-xs">
                              <q-item-label :class="`text-h4 text-white`">
                                {{ pemeriksaanfisik?.pernapasan }}
                              </q-item-label>
                            </q-item-section>
                            <q-item-section side>
                              <q-item-label class="text-right f-10">
                                RR
                              </q-item-label>
                              <q-item-label class="text-right f-10">
                                -
                              </q-item-label>
                            </q-item-section>
                          </q-item>
                          <q-separator
                            dark
                            inset
                          />
                          <q-item
                            v-ripple
                            class="q-pa-xs list-move"
                            dark
                            clickable
                          >
                            <q-item-section avatar>
                              <q-icon
                                :color="suhu(pemeriksaanfisik?.suhutubuh).color"
                                name="icon-my-standing-human-body-silhouette-svgrepo-com"
                                size="lg"
                              />
                            </q-item-section>
                            <q-item-section class="q-pa-xs">
                              <q-item-label :class="`text-h4 text-${suhu(item?.suhutubuh).color}`">
                                {{ pemeriksaanfisik?.suhutubuh }}
                              </q-item-label>
                            </q-item-section>
                            <q-item-section side>
                              <q-item-label class="text-right f-10">
                                SUHU TUBUH
                              </q-item-label>
                              <q-item-label class="text-right f-10">
                                {{ suhu(pemeriksaanfisik?.suhutubuh).res }}
                              </q-item-label>
                            </q-item-section>
                          </q-item>
                          <q-separator
                            dark
                            inset
                          />
                          <q-item
                            v-ripple
                            class="q-pa-xs list-move"
                            dark
                            clickable
                          >
                            <q-item-section class="q-pa-xs">
                              <q-item-label :class="`text-h5 `">
                                <span :class="`${tekananDarah(pemeriksaanfisik?.sistole).color}`">{{
                                  pemeriksaanfisik?.sistole }}</span> /
                                <span :class="`${tekananDarahDias(pemeriksaanfisik?.diatole).color}`">{{
                                  pemeriksaanfisik?.diastole }}</span>
                              </q-item-label>
                              <q-item-label class="f-10">
                                <span :class="`${tekananDarah(pemeriksaanfisik?.sistole).color}`">{{
                                  tekananDarah(pemeriksaanfisik?.sistole).res }}</span> /
                                <span :class="`${tekananDarahDias(pemeriksaanfisik?.diastole).color}`">{{
                                  tekananDarahDias(pemeriksaanfisik?.diastole).res }}</span>
                              </q-item-label>
                            </q-item-section>
                            <q-item-section side>
                              <q-item-label class="text-right f-10">
                                TD sys / dias
                              </q-item-label>
                            </q-item-section>
                          </q-item>
                          <!-- STATUS -->
                          <q-separator
                            dark
                            inset
                          />
                          <q-item
                            v-ripple
                            class="q-pa-xs list-move"
                            dark
                            clickable
                          >
                            <q-item-section class="q-pa-xs">
                              <q-item-label lines="2">
                                T Kesadaran : <em>{{ getKesadaran(pemeriksaanfisik?.tingkatkesadaran) ?? '-' }}</em>
                              </q-item-label>
                              <q-item-label lines="2">
                                Status Psikologis : <em>{{ pemeriksaanfisik?.statuspsikologis ?? '-' }}</em>
                              </q-item-label>
                              <q-item-label lines="2">
                                Ekonomi : <em>{{ pemeriksaanfisik?.sosialekonomi ?? '-' }}</em>
                              </q-item-label>
                              <q-item-label lines="2">
                                Spiritual : <em>{{ pemeriksaanfisik?.spiritual ?? '-' }}</em>
                              </q-item-label>
                              <q-item-label lines="2">
                                kesadaran : <em>{{ pemeriksaanfisik?.kesadaran ?? '-' }}</em>
                              </q-item-label>
                            </q-item-section>
                          </q-item>

                          <!-- KHUSUS PARU POL018-->
                          <q-separator
                            dark
                            inset
                          />
                          <q-item
                            v-ripple
                            class="q-pa-xs list-move"
                            dark
                            clickable
                          >
                            <q-item-section class="q-pa-xs">
                              <q-item-label lines="2">
                                Inspeksi : <em>{{ pemeriksaanfisik?.inspeksi ?? '-' }}</em>
                              </q-item-label>
                              <q-item-label lines="2">
                                Palpasi : <em>{{ pemeriksaanfisik?.palpasi ?? '-' }}</em>
                              </q-item-label>
                              <q-item-label lines="2">
                                Perkusi Dada Kanan : <em>{{ pemeriksaanfisik?.perkusidadakanan ?? '-' }}</em>
                              </q-item-label>
                              <q-item-label lines="2">
                                Perkusi Dada Kiri : <em>{{ pemeriksaanfisik?.perkusidadakiri ?? '-' }}</em>
                              </q-item-label>
                              <q-item-label lines="2">
                                Suara Nafas Dasar : <em>{{ pemeriksaanfisik?.auskultasisuaradasar ?? '-' }}</em>
                              </q-item-label>
                              <q-item-label lines="2">
                                Suara Nafas Tambahan (Kanan) : <em>{{
                                  pemeriksaanfisik?.auskultasisuaratambahankanan ?? '-' }}</em>
                              </q-item-label>
                              <q-item-label lines="2">
                                Suara Nafas Tambahan (Kiri) : <em>{{ pemeriksaanfisik?.auskultasisuaratambahankiri ??
                                  '-'
                                }}</em>
                              </q-item-label>
                            </q-item-section>
                          </q-item>
                        </div>
                        <!-- </transition-group> -->
                        <q-card-section
                          v-if="item?.diagnosa?.length"
                          class="q-pa-none"
                          flat
                          bordered
                          square
                          dark
                        >
                          <q-bar class="bg-accent">
                            <div>DIAGNOSA</div>
                          </q-bar>
                          <q-list
                            dark
                            separator
                          >
                            <q-item
                              v-for="(diagnosa, d) in item?.diagnosa"
                              :key="d"
                              v-ripple
                              clickable
                            >
                              <q-item-section>
                                <q-item-label>Kasus = {{ diagnosa?.rs7 }}</q-item-label>
                                <q-item-label
                                  caption
                                  lines="2"
                                />
                                Jenis Diagnosa = {{ diagnosa?.rs4 }}
                                <q-item-label>
                                  Diagnosa = {{ diagnosa?.masterdiagnosa?.rs4 }} ( {{ diagnosa?.rs3 }}
                                  )
                                </q-item-label>
                                <q-item-label
                                  caption
                                  lines="2"
                                />
                                Keterangan = {{ diagnosa?.rs6 }}
                              </q-item-section>
                            </q-item>
                          </q-list>
                        </q-card-section>

                        <q-separator />
                        <!-- <q-card-section
                          v-if="item?.neonatusmedis?.length || item?.neonatuskeperawatan?.length"
                          class="q-pa-none"
                          flat
                          bordered
                          square
                          dark
                        >
                          <q-bar class="bg-accent">
                            <div>BAYI & ANAK</div>
                          </q-bar>
                          <q-list
                            dark
                            separator
                          >
                            <q-item
                              v-for="(neonatusmedis, nm) in item?.neonatusmedis"
                              :key="nm"
                              v-ripple
                              clickable
                            >
                              <q-item-section>
                                <q-item-label>
                                  Neonatus Medis
                                </q-item-label>
                                <q-item-label
                                  caption
                                  lines="2"
                                />
                                <table>
                                  <tr>
                                    <td width="35%">
                                      Usia Kehamilan Ibu
                                    </td>
                                    <td>{{ neonatusmedis?.usiaKehamilanIbu }}</td>
                                  </tr>
                                  <tr>
                                    <td width="35%">
                                      Ante Natal Care
                                    </td>
                                    <td>
                                      <div> {{ neonatusmedis?.anc }}</div>
                                      <div v-if="neonatusmedis?.anc==='Lain-lain'">
                                        <q-separator />
                                        <div>{{ neonatusmedis?.ancLain }}</div>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td width="35%">
                                      Rujukan
                                    </td>
                                    <td>
                                      <div> {{ neonatusmedis?.rujukan }}</div>
                                      <div v-if="neonatusmedis?.rujukan==='Lain-lain'">
                                        <q-separator />
                                        <div>{{ neonatusmedis?.rujukanLain }}</div>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td width="35%">
                                      Rwyt Peny. Ibu
                                    </td>
                                    <td>
                                      <div> {{ neonatusmedis?.riwayatPenyakitIbu }}</div>
                                      <div v-if="neonatusmedis?.riwayatPenyakitIbu==='Ada'">
                                        <q-separator />
                                        <div>{{ neonatusmedis?.riwayatPenyakitIbuAda }}</div>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td width="35%">
                                      Rwyt Khml (Skr)
                                    </td>
                                    <td>
                                      <div> <b>G</b> : {{ neonatusmedis?.riwayatKehamilanSekarangG }}</div>
                                      <q-separator />
                                      <div> <b>P</b> : {{ neonatusmedis?.riwayatKehamilanSekarangP }}</div>
                                      <q-separator />
                                      <div> <b>Ab</b> : {{ neonatusmedis?.riwayatKehamilanSekarangAb }}</div>
                                      <q-separator />
                                      <div> {{ neonatusmedis?.riwayatKehamilan }}</div>
                                      <q-separator />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td width="35%">
                                      Induksi Persalinan
                                    </td>
                                    <td>
                                      <div> {{ neonatusmedis?.induksiPersalinan }}</div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td width="35%">
                                      Anestesi
                                    </td>
                                    <td>
                                      <div> {{ neonatusmedis?.anestesi }}</div>
                                    </td>
                                  </tr>

                                  <tr>
                                    <td width="35%">
                                      Cara Kelahiran
                                    </td>
                                    <td>
                                      <div> {{ neonatusmedis?.caraKelahiran }}</div>
                                      <div v-if="neonatusmedis?.caraKelahiran==='Lain-lain'">
                                        <q-separator />
                                        <div>{{ neonatusmedis?.caraKelahiranLain }}</div>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td width="35%">
                                      Indikasi Partus tindakan
                                    </td>
                                    <td>
                                      <div> {{ neonatusmedis?.indikasiPartus }}</div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td width="35%">
                                      tempat Persalinan
                                    </td>
                                    <td>
                                      <div> {{ neonatusmedis?.tempatPersalinan }}</div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td width="35%">
                                      penolong Persalinan
                                    </td>
                                    <td>
                                      <div> {{ neonatusmedis?.penolongPersalinan }}</div>
                                      <div v-if="neonatusmedis?.penolongPersalinan==='Lain-lain'">
                                        <q-separator />
                                        <div>{{ neonatusmedis?.penolongPersalinanLain }}</div>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td width="35%">
                                      Ktbn pch dini?
                                    </td>
                                    <td>
                                      <div> {{ neonatusmedis?.ketubanPecahDini }}</div>
                                      <div v-if="neonatusmedis?.ketubanPecahDini==='Ya'">
                                        <q-separator />
                                        <div>Jam : {{ neonatusmedis?.ketubanPecahDiniJam }}</div>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td width="35%">
                                      Air Ketuban
                                    </td>
                                    <td>
                                      <div> <b>Jumlah :</b> {{ neonatusmedis?.jumlahKetuban }}</div>
                                      <q-separator />
                                      <div><b>Warna :</b> {{ neonatusmedis?.warnaKetuban }}</div>
                                      <q-separator />
                                      <div><b>Kekeruhan :</b> {{ neonatusmedis?.kekeruhan }}</div>
                                      <q-separator />
                                      <div><b>Bau :</b> {{ neonatusmedis?.bau }}</div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td width="35%">
                                      Placenta
                                    </td>
                                    <td>
                                      <div> {{ neonatusmedis?.placenta }}</div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td colspan="2">
                                      <div> Obat sebelum Bersalin ? {{ neonatusmedis?.obatSebelumBersalin }}</div>
                                      <div v-if="neonatusmedis?.obatSebelumBersalin === 'Ya'">
                                        <q-separator />
                                        <div>{{ neonatusmedis?.obatSebelumBersalinYa }}</div>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td colspan="2">
                                      <div> <b>DATA BAYI</b></div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td colspan="2">
                                      <div> <b>Lahir Tgl:</b> {{ neonatusmedis?.lahirTgl?? '-' }} <b>Jam</b> {{ neonatusmedis?.lahirJam??'-' }}</div>
                                      <q-separator />
                                      <div><b>Resusitasi :</b> {{ neonatusmedis?.resusitasi }}</div>
                                      <q-separator />
                                      <div><b>Skor APGAR :</b> {{ neonatusmedis?.skorApgar }}</div>
                                      <q-separator />
                                      <div><b>BB :</b> {{ neonatusmedis?.beratBadan??'-' }} Cm</div>
                                      <q-separator />
                                      <div><b>PB :</b> {{ neonatusmedis?.panjangBadan??'-' }} Cm</div>
                                      <div><b>LK :</b> {{ neonatusmedis?.linkarKepala??'-' }} Cm</div>
                                      <div><b>Usia Kehamilan Bayi :</b> {{ neonatusmedis?.usiaKehamilanBayi??'-' }} Minggu</div>
                                    </td>
                                  </tr>
                                </table>
                              </q-item-section>
                            </q-item>

                            <q-item
                              v-for="(neonatuskeperawatan, nm) in item?.neonatuskeperawatan"
                              :key="nm"
                              v-ripple
                              clickable
                            >
                              <q-item-section>
                                <q-item-label>
                                  Neonatus keperawatan
                                </q-item-label>
                                <q-item-label
                                  caption
                                  lines="2"
                                />
                                <table>
                                  <tr>
                                    <td width="35%">
                                      Pernah dirawat
                                    </td>
                                    <td>{{ neonatuskeperawatan?.pernahDirawat }}</td>
                                  </tr>
                                  <tr>
                                    <td width="35%">
                                      Indikasi Rawat
                                    </td>
                                    <td>{{ neonatuskeperawatan?.indikasiRawat }}</td>
                                  </tr>
                                  <tr>
                                    <td width="35%">
                                      Gizi Ibu
                                    </td>
                                    <td>{{ neonatuskeperawatan?.giziIbu }}</td>
                                  </tr>
                                  <tr>
                                    <td width="35%">
                                      Kebiasan Ibu
                                    </td>
                                    <td>{{ neonatuskeperawatan?.kebiasaanIbu }}</td>
                                  </tr>
                                  <tr>
                                    <td width="35%">
                                      Kebiasan Ibu Dll
                                    </td>
                                    <td>{{ neonatuskeperawatan?.kebiasaanIbuDll }}</td>
                                  </tr>
                                  <tr>
                                    <td width="35%">
                                      Riwayat Transfusi
                                    </td>
                                    <td>
                                      <div v-if="neonatuskeperawatan?.riwayatTransfusi === 'Ya'">
                                        {{ neonatuskeperawatan?.riwayatTransfusi + ', ' + neonatuskeperawatan?.transfusiKapan }}
                                      </div>
                                      <div v-else>
                                        {{ neonatuskeperawatan?.riwayatTransfusi }}
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td width="35%">
                                      Reaksi
                                    </td>
                                    <td>
                                      <div v-if="neonatuskeperawatan?.reaksi === 'Ya'">
                                        {{ neonatuskeperawatan?.reaksi + ', ' + neonatuskeperawatan?.reaksiYa }}
                                      </div>
                                      <div v-else>
                                        {{ neonatuskeperawatan?.reaksi }}
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td width="35%">
                                      Riwayat Imunisasi
                                    </td>
                                    <td>
                                      <div v-if="neonatuskeperawatan?.riwayatImunisasi === 'Ya'">
                                        {{ neonatuskeperawatan?.riwayatImunisasi + ', ' + neonatuskeperawatan?.imunisasiKapan }}
                                      </div>
                                      <div v-else>
                                        {{ neonatuskeperawatan?.riwayatImunisasi }}
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td width="35%">
                                      Keadaan Umum
                                    </td>
                                    <td>{{ neonatuskeperawatan?.keadaanUmum }}</td>
                                  </tr>
                                  <tr>
                                    <td width="35%">
                                      Gol. Darah / Rh (Bayi)
                                    </td>
                                    <td>{{ neonatuskeperawatan?.golDarahBayi }} / RH : {{ neonatuskeperawatan?.golDarahBayiRh }}</td>
                                  </tr>
                                  <tr>
                                    <td width="35%">
                                      Gol. Darah / Rh (Ibu)
                                    </td>
                                    <td>{{ neonatuskeperawatan?.golDarahIbu }} / RH : {{ neonatuskeperawatan?.golDarahIbuRh }}</td>
                                  </tr>
                                  <tr>
                                    <td width="35%">
                                      Gol. Darah / Rh (Ayah)
                                    </td>
                                    <td>{{ neonatuskeperawatan?.golDarahAyah }} / RH : {{ neonatuskeperawatan?.golDarahAyahRh }}</td>
                                  </tr>
                                  <tr>
                                    <td width="35%">
                                      Sistem Susunan Syaraf Pusat
                                    </td>
                                    <td>
                                      <div> <b>Gerak Bayi :</b> {{ neonatuskeperawatan?.gerakBayi }}</div>
                                      <q-separator />
                                      <div><b>UUB :</b> {{ neonatuskeperawatan?.uub }}</div>
                                      <q-separator />
                                      <div><b>UUB Lain :</b> {{ neonatuskeperawatan?.uubLain }}</div>
                                      <q-separator />
                                      <div v-if="neonatuskeperawatan?.kejang === 'Ada'">
                                        <b>Kejang:</b> {{ neonatuskeperawatan?.kejang +', '+ neonatuskeperawatan?.kejangAda }}
                                      </div>
                                      <div v-else>
                                        <b>Kejang:</b> {{ neonatuskeperawatan?.kejang }}
                                      </div>
                                      <q-separator />
                                      <div><b>Refleks :</b> {{ arrayToString(neonatuskeperawatan?.refleks) }}</div>
                                      <q-separator />
                                      <div><b>Refleks lain:</b> {{ neonatuskeperawatan?.refleksLain }}</div>
                                      <q-separator />
                                      <div><b>Tangis Bayi :</b> {{ arrayToString(neonatuskeperawatan?.tangisBayi) }}</div>
                                      <q-separator />
                                      <div><b>Tangis Bayi lain:</b> {{ neonatuskeperawatan?.tangisBayiLain }}</div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td width="35%">
                                      Sistem Penglihatan
                                    </td>
                                    <td>
                                      <div> <b> Posisi Mata :</b> {{ neonatuskeperawatan?.posisiMata }}</div>
                                      <q-separator />
                                      <div><b>Besar Pupil :</b> {{ neonatuskeperawatan?.besarPupil }}</div>
                                      <q-separator />
                                      <div><b>Kelopak Mata :</b> {{ neonatuskeperawatan?.kelopakMata }}</div>
                                      <q-separator />
                                      <div><b>Kelopak Mata Lain :</b> {{ neonatuskeperawatan?.kelopakMataLain }}</div>
                                      <q-separator />
                                      <div><b>Konjungtiva :</b> {{ neonatuskeperawatan?.konjungtiva }}</div>
                                      <q-separator />
                                      <div><b>Konjungtiva Lain :</b> {{ neonatuskeperawatan?.konjungtivaLain }}</div>
                                      <q-separator />
                                      <div><b>Sklera :</b> {{ neonatuskeperawatan?.sklera }}</div>
                                      <q-separator />
                                      <div><b>Sklera Lain :</b> {{ neonatuskeperawatan?.skleraLain }}</div>
                                      <q-separator />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td width="35%">
                                      Sistem Pendengaran
                                    </td>
                                    <td>
                                      <div> <b> Pendengaran :</b> {{ neonatuskeperawatan?.pendengaran }}</div>
                                      <q-separator />
                                      <div><b> Pendengaran Lain :</b> {{ neonatuskeperawatan?.pendengaranLain }}</div>
                                      <q-separator />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td width="35%">
                                      Sistem Penciuman
                                    </td>
                                    <td>
                                      <div> <b> Penciuman :</b> {{ neonatuskeperawatan?.penciuman }}</div>
                                      <q-separator />
                                      <div><b> Penciuman Lain :</b> {{ neonatuskeperawatan?.penciumanLain }}</div>
                                      <q-separator />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td width="35%">
                                      Sistem Kardiovaskuler
                                    </td>
                                    <td>
                                      <div> <b> Warna kulit :</b> {{ neonatuskeperawatan?.warnaKulit }}</div>
                                      <q-separator />
                                      <div><b> Warna Kulit Sianosis :</b> {{ neonatuskeperawatan?.warnaKulitSianosis }}</div>
                                      <q-separator />
                                      <div><b> Warna Kulit Lain :</b> {{ neonatuskeperawatan?.warnaKulitLain }}</div>
                                      <q-separator />
                                      <div><b> Denyut Nadi :</b> {{ neonatuskeperawatan?.denyutNadi }}  /<b> Frekwensi :</b> {{ neonatuskeperawatan?.denyutNadiFrekwensi }} </div>
                                      <q-separator />
                                      <div><b> Sirkulasi :</b> {{ neonatuskeperawatan?.sirkulasi }}</div>
                                      <q-separator />
                                      <div><b> Sirkulasi crt :</b> {{ neonatuskeperawatan?.sirkulasiCrt }}</div>
                                      <q-separator />
                                      <div><b> Pulsasi Lokasi :</b> {{ neonatuskeperawatan?.pulsasiLokasi }}</div>
                                      <q-separator />
                                      <div><b> Pulsasi Lain :</b> {{ neonatuskeperawatan?.pulsasiLain }}</div>
                                      <q-separator />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td width="35%">
                                      Sistem Pernapasan
                                    </td>
                                    <td>
                                      <div> <b> Pola Nafas Normal :</b> {{ neonatuskeperawatan?.polaNafasNormal }}</div>
                                      <q-separator />
                                      <div><b> Pola Nafas Bradipnea :</b> {{ neonatuskeperawatan?.bradipnea }}</div>
                                      <q-separator />
                                      <div><b> Pola Nafas Tachipnea :</b> {{ neonatuskeperawatan?.tachipnea }}</div>
                                      <q-separator />
                                      <div><b> Jenis Pernapasan :</b> {{ neonatuskeperawatan?.jenisPernapasan }}  </div>
                                      <q-separator />
                                      <div><b> Alat Bantu Pernapasan :</b> {{ neonatuskeperawatan?.alatBantuPernapasan }}</div>
                                      <q-separator />
                                      <div><b> Irama Napas :</b> {{ neonatuskeperawatan?.iramaPernapasan }}</div>
                                      <q-separator />
                                      <div><b> Retraksi :</b> {{ neonatuskeperawatan?.retraksi }}</div>
                                      <q-separator />
                                      <div><b> Air Entri :</b> {{ neonatuskeperawatan?.airEntri }}</div>
                                      <q-separator />
                                      <div><b> Merintih :</b> {{ neonatuskeperawatan?.merintih }}</div>
                                      <q-separator />
                                      <div><b> Suara Napas :</b> {{ neonatuskeperawatan?.suaraNapas }}</div>
                                      <q-separator />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td width="35%">
                                      Sistem Pencernaan
                                    </td>
                                    <td>
                                      <div v-if="neonatuskeperawatan?.mulut==='Lain-lain'">
                                        <b> Mulut :</b> {{ neonatuskeperawatan?.mulutLain }}
                                      </div>
                                      <div v-else>
                                        <b> Mulut :</b> {{ neonatuskeperawatan?.mulut }}
                                      </div>
                                      <q-separator />
                                      <div v-if="neonatuskeperawatan?.lidah==='Lain-lain'">
                                        <b> Lidah :</b> {{ neonatuskeperawatan?.lidahLain }}
                                      </div>
                                      <div v-else>
                                        <b> Lidah :</b> {{ neonatuskeperawatan?.lidah }}
                                      </div>
                                      <q-separator />
                                      <div v-if="neonatuskeperawatan?.oesofagus==='Lain-lain'">
                                        <b> Oesofagus :</b> {{ neonatuskeperawatan?.oesofagusLain }}
                                      </div>
                                      <div v-else>
                                        <b> Oesofagus :</b> {{ neonatuskeperawatan?.oesofagus }}
                                      </div>
                                      <q-separator />
                                      <div v-if="neonatuskeperawatan?.abdomen==='Lain-lain'">
                                        <b> Abdomen :</b> {{ neonatuskeperawatan?.abdomenLain }}
                                      </div>
                                      <div v-else-if="neonatuskeperawatan?.abdomen==='Bising usus'">
                                        <b> Abdomen :</b> {{ neonatuskeperawatan?.bisingUsus }}
                                      </div>
                                      <div v-else>
                                        <b> Abdomen :</b> {{ neonatuskeperawatan?.abdomen }}
                                      </div>
                                      <q-separator />
                                      <div v-if="neonatuskeperawatan?.abdomen==='Diare'">
                                        <b> BAB :</b> {{ neonatuskeperawatan?.bab }} | <b> Frekwensi BAB :</b> {{ neonatuskeperawatan?.frekwensiBab }}
                                      </div>
                                      <div v-else-if="neonatuskeperawatan?.abdomen==='Meco Pertama'">
                                        <b> BAB :</b> {{ neonatuskeperawatan?.mecoPertama }}  | <b> Tgl/Jam :</b> {{ neonatuskeperawatan?.mecoPertama }}
                                      </div>
                                      <div v-else>
                                        <b> BAB :</b> {{ neonatuskeperawatan?.bab }}
                                      </div>
                                      <q-separator />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td width="35%">
                                      Sistem Genitourinasis
                                    </td>
                                    <td>
                                      <div v-if="neonatuskeperawatan?.warnaGenitourinasis==='Lain-lain'">
                                        <b> Warna :</b> {{ neonatuskeperawatan?.warnaGenitourinasisLain }}
                                      </div>
                                      <div v-else>
                                        <b> Warna :</b> {{ neonatuskeperawatan?.warnaGenitourinasis }}
                                      </div>
                                      <q-separator />
                                      <div v-if="neonatuskeperawatan?.bak==='BAK pertama'">
                                        <b> BAK :</b> {{ neonatuskeperawatan?.bak }} | <b> Tgl/Jam :</b> {{ neonatuskeperawatan?.bakPertama }}
                                      </div>
                                      <div v-else>
                                        <b> BAK :</b> {{ neonatuskeperawatan?.bak }}
                                      </div>
                                      <q-separator />
                                      <div v-if="neonatuskeperawatan?.warnaBak==='Lain-lain'">
                                        <b> Warna BAK :</b> {{ neonatuskeperawatan?.warnaBaklain }}
                                      </div>
                                      <div v-else>
                                        <b> Warna BAK :</b> {{ neonatuskeperawatan?.warnaBak }}
                                      </div>
                                      <q-separator />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td width="35%">
                                      Sistem Integument
                                    </td>
                                    <td>
                                      <div v-if="neonatuskeperawatan?.vernicKasesosa==='Ada'">
                                        <b> Vernic Kesesosa :</b> {{ neonatuskeperawatan?.vernicKasesosa }} | {{ neonatuskeperawatan?.vernicKasesosaAda }}
                                      </div>
                                      <div v-else>
                                        <b> Vernic Kesesosa :</b> {{ neonatuskeperawatan?.vernicKasesosa }}
                                      </div>
                                      <q-separator />
                                      <div><b> Lanugo :</b> {{ neonatuskeperawatan?.lanugo }}</div>
                                      <q-separator />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td width="35%">
                                      Sistem Genitourinasis
                                    </td>
                                    <td>
                                      <div v-if="neonatuskeperawatan?.warnaGenitourinasis==='Lain-lain'">
                                        <b> Warna :</b> {{ neonatuskeperawatan?.warnaGenitourinasisLain }}
                                      </div>
                                      <div v-else>
                                        <b> Warna :</b> {{ neonatuskeperawatan?.warnaGenitourinasis }}
                                      </div>
                                      <q-separator />
                                      <div v-if="neonatuskeperawatan?.bak==='BAK pertama'">
                                        <b> BAK :</b> {{ neonatuskeperawatan?.bak }} | <b> Tgl/Jam :</b> {{ neonatuskeperawatan?.bakPertama }}
                                      </div>
                                      <div v-else>
                                        <b> BAK :</b> {{ neonatuskeperawatan?.bak }}
                                      </div>
                                      <q-separator />
                                      <div v-if="neonatuskeperawatan?.warnaBak==='Lain-lain'">
                                        <b> Warna BAK :</b> {{ neonatuskeperawatan?.warnaBaklain }}
                                      </div>
                                      <div v-else>
                                        <b> Warna BAK :</b> {{ neonatuskeperawatan?.warnaBak }}
                                      </div>
                                      <q-separator />
                                    </td>
                                  </tr>
                                </table>
                              </q-item-section>
                            </q-item>
                          </q-list>
                        </q-card-section> -->

                        <q-separator />
                        <q-card-section
                          v-if="item?.tindakan?.length"
                          class="q-pa-none"
                          flat
                          bordered
                          square
                          dark
                        >
                          <q-bar class="bg-accent">
                            <div>TINDAKAN</div>
                          </q-bar>
                          <q-list
                            dark
                            separator
                          >
                            <q-item
                              v-for="(tindakan, tin) in item?.tindakan"
                              :key="tin"
                              v-ripple
                              clickable
                            >
                              <q-item-section>
                                <q-item-label
                                  caption
                                  lines="2"
                                />
                                {{ tin + 1 }}. {{ tindakan?.mastertindakan?.rs2 }}
                                <q-item-label
                                  caption
                                  lines="2"
                                />
                                keterangan = {{ tindakan?.rs20 }}
                                <div
                                  v-if="tindakan?.gambardokumens?.length > 0"
                                  class="image-row"
                                >
                                  <div
                                    v-for="(image, index) in tindakan?.gambardokumens"
                                    :key="index"
                                    class="image-container"
                                  >
                                    <q-img
                                      :src="pathImg + image.url"
                                      class="image"
                                    >
                                      <div class="absolute-bottom">
                                        <div class="column items-center justify-between">
                                          <q-btn
                                            class="gt-xs"
                                            size="md"
                                            color="yellow"
                                            flat
                                            dense
                                            round
                                            icon="icon-mat-visibility"
                                            :href="pathImg + image?.url"
                                            target="_blank"
                                          />
                                        </div>
                                      </div>
                                    </q-img>
                                  </div>
                                </div>
                              </q-item-section>
                            </q-item>
                          </q-list>
                        </q-card-section>
                        <q-separator />

                        <q-card-section
                          v-if="item?.laborat?.length || item?.laborats?.length"
                          class="q-pa-none"
                        >
                          <q-bar class="bg-accent">
                            PEMERIKSAAN LABORAT
                          </q-bar>
                          <q-markup-table
                            separator="vertical"
                            flat
                            bordered
                            dense
                            dark
                          >
                            <thead>
                              <tr>
                                <th class="text-left">
                                  Nama Pemeriksaan
                                </th>
                                <th class="text-left">
                                  Kelompok Pemeriksaan
                                </th>
                                <th class="text-left">
                                  Satuan Normal
                                </th>
                                <th class="text-right">
                                  Hasil
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr
                                v-for="(lab, l) in item?.laborat"
                                :key="l"
                                v-ripple
                                clickable
                              >
                                <td
                                  class="text-left ellipsis"
                                  style="max-width: 250px;"
                                >
                                  {{ lab?.pemeriksaanlab?.rs2 }}
                                </td>
                                <td
                                  class="text-right"
                                  style="max-width: 150px;"
                                >
                                  {{ lab?.pemeriksaanlab?.rs21 }}
                                </td>
                                <td
                                  class="text-right"
                                  style="max-width: 150px;"
                                >
                                  {{ lab?.pemeriksaanlab?.rs22 }}
                                </td>
                                <td
                                  v-if="lab?.rs27 === ''"
                                  style="max-width: 150px;"
                                >
                                  <q-item-label class="text-right">
                                    {{ lab?.rs21 }}
                                  </q-item-label>
                                </td>
                                <td
                                  v-else
                                  style="max-width: 150px;"
                                >
                                  <q-item-label class="text-right">
                                    {{ lab?.rs21 }} ({{ lab?.rs27 }})
                                  </q-item-label>
                                </td>
                              </tr>
                            </tbody>
                          </q-markup-table>
                        </q-card-section>
                        <q-separator />

                        <q-card-section
                          v-if="item?.transradiologi?.length && item?.hasilradiologi?.length"
                          class="q-pa-none"
                          flat
                          bordered
                          square
                          dark
                        >
                          <q-bar class="bg-accent">
                            <div>RADIOLOGI</div>
                          </q-bar>
                          <q-list
                            dark
                            separator
                          >
                            <q-item
                              v-for="(radiologi, r) in item?.transradiologi"
                              :key="r"
                              v-ripple
                              clickable
                            >
                              <q-item-section>
                                <q-item-label>Pemeriksaan = {{ radiologi?.relmasterpemeriksaan?.rs2 }}</q-item-label>
                                <q-item-label>Jenis Pemeriksaan Radiologi = {{ radiologi?.relmasterpemeriksaan?.rs3 }}</q-item-label>
                                <q-item-label>Hasil Pemeriksaan Radiologi = {{ item?.hasilradiologi[r]?.rs3 }}</q-item-label>
                              </q-item-section>
                            </q-item>
                          </q-list>
                        </q-card-section>

                        <q-separator />
                        <q-card-section
                          v-if="item?.kamaroperasi?.length"
                          class="q-pa-none"
                        >
                          <q-bar class="bg-accent">
                            TINDAKAN OPERASI
                          </q-bar>
                          <q-markup-table
                            separator="vertical"
                            flat
                            bordered
                            dense
                            dark
                          >
                            <thead>
                              <tr>
                                <th class="text-left">
                                  Tanggal
                                </th>
                                <th class="text-right">
                                  Diagnosa
                                </th>
                                <th class="text-right">
                                  Tindakan Operasi
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr
                                v-for="(operasi, l) in item?.kamaroperasi"
                                :key="l"
                                v-ripple
                                clickable
                              >
                                <td
                                  class="text-left ellipsis"
                                  style="max-width: 250px;"
                                >
                                  {{ operasi?.rs3 }}
                                </td>
                                <td
                                  class="text-right"
                                  style="max-width: 150px;"
                                >
                                  {{ operasi?.mastertindakanoperasi?.rs2 }}
                                </td>
                                <td
                                  class="text-right"
                                  style="max-width: 150px;"
                                >
                                  {{ operasi?.mastertindakanoperasi?.rs4 }}
                                </td>
                              </tr>
                            </tbody>
                          </q-markup-table>
                        </q-card-section>

                        <q-separator />
                        <q-card-section
                          v-if="item?.apotekrajal?.length
                            || item?.apotekrajalpolilalu?.length
                            || item?.apotekracikanrajal?.length
                            || item?.apotekracikanrajallalu?.length
                            || item?.apotekranap?.length
                            || item?.apotekranaplalu?.length
                            || item?.apotekranapracikanheder?.length
                            || item?.apotekranapracikanhederlalu?.length"
                          class="q-pa-none"
                        >
                          <q-bar class="bg-accent">
                            PEMBERIAN OBAT
                          </q-bar>
                          <q-markup-table
                            separator="vertical"
                            flat
                            bordered
                            dense
                            dark
                          >
                            <thead>
                              <tr>
                                <th class="text-left">
                                  Tanggal
                                </th>
                                <th class="text-right">
                                  Obat
                                </th>
                                <th class="text-right">
                                  Signa
                                </th>
                                <th class="text-right">
                                  Jumlah
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr
                                v-for="(apotekrajal, wew) in item?.apotekrajal"
                                :key="wew"
                              >
                                <td
                                  class="text-left ellipsis"
                                  style="max-width: 250px;"
                                >
                                  {{ apotekrajal?.rs3 }}
                                </td>
                                <td
                                  class="text-right"
                                  style="max-width: 150px;"
                                >
                                  {{ apotekrajal.masterobat?.rs2 }}
                                </td>
                                <td
                                  v-if="apotekrajal?.rs27.length > 0 && apotekrajal?.rs28.length > 0"
                                  class="text-right"
                                  style="max-width: 250px;"
                                >
                                  {{ getInteger(apotekrajal?.rs27) + ' X ' + getInteger(apotekrajal?.rs28) }}
                                </td>
                                <td
                                  v-else
                                  class="text-right"
                                  style="max-width: 250px;"
                                >
                                  {{ '-' }}
                                </td>
                                <td
                                  class="text-right"
                                  style="max-width: 150px;"
                                >
                                  {{ apotekrajal?.rs8 }}
                                </td>
                              </tr>
                              <tr
                                v-for="(apotekrajalpolilalu, lll) in item?.apotekrajalpolilalu"
                                :key="lll"
                              >
                                <td
                                  class="text-left ellipsis"
                                  style="max-width: 250px;"
                                >
                                  {{ apotekrajalpolilalu?.rs3 }}
                                </td>
                                <td
                                  class="text-right"
                                  style="max-width: 150px;"
                                >
                                  {{ apotekrajalpolilalu.masterobat?.rs2 }}
                                </td>
                                <td
                                  v-if="apotekrajalpolilalu?.rs27.length > 0 && apotekrajalpolilalu?.rs28.length > 0"
                                  class="text-right"
                                  style="max-width: 250px;"
                                >
                                  {{ getInteger(apotekrajalpolilalu?.rs27) + ' X ' + getInteger(apotekrajalpolilalu?.rs28) }}
                                </td>
                                <td
                                  v-else
                                  class="text-right"
                                  style="max-width: 250px;"
                                >
                                  {{ '-' }}
                                </td>
                                <td
                                  class="text-right"
                                  style="max-width: 150px;"
                                >
                                  {{ apotekrajalpolilalu?.rs8 }}
                                </td>
                              </tr>
                              <tr
                                v-for="(apotekracikanrajal, llll) in item?.apotekracikanrajal"
                                :key="llll"
                              >
                                <td
                                  class="text-left ellipsis"
                                  style="max-width: 250px;"
                                >
                                  {{ apotekracikanrajal?.rs3 }}
                                </td>
                                <td
                                  class="text-right"
                                  style="max-width: 150px;"
                                >
                                  {{ apotekracikanrajal.masterobat?.rs2 }}
                                </td>
                                <td
                                  class="text-left ellipsis"
                                  style="max-width: 250px;"
                                >
                                  {{ '-' }}
                                </td>
                                <td
                                  class="text-right"
                                  style="max-width: 150px;"
                                >
                                  {{ apotekracikanrajal?.rs5 }}
                                </td>
                              </tr>
                              <tr
                                v-for="(apotekracikanrajallalu, llll) in item?.apotekracikanrajallalu"
                                :key="llll"
                              >
                                <td
                                  class="text-left ellipsis"
                                  style="max-width: 250px;"
                                >
                                  {{ apotekracikanrajallalu?.rs3 }}
                                </td>
                                <td
                                  class="text-right"
                                  style="max-width: 150px;"
                                >
                                  {{ apotekracikanrajallalu.masterobat?.rs2 }}
                                </td>
                                <td
                                  class="text-right"
                                  style="max-width: 150px;"
                                >
                                  {{ '-' }}
                                </td>
                                <td
                                  class="text-right"
                                  style="max-width: 150px;"
                                >
                                  {{ apotekracikanrajallalu?.rs5 }}
                                </td>
                              </tr>
                            </tbody>
                          </q-markup-table>
                        </q-card-section>

                        <q-separator />
                        <q-card-section
                          v-if="store?.metaEresep !== null"
                          class="q-pa-none"
                        >
                          <q-bar class="bg-accent">
                            PEMBERIAN OBAT E-RESEP
                          </q-bar>

                          <div v-for="(obats, ob) in store?.metaEresep" :key="ob">
                            <div v-if="obats?.noreg === item?.rs1 && (obats?.flag === '3' || obats?.flag === '4')">
                              <div
                                v-if="obats?.permintaanresep?.length"
                                class="q-pa-sm"
                              >
                                <div>
                                  <q-item-label>
                                    Riwayat Obat Tanggal : <em>{{ humanDate(obats?.tgl) }}</em>
                                  </q-item-label>
                                  <q-item-label class="q-mb-sm">
                                    <div v-if="obats?.dokter?.nama?.length">
                                      <span>Petugas : <em>{{ obats?.dokter?.nama }}</em></span>
                                    </div>
                                    <div v-else>
                                      <span>Petugas : <em>-</em></span>
                                    </div>
                                  </q-item-label>
                                </div>
                                <div class="row items-center q-mb-sm">
                                  <div class="col">
                                    <div class="text-weight-bold">
                                      Non Racikan | {{ obats?.tiperesep }} | {{ obats?.noresep }}
                                    </div>
                                  </div>
                                </div>

                                <q-list
                                  separator
                                  bordered
                                  style="border-color: white;"
                                >
                                  <q-item
                                    v-for="(rinc,j) in obats?.rincian"
                                    :key="rinc"
                                  >
                                    <q-item-section style="width: 20%;">
                                      <div class="row">
                                        <div class="col-1">
                                          {{ j+1 }}
                                        </div>
                                        <div class="col-11">
                                          <div class="row text-weight-bold">
                                            {{ rinc?.mobat?.nama_obat }}
                                          </div>
                                          <div class="row text-italic f-10">
                                            {{ rinc?.kdobat }}
                                          </div>
                                          <div class="row text-weight-bold f-10">
                                            ( {{ rinc?.mobat?.satuan_k }} )
                                          </div>
                                        </div>
                                      </div>
                                    </q-item-section>
                                    <q-item-section
                                      side
                                      style="width:60%"
                                    >
                                      <div class="row items-center full-width">
                                        <div class="col-12">
                                          <div class="row q-mt-sm">
                                            <div class="col-6">
                                              Aturan :
                                            </div>
                                            <div class="col-4">
                                              {{ rinc?.aturan }}
                                            </div>
                                          </div>
                                          <div class="row q-mt-sm">
                                            <div class="col-6">
                                              Jumlah Obat :
                                            </div>
                                            <div class="col-4">
                                              {{ rinc?.jumlah }}
                                            </div>
                                          </div>
                                          <div class="row q-mt-sm">
                                            <div class="col-6">
                                              Konsumsi :
                                            </div>
                                            <div class="col-4">
                                              {{ rinc?.konsumsi }} hari
                                            </div>
                                          </div>
                                          <div class="row q-mt-sm">
                                            <div class="col-6">
                                              keterangan :
                                            </div>
                                            <div class="col-4">
                                              {{ rinc?.keterangan }}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </q-item-section>
                                  </q-item>
                                </q-list>
                              </div>

                              <div
                                v-if="obats?.permintaanracikan?.length"
                                class="q-mt-sm q-pa-sm"
                              >
                                <div class="row items-center">
                                  <div class="col">
                                    <div class="text-weight-bold" v-if="obats?.poli">
                                      Racikan | {{ obats?.tiperesep }} | {{ obats?.noresep }} ({{ obats?.poli?.rs2 }}) | {{ obats?.sistembayar?.rs2 }}
                                    </div>
                                    <div class="text-weight-bold" v-else>
                                      Racikan | {{ obats?.tiperesep }} | {{ obats?.noresep }} ({{ obats?.ruanganranap?.rs2 }}) | {{ obats?.sistembayar?.rs2 }}
                                    </div>
                                  </div>
                                </div>
                                <div
                                  v-for="(rac,r) in obats?.permintaanracikan"
                                  :key="r"
                                >
                                  <div v-if="r === 0">
                                    <div class="row items-center">
                                      <div class="col-shrink q-mr-xs">
                                        {{ rac?.namaracikan }}
                                      </div>
                                      <div class="col-shrink q-mr-xs">
                                        <q-chip
                                          square
                                          class="f-10"
                                          color="primary"
                                          text-color="white"
                                          outline
                                        >
                                          {{ rac?.tiperacikan }}
                                        </q-chip>
                                      </div>
                                      <div class="col-shrink q-mr-xs text-purple text-weight-bold">
                                        Jumlah {{ rac?.jumlahdibutuhkan }}
                                      </div>
                                      <div class="col-shrink q-mr-xs">
                                        ({{ rac?.satuan_racik }})
                                      </div>
                                      <div class="col-shrink q-mr-xs text-italic">
                                        {{ rac.aturan }}
                                      </div>

                                      <div class="col-shrink q-mr-xs">
                                        | Keterangan : {{ rac?.keterangan }}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <q-list
                                  separator
                                  bordered
                                  style="border-color: white;"
                                >
                                  <q-item
                                    v-for="(rincrac, rc) in obats?.rincianracik"
                                    :key="rc"
                                  >
                                    <q-item-section style="width: 20%;">
                                      <div class="row text-weight-bold">
                                        {{ rincrac?.mobat?.nama_obat }}
                                      </div>
                                      <div class="row text-italic f-10">
                                        {{ rincrac?.kdobat }}
                                      </div>
                                      <div class="row text-weight-bold f-10">
                                        ( {{ rincrac?.mobat?.satuan_k }} )
                                      </div>
                                    </q-item-section>
                                    <q-item-section
                                      side
                                      style="width:60%"
                                    >
                                      <div class="row full-width">
                                        <div class="col-12">
                                          <div
                                            v-if="rincrac?.tiperacikan==='DTD'"
                                            class="col"
                                          >
                                            <div class="row q-mt-sm">
                                              <div class="col-6">
                                                Dosis Resep :
                                              </div>
                                              <div class="col-4">
                                                {{ obats?.permintaanracikan[rc]?.dosismaksimum }}
                                              </div>
                                            </div>
                                            <div class="row q-mt-sm">
                                              <div class="col-6">
                                                Dosis Obat :
                                              </div>
                                              <div class="col-4">
                                                {{ obats?.permintaanracikan[rc]?.mobat?.kekuatan_dosis }}
                                              </div>
                                            </div>
                                            <div class="row q-mt-sm">
                                              <div class="col-6">
                                                Jumlah Resep :
                                              </div>
                                              <div class="col-4">
                                                {{ obats?.permintaanracikan[rc]?.jumlah }}
                                              </div>
                                            </div>
                                            <div class="row q-mt-sm">
                                              <div class="col-6">
                                                Keterangan :
                                              </div>
                                              <div class="col-4">
                                                {{ obats?.permintaanracikan[rc]?.keteranganx }}
                                              </div>
                                            </div>
                                          </div>
                                          <div
                                            v-else
                                            class="col"
                                          >
                                            <div class="row q-mt-sm">
                                              <div class="col-6">
                                                Jumlah Resep :
                                              </div>
                                              <div class="col-4">
                                                {{ items?.permintaanracikan[rc]?.jumlah }}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </q-item-section>
                                  </q-item>
                                </q-list>
                              </div>
                              <hr style="border-color: grey">
                            </div>
                          </div>
                        </q-card-section>

                        <q-card-section
                          v-if="item?.dokumenluar?.length"
                          class="q-pa-none"
                          flat
                          bordered
                          square
                          dark
                        >
                          <q-bar class="bg-accent">
                            <div>DOKUMEN</div>
                          </q-bar>
                          <q-list
                            dark
                            separator
                          >
                            <div class="image-row">
                              <div
                                v-for="(image, index) in item?.dokumenluar"
                                :key="index"
                                class="image-container"
                              >
                                <q-img
                                  :src="pathImg + image.url"
                                  class="image"
                                >
                                  <div class="absolute-bottom">
                                    <div class="column items-center justify-between">
                                      <q-btn
                                        class="gt-xs"
                                        size="md"
                                        color="yellow"
                                        flat
                                        dense
                                        round
                                        icon="icon-mat-visibility"
                                        :href="pathImg + image?.url"
                                        target="_blank"
                                      />
                                    </div>
                                    <div>Dokumen : {{ image?.nama }}</div>
                                    <div>Diinput Oleh : {{ image?.pegawai?.nama }}</div>
                                  </div>
                                </q-img>
                              </div>
                            </div>
                          </q-list>
                        </q-card-section>
                      </q-list>
                    </q-card>
                  </q-expansion-item>
                </div>
                <div
                  v-else
                  class="column flex-center"
                  style="min-height: 860px;"
                >
                  MAAF ... DATA HISTORY PASIEN RAWAT JALAN BELUM ADA
                </div>
              </q-list>
            </q-scroll-area>
          </q-tab-panel>
          <q-tab-panel
            name="Rawat Inap"
            class="full-height q-pa-none"
          >
            <q-scroll-area style="height:calc(100% - 50px)">
              <q-list
                v-if="store?.items?.length"
                bordered
                separator
              >
                <div v-if="filteredItems?.length">
                  <q-expansion-item
                    v-for="(item, i) in filteredItems"
                    :key="i"
                    expand-separator
                    :label="item?.ruangan + ' | ' + item?.rs1 + ' | DPJP : ' + item?.dpjp"
                    :caption="tanggal(item?.tanggal)"
                  >
                    <q-card dark>
                      <q-separator />
                      <q-card-section class="q-pa-none">
                        <div v-if="item?.anamnesis.length">
                          <q-bar class="bg-accent">
                            <div>ANAMNESIS</div>
                          </q-bar>
                          <q-list dark>
                            <q-item
                              v-for="(anamnesis, a) in item?.anamnesis"
                              :key="a"
                            >
                              <q-item-section>
                                <q-item-label>Keluhan Utama</q-item-label>
                                <q-item-label
                                  caption
                                  lines="2"
                                >
                                  {{ anamnesis?.rs4 }}
                                </q-item-label>
                                <q-item-label>Riwayat Penyakit (Sekarang)</q-item-label>
                                <q-item-label
                                  caption
                                  lines="2"
                                >
                                  {{ anamnesis?.riwayatpenyakitsekarang }}
                                </q-item-label>
                                <q-item-label>Riwayat Penyakit</q-item-label>
                                <q-item-label
                                  caption
                                  lines="2"
                                >
                                  {{ anamnesis?.riwayatpenyakit }}
                                </q-item-label>
                                <q-item-label>Riwayat Alergi</q-item-label>
                                <q-item-label
                                  caption
                                  lines="2"
                                >
                                  {{ anamnesis?.riwayatalergi }}
                                </q-item-label>
                                <q-item-label>Reaksi berupa</q-item-label>
                                <q-item-label
                                  caption
                                  lines="2"
                                >
                                  {{ anamnesis?.keteranganalergi }}
                                </q-item-label>
                                <q-item-label>Riwayat Pengobatan</q-item-label>
                                <q-item-label
                                  caption
                                  lines="2"
                                >
                                  {{ anamnesis?.riwayatpengobatan }}
                                </q-item-label>
                                <q-item-label>Penurunan Berat Badan</q-item-label>
                                <q-item-label
                                  caption
                                  lines="2"
                                >
                                  {{ anamnesis?.skreeninggizi == 0 ? "Tidak" : "Ya" }}
                                </q-item-label>
                                <q-item-label>Asupan Makan Berkurang</q-item-label>
                                <q-item-label
                                  caption
                                  lines="2"
                                >
                                  {{ anamnesis?.asupanmakan == 0 ? "Tidak" : "Ya" }}
                                </q-item-label>
                                <q-item-label>Kondisi Khusus</q-item-label>
                                <q-item-label
                                  caption
                                  lines="2"
                                >
                                  {{ anamnesis?.kondisikhusus }}
                                </q-item-label>
                                <q-item-label>Score Nyeri</q-item-label>
                                <q-item-label
                                  caption
                                  lines="2"
                                >
                                  {{ anamnesis?.scorenyeri }} ( {{ anamnesis?.keteranganscorenyeri }} )
                                </q-item-label>
                              </q-item-section>
                            </q-item>
                          </q-list>
                        </div>
                        <div v-else>
                          <q-bar class="bg-accent">
                            <div>ANAMNESA tidak ada</div>
                          </q-bar>
                        </div>
                      </q-card-section>
                      <q-card-section
                        v-if="item?.pemeriksaanfisik?.length"
                        flat
                        bordered
                        square
                        dark
                      />
                      <q-list separator>
                        <q-bar class="bg-accent">
                          <div>PEMERIKSAAN FISIK</div>
                        </q-bar>
                        <!-- <transition-group name="list"> -->
                        <div
                          v-for="(pemeriksaanfisik, f) in item?.pemeriksaanfisik"
                          :key="f"
                        >
                          <!-- NADI-->
                          <q-item
                            v-ripple
                            class="q-pa-xs list-move"
                            dark
                            clickable
                          >
                            <q-item-section avatar>
                              <q-icon
                                :color="nadi(pemeriksaanfisik?.rs4).color"
                                name="icon-my-monitor_heart"
                                size="lg"
                              />
                            </q-item-section>
                            <q-item-section class="q-pa-xs">
                              <q-item-label :class="`text-h4 text-${nadi(pemeriksaanfisik?.rs4).color}`">
                                {{ pemeriksaanfisik?.rs4 }}
                              </q-item-label>
                            </q-item-section>
                            <q-item-section side>
                              <q-item-label class="text-right f-10">
                                N (HR)
                              </q-item-label>
                              <q-item-label class="text-right f-10">
                                {{ nadi(pemeriksaanfisik?.rs4).res }}
                              </q-item-label>
                            </q-item-section>
                          </q-item>
                          <q-separator
                            dark
                            inset
                          />
                          <q-item
                            v-ripple
                            class="q-pa-xs list-move"
                            dark
                            clickable
                          >
                            <q-item-section avatar>
                              <q-icon
                                color="white"
                                name="icon-my-local_hospital"
                                size="lg"
                              />
                            </q-item-section>
                            <q-item-section class="q-pa-xs">
                              <q-item-label :class="`text-h4 text-white`">
                                {{ pemeriksaanfisik?.pernapasan }}
                              </q-item-label>
                            </q-item-section>
                            <q-item-section side>
                              <q-item-label class="text-right f-10">
                                RR
                              </q-item-label>
                              <q-item-label class="text-right f-10">
                                -
                              </q-item-label>
                            </q-item-section>
                          </q-item>
                          <q-separator
                            dark
                            inset
                          />
                          <q-item
                            v-ripple
                            class="q-pa-xs list-move"
                            dark
                            clickable
                          >
                            <q-item-section avatar>
                              <q-icon
                                :color="suhu(pemeriksaanfisik?.suhutubuh).color"
                                name="icon-my-standing-human-body-silhouette-svgrepo-com"
                                size="lg"
                              />
                            </q-item-section>
                            <q-item-section class="q-pa-xs">
                              <q-item-label :class="`text-h4 text-${suhu(item?.suhutubuh).color}`">
                                {{ pemeriksaanfisik?.suhutubuh }}
                              </q-item-label>
                            </q-item-section>
                            <q-item-section side>
                              <q-item-label class="text-right f-10">
                                SUHU TUBUH
                              </q-item-label>
                              <q-item-label class="text-right f-10">
                                {{ suhu(pemeriksaanfisik?.suhutubuh).res }}
                              </q-item-label>
                            </q-item-section>
                          </q-item>
                          <q-separator
                            dark
                            inset
                          />
                          <q-item
                            v-ripple
                            class="q-pa-xs list-move"
                            dark
                            clickable
                          >
                            <q-item-section class="q-pa-xs">
                              <q-item-label :class="`text-h5 `">
                                <span :class="`${tekananDarah(pemeriksaanfisik?.sistole).color}`">{{
                                  pemeriksaanfisik?.sistole }}</span> /
                                <span :class="`${tekananDarahDias(pemeriksaanfisik?.diatole).color}`">{{
                                  pemeriksaanfisik?.diastole }}</span>
                              </q-item-label>
                              <q-item-label class="f-10">
                                <span :class="`${tekananDarah(pemeriksaanfisik?.sistole).color}`">{{
                                  tekananDarah(pemeriksaanfisik?.sistole).res }}</span> /
                                <span :class="`${tekananDarahDias(pemeriksaanfisik?.diastole).color}`">{{
                                  tekananDarahDias(pemeriksaanfisik?.diastole).res }}</span>
                              </q-item-label>
                            </q-item-section>
                            <q-item-section side>
                              <q-item-label class="text-right f-10">
                                TD sys / dias
                              </q-item-label>
                            </q-item-section>
                          </q-item>
                          <!-- STATUS -->
                          <q-separator
                            dark
                            inset
                          />
                          <q-item
                            v-ripple
                            class="q-pa-xs list-move"
                            dark
                            clickable
                          >
                            <q-item-section class="q-pa-xs">
                              <q-item-label lines="2">
                                T Kesadaran : <em>{{ getKesadaran(pemeriksaanfisik?.tingkatkesadaran) ?? '-' }}</em>
                              </q-item-label>
                              <q-item-label lines="2">
                                Status Psikologis : <em>{{ pemeriksaanfisik?.statuspsikologis ?? '-' }}</em>
                              </q-item-label>
                              <q-item-label lines="2">
                                Ekonomi : <em>{{ pemeriksaanfisik?.sosialekonomi ?? '-' }}</em>
                              </q-item-label>
                              <q-item-label lines="2">
                                Spiritual : <em>{{ pemeriksaanfisik?.spiritual ?? '-' }}</em>
                              </q-item-label>
                              <q-item-label lines="2">
                                kesadaran : <em>{{ pemeriksaanfisik?.kesadaran ?? '-' }}</em>
                              </q-item-label>
                            </q-item-section>
                          </q-item>

                          <!-- KHUSUS PARU POL018-->
                          <q-separator
                            dark
                            inset
                          />
                          <q-item
                            v-ripple
                            class="q-pa-xs list-move"
                            dark
                            clickable
                          >
                            <q-item-section class="q-pa-xs">
                              <q-item-label lines="2">
                                Inspeksi : <em>{{ pemeriksaanfisik?.inspeksi ?? '-' }}</em>
                              </q-item-label>
                              <q-item-label lines="2">
                                Palpasi : <em>{{ pemeriksaanfisik?.palpasi ?? '-' }}</em>
                              </q-item-label>
                              <q-item-label lines="2">
                                Perkusi Dada Kanan : <em>{{ pemeriksaanfisik?.perkusidadakanan ?? '-' }}</em>
                              </q-item-label>
                              <q-item-label lines="2">
                                Perkusi Dada Kiri : <em>{{ pemeriksaanfisik?.perkusidadakiri ?? '-' }}</em>
                              </q-item-label>
                              <q-item-label lines="2">
                                Suara Nafas Dasar : <em>{{ pemeriksaanfisik?.auskultasisuaradasar ?? '-' }}</em>
                              </q-item-label>
                              <q-item-label lines="2">
                                Suara Nafas Tambahan (Kanan) : <em>{{
                                  pemeriksaanfisik?.auskultasisuaratambahankanan ?? '-' }}</em>
                              </q-item-label>
                              <q-item-label lines="2">
                                Suara Nafas Tambahan (Kiri) : <em>{{ pemeriksaanfisik?.auskultasisuaratambahankiri ??
                                  '-'
                                }}</em>
                              </q-item-label>
                            </q-item-section>
                          </q-item>
                        </div>
                        <!-- </transition-group> -->
                        <q-card-section
                          v-if="item?.diagnosa?.length"
                          class="q-pa-none"
                          flat
                          bordered
                          square
                          dark
                        >
                          <q-bar class="bg-accent">
                            <div>DIAGNOSA</div>
                          </q-bar>
                          <q-list
                            dark
                            separator
                          >
                            <q-item
                              v-for="(diagnosa, d) in item?.diagnosa"
                              :key="d"
                              v-ripple
                              clickable
                            >
                              <q-item-section>
                                <q-item-label>Kasus = {{ diagnosa?.rs7 }}</q-item-label>
                                <q-item-label
                                  caption
                                  lines="2"
                                />
                                Jenis Diagnosa = {{ diagnosa?.rs4 }}
                                <q-item-label>
                                  Diagnosa = {{ diagnosa?.masterdiagnosa?.rs4 }} ( {{ diagnosa?.rs3 }}
                                  )
                                </q-item-label>
                                <q-item-label
                                  caption
                                  lines="2"
                                />
                                Keterangan = {{ diagnosa?.rs6 }}
                              </q-item-section>
                            </q-item>
                          </q-list>
                        </q-card-section>

                        <q-separator />
                        <q-card-section
                          v-if="item?.tindakan?.length"
                          class="q-pa-none"
                          flat
                          bordered
                          square
                          dark
                        >
                          <q-bar class="bg-accent">
                            <div>TINDAKAN</div>
                          </q-bar>
                          <q-list
                            dark
                            separator
                          >
                            <q-item
                              v-for="(tindakan, tin) in item?.tindakan"
                              :key="tin"
                              v-ripple
                              clickable
                            >
                              <q-item-section>
                                <q-item-label
                                  caption
                                  lines="2"
                                />
                                {{ tin + 1 }}. {{ tindakan?.mastertindakan?.rs2 }}
                                <q-item-label
                                  caption
                                  lines="2"
                                />
                                keterangan = {{ tindakan?.rs20 }}
                                <div
                                  v-if="tindakan?.gambardokumens.length > 0"
                                  class="image-row"
                                >
                                  <div
                                    v-for="(image, index) in tindakan?.gambardokumens"
                                    :key="index"
                                    class="image-container"
                                  >
                                    <q-img
                                      :src="pathImg + image.url"
                                      class="image"
                                    >
                                      <div class="absolute-bottom">
                                        <div class="column items-center justify-between">
                                          <q-btn
                                            class="gt-xs"
                                            size="md"
                                            color="yellow"
                                            flat
                                            dense
                                            round
                                            icon="icon-mat-visibility"
                                            :href="pathImg + image?.url"
                                            target="_blank"
                                          />
                                        </div>
                                      </div>
                                    </q-img>
                                  </div>
                                </div>
                              </q-item-section>
                            </q-item>
                          </q-list>
                        </q-card-section>
                        <q-separator />

                        <q-card-section
                          v-if="item?.laborat?.length || item?.laborats?.length"
                          class="q-pa-none"
                        >
                          <q-bar class="bg-accent">
                            PEMERIKSAAN LABORAT
                          </q-bar>
                          <q-markup-table
                            separator="vertical"
                            flat
                            bordered
                            dense
                            dark
                          >
                            <thead>
                              <tr>
                                <th class="text-left">
                                  Nama Pemeriksaan
                                </th>
                                <th class="text-left">
                                  Kelompok Pemeriksaan
                                </th>
                                <th class="text-left">
                                  Satuan Normal
                                </th>
                                <th class="text-right">
                                  Hasil
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr
                                v-for="(lab, l) in item?.laborat"
                                :key="l"
                                v-ripple
                                clickable
                              >
                                <td
                                  class="text-left ellipsis"
                                  style="max-width: 250px;"
                                >
                                  {{ lab?.pemeriksaanlab?.rs2 }}
                                </td>
                                <td
                                  class="text-right"
                                  style="max-width: 150px;"
                                >
                                  {{ lab?.pemeriksaanlab?.rs21 }}
                                </td>
                                <td
                                  class="text-right"
                                  style="max-width: 150px;"
                                >
                                  {{ lab?.pemeriksaanlab?.rs22 }}
                                </td>
                                <td
                                  v-if="lab?.rs27 === ''"
                                  style="max-width: 150px;"
                                >
                                  <q-item-label class="text-right">
                                    {{ lab?.rs21 }}
                                  </q-item-label>
                                </td>
                                <td
                                  v-else
                                  style="max-width: 150px;"
                                >
                                  <q-item-label class="text-right">
                                    {{ lab?.rs21 }} ({{ lab?.rs27 }})
                                  </q-item-label>
                                </td>
                              </tr>
                            </tbody>
                          </q-markup-table>
                          <q-separator />
                        </q-card-section>
                        <q-separator />

                        <q-card-section
                          v-if="item?.transradiologi?.length && item?.hasilradiologi?.length"
                          class="q-pa-none"
                          flat
                          bordered
                          square
                          dark
                        >
                          <q-bar class="bg-accent">
                            <div>RADIOLOGI</div>
                          </q-bar>
                          <q-list
                            dark
                            separator
                          >
                            <q-item
                              v-for="(radiologi, r) in item?.transradiologi"
                              :key="r"
                              v-ripple
                              clickable
                            >
                              <q-item-section>
                                <q-item-label>Pemeriksaan = {{ radiologi?.relmasterpemeriksaan?.rs2 }}</q-item-label>
                                <q-item-label>Jenis Pemeriksaan Radiologi = {{ radiologi?.relmasterpemeriksaan?.rs3 }}</q-item-label>
                                <q-item-label>Hasil Pemeriksaan Radiologi = {{ item.hasilradiologi[r]?.rs3 }}</q-item-label>
                              </q-item-section>
                            </q-item>
                          </q-list>
                        </q-card-section>

                        <q-separator />
                        <q-card-section
                          v-if="item?.kamaroperasi?.length"
                          class="q-pa-none"
                        >
                          <q-bar class="bg-accent">
                            TINDAKAN OPERASI
                          </q-bar>
                          <q-markup-table
                            separator="vertical"
                            flat
                            bordered
                            dense
                            dark
                          >
                            <thead>
                              <tr>
                                <th class="text-left">
                                  Tanggal
                                </th>
                                <th class="text-right">
                                  Diagnosa
                                </th>
                                <th class="text-right">
                                  Tindakan Operasi
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr
                                v-for="(operasi, l) in item?.kamaroperasi"
                                :key="l"
                                v-ripple
                                clickable
                              >
                                <td
                                  class="text-left ellipsis"
                                  style="max-width: 250px;"
                                >
                                  {{ operasi?.rs3 }}
                                </td>
                                <td
                                  class="text-right"
                                  style="max-width: 150px;"
                                >
                                  {{ operasi?.mastertindakanoperasi?.rs2 }}
                                </td>
                                <td
                                  class="text-right"
                                  style="max-width: 150px;"
                                >
                                  {{ operasi?.mastertindakanoperasi?.rs4 }}
                                </td>
                              </tr>
                            </tbody>
                          </q-markup-table>
                          <q-separator />
                        </q-card-section>

                        <q-separator />
                        <q-card-section
                          v-if="item?.apotekrajal?.length
                            || item?.apotekrajalpolilalu?.length
                            || item?.apotekracikanrajal?.length
                            || item?.apotekracikanrajallalu?.length
                            || item?.apotekranap?.length
                            || item?.apotekranaplalu?.length
                            || item?.apotekranapracikanheder?.length
                            || item?.apotekranapracikanhederlalu?.length"
                          class="q-pa-none"
                        >
                          <q-bar class="bg-accent">
                            PEMBERIAN OBAT
                          </q-bar>
                          <q-markup-table
                            separator="vertical"
                            flat
                            bordered
                            dense
                            dark
                          >
                            <thead>
                              <tr>
                                <th class="text-left">
                                  Tanggal
                                </th>
                                <th class="text-right">
                                  Obat
                                </th>
                                <th class="text-right">
                                  Jumlah
                                </th>
                              </tr>
                            </thead>
                            <tr
                              v-for="(apotekranap, lxx) in item?.apotekranap"
                              :key="lxx"
                            >
                              <td
                                class="text-left ellipsis"
                                style="max-width: 250px;"
                              >
                                {{ apotekranap?.rs3 }}
                              </td>
                              <td
                                class="text-right"
                                style="max-width: 150px;"
                              >
                                {{ apotekranap.masterobat?.rs2 }}
                              </td>
                              <td
                                class="text-right"
                                style="max-width: 150px;"
                              >
                                {{ apotekranap?.rs8 }}
                              </td>
                            </tr>
                            <tr
                              v-for="(apotekranaplalu, lx) in item?.apotekranaplalu"
                              :key="lx"
                            >
                              <td
                                class="text-left ellipsis"
                                style="max-width: 250px;"
                              >
                                {{ apotekranaplalu?.rs3 }}
                              </td>
                              <td
                                class="text-right"
                                style="max-width: 150px;"
                              >
                                {{ apotekranaplalu.masterobat?.rs2 }}
                              </td>
                              <td
                                class="text-right"
                                style="max-width: 150px;"
                              >
                                {{ apotekranaplalu?.rs8 }}
                              </td>
                            </tr>
                            <tr
                              v-for="(apotekranapracikanheder, lxx) in item?.apotekranapracikanheder"
                              :key="lxx"
                            >
                              <td
                                class="text-left ellipsis"
                                style="max-width: 250px;"
                              >
                                {{ apotekranapracikanheder?.rs3 }}
                              </td>
                              <td
                                class="text-right"
                                style="max-width: 150px;"
                              >
                                {{ apotekranapracikanheder.apotekranapracikanrinci.masterobat?.rs2 }}
                              </td>
                              <td
                                class="text-right"
                                style="max-width: 150px;"
                              >
                                {{ apotekranapracikanheder.apotekranapracikanrinci.masterobat?.rs8 }}
                              </td>
                            </tr>
                            <tr
                              v-for="(apotekranapracikanhederlalu, lxxx) in item?.apotekranapracikanhederlalu"
                              :key="lxxx"
                            >
                              <td
                                class="text-left ellipsis"
                                style="max-width: 250px;"
                              >
                                {{ apotekranapracikanhederlalu?.rs3 }}
                              </td>
                              <td
                                class="text-right"
                                style="max-width: 150px;"
                              >
                                {{ apotekranapracikanhederlalu.apotekranapracikanrincilalu.masterobat?.rs2 }}
                              </td>
                              <td
                                class="text-right"
                                style="max-width: 150px;"
                              >
                                {{ apotekranapracikanhederlalu.apotekranapracikanrincilalu.masterobat?.rs8 }}
                              </td>
                            </tr>
                          </q-markup-table>
                        </q-card-section>

                        <q-card-section
                          v-if="store?.metaEresep !== null"
                          class="q-pa-none"
                        >
                          <q-bar class="bg-accent">
                            PEMBERIAN OBAT E-RESEP
                          </q-bar>

                          <div v-for="(obats, ob) in store?.metaEresep" :key="ob">
                            <div v-if="obats?.noreg === item?.rs1 && (obats?.flag === '3' || obats?.flag === '4')">
                              <div
                                v-if="obats?.permintaanresep?.length"
                                class="q-pa-sm"
                              >
                                <div>
                                  <q-item-label>
                                    Riwayat Obat Tanggal : <em>{{ humanDate(obats?.tgl) }}</em>
                                  </q-item-label>
                                  <q-item-label class="q-mb-sm">
                                    <div v-if="obats?.dokter?.nama?.length">
                                      <span>Petugas : <em>{{ obats?.dokter?.nama }}</em></span>
                                    </div>
                                    <div v-else>
                                      <span>Petugas : <em>-</em></span>
                                    </div>
                                  </q-item-label>
                                </div>
                                <div class="row items-center q-mb-sm">
                                  <div class="col">
                                    <div class="text-weight-bold">
                                      Non Racikan | {{ obats?.tiperesep }} | {{ obats?.noresep }}
                                    </div>
                                  </div>
                                </div>

                                <q-list
                                  separator
                                  bordered
                                  style="border-color: white;"
                                >
                                  <q-item
                                    v-for="(rinc,j) in obats?.rincian"
                                    :key="rinc"
                                  >
                                    <q-item-section style="width: 20%;">
                                      <div class="row">
                                        <div class="col-1">
                                          {{ j+1 }}
                                        </div>
                                        <div class="col-11">
                                          <div class="row text-weight-bold">
                                            {{ rinc?.mobat?.nama_obat }}
                                          </div>
                                          <div class="row text-italic f-10">
                                            {{ rinc?.kdobat }}
                                          </div>
                                          <div class="row text-weight-bold f-10">
                                            ( {{ rinc?.mobat?.satuan_k }} )
                                          </div>
                                        </div>
                                      </div>
                                    </q-item-section>
                                    <q-item-section
                                      side
                                      style="width:60%"
                                    >
                                      <div class="row items-center full-width">
                                        <div class="col-12">
                                          <div class="row q-mt-sm">
                                            <div class="col-6">
                                              Aturan :
                                            </div>
                                            <div class="col-4">
                                              {{ rinc?.aturan }}
                                            </div>
                                          </div>
                                          <div class="row q-mt-sm">
                                            <div class="col-6">
                                              Jumlah Obat :
                                            </div>
                                            <div class="col-4">
                                              {{ rinc?.jumlah }}
                                            </div>
                                          </div>
                                          <div class="row q-mt-sm">
                                            <div class="col-6">
                                              Konsumsi :
                                            </div>
                                            <div class="col-4">
                                              {{ rinc?.konsumsi }} hari
                                            </div>
                                          </div>
                                          <div class="row q-mt-sm">
                                            <div class="col-6">
                                              keterangan :
                                            </div>
                                            <div class="col-4">
                                              {{ rinc?.keterangan }}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </q-item-section>
                                  </q-item>
                                </q-list>
                              </div>

                              <div
                                v-if="obats?.permintaanracikan?.length"
                                class="q-mt-sm q-pa-sm"
                              >
                                <div class="row items-center">
                                  <div class="col">
                                    <div class="text-weight-bold" v-if="obats?.poli">
                                      Racikan | {{ obats?.tiperesep }} | {{ obats?.noresep }} ({{ obats?.poli?.rs2 }}) | {{ obats?.sistembayar?.rs2 }}
                                    </div>
                                    <div class="text-weight-bold" v-else>
                                      Racikan | {{ obats?.tiperesep }} | {{ obats?.noresep }} ({{ obats?.ruanganranap?.rs2 }}) | {{ obats?.sistembayar?.rs2 }}
                                    </div>
                                  </div>
                                </div>
                                <div
                                  v-for="(rac,r) in obats?.permintaanracikan"
                                  :key="r"
                                >
                                  <div v-if="r === 0">
                                    <div class="row items-center">
                                      <div class="col-shrink q-mr-xs">
                                        {{ rac?.namaracikan }}
                                      </div>
                                      <div class="col-shrink q-mr-xs">
                                        <q-chip
                                          square
                                          class="f-10"
                                          color="primary"
                                          text-color="white"
                                          outline
                                        >
                                          {{ rac?.tiperacikan }}
                                        </q-chip>
                                      </div>
                                      <div class="col-shrink q-mr-xs text-purple text-weight-bold">
                                        Jumlah {{ rac?.jumlahdibutuhkan }}
                                      </div>
                                      <div class="col-shrink q-mr-xs">
                                        ({{ rac?.satuan_racik }})
                                      </div>
                                      <div class="col-shrink q-mr-xs text-italic">
                                        {{ rac.aturan }}
                                      </div>

                                      <div class="col-shrink q-mr-xs">
                                        | Keterangan : {{ rac?.keterangan }}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <q-list
                                  separator
                                  bordered
                                  style="border-color: white;"
                                >
                                  <q-item
                                    v-for="(rincrac, rc) in obats?.rincianracik"
                                    :key="rc"
                                  >
                                    <q-item-section style="width: 20%;">
                                      <div class="row text-weight-bold">
                                        {{ rincrac?.mobat?.nama_obat }}
                                      </div>
                                      <div class="row text-italic f-10">
                                        {{ rincrac?.kdobat }}
                                      </div>
                                      <div class="row text-weight-bold f-10">
                                        ( {{ rincrac?.mobat?.satuan_k }} )
                                      </div>
                                    </q-item-section>
                                    <q-item-section
                                      side
                                      style="width:60%"
                                    >
                                      <div class="row full-width">
                                        <div class="col-12">
                                          <div
                                            v-if="rincrac?.tiperacikan==='DTD'"
                                            class="col"
                                          >
                                            <div class="row q-mt-sm">
                                              <div class="col-6">
                                                Dosis Resep :
                                              </div>
                                              <div class="col-4">
                                                {{ obats?.permintaanracikan[rc]?.dosismaksimum }}
                                              </div>
                                            </div>
                                            <div class="row q-mt-sm">
                                              <div class="col-6">
                                                Dosis Obat :
                                              </div>
                                              <div class="col-4">
                                                {{ obats?.permintaanracikan[rc]?.mobat?.kekuatan_dosis }}
                                              </div>
                                            </div>
                                            <div class="row q-mt-sm">
                                              <div class="col-6">
                                                Jumlah Resep :
                                              </div>
                                              <div class="col-4">
                                                {{ obats?.permintaanracikan[rc]?.jumlah }}
                                              </div>
                                            </div>
                                            <div class="row q-mt-sm">
                                              <div class="col-6">
                                                Keterangan :
                                              </div>
                                              <div class="col-4">
                                                {{ obats?.permintaanracikan[rc]?.keteranganx }}
                                              </div>
                                            </div>
                                          </div>
                                          <div
                                            v-else
                                            class="col"
                                          >
                                            <div class="row q-mt-sm">
                                              <div class="col-6">
                                                Jumlah Resep :
                                              </div>
                                              <div class="col-4">
                                                {{ items?.permintaanracikan[rc]?.jumlah }}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </q-item-section>
                                  </q-item>
                                </q-list>
                              </div>
                              <hr style="border-color: grey">
                            </div>
                          </div>
                        </q-card-section>

                        <q-card-section
                          v-if="item?.dokumenluar?.length"
                          class="q-pa-none"
                          flat
                          bordered
                          square
                          dark
                        >
                          <q-bar class="bg-accent">
                            <div>DOKUMEN</div>
                          </q-bar>
                          <q-list
                            dark
                            separator
                          >
                            <div class="image-row">
                              <div
                                v-for="(image, index) in item?.dokumenluar"
                                :key="index"
                                class="image-container"
                              >
                                <q-img
                                  :src="pathImg + image.url"
                                  class="image"
                                >
                                  <div class="absolute-bottom">
                                    <div class="column items-center justify-between">
                                      <q-btn
                                        class="gt-xs"
                                        size="md"
                                        color="yellow"
                                        flat
                                        dense
                                        round
                                        icon="icon-mat-visibility"
                                        :href="pathImg + image?.url"
                                        target="_blank"
                                      />
                                    </div>
                                    <div>Dokumen : {{ image?.nama }}</div>
                                    <div>Diinput Oleh : {{ image?.pegawai?.nama }}</div>
                                  </div>
                                </q-img>
                              </div>
                            </div>
                          </q-list>
                        </q-card-section>
                      </q-list>
                    </q-card>
                  </q-expansion-item>
                </div>
                <div
                  v-else
                  class="column flex-center"
                  style="min-height: 860px;"
                >
                  MAAF ... DATA HISTORY PASIEN RAWAT INAP BELUM ADA
                </div>
              </q-list>
            </q-scroll-area>
          </q-tab-panel>
          <q-tab-panel
            name="IGD"
            class="full-height q-pa-none"
          >
            <q-scroll-area style="height:calc(100% - 50px)">
              <q-list
                v-if="store?.items?.length"
                bordered
                separator
              >
                <div v-if="filteredItems?.length">
                  <q-expansion-item
                    v-for="(item, i) in filteredItems"
                    :key="i"
                    expand-separator
                    :label="item?.ruangan + ' | ' + item?.rs1 + ' | DPJP : ' + item?.dpjp"
                    :caption="tanggal(item?.tanggal)"
                  >
                    <q-card dark>
                      <q-separator />
                      <q-card-section class="q-pa-none">
                        <div v-if="item?.anamnesis.length">
                          <q-bar class="bg-accent">
                            <div>ANAMNESIS</div>
                          </q-bar>
                          <q-list dark>
                            <q-item
                              v-for="(anamnesis, a) in item?.anamnesis"
                              :key="a"
                            >
                              <q-item-section>
                                <q-item-label>Keluhan Utama</q-item-label>
                                <q-item-label
                                  caption
                                  lines="2"
                                >
                                  {{ anamnesis?.rs4 }}
                                </q-item-label>
                                <q-item-label>Riwayat Penyakit (Sekarang)</q-item-label>
                                <q-item-label
                                  caption
                                  lines="2"
                                >
                                  {{ anamnesis?.riwayatpenyakitsekarang }}
                                </q-item-label>
                                <q-item-label>Riwayat Penyakit</q-item-label>
                                <q-item-label
                                  caption
                                  lines="2"
                                >
                                  {{ anamnesis?.riwayatpenyakit }}
                                </q-item-label>
                                <q-item-label>Riwayat Alergi</q-item-label>
                                <q-item-label
                                  caption
                                  lines="2"
                                >
                                  {{ anamnesis?.riwayatalergi }}
                                </q-item-label>
                                <q-item-label>Reaksi berupa</q-item-label>
                                <q-item-label
                                  caption
                                  lines="2"
                                >
                                  {{ anamnesis?.keteranganalergi }}
                                </q-item-label>
                                <q-item-label>Riwayat Pengobatan</q-item-label>
                                <q-item-label
                                  caption
                                  lines="2"
                                >
                                  {{ anamnesis?.riwayatpengobatan }}
                                </q-item-label>
                                <q-item-label>Penurunan Berat Badan</q-item-label>
                                <q-item-label
                                  caption
                                  lines="2"
                                >
                                  {{ anamnesis?.skreeninggizi == 0 ? "Tidak" : "Ya" }}
                                </q-item-label>
                                <q-item-label>Asupan Makan Berkurang</q-item-label>
                                <q-item-label
                                  caption
                                  lines="2"
                                >
                                  {{ anamnesis?.asupanmakan == 0 ? "Tidak" : "Ya" }}
                                </q-item-label>
                                <q-item-label>Kondisi Khusus</q-item-label>
                                <q-item-label
                                  caption
                                  lines="2"
                                >
                                  {{ anamnesis?.kondisikhusus }}
                                </q-item-label>
                                <q-item-label>Score Nyeri</q-item-label>
                                <q-item-label
                                  caption
                                  lines="2"
                                >
                                  {{ anamnesis?.scorenyeri }} ( {{ anamnesis?.keteranganscorenyeri }} )
                                </q-item-label>
                              </q-item-section>
                            </q-item>
                          </q-list>
                        </div>
                        <div v-else>
                          <q-bar class="bg-accent">
                            <div>ANAMNESA tidak ada</div>
                          </q-bar>
                        </div>
                      </q-card-section>
                      <q-card-section
                        v-if="item?.pemeriksaanfisik?.length"
                        flat
                        bordered
                        square
                        dark
                      />
                      <q-list separator>
                        <q-bar class="bg-accent">
                          <div>PEMERIKSAAN FISIK</div>
                        </q-bar>
                        <!-- <transition-group name="list"> -->
                        <div
                          v-for="(pemeriksaanfisik, f) in item?.pemeriksaanfisik"
                          :key="f"
                        >
                          <!-- NADI-->
                          <q-item
                            v-ripple
                            class="q-pa-xs list-move"
                            dark
                            clickable
                          >
                            <q-item-section avatar>
                              <q-icon
                                :color="nadi(pemeriksaanfisik?.rs4).color"
                                name="icon-my-monitor_heart"
                                size="lg"
                              />
                            </q-item-section>
                            <q-item-section class="q-pa-xs">
                              <q-item-label :class="`text-h4 text-${nadi(pemeriksaanfisik?.rs4).color}`">
                                {{ pemeriksaanfisik?.rs4 }}
                              </q-item-label>
                            </q-item-section>
                            <q-item-section side>
                              <q-item-label class="text-right f-10">
                                N (HR)
                              </q-item-label>
                              <q-item-label class="text-right f-10">
                                {{ nadi(pemeriksaanfisik?.rs4).res }}
                              </q-item-label>
                            </q-item-section>
                          </q-item>
                          <q-separator
                            dark
                            inset
                          />
                          <q-item
                            v-ripple
                            class="q-pa-xs list-move"
                            dark
                            clickable
                          >
                            <q-item-section avatar>
                              <q-icon
                                color="white"
                                name="icon-my-local_hospital"
                                size="lg"
                              />
                            </q-item-section>
                            <q-item-section class="q-pa-xs">
                              <q-item-label :class="`text-h4 text-white`">
                                {{ pemeriksaanfisik?.pernapasan }}
                              </q-item-label>
                            </q-item-section>
                            <q-item-section side>
                              <q-item-label class="text-right f-10">
                                RR
                              </q-item-label>
                              <q-item-label class="text-right f-10">
                                -
                              </q-item-label>
                            </q-item-section>
                          </q-item>
                          <q-separator
                            dark
                            inset
                          />
                          <q-item
                            v-ripple
                            class="q-pa-xs list-move"
                            dark
                            clickable
                          >
                            <q-item-section avatar>
                              <q-icon
                                :color="suhu(pemeriksaanfisik?.suhutubuh).color"
                                name="icon-my-standing-human-body-silhouette-svgrepo-com"
                                size="lg"
                              />
                            </q-item-section>
                            <q-item-section class="q-pa-xs">
                              <q-item-label :class="`text-h4 text-${suhu(item?.suhutubuh).color}`">
                                {{ pemeriksaanfisik?.suhutubuh }}
                              </q-item-label>
                            </q-item-section>
                            <q-item-section side>
                              <q-item-label class="text-right f-10">
                                SUHU TUBUH
                              </q-item-label>
                              <q-item-label class="text-right f-10">
                                {{ suhu(pemeriksaanfisik?.suhutubuh).res }}
                              </q-item-label>
                            </q-item-section>
                          </q-item>
                          <q-separator
                            dark
                            inset
                          />
                          <q-item
                            v-ripple
                            class="q-pa-xs list-move"
                            dark
                            clickable
                          >
                            <q-item-section class="q-pa-xs">
                              <q-item-label :class="`text-h5 `">
                                <span :class="`${tekananDarah(pemeriksaanfisik?.sistole).color}`">{{
                                  pemeriksaanfisik?.sistole }}</span> /
                                <span :class="`${tekananDarahDias(pemeriksaanfisik?.diatole).color}`">{{
                                  pemeriksaanfisik?.diastole }}</span>
                              </q-item-label>
                              <q-item-label class="f-10">
                                <span :class="`${tekananDarah(pemeriksaanfisik?.sistole).color}`">{{
                                  tekananDarah(pemeriksaanfisik?.sistole).res }}</span> /
                                <span :class="`${tekananDarahDias(pemeriksaanfisik?.diastole).color}`">{{
                                  tekananDarahDias(pemeriksaanfisik?.diastole).res }}</span>
                              </q-item-label>
                            </q-item-section>
                            <q-item-section side>
                              <q-item-label class="text-right f-10">
                                TD sys / dias
                              </q-item-label>
                            </q-item-section>
                          </q-item>
                          <!-- STATUS -->
                          <q-separator
                            dark
                            inset
                          />
                          <q-item
                            v-ripple
                            class="q-pa-xs list-move"
                            dark
                            clickable
                          >
                            <q-item-section class="q-pa-xs">
                              <q-item-label lines="2">
                                T Kesadaran : <em>{{ getKesadaran(pemeriksaanfisik?.tingkatkesadaran) ?? '-' }}</em>
                              </q-item-label>
                              <q-item-label lines="2">
                                Status Psikologis : <em>{{ pemeriksaanfisik?.statuspsikologis ?? '-' }}</em>
                              </q-item-label>
                              <q-item-label lines="2">
                                Ekonomi : <em>{{ pemeriksaanfisik?.sosialekonomi ?? '-' }}</em>
                              </q-item-label>
                              <q-item-label lines="2">
                                Spiritual : <em>{{ pemeriksaanfisik?.spiritual ?? '-' }}</em>
                              </q-item-label>
                              <q-item-label lines="2">
                                kesadaran : <em>{{ pemeriksaanfisik?.kesadaran ?? '-' }}</em>
                              </q-item-label>
                            </q-item-section>
                          </q-item>

                          <!-- KHUSUS PARU POL018-->
                          <q-separator
                            dark
                            inset
                          />
                          <q-item
                            v-ripple
                            class="q-pa-xs list-move"
                            dark
                            clickable
                          >
                            <q-item-section class="q-pa-xs">
                              <q-item-label lines="2">
                                Inspeksi : <em>{{ pemeriksaanfisik?.inspeksi ?? '-' }}</em>
                              </q-item-label>
                              <q-item-label lines="2">
                                Palpasi : <em>{{ pemeriksaanfisik?.palpasi ?? '-' }}</em>
                              </q-item-label>
                              <q-item-label lines="2">
                                Perkusi Dada Kanan : <em>{{ pemeriksaanfisik?.perkusidadakanan ?? '-' }}</em>
                              </q-item-label>
                              <q-item-label lines="2">
                                Perkusi Dada Kiri : <em>{{ pemeriksaanfisik?.perkusidadakiri ?? '-' }}</em>
                              </q-item-label>
                              <q-item-label lines="2">
                                Suara Nafas Dasar : <em>{{ pemeriksaanfisik?.auskultasisuaradasar ?? '-' }}</em>
                              </q-item-label>
                              <q-item-label lines="2">
                                Suara Nafas Tambahan (Kanan) : <em>{{
                                  pemeriksaanfisik?.auskultasisuaratambahankanan ?? '-' }}</em>
                              </q-item-label>
                              <q-item-label lines="2">
                                Suara Nafas Tambahan (Kiri) : <em>{{ pemeriksaanfisik?.auskultasisuaratambahankiri ??
                                  '-'
                                }}</em>
                              </q-item-label>
                            </q-item-section>
                          </q-item>
                        </div>
                        <!-- </transition-group> -->
                        <q-card-section
                          v-if="item?.diagnosa?.length"
                          class="q-pa-none"
                          flat
                          bordered
                          square
                          dark
                        >
                          <q-bar class="bg-accent">
                            <div>DIAGNOSA</div>
                          </q-bar>
                          <q-list
                            dark
                            separator
                          >
                            <q-item
                              v-for="(diagnosa, d) in item?.diagnosa"
                              :key="d"
                              v-ripple
                              clickable
                            >
                              <q-item-section>
                                <q-item-label>Kasus = {{ diagnosa?.rs7 }}</q-item-label>
                                <q-item-label
                                  caption
                                  lines="2"
                                />
                                Jenis Diagnosa = {{ diagnosa?.rs4 }}
                                <q-item-label>
                                  Diagnosa = {{ diagnosa?.masterdiagnosa?.rs4 }} ( {{ diagnosa?.rs3 }}
                                  )
                                </q-item-label>
                                <q-item-label
                                  caption
                                  lines="2"
                                />
                                Keterangan = {{ diagnosa?.rs6 }}
                              </q-item-section>
                            </q-item>
                          </q-list>
                        </q-card-section>
                        <q-separator />

                        <q-card-section
                          v-if="item?.tindakan?.length"
                          class="q-pa-none"
                          flat
                          bordered
                          square
                          dark
                        >
                          <q-bar class="bg-accent">
                            <div>TINDAKAN</div>
                          </q-bar>
                          <q-list
                            dark
                            separator
                          >
                            <q-item
                              v-for="(tindakan, tin) in item?.tindakan"
                              :key="tin"
                              v-ripple
                              clickable
                            >
                              <q-item-section>
                                <q-item-label
                                  caption
                                  lines="2"
                                />
                                {{ tin + 1 }}. {{ tindakan?.mastertindakan?.rs2 }}
                                <q-item-label
                                  caption
                                  lines="2"
                                />
                                keterangan = {{ tindakan?.rs20 }}
                                <div
                                  v-if="tindakan?.gambardokumens.length > 0"
                                  class="image-row"
                                >
                                  <div
                                    v-for="(image, index) in tindakan?.gambardokumens"
                                    :key="index"
                                    class="image-container"
                                  >
                                    <q-img
                                      :src="pathImg + image.url"
                                      class="image"
                                    >
                                      <div class="absolute-bottom">
                                        <div class="column items-center justify-between">
                                          <q-btn
                                            class="gt-xs"
                                            size="md"
                                            color="yellow"
                                            flat
                                            dense
                                            round
                                            icon="icon-mat-visibility"
                                            :href="pathImg + image?.url"
                                            target="_blank"
                                          />
                                        </div>
                                      </div>
                                    </q-img>
                                  </div>
                                </div>
                              </q-item-section>
                            </q-item>
                          </q-list>
                        </q-card-section>
                        <q-separator />

                        <q-card-section
                          v-if="item?.laborat?.length || item?.laborats?.length"
                          class="q-pa-none"
                        >
                          <q-bar class="bg-accent">
                            PEMERIKSAAN LABORAT
                          </q-bar>
                          <q-markup-table
                            separator="vertical"
                            flat
                            bordered
                            dense
                            dark
                          >
                            <thead>
                              <tr>
                                <th class="text-left">
                                  Nama Pemeriksaan
                                </th>
                                <th class="text-left">
                                  Kelompok Pemeriksaan
                                </th>
                                <th class="text-left">
                                  Satuan Normal
                                </th>
                                <th class="text-right">
                                  Hasil
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr
                                v-for="(lab, l) in item?.laborat"
                                :key="l"
                                v-ripple
                                clickable
                              >
                                <td
                                  class="text-left ellipsis"
                                  style="max-width: 250px;"
                                >
                                  {{ lab?.pemeriksaanlab?.rs2 }}
                                </td>
                                <td
                                  class="text-right"
                                  style="max-width: 150px;"
                                >
                                  {{ lab?.pemeriksaanlab?.rs21 }}
                                </td>
                                <td
                                  class="text-right"
                                  style="max-width: 150px;"
                                >
                                  {{ lab?.pemeriksaanlab?.rs22 }}
                                </td>
                                <td
                                  v-if="lab?.rs27 === ''"
                                  style="max-width: 150px;"
                                >
                                  <q-item-label class="text-right">
                                    {{ lab?.rs21 }}
                                  </q-item-label>
                                </td>
                                <td
                                  v-else
                                  style="max-width: 150px;"
                                >
                                  <q-item-label class="text-right">
                                    {{ lab?.rs21 }} ({{ lab?.rs27 }})
                                  </q-item-label>
                                </td>
                              </tr>
                            </tbody>
                          </q-markup-table>
                          <q-separator />
                        </q-card-section>

                        <q-separator />

                        <q-card-section
                          v-if="item?.transradiologi?.length && item?.hasilradiologi?.length"
                          class="q-pa-none"
                          flat
                          bordered
                          square
                          dark
                        >
                          <q-bar class="bg-accent">
                            <div>RADIOLOGI</div>
                          </q-bar>
                          <q-list
                            dark
                            separator
                          >
                            <q-item
                              v-for="(radiologi, r) in item?.transradiologi"
                              :key="r"
                              v-ripple
                              clickable
                            >
                              <q-item-section>
                                <q-item-label>Pemeriksaan = {{ radiologi?.relmasterpemeriksaan?.rs2 }}</q-item-label>
                                <q-item-label>Jenis Pemeriksaan Radiologi = {{ radiologi?.relmasterpemeriksaan?.rs3 }}</q-item-label>
                                <q-item-label>Hasil Pemeriksaan Radiologi = {{ item.hasilradiologi[r]?.rs3 }}</q-item-label>
                              </q-item-section>
                            </q-item>
                          </q-list>
                        </q-card-section>

                        <q-separator />
                        <q-card-section
                          v-if="item?.kamaroperasi?.length"
                          class="q-pa-none"
                        >
                          <q-bar class="bg-accent">
                            TINDAKAN OPERASI
                          </q-bar>
                          <q-markup-table
                            separator="vertical"
                            flat
                            bordered
                            dense
                            dark
                          >
                            <thead>
                              <tr>
                                <th class="text-left">
                                  Tanggal
                                </th>
                                <th class="text-right">
                                  Diagnosa
                                </th>
                                <th class="text-right">
                                  Tindakan Operasi
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr
                                v-for="(operasi, l) in item?.kamaroperasi"
                                :key="l"
                                v-ripple
                                clickable
                              >
                                <td
                                  class="text-left ellipsis"
                                  style="max-width: 250px;"
                                >
                                  {{ operasi?.rs3 }}
                                </td>
                                <td
                                  class="text-right"
                                  style="max-width: 150px;"
                                >
                                  {{ operasi?.mastertindakanoperasi?.rs2 }}
                                </td>
                                <td
                                  class="text-right"
                                  style="max-width: 150px;"
                                >
                                  {{ operasi?.mastertindakanoperasi?.rs4 }}
                                </td>
                              </tr>
                            </tbody>
                          </q-markup-table>
                          <q-separator />
                        </q-card-section>

                        <q-separator />
                        <q-card-section
                          v-if="item?.apotekrajal?.length
                            || item?.apotekrajalpolilalu?.length
                            || item?.apotekracikanrajal?.length
                            || item?.apotekracikanrajallalu?.length
                            || item?.apotekranap?.length
                            || item?.apotekranaplalu?.length
                            || item?.apotekranapracikanheder?.length
                            || item?.apotekranapracikanhederlalu?.length"
                          class="q-pa-none"
                        >
                          <q-bar class="bg-accent">
                            PEMBERIAN OBAT
                          </q-bar>
                          <q-markup-table
                            separator="vertical"
                            flat
                            bordered
                            dense
                            dark
                          >
                            <thead>
                              <tr>
                                <th class="text-left">
                                  Tanggal
                                </th>
                                <th class="text-right">
                                  Obat
                                </th>
                                <th class="text-right">
                                  Jumlah
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr
                                v-for="(apotekrajal, wew) in item?.apotekrajal"
                                :key="wew"
                              >
                                <td
                                  class="text-left ellipsis"
                                  style="max-width: 250px;"
                                >
                                  {{ apotekrajal?.rs3 }}
                                </td>
                                <td
                                  class="text-right"
                                  style="max-width: 150px;"
                                >
                                  {{ apotekrajal.masterobat?.rs2 }}
                                </td>
                                <td
                                  v-if="apotekrajal?.rs27.length > 0 && apotekrajal?.rs28.length > 0"
                                  class="text-right"
                                  style="max-width: 250px;"
                                >
                                  {{ getInteger(apotekrajal?.rs27) + ' X ' + getInteger(apotekrajal?.rs28) }}
                                </td>
                                <td
                                  v-else
                                  class="text-right"
                                  style="max-width: 250px;"
                                >
                                  {{ '-' }}
                                </td>
                                <td
                                  class="text-right"
                                  style="max-width: 150px;"
                                >
                                  {{ apotekrajal?.rs8 }}
                                </td>
                              </tr>
                              <tr
                                v-for="(apotekrajalpolilalu, lll) in item?.apotekrajalpolilalu"
                                :key="lll"
                              >
                                <td
                                  class="text-left ellipsis"
                                  style="max-width: 250px;"
                                >
                                  {{ apotekrajalpolilalu?.rs3 }}
                                </td>
                                <td
                                  class="text-right"
                                  style="max-width: 150px;"
                                >
                                  {{ apotekrajalpolilalu.masterobat?.rs2 }}
                                </td>
                                <td
                                  v-if="apotekrajalpolilalu?.rs27.length > 0 && apotekrajalpolilalu?.rs28.length > 0"
                                  class="text-right"
                                  style="max-width: 250px;"
                                >
                                  {{ getInteger(apotekrajalpolilalu?.rs27) + ' X ' + getInteger(apotekrajalpolilalu?.rs28) }}
                                </td>
                                <td
                                  v-else
                                  class="text-right"
                                  style="max-width: 250px;"
                                >
                                  {{ '-' }}
                                </td>
                                <td
                                  class="text-right"
                                  style="max-width: 150px;"
                                >
                                  {{ apotekrajalpolilalu?.rs8 }}
                                </td>
                              </tr>
                              <tr
                                v-for="(apotekracikanrajal, llll) in item?.apotekracikanrajal"
                                :key="llll"
                              >
                                <td
                                  class="text-left ellipsis"
                                  style="max-width: 250px;"
                                >
                                  {{ apotekracikanrajal?.rs3 }}
                                </td>
                                <td
                                  class="text-right"
                                  style="max-width: 150px;"
                                >
                                  {{ apotekracikanrajal.masterobat?.rs2 }}
                                </td>
                                <td
                                  class="text-left ellipsis"
                                  style="max-width: 250px;"
                                >
                                  {{ '-' }}
                                </td>
                                <td
                                  class="text-right"
                                  style="max-width: 150px;"
                                >
                                  {{ apotekracikanrajal?.rs5 }}
                                </td>
                              </tr>
                              <tr
                                v-for="(apotekracikanrajallalu, llll) in item?.apotekracikanrajallalu"
                                :key="llll"
                              >
                                <td
                                  class="text-left ellipsis"
                                  style="max-width: 250px;"
                                >
                                  {{ apotekracikanrajallalu?.rs3 }}
                                </td>
                                <td
                                  class="text-right"
                                  style="max-width: 150px;"
                                >
                                  {{ apotekracikanrajallalu.masterobat?.rs2 }}
                                </td>
                                <td
                                  class="text-right"
                                  style="max-width: 150px;"
                                >
                                  {{ '-' }}
                                </td>
                                <td
                                  class="text-right"
                                  style="max-width: 150px;"
                                >
                                  {{ apotekracikanrajallalu?.rs5 }}
                                </td>
                              </tr>
                              <tr
                                v-for="(apotekranap, lxx) in item?.apotekranap"
                                :key="lxx"
                              >
                                <td
                                  class="text-left ellipsis"
                                  style="max-width: 250px;"
                                >
                                  {{ apotekranap?.rs3 }}
                                </td>
                                <td
                                  class="text-right"
                                  style="max-width: 150px;"
                                >
                                  {{ apotekranap.masterobat?.rs2 }}
                                </td>
                                <td
                                  class="text-right"
                                  style="max-width: 150px;"
                                >
                                  {{ apotekranap?.rs8 }}
                                </td>
                              </tr>
                              <tr
                                v-for="(apotekranaplalu, lx) in item?.apotekranaplalu"
                                :key="lx"
                              >
                                <td
                                  class="text-left ellipsis"
                                  style="max-width: 250px;"
                                >
                                  {{ apotekranaplalu?.rs3 }}
                                </td>
                                <td
                                  class="text-right"
                                  style="max-width: 150px;"
                                >
                                  {{ apotekranaplalu.masterobat?.rs2 }}
                                </td>
                                <td
                                  class="text-right"
                                  style="max-width: 150px;"
                                >
                                  {{ apotekranaplalu?.rs8 }}
                                </td>
                              </tr>
                              <tr
                                v-for="(apotekranapracikanheder, lxx) in item?.apotekranapracikanheder"
                                :key="lxx"
                              >
                                <td
                                  class="text-left ellipsis"
                                  style="max-width: 250px;"
                                >
                                  {{ apotekranapracikanheder?.rs3 }}
                                </td>
                                <td
                                  class="text-right"
                                  style="max-width: 150px;"
                                >
                                  {{ apotekranapracikanheder.apotekranapracikanrinci.masterobat?.rs2 }}
                                </td>
                                <td
                                  class="text-right"
                                  style="max-width: 150px;"
                                >
                                  {{ apotekranapracikanheder.apotekranapracikanrinci.masterobat?.rs8 }}
                                </td>
                              </tr>
                              <tr
                                v-for="(apotekranapracikanhederlalu, lxxx) in item?.apotekranapracikanhederlalu"
                                :key="lxxx"
                              >
                                <td
                                  class="text-left ellipsis"
                                  style="max-width: 250px;"
                                >
                                  {{ apotekranapracikanhederlalu?.rs3 }}
                                </td>
                                <td
                                  class="text-right"
                                  style="max-width: 150px;"
                                >
                                  {{ apotekranapracikanhederlalu.apotekranapracikanrincilalu.masterobat?.rs2 }}
                                </td>
                                <td
                                  class="text-right"
                                  style="max-width: 150px;"
                                >
                                  {{ apotekranapracikanhederlalu.apotekranapracikanrincilalu.masterobat?.rs8 }}
                                </td>
                              </tr>
                            </tbody>
                          </q-markup-table>
                        </q-card-section>

                        <q-card-section
                          v-if="store?.metaEresep !== null"
                          class="q-pa-none"
                        >
                          <q-bar class="bg-accent">
                            PEMBERIAN OBAT E-RESEP
                          </q-bar>

                          <div v-for="(obats, ob) in store?.metaEresep" :key="ob">
                            <div v-if="obats?.noreg === item?.rs1 && (obats?.flag === '3' || obats?.flag === '4')">
                              <div
                                v-if="obats?.permintaanresep?.length"
                                class="q-pa-sm"
                              >
                                <div>
                                  <q-item-label>
                                    Riwayat Obat Tanggal : <em>{{ humanDate(obats?.tgl) }}</em>
                                  </q-item-label>
                                  <q-item-label class="q-mb-sm">
                                    <div v-if="obats?.dokter?.nama?.length">
                                      <span>Petugas : <em>{{ obats?.dokter?.nama }}</em></span>
                                    </div>
                                    <div v-else>
                                      <span>Petugas : <em>-</em></span>
                                    </div>
                                  </q-item-label>
                                </div>
                                <div class="row items-center q-mb-sm">
                                  <div class="col">
                                    <div class="text-weight-bold">
                                      Non Racikan | {{ obats?.tiperesep }} | {{ obats?.noresep }}
                                    </div>
                                  </div>
                                </div>

                                <q-list
                                  separator
                                  bordered
                                  style="border-color: white;"
                                >
                                  <q-item
                                    v-for="(rinc,j) in obats?.rincian"
                                    :key="rinc"
                                  >
                                    <q-item-section style="width: 20%;">
                                      <div class="row">
                                        <div class="col-1">
                                          {{ j+1 }}
                                        </div>
                                        <div class="col-11">
                                          <div class="row text-weight-bold">
                                            {{ rinc?.mobat?.nama_obat }}
                                          </div>
                                          <div class="row text-italic f-10">
                                            {{ rinc?.kdobat }}
                                          </div>
                                          <div class="row text-weight-bold f-10">
                                            ( {{ rinc?.mobat?.satuan_k }} )
                                          </div>
                                        </div>
                                      </div>
                                    </q-item-section>
                                    <q-item-section
                                      side
                                      style="width:60%"
                                    >
                                      <div class="row items-center full-width">
                                        <div class="col-12">
                                          <div class="row q-mt-sm">
                                            <div class="col-6">
                                              Aturan :
                                            </div>
                                            <div class="col-4">
                                              {{ rinc?.aturan }}
                                            </div>
                                          </div>
                                          <div class="row q-mt-sm">
                                            <div class="col-6">
                                              Jumlah Obat :
                                            </div>
                                            <div class="col-4">
                                              {{ rinc?.jumlah }}
                                            </div>
                                          </div>
                                          <div class="row q-mt-sm">
                                            <div class="col-6">
                                              Konsumsi :
                                            </div>
                                            <div class="col-4">
                                              {{ rinc?.konsumsi }} hari
                                            </div>
                                          </div>
                                          <div class="row q-mt-sm">
                                            <div class="col-6">
                                              keterangan :
                                            </div>
                                            <div class="col-4">
                                              {{ rinc?.keterangan }}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </q-item-section>
                                  </q-item>
                                </q-list>
                              </div>

                              <div
                                v-if="obats?.permintaanracikan?.length"
                                class="q-mt-sm q-pa-sm"
                              >
                                <div class="row items-center">
                                  <div class="col">
                                    <div class="text-weight-bold" v-if="obats?.poli">
                                      Racikan | {{ obats?.tiperesep }} | {{ obats?.noresep }} ({{ obats?.poli?.rs2 }}) | {{ obats?.sistembayar?.rs2 }}
                                    </div>
                                    <div class="text-weight-bold" v-else>
                                      Racikan | {{ obats?.tiperesep }} | {{ obats?.noresep }} ({{ obats?.ruanganranap?.rs2 }}) | {{ obats?.sistembayar?.rs2 }}
                                    </div>
                                  </div>
                                </div>
                                <div
                                  v-for="(rac,r) in obats?.permintaanracikan"
                                  :key="r"
                                >
                                  <div v-if="r === 0">
                                    <div class="row items-center">
                                      <div class="col-shrink q-mr-xs">
                                        {{ rac?.namaracikan }}
                                      </div>
                                      <div class="col-shrink q-mr-xs">
                                        <q-chip
                                          square
                                          class="f-10"
                                          color="primary"
                                          text-color="white"
                                          outline
                                        >
                                          {{ rac?.tiperacikan }}
                                        </q-chip>
                                      </div>
                                      <div class="col-shrink q-mr-xs text-purple text-weight-bold">
                                        Jumlah {{ rac?.jumlahdibutuhkan }}
                                      </div>
                                      <div class="col-shrink q-mr-xs">
                                        ({{ rac?.satuan_racik }})
                                      </div>
                                      <div class="col-shrink q-mr-xs text-italic">
                                        {{ rac.aturan }}
                                      </div>

                                      <div class="col-shrink q-mr-xs">
                                        | Keterangan : {{ rac?.keterangan }}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <q-list
                                  separator
                                  bordered
                                  style="border-color: white;"
                                >
                                  <q-item
                                    v-for="(rincrac, rc) in obats?.rincianracik"
                                    :key="rc"
                                  >
                                    <q-item-section style="width: 20%;">
                                      <div class="row text-weight-bold">
                                        {{ rincrac?.mobat?.nama_obat }}
                                      </div>
                                      <div class="row text-italic f-10">
                                        {{ rincrac?.kdobat }}
                                      </div>
                                      <div class="row text-weight-bold f-10">
                                        ( {{ rincrac?.mobat?.satuan_k }} )
                                      </div>
                                    </q-item-section>
                                    <q-item-section
                                      side
                                      style="width:60%"
                                    >
                                      <div class="row full-width">
                                        <div class="col-12">
                                          <div
                                            v-if="rincrac?.tiperacikan==='DTD'"
                                            class="col"
                                          >
                                            <div class="row q-mt-sm">
                                              <div class="col-6">
                                                Dosis Resep :
                                              </div>
                                              <div class="col-4">
                                                {{ obats?.permintaanracikan[rc]?.dosismaksimum }}
                                              </div>
                                            </div>
                                            <div class="row q-mt-sm">
                                              <div class="col-6">
                                                Dosis Obat :
                                              </div>
                                              <div class="col-4">
                                                {{ obats?.permintaanracikan[rc]?.mobat?.kekuatan_dosis }}
                                              </div>
                                            </div>
                                            <div class="row q-mt-sm">
                                              <div class="col-6">
                                                Jumlah Resep :
                                              </div>
                                              <div class="col-4">
                                                {{ obats?.permintaanracikan[rc]?.jumlah }}
                                              </div>
                                            </div>
                                            <div class="row q-mt-sm">
                                              <div class="col-6">
                                                Keterangan :
                                              </div>
                                              <div class="col-4">
                                                {{ obats?.permintaanracikan[rc]?.keteranganx }}
                                              </div>
                                            </div>
                                          </div>
                                          <div
                                            v-else
                                            class="col"
                                          >
                                            <div class="row q-mt-sm">
                                              <div class="col-6">
                                                Jumlah Resep :
                                              </div>
                                              <div class="col-4">
                                                {{ items?.permintaanracikan[rc]?.jumlah }}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </q-item-section>
                                  </q-item>
                                </q-list>
                              </div>
                              <hr style="border-color: grey">
                            </div>
                          </div>
                        </q-card-section>

                        <q-card-section
                          v-if="item?.dokumenluar?.length"
                          class="q-pa-none"
                          flat
                          bordered
                          square
                          dark
                        >
                          <q-bar class="bg-accent">
                            <div>DOKUMEN</div>
                          </q-bar>
                          <q-list
                            dark
                            separator
                          >
                            <div class="image-row">
                              <div
                                v-for="(image, index) in item?.dokumenluar"
                                :key="index"
                                class="image-container"
                              >
                                <q-img
                                  :src="pathImg + image.url"
                                  class="image"
                                >
                                  <div class="absolute-bottom">
                                    <div class="column items-center justify-between">
                                      <q-btn
                                        class="gt-xs"
                                        size="md"
                                        color="yellow"
                                        flat
                                        dense
                                        round
                                        icon="icon-mat-visibility"
                                        :href="pathImg + image?.url"
                                        target="_blank"
                                      />
                                    </div>
                                    <div>Dokumen : {{ image?.nama }}</div>
                                    <div>Diinput Oleh : {{ image?.pegawai?.nama }}</div>
                                  </div>
                                </q-img>
                              </div>
                            </div>
                          </q-list>
                        </q-card-section>
                      </q-list>
                    </q-card>
                  </q-expansion-item>
                </div>
                <div
                  v-else
                  class="column flex-center"
                  style="min-height: 860px;"
                >
                  MAAF ... DATA HISTORY PASIEN IGD BELUM ADA
                </div>
              </q-list>
            </q-scroll-area>
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
  </div>
</template>

<script setup>

import { dateFullFormat, formatJam, humanDate } from 'src/modules/formatter'
import { useHistoryPasien } from 'src/stores/simrs/pelayanan/poli/historypasien'
import { onMounted, computed } from 'vue'
import { pathImg } from 'src/boot/axios'

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

const emits = defineEmits(['close', 'hapus', 'edit', 'preview'])

const tanggal = (val) => {
  return dateFullFormat(val) + ' ~ ' + formatJam(val)
}

const store = useHistoryPasien()
onMounted(() => {
  store.metaEresep = null
  store.getData(props.pasien)
})

const filteredItems = computed(() => {
  let tabs = 'Poli'
  if (store.tab === 'Rawat Jalan') {
    tabs = 'Poli'
  }
  else if (store.tab === 'Rawat Inap') {
    tabs = 'Ruang'
  }
  else {
    tabs = 'IRD'
  }
  return store.items.filter(item => item.ruangan?.includes(tabs))
})

function nadi (val) {
  const bradikardi = val < 60
  const normal = val >= 61 && val <= 100
  const takikardi = val > 100

  let obj = {
    color: 'teal',
    res: 'Normal'
  }
  if (bradikardi) {
    obj = { color: 'red', res: 'Brakikardi' }
  }
  else if (normal) {
    obj = { color: 'teal', res: 'Normal' }
  }
  else if (takikardi) {
    obj = { color: 'red', res: 'Takikardi' }
  }

  return obj
}

function suhu (val) {
  const hipotermia = val < 35
  const normal = val >= 35 && val < 37
  const pireksia = val >= 37 && val <= 41.1
  const hipertermia = val > 41.1

  let obj = {
    color: 'teal',
    res: 'normal'
  }
  if (hipotermia) {
    obj = { color: 'red', res: 'Hipotermia' }
  }
  else if (normal) {
    obj = { color: 'teal', res: 'Normal' }
  }
  else if (pireksia) {
    obj = { color: 'red', res: 'Pireksia/febris' }
  }
  else if (hipertermia) {
    obj = { color: 'red', res: 'Hipertermia' }
  }

  return obj
}

function getKesadaran (val) {
  const temp = store.optionsTingkatkesadaran.filter(a => a.value === val)
  if (temp.length) {
    return temp[0].label
  }
  else {
    return '-'
  }
}
// eslint-disable-next-line no-unused-vars
function tekananDarah (val) {
  const normal = val >= 100 && val <= 120
  const prahipertensi = val >= 121 && val <= 139
  const hipertensiderajat1 = val >= 140 && val <= 159
  const hipertensiderajat2 = val >= 160

  let obj = {
    color: 'text-teal',
    res: 'normal'
  }
  if (normal) {
    obj = { color: 'text-teal', res: 'Normal' }
  }
  else if (prahipertensi) {
    obj = { color: 'text-red', res: 'Prahipertensi' }
  }
  else if (hipertensiderajat1) {
    obj = { color: 'text-red', res: 'Hipertensi Derajat 1' }
  }
  else if (hipertensiderajat2) {
    obj = { color: 'text-red', res: 'Hipertensi Derajat 2' }
  }
  else {
    obj = { color: 'text-red', res: 'Not Valid' }
  }

  return obj
}

function tekananDarahDias (val) {
  const normal = val >= 60 && val <= 79
  const prahipertensi = val >= 80 && val <= 89
  const hipertensiderajat1 = val >= 90 && val <= 99
  const hipertensiderajat2 = val >= 100

  let obj = {
    color: 'text-teal',
    res: 'normal'
  }
  if (normal) {
    obj = { color: 'text-teal', res: 'Normal' }
  }
  else if (prahipertensi) {
    obj = { color: 'text-red', res: 'Prahipertensi' }
  }
  else if (hipertensiderajat1) {
    obj = { color: 'text-red', res: 'Hipertensi Derajat 1' }
  }
  else if (hipertensiderajat2) {
    obj = { color: 'text-red', res: 'Hipertensi Derajat 2' }
  }
  else {
    obj = { color: 'text-red', res: 'LOW' }
  }

  return obj
}

function getInteger (str) {
  const parts = str.split('.')

  if (parts.length > 1 && parseInt(parts[1]) === 0) {
    return parts[0]
  }

  return str
}

// function arrayToString(val) {
//   const value = val.join(', ')
//   return value
// }
</script>

<style>
.image-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.image-container {
  flex-basis: calc(30% - 5px);
  /* Adjust this value to add spacing between images */
  margin: 10px;
  /* Adjust margin as needed */
}

.image {
height: 300px;
}

table {
  border-collapse: collapse;
  width: 100%;
}
table, th, td {
  border: 1px solid grey;
}

</style>
