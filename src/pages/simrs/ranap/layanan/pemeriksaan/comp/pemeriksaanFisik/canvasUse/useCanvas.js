import { fabric } from 'fabric'
import { reactive, ref } from 'vue'

export default function useCanvas () {
  const ruler = ref(false)

  const setWorkspace = reactive({
    minWidth: 100,
    minHeight: 200,
    width: 0,
    height: 0
  })

  const initCanvas = (cnv, width, height) => {
    console.log('width', width)
    console.log('height', height)
    console.log('ref', cnv)
    const canvas = new fabric.Canvas(cnv, {
      fireRightClick: true, // 启用右键，button的数字为3
      stopContextMenu: true, // 禁止默认右键菜单
      controlsAboveOverlay: true, // 超出clipPath后仍然展示控制条
      // imageSmoothingEnabled: false, // 解决文字导出后不清晰问题
      preserveObjectStacking: true // 当选择画布中的对象时，让对象不在顶层。
      // width: 600,
      // height: width
    })
    canvas.setDimensions({ width, height })
    // const rect = new fabric.Rect({
    //   fill: 'red',
    //   width: 20,
    //   height: 20
    // })
    // canvas.add(rect)

    _initWorkspace(canvas, width, height)
    _initZoom(canvas)
  }

  const _initWorkspace = (canvas, w, h) => {
    const width = w - setWorkspace.minWidth
    const height = h - setWorkspace.minHeight
    setWorkspace.width = width
    setWorkspace.height = height
    const workspace = new fabric.Rect({
      // fill: 'rgba(255,255,255,1)',
      fill: 'white',
      width,
      height,
      id: 'workspace',
      strokeWidth: 0
    })

    workspace.set('selectable', false)
    workspace.set('hasControls', false)
    workspace.hoverCursor = 'default'
    canvas.add(workspace)
    canvas.centerObject(workspace)
    canvas.renderAll()
  }

  const _initZoom = (canvas) => {
    canvas.on('mouse:wheel', function (opt) {
      const delta = opt.e.deltaY
      let zoom = canvas.getZoom()
      zoom *= 0.999 ** delta
      if (zoom > 20) zoom = 20
      if (zoom < 0.01) zoom = 0.01
      const center = canvas.getCenter()
      canvas.zoomToPoint(new fabric.Point(center.left, center.top), zoom)
      opt.e.preventDefault()
      opt.e.stopPropagation()
    })
  }

  return {
    ruler,
    initCanvas,
    setWorkspace
  }
}
