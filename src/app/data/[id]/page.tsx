import { getContent } from "@/actions/Data.actions";
import { DisplayDataType } from "@/app/panel/data-view";
import React from "react";
import NoteDisplay from "./DisplayArea";

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
      <NoteDisplay data={data} />
    </div>
  );
};

export default SingleView;
