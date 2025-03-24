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
      const accountSnapshot = await getDocs(accountsCollection);

      const accounts = accountSnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });

      return accounts;
    case "notes":
      log("notes");
      const snapshot = await getDocs(notesCollection);

      const notes = snapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      return notes;

    case "cards":
      log("cards");
      const cardsSnapshot = await getDocs(cardsCollection);
      const cards = cardsSnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });

      return cards;
    case "pins":
      log("pins");
      const pinsSnapshot = await getDocs(pinsCollection);
      const pins = pinsSnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });

      return pins;
    case "keys":
      log("keys");
      const keysSnapshot = await getDocs(keysCollection);

      const keys = keysSnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });

      return keys;
    default:
      break;
  }
};
