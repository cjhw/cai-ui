import { defineComponent, provide, SetupContext, toRefs } from 'vue'
import useTree from '../hooks/useTree'
import { IInnerTreeNode, TreeProps, treeProps } from './tree-type'
import CTreeNode from './components/tree-node'
import CTreeNodeToggle from './components/tree-node-toggle'
import '../style/tree.scss'
import { VirtualList } from '../../virtualList'

export default defineComponent({
  name: 'Tree',
  props: treeProps,
  emits: ['lazy-load'],
  setup(props: TreeProps, context: SetupContext) {
    // 获取data
    const { data, height, itemHeight } = toRefs(props)
    const { slots } = context
    const treeData = useTree(data.value, props, context)
    provide('TREE_UTILS', treeData)
    return () => {
      const TreeNode = (treeNode: IInnerTreeNode) => (
        <CTreeNode {...props} treeNode={treeNode}>
          {{
            content: () =>
              slots.content ? slots.content(treeNode) : treeNode.label,
            icon: () =>
              slots.icon ? (
                slots.icon({
                  nodeData: treeNode,
                  toggleNode: treeData.toggleNode
                })
              ) : (
                <CTreeNodeToggle
                  expanded={!!treeNode.expanded}
                  onClick={() => treeData.toggleNode(treeNode)}
                ></CTreeNodeToggle>
              ),
            loading: () =>
              slots.loading ? (
                slots.loading({ nodeData: treeData })
              ) : (
                <span class="ml-1">loading...</span>
              )
          }}
        </CTreeNode>
      )
      return (
        <div class="s-tree">
          {height?.value ? (
            // 如果设置了height，则添加虚拟列表
            <div style={{ height: `${height.value}px` }}>
              <VirtualList
                data={treeData.expendedTree.value}
                itemHeight={itemHeight.value}
              >
                {{
                  default: ({ item: treeNode }: { item: IInnerTreeNode }) =>
                    TreeNode(treeNode)
                }}
              </VirtualList>
            </div>
          ) : (
            // 没有height，则正常输出节点
            treeData.expendedTree.value.map((treeNode: IInnerTreeNode) =>
              TreeNode(treeNode)
            )
          )}
        </div>
      )
    }
  }
})
