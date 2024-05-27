import LayoutInfoThemeOne from '@xigefish/page-layout/info'
import ExampleBlock from '@/components/example-block'
import CipTree from '@xigefish/components/cip-tree'
import { v4 as uuid } from 'uuid'
import { useBasicOptions } from './use-tree'
import { disabledOptions } from './options'
import { accordionConfig, checkboxConfig, lazyloadConfig, disabledConfig, checkedConfig, customConfig } from './config'
import BaseTree from '@/views/manager/example/tree/base'
export default {
  name: 'tree',
  setup () {
    const basicOptions = useBasicOptions()
    const buttonHideOptions = useBasicOptions()
    const defaultCheckedOptions = useBasicOptions()
    const accordionOptions = useBasicOptions()
    const customOptions = useBasicOptions()
    const selectAbleOptions = useBasicOptions()
    const lazyloadOptions = useBasicOptions()

    const append = (data) => {
      const newChild = { id: uuid(), label: 'testtest', children: [] }
      if (!data.children) {
        data.children = []
      }
      data.children.push(newChild)
      customOptions.value = [...customOptions.value]
    }

    const remove = (data) => {
      deepRemove(customOptions.value, data.id)
    }
    const deepRemove = (list, id) => {
      list.forEach((item, index) => {
        if (item.id === id) {
          list.splice(index, 1)
        } else {
          if (item.children && item.children.length > 0) {
            deepRemove(item.children, id)
          }
        }
      })
    }

    const edit = (node) => {
      node.label = 123
    }

    return () => <LayoutInfoThemeOne>
      <ExampleBlock code={BaseTree.Raw} title={'树组件'}>
          <BaseTree />
      </ExampleBlock>
      <ExampleBlock title='基础树形组件'>
        <CipTree options={basicOptions.value} />
      </ExampleBlock>
      <ExampleBlock title='不展示按钮的树形组件'>
        <CipTree options={buttonHideOptions.value} showButton={false} />
      </ExampleBlock>
      <ExampleBlock title='可选择的树形组件'>
        <CipTree options={selectAbleOptions.value} config={checkboxConfig} showButton={false} />
      </ExampleBlock>
      <ExampleBlock title='懒加载自定义树形组件'>
        <CipTree options={lazyloadOptions.value} config={lazyloadConfig} showButton={false} />
      </ExampleBlock>
      <ExampleBlock title='禁用选择的树形组件'>
        <CipTree options={disabledOptions.value} config={disabledConfig} showButton={false} />
      </ExampleBlock>
      <ExampleBlock title='默认选中的树形组件'>
        <CipTree options={defaultCheckedOptions.value} config={checkedConfig} showButton={false} />
      </ExampleBlock>
      <ExampleBlock title='可新增删除编辑的树形组件'>
        <CipTree
          options={customOptions.value}
          config={customConfig}
          showButton={false}
          onNodeAppend={append}
          onNodeRemove={remove}
          onNodeEdit={edit}
        />
      </ExampleBlock>
      <ExampleBlock title='手风琴模式树形组件'>
        <CipTree options={accordionOptions.value} config={accordionConfig} showButton={false} />
      </ExampleBlock>
    </LayoutInfoThemeOne>
  }
}
