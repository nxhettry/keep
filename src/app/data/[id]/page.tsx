import { getContent } from "@/actions/Data.actions";
import { DisplayDataType } from "@/app/data-view";
import React from "react";
import { IoArrowBackOutline } from "react-icons/io5";

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

  const data = (await getContent(category, id)) as DisplayDataType;

  return (
    <div className="max-w-md mx-auto rounded-lg shadow-lg p-4 bg-white mt-8">
      <div className="h-12 w-12 bg-gray100 p-2 rounded-full flex items-center justify-center bg-gray-200">
        <IoArrowBackOutline size={32} />
      </div>

      {data ? (
        <div>
          <h1>{data.title}</h1>
          <p>{data.content}</p>
        </div>
      ) : (
        <div>Not found</div>
      )}
    </div>
  );
};

export default SingleView;
