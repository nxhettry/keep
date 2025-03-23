"use server";

import { EntrySchema } from "../../types/entry.types";
import { addDoc } from "@firebase/firestore";
import { notesCollection } from "../../firebase-config";

const postContent = async (
  category: string,
  title: string,
  content: string
) => {
  switch (category) {
    case "accounts":
      break;
    case "notes":
      console.log("Saving note to database . . .");
      await addDoc(notesCollection, { category, title, content });
      return true;
    case "cards":
      break;
    case "pins":
      break;
    case "keys":
      break;
    default:
      break;
  }
};

export const FilterData = async (formData: FormData) => {
  const option = formData.get("option");
  console.log(option);
};

export const SaveData = async (formData: FormData) => {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const category = formData.get("category") as string;

  if (!title || !content || !category) {
    console.log("All fields are required");
    return;
  }

  const SchemaVerification = EntrySchema.safeParse({
    category,
    title,
    content,
  });

  if (!SchemaVerification.success) {
    console.log(SchemaVerification.error.message);
    return;
  }

  const response = await postContent(category, title, content);

  if (response) {
    console.log("Data saved successfully");
  } else {
    console.log("Error saving data");
  }
};
