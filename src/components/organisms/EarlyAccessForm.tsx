"use client";

import { registerWaintingList } from "@/lib/action/wainingList/waiting-list.action";
import { Field } from "@/datas/form";
import { DynamicForm } from "../molecules/DynamicForm";
import { toast, Toaster } from "sonner";
import { CircleCheck } from "lucide-react";

export function EarlyAccessForm() {
	const handleEarlyAccessSubmit = (values: {
		email: string;
		name: string;
		extradata?: string;
	}) => {
		registerWaintingList(values).then((res) => {
			if (res && res.data && res.data.success) {
				toast.success(res.data.message, {
					duration: 1500,
					icon: <CircleCheck className="text-green-500" />,
				});
			} else {
				toast.error(
					res?.data?.message,
                    {
                        duration: 50000
                    }
				);
			}
		});
	};
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
	];

	return (
		<>
			<DynamicForm fields={fields} onSubmit={handleEarlyAccessSubmit} />
			<Toaster />
		</>
	);
}
