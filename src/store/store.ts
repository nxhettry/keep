import { getContent } from "@/actions/Data.actions";
import { DisplayDataType } from "@/app/data-view";
import { create } from "zustand";

interface StoreState {
  data: [] | DisplayDataType[];
  getInfo: (
    text: "notes" | "accounts" | "cards" | "pins" | "keys"
  ) => Promise<void>;
}

export const useStore = create<StoreState>((set) => ({
  data: [],

  getInfo: async (text: "notes" | "accounts" | "cards" | "pins" | "keys") => {
    try {
      const data = (await getContent(text)) as DisplayDataType[];
      set({ data });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },
}));
