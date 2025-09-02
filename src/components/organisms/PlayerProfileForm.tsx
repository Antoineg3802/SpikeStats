"use client";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { updatePlayerProfile } from "@/lib/action/users/user.action";
import { Button } from "../ui/button";
import { PlayerProfile } from "@/lib/prisma/client";
import { toast } from "sonner";
import { useAction } from "next-safe-action/hooks";
import { CircleCheck, CircleX } from "lucide-react";

export default function PlayerProfileForm(playerProfile: PlayerProfile | null) {
	const formSchema = z.object({
		license: z.string().min(8, {
			message:
				"Le numéro de licence doit contenir au moins 8 caractères.",
		}),
		jerseyNumber: z
			.string()
			.refine((val) => !Number.isNaN(parseInt(val, 10)), {
				message: "Expected number, received a string",
			}),
		position: z.string(),
	});

	const { executeAsync } = useAction(updatePlayerProfile);

	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			license: playerProfile?.license || "",
			jerseyNumber: playerProfile?.jerseyNumber
				? String(playerProfile?.jerseyNumber)
				: "0",
			position: playerProfile?.position || "",
		},
	});

	const onSubmit = async (data: z.infer<typeof formSchema>) => {
		const res = await executeAsync({
			playerProfileId: playerProfile?.id || "",
			license: data.license,
			position: data.position,
			jerseyNumber: data.jerseyNumber,
		});

		console.log(res);

		if (!res || !res?.data?.success) {
			toast.error(
				"Erreur lors de la mise à jour du profil : " + res?.data?.data
			);
		} else {
			toast.success("Profil mis à jour avec succès !");
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<FormField
					control={form.control}
					name="license"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Numéro de Licence</FormLabel>
							<FormControl>
								<Input type="text" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="jerseyNumber"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Numéro de maillot</FormLabel>
							<FormControl>
								<Input type="number" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="position"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Position</FormLabel>
							<FormControl>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<SelectTrigger className="w-[280px]">
										<SelectValue placeholder="Sélectionner une position" />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											<SelectItem value="OUTSIDEHITTER">
												Réceptionneur-attaquant
											</SelectItem>
											<SelectItem value="LIBERO">
												Libero
											</SelectItem>
											<SelectItem value="MIDDLEBLOCKER">
												Central
											</SelectItem>
											<SelectItem value="SETTER">
												Passeur
											</SelectItem>
											<SelectItem value="OPPOSITEHITTER">
												Pointu
											</SelectItem>
										</SelectGroup>
									</SelectContent>
								</Select>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">Submit</Button>
			</form>
		</Form>
	);
}
