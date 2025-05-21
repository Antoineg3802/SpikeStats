"use server";

import { z } from "zod";
import { actionClient } from "../action";

export const registerEarlyAccess = actionClient
	.schema(
		z.object({
			email: z.string().email("Adresse e-mail invalide"),
		})
	)
	.action(async ({ parsedInput: { email } }) => {
        console.log('Incription avec l\'email : ', email);
    });
