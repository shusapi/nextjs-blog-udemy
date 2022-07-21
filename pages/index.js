
// npm run dev
import styles from "../styles/Home.module.css";
import Layout, { siteTitle } from '../components/Layout';
import utilStyles from "../styles/utils.module.css";
// import Image from "next/image";
import Link from 'next/link';
import Head from "next/head";
import { getPostsData } from "../lib/post";

//SSGの場合
export async function getStaticProps() {
  const allPostsData = getPostsData(); //id, title, date, thumbnail
  console.log(allPostsData);
  return {
    props: {
      allPostsData,
    },
  };
}

// //SSRの場合
// export async function getServerSideProps(context) {
//   return {
//     props: {
//       //コンポーネントに渡すためのProps
//     },
//   };
// }

export default function Home({allPostsData}) {
  return (
  <Layout home>
    <Head>
      <title>
        {siteTitle}
      </title>
    </Head>
    <section className={utilStyles.headingMd}>
      <p>
        私はNextjsエンジニアです/Udemyで勉強しています/好きなフレームワークはNextjsです
      </p>
    </section>

    <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
      <h2 className={utilStyles.headingLg}>📝エンジニアのブログ</h2>
      <div className={`${styles.grid}`}>
        {allPostsData.map(({id, title, date, thumbnail}) => (
          <article key={id}>
            <Link href={`/posts/${id}`}>
              <img className={`${styles.thumbnailImage}`} src={`${thumbnail}`} />
            </Link>
            <Link href={`/posts/${id}`}>
              <a className={utilStyles.boldText}>{title}</a>
            </Link>
            <br />
            <small className={utilStyles.lightText}>
              {date}
            </small>
          </article>
        ))}

      </div>
    </section>
  </Layout>
  );
}
