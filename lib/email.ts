import { render } from "@react-email/render";
import React from "react";
import { Resend } from "resend";
import { VerificationEmail } from "../components/emails/verification-email";

export const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(to: string, url: string) {
	try {
		const template = React.createElement(VerificationEmail, { url });
		const emailHtml = render(template);
		const emailText = render(template, { plainText: true });

		const { data, error } = await resend.emails.send({
			from: "Your App <onboarding@resend.dev>", // Update to your verified domain
			to: [to],
			subject: "Verify your email address",
			html: emailHtml,
			text: emailText,
		});

		if (error) {
			console.error("Error sending verification email:", error);
			throw error;
		}

		console.log("Verification email sent:", data?.id);
		return data;
	} catch (error) {
		console.error("Failed to send verification email:", error);
		throw error;
	}
}
