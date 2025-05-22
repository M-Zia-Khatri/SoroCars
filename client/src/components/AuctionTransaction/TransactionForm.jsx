import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function TransactionForm({
  form,
  onSubmit,
  isSubmitting,
  onCancel,
}) {
  const { control, handleSubmit, watch } = form;
  const Transaction_Id = watch("Transaction_Id");
  const Transaction_Invoice_Id = watch("Transaction_Invoice_Id");
  const transactionType = watch("transactionType");
  const amount = watch("amount");
  const date = watch("Transaction_Date");

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 max-w-sm p-4 border rounded-lg"
      >
        {/* Transaction ID */}
        <FormField
          control={control}
          name="Transaction_Id"
          rules={{ required: "Transaction ID is required" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Transaction ID</FormLabel>
              <FormControl>
                <Input placeholder="Enter transaction ID" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Transaction Invoice ID */}
        {Transaction_Id && (
          <FormField
            control={control}
            name="Transaction_Invoice_Id"
            rules={{ required: "Invoice ID is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Transaction Invoice ID</FormLabel>
                <FormControl>
                  <Input placeholder="Enter invoice ID" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {/* Transaction Type (Credit/Debit) */}
        {Transaction_Invoice_Id && (
          <FormField
            control={control}
            name="transactionType"
            rules={{ required: "Select Credit or Debit" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Transaction Type</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="flex gap-6"
                  >
                    {["Credit", "Debit"].map((type) => (
                      <FormItem
                        key={type}
                        className="flex items-center space-x-2"
                      >
                        <FormControl>
                          <RadioGroupItem value={type} id={type} />
                        </FormControl>
                        <FormLabel htmlFor={type} className="font-normal">
                          {type}
                        </FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {/* Amount Input */}
        {transactionType && (
          <FormField
            control={control}
            name="amount"
            rules={{
              required: "Enter an amount",
              min: { value: 1, message: "Amount must be at least 1" },
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    placeholder="Enter amount"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        {amount && (
          <FormField
            control={control}
            name="Transaction_Date"
            rules={{ required: "Date is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Transaction Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {/* Buttons */}
        {transactionType && date && (
          <div className="flex gap-4">
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Submitting..." : "Add Transaction"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isSubmitting}
              className="w-full"
            >
              Cancel
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
}
