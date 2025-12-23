"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
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

const resetSchema = z.object({
	password: z
		.string()
		.min(8, "Password must be at least 8 characters")
		.max(48, "Password cannot exceed 48 characters")
		.transform((val) => val.trim()),
});

export default function ResetPasswordPage() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const token = searchParams.get("token");

	const form = useForm<z.infer<typeof resetSchema>>({
		resolver: zodResolver(resetSchema),
		mode: "onBlur",
		defaultValues: { password: "" },
	});

	async function onSubmit(values: z.infer<typeof resetSchema>) {
		if (!token) {
			form.setError("root", {
				type: "manual",
				message: "Reset token missing. Please use the link from your email.",
			});
			return;
		}

		try {
			const { error } = await authClient.resetPassword({
				newPassword: values.password,
				token,
			});

			if (error) {
				form.setError("root", {
					type: "server",
					message: error.message ?? "Unable to reset password.",
				});
				return;
			}

			toast.success("Password updated. You can now sign in.");
			router.push("/sign-in");
		} catch (err) {
			console.error("resetPassword error:", err);
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
						Set a new password
					</FieldLegend>
					<FieldDescription className="text-xs md:text-sm">
						Enter your new password to finish resetting your account.
					</FieldDescription>
					<FieldGroup>
						<div className="grid gap-4">
							<FormInput
								form={form}
								name="password"
								label="New password"
								type="password"
								placeholder="••••••••"
								required
								autoComplete="new-password"
							/>

							<FormRootError form={form} />
							<FormSubmitButton form={form} label="Update password" />
						</div>
					</FieldGroup>
				</FieldSet>
			</form>
		</section>
	);
}
