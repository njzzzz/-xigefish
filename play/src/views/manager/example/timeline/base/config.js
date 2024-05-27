import CipDynamicImage from '@xigefish/components/cip-dynamic-image'
import dog from '@/assets/images/dog.jpeg'
import { ElTag } from 'element-plus'
import fold from './fold'
export const activities = [
  {
    key: 'a_1',
    content: '标题',
    timestamp: '2020/03/04 13:00',
    desc: '说明文字说明文字说明文字说明文字说明文字说明文字',
    hollow: true,
    color: '#3786fd',
    addon: () => <div style='margin-top: 8px;'>
          <ElTag type="danger" class="border-no">车辆是否洁净立场不合格</ElTag>
          <ElTag type="danger" class="border-no" style="margin-left:8px">其他问题</ElTag>
      </div>
  },
  {
    key: 'a_2',
    content: '标题',
    timestamp: '2020/03/04 13:00',
    desc: '说明文字说明文字说明文字说明文字说明文字说明文字',
    addon: () => <div style='margin-top: 8px;'>
          <ElTag type="warning" class="border-no">车辆是否洁净立场不合格</ElTag>
          <ElTag type="warning" class="border-no" style="margin-left:8px">其他问题</ElTag>
      </div>
  },
  {
    key: 'a_3',
    content: '标题',
    timestamp: '2020/03/04 13:00',
    desc: '说明文字说明文字说明文字说明文字说明文字说明文字'
  }
]
export const customActivities = [
  {
    key: 'ca_1',
    content: '标题',
    timestamp: '2020/03/04 13:00',
    desc: '说明文字说明文字说明文字说明文字说明文字说明文字',
    icon: 'Loading',
    color: '#3786fd'
  },
  {
    key: 'ca_2',
    content: '标题',
    timestamp: '2020/03/04 13:00',
    desc: '说明文字说明文字说明文字说明文字说明文字说明文字',
    color: '#ff5b63'
  },
  {
    key: 'ca_3',
    content: '标题',
    timestamp: '2020/03/04 13:00',
    desc: '说明文字说明文字说明文字说明文字说明文字说明文字',
    icon: 'Clock',
    color: '#3786fd'
  }
]
const imgStyle = 'width:80px;height:80px;'
export const imgActivities = [
  {
    key: 'ia_1',
    content: '标题',
    timestamp: '2020/03/04 13:00',
    desc: '说明文字说明文字说明文字说明文字说明文字说明文字',
    hollow: true,
    color: '#3786fd',
    addon: () => <div style='margin-top: 8px;'>
          <CipDynamicImage src={dog} style={imgStyle}></CipDynamicImage>
          <CipDynamicImage src={dog} style={[imgStyle, 'margin-left:8px']}></CipDynamicImage>
      </div>
  },
  {
    key: 'ia_2',
    content: '标题',
    timestamp: '2020/03/04 13:00',
    desc: '说明文字说明文字说明文字说明文字说明文字说明文字',
    addon: () => <div style='margin-top: 8px;'>
          <CipDynamicImage src={dog} style={imgStyle}></CipDynamicImage>
          <CipDynamicImage src={dog} style={[imgStyle, 'margin-left:8px']}></CipDynamicImage>
      </div>
  },
  {
    key: 'ia_3',
    content: '标题',
    timestamp: '2020/03/04 13:00',
    desc: '说明文字说明文字说明文字说明文字说明文字说明文字',
    addon: () => <div style='margin-top: 8px;'>
          <CipDynamicImage src={dog} style={imgStyle}></CipDynamicImage>
      </div>
  }
]
export const imgFoldActivities = [
  {
    key: 'ifa_1',
    content: '标题',
    timestamp: '2020/03/04 13:00',
    desc: '说明文字说明文字说明文字说明文字说明文字说明文字',
    hollow: true,
    color: '#3786fd',
    addon: () => <fold isExpand={false}>
      <CipDynamicImage src={dog} style={imgStyle}></CipDynamicImage>
      <CipDynamicImage src={dog} style={[imgStyle, 'margin-left:8px']}></CipDynamicImage>
    </fold>
  },
  {
    key: 'ifa_2',
    content: '标题',
    timestamp: '2020/03/04 13:00',
    desc: '说明文字说明文字说明文字说明文字说明文字说明文字',
    addon: () => <fold>
    <CipDynamicImage src={dog} style={imgStyle}></CipDynamicImage>
    <CipDynamicImage src={dog} style={[imgStyle, 'margin-left:8px']}></CipDynamicImage>
  </fold>
  },
  {
    key: 'ifa_3',
    content: '标题',
    timestamp: '2020/03/04 13:00',
    desc: '说明文字说明文字说明文字说明文字说明文字说明文字',
    addon: () => <fold isExpand={false}>
      <CipDynamicImage src={dog} style={imgStyle}></CipDynamicImage>
      <CipDynamicImage src={dog} style={[imgStyle, 'margin-left:8px']}></CipDynamicImage>
    </fold>
  }
]
