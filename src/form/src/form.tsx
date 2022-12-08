import { defineComponent, toRefs, computed, provide, InjectionKey } from 'vue'
import type { Rules } from 'async-validator'
import { FormItemContext } from './form-item-type'
import { FormProps, formProps, LabelSize, LabelAlign } from './form-type'

export default defineComponent({
  name: 'Form',
  props: formProps,
  setup(props: FormProps, { slots }) {
    // 向下提供labal_data
    const labelData = computed(() => ({
      layout: props.layout,
      labelSize: props.labelSize,
      labelAlign: props.labelAlign
    }))
    provide('LABEL_DATA', labelData)

    // 提供一个Set存放待校验items
    const formItems = new Set<FormItemContext>()
    const addItem = (item: FormItemContext) => formItems.add(item)
    const removeItem = (item: FormItemContext) => formItems.delete(item)

    // 提供表单上下文给后代使用
    provide(formContextToken, {
      model: props.model,
      rules: props.rules,
      addItem,
      removeItem
    })

    return () => <div>{slots.default?.()}</div>
  }
})

export type FormContext = {
  model: any
  rules?: Rules
  addItem: (item: FormItemContext) => void
  removeItem: (item: FormItemContext) => void
}

export const formContextToken: InjectionKey<FormContext> =
  Symbol('formContextToken')
