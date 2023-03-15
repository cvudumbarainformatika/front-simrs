<template>
  <q-dialog>
    <q-card style="width:60vw; max-width:90vw;">
      <q-card-section
        v-if="store.loading"
        style="height:300px;"
      >
        <app-loading />
      </q-card-section>
      <q-card-section v-if="!store.loading">
        <div class="f-14 text-weight-bold">
          Data Tanda Tangan
        </div>
        <div class="f-14 q-mt-sm">
          {{ auth.currentUser?auth.currentUser.nama:'-' }}
        </div>
      </q-card-section>
      <q-card-section v-if="!store.loading">
        <div class="row items-center q-col-gutter-sm q-mb-sm">
          <div class="col-4">
            PPK
          </div>
          <div class="col-8">
            <app-autocomplete-new
              v-model="store.form.ppk"
              label="cari Ppk"
              debounce="700"
              autocomplete="nama"
              option-label="nama"
              option-value="id"
              outlined
              valid
              :loading="store.loadingPpk"
              :source="store.optionPPK"
              @buang="store.getDataPpk"
              @on-select="store.ppkSelected"
            />
          </div>
        </div>
        <div class="row items-center q-col-gutter-sm q-mb-sm">
          <div class="col-4">
            PTK
          </div>
          <div class="col-8">
            <app-autocomplete-new
              v-model="store.form.ptk"
              label="cari Ptk"
              debounce="700"
              autocomplete="nama"
              option-label="nama"
              option-value="id"
              outlined
              valid
              :loading="store.loadingPtk"
              :source="store.optionPTK"
              @buang="store.getDataPtk"
              @on-select="store.ptkSelected"
            />
          </div>
        </div>
        <div class="row items-center q-col-gutter-sm  q-mb-sm">
          <div class="col-4">
            Petugas Gudang
          </div>
          <div class="col-8">
            <app-autocomplete-new
              v-model="store.form.gudang"
              label="cari Petugas Gudang"
              debounce="700"
              autocomplete="nama"
              option-label="nama"
              option-value="id"
              outlined
              valid
              :loading="store.loadingGudang"
              :source="store.optionGudang"
              @buang="store.getDataGudang"
              @on-select="store.gudangSelected"
            />
          </div>
        </div>
        <div class="row items-center q-col-gutter-sm  q-mb-sm">
          <div class="col-4">
            Mengetahui
          </div>
          <div class="col-8">
            <app-autocomplete-new
              v-model="store.form.mengetahui"
              label="cari yang tanda tandan mengetahui"
              debounce="700"
              autocomplete="nama"
              option-label="nama"
              option-value="id"
              outlined
              valid
              :loading="store.loadingMengetahui"
              :source="store.optionMengetahui"
              @buang="store.getDataMengetahui"
              @on-select="store.mengetahuiSelected"
            />
          </div>
        </div>
        <div class="row items-center q-col-gutter-sm  q-mb-sm">
          <div class="col-4">
            Lainnya
          </div>
          <div class="col-8">
            <app-input
              v-model="store.form.text"
              label="Lainnya"
              outlined
            />
          </div>
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <app-btn
          class="q-mr-md"
          label="Batal"
          push
          color="dark"
          :loading="store.loading"
          @click="store.setOpen"
        />
        <app-btn
          label="Simpan"
          push
          :loading="store.loading"
          @click="store.saveForm"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { useAuthStore } from 'src/stores/auth'
import { useTandaTanganStore } from 'src/stores/simrs/logistik/sigarang/tantatangan/tandatangan'
import { onMounted } from 'vue'

const auth = useAuthStore()
const store = useTandaTanganStore()
onMounted(() => {
  store.getInitialData()
})
</script>
