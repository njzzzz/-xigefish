export default {
  render () {
    return (
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 32 32"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
      >
        <title>square-avatar</title>
        <defs>
          <rect id="square-path-1" x="0" y="0" width="32" height="32" rx="4"></rect>
          <ellipse id="square-path-3" cx="16" cy="34" rx="20" ry="13"></ellipse>
          <filter
            x="-32.5%"
            y="-42.3%"
            width="165.0%"
            height="200.0%"
            filterUnits="objectBoundingBox"
            id="square-filter-4"
          >
            <feOffset
              dx="0"
              dy="2"
              in="SourceAlpha"
              result="shadowOffsetOuter1"
            ></feOffset>
            <feGaussianBlur
              stdDeviation="4"
              in="shadowOffsetOuter1"
              result="shadowBlurOuter1"
            ></feGaussianBlur>
            <feColorMatrix
              values="0 0 0 0 0.0823529412   0 0 0 0 0.388235294   0 0 0 0 0.760784314  0 0 0 0.111314467 0"
              type="matrix"
              in="shadowBlurOuter1"
            ></feColorMatrix>
          </filter>
          <circle id="square-path-5" cx="16" cy="12" r="5.33333333"></circle>
          <filter
            x="-121.9%"
            y="-103.1%"
            width="343.7%"
            height="343.7%"
            filterUnits="objectBoundingBox"
            id="square-filter-6"
          >
            <feOffset
              dx="0"
              dy="2"
              in="SourceAlpha"
              result="shadowOffsetOuter1"
            ></feOffset>
            <feGaussianBlur
              stdDeviation="4"
              in="shadowOffsetOuter1"
              result="shadowBlurOuter1"
            ></feGaussianBlur>
            <feColorMatrix
              values="0 0 0 0 0.0823529412   0 0 0 0 0.388235294   0 0 0 0 0.760784314  0 0 0 0.111314467 0"
              type="matrix"
              in="shadowBlurOuter1"
            ></feColorMatrix>
          </filter>
        </defs>
        <g
          id="后台规范"
          stroke="none"
          stroke-width="1"
          fill="none"
          fill-rule="evenodd"
        >
          <g id="数据展示-头像" transform="translate(-318.000000, -426.000000)">
            <g id="编组-7" transform="translate(80.000000, 370.000000)">
              <g id="编组" transform="translate(238.000000, 56.000000)">
                <mask id="square-mask-2" fill="white">
                  <use xlink:href="#square-path-1"></use>
                </mask>
                <use id="矩形" fill="#86B6FF" xlink:href="#square-path-1"></use>
                <g id="square-Oval-Copy-7" mask="url(#square-mask-2)">
                  <use
                    fill="black"
                    fill-opacity="1"
                    filter="url(#square-filter-4)"
                    xlink:href="#square-path-3"
                  ></use>
                  <use
                    fill="#FFFFFF"
                    fill-rule="evenodd"
                    xlink:href="#square-path-3"
                  ></use>
                </g>
                <g id="square-Oval" mask="url(#square-mask-2)">
                  <use
                    fill="black"
                    fill-opacity="1"
                    filter="url(#square-filter-6)"
                    xlink:href="#square-path-5"
                  ></use>
                  <use
                    fill="#FFFFFF"
                    fill-rule="evenodd"
                    xlink:href="#square-path-5"
                  ></use>
                </g>
              </g>
            </g>
          </g>
        </g>
      </svg>
    )
  }
}
