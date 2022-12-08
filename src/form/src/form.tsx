import { defineComponent, toRefs, computed, provide } from 'vue'
import { FormProps, formProps, LabelSize, LabelAlign } from './form-type'

export default defineComponent({
  name: 'Form',
  props: formProps,
  setup(props: FormProps, { slots }) {
    // 向下提供labal_data
    const labelData = computed(() => ({
      layout: props.layout,
      LabelSize: props.labelSize,
      LabelAlign: props.labelAlign
    }))
    provide('LABEL_DATA', labelData)
    return () => <div>{slots.default?.()}</div>
  }
})
