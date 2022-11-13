import { defineStore } from 'pinia'

export const usePegawaiApplicationStore = defineStore('aplikasi_kepegawaian', {
  state: () => ({
    menus: [
      {
        id: 1,
        nama: 'Dashboard',
        name: 'pegawai.dashboard',
        icon: 'icon-mat-dashboard',
        link: 'pegawai/dashboard',
        submenus: []
      },
      {
        id: 2,
        nama: 'Master',
        name: 'pegawai.master',
        icon: 'icon-mat-dataset',
        link: 'pegawai/absensi',
        submenus: [
          {
            nama: 'Cuti',
            name: 'pegawai.master.cuti',
            icon: 'icon-mat-dataset',
            link: 'pegawai/master/cuti'
          }
        ]
      },
      {
        id: 3,
        nama: 'Absensi',
        name: 'pegawai.absensi',
        icon: 'icon-mat-fingerprint',
        link: 'pegawai/absensi',
        submenus: [
          {
            nama: 'Jadwal',
            name: 'pegawai.absensi.jadwal',
            icon: 'icon-mat-fingerprint',
            link: 'pegawai/absensi/jadwal'
          },
          {
            nama: 'Prota',
            name: 'pegawai.absensi.prota',
            icon: 'icon-mat-fingerprint',
            link: 'pegawai/absensi/prota'
          },
          {
            nama: 'Extra',
            name: 'pegawai.absensi.extra',
            icon: 'icon-mat-fingerprint',
            link: 'pegawai/absensi/extra'
          },
          {
            nama: 'QrCode',
            name: 'pegawai.absensi.qrcode',
            icon: 'icon-mat-fingerprint',
            link: 'pegawai/absensi/qrcode'
          }
        ]
      }
    ]
  }),
  actions: {}
})
