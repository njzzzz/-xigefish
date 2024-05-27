import CipButton from '@xigefish/components/cip-button'
import { componentScheme } from '@xigefish/button/esm/cip-button/component.scheme'
import LayoutInfoThemeOne from '@xigefish/page-layout/info'
import { Plus } from '@element-plus/icons-vue'
import ExampleBlock from '@/components/example-block'
import ComponentController from '@/components/component-controller'
import ExampleTabs from '@/components/example-page'
import { sizeOptions, typeOptions } from '../common'
import BaseButtons from '@/views/manager/example/button/base'
import TextButtons from '@/views/manager/example/button/text'
import GroupButtons from '@/views/manager/example/button/group'
import { useTry } from '@/hooks/use-try'
export default {
  setup () {
    const { tryProps, trySlots, tryEvents } = useTry()

    return () => <LayoutInfoThemeOne>
      <ExampleTabs>
        {{
          example: () => <>
            <ExampleBlock code={BaseButtons.Raw} title={'基础按钮'}>
              <BaseButtons />
            </ExampleBlock>
            <ExampleBlock code={TextButtons.Raw} title={'文本链接'}>
              <TextButtons />
            </ExampleBlock>
            <ExampleBlock code={GroupButtons.Raw} title={'文本链接'}>
              <GroupButtons />
            </ExampleBlock>
            <ExampleBlock>
              <CipButton disabled>按钮</CipButton>
              {typeOptions.map(type => <CipButton key={type} type={type} disabled>{type}</CipButton>)}
            </ExampleBlock>
            <ExampleBlock>
              <CipButton plain>按钮</CipButton>
              {typeOptions.map(type => <CipButton key={type} type={type} plain>{type}</CipButton>)}
            </ExampleBlock>
            <ExampleBlock>
              <CipButton plain disabled>按钮</CipButton>
              {typeOptions.map(type => <CipButton key={type} type={type} plain disabled>{type}</CipButton>)}
            </ExampleBlock>
            <ExampleBlock>
              <CipButton round>按钮</CipButton>
              {typeOptions.map(type => <CipButton key={type} type={type} round>{type}</CipButton>)}
            </ExampleBlock>
            <ExampleBlock>
              <CipButton circle icon={Plus}></CipButton>
              {typeOptions.map(type => <CipButton key={type} type={type} circle icon={Plus} />)}
            </ExampleBlock>
            <ExampleBlock>
              {sizeOptions.map(size => <CipButton key={size} size={size} type={'primary'} icon={'el-icon-plus'} >{size}</CipButton>)}
              {sizeOptions.map(size => <CipButton key={size + 'danger'} size={size} type={'danger'} >{size}</CipButton>)}
            </ExampleBlock>
            <ExampleBlock>
              {sizeOptions.map(size => <CipButton key={size} size={size} type={'primary'} icon={'el-icon-plus'} loading>{size}</CipButton>)}
              {sizeOptions.map(size => <CipButton key={size + 'danger'} size={size} type={'danger'} loading>{size}</CipButton>)}
            </ExampleBlock>
            <ExampleBlock>
              {sizeOptions.map(size => <CipButton key={size + 'danger'} size={size} type={'danger'} loading>{size}</CipButton>)}
            </ExampleBlock>
          </>,
          try: () => <>
            <ExampleBlock title={'试一试'}>
              <CipButton
                key={!!tryProps.value.circle + '' + !!tryProps.value.square}
                {...tryProps.value}
                {...tryEvents.value}
                v-slots={trySlots.value}
              />
            </ExampleBlock>
            <ComponentController
              v-model:propsConfig={tryProps.value}
              v-model:slotsConfig={trySlots.value}
              v-model:eventsConfig={tryEvents.value}
              scheme={componentScheme}
            />
          </>
        }}
      </ExampleTabs>

    </LayoutInfoThemeOne>
  }
}
