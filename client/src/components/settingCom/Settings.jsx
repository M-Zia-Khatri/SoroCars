import React, { useState } from "react";
import useSetting from "@/stores/settingStore";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { setItem } from "@/services/storageService";
import { StorageConst } from "@/constants/storageConstants";

export default function Settings() {
  const { setDollarValue } = useSetting();
  const [value, setValue] = useState("");

  const onSave = () => {
    try {
      const parsed = parseFloat(value);
      if (isNaN(parsed)) {
        alert("Please enter a valid number");
        return;
      }
      setItem(StorageConst.Dollar, parsed);
      setDollarValue(parsed);
      location.href = "/";
    } catch (error) {
      console.error("Failed to save dollar value:", error);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="text-sm text-gray-500 border px-3 py-1 rounded">
          Open Settings
        </Button>
      </SheetTrigger>
      <SheetContent className="max-w-sm w-full flex flex-col gap-6">
        <SheetHeader>
          <SheetTitle className="text-xl font-bold text-gray-800">
            Settings
          </SheetTitle>
          <SheetDescription className="text-gray-500">
            Update your preferences below and save changes.
          </SheetDescription>
        </SheetHeader>
        <form className="flex flex-col gap-4 mt-2">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="dollar-input"
              className="block text-sm font-medium text-gray-700"
            >
              Dollar Value
            </label>
            <Input
              id="dollar-input"
              type="number"
              placeholder="Enter Dollar Value"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="focus:ring-2 focus:ring-primary border rounded px-3 py-2 text-base bg-gray-50"
            />
          </div>
          <Button
            onClick={onSave}
            className="w-full bg-primary text-white hover:bg-primary/90 transition-colors font-semibold rounded shadow"
            type="button"
          >
            Save
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
