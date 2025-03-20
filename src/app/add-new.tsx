import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import LoadingButton from "./loading-button";

const options = ["accounts", "notes", "cards", "pins", "keys"];

const AddNew = () => {
  return (
    <form action="">
      <div className="space-y-4 my-3">
        <Label htmlFor="title" className="font-semibold">
          Category
        </Label>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-4 my-3">
        <Label htmlFor="title" className="font-semibold">
          Title
        </Label>
        <Textarea id="title" name="title" />
      </div>

      <LoadingButton />
    </form>
  );
};

export default AddNew;
