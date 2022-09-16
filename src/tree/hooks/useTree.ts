import { ref, Ref, SetupContext, unref } from 'vue'
import { ITreeNode } from '../src/tree-type'
import { generateInnerTree } from '../src/utils'
import { useCheck } from './useCheck'
import { useCore } from './useCore'
import { useOperate } from './useOperate'
import { useToggle } from './useToggle'
import { TreeUtils } from './use-tree-type'
import { useLazyLoad } from './useLazyLoad'

export default function useTree(
  tree: ITreeNode[] | Ref<ITreeNode[]>,
  context: SetupContext
): TreeUtils {
  const data = unref(tree)
  const innerData = ref(generateInnerTree(data))

  const core = useCore(innerData)
  const plugins = [useToggle, useCheck, useOperate]
  const lazyLoad = useLazyLoad(innerData, core, context)
  // 聚合插件
  const pluginMetheds = plugins.reduce((acc, plugin) => {
    return { ...acc, ...plugin(innerData, core, context, lazyLoad) }
  }, {})

  return {
    ...pluginMetheds,
    ...core,
    treeData: innerData
  } as TreeUtils
}
