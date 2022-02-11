#### Next.js 공식 문서 정리 (1회독: 개인적으로 공식 문서 읽고 작성 / 2회독: 강의 들으면서 비교 후 추가)

#### Basic Features 

##### hydration 
```
* hydration 이란?

- 생성된 각 HTML 은 해당 페이지에 필요한 최소한의 Javascript 코드와 연결됩니다. 
  브라우저 페이지가 로드되면 해당 Javascript 코드가 생성되어, 페이지가 완전히 상호작용 하게 합니다. 
  이 과정을 hydration 이라고 합니다. 
```
##### Two forms of PrE-RENDERING (SSG, SSR)
```
* Two forms of Pre-rendering (SSG, SSR)

- Static Generation (Recommended): The HTML is generated at build time and will be reused on each request.
- Server-side Rendering: The HTML is generated on each request.

1. Static Generation
- Html 이 빌드 시간에 생성 된다.
  이 HTMl 은 각 요청에서 재사용 할 수 있다. 
  CDN 에서 캐시 할 수 있다.

? CDN 이란
- CDN은 Content Delivery Network의 약자로서 지리적인 제약 없이 전 세계 사용자에게 빠르고 안전하게 컨텐츠 전송을 할 수 있는 기술을 말한다. 
  이를 통해서 컨텐츠의 병목현상을 피할 수 있다.
  CDN 의 원리
  서버를 분산시켜 캐싱해두고 사용자의 컨텐츠 요청이 들어오면 사용자와 가장 가까운 위치에 존재하는 서버로 매핑시켜 요청된 콘텐츠의 캐싱된 내용을 내어주는 방식으로 
  빠르게 데이터를 전송할 수 있게 된다.

2. Server-side Rendering

- If a page uses Server-side Rendering, the page HTML is generated on each request. 
- 서버에 데이터가 필요할 때 마다 요청한다. (초기 화면을 보여주는 데 장점이 있으나, 요청을 할 때마다 새로고침이 되는 현상을 볼 수 있다. SEO(검색 엔진 최적화) 에 장점이 있다)

* TTFB(Time to First Byte)는 HTTP 요청을 했을때 처음 byte (정보) 가 브라우져에 도달하는 시간
```
#### 참고 페이지 (공식문서)
##### [ServerSide-rendering / getServerSideProps](https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props)
##### [Static Generation / getStaticProps](https://nextjs.org/docs/basic-features/data-fetching/get-static-props)
##### [Client-side data fetching](https://nextjs.org/docs/basic-features/data-fetching/client-side)
