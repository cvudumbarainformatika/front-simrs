<template>
  <div class="q-pa-lg">
    <div><b>I. ANAMNESIS (Tambahan) </b></div>
    <q-separator class="q-my-sm" />
    <div class="row  items-center q-mb-xs">
      <div class="col-3">
        Pernah Dirawat
      </div>
      <div class="col-9 flex q-gutter-sm  items-center">
        <div class="col-auto">
          :
        </div>
        <q-radio
          v-for="item in store.yaTidaks"
          :key="item"
          v-model="store.form.pernahDirawat"
          :val="item"
          :label="item"
          dense
          size="xs"
          class="col-auto"
        />
        <div
          v-if="store.form.pernahDirawat==='Ya'"
          class="col q-pl-md full-width"
        >
          <app-input-simrs
            v-model="store.form.indikasiRawat"
            label="Indikasi Rawat"
            class-tambahan="full-width"
          />
        </div>
      </div>
    </div>
    <div class="row  items-center q-mb-xs">
      <div class="col-3">
        Gizi Ibu
      </div>
      <div class="col-9 flex q-gutter-sm  items-center">
        <div class="col-auto">
          :
        </div>
        <q-radio
          v-for="item in store.baikBuruks"
          :key="item"
          v-model="store.form.giziIbu"
          :val="item"
          :label="item"
          dense
          size="xs"
          class="col-auto"
        />
      </div>
    </div>
    <div class="row q-mb-xs">
      <div class="col-3">
        Kebiasaan Ibu
      </div>
      <div class="col-9 row q-col-gutter-sm">
        <div class="col-auto">
          :
        </div>
        <div class="col row full-width">
          <div class="flex q-gutter-sm q-mb-xs">
            <q-radio
              v-for="item in store.kebiasaanIbus"
              :key="item"
              v-model="store.form.kebiasaanIbu"
              :val="item"
              :label="item"
              dense
              size="xs"
              class="col-12"
            />
          </div>
          <div
            v-if="store.form.kebiasaanIbu==='Dll'"
            class="col-12"
          >
            <app-input-simrs
              v-model="store.form.kebiasaanIbuDll"
              label="Sebutkan"
              class-tambahan="full-width"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="row  items-center q-mb-xs">
      <div class="col-3">
        Riwayat Transfusi
      </div>
      <div class="col-9 flex q-gutter-sm  items-center">
        <div class="col-auto">
          :
        </div>
        <q-radio
          v-for="item in store.yaTidaks"
          :key="item"
          v-model="store.form.riwayatTransfusi"
          :val="item"
          :label="item"
          dense
          size="xs"
          class="col-auto"
        />
        <div
          v-if="store.form.riwayatTransfusi==='Ya'"
          class="col q-pl-md full-width"
        >
          <app-input-simrs
            v-model="store.form.transfusiKapan"
            label="Kapan ? "
            class-tambahan="full-width"
          />
        </div>
      </div>
    </div>

    <div
      v-if="store.form.riwayatTransfusi==='Ya'"
      class="row  items-center q-mb-xs"
    >
      <div class="col-3">
        Timbul Reaksi?
      </div>
      <div class="col-9 flex q-gutter-sm  items-center">
        <div class="col-auto">
          :
        </div>
        <q-radio
          v-for="item in store.yaTidaks"
          :key="item"
          v-model="store.form.reaksi"
          :val="item"
          :label="item"
          dense
          size="xs"
          class="col-auto"
        />
        <div
          v-if="store.form.reaksi==='Ya'"
          class="col q-pl-md full-width"
        >
          <app-input-simrs
            v-model="store.form.reaksiYa"
            label="Sebutkan ... "
            class-tambahan="full-width"
          />
        </div>
      </div>
    </div>

    <div class="row  items-center q-mb-xs">
      <div class="col-3">
        Riwayat Imunisasi
      </div>
      <div class="col-9 flex q-gutter-sm  items-center">
        <div class="col-auto">
          :
        </div>
        <q-radio
          v-for="item in store.yaTidaks"
          :key="item"
          v-model="store.form.riwayatImunisasi"
          :val="item"
          :label="item"
          dense
          size="xs"
          class="col-auto"
        />
        <div
          v-if="store.form.riwayatImunisasi==='Ya'"
          class="col q-pl-md full-width"
        >
          <app-input-simrs
            v-model="store.form.imunisasiKapan"
            label="Sebutkan"
            class-tambahan="full-width"
          />
        </div>
      </div>
    </div>

    <q-separator class="q-my-sm" />
    <div><b>II. PEMERIKSAAN FISIK (Tambahan) </b></div>
    <q-separator class="q-my-sm" />

    <div class="row  items-center q-mb-xs">
      <div class="col-3">
        Keadaan Umum
      </div>
      <div class="col-9 flex q-gutter-sm  items-center">
        <div class="col-auto">
          :
        </div>
        <q-radio
          v-for="item in store.keadaanUmums"
          :key="item"
          v-model="store.form.keadaanUmum"
          :val="item"
          :label="item"
          dense
          size="xs"
          class="col-auto"
        />
      </div>
    </div>

    <div class="row  items-center q-mb-xs">
      <div class="col-3">
        GOL DARAH / Rh (Bayi)
      </div>
      <div class="col-9 flex q-gutter-sm  items-center">
        <div class="col-auto">
          :
        </div>
        <q-radio
          v-for="item in store.golDarahs"
          :key="item"
          v-model="store.form.golDarahBayi"
          :val="item"
          :label="item"
          dense
          size="xs"
          class="col-auto"
        />
        <div
          class="col q-pl-md full-width"
        >
          <div class="flex items-center q-gutter-sm">
            <div>Rh</div>
            <div>:</div>
            <q-radio
              v-for="item in store.positifNegatifs"
              :key="item"
              v-model="store.form.golDarahBayiRh"
              :val="item"
              :label="item"
              dense
              size="xs"
              class="col-auto"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="row  items-center q-mb-xs">
      <div class="col-3">
        GOL DARAH / Rh (Ibu)
      </div>
      <div class="col-9 flex q-gutter-sm  items-center">
        <div class="col-auto">
          :
        </div>
        <q-radio
          v-for="item in store.golDarahs"
          :key="item"
          v-model="store.form.golDarahIbu"
          :val="item"
          :label="item"
          dense
          size="xs"
          class="col-auto"
        />
        <div
          class="col q-pl-md full-width"
        >
          <div class="flex items-center q-gutter-sm">
            <div>Rh</div>
            <div>:</div>
            <q-radio
              v-for="item in store.positifNegatifs"
              :key="item"
              v-model="store.form.golDarahIbuRh"
              :val="item"
              :label="item"
              dense
              size="xs"
              class="col-auto"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="row  items-center q-mb-xs">
      <div class="col-3">
        GOL DARAH / Rh (Ayah)
      </div>
      <div class="col-9 flex q-gutter-sm  items-center">
        <div class="col-auto">
          :
        </div>
        <q-radio
          v-for="item in store.golDarahs"
          :key="item"
          v-model="store.form.golDarahAyah"
          :val="item"
          :label="item"
          dense
          size="xs"
          class="col-auto"
        />
        <div
          class="col q-pl-md full-width"
        >
          <div class="flex items-center q-gutter-sm">
            <div>Rh</div>
            <div>:</div>
            <q-radio
              v-for="item in store.positifNegatifs"
              :key="item"
              v-model="store.form.golDarahAyahRh"
              :val="item"
              :label="item"
              dense
              size="xs"
              class="col-auto"
            />
          </div>
        </div>
      </div>
    </div>
    <q-separator class="q-my-xs" />
    <div><em>Pengkajian persistem </em></div>

    <table>
      <tr>
        <td
          width="20%"
          class="text-weight-bold"
        >
          System Susunan Syaraf Pusat
        </td>
        <td>
          <div class="row  items-center q-mb-xs">
            <div class="col-2">
              Gerak Bayi
            </div>
            <div class="col-10 flex q-gutter-sm  items-center">
              <div class="col-auto">
                :
              </div>
              <q-radio
                v-for="item in store.aktifs"
                :key="item"
                v-model="store.form.gerakBayi"
                :val="item"
                :label="item"
                dense
                size="xs"
                class="col-auto"
              />
            </div>
          </div>
          <q-separator />
          <div class="row q-mb-xs">
            <div class="col-2">
              UUB
            </div>
            <div class="col-9 row q-col-gutter-sm">
              <div class="col-auto">
                :
              </div>
              <div class="col row full-width">
                <div class="flex q-gutter-sm q-mb-xs">
                  <q-radio
                    v-for="item in store.uubs"
                    :key="item"
                    v-model="store.form.uub"
                    :val="item"
                    :label="item"
                    dense
                    size="xs"
                    class="col-12"
                  />
                </div>
                <div
                  v-if="store.form.uub==='Lain-lain'"
                  class="col-12"
                >
                  <app-input-simrs
                    v-model="store.form.uubLain"
                    label="Sebutkan"
                    class-tambahan="full-width"
                  />
                </div>
              </div>
            </div>
          </div>
          <q-separator />
          <div class="row q-mb-xs">
            <div class="col-2">
              Kejang
            </div>
            <div class="col-9 row q-col-gutter-sm">
              <div class="col-auto">
                :
              </div>
              <div class="col row full-width">
                <div class="flex q-gutter-sm q-mb-xs">
                  <q-radio
                    v-for="item in store.adas"
                    :key="item"
                    v-model="store.form.kejang"
                    :val="item"
                    :label="item"
                    dense
                    size="xs"
                    class="col-12"
                  />
                </div>
                <div
                  v-if="store.form.kejang==='Ada'"
                  class="col-12"
                >
                  <app-input-simrs
                    v-model="store.form.kejangAda"
                    label="Sebutkan"
                    class-tambahan="full-width"
                  />
                </div>
              </div>
            </div>
          </div>
          <q-separator />
          <div class="row q-mb-xs">
            <div class="col-2">
              Refleks
            </div>
            <div class="col-9 row q-col-gutter-sm">
              <div class="col-auto">
                :
              </div>
              <div class="col row full-width">
                <div class="flex q-gutter-sm q-mb-xs">
                  <q-checkbox
                    v-for="item in store.refleks"
                    :key="item"
                    v-model="store.form.refleks"
                    :val="item"
                    :label="item"
                    dense
                    size="xs"
                    class="col-12"
                  />
                </div>
                <div
                  v-if="store.form.refleks?.includes('Lain-lain')"
                  class="col-12"
                >
                  <app-input-simrs
                    v-model="store.form.refleksLain"
                    label="Sebutkan"
                    class-tambahan="full-width"
                  />
                </div>
              </div>
            </div>
          </div>
          <q-separator />
          <div class="row q-mb-xs">
            <div class="col-2">
              Tangis Bayi
            </div>
            <div class="col-9 row q-col-gutter-sm">
              <div class="col-auto">
                :
              </div>
              <div class="col row full-width">
                <div class="flex q-gutter-sm q-mb-xs">
                  <q-checkbox
                    v-for="item in store.tangis"
                    :key="item"
                    v-model="store.form.tangisBayi"
                    :val="item"
                    :label="item"
                    dense
                    size="xs"
                    class="col-12"
                  />
                </div>
                <div
                  v-if="store.form.tangisBayi?.includes('Lain-lain')"
                  class="col-12"
                >
                  <app-input-simrs
                    v-model="store.form.tangisBayiLain"
                    label="Sebutkan"
                    class-tambahan="full-width"
                  />
                </div>
              </div>
            </div>
          </div>
        </td>
      </tr>

      <tr>
        <td
          width="20%"
          class="text-weight-bold"
        >
          Sistem Penglihatan
        </td>
        <td>
          <div class="row  items-center q-mb-xs">
            <div class="col-2">
              Posisi Mata
            </div>
            <div class="col-10 flex q-gutter-sm  items-center">
              <div class="col-auto">
                :
              </div>
              <q-radio
                v-for="item in store.matas"
                :key="item"
                v-model="store.form.posisiMata"
                :val="item"
                :label="item"
                dense
                size="xs"
                class="col-auto"
              />
            </div>
          </div>
          <q-separator />
          <div class="row  items-center q-mb-xs">
            <div class="col-2">
              Besar Pupil
            </div>
            <div class="col-10 flex q-gutter-sm  items-center">
              <div class="col-auto">
                :
              </div>
              <q-radio
                v-for="item in store.pupils"
                :key="item"
                v-model="store.form.besarPupil"
                :val="item"
                :label="item"
                dense
                size="xs"
                class="col-auto"
              />
            </div>
          </div>
          <q-separator />

          <div class="row q-mb-xs">
            <div class="col-2">
              Kelopak Mata
            </div>
            <div class="col-9 row q-col-gutter-sm">
              <div class="col-auto">
                :
              </div>
              <div class="col row full-width">
                <div class="flex q-gutter-sm q-mb-xs">
                  <q-radio
                    v-for="item in store.kelopaks"
                    :key="item"
                    v-model="store.form.kelopakMata"
                    :val="item"
                    :label="item"
                    dense
                    size="xs"
                    class="col-12"
                  />
                </div>
                <div
                  v-if="store.form.kelopakMata==='Lain-lain'"
                  class="col-12"
                >
                  <app-input-simrs
                    v-model="store.form.kelopakMataLain"
                    label="Sebutkan"
                    class-tambahan="full-width"
                  />
                </div>
              </div>
            </div>
          </div>
          <q-separator />
          <div class="row q-mb-xs">
            <div class="col-2">
              Konjuntiva
            </div>
            <div class="col-9 row q-col-gutter-sm">
              <div class="col-auto">
                :
              </div>
              <div class="col row full-width">
                <div class="flex q-gutter-sm q-mb-xs">
                  <q-radio
                    v-for="item in store.konjungtivas"
                    :key="item"
                    v-model="store.form.konjungtiva"
                    :val="item"
                    :label="item"
                    dense
                    size="xs"
                    class="col-12"
                  />
                </div>
                <div
                  v-if="store.form.konjungtiva ==='Lain-lain'"
                  class="col-12"
                >
                  <app-input-simrs
                    v-model="store.form.konjungtivaLain"
                    label="Sebutkan"
                    class-tambahan="full-width"
                  />
                </div>
              </div>
            </div>
          </div>
          <q-separator />
          <div class="row q-mb-xs">
            <div class="col-2">
              Sklera
            </div>
            <div class="col-9 row q-col-gutter-sm">
              <div class="col-auto">
                :
              </div>
              <div class="col row full-width">
                <div class="flex q-gutter-sm q-mb-xs">
                  <q-radio
                    v-for="item in store.skleras"
                    :key="item"
                    v-model="store.form.sklera"
                    :val="item"
                    :label="item"
                    dense
                    size="xs"
                    class="col-12"
                  />
                </div>
                <div
                  v-if="store.form.sklera==='Lain-lain'"
                  class="col-12"
                >
                  <app-input-simrs
                    v-model="store.form.skleraLain"
                    label="Sebutkan"
                    class-tambahan="full-width"
                  />
                </div>
              </div>
            </div>
          </div>
        </td>
      </tr>

      <tr>
        <td
          width="20%"
          class="text-weight-bold"
        >
          Sistem Pendengaran
        </td>
        <td>
          <div class="row q-mb-xs">
            <div class="col-12 row q-col-gutter-sm">
              <div class="col row full-width">
                <div class="flex q-gutter-sm q-mb-xs">
                  <q-radio
                    v-for="item in store.pendengarans"
                    :key="item"
                    v-model="store.form.pendengaran"
                    :val="item"
                    :label="item"
                    dense
                    size="xs"
                    class="col-12"
                  />
                </div>
                <div
                  v-if="store.form.pendengaran==='Lain-lain'"
                  class="col-12"
                >
                  <app-input-simrs
                    v-model="store.form.pendengaranLain"
                    label="Sebutkan"
                    class-tambahan="full-width"
                  />
                </div>
              </div>
            </div>
          </div>
          <q-separator />
        </td>
      </tr>

      <tr>
        <td
          width="20%"
          class="text-weight-bold"
        >
          Sistem Penciuman
        </td>
        <td>
          <div class="row q-mb-xs">
            <div class="col-12 row q-col-gutter-sm">
              <div class="col row full-width">
                <div class="flex q-gutter-sm q-mb-xs">
                  <q-radio
                    v-for="item in store.penciumans"
                    :key="item"
                    v-model="store.form.penciuman"
                    :val="item"
                    :label="item"
                    dense
                    size="xs"
                    class="col-12"
                  />
                </div>
                <div
                  v-if="store.form.penciuman==='Lain-lain'"
                  class="col-12"
                >
                  <app-input-simrs
                    v-model="store.form.penciumanLain"
                    label="Sebutkan"
                    class-tambahan="full-width"
                  />
                </div>
              </div>
            </div>
          </div>
          <q-separator />
        </td>
      </tr>

      <tr>
        <td
          width="20%"
          class="text-weight-bold"
        >
          Sistem Kardiovaskuler
        </td>
        <td>
          <div class="row q-mb-xs">
            <div class="col-2">
              Warna Kulit
            </div>
            <div class="col-9 row q-col-gutter-sm">
              <div class="col-auto">
                :
              </div>
              <div class="col row full-width">
                <div class="flex q-gutter-sm q-mb-xs">
                  <q-radio
                    v-for="item in store.warnaKulits"
                    :key="item"
                    v-model="store.form.warnaKulit"
                    :val="item"
                    :label="item"
                    dense
                    size="xs"
                    class="col-12"
                  />
                </div>
                <div
                  v-if="store.form.warnaKulit==='Sianosis'"
                  class="col-12"
                >
                  <app-input-simrs
                    v-model="store.form.warnaKulitSianosis"
                    label="Sianosis ..... "
                    class-tambahan="full-width"
                  />
                </div>
                <div
                  v-if="store.form.warnaKulit==='Lain-lain'"
                  class="col-12"
                >
                  <app-input-simrs
                    v-model="store.form.warnaKulitLain"
                    label="Sebutkan"
                    class-tambahan="full-width"
                  />
                </div>
              </div>
            </div>
          </div>
          <q-separator />
          <div class="row q-mb-xs">
            <div class="col-2">
              Denyut Nadi
            </div>
            <div class="col-9 row q-col-gutter-sm">
              <div class="col-auto">
                :
              </div>
              <div class="col row full-width">
                <div class="flex q-gutter-sm q-mb-xs">
                  <q-radio
                    v-for="item in store.teraturs"
                    :key="item"
                    v-model="store.form.denyutNadi"
                    :val="item"
                    :label="item"
                    dense
                    size="xs"
                    class="col-12"
                  />
                  <div>
                    <app-input-simrs
                      v-model="store.form.denyutNadiFrekwensi"
                      label="Frekwensi .... X/mnt"
                      class-tambahan="full-width"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <q-separator />
          <div class="row q-mb-xs">
            <div class="col-2">
              Sirkulasi
            </div>
            <div class="col-9 row q-col-gutter-sm">
              <div class="col-auto">
                :
              </div>
              <div class="col row full-width">
                <div class="flex q-gutter-sm q-mb-xs">
                  <q-radio
                    v-for="item in store.sirkulasis"
                    :key="item"
                    v-model="store.form.sirkulasi"
                    :val="item"
                    :label="item"
                    dense
                    size="xs"
                    class="col-12"
                  />
                  <div
                    v-if="store.form.sirkulasi==='CRT'"
                  >
                    <app-input-simrs
                      v-model="store.form.sirkulasiCrt"
                      label="CRT ... detik"
                      class-tambahan="full-width"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <q-separator />
          <div class="row q-mb-xs">
            <div class="col-2">
              Pulsasi
            </div>
            <div class="col-9 row q-col-gutter-sm">
              <div class="col-auto">
                :
              </div>
              <div class="col row full-width">
                <div class="flex q-gutter-sm q-mb-xs">
                  <q-radio
                    v-for="item in store.pulsasis"
                    :key="item"
                    v-model="store.form.pulsasi"
                    :val="item"
                    :label="item"
                    dense
                    size="xs"
                    class="col-12"
                  />
                </div>
                <div
                  v-if="store.form.pulsasi==='Ederma'"
                  class="col-12"
                >
                  <app-input-simrs
                    v-model="store.form.pulsasiLokasi"
                    label="Lokasi Ederma...."
                    class-tambahan="full-width"
                  />
                </div>
                <div
                  v-if="store.form.pulsasi==='Lain-lain'"
                  class="col-12"
                >
                  <app-input-simrs
                    v-model="store.form.pulsasiLain"
                    label="Sebutkan Lain-lain"
                    class-tambahan="full-width"
                  />
                </div>
              </div>
            </div>
          </div>
        </td>
      </tr>

      <tr>
        <td
          width="20%"
          class="text-weight-bold"
        >
          Sistem Pernapasan
        </td>
        <td>
          <div class="row  items-center q-mb-xs">
            <div class="col-12 row q-col-gutter-xs">
              <app-input-simrs
                v-model="store.form.polaNafasNormal"
                label="Pola Nafas Normal /mnt"
                class-tambahan="col-4"
              />
              <app-input-simrs
                v-model="store.form.bradipnea"
                label="Pola Nafas Bradipnea / mnt"
                class-tambahan="col-4"
              />
              <app-input-simrs
                v-model="store.form.tachipnea"
                label="Pola Nafas Tachipnea / mnt"
                class-tambahan="col-4"
              />
            </div>
          </div>
          <q-separator />
          <div class="row q-mb-xs">
            <div class="col-2">
              Jenis Pernapasan
            </div>
            <div class="col-9 row q-col-gutter-sm">
              <div class="col-auto">
                :
              </div>
              <div class="col row full-width">
                <div class="flex q-gutter-sm q-mb-xs">
                  <q-radio
                    v-for="item in store.jenisPernapasans"
                    :key="item"
                    v-model="store.form.jenisPernapasan"
                    :val="item"
                    :label="item"
                    dense
                    size="xs"
                    class="col-12"
                  />
                </div>
                <div
                  v-if="store.form.jenisPernapasan==='Alat Bantu Napas'"
                  class="col-12"
                >
                  <app-input-simrs
                    v-model="store.form.alatBantuPernapasan"
                    label="Sebutkan"
                    class-tambahan="full-width"
                  />
                </div>
              </div>
            </div>
          </div>
          <q-separator />
          <div class="row q-mb-xs">
            <div class="col-2">
              Irama Napas
            </div>
            <div class="col-9 row q-col-gutter-sm">
              <div class="col-auto">
                :
              </div>
              <div class="col row full-width">
                <div class="flex q-gutter-sm q-mb-xs">
                  <q-radio
                    v-for="item in store.teraturs"
                    :key="item"
                    v-model="store.form.iramaPernapasan"
                    :val="item"
                    :label="item"
                    dense
                    size="xs"
                    class="col-12"
                  />
                </div>
              </div>
            </div>
          </div>
          <q-separator />
          <div class="row q-mb-xs">
            <div class="col-2">
              Retraksi
            </div>
            <div class="col-9 row q-col-gutter-sm">
              <div class="col-auto">
                :
              </div>
              <div class="col row full-width">
                <div class="flex q-gutter-sm q-mb-xs">
                  <q-radio
                    v-for="item in store.retraksis"
                    :key="item"
                    v-model="store.form.retraksi"
                    :val="item"
                    :label="item"
                    dense
                    size="xs"
                    class="col-12"
                  />
                </div>
              </div>
            </div>
          </div>
          <q-separator />
          <div class="row q-mb-xs">
            <div class="col-2">
              Air Entri
            </div>
            <div class="col-9 row q-col-gutter-sm">
              <div class="col-auto">
                :
              </div>
              <div class="col row full-width">
                <div class="flex q-gutter-sm q-mb-xs">
                  <q-radio
                    v-for="item in store.airEntris"
                    :key="item"
                    v-model="store.form.airEntri"
                    :val="item"
                    :label="item"
                    dense
                    size="xs"
                    class="col-12"
                  />
                </div>
              </div>
            </div>
          </div>
          <q-separator />
          <div class="row q-mb-xs">
            <div class="col-2">
              Merintih
            </div>
            <div class="col-9 row q-col-gutter-sm">
              <div class="col-auto">
                :
              </div>
              <div class="col row full-width">
                <div class="flex q-gutter-sm q-mb-xs">
                  <q-radio
                    v-for="item in store.merintihs"
                    :key="item"
                    v-model="store.form.retraksi"
                    :val="item"
                    :label="item"
                    dense
                    size="xs"
                    class="col-12"
                  />
                </div>
              </div>
            </div>
          </div>
          <q-separator />
          <div class="row q-mb-xs">
            <div class="col-2">
              Suara Napas
            </div>
            <div class="col-9 row q-col-gutter-sm">
              <div class="col-auto">
                :
              </div>
              <div class="col row full-width">
                <div class="flex q-gutter-sm q-mb-xs">
                  <q-radio
                    v-for="item in store.suaraNapas"
                    :key="item"
                    v-model="store.form.suaraNapas"
                    :val="item"
                    :label="item"
                    dense
                    size="xs"
                    class="col-12"
                  />
                </div>
              </div>
            </div>
          </div>
        </td>
      </tr>

      <tr>
        <td
          width="20%"
          class="text-weight-bold"
        >
          Sistem Pencernaan
        </td>
        <td>
          <div class="row q-mb-xs">
            <div class="col-2">
              Mulut
            </div>
            <div class="col-9 row q-col-gutter-sm">
              <div class="col-auto">
                :
              </div>
              <div class="col row full-width">
                <div class="flex q-gutter-sm q-mb-xs">
                  <q-radio
                    v-for="item in store.muluts"
                    :key="item"
                    v-model="store.form.mulut"
                    :val="item"
                    :label="item"
                    dense
                    size="xs"
                    class="col-12"
                  />
                </div>
                <div
                  v-if="store.form.mulut==='Lain-lain'"
                  class="col-12"
                >
                  <app-input-simrs
                    v-model="store.form.mulutLain"
                    label="Sebutkan"
                    class-tambahan="full-width"
                  />
                </div>
              </div>
            </div>
          </div>
          <q-separator />
          <div class="row q-mb-xs">
            <div class="col-2">
              Lidah
            </div>
            <div class="col-9 row q-col-gutter-sm">
              <div class="col-auto">
                :
              </div>
              <div class="col row full-width">
                <div class="flex q-gutter-sm q-mb-xs">
                  <q-radio
                    v-for="item in store.lidahs"
                    :key="item"
                    v-model="store.form.lidah"
                    :val="item"
                    :label="item"
                    dense
                    size="xs"
                    class="col-12"
                  />
                </div>
                <div
                  v-if="store.form.lidah ==='Lain-lain'"
                  class="col-12"
                >
                  <app-input-simrs
                    v-model="store.form.lidahLain"
                    label="Sebutkan"
                    class-tambahan="full-width"
                  />
                </div>
              </div>
            </div>
          </div>
          <q-separator />
          <div class="row q-mb-xs">
            <div class="col-2">
              Oesofagus
            </div>
            <div class="col-9 row q-col-gutter-sm">
              <div class="col-auto">
                :
              </div>
              <div class="col row full-width">
                <div class="flex q-gutter-sm q-mb-xs">
                  <q-radio
                    v-for="item in store.oesofagus"
                    :key="item"
                    v-model="store.form.oesofagus"
                    :val="item"
                    :label="item"
                    dense
                    size="xs"
                    class="col-12"
                  />
                </div>
                <div
                  v-if="store.form.oesofagus==='Lain-lain'"
                  class="col-12"
                >
                  <app-input-simrs
                    v-model="store.form.oesofagusLain"
                    label="Sebutkan"
                    class-tambahan="full-width"
                  />
                </div>
              </div>
            </div>
          </div>

          <q-separator />
          <div class="row q-mb-xs">
            <div class="col-2">
              Abdomen
            </div>
            <div class="col-9 row q-col-gutter-sm">
              <div class="col-auto">
                :
              </div>
              <div class="col row full-width">
                <div class="flex q-gutter-sm q-mb-xs">
                  <q-radio
                    v-for="item in store.abdomens"
                    :key="item"
                    v-model="store.form.abdomen"
                    :val="item"
                    :label="item"
                    dense
                    size="xs"
                    class="col-12"
                  />
                </div>
                <div
                  v-if="store.form.abdomen==='Bising usus'"
                  class="col-12"
                >
                  <app-input-simrs
                    v-model="store.form.bisingUsus"
                    label="Bising Usus /mnt"
                    class-tambahan="full-width"
                  />
                </div>
                <div
                  v-if="store.form.abdomen==='Lain-lain'"
                  class="col-12"
                >
                  <app-input-simrs
                    v-model="store.form.abdomenLain"
                    label="Sebutkan"
                    class-tambahan="full-width"
                  />
                </div>
              </div>
            </div>
          </div>
          <q-separator />
          <div class="row q-mb-xs">
            <div class="col-2">
              BAB
            </div>
            <div class="col-9 row q-col-gutter-sm">
              <div class="col-auto">
                :
              </div>
              <div class="col row full-width">
                <div class="flex q-gutter-sm q-mb-xs">
                  <q-radio
                    v-for="item in store.babs"
                    :key="item"
                    v-model="store.form.bab"
                    :val="item"
                    :label="item"
                    dense
                    size="xs"
                    class="col-12"
                  />
                </div>
                <div
                  v-if="store.form.bab==='Diare'"
                  class="col-12"
                >
                  <app-input-simrs
                    v-model="store.form.frekwensiBab"
                    label="Frekwensi Diare BAB /Hari"
                    class-tambahan="full-width"
                  />
                </div>
                <div
                  v-if="store.form.bab==='Meco pertama'"
                  class="col-12"
                >
                  <app-input-simrs
                    v-model="store.form.mecoPertama"
                    label="Sebutkan Tgl/Jam"
                    class-tambahan="full-width"
                  />
                </div>
              </div>
            </div>
          </div>
        </td>
      </tr>

      <tr>
        <td
          width="20%"
          class="text-weight-bold"
        >
          Sistem Genitourinasis
        </td>
        <td>
          <div class="row q-mb-xs">
            <div class="col-2">
              Warna
            </div>
            <div class="col-9 row q-col-gutter-sm">
              <div class="col-auto">
                :
              </div>
              <div class="col row full-width">
                <div class="flex q-gutter-sm q-mb-xs">
                  <q-radio
                    v-for="item in store.warnaGenitourinasis"
                    :key="item"
                    v-model="store.form.warnaGenitourinasis"
                    :val="item"
                    :label="item"
                    dense
                    size="xs"
                    class="col-12"
                  />
                </div>
                <div
                  v-if="store.form.warnaGenitourinasis==='Lain-lain'"
                  class="col-12"
                >
                  <app-input-simrs
                    v-model="store.form.warnaGenitourinasisLain"
                    label="Sebutkan"
                    class-tambahan="full-width"
                  />
                </div>
              </div>
            </div>
          </div>
          <q-separator />
          <div class="row q-mb-xs">
            <div class="col-2">
              BAK
            </div>
            <div class="col-9 row q-col-gutter-sm">
              <div class="col-auto">
                :
              </div>
              <div class="col row full-width">
                <div class="flex q-gutter-sm q-mb-xs">
                  <q-radio
                    v-for="item in store.baks"
                    :key="item"
                    v-model="store.form.bak"
                    :val="item"
                    :label="item"
                    dense
                    size="xs"
                    class="col-12"
                  />
                </div>
                <div
                  v-if="store.form.bak ==='BAK pertama'"
                  class="col-12"
                >
                  <app-input-simrs
                    v-model="store.form.bakPertama"
                    label="Sebutkan tgl / jam BAk Pertama"
                    class-tambahan="full-width"
                  />
                </div>
              </div>
            </div>
          </div>
          <q-separator />
          <div class="row q-mb-xs">
            <div class="col-2">
              Warna
            </div>
            <div class="col-9 row q-col-gutter-sm">
              <div class="col-auto">
                :
              </div>
              <div class="col row full-width">
                <div class="flex q-gutter-sm q-mb-xs">
                  <q-radio
                    v-for="item in store.warnaBaks"
                    :key="item"
                    v-model="store.form.warnaBak"
                    :val="item"
                    :label="item"
                    dense
                    size="xs"
                    class="col-12"
                  />
                </div>
                <div
                  v-if="store.form.warnaBak==='Lain-lain'"
                  class="col-12"
                >
                  <app-input-simrs
                    v-model="store.form.warnaBakLain"
                    label="Sebutkan"
                    class-tambahan="full-width"
                  />
                </div>
              </div>
            </div>
          </div>
        </td>
      </tr>

      <tr>
        <td
          width="20%"
          class="text-weight-bold"
        >
          Sistem Integument
        </td>
        <td>
          <div class="row q-mb-xs">
            <div class="col-2">
              Vernic Kasesosa
            </div>
            <div class="col-9 row q-col-gutter-sm">
              <div class="col-auto">
                :
              </div>
              <div class="col row full-width">
                <div class="flex q-gutter-sm q-mb-xs">
                  <q-radio
                    v-for="item in store.adas"
                    :key="item"
                    v-model="store.form.vernicKasesosa"
                    :val="item"
                    :label="item"
                    dense
                    size="xs"
                    class="col-12"
                  />
                </div>
                <div
                  v-if="store.form.vernicKasesosa==='Ada'"
                  class="col-12"
                >
                  <app-input-simrs
                    v-model="store.form.vernicKasesosaAda"
                    label="Sebutkan"
                    class-tambahan="full-width"
                  />
                </div>
              </div>
            </div>
          </div>
          <q-separator />
          <div class="row q-mb-xs">
            <div class="col-2">
              Lanugo
            </div>
            <div class="col-9 row q-col-gutter-sm">
              <div class="col-auto">
                :
              </div>
              <div class="col row full-width">
                <div class="flex q-gutter-sm q-mb-xs">
                  <q-radio
                    v-for="item in store.lanugos"
                    :key="item"
                    v-model="store.form.lanugo"
                    :val="item"
                    :label="item"
                    dense
                    size="xs"
                    class="col-12"
                  />
                </div>
              </div>
            </div>
          </div>
          <q-separator />
          <div class="row q-mb-xs">
            <div class="col-2">
              Warna
            </div>
            <div class="col-9 row q-col-gutter-sm">
              <div class="col-auto">
                :
              </div>
              <div class="col row full-width">
                <div class="flex q-gutter-sm q-mb-xs">
                  <q-radio
                    v-for="item in store.warnaInteguments"
                    :key="item"
                    v-model="store.form.warnaIntegument"
                    :val="item"
                    :label="item"
                    dense
                    size="xs"
                    class="col-12"
                  />
                </div>
                <div
                  v-if="store.form.warnaIntegument==='Lain-lain'"
                  class="col-12"
                >
                  <app-input-simrs
                    v-model="store.form.warnaIntegumentLain"
                    label="Sebutkan"
                    class-tambahan="full-width"
                  />
                </div>
              </div>
            </div>
          </div>

          <q-separator />
          <div class="row q-mb-xs">
            <div class="col-2">
              Turgor
            </div>
            <div class="col-9 row q-col-gutter-sm">
              <div class="col-auto">
                :
              </div>
              <div class="col row full-width">
                <div class="flex q-gutter-sm q-mb-xs">
                  <q-radio
                    v-for="item in store.turgors"
                    :key="item"
                    v-model="store.form.turgor"
                    :val="item"
                    :label="item"
                    dense
                    size="xs"
                    class="col-12"
                  />
                </div>
              </div>
            </div>
          </div>
          <q-separator />
          <div class="row q-mb-xs">
            <div class="col-2">
              Kulit
            </div>
            <div class="col-9 row q-col-gutter-sm">
              <div class="col-auto">
                :
              </div>
              <div class="col row full-width">
                <div class="flex q-gutter-sm q-mb-xs">
                  <q-radio
                    v-for="item in store.kulits"
                    :key="item"
                    v-model="store.form.kulitIntegument"
                    :val="item"
                    :label="item"
                    dense
                    size="xs"
                    class="col-12"
                  />
                </div>
              </div>
            </div>
          </div>
        </td>
      </tr>

      <tr>
        <td
          width="20%"
          class="text-weight-bold"
        >
          Sistem Muskuloskeletal
        </td>
        <td>
          <div class="row q-mb-xs">
            <div class="col-2">
              Lengan
            </div>
            <div class="col-9 row q-col-gutter-sm">
              <div class="col-auto">
                :
              </div>
              <div class="col row full-width">
                <div class="flex q-gutter-sm q-mb-xs">
                  <q-radio
                    v-for="item in store.lengans"
                    :key="item"
                    v-model="store.form.lengan"
                    :val="item"
                    :label="item"
                    dense
                    size="xs"
                    class="col-12"
                  />
                </div>
                <div
                  v-if="store.form.lengan==='Lain-lain'"
                  class="col-12"
                >
                  <app-input-simrs
                    v-model="store.form.lenganLain"
                    label="Sebutkan"
                    class-tambahan="full-width"
                  />
                </div>
              </div>
            </div>
          </div>
          <q-separator />
          <div class="row q-mb-xs">
            <div class="col-2">
              Tungkal
            </div>
            <div class="col-9 row q-col-gutter-sm">
              <div class="col-auto">
                :
              </div>
              <div class="col row full-width">
                <div class="flex q-gutter-sm q-mb-xs">
                  <q-radio
                    v-for="item in store.tungkals"
                    :key="item"
                    v-model="store.form.tungkal"
                    :val="item"
                    :label="item"
                    dense
                    size="xs"
                    class="col-12"
                  />
                </div>
                <div
                  v-if="store.form.tungkal==='Lain-lain'"
                  class="col-12"
                >
                  <app-input-simrs
                    v-model="store.form.tungkalLain"
                    label="Sebutkan"
                    class-tambahan="full-width"
                  />
                </div>
              </div>
            </div>
          </div>
          <q-separator />
          <div class="row q-mb-xs">
            <div class="col-2">
              Rekoil Telinga
            </div>
            <div class="col-9 row q-col-gutter-sm">
              <div class="col-auto">
                :
              </div>
              <div class="col row full-width">
                <div class="flex q-gutter-sm q-mb-xs">
                  <q-radio
                    v-for="item in store.rekoils"
                    :key="item"
                    v-model="store.form.rekoil"
                    :val="item"
                    :label="item"
                    dense
                    size="xs"
                    class="col-12"
                  />
                </div>
                <div
                  v-if="store.form.rekoil==='Lain-lain'"
                  class="col-12"
                >
                  <app-input-simrs
                    v-model="store.form.rekoilLain"
                    label="Sebutkan"
                    class-tambahan="full-width"
                  />
                </div>
              </div>
            </div>
          </div>

          <q-separator />
          <div class="row q-mb-xs">
            <div class="col-2">
              Garis Telapak Kaki
            </div>
            <div class="col-9 row q-col-gutter-sm">
              <div class="col-auto">
                :
              </div>
              <div class="col row full-width">
                <div class="flex q-gutter-sm q-mb-xs">
                  <q-radio
                    v-for="item in store.telapakKakis"
                    :key="item"
                    v-model="store.form.telapakKaki"
                    :val="item"
                    :label="item"
                    dense
                    size="xs"
                    class="col-12"
                  />
                </div>
              </div>
            </div>
          </div>
        </td>
      </tr>
    </table>

    <q-separator class="q-my-sm" />
    <div><b>III. DATA ekonomi, spiritual, kultural (Tambahan) </b></div>
    <q-separator class="q-my-sm" />

    <div class="row  items-center q-mb-xs">
      <div class="col-3">
        Kebiasaan Pasien saat sakit, Pola Komunikasi
      </div>
      <div class="col-9 flex q-gutter-sm  items-center">
        <div class="col-auto">
          :
        </div>
        <q-radio
          v-for="item in store.komunikasis"
          :key="item"
          v-model="store.form.komunikasi"
          :val="item"
          :label="item"
          dense
          size="xs"
          class="col-auto"
        />
        <div
          v-if="store.form.komunikasi==='Lain-lain'"
          class="col q-pl-md full-width"
        >
          <app-input-simrs
            v-model="store.form.komunikasiLain"
            label="Sebutkan"
            class-tambahan="full-width"
          />
        </div>
      </div>
    </div>

    <div class="row  items-center q-mb-xs">
      <div class="col-3">
        Makanan Pokok
      </div>
      <div class="col-9 flex q-gutter-sm  items-center">
        <div class="col-auto">
          :
        </div>
        <q-checkbox
          v-for="item in store.makananPokoks"
          :key="item"
          v-model="store.form.makananPokok"
          :val="item"
          :label="item"
          dense
          size="xs"
          class="col-auto"
        />
        <div
          v-if="store.form?.makananPokok?.includes('Selain nasi')"
          class="col q-pl-md full-width"
        >
          <app-input-simrs
            v-model="store.form.makananPokokLain"
            label="Sebutkan"
            class-tambahan="full-width"
          />
        </div>
      </div>
    </div>

    <div class="row  items-center q-mb-xs">
      <div class="col-3">
        Pantangan Makanan
      </div>
      <div class="col-9 flex q-gutter-sm  items-center">
        <div class="col-auto">
          :
        </div>
        <q-radio
          v-for="item in store.yaTidaks"
          :key="item"
          v-model="store.form.pantanganMakanan"
          :val="item"
          :label="item"
          dense
          size="xs"
          class="col-auto"
        />
        <div
          v-if="store.form.pantanganMakanan==='Ya'"
          class="col q-pl-md full-width"
        >
          <app-input-simrs
            v-model="store.form.pantanganMakananYa"
            label="Sebutkan"
            class-tambahan="full-width"
          />
        </div>
      </div>
    </div>

    <q-separator class="q-my-sm" />
    <div><b>IV. ASESMEN NYERI </b></div>
    <q-separator class="q-my-sm" />

    <table>
      <tr>
        <th width="5%">
          #
        </th>
        <th width="15%">
          Parameter
        </th>
        <th width="70%">
          Finding
        </th>
        <th class="text-center">
          Poin
        </th>
      </tr>
      <tr>
        <td>1</td>
        <td>Ekspresi Wajah</td>
        <td>
          <q-option-group
            v-model="store.form.ekspresiWajah"
            :options="store.ekspresiWajahs"
            color="primary"
            inline
            dense
            size="xs"
            @update:model-value="store.setSkorNyeri"
          />
        </td>
        <td class="text-center">
          {{ store.form.ekspresiWajah }}
        </td>
      </tr>
      <tr>
        <td>2</td>
        <td>Menangis</td>
        <td>
          <q-option-group
            v-model="store.form.menangis"
            :options="store.menangis"
            color="primary"
            inline
            dense
            size="xs"
            @update:model-value="store.setSkorNyeri"
          />
        </td>
        <td class="text-center">
          {{ store.form.menangis }}
        </td>
      </tr>
      <tr>
        <td>3</td>
        <td>Pola Nafas</td>
        <td>
          <q-option-group
            v-model="store.form.polaNafas"
            :options="store.polaNafas"
            color="primary"
            inline
            dense
            size="xs"
            @update:model-value="store.setSkorNyeri"
          />
        </td>
        <td class="text-center">
          {{ store.form.polaNafas }}
        </td>
      </tr>
      <tr>
        <td>4</td>
        <td>Lengan</td>
        <td>
          <q-option-group
            v-model="store.form.skorLengan"
            :options="store.skorLengans"
            color="primary"
            inline
            dense
            size="xs"
            @update:model-value="store.setSkorNyeri"
          />
        </td>
        <td class="text-center">
          {{ store.form.skorLengan }}
        </td>
      </tr>
      <tr>
        <td>5</td>
        <td>Kaki</td>
        <td>
          <q-option-group
            v-model="store.form.skorKaki"
            :options="store.skorKakis"
            color="primary"
            inline
            dense
            size="xs"
            @update:model-value="store.setSkorNyeri"
          />
        </td>
        <td class="text-center">
          {{ store.form.skorKaki }}
        </td>
      </tr>
      <tr>
        <td>6</td>
        <td>Rangsangan</td>
        <td>
          <q-option-group
            v-model="store.form.rangsangan"
            :options="store.rangsangans"
            color="primary"
            inline
            dense
            size="xs"
            @update:model-value="store.setSkorNyeri"
          />
        </td>
        <td class="text-center">
          {{ store.form.rangsangan }}
        </td>
      </tr>
      <tr class="bg-yellow-3">
        <td
          colspan="3"
          class="text-right"
        >
          Jumlah Skor
        </td>
        <td class="text-center text-weight-bold">
          {{ store.form.skorNyeri }}
        </td>
      </tr>
      <tr class="bg-yellow-3">
        <td
          colspan="2"
          class="text-right"
        >
          Kesimpulan
        </td>
        <td
          colspan="2"
          class="text-center text-weight-bold"
        >
          {{ store.kesimpulanNyeri }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script setup>
import { useNeonatusKeperawatanStore } from 'src/stores/simrs/pelayanan/poli/neonatuskeperawatan'

const store = useNeonatusKeperawatanStore()
defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

</script>

<style lang="scss" scoped>
table {
  border-collapse: collapse;
  width: 100%;
}
table, th, td {
  border: 1px solid $grey;
  padding: 2px 5px;
}
</style>
