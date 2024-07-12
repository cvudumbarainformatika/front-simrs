<template>
  <div class="container q-pl-sm q-pr-sm">
    <div class="q-card q-mt-sm q-mt-ms">
      <q-card class="q-pa-xs">
        <div class="row bg-black text-white q-pa-sm q-mb-xs q-mt-xs">
          <div class="f-14 text-weight-bold">
            Saldo Awal | SIASIK
          </div>
        </div>
      </q-card>
    </div>

    <div class="q-card q-mt-sm">
      <app-card title="Transaksi Saldo Awal" desc="Pejabat Penatausahaan Keuangan">
        <template #content>
          <div class="row justify-center q-col-gutter-md q-my-md">
            <div class="col-2">
              <div class="q-pb-xs">
                Tanggal Transaksi
              </div>
              <app-input-date
                :model="store.form.tanggal"
                ref="refTanggalSurat"
                icon="icon-mat-event"
                outlined
                label="Tanggal"
                @set-model="pilihTanggal"
              />
            </div>

            <div class="col-3">
              <div class="q-pb-xs">
                Rekening Bank
              </div>
              <app-autocomplete-new
                v-model="store.form.rekening"
                label="Pilih Rekening"
                autocomplete="noRek"
                :option-label="['noRek', 'namaRek']"
                option-value="noRek"
                outlined
                :source="store.rekeningbluds"
              />
            </div>

            <div class="col-3">
              <div class="q-pb-xs">
                Nama Bank
              </div>
              <app-autocomplete-new
                v-model="store.form.rekening"
                label="Nama Bank"
                autocomplete="namaRek"
                option-label="namaRek"
                option-value="noRek"
                outlined
                readonly
                :source="store.rekeningbluds"
              />
            </div>
            <div class="col-3">
              <div class="q-pb-xs">
                Nilai Saldo Awal
              </div>
              <app-input
                v-model="store.form.nilaisaldo"
                label="Nilai"
                outlined
              />
            </div>
            <div class="row">
              <div class="q-pb-xs invisible">
                .
              </div>
              <app-btn
                label="Simpan"
                icon="icon-mat-save"
                :disable="store.loading"
                :loading="store.loading"
                @click="onSimpan()"
              />
            </div>
          </div>
        </template>
      </app-card>
    </div>

    <div class="q-card q-mt-sm q-mt-ms">
      <q-page
        class="q-pa-md"
        :class="style.componentfull?'container-no-header':'container--q-header q-pa-xs relative-position'"
      >
        <!-- <div class="header">
          <HeaderComp />
        </div> -->
        <q-card
          flat
          no-shadow
          square
          class="my-flex-1 scroll hide-scroll"
          ref="refSaldoawal"
        >
          <!-- <q-scroll-area style="height:calc( 100% - 40px)">
            <ListObat />
            <div style="margin-bottom: 100px;" />
          </q-scroll-area> -->
          <TableSaldo />
          <!-- <div
            v-if="store.meta"
            class="absolute-bottom bg-primary text-white"
          >
            <BottomComp
              :meta="store.meta"
              @go-to="store.goToPage"
            />
          </div> -->
        </q-card>
      </q-page>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { useSaldoAwalStore } from 'src/stores/siasik/transaksi/saldo/saldoawal/saldoawal'
import TableSaldo from './inpage/TableSaldo.vue'
import { useStyledStore } from 'src/stores/app/styled'

const style = useStyledStore()
const store = useSaldoAwalStore()

const pilihTanggal = (val) => {
  store.setForm('tanggal', val)
}
const refSaldoawal = ref(null)

store.getRekeningBlud()

onMounted(() => {
  store.getInitialData()

  console.log('refSaldoawal', refSaldoawal)
})

function onSimpan () {
  store.simpanSaldo().then(() => {
    store.emptyForm()
  })
}

</script>
