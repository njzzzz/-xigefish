import LayoutInfoThemeOne from '@xigefish/page-layout/info'
import ExampleTabs from '@/components/example-page'
import ExampleBlock from '@/components/example-block'
import './index.less'
import {
  HeaderNav,
  HeaderNavRaw,
  HeaderNavNoMenu,
  HeaderNavNoMenuRaw,
  HeaderNavPlugins,
  HeaderNavPluginsRaw,
  HeaderNavExtraMenu,
  HeaderNavExtraMenuRaw
} from '@/views/manager/example/header-nav'

export default {
  setup () {
    return () => <LayoutInfoThemeOne>
      <ExampleTabs>
        {{
          example: () => <>
            <ExampleBlock code={HeaderNavRaw} title="基础样式">
              <div className="header-nav__example__mask-container">
                <HeaderNav></HeaderNav>
              </div>
            </ExampleBlock>
            <ExampleBlock code={HeaderNavNoMenuRaw} title="无菜单/无LOGO">
              <div className="header-nav__example__mask-container">
                <HeaderNavNoMenu></HeaderNavNoMenu>
              </div>
            </ExampleBlock>
            <ExampleBlock code={HeaderNavPluginsRaw} title="其他功能">
              <div className="header-nav__example__mask-container">
                <HeaderNavPlugins></HeaderNavPlugins>
              </div>
            </ExampleBlock>
            <ExampleBlock code={HeaderNavExtraMenuRaw} title="更多菜单">
              <div className="header-nav__example__mask-container">
                <HeaderNavExtraMenu></HeaderNavExtraMenu>
              </div>
            </ExampleBlock>
          </>
        }}
      </ExampleTabs>
    </LayoutInfoThemeOne>
  }
}
