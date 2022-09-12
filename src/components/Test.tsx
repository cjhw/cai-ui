import { defineComponent, ref, withModifiers } from 'vue'

export default defineComponent({
  directives: {
    focus: {
      mounted(el) {
        el.focus()
      }
    }
  },
  emits: ['click'],
  setup(props, { slots, emit }) {
    // 响应式数据count
    const count = ref(0)

    const inc = () => {
      count.value++
      emit('click')
    }

    const list = ref<string[]>(['a', 'b', 'c'])

    return () => {
      // v-if
      const span = true ? <span>A</span> : <span>B</span>

      return (
        <div onClick={withModifiers(inc, ['self'])}>
          test: {count.value}
          {/* <input type="text" v-focus v-model={count.value} /> */}
          <div>{span}</div>
          <ul>
            {list.value.map(str => (
              <li key={str}>{str}</li>
            ))}
          </ul>
          <div>{slots.default ? slots.default() : 'default content'}</div>
          <div>{slots.title ? slots.title() : 'title slot content'}</div>
        </div>
      )
    }
  }
})
