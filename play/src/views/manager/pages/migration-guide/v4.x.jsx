import MarkdownRender from '@/components/markdown-render'
import CipPageLayoutInfo from '@xigefish/page-layout/info'
import V4 from './v4.x.md'
export default {
  setup () {
    return () => <CipPageLayoutInfo canBack={false}>
        <MarkdownRender source={V4}/>
      </CipPageLayoutInfo>
  }
}
