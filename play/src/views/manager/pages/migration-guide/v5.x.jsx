import MarkdownRender from '@/components/markdown-render'
import CipPageLayoutInfo from '@xigefish/page-layout/info'
import V5 from './v5.x.md'
export default {
  setup () {
    return () => <CipPageLayoutInfo canBack={false}>
      <MarkdownRender source={V5}/>
    </CipPageLayoutInfo>
  }
}
