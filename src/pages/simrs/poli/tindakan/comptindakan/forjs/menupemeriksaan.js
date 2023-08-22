import { ref } from 'vue'

export function useMenuPemeriksaan() {
  const menus = ref(
    [
      { name: 'Body', icon: 'icon-my-human-body-silhouette-with-focus-on-respiratory-system-svgrepo-com', url: 'body' },
      { name: 'Kepala', icon: 'icon-my-human-skull-side-view-svgrepo-com' },
      { name: 'Mata', icon: 'icon-my-eyebrow-svgrepo-com' },
      { name: 'Telinga', icon: 'icon-my-ear-outline-svgrepo-com' },
      { name: 'Hidung', icon: 'icon-my-nose-svgrepo-com' },
      { name: 'Rambut', icon: 'icon-my-male-black-short-hair-shape-silhouette-svgrepo-com' },
      { name: 'Bibir', icon: 'icon-my-thin-lips-outline-svgrepo-com' },
      { name: 'Gigi Geligi', icon: 'icon-my-tooth-outline-svgrepo-com' },
      { name: 'Lidah', icon: 'icon-my-tongue-and-mouth-svgrepo-com' },
      { name: 'Leher', icon: 'icon-my-human-neck-svgrepo-com' },
      { name: 'Tenggorokan', icon: 'icon-my-human-trachea-svgrepo-com' },
      { name: 'Tonsil', icon: 'icon-my-tonsil-svgrepo-com' },
      { name: 'Dada', icon: 'icon-my-female-torso-svgrepo-com' },
      { name: 'Payudara', icon: 'icon-my-upper-torso-of-a-woman-svgrepo-com' },
      { name: 'Punggung', icon: 'icon-my-human-back-svgrepo-com' },
      { name: 'Perut', icon: 'icon-my-stomach-svgrepo-com' },
      { name: 'Genital', icon: 'icon-my-penis-svgrepo-com' },
      { name: 'Anus/Dubur', icon: 'icon-my-nose-outline-svgrepo-com' },
      { name: 'Lengan Atas', icon: 'icon-my-men-elbow-svgrepo-com' },
      { name: 'Lengan Bawah', icon: 'icon-my-arm-svgrepo-com' },
      { name: 'Jari Tangan', icon: 'icon-my-human-hand-bones-svgrepo-com' },
      { name: 'Kuku Tangan', icon: 'icon-my-finger-svgrepo-com' },
      { name: 'Persendian Tangan', icon: 'icon-mat-report' },
      { name: 'Tungkai Atas', icon: 'icon-my-men-leg-svgrepo-com' },
      { name: 'Tungkai Bawah', icon: 'icon-my-foot-side-view-outline-svgrepo-com' },
      { name: 'Jari Kaki', icon: 'icon-my-footprints-outline-variant-svgrepo-com' },
      { name: 'Kuku Kaki', icon: 'icon-my-finger-svgrepo-com' },
      { name: 'Persendian Kaki', icon: 'icon-my-articulation-bones-svgrepo-com' }
    ]
  )

  const search = ref('')

  function filterredMenu() {
    const newMenus = menus.value
    if (search.value !== '' || search.value !== null) {
      const filter = search.value.toLowerCase()
      return newMenus.filter(x => {
        const data = x.name.toLowerCase()
        return data.indexOf(filter) > -1
      })
    }
    return newMenus
  }

  function getImage() {
    const modules = import.meta.glob('/src/assets/human/anatomys/*.{png,svg,jpg,jpeg}', { eager: true })
    const moduleKeys = Object.keys(modules)
    console.log(moduleKeys)
    // try {
    //   const modules = import.meta.glob('@/assets/images/**/*.{png,svg}', { eager: true })
    //   const moduleKeys = Object.keys(modules)
    //   const fileSrc = moduleKeys.find(key => key.includes(fileName))

    //   return fileSrc ? modules[fileSrc].default : ''
    // } catch (err) {
    //   console.log(err)
    // }
  }

  return { menus, search, filterredMenu, getImage }
}
