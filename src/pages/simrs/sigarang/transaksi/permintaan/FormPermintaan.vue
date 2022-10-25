<template>
  <div class="q-pt-sm q-pb-lg-xl">
    <app-card
      title="Form Permintaan"
      desc="Form Permintaan Ruangan"
    >
      <template #content>
        <div class="row q-col-gutter-md q-mb-sm">
          <div class="col-10">
            <div class="row q-col-gutter-md q-mb-sm items-center">
              <div class="col-md-3 col-xs-12">
                Tanggal Permintaan
              </div>
              <div class="col-md-9 col-xs-12">
                <app-input
                  v-model="store.tanggal"
                  readonly
                  label="Tanggal Permintaan"
                  outlined
                  dense
                />
              </div>
            </div>
            <div class="row q-col-gutter-md q-mb-sm items-center">
              <div class="col-md-3 col-xs-12">
                Penanggung jawab
              </div>
              <div class="col-md-9 col-xs-12">
                {{ store.nama.penanggungjawab }}
                <!-- <app-autocomplete-new
                  :model="store.form.kode_pengguna"
                  outlined
                  label="Penanggung jawab*"
                  autocomplete="jabatan"
                  option-value="kode"
                  :loading="store.loading"
                  option-label="jabatan"
                  :source="store.penggunas"
                  @on-select="pilihPengguna"
                  @clear="clearPengguna"
                /> -->
              </div>
            </div>
            <div class="row q-col-gutter-md q-mb-sm items-center">
              <div class="col-md-3 col-xs-12">
                Pengguna
              </div>
              <div class="col-md-9 col-xs-12">
                <app-autocomplete-new
                  :model="store.form.kode_pengguna"
                  outlined
                  label="Pengguna*"
                  autocomplete="jabatan"
                  option-value="kode"
                  :loading="store.loading"
                  option-label="jabatan"
                  :source="store.penggunas"
                  @on-select="pilihPengguna"
                  @clear="clearPengguna"
                />
              </div>
            </div>
            <div class="row q-col-gutter-md q-mb-sm items-center">
              <div class="col-md-3 col-xs-12">
                Ruang :
              </div>
              <div class="col-md-9 col-xs-12">
                {{ store.nama.ruang }}
              </div>
            </div>
          </div>
        </div>
      </template>
    </app-card>
  </div>
</template>
<script setup>
import { useTransaksiPermintaanForm } from 'src/stores/simrs/logistik/sigarang/transaksi/permintaan/form'

const store = useTransaksiPermintaanForm()

const clearPengguna = () => {
  store.setForm('kode_pengguna', null)
  store.setForm('kode_penanggungjawab', null)
  store.setNama('penanggungjawab', 'pengguna belum dipilih')
  store.setNama('ruang', 'pengguna belum dipilih')
}
const pilihPengguna = (val) => {
  store.setForm('kode_pengguna', val)
  const peng = store.penggunas.filter(data => { return data.kode === val })
  const pj = store.penanggungjawabs.filter(data => { return data.level_3 === peng[0].level_3 && data.level_2 === peng[0].level_2 && data.level_1 === peng[0].level_1 })
  const ruang = store.penggunaruangs.filter(data => { return data.kode_pengguna === val })

  console.log('val', val)
  console.log('peng', peng)
  console.log('pj', pj)
  console.log('ruang', ruang)

  store.setForm('kode_penanggungjawab', pj[0].kode)
  store.setNama('penanggungjawab', pj[0].jabatan)
  if (ruang.length) {
    store.setForm('kode_ruang', ruang[0].kode_ruang)
    store.setNama('ruang', ruang[0].ruang.uraian)
  } else {
    store.setForm('kode_ruang', null)
    store.setNama('ruang', 'ruang tidak ditemukan')
  }
}
</script>
