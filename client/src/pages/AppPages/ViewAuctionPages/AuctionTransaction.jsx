import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import CarSelector from "@/components/AuctionTransaction/carSelector";
import TransactionForm from "@/components/AuctionTransaction/TransactionForm";
import TransactionHistory from "@/components/AuctionTransaction/TransactionHistory";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addAuctionTransaction } from "@/api/transactions";

export default function AuctionTransaction() {
  const [value, setValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [shouldAddTransaction, setShouldAddTransaction] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    defaultValues: {
      transactionType: "",
      amount: "",
    },
  });

  // Debounce search input
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setValue(searchTerm.trim());
    }, 1000); // 1sec delay

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);

      const payload = {
        Stock_Id: value,
        Amount: Number(data.amount),
        Credit_Debit: data.transactionType,
      };

      await addAuctionTransaction(payload);

      form.reset();
      setShouldAddTransaction(false);
    } catch (error) {
      console.error("Error submitting transaction:", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="flex items-center gap-4 mb-4">
        <Button
          onClick={() => {
            if (shouldAddTransaction) setValue("");
            setShouldAddTransaction(!shouldAddTransaction);
          }}
        >
          {!shouldAddTransaction ? "Add Transaction" : "Cancel"}
        </Button>

        <Input
          placeholder="Search by Stock ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {shouldAddTransaction && (
        <CarSelector
          value={value}
          onChange={setValue}
          resetForm={() => form.reset()}
        />
      )}

      {value && shouldAddTransaction && (
        <TransactionForm
          form={form}
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
          onCancel={() => {
            setValue("");
            setSearchTerm("");
            setShouldAddTransaction(false);
            form.reset();
          }}
        />
      )}

      {!shouldAddTransaction && <TransactionHistory stockId={value} />}
    </>
  );
}
