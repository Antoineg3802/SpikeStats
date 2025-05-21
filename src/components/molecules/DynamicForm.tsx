"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import dynamic from "next/dynamic";

type FieldType =
    | "text"
    | "email"
    | "number"
    | "password"
    | "textarea"
    | "date"
    | "datetime-local"
    | "checkbox";

type Field = {
    name: string;
    label?: string;
    type: FieldType;
    required?: boolean;
};

type DynamicFormProps = {
    fields: Field[];
    onSubmit: (values: any) => void;
};

export function DynamicForm({ fields, onSubmit }: DynamicFormProps) {
    const schemaShape = fields.reduce((acc, field) => {
        let validator: z.ZodTypeAny;

        switch (field.type) {
            case "checkbox": {
                validator = z.boolean();
                if (field.required) {
                    validator = validator.refine((val) => val === true, {
                        message: `${field.label || field.name} doit être coché.`,
                    });
                } else {
                    validator = validator.optional()
                }
                break;
            }

            case "number": {
                validator = z
                    .string()
                    .regex(/^\d*$/, "Doit être un nombre (ou vide)")
                    .transform((val) => {
                        if (val === "") return undefined;
                        return Number(val);
                    });

                if (field.required) {
                    validator = validator.refine((val) => val !== undefined, {
                        message: `${field.label || field.name} est requis.`,
                    });
                } else {
                    validator = validator.optional()
                }
                break;
            }

            case "email": {
                validator = z.string().email("Adresse e-mail invalide");
                if (!field.required) {
                    validator = validator.optional()
                } else {
                    validator = (validator as z.ZodString).min(1, `${field.label || field.name} est requis.`);
                }
                break;
            }

            default: {
                validator = z.string();

                if (field.required) {
                    validator = (validator as z.ZodString).min(1, `${field.label || field.name} est requis`);
                } else {
                    validator = validator.optional();
                }
                break;
            }
        }

        acc[field.name] = validator;
        return acc;
    }, {} as Record<string, z.ZodTypeAny>);

    const defaultValues = fields.reduce((acc, field) => {
        switch (field.type) {
            case "checkbox":
                acc[field.name] = false;
                break;
            default:
                acc[field.name] = "";
                break;
        }
        return acc;
    }, {} as Record<string, any>);

    const formSchema = z.object(schemaShape);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues,
    });

    const handleSubmit = (values: any) => {
        onSubmit(values);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                {fields.map((field) => (
                    <FormField
                        key={field.name}
                        control={form.control}
                        name={field.name}
                        render={({ field: rhfField }) => (
                            <FormItem>
                                {field.type === "checkbox" ? (
                                    <div className="flex items-center space-x-2">
                                        <FormControl className="hover:cursor-pointer">
                                            <Checkbox
                                                checked={rhfField.value}
                                                onCheckedChange={(checked) =>
                                                    rhfField.onChange(checked === true)
                                                }
                                            />
                                        </FormControl>
                                        {field.label && <FormLabel className="hover:cursor-pointer">{field.label}</FormLabel>}
                                    </div>
                                ) : field.type === "textarea" ? (
                                    <>
                                        {field.label && <FormLabel>{field.label}</FormLabel>}
                                        <FormControl>
                                            <Textarea {...rhfField} />
                                        </FormControl>
                                    </>
                                ) : (
                                    <>
                                        {field.label && <FormLabel>{field.label}</FormLabel>}
                                        <FormControl>
                                            <Input type={field.type} {...rhfField} />
                                        </FormControl>
                                    </>
                                )}
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                ))}
                <Button type="submit">Valider</Button>
            </form>
        </Form>
    );
}
