"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { Button } from "@/components/ui/button";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldLegend,
	FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { signIn } from "@/lib/auth/auth-client";

const signInFormSchema = z.object({
	email: z
		.email("Please enter a valid email address")
		.min(1, "Email is required"),
	password: z
		.string()
		.min(1, "Password is required")
		.min(8, "Password must be at least 8 characters"),
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

	async function onSubmit(data: z.infer<typeof signInFormSchema>) {
		const { email, password } = data;
		try {
			const { error } = await signIn.email({
				email,
				password,
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
		}
	}

	return (
		<section className="w-full h-full flex justify-center items-center min-h-screen">
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<FieldSet className="w-96 ">
					<FieldLegend className="text-xl md:text-4xl">Sign In</FieldLegend>
					<FieldDescription className="text-xs md:text-sm">
						Enter your credentials below to sign in into your account
					</FieldDescription>
					<FieldGroup>
						<div className="grid gap-4">
							<Controller
								name="email"
								control={form.control}
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel htmlFor="email">Email</FieldLabel>
										<Input
											{...field}
											id="email"
											type="email"
											placeholder="email@example.com"
											required
											aria-invalid={fieldState.invalid}
										/>
										{fieldState.invalid && (
											<FieldError errors={[fieldState.error]} />
										)}
									</Field>
								)}
							/>

							<Controller
								name="password"
								control={form.control}
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel htmlFor="password">Password</FieldLabel>
										<Input
											{...field}
											id="password"
											type="password"
											placeholder="password"
											autoComplete="password"
											aria-invalid={fieldState.invalid}
										/>
										{fieldState.invalid && (
											<FieldError errors={[fieldState.error]} />
										)}
									</Field>
								)}
							/>

							<Button
								type="submit"
								className="w-full mt-4"
								disabled={form.formState.isSubmitting}
							>
								{form.formState.isSubmitting ? (
									<Loader2 size={16} className="animate-spin" />
								) : (
									<p> SignIn </p>
								)}
							</Button>
						</div>
					</FieldGroup>
				</FieldSet>
			</form>
		</section>
	);
}
