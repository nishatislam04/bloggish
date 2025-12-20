"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
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
import { signUp } from "@/lib/auth/auth-client";

const signUpFormSchema = z.object({
	firstName: z
		.string()
		.min(1, "Please provide a valid name")
		.max(12, "Your First Name can not be grater than 12 characters")
		.transform((val) => val.trim()),
	lastName: z
		.string()
		.min(1, "Please provide a valid last name")
		.max(12, "Your Last Name can not grater than 12 characters")
		.transform((val) => val.trim()),
	username: z
		.string()
		.min(1, "Please provide a valid username")
		.min(4, "Your username need to be at least 4 characters")
		.max(32, "Your username can not be grater than 32 characters")
		.transform((val) => val.trim()),
	email: z
		.email("Please provide a valid email address")
		.min(1, "Email address is required")
		.transform((val) => val.trim()),
	password: z
		.string()
		.min(1, "Password is required")
		.min(8, "Password need to be atleast 8 characters")
		.max(48, "Password can not be grater than 48 characters")
		.transform((val) => val.trim()),
});

export default function SignUp() {
	const form = useForm<z.infer<typeof signUpFormSchema>>({
		resolver: zodResolver(signUpFormSchema),
		mode: "onChange",
		defaultValues: {
			firstName: "",
			lastName: "",
			username: "",
			email: "",
			password: "",
		},
	});

	const router = useRouter();

	async function onSubmit(data: z.infer<typeof signUpFormSchema>) {
		const { firstName, lastName, username, email, password } = data;

		try {
			const { error } = await signUp.email({
				email,
				password,
				firstName,
				lastName,
				name: username,
				fetchOptions: {
					onError: (ctx) => {
						toast.error("something went wrong when trying to signup");
						console.log("sign up error: ", ctx.error.message);
					},
					onSuccess: async () => {
						router.push("/");
					},
				},
			});

			if (error) {
				form.setError("root", {
					type: "server-error",
					message: error?.message,
				});
			} else toast.success("sign up success");
		} catch (error) {
			toast.error("An unexpected error occurred");
			console.error("Signup error:", error);

			form.setError("root", {
				type: "server-error",
				message: "An unexpected error occurred. Please try again.",
			});
		}
	}

	return (
		<section className="w-full h-full flex justify-center items-center min-h-screen">
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<FieldSet className="w-120">
					<FieldLegend className="text-lg md:text-xl mb-6">
						Sign Up
						<FieldDescription className="text-xs md:text-sm">
							Enter your information to create an account
						</FieldDescription>
					</FieldLegend>
					<FieldGroup>
						<div className="grid gap-4">
							<FieldGroup className="grid grid-cols-2 gap-4">
								<Controller
									name="firstName"
									control={form.control}
									render={({ field, fieldState }) => (
										<Field data-invalid={fieldState.invalid}>
											<FieldLabel htmlFor="first-name">First name</FieldLabel>
											<Input
												{...field}
												id="first-name"
												placeholder="Max"
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
									name="lastName"
									control={form.control}
									render={({ field, fieldState }) => (
										<Field data-invalid={fieldState.invalid}>
											<FieldLabel htmlFor="last-name">Last name</FieldLabel>
											<Input
												{...field}
												id="last-name"
												placeholder="Robinson"
												required
												aria-invalid={fieldState.invalid}
											/>
											{fieldState.invalid && (
												<FieldError errors={[fieldState.error]} />
											)}
										</Field>
									)}
								/>
							</FieldGroup>
							<Controller
								name="username"
								control={form.control}
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel htmlFor="username">Username</FieldLabel>
										<Input
											{...field}
											id="username"
											type="text"
											placeholder="username"
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
											autoComplete="new-password"
											placeholder="Password"
											aria-invalid={fieldState.invalid}
										/>
										{fieldState.invalid && (
											<FieldError errors={[fieldState.error]} />
										)}
									</Field>
								)}
							/>

							{form.formState.errors.root && (
								<FieldError errors={[form.formState.errors.root]} />
							)}

							<Button
								type="submit"
								className="w-full mt-4"
								disabled={form.formState.isSubmitting}
							>
								{form.formState.isSubmitting ? (
									<Loader2 size={16} className="animate-spin" />
								) : (
									"Sign Up"
								)}
							</Button>
						</div>
					</FieldGroup>
				</FieldSet>
			</form>
		</section>
	);
}
