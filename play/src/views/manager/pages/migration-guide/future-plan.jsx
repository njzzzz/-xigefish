import featurePlan from './FEATURE_PLAN.md'
import MarkdownRender from '@/components/markdown-render'
import CipPageLayoutInfo from '@xigefish/page-layout/info'
export default {
  setup () {
    return () => <CipPageLayoutInfo canBack={false}>
      <MarkdownRender source={featurePlan}/>
    </CipPageLayoutInfo>
  }
}
