import LayoutInfoThemeOne from '@xigefish/page-layout/info'
import ExampleTabs from '@/components/example-page'
import ExampleBlock from '@/components/example-block'
import './index.less'
// eslint-disable-next-line import/no-duplicates, import/no-webpack-loader-syntax
import AccordionMenuRaw from '!!raw-loader!@/views/manager/example/accordion-menu/base-version'
// eslint-disable-next-line import/no-duplicates
import AccordionMenu from '@/views/manager/example/accordion-menu/base-version'
// eslint-disable-next-line import/no-duplicates, import/no-webpack-loader-syntax
import AccordionMenuNoIconsRaw from '!!raw-loader!@/views/manager/example/accordion-menu/no-icons-version'
// eslint-disable-next-line import/no-duplicates
import AccordionMenuNoIcons from '@/views/manager/example/accordion-menu/no-icons-version'

export default {
  setup () {
    return () => <LayoutInfoThemeOne>
      <ExampleTabs>
        {{
          example: () => <>
            <ExampleBlock code={AccordionMenuRaw} title="基础样式">
              <p>注：徽标未按照设计稿对齐</p>
              <hr />
              <div className="accordion-menu__example__mask-container">
                <AccordionMenu />
              </div>
            </ExampleBlock>
            <ExampleBlock code={AccordionMenuNoIconsRaw} title="无图标样式">
              <div className="accordion-menu__example__mask-container">
                <AccordionMenuNoIcons />
              </div>
            </ExampleBlock>
          </>
        }}
      </ExampleTabs>
    </LayoutInfoThemeOne>
  }
}
