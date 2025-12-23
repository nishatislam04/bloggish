"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import FormInput from "@/components/form/form-input";
import { FormRootError } from "@/components/form/form-root-error";
import { FormSubmitButton } from "@/components/form/form-submit-button";
import {
	FieldDescription,
	FieldGroup,
	FieldLegend,
	FieldSet,
} from "@/components/ui/field";
import { authClient } from "@/lib/auth/auth-client";

const requestResetSchema = z.object({
	email: z
		.string()
		.email("Please enter a valid email address")
		.min(1, "Email is required")
		.transform((val) => val.trim()),
});

export default function RequestPasswordReset() {
	const form = useForm<z.infer<typeof requestResetSchema>>({
		resolver: zodResolver(requestResetSchema),
		mode: "onBlur",
		defaultValues: { email: "" },
	});

	const router = useRouter();

	async function onSubmit(values: z.infer<typeof requestResetSchema>) {
		const origin =
			typeof window !== "undefined"
				? window.location.origin
				: process.env.NEXT_PUBLIC_APP_URL;

		if (!origin) {
			form.setError("root", {
				type: "manual",
				message:
					"Missing application URL. Please set NEXT_PUBLIC_APP_URL in your environment.",
			});
			return;
		}

		const redirectTo = `${origin}/reset-password`;

		try {
			const { error } = await authClient.requestPasswordReset({
				email: values.email,
				redirectTo,
			});

			if (error) {
				form.setError("email", {
					type: "server",
					message: error.message ?? "Unable to send reset email",
				});
				return;
			}

			toast.success("Password reset link sent. Check your email.");
		} catch (err) {
			console.error("requestPasswordReset error:", err);
			form.setError("root", {
				type: "server",
				message: "Something went wrong. Please try again.",
			});
		}
	}

	return (
		<section className="w-full h-full flex justify-center items-center min-h-screen">
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<FieldSet className="w-96">
					<FieldLegend className="text-xl md:text-4xl">
						Request password reset
					</FieldLegend>
					<FieldDescription className="text-xs md:text-sm">
						Enter your account email. We&apos;ll send you a reset link.
					</FieldDescription>
					<FieldGroup>
						<div className="grid gap-4">
							<FormInput
								form={form}
								name="email"
								label="Email"
								type="email"
								placeholder="you@example.com"
								required
								autoComplete="email"
							/>

							<FormRootError form={form} />
							<FormSubmitButton form={form} label="Send reset link" />

							<Link
								href="/sign-in"
								className="text-sm text-muted-foreground text-center"
							>
								Back to sign in
							</Link>
						</div>
					</FieldGroup>
				</FieldSet>
			</form>
		</section>
	);
}
