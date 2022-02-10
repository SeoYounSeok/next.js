#### Next.Js 공식 문서 정리 파트

##### Pages, Pre-Rendering 방식(SSG/SSR)

```
* When to Use Static Generation vs Server-side Redering
  (build time 서버에서만 동작 vs each request / TTFB slow)
  페이지가 한번 만 빌드되어서, CDN 으로 제공해도 된다면 Static Generation 을 사용해라.

단, npm run dev 로 킨 경우는 무조건 each request 마다 빌드한다.

!CSR Request time 이 후 동작한다

* Next js 는 기본적으로 모두 Pre-rendering 을 한다.
  예) 블로그, 문서 페이지, 블로그 등등
```

##### getStaticProps , getServerSideProps

```
* 모든 페이지가 외부 Data fetching 을 필요로 하는 것은 아니다.

* 데이터가 필요한 페이지에는 getStaticProps 라는 async 함수를 구현하면 된다.
  (그럼 빌드 타임에 해당 함수를 실행해서 데이터를 패칭해온다.)

단, development 모드에서는 each request 마다 getStaticProps가 실행된다.

* 사용자의 요청마다 외부 데이터를 가져올 경우에는 getServerSideProps 를 사용한다.
  TTFB(Time to first byte) 는 getStaticProps 보다 느리다.

* Client-side Rendering 을 고려한다면 SWR(캐싱/패칭) 추천한다고 문서에 나와있다.
```

##### getStaticProps Details

```
* 예제 코드
import someDatabaseSDK from 'someDatabaseSDK'

const databaseClient = someDatabaseSDK.createClient(...)

export async function getSortedPostsData() {
  // Instead of the file system,
  // fetch post data from a database
  return databaseClient.query('SELECT posts...')
}

This is possible because getStaticProps only runs on the server-side. It will never run on the client-side. It won’t even be included in the JS bundle for the browser. That means you can write code such as direct database queries without them being sent to browsers.

getStaticProps 는 서버 사이드에서만 동작한다.
(빌드시에 돌아가니까 클라이언트 사이드에서 사용되는 일이 없어서 다이렉트 디비 요청 같은 것을 사용해도 문제가 되지 않는다.)
```

##### Code splitting & prefetching

```
* Code splitting
  서비스를 만들 때, js 파일, 라이브러리, 여러 페이지가 구성되면 웹 어플리케이션 서비스 하나는 굉장히 많은 코드를 가지게 되는데, 그 코드를 유의미하게 분리하는 것!
  이렇게 되면, 사용자가 처음 진입했을 때, 화면을 구현하기 위한 조각들을 호출하는데 효율적으로 보여줄 수 있다.

  "코드들이 적절히 분리 되어 있고, 새로운 페이지에 접속할 때 필요한 만큼만 로드한다. 수백 페이지일지라도 정크가 크지 않다."
* prefetching
  첫 화면에 링크 태그로 감싸져있는 Path 가 있다면, 그 Path 는 초기 페이지에서 진입할 수 있기 때문에, 초기 페이지가 로드 될 때 호출되는 페이지에 대한 내용들을 미리 받아놓는 것.

  "연결 된 페이지 리소스를 미리 받아온다."

  <a> 를 사용하면, 그 일이 안 일어나고 당연하게 <Link> 태그를 사용하면 일어나며, 속도상으로 확연하게 보입니다.

! 외부 페이지를 호출 할 때는 당연히 내용을 가져올 것이 없기 때문에, <a> 를 사용한다. (예 네이버 카카오 등)
! 클래스네임을 작성할 때는 <a> 를 사용 <Link> 는 사용 금지

  (또한 네트워크 탭에서 확인을 해보면 된다.)
```

##### Dynamic Routes

```
# getStaticPaths / remark / dynamic routes

* [id].js
[] 에 속한 내용은 dynamic routes 되는 요소

* getStaticPaths
[{params:{id: 값}}] 목록을 리턴한다. 반드시 목록이나 객체. params 안에 dynamic routes key 가 들어있어야 한다.

* getStaticProps
id 별로 md 에서 데이터를 읽어서 page에 props로 전달하도록 함

* Render Markdown
remark 로 html 에 md content 보여주기

* Fallback for Dynamic routes
getStaticPaths 옵션 fallback: true
const router = useRouter();
route.isFallback

* Catch-all Routes

전체 받으려먼
/pages/posts/[...id].js 로 셋하고
/posts/a /posts/a/b /posts/a/b/c 가 있는 경우, spread 함수 사용한다.

getStaticPaths에서 [{params:{id:['a','b','c']}}]
```

[공식문서](https://nextjs.org/)
[(1)블로그](https://xtring-dev.tistory.com/entry/Nextjs-Nextjs-공식문서-파헤치기2-Nextjs의-기본적인-특징?category=1036806)
