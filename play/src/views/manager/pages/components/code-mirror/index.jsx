import { ref } from 'vue'
import CipCodeMirror, { componentScheme } from '@xigefish/code-mirror'
import LayoutInfoThemeOne from '@xigefish/page-layout/info'
import ExampleBlock from '@/components/example-block'
import ComponentController from '@/components/component-controller'
import ExampleTabs from '@/components/example-page'



export default {
  setup () {
    const javaCode = ref('public class HelloWorld {\n' +
      '    /* 第一个Java程序\n' +
      '     * 它将输出字符串 Hello World\n' +
      '     */\n' +
      '    public static void main(String[] args) {\n' +
      '        System.out.println("Hello World"); // 输出 Hello World\n' +
      '    }\n' +
      '}')
    const testProps = ref({
      modelValue: 'public class HelloWorld {\n' +
      '    /* 第一个Java程序\n' +
      '     * 它将输出字符串 Hello World\n' +
      '     */\n' +
      '    public static void main(String[] args) {\n' +
      '        System.out.println("Hello World"); // 输出 Hello World\n' +
      '    }\n' +
      '}',
      type: 'x-java',
      mode: 'text/x-java'
    })
    const testEvents = ref({
      'onUpdate:modelValue': (value) => { testProps.value.modelValue = value }
    })
    return () => <LayoutInfoThemeOne>
      <ExampleTabs>
        {{
          example: () => <>
            <ExampleBlock>
              <CipCodeMirror v-model={javaCode.value} theme={'dracula'} type={'x-java'} mode={'text/x-java'}/>
            </ExampleBlock>
          </>,
          try: () => <>
            <ExampleBlock title={'试一试'}>
              <CipCodeMirror
                {...testProps.value}
                {...testEvents.value}/>
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
