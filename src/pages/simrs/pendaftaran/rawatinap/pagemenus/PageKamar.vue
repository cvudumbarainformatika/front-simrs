<template>
  <q-dialog backdrop-filter="blur(4px)" @show="init" persistent>
    <q-card style="width: 90vw; max-width: 90vw;" class="bg-grey-4">
      <q-card-section class="q-pa-none">
        <q-bar class="bg-primary text-white">
          <q-space />

          <q-btn dense flat icon="icon-mat-close" v-close-popup>
            <q-tooltip class="bg-white text-primary">
              Close
            </q-tooltip>
          </q-btn>
        </q-bar>
      </q-card-section>
      <q-card-section style="height:70vh; max-height: 70vh; overflow-x:hidden" class="scroll q-pa-none">
        <div v-if="store.loadingShowKamar" class="fit column flex-center">
          <q-spinner-bars
            color="primary"
            size="2em"
          />
          <div class="f-12 text-weight-bold">
            Harap Tunggu ...
          </div>
        </div>
        <div v-else class="container q-pa-lg">
          <div class="figure" v-for="item in store.listKamars" :key="item.groups">
            <div class="content">
              <q-card class="fit cursor-pointer" style="overflow: hidden;">
                <q-card-section class="text-dark q-py-md">
                  <div class="f-14 text-weight-bold">
                    {{ item?.rs5?.toUpperCase() }}
                  </div>
                </q-card-section>
                <q-separator />
                <q-card-section class="text-dark q-pa-none">
                  <!-- {{ groupKamar(item) }} -->
                  <q-list dense separator class="q-pa-none">
                    <q-item
                      v-for="(kmr, n) in groupKamar(item)" :key="n"
                      clickable v-ripple
                    >
                      <q-item-section>
                        <!-- <q-item-label class="">
                          {{ kmr?.kelas ? 'KELAS '+kmr.kelas : 'ISO / HCU' }}
                        </q-item-label> -->
                        <q-item-label class="">
                          {{ `${namaRuangan(kmr, item.kamars).kamar?.rs3 ? 'KELAS '+ namaRuangan(kmr, item.kamars).kamar?.rs3 : 'NON KELAS' }` }}
                        </q-item-label>
                      </q-item-section>
                      <q-item-section side class="text-weight-bold text-dark">
                        <!-- {{ kmr.terisi === kmr.kapasitas? 'FULL' : kmr.kosong + ' BED TERSEDIA' }} -->
                        <!-- {{ kmr }} -->
                        {{ jumlahBed(kmr, item.kamars) === 0 ? 'FULL' : `${jumlahBed(kmr, item.kamars)} BED TERSEDIA` }}
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useFormPendaftaranRanapStore } from 'src/stores/simrs/pendaftaran/ranap/formpendaftaran'

const store = useFormPendaftaranRanapStore()
const init = () => {
  console.log('init')
  store.showKamar()
}

const groupKamar = (kmr) => {
  const mapKamar = kmr?.kamars?.length ? kmr?.kamars?.map(x => x.rs5) : []
  const grup = [...new Set(mapKamar)]
  // console.log('grup', grup)
  return grup
}

const namaRuangan = (grup, kamars) => {
  // console.log('grup', grup)
  // console.log('kamars', kamars.find(x => x.rs5 === grup))
  return kamars.find(x => x.rs5 === grup)
}

const jumlahBed = (itm, kamars) => {
  const begTerisi = kamars.filter(x => x.rs5 === itm && x.kunjungan.length).length
  const begKapasitas = kamars.filter(x => x.rs5 === itm).length

  const tersedia = begKapasitas - begTerisi
  // console.log('jumlah bed', begKapasitas)
  // console.log('jumlah bed terisi', begTerisi)
  return tersedia
}
</script>

<style lang="scss" scoped>
.content {
  max-width: 100%;
  display: block;
}
.figure {
  margin: 0;
  display: grid;
  grid-template-rows: 1fr auto;
  margin-bottom: 10px;
  break-inside: avoid;
}

.figure > .content {
  grid-row: 1 / -1;
  grid-column: 1;
}

.figure a {
  color: black;
  text-decoration: none;
}

figcaption {
  grid-row: 2;
  grid-column: 1;
  background-color: rgba(255,255,255,.5);
  padding: .2em .5em;
  justify-self: start;
}

.container {
  column-count: 4;
  column-gap: 10px;
  width: 100%;
}
</style>
