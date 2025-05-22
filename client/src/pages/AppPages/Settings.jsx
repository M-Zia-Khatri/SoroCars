import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useSetting from "@/stores/setting";
import React, { useState } from "react";

export default function Settings() {
  const { setDollerValue } = useSetting();
  const [value, setValue] = useState("");

  const onSave = () => {
    try {
      const parsed = parseFloat(value);
      if (isNaN(parsed)) {
        alert("Please enter a valid number");
        return;
      }
      localStorage.setItem("doller", parsed);
      setDollerValue(parsed);
      location.href = "/";
    } catch (error) {
      console.error("Failed to save dollar value:", error);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10 p-6 border rounded-lg shadow">
      <h1 className="text-2xl font-semibold mb-4">Settings</h1>
      <label htmlFor="dollar-input" className="block mb-2 font-medium">
        Dollar Value
      </label>
      <Input
        id="dollar-input"
        type="number"
        placeholder="Enter Dollar Value"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="mb-4"
      />
      <Button onClick={onSave} className="w-full">
        Save
      </Button>
    </div>
  );
}
