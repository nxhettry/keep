import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import LoadingButton from "@/app/loading-button";
import { Input } from "@/components/ui/input";
import { SaveData } from "@/actions/Data.actions";

const options = ["accounts", "notes", "cards", "pins", "keys"];

const AddNew = () => {
  return (
    <form action={SaveData}>
      <div className="space-y-4 my-3">
        <Label htmlFor="category" className="font-semibold">
          Category
        </Label>
        <Select name="category">
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
        <Input id="title" name="title" />
      </div>
      <div className="space-y-4 my-3">
        <Label htmlFor="content" className="font-semibold">
          Content
        </Label>
        <Textarea id="content" name="content" />
      </div>

      <LoadingButton />
    </form>
  );
};

export default AddNew;
