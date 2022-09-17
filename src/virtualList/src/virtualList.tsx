import { defineComponent, computed, ref, toRefs, onMounted } from 'vue'
import { VirtualListProps, virtualListProps } from './virtualList-type'
import '../style/virtualList.scss'

export default defineComponent({
  name: 'VirtualList',
  props: virtualListProps,
  setup(props: VirtualListProps, { slots }) {
    const { data, itemHeight, component: Component } = toRefs(props)

    const containerRef = ref()

    const containerHeight = ref(0)
    const offsetY = ref(0)
    const startIndex = ref(0)

    const visibleCount = computed(() => {
      return Math.ceil(containerHeight.value / itemHeight.value)
    })

    const visibleData = computed(() => {
      return data.value.slice(
        startIndex.value,
        Math.min(startIndex.value + visibleCount.value, data.value.length)
      )
    })

    onMounted(() => {
      // 容器高度动态获取
      containerHeight.value = containerRef.value?.clientHeight
    })

    const scrollEvent = function (event: UIEvent) {
      const scrollTop = (event.target as HTMLElement).scrollTop

      startIndex.value = Math.floor(scrollTop / itemHeight.value)

      offsetY.value = scrollTop - (scrollTop % itemHeight.value)
    }

    return () => {
      return (
        <Component.value
          class="s-virtual-list__container"
          ref={containerRef}
          onScroll={scrollEvent}
        >
          <div
            class="s-virtual-list__blank"
            style={{ height: `${data.value.length * itemHeight.value}px` }}
          ></div>
          <div
            class="s-virtual-list"
            style={{ transform: `translate3d(0,${offsetY.value}px,0)` }}
          >
            {visibleData.value.map((item, index) =>
              slots.default?.({ item, index })
            )}
          </div>
        </Component.value>
      )
    }
  }
})
