"use client";

import { zodResolver } from "@hookform/resolvers/zod";
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
import { signIn } from "@/lib/auth/auth-client";

const signInFormSchema = z.object({
	email: z
		.email("Please enter a valid email address")
		.min(1, "Email is required")
		.transform((val) => val.trim()),
	password: z
		.string()
		.min(1, "Password is required")
		.min(8, "Password must be at least 8 characters")
		.transform((val) => val.trim()),
});

export default function SignIn() {
	const form = useForm<z.infer<typeof signInFormSchema>>({
		resolver: zodResolver(signInFormSchema),
		mode: "onBlur",
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const router = useRouter();

	async function onSubmit(data: z.infer<typeof signInFormSchema>) {
		const { email, password } = data;
		try {
			const { error } = await signIn.email({
				email,
				password,
				callbackURL: "/",
				fetchOptions: {
					onSuccess: async () => {
						router.push("/");
					},
				},
			});

			if (error) {
				form.setError("email", {
					type: "server-error",
					message: error?.message,
				});
			} else toast.success("sign in success");
		} catch (error) {
			toast.error("An unexpected error occurred");
			console.error("Signin error:", error);
			form.setError("root", {
				type: "server-error",
				message: "An unexpected error occurred. Please try again.",
			});
		}
	}

	return (
		<section className="w-full h-full flex justify-center items-center min-h-screen">
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<FieldSet className="w-96">
					<FieldLegend className="text-xl md:text-4xl">Sign In</FieldLegend>
					<FieldDescription className="text-xs md:text-sm">
						Enter your credentials below to sign in into your account
					</FieldDescription>
					<FieldGroup>
						<div className="grid gap-4">
							<FormInput
								form={form}
								name="email"
								label="Email"
								type="email"
								placeholder="email@example.com"
								required={true}
								autoComplete="email"
							/>

							<FormInput
								form={form}
								name="password"
								label="Password"
								type="password"
								placeholder="•••••••"
								autoComplete="current-password"
							/>

							<FormRootError form={form} />

							<FormSubmitButton form={form} label="Sign In" />
						</div>
					</FieldGroup>
				</FieldSet>
			</form>
		</section>
	);
}
