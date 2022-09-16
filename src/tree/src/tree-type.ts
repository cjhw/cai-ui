import { ExtractPropTypes, PropType } from 'vue'
import { IDragdrop } from '../hooks/use-tree-type'

export interface ITreeNode {
  label: string
  id?: string
  children?: ITreeNode[]

  selected?: boolean // 点击选中状态
  checked?: boolean // 勾选状态
  expanded?: boolean // 展开

  disableSelect?: boolean
  disableCheck?: boolean
  disableExpanded?: boolean
}

// 嵌套结构需要递归，不利于虚拟滚动中的优化，需要定义一种扁平结构
export interface IInnerTreeNode extends ITreeNode {
  parentId?: string // 父节点ID
  level: number // 节点层级
  isLeaf?: boolean // 是否叶子节点
  loading?: boolean // 节点是否显示加载中
  childNodeCount?: number // 该节点子节点的数量
}

// tree中的props定义

export const treeProps = {
  data: {
    type: Object as PropType<Array<ITreeNode>>,
    required: true
  },
  // 是否显示 checkbox
  checkable: {
    type: Boolean,
    default: false
  },
  // 是否显示参考线
  lineable: {
    type: Boolean,
    default: false
  },
  // 是否显示操作按钮
  operable: {
    type: Boolean,
    default: false
  },
  // 拖拽开关属性
  dragdrop: {
    type: [Boolean, Object] as PropType<IDragdrop>,
    default: false
  }
} as const

export type TreeProps = ExtractPropTypes<typeof treeProps>
