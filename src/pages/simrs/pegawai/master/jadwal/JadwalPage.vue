<template>
  <q-page class="q-mt-md q-mx-lg">
    <app-card
      title="Input Jadwal"
      desc="Input Jadwal absen pegawai"
    >
      <template #content>
        <app-table
          :columns="store.columns"
          :column-hide="store.columnHide"
          :items="store.items"
          :meta="store.meta"
          :per-page="store.params.per_page"
          :order-by="store.params.order_by"
          :sort="store.params.sort"
          :loading="store.loading"
          :to-search="store.params.q"
          @goto="store.setPage"
          @set-row="store.setPerPage"
          @refresh="store.refreshTable"
          @find="store.setSearch"
          @set-order="store.setOder"
          @new-data="store.newData"
          @edit-data="store.editData"
          @delete="store.deletesData"
        >
          <template #col-pegawai>
            <div>Nama Pegawai</div>
          </template>
          <template #cell-pegawai="{row}">
            <div>{{ row.pegawai.nama }}</div>
          </template>
          <template #col-kategory>
            <div>Kategori jadwal</div>
          </template>
          <template #cell-kategory="{row}">
            <div>{{ row.kategory?row.kategory.nama:'shift' }}</div>
          </template>
          <template #col-ruang>
            <div>Ruangan</div>
          </template>
          <template #cell-ruang="{row}">
            <div>{{ row.ruang.uraian }}</div>
          </template>
          <template #col-jadwal>
            <div>Jadwal</div>
          </template>
          <template #cell-jadwal="{row}">
            <div v-if="row.kategory_id===1">
              <!-- <div>{{ row.jadwal }}</div> -->
              <div
                class="row"
                style="min-width:220px"
              >
                <div class="col-6">
                  {{ row.pertama.nama }} - {{ row.keempat.nama }}
                </div>
                <div class="col-6">
                  {{ row.jam04.masuk }} - {{ row.jam04.pulang }}
                </div>
              </div>
              <div class="row">
                <div class="col-6">
                  {{ row.kelima.nama }}
                </div>
                <div class="col-6">
                  {{ row.jam05.masuk }} - {{ row.jam05.pulang }}
                </div>
              </div>
            </div>
            <div v-if="row.kategory_id===2">
              <div
                class="row"
                style="min-width:220px"
              >
                <div class="col-6">
                  {{ row.pertama.nama }} - {{ row.keenam.nama }}
                </div>
                <div class="col-6">
                  {{ row.jam01.masuk }} - {{ row.jam01.pulang }}
                </div>
              </div>
            </div>
            <div v-if="row.kategory_id===null">
              <!-- senin -->
              <div
                v-if="row.pertama"
                class="row"
              >
                <div class="col-6">
                  {{ row.pertama.nama }}
                </div>
                <div class="col-6">
                  {{ row.jam01.masuk }} - {{ row.jam01.pulang }}
                </div>
              </div>
              <!-- selasa -->
              <div
                v-if="row.kedua"
                class="row"
              >
                <div class="col-6">
                  {{ row.kedua.nama }}
                </div>
                <div class="col-6">
                  {{ row.jam02.masuk }} - {{ row.jam02.pulang }}
                </div>
              </div>
              <!-- rabu -->
              <div
                v-if="row.ketiga"
                class="row"
              >
                <div class="col-6">
                  {{ row.ketiga.nama }}
                </div>
                <div class="col-6">
                  {{ row.jam03.masuk }} - {{ row.jam03.pulang }}
                </div>
              </div>
              <!-- kamis -->
              <div
                v-if="row.keempat"
                class="row"
              >
                <div class="col-6">
                  {{ row.keempat.nama }}
                </div>
                <div class="col-6">
                  {{ row.jam04.masuk }} - {{ row.jam04.pulang }}
                </div>
              </div>
              <!-- jumat -->
              <div
                v-if="row.kelima"
                class="row"
              >
                <div class="col-6">
                  {{ row.kelima.nama }}
                </div>
                <div class="col-6">
                  {{ row.jam05.masuk }} - {{ row.jam05.pulang }}
                </div>
              </div>
              <!-- sabtu -->
              <div
                v-if="row.keenam"
                class="row"
              >
                <div class="col-6">
                  {{ row.keenam.nama }}
                </div>
                <div class="col-6">
                  {{ row.jam06.masuk }} - {{ row.jam06.pulang }}
                </div>
              </div>
              <!-- minggu -->
              <div
                v-if="row.ketujuh"
                class="row"
              >
                <div class="col-6">
                  {{ row.ketujuh.nama }}
                </div>
                <div class="col-6">
                  {{ row.jam07.masuk }} - {{ row.jam07.pulang }}
                </div>
              </div>
            </div>
          </template>
          <template #col-nama>
            <div>Nama Hari Libur</div>
          </template>
        </app-table>
      </template>
    </app-card>
    <FormInputVue v-model="store.isOpen" />
  </q-page>
</template>
<script setup>
import FormInputVue from './FormInputManual.vue'
import { useAbsensiJadwalStore } from 'src/stores/simrs/pegawai/master/jadwal/jadwal'

const store = useAbsensiJadwalStore()

</script>
