import z from "zod";

export const EntrySchema = z.object({
  category: z.enum(["accounts", "notes", "cards", "pins", "keys"]),
  title: z.string().nonempty(),
  content: z.string().nonempty(),
});

export type EntryType = z.infer<typeof EntrySchema>;
