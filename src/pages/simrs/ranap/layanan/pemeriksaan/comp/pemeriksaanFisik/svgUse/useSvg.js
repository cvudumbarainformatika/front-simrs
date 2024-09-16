import { reactive, ref } from 'vue'

export default function useSvg () {
  const svgEl = ref(null)

  const targetEl = reactive({
    id: null,
    title: null,
    desc: null,
    x: 0,
    y: 0
  })
  const getSvgEl = (el) => {
    svgEl.value = el
    console.log('getSvgEl', svgEl.value)
  }

  const _initSVG = (_svg) => {
    getSvgEl(_svg)
    // eslint-disable-next-line no-unused-vars
    const { x, y, width, height } = _svg.viewBox.baseVal
    console.log('x, y, width, height', x, y, width, height)

    // const pathSvg = _svg.querySelectorAll('path')
    const gSvg = _svg.children

    console.log('gSvg', gSvg)

    for (let i = 0; i < gSvg.length; i++) {
      const group = gSvg[i]
      // console.log('g', g)
      if (group.tagName === 'g') {
        // console.log('g', g)
        const gChildren = group.children
        for (let j = 0; j < gChildren.length; j++) {
          const el = gChildren[j]
          if (el.tagName === 'g') {
            el.classList.add('main')
            const gChildren2 = el.children
            for (let k = 0; k < gChildren2.length; k++) {
              const pathMain = gChildren2[k]
              if (pathMain.tagName === 'path') {
                pathMain.classList.add('main')
              }
            }
            // console.log('el g', el)
          }
          else {
            if (el.tagName === 'path' || el.tagName === 'ellipse') {
              const path = el
              path.style.pointerEvents = 'auto'
              path.style.fill = 'rgba(71, 71, 71, 0)'
              path.style.stroke = 'rgba(71, 71, 71, 0)'
              path.classList.add('hovered')
              // console.log('path', path)
              el.addEventListener('mouseover', onMouseOver)
              el.addEventListener('mouseleave', onMouseLeave)
              el.addEventListener('click', onMouseClick)
            }

            if (el.tagName === 'title') {
              const titleGroup = el
              console.log('title', titleGroup)
            }
          }
        }
      }

      // else if (g.tagName === 'path') {
      //   console.log('el', g)
      //   g.style.fill = 'transparent'
      // }
    }
    // for (let n = 0; n < g.length; n++) {
    //   const el = g[n]
    //   if (el.nodeName === 'g') {
    //     for (let x = 0; x < el.childNodes.length; x++) {
    //       const path = el.childNodes[x]
    //       // console.log('path', path)
    //       path.classList.add('main')
    //     }
    //   }
    // }

    // for (let i = 0; i < pathSvg?.length; i++) {
    //   const el = pathSvg[i]
    //   // console.log('_initSVG', el)
    //   // el.classList.add('ho')
    //   el.addEventListener('mouseover', onMouseOver)
    //   // el.addEventListener('mouseleave', onMouseLeave)
    //   // el.addEventListener('click', onMouseClick)
    //   // el.addEventListener('wheel', onMouseWheel)
    // }
  }

  // eslint-disable-next-line no-unused-vars
  const onMouseOver = (e) => {
    const targetId = document.getElementById(e.target.id)
    if (targetId) {
      // console.log('onMouseOver', targetId)
      targetId.style.fill = 'rgba(71, 71, 71, 0.3)'
      targetId.style.stroke = 'red'
      targetId.style.strokeWidth = '0.025em'

      targetEl.id = e?.target?.id
      targetEl.desc = e?.target?.children[0].innerHTML
      targetEl.title = e?.target?.children[1].innerHTML
    }

    const el = e.target
    const svg = svgEl.value

    targetEl.x = el.getBoundingClientRect().x - svg.getBoundingClientRect().x + 20
    targetEl.y = el.getBoundingClientRect().y - svg.getBoundingClientRect().y + 20

    //
    // targetEl.id = e?.target?.id
    // targetEl.title = e?.target?.attributes.title?.value ?? null
    // window.onmousemove = function (j) {
    //   // console.log('onmousemove', j)
    //   targetEl.x = j.clientX - 290
    //   targetEl.y = j.clientY - 200
    //   // targetEl.x = j.x
    //   // targetEl.y = j.y
    // }
    e.stopPropagation()
  }

  const onMouseLeave = (e) => {
    const targetId = document.getElementById(e.target.id)
    if (targetId) {
      // console.log('onMouseLeave', targetId)
      targetId.style.fill = 'rgba(71, 71, 71, 0)'
      targetId.style.stroke = 'rgba(71, 71, 71, 0)'
      targetId.style.strokeWidth = 0

      targetEl.id = null
      targetEl.desc = null
      targetEl.title = null
    }
    e.stopPropagation()
  }

  const onMouseClick = (e) => {
    const el = e.target
    const svg = svgEl.value

    targetEl.x = el.getBoundingClientRect().x - svg.getBoundingClientRect().x
    targetEl.y = el.getBoundingClientRect().y - svg.getBoundingClientRect().y

    // console.log('onMouseClick', el.getBoundingClientRect())
    // console.log('onMouseClickSvg', svg.getBoundingClientRect())
    // console.log('targetEl', targetEl)
  }

  return {
    getSvgEl,
    _initSVG,
    svgEl,
    targetEl
  }
}
