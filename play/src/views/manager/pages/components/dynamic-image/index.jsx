import { ref } from 'vue'
import LayoutInfoThemeOne from '@xigefish/page-layout/info'
import ExampleBlock from '@/components/example-block'
import { componentScheme } from '@xigefish/components/cip-dynamic-image/component.scheme'
import ComponentController from '@/components/component-controller'
import ExampleTabs from '@/components/example-page'
import CipDynamicImage from '@xigefish/components/cip-dynamic-image'
import dog from '@/assets/images/dog.jpeg'

import './index.less'

export default {
  name: 'dynamic-image',
  setup () {
    const fits = ['fill', 'contain', 'cover', 'none', 'scale-down']
    const testProps = ref({
      src: dog
    })
    const testEvents = ref({
      onLoad: (e) => { console.log('加载成功', e) },
      onError: (e) => { console.log('加载失败', e) }
    })

    return () => <LayoutInfoThemeOne class='dynamic-image'>
      <ExampleTabs>
        {{
          example: () => <>
            <ExampleBlock>
              {
                fits.map(fit => <div class='dynamic-image__img__wrapper'>
                  <span>fit: {fit}</span>
                  <CipDynamicImage class='dynamic-image__img' src={dog} fit={fit}></CipDynamicImage>
                </div>)
              }
            </ExampleBlock>
            <ExampleBlock title='大图预览'>
              <CipDynamicImage class='dynamic-image__img' src={dog} previewSrcList={[dog]} lazy={true}></CipDynamicImage>
            </ExampleBlock>
            <ExampleBlock title='懒加载'>
              <CipDynamicImage class='dynamic-image__img' src={dog} lazy={true}></CipDynamicImage>
            </ExampleBlock>
          </>,
          try: () => <>
            <ExampleBlock title={'试一试'}>
              <CipDynamicImage class='dynamic-image__img' {...testProps.value} {...testEvents.value}></CipDynamicImage>
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
