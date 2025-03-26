import { getAllContent } from "@/actions/Data.actions";
import { DisplayDataType } from "@/app/data-view";
import { create } from "zustand";

interface StoreState {
  data: [] | DisplayDataType[];
  singleData: DisplayDataType | null;
  getInfo: (
    text: "notes" | "accounts" | "cards" | "pins" | "keys"
  ) => Promise<void>;
  getSingleData: (id: string, category: string) => Promise<void>;
}

export const useStore = create<StoreState>((set) => ({
  data: [],

  singleData: null,

  getInfo: async (text: "notes" | "accounts" | "cards" | "pins" | "keys") => {
    try {
      const data = (await getAllContent(text)) as DisplayDataType[];
      set({ data });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },

  getSingleData: async (id: string, category: string) => {
    try {
      const data = (await getAllContent(category)) as DisplayDataType[];
      const singleData = data.find((item) => item.id === id);
      set({ singleData });
    } catch (error) {
      console.error("Error fetching single data:", error);
    }
  },
}));
