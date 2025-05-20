import React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function TextInputField({
  name,
  label,
  form,
  type = "text",
  placeholder,
}) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-2">
          <FormLabel className="text-sm font-medium">{label}</FormLabel>
          <FormControl>
            <Input
              type={type}
              placeholder={placeholder || label}
              className="w-full px-3 py-2 border rounded-md shadow-sm"
              {...field}
            />
          </FormControl>
          <FormMessage className="text-xs text-red-500" />
        </FormItem>
      )}
    />
  );
}
