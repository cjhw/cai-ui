import { defineComponent, toRefs } from 'vue'

import { ButtonProps, buttonProps } from './button-types'

export default defineComponent({
  name: 'CButton',
  props: buttonProps,
  setup(props: ButtonProps, { slots }) {
    return () => {
      const { type, size, disabled, block } = toRefs(props)

      const defaultSlot = slots.default ? slots.default() : '按钮'
      const blockCls = block.value ? 's-btn--block' : ''

      return (
        <button
          disabled={disabled.value}
          class={`s-btn s-btn--${type.value} s-btn--${size.value} ${blockCls}`}
        >
          {defaultSlot}
        </button>
      )
    }
  }
})
