import React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function RadioInputGroup({ name, label, options, form }) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-2">
          <FormLabel className="text-sm font-medium">{label}</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              value={field.value}
              className="flex gap-6"
            >
              {options.map((opt) => (
                <FormItem key={opt} className="flex items-center space-x-2">
                  <FormControl>
                    <RadioGroupItem value={opt} id={opt} />
                  </FormControl>
                  <FormLabel htmlFor={opt} className="text-sm font-normal">
                    {opt}
                  </FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage className="text-xs text-red-500" />
        </FormItem>
      )}
    />
  );
}
