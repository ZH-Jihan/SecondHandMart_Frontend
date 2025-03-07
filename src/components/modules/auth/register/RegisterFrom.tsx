"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { regesterUser } from "@/services/Auth/index";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email(),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
});

const RegisterFrom = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const {
    formState: { isSubmitting },
  } = form;

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const res = await regesterUser(data);
      if (res.success) {
        toast.success(res?.message);
      }
      toast.error(res?.errorSources[0].message);
    } catch (error: any) {
      console.log(error);
    }
  }

  return (
    <div className=" antialiased">
      <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300 ">
        <div className="mb-8 flex justify-center">
          <h1 className="text-xl font-semibold">Sign Up</h1>
          <p className="font-extralight text-sm text-gray-600">Welcome</p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="m-6 flex flex-col text-sm rounded-md"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="my-2">
                  <FormLabel>User Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Full Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="my-2">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="example@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="my-2">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="mt-5 border p-2 bg-gradient-to-r  hover:bg-slate-400 scale-105 duration-300"
              type="submit"
            >
              {isSubmitting ? "Registering..." : "Sign Up"}
            </Button>
            <div className="mt-5  text-sm text-gray-600">
              <p>
                Already have an account ?{" "}
                <Link
                  className="text-primary underline underline-offset-2"
                  href="/login"
                >
                  LogIn
                </Link>
              </p>
            </div>
            <div className="flex justify-center mt-5 text-sm">
              <p className="text-gray-400">or you can sign with</p>
            </div>
            <div className="mt-5 flex justify-center gap-3    ">
              <a
                className="bg-gray-400 h-7 w-7 rounded-3xl text-center grayscale cursor-pointer hover:grayscale-0 scale-105 duration-300 "
                href=""
              >
                ...
              </a>
            </div>
            <div className="mt-5 text-center text-sm text-gray-400">
              <p>
                This site is protected by reCAPTCHA and the Google <br />
                <a className="underline" href="">
                  Privacy Policy
                </a>{" "}
                and{" "}
                <a className="underline" href="">
                  Terms of Service
                </a>{" "}
                apply.
              </p>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default RegisterFrom;
