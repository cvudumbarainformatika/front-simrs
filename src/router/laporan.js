const laporan = {
  path: '/laporan',
  // component: () => import('layouts/laporan/AdminLayout.vue'),
  component: () => import('layouts/V2/IndexLayout.vue'),
  meta: { requireAuth: true },
  children: [
    { path: '', name: 'laporan', redirect: '/laporan/dashboard' },
    {
      path: '/laporan/dashboard',
      // name: 'laporan.dashboard',
      component: () => import('pages/simrs/laporan/IndexPage.vue')
    },
    {
      path: '/laporan/rekap/datapasien',
      // name: 'laporan.rekap.datapasien',
      component: () => import('pages/simrs/laporan/rekap/datapasien/IndexPage.vue')
    },
    {
      path: '/laporan/keuangan/billrajal',
      // name: 'laporan.keuangan.billrajal',
      component: () => import('pages/simrs/laporan/keuangan/bill/IndexPage.vue')
    },
    {
      path: '/laporan/keuangan/rekapbillbyruangan',
      // name: 'laporan.keuangan.billrajal',
      component: () => import('pages/simrs/laporan/keuangan/billrekapbyruangan/IndexPage.vue')
    },
    {
      path: '/laporan/keuangan/billpoli',
      // name: 'laporan.keuangan.billpoli',
      component: () => import('pages/simrs/laporan/keuangan/billpoli/IndexPage.vue')
    },
    {
      path: '/laporan/keuangan/inacbg',
      // name: 'laporan.keuangan.inacbg',
      component: () => import('pages/simrs/laporan/keuangan/inacbg/IndexPage.vue')
    },
    {
      path: '/laporan/sigarang/penerimaansimperda108',
      // name: 'laporan.sigarang.penerimaansimperda108',
      component: () => import('pages/simrs/laporan/sigarang/penerimaansimperda108/IndexPage.vue')
    },
    {
      path: '/laporan/sigarang/penerimaansimperdarinci',
      // name: 'laporan.sigarang.penerimaansimperdarinci',
      component: () => import('pages/simrs/laporan/sigarang/penerimaansimperdarinci/IndexPage.vue')
    },
    {
      path: '/laporan/sigarang/persediaanakhir',
      // name: 'laporan.sigarang.persediaanakhir',
      component: () => import('pages/simrs/laporan/sigarang/persediaanakhir/IndexPage.vue')
    },
    {
      path: '/laporan/sigarang/penerimaangudang',
      // name: 'laporan.sigarang.penerimaangudang',
      component: () => import('pages/simrs/laporan/sigarang/penerimaangudang/IndexPage.vue')
    },
    {
      path: '/laporan/sigarang/penerimaandepo',
      // name: 'laporan.sigarang.penerimaandepo',
      component: () => import('pages/simrs/laporan/sigarang/penerimaandepo/IndexPage.vue')
    },
    {
      path: '/laporan/sigarang/pengeluaran',
      // name: 'laporan.sigarang.pengeluaran',
      component: () => import('pages/simrs/laporan/sigarang/pengeluaran/IndexPage.vue')
    },
    {
      path: '/laporan/sigarang/pemakaian',
      // name: 'laporan.sigarang.pemakaian',
      component: () => import('pages/simrs/laporan/sigarang/pemakaian/IndexPage.vue')
    },
    {
      path: '/laporan/sigarang/mutasi',
      // name: 'laporan.sigarang.mutasi',
      component: () => import('pages/simrs/laporan/sigarang/mutasi/IndexPage.vue')
    },
    {
      path: '/laporan/sigarang/mutasi-depo',
      // name: 'laporan.sigarang.mutasi-depo',
      component: () => import('pages/simrs/laporan/sigarang/mutasidepo/IndexPage.vue')
    },
    {
      path: '/laporan/sigarang/rekap-mutasi',
      // name: 'laporan.sigarang.rekap-mutasi',
      component: () => import('pages/simrs/laporan/sigarang/rekapmutasi/IndexPage.vue')
    },
    {
      path: '/laporan/sigarang/hutang',
      // name: 'laporan.sigarang.hutang',
      component: () => import('pages/simrs/laporan/sigarang/hutang/IndexPage.vue')
    },
    {
      path: '/laporan/sigarang/rekapkeluardepo',
      // name: 'laporan.sigarang.rekapkeluardepo',
      component: () => import('pages/simrs/laporan/sigarang/rekapkeluardepo/IndexPage.vue')
    },
    {
      path: '/laporan/sigarang/rekapmasukdepo',
      // name: 'laporan.sigarang.rekapmasukdepo',
      component: () => import('pages/simrs/laporan/sigarang/rekapmasukdepo/IndexPage.vue')
    },
    {
      path: '/laporan/sigarang/penerimaanptk',
      // name: 'laporan.sigarang.penerimaanptk',
      component: () => import('pages/simrs/laporan/sigarang/penerimaanptk/IndexPage.vue')
    },
    {
      path: '/laporan/sigarang/stok-opname-gudang',
      // name: 'laporan.sigarang.stokopnamegudang',
      component: () => import('pages/simrs/laporan/sigarang/stokopnamegudang/IndexPage.vue')
    },
    {
      path: '/laporan/bkukeuangan/pengeluaran',
      // name: 'laporan.rekap.datapasien',
      component: () => import('pages/siasik/bkukeuangan/bkupengeluaran/IndexPage.vue')
    },
    {
      path: '/laporan/bkukeuangan/bukubank',
      // name: 'laporan.rekap.datapasien',
      component: () => import('pages/siasik/bkukeuangan/bukubank/IndexPage.vue')
    },
    {
      path: '/laporan/bkukeuangan/bukutunai',
      // name: 'laporan.rekap.datapasien',
      component: () => import('pages/siasik/bkukeuangan/bukutunai/IndexPage.vue')
    },
    {
      path: '/laporan/bkukeuangan/ppk',
      // name: 'laporan.rekap.datapasien',
      component: () => import('pages/siasik/bkukeuangan/bkuppk/IndexPage.vue')
    },
    {
      path: '/laporan/bkuptk',
      // name: 'laporan.rekap.datapasien',
      component: () => import('pages/siasik/bkupptk/IndexPage.vue')
    },
    {
      path: '/laporan/lrasiasik',
      // name: 'laporan.rekap.datapasien',
      component: () => import('pages/siasik/laporanrealisasi/lra/IndexPage.vue')
    },

    {
      path: '/laporan/akuntansi',
      // name: 'laporan.rekap.datapasien',
      component: () => import('pages/siasik/akuntansi/laporanakuntansi/IndexPage.vue'),
      children: [
        { path: '', redirect: '/laporan/akuntansi/bukubesar' },
        {
          path: '/laporan/akuntansi/bukubesar',
          name: 'laporan.akuntansi.bukubesar',
          component: () =>
            import('src/pages/siasik/akuntansi/bukubesar/IndexPage.vue')
        },
        {
          path: '/laporan/akuntansi/lra',
          name: 'laporan.akuntansi.lra',
          component: () =>
            import('src/pages/siasik/akuntansi/laporanakuntansi/lralevel3/IndexPage.vue')
        },
        {
          path: '/laporan/akuntansi/lo',
          name: 'laporan.akuntansi.l0',
          component: () =>
            import('src/pages/siasik/akuntansi/laporanakuntansi/LapOperasional/IndexPage.vue')
        },
        {
          path: '/laporan/akuntansi/lpsal',
          name: 'laporan.akuntansi.lpsal',
          component: () =>
            import('src/pages/siasik/akuntansi/laporanakuntansi/lpsal/IndexPage.vue')
        },
        {
          path: '/laporan/akuntansi/neraca',
          name: 'laporan.akuntansi.neraca',
          component: () =>
            import('src/pages/siasik/akuntansi/laporanakuntansi/neraca/IndexPage.vue')
        }

      ]

    },

    // ANGGARAN
    {
      path: '/laporan/anggaran',
      // name: 'laporan.rekap.datapasien',
      component: () => import('pages/siasik/anggaran/IndexPage.vue'),
      children: [
        { path: '', redirect: '/laporan/anggaran/rka' },
        {
          path: '/laporan/anggaran/rka',
          name: 'laporan.anggaran.rka',
          component: () =>
            import('src/pages/siasik/anggaran/rka/IndexPage.vue')
        }
        // {
        //   path: '/laporan/akuntansi/lra',
        //   name: 'laporan.akuntansi.lra',
        //   component: () =>
        //     import('src/pages/siasik/akuntansi/laporanakuntansi/lralevel3/IndexPage.vue')
        // },
        // {
        //   path: '/laporan/akuntansi/lo',
        //   name: 'laporan.akuntansi.l0',
        //   component: () =>
        //     import('src/pages/siasik/akuntansi/laporanakuntansi/LapOperasional/IndexPage.vue')
        // },
        // {
        //   path: '/laporan/akuntansi/lpsal',
        //   name: 'laporan.akuntansi.lpsal',
        //   component: () =>
        //     import('src/pages/siasik/akuntansi/laporanakuntansi/lpsal/IndexPage.vue')
        // },
        // {
        //   path: '/laporan/akuntansi/neraca',
        //   name: 'laporan.akuntansi.neraca',
        //   component: () =>
        //     import('src/pages/siasik/akuntansi/laporanakuntansi/neraca/IndexPage.vue')
        // }

      ]

    },

    // farmasi
    {
      path: '/laporan/farmasi/stok',
      // name: 'laporan.farmasi.stok',
      component: () => import('pages/simrs/laporan/farmasi/stok/IndexPage.vue')
    },
    {
      path: '/laporan/farmasi/penerimaan',
      // name: 'laporan.farmasi.penerimaan',
      component: () => import('pages/simrs/laporan/farmasi/penerimaan/IndexPage.vue')
    },
    {
      path: '/laporan/farmasi/hutang',
      // name: 'laporan.farmasi.hutang',
      component: () => import('pages/simrs/laporan/farmasi/hutang/IndexPage.vue')
    },
    {
      path: '/laporan/farmasi/pemakaian-obat',
      // name: 'laporan.farmasi.pemakaian-obat',
      component: () => import('pages/simrs/laporan/farmasi/pemakaianobat/IndexPage.vue')
    },
    {
      path: '/laporan/farmasi/persediaan-akhir-fifo',
      // name: 'laporan.farmasi.persediaan-akhir-fifo',
      component: () => import('pages/simrs/laporan/farmasi/persediaanakhirfifo/IndexPage.vue')
    },
    {
      path: '/laporan/farmasi/mutasi-fifo',
      // name: 'laporan.farmasi.mutasi-fifo',
      component: () => import('pages/simrs/laporan/farmasi/mutasififo/IndexPage.vue')
    },
    {
      path: '/laporan/farmasi/barang-rusak',
      // name: 'laporan.farmasi.barang-rusak',
      component: () => import('pages/simrs/laporan/farmasi/barangrusak/IndexPage.vue')
    },

    {
      path: '/laporan/notfound',
      component: () => import('pages/MidlewareNotFound.vue')
    }
  ]
}
export default laporan
