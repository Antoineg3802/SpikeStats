"use server";

import { Resend } from "resend";
import { ReactElement } from "react";

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendEmailOptions {
	to: string;
	subject: string;
	react?: ReactElement;
	html?: string;
	text: string;
}

interface ResendSchema extends SendEmailOptions {
    from: string;
}

export async function sendEmail({
	to,
	subject,
	react,
	html,
	text
}: SendEmailOptions) {
	if (!html && !react && !text) {
		throw new Error(
			"You must provide either `html` or `react` content for the email."
		);
	}

	let options: ResendSchema = {
		from: process.env.EMAIL_FROM!,
		to,
		subject,
		text,
	}

	if (react) {
		options.react = react;
	} else if (html && !react) {
		options.html = html;
	} else {
		throw new Error("Either `react` or `html` must be provided.");
	}

	return await resend.emails.send(options);
}
