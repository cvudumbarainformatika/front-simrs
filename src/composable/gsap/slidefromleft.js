import gsap from 'gsap'
import { ref } from 'vue'

export function useSlideFromLeft() {
  const duration = ref(0.3)
  const enter = (element, done) => {
    return gsap.timeline({ onComplete: done }).fromTo(
      element,
      {
        // opacity: 0.8,
        xPercent: -100,
        duration: duration.value
      },
      {
        // opacity: 1,
        xPercent: 0,
        duration: duration.value
      },
      0
    )
  }

  const leave = (el, done) => {
    return gsap.timeline({ onComplete: done })
      .to(el, {
        duration: duration.value,
        xPercent: -100
      }, 0)
      .to(el, {
        duration: duration.value
        // opacity: 0.8
      }, 0)
  }
  return {
    enter, leave
  }
}
