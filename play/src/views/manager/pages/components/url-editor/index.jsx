import { ref } from 'vue'
import LayoutInfoThemeOne from '@xigefish/page-layout/info'
import ExampleBlock from '@/components/example-block'
import CipUrlEditor from '@xigefish/components/cip-url-editor'
import { componentScheme } from '@xigefish/components/cip-url-editor/component.scheme'
import ComponentController from '@/components/component-controller'
import ExampleTabs from '@/components/example-page'

import './index.less'

export default {
  name: 'url-editor',
  setup () {
    const url = ref({
      protocol: 'http:',
      host: '',
      port: 80,
      path: ''
    })
    const disabledConfig = {
      protocol: true,
      host: false,
      port: true,
      path: false
    }
    const sizeArray = ['large', 'default', 'small']

    const testProps = ref({
      protocol: 'http:',
      host: '',
      port: '',
      path: ''
    })
    const testEvents = ref({})

    return () => <LayoutInfoThemeOne>
      <ExampleTabs>
        {{
          example: () => <>
            <ExampleBlock title='设置端口最大最小值'>
              <CipUrlEditor
                v-model:protocol={url.value.protocol}
                v-model:host={url.value.host}
                v-model:port={url.value.port}
                v-model:path={url.value.path}
                portMin={79}
                portMax={81}
              ></CipUrlEditor>
            </ExampleBlock>
            <ExampleBlock title='禁用状态'>
              <CipUrlEditor
                v-model:protocol={url.value.protocol}
                v-model:host={url.value.host}
                v-model:port={url.value.port}
                v-model:path={url.value.path}
                disabled={true}
              ></CipUrlEditor>
            </ExampleBlock>
            <ExampleBlock title='细致的对每个输入框的禁用进行配置'>
              <CipUrlEditor
                v-model:protocol={url.value.protocol}
                v-model:host={url.value.host}
                v-model:port={url.value.port}
                v-model:path={url.value.path}
                disabledConfig={disabledConfig}
              ></CipUrlEditor>
            </ExampleBlock>
            <ExampleBlock title='尺寸' class='size-block'>
              {
                sizeArray.map(size => <CipUrlEditor
                  v-model:protocol={url.value.protocol}
                  v-model:host={url.value.host}
                  v-model:port={url.value.port}
                  v-model:path={url.value.path}
                  size={size}
                ></CipUrlEditor>)
              }
            </ExampleBlock>
          </>,
          try: () => <>
            <ExampleBlock title={'试一试'}>
              <CipUrlEditor
                {...testProps.value}
                {...testEvents.value}
                v-model:protocol={testProps.value.protocol}
                v-model:host={testProps.value.host}
                v-model:port={testProps.value.port}
                v-model:path={testProps.value.path}/>
            </ExampleBlock>
            <ComponentController
              v-model:propsConfig={testProps.value}
              v-model:eventsConfig={testEvents.value}
              scheme={componentScheme}
            />
          </>
        }}
      </ExampleTabs>
    </LayoutInfoThemeOne>
  }
}
