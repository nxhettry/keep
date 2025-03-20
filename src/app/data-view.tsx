import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FilterData } from "@/actions/Data.actions";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LoadingButton from "./loading-button";

const dropdownOptions = [
  { value: "notes", label: "Notes" },
  { value: "accounts", label: "Accounts" },
  { value: "cards", label: "Cards" },
  { value: "pin", label: "Pins" },
];

const DataView = () => {
  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Data Filter
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form action={FilterData} className="space-y-6">
          <div className="space-y-2">
            <Label
              htmlFor="option"
              className="text-sm font-medium text-gray-700"
            >
              Select Data Type
            </Label>
            <Select name="option" defaultValue="">
              <SelectTrigger className="w-full border-gray-300 focus:ring-2 focus:ring-blue-500">
                <SelectValue placeholder="Choose an option" />
              </SelectTrigger>
              <SelectContent>
                {dropdownOptions.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    className="hover:bg-gray-100"
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <LoadingButton />
        </form>

        <div className="mt-6">
          <div className="text-center text-gray-500 italic">
            Results will appear here
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DataView;
