import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Parser } from "html-to-react";

export default function Post() {
  const { post } = useLoaderData<typeof loader>();
  return <main>{Parser().parse(post.content.rendered)}</main>;
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const res = await fetch(`https://remixcms.ptemagic.com/wp-json/wp/v2/posts`);
  const posts = await res.json();
  const post = posts.find((post) => {
    const parts = post.link.split("/");
    return parts[parts.length - 2] === params.postLink;
  });
  return { post };
};
