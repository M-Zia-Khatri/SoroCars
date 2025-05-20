import React from "react";
import { Form } from "@/components/ui/form";
import { Button } from "../ui/button";
import TextInputField from "../form-fields/TextInputField";
import RadioInputGroup from "../form-fields/RadioInputGroup";

export default function CarForm({ form, onSubmit, isSubmitting }) {
  return (
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

        <RadioInputGroup
          name="Sale_type"
          label="Sale Type"
          options={["Stock", "Auction"]}
          form={form}
        />

        <RadioInputGroup
          name="Ajency"
          label="Ajency"
          options={["AA-Japan", "Durrani"]}
          form={form}
        />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
