// components/AuctionTransaction/carSelector.jsx
import React, { useState, useMemo } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { fetchCars } from "@/API/cars";

export default function CarSelector({
  value,
  onChange,
  resetForm,
}) {
  const [open, setOpen] = useState(false);

  const {
    data = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["car-details"],
    queryFn: fetchCars,
  });

  const filteredCars = useMemo(() => {
    return data?.cars?.filter((car) => car.Sale_type === "Auction");
  }, [data.cars]);

  const items = useMemo(
    () =>
      filteredCars?.map((car) => ({
        label: car.Stock_Id,
        value: car.Stock_Id,
      })),
    [filteredCars]
  );

  const selectedLabel = useMemo(() => {
    const found = items?.find((i) => i.value === value);
    return found ? found.label : "Select a car…";
  }, [value, items]);

  if (isLoading) return <div>Loading car options…</div>;
  if (error) return <div className="text-red-500">Failed to load cars</div>;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-[260px] justify-between"
          role="combobox"
          aria-expanded={open}
        >
          {selectedLabel}
          <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[260px] p-0">
        <Command>
          <CommandInput placeholder="Search Stock ID…" />
          <CommandList>
            <CommandEmpty>No cars found.</CommandEmpty>
            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={(currentValue) => {
                    onChange(currentValue); // pass selected value to parent
                    setOpen(false);
                    resetForm(); // reset form in parent
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === item.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
