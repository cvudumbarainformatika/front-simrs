<template>
  <div class="full-width full-height bg-white q-pa-sm">
    <div class="row q-py-xs">
      <div class="col-2">
        Ruangan
      </div>
      <div class="col-8">
        <div class="row">
          {{ ruangan }}
        </div>
        <div class="row f-8 text-right text-italic">
          *otomatis sesuai hak akses
        </div>
      </div>
    </div>
    <div class="row q-py-xs">
      <div class="col-2">
        Tanggal penyesuaian
      </div>
      <div class="col-8">
        {{ dateFull( store.form.tgl_penyesuaian) }}
      </div>
    </div>
    <div class="row items-center q-py-xs">
      <div class="col-2">
        Obat
      </div>
      <div class="col-8">
        <q-select
          v-model="model"
          outlined
          dense
          use-input
          fill-input
          input-debounce="500"
          label="Cari Obat"
          option-label="nama_obat"
          option-value="kd_obat"
          :options="options"
          hide-dropdown-icon
          hide-selected
          @filter="filterFn"
          @update:model-value="modelSelected"
          @clear="clearModel"
        >
          <template v-if="model" #append>
            <q-icon name="icon-mat-cancel" @click.stop.prevent="model = null" class="cursor-pointer" @click="clearModel" />
          </template>
          <template #option="scope">
            <q-item v-bind="scope.itemProps" class="row items-end">
              <div class="text-weight-bold" style="width: 30%">
                {{ scope.opt.nama_obat }}
              </div>
              <div class="q-ml-xs " style="width: calc(70%/5)">
                <div class="row justify-between" style="width: 90%;">
                  <span class="text-light-blue">awal :</span> <span class="text-light-blue text-weight-bold">{{ scope.opt.sAawal }}</span>
                </div>
              </div>
              <div class="q-ml-xs" style="width: calc(70%/5)">
                <div class="row justify-between" style="width: 90%;">
                  <span class="text-green">masuk :</span>  <span class="text-green text-weight-bold">{{ scope.opt.masuk }}</span>
                </div>
              </div>
              <div class="q-ml-xs" style="width: calc(70%/5)">
                <div class="row justify-between" style="width: 90%;">
                  <span class="text-orange">keluar :</span> <span class="text-orange text-weight-bold">{{ scope.opt.keluar }}</span>
                </div>
              </div>
              <div class="q-ml-xs" style="width: calc(70%/5)">
                <div class="row justify-between" style="width: 90%;">
                  <span :class="scope.opt.sAkhir !== scope.opt.sSekarang ? 'text-negative text-weight-bold' : 'text-purple'">akhir :</span> <span :class="scope.opt.sAkhir !== scope.opt.sSekarang ? 'text-negative text-weight-bold' : 'text-purple text-weight-bold'">{{ scope.opt.sAkhir }}</span>
                </div>
              </div>
              <div class="q-ml-xs" style="width: calc(70%/5)">
                <div class="row justify-between" style="width: 90%;">
                  <span :class="scope.opt.sAkhir !== scope.opt.sSekarang ? 'text-negative text-weight-bold' : 'text-deep-purple'">skr :</span> <span :class="scope.opt.sAkhir !== scope.opt.sSekarang ? 'text-negative text-weight-bold' : 'text-deep-purple text-weight-bold'">{{ scope.opt.sSekarang }}</span>
                </div>
              </div>
            </q-item>
          </template>
        </q-select>
      </div>
      <div class="col-2 text-right">
        <app-btn
          label="Ambil Transaksi"
          :loading="store.loadingGetTr"
          :disable="store.loadingGetTr || !store.params.kdobat || !model"
          @click="store.getTransaksi();"
        />
      </div>
    </div>
    <!-- detail obat -->
    <div v-if="store?.obat" class="q-pa-sm">
      <!-- rekap -->
      <div class="row f-18" style="width: 100%;">
        <div class="col-grow" style="width: 30%;">
          <div class="row text-weight-bold">
            {{ store?.obat?.nama_obat }}
          </div>
          <div class="row f-10 text-italic">
            {{ store?.obat?.kd_obat }}
          </div>
        </div>
        <div class="col-grow" style="width: 70%/5;">
          <div class="row justify-between q-mx-sm text-light-blue">
            <div>Awal</div>
            <div class="text-weight-bold">
              {{ store?.obat?.sAawal }}
            </div>
          </div>
        </div>
        <div class="col-grow" style="width: 70%/5;">
          <div class="row justify-between q-mx-sm text-green">
            <div>Masuk</div>
            <div class="text-weight-bold">
              {{ store?.obat?.masuk }}
            </div>
          </div>
        </div>
        <div class="col-grow" style="width: 70%/5;">
          <div class="row justify-between q-mx-sm text-orange">
            <div>Keluar</div>
            <div class="text-weight-bold">
              {{ store?.obat?.keluar }}
            </div>
          </div>
        </div>
        <div class="col-grow" style="width: 70%/5;">
          <div class="row justify-between q-mx-sm " :class="store?.obat?.sAkhir !== store?.obat?.sSekarang ? 'text-negative' : 'text-purple'">
            <div>Akhir</div>
            <div class="text-weight-bold">
              {{ store?.obat?.sAkhir }}
            </div>
          </div>
        </div>
        <div class="col-grow" style="width: 70%/5;">
          <div class="row justify-between q-mx-sm" :class="store?.obat?.sAkhir !== store?.obat?.sSekarang ? 'text-negative text-weight-bold' : 'text-deep-purple'">
            <div>Sekarang</div>
            <div>{{ store?.obat?.sSekarang }}</div>
          </div>
        </div>
      </div>
      <div v-if="store?.loadingGetTr">
        <div class="row bg-white" style="width: 100%; height: 300px;">
          <app-loading />
        </div>
      </div>
      <div v-else>
        <!-- penerimaan Gudang -->
        <div v-if="store?.gudangs?.includes( store?.params.kdruang)">
          <div class="bg-green text-white q-pa-xs f-18 q-mb-sm text-weight-bold row items-center justify-between">
            <div class="col-auto">
              Data Penerimaan
            </div>
            <div class="col-auto q-mr-md">
              <app-btn
                v-if="!store.obat.tampilPenerimaan"
                label="Show"
                icon-right="icon-mat-keyboard_arrow_down"
                color="dark"
                @click="store.obat.tampilPenerimaan=!store.obat.tampilPenerimaan"
              />
              <app-btn
                v-if="store.obat.tampilPenerimaan"
                label="Hide"
                icon-right="icon-mat-keyboard_arrow_up"
                color="dark"
                @click="store.obat.tampilPenerimaan=!store.obat.tampilPenerimaan"
              />
            </div>
          </div>
          <transition
            appear
            enter-active-class="animated slideInUp slow"
            leave-active-class="animated slideOutRight"
          >
            <div v-if="store.obat.tampilPenerimaan">
              <div class="row bg-dark q-pa-xs text-white">
                <div class="col-shrink" style="width: 5%;">
                  No
                </div>
                <div class="col-grow" style="width: 10%;">
                  <div class="q-mr-xs">
                    Tgl Penerimaan
                  </div>
                </div>
                <div class="col-grow" style="width: calc(35%/2);">
                  No penerimaan
                </div>
                <div class="col-grow" style="width: calc(35%/2);">
                  No Faktur
                </div>
                <div class="col-grow" style="width: 25%;">
                  PBF
                </div>
                <div class="col-grow text-right" style="width: 10%;">
                  <div class="q-mr-xs">
                    Nilai
                  </div>
                </div>
                <div class="col-grow text-center" style="width: 10%;">
                  <div class="q-mr-xs">
                    Status
                  </div>
                </div>
                <div class="col-grow text-right" style="width: 5%;">
                  <div class="q-mr-xs">
                    #
                  </div>
                </div>
              </div>
              <div v-if="store?.obat?.penerimaan?.length > 0 " class="q-pa-xs">
                <div v-for="(item,i) in store?.obat?.penerimaan" :key="i">
                  <div
                    class="row q-pa-xs cursor-pointer" :class="i%2===1?'bg-grey-4':'bg-white'"
                    @click="item.expand = !item.expand"
                  >
                    <div class="col-shrink" style="width: 5%;">
                      {{ i +1 }}
                    </div>
                    <div class="col-grow" style="width: 10%;">
                      <div class="q-mr-xs">
                        {{ dateFullFormat(item?.tglpenerimaan) }}
                      </div>
                    </div>
                    <div class="col-grow" style="width: calc(35%/2);">
                      {{ item?.nopenerimaan }}
                    </div>
                    <div class="col-grow" style="width: calc(35%/2);">
                      {{ item?.faktur?.no_faktur ??item?.nomorsurat }}
                    </div>
                    <div class="col-grow" style="width: 25%;">
                      {{ item?.pihakketiga?.nama??'PBF tidak ditemukan' }}
                    </div>
                    <div class="col-grow text-right" style="width: 10%;">
                      <div class="q-mr-xs">
                        {{ formatDouble(parseFloat(item?.faktur?.total_faktur??item?.total_faktur_pbf),2) }}
                      </div>
                    </div>
                    <div class="col-grow text-center" style="width: 10%;">
                      <div v-if="item?.tgl_pembayaran" class="q-mr-xs">
                        <q-chip dense class="glossy" square color="negative" text-color="white">
                          Dibayar
                        </q-chip>
                      </div>
                      <div v-else-if="item?.tgl_bast" class="q-mr-xs">
                        <q-chip dense class="glossy" square color="deep-orange" text-color="white">
                          Sudah BAST
                        </q-chip>
                      </div>
                      <div v-else class="q-mr-xs">
                        <q-chip dense class="glossy" square color="orange" text-color="white">
                          Di kunci
                        </q-chip>
                      </div>
                    </div>
                    <div class="col-grow" style="width: 5%;">
                      <div class="row no-wrap justify-end q-mr-xs">
                        aksi
                      </div>
                    </div>
                  </div>
                  <transition
                    appear
                    enter-active-class="animated slideInUp slow"
                    leave-active-class="animated slideOutRight"
                  >
                    <div v-if="item.expand" :class="i%2===1?'bg-grey-4':'bg-white'">
                      <div class="q-mx-sm">
                        <div class="row bg-amber text-weight-bold q-pa-xs">
                          <div class="col-auto" style="width: 5%;">
                            NO
                          </div>
                          <div class="col-auto" style="width: 10%;">
                            Kode Obat
                          </div>
                          <div class="col-auto" style="width: 20%;">
                            Nama Obat
                          </div>
                          <div class="col-auto" style="width: calc(55%/5);">
                            No Batch
                          </div>
                          <div class="col-auto" style="width: calc(55%/5);">
                            Tgl Exp
                          </div>
                          <div class="col-auto text-right" style="width: calc(55%/5);">
                            <div q-mr-xs>
                              Jumlah
                            </div>
                          </div>
                          <div class="col-auto text-right" style="width: calc(55%/5);">
                            <div q-mr-xs>
                              Harga
                            </div>
                          </div>
                          <div class="col-auto text-right" style="width: calc(55%/5);">
                            <div q-mr-xs>
                              Subtotal
                            </div>
                          </div>
                          <div class="col-grow text-right" style="width: 10%;">
                            <div class="q-mr-xs">
                              #
                            </div>
                          </div>
                        </div>
                        <div v-if="item?.penerimaanrinci?.length > 0">
                          <div v-for="(rinci,i2) in item?.penerimaanrinci" :key="i2">
                            <div :class="(i2%2===1?'bg-yellow-4':'bg-yellow-2') +' row q-pa-xs'">
                              <div class="col-auto" style="width: 5%;">
                                {{ i2+1 }}
                              </div>
                              <div class="col-auto" style="width: 10%;">
                                {{ rinci?.kdobat }}
                              </div>
                              <div class="col-auto" style="width: 20%;">
                                {{ rinci?.masterobat?.nama_obat }}
                              </div>
                              <div class="col-auto" style="width: calc(55%/5);">
                                {{ rinci?.no_batch }}
                              </div>
                              <div class="col-auto" style="width: calc(55%/5);">
                                {{ dateFullFormat(rinci?.tgl_exp) }}
                              </div>
                              <div class="col-auto text-right" style="width: calc(55%/5);">
                                <div class="row q-mr-xs no-wrap items-end">
                                  <div class="col-grow q-mr-xs">
                                    {{ rinci?.jml_terima_k }}
                                  </div>
                                  <div class="col-shrink f-10 text-italic">
                                    ( {{ rinci?.masterobat?.satuan_k }} )
                                  </div>
                                </div>
                              </div>
                              <div class="col-auto text-right" style="width: calc(55%/5);">
                                <div q-mr-xs>
                                  {{ formatDouble(rinci?.harga_netto,2) }}
                                </div>
                              </div>
                              <div class="col-auto text-right" style="width: calc(55%/5);">
                                <div q-mr-xs>
                                  {{ formatDouble(rinci?.subtotal,2) }}
                                </div>
                              </div>
                              <div class="col-grow text-right" style="width: 10%;">
                                <div class="q-mr-xs">
                                  #
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div v-else>
                          <app-no-data-small />
                        </div>
                      </div>
                    </div>
                  </transition>
                </div>
              </div>
              <div v-else>
                <app-no-data-small />
              </div>
            </div>
          </transition>
        </div>
        <!-- penerimaan Depo (Mutasi Masuk) -->
        <div v-if="!store?.gudangs?.includes( store?.params.kdruang)">
          <div class="bg-green text-white q-pa-xs f-18 q-mb-sm text-weight-bold row items-center justify-between">
            <div class="col-auto">
              Data Mutasi Masuk
            </div>
            <div class="col-auto q-mr-md">
              <app-btn
                v-if="!store.obat.tampilMutasiMasuk"
                label="Show"
                icon-right="icon-mat-keyboard_arrow_down"
                color="dark"
                @click="store.obat.tampilMutasiMasuk=!store.obat.tampilMutasiMasuk"
              />
              <app-btn
                v-if="store.obat.tampilMutasiMasuk"
                label="Hide"
                icon-right="icon-mat-keyboard_arrow_up"
                color="dark"
                @click="store.obat.tampilMutasiMasuk=!store.obat.tampilMutasiMasuk"
              />
            </div>
          </div>
          <transition
            appear
            enter-active-class="animated slideInUp slow"
            leave-active-class="animated slideOutRight"
          >
            <div v-if="store.obat.tampilMutasiMasuk">
              <div class="row bg-dark q-pa-xs text-white">
                <div class="col-shrink" style="width: 5%;">
                  No
                </div>
                <div class="col-grow" style="width: calc(40%/3);">
                  <div class="q-mr-xs">
                    Tgl Kirim Permintaan
                  </div>
                </div>
                <div class="col-grow" style="width: calc(40%/3);">
                  <div class="q-mr-xs">
                    Tgl Distribusi
                  </div>
                </div>
                <div class="col-grow" style="width: calc(40%/3);">
                  <div class="q-mr-xs">
                    Tgl Sampai
                  </div>
                </div>
                <div class="col-grow" style="width: calc(40%/2);">
                  Asal
                </div>
                <div class="col-grow" style="width: calc(40%/2);">
                  Tujuan
                </div>
                <div class="col-grow text-center" style="width: 10%;">
                  <div class="q-mr-xs">
                    Status
                  </div>
                </div>
                <div class="col-grow text-right" style="width: 5%;">
                  <div class="q-mr-xs">
                    #
                  </div>
                </div>
              </div>
              <div v-if="store?.obat?.mutasiMasuk?.length > 0 " class="q-pa-xs">
                <div v-for="(item,i) in store?.obat?.mutasiMasuk" :key="i">
                  <div
                    class="row q-pa-xs cursor-pointer" :class="i%2===1?'bg-grey-4':'bg-white'"
                    @click="()=>{
                      item.expand = !item.expand
                      const ada=item?.permintaanrinci.filter(ri=>ri?.expand)
                      if(ada?.length>0){
                        item.permintaanrinci.map(ri=>ri.expand=false)
                      }
                    }"
                  >
                    <div class="col-shrink" style="width: 5%;">
                      {{ i +1 }}
                    </div>
                    <div class="col-grow" style="width: calc(40%/3);">
                      <div class="q-mr-xs">
                        {{ dateFullFormat(item?.tgl_kirim) }}
                      </div>
                    </div>
                    <div class="col-grow" style="width: calc(40%/3);">
                      <div class="q-mr-xs">
                        {{ dateFullFormat(item?.tgl_kirim_depo) }}
                      </div>
                    </div>
                    <div class="col-grow" style="width: calc(40%/3);">
                      <div class="q-mr-xs">
                        {{ dateFullFormat(item?.tgl_terima_depo) }}
                      </div>
                    </div>
                    <div class="col-grow" style="width: calc(40%/2);">
                      {{ item?.menuju?.nama ??'Gudang / Depo Tujuan tidak ditemukan' }}
                    </div>
                    <div class="col-grow" style="width: calc(40%/2);">
                      {{ item?.asal?.nama ??'Depo Asal tidak ditemukan' }}
                    </div>
                    <div class="col-grow text-center" style="width: 10%;">
                      <q-chip
                        dense class="glossy" square
                        :color="warna(item?.flag)"
                        :text-color="warnaText(item?.flag)"
                      >
                        {{ textNya(item?.flag) }}
                      </q-chip>
                    </div>
                    <div class="col-grow" style="width: 5%;">
                      <div class="row no-wrap justify-end q-mr-xs">
                        aksi
                      </div>
                    </div>
                  </div>
                  <transition
                    appear
                    enter-active-class="animated slideInUp slow"
                    leave-active-class="animated slideOutRight"
                  >
                    <div v-if="item.expand" :class="i%2===1?'bg-grey-4':'bg-white'">
                      <div class="q-ml-sm q-my-sm">
                        <div class="row bg-amber text-weight-bold q-pa-xs">
                          <div class="col-auto" style="width: 5%;">
                            NO
                          </div>
                          <div class="col-auto" style="width: 10%;">
                            Kode Obat
                          </div>
                          <div class="col-auto" style="width: 20%;">
                            Nama Obat
                          </div>
                          <div class="col-auto" style="width: calc(55%/3);">
                            Tgl Distribusi
                          </div>
                          <div class="col-auto text-right" style="width: calc(55%/3);">
                            <div q-mr-xs>
                              Jumlah
                            </div>
                          </div>
                          <div class="col-auto text-right" style="width: calc(55%/3);">
                            <div q-mr-xs>
                              Diverif
                            </div>
                          </div>
                          <div class="col-grow text-right" style="width: 10%;">
                            <div class="q-mr-xs">
                              #
                            </div>
                          </div>
                        </div>
                        <div v-if="item?.permintaanrinci?.length > 0">
                          <div v-for="(rinci,i2) in item?.permintaanrinci" :key="i2">
                            <div :class="(i2%2===1?'bg-yellow-4':'bg-yellow-2') +' row q-pa-xs cursor-pointer'" @click="rinci.expand = !rinci.expand">
                              <div class="col-auto" style="width: 5%;">
                                {{ i2+1 }}
                              </div>
                              <div class="col-auto" style="width: 10%;">
                                {{ rinci?.masterobat?.kd_obat }}
                              </div>
                              <div class="col-auto" style="width: 20%;">
                                {{ rinci?.masterobat?.nama_obat }}
                              </div>
                              <div class="col-auto" style="width: calc(55%/3);">
                                {{ dateFullFormat(rinci?.tgl_verif) }}
                              </div>
                              <div class="col-auto text-right" style="width: calc(55%/3);">
                                <div class="row q-mr-xs no-wrap items-end">
                                  <div class="col-grow q-mr-xs">
                                    {{ rinci?.jumlah_minta }}
                                  </div>
                                  <div class="col-shrink f-10 text-italic">
                                    ( {{ rinci?.masterobat?.satuan_k }} )
                                  </div>
                                </div>
                              </div>
                              <div class="col-auto text-right" style="width: calc(55%/3);">
                                <div class="row q-mr-xs no-wrap items-end">
                                  <div class="col-grow q-mr-xs">
                                    {{ rinci?.jumlah_diverif }}
                                  </div>
                                  <div class="col-shrink f-10 text-italic">
                                    ( {{ rinci?.masterobat?.satuan_k }} )
                                  </div>
                                </div>
                              </div>
                              <div class="col-grow text-right" style="width: 10%;">
                                <div class="q-mr-xs">
                                  #
                                </div>
                              </div>
                            </div>
                            <transition
                              appear
                              enter-active-class="animated slideInUp slow"
                              leave-active-class="animated slideOutRight"
                            >
                              <div v-if="rinci?.expand" :class="i%2===1?'bg-grey-4':'bg-white'">
                                <div class="q-ml-sm q-my-sm">
                                  <div class="row bg-deep-purple text-white text-weight-bold q-pa-xs">
                                    <div class="col-auto" style="width: 5%;">
                                      NO
                                    </div>
                                    <div class="col-auto" style="width: 20%;">
                                      Nama Obat
                                    </div>
                                    <div class="col-auto" style="width: 15%;">
                                      Nomor Pemerimaan
                                    </div>
                                    <div class="col-auto" style="width: calc(50%/5);">
                                      No Batch
                                    </div>
                                    <div class="col-auto" style="width: calc(50%/5);">
                                      Tgl Penerimaan
                                    </div>
                                    <div class="col-auto" style="width: calc(50%/5);">
                                      Tgl Exp
                                    </div>
                                    <div class="col-auto text-right" style="width: calc(50%/5);">
                                      <div q-mr-xs>
                                        Jumlah
                                      </div>
                                    </div>
                                    <div class="col-auto text-right" style="width: calc(50%/5);">
                                      <div q-mr-xs>
                                        Harga
                                      </div>
                                    </div>
                                    <div class="col-grow text-right" style="width: 10%;">
                                      <div class="q-mr-xs">
                                        #
                                      </div>
                                    </div>
                                  </div>
                                  <div v-if="rinci?.mutasi?.length > 0">
                                    <div v-for="(mut,i3) in rinci?.mutasi" :key="i3">
                                      <div :class="(i3%2===1?'bg-purple-4':'bg-purple-2') +' row q-pa-xs'">
                                        <div class="col-auto" style="width: 5%;">
                                          {{ i3+1 }}
                                        </div>
                                        <div class="col-auto" style="width: 20%;">
                                          {{ mut?.obat?.nama_obat }}
                                        </div>
                                        <div class="col-auto" style="width: 15%;">
                                          {{ mut?.nopenerimaan }}
                                        </div>
                                        <div class="col-auto" style="width: calc(50%/5);">
                                          {{ mut?.nobatch }}
                                        </div>
                                        <div class="col-auto" style="width: calc(50%/5);">
                                          {{ dateFullFormat(mut?.tglpenerimaan) }}
                                        </div>
                                        <div class="col-auto" style="width: calc(50%/5);">
                                          {{ dateFullFormat(mut?.tglexp) }}
                                        </div>
                                        <div class="col-auto text-right" style="width: calc(50%/5);">
                                          <div class="row q-mr-xs no-wrap items-end">
                                            <div class="col-grow q-mr-xs">
                                              {{ mut?.jml }}
                                            </div>
                                            <div class="col-shrink f-10 text-italic">
                                              ( {{ mut?.obat?.satuan_k }} )
                                            </div>
                                          </div>
                                        </div>
                                        <div class="col-auto text-right" style="width: calc(50%/5);">
                                          <div q-mr-xs>
                                            {{ formatDouble(mut?.harga,2) }}
                                          </div>
                                        </div>
                                        <div class="col-grow text-right" style="width: 10%;">
                                          <div class="q-mr-xs">
                                            #
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div v-else>
                                    <app-no-data-small />
                                  </div>
                                </div>
                              </div>
                            </transition>
                          </div>
                        </div>
                        <div v-else>
                          <app-no-data-small />
                        </div>
                      </div>
                    </div>
                  </transition>
                </div>
              </div>
              <div v-else>
                <app-no-data-small />
              </div>
            </div>
          </transition>
        </div>
        <!-- Mutasi Keluar -->
        <div>
          <div class="bg-orange text-white q-pa-xs f-18 q-mb-sm text-weight-bold row items-center justify-between">
            <div class="col-auto">
              Data Mutasi Keluar
            </div>
            <div class="col-auto q-mr-md">
              <app-btn
                v-if="!store.obat.tampilMutasiKeluar"
                label="Show"
                icon-right="icon-mat-keyboard_arrow_down"
                color="dark"
                @click="store.obat.tampilMutasiKeluar=!store.obat.tampilMutasiKeluar"
              />
              <app-btn
                v-if="store.obat.tampilMutasiKeluar"
                label="Hide"
                icon-right="icon-mat-keyboard_arrow_up"
                color="dark"
                @click="store.obat.tampilMutasiKeluar=!store.obat.tampilMutasiKeluar"
              />
            </div>
          </div>
          <transition
            appear
            enter-active-class="animated slideInUp slow"
            leave-active-class="animated slideOutRight"
          >
            <div v-if="store.obat.tampilMutasiKeluar">
              <div class="row bg-dark q-pa-xs text-white">
                <div class="col-shrink" style="width: 5%;">
                  No
                </div>
                <div class="col-grow" style="width: calc(40%/3);">
                  <div class="q-mr-xs">
                    Tgl Kirim Permintaan
                  </div>
                </div>
                <div class="col-grow" style="width: calc(40%/3);">
                  <div class="q-mr-xs">
                    Tgl Distribusi
                  </div>
                </div>
                <div class="col-grow" style="width: calc(40%/3);">
                  <div class="q-mr-xs">
                    Tgl Sampai
                  </div>
                </div>
                <div class="col-grow" style="width: calc(40%/2);">
                  Asal
                </div>
                <div class="col-grow" style="width: calc(40%/2);">
                  Tujuan
                </div>
                <div class="col-grow text-center" style="width: 10%;">
                  <div class="q-mr-xs">
                    Status
                  </div>
                </div>
                <div class="col-grow text-right" style="width: 5%;">
                  <div class="q-mr-xs">
                    #
                  </div>
                </div>
              </div>
              <div v-if="store?.obat?.mutasiKeluar?.length > 0" class="q-pa-xs">
                <div v-for="(item,i) in store?.obat?.mutasiKeluar" :key="i">
                  <div
                    class="row q-pa-xs cursor-pointer" :class="i%2===1?'bg-grey-4':'bg-white'"
                    @click="()=>{
                      item.expand = !item.expand
                      const ada=item?.permintaanrinci.filter(ri=>ri?.expand)
                      if(ada?.length>0){
                        item.permintaanrinci.map(ri=>ri.expand=false)
                      }
                    }"
                  >
                    <div class="col-shrink" style="width: 5%;">
                      {{ i +1 }}
                    </div>
                    <div class="col-grow" style="width: calc(40%/3);">
                      <div class="q-mr-xs">
                        {{ dateFullFormat(item?.tgl_kirim) }}
                      </div>
                    </div>
                    <div class="col-grow" style="width: calc(40%/3);">
                      <div class="q-mr-xs">
                        {{ dateFullFormat(item?.tgl_kirim_depo) }}
                      </div>
                    </div>
                    <div class="col-grow" style="width: calc(40%/3);">
                      <div class="q-mr-xs">
                        {{ dateFullFormat(item?.tgl_terima_depo) }}
                      </div>
                    </div>
                    <div class="col-grow \" style="width: calc(40%/2);">
                      {{ item?.menuju?.nama ??'Gudang / Depo Asal tidak ditemukan' }}
                    </div>
                    <div class="col-grow" style="width: calc(40%/2);">
                      {{ item?.asal?.nama ??'Depo Tujuan tidak ditemukan' }}
                    </div>
                    <div class="col-grow text-center" style="width: 10%;">
                      <q-chip
                        dense class="glossy" square
                        :color="warna(item?.flag)"
                        :text-color="warnaText(item?.flag)"
                      >
                        {{ textNya(item?.flag) }}
                      </q-chip>
                    </div>
                    <div class="col-grow" style="width: 5%;">
                      <div class="row no-wrap justify-end q-mr-xs">
                        aksi
                      </div>
                    </div>
                  </div>
                  <transition
                    appear
                    enter-active-class="animated slideInUp slow"
                    leave-active-class="animated slideOutRight"
                  >
                    <div v-if="item.expand" :class="i%2===1?'bg-grey-4':'bg-white'">
                      <div class="q-ml-sm q-my-sm">
                        <div class="row bg-amber text-weight-bold q-pa-xs">
                          <div class="col-auto" style="width: 5%;">
                            NO
                          </div>
                          <div class="col-auto" style="width: 10%;">
                            Kode Obat
                          </div>
                          <div class="col-auto" style="width: 20%;">
                            Nama Obat
                          </div>
                          <div class="col-auto" style="width: calc(55%/3);">
                            Tgl Distribusi
                          </div>
                          <div class="col-auto text-right" style="width: calc(55%/3);">
                            <div q-mr-xs>
                              Jumlah
                            </div>
                          </div>
                          <div class="col-auto text-right" style="width: calc(55%/3);">
                            <div q-mr-xs>
                              Diverif
                            </div>
                          </div>
                          <div class="col-grow text-right" style="width: 10%;">
                            <div class="q-mr-xs">
                              #
                            </div>
                          </div>
                        </div>
                        <div v-if="item?.permintaanrinci?.length > 0">
                          <div v-for="(rinci,i2) in item?.permintaanrinci" :key="i2">
                            <div :class="(i2%2===1?'bg-yellow-4':'bg-yellow-2') +' row q-pa-xs cursor-pointer'" @click="rinci.expand = !rinci.expand">
                              <div class="col-auto" style="width: 5%;">
                                {{ i2+1 }}
                              </div>
                              <div class="col-auto" style="width: 10%;">
                                {{ rinci?.masterobat?.kd_obat }}
                              </div>
                              <div class="col-auto" style="width: 20%;">
                                {{ rinci?.masterobat?.nama_obat }}
                              </div>
                              <div class="col-auto" style="width: calc(55%/3);">
                                {{ dateFullFormat(rinci?.tgl_verif) }}
                              </div>
                              <div class="col-auto text-right" style="width: calc(55%/3);">
                                <div class="row q-mr-xs no-wrap items-end">
                                  <div class="col-grow q-mr-xs">
                                    {{ rinci?.jumlah_minta }}
                                  </div>
                                  <div class="col-shrink f-10 text-italic">
                                    ( {{ rinci?.masterobat?.satuan_k }} )
                                  </div>
                                </div>
                              </div>
                              <div class="col-auto text-right" style="width: calc(55%/3);">
                                <div class="row q-mr-xs no-wrap items-end">
                                  <div class="col-grow q-mr-xs">
                                    {{ rinci?.jumlah_diverif }}
                                  </div>
                                  <div class="col-shrink f-10 text-italic">
                                    ( {{ rinci?.masterobat?.satuan_k }} )
                                  </div>
                                </div>
                              </div>
                              <div class="col-grow text-right" style="width: 10%;">
                                <div class="q-mr-xs">
                                  #
                                </div>
                              </div>
                            </div>
                            <transition
                              appear
                              enter-active-class="animated slideInUp slow"
                              leave-active-class="animated slideOutRight"
                            >
                              <div v-if="rinci?.expand" :class="i%2===1?'bg-grey-4':'bg-white'">
                                <div class="q-ml-sm q-my-sm">
                                  <div class="row bg-deep-purple text-white text-weight-bold q-pa-xs">
                                    <div class="col-auto" style="width: 5%;">
                                      NO
                                    </div>
                                    <div class="col-auto" style="width: 20%;">
                                      Nama Obat
                                    </div>
                                    <div class="col-auto" style="width: 15%;">
                                      Nomor Pemerimaan
                                    </div>
                                    <div class="col-auto" style="width: calc(50%/5);">
                                      No Batch
                                    </div>
                                    <div class="col-auto" style="width: calc(50%/5);">
                                      Tgl Penerimaan
                                    </div>
                                    <div class="col-auto" style="width: calc(50%/5);">
                                      Tgl Exp
                                    </div>
                                    <div class="col-auto text-right" style="width: calc(50%/5);">
                                      <div q-mr-xs>
                                        Jumlah
                                      </div>
                                    </div>
                                    <div class="col-auto text-right" style="width: calc(50%/5);">
                                      <div q-mr-xs>
                                        Harga
                                      </div>
                                    </div>
                                    <div class="col-grow text-right" style="width: 10%;">
                                      <div class="q-mr-xs">
                                        #
                                      </div>
                                    </div>
                                  </div>
                                  <div v-if="rinci?.mutasi?.length > 0">
                                    <div v-for="(mut,i3) in rinci?.mutasi" :key="i3">
                                      <div :class="(i3%2===1?'bg-purple-4':'bg-purple-2') +' row q-pa-xs'">
                                        <div class="col-auto" style="width: 5%;">
                                          {{ i3+1 }}
                                        </div>
                                        <div class="col-auto" style="width: 20%;">
                                          {{ mut?.obat?.nama_obat }}
                                        </div>
                                        <div class="col-auto" style="width: 15%;">
                                          {{ mut?.nopenerimaan }}
                                        </div>
                                        <div class="col-auto" style="width: calc(50%/5);">
                                          {{ mut?.nobatch }}
                                        </div>
                                        <div class="col-auto" style="width: calc(50%/5);">
                                          {{ dateFullFormat(mut?.tglpenerimaan) }}
                                        </div>
                                        <div class="col-auto" style="width: calc(50%/5);">
                                          {{ dateFullFormat(mut?.tglexp) }}
                                        </div>
                                        <div class="col-auto text-right" style="width: calc(50%/5);">
                                          <div class="row q-mr-xs no-wrap items-end">
                                            <div class="col-grow q-mr-xs">
                                              {{ mut?.jml }}
                                            </div>
                                            <div class="col-shrink f-10 text-italic">
                                              ( {{ mut?.obat?.satuan_k }} )
                                            </div>
                                          </div>
                                        </div>
                                        <div class="col-auto text-right" style="width: calc(50%/5);">
                                          <div q-mr-xs>
                                            {{ formatDouble(mut?.harga,2) }}
                                          </div>
                                        </div>
                                        <div class="col-grow text-right" style="width: 10%;">
                                          <div class="q-mr-xs">
                                            #
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div v-else>
                                    <app-no-data-small />
                                  </div>
                                </div>
                              </div>
                            </transition>
                          </div>
                        </div>
                        <div v-else>
                          <app-no-data-small />
                        </div>
                      </div>
                    </div>
                  </transition>
                </div>
              </div>
              <div v-else>
                <app-no-data-small />
              </div>
            </div>
          </transition>
        </div>
        <!-- Resep -->
        <div v-if="!store?.gudangs?.includes( store?.params.kdruang)">
          <div class="bg-orange text-white q-pa-xs f-18 q-mb-sm text-weight-bold row items-center justify-between">
            <div class="col-auto">
              Data Resep
            </div>
            <div class="col-auto q-mr-md">
              <app-btn
                v-if="!store.obat.tampilResep"
                label="Show"
                icon-right="icon-mat-keyboard_arrow_down"
                color="dark"
                @click="store.obat.tampilResep=!store.obat.tampilResep"
              />
              <app-btn
                v-if="store.obat.tampilResep"
                label="Hide"
                icon-right="icon-mat-keyboard_arrow_up"
                color="dark"
                @click="store.obat.tampilResep=!store.obat.tampilResep"
              />
            </div>
          </div>
          <transition
            appear
            enter-active-class="animated slideInUp slow"
            leave-active-class="animated slideOutRight"
          >
            <div v-if="store.obat.tampilResep">
              <div class="row bg-dark q-pa-xs text-white">
                <div class="col-shrink" style="width: 5%;">
                  No
                </div>
                <div class="col-shrink" style="width: 15%;">
                  Resep
                </div>
                <div class="col-grow" style="width: calc(45%/2);">
                  Pasien
                </div>
                <div class="col-grow" style="width: calc(45%/2);">
                  {{ store?.params?.kdruang==='Gd-05010101'?'Poli':'Ruangan' }}
                </div>
                <div class="col-grow text-center" style="width: calc(20%/2);">
                  <div class="q-mr-xs">
                    jumlah Resep
                  </div>
                </div>
                <div class="col-grow text-center" style="width: calc(20%/2);">
                  <div class="q-mr-xs">
                    jumlah Keluar
                  </div>
                </div>
                <div class="col-grow text-center" style="width: 10%;">
                  <div class="q-mr-xs">
                    Status
                  </div>
                </div>
                <div class="col-grow text-right" style="width: 5%;">
                  <div class="q-mr-xs">
                    #
                  </div>
                </div>
              </div>
              <div v-if="store?.obat?.resep?.length > 0" class="q-pa-xs">
                <div v-for="(item,i) in store?.obat?.resep" :key="i">
                  <div
                    class="row q-pa-xs cursor-pointer" :class="i%2===1?'bg-grey-4':'bg-white'"
                    @click="item.expand = !item.expand"
                  >
                    <div class="col-shrink" style="width: 5%;">
                      {{ i +1 }}
                    </div>
                    <div class="col-shrink" style="width: 15%;">
                      <div class="q-mr-xs">
                        <div class="row">
                          {{ item?.noresep }}
                        </div>
                        <div class="row justify-between items-end f-10 ">
                          <div class="col-auto">
                            dibuat
                          </div>
                          <div class="col-auto">
                            {{ dateFull(item?.tgl_permintaan) }}
                          </div>
                        </div>
                        <div class="row justify-between items-end f-10">
                          <div class="col-auto">
                            dikirim
                          </div>
                          <div class="col-auto">
                            {{ dateFull(item?.tgl_kirim) }}
                          </div>
                        </div>
                        <div class="row justify-between items-end f-10">
                          <div class="col-auto">
                            selesai
                          </div>
                          <div class="col-auto">
                            {{ dateFull(item?.tgl_selesai) }}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-grow" style="width: calc(45%/2);">
                      <div class="row">
                        {{ item?.datapasien?.rs2 ??'Pasien tidak ditemukan' }}
                      </div>
                      <div class="row text-italic f-10">
                        {{ item?.norm }} || {{ item?.noreg }}
                      </div>
                    </div>
                    <div class="col-grow" style="width: calc(45%/2);">
                      {{ item?.poli?.rs2 ??item?.ruanganranap?.rs2 ?? 'Ruangan tidak ditemukan' }}
                    </div>
                    <div class="col-grow text-center" style="width: calc(20%/2);">
                      <div class="q-mr-xs">
                        {{ hitungPermintaan(item) }}
                      </div>
                    </div>
                    <div class="col-grow text-center" style="width: calc(20%/2);">
                      <div class="q-mr-xs">
                        {{ hitungKeluar(item) }}
                      </div>
                    </div>
                    <div class="col-grow text-center" style="width: 10%;">
                      <q-chip
                        dense class="glossy" square
                        :color="warna(item?.flag)"
                        :text-color="warnaText(item?.flag)"
                      >
                        {{ textResep(item?.flag) }}
                      </q-chip>
                    </div>
                    <div class="col-grow" style="width: 5%;">
                      <div class="row no-wrap justify-end q-mr-xs">
                        aksi
                      </div>
                    </div>
                  </div>
                  <transition
                    appear
                    enter-active-class="animated slideInUp slow"
                    leave-active-class="animated slideOutRight"
                  >
                    <div v-if="item.expand" :class="i%2===1?'bg-grey-4':'bg-white'">
                      <div class="q-ml-sm q-my-sm">
                        <div v-if="item?.permintaanresep?.length>0">
                          <div class="q-my-xs bg-blue text-white text-weight-bold">
                            Resep Non Racikan
                          </div>
                          <div class="row text-weight-bold q-ma-xs">
                            <div class="col-auto bg-amber" style="width: 5%;">
                              NO
                            </div>
                            <div class="col-auto bg-amber" style="width: 10%;">
                              Kode Obat
                            </div>
                            <div class="col-auto bg-amber" style="width: 20%;">
                              Nama Obat
                            </div>
                            <div class="col-auto text-right bg-amber" style="width: 10%;">
                              <div class="q-mr-xs">
                                Jumlah Resep
                              </div>
                            </div>
                            <div class="col-auto text-right bg-purple text-white" style="width: 45%;">
                              <div class="row">
                                <div class="col-auto text-right" style="width: 40%;">
                                  <div class="q-mr-xs">
                                    No Penerimaan
                                  </div>
                                </div>
                                <div class="col-auto text-right" style="width: calc(60%/3);">
                                  <div class="q-mr-xs">
                                    Jml Keluar
                                  </div>
                                </div>
                                <div class="col-auto text-right" style="width: calc(60%/3);">
                                  <div class="q-mr-xs">
                                    Harga Beli
                                  </div>
                                </div>
                                <div class="col-auto text-right" style="width: calc(60%/3);">
                                  <div class="q-mr-xs">
                                    Harga Jual
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="col-grow text-right bg-amber" style="width: 10%;">
                              <div class="q-mr-xs">
                                #
                              </div>
                            </div>
                          </div>
                          <div v-if="item?.permintaanresep?.length > 0">
                            <div v-for="(rinci,i2) in item?.permintaanresep" :key="i2">
                              <div :class="(i2%2===1?'bg-yellow-4':'bg-yellow-2') +' row q-pa-xs cursor-pointer'">
                                <div class="col-auto" style="width: 5%;">
                                  {{ i2+1 }}
                                </div>
                                <div class="col-auto" style="width: 10%;">
                                  <div class="row">
                                    {{ rinci?.mobat?.kd_obat }}
                                  </div>
                                  <div class="row text-italic f-10">
                                    ( {{ rinci?.mobat?.satuan_k }} )
                                  </div>
                                </div>
                                <div class="col-auto" style="width: 20%;">
                                  {{ rinci?.mobat?.nama_obat }}
                                </div>
                                <div class="col-auto text-right" style="width: 10%;">
                                  <div class="q-mr-xs">
                                    {{ formatDouble(rinci?.jumlah??0,2) }}
                                  </div>
                                </div>
                                <div class="col-auto text-right" style="width: 45%;">
                                  <div v-for="(keluar) in item?.rincian" :key="keluar">
                                    <div class="row">
                                      <div class="col-auto text-right" style="width: 40%;">
                                        <div class="q-mr-xs">
                                          {{ keluar?.nopenerimaan??' - ' }}
                                        </div>
                                      </div>
                                      <div class="col-auto text-right" style="width: calc(60%/3);">
                                        <div class="q-mr-xs">
                                          {{ formatDouble(keluar?.jumlah??0,2) }}
                                        </div>
                                      </div>
                                      <div class="col-auto text-right" style="width: calc(60%/3);">
                                        <div class="q-mr-xs">
                                          {{ formatDouble(keluar?.harga_beli??0,2) }}
                                        </div>
                                      </div>
                                      <div class="col-auto text-right" style="width: calc(60%/3);">
                                        <div class="q-mr-xs">
                                          {{ formatDouble(keluar?.harga_jual??0,2) }}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div class="col-grow text-right" style="width: 10%;">
                                  <div class="q-mr-xs">
                                    #
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div v-else>
                            <app-no-data-small />
                          </div>
                        </div>
                        <div v-if="item?.permintaanracikan?.length>0">
                          <div class="q-my-xs bg-teal text-white text-weight-bold">
                            Resep Racikan
                          </div>
                          <div class="row text-weight-bold q-ma-xs">
                            <div class="col-auto bg-amber" style="width: 5%;">
                              NO
                            </div>
                            <div class="col-auto bg-amber" style="width: 10%;">
                              Kode Obat
                            </div>
                            <div class="col-auto bg-amber" style="width: 20%;">
                              Nama Obat
                            </div>
                            <div class="col-auto text-right bg-amber" style="width: 10%;">
                              <div class="q-mr-xs">
                                Jumlah Resep
                              </div>
                            </div>
                            <div class="col-auto text-right bg-purple text-white" style="width: 45%;">
                              <div class="row">
                                <div class="col-auto text-right" style="width: 40%;">
                                  <div class="q-mr-xs">
                                    No Penerimaan
                                  </div>
                                </div>
                                <div class="col-auto text-right" style="width: calc(60%/3);">
                                  <div class="q-mr-xs">
                                    Jml Keluar
                                  </div>
                                </div>
                                <div class="col-auto text-right" style="width: calc(60%/3);">
                                  <div class="q-mr-xs">
                                    Harga Beli
                                  </div>
                                </div>
                                <div class="col-auto text-right" style="width: calc(60%/3);">
                                  <div class="q-mr-xs">
                                    Harga Jual
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="col-grow text-right bg-amber" style="width: 10%;">
                              <div class="q-mr-xs">
                                #
                              </div>
                            </div>
                          </div>
                          <div v-if="item?.permintaanracikan?.length > 0">
                            <div v-for="(rinci,i2) in item?.permintaanracikan" :key="i2">
                              <div :class="(i2%2===1?'bg-yellow-4':'bg-yellow-2') +' row q-pa-xs cursor-pointer'">
                                <div class="col-auto" style="width: 5%;">
                                  {{ i2+1 }}
                                </div>
                                <div class="col-auto" style="width: 10%;">
                                  <div class="row">
                                    {{ rinci?.mobat?.kd_obat }}
                                  </div>
                                  <div class="row text-italic f-10">
                                    ( {{ rinci?.mobat?.satuan_k }} )
                                  </div>
                                </div>
                                <div class="col-auto" style="width: 20%;">
                                  {{ rinci?.mobat?.nama_obat }}
                                </div>
                                <div class="col-auto text-right" style="width: 10%;">
                                  <div class="q-mr-xs">
                                    {{ formatDouble(rinci?.jumlah??0,2) }}
                                  </div>
                                </div>
                                <div class="col-auto text-right" style="width: 45%;">
                                  <div v-for="(keluar) in item?.rincianracik" :key="keluar">
                                    <div class="row">
                                      <div class="col-auto text-right" style="width: 40%;">
                                        <div class="q-mr-xs">
                                          {{ keluar?.nopenerimaan??' - ' }}
                                        </div>
                                      </div>
                                      <div class="col-auto text-right" style="width: calc(60%/3);">
                                        <div class="q-mr-xs">
                                          {{ formatDouble(keluar?.jumlah??0,2) }}
                                        </div>
                                      </div>
                                      <div class="col-auto text-right" style="width: calc(60%/3);">
                                        <div class="q-mr-xs">
                                          {{ formatDouble(keluar?.harga_beli??0,2) }}
                                        </div>
                                      </div>
                                      <div class="col-auto text-right" style="width: calc(60%/3);">
                                        <div class="q-mr-xs">
                                          {{ formatDouble(keluar?.harga_jual??0,2) }}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div class="col-grow text-right" style="width: 10%;">
                                  <div class="q-mr-xs">
                                    #
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div v-else>
                            <app-no-data-small />
                          </div>
                        </div>
                      </div>
                    </div>
                  </transition>
                </div>
              </div>
              <div v-else>
                <app-no-data-small />
              </div>
            </div>
          </transition>
        </div>
        <!-- Operasi -->
        <div v-if="store?.params.kdruang === 'Gd-04010103'">
          <div class="bg-orange text-white q-pa-xs f-18 q-mb-sm text-weight-bold row items-center justify-between">
            <div class="col-auto">
              Data Persiapan Operasi
            </div>
            <div class="col-auto q-mr-md">
              <app-btn
                v-if="!store.obat.tampilOperasi"
                label="Show"
                icon-right="icon-mat-keyboard_arrow_down"
                color="dark"
                @click="store.obat.tampilOperasi=!store.obat.tampilOperasi"
              />
              <app-btn
                v-if="store.obat.tampilOperasi"
                label="Hide"
                icon-right="icon-mat-keyboard_arrow_up"
                color="dark"
                @click="store.obat.tampilOperasi=!store.obat.tampilOperasi"
              />
            </div>
          </div>
          <transition
            appear
            enter-active-class="animated slideInUp slow"
            leave-active-class="animated slideOutRight"
          >
            <div v-if="store.obat.tampilOperasi">
              <div class="row bg-dark q-pa-xs text-white">
                <div class="col-shrink" style="width: 5%;">
                  No
                </div>
                <div class="col-shrink" style="width: 15%;">
                  Pemintaan
                </div>
                <div class="col-grow" style="width: 20%;">
                  Pasien
                </div>
                <div class="col-grow text-right" style="width: calc(45%/3);">
                  <div class="q-mr-xs">
                    jumlah Distribusi
                  </div>
                </div>
                <div class="col-grow text-right" style="width: calc(45%/3);">
                  <div class="q-mr-xs">
                    jumlah Resep
                  </div>
                </div>
                <div class="col-grow text-right" style="width: calc(45%/3);">
                  <div class="q-mr-xs">
                    jumlah Kembali
                  </div>
                </div>
                <div class="col-grow" style="width: 10%;">
                  <div class="q-mr-xs">
                    Status
                  </div>
                </div>
                <div class="col-grow text-right" style="width: 5%;">
                  <div class="q-mr-xs">
                    #
                  </div>
                </div>
              </div>
              <div v-if="store?.obat?.operasi?.length > 0" class="q-pa-xs">
                <div v-for="(item,i) in store?.obat?.operasi" :key="i">
                  <div
                    class="row q-pa-xs cursor-pointer" :class="i%2===1?'bg-grey-4':'bg-white'"
                    @click="item.expand = !item.expand"
                  >
                    <div class="col-shrink" style="width: 5%;">
                      {{ i +1 }}
                    </div>
                    <div class="col-shrink" style="width: 15%;">
                      <div class="q-mr-xs">
                        <div class="row">
                          {{ item?.noresep }}
                        </div>
                        <div class="row justify-between items-end f-10 ">
                          <div class="col-auto">
                            dibuat
                          </div>
                          <div class="col-auto">
                            {{ dateFull(item?.tgl_permintaan) }}
                          </div>
                        </div>
                        <div class="row justify-between items-end f-10">
                          <div class="col-auto">
                            dikirim
                          </div>
                          <div class="col-auto">
                            {{ dateFull(item?.tgl_kirim) }}
                          </div>
                        </div>
                        <div class="row justify-between items-end f-10">
                          <div class="col-auto">
                            selesai
                          </div>
                          <div class="col-auto">
                            {{ dateFull(item?.tgl_selesai) }}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-grow" style="width: calc(45%/2);">
                      <div class="row">
                        {{ item?.datapasien?.rs2 ??'Pasien tidak ditemukan' }}
                      </div>
                      <div class="row text-italic f-10">
                        {{ item?.norm }} || {{ item?.noreg }}
                      </div>
                    </div>
                    <div class="col-grow" style="width: calc(45%/2);">
                      {{ item?.poli?.rs2 ??item?.ruanganranap?.rs2 ?? 'Ruangan tidak ditemukan' }}
                    </div>
                    <div class="col-grow text-center" style="width: calc(20%/2);">
                      <div class="q-mr-xs">
                        {{ hitungPermintaan(item) }}
                      </div>
                    </div>
                    <div class="col-grow text-center" style="width: calc(20%/2);">
                      <div class="q-mr-xs">
                        {{ hitungKeluar(item) }}
                      </div>
                    </div>
                    <div class="col-grow text-center" style="width: 10%;">
                      <q-chip
                        dense class="glossy" square
                        :color="warna(item?.flag)"
                        :text-color="warnaText(item?.flag)"
                      >
                        {{ textOperasi(item?.flag) }}
                      </q-chip>
                    </div>
                    <div class="col-grow" style="width: 5%;">
                      <div class="row no-wrap justify-end q-mr-xs">
                        aksi
                      </div>
                    </div>
                  </div>
                  <transition
                    appear
                    enter-active-class="animated slideInUp slow"
                    leave-active-class="animated slideOutRight"
                  >
                    <div v-if="item.expand" :class="i%2===1?'bg-grey-4':'bg-white'">
                      <div class="q-ml-sm q-my-sm">
                        <div v-if="item?.permintaanresep?.length>0">
                          <div class="q-my-xs bg-blue text-white text-weight-bold">
                            Resep Non Racikan
                          </div>
                          <div class="row text-weight-bold q-ma-xs">
                            <div class="col-auto bg-amber" style="width: 5%;">
                              NO
                            </div>
                            <div class="col-auto bg-amber" style="width: 10%;">
                              Kode Obat
                            </div>
                            <div class="col-auto bg-amber" style="width: 20%;">
                              Nama Obat
                            </div>
                            <div class="col-auto text-right bg-amber" style="width: 10%;">
                              <div class="q-mr-xs">
                                Jumlah Resep
                              </div>
                            </div>
                            <div class="col-auto text-right bg-purple text-white" style="width: 45%;">
                              <div class="row">
                                <div class="col-auto text-right" style="width: 40%;">
                                  <div class="q-mr-xs">
                                    No Penerimaan
                                  </div>
                                </div>
                                <div class="col-auto text-right" style="width: calc(60%/3);">
                                  <div class="q-mr-xs">
                                    Jml Keluar
                                  </div>
                                </div>
                                <div class="col-auto text-right" style="width: calc(60%/3);">
                                  <div class="q-mr-xs">
                                    Harga Beli
                                  </div>
                                </div>
                                <div class="col-auto text-right" style="width: calc(60%/3);">
                                  <div class="q-mr-xs">
                                    Harga Jual
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="col-grow text-right bg-amber" style="width: 10%;">
                              <div class="q-mr-xs">
                                #
                              </div>
                            </div>
                          </div>
                          <div v-if="item?.permintaanresep?.length > 0">
                            <div v-for="(rinci,i2) in item?.permintaanresep" :key="i2">
                              <div :class="(i2%2===1?'bg-yellow-4':'bg-yellow-2') +' row q-pa-xs cursor-pointer'">
                                <div class="col-auto" style="width: 5%;">
                                  {{ i2+1 }}
                                </div>
                                <div class="col-auto" style="width: 10%;">
                                  <div class="row">
                                    {{ rinci?.mobat?.kd_obat }}
                                  </div>
                                  <div class="row text-italic f-10">
                                    ( {{ rinci?.mobat?.satuan_k }} )
                                  </div>
                                </div>
                                <div class="col-auto" style="width: 20%;">
                                  {{ rinci?.mobat?.nama_obat }}
                                </div>
                                <div class="col-auto text-right" style="width: 10%;">
                                  <div class="q-mr-xs">
                                    {{ formatDouble(rinci?.jumlah??0,2) }}
                                  </div>
                                </div>
                                <div class="col-auto text-right" style="width: 45%;">
                                  <div v-for="(keluar) in item?.rincian" :key="keluar">
                                    <div class="row">
                                      <div class="col-auto text-right" style="width: 40%;">
                                        <div class="q-mr-xs">
                                          {{ keluar?.nopenerimaan??' - ' }}
                                        </div>
                                      </div>
                                      <div class="col-auto text-right" style="width: calc(60%/3);">
                                        <div class="q-mr-xs">
                                          {{ formatDouble(keluar?.jumlah??0,2) }}
                                        </div>
                                      </div>
                                      <div class="col-auto text-right" style="width: calc(60%/3);">
                                        <div class="q-mr-xs">
                                          {{ formatDouble(keluar?.harga_beli??0,2) }}
                                        </div>
                                      </div>
                                      <div class="col-auto text-right" style="width: calc(60%/3);">
                                        <div class="q-mr-xs">
                                          {{ formatDouble(keluar?.harga_jual??0,2) }}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div class="col-grow text-right" style="width: 10%;">
                                  <div class="q-mr-xs">
                                    #
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div v-else>
                            <app-no-data-small />
                          </div>
                        </div>
                        <div v-if="item?.permintaanracikan?.length>0">
                          <div class="q-my-xs bg-teal text-white text-weight-bold">
                            Resep Racikan
                          </div>
                          <div class="row text-weight-bold q-ma-xs">
                            <div class="col-auto bg-amber" style="width: 5%;">
                              NO
                            </div>
                            <div class="col-auto bg-amber" style="width: 10%;">
                              Kode Obat
                            </div>
                            <div class="col-auto bg-amber" style="width: 20%;">
                              Nama Obat
                            </div>
                            <div class="col-auto text-right bg-amber" style="width: 10%;">
                              <div class="q-mr-xs">
                                Jumlah Resep
                              </div>
                            </div>
                            <div class="col-auto text-right bg-purple text-white" style="width: 45%;">
                              <div class="row">
                                <div class="col-auto text-right" style="width: 40%;">
                                  <div class="q-mr-xs">
                                    No Penerimaan
                                  </div>
                                </div>
                                <div class="col-auto text-right" style="width: calc(60%/3);">
                                  <div class="q-mr-xs">
                                    Jml Keluar
                                  </div>
                                </div>
                                <div class="col-auto text-right" style="width: calc(60%/3);">
                                  <div class="q-mr-xs">
                                    Harga Beli
                                  </div>
                                </div>
                                <div class="col-auto text-right" style="width: calc(60%/3);">
                                  <div class="q-mr-xs">
                                    Harga Jual
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="col-grow text-right bg-amber" style="width: 10%;">
                              <div class="q-mr-xs">
                                #
                              </div>
                            </div>
                          </div>
                          <div v-if="item?.permintaanracikan?.length > 0">
                            <div v-for="(rinci,i2) in item?.permintaanracikan" :key="i2">
                              <div :class="(i2%2===1?'bg-yellow-4':'bg-yellow-2') +' row q-pa-xs cursor-pointer'">
                                <div class="col-auto" style="width: 5%;">
                                  {{ i2+1 }}
                                </div>
                                <div class="col-auto" style="width: 10%;">
                                  <div class="row">
                                    {{ rinci?.mobat?.kd_obat }}
                                  </div>
                                  <div class="row text-italic f-10">
                                    ( {{ rinci?.mobat?.satuan_k }} )
                                  </div>
                                </div>
                                <div class="col-auto" style="width: 20%;">
                                  {{ rinci?.mobat?.nama_obat }}
                                </div>
                                <div class="col-auto text-right" style="width: 10%;">
                                  <div class="q-mr-xs">
                                    {{ formatDouble(rinci?.jumlah??0,2) }}
                                  </div>
                                </div>
                                <div class="col-auto text-right" style="width: 45%;">
                                  <div v-for="(keluar) in item?.rincianracik" :key="keluar">
                                    <div class="row">
                                      <div class="col-auto text-right" style="width: 40%;">
                                        <div class="q-mr-xs">
                                          {{ keluar?.nopenerimaan??' - ' }}
                                        </div>
                                      </div>
                                      <div class="col-auto text-right" style="width: calc(60%/3);">
                                        <div class="q-mr-xs">
                                          {{ formatDouble(keluar?.jumlah??0,2) }}
                                        </div>
                                      </div>
                                      <div class="col-auto text-right" style="width: calc(60%/3);">
                                        <div class="q-mr-xs">
                                          {{ formatDouble(keluar?.harga_beli??0,2) }}
                                        </div>
                                      </div>
                                      <div class="col-auto text-right" style="width: calc(60%/3);">
                                        <div class="q-mr-xs">
                                          {{ formatDouble(keluar?.harga_jual??0,2) }}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div class="col-grow text-right" style="width: 10%;">
                                  <div class="q-mr-xs">
                                    #
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div v-else>
                            <app-no-data-small />
                          </div>
                        </div>
                      </div>
                    </div>
                  </transition>
                </div>
              </div>
              <div v-else>
                <app-no-data-small />
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
    <div v-else>
      <app-no-data text="Obat Belum dipilih" />
    </div>
  </div>
</template>
<script setup>
import { dateFull, dateFullFormat, formatDouble } from 'src/modules/formatter'
import { useAplikasiStore } from 'src/stores/app/aplikasi'
import { usePenyesuaianFarmasiStore } from 'src/stores/simrs/farmasi/penyesuaian/form'
import { computed, onMounted, ref } from 'vue'

const apps = useAplikasiStore()
const ruangan = computed(() => {
  const ru = apps?.gudangs?.find(f => f.kode === apps?.user?.kdruangansim)
  store.setForm('kdruang', ru?.kode)
  store.setparams('kdruang', ru?.kode)
  clearModel()
  return ru?.nama
})
function warna (val) {
  switch (val) {
    case '0':
      return 'negative'
    case '1':
      return 'yellow'
    case '2':
      return 'amber'
    case '3':
      return 'orange'
    case '4':
      return 'deep-orange'
    case '5':
      return 'negative'
    default:
      return 'dark'
  }
}
function warnaText (val) {
  switch (val) {
    case '0':
      return 'white'
    case '1':
      return 'dark'
    case '2':
      return 'dark'
    case '3':
      return 'white'
    case '4':
      return 'white'
    case '5':
      return 'white'
    default:
      return 'white'
  }
}
function textNya (val) {
  switch (val) {
    case '0':
      return 'Draft'
    case '1':
      return 'Dikirim'
    case '2':
      return 'Diterima Gudang'
    case '3':
      return 'Didistribusikan'
    case '4':
      return 'Diterima Depo'
    case '5':
      return 'Ditolak'
    default:
      return 'Belum di definisikan'
  }
}
function textResep (val) {
  switch (val) {
    case '0':
      return 'Draft'
    case '1':
      return 'Dikirim'
    case '2':
      return 'Dikerjakan'
    case '3':
      return 'Selesai'
    case '4':
      return 'Ada Retur'
    case '5':
      return 'Ditolak'
    default:
      return 'Belum di definisikan'
  }
}
// eslint-disable-next-line no-unused-vars
function textOperasi (val) {
  switch (val) {
    case '0':
      return 'Draft'
    case '1':
      return 'Dikirim'
    case '2':
      return 'Didistribusikan'
    case '3':
      return 'Ada Resep'
    case '4':
      return 'Selesai'
    case '5':
      return 'Batal'
    default:
      return 'Belum di definisikan'
  }
}
function hitungPermintaan (item) {
  const non = item?.permintaanresep?.reduce((a, b) => a + parseFloat(b?.jumlah), 0)
  const rac = item?.permintaanracikan?.reduce((a, b) => a + parseFloat(b?.jumlah), 0)
  return formatDouble(non + rac, 2)
}
function hitungKeluar (item) {
  const non = item?.rincian?.reduce((a, b) => a + parseFloat(b?.jumlah), 0)
  const rac = item?.rincianracik?.reduce((a, b) => a + parseFloat(b?.jumlah), 0)
  return formatDouble(non + rac, 2)
}
const store = usePenyesuaianFarmasiStore()
const model = ref(null)
const options = ref([])
function filterFn (val, update) {
  store.getObat(val).then(() => {
    options.value = store.obats
    update(() => {
      options.value = store.obats
    })
  })
}
function modelSelected (val) {
  // console.log('selected', val, model.value)
  store.setForm('kdobat', val.kd_obat)
  store.setparams('kdobat', val.kd_obat)
  store.obat = {
    kd_obat: val.kd_obat,
    nama_obat: val.nama_obat,
    masuk: val.masuk,
    keluar: val.keluar,
    sAawal: val.sAawal,
    sAkhir: val.sAkhir,
    sSekarang: val.sSekarang,
    satuan_b: val.satuan_b,
    satuan_k: val.satuan_k
  }
  console.log('obat', store.obat)

  store.getTransaksi()
}
function clearModel (val) {
  model.value = null
  store.setForm('kdobat', null)
  store.setparams('kdobat', null)
  store.setObat(null)
}
onMounted(() => {
  // store.getObat()
})
</script>
