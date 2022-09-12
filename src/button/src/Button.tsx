import { defineComponent, toRefs } from 'vue'

import { ButtonProps, buttonProps } from './button-types'

export default defineComponent({
  name: 'CButton',
  props: buttonProps,
  setup(props: ButtonProps, { slots }) {
    return () => {
      const { type } = toRefs(props)

      const defaultSlot = slots.default ? slots.default() : '按钮'
      return <button class={`c-btn c-btn--${type.value}`}>{defaultSlot}</button>
    }
  }
})
