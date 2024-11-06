import { reactive } from 'vue'

export default function usePreview (item) {
  const data = reactive({
    item
  })

  return {
    data
  }
}
