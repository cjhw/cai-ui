import { ref, Ref, unref } from 'vue'
import { ITreeNode } from '../src/tree-type'
import { generateInnerTree } from '../src/utils'
import { useCheck } from './useCheck'
import { useCore } from './useCore'
import { useOperate } from './useOperate'
import { useToggle } from './useToggle'
import { TreeUtils } from './use-tree-type'

export default function useTree(
  tree: ITreeNode[] | Ref<ITreeNode[]>
): TreeUtils {
  const data = unref(tree)
  const innerData = ref(generateInnerTree(data))

  const core = useCore(innerData)
  const plugins = [useToggle, useCheck, useOperate]
  // 聚合插件
  const pluginMetheds = plugins.reduce((acc, plugin) => {
    return { ...acc, ...plugin(innerData, core) }
  }, {})

  return {
    ...pluginMetheds,
    ...core,
    treeData: innerData
  } as TreeUtils
}
