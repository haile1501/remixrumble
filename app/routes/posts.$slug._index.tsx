import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Parser } from "html-to-react";

export default function Post() {
  const { post } = useLoaderData<typeof loader>();
  return <main>{Parser().parse(post.content.rendered)}</main>;
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const res = await fetch(
    `https://remixcms.ptemagic.com/wp-json/wp/v2/posts?slug=${params.slug}`
  );
  const posts = await res.json();
  const post = posts[0];
  return { post };
};
