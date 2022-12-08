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

    // 必须是水平方式排列下面两个属性生效
    // labelSize和labelAlign
    const labelClasses = computed(() => ({
      's-form__label': true,
      's-form__label--vertical': labelData.value.layout === 'vertical',
      [`s-form__label--${labelData.value.labelAlign}`]:
        labelData.value.layout === 'horizontal',
      [`s-form__label--${labelData.value.labelSize}`]:
        labelData.value.layout === 'horizontal'
    }))

    return () => (
      <div class={itemClasses.value}>
        <span class={labelClasses.value}>{props.label}</span>
        <div>{slots.default?.()}</div>
      </div>
    )
  }
})
