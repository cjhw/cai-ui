
import { defineComponent, toRefs } from 'vue'
import { TreeProps, treeProps } from './tree-type'
export default defineComponent({
  name: 'CTree',
  props: treeProps,
  setup(props: TreeProps) {
    return () => {
      return (
        <div class="s-tree"></div>
      )
    }
  }
})   
