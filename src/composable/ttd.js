import { ref, onMounted, onUnmounted } from 'vue'

export function useTtd() {
  const x = ref(0)
  const y = ref(0)

  const canvas = ref(null)

  function update(event) {
    x.value = event.pageX
    y.value = event.pageY
  }

  function getCanvas() {
    canvas.value = document.querySelector('canvas')
  }

  onMounted(() => {
    getCanvas()
    window.addEventListener('mousemove', update)
  })
  onUnmounted(() => window.removeEventListener('mousemove', update))
}
