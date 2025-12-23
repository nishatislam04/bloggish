import { pretty, render, toPlainText } from "@react-email/render";
import React from "react";
import { Resend } from "resend";
import ResetPasswordEmail from "@/components/emails/reset-password-email";
import VerificationEmail from "@/components/emails/verification-email";

export const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(to: string, url: string) {
	try {
		// Render the email component to HTML
		const emailHtml = await pretty(
			await render(React.createElement(VerificationEmail, { url })),
		);

		// Generate plain text version
		const emailText = toPlainText(emailHtml);

		const { data, error } = await resend.emails.send({
			from: "Bloggish <onboarding@resend.dev>",
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

export async function sendResetPasswordEmail(to: string, url: string) {
	try {
		const emailHtml = await pretty(
			await render(React.createElement(ResetPasswordEmail, { url })),
		);
		const emailText = toPlainText(emailHtml);

		const { data, error } = await resend.emails.send({
			from: "Bloggish <onboarding@resend.dev>",
			to: [to],
			subject: "Reset your password",
			html: emailHtml,
			text: emailText,
		});

		if (error) {
			console.error("Error sending reset password email:", error);
			throw error;
		}

		console.log("Reset password email sent:", data?.id);
		return data;
	} catch (error) {
		console.error("Failed to send reset password email:", error);
		throw error;
	}
}
