<template>
  <div id="pdfDoc" class="q-pa-lg bg-white f-12">
    <!-- page 1 -->
    <div class="page-1">
      <!-- KOP SURAT -->
      <div class="col-grow ba-black">
        <div class="row items-center">
          <div class="col-9 br-black">
            <div class="row items-center q-pa-sm">
              <div class="col-auto">
                <img
                  src="~assets/images/logo-kota-grey.png"
                  width="60"
                >
              </div>
              <div class="col flex-wrap q-px-md">
                <div class="text-center">
                  <div class="text-weight-bold f-14">
                    RSUD DOKTER MOHAMAD SALEH
                  </div>
                  <div>Jl. Mayjend Panjaitan No.65 Telp: (0335)433119 Fax.(0335)432702</div>
                  <div>email: rsudprob@probolinggokota.go.id</div>
                  <div>PROBOLINGGO – 67219</div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-3">
            <div class="text-center text-bold">
              PEMBERIAN EDUKASI
              PEMBERITAHUAN INFORMASI  OPERASI/TINDAKAN INVASIF
            </div>
          </div>
        </div>
      </div>
      <!-- CONTENT -->
      <div class="ba-black">
        <div class="section-1 q-pa-md">
          <div class="flex q-py-xs">
            <div style="width: 40%;">
              Tanggal
            </div>
            <div style="width: 60%;">
              : {{ item?.tanggal }}
            </div>
          </div>
          <div class="flex q-py-xs">
            <div style="width: 40%;">
              Pelaksana Tindakan
            </div>
            <div style="width: 60%;">
              : {{ item?.pelaksana }}
            </div>
          </div>
          <div class="flex q-py-xs">
            <div style="width: 40%;">
              Pemberi Informasi
            </div>
            <div style="width: 60%;">
              : {{ item?.pengedukasi }}
            </div>
          </div>
          <div class="flex q-py-xs">
            <div style="width: 40%;">
              Penerima informasi /pemberi  persetujuan*
            </div>
            <div style="width: 60%;">
              : {{ item?.nama }}
            </div>
          </div>
        </div>
        <div class="section-2">
          <q-markup-table separator="cell" flat bordered wrap-cells>
            <thead>
              <tr>
                <th class="text-left f-12" width="5%">
                  NO
                </th>
                <th class="text-left f-12" width="10%">
                  JENIS INFORMASI
                </th>
                <th class="text-left f-12">
                  ISI INFORMASI
                </th>
                <th class="text-right" width="10%">
                  TANDA (v)
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="text-left f-12 f-12">
                  1
                </td>
                <td class="text-left f-12 f-12">
                  Diagnosis
                </td>
                <td class="text-left f-12 f-12">
                  <div v-for="diag in item?.diagnosis" :key="diag" class="flex">
                    <div>- {{ diag }} </div>
                    <div class="q-ml-sm">
                      {{ pasien?.diagnosamedis?.find(x => x?.rs3 === diag)?.masterdiagnosa?.rs4 ?? '-' }}
                    </div>
                  </div>
                </td>
                <td class="text-right">
                  <q-icon v-if="item?.diagnosis?.length > 0" name="icon-mat-check" size="sm" />
                </td>
              </tr>

              <tr>
                <td class="text-left f-12">
                  2
                </td>
                <td class="text-left f-12">
                  Dasar Diagnosis
                </td>
                <td class="text-left f-12">
                  <div v-html="getNewLine(item?.dasarDiagnosis)" />
                </td>
                <td class="text-right">
                  <q-icon v-if="item?.dasarDiagnosis" name="icon-mat-check" size="sm" />
                </td>
              </tr>

              <tr>
                <td class="text-left f-12">
                  3
                </td>
                <td class="text-left f-12">
                  Tindakan Kedokteran
                </td>
                <td class="text-left f-12">
                  <div v-html="getNewLine(item?.tindakanMedis)" />
                </td>
                <td class="text-right">
                  <q-icon v-if="item?.tindakanMedis" name="icon-mat-check" size="sm" />
                </td>
              </tr>

              <tr>
                <td class="text-left f-12">
                  4
                </td>
                <td class="text-left f-12">
                  Indikasi
                </td>
                <td class="text-left f-12">
                  <div v-html="getNewLine(item?.indikasi)" />
                </td>
                <td class="text-right">
                  <q-icon v-if="item?.indikasi" name="icon-mat-check" size="sm" />
                </td>
              </tr>

              <tr>
                <td class="text-left f-12">
                  5
                </td>
                <td class="text-left f-12">
                  Tujuan
                </td>
                <td class="text-left f-12">
                  <div v-for="tj in item?.tujuan" :key="tj" class="flex">
                    <div>-  </div>
                    <div class="q-ml-sm">
                      {{ tj==='Lain-lain'? item?.tujuanLain : (tj ?? '-') }}
                    </div>
                  </div>
                </td>
                <td class="text-right">
                  <q-icon v-if="item?.tujuan?.length > 0" name="icon-mat-check" size="sm" />
                </td>
              </tr>

              <tr>
                <td class="text-left f-12">
                  6
                </td>
                <td class="text-left f-12">
                  Tata Cara
                </td>
                <td class="text-left f-12">
                  <div v-html="getNewLine(item?.tatacara)" />
                </td>
                <td class="text-right">
                  <q-icon v-if="item?.tatacara" name="icon-mat-check" size="sm" />
                </td>
              </tr>

              <tr>
                <td class="text-left f-12">
                  7
                </td>
                <td class="text-left f-12">
                  Resiko
                </td>
                <td class="text-left f-12">
                  <div v-for="tj in item?.resiko" :key="tj" class="flex">
                    <div>-  </div>
                    <div class="q-ml-sm">
                      {{ tj==='Lain-lain'? item?.resikoLain : (tj ?? '-') }}
                    </div>
                  </div>
                </td>
                <td class="text-right">
                  <q-icon v-if="item?.resiko?.length > 0" name="icon-mat-check" size="sm" />
                </td>
              </tr>

              <tr>
                <td class="text-left f-12">
                  8
                </td>
                <td class="text-left f-12">
                  Komplikasi
                </td>
                <td class="text-left f-12">
                  <div v-html="getNewLine(item?.komplikasi)" />
                </td>
                <td class="text-right">
                  <q-icon v-if="item?.komplikasi" name="icon-mat-check" size="sm" />
                </td>
              </tr>

              <tr>
                <td class="text-left f-12">
                  9
                </td>
                <td class="text-left f-12">
                  Prognosis
                </td>
                <td class="text-left f-12">
                  {{ item?.prognosis?.join(', ') }}
                </td>
                <td class="text-right">
                  <q-icon v-if="item?.prognosis?.length > 0" name="icon-mat-check" size="sm" />
                </td>
              </tr>

              <tr>
                <td class="text-left f-12">
                  10
                </td>
                <td class="text-left f-12">
                  Alternatif Tindakan
                </td>
                <td class="text-left f-12">
                  <div v-html="getNewLine(item?.alternatif)" />
                </td>
                <td class="text-right">
                  <q-icon v-if="item?.alternatif" name="icon-mat-check" size="sm" />
                </td>
              </tr>
              <tr>
                <td colspan="3" class="text-left f-12 f-12">
                  Dengan ini menyatakan bahwa saya telah menerangkan hal-hal diatas secara benar dan  jelas, dan memberikan kesempatan untuk bertanya/berdiskusi.
                </td>

                <td class="text-right">
                  <img :src="item?.ttd_petugas" alt="ttd-petugas" width="70">
                </td>
              </tr>
              <tr>
                <td colspan="3" class="text-left f-12 f-12">
                  Dengan ini menyatakan bahwa saya telah menerima informasi sebagaimana diatas yang  saya  beri tanda/paraf di kolom kanannya, dan  telah memahaminya.
                </td>

                <td class="text-right">
                  <img :src="item?.ttd_yg_menyatakan" alt="ttd-yg-menyatakan" width="70">
                </td>
              </tr>
              <tr>
                <td colspan="4" class="text-left f-12 f-12">
                  *Bila pasien tidak kompeten  atau  tidak mau  menerima informasi, maka penerima informasi adalah wali atau  keluarga terdekat.
                </td>
              </tr>
            </tbody>
          </q-markup-table>
        </div>
      </div>
    </div>

    <q-separator class="pemisah q-mb-lg html2pdf__page-break" />
    <!-- Page 2 -->
    <div class="page-2">
      <div class="section-1">
        <div class="text-center f-14 text-bold q-mb-lg">
          <span v-if="item?.setuju==='Iya'">PERSETUJUAN TINDAKAN KEDOKTERAN(Operasi / Tindakan Invasif)</span>
          <span v-else>PENOLAKAN TINDAKAN KEDOKTERAN (Operasi / Tindakan Invasif)</span>
        </div>
        <div>Saya yang bertanda tangan dibawah ini :</div>

        <div>
          <div class="row q-mt-xs">
            <div class="col-4">
              Nama
            </div>
            <div class="col-8">
              <div class="flex justify-between">
                <div>: {{ item?.nama }} <span class="q-ml-lg">({{ item?.lp === 'Perempuan' ? 'P' : 'L' }})*</span></div>
                <div class="self-end">
                  Tanggal Lahir : {{ item?.tglLahir }}
                </div>
              </div>
            </div>
          </div>

          <div class="row q-mt-xs">
            <div class="col-4">
              No KTP / SIM / PASPOR
            </div>
            <div class="col-8">
              <div class="flex">
                : {{ item?.noKtp }}
              </div>
            </div>
          </div>

          <div class="row q-mt-xs">
            <div class="col-4">
              Alamat
            </div>
            <div class="col-8">
              <div class="row">
                <div class="col-auto q-mr-xs">
                  :
                </div>
                <div class="col full-width">
                  {{ item?.alamat }}
                </div>
              </div>
            </div>
          </div>

          <div class="row q-mt-xs">
            <div class="col-4">
              Hubungan Dengan Pasien
            </div>
            <div class="col-8">
              <div class="flex">
                : {{ item?.hubunganDgPasien }} <span v-if="item?.hubunganDgPasien === 'Keluarga'"> {{ item?.keluarga }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="section-2 q-mt-lg">
        <div v-if="item?.setuju==='Iya'">
          Dengan ini menyatakan sesungguhnya, bahwa saya telah menerima informasi yang
          diberikan oleh dokter sebagaimana diatas dan telah memahaminya. Untuk itu
          saya memeberikan <b>PERSETUJUAN</b> untuk dilakukan Tindakan KEDOKTERAN berupa :
        </div>

        <div v-else>
          Dengan ini menyatakan sesungguhnya, bahwa saya telah menerima informasi
          yang diberikan oleh Dokter sebagaimana diatas dan telah memahaminya.
          Untuk itu saya memberikan <b>PENOLAKAN / PEMBATALAN</b> untuk dilakukan Tindakan KEDOKTERAN  berupa :
        </div>

        <div v-html="getNewLine(item?.tindakanMedis)" />

        <div class="q-mt-lg">
          terhadap :
        </div>

        <div>
          <div class="row q-mt-xs">
            <div class="col-4">
              Nama
            </div>
            <div class="col-8">
              <div class="flex justify-between">
                <div>: {{ pasien?.nama }} <span class="q-ml-lg">({{ pasien?.kelamin === 'Perempuan' ? 'P' : 'L' }})*</span></div>
                <div class="self-end">
                  Tanggal Lahir : {{ pasien?.tgllahir }}
                </div>
              </div>
            </div>
          </div>

          <div class="row q-mt-xs">
            <div class="col-4">
              No KTP / SIM / PASPOR
            </div>
            <div class="col-8">
              <div class="flex">
                : {{ pasien?.nktp }}
              </div>
            </div>
          </div>

          <div class="row q-mt-xs">
            <div class="col-4">
              Alamat
            </div>
            <div class="col-8">
              <div class="row">
                <div class="col-auto q-mr-xs">
                  :
                </div>
                <div class="col full-width">
                  {{ pasien?.alamat }}
                </div>
              </div>
            </div>
          </div>

          <div class="row q-mt-xs">
            <div class="col-4">
              RM
            </div>
            <div class="col-8">
              <div class="flex">
                : {{ pasien?.norm }}
              </div>
            </div>
          </div>
        </div>

        <div v-if="item?.setuju==='Iya'" class="q-mt-lg">
          Saya Memahami perlunya dan manfaat tindakan tersebut termasuk risiko
          dan komplikasi yang akan timbul. Saya juga menyadari bahwa ilmu kedokteran
          bukanlah ilmu pasti, maka keberhasilan tindakan kedokteran bukanlah keniscayaan,
          melainkan tergantung kepada ijin Tuhan Yang Maha Esa
        </div>

        <div v-else class="q-mt-lg">
          Saya  memahami perlunya dan manfaat tindakan tersebut termasuk risiko dan komplikasi
          yang akan timbul bila tidak dilakukan tindakan tersebut. Saya akan bertanggung jawab secara penuh
          atas segala akibat yang mungkin timbul akibat penolakan dilakukan tindakan tersebut.
        </div>
      </div>

      <div class="section-3 q-mt-lg">
        <q-markup-table separator="cell" flat bordered wrap-cells>
          <thead>
            <tr>
              <th class="text-left f-12" width="20%">
                Tgl/Pukul : {{ item?.tgl }}
              </th>
              <th class="text-center f-12" width="20%">
                Dokter
              </th>
              <th class="text-center f-12" width="20%">
                Saksi RS
              </th>
              <th class="text-center" width="20%">
                Saksi Pasien
              </th>
              <th class="text-center" width="20%">
                Yang Menyatakan
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="text-left f-12">
                Nama Jelas
              </td>
              <td class="text-center f-12">
                {{ item?.pelaksana }}
              </td>
              <td class="text-center f-12">
                {{ item?.pengedukasi }}
              </td>
              <td class="text-center">
                {{ item?.saksiPasien }}
              </td>
              <td class="text-center">
                {{ item?.nama }}
              </td>
            </tr>
            <tr>
              <td class="text-left f-12">
                Tanda Tangan
              </td>
              <td class="text-center f-12">
                <img :src="item?.ttd_dokter" alt="ttd dokter" width="70">
              </td>
              <td class="text-center f-12">
                <img :src="item?.ttd_petugas" alt="ttd-petugas" width="70">
              </td>
              <td class="text-center">
                <img :src="item?.ttd_saksi_pasien" alt="ttd-saksi-pasien" width="70">
              </td>
              <td class="text-center">
                <img :src="item?.ttd_yg_menyatakan" alt="ttd-yg-menyatakan" width="70">
              </td>
            </tr>
          </tbody>
        </q-markup-table>
      </div>
    </div>

    <q-separator class="pemisah q-mb-lg html2pdf__page-break" />

    <!-- Page 3 -->
    <div class="page-3">
      <!-- KOP SURAT -->
      <div class="col-grow ba-black">
        <div class="row items-center">
          <div class="col-9 br-black">
            <div class="row items-center q-pa-sm">
              <div class="col-auto">
                <img
                  src="~assets/images/logo-kota-grey.png"
                  width="60"
                >
              </div>
              <div class="col flex-wrap q-px-md">
                <div class="text-center">
                  <div class="text-weight-bold f-12">
                    PEMERINTAH KOTA PROBOLINGGO
                  </div>
                  <div class="text-weight-bold f-10">
                    DINAS KESEHATAN, PENGENDALIAN PENDUDUK DAN KELUARGA BERENCANA
                  </div>
                  <div class="text-weight-bold f-14">
                    UOBK RSUD DOKTER MOHAMAD SALEH
                  </div>
                  <div class="f-10">
                    <div>Jl. Mayjend Panjaitan No.65 Telp: (0335)433119 Fax.(0335)432702</div>
                    <div>email: rsudprob@probolinggokota.go.id</div>
                    <div>PROBOLINGGO – 67219</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-3">
            <div class="text-center text-bold">
              PERSETUJUAN
              TINDAKAN KEDOKTERAN
            </div>
            <div class="text-center text-bold">
              OPERASI / TINDAKAN INVASIF
            </div>
          </div>
        </div>
      </div>

      <!-- section-1 -->
      <div class="ba-black f-12 q-mt-xs">
        <div class="q-pa-sm">
          Saya , Dokter Pelaksana tindakan menyatakan bahwa telah menerangkan hal dibawah ini secara benar dan jelas dan
          sudah memberi kesempatan pada pasien / keluarga untuk bertanya dan berdiskusi.
        </div>

        <div class="section-2">
          <q-markup-table dense separator="cell" flat bordered wrap-cells>
            <thead>
              <tr>
                <th colspan="2" class="text-left f-12" width="30%">
                  JENIS INFORMASI
                </th>
                <th class="text-left f-12">
                  ISI INFORMASI
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="text-left f-12 f-12">
                  1
                </td>
                <td class="text-left f-12 f-12">
                  Diagnosis
                </td>
                <td class="text-left f-12 f-12">
                  <div class="flex">
                    <div v-for="diag in item?.diagnosis" :key="diag" class="flex">
                      <div class="">
                        {{ pasien?.diagnosamedis?.find(x => x?.rs3 === diag)?.masterdiagnosa?.rs4 ?? '-' }}
                      </div>
                      <div class="q-mr-xs">
                        ,
                      </div>
                    </div>
                  </div>

                  <!-- <div v-for="diag in item?.diagnosis" :key="diag" class="flex">
                    <div>- {{ diag }} </div>
                    <div class="q-ml-sm">
                      {{ pasien?.diagnosamedis?.find(x => x?.rs3 === diag)?.masterdiagnosa?.rs4 ?? '-' }}
                    </div>
                  </div> -->
                </td>
              </tr>

              <tr>
                <td class="text-left f-12">
                  2
                </td>
                <td class="text-left f-12">
                  Dasar Diagnosis
                </td>
                <td class="text-left f-12">
                  <div v-html="getNewLine(item?.dasarDiagnosis)" />
                </td>
              </tr>

              <tr>
                <td class="text-left f-12">
                  3
                </td>
                <td class="text-left f-12">
                  Tindakan Kedokteran
                </td>
                <td class="text-left f-12">
                  <div v-html="getNewLine(item?.tindakanMedis)" />
                </td>
              </tr>

              <tr>
                <td class="text-left f-12">
                  4
                </td>
                <td class="text-left f-12">
                  Indikasi
                </td>
                <td class="text-left f-12">
                  <div v-html="getNewLine(item?.indikasi)" />
                </td>
              </tr>

              <tr>
                <td class="text-left f-12">
                  5
                </td>
                <td class="text-left f-12">
                  Tujuan
                </td>
                <td class="text-left f-12">
                  <div class="flex">
                    <div v-for="tj in item?.tujuan" :key="tj" class="flex">
                      <div class="">
                        {{ tj==='Lain-lain'? item?.tujuanLain : (tj ?? '-') }}
                      </div>
                      <div>, </div>
                    </div>
                  </div>
                </td>
              </tr>

              <tr>
                <td class="text-left f-12">
                  6
                </td>
                <td class="text-left f-12">
                  Tata Cara
                </td>
                <td class="text-left f-12">
                  <div v-html="getNewLine(item?.tatacara)" />
                </td>
              </tr>

              <tr>
                <td class="text-left f-12">
                  7
                </td>
                <td class="text-left f-12">
                  Resiko
                </td>
                <td class="text-left f-12">
                  <div class="flex">
                    <div v-for="tj in item?.resiko" :key="tj" class="flex">
                      <div class="">
                        {{ tj==='Lain-lain'? item?.tujuanLain : (tj ?? '-') }}
                      </div>
                      <div>, </div>
                    </div>
                  </div>
                  <!-- <div v-for="tj in item?.resiko" :key="tj" class="flex">
                    <div>-  </div>
                    <div class="q-ml-sm">
                      {{ tj==='Lain-lain'? item?.resikoLain : (tj ?? '-') }}
                    </div>
                  </div> -->
                </td>
              </tr>

              <tr>
                <td class="text-left f-12">
                  8
                </td>
                <td class="text-left f-12">
                  Komplikasi
                </td>
                <td class="text-left f-12">
                  <div v-html="getNewLine(item?.komplikasi)" />
                </td>
              </tr>

              <tr>
                <td class="text-left f-12">
                  9
                </td>
                <td class="text-left f-12">
                  Prognosis
                </td>
                <td class="text-left f-12">
                  {{ item?.prognosis?.join(', ') }}
                </td>
              </tr>

              <tr>
                <td class="text-left f-12">
                  10
                </td>
                <td class="text-left f-12">
                  Alternatif Tindakan
                </td>
                <td class="text-left f-12">
                  <div v-html="getNewLine(item?.alternatif)" />
                </td>
              </tr>
            </tbody>
          </q-markup-table>

          <div style="padding:10px;">
            Catatan Khusus :
          </div>
          <div style="padding: 10px;" />
        </div>
      </div>

      <div class="section-3 ba-black">
        <!-- section-3 -->
        <div class="q-pa-sm">
          <div>Saya yang bertanda tangan dibawah ini :</div>

          <div>
            <div class="row q-mt-xs">
              <div class="col-4">
                Nama
              </div>
              <div class="col-8">
                <div class="flex justify-between">
                  <div>: {{ item?.nama }} <span class="q-ml-lg">({{ item?.lp === 'Perempuan' ? 'P' : 'L' }})*</span></div>
                  <div class="self-end">
                    Tanggal Lahir : {{ item?.tglLahir }}
                  </div>
                </div>
              </div>
            </div>

            <div class="row q-mt-xs">
              <div class="col-4">
                No KTP / SIM / PASPOR
              </div>
              <div class="col-8">
                <div class="flex">
                  : {{ item?.noKtp }}
                </div>
              </div>
            </div>

            <div class="row q-mt-xs">
              <div class="col-4">
                Alamat
              </div>
              <div class="col-8">
                <div class="row">
                  <div class="col-auto q-mr-xs">
                    :
                  </div>
                  <div class="col full-width">
                    {{ item?.alamat }}
                  </div>
                </div>
              </div>
            </div>

            <div class="row q-mt-xs">
              <div class="col-4">
                Hubungan Dengan Pasien
              </div>
              <div class="col-8">
                <div class="flex q-gutter-sm">
                  <!-- : {{ item?.hubunganDgPasien }} <span v-if="item?.hubunganDgPasien === 'Keluarga'"> {{ item?.keluarga }}</span> -->
                  <div v-for="n in store.hubunganDgPasiens" :key="n">
                    <div class="flex">
                      <div class="ba-black relative-position" style="width: 15px; height: 15px;">
                        <q-icon v-if="n === item?.hubunganDgPasien" name="icon-mat-check" class="absolute-center" size="sm" />
                      </div> <div class="q-ml-sm">
                        {{ n }} <span v-if="n==='Keluarga'">..................................</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="q-mt-lg">
            Dengan ini menyatakan sesungguhnya, bahwa saya telah menerima informasi yang diberikan oleh dokter sebagaimana
            diatas dan telah memahaminya. Untuk itu saya memeberikan <b>PERSETUJUAN</b> untuk dilakukan Tindakan KEDOKTERAN
            tersebut terhadap :
          </div>

          <div class="q-mt-lg">
            <div class="row q-mt-xs">
              <div class="col-4">
                Nama
              </div>
              <div class="col-8">
                <div class="flex justify-between">
                  <div>: {{ pasien?.nama }} <span class="q-ml-lg">({{ pasien?.kelamin === 'Perempuan' ? 'P' : 'L' }})*</span></div>
                </div>
              </div>
            </div>

            <div class="row q-mt-xs">
              <div class="col-4">
                No KTP / SIM / PASPOR
              </div>
              <div class="col-8">
                <div class="flex">
                  : {{ pasien?.nktp }}
                </div>
              </div>
            </div>

            <div class="row q-mt-xs">
              <div class="col-4">
                Alamat
              </div>
              <div class="col-8">
                <div class="row">
                  <div class="col-auto q-mr-xs">
                    :
                  </div>
                  <div class="col full-width">
                    {{ pasien?.alamat }}
                  </div>
                </div>
              </div>
            </div>

            <div class="row q-mt-xs">
              <div class="col-4">
                RM
              </div>
              <div class="col-8">
                <div class="flex">
                  : {{ pasien?.norm }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="q-mt-lg q-pa-sm">
          Saya memahami perlunya dan manfaat tindakan tersebut termasuk risiko dan komplikasi yang akan timbul. Saya juga
          menyadri bahwa ilmu kedokteran bukanlah ilmu pasti, maka keberhasikan tindakan kedokteran bukanlah keniscayaan,
          melainkan tergantung kepada ijin Tuhan Yang Maha Esa.
        </div>

        <!-- end section-3 -->

        <div class="section-3 q-mt-lg">
          <div class="text-right f-12 q-mb-lg q-mr-sm">
            Probolinggo, {{ humanDate(item?.tanggal) }}, pkl: {{ jamTnpDetik(item?.tanggal) }}
          </div>
          <q-markup-table dense separator="cell" flat bordered wrap-cells>
            <thead>
              <tr>
                <th class="text-left f-12" width="20%" />
                <th class="text-center f-12" width="20%">
                  Dokter
                </th>
                <th class="text-center f-12" width="20%">
                  Saksi RS
                </th>
                <th class="text-center" width="20%">
                  Saksi Pasien
                </th>
                <th class="text-center" width="20%">
                  Yang Menyatakan
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="text-left f-12">
                  Nama Jelas
                </td>
                <td class="text-center f-12">
                  {{ item?.pelaksana }}
                </td>
                <td class="text-center f-12">
                  {{ item?.pengedukasi }}
                </td>
                <td class="text-center">
                  {{ item?.saksiPasien }}
                </td>
                <td class="text-center">
                  {{ item?.nama }}
                </td>
              </tr>
              <tr>
                <td class="text-left f-12">
                  Tanda Tangan
                </td>
                <td class="text-center f-12">
                  <img :src="item?.ttd_dokter" alt="ttd dokter" width="70">
                </td>
                <td class="text-center f-12">
                  <img :src="item?.ttd_petugas" alt="ttd-petugas" width="70">
                </td>
                <td class="text-center">
                  <img :src="item?.ttd_saksi_pasien" alt="ttd-saksi-pasien" width="70">
                </td>
                <td class="text-center">
                  <img :src="item?.ttd_yg_menyatakan" alt="ttd-yg-menyatakan" width="70">
                </td>
              </tr>
            </tbody>
          </q-markup-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// import { pathImg } from 'src/boot/axios'
import html2pdf from 'html2pdf.js'
import { pathImg } from 'src/boot/axios'
import { humanDate, jamTnpDetik } from 'src/modules/formatter'
import { imageToBase64 } from 'src/modules/imgBase64'
import { useConcernOperasiInvasifRanapStore } from 'src/stores/simrs/ranap/concernoperasiinvasif'
import { onMounted, ref } from 'vue'
const store = useConcernOperasiInvasifRanapStore()

const props = defineProps({
  item: {
    type: Object,
    default: null
  },
  pasien: {
    type: Object,
    default: null
  },
  coba: {
    type: String,
    default: null
  }
})

onMounted(() => {
  hubDgPas()
  initImage(props.item)
})

function initImage (item) {
  const ttdPetugas = pathImg + item?.ttdPetugas
  const ttdDokter = pathImg + item?.ttdDokter
  const ttdSaksiPasien = pathImg + item?.ttdSaksiPasien
  const ttdYgMenyatakan = pathImg + item?.ttdYgMenyatakan

  Promise.all([
    imageToBase64(ttdPetugas, (base64Image) => {
      // document.getElementsByClassName('ttd-petugas')[0].src = base64Image
      // document.getElementsByClassName('ttd-petugas')[1].src = base64Image
      item.ttd_petugas = base64Image ?? ''
    }),
    imageToBase64(ttdDokter, (base64Image) => {
      // document.getElementsByClassName('ttd-dokter')[0].src = base64Image
      item.ttd_dokter = base64Image ?? ''
    }),
    imageToBase64(ttdSaksiPasien, (base64Image) => {
      // document.getElementsByClassName('ttd-saksi-pasien')[0].src = base64Image
      item.ttd_saksi_pasien = base64Image ?? ''
    }),
    imageToBase64(ttdYgMenyatakan, (base64Image) => {
      // document.getElementsByClassName('ttd-yg-menyatakan')[0].src = base64Image
      // document.getElementsByClassName('ttd-yg-menyatakan')[1].src = base64Image
      item.ttd_yg_menyatakan = base64Image ?? ''
    })
  ])
}

const modP = ref([])

function hubDgPas () {
  const a = []
  a.push(props.item?.hubunganDgPasien)
  modP.value = a
}

function getNewLine (text) {
  // console.log('text', text)

  return text?.replace(/\n/g, '<br/>')
}

const exportPdf = () => {
  const concern = document.getElementById('pdfDoc')

  const pdfConfig = {
    margin: 0,
    filename: 'inform-consent-' + props?.item?.jenis + '.pdf',
    image: {
      type: 'jpeg',
      quality: 0.98
    },
    html2canvas: {
      scale: 2,
      logging: true,
      dpi: 192,
      letterRendering: true
    },
    jsPDF: {
      unit: 'mm', // mm | pt | in
      format: 'a4', // a4 | letter
      orientation: 'portrait' // landscape | portrait
    }
  }

  html2pdf().set(pdfConfig).from(concern).save()
}
defineExpose({ exportPdf })
</script>
