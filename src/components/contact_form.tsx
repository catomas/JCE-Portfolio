"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import * as z from "zod";
import { Button } from "./ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "El nombre debe tener al menos 2 caracteres",
    })
    .max(50),
  email: z.string().email({
    message: "El email debe ser válido",
  }),
  subject: z
    .string()
    .min(2, {
      message: "El asunto debe tener al menos 2 caracteres",
    })
    .max(50),
  message: z
    .string()
    .min(2, {
      message: "El mensaje debe tener al menos 2 caracteres",
    })
    .max(500),
});

export const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);

    const data = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    }).then((res) => {
      if (!res.ok) throw new Error("Error al enviar el mensaje");
      res.json();
    });

    try {
      await data;
      setIsSubmitting(false);
      toast.success("Mensaje enviado");

      form.reset();
    } catch (error) {
      setIsSubmitting(false);
      toast.error("Error al enviar el mensaje");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 lg:px-10 flex flex-col"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex justify-between">
                Nombre
                <FormMessage />
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Juan Carlos Echeverri"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex justify-between">
                Email
                <FormMessage />
              </FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="example@gmail.com"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex justify-between">
                Asunto
                <FormMessage />
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Asunto del mensaje"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex justify-between">
                Mensaje
                <FormMessage />
              </FormLabel>
              <FormControl>
                <Textarea
                  className="h-32"
                  placeholder="Escribe tu mensaje"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button disabled={isSubmitting} type="submit">
          {isSubmitting ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            "Enviar"
          )}
        </Button>
      </form>
    </Form>
  );
};
