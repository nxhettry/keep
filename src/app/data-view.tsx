"use client";

import { FaEye } from "react-icons/fa";
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
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useStore } from "@/store/store";
import { useRouter } from "next/navigation";

const dropdownOptions = [
  { value: "notes", label: "Notes" },
  { value: "accounts", label: "Accounts" },
  { value: "cards", label: "Cards" },
  { value: "pin", label: "Pins" },
];

export interface DisplayDataType {
  title: string;
  content: string;
  id: string;
}

const DataView = () => {
  const [selectedOption, setSelectedOption] = useState<
    "notes" | "accounts" | "cards" | "pins" | "keys" | undefined
  >();

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { data, getInfo } = useStore();

  const router = useRouter();

  const handleDataFetching = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOption) {
      setError("Please select a data type");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await getInfo(selectedOption);
    } catch (error) {
      setError("Failed to fetch data. Try again later.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full shadow-lg">
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
              onValueChange={(value) =>
                setSelectedOption(
                  value as "notes" | "accounts" | "cards" | "pins" | "keys"
                )
              }
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
            <Table>
              <TableCaption>A list of your recent invoices.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">S.N.</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((item: DisplayDataType, index: number) => {
                  return (
                    <TableRow key={item.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{item.title}</TableCell>
                      <TableCell>
                        <FaEye
                          onClick={() => {
                            router.push(`/data/${item.id}`);
                          }}
                          color="black"
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          ) : (
            <p className="text-gray-500 italic">Results will appear here</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DataView;
