"use server";

import { EntrySchema } from "../../types/entry.types";
import { addDoc } from "@firebase/firestore";
import {
  accountsCollection,
  cardsCollection,
  keysCollection,
  notesCollection,
  pinsCollection,
} from "../../firebase-config";

const log = (text: string) => console.log(`Saving ${text} to database . . .`);

const postContent = async (
  category: string,
  title: string,
  content: string
) => {
  switch (category) {
    case "accounts":
      log("account");
      await addDoc(accountsCollection, { title, content });
      return true;
    case "notes":
      log("note");
      await addDoc(notesCollection, { title, content });
      return true;
    case "cards":
      log("card");
      await addDoc(cardsCollection, { title, content });
      return true;
    case "pins":
      log("pin");
      await addDoc(pinsCollection, { title, content });
      return true;
    case "keys":
      log("key");
      await addDoc(keysCollection, { title, content });
      return true;
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

export const getContent = async (category: string) => {
  switch (category) {
    case "accounts":
      log("accounts");
      return accountsCollection;
    case "notes":
      log("notes");
      return JSON.parse(JSON.stringify(notesCollection));
    case "cards":
      log("cards");
      return cardsCollection;
    case "pins":
      log("pins");
      return pinsCollection;
    case "keys":
      log("keys");
      return keysCollection;
    default:
      break;
  }
};
