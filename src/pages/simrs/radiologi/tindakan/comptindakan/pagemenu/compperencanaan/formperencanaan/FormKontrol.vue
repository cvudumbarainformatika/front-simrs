<template>
  <div>
    <div>
      <div class="row q-col-gutter-sm q-mb-sm">
        <div class="col-9">
          <app-input
            v-model="store.formKontrol.nosep"
            label="Sep digunakan"
            outlined
            readonly
          />
        </div>
        <div class="col-2">
          <app-btn
            label="Ganti SEP"
            @click="store.openDialogSep=true"
          />
        </div>
      </div>
    </div>
    <q-form
      ref="formRef"
      @submit="simpan"
    >
      <div class="row q-col-gutter-sm">
        <div class="col-5">
          <app-input-date
            :model="store.formKontrol.tglrencanakunjungan"
            label="Tgl Rencana Kontrol"
            outlined
            @set-model="gantiTanggal"
          />
        </div>
        <div class="col-5">
          <app-autocomplete
            :key="store.formKontrol.kodedokterdpjp"
            v-model="store.formKontrol.kodedokterdpjp"
            outlined
            label="Pilih Dokter"
            autocomplete="namadokter"
            option-label="namadokter"
            option-value="kodedokter"
            :loading="store.loadingJadwalDokter"
            :disable="store.loadingJadwalDokter"
            :source="store.jadwalDpjps"
          />
        </div>
        <div class="col-12">
          <q-separator class=" q-my-md" />
          <div class="text-right q-gutter-sm">
            <q-btn
              label="Simpan"
              color="primary"
              type="submit"
              :loading="store.loadingSaveKontrol"
              :disable="store.loadingSaveKontrol"
            />
          </div>
        </div>
      </div>
    </q-form>
    <app-dialog
      v-model="store.openDialogSep"
      label="Dialog Cari SEP"
      @on-ok="store.openDialogSep=false"
    >
      <template #default>
        <div class="q-pa-sm">
          <div class="row q-col-gutter-sm q-mb-sm">
            <div class="col-4">
              <app-input-date
                :model="store.paramListSep.tglawal"
                label="cari mulai tgl"
                outlined
                @set-model="(val)=> store.paramListSep.tglawal=val"
              />
            </div>
            <div class="col-4">
              <app-input-date
                :model="store.paramListSep.tglakhir"
                label="cari sampai tgl"
                outlined
                @set-model="(val)=> store.paramListSep.tglakhir=val"
              />
            </div>
            <div class="col-2">
              <app-btn
                label="cari Sep"
                :loading="store.loadingListSep"
                @click="store.getListSep(pasien)"
              />
            </div>
          </div>
          <div v-if="store?.listSeps?.length && !store.loadingListSep">
            <q-list separator>
              <q-item
                v-for="(item, i) in store.listSeps"
                :key="i"
                clickable
                @click="gunkanSep(item)"
              >
                <q-item-section>
                  <q-item-label>
                    <span class="text-weight-bold">{{ item?.namaPeserta }}</span> | <span class="text-primary ">{{ item?.noKartu }}</span>
                  </q-item-label>
                  <q-item-label>
                    <span class="">{{ item?.noRujukan }}</span> | <span class="text-secondary ">{{ item?.poli }}</span>
                  </q-item-label>
                </q-item-section>
                <q-item-section>
                  <!-- <q-item-label>
                    <span class="text-grey">{{ item?.tglSep }}</span> | <span class="text-primary ">{{ item?.namaPoliTujuan }}</span>
                  </q-item-label> -->
                  <q-item-label>
                    <span class="">{{ dateFullFormat( item?.tglSep) }}</span> | <span class="text-cyan ">{{ item?.noSep }}</span>
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
          <div v-if="!store?.listSeps?.length && !store.loadingListSep">
            <app-no-data />
          </div>
          <div v-if="store.loadingListSep">
            <app-loading />
          </div>
        </div>
      </template>
    </app-dialog>
  </div>
</template>

<script setup>
import { dateFullFormat } from 'src/modules/formatter'
import { usePerencanaanPoliStore } from 'src/stores/simrs/pelayanan/poli/perencanaan'
import { ref, onMounted } from 'vue'

const store = usePerencanaanPoliStore()
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

const formRef = ref()
function simpan() {
  store.saveKontrol(props.pasien).then(resp => {
    console.log('fr', resp?.data)
  })
}
function gantiTanggal(val) {
  store.setFormKontrol('tglrencanakunjungan', val)
  store.getjadwalDokterDpjp(props.pasien, val)
}
function gunkanSep(item) {
  store.setFormKontrol('nosep', item?.noSep)
  store.openDialogSep = false
  console.log('form', store.formKontrol)
}
onMounted(() => {
  store.getjadwalDokterDpjp(props.pasien, false)
  store.initFormKontrol(props.pasien)
  // store.getListSep(props.pasien)
})
</script>
