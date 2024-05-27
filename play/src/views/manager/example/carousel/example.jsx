import CipDynamicImage from '@xigefish/components/cip-dynamic-image'
import { ElCarousel, ElCarouselItem } from 'element-plus'
import carouselImage1 from '@/assets/images/carousel_1.jpeg'
import carouselImage2 from '@/assets/images/carousel_2.jpeg'
import carouselImage3 from '@/assets/images/carousel_3.jpeg'
import carouselImage4 from '@/assets/images/carousel_4.jpeg'
import ExampleRow from '@/components/example-row'

export default {
  setup () {
    const carouselImages = [
      carouselImage1,
      carouselImage2,
      carouselImage3,
      carouselImage4
    ]
    return () => (
      <div class="cip-carousel-example">
        <div>• 走马灯尺寸根据业务内容与页面空间自定义</div>
        <ExampleRow label='基础样式'>
          <ElCarousel height="150px" arrow="never" style="width: 340px;">
            {[1, 2, 3, 4].map((i) => (
              <ElCarouselItem key={i}>{i}</ElCarouselItem>
            ))}
          </ElCarousel>
        </ExampleRow>
        <ExampleRow label='带切换按钮【注：UI中带切换按钮的指示器样式与默认的不一样】'>
          <div style='display: flex;'>
            <ElCarousel height="150px" arrow="always" style="width: 340px;">
              {[1, 2, 3, 4].map((i) => (
                <ElCarouselItem key={i}>{i}</ElCarouselItem>
              ))}
            </ElCarousel>
            <ElCarousel height="150px" arrow="always" style="width: 340px;margin-left: 40px;">
              {carouselImages.map((i) => (
                <ElCarouselItem key={i}>
                  <CipDynamicImage src={i} />
                </ElCarouselItem>
              ))}
            </ElCarousel>
          </div>
        </ExampleRow>
      </div>
    )
  }
}
