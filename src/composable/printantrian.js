import { ref } from 'vue'

export function usePrintAntrian () {
  const nomor = ref('----')

  function setNomor (val) {
    nomor.value = val
  }
  return {
    nomor,
    setNomor
  }
}
