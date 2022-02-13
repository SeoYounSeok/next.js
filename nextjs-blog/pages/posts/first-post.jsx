import Link from "next/link";
import Head from "next/head";
import Layout from "../../components/layout";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function FirstPost() {
  const router = useRouter();

  useEffect(() => {
    // Always do navigations after the first render
    // router.push("/?counter=10", undefined, { shallow: true });
  }, []);

  useEffect(() => {
    alert(JSON.stringify(router.query.counter));
  }, [router.query]);
  return (
    <Layout>
      <Head>
        <title>First Post</title>
        <meta name="author" content="서윤석" />
        <meta name="description" content="이 페이지는 블로그다" />
      </Head>
      <h1>First Post</h1>
      <h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
    </Layout>
  );
}

// Link 는 공통된 부분은 그대로 두고, 필요한 부분만 추가적으로 호출한다. 크롬 개발자 도구, 네트워크 탭
// Link 로 사용한다면, <HTML> 태그에 백그라운 스타일을 입히면, 이동하더라도 스타일이 유지된다.
// 그러나, <a> 태그를 사용한다면, 새로운 페이지가 생성되는 느낌을 주며 비교적으로 속도가 느리다. (풀 리플레시가 된다.)
