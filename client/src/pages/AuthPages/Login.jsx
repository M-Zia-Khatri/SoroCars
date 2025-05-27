import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { loginUser } from "@/API/auth";
import { StorageConst } from "@/constants/storageConstants";
import Cookies from "js-cookie";
import { setItem } from "@/services/storageService";

export default function Login() {
  const form = useForm({ defaultValues: { email: "", password: "" } });

  const mutation = useMutation({
    mutationFn: loginUser,

    onSuccess: ({ data }) => {
      setItem(StorageConst.User, {
        Name: data.name,
        role: data.role,
        email: data.email,
        userId: data.userId,
      });
      Cookies.set(StorageConst.Token, data.token, {
        secure: true,
        sameSite: "strict",
        expires: 1 / 12, // 2 hours (2/24 = 0.0833, or 1/12)
      });
      location.href = "/";
    },
    onError: (error) => {
      alert(error?.response?.data?.message || "Login failed");
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <div className="max-w-sm mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            name="email"
            type="email"
            required
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Logging in..." : "Login"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
