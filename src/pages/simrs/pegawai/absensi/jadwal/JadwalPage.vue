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
                  {{ row.jadwal.pertama.nama }} - {{ row.jadwal.keempat.nama }}
                </div>
                <div class="col-6">
                  {{ row.jadwal.jam_reguler.masuk }} - {{ row.jadwal.jam_reguler.pulang }}
                </div>
              </div>
              <div class="row">
                <div class="col-6">
                  {{ row.jadwal.kelima.nama }}
                </div>
                <div class="col-6">
                  {{ row.jadwal.jam_jumat.masuk }} - {{ row.jadwal.jam_jumat.pulang }}
                </div>
              </div>
            </div>
            <div v-if="row.kategory_id===2">
              <div
                class="row"
                style="min-width:220px"
              >
                <div class="col-6">
                  {{ row.jadwal.pertama.nama }} - {{ row.jadwal.keenam.nama }}
                </div>
                <div class="col-6">
                  {{ row.jadwal.jam_reguler.masuk }} - {{ row.jadwal.jam_reguler.pulang }}
                </div>
              </div>
            </div>
            <div v-if="row.kategory_id===null">
              <div
                v-for="(item,i) in row.jadwal"
                :key="i"
              >
                <div class="row">
                  <div class="col-6">
                    {{ item.nama }}
                  </div>
                  <div class="col-6">
                    {{ item.shift.masuk }} - {{ item.shift.pulang }}
                  </div>
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
import FormInputVue from './FormInput.vue'
import { useAbsensiJadwalStore } from 'src/stores/simrs/pegawai/absensi/jadwal/jadwal'

const store = useAbsensiJadwalStore()

</script>
