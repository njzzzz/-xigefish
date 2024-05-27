import ExampleRow from '@/components/example-row'
import CipPagination from '@xigefish/components/cip-pagination'

export default {
  setup () {
    // return () => <div>123</div>
    return () => <div>
      <ExampleRow label={'基础样式（小于等于7页）'}>
        <CipPagination
          current-page={1}
          total={70}
          limit={10}
          layout={'prev, pager, next'}
        />
      </ExampleRow>
      <ExampleRow label={'基础样式（大于7页）【注：此处选则最后一页时展示逻辑与UI标准不符合，UI标准不合理】'}>
        <CipPagination
          layout={'prev, pager, next'}
          current-page={20}
          total={200}
          limit={10}
        />
        <br/>
        <CipPagination
          style={{ marginTop: '24px' }}
          layout={'prev, pager, next'}
          current-page={7}
          total={200}
          limit={10}
        />
      </ExampleRow>
      <ExampleRow label={'完整功能'}>
        <CipPagination
          current-page={1}
          total={400}
          limit={10}
        />
      </ExampleRow>
      <ExampleRow label={'小型分页（空间有限时使用）'}>
        <CipPagination
          current-page={1}
          total={340}
          limit={10}
          background={false}
          layout={'prev, pager, next'}
        />
      </ExampleRow>
    </div>
  }
}
