

import React from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { AppNavigation } from "@/constants/navigationConstants";
import { APIUrls } from "@/constants/urlConstants";

const TextInputField = ({ name, label, form, type = "text", placeholder }) => (
  <FormField
    control={form.control}
    name={name}
    render={({ field }) => (
      <FormItem className="space-y-2">
        <FormLabel className="text-sm font-medium">{label}</FormLabel>
        <FormControl className="w-full">
          <Input
            type={type}
            placeholder={placeholder || label}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            {...field}
          />
        </FormControl>
        <FormMessage className="text-xs text-red-500" />
      </FormItem>
    )}
  />
);

export default function Home() {
  const form = useForm({
    defaultValues: {
      Stock_Id: "",
      Invoice_Id: "",
      Adjustment: "",
      Amount: "",
      Status: "",
      Sale_type: "",
      Ajency: "",
    },
  });

  const queryClient = useQueryClient();

  const postCarDetails = async (carData) => {
    const response = await axios.post(
      APIUrls.CARS_DETAILS_URL,
      carData
    );
    return response.data;
  };

  const mutation = useMutation({
    mutationFn: postCarDetails,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cars"] });
      console.log("Car details submitted successfully!");
    },
    onError: (error) => {
      console.error("Error submitting car details:", error);
    },
  });

  const onSubmit = (data) => {
    const {
      Stock_Id,
      Invoice_Id,
      Adjustment,
      Amount,
      Status,
      Sale_type,
      Ajency,
    } = data;

    const carData = {
      Stock_Id: Stock_Id.trim(),
      Invoice_Id: Invoice_Id.trim(),
      AdjustmentSTR: Adjustment,
      AmountSTR: Amount,
      Status,
      Sale_type,
      Ajency,
      UserId: 1,
    };
    mutation.mutate(carData);

    if(mutation.isSuccess){
      location.href = Sale_type === "Stock" ? AppNavigation.ViewStock: AppNavigation.ViewAution 
    }
  };

  return (
    <main className="max-w-md mx-auto mt-10 bg-white p-6">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Stock Entry Form
      </h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <TextInputField name="Stock_Id" label="Stock ID" form={form} />
          <TextInputField name="Invoice_Id" label="Invoice ID" form={form} />
          <TextInputField
            name="Amount"
            label="Amount"
            type="number"
            form={form}
          />
          <TextInputField
            name="Adjustment"
            label="Adjustment"
            type="number"
            form={form}
          />
          <TextInputField name="Status" label="Status" form={form} />

          {/* Sale Type Radio Group */}
          <FormField
            control={form.control}
            name="Sale_type"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-sm font-medium">Sale Type</FormLabel>
                <FormControl className="flex gap-6">
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex gap-6"
                  >
                    {["Stock", "Auction"].map((type) => (
                      <FormItem
                        key={type}
                        className="flex items-center space-x-2"
                      >
                        <FormControl className="bg-white">
                          <RadioGroupItem value={type} id={type} />
                        </FormControl>
                        <FormLabel
                          htmlFor={type}
                          className="text-sm font-normal"
                        >
                          {type}
                        </FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage className="text-xs text-red-500" />
              </FormItem>
            )}
          />

          {/* Ajency Radio Group */}
          <FormField
            control={form.control}
            name="Ajency"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-sm font-medium">Ajency</FormLabel>
                <FormControl className="flex gap-6">
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex gap-6"
                  >
                    {["AA-Japan", "Durrani"].map((agency) => (
                      <FormItem
                        key={agency}
                        className="flex items-center space-x-2"
                      >
                        <FormControl className="bg-white">
                          <RadioGroupItem value={agency} id={agency} />
                        </FormControl>
                        <FormLabel
                          htmlFor={agency}
                          className="text-sm font-normal"
                        >
                          {agency}
                        </FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage className="text-xs text-red-500" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </Form>
    </main>
  );
}
