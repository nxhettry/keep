"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LoadingButton from "./loading-button";
import { getContent } from "@/actions/Data.actions";
import { useState } from "react";
import { EntryType } from "../../types/entry.types";

const dropdownOptions = [
  { value: "notes", label: "Notes" },
  { value: "accounts", label: "Accounts" },
  { value: "cards", label: "Cards" },
  { value: "pin", label: "Pins" },
];

const DataView = () => {
  const [data, setData] = useState<EntryType[] | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | undefined>();

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleDataFetching = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOption) {
      setError("Please select a data type");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const allData = await getContent(selectedOption);
      console.log(allData);
    } catch (error) {
      setError("Failed to fetch data. Try again later.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Data Filter
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleDataFetching} className="space-y-6">
          <div className="space-y-2">
            <Label
              htmlFor="option"
              className="text-sm font-medium text-gray-700"
            >
              Select Data Type
            </Label>
            <Select
              name="option"
              value={selectedOption}
              onValueChange={setSelectedOption}
            >
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
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>

          <LoadingButton />
        </form>

        <div className="mt-6 text-center">
          {loading ? (
            <p className="text-gray-500 italic">Loading data...</p>
          ) : data ? (
            <pre className="text-sm text-gray-700 bg-gray-100 p-2 rounded">
              {JSON.stringify(data, null, 2)}
            </pre>
          ) : (
            <p className="text-gray-500 italic">Results will appear here</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DataView;
