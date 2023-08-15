import { h } from 'vue'

const Text = (props, context) => {
  return h(
    props.type,
    {
      class: 'text-content'
    },
    props.content
  )
}

export default Text
