import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Head from "next/head";
import Date from "../../components/date";
import utilStyles from "../../styles/utils.module.css";
import { useEffect } from "react";
import { useRouter } from "next/router";

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    // paths: [{ params: { id: "ssg-ssr" } }],
    fallback: false, // 주지 않은 아이디에 대한 404처리를 위해, false
    // fallback: "blocking" 밑에 있는 로딩 화면을 안 보여준다.
  };
}

// export async function getServerSideProps({ params, req }) {
//   console.log(`req.cookies: ${JSON.stringify(req.cookies)}`);
//   const postData = await getPostData(params.id);
//   return {
//     props: {
//       postData,
//     },
//   };
// }

export default function Post({ postData }) {
  const router = useRouter();

  useEffect(() => {
    const getText = async () => {
      const res = await fetch("/api/hello");
      const data = await res.json();

      alert(data.text);
    };
    getText();
  }, []);

  if (router.isFallback) {
    return <div>Loading.....</div>;
  }

  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}
