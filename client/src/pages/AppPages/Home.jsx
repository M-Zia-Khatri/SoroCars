import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AppNavigation } from "@/constants/navigationConstants";
import CarForm from "@/components/Home/CarForm";
import { addCar } from "@/api/cars";

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

  const mutation = useMutation({
    mutationFn: addCar,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["cars"] });
      const nextUrl =
        variables.Sale_type === "Stock"
          ? AppNavigation.ViewStock
          : AppNavigation.ViewAution;
      location.href = nextUrl;
    },
    onError: (error) => {
      console.error("Submission failed:", error.message);
    },
  });

  const onSubmit = (data) => {
    const carData = {
      Stock_Id: data.Stock_Id.trim(),
      Invoice_Id: data.Invoice_Id.trim(),
      AdjustmentSTR: data.Adjustment,
      AmountSTR: data.Amount,
      Status: data.Status,
      Sale_type: data.Sale_type,
      Ajency: data.Ajency,
      UserId: 1,
    };
    mutation.mutate(carData);
  };

  return (
    <main className="max-w-md mx-auto mt-10 bg-white p-6">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Stock Entry Form
      </h2>
      <CarForm
        form={form}
        onSubmit={onSubmit}
        isSubmitting={mutation.isPending}
      />
    </main>
  );
}
