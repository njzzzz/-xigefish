import LayoutInfoThemeOne from '@xigefish/page-layout/info'
import ExampleBlock from '@/components/example-block'
import CipTableButton from '@xigefish/components/cip-table-button'
import { typeOptions } from '../common'
export default {
  name: 'TableButton',
  setup () {
    return () => <LayoutInfoThemeOne class='svg-icon-example'>
      <ExampleBlock>
        {
          typeOptions.map((type) => <CipTableButton key={type} type={type}>{type}</CipTableButton>)
        }
      </ExampleBlock>
      <ExampleBlock>
        {
          typeOptions.map((type) => <CipTableButton key={type} type={type} disabled={true}>{type}</CipTableButton>)
        }
      </ExampleBlock>
    </LayoutInfoThemeOne>
  }
}
