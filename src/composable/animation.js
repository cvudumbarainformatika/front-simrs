import gsap from 'gsap'
export function useAnimation() {
  function beforeEnter(el) {
    // console.log('before Enter')
    el.style.transform = 'translateY(100%)'
    // el.style.transform = 'translateX(-10px)'
    // el.style.transform = 'scale(1,0)'
    el.style.opacity = 0.8
  }
  function enter(el) {
    // console.log('Enter')
    gsap.to(el, {
      duration: 0.5,
      y: 0,
      // x: 0,
      opacity: 1
      // scale: (1, 1)
    })
  }

  function beforeLeave(el) {
    // console.log('before Leave')
    el.style.transform = 'translateY(0)'
    el.style.opacity = 1
  }
  function leave(el) {
    // console.log('Leave')
    gsap.to(el, {
      duration: 1,
      translateY: '100%'
      // opacity: 0
    })
  }

  return {
    beforeEnter, enter, beforeLeave, leave
  }
}
