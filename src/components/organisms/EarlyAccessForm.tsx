"use client";

import { DynamicForm } from "@/components/molecules/DynamicForm";
import { registerEarlyAccess } from "@/lib/action/earlyAccess/earlyAccess.action";
import { useTransition, useState } from "react";
import { Field } from "@/datas/form";

export function EarlyAccessForm() {
    const formFields: Field[] = [
        { name: "email", type: "email", label: "Adresse e-mail", required: true },
    ];

    const [pending, startTransition] = useTransition();
    const [done, setDone] = useState(false);

    async function handleSubmit(values: any) {
        startTransition(async () => {
            await registerEarlyAccess(values);
            setDone(true);
        });
    }

    return done ? (
        <p className="text-sm text-green-600">Merci ! Nous vous écrirons bientôt 🥳</p>
    ) : (
        <DynamicForm fields={formFields} onSubmit={handleSubmit} />
    );
}
