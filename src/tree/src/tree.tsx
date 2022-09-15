import { computed, defineComponent, ref, toRefs } from 'vue'
import { IInnerTreeNode, TreeProps, treeProps } from './tree-type'
import useTree from '../hooks/useTree'

export default defineComponent({
  name: 'Tree',
  props: treeProps,
  setup(props: TreeProps) {
    const { data } = toRefs(props)
    const { toggleNode, getExpendedTree, getChildren } = useTree(data)

    return () => {
      return (
        <div class="s-tree">
          {getExpendedTree.value.map(treeNode => (
            <div
              class="s-tree-node hover:bg-slate-100 relative leading-8"
              style={{
                paddingLeft: `${24 * (treeNode.level - 1)}px`
              }}
            >
              {treeNode.isLeaf ? (
                <span
                  style={{
                    display: 'inline-block',
                    width: '25px'
                  }}
                />
              ) : (
                <svg
                  style={{
                    width: '25px',
                    height: '16px',
                    display: 'inline-block',
                    transform: treeNode.expanded ? 'rotate(90deg)' : ''
                  }}
                  viewBox="0 0 1024 1024"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={() => toggleNode(treeNode)}
                >
                  <path
                    fill="currentColor"
                    d="M384 192v640l384-320.064z"
                  ></path>
                </svg>
              )}
              {treeNode.label}
            </div>
          ))}
        </div>
      )
    }
  }
})
