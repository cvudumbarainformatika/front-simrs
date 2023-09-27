// import { ref } from 'vue'

export function useGroupBy() {
  // const group = ref([])

  function setGroup(list, keyGetter) {
    const map = new Map()
    list.forEach((item) => {
      const key = keyGetter(item)
      const collection = map.get(key)
      if (!collection) {
        map.set(key, [item])
      } else {
        collection.push(item)
      }
    })
    const arr = Array.from(map, ([name, value]) => ({ name, value }))
    return arr
  }

  return {
    setGroup
  }
}
