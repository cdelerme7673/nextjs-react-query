"use client";

import { useQuery } from "@tanstack/react-query";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

async function fetchPosts(): Promise<Post[]> {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  return response.json();
}

export default function Home() {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError)
    return <div>{(error as Error).message || "Error fetching data."}</div>;

  return (
    <div>
      {data?.map((post, i) => {
        return (
          <div key={i}>
            <br />
            <b>
              {post.id}. {post.title}
            </b>
            <br />
            {post.body}
          </div>
        );
      })}
    </div>
  );
}
