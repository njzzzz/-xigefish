import LayoutInfoThemeOne from '@xigefish/page-layout/info'
import ExampleTabs from '@/components/example-page'
import ExampleBlock from '@/components/example-block'
// eslint-disable-next-line import/no-duplicates, import/no-webpack-loader-syntax
import BreadcrumbRaw from '!!raw-loader!@/views/manager/example/breadcrumb/base-version'
// eslint-disable-next-line import/no-duplicates
import Breadcrumb from '@/views/manager/example/breadcrumb/base-version'
// eslint-disable-next-line import/no-duplicates, import/no-webpack-loader-syntax
import BreadcrumbWithBacRaw from '!!raw-loader!@/views/manager/example/breadcrumb/with-back-version'
// eslint-disable-next-line import/no-duplicates
import BreadcrumbWithBack from '@/views/manager/example/breadcrumb/with-back-version'

export default {
  setup () {
    return () => <LayoutInfoThemeOne>
      <ExampleTabs>
        {{
          example: () => <>
            <ExampleBlock code={BreadcrumbRaw} title="基础样式">
              <Breadcrumb />
            </ExampleBlock>
            <ExampleBlock code={BreadcrumbWithBacRaw} title="带返回按钮">
              <BreadcrumbWithBack />
            </ExampleBlock>
          </>
        }}
      </ExampleTabs>
    </LayoutInfoThemeOne>
  }
}
