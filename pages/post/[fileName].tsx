import MarkdownRenderer from "@components/MarkdownRenderer";
import { GetStaticPaths, GetStaticProps } from "next";
import { getAllPosts, getPostData } from "./helper";

interface Props {
  meta: {
    date: string | number;
    title: string;
  };

  content: string;
}

export default function Post({ meta, content }: Props) {
  return (
    <div style={{ background: "#0d1117" }}>
      <MarkdownRenderer markdownContent={content} />
    </div>
  );
}

export const getStaticProps: GetStaticProps<
  any,
  { fileName: string },
  any
> = async ({ params }) => {
  const post = getPostData(params!.fileName);

  return {
    props: post,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllPosts();

  return {
    paths: posts.map((post) => {
      return {
        params: {
          fileName: post.fileName,
        },
      };
    }),
    fallback: true,
  };
};