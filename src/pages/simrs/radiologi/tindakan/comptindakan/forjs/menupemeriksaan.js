import { useMasterPemeriksaanFisik } from 'src/stores/simrs/master/poliklinik/pemeriksaanfisik'
import { onMounted, ref } from 'vue'

export function useMenuPemeriksaan() {
  // const menus = ref(
  //   [
  //     { name: 'Body', icon: 'icon-my-human-body-silhouette-with-focus-on-respiratory-system-svgrepo-com', url: 'body' },
  //     { name: 'Kepala', icon: 'icon-my-human-skull-side-view-svgrepo-com', url: 'kepala' },
  //     { name: 'Mata', icon: 'icon-my-eyebrow-svgrepo-com', url: 'mata' },
  //     { name: 'Telinga', icon: 'icon-my-ear-outline-svgrepo-com', url: 'telinga' },
  //     { name: 'Hidung', icon: 'icon-my-nose-svgrepo-com', url: 'hidung' },
  //     { name: 'Rambut', icon: 'icon-my-male-black-short-hair-shape-silhouette-svgrepo-com', url: 'rambut' },
  //     { name: 'Bibir', icon: 'icon-my-thin-lips-outline-svgrepo-com', url: 'bibir' },
  //     { name: 'Gigi Geligi', icon: 'icon-my-tooth-outline-svgrepo-com', url: 'gigi' },
  //     { name: 'Lidah', icon: 'icon-my-tongue-and-mouth-svgrepo-com', url: 'lidah' },
  //     { name: 'Leher', icon: 'icon-my-human-neck-svgrepo-com', url: 'leher' },
  //     { name: 'Tenggorokan', icon: 'icon-my-human-trachea-svgrepo-com', url: 'tenggorokan' },
  //     { name: 'Tonsil', icon: 'icon-my-tonsil-svgrepo-com', url: 'tonsil' },
  //     { name: 'Dada', icon: 'icon-my-female-torso-svgrepo-com' },
  //     { name: 'Payudara', icon: 'icon-my-upper-torso-of-a-woman-svgrepo-com' },
  //     { name: 'Punggung', icon: 'icon-my-human-back-svgrepo-com' },
  //     { name: 'Perut', icon: 'icon-my-stomach-svgrepo-com' },
  //     { name: 'Genital', icon: 'icon-my-penis-svgrepo-com' },
  //     { name: 'Anus/Dubur', icon: 'icon-my-nose-outline-svgrepo-com' },
  //     { name: 'Lengan Atas', icon: 'icon-my-men-elbow-svgrepo-com' },
  //     { name: 'Lengan Bawah', icon: 'icon-my-arm-svgrepo-com' },
  //     { name: 'Jari Tangan', icon: 'icon-my-human-hand-bones-svgrepo-com' },
  //     { name: 'Kuku Tangan', icon: 'icon-my-finger-svgrepo-com' },
  //     { name: 'Persendian Tangan', icon: 'icon-mat-report' },
  //     { name: 'Tungkai Atas', icon: 'icon-my-men-leg-svgrepo-com' },
  //     { name: 'Tungkai Bawah', icon: 'icon-my-foot-side-view-outline-svgrepo-com' },
  //     { name: 'Jari Kaki', icon: 'icon-my-footprints-outline-variant-svgrepo-com' },
  //     { name: 'Kuku Kaki', icon: 'icon-my-finger-svgrepo-com' },
  //     { name: 'Persendian Kaki', icon: 'icon-my-articulation-bones-svgrepo-com' }
  //   ]
  // )

  const menus = ref([])
  const master = useMasterPemeriksaanFisik()

  const search = ref('')

  function filterredMenu() {
    const newMenus = menus.value
    if (search.value !== '' || search.value !== null) {
      const filter = search.value.toLowerCase()
      return newMenus.filter(x => {
        // const data = x.name.toLowerCase()
        const data = x.nama.toLowerCase()
        return data.indexOf(filter) > -1
      })
    }
    return newMenus
  }

  onMounted(() => {
    menus.value = master.items
  })

  return { menus, search, filterredMenu }
}
