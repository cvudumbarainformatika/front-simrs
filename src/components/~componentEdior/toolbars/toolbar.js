import { useQuasar } from 'quasar'
import { ref } from 'vue'

export function useToolbar() {
  const $q = useQuasar()
  const toolbar = ref(
    [
      ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
      ['left', 'center', 'right', 'justify'],
      ['token', 'hr', 'link'],
      [
        {
          label: $q.lang.editor.formatting,
          icon: $q.iconSet.editor.formatting,
          list: 'no-icons',
          options: [
            'h1',
            'h2',
            'h3',
            'h4',
            'h5',
            'h6',
            'p',
            'code'
          ]
        },
        {
          label: $q.lang.editor.fontSize,
          icon: $q.iconSet.editor.fontSize,
          fixedLabel: true,
          fixedIcon: true,
          list: 'no-icons',
          options: [
            'size-1',
            'size-2',
            'size-3',
            'size-4',
            'size-5',
            'size-6',
            'size-7'
          ]
        },
        {
          label: $q.lang.editor.defaultFont,
          icon: $q.iconSet.editor.font,
          list: 'no-icons',
          options: [
            'default_font',
            'arial',
            'arial_black',
            'comic_sans',
            'courier_new',
            'impact',
            'lucida_grande',
            'times_new_roman',
            'verdana'
          ]
        },
        'removeFormat'
      ],
      // ['quote', 'unordered', 'ordered', 'outdent', 'indent'],
      ['quote', 'unordered', 'ordered'],
      ['undo', 'redo'],
      ['viewsource', 'print', 'image', 'save', 'fullscreen']

    ]
  )

  const fonts = ref(
    {
      arial: 'Arial',
      arial_black: 'Arial Black',
      comic_sans: 'Comic Sans MS',
      courier_new: 'Courier New',
      impact: 'Impact',
      lucida_grande: 'Lucida Grande',
      times_new_roman: 'Times New Roman',
      verdana: 'Verdana'
    }
  )

  // function increment() {
  //   counter.value++
  // }

  return {
    toolbar, fonts
  }
}
