import { defineComponent, toRefs } from 'vue'

import { ButtonProps, buttonProps } from './button-types'

export default defineComponent({
  name: 'CButton',
  props: buttonProps,
  setup(props: ButtonProps, { slots }) {
    return () => {
      const { type, size } = toRefs(props)

      const defaultSlot = slots.default ? slots.default() : '按钮'
      return (
        <button class={`s-btn s-btn--${type.value} s-btn--${size.value}`}>
          {defaultSlot}
        </button>
      )
    }
  }
})
