"use server";

import { EntrySchema } from "../../types/entry.types";
import { addDoc, getDocs } from "@firebase/firestore";
import {
  accountsCollection,
  cardsCollection,
  keysCollection,
  notesCollection,
  pinsCollection,
} from "../../firebase-config";

const log = (method: string, text: string) =>
  console.log(`${method}ing ${text} to database . . .`);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const collectionMap: Record<string, any> = {
  accounts: accountsCollection,
  notes: notesCollection,
  cards: cardsCollection,
  pins: pinsCollection,
  keys: keysCollection,
};

const postContent = async (
  category: string,
  title: string,
  content: string
) => {
  switch (category) {
    case "accounts":
      log("Post", "account");
      await addDoc(accountsCollection, { title, content });
      return true;
    case "notes":
      log("Post", "note");
      await addDoc(notesCollection, { title, content });
      return true;
    case "cards":
      log("Post", "card");
      await addDoc(cardsCollection, { title, content });
      return true;
    case "pins":
      log("Post", "pin");
      await addDoc(pinsCollection, { title, content });
      return true;
    case "keys":
      log("Post", "key");
      await addDoc(keysCollection, { title, content });
      return true;
    default:
      break;
  }
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

export const getAllContent = async (category: string) => {
  const collectionRef = collectionMap[category];

  if (!collectionRef) {
    throw new Error(`Invalid category: ${category}`);
  }

  log("Gett", category);
  const snapshot = await getDocs(collectionRef);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as object),
  }));
};

export const getContent = async (category: string, id: string) => {
  const collectionRef = collectionMap[category];

  if (!collectionRef) {
    throw new Error(`Invalid category: ${category}`);
  }

  log("Gett", category);

  const doc = await collectionRef.doc(id).get();

  if (!doc.exists) {
    throw new Error(`No such document with ID: ${id}`);
  }

  return { id: doc.id, ...(doc.data() as object) };
};
