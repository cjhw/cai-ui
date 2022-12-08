import { defineComponent, toRefs, computed, provide, InjectionKey } from 'vue'
import type { Rules, Values } from 'async-validator'
import { FormItemContext } from './form-item-type'
import { FormProps, formProps } from './form-type'

export default defineComponent({
  name: 'Form',
  props: formProps,
  emits: ['submit'],
  setup(props: FormProps, { slots, emit, expose }) {
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

    const submit = (event: Event) => {
      event.preventDefault()
      emit('submit')
    }

    function validate(callback: (valid: boolean) => void) {
      const tasks: Array<Promise<Values>> = []
      formItems.forEach(item => tasks.push(item.validate()))
      Promise.all(tasks)
        .then(() => callback(true))
        .catch(() => callback(false))
    }

    expose({
      validate
    })

    return () => (
      <form class="s-form" onSubmit={submit}>
        {slots.default?.()}
      </form>
    )
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
