#### Next.js 공식 문서 정리 (1회독: 개인적으로 공식 문서 읽고 작성 / 2회독: 강의 들으면서 비교 후 추가) // 강의 보고 작성한 것은 ++ 를 붙이도록 하겠습니다.

#### Basic Features 

##### hydration 
```
* hydration 이란?

- 생성된 각 HTML 은 해당 페이지에 필요한 최소한의 Javascript 코드와 연결됩니다. 
  브라우저 페이지가 로드되면 해당 Javascript 코드가 생성되어, 페이지가 완전히 상호작용 하게 합니다. 
  이 과정을 hydration 이라고 합니다. 
```

++ 모든 페이지를 Pre-rendering 을 사용하지 않아도 된다.

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

#### ++ Static Generation

##### ++ Static Generation without data
 
```
코드 예시 : 페이지를 단순 태그를 사용하여, 나타내기

function About() {
  return <div>About</div>
}

export default About
```

##### Static Generation with data - Scenario 1: Your page content depends on external data

```
// TODO: Need to fetch `posts` (by calling some API endpoint)
//       before this page can be pre-rendered.
function Blog({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <li>{post.title}</li>
      ))}
    </ul>
  )
}

// This function gets called at build time
export async function getStaticProps() {
  // Call an external API endpoint to get posts
  const res = await fetch('https://.../posts')
  const posts = await res.json()

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      posts,
    },
  }
}

export default Blog
```

##### Static Generation with data - Scenario 2: Your page paths depend on external data

```
// This function gets called at build time
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await fetch('https://.../posts')
  const posts = await res.json()

  // Get the paths we want to pre-render based on posts
  const paths = posts.map((post) => ({
    params: { id: post.id },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

function Post({ post }) {
  // Render post...
}

export async function getStaticPaths() {
  // ...
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const res = await fetch(`https://.../posts/${params.id}`)
  const post = await res.json()

  // Pass post data to the page via props
  return { props: { post } }
}

export default Post
```
#### ++ Incremental Static Regeneration

```
Next.js allows you to create or update static pages after you’ve built your site. Incremental Static Regeneration (ISR) enables you to use static-generation on a per-page basis, without needing to rebuild the entire site. With ISR, you can retain the benefits of static while scaling to millions of pages.

getStaticProps 함수를 활용한 static generation 방식은 언제나 빌드 시점 에 페이지를 생성하지만, ISR 방식은 일정 주기마다 데이터의 최신 여부를 검사하고 업데이트된 데이터로 페이지를 다시 생성합니다.


To use ISR add the revalidate prop to getStaticProps

function Blog({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getStaticProps() {
  const res = await fetch('https://.../posts')
  const posts = await res.json()

  return {
    props: {
      posts,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, // In seconds
  }
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// the path has not been generated.
export async function getStaticPaths() {
  const res = await fetch('https://.../posts')
  const posts = await res.json()

  // Get the paths we want to pre-render based on posts
  const paths = posts.map((post) => ({
    params: { id: post.id },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: 'blocking' }
}

export default Blog

ISR(증분적 정적 재생)을 사용하면 전체 사이트를 재구성할 필요 없이 페이지 단위로 정적 생성을 사용할 수 있습니다. 

// revalidate 속성을 사용해 해당 주기마다 파일 업데이트를 검사할 수 있음.
중요 문구, revalidate: 10, // In seconds 

초기 요청 후와 10초 전에 페이지에 대한 요청도 즉시 캐시됩니다.
10초 후 다음 요청이 캐시된(스틸) 페이지를 계속 표시합니다.

- static generation 방식이 항상 페이지를 정적으로 생성하는게 아니라, 데이터를 최신으로 유지할 수 있는 방법이 존재한다
```

#### 참고 페이지 (공식문서)
##### [ServerSide-rendering / getServerSideProps](https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props)
##### [Static Generation / getStaticProps](https://nextjs.org/docs/basic-features/data-fetching/get-static-props)
##### [Client-side data fetching](https://nextjs.org/docs/basic-features/data-fetching/client-side)
##### [Incremental Static Regeneration / revalidate](https://mytutorials.tistory.com/317)
