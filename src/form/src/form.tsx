import { defineComponent, toRefs, computed, provide } from 'vue'
import { FormProps, formProps } from './form-type'

export default defineComponent({
  name: 'Form',
  props: formProps,
  setup(props: FormProps, { slots }) {
    // 向下提供labal_data
    const labelData = computed(() => ({
      layout: props.layout
    }))
    provide('LABEL_DATA', labelData)
    return () => <div>{slots.default?.()}</div>
  }
})
