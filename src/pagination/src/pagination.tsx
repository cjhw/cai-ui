import { defineComponent, ref } from 'vue'
import { PaginationProps, paginationProps } from './pagination-type'
import '../style/pagination.scss'
import CPager from './components/pager'

export default defineComponent({
  name: 'Pagination',
  props: paginationProps,
  emits: [],
  setup(props: PaginationProps, ctx) {
    // 1.首页和尾页是常驻的，如果只有1页，则不显示
    // 2.页码按钮有一个最大数量pagerCount，上图是7，也就是说最多显示7个页码按钮
    // 3.如果总页数totalPage大于pagerCount，则会出现显示不下的情况，这时显示不
    // 下的部分用...表示，并且这个...是可以快速往前、往后跳转N页的
    // 4.中间页码应该显示的页码按钮数量在0到pagerCount-2之间
    // 5.只有2页的情况下，中间页码按钮数量为0
    // 6.大于等于pagerCount的情况下，中间按钮数量等于pagerCount-2
    // 7.当中间页码左边的页数大于2时，应该出现左边的 ...
    // 8.当中间页码右边的页数小于totalPage-3时，应该出现右边的 ...
    const pager = ref()

    return () => {
      return (
        <div class="s-pagination">
          <button onClick={() => pager.value.prevPage()}>上一页</button>
          {/* pager部分 */}
          <CPager {...props} ref={pager}></CPager>
          <button onClick={() => pager.value.nextPage()}>下一页</button>
        </div>
      )
    }
  }
})
