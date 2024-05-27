import changeLog from '@xigefish/plugins/CHANGELOG.md'
import MarkdownRender from '@/components/markdown-render'
import CipPageLayoutInfo from '@xigefish/page-layout/info'
export default {
  setup () {
    return () => <CipPageLayoutInfo canBack={false}>
      <MarkdownRender source={changeLog}/>
    </CipPageLayoutInfo>
  }
}
