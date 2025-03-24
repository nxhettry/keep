import React from "react";

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ category: string }>;
}

const SingleView = async ({ params, searchParams }: PageProps) => {
  const { id } = await params;
  const { category } = await searchParams;

  if (!id || !category) {
    return <div>Not found</div>;
  }

//   const data = await getContent(category, id)

  return (
    <div>
      This is the ID : {id} <br /> Category : {category ?? "Not-found"}
    </div>
  );
};

export default SingleView;
