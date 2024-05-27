import CipButtonText from '@xigefish/components/cip-button-text'
import CipButton from '@xigefish/components/cip-button'
import CipTableHandler from '@xigefish/components/cip-table-handler'
export default {
  setup () {
    return () => <div>
       <CipTableHandler row={{}}>
        {
          new Array(3).fill(1).map((v, i) => <CipButtonText key={i} onClick={() => console.log(i)}>操作按钮{i}</CipButtonText>)
        }
       </CipTableHandler>
       <br/>
       <CipTableHandler row={{}}>
        {
          new Array(4).fill(1).map((v, i) => <CipButtonText key={i} onClick={() => console.log(i)}>操作按钮{i}</CipButtonText>)
        }
       </CipTableHandler>
       <br/>
       <CipTableHandler row={{}} buttonComp={'button'}>
        {
          new Array(4).fill(1).map((v, i) => <CipButton type={i === 0 ? 'primary' : undefined} key={i} onClick={() => console.log(i)}>操作按钮{i}</CipButton>)
        }
       </CipTableHandler>
       <br/>
      <CipTableHandler row={{}} buttonComp={'button'}>
        {
          new Array(10).fill(1).map((v, i) => <CipButton type={i === 0 ? 'primary' : undefined} key={i} onClick={() => console.log(i)}>操作按钮{i}</CipButton>)
        }
      </CipTableHandler>

      </div>
  }
}
