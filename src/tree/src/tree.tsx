import { defineComponent, provide, toRefs } from 'vue'
import useTree from '../hooks/useTree'
import { IInnerTreeNode, TreeProps, treeProps } from './tree-type'
import CTreeNode from './components/tree-node'
import CTreeNodeToggle from './components/tree-node-toggle'

export default defineComponent({
  name: 'Tree',
  props: treeProps,
  setup(props: TreeProps, { slots }) {
    // 获取data
    const { data } = toRefs(props)
    const treeData = useTree(data)
    provide('TREE_UTILS', treeData)
    return () => {
      return (
        <div class="s-tree">
          {
            // 循环输出节点
            treeData.expendedTree.value.map((treeNode: IInnerTreeNode) => (
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
                    )
                }}
              </CTreeNode>
            ))
          }
        </div>
      )
    }
  }
})
