import { reactive, ref } from 'vue'

export default function useSvg () {
  const svgEl = ref(null)

  const point = ref(null)

  const targetEl = reactive({
    id: null,
    title: null,
    desc: null,
    x: 0,
    y: 0
  })

  const viewPortSize = reactive({
    el: null,
    width: 0,
    height: 0
  })

  const svgViewBox = reactive({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    defaultWidth: 0,
    defaultHeight: 0,
    maxWidth: 0,
    maxHeight: 0,
    minWidth: 0,
    minHeight: 0,
    translateX: 0,
    translateY: 0,
    scale: 1.1,
    scaleDelta: 1,
    duration: 0.5
  })

  const getSvgEl = (el) => {
    svgEl.value = el
    // console.log('parentSVG', el.parentElement)
    const { x, y, width, height } = el.viewBox.baseVal
    svgViewBox.x = x
    svgViewBox.y = y
    svgViewBox.width = width
    svgViewBox.height = height
    svgViewBox.defaultWidth = width
    svgViewBox.defaultHeight = height
    svgViewBox.maxWidth = width / 10
    svgViewBox.maxHeight = height / 10
    svgViewBox.minWidth = width * 1
    svgViewBox.minHeight = height * 1

    const { clientHeight, clientWidth } = el.parentNode
    el = el.parentNode
    viewPortSize.width = clientWidth
    viewPortSize.height = clientHeight
    // console.log('viewPort', clientHeight, clientWidth)
  }

  const _initSVG = (_svg) => {
    getSvgEl(_svg)
    // eslint-disable-next-line no-unused-vars

    _svg.addEventListener('wheel', viewPortOnMouseWheel)
    // console.dir('svg', _svg)

    // _svg.addEventListener('mouseover', viewPortOnonMouseClick)
    // _svg.addEventListener('wheel', viewPortOnMouseWheel)

    // const pathSvg = _svg.querySelectorAll('path')
    const gSvg = _svg.children

    // console.log('gSvg', gSvg)

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
              // el.addEventListener('mousewheel', onMouseWheel)
            }

            if (el.tagName === 'title') {
              // const titleGroup = el
              // console.log('title', titleGroup)
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
    e.preventDefault()
    const targetId = document.getElementById(e.target.id)
    if (targetId) {
      // console.log('onMouseOver', targetId)
      targetId.style.fill = 'rgba(71, 71, 71, 0.3)'
      targetId.style.stroke = 'red'
      targetId.style.strokeWidth = '0.025em'

      targetEl.id = e?.target?.id ?? null
      targetEl.desc = e?.target?.children[0]?.innerHTML ?? null
      targetEl.title = e?.target?.children[1]?.innerHTML ?? null
    }

    const svg = svgEl.value
    // point.value = svg.createSVGPoint()

    // point.value.x = e.clientX
    // point.value.y = e.clientY

    // const startPoint = point.value.matrixTransform(svgEl.value.getScreenCTM().inverse())

    // targetEl.x = (startPoint.x - svgViewBox.x) * svgViewBox.scaleDelta
    // targetEl.y = (startPoint.y - svgViewBox.y) * svgViewBox.scaleDelta

    // const el = e.target
    // targetEl.x = (el.getBoundingClientRect().x - svg.getBoundingClientRect().x) + 30
    // targetEl.y = (el.getBoundingClientRect().y - svg.getBoundingClientRect().y) - 10
    // const el = e.target
    // targetEl.x = (point.value.x - el.getBoundingClientRect().x)
    // targetEl.y = (point.value.y - el.getBoundingClientRect().y)
    // console.log('svg', svg.getBoundingClientRect())
    // console.log('el', el.getBoundingClientRect())
    // console.log('scalling', svgViewBox.scaleDelta)

    //
    // targetEl.id = e?.target?.id
    // targetEl.title = e?.target?.attributes.title?.value ?? null
    window.onmousemove = function (j) {
      // console.log('onmousemove', j)
      targetEl.x = (j.clientX - svg.getBoundingClientRect().x) + (20 * svgViewBox.scaleDelta)
      targetEl.y = j.clientY - (svg.getBoundingClientRect().y) - (10 * svgViewBox.scaleDelta)
    }
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
    e.preventDefault()
    // const el = e.target
    const svg = svgEl.value
    point.value = svg.createSVGPoint()

    // targetEl.x = el.getBoundingClientRect().x - svg.getBoundingClientRect().x
    // targetEl.y = el.getBoundingClientRect().y - svg.getBoundingClientRect().y

    // console.log('onMouseClick', el.getBoundingClientRect())
    // console.log('onMouseClickSvg', svg.getBoundingClientRect())
    console.log('clicked', svg.getBoundingClientRect())
    console.log('clicked 2', svgViewBox.height, svgViewBox.width)
    console.log('clicked 3', viewPortSize.height, viewPortSize.width)
    // console.log('clicked 4', startPoint)
  }

  const viewPortOnMouseWheel = (e) => {
    // console.log('mouseWheel on viewPort', e)
    _gsapZOOM(e)
    e.preventDefault()
    e.stopPropagation()
  }

  const _gsapZOOM = (event) => {
    let normalized
    let delta = event.wheelDelta
    if (delta) {
      normalized = (delta % 100) === 0 ? delta / 100 : delta / 10
    }
    else {
      delta = event.deltaY || event.detail || 0
      normalized = -(delta % 3 ? delta * 10 : delta / 3)
    }

    // eslint-disable-next-line no-unused-vars
    const scaleDelta = normalized > 0 ? 1 / svgViewBox.scale : svgViewBox.scale
    svgViewBox.scaleDelta = scaleDelta
    // console.log('gsap zoom', scaleDelta)

    const svg = svgEl.value
    point.value = svg.createSVGPoint()

    point.value.x = event.clientX
    point.value.y = event.clientY
    // console.log('point', point.value)

    const startPoint = point.value.matrixTransform(svgEl.value.getScreenCTM().inverse())
    // console.log('startPoint', startPoint)

    svgViewBox.x -= (startPoint.x - svgViewBox.x) * (scaleDelta - 1)
    svgViewBox.y -= (startPoint.y - svgViewBox.y) * (scaleDelta - 1)
    svgViewBox.width *= scaleDelta
    svgViewBox.height *= scaleDelta

    // if (svgViewBox.width < svgViewBox.maxWidth) svgViewBox.width = svgViewBox.maxWidth
    // if (svgViewBox.height < svgViewBox.maxHeight) svgViewBox.height = svgViewBox.maxHeight

    // if (svgViewBox.width > svgViewBox.minWidth) svgViewBox.width = svgViewBox.minWidth
    // if (svgViewBox.height > svgViewBox.minHeight) svgViewBox.height = svgViewBox.minHeight

    const scaledViewBox = [svgViewBox.x, svgViewBox.y, svgViewBox.width, svgViewBox.height].map(s => s).join(' ')
    svgEl.value.setAttribute('viewBox', scaledViewBox)

    // console.log('scaledViewBox', scaledViewBox)
  }

  return {
    getSvgEl,
    _initSVG,
    svgEl,
    targetEl
  }
}
