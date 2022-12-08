import { ComputedRef, defineComponent, inject, computed } from 'vue'
import { FormItemProps, formItemProps, LabelData } from './form-item-type'
export default defineComponent({
  name: 'FormItem',
  props: formItemProps,
  setup(props: FormItemProps, { slots }) {
    // 注入labelData
    const labelData = inject('LABEL_DATA') as ComputedRef<LabelData>
    const itemClasses = computed(() => ({
      's-form__item': true,
      's-form__item--horizontal': labelData.value.layout === 'horizontal',
      's-form__item--vertical': labelData.value.layout === 'vertical'
    }))
    return () => (
      <div class={itemClasses.value}>
        <span class="s-form__label">{props.label}</span>
        <div>{slots.default?.()}</div>
      </div>
    )
  }
})
