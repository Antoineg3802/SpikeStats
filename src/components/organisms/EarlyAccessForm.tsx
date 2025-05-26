"use client";

import { registerWaintingList } from "@/lib/action/wainingList/waiting-list.action";
import { Field } from "@/datas/form";
import { DynamicForm } from "../molecules/DynamicForm";

export function EarlyAccessForm() {
    const fields: Field[] = [
        {
            name: "name",
            label: "Nom",
            type: "text",
            required: true,
        },
        {
            name: "email",
            label: "Adresse e-mail",
            type: "email",
            required: true,
        },
    ]

	return <DynamicForm fields={fields} onSubmit={registerWaintingList} />
}
