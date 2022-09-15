import type { ITreeNode, IInnerTreeNode } from '../src/tree-type'
import { reactive, Ref, unref, computed } from 'vue'
import { generateInnerTree } from '../src/utils'

export default function useTree(node: Ref<ITreeNode[]> | ITreeNode[]) {
  const innerData: IInnerTreeNode[] = reactive(generateInnerTree(unref(node)))
  const toggleNode = (node: IInnerTreeNode) => {
    // 在原始的列表中获取该节点
    // 在原始的列表中获取该节点
    const cur = innerData.find(item => item.id === node.id)
    if (cur) cur.expanded = !cur.expanded
  }

  // 获取字节点
  const getChildren = (
    node: IInnerTreeNode,
    recursive = true
  ): IInnerTreeNode[] => {
    const result: IInnerTreeNode[] = []
    const startIndex = innerData.findIndex(item => item.id === node.id)
    //找到它后面所有的子节点
    for (
      let i = startIndex + 1;
      i < innerData.length && node.level < innerData[i].level;
      i++
    ) {
      if (recursive) {
        result.push(innerData[i])
      } else if (node.level === innerData[i].level - 1) {
        // 直接子节点
        result.push(innerData[i])
      }
    }
    return result
  }

  // 获取那些展开的节点列表
  const getExpendedTree = computed(() => {
    // 收起的节点
    let excludeNodes: IInnerTreeNode[] = []
    const result: IInnerTreeNode[] = []

    for (let item of innerData) {
      // 如果遍历的节点在排除列表中，跳过本次循环
      if (excludeNodes.map(node => node.id).includes(item.id)) {
        continue
      }
      // 当前节点收起，它的子节点应该被排除掉
      if (item.expanded !== true) {
        excludeNodes = getChildren(item)
      }
      result.push(item)
    }

    return result
  })

  // checkBox click 事件
  const toggleCheckNode = (node: IInnerTreeNode) => {
    // 避免初始化的时候 node 中没有 checked 设置
    node.checked = !node.checked
    // 父-子 联动
    // 获取子节点，并同步他们的选中状态和父节点一致
    getChildren(node).forEach(child => {
      child.checked = node.checked
    })
    setChecked(node)
  }

  // 子-父联动 并且设置父节点选中内容
  const setChecked = (node: IInnerTreeNode) => {
    // 获取父节点
    const parentNode = innerData.find(item => item.id === node.parentId)
    if (!parentNode) return
    // 获取兄弟节点：相当于获取 parentNode 的直接子节点
    const siblingNodes = getChildren(parentNode, false)
    // 兄弟节点是否全部选中状态
    const siblingCheckStatus = siblingNodes.every(sibling => sibling.checked)
    parentNode.checked = siblingCheckStatus
    if (parentNode.parentId) setChecked(parentNode)
  }

  return {
    innerData,
    toggleNode,
    getChildren,
    getExpendedTree,
    toggleCheckNode
  }
}
