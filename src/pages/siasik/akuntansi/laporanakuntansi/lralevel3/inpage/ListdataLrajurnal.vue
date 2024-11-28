<template>
  <template v-if="store.hasilpendapatan.length > 0 && store.hasilbelanja.length > 0 && store.hasilsilpa.length > 0">
    <q-card-section class="full-width">
      <div class="row">
        <div class="full-width">
          <q-markup-table
            class="my-sticky-table"
            flat-bordered
            wrap-cells
            :separator="separator"
          >
            <thead>
              <tr class="bg-dark text-white max-width">
                <th>KODE REKENING</th>
                <th style="width: 40%;">
                  URAIAN
                </th>
                <th>
                  PAGU (Rp.)
                </th>
                <th>
                  REALISASI SEBELUMNYA (Rp.)
                </th>
                <th>
                  REALISASI SAAT INI (Rp.)
                </th>
                <th>
                  REALISASI SELURUHNYA (Rp.)
                </th>
                <th>
                  SISA ANGGARAN (Rp.)
                </th>
                <th>
                  PERSENTASE (%)
                </th>
              </tr>
            </thead>
            <tbody v-if="store.reqs.levelberapa === 6">
              <tr
                v-for="it in store.hasilpendapatan" :key="it"
                :class="it.kode.length <= 12 ? 'text-bold' : '' "
              >
                <td>
                  {{ it.kode }}
                </td>
                <td>
                  {{ it.uraian }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it.pagupend) }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it.nilaisblm) }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it.nilaiskg) }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it.nilaisemua) }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it.selisih) }}
                </td>
                <td class="text-right">
                  {{ it.persen }}
                </td>
              </tr>
              <tr class="bg-grey-2">
                <td class="text-right text-bold" colspan="2">
                  JUMLAH PENDAPATAN DAERAH
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(totalPendapatan().totalpend) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(totalPendapatan().totalsblm) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(totalPendapatan().totalskg) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(totalPendapatan().totalsemua) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(totalPendapatan().totalselisih) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(totalPendapatan().totalpersen) }}
                </td>
              </tr>
              <tr
                v-for="it in store.hasilbelanja" :key="it"
                :class="it.kode.length <= 12 ? 'text-bold' : '' "
              >
                <td>
                  {{ it.kode }}
                </td>
                <td>
                  {{ it.uraian }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it.pagu) }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it.nilaisblm) }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it.nilaiskg) }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it.nilaisemua) }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it.selisih) }}
                </td>
                <td class="text-right">
                  {{ it.persen }}
                </td>
              </tr>
              <tr class="bg-grey-2">
                <td class="text-right text-bold" colspan="2">
                  JUMLAH BELANJA DAERAH
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(totalBelanja().totalpagu) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(totalBelanja().totalsblm) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(totalBelanja().totalskg) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(totalBelanja().totalsemua) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(totalBelanja().totalselisih) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(totalBelanja().totalpersen) }}
                </td>
              </tr>
              <tr class="bg-grey-2">
                <td class="text-right text-bold" colspan="2">
                  SURPLUS / DEFISIT LRA
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(surplusDefisit().totalpagu) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(surplusDefisit().totalsblm) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(surplusDefisit().totalskg) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(surplusDefisit().totalsemua) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(surplusDefisit().totalselisih) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(surplusDefisit().totalpersen) }}
                </td>
              </tr>
              <tr
                v-for="it in store.hasilsilpa" :key="it"
                :class="it.kode.length <= 12 ? 'text-bold' : '' "
              >
                <td>
                  {{ it.kode }}
                </td>
                <td>
                  {{ it.uraian }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it.pagu) }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it.nilaisblm) }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it.nilaiskg) }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it.nilaisemua) }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it.selisih) }}
                </td>
                <td class="text-right">
                  {{ it.persen }}
                </td>
              </tr>
              <tr class="bg-grey-2">
                <td class="text-right text-bold" colspan="2">
                  TOTAL PEMBIAYAAN (NETTO)
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(totalSilpa().totalpagu) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(totalSilpa().totalsblm) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(totalSilpa().totalskg) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(totalSilpa().totalsemua) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(totalSilpa().totalselisih) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(totalSilpa().totalpersen) }}
                </td>
              </tr>
              <tr class="bg-grey-2">
                <td class="text-right text-bold" colspan="2">
                  SISA LEBIH PEMBIAYAAN ANGGARAN (SILPA)
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(sisaLebih().totalpagu) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(sisaLebih().totalsblm) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(sisaLebih().totalskg) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(sisaLebih().totalsemua) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(sisaLebih().totalselisih) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(sisaLebih().totalpersen) }}
                </td>
              </tr>
            </tbody>
            <tbody v-if="store.reqs.levelberapa === 5">
              <tr
                v-for="it in store.hasilpendapatan" :key="it"
                :class="it.kode.length <= 9 ? 'text-bold' : '' "
              >
                <td>
                  {{ it.kode }}
                </td>
                <td>
                  {{ it.uraian }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it.pagupend) }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it.nilaisblm) }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it.nilaiskg) }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it.nilaisemua) }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it.selisih) }}
                </td>
                <td class="text-right">
                  {{ it.persen }}
                </td>
              </tr>
              <tr class="bg-grey-2">
                <td class="text-right text-bold" colspan="2">
                  JUMLAH PENDAPATAN DAERAH
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(totalPendapatan().totalpend) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(totalPendapatan().totalsblm) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(totalPendapatan().totalskg) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(totalPendapatan().totalsemua) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(totalPendapatan().totalselisih) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(totalPendapatan().totalpersen) }}
                </td>
              </tr>
              <tr
                v-for="it in store.hasilbelanja" :key="it"
                :class="it.kode.length <= 9 ? 'text-bold' : '' "
              >
                <td>
                  {{ it.kode }}
                </td>
                <td>
                  {{ it.uraian }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it.pagu) }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it.nilaisblm) }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it.nilaiskg) }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it.nilaisemua) }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it.selisih) }}
                </td>
                <td class="text-right">
                  {{ it.persen }}
                </td>
              </tr>
              <tr class="bg-grey-2">
                <td class="text-right text-bold" colspan="2">
                  JUMLAH BELANJA DAERAH
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(totalBelanja().totalpagu) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(totalBelanja().totalsblm) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(totalBelanja().totalskg) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(totalBelanja().totalsemua) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(totalBelanja().totalselisih) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(totalBelanja().totalpersen) }}
                </td>
              </tr>
              <tr class="bg-grey-2">
                <td class="text-right text-bold" colspan="2">
                  SURPLUS / DEFISIT LRA
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(surplusDefisit().totalpagu) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(surplusDefisit().totalsblm) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(surplusDefisit().totalskg) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(surplusDefisit().totalsemua) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(surplusDefisit().totalselisih) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(surplusDefisit().totalpersen) }}
                </td>
              </tr>
              <tr
                v-for="it in store.hasilsilpa" :key="it"
                :class="it.kode.length <= 9 ? 'text-bold' : '' "
              >
                <td>
                  {{ it.kode }}
                </td>
                <td>
                  {{ it.uraian }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it.pagu) }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it.nilaisblm) }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it.nilaiskg) }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it.nilaisemua) }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it.selisih) }}
                </td>
                <td class="text-right">
                  {{ it.persen }}
                </td>
              </tr>
              <tr class="bg-grey-2">
                <td class="text-right text-bold" colspan="2">
                  TOTAL PEMBIAYAAN (NETTO)
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(totalSilpa().totalpagu) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(totalSilpa().totalsblm) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(totalSilpa().totalskg) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(totalSilpa().totalsemua) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(totalSilpa().totalselisih) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(totalSilpa().totalpersen) }}
                </td>
              </tr>
              <tr class="bg-grey-2">
                <td class="text-right text-bold" colspan="2">
                  SISA LEBIH PEMBIAYAAN ANGGARAN (SILPA)
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(sisaLebih().totalpagu) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(sisaLebih().totalsblm) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(sisaLebih().totalskg) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(sisaLebih().totalsemua) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(sisaLebih().totalselisih) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(sisaLebih().totalpersen) }}
                </td>
              </tr>
            </tbody>
            <tbody v-if="store.reqs.levelberapa === 4">
              <tr
                v-for="it in store.hasilpendapatan" :key="it"
                :class="it.kode.length <= 6 ? 'text-bold' : '' "
              >
                <td>
                  {{ it.kode }}
                </td>
                <td>
                  {{ it.uraian }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it.pagupend) }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it.nilaisblm) }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it.nilaiskg) }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it.nilaisemua) }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it.selisih) }}
                </td>
                <td class="text-right">
                  {{ it.persen }}
                </td>
              </tr>
              <tr class="bg-grey-2">
                <td class="text-right text-bold" colspan="2">
                  JUMLAH PENDAPATAN DAERAH
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(totalPendapatan().totalpend) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(totalPendapatan().totalsblm) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(totalPendapatan().totalskg) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(totalPendapatan().totalsemua) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(totalPendapatan().totalselisih) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(totalPendapatan().totalpersen) }}
                </td>
              </tr>
              <tr
                v-for="it in store.hasilbelanja" :key="it"
                :class="it.kode.length <= 6 ? 'text-bold' : '' "
              >
                <td>
                  {{ it.kode }}
                </td>
                <td>
                  {{ it.uraian }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it.pagu) }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it.nilaisblm) }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it.nilaiskg) }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it.nilaisemua) }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it.selisih) }}
                </td>
                <td class="text-right">
                  {{ it.persen }}
                </td>
              </tr>
              <tr class="bg-grey-2">
                <td class="text-right text-bold" colspan="2">
                  JUMLAH BELANJA DAERAH
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(totalBelanja().totalpagu) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(totalBelanja().totalsblm) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(totalBelanja().totalskg) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(totalBelanja().totalsemua) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(totalBelanja().totalselisih) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(totalBelanja().totalpersen) }}
                </td>
              </tr>
              <tr class="bg-grey-2">
                <td class="text-right text-bold" colspan="2">
                  SURPLUS / DEFISIT LRA
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(surplusDefisit().totalpagu) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(surplusDefisit().totalsblm) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(surplusDefisit().totalskg) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(surplusDefisit().totalsemua) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(surplusDefisit().totalselisih) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(surplusDefisit().totalpersen) }}
                </td>
              </tr>
              <tr
                v-for="it in store.hasilsilpa" :key="it"
                :class="it.kode.length <= 6 ? 'text-bold' : '' "
              >
                <td>
                  {{ it.kode }}
                </td>
                <td>
                  {{ it.uraian }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it.pagu) }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it.nilaisblm) }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it.nilaiskg) }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it.nilaisemua) }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it.selisih) }}
                </td>
                <td class="text-right">
                  {{ it.persen }}
                </td>
              </tr>
              <tr class="bg-grey-2">
                <td class="text-right text-bold" colspan="2">
                  TOTAL PEMBIAYAAN (NETTO)
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(totalSilpa().totalpagu) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(totalSilpa().totalsblm) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(totalSilpa().totalskg) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(totalSilpa().totalsemua) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(totalSilpa().totalselisih) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(totalSilpa().totalpersen) }}
                </td>
              </tr>
              <tr class="bg-grey-2">
                <td class="text-right text-bold" colspan="2">
                  SISA LEBIH PEMBIAYAAN ANGGARAN (SILPA)
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(sisaLebih().totalpagu) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(sisaLebih().totalsblm) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(sisaLebih().totalskg) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(sisaLebih().totalsemua) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(sisaLebih().totalselisih) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(sisaLebih().totalpersen) }}
                </td>
              </tr>
            </tbody>
            <tbody v-if="store.reqs.levelberapa === 3">
              <tr
                v-for="it in store.hasilpendapatan" :key="it"
                :class="it.kode.length <= 3 ? 'text-bold' : '' "
              >
                <td>
                  {{ it.kode }}
                </td>
                <td>
                  {{ it.uraian }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it.pagupend) }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it.nilaisblm) }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it.nilaiskg) }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it.nilaisemua) }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it.selisih) }}
                </td>
                <td class="text-right">
                  {{ it.persen }}
                </td>
              </tr>
              <tr class="bg-grey-2">
                <td class="text-right text-bold" colspan="2">
                  JUMLAH PENDAPATAN DAERAH
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(totalPendapatan().totalpend) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(totalPendapatan().totalsblm) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(totalPendapatan().totalskg) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(totalPendapatan().totalsemua) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(totalPendapatan().totalselisih) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(totalPendapatan().totalpersen) }}
                </td>
              </tr>
              <tr
                v-for="it in store.hasilbelanja" :key="it"
                :class="it.kode.length <= 3 ? 'text-bold' : '' "
              >
                <td>
                  {{ it.kode }}
                </td>
                <td>
                  {{ it.uraian }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it.pagu) }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it.nilaisblm) }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it.nilaiskg) }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it.nilaisemua) }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it.selisih) }}
                </td>
                <td class="text-right">
                  {{ it.persen }}
                </td>
              </tr>
              <tr class="bg-grey-2">
                <td class="text-right text-bold" colspan="2">
                  JUMLAH BELANJA DAERAH
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(totalBelanja().totalpagu) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(totalBelanja().totalsblm) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(totalBelanja().totalskg) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(totalBelanja().totalsemua) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(totalBelanja().totalselisih) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(totalBelanja().totalpersen) }}
                </td>
              </tr>
              <tr class="bg-grey-2">
                <td class="text-right text-bold" colspan="2">
                  SURPLUS / DEFISIT LRA
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(surplusDefisit().totalpagu) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(surplusDefisit().totalsblm) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(surplusDefisit().totalskg) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(surplusDefisit().totalsemua) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(surplusDefisit().totalselisih) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(surplusDefisit().totalpersen) }}
                </td>
              </tr>
              <tr
                v-for="it in store.hasilsilpa" :key="it"
                :class="it.kode.length <= 3 ? 'text-bold' : '' "
              >
                <td>
                  {{ it.kode }}
                </td>
                <td>
                  {{ it.uraian }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it.pagu) }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it.nilaisblm) }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it.nilaiskg) }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it.nilaisemua) }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it.selisih) }}
                </td>
                <td class="text-right">
                  {{ it.persen }}
                </td>
              </tr>
              <tr class="bg-grey-2">
                <td class="text-right text-bold" colspan="2">
                  TOTAL PEMBIAYAAN (NETTO)
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(totalSilpa().totalpagu) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(totalSilpa().totalsblm) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(totalSilpa().totalskg) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(totalSilpa().totalsemua) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(totalSilpa().totalselisih) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(totalSilpa().totalpersen) }}
                </td>
              </tr>
              <tr class="bg-grey-2">
                <td class="text-right text-bold" colspan="2">
                  SISA LEBIH PEMBIAYAAN ANGGARAN (SILPA)
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(sisaLebih().totalpagu) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(sisaLebih().totalsblm) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(sisaLebih().totalskg) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(sisaLebih().totalsemua) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(sisaLebih().totalselisih) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(sisaLebih().totalpersen) }}
                </td>
              </tr>
            </tbody>
            <tbody v-if="store.reqs.levelberapa === 2 || store.reqs.levelberapa === 1">
              <tr
                v-for="it in store.hasilpendapatan" :key="it"
                :class="it.kode.length <= 1 ? 'text-bold' : '' "
              >
                <td>
                  {{ it.kode }}
                </td>
                <td>
                  {{ it.uraian }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it.pagupend) }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it.nilaisblm) }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it.nilaiskg) }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it.nilaisemua) }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it.selisih) }}
                </td>
                <td class="text-right">
                  {{ it.persen }}
                </td>
              </tr>
              <tr class="bg-grey-2">
                <td class="text-right text-bold" colspan="2">
                  JUMLAH PENDAPATAN DAERAH
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(totalPendapatan().totalpend) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(totalPendapatan().totalsblm) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(totalPendapatan().totalskg) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(totalPendapatan().totalsemua) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(totalPendapatan().totalselisih) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(totalPendapatan().totalpersen) }}
                </td>
              </tr>
              <tr
                v-for="it in store.hasilbelanja" :key="it"
                :class="it.kode.length <= 1 ? 'text-bold' : '' "
              >
                <td>
                  {{ it.kode }}
                </td>
                <td>
                  {{ it.uraian }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it.pagu) }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it.nilaisblm) }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it.nilaiskg) }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it.nilaisemua) }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it.selisih) }}
                </td>
                <td class="text-right">
                  {{ it.persen }}
                </td>
              </tr>
              <tr class="bg-grey-2">
                <td class="text-right text-bold" colspan="2">
                  JUMLAH BELANJA DAERAH
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(totalBelanja().totalpagu) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(totalBelanja().totalsblm) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(totalBelanja().totalskg) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(totalBelanja().totalsemua) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(totalBelanja().totalselisih) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(totalBelanja().totalpersen) }}
                </td>
              </tr>
              <tr class="bg-grey-2">
                <td class="text-right text-bold" colspan="2">
                  SURPLUS / DEFISIT LRA
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(surplusDefisit().totalpagu) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(surplusDefisit().totalsblm) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(surplusDefisit().totalskg) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(surplusDefisit().totalsemua) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(surplusDefisit().totalselisih) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(surplusDefisit().totalpersen) }}
                </td>
              </tr>
              <tr
                v-for="it in store.hasilsilpa" :key="it"
                :class="it.kode.length <= 1 ? 'text-bold' : '' "
              >
                <td>
                  {{ it.kode }}
                </td>
                <td>
                  {{ it.uraian }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it.pagu) }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it.nilaisblm) }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it.nilaiskg) }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it.nilaisemua) }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it.selisih) }}
                </td>
                <td class="text-right">
                  {{ it.persen }}
                </td>
              </tr>
              <tr class="bg-grey-2">
                <td class="text-right text-bold" colspan="2">
                  TOTAL PEMBIAYAAN (NETTO)
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(totalSilpa().totalpagu) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(totalSilpa().totalsblm) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(totalSilpa().totalskg) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(totalSilpa().totalsemua) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(totalSilpa().totalselisih) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(totalSilpa().totalpersen) }}
                </td>
              </tr>
              <tr class="bg-grey-2">
                <td class="text-right text-bold" colspan="2">
                  SISA LEBIH PEMBIAYAAN ANGGARAN (SILPA)
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(sisaLebih().totalpagu) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(sisaLebih().totalsblm) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(sisaLebih().totalskg) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(sisaLebih().totalsemua) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(sisaLebih().totalselisih) }}
                </td>
                <td class="text-right text-bold">
                  {{ formattanpaRp(sisaLebih().totalpersen) }}
                </td>
              </tr>
            </tbody>
          </q-markup-table>
        </div>
      </div>
    </q-card-section>
  </template>
  <template v-else>
    <div class="row q-pa-md full-width text-subtitle1 flex-center">
      <q-icon class="q-pr-sm" size="sm" name="icon-mat-warning" />
      BELUM ADA DATA, SILAHKAN PILIH PARAMETER!!
    </div>
  </template>
</template>
<script setup>
import { formattanpaRp } from 'src/modules/formatter'
import { useLRAjurnalStore } from 'src/stores/siasik/laporan/lra/lrajurnal.'
import { ref } from 'vue'
// import { onUnmounted } from 'vue'

const separator = ref('cell')
const store = useLRAjurnalStore()
// onUnmounted(() => {
//   store.getDataLap()
// })

function totalPendapatan () {
  const totalpend = store.hasilpendapatan.map((x) => x.pagupend)[0]
  const totalsblm = store.hasilpendapatan.map((x) => x.nilaisblm)[0]
  const totalskg = store.hasilpendapatan.map((x) => x.nilaiskg)[0]
  const totalsemua = store.hasilpendapatan.map((x) => x.nilaisemua)[0]
  const totalselisih = store.hasilpendapatan.map((x) => x.selisih)[0]
  const totalpersen = store.hasilpendapatan.map((x) => x.persen)[0]
  return {
    totalpend,
    totalsblm,
    totalskg,
    totalsemua,
    totalselisih,
    totalpersen
  }
}
function totalBelanja () {
  const totalpagu = store.hasilbelanja.map((x) => x.pagu)[0]
  const totalsblm = store.hasilbelanja.map((x) => x.nilaisblm)[0]
  const totalskg = store.hasilbelanja.map((x) => x.nilaiskg)[0]
  const totalsemua = store.hasilbelanja.map((x) => x.nilaisemua)[0]
  const totalselisih = store.hasilbelanja.map((x) => x.selisih)[0]
  const totalpersen = store.hasilbelanja.map((x) => x.persen)[0]
  return {
    totalpagu,
    totalsblm,
    totalskg,
    totalsemua,
    totalselisih,
    totalpersen
  }
}
function totalSilpa () {
  const totalpagu = store.hasilsilpa.map((x) => x.pagu)[0]
  const totalsblm = store.hasilsilpa.map((x) => x.nilaisblm)[0]
  const totalskg = store.hasilsilpa.map((x) => x.nilaiskg)[0]
  const totalsemua = store.hasilsilpa.map((x) => x.nilaisemua)[0]
  const totalselisih = store.hasilsilpa.map((x) => x.selisih)[0]
  const totalpersen = store.hasilsilpa.map((x) => x.persen)[0]
  return {
    totalpagu,
    totalsblm,
    totalskg,
    totalsemua,
    totalselisih,
    totalpersen
  }
}
function surplusDefisit () {
  const totalpagu = store.hasilpendapatan.map((x) => x.pagupend)[0] - store.hasilbelanja.map((x) => x.pagu)[0]
  const totalsblm = store.hasilpendapatan.map((x) => x.nilaisblm)[0] - store.hasilbelanja.map((x) => x.nilaisblm)[0]
  const totalskg = store.hasilpendapatan.map((x) => x.nilaiskg)[0] - store.hasilbelanja.map((x) => x.nilaiskg)[0]
  const totalsemua = store.hasilpendapatan.map((x) => x.nilaisemua)[0] - store.hasilbelanja.map((x) => x.nilaisemua)[0]
  const totalselisih = store.hasilpendapatan.map((x) => x.selisih)[0] - store.hasilbelanja.map((x) => x.selisih)[0]
  const totalpersen = store.hasilpendapatan.map((x) => x.persen)[0] - store.hasilbelanja.map((x) => x.persen)[0]
  return {
    totalpagu,
    totalsblm,
    totalskg,
    totalsemua,
    totalselisih,
    totalpersen
  }
}
function sisaLebih () {
  const totalpagu = (store.hasilpendapatan.map((x) => x.pagupend)[0] - store.hasilbelanja.map((x) => x.pagu)[0]) + store.hasilsilpa.map((x) => x.pagu)[0]
  const totalsblm = (store.hasilpendapatan.map((x) => x.nilaisblm)[0] - store.hasilbelanja.map((x) => x.nilaisblm)[0]) + store.hasilsilpa.map((x) => x.nilaisblm)[0]
  const totalskg = (store.hasilpendapatan.map((x) => x.nilaiskg)[0] - store.hasilbelanja.map((x) => x.nilaiskg)[0]) + store.hasilsilpa.map((x) => x.nilaiskg)[0]
  const totalsemua = (store.hasilpendapatan.map((x) => x.nilaisemua)[0] - store.hasilbelanja.map((x) => x.nilaisemua)[0]) + store.hasilsilpa.map((x) => x.nilaisemua)[0]
  const totalselisih = (store.hasilpendapatan.map((x) => x.selisih)[0] - store.hasilbelanja.map((x) => x.selisih)[0]) + store.hasilsilpa.map((x) => x.selisih)[0]
  const totalpersen = (store.hasilpendapatan.map((x) => parseFloat(x.persen))[0] - store.hasilbelanja.map((x) => parseFloat(x.persen))[0]) + store.hasilsilpa.map((x) => parseFloat(x.persen))[0]
  return {
    totalpagu,
    totalsblm,
    totalskg,
    totalsemua,
    totalselisih,
    totalpersen
  }
}
</script>
<style lang="scss">
.my-sticky-table{

  thead tr th{
    position: sticky;
    z-index: 1;
    font-weight: bold;
  }

}
</style>
