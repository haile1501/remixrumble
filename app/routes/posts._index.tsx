import { Link, useLoaderData } from "@remix-run/react";

export default function Posts() {
  const { posts } = useLoaderData<typeof loader>();
  return (
    <main>
      {posts.map((post: any) => (
        <Link to={`/posts/${post.slug}`} key={post.id}>
          <h1>{post.title.rendered}</h1>
        </Link>
      ))}
    </main>
  );
}

export const loader = async () => {
  const res = await fetch("https://remixcms.ptemagic.com/wp-json/wp/v2/posts");
  const posts = await res.json();
  return { posts };
};

export function headers() {
  return {
    "cache-control": "max-age=604800, stale-while-revalidate=86400",
  };
}
